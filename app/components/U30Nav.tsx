'use client';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Programs' },
  { href: '#training', label: 'Training' },
  { href: '#staff', label: 'Crew' },
  { href: '#locations', label: 'Locations' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#gallery', label: 'Gallery' },
];

export default function U30Nav() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Main navigation" className="flex items-center justify-between px-10 py-4 bg-cream text-ink border-b-2 border-ink sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue text-cream flex items-center justify-center font-display text-xl font-bold">
          U30
        </div>
        <div className="font-display text-[22px] tracking-wide">UNION 30</div>
      </div>
      <div className="hidden md:flex gap-6 font-mono text-[11px] tracking-wider uppercase font-semibold">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            className="hover:text-flag transition-colors cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>
      <a
        href="#programs"
        onClick={(e) => scrollTo(e, '#programs')}
        className="bg-ink text-cream border-none px-[18px] py-[10px] font-mono text-[11px] tracking-wider uppercase font-bold cursor-pointer hover:bg-flag hover:text-ink transition-colors"
      >
        Book &rarr;
      </a>
    </nav>
  );
}
