'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type ModalState = 'closed' | 'loading' | 'playing' | 'closing';

interface U30VideoPlayerProps {
  thumbnail: string;
  video: string;
  alt?: string;
  poster?: string;
}

export default function U30VideoPlayer({ thumbnail, video, alt = 'Play video', poster }: U30VideoPlayerProps) {
  const [state, setState] = useState<ModalState>('closed');
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setState('loading');
  }, []);

  const close = useCallback(() => {
    setState('closing');
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      setState('closed');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }, 500);
  }, []);

  const onCanPlay = useCallback(() => {
    if (state === 'loading') {
      setState('playing');
      videoRef.current?.play();
    }
  }, [state]);

  // Escape key
  useEffect(() => {
    if (state === 'closed') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (state !== 'closed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state]);

  // Focus trap
  useEffect(() => {
    if (state === 'loading' || state === 'playing') {
      modalRef.current?.focus();
    }
  }, [state]);

  const isOpen = state !== 'closed';
  const isFramed = state === 'playing';
  const isClosing = state === 'closing';

  return (
    <>
      {/* Thumbnail with play button */}
      <button
        onClick={open}
        className="relative w-full h-full overflow-hidden group cursor-pointer"
        aria-label={alt}
      >
        <Image
          src={thumbnail}
          alt={alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rotate-45 border-2 border-flag bg-ink/60 flex items-center justify-center group-hover:bg-flag/20 transition-colors">
            <span className="-rotate-45 text-flag text-2xl ml-1">&#9654;</span>
          </div>
        </div>
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
            aria-label="Close video"
          >
            &#10005; CLOSE
          </button>

          {/* Corner marks */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left */}
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
            {/* Top-right */}
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
            {/* Bottom-left */}
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
            {/* Bottom-right */}
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

            {/* Loading pulse */}
            {state === 'loading' && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-flag rounded-full animate-pulse" />
              </div>
            )}
          </div>

          {/* Video container */}
          <div className="absolute inset-[8%] flex items-center justify-center">
            <video
              ref={videoRef}
              src={video}
              poster={poster || thumbnail}
              onCanPlay={onCanPlay}
              controls
              playsInline
              preload="auto"
              className={`max-w-full max-h-full transition-opacity duration-400 ${
                isFramed ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
}
