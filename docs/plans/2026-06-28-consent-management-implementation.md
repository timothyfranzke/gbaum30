# Consent Management — Implementation Plan

**Branch:** `consent-management` (worktree `../gbaum30-consent`)
**Design:** `docs/plans/2026-06-28-consent-management-design.md`
**Approach:** Bottom-up — primitives first (consent layer, hygiene), then content pages, then the form (highest-risk), wiring last. Each phase ends green (`npm run build`) and is independently committable.

---

## Phase 0 — Prep
- [ ] Confirm worktree builds clean: `npm run build`.
- [ ] Copy `.env.local` from main checkout (gitignored, not in worktree) if local runtime testing is needed.
- [ ] Add to `env.sample`:
  - `NEXT_PUBLIC_ANALYTICS_ENABLED=false` (comment: flip to `true` to activate the opt-in consent banner + analytics gating)
  - `TURNSTILE_SITE_KEY=` / `TURNSTILE_SECRET_KEY=` (comment: Cloudflare Turnstile, free spam protection)
  - `CONTACT_IP_SALT=` (comment: random salt for hashing submitter IPs)

## Phase 1 — Consent layer (dormant, no storage until enabled)
- [ ] `app/lib/consent.tsx` — `'use client'` `ConsentProvider` + `useConsent()`.
  - In-memory default `{ analytics: false, decided: false }`.
  - **Only** read/write `localStorage['u30-consent']` when `process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'`. Otherwise touch no storage.
  - Expose `accept()`, `reject()`, `reset()`; stamp a version constant for re-prompts.
- [ ] `app/components/ConsentBanner.tsx` — `return null` unless flag is `'true'`; else render bottom bar (ink bg, flag-orange Accept, mono type) with `/privacy` link when `!decided`.
- [ ] Verify: with flag false, `document.cookie` and `localStorage` stay empty on the public page.

## Phase 2 — Hygiene fixes
- [ ] `app/layout.tsx`: add `Bebas_Neue` via `next/font/google` → `--font-display`; delete the 4 `<link>`/`<preconnect>` Google Fonts tags. Grep CSS for `--font-display` / Bebas usage to confirm the variable name matches `globals.css`.
- [ ] `app/components/U30Announcement.tsx`: `youtube.com/embed/` → `youtube-nocookie.com/embed/`; add `?dnt=1` to Vimeo embed URL.
- [ ] Verify no remaining runtime calls to `fonts.googleapis.com`.

## Phase 3 — Legal/content pages (static server components)
- [ ] `app/privacy/page.tsx` — 12 sections per design §5, future-proof wording, `export const PRIVACY_VERSION = '2026-06-28'` (import into the contact route).
- [ ] `app/terms/page.tsx` — incl. IP, Liability, Accuracy, External Links, Severability, Changes, KS governing law.
- [ ] `app/accessibility/page.tsx` — ADA statement + accommodation contact (fold in existing `accessibility.html`).
- [ ] Add `Metadata` (title/description, `robots` index) to each; style with mono headings, cream/ink.

## Phase 4 — Contact form hardening (highest risk)
- [ ] `app/components/U30Booking.tsx`:
  - Add `consent: false` to form state; required checkbox with certification wording + `/privacy` link; block submit until `consent === true`.
  - Add Turnstile widget (`@marsidev/react-turnstile` or raw script); include token in POST body.
- [ ] `app/api/contact/route.ts`:
  - Destructure + require `consent === true` (400 otherwise) and Turnstile token.
  - **Validation:** trim strings, email regex, max lengths (notes ≤ 2000), age range, required fields.
  - **Turnstile:** POST token to `https://challenges.cloudflare.com/turnstile/v0/siteverify`; reject on failure.
  - **Rate limit:** ~5/min/IP (in-memory LRU or Firestore counter; note Edge/Node runtime constraints).
  - **Audit fields** to Firestore doc: `consent`, `consentText`, `privacyPolicyVersion` (import `PRIVACY_VERSION`), `consentAt` (server time), `ipHash` = `sha256(ip + CONTACT_IP_SALT)`, `userAgent`.
  - Keep existing honeypot.
- [ ] Confirm admin contacts view renders fields as text only (no `dangerouslySetInnerHTML`) — §4.

## Phase 5 — Wiring & footer
- [ ] `app/layout.tsx`: wrap `{children}` in `<ConsentProvider>`; render `<ConsentBanner />` once.
- [ ] `app/components/U30Footer.tsx`: add **Privacy · Terms · Accessibility** link row (mono/muted); make `info@union30.com` a `mailto:`.

## Phase 6 — Verify
- [ ] `npm run build` clean; `npm run lint`.
- [ ] Manual: submit form without checkbox (blocked) → with checkbox (succeeds, audit fields present in Firestore).
- [ ] Confirm flag-off → no cookies/localStorage on public page; flag-on → banner appears, Accept persists, nothing tracked before Accept.
- [ ] Confirm `/privacy`, `/terms`, `/accessibility` render and are linked from footer.

---

## Risks / notes
- **Rate limiting** in a serverless/Edge context has no shared memory — may need Firestore-backed counters or a hosting-level limit. Flag if in-memory proves insufficient.
- **Turnstile** adds the only new npm dependency; confirm acceptable before installing.
- **Legal copy** is drafted for counsel review, not a substitute for it.
- Do not touch existing data flows beyond the listed edits.
