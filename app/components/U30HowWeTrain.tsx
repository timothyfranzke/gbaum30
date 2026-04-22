'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TrainArea {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  pos: { x: number; y: number };
  labelPos: { x: number; y: number };
  desc: string;
  attributes: string[];
  icon?: string;
}

const TRAIN_AREAS: TrainArea[] = [
  {
    id: 'head', num: '01', name: 'HEAD',
    subtitle: 'Mental Game',
    pos: { x: 50, y: 4 },
    labelPos: { x: 82, y: 4 },
    desc: 'The mental side separates good keepers from great ones. We develop the psychological tools to perform under pressure and bounce back from mistakes.',
    attributes: ['Mental Strength', 'Resiliency', 'Soccer IQ'],
  },
  {
    id: 'belly', num: '02', name: 'BELLY',
    subtitle: 'Competitive Fire',
    pos: { x: 48, y: 48 },
    labelPos: { x: 14, y: 48 },
    desc: 'That fire in the belly — the competitive drive that makes you want to win every rep, every drill, every session. We cultivate an environment where competitiveness is the standard.',
    attributes: ['Competitiveness', 'Drive', 'Intensity'],
    icon: '\uD83D\uDD25',
  },
  {
    id: 'hands', num: '03', name: 'HANDS',
    subtitle: 'Technical Handling',
    pos: { x: 54, y: 35 },
    labelPos: { x: 82, y: 35 },
    desc: 'Mastering hand positioning, grip strength, and shot selection. Knowing when to catch, when to parry, and when to tip — and executing it clean under pressure.',
    attributes: ['Technical Handling', 'Save Selection'],
  },
  {
    id: 'feet', num: '04', name: 'FEET',
    subtitle: 'Distribution & Composure',
    pos: { x: 45, y: 92 },
    labelPos: { x: 14, y: 90 },
    desc: 'Modern keepers play with their feet. Distribution, technical composure, comfort on the ball, and the ability to connect the game and break lines when appropriate.',
    attributes: ['Distribution', 'Technical Composure', 'Comfort on Ball', 'Breaking Lines'],
  },
];

function HotSpot({ area, active, onHover }: { area: TrainArea; active: boolean; onHover: (id: string) => void }) {
  return (
    <>
      {/* Hotspot dot */}
      <button
        onMouseEnter={() => onHover(area.id)}
        onFocus={() => onHover(area.id)}
        onClick={() => onHover(area.id)}
        className={`absolute z-10 w-8 h-8 rounded-full border-2 border-flag flex items-center justify-center font-mono text-[11px] font-bold cursor-pointer transition-all ${
          active
            ? 'bg-flag text-ink shadow-[0_0_0_8px_rgba(232,115,74,0.2)]'
            : 'bg-flag/20 text-flag hover:bg-flag/40'
        }`}
        style={{ left: `${area.pos.x}%`, top: `${area.pos.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        {area.num}
      </button>

      {/* Connecting line */}
      <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
        <line
          x1={`${area.pos.x}%`} y1={`${area.pos.y}%`}
          x2={`${area.labelPos.x}%`} y2={`${area.labelPos.y}%`}
          stroke={active ? '#E8734A' : 'rgba(244,237,224,0.18)'}
          strokeWidth="1"
          strokeDasharray={active ? '0' : '3 3'}
        />
      </svg>

      {/* Off-body label */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${area.labelPos.x}%`,
          top: `${area.labelPos.y}%`,
          transform: area.labelPos.x > 50 ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
          paddingLeft: area.labelPos.x > 50 ? 8 : 0,
          paddingRight: area.labelPos.x > 50 ? 0 : 8,
        }}
      >
        <div className={`font-display text-[clamp(14px,1.6vw,22px)] tracking-wide transition-colors ${
          active ? 'text-flag' : 'text-cream'
        }`}>
          {area.icon && <span className="mr-1">{area.icon}</span>}
          {area.name}
        </div>
        <div className="font-mono text-[clamp(8px,0.8vw,10px)] tracking-wider text-muted font-medium mt-0.5">
          {area.subtitle}
        </div>
      </div>
    </>
  );
}

