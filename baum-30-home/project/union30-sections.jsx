// Union 30 — Locations (Map) + How We Train
// Broadcast/stadium direction, drops into the existing site visual language

const U_COLORS = {
  blue: '#0033A0',
  blueDark: '#001F66',
  blueDeep: '#000B26',
  cream: '#F4EDE0',
  ink: '#05070E',
  paper: '#F8F5EC',
  flag: '#E8734A',
  muted: '#8A8F9A',
  line: 'rgba(244,237,224,0.18)',
};
const U_DISPLAY = '"Bebas Neue", "Oswald", "Impact", sans-serif';
const U_BODY = '"Inter", system-ui, sans-serif';
const U_MONO = '"JetBrains Mono", ui-monospace, monospace';

// reusable HUD corner marks
function CornerMarks({ inset = 20, size = 20, color = U_COLORS.flag, thickness = 2 }) {
  const pos = [
    { top: inset, left: inset, right: 'auto', bottom: 'auto', brs: ['right','bottom'] },
    { top: inset, right: inset, left: 'auto', bottom: 'auto', brs: ['left','bottom'] },
    { bottom: inset, left: inset, top: 'auto', right: 'auto', brs: ['right','top'] },
    { bottom: inset, right: inset, top: 'auto', left: 'auto', brs: ['left','top'] },
  ];
  return pos.map((p, i) => (
    <div key={i} style={{
      position: 'absolute', width: size, height: size,
      borderTop: p.brs.includes('top') ? 'none' : `${thickness}px solid ${color}`,
      borderBottom: p.brs.includes('bottom') ? 'none' : `${thickness}px solid ${color}`,
      borderLeft: p.brs.includes('left') ? 'none' : `${thickness}px solid ${color}`,
      borderRight: p.brs.includes('right') ? 'none' : `${thickness}px solid ${color}`,
      top: p.top, left: p.left, right: p.right, bottom: p.bottom,
      pointerEvents: 'none',
    }} />
  ));
}

