# Consent Management & Privacy Design — Union 30

**Date:** 2026-06-28
**Status:** Approved design, ready for implementation
**Scope:** US-only audience (Overland Park, KS). Analytics deferred ("maybe later"). Full scope: legal pages, form consent + audit trail + abuse protection, hygiene fixes, and a dormant, drop-in consent-banner architecture.

---

## 1. Context — what the audit found

Union 30 is Andy Gruenebaum's youth goalkeeper training business. Stack: Next.js 16 + Firebase (Auth/Firestore/Storage) + PushPress, one marketing page plus a Firebase-auth admin.

**Data-collection surfaces inventoried:**

| Surface | Behavior | Implication |
|---|---|---|
| Contact/booking form (`U30Booking` → `/api/contact`) | Collects parent name, email, **player name, player age**, program, experience, notes → Firestore `contacts` + email via Franzke Creative cloud function | PII incl. a **minor's data** — primary obligation |
| Admin auth (`/api/auth/login`) | Sets `__session` cookie (httpOnly, secure, sameSite=lax) | **Strictly-necessary cookie — exempt from consent** |
| YouTube/Vimeo embeds (`U30Announcement` iframe) | Renders when an announcement has a video | Third-party tracking cookies when active |
| Google Fonts `<link>` in `layout.tsx` | Loads Bebas Neue from `fonts.googleapis.com` at runtime | Leaks visitor IP to Google |
| PushPress (`pushpress.ts` + program links) | Server-side price scrape; enrollment/payment happens off-site on pushpress.com | Governed by PushPress's own policy |
| Stripe (`/api/products`) | Imported but dormant — no live checkout | None currently |
| Map (`Map.tsx`) | Inline SVG, no Google Maps | None |
| Newsletter (`Newsletter.tsx`) | No-op (`alert` only), not on live page | None |

**Key finding:** No analytics is actually running. `firebase/analytics` / `getAnalytics` is never imported and `.env.local` has no measurement ID. The site sets **no analytics or advertising cookies today** — the category that normally forces a consent banner.

**Conclusion:** US-only + analytics-deferred means **no GDPR-style cookie wall is required today**. The real obligations are a privacy policy, children's-data handling, and conditional handling for video embeds. Build a US-first posture that is *consent-banner-ready* for the day GA4 is enabled.

---

## 2. Architecture & file layout

Additive — no changes to existing data flows.

**New files:**
```
app/privacy/page.tsx            → Privacy Policy (static server component)
app/terms/page.tsx              → Terms of Service (static server component)
app/accessibility/page.tsx      → Accessibility statement (static server component)
app/lib/consent.tsx             → ConsentProvider + useConsent() hook
app/components/ConsentBanner.tsx → dormant cookie banner (active only behind env flag)
```

**Edited files:**
```
app/components/U30Booking.tsx   → parent-consent checkbox + privacy link + Turnstile
app/api/contact/route.ts        → validation, Turnstile verify, rate limit, audit fields
app/components/U30Footer.tsx    → Privacy / Terms / Accessibility links, mailto
app/components/U30Announcement.tsx → youtube-nocookie + Vimeo dnt=1
app/layout.tsx                  → ConsentProvider wrap, self-host Bebas Neue, drop Google Fonts <link>
env.sample                      → NEXT_PUBLIC_ANALYTICS_ENABLED, Turnstile keys
```

**Principles:**
- Policy pages are static server components — no JS, cacheable, SEO-friendly, clean `/privacy`, `/terms`, `/accessibility` URLs.
- Consent state is client-side only and **opt-in**: nothing fires until the user clicks Accept.
- The banner is **dormant by default** — ships but renders nothing and touches no storage until `NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'`.
- No CMP vendor (Cookiebot/OneTrust). The only new runtime dependency is Cloudflare Turnstile (spam protection).

---

## 3. Consent layer (Tier 2 — architect now, activate later)

### `app/lib/consent.tsx` — context + hook

```tsx
'use client';
type Consent = { analytics: boolean; decided: boolean };
```

