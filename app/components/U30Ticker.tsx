'use client';

interface TickerProps {
  items: string[];
  bg?: string;
  fg?: string;
}

export default function U30Ticker({ items, bg = 'bg-flag', fg = 'text-ink' }: TickerProps) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className={`${bg} ${fg} py-[10px] overflow-hidden border-t border-b border-ink`}>
      <div className="ticker-animate flex gap-10 whitespace-nowrap font-mono text-[11px] tracking-[1.5px] uppercase font-bold">
        {repeated.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {t}<span className="opacity-50">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
