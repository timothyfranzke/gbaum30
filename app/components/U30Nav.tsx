'use client';

export default function U30Nav() {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-cream text-ink border-b-2 border-ink sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue text-cream flex items-center justify-center font-display text-xl font-bold">
          U30
        </div>
        <div className="font-display text-[22px] tracking-wide">UNION 30</div>
      </div>
      <div className="hidden md:flex gap-6 font-mono text-[11px] tracking-wider uppercase font-semibold">
        <a href="#about" className="hover:text-flag transition-colors cursor-pointer">Matchbook</a>
        <a href="#programs" className="hover:text-flag transition-colors cursor-pointer">Camps</a>
        <a href="#staff" className="hover:text-flag transition-colors cursor-pointer">Crew</a>
        <a href="#gallery" className="hover:text-flag transition-colors cursor-pointer">Film</a>
      </div>
      <a href="#booking" className="bg-ink text-cream border-none px-[18px] py-[10px] font-mono text-[11px] tracking-wider uppercase font-bold cursor-pointer hover:bg-flag hover:text-ink transition-colors">
        Book &rarr;
      </a>
    </nav>
  );
}
