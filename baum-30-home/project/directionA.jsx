// Direction A — Editorial Sports Magazine
// Portrait-led, bold serif display, structured grid, numbered sections

const A_COLORS = {
  blue: '#0033A0',      // UK royal blue
  cream: '#F4EDE0',
  ink: '#0A0E1A',
  paper: '#FBF8F2',
  ember: '#E8734A',
  muted: '#6B7280',
  rule: '#1A1F2E',
};

const A_FONT_DISPLAY = '"Archivo Black", "Arial Black", sans-serif';
const A_FONT_BODY = '"Inter", system-ui, sans-serif';
const A_FONT_MONO = '"JetBrains Mono", ui-monospace, monospace';
const A_FONT_SERIF = '"Fraunces", "Playfair Display", serif'; // only for one editorial accent

// Placeholder image block — diagonal stripes with monospace label
function APlaceholder({ label, ratio = '4/5', bg = '#1A2238', fg = 'rgba(255,255,255,0.08)', tone = 'light', style = {} }) {
  const id = 'ap-' + Math.random().toString(36).slice(2, 7);
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      background: bg, overflow: 'hidden', ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="14" height="14" fill={bg} />
            <line x1="0" y1="0" x2="0" y2="14" stroke={fg} strokeWidth="14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
        padding: 14, fontFamily: A_FONT_MONO, fontSize: 10,
        color: tone === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
        letterSpacing: 0.5, textTransform: 'uppercase',
      }}>
        <span>◳ {label}</span>
      </div>
    </div>
  );
}

// ────────────── NAV ──────────────
function ANav() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 40px', borderBottom: `1px solid ${A_COLORS.rule}`,
      background: A_COLORS.ink, color: A_COLORS.cream,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 18, letterSpacing: -0.5 }}>GRUENEBAUM</div>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 10, color: A_COLORS.muted, letterSpacing: 1 }}>/ KEEPER SCHOOL</div>
      </div>
      <nav style={{ display: 'flex', gap: 28, fontFamily: A_FONT_MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
        <span>About</span><span>Programs</span><span>Staff</span><span>Gallery</span><span>Testimonials</span>
      </nav>
      <button style={{
        background: A_COLORS.ember, color: A_COLORS.ink, border: 'none',
        padding: '10px 18px', fontFamily: A_FONT_MONO, fontSize: 11,
        letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
      }}>Book Training →</button>
    </div>
  );
}

