'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type ModalState = 'closed' | 'loading' | 'open' | 'closing';

interface U30ImageViewerProps {
  src: string;
  alt?: string;
  caption?: string;
}

export default function U30ImageViewer({ src, alt = '', caption }: U30ImageViewerProps) {
  const [state, setState] = useState<ModalState>('closed');
  const modalRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setState('loading');
    // Small delay to let corners animate, then reveal
    setTimeout(() => setState('open'), 100);
  }, []);

  const close = useCallback(() => {
    setState('closing');
    setTimeout(() => setState('closed'), 500);
  }, []);

  // Escape key
  useEffect(() => {
    if (state === 'closed') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, close]);

  // Lock body scroll
  useEffect(() => {
    if (state !== 'closed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state]);

  // Focus
  useEffect(() => {
    if (state === 'loading' || state === 'open') {
      modalRef.current?.focus();
    }
  }, [state]);

  const isOpen = state !== 'closed';
  const isFramed = state === 'open';
  const isClosing = state === 'closing';

  return (
    <>
      {/* Thumbnail */}
      <button
        onClick={open}
        className="relative w-full h-full overflow-hidden group cursor-pointer"
        aria-label={alt || 'View image'}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/0 transition-colors" />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono text-[10px] tracking-wider text-cream">{caption}</span>
          </div>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 outline-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            onClick={close}
            className={`absolute inset-0 bg-ink/90 backdrop-blur-sm transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 z-10 font-mono text-flag text-sm tracking-[1.5px] font-bold hover:text-cream transition-colors cursor-pointer"
            aria-label="Close image"
          >
            &#10005; CLOSE
          </button>

          {/* Corner marks */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-7 h-7 border-t-2 border-l-2 border-flag transition-all duration-500"
              style={{
                top: isFramed ? '8%' : '50%',
                left: isFramed ? '8%' : '50%',
                transform: isFramed ? 'translate(0, 0)' : 'translate(-100%, -100%)',
                opacity: isClosing ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <div
              className="absolute w-7 h-7 border-t-2 border-r-2 border-flag transition-all duration-500"
              style={{
                top: isFramed ? '8%' : '50%',
                right: isFramed ? '8%' : '50%',
                transform: isFramed ? 'translate(0, 0)' : 'translate(100%, -100%)',
                opacity: isClosing ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <div
              className="absolute w-7 h-7 border-b-2 border-l-2 border-flag transition-all duration-500"
              style={{
                bottom: isFramed ? '8%' : '50%',
                left: isFramed ? '8%' : '50%',
                transform: isFramed ? 'translate(0, 0)' : 'translate(-100%, 100%)',
                opacity: isClosing ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <div
              className="absolute w-7 h-7 border-b-2 border-r-2 border-flag transition-all duration-500"
              style={{
                bottom: isFramed ? '8%' : '50%',
                right: isFramed ? '8%' : '50%',
                transform: isFramed ? 'translate(0, 0)' : 'translate(100%, 100%)',
                opacity: isClosing ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>

          {/* Image container */}
          <div className="absolute inset-[8%] flex flex-col items-center justify-center">
            <div className={`relative max-w-full max-h-full flex-1 w-full transition-opacity duration-400 ${
              isFramed ? 'opacity-100' : 'opacity-0'
            }`}>
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
              />
            </div>
            {caption && isFramed && (
              <div className="mt-4 font-mono text-[11px] tracking-wider text-cream/70 text-center">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
