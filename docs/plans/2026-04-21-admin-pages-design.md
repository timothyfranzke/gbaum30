# Admin Pages Design

## Overview

CRUD admin interface for managing staff, training plans, and gallery media. Built on Firebase (Auth, Firestore, Storage) behind email/password authentication. The public site reads from Firestore at build time with ISR, falling back to hardcoded data if Firestore is unreachable.

## Firebase Setup

### Environment Variables (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCx19OF9vLV-sRtwStD13zvus4dIgCWA44
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gbaum30-41996.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gbaum30-41996
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gbaum30-41996.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=953411874518
NEXT_PUBLIC_FIREBASE_APP_ID=1:953411874518:web:37064da8812b9c640d6377
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-75ZBE49FBT
```

### Firebase CLI Setup

```bash
firebase login
firebase init hosting
firebase functions:config:set \
  app.api_key="AIzaSyCx19OF9vLV-sRtwStD13zvus4dIgCWA44" \
  app.auth_domain="gbaum30-41996.firebaseapp.com" \
  app.project_id="gbaum30-41996" \
  app.storage_bucket="gbaum30-41996.firebasestorage.app" \
  app.messaging_sender_id="953411874518" \
  app.app_id="1:953411874518:web:37064da8812b9c640d6377"
```

### New Files

| File | Purpose |
|---|---|
| `app/lib/firebase.ts` | Client-side Firebase init (Auth, Firestore, Storage) |
| `app/lib/firebase-admin.ts` | Server-side Firebase Admin SDK (middleware auth, data fetching) |
| `.env.local` | Config values |

### NPM Packages

- `firebase`
- `firebase-admin`

## Firestore Schema

### `staff` collection

```
staff/{docId}
├── name: string
├── role: string
├── tag: string
├── bio: string
├── certifications: string[]
├── achievements: string[]
├── quote: string | null
├── imageUrl: string | null       // Firebase Storage URL
├── sortOrder: number
├── createdAt: timestamp
└── updatedAt: timestamp
```

### `plans` collection

```
plans/{docId}
├── pushpressId: string           // "plan_32a943f127892b"
├── name: string
├── tag: string
├── fallbackPrice: number
├── unit: string
├── desc: string
├── items: string[]
├── featured: boolean
├── href: string                  // PushPress checkout URL
├── type: "monthly" | "pack"
├── sortOrder: number
├── createdAt: timestamp
└── updatedAt: timestamp
```

### `gallery` collection

```
gallery/{docId}
├── fileUrl: string               // Firebase Storage URL
├── type: "image" | "video"
├── caption: string | null
├── sortOrder: number
├── visible: boolean              // Show/hide without deleting
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Storage Structure

```
staff/{docId}/photo.{ext}
gallery/{docId}/file.{ext}
```

## Admin Routes

All admin pages share a layout: dark sidebar nav, content area. Uses the ink/cream/flag palette.

| Route | Purpose |
|---|---|
| `/admin/login` | Email/password sign-in form |
| `/admin` | Redirects to `/admin/staff` |
| `/admin/staff` | Table list of coaches |
| `/admin/staff/new` | Create coach form |
| `/admin/staff/[id]` | Edit coach form |
| `/admin/plans` | Table list of plans |
| `/admin/plans/[id]` | Edit plan form (no "new" — plans map 1:1 to PushPress) |
| `/admin/gallery` | Grid of uploads with inline add/edit |

### Staff & Plans Forms

Standard forms: text inputs, textareas, tag-list input for arrays (certifications, items), image upload with preview, sort order number field.

### Gallery Page

No separate create/edit pages. Single grid view with:
- Drag-and-drop upload zone at top (images + video)
- Each item: thumbnail, caption field, sort order, visible toggle, delete button
- All editable inline

### Auth Flow

- Next.js middleware on `/admin/*` checks for a Firebase session cookie
- No cookie → redirect to `/admin/login`
- Login: `signInWithEmailAndPassword` → POST `/api/auth/login` → sets HTTP-only session cookie
- Logout: clears session cookie

## Public Site — Firestore Integration

### Data Fetching

`app/lib/firebase-admin.ts` exports three server-side functions:

```ts
fetchStaff()    // → staff docs, ordered by sortOrder
fetchPlans()    // → plan docs, ordered by sortOrder
fetchGallery()  // → gallery docs where visible=true, ordered by sortOrder
```

Each uses `{ next: { revalidate: 3600 } }` — 1 hour ISR cache.

### Fallback Strategy

If Firestore is unreachable, fall back to hardcoded data:
- `app/config/staff.ts` — current Andy + Maddie data
- `app/config/plans.ts` — already exists
- `app/config/gallery.ts` — current static image paths

### Changes to `app/page.tsx`

```ts
export default async function Home() {
  const prices = await fetchAllPrices();
  const staff = await fetchStaff();
  const plans = await fetchPlans();
  const gallery = await fetchGallery();

  return (
    // ...
    <U30Programs plans={plans} prices={prices} />
    <U30Staff staff={staff} />
    <U30Gallery gallery={gallery} />
  );
}
```

Components become pure render — data in via props, no client-side fetching on the public site.

### Pricing

PushPress remains the source of truth for live prices. Firestore stores `fallbackPrice` and `pushpressId`. At build time, `fetchAllPrices()` hits PushPress; if it fails, the Firestore `fallbackPrice` is used.
