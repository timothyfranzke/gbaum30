import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/firebase-admin';
import { verifyAdminSession } from '@/app/lib/auth-guard';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const snapshot = await adminDb.collection('plans').orderBy('sortOrder').get();
  const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(plans);
}
