'use client';

import { useState, useEffect, useRef } from 'react';
import U30VideoPlayer from './U30VideoPlayer';

interface Location {
  id: string;
  name: string;
  city: string;
  state: string;
  pos: { x: number; y: number };
  tags: string[];
  isHQ?: boolean;
}

interface StateData {
  d: string;
  id: string;
  title: string;
}

const LOCATIONS: Location[] = [
  {
    id: '01', name: 'OVERLAND PARK', city: 'Overland Park', state: 'KS',
    pos: { x: 50, y: 46 },
    tags: ['HQ', 'In-Person Training'],
    isHQ: true,
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
    tags: ['Game Film Analysis'],
  },
  {
    id: '09', name: 'LOS ANGELES', city: 'Los Angeles', state: 'CA',
    pos: { x: 11, y: 62 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '10', name: 'SAN DIEGO', city: 'San Diego', state: 'CA',
    pos: { x: 13, y: 66 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '11', name: 'SAN FRANCISCO', city: 'San Francisco', state: 'CA',
    pos: { x: 7, y: 48 },
    tags: ['Game Film Analysis'],
  },
  {
    id: '12', name: 'ST. LOUIS', city: 'St. Louis', state: 'MO',
    pos: { x: 58, y: 49 },
    tags: ['Game Film Analysis'],
  },
];

function USMap({ states }: { states: StateData[] }) {
  const locationStateIds = LOCATIONS.map(l => `US-${l.state}`);

  return (
    <div className="relative bg-[#001540] aspect-[16/10] overflow-hidden border border-cream/[0.18]">
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
                fill={isActive ? 'rgba(0,51,160,0.6)' : 'rgba(0,51,160,0.3)'}
                stroke={isActive ? 'rgba(0,51,160,0.8)' : 'rgba(0,51,160,0.35)'}
                strokeWidth="0.8"
              />
            );
          })}
      </svg>

      {/* Location pins */}
      {LOCATIONS.map(loc => {
        const isHQ = !!loc.isHQ;

        if (isHQ) {
          return (
            <div
              key={loc.id}
              className="absolute"
              style={{ left: `${loc.pos.x}%`, top: `${loc.pos.y}%`, transform: 'translate(-50%, -100%)' }}
            >
              <div className="flex gap-1.5 items-center mb-1">
                <div className="font-mono text-[9px] tracking-[1.5px] font-bold px-1.5 py-0.5 whitespace-nowrap border bg-cream text-ink border-cream">
                  &#9733; HQ — {loc.city}, {loc.state}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rotate-45 bg-cream/20 animate-ping" />
                  <div className="relative w-9 h-9 flex items-center justify-center font-display text-sm rotate-45 border-2 border-cream bg-cream text-ink shadow-[0_0_0_8px_rgba(244,237,224,0.2)]">
                    <span className="-rotate-45 text-[11px] font-bold">{loc.id}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={loc.id}
            className="absolute"
            style={{ left: `${loc.pos.x}%`, top: `${loc.pos.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            <div className="flex gap-1.5 items-center mb-1">
              <div className="font-mono text-[9px] tracking-[1.5px] font-bold px-1.5 py-0.5 whitespace-nowrap border bg-ink/80 text-cream border-cream/[0.18]">
                {loc.city}, {loc.state}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-7 h-7 flex items-center justify-center font-display text-sm rotate-45 border-2 border-cream bg-blue text-cream">
                <span className="-rotate-45 text-[10px] font-bold">{loc.id}</span>
              </div>
            </div>
          </div>
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

function StateSvg({ stateData, isHQ }: { stateData?: StateData; isHQ: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [viewBox, setViewBox] = useState<string | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      const b = pathRef.current.getBBox();
      const pad = 5;
      setViewBox(`${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`);
    }
  }, [stateData?.d]);

  if (!stateData) return null;

  return (
    <svg
      viewBox={viewBox || '0 0 1200 800'}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] pointer-events-none transition-opacity ${!viewBox ? 'opacity-0' : ''}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={pathRef}
        d={stateData.d}
        fill={isHQ ? 'rgba(0,51,160,0.1)' : 'none'}
        stroke={isHQ ? 'rgba(0,51,160,0.2)' : 'rgba(244,237,224,0.15)'}
        strokeWidth={isHQ ? '1' : '1.5'}
      />
    </svg>
  );
}

function LocationCard({ loc, stateData }: { loc: Location; stateData?: StateData }) {
  const isHQ = !!loc.isHQ;
  return (
    <div
      className={`relative text-left w-full p-4 border transition-all overflow-hidden ${
        isHQ
          ? 'bg-cream text-ink border-cream'
          : 'bg-transparent text-cream border-cream/[0.18]'
      }`}
    >
      <StateSvg stateData={stateData} isHQ={isHQ} />

      <div className="relative z-10">
        <div className="flex justify-between items-baseline">
          <div className="flex items-baseline gap-2">
            <span className={`font-display text-2xl leading-none ${isHQ ? 'text-blue' : 'text-flag'}`}>{loc.id}</span>
            <span className="font-display text-lg leading-none tracking-[0.5px]">{loc.name}</span>
          </div>
        </div>
        <div className="font-mono text-[11px] tracking-wider mt-1 opacity-80">
          {loc.city}, {loc.state}
        </div>
        <div className="mt-2 flex gap-1.5 flex-wrap">
          {loc.tags.map(t => (
            <span key={t} className={`px-[6px] py-[2px] border font-mono text-[9px] tracking-wider uppercase font-semibold ${
              isHQ ? 'border-ink' : 'border-cream'
            }`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function U30Locations() {
  const [states, setStates] = useState<StateData[]>([]);

  useEffect(() => {
    fetch('/api/map')
      .then(res => res.json())
      .then(data => setStates(data.states))
      .catch(() => {});
  }, []);

  const stateMap = new Map(states.map(s => [s.id, s]));

  return (
    <section id="locations" className="bg-ink text-cream py-[120px] px-10">
      {/* Intro */}
      <div className="mb-12">
        <div className="font-mono text-[11px] text-flag tracking-[2px] font-bold">GAME FILM</div>
        <h2 className="font-display text-[clamp(56px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
          UNION30&apos;S<br/><span className="text-blue-heading">REACH.</span>
        </h2>
        <p className="font-display text-xl text-cream mt-6 max-w-xl">
          Train with Union 30 from anywhere.
        </p>
        <p className="text-base text-cream/60 mt-3 leading-relaxed max-w-xl">
          Game film analysis sessions connect keepers across the country. No matter where you are, Union 30 can develop your goalkeeper over Zoom.
        </p>
      </div>

      {/* Video */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="font-mono text-[10px] text-flag tracking-[1.5px] font-bold mb-3 text-center">
          &#9654; WATCH A GAME FILM SESSION
        </div>
        <div className="relative aspect-video border border-cream/[0.18] overflow-hidden">
          <U30VideoPlayer
            thumbnail="/media/U30REACH.mp4"
            video="/media/U30REACH.mp4"
            alt="Game film analysis session"
          />
        </div>
        <div className="font-mono text-[10px] tracking-wider text-cream/40 mt-3 text-center">
          See how Union 30 breaks down film with keepers live over Zoom.
        </div>
      </div>

      {/* Map header */}
      <h3 className="font-display text-[clamp(24px,4vw,36px)] text-cream text-center mb-6">
        Keepers We Work With Across the U.S.
      </h3>

      {/* Desktop: full-width map */}
      <div className="hidden md:block">
        <USMap states={states} />
      </div>

      {/* Mobile: location cards */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {LOCATIONS.map(loc => (
          <LocationCard
            key={loc.id}
            loc={loc}
            stateData={stateMap.get(`US-${loc.state}`)}
          />
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="mt-8 bg-[#001540] border border-cream/[0.18] px-7 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[10px] tracking-[1.5px] text-flag font-bold">
          &#9679; 12 CITIES — NATIONWIDE VIRTUAL TRAINING
        </div>
        <div className="flex gap-6 font-mono text-[11px] tracking-wider text-muted uppercase flex-wrap justify-center">
          <span>KS</span><span>OH</span><span>AL</span><span>FL</span><span>IA</span><span>NE</span><span>OK</span><span>AZ</span><span>CA</span><span>MO</span>
        </div>
        <a href="#booking" className="bg-flag text-ink px-5 py-3 font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors text-center">
          Get Started &rarr;
        </a>
      </div>
    </section>
  );
}
