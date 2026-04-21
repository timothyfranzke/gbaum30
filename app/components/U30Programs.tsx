import { MONTHLY_PLANS, SESSION_PACKS, type PlanConfig, type PlanPrices } from '@/app/config/plans';

interface ProgramRowProps {
  idx: number;
  name: string;
  tag: string;
  price: string;
  unit: string;
  desc: string;
  items: string[];
  featured?: boolean;
  href?: string;
}

function ProgramRow({ idx, name, tag, price, unit, desc, items, featured, href = '#booking' }: ProgramRowProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[60px_1.2fr_2fr_1fr_160px] gap-6 items-center px-6 py-8 border-t ${
      featured ? 'bg-flag text-ink border-ink' : 'bg-transparent text-cream border-cream/20'
    }`}>
      <div className="font-display text-[56px] leading-none opacity-40 hidden md:block">
        {String(idx).padStart(2, '0')}
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[1.5px] opacity-70 mb-1.5">{tag}</div>
        <div className="font-display text-[40px] leading-[0.9] tracking-[0.5px]">{name}</div>
      </div>
      <div className="text-[13.5px] leading-[1.55] opacity-90">
        {desc}
        <div className="mt-3 flex gap-3.5 flex-wrap font-mono text-[10px] tracking-wider">
          {items.map(item => (
            <span key={item} className={`px-2 py-1 border uppercase ${featured ? 'border-ink' : 'border-cream'}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="font-display text-5xl leading-none">{price}</div>
        <div className="font-mono text-[10px] tracking-wider opacity-70">{unit}</div>
      </div>
      <a href={href} target={href.startsWith('#') ? undefined : '_blank'} rel={href.startsWith('#') ? undefined : 'noopener noreferrer'} className={`px-5 py-4 font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer text-center transition-colors ${
        featured ? 'bg-ink text-cream hover:bg-blue-dark' : 'bg-flag text-ink hover:bg-cream'
      }`}>
        Reserve &rarr;
      </a>
    </div>
  );
}

function StackedLabel({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl leading-none text-flag">{top}</div>
      <div className="font-display text-2xl leading-none text-cream/70">{bottom}</div>
    </div>
  );
}

function displayPrice(plan: PlanConfig, prices: PlanPrices): string {
  const amount = prices[plan.id] ?? plan.fallbackPrice;
  return `$${amount}`;
}

export default function U30Programs({ prices }: { prices: PlanPrices }) {
  return (
    <section id="programs" className="bg-ink text-cream py-[120px] px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
        <div>
          <div className="font-mono text-[11px] text-flag tracking-[2px]">THE OFFERINGS</div>
          <h2 className="font-display text-[clamp(64px,9vw,120px)] leading-[0.9] tracking-tight mt-2">
            JOIN THE<br/><span className="text-blue">UNION.</span>
          </h2>
        </div>
        <div className="flex gap-8">
          <StackedLabel top="COMMUNITY" bottom="DRIVEN" />
          <StackedLabel top="GROWTH" bottom="MINDSET" />
          <StackedLabel top="SHARED" bottom="PASSION" />
        </div>
      </div>

      <div>
        {MONTHLY_PLANS.map((plan, i) => (
          <ProgramRow
            key={plan.id}
            idx={i + 1}
            name={plan.name}
            tag={plan.tag}
            price={displayPrice(plan, prices)}
            unit={plan.unit}
            desc={plan.desc}
            items={plan.items}
            featured={plan.featured}
            href={plan.href}
          />
        ))}
      </div>

      {/* Session Packs */}
      <div className="mt-16 pt-16 border-t border-cream/20">
        <div className="font-mono text-[11px] text-flag tracking-[2px] mb-8">SESSION PACKS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SESSION_PACKS.map((pack) => (
            <div key={pack.id} className="border border-cream/20 p-8">
              <div className="font-display text-[32px] tracking-[0.5px]">{pack.name}</div>
              <div className="font-mono text-[10px] tracking-[1.5px] text-muted mt-1 mb-4">{pack.tag}</div>
              <div className="font-display text-5xl text-flag">{displayPrice(pack, prices)}</div>
              <p className="text-sm text-cream/80 mt-4 leading-relaxed">{pack.desc}</p>
              <div className="mt-4 flex gap-2 flex-wrap font-mono text-[10px] tracking-wider">
                {pack.items.map(item => (
                  <span key={item} className="px-2 py-1 border border-cream uppercase">{item}</span>
                ))}
              </div>
              <a href={pack.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-5 py-4 font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer text-center transition-colors bg-flag text-ink hover:bg-cream">
                Reserve &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
