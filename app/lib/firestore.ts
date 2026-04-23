import { FALLBACK_STAFF } from '@/app/config/staff';
import { PLANS } from '@/app/config/plans';
import { FALLBACK_GALLERY } from '@/app/config/gallery';
import { adminDb } from './firebase-admin';
import type { StaffDoc, PlanDoc, GalleryDoc, AboutSlot, AnnouncementDoc } from './types';

export async function fetchStaff(): Promise<StaffDoc[]> {
  try {
    const db = adminDb;
    const snapshot = await db.collection('staff').orderBy('sortOrder').get();
    if (snapshot.empty) return FALLBACK_STAFF;
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as StaffDoc);
  } catch (e) {
    console.warn('Failed to fetch staff from Firestore, using fallback:', e);
    return FALLBACK_STAFF;
  }
}

export async function fetchPlans(): Promise<PlanDoc[]> {
  try {
    const db = adminDb;
    const snapshot = await db.collection('plans').orderBy('sortOrder').get();
    if (snapshot.empty) return fallbackPlans();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as PlanDoc);
  } catch (e) {
    console.warn('Failed to fetch plans from Firestore, using fallback:', e);
    return fallbackPlans();
  }
}

export async function fetchGallery(): Promise<GalleryDoc[]> {
  try {
    const db = adminDb;
    const snapshot = await db.collection('gallery').orderBy('sortOrder').get();
    const items = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }) as GalleryDoc)
      .filter(item => item.visible);
    if (items.length === 0) return FALLBACK_GALLERY;
    return items;
  } catch (e) {
    console.warn('Failed to fetch gallery from Firestore, using fallback:', e);
    return FALLBACK_GALLERY;
  }
}

export async function fetchAboutMedia(): Promise<Record<AboutSlot, GalleryDoc | null>> {
  const result: Record<AboutSlot, GalleryDoc | null> = { main: null, left: null, right: null };
  try {
    const db = adminDb;
    const snapshot = await db.collection('gallery')
      .where('aboutSlot', 'in', ['main', 'left', 'right'])
      .get();
    for (const doc of snapshot.docs) {
      const item = { id: doc.id, ...doc.data() } as GalleryDoc;
      if (item.aboutSlot) result[item.aboutSlot] = item;
    }
  } catch (e) {
    console.warn('Failed to fetch about media:', e);
  }
  return result;
}

export async function fetchActiveAnnouncement(): Promise<AnnouncementDoc | null> {
  try {
    const db = adminDb;
    const snapshot = await db.collection('announcements').where('enabled', '==', true).get();
    if (snapshot.empty) return null;

    const today = new Date().toISOString().split('T')[0];
    for (const doc of snapshot.docs) {
      const data = doc.data() as Omit<AnnouncementDoc, 'id'>;
      if (data.startDate > today) continue;
      if (data.endDate && data.endDate < today) continue;
      return { id: doc.id, ...data };
    }
    return null;
  } catch (e) {
    console.warn('Failed to fetch announcement:', e);
    return null;
  }
}

function fallbackPlans(): PlanDoc[] {
  return PLANS.map((p, i) => ({
    id: p.id,
    pushpressId: p.id,
    name: p.name,
    tag: p.tag,
    fallbackPrice: p.fallbackPrice,
    unit: p.unit,
    desc: p.desc,
    items: p.items,
    featured: p.featured,
    href: p.href,
    type: p.type,
    sortOrder: i + 1,
  }));
}
