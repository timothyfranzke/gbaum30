import { NextResponse } from 'next/server';
import { getStorage } from 'firebase-admin/storage';
import { verifyAdminSession } from '@/app/lib/auth-guard';
import '@/app/lib/firebase-admin';

export async function POST(request: Request) {
  const session = await verifyAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const storagePath = formData.get('path') as string | null;

  if (!file || !storagePath) {
    return NextResponse.json({ error: 'File and path are required' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const bucket = getStorage().bucket();
  const fileRef = bucket.file(storagePath);

  await fileRef.save(buffer, {
    metadata: { contentType: file.type },
  });

  await fileRef.makePublic();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

  return NextResponse.json({ url: publicUrl });
}
