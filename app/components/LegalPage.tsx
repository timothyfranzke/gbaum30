import Link from 'next/link';

/**
 * Shared shell for the static legal pages (privacy / terms / accessibility).
 * Server component — no client JS. Styled to match the Union 30 system.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ink text-cream min-h-screen">
      <header className="border-b border-cream/15 px-6 sm:px-10 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[1.5px] uppercase text-muted hover:text-flag transition-colors"
          >
            &larr; Union 30
          </Link>
          <h1 className="font-display text-[clamp(48px,9vw,96px)] leading-[0.9] tracking-tight mt-4">
            {title}
          </h1>
          {updated && (
            <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-muted mt-4">
              Last updated: {updated}
            </p>
          )}
        </div>
      </header>
      <main className="px-6 sm:px-10 py-12">
        <div className="legal-prose max-w-3xl mx-auto text-cream/85 leading-relaxed text-[15px] space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}

/** A titled section block used inside LegalPage. */
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-mono text-[12px] tracking-[1.5px] uppercase text-flag font-bold">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