export default function U30HowWeTrain() {
  const [activeId, setActiveId] = useState('head');
  const active = TRAIN_AREAS.find(a => a.id === activeId)!;

  return (
    <section id="training" className="bg-blue text-cream py-16 md:py-[120px] px-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10 flex-wrap">
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px] font-bold">THE CURRICULUM</div>
          <h2 className="font-display text-[clamp(56px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            UNION30<br/>GOALKEEPER<br/><span className="text-flag">ATTRIBUTES.</span>
          </h2>
        </div>
        <div className="text-sm max-w-[340px] text-cream/70 leading-[1.55]">
          Every session touches four key areas. Hover a zone below to see what we develop there.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-stretch">
        {/* Body diagram with player image */}
        <div className="relative bg-[#000B26] border border-cream/[0.18] min-h-[400px] sm:min-h-[500px] lg:min-h-[680px] overflow-hidden">
          {/* Grid background */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="u30-gg" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(244,237,224,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#u30-gg)" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(232,115,74,0.15)" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(232,115,74,0.15)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>

          {/* Player image */}
          <div className="absolute inset-0 lg:inset-[5%]">
            <Image
              src="/player.png"
              alt="Goalkeeper stance"
              fill
              className="object-contain"
            />
          </div>

          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(0,51,160,0.4)_0%,rgba(0,31,102,0.3)_30%,transparent_70%)] blur-[20px]" />

          {/* Hotspots */}
          {TRAIN_AREAS.map(a => (
            <HotSpot key={a.id} area={a} active={a.id === activeId} onHover={setActiveId} />
          ))}

          {/* HUD text */}
          <div className="absolute top-4 left-6 font-mono text-[10px] tracking-[1.5px] text-flag font-bold flex gap-3.5">
            <span>&#9679; SUBJECT:</span>
            <span className="text-cream">KEEPER / 4-ZONE ATTRIBUTES</span>
          </div>
          <div className="absolute bottom-4 right-6 font-mono text-[10px] tracking-[1.5px] text-muted">
            UNION30 CURRICULUM
          </div>

          {/* Corner marks */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-flag" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-flag" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-flag" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-flag" />
        </div>

        {/* Detail panel */}
        <div className="bg-ink text-cream p-8 flex flex-col border border-cream/[0.18]">
          <div className="flex justify-between items-start">
            <div className="font-display text-[64px] leading-[0.9] text-flag">{active.num}</div>
            <div className="font-mono text-[10px] tracking-[1.5px] text-muted text-right leading-[1.5]">
              ZONE {active.num} / 04
            </div>
          </div>
          <div className="font-display text-5xl leading-[0.95] tracking-wide mt-2">
            {active.icon && <span className="mr-2">{active.icon}</span>}
            {active.name}
          </div>
          <div className="font-mono text-[11px] tracking-[1.5px] text-flag uppercase mt-1.5">
            {active.subtitle}
          </div>
          <p className="text-[14.5px] leading-[1.6] mt-5 opacity-90">
            {active.desc}
          </p>

          {/* Attributes */}
          <div className="mt-7 pt-5 border-t border-cream/[0.18]">
            <div className="font-mono text-[10px] tracking-[1.5px] text-muted mb-3">KEY ATTRIBUTES</div>
            {active.attributes.map((a, i) => (
              <div key={a} className={`flex items-center gap-3.5 py-3 ${i > 0 ? 'border-t border-cream/[0.18]' : ''}`}>
                <span className="font-mono text-[10px] text-flag font-bold tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-medium">{a}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-7">
            <a href="#booking" className="block w-full bg-flag text-ink text-center px-5 py-4 font-mono text-xs tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors">
              Start Training &rarr;
            </a>
          </div>

          {/* Zone selector pips */}
          <div className="mt-5 flex gap-1.5">
            {TRAIN_AREAS.map(a => (
              <button
                key={a.id}
                onClick={() => setActiveId(a.id)}
                className={`flex-1 h-1 cursor-pointer transition-colors ${
                  a.id === activeId ? 'bg-flag' : 'bg-cream/[0.18] hover:bg-cream/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
