import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    // 5-day session
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true });
    response.cookies.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
