import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin';

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('__session');

  if (!session?.value) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(session.value, true);
    return decoded;
  } catch {
    return null;
  }
}
