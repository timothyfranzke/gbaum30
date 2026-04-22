'use client';

import Image from 'next/image';
import U30VideoPlayer from './U30VideoPlayer';
import type { GalleryDoc } from '@/app/lib/types';

interface AboutMedia {
  main: GalleryDoc | null;
  left: GalleryDoc | null;
  right: GalleryDoc | null;
}

// Fallback hardcoded media when no gallery items are tagged
const FALLBACK: AboutMedia = {
  main: { id: 'fb-main', fileUrl: '/Andy+Gruenebaum+Newcastle+United+v+Columbus+ysekvkZy-USl.jpg', caption: '', mediaType: 'video', sortOrder: 0, visible: true },
  left: { id: 'fb-left', fileUrl: '/hands_up.jpg', caption: 'MLS career', mediaType: 'image', sortOrder: 0, visible: true },
  right: { id: 'fb-right', fileUrl: '/goalkeeper.jpeg', caption: '', mediaType: 'video', sortOrder: 0, visible: true },
};

function MediaSlot({ item, fallbackVideo }: { item: GalleryDoc; fallbackVideo?: string }) {
  if (item.mediaType === 'video') {
    return (
      <U30VideoPlayer
        thumbnail={item.fileUrl}
        video={fallbackVideo || item.fileUrl}
        alt={item.caption || 'Video'}
      />
    );
  }
  return (
    <Image
      src={item.fileUrl}
      alt={item.caption || ''}
      fill
      className="object-cover"
    />
  );
}

export default function U30About({ aboutMedia }: { aboutMedia?: AboutMedia }) {
  const media = {
    main: aboutMedia?.main || FALLBACK.main!,
    left: aboutMedia?.left || FALLBACK.left!,
    right: aboutMedia?.right || FALLBACK.right!,
  };

  const career = [
    ['2006–13', 'COLUMBUS CREW'],
    ['2014', 'SPORTING KC'],
    ['2008', 'MLS CUP CHAMPION'],
    ['2010', 'COMEBACK PLAYER OF THE YEAR'],
    ['2012', 'DEFENDER & MVP OF THE YEAR'],
    ['—', 'BVN HALL OF FAME'],
  ];

  return (
    <section id="about" className="bg-paper text-ink py-[120px] px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
        {/* Image column */}
        <div className="flex flex-col">
          <div className="relative flex-1 min-h-[300px] bg-[#001033] overflow-hidden">
            <MediaSlot item={media.main} fallbackVideo="/bg.mp4" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="relative aspect-square bg-blue overflow-hidden">
              <MediaSlot item={media.left} />
            </div>
            <div className="relative aspect-square bg-ink overflow-hidden">
              <MediaSlot item={media.right} fallbackVideo="/bg.mp4" />
            </div>
          </div>
        </div>

        {/* Text column */}
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">FOUNDER</div>
          <h2 className="font-display text-[clamp(56px,7vw,96px)] leading-[0.9] mt-3 tracking-tight">
            TWENTY<br/>YEARS.<br/><span className="text-blue">ONE JOB.</span>
          </h2>
          <div className="font-mono text-[11px] tracking-[1.5px] text-flag uppercase mt-4">Andy Gruenebaum</div>
          <p className="text-base leading-[1.6] mt-6 max-w-[480px]">
            Andy was born and raised right here in Kansas City. He was an NSCAA All-American
            while helping Blue Valley North High School win the state title in 2000. He was
            honored to be a member of the Blue Valley North Hall of Fame. His dream has always
            been to play for his hometown team. He accomplished this dream, and now it is his
            mission to give back to THIS community that has given him so much.
          </p>
          <p className="text-base leading-[1.6] mt-4 max-w-[480px]">
            Andy had the privilege of playing in MLS for 9 years. He was honored to win MLS Cup
            in 2008 with the Columbus Crew, as well as earning Comeback Player of the Year in
            2010 (Hip Surgery), Defender of the Year in 2012, and Most Valuable Player in 2012.
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
