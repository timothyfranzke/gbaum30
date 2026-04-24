'use client';

import { useState } from 'react';

export default function U30Booking() {
  const [form, setForm] = useState({
    program: 'CLINIC',
    parent: '',
    email: '',
    player: '',
    age: '',
    exp: '1-2 YRS',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const Chip = ({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 font-mono text-[11px] tracking-wider uppercase cursor-pointer border-2 transition-colors ${
        active
          ? 'bg-flag text-ink border-flag font-bold'
          : 'bg-transparent text-cream border-cream font-medium hover:border-flag'
      }`}
    >
      {children}
    </button>
  );

  return (
    <section id="booking" aria-label="Book a session" className="bg-blue-dark text-cream py-[120px] px-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 items-start">
        {/* Left info */}
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">BOOK IT</div>
          <h2 className="font-display text-[clamp(72px,10vw,140px)] leading-[0.88] tracking-tight mt-2">
            GET IN<br/><span className="text-flag">THE BOX.</span>
          </h2>
          <p className="text-base leading-[1.55] mt-8 max-w-[400px] opacity-80">
            Join the Union 30 family. Tell us about your player and we&apos;ll follow up to discuss goals, availability, and get them scheduled for an evaluation.
          </p>
          <div className="mt-12 grid gap-2.5 font-mono text-xs tracking-[0.5px]">
            <div>&#9656; info@union30.com</div>
            <div>&#9656; Overland Park &middot; KS</div>
          </div>

          {/* Process steps */}
          <div className="mt-12 grid gap-4">
            {[
              ['01', 'CONNECT', 'Tell us about your player and their background.'],
              ['02', 'COLLABORATE', 'We discuss goals, availability, and scheduling.'],
              ['03', 'ASSESS', 'Your player joins a session for evaluation.'],
              ['04', 'COMMIT', "You're part of the Union. Subscribe and train elite."],
            ].map(([num, title, desc]) => (
              <div key={num} className="flex gap-4 items-start">
                <div className="font-display text-2xl text-flag leading-none mt-0.5">{num}</div>
                <div>
                  <div className="font-mono text-[10px] tracking-[1.5px] font-bold">{title}</div>
                  <div className="text-xs opacity-70 mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Program</label>
          <div className="flex gap-2 flex-wrap mb-8">
            {['PRIVATE', 'CLINIC', 'CAMP'].map(p => (
              <Chip key={p} active={form.program === p} onClick={() => setForm({ ...form, program: p })}>{p}</Chip>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div>
              <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Parent</label>
              <input
                className="w-full p-3.5 bg-transparent border-b-2 border-cream text-cream text-base outline-none focus:border-flag transition-colors placeholder:text-cream/40"
                placeholder="Sarah Miller"
                value={form.parent}
                onChange={e => setForm({ ...form, parent: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Email</label>
              <input
                className="w-full p-3.5 bg-transparent border-b-2 border-cream text-cream text-base outline-none focus:border-flag transition-colors placeholder:text-cream/40"
                placeholder="sarah@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Player Name</label>
              <input
                className="w-full p-3.5 bg-transparent border-b-2 border-cream text-cream text-base outline-none focus:border-flag transition-colors placeholder:text-cream/40"
                placeholder="Jordan Miller"
                value={form.player}
                onChange={e => setForm({ ...form, player: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Age</label>
              <input
                className="w-full p-3.5 bg-transparent border-b-2 border-cream text-cream text-base outline-none focus:border-flag transition-colors placeholder:text-cream/40"
                placeholder="14"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">Experience</label>
            <div className="flex gap-2 flex-wrap">
              {['NEW', '1-2 YRS', '3-5 YRS', 'CLUB'].map(p => (
                <Chip key={p} active={form.exp === p} onClick={() => setForm({ ...form, exp: p })}>{p}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <label className="block font-mono text-[10px] tracking-[1.5px] uppercase text-muted mb-2 font-bold">What do you want to work on?</label>
            <textarea
              className="w-full p-3.5 bg-transparent border-b-2 border-cream text-cream text-base outline-none min-h-[80px] resize-y focus:border-flag transition-colors placeholder:text-cream/40"
              placeholder="Coming off her line on crosses, and dealing with low drives to the near post..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="mt-10 flex items-center gap-6">
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="bg-flag text-ink px-9 py-5 font-display text-xl tracking-[2px] cursor-pointer hover:bg-cream transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'SENDING...' : 'SEND IT'} &rarr;
            </button>
            {status === 'sent' && (
              <div className="font-mono text-[11px] text-flag tracking-wider">
                &#10003; RECEIVED. ANDY REPLIES WITHIN 24H.
              </div>
            )}
            {status === 'error' && (
              <div className="font-mono text-[11px] text-red-400 tracking-wider">
                &#10007; SOMETHING WENT WRONG. TRY AGAIN.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
