'use client';

import Image from 'next/image';
import U30VideoPlayer from './U30VideoPlayer';

export default function U30About() {
  const career = [
    ['2004–09', 'COLUMBUS CREW'],
    ['2010–12', 'CHIVAS USA'],
    ['2013–18', 'SPORTING KC'],
    ['2019–22', 'INDY ELEVEN'],
    ['—', 'USSF "A" LICENSE'],
    ['—', 'UK HALL OF FAME'],
  ];

  return (
    <section id="about" className="bg-paper text-ink py-[120px] px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image column */}
        <div>
          <div className="relative aspect-[4/5] bg-[#001033] overflow-hidden">
            <Image
              src="/Andy+Gruenebaum+Newcastle+United+v+Columbus+ysekvkZy-USl.jpg"
              alt="Andy Gruenebaum in kit"
              fill
              className="object-cover grayscale"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="relative aspect-square bg-blue overflow-hidden">
              <Image
                src="/hands_up.jpg"
                alt="MLS career"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square bg-ink overflow-hidden">
              <U30VideoPlayer
                thumbnail="/goalkeeper.jpeg"
                video="/bg.mp4"
                alt="Watch film session"
              />
            </div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">FILE / 01 — THE KEEPER</div>
          <h2 className="font-display text-[clamp(56px,7vw,96px)] leading-[0.9] mt-3 tracking-tight">
            TWENTY<br/>YEARS.<br/><span className="text-blue">ONE JOB.</span>
          </h2>
          <p className="text-base leading-[1.6] mt-8 max-w-[480px]">
            Andy came up through the University of Kentucky in the early 2000s,
            earned a pro contract with the Columbus Crew, and spent the next two
            decades in the MLS, NASL, and USL — stopping shots and learning every
            millimeter of the position.
          </p>
          <p className="text-base leading-[1.6] mt-4 max-w-[480px]">
            When he hung up the gloves in 2022, he had one mission: give Kentucky
            keepers the kind of pro-level development that used to mean leaving the state.
          </p>

          {/* Career timeline */}
          <div className="mt-10 grid grid-cols-2 gap-4 font-mono text-xs">
            {career.map(([year, club], i) => (
              <div key={i} className="flex gap-3 py-[14px] border-t border-ink">
                <span className="text-flag font-bold">{year}</span>
                <span className="font-semibold tracking-[0.5px]">{club}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