- **Storage is gated behind the feature flag.** When `NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true'`, the provider holds in-memory defaults (`{ analytics: false, decided: false }`) and **reads/writes no cookie or localStorage at all** — the site creates zero client-side storage today.
- When the flag is `'true'`, the provider reads `localStorage['u30-consent']` on mount and persists choices there. This `localStorage` entry is itself strictly-necessary (it records the user's consent decision) and only exists once a consent-controlled feature is enabled.
- Exposes `useConsent()` → `{ analytics, decided, accept(), reject(), reset() }`.
- **Opt-in default:** `analytics: false` until `accept()`. `accept()` → `{ analytics: true, decided: true }`; `reject()` → `{ analytics: false, decided: true }`. Both stamp a version so the prompt can re-appear if the policy materially changes.

### `app/components/ConsentBanner.tsx` — dormant banner

- First line: `if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true') return null;` — invisible and inert today.
- When active and `!decided`: bottom-fixed bar in the Union 30 idiom (ink bg, flag-orange Accept, mono type). Copy: "We'd like to use analytics cookies to improve the site. Accept / Decline" + link to `/privacy`.
- Once decided, stays hidden (no nagging).

### Activating analytics later (documented, not built now)

```tsx
const { analytics } = useConsent();
{analytics && <Script src="…gtag…" strategy="afterInteractive" />}
```

Flip `NEXT_PUBLIC_ANALYTICS_ENABLED=true`, add the GA4 `<Script>` gated on `useConsent().analytics`. **Opt-in:** nothing loads until the visitor clicks Accept. No refactor required.

---

## 4. Form consent, audit trail & abuse protection (Tier 1 — primary obligation)

### Legal framing (important)

This implements **safeguards that support compliance** and is substantially better than no consent. It is **not** a categorical guarantee of COPPA compliance. Whether parental consent is legally "verifiable" depends on the FTC's approved methods, what is collected, how it is used/disclosed, and actual-knowledge factors. **Recommend legal review of the final wording.**

### Stronger consent wording (two parts)

- Instructional line above the form: *"This form must be completed by a parent or legal guardian."*
- Required checkbox: *"I certify that I am the parent or legal guardian of the player named above, and I consent to Union 30 collecting this information to respond to my inquiry. I have read the [Privacy Policy](/privacy)."*

Submit is blocked until `consent === true`.

### Audit record written to the `contacts` document

```js
{
  ...existingFields,
  consent: true,
  consentText: "<exact wording shown to the user>",
  privacyPolicyVersion: "2026-06-28",  // bump when policy changes
  consentAt: <server timestamp, not browser>,
  ipHash: sha256(ip + salt),           // hashed — audit without storing raw PII
  userAgent: request.headers['user-agent'],
}
```

Snapshotting the exact wording + policy version means old records prove precisely what each parent agreed to, even after the copy changes.

### Server-side hardening in `/api/contact` (never trust the browser)

- **Validation:** required fields present; `trim()` all strings; email format regex; max lengths (e.g. notes ≤ 2000); age within a sane range; reject `consent !== true` with 400.
- **Spam — Cloudflare Turnstile** (recommended; free, privacy-friendly, no consent cookie required as strictly-necessary security). Token from the form is verified server-side via `siteverify` before any write. hCaptcha / reCAPTCHA v3 are alternatives. This is the one new runtime dependency (a `<Script>` + verify call + two env keys).
- **Rate limiting:** ~5 req/min/IP (or 10/hr), keyed by IP.

### Admin safety

The contacts admin view renders submissions as **text only** — React escapes by default; never `dangerouslySetInnerHTML` these fields — so a `<script>` payload cannot execute.

### Retention

Stated policy: delete contact records after up to **24 months** unless deletion is requested sooner or longer retention is required for legal/operational reasons. Ideally a scheduled cleanup job later.

---

## 5. Privacy Policy, Terms & Accessibility content (real, tailored text)

Tailored to actual data flows, not boilerplate. Future-proofed wording throughout ("currently collect", not "only collect").

### `/privacy` — canonical section order

1. **Information We Collect** — *"We currently collect the following when you submit our contact form…"* (parent name/email, player name/age, program, experience, message). Security data: *"a hashed version of your IP address and your browser's user-agent, for spam prevention and security auditing."*
2. **How We Use Information** — to respond to your inquiry and operate our business; no sale or marketing-sharing.
3. **Children's Privacy** — form is for parents/guardians; player first name + age collected only to respond; we do not knowingly collect directly from children; deletion on request.
4. **Cookies & Tracking Technologies** — *"We do not currently use advertising or analytics cookies. If this changes, we will update this policy and request consent where required."* Only a strictly-necessary admin session cookie + (when enabled) a consent-preference record. *"We do not currently respond to Do Not Track signals."*
5. **Third-Party Service Providers** — Firebase/Google (hosting/database/storage, US), email function (Franzke Creative), PushPress (their policy governs enrollment), Cloudflare Turnstile (spam).
6. **Security** — commercially-reasonable administrative/technical/physical safeguards; HTTPS in transit; "no method is 100% secure." Sub-note **Automated Security Measures**: spam detection, rate limiting, bot protection, log monitoring — disclosed as processing of personal information.
7. **Data Retention** — *"…up to 24 months unless you request deletion sooner or a longer retention period is required for legal or operational reasons."*
8. **Your Privacy Rights** — email `info@union30.com` to access or delete; plain-English CA/state-resident rights nod; "we do not sell your data."
9. **International Visitors** — *"This website is intended for visitors located in the United States."*
10. **Third-Party Links** — *"Our website may link to third-party services. We are not responsible for their privacy practices."*
11. **Policy Updates** — version-dated (ties to `privacyPolicyVersion`).
12. **Contact Information** — Union 30, Overland Park, KS; `info@union30.com`.

Note a brief processing-basis sentence: *"We process information to respond to your inquiry and operate our business."* And: *"Information submitted through our forms is transmitted using encrypted HTTPS connections."*

### `/terms`

Lightweight, plus: **Intellectual Property** (all content owned by Union 30 unless noted), **Liability** (*"participation in athletic training carries inherent risks"*), **Accuracy** (training schedules and pricing may change), **External Links** (PushPress), **Severability**, **Changes**, governing law = **Kansas**, contact.

### `/accessibility`

Short ADA-conscious statement + contact for accommodation requests. (Existing `accessibility.html` and prior a11y commit can be folded in.) Cheap insurance — sports orgs are increasingly ADA-litigation targets.

All three are static server components, version-dated, styled to the site (mono headings, cream/ink).

---

## 6. Hygiene fixes & footer wiring

1. **Self-host all fonts.** `layout.tsx` self-hosts Inter + JetBrains via `next/font` but also runtime-loads **Bebas Neue** from `fonts.googleapis.com`, leaking IPs to Google. Add Bebas Neue to `next/font/google`, wire it to `--font-display`, and delete the four `<link>`/`<preconnect>` tags. Result: no runtime Google connection, faster paint.
2. **`youtube-nocookie` for announcement videos.** In `U30Announcement.tsx`, switch the YouTube embed builder from `youtube.com/embed/` to `youtube-nocookie.com/embed/`, and add `dnt=1` to the Vimeo embed. This **reduces passive tracking before playback** (it does not eliminate all tracking once a video is played).
3. **Footer links.** Add a row — **Privacy · Terms · Accessibility** — to `U30Footer` in the existing mono/muted style; make `info@union30.com` a `mailto:` link.
4. **Wire the provider.** Wrap `{children}` in `<ConsentProvider>` and render `<ConsentBanner />` once in `layout.tsx` (both inert until the env flag). Add `NEXT_PUBLIC_ANALYTICS_ENABLED=false` and Turnstile keys to `env.sample` with explanatory comments.

---

## 7. Complete picture

- **Today:** privacy / terms / accessibility pages; parent-consent + audit trail + Turnstile + rate limiting + validation on the form; font and video hygiene; footer links. The site is tracker-free, creates no non-essential client storage, and is defensible.
- **Later:** set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` + add a GA4 `<Script>` gated on `useConsent().analytics` → the opt-in banner activates, and nothing fires until the visitor clicks Accept.

---

## 8. Appendix — reusable approach (agency standard)

This project follows an **inventory-driven** method: inspect the site's real data flows first, then generate a policy that documents them — instead of generic boilerplate that drifts from the implementation. For each project, inventory every: contact form, cookie, third-party script, external API, embedded widget, analytics provider, auth provider, payment provider, file upload, and location where personal data is stored. Generate the Privacy Policy from that inventory so it stays aligned with the code.

> All legal copy in this design should be reviewed by qualified counsel before publication.
