import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/firebase-admin';

const PROXY_URL = 'https://us-central1-franzke-creative.cloudfunctions.net/sendEmail';

export async function POST(request: Request) {
  try {
    const { parent, email, player, age, program, exp, notes } = await request.json();

    if (!parent || !email || !player || !notes) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 },
      );
    }

    // Save to Firestore
    await adminDb.collection('contacts').add({
      parent,
      email,
      player,
      age: age || '',
      program: program || '',
      exp: exp || '',
      notes,
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
      const body = await res.text();
      console.error(`Email proxy error (HTTP ${res.status}):`, body);
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
