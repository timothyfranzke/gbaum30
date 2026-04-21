'use client';

import { useState, useEffect, useCallback } from 'react';

const quotes = [
  {
    n: 'MLS',
    m: 'BOUND',
    q: "As a goalkeeper, I always have the feeling that I can do better everyday and improve my techniques. The environment at AG30 helped me to develop my skills. It's my dream to play in the MLS and I know AG30 can help get me there!",
    name: 'Paulo P.',
    role: 'Elite Goalkeeper',
    initials: 'PP',
  },
  {
    n: 'D1',
    m: 'COMMIT',
    q: "Training with AG30 took my abilities to the Elite level. Their knowledge of the modern style of soccer alongside the passion they have for coaching is unprecedented. AG30 is an investment that continues to pay off in my D1 career.",
    name: 'Erin B.',
    role: 'Professional Keeper',
    initials: 'EB',
  },
  {
    n: '100%',
    m: 'GROWTH',
    q: "Training with AG30 has been super beneficial for me... The training environment is second to none; it's a space where you can make mistakes and ask for advice. I've improved as a player and a person thanks to The Union!",
    name: 'Emily J.',
    role: 'Youth Goalkeeper',
    initials: 'EJ',
  },
];

export default function U30Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, currentIndex]);

  const goNext = useCallback(() => {
    goTo(currentIndex === quotes.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex === 0 ? quotes.length - 1 : currentIndex - 1);
  }, [currentIndex, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAnimating, goNext]);

  const t = quotes[currentIndex];

  return (
    <section className="bg-paper text-ink py-[120px] px-10">
      {/* Header */}
      <div className="mb-16">
        <div className="font-mono text-[11px] text-flag tracking-[2px]">FILE / 04 — WORD FROM THE FIELD</div>
        <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
          THEY SAID IT.
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Prev / Next arrows — desktop */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 hidden md:flex items-center justify-center w-12 h-12 text-ink/40 hover:text-flag transition-colors cursor-pointer"
          aria-label="Previous testimonial"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 hidden md:flex items-center justify-center w-12 h-12 text-ink/40 hover:text-flag transition-colors cursor-pointer"
          aria-label="Next testimonial"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mobile arrows */}
        <div className="flex justify-between mb-6 md:hidden">
          <button onClick={goPrev} className="p-2 text-ink/40 hover:text-flag transition-colors cursor-pointer" aria-label="Previous">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={goNext} className="p-2 text-ink/40 hover:text-flag transition-colors cursor-pointer" aria-label="Next">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial card — fade/scale animation */}
        <div className={`bg-ink text-cream p-10 md:p-14 transition-all duration-400 ${
          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {/* Stat badge */}
          <div className="flex items-baseline gap-3 mb-8">
            <div className="font-display text-[72px] md:text-[96px] leading-[0.85] text-flag">{t.n}</div>
            <div className="font-mono text-[10px] text-muted tracking-wider">{t.m}</div>
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
            &ldquo;{t.q}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-10 pt-6 border-t border-cream/20 flex items-center gap-4">
            <div className="w-14 h-14 bg-flag text-ink flex items-center justify-center font-display text-xl">
              {t.initials}
            </div>
            <div>
              <div className="font-display text-xl tracking-wide">{t.name}</div>
              <div className="font-mono text-[10px] tracking-[1.5px] text-flag uppercase">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 transition-all duration-300 cursor-pointer ${
                i === currentIndex ? 'w-8 bg-flag' : 'w-4 bg-ink/20 hover:bg-ink/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
