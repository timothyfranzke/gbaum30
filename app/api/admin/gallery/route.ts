import { NextResponse } from 'next/server';
import { adminDb } from '@/app/lib/firebase-admin';
import { verifyAdminSession } from '@/app/lib/auth-guard';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const snapshot = await adminDb.collection('gallery').orderBy('sortOrder').get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await request.json();
  const ref = await adminDb.collection('gallery').add({
    fileUrl: '',
    caption: '',
    mediaType: 'image',
    sortOrder: data.sortOrder ?? 0,
    visible: true,
    ...data,
  });
  return NextResponse.json({ id: ref.id }, { status: 201 });
}
