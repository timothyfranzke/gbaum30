'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * Consent layer — opt-in by design.
 *
 * Nothing tracked until the visitor explicitly accepts. The provider is also
 * fully dormant unless NEXT_PUBLIC_ANALYTICS_ENABLED === 'true': while disabled
 * it holds in-memory defaults and reads/writes NO cookies or localStorage, so
 * the site creates zero non-essential client storage today. Once a
 * consent-controlled feature (analytics) is enabled, the single
 * `u30-consent` localStorage record persists the user's choice — itself
 * strictly necessary because it exists only to honor that choice.
 */

export const CONSENT_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

// Bump when the consent prompt's meaning materially changes — re-prompts users.
export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'u30-consent';

type StoredConsent = { analytics: boolean; decided: boolean; version: number };

type ConsentValue = {
  analytics: boolean;
  decided: boolean;
  accept: () => void;
  reject: () => void;
  reset: () => void;
};

const DEFAULTS: StoredConsent = { analytics: false, decided: false, version: CONSENT_VERSION };

const ConsentContext = createContext<ConsentValue | null>(null);

function read(): StoredConsent {
  if (!CONSENT_ENABLED || typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as StoredConsent;
    // A consent recorded against an older version is treated as undecided.
    if (parsed.version !== CONSENT_VERSION) return DEFAULTS;
    return { analytics: !!parsed.analytics, decided: !!parsed.decided, version: CONSENT_VERSION };
  } catch {
    return DEFAULTS;
  }
}

function persist(value: StoredConsent) {
  if (!CONSENT_ENABLED || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, etc.) — degrade silently */
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredConsent>(DEFAULTS);

  // Hydrate from storage after mount (avoids SSR/client mismatch).
  useEffect(() => {
    if (CONSENT_ENABLED) setState(read());
  }, []);

  const set = useCallback((analytics: boolean) => {
    const next: StoredConsent = { analytics, decided: true, version: CONSENT_VERSION };
    setState(next);
    persist(next);
  }, []);

  const accept = useCallback(() => set(true), [set]);
  const reject = useCallback(() => set(false), [set]);
  const reset = useCallback(() => {
    setState(DEFAULTS);
    if (CONSENT_ENABLED && typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <ConsentContext.Provider
      value={{ analytics: state.analytics, decided: state.decided, accept, reject, reset }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
