'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import type { AnnouncementDoc } from '@/app/lib/types';

interface Props {
  announcement: AnnouncementDoc | null;
}

function toEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

const ACCENT_CLASS: Record<string, string> = {
  cream: 'text-cream',
  flag: 'text-flag',
  blue: 'text-blue',
};

const ACCENT_BG: Record<string, string> = {
  cream: 'bg-cream text-ink',
  flag: 'bg-flag text-ink',
  blue: 'bg-blue text-cream',
};

function accentSpanCls(accent: string) {
  const color = ACCENT_CLASS[accent] || 'text-cream';
  return accent === 'flag' ? `${color} bg-ink px-1` : color;
}

function renderHeadline(text: string, accent: string) {
  const cls = accentSpanCls(accent);
  const parts = text.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) {
    return <span className={cls}>{text}</span>;
  }
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return <span key={i} className={cls}>{part.slice(1, -1)}</span>;
    }
    return <span key={i} className="text-cream">{part}</span>;
  });
}

function renderBannerHeadline(text: string, accent: string) {
  const cls = accentSpanCls(accent);
  const parts = text.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) {
    return <span className={cls}>{text}</span>;
  }
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return <span key={i} className={cls}>{part.slice(1, -1)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

const STORAGE_KEY_MODAL = 'u30-announcement-dismissed';
const STORAGE_KEY_BANNER = 'u30-announcement-banner-dismissed';

export default function U30Announcement({ announcement }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const showsModal = announcement?.displayMode === 'modal' || announcement?.displayMode === 'both';
  const showsBanner = announcement?.displayMode === 'banner' || announcement?.displayMode === 'both';

  const closeModal = useCallback(() => {
    setClosing(true);
    if (announcement?.dismissBehavior === 'session') {
      try { sessionStorage.setItem(STORAGE_KEY_MODAL, 'true'); } catch {}
    }
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 300);
  }, [announcement]);

  const closeBanner = useCallback(() => {
    if (announcement?.dismissBehavior === 'session') {
      try { sessionStorage.setItem(STORAGE_KEY_BANNER, 'true'); } catch {}
    }
    setShowBanner(false);
  }, [announcement]);

  useEffect(() => {
    if (!announcement) return;
    const isSession = announcement.dismissBehavior === 'session';

    if (showsBanner) {
      let dismissed = false;
      if (isSession) {
        try { dismissed = sessionStorage.getItem(STORAGE_KEY_BANNER) === 'true'; } catch {}
      }
      if (!dismissed) setShowBanner(true);
    }

    if (showsModal) {
      let dismissed = false;
      if (isSession) {
        try { dismissed = sessionStorage.getItem(STORAGE_KEY_MODAL) === 'true'; } catch {}
      }
      if (!dismissed) {
        const timer = setTimeout(() => setShowModal(true), 500);
        return () => clearTimeout(timer);
      }
    }
  }, [announcement, showsModal, showsBanner]);

  // Escape key for modal
  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showModal, closeModal]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  if (!announcement || (!showModal && !showBanner)) return null;

  const ctaHref = announcement.ctaLink === 'external'
    ? announcement.ctaExternalUrl
    : announcement.ctaLink;

  return (
    <>
      {/* ─── Banner ─── */}
      {showBanner && (
        <div role="region" aria-label="Announcement" className={`relative z-50 ${ACCENT_BG[announcement.headlineAccent] || 'bg-flag text-ink'}`}>
          <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {announcement.headline && (
                <span className="font-display text-[15px] md:text-[17px] leading-tight">
                  {renderBannerHeadline(announcement.headline, announcement.headlineAccent)}
                </span>
              )}
              {announcement.subtitle && (
                <span className="font-mono text-[10px] tracking-[1.5px] uppercase opacity-70">
                  {announcement.subtitle}
                </span>
              )}
              {announcement.mediaUrl && (announcement.mediaType === 'video-upload' || announcement.mediaType === 'video-embed') && (
                <button
                  onClick={() => setShowModal(true)}
                  className="font-mono text-[10px] tracking-[1.5px] uppercase font-bold underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Watch the video
                </button>
              )}
              {announcement.ctaEnabled && announcement.ctaText && (
                <a
                  href={ctaHref}
                  target={announcement.ctaLink === 'external' ? '_blank' : undefined}
                  rel={announcement.ctaLink === 'external' ? 'noopener noreferrer' : undefined}
                  className="font-mono text-[10px] tracking-[1.5px] uppercase font-bold underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  {announcement.ctaText}
                </a>
              )}
            </div>
            <button
              onClick={closeBanner}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer text-sm leading-none"
              aria-label="Dismiss banner"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}

      {/* ─── Modal ─── */}
      {showModal && (
        <div
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 outline-none"
          role="dialog"
          aria-modal="true"
          aria-label={announcement.headline || 'Announcement'}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className={`absolute inset-0 bg-ink/90 backdrop-blur-sm transition-opacity duration-300 ${
              closing ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Centered card */}
          <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className={`relative max-w-xl w-full border-2 border-flag bg-ink my-auto transition-all duration-300 ${
                closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {/* Corner marks */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-flag pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-flag pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-flag pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-flag pointer-events-none" />

              {/* Header bar */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <span className="font-mono text-[10px] tracking-[2px] text-flag font-bold">
                  ANNOUNCEMENT
                </span>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-cream/20 font-mono text-[11px] tracking-[1.5px] text-cream hover:bg-cream hover:text-ink transition-colors cursor-pointer font-bold"
                  aria-label="Close announcement"
                >
                  &#10005; CLOSE
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 space-y-4">
                {announcement.headline && (
                  <h2 className="font-display text-[28px] md:text-[36px] leading-tight">
                    {renderHeadline(announcement.headline, announcement.headlineAccent)}
                  </h2>
                )}
                {announcement.subtitle && (
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-cream/60">
                    {announcement.subtitle}
                  </p>
                )}
                {announcement.body && (
                  <p className="font-sans text-base text-cream/80 leading-relaxed whitespace-pre-line">
                    {announcement.body}
                  </p>
                )}

                {/* Media */}
                {announcement.mediaUrl && announcement.mediaType === 'video-upload' && (
                  <video
                    src={announcement.mediaUrl}
                    controls
                    playsInline
                    muted={announcement.videoAutoplay}
                    autoPlay={announcement.videoAutoplay}
                    className="w-full"
                  />
                )}
                {announcement.mediaUrl && announcement.mediaType === 'video-embed' && (
                  <div className="aspect-video">
                    <iframe
                      src={toEmbedUrl(announcement.mediaUrl) + (announcement.videoAutoplay ? '?autoplay=1&muted=1' : '')}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
                {announcement.mediaUrl && announcement.mediaType === 'image' && (
                  <div className="relative w-full aspect-video">
                    <Image src={announcement.mediaUrl} alt="" fill className="object-contain" />
                  </div>
                )}

                {/* CTA */}
                {announcement.ctaEnabled && announcement.ctaText && (
                  <a
                    href={ctaHref}
                    target={announcement.ctaLink === 'external' ? '_blank' : undefined}
                    rel={announcement.ctaLink === 'external' ? 'noopener noreferrer' : undefined}
                    onClick={closeModal}
                    className="inline-block px-6 py-3 bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold hover:bg-cream transition-colors"
                  >
                    {announcement.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
