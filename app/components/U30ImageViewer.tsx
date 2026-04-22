'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type ModalState = 'closed' | 'loading' | 'open' | 'closing';

interface U30ImageViewerProps {
  src: string;
  alt?: string;
  caption?: string;
  /** Controlled mode: when true, modal is shown immediately (no thumbnail rendered) */
  isOpen?: boolean;
  /** Controlled mode: called when user closes the modal */
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function U30ImageViewer({ src, alt = '', caption, isOpen: controlledOpen, onClose, onPrev, onNext }: U30ImageViewerProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalState, setInternalState] = useState<ModalState>('closed');
  const modalRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<number | null>(null);

  // In controlled mode, derive state from prop
  const state: ModalState = isControlled ? (controlledOpen ? 'open' : 'closed') : internalState;

  const open = useCallback(() => {
    if (isControlled) return;
    setInternalState('loading');
    setTimeout(() => setInternalState('open'), 100);
  }, [isControlled]);

  const close = useCallback(() => {
    if (isControlled) {
      onClose?.();
      return;
    }
    setInternalState('closing');
    setTimeout(() => setInternalState('closed'), 500);
  }, [isControlled, onClose]);

  // Escape key + arrow keys
  useEffect(() => {
    if (state === 'closed') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && onPrev) { e.preventDefault(); onPrev(); }
      if (e.key === 'ArrowRight' && onNext) { e.preventDefault(); onNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state, close, onPrev, onNext]);

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
      {/* Thumbnail — only render in standalone (uncontrolled) mode */}
      {!isControlled && (
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
      )}

      {/* Modal */}
      {isOpen && (
        <div
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 outline-none"
          role="dialog"
          aria-modal="true"
          onTouchStart={(e) => {
            touchRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchRef.current === null) return;
            const deltaX = e.changedTouches[0].clientX - touchRef.current;
            touchRef.current = null;
            if (Math.abs(deltaX) > 50) {
              if (deltaX < 0 && onNext) onNext();
              else if (deltaX > 0 && onPrev) onPrev();
            }
          }}
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

          {/* Prev/Next arrows */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-cream/60 hover:text-flag transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-cream/60 hover:text-flag transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

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
