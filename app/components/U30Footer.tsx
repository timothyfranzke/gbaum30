'use client';

import U30Ticker from './U30Ticker';

export default function U30Footer() {
  return (
    <footer className="bg-ink text-cream">
      <U30Ticker items={['UNION 30', 'EST. 2022', 'LEXINGTON · LOUISVILLE', '#1 MATTERS']} bg="bg-blue" fg="text-cream" />
      <div className="font-display text-[clamp(100px,18vw,260px)] leading-[0.85] tracking-tight text-center px-5 pt-[60px] pb-5">
        BE<br/><span className="text-flag">THE WALL.</span>
      </div>
      <div className="px-10 py-[30px] border-t border-cream/15 flex flex-col md:flex-row justify-between font-mono text-[10px] tracking-[1.5px] uppercase text-muted gap-4">
        <span>&copy; 2025 UNION 30. All rights reserved.</span>
        <span>info@union30.com</span>
        <span>IG &middot; YT &middot; X &middot; FB</span>
      </div>
    </footer>
  );
}
