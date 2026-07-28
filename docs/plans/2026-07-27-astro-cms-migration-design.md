# Union 30: Next.js → Astro + Gigawatt CMS Migration Design

**Date:** 2026-07-27
**Status:** Validated design, not yet implemented

## Summary

Replace the current Next.js 16 site (Firebase App Hosting, Firestore content, custom
`/admin`) with a fully static Astro site in a **new sibling repo** (`union30-site`),
hosted on **Netlify**, pulling all content and structure from **gigawatt-cms** as a new
tenant `union30`. The custom Firebase admin, Firestore collections, auth, middleware,
and API routes are retired entirely.

## Decisions (validated)

| Question | Decision |
|---|---|
| Firebase content system | Fully replaced by gigawatt-cms; no Firestore, no custom admin |
| Hosting | Netlify, matching the other four CMS consumer sites |
| CMS block gaps | Extend the CMS: new `locationsMap` block + video support in `gallery` |
| Pricing | Managed in the CMS (drop the PushPress `__NEXT_DATA__` scraper); PushPress signup links as CTAs |
| Contact form | Netlify Forms (drops Turnstile and the Firestore consent audit trail) |
| Repo | New sibling repo, not an in-place conversion |
| Consent banner | Keep (future analytics via seo-settings GA/Plausible fields) |

## Architecture

- **Static Astro site**, Tailwind CSS v4 (CSS-first config ported from `app/globals.css`
  with existing tokens: `--blue #0033A0`, `--flag #FEDD00`, `--cream #F4EDE0`,
  `--ink #05070E`, etc.).
- **Build-time data:** `src/lib/payload.ts` (modeled on pathway-academy's — typed
  fetchers, `mediaSrcset()` from CMS-generated 400/800/1600w WebP sizes,
  `MOCK_CONTENT=1` fixture mode, hard-fail on missing required content) fetches
  published pages, navigation, footer, seo-settings, team-members, programs,
  announcements, and redirects filtered by `where[tenant.slug][equals]=union30`.
- **Rendering:** one catch-all `src/pages/[...slug].astro` with `getStaticPaths` from
  CMS pages (`type: 'home'` slug maps to `/`). `BlockRenderer.astro` maps `blockType`
  → block component; unknown types warn and skip (pathway pattern).
- **Runtime:** zero server code. Client islands only (kept in **React** via
  `@astrojs/react` — code ports nearly unchanged): nav mobile toggle, locations map
  hover/select, gallery + image/video viewer, announcement modal (localStorage dismiss
  + date window), booking form client validation.
- **Rebuild-on-publish:** the CMS's existing per-tenant Netlify build hook
  (`src/hooks/triggerBuild.ts`, 4s debounce) fires on publish.

## CMS changes (gigawatt-cms repo)

1. **New tenant** `union30` — name "Union 30", brand colors above, `netlifyBuildHook`
   set after the Netlify site exists. One `client-editor` user scoped to the tenant.
2. **New `locationsMap` block:**
   `{ eyebrow?, heading?, intro?, locations: [{ name, city, state (2-letter), note?, href? }] }`.
   The US SVG path geometry (`path-data.json`, currently served by `/api/map`) ships as
   a static asset in the Astro repo — geometry is not content. The renderer joins
   location `state` codes to map paths.
3. **Gallery video support:** extend the `gallery` block's items with optional
   `videoUrl` + `poster`, keeping the existing image field (backward-compatible for
   other tenants).
4. Both are additive schema changes → one Postgres migration in `src/migrations/`.

## Page modeling

- **Home** (`type: generic`): `hero` → `marquee` (ticker) → `richText` (about) →
  `programLadder`/`process` (How We Train) → `locationsMap` → `teamGrid` →
  `testimonials` → `gallery` → `pricing` → `ctaBand` (booking heading; the form itself
  is site code).
- **Legal pages** (`/privacy`, `/terms`, `/accessibility`): `generic` pages of
  `richText` blocks. **Must be rewritten** to describe the new data flow — Netlify
  processes form submissions; no Turnstile, no hashed-IP audit records, no Firestore.
  (Agency standard: policies reflect the real data-flow inventory.)
- **Announcements:** move to the announcements collection (date-windowed, `draft`
  defaults true — seed with `draft: false` explicitly).
- **Staff:** team-members collection (real bios from `app/config/staff.ts` + Firestore
  `staff`), rendered via `teamGrid`.
- **Pricing:** CMS `pricing` block (or programs collection) with PushPress signup URLs
  as `monthlyLink`/CTA values.

## Not ported

- 21 dead components (`Hero_a/b/c`, variants, `InteractiveImage`, etc.), the orphaned
  `/staff` page, all `/admin` pages and routes, `middleware.ts`, the Stripe products
  route (dead), the PushPress scraper (`app/lib/pushpress.ts`), Firebase Functions
  (empty), and `next/og` — replaced by a pre-rendered static 1200×630 PNG.
- Fonts: self-host Bebas Neue, Inter, JetBrains Mono via `@fontsource` (fixes the
  current double-loading and the Turbopack Google-Fonts issue).

## Contact form

Netlify Forms with a honeypot field and Netlify spam filtering; email notification to
the site owner. Client-side validation stays in the React island. This drops Cloudflare
Turnstile, the per-IP rate limiter, the `sendEmail` cloud-function proxy, and the
Firestore consent audit — accepted trade-off; legal pages updated accordingly.

## Seeding (`scripts/seed-union30.mjs`)

Follows `gigawatt-cms/docs/tenant-seeding.md` and the c26 seed pattern: login as
`client-editor`, then idempotent upserts in dependency order — media (from Firebase
Storage + `/public`, multipart with required alt text) → team-members → programs →
announcements → navigation → footer → seo-settings → pages with block layouts (copy
lifted from current JSX: `U30Hero`, `U30About`, `U30Testimonials`, `U30HowWeTrain`,
`U30Locations` `LOCATIONS` array).

## Netlify setup

- Env: `PAYLOAD_URL`, `PAYLOAD_TENANT=union30`.
- Forms enabled with email notification; build hook URL stored in the tenant record.
- Redirects fetched from the CMS redirects collection at build time
  (gigawatt-labs `astro.config.mjs` pattern).

## Cutover

1. Build and verify on the Netlify subdomain against production CMS content; visual
   side-by-side with the live site.
2. Point DNS.
3. After a safe interval: decommission Firebase App Hosting, **export the Firestore
   `contacts` collection first** (existing consent audit records), then delete
   Firestore data and pause old secrets.

## Testing

- `MOCK_CONTENT=1` fixture mode for local dev without the CMS.
- Build-time assertions: home page, navigation, footer, and seo-settings must exist for
  the tenant (hard-fail, pathway-style).
- Lighthouse pass; Netlify Forms submission test (including spam-filter behavior).
