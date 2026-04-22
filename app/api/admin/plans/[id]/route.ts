import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/firebase-admin';
import { verifyAdminSession } from '@/app/lib/auth-guard';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const doc = await adminDb.collection('plans').doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const data = await request.json();
  await adminDb.collection('plans').doc(id).update(data);
  return NextResponse.json({ success: true });
}