// ────────────── HERO ──────────────
function AHero() {
  return (
    <section style={{ background: A_COLORS.ink, color: A_COLORS.cream, padding: '40px 40px 60px' }}>
      {/* top meta strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 1.5,
        textTransform: 'uppercase', color: A_COLORS.muted,
        paddingBottom: 30, borderBottom: `1px solid ${A_COLORS.rule}`,
      }}>
        <span>Vol. XIX — Issue 01</span>
        <span>Louisville, KY</span>
        <span style={{ color: A_COLORS.ember }}>● Spring Camps Open</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 48, marginTop: 40 }}>
        {/* Left: type */}
        <div>
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2, marginBottom: 24 }}>
            № 01 — THE KEEPER
          </div>
          <h1 style={{
            fontFamily: A_FONT_DISPLAY, fontSize: 120, lineHeight: 0.92,
            margin: 0, letterSpacing: -3, textTransform: 'uppercase',
          }}>
            Hands of<br/>
            <span style={{ color: A_COLORS.blue, WebkitTextStroke: `2px ${A_COLORS.cream}`, background: 'transparent', display: 'inline-block' }}>Kentucky.</span>
          </h1>
          <p style={{
            fontFamily: A_FONT_BODY, fontSize: 18, lineHeight: 1.5,
            maxWidth: 480, marginTop: 32, color: 'rgba(244,237,224,0.85)',
          }}>
            Andy Gruenebaum spent two decades between the posts in MLS and NASL.
            Now he's teaching the next generation of keepers what it actually
            takes — footwork, reads, nerve — one save at a time.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
            <button style={{
              background: A_COLORS.ember, color: A_COLORS.ink, border: 'none',
              padding: '16px 28px', fontFamily: A_FONT_MONO, fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
            }}>Book a Session →</button>
            <button style={{
              background: 'transparent', color: A_COLORS.cream,
              border: `1px solid ${A_COLORS.cream}`,
              padding: '16px 28px', fontFamily: A_FONT_MONO, fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
            }}>Watch Film</button>
          </div>

          {/* stat strip */}
          <div style={{
            marginTop: 64, paddingTop: 32, borderTop: `1px solid ${A_COLORS.rule}`,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }}>
            {[
              ['19', 'YRS PRO'],
              ['240+', 'CAREER STARTS'],
              ['11', 'CLEAN SHEETS / ’14'],
              ['800+', 'KEEPERS COACHED'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 44, lineHeight: 1, color: A_COLORS.cream }}>{n}</div>
                <div style={{ fontFamily: A_FONT_MONO, fontSize: 10, color: A_COLORS.muted, letterSpacing: 1.5, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div>
          <div style={{ position: 'relative' }}>
            <APlaceholder label="Portrait / Andy, gloves on, field" ratio="4/5" bg="#0A1428" />
            {/* caption band */}
            <div style={{
              position: 'absolute', bottom: -1, left: -1, right: -1,
              background: A_COLORS.ember, color: A_COLORS.ink,
              padding: '14px 18px', fontFamily: A_FONT_MONO, fontSize: 11,
              letterSpacing: 1, textTransform: 'uppercase',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>Andy Gruenebaum, #1</span>
              <span>2004 — 2022</span>
            </div>
          </div>
          <div style={{
            fontFamily: A_FONT_SERIF, fontStyle: 'italic', fontSize: 14,
            color: A_COLORS.muted, marginTop: 14, lineHeight: 1.5,
          }}>
            "Goalkeeping is loneliness with purpose. You learn to love the silence
            before the shot."
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────── ABOUT ──────────────
function AAbout() {
  return (
    <section style={{ background: A_COLORS.paper, color: A_COLORS.ink, padding: '100px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 02</div>
          <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 44, lineHeight: 0.95, marginTop: 12, textTransform: 'uppercase' }}>
            The<br/>Résumé.
          </div>
        </div>
        <div>
          <div style={{ fontFamily: A_FONT_SERIF, fontSize: 28, lineHeight: 1.35, letterSpacing: -0.3, marginBottom: 40 }}>
            Drafted out of UK in 2004. Started between the posts at Columbus, Sporting KC, and Chivas USA.
            Two-time goalkeeper of the year nominee. Now he brings every rep of that career to a muddy
            Tuesday-night clinic in Lexington.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, fontFamily: A_FONT_BODY, fontSize: 14, lineHeight: 1.6 }}>
            <div>
              <div style={{ fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 1.5, color: A_COLORS.blue, marginBottom: 10 }}>PLAYING CAREER</div>
              {[
                ['2019 — 2022', 'Indy Eleven', 'USL Championship'],
                ['2013 — 2018', 'Sporting Kansas City', 'MLS'],
                ['2010 — 2012', 'Chivas USA', 'MLS'],
                ['2004 — 2009', 'Columbus Crew', 'MLS'],
              ].map(([y, c, l]) => (
                <div key={y} style={{ display: 'flex', gap: 16, padding: '10px 0', borderTop: '1px solid rgba(10,14,26,0.1)' }}>
                  <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, width: 100, color: A_COLORS.muted }}>{y}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{c}</div>
                    <div style={{ fontSize: 12, color: A_COLORS.muted }}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 1.5, color: A_COLORS.blue, marginBottom: 10 }}>HONORS & CERTS</div>
              {[
                ['2014', 'MLS GK of the Month (Sep)'],
                ['2013', 'MLS Save of the Week ×3'],
                ['2008', 'UK Athletics Hall of Fame'],
                ['—', 'USSF "A" License'],
                ['—', 'NSCAA Advanced GK Diploma'],
              ].map(([y, a], i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderTop: '1px solid rgba(10,14,26,0.1)' }}>
                  <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, width: 100, color: A_COLORS.muted }}>{y}</div>
                  <div style={{ flex: 1, fontWeight: 500 }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────── PROGRAMS ──────────────
function AProgramCard({ idx, name, price, unit, desc, bullets, featured }) {
  const fg = featured ? A_COLORS.cream : A_COLORS.ink;
  const bg = featured ? A_COLORS.blue : A_COLORS.paper;
  return (
    <div style={{
      background: bg, color: fg, padding: '32px 28px', position: 'relative',
      border: featured ? 'none' : `1px solid ${A_COLORS.ink}`,
      display: 'flex', flexDirection: 'column', minHeight: 440,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 2, opacity: 0.7 }}>№ 0{idx}</div>
        {featured && (
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 9, letterSpacing: 1.5, background: A_COLORS.ember, color: A_COLORS.ink, padding: '4px 8px', fontWeight: 700 }}>
            MOST BOOKED
          </div>
        )}
      </div>
      <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 32, lineHeight: 0.95, textTransform: 'uppercase', marginTop: 20, letterSpacing: -1 }}>
        {name}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 12 }}>
        <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 36, lineHeight: 1 }}>${price}</div>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, opacity: 0.7 }}>/ {unit}</div>
      </div>
      <div style={{ fontFamily: A_FONT_BODY, fontSize: 13, lineHeight: 1.55, marginTop: 18, opacity: 0.9 }}>
        {desc}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', fontFamily: A_FONT_BODY, fontSize: 12.5, lineHeight: 1.7 }}>
        {bullets.map(b => (
          <li key={b} style={{ paddingLeft: 18, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: featured ? A_COLORS.ember : A_COLORS.blue }}>→</span>{b}
          </li>
        ))}
      </ul>
      <button style={{
        marginTop: 'auto', marginBlockStart: 28,
        background: featured ? A_COLORS.ember : A_COLORS.ink, color: featured ? A_COLORS.ink : A_COLORS.cream,
        border: 'none', padding: '14px 18px', fontFamily: A_FONT_MONO, fontSize: 11,
        letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
      }}>Reserve →</button>
    </div>
  );
}

