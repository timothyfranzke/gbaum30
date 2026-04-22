'use client';

import Image from 'next/image';
import U30Ticker from './U30Ticker';

export default function U30Hero() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="relative h-[85vh] md:h-[760px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/AGDC_bg.png"
            alt="Goalkeeper diving save"
            fill
            className="object-cover md:object-contain object-center lg:object-right"
            priority
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/95" />

        {/* Corner frame marks */}
        <div className="absolute top-6 left-6 w-7 h-7 border-t-2 border-l-2 border-flag" />
        <div className="absolute top-6 right-6 w-7 h-7 border-t-2 border-r-2 border-flag" />
        <div className="absolute bottom-[160px] left-6 w-7 h-7 border-b-2 border-l-2 border-flag" />
        <div className="absolute bottom-[160px] right-6 w-7 h-7 border-b-2 border-r-2 border-flag" />

        {/* Broadcast HUD top */}
        <div className="absolute top-6 left-20 flex gap-4 items-center font-mono text-[11px] tracking-[1.5px] uppercase">
          <span className="bg-flag text-ink px-[10px] py-1 font-bold">&#9679; LIVE</span>
          <span>UNION30 &mdash; EST. 2017</span>
        </div>

        {/* Main headline */}
        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-[140px] md:pb-[180px]">
          <h1 className="font-display text-[clamp(80px,10vw,140px)] leading-[0.85] tracking-tight text-cream">
            COMPLETE<br/>GOALKEEPER<br/>
            <span className="text-flag">DEVELOPMENT.</span>
          </h1>
          <p className="font-sans text-lg mt-6 max-w-[520px] text-cream/85 leading-[1.45]">
            Built on community. Sharpened by competition. Grown through reps, mistakes, and shared passion.
          </p>
        </div>

        {/* Bottom scoreboard */}
        <div className="absolute bottom-0 left-0 right-0 bg-ink border-t-2 border-flag px-10 py-5 grid grid-cols-[auto_1fr_auto] gap-10 items-center">
          <div className="flex items-center gap-5">
            <div className="w-[52px] h-[52px] bg-blue flex items-center justify-center font-display text-[28px] text-cream">01</div>
            <div>
              <div className="font-mono text-[10px] tracking-[1.5px] text-muted">FOUNDER</div>
              <div className="font-display text-[22px] tracking-wide">ANDY GRUENEBAUM</div>
            </div>
          </div>
          <div className="hidden md:flex gap-8 justify-center font-display">
            {['GRASSROOTS', 'CLUB', 'COLLEGE', 'PRO'].map(level => (
              <div key={level} className="text-center">
                <div className="text-2xl leading-none text-flag">{level}</div>
              </div>
            ))}
          </div>
          <a href="#programs" className="bg-flag text-ink border-none px-7 py-4 font-mono text-xs tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors">
            Train Now &rarr;
          </a>
        </div>
      </div>

      <U30Ticker items={['Grassroots', 'Club', 'College', 'Pro', 'Game Film Analysis', 'All Over the Country']} />
    </section>
  );
}
