'use client';

import type { GalleryDoc } from '@/app/lib/types';
import U30VideoPlayer from './U30VideoPlayer';
import U30ImageViewer from './U30ImageViewer';

// Grid spanning pattern: items at index 0 and 5 get col-span-2 row-span-2, item at index 6 gets col-span-2
function getSpanClass(index: number): string {
  if (index === 0 || index === 5) return 'col-span-2 row-span-2';
  if (index === 6) return 'col-span-2';
  return '';
}

export default function U30Gallery({ gallery }: { gallery: GalleryDoc[] }) {
  const photoCount = gallery.filter(g => g.mediaType === 'image').length;
  const filmCount = gallery.filter(g => g.mediaType === 'video').length;

  return (
    <section id="gallery" className="bg-ink text-cream py-[120px] px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">THE REEL</div>
          <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            FOOTAGE.
          </h2>
        </div>
        <div className="font-mono text-[11px] text-muted tracking-wider">
          {photoCount} PHOTOS{filmCount > 0 ? ` \u00B7 ${filmCount} FILMS` : ''}
        </div>
      </div>

      <div className="grid gap-2 grid-cols-4 auto-rows-[180px]">
        {gallery.map((item, i) => (
          <div key={item.id} className={`${getSpanClass(i)} relative overflow-hidden`}>
            {item.mediaType === 'video' ? (
              <U30VideoPlayer
                thumbnail={item.fileUrl}
                video={item.fileUrl}
                alt={item.caption || 'Video'}
              />
            ) : (
              <U30ImageViewer
                src={item.fileUrl}
                alt={item.caption || ''}
                caption={item.caption || ''}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