function APrograms() {
  return (
    <section style={{ background: A_COLORS.ink, color: A_COLORS.cream, padding: '100px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 03</div>
          <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 72, lineHeight: 0.95, marginTop: 8, textTransform: 'uppercase', letterSpacing: -2 }}>
            Train with<br/>Intent.
          </div>
        </div>
        <div style={{ fontFamily: A_FONT_BODY, fontSize: 14, maxWidth: 360, color: 'rgba(244,237,224,0.7)', lineHeight: 1.55 }}>
          Three formats, one philosophy: every rep is diagnosed, every session ends with film. Ages 8–18.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <AProgramCard idx={1} name="1-on-1 Privates" price={110} unit="session" desc="Diagnostic-led private work. You bring a problem, Andy brings the reps." bullets={['60-min focused session', 'Slow-mo film review', 'Home-work drill card', 'Lexington or Louisville']} />
        <AProgramCard idx={2} name="Weekly Clinic" price={40} unit="week" desc="Small-group technical work. Same night, same field, every week." bullets={['90-min group session', '4:1 keeper-to-coach', 'Tuesday + Thursday', 'Rolling enrollment']} featured />
        <AProgramCard idx={3} name="Summer Camp" price={395} unit="week" desc="Four-day intensive. Breakfast, film, field, lift, repeat." bullets={['June, July, August', '3 age groups', 'Guest pro keepers', 'Jersey + gloves included']} />
      </div>
    </section>
  );
}

// ────────────── STAFF ──────────────
function ACoachCard({ name, role, bio, placeholderLabel, accent }) {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <APlaceholder label={placeholderLabel} ratio="1/1" bg="#0A1428" />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: accent, color: A_COLORS.ink,
          fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 1.5,
          padding: '4px 8px', textTransform: 'uppercase', fontWeight: 700,
        }}>{role}</div>
      </div>
      <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 22, textTransform: 'uppercase', marginTop: 14, letterSpacing: -0.5 }}>{name}</div>
      <div style={{ fontFamily: A_FONT_BODY, fontSize: 13, color: A_COLORS.muted, marginTop: 8, lineHeight: 1.5 }}>{bio}</div>
    </div>
  );
}

function AStaff() {
  return (
    <section style={{ background: A_COLORS.paper, color: A_COLORS.ink, padding: '100px 40px' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 04</div>
        <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 60, lineHeight: 0.95, marginTop: 8, textTransform: 'uppercase', letterSpacing: -2 }}>
          The Staff.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        <ACoachCard name="Andy Gruenebaum" role="Head Coach" bio="Ex-MLS keeper. Founder. Designs curriculum. Runs privates." placeholderLabel="Coach portrait 01" accent={A_COLORS.ember} />
        <ACoachCard name="Marta Velez" role="Assistant" bio="Former D1 keeper at Louisville. Leads ages 8–12." placeholderLabel="Coach portrait 02" accent={A_COLORS.blue} />
        <ACoachCard name="Derrick Shaw" role="S & C" bio="Strength coach. Keeper-specific mobility and power." placeholderLabel="Coach portrait 03" accent={A_COLORS.blue} />
        <ACoachCard name="Jamie Oduya" role="Film" bio="Video analyst. Breaks down your week in under 10 min." placeholderLabel="Coach portrait 04" accent={A_COLORS.blue} />
      </div>
    </section>
  );
}

