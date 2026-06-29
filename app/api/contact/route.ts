import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { adminDb } from '@/app/lib/firebase-admin';
import { PRIVACY_VERSION } from '@/app/lib/legal';

const PROXY_URL = 'https://us-central1-franzke-creative.cloudfunctions.net/sendEmail';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { parent: 120, email: 200, player: 120, age: 6, program: 80, exp: 40, notes: 2000 };

// Simple in-memory rate limiter. NOTE: this is per-instance only — in a
// serverless/multi-instance deployment it is best-effort. Swap for a
// Firestore- or KV-backed counter (or a hosting-level rule) for hard limits.
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function hashIp(ip: string): string {
  const salt = process.env.CONTACT_IP_SALT ?? '';
  return createHash('sha256').update(`${ip}${salt}`).digest('hex');
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If Turnstile isn't configured yet, don't block submissions.
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — if filled, silently succeed without doing anything.
    if (str(body.website)) {
      return NextResponse.json({ success: true, message: 'Message sent!' });
    }

    const ip = clientIp(request);
    if (rateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      );
    }

    const parent = str(body.parent);
    const email = str(body.email);
    const player = str(body.player);
    const age = str(body.age);
    const program = str(body.program);
    const exp = str(body.exp);
    const notes = str(body.notes);
    const consent = body.consent === true;
    const consentText = str(body.consentText);

    // Parental consent is required.
    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'Parent or guardian consent is required.' },
        { status: 400 },
      );
    }

    // Required fields.
    if (!parent || !email || !player || !notes) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 },
      );
    }

    // Format / range validation.
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }
    if (age) {
      const n = Number(age);
      if (!Number.isFinite(n) || n < 3 || n > 99) {
        return NextResponse.json(
          { success: false, message: 'Please enter a valid age.' },
          { status: 400 },
        );
      }
    }
    if (
      parent.length > MAX.parent ||
      email.length > MAX.email ||
      player.length > MAX.player ||
      age.length > MAX.age ||
      program.length > MAX.program ||
      exp.length > MAX.exp ||
      notes.length > MAX.notes
    ) {
      return NextResponse.json(
        { success: false, message: 'One or more fields is too long.' },
        { status: 400 },
      );
    }

    // Spam protection.
    if (!(await verifyTurnstile(str(body.turnstileToken), ip))) {
      return NextResponse.json(
        { success: false, message: 'Verification failed. Please try again.' },
        { status: 400 },
      );
    }

    // Save to Firestore with an auditable consent record.
    await adminDb.collection('contacts').add({
      parent,
      email,
      player,
      age,
      program,
      exp,
      notes,
      consent: true,
      consentText,
      privacyPolicyVersion: PRIVACY_VERSION,
      consentAt: new Date().toISOString(),
      ipHash: hashIp(ip),
      userAgent: request.headers.get('user-agent') ?? '',
      createdAt: new Date().toISOString(),
      read: false,
    });

    const message = [
      `Program: ${program}`,
      `Player: ${player}`,
      `Age: ${age}`,
      `Experience: ${exp}`,
      '',
      notes,
    ].join('\n');

    const apiKey = process.env.FRANZKE_EMAIL_API_KEY;
    if (!apiKey) {
      console.error('FRANZKE_EMAIL_API_KEY not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 },
      );
    }

    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'Origin': 'https://union30.com',
      },
      body: JSON.stringify({
        name: parent,
        email,
        message,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error(`Email proxy error (HTTP ${res.status}):`, errBody);
      return NextResponse.json(
        { success: false, message: 'Sorry, there was an error sending your message. Please try again later.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Sorry, there was an error sending your message. Please try again later.' },
      { status: 500 },
    );
  }
}
