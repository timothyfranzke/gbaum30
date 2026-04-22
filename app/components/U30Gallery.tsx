'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const photoCount = gallery.filter(g => g.mediaType === 'image').length;
  const filmCount = gallery.filter(g => g.mediaType === 'video').length;

  // Build list of image-only indices for prev/next navigation
  const imageIndices = gallery
    .map((item, i) => (item.mediaType === 'image' ? i : -1))
    .filter(i => i !== -1);

  const currentImagePos = viewerIndex !== null ? imageIndices.indexOf(viewerIndex) : -1;

  const goNext = () => {
    if (currentImagePos === -1) return;
    const nextPos = (currentImagePos + 1) % imageIndices.length;
    setViewerIndex(imageIndices[nextPos]);
  };

  const goPrev = () => {
    if (currentImagePos === -1) return;
    const prevPos = (currentImagePos - 1 + imageIndices.length) % imageIndices.length;
    setViewerIndex(imageIndices[prevPos]);
  };

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
              <button
                onClick={() => setViewerIndex(i)}
                className="relative w-full h-full overflow-hidden group cursor-pointer"
                aria-label={item.caption || 'View image'}
              >
                <Image
                  src={item.fileUrl}
                  alt={item.caption || ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors" />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] tracking-wider text-cream">{item.caption}</span>
                  </div>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Single shared image viewer — controlled mode */}
      {viewerIndex !== null && (
        <U30ImageViewer
          key={viewerIndex}
          src={gallery[viewerIndex].fileUrl}
          alt={gallery[viewerIndex].caption || ''}
          caption={gallery[viewerIndex].caption || ''}
          isOpen={true}
          onClose={() => setViewerIndex(null)}
          onPrev={imageIndices.length > 1 ? goPrev : undefined}
          onNext={imageIndices.length > 1 ? goNext : undefined}
        />
      )}
    </section>
  );
}