// ────────────── TESTIMONIALS ──────────────
function ATestimonials() {
  const quotes = [
    { q: "Six months with Andy and my son stopped flinching on shots. That's not technique — that's nerve he didn't have before.", who: "Parent, U14 keeper", place: "Lexington" },
    { q: "He doesn't talk to kids like they're kids. He talks to them like keepers. My daughter left camp a different player.", who: "Parent, U16 keeper", place: "Louisville" },
    { q: "I got a college offer because of the film Andy cut for me. He sees the game nobody else does.", who: "Player, 2025 commit", place: "Georgetown, KY" },
  ];
  return (
    <section style={{ background: A_COLORS.blue, color: A_COLORS.cream, padding: '100px 40px' }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 05</div>
        <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 60, lineHeight: 0.95, marginTop: 8, textTransform: 'uppercase', letterSpacing: -2 }}>
          From the<br/>Touchline.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {quotes.map((t, i) => (
          <div key={i} style={{ borderTop: `2px solid ${A_COLORS.cream}`, paddingTop: 20 }}>
            <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 40, lineHeight: 1, color: A_COLORS.ember }}>"</div>
            <div style={{ fontFamily: A_FONT_SERIF, fontStyle: 'italic', fontSize: 20, lineHeight: 1.4, marginTop: 8, letterSpacing: -0.2 }}>{t.q}</div>
            <div style={{ marginTop: 20, fontFamily: A_FONT_MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(244,237,224,0.7)' }}>
              {t.who} — {t.place}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────── GALLERY ──────────────
function AGallery() {
  return (
    <section style={{ background: A_COLORS.ink, color: A_COLORS.cream, padding: '100px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 06</div>
          <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 60, lineHeight: 0.95, marginTop: 8, textTransform: 'uppercase', letterSpacing: -2 }}>
            The Archive.
          </div>
        </div>
        <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.muted, letterSpacing: 1 }}>124 PHOTOS · 18 FILMS</div>
      </div>
      <div style={{
        display: 'grid', gap: 12,
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: 140,
      }}>
        <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}><APlaceholder label="Camp huddle '24" ratio="1/1" bg="#0A1428" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Dive save" ratio="2/1" bg="#0033A0" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Film session" ratio="2/1" bg="#1A2238" /></div>
        <div style={{ gridColumn: 'span 1' }}><APlaceholder label="Gloves" ratio="1/1" bg="#E8734A" tone="dark" /></div>
        <div style={{ gridColumn: 'span 1' }}><APlaceholder label="Coach andy" ratio="1/1" bg="#1A2238" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Camp '25 group" ratio="2/1" bg="#0A1428" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Goal net / evening" ratio="2/1" bg="#0033A0" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Young keeper, focus" ratio="2/1" bg="#1A2238" /></div>
        <div style={{ gridColumn: 'span 2' }}><APlaceholder label="Post-save celebration" ratio="2/1" bg="#0A1428" /></div>
      </div>
    </section>
  );
}

// ────────────── BOOKING ──────────────
function ABooking({ form, setForm }) {
  const labelStyle = {
    display: 'block', fontFamily: A_FONT_MONO, fontSize: 10,
    letterSpacing: 1.5, textTransform: 'uppercase', color: A_COLORS.muted, marginBottom: 8,
  };
  const inputStyle = {
    width: '100%', padding: '12px 14px', background: A_COLORS.paper,
    border: `1px solid ${A_COLORS.ink}`, fontFamily: A_FONT_BODY, fontSize: 14,
    color: A_COLORS.ink, outline: 'none', boxSizing: 'border-box',
  };
  const radioRow = (name, options) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(o => (
        <label key={o} style={{
          padding: '10px 14px',
          border: `1px solid ${form[name] === o ? A_COLORS.ember : A_COLORS.ink}`,
          background: form[name] === o ? A_COLORS.ember : A_COLORS.paper,
          color: form[name] === o ? A_COLORS.ink : A_COLORS.ink,
          fontFamily: A_FONT_MONO, fontSize: 11, letterSpacing: 1,
          textTransform: 'uppercase', cursor: 'pointer', fontWeight: form[name] === o ? 700 : 500,
        }}>
          <input type="radio" name={name} value={o} checked={form[name] === o}
            onChange={() => setForm({ ...form, [name]: o })}
            style={{ display: 'none' }} />
          {o}
        </label>
      ))}
    </div>
  );
  return (
    <section id="book" style={{ background: A_COLORS.cream, color: A_COLORS.ink, padding: '100px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 2 }}>№ 07</div>
          <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 60, lineHeight: 0.95, marginTop: 8, textTransform: 'uppercase', letterSpacing: -2 }}>
            Book a<br/>Session.
          </div>
          <div style={{ fontFamily: A_FONT_BODY, fontSize: 14, lineHeight: 1.55, marginTop: 24, color: A_COLORS.muted }}>
            Tell us a little about the keeper. Andy replies within 24 hours with a
            session offer and an invoice.
          </div>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${A_COLORS.ink}`, fontFamily: A_FONT_MONO, fontSize: 11, lineHeight: 2, color: A_COLORS.muted, letterSpacing: 0.5 }}>
            <div>andy@gruenebaum.keeper</div>
            <div>(859) 555-0117</div>
            <div>Lexington, KY · Louisville, KY</div>
          </div>
        </div>
        <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          onSubmit={(e) => { e.preventDefault(); setForm({ ...form, submitted: true }); }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Program</label>
            {radioRow('program', ['1-on-1 Private', 'Weekly Clinic', 'Summer Camp'])}
          </div>
          <div>
            <label style={labelStyle}>Parent / Guardian</label>
            <input style={inputStyle} placeholder="Sarah Miller" value={form.parent} onChange={e => setForm({ ...form, parent: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} placeholder="sarah@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Player Name</label>
            <input style={inputStyle} placeholder="Jordan Miller" value={form.player} onChange={e => setForm({ ...form, player: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Player Age</label>
            <input style={inputStyle} placeholder="14" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Experience</label>
            {radioRow('exp', ['Brand new', '1-2 yrs', '3-5 yrs', 'Club / select'])}
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>What do you want to work on?</label>
            <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical', fontFamily: A_FONT_BODY }}
              placeholder="Footwork on crosses has been shaky, and she wants to get more confident coming off her line..."
              value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
            <button type="submit" style={{
              background: A_COLORS.ink, color: A_COLORS.cream, border: 'none',
              padding: '18px 32px', fontFamily: A_FONT_MONO, fontSize: 12,
              letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer',
            }}>Send Request →</button>
            {form.submitted && (
              <div style={{ fontFamily: A_FONT_MONO, fontSize: 11, color: A_COLORS.ember, letterSpacing: 1 }}>
                ✓ SENT — ANDY WILL REPLY WITHIN 24H
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

// ────────────── FOOTER ──────────────
function AFooter() {
  return (
    <footer style={{ background: A_COLORS.ink, color: A_COLORS.cream, padding: '60px 40px 30px' }}>
      <div style={{ fontFamily: A_FONT_DISPLAY, fontSize: 120, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: -4, color: A_COLORS.blue, WebkitTextStroke: `2px ${A_COLORS.cream}` }}>
        KEEPER<br/>SCHOOL.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40, paddingTop: 20, borderTop: `1px solid ${A_COLORS.rule}`, fontFamily: A_FONT_MONO, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: A_COLORS.muted }}>
        <span>© 2026 Andy Gruenebaum</span>
        <span>Lexington · Louisville · Kentucky</span>
        <span>Instagram · YouTube</span>
      </div>
    </footer>
  );
}

// ────────────── PAGE ──────────────
function DirectionA() {
  const [form, setForm] = React.useState({
    program: '1-on-1 Private', parent: '', email: '', player: '', age: '',
    exp: '1-2 yrs', notes: '', submitted: false,
  });
  return (
    <div style={{ background: A_COLORS.ink, fontFamily: A_FONT_BODY }}>
      <ANav />
      <AHero />
      <AAbout />
      <APrograms />
      <AStaff />
      <ATestimonials />
      <AGallery />
      <ABooking form={form} setForm={setForm} />
      <AFooter />
    </div>
  );
}

window.DirectionA = DirectionA;