// reusable ticker
function UTicker({ items, bg = U_COLORS.flag, fg = U_COLORS.ink }) {
  return (
    <div style={{ background: bg, color: fg, padding: '10px 0', overflow: 'hidden',
      borderTop: `1px solid ${U_COLORS.ink}`, borderBottom: `1px solid ${U_COLORS.ink}` }}>
      <div style={{ display: 'flex', gap: 40, whiteSpace: 'nowrap',
        fontFamily: U_MONO, fontSize: 11, letterSpacing: 1.5,
        textTransform: 'uppercase', fontWeight: 700, paddingLeft: 40 }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
            {t}<span style={{ opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// section heading ("FILE / 0X — LABEL" + giant stacked title)
function UHeader({ file, label, title, subtitle, color = U_COLORS.cream, accent = U_COLORS.flag }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      marginBottom: 48, gap: 40, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontFamily: U_MONO, fontSize: 11, color: accent, letterSpacing: 2, fontWeight: 700 }}>
          FILE / {file} — {label}
        </div>
        <div style={{ fontFamily: U_DISPLAY, fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: 0.9,
          letterSpacing: -1, marginTop: 8, color }}
          dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      {subtitle && (
        <div style={{ fontFamily: U_BODY, fontSize: 14, maxWidth: 340,
          color: 'rgba(244,237,224,0.7)', lineHeight: 1.55 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LOCATIONS / MAP
// ─────────────────────────────────────────────

const LOCATIONS = [
  {
    id: '01', name: 'LEXINGTON HQ', city: 'Lexington, KY',
    addr: '2400 Richmond Rd',
    pos: { x: 62, y: 42 },
    days: 'Mon · Tue · Thu · Sat',
    hours: '4:30p — 9:00p',
    tags: ['Indoor Turf', 'Film Room', 'S&C'],
    primary: true,
  },
  {
    id: '02', name: 'LOUISVILLE', city: 'Louisville, KY',
    addr: 'Norton Commons Fields',
    pos: { x: 30, y: 48 },
    days: 'Wed · Fri · Sun',
    hours: '5:00p — 8:30p',
    tags: ['Outdoor', 'Full 18-yd'],
  },
  {
    id: '03', name: 'GEORGETOWN', city: 'Georgetown, KY',
    addr: 'Scott Co. Athletic Ctr',
    pos: { x: 58, y: 30 },
    days: 'Sat',
    hours: '9:00a — 12:00p',
    tags: ['Youth Clinic'],
  },
  {
    id: '04', name: 'RICHMOND', city: 'Richmond, KY',
    addr: 'EKU Alumni Field',
    pos: { x: 72, y: 56 },
    days: 'Sun',
    hours: '1:00p — 4:00p',
    tags: ['College ID'],
  },
];

function BlueprintMap({ activeId, setActive }) {
  // Stylized blueprint-style KY map — not a real geo map, but evocative
  return (
    <div style={{ position: 'relative', background: U_COLORS.blueDeep,
      aspectRatio: '4/3', overflow: 'hidden', border: `1px solid ${U_COLORS.line}` }}>
      {/* grid lines */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
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

        {/* stylized KY outline (abstract blob, not geographically accurate) */}
        <path d="M 40 220 Q 120 180 200 200 Q 280 140 400 160 Q 520 130 640 180 Q 720 200 760 260 Q 700 330 580 340 Q 440 370 320 350 Q 200 360 120 320 Q 60 290 40 220 Z"
          fill="rgba(0,51,160,0.25)" stroke={U_COLORS.flag} strokeWidth="1.5" strokeDasharray="4 4" />

        {/* rivers (abstract) */}
        <path d="M 0 180 Q 200 200 400 170 T 800 180"
          fill="none" stroke="rgba(244,237,224,0.15)" strokeWidth="1.5" />
        <path d="M 0 280 Q 250 300 500 270 T 800 280"
          fill="none" stroke="rgba(244,237,224,0.1)" strokeWidth="1" />
      </svg>

      {/* Pins */}
      {LOCATIONS.map(loc => {
        const active = loc.id === activeId;
        return (
          <button
            key={loc.id}
            onClick={() => setActive(loc.id)}
            style={{
              position: 'absolute', left: `${loc.pos.x}%`, top: `${loc.pos.y}%`,
              transform: 'translate(-50%, -100%)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              <div style={{
                fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5, fontWeight: 700,
                color: active ? U_COLORS.ink : U_COLORS.cream,
                background: active ? U_COLORS.flag : 'rgba(5,7,14,0.8)',
                padding: '3px 6px', whiteSpace: 'nowrap',
                border: `1px solid ${active ? U_COLORS.flag : U_COLORS.line}`,
              }}>
                {loc.name}
              </div>
            </div>
            {/* pin */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 32, height: 32, background: active ? U_COLORS.flag : U_COLORS.blue,
                color: active ? U_COLORS.ink : U_COLORS.cream,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: U_DISPLAY, fontSize: 18, letterSpacing: 0.5,
                border: `2px solid ${U_COLORS.cream}`,
                transform: 'rotate(45deg)',
                boxShadow: active ? `0 0 0 6px rgba(232,115,74,0.25)` : 'none',
              }}>
                <span style={{ transform: 'rotate(-45deg)' }}>{loc.id}</span>
              </div>
              {/* ground shadow */}
              <div style={{ width: 20, height: 4, background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%', position: 'absolute', left: '50%', top: '100%',
                transform: 'translate(-50%, 8px)', filter: 'blur(2px)' }} />
            </div>
          </button>
        );
      })}

      {/* HUD corner marks */}
      <CornerMarks inset={12} size={18} color={U_COLORS.flag} />

      {/* compass / scale */}
      <div style={{ position: 'absolute', top: 16, right: 40,
        fontFamily: U_MONO, fontSize: 10, color: U_COLORS.muted, letterSpacing: 1.5 }}>
        N ↑ · 37.8°N · 84.3°W
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 40,
        fontFamily: U_MONO, fontSize: 10, color: U_COLORS.muted, letterSpacing: 1.5,
        display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 40, height: 1, background: U_COLORS.muted }} />
        <span>25 MI</span>
      </div>
      <div style={{ position: 'absolute', top: 16, left: 40,
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: U_MONO, fontSize: 10, color: U_COLORS.flag, letterSpacing: 1.5, fontWeight: 700 }}>
        <span style={{ width: 6, height: 6, background: U_COLORS.flag, borderRadius: '50%' }} />
        COMMONWEALTH OF KY / TRAINING GROUNDS
      </div>
    </div>
  );
}

function LocationCard({ loc, active, onSelect }) {
  return (
    <button
      onClick={onSelect}
      style={{
        textAlign: 'left', background: active ? U_COLORS.flag : 'transparent',
        color: active ? U_COLORS.ink : U_COLORS.cream,
        border: `1px solid ${active ? U_COLORS.flag : U_COLORS.line}`,
        padding: '20px 22px', cursor: 'pointer', width: '100%',
        display: 'block', fontFamily: 'inherit',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: U_DISPLAY, fontSize: 36, lineHeight: 1,
            color: active ? U_COLORS.ink : U_COLORS.flag }}>{loc.id}</span>
          <span style={{ fontFamily: U_DISPLAY, fontSize: 24, lineHeight: 1, letterSpacing: 0.5 }}>
            {loc.name}
          </span>
        </div>
        {loc.primary && (
          <span style={{ fontFamily: U_MONO, fontSize: 9, letterSpacing: 1.5,
            background: active ? U_COLORS.ink : U_COLORS.blue,
            color: active ? U_COLORS.cream : U_COLORS.cream,
            padding: '3px 6px', fontWeight: 700 }}>HQ</span>
        )}
      </div>
      <div style={{ fontFamily: U_MONO, fontSize: 11, letterSpacing: 1,
        marginTop: 6, opacity: 0.8 }}>
        {loc.addr} · {loc.city}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px',
        marginTop: 14, fontFamily: U_MONO, fontSize: 11, letterSpacing: 0.5 }}>
        <span style={{ opacity: 0.6 }}>DAYS</span>
        <span style={{ fontWeight: 600 }}>{loc.days}</span>
        <span style={{ opacity: 0.6 }}>HOURS</span>
        <span style={{ fontWeight: 600 }}>{loc.hours}</span>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {loc.tags.map(t => (
          <span key={t} style={{ padding: '3px 7px',
            border: `1px solid ${active ? U_COLORS.ink : U_COLORS.cream}`,
            fontFamily: U_MONO, fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
            fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </button>
  );
}

function LocationsSection() {
  const [activeId, setActiveId] = React.useState('01');
  return (
    <section style={{ background: U_COLORS.ink, color: U_COLORS.cream, padding: '120px 40px' }}>
      <UHeader
        file="07"
        label="THE GROUNDS"
        title="WHERE WE<br/><span style='color:#0033A0'>SHOW UP.</span>"
        subtitle="Four fields across the Commonwealth. Pick the one nearest you — or hit all four."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'stretch' }}>
        <BlueprintMap activeId={activeId} setActive={setActiveId} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LOCATIONS.map(loc => (
            <LocationCard key={loc.id} loc={loc}
              active={loc.id === activeId}
              onSelect={() => setActiveId(loc.id)} />
          ))}
        </div>
      </div>

      {/* bottom scoreboard: travel bar */}
      <div style={{ marginTop: 32, background: U_COLORS.blueDeep,
        border: `1px solid ${U_COLORS.line}`, padding: '20px 28px',
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center' }}>
        <div style={{ fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5, color: U_COLORS.flag, fontWeight: 700 }}>
          ● LIVE
        </div>
        <div style={{ display: 'flex', gap: 40, fontFamily: U_MONO, fontSize: 11, letterSpacing: 1, color: U_COLORS.muted, textTransform: 'uppercase' }}>
          <span>INDOOR TURF OPEN — LEX HQ</span>
          <span>LOUISVILLE WAITLIST: 3</span>
          <span>NEXT CAMP — JUN 15 / LEX</span>
        </div>
        <button style={{
          background: U_COLORS.flag, color: U_COLORS.ink, border: 'none',
          padding: '12px 20px', fontFamily: U_MONO, fontSize: 11,
          letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
        }}>Get Directions →</button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW WE TRAIN  (body diagram with hotspots)
// ─────────────────────────────────────────────

const TRAIN_AREAS = [
  {
    id: 'hands', num: '01', name: 'HANDS',
    subtitle: 'Catch · Parry · Distribute',
    pos: { x: 62, y: 30 },
    labelPos: { x: 82, y: 28 },
    desc: 'Low-W, high-W, contour. Ball-strikes that teach pressure-control before we ever add a shot.',
    drills: ['W-catch ladder', 'Wall reaction tennis', 'High-ball contact'],
    minutes: 20,
  },
  {
    id: 'eyes', num: '02', name: 'EYES & READS',
    subtitle: 'Anticipation · Angles',
    pos: { x: 52, y: 17 },
    labelPos: { x: 18, y: 12 },
    desc: 'Scan patterns, body-shape reads on the striker, and angle work at the top of the six.',
    drills: ['Angle shadow', 'Freeze-frame film', '2v1 scan'],
    minutes: 15,
  },
  {
    id: 'core', num: '03', name: 'CORE & FRAME',
    subtitle: 'Power · Landing',
    pos: { x: 50, y: 46 },
    labelPos: { x: 82, y: 50 },
    desc: 'Rotational power and dive-landing mechanics. You save more balls when you can get back up faster.',
    drills: ['Med-ball rotations', 'Crash pad dives', 'Reactive planks'],
    minutes: 20,
  },
  {
    id: 'feet', num: '04', name: 'FEET',
    subtitle: 'Footwork · Distribution',
    pos: { x: 44, y: 85 },
    labelPos: { x: 14, y: 88 },
    desc: 'Lateral shuffles, crossovers, set-feet-before-the-shot, and weight-bearing side volleys.',
    drills: ['Cone shuffle grid', 'Set-feet reads', 'Cross-shoe volley'],
    minutes: 25,
  },
  {
    id: 'mind', num: '05', name: 'MIND',
    subtitle: 'Nerve · Recovery',
    pos: { x: 48, y: 9 },
    labelPos: { x: 82, y: 6 },
    desc: 'Breathwork between shots, mistake-reset protocol, and post-save processing.',
    drills: ['4-4-8 breath', 'Goal-to-goal reset', 'Film debrief'],
    minutes: 10,
  },
];

// A simple silhouette — front-facing keeper stance
function KeeperSilhouette() {
  return (
    <svg viewBox="0 0 200 400" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="u30-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0033A0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#001F66" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      {/* head */}
      <circle cx="100" cy="36" r="22" fill="url(#u30-body)" stroke={U_COLORS.flag} strokeWidth="1.2" />
      {/* neck */}
      <rect x="92" y="54" width="16" height="10" fill="url(#u30-body)" />
      {/* torso (ready stance, shoulders out) */}
      <path d="M 60 70 Q 50 74 46 84 L 40 170 Q 46 200 62 210 L 138 210 Q 154 200 160 170 L 154 84 Q 150 74 140 70 L 100 64 Z"
        fill="url(#u30-body)" stroke={U_COLORS.flag} strokeWidth="1.2" strokeLinejoin="round" />
      {/* gloves (hands out, ready) */}
      <ellipse cx="38" cy="130" rx="18" ry="22" fill={U_COLORS.flag} stroke={U_COLORS.cream} strokeWidth="1.5" />
      <ellipse cx="162" cy="130" rx="18" ry="22" fill={U_COLORS.flag} stroke={U_COLORS.cream} strokeWidth="1.5" />
      {/* arms */}
      <path d="M 46 88 L 36 120 L 38 160" fill="none" stroke="url(#u30-body)" strokeWidth="14" strokeLinecap="round" />
      <path d="M 154 88 L 164 120 L 162 160" fill="none" stroke="url(#u30-body)" strokeWidth="14" strokeLinecap="round" />
      {/* legs in athletic stance */}
      <path d="M 72 210 L 62 320 L 58 360 L 78 362 L 90 320 L 96 220 Z"
        fill="url(#u30-body)" stroke={U_COLORS.flag} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M 128 210 L 138 320 L 142 360 L 122 362 L 110 320 L 104 220 Z"
        fill="url(#u30-body)" stroke={U_COLORS.flag} strokeWidth="1.2" strokeLinejoin="round" />
      {/* cleats */}
      <rect x="54" y="360" width="30" height="8" fill={U_COLORS.cream} />
      <rect x="116" y="360" width="30" height="8" fill={U_COLORS.cream} />
      {/* jersey #30 on chest */}
      <text x="100" y="145" textAnchor="middle" fontFamily="Bebas Neue" fontSize="30"
        fill={U_COLORS.cream} letterSpacing="2" opacity="0.85">30</text>
    </svg>
  );
}

function HotSpot({ area, active, onHover }) {
  return (
    <>
      {/* hotspot dot */}
      <button
        onMouseEnter={() => onHover(area.id)}
        onFocus={() => onHover(area.id)}
        style={{
          position: 'absolute', left: `${area.pos.x}%`, top: `${area.pos.y}%`,
          transform: 'translate(-50%, -50%)',
          width: 32, height: 32, borderRadius: '50%',
          background: active ? U_COLORS.flag : 'rgba(232,115,74,0.2)',
          border: `2px solid ${U_COLORS.flag}`,
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: U_MONO, fontSize: 11, fontWeight: 700,
          color: active ? U_COLORS.ink : U_COLORS.flag,
          boxShadow: active ? `0 0 0 8px rgba(232,115,74,0.2)` : 'none',
          transition: 'all 150ms ease',
        }}
      >
        {area.num}
      </button>
      {/* connecting line + off-body label */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <line
          x1={`${area.pos.x}%`} y1={`${area.pos.y}%`}
          x2={`${area.labelPos.x}%`} y2={`${area.labelPos.y}%`}
          stroke={active ? U_COLORS.flag : U_COLORS.line}
          strokeWidth="1"
          strokeDasharray={active ? '0' : '3 3'}
        />
      </svg>
      <div style={{
        position: 'absolute', left: `${area.labelPos.x}%`, top: `${area.labelPos.y}%`,
        transform: area.labelPos.x > 50 ? 'translate(0, -50%)' : 'translate(-100%, -50%)',
        maxWidth: area.labelPos.x > 50 ? 'calc(100% - ' + area.labelPos.x + '% - 12px)' : `calc(${area.labelPos.x}% - 12px)`,
        paddingLeft: area.labelPos.x > 50 ? 8 : 0,
        paddingRight: area.labelPos.x > 50 ? 0 : 8,
        fontFamily: U_DISPLAY, fontSize: 'clamp(14px, 1.6vw, 22px)', letterSpacing: 1,
        color: active ? U_COLORS.flag : U_COLORS.cream,
        pointerEvents: 'none',
      }}>
        {area.name}
        <div style={{ fontFamily: U_MONO, fontSize: 'clamp(9px, 0.8vw, 10px)', letterSpacing: 1,
          color: U_COLORS.muted, fontWeight: 500, marginTop: 2 }}>
          {area.subtitle}
        </div>
      </div>
    </>
  );
}

function HowWeTrainSection() {
  const [activeId, setActiveId] = React.useState('hands');
  const active = TRAIN_AREAS.find(a => a.id === activeId);
  return (
    <section style={{ background: U_COLORS.blue, color: U_COLORS.cream, padding: '120px 40px', position: 'relative' }}>
      <UHeader
        file="08"
        label="THE CURRICULUM"
        title="HOW WE<br/>TRAIN."
        subtitle="Every session touches five systems. Hover a zone below to see the drills that live there."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'stretch' }}>
        {/* Body diagram */}
        <div style={{
          position: 'relative', background: U_COLORS.blueDeep,
          border: `1px solid ${U_COLORS.line}`, minHeight: 680, overflow: 'hidden',
        }}>
          {/* grid bg */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="u30-gg" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(244,237,224,0.05)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#u30-gg)" />
            {/* crosshair */}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(232,115,74,0.15)" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(232,115,74,0.15)" strokeWidth="1" strokeDasharray="4 6" />
          </svg>

          {/* silhouette — centered, ~70% height */}
          <div style={{ position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', width: 280, height: 580 }}>
            <KeeperSilhouette />
          </div>

          {/* hotspots (in their own absolute layer relative to the box) */}
          {TRAIN_AREAS.map(a => (
            <HotSpot key={a.id} area={a} active={a.id === activeId} onHover={setActiveId} />
          ))}

          {/* HUD text */}
          <div style={{ position: 'absolute', top: 16, left: 24,
            fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5, color: U_COLORS.flag, fontWeight: 700,
            display: 'flex', gap: 14 }}>
            <span>● SUBJECT:</span>
            <span style={{ color: U_COLORS.cream }}>KEEPER / 5-ZONE DIAG</span>
          </div>
          <div style={{ position: 'absolute', bottom: 16, right: 24,
            fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5, color: U_COLORS.muted }}>
            DIAG-V2.6 · U30 CURRICULUM
          </div>
          <CornerMarks inset={12} size={20} color={U_COLORS.flag} />
        </div>

        {/* Detail panel */}
        <div style={{ background: U_COLORS.ink, color: U_COLORS.cream, padding: 32,
          display: 'flex', flexDirection: 'column', border: `1px solid ${U_COLORS.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: U_DISPLAY, fontSize: 64, lineHeight: 0.9,
              color: U_COLORS.flag }}>{active.num}</div>
            <div style={{ fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5,
              color: U_COLORS.muted, textAlign: 'right', lineHeight: 1.5 }}>
              ZONE {active.num} / 05<br/>
              <span style={{ color: U_COLORS.flag }}>{active.minutes} MIN / SESSION</span>
            </div>
          </div>
          <div style={{ fontFamily: U_DISPLAY, fontSize: 48, lineHeight: 0.95,
            letterSpacing: 1, marginTop: 8 }}>{active.name}</div>
          <div style={{ fontFamily: U_MONO, fontSize: 11, letterSpacing: 1.5,
            color: U_COLORS.flag, textTransform: 'uppercase', marginTop: 6 }}>
            {active.subtitle}
          </div>
          <div style={{ fontFamily: U_BODY, fontSize: 14.5, lineHeight: 1.6,
            marginTop: 20, opacity: 0.9 }}>
            {active.desc}
          </div>

          <div style={{ marginTop: 28, paddingTop: 20,
            borderTop: `1px solid ${U_COLORS.line}` }}>
            <div style={{ fontFamily: U_MONO, fontSize: 10, letterSpacing: 1.5,
              color: U_COLORS.muted, marginBottom: 12 }}>DRILL CARD / TOP 3</div>
            {active.drills.map((d, i) => (
              <div key={d} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${U_COLORS.line}`,
              }}>
                <span style={{ fontFamily: U_MONO, fontSize: 10, color: U_COLORS.flag,
                  fontWeight: 700, letterSpacing: 1 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontFamily: U_BODY, fontSize: 14, fontWeight: 500 }}>{d}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 28 }}>
            <button style={{
              width: '100%', background: U_COLORS.flag, color: U_COLORS.ink, border: 'none',
              padding: '16px 20px', fontFamily: U_MONO, fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
            }}>See Full Curriculum →</button>
          </div>

          {/* selector pips */}
          <div style={{ marginTop: 20, display: 'flex', gap: 6 }}>
            {TRAIN_AREAS.map(a => (
              <button key={a.id} onClick={() => setActiveId(a.id)} style={{
                flex: 1, height: 4, border: 'none',
                background: a.id === activeId ? U_COLORS.flag : U_COLORS.line,
                cursor: 'pointer', padding: 0,
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PREVIEW WRAPPER
// ─────────────────────────────────────────────

function SiteNav() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 40px', background: U_COLORS.cream, color: U_COLORS.ink,
      borderBottom: `2px solid ${U_COLORS.ink}`,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, minWidth: 0 }}>
        <div style={{
          width: 36, height: 36, background: U_COLORS.blue, color: U_COLORS.cream,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: U_DISPLAY, fontSize: 16, fontWeight: 700, letterSpacing: 1, flexShrink: 0,
        }}>U30</div>
        <div style={{ fontFamily: U_DISPLAY, fontSize: 22, letterSpacing: 1.5, whiteSpace: 'nowrap' }}>UNION 30</div>
      </div>
      <nav style={{ display: 'flex', gap: 24, fontFamily: U_MONO, fontSize: 11,
        letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>
        <span>Home</span><span>About</span><span>Training</span><span>News</span>
      </nav>
      <button style={{
        background: U_COLORS.ink, color: U_COLORS.cream, border: 'none',
        padding: '10px 18px', fontFamily: U_MONO, fontSize: 11,
        letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
      }}>Join The Union →</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <SiteNav />
      <div style={{
        background: U_COLORS.ink, color: U_COLORS.muted,
        padding: '14px 40px', borderBottom: `1px solid ${U_COLORS.line}`,
        fontFamily: U_MONO, fontSize: 11, letterSpacing: 1.5,
        textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>◆ Preview — Two new sections for union30.com</span>
        <span style={{ color: U_COLORS.flag }}>FILE 07 · FILE 08</span>
      </div>

      <LocationsSection />
      <UTicker items={['4 GROUNDS', 'COMMONWEALTH OF KY', 'SPRING OPEN', 'LEXINGTON · LOUISVILLE · GEORGETOWN · RICHMOND']} bg={U_COLORS.cream} fg={U_COLORS.ink} />
      <HowWeTrainSection />
      <UTicker items={['5 ZONES', 'HANDS · EYES · CORE · FEET · MIND', 'ONE KEEPER', 'DIAG V2.6']} bg={U_COLORS.ink} fg={U_COLORS.cream} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
