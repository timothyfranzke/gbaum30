'use client';

import { useState } from 'react';
import Image from 'next/image';

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

const COACHES: Coach[] = [
  {
    num: '01', name: 'ANDY GRUENEBAUM', role: 'Founder',
    tag: 'Ex-MLS keeper · Founder · Curriculum lead',
    bio: 'With over 15 years of professional goalkeeping experience and 8 years of coaching, Andy brings elite-level expertise to Union30. Former MLS goalkeeper with a passion for developing the next generation of shot-stoppers. When he hung up the gloves in 2022, he had one mission: give keepers the kind of pro-level development that used to mean leaving the state.',
    certifications: ['USSF "A" License', 'Goalkeeper Coaching Specialist'],
    achievements: ['19 years MLS/USL', 'Columbus Crew · Chivas USA · Sporting KC · Indy Eleven', 'UK Hall of Fame'],
  },
  {
    num: '02', name: 'MADDIE DOBYNS', role: 'Goalkeeper Coach',
    tag: 'NCAA D1 coaching · Former Kansas GK · NWSL development',
    bio: 'A native of Kansas City, Mo., Dobyns played at Kansas from 2013-2017 appearing in 60 matches and serving as the Jayhawks\' primary starter for her final three seasons. She helped KU reach the second round of the NCAA Tournament in 2016 and left the program ranked second in goals against average (1.06), third in shutouts (14) and fourth in wins (29).',
    certifications: ['NCAA D1 Coaching Experience', 'Cincinnati · Kentucky · Iowa State · Kansas State'],
    achievements: [
      'Coached Jordan Silkowitz — 18th overall NWSL Draft pick (KC Current)',
      'Silkowitz: first player ever drafted from Iowa State, now starter for Bay FC',
      'Silkowitz: regular US Women\'s National Team call-up',
    ],
    image: '/00d74623-maddiedobyns202313_abc-scaled.webp',
    quote: "I'm so excited to be joining Andy at Union 30. We have known each other for a long time and have always talked about doing something big together, so it is pretty cool to finally make it happen. What he has built is different from any other GK environment and you can see that in everything he does. With his experience, reputation, and how much he cares about continuing to build it, I could not pass up the chance to be part of it. Pumped to be back home and get to work.",
  },
];

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
                <div className="font-display text-[80px] text-blue/30">U30</div>
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

export default function U30Staff() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

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
        <div className="bg-blue py-[120px] px-10 pb-16">
          <div className="font-mono text-[11px] text-flag tracking-[2px]">FILE / 03 — THE CREW</div>
          <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            THE CREW.
          </h2>
        </div>

        {/* Scrollable vertical coach sections */}
        {COACHES.map((coach, i) => (
          <div
            key={coach.num}
            className={`${BG_COLORS[i % BG_COLORS.length]} text-cream cursor-pointer group`}
            onClick={() => setSelectedCoach(coach)}
          >
            <div className="max-w-[1400px] mx-auto px-10 py-20 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-center">
              {/* Photo side */}
              <div className={`relative aspect-[4/5] overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                {/* Faded U30 logo behind */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[200px] text-cream/[0.03] select-none">U30</div>
                </div>
                {coach.image ? (
                  <Image src={coach.image} alt={coach.name} fill className="object-cover relative z-10" />
                ) : (
                  <div className="absolute inset-0 bg-[#001033] flex items-center justify-center z-10">
                    <div className="font-display text-[100px] text-blue/20">{coach.num}</div>
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
                    <p className="text-sm text-cream/60 leading-[1.6] italic">&ldquo;{coach.quote}&rdquo;</p>
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
