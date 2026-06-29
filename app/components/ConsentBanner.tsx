'use client';

import Link from 'next/link';
import { CONSENT_ENABLED, useConsent } from '@/app/lib/consent';

/**
 * Cookie consent banner — dormant until NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'.
 *
 * While disabled it renders nothing (and the provider stores nothing), so the
 * site is consent-banner-ready with zero UX or storage impact today. When
 * enabled it prompts on first visit; analytics scripts elsewhere gate on
 * useConsent().analytics, which stays false until the visitor clicks Accept.
 */
export default function ConsentBanner() {
  // Hook order must stay stable, so call it before the early return.
  const { decided, accept, reject } = useConsent();

  if (!CONSENT_ENABLED || decided) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] bg-ink text-cream border-t border-cream/15 px-6 py-5"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="font-mono text-[11px] tracking-[0.5px] leading-relaxed text-cream/80">
          We&apos;d like to use analytics cookies to understand how the site is used and
          improve it. You can change your mind anytime. See our{' '}
          <Link href="/privacy" className="underline text-flag hover:text-cream">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="px-5 py-3 font-mono text-[11px] tracking-[1.5px] uppercase border-2 border-cream text-cream hover:border-flag hover:text-flag transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-5 py-3 font-mono text-[11px] tracking-[1.5px] uppercase bg-flag text-ink font-bold hover:bg-cream transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
