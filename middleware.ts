import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get('__session');
  if (!session?.value) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
