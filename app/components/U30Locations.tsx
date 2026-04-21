'use client';

import { useState, useEffect } from 'react';

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  pos: { x: number; y: number };
  tags: string[];
  link?: string;
}

const LOCATIONS: Location[] = [
  {
    id: '01', name: 'LEXINGTON', city: 'Lexington', state: 'KY',
    pos: { x: 66, y: 50 },
    tags: ['HQ', 'In-Person Training'],
  },
  {
    id: '02', name: 'COLUMBUS', city: 'Columbus', state: 'OH',
    pos: { x: 72, y: 41 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '03', name: 'BIRMINGHAM', city: 'Birmingham', state: 'AL',
    pos: { x: 65, y: 69 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '04', name: 'TAMPA', city: 'Tampa', state: 'FL',
    pos: { x: 72, y: 84 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '05', name: 'DES MOINES', city: 'Des Moines', state: 'IA',
    pos: { x: 54, y: 34 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '06', name: 'OMAHA', city: 'Omaha', state: 'NE',
    pos: { x: 45, y: 37 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '07', name: 'TULSA', city: 'Tulsa', state: 'OK',
    pos: { x: 47, y: 60 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '08', name: 'PHOENIX', city: 'Phoenix', state: 'AZ',
    pos: { x: 22, y: 62 },
    tags: ['Mentorship', 'Zoom'],
    link: '#',
  },
];

function USMap({ activeId, setActive }: { activeId: string; setActive: (id: string) => void }) {
  const [states, setStates] = useState<{ d: string; id: string; title: string }[]>([]);

  useEffect(() => {
    fetch('/api/map')
      .then(res => res.json())
      .then(data => setStates(data.states))
      .catch(() => {});
  }, []);

  // State IDs where locations exist
  const locationStateIds = LOCATIONS.map(l => `US-${l.state}`);

  return (
    <div className="relative bg-[#000B26] aspect-[16/10] overflow-hidden border border-cream/[0.18]">
      {/* Grid pattern */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="u30-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244,237,224,0.06)" strokeWidth="1" />
          </pattern>
          <pattern id="u30-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(244,237,224,0.1)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#u30-grid)" />
        <rect width="100%" height="100%" fill="url(#u30-grid-lg)" />
      </svg>

      {/* US map from SVG state paths */}
      <svg viewBox="490 430 570 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {states
          .filter(state => state.id !== 'US-AK' && state.id !== 'US-HI')
          .map(state => {
            const isActive = locationStateIds.includes(state.id);
            return (
              <path
                key={state.id}
                d={state.d}
                fill={isActive ? 'rgba(0,51,160,0.4)' : 'rgba(0,51,160,0.15)'}
                stroke={isActive ? 'rgba(0,51,160,0.8)' : 'rgba(0,51,160,0.35)'}
                strokeWidth="0.8"
              />
            );
          })}
      </svg>

      {/* Location pins */}
      {LOCATIONS.map(loc => {
        const active = loc.id === activeId;
        return (
          <button
            key={loc.id}
            onClick={() => setActive(loc.id)}
            className="absolute group"
            style={{ left: `${loc.pos.x}%`, top: `${loc.pos.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            <div className="flex gap-1.5 items-center mb-1">
              <div className={`font-mono text-[9px] tracking-[1.5px] font-bold px-1.5 py-0.5 whitespace-nowrap border transition-all ${
                active
                  ? 'bg-flag text-ink border-flag'
                  : 'bg-ink/80 text-cream border-cream/[0.18] group-hover:border-flag'
              }`}>
                {loc.city}, {loc.state}
              </div>
            </div>
            <div className="flex justify-center">
              <div className={`w-7 h-7 flex items-center justify-center font-display text-sm rotate-45 border-2 border-cream transition-all ${
                active ? 'bg-flag text-ink shadow-[0_0_0_6px_rgba(232,115,74,0.25)]' : 'bg-blue text-cream'
              }`}>
                <span className="-rotate-45 text-[10px] font-bold">{loc.id}</span>
              </div>
            </div>
          </button>
        );
      })}

      {/* HUD corner marks */}
      <div className="absolute top-3 left-3 w-[18px] h-[18px] border-t-2 border-l-2 border-flag" />
      <div className="absolute top-3 right-3 w-[18px] h-[18px] border-t-2 border-r-2 border-flag" />
      <div className="absolute bottom-3 left-3 w-[18px] h-[18px] border-b-2 border-l-2 border-flag" />
      <div className="absolute bottom-3 right-3 w-[18px] h-[18px] border-b-2 border-r-2 border-flag" />

      {/* HUD labels */}
      <div className="absolute top-4 left-10 flex items-center gap-2 font-mono text-[10px] text-flag tracking-[1.5px] font-bold">
        <span className="w-1.5 h-1.5 bg-flag rounded-full" />
        UNION30 / NATIONAL REACH
      </div>
      <div className="absolute bottom-4 right-10 font-mono text-[10px] text-muted tracking-[1.5px]">
        AND GROWING
      </div>
    </div>
  );
}

function LocationCard({ loc, active, onSelect }: { loc: Location; active: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left w-full p-4 border cursor-pointer transition-all ${
        active
          ? 'bg-flag text-ink border-flag'
          : 'bg-transparent text-cream border-cream/[0.18] hover:border-flag/50'
      }`}
    >
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-2">
          <span className={`font-display text-2xl leading-none ${active ? 'text-ink' : 'text-flag'}`}>{loc.id}</span>
          <span className="font-display text-lg leading-none tracking-[0.5px]">{loc.name}</span>
        </div>
      </div>
      <div className="font-mono text-[11px] tracking-wider mt-1 opacity-80">
        {loc.city}, {loc.state}
      </div>
      <div className="mt-2 flex gap-1.5 flex-wrap">
        {loc.tags.map(t => (
          <span key={t} className={`px-[6px] py-[2px] border font-mono text-[9px] tracking-wider uppercase font-semibold ${
            active ? 'border-ink' : 'border-cream'
          }`}>{t}</span>
        ))}
      </div>
      {loc.link && (
        <div className={`font-mono text-[10px] tracking-wider mt-2 font-bold ${active ? 'text-ink' : 'text-flag'}`}>
          &#9656; VIEW MENTORSHIP EXAMPLE
        </div>
      )}
    </button>
  );
}

export default function U30Locations() {
  const [activeId, setActiveId] = useState('01');

  return (
    <section id="locations" className="bg-ink text-cream py-[120px] px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10 flex-wrap">
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px] font-bold">THE GROUNDS</div>
          <h2 className="font-display text-[clamp(56px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            UNION30&apos;S<br/><span className="text-blue">REACH.</span>
          </h2>
        </div>
        <div className="text-sm max-w-[400px] text-cream/70 leading-[1.55]">
          <span className="font-display text-xl text-cream block mb-2">Developing Goalkeepers through Game Film Analysis All Over the Country</span>
        </div>
      </div>

      {/* Map + Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
        <USMap activeId={activeId} setActive={setActiveId} />
        <div className="grid grid-cols-2 gap-3 content-start">
          {LOCATIONS.map(loc => (
            <LocationCard
              key={loc.id}
              loc={loc}
              active={loc.id === activeId}
              onSelect={() => setActiveId(loc.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="mt-8 bg-[#000B26] border border-cream/[0.18] px-7 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[10px] tracking-[1.5px] text-flag font-bold">
          &#9679; 8 LOCATIONS AND GROWING
        </div>
        <div className="flex gap-6 font-mono text-[11px] tracking-wider text-muted uppercase flex-wrap justify-center">
          <span>KY</span><span>OH</span><span>AL</span><span>FL</span><span>IA</span><span>NE</span><span>OK</span><span>AZ</span>
        </div>
        <a href="#booking" className="bg-flag text-ink px-5 py-3 font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors text-center">
          Get Started &rarr;
        </a>
      </div>
    </section>
  );
}
