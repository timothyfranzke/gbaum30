import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/firebase-admin';
import { verifyAdminSession } from '@/app/lib/auth-guard';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const data = await request.json();
  await adminDb.collection('gallery').doc(id).update(data);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await adminDb.collection('gallery').doc(id).delete();
  return NextResponse.json({ success: true });
}
