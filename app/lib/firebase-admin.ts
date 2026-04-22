import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let _app: App | undefined;

function getAdminApp(): App {
  if (_app) return _app;
  if (getApps().length) {
    _app = getApps()[0];
    return _app;
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON env var is not set');
  }

  _app = initializeApp({
    credential: cert(JSON.parse(json)),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
  return _app;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_, prop) {
    return (getAuth(getAdminApp()) as any)[prop];
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminDb: Firestore = new Proxy({} as Firestore, {
  get(_, prop) {
    return (getFirestore(getAdminApp()) as any)[prop];
  },
});
