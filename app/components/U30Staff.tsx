'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StaffDoc } from '@/app/lib/types';

interface Coach {
  num: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  certifications: string[];
  achievements: string[];
  image?: string;
  quote?: string;
}

const BG_COLORS = ['bg-ink', 'bg-blue'];

function CoachModal({ coach, onClose }: { coach: Coach; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-ink border border-cream/[0.18] max-w-[600px] w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.25s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-4 border-b border-cream/[0.18]">
          <div className="font-mono text-[10px] tracking-[1.5px] text-flag font-bold">
            CREW / #{coach.num}
          </div>
          <button onClick={onClose} className="font-mono text-[11px] tracking-wider text-muted hover:text-cream transition-colors cursor-pointer">
            CLOSE &times;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
          <div className="relative aspect-[3/4] sm:aspect-auto bg-[#001033] min-h-[300px]">
            {coach.image ? (
              <Image src={coach.image} alt={coach.name} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-[80px] text-blue/30" aria-hidden="true">U30</div>
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="font-display text-flag text-[56px] leading-none">{coach.num}</div>
            <div className="font-display text-[32px] text-cream tracking-[0.5px] mt-1">{coach.name}</div>
            <div className="font-mono text-[11px] tracking-[1.5px] text-flag uppercase mt-1">{coach.role}</div>
            <p className="text-sm text-cream/85 leading-[1.6] mt-6">{coach.bio}</p>

            {coach.quote && (
              <div className="mt-6 pt-5 border-t border-cream/[0.18]">
                <p className="text-sm text-cream/70 leading-[1.6] italic">&ldquo;{coach.quote}&rdquo;</p>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-cream/[0.18]">
              <div className="font-mono text-[10px] tracking-[1.5px] text-muted mb-3">ACHIEVEMENTS</div>
              {coach.achievements.map((a, i) => (
                <div key={a} className={`flex items-start gap-3 py-2.5 ${i > 0 ? 'border-t border-cream/[0.18]' : ''}`}>
                  <span className="font-mono text-[10px] text-flag font-bold tracking-wider mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-cream font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function U30Staff({ staff }: { staff: StaffDoc[] }) {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const coaches: Coach[] = staff.map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    name: s.name,
    role: s.role,
    tag: s.tag,
    bio: s.bio,
    certifications: s.certifications,
    achievements: s.achievements,
    image: s.imageUrl,
    quote: s.quote,
  }));

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <section id="staff" className="text-cream">
        {/* Section header */}
        <div className="bg-blue py-16 md:py-[120px] px-10 pb-16">
          <div className="font-mono text-[11px] text-flag tracking-[2px]">THE CREW</div>
          <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            THE CREW.
          </h2>
        </div>

        {/* Scrollable vertical coach sections */}
        {coaches.map((coach, i) => (
          <div
            key={coach.num}
            className={`${BG_COLORS[i % BG_COLORS.length]} text-cream cursor-pointer group`}
            onClick={() => setSelectedCoach(coach)}
          >
            <div className="max-w-[1400px] mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-center">
              {/* Photo side */}
              <div className={`relative aspect-[4/5] overflow-hidden max-w-[300px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                {/* Faded U30 logo behind */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[200px] text-cream/[0.03] select-none">U30</div>
                </div>
                {coach.image ? (
                  <Image src={coach.image} alt={coach.name} fill className="object-cover relative z-10" />
                ) : (
                  <div className="absolute inset-0 bg-[#001033] flex items-center justify-center z-10">
                    <div className="font-display text-[100px] text-blue/20" aria-hidden="true">{coach.num}</div>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 z-20 bg-flag/0 group-hover:bg-flag/10 transition-colors flex items-end p-6">
                  <span className="font-mono text-[11px] tracking-[1.5px] uppercase font-bold text-cream opacity-0 group-hover:opacity-100 transition-opacity bg-ink/80 px-4 py-2">
                    View Full Profile &rarr;
                  </span>
                </div>
              </div>

              {/* Info side */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[72px] leading-none text-flag">{coach.num}</span>
                </div>
                <div className="font-display text-[clamp(32px,5vw,56px)] tracking-[0.5px] mt-2">{coach.name}</div>
                <div className="font-mono text-[11px] tracking-[1.5px] text-flag uppercase mt-2">{coach.role}</div>

                <p className="text-base text-cream/80 leading-[1.6] mt-6 max-w-[500px]">{coach.bio}</p>

                {coach.quote && (
                  <blockquote className="mt-6 pl-4 border-l-2 border-flag">
                    <p className="text-sm text-cream/80 leading-[1.6] italic">&ldquo;{coach.quote}&rdquo;</p>
                  </blockquote>
                )}

                <div className="mt-8 flex gap-2 flex-wrap">
                  {coach.certifications.map(c => (
                    <span key={c} className="px-3 py-1.5 border border-cream/20 font-mono text-[10px] tracking-wider text-cream/70 uppercase">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-px bg-cream/10 mx-10" />
          </div>
        ))}
      </section>

      {selectedCoach && (
        <CoachModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}
    </>
  );
}
