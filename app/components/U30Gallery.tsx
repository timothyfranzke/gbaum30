'use client';

import Image from 'next/image';

export default function U30Gallery() {
  return (
    <section id="gallery" className="bg-ink text-cream py-[120px] px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">THE REEL</div>
          <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            FOOTAGE.
          </h2>
        </div>
        <div className="font-mono text-[11px] text-muted tracking-wider">124 PHOTOS &middot; 18 FILMS</div>
      </div>

      <div className="grid gap-2 grid-cols-4 auto-rows-[180px]">
        <div className="col-span-2 row-span-2 relative overflow-hidden">
          <Image src="/diving_bg.png" alt="Andy — dive save" fill className="object-cover" />
        </div>
        <div className="relative overflow-hidden bg-flag">
          <Image src="/hands_up_2.png" alt="Gloves" fill className="object-cover" />
        </div>
        <div className="relative overflow-hidden bg-ink">
          <Image src="/soccer_net_bg.jpg" alt="Net / evening" fill className="object-cover" />
        </div>
        <div className="relative overflow-hidden">
          <Image src="/soccer.jpeg" alt="Camp huddle" fill className="object-cover" />
        </div>
        <div className="relative overflow-hidden">
          <Image src="/goalkeeper.jpeg" alt="Young keeper" fill className="object-cover" />
        </div>
        <div className="col-span-2 row-span-2 relative overflow-hidden">
          <Image src="/hands_up.jpg" alt="Camp team photo" fill className="object-cover" />
        </div>
        <div className="col-span-2 relative overflow-hidden">
          <Image src="/soccer_field.jpg" alt="Film session" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
