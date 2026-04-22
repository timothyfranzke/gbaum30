'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PlanDoc } from '@/app/lib/types';

export default function PlansListPage() {
  const [plans, setPlans] = useState<PlanDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/plans')
      .then(res => res.json())
      .then(data => { setPlans(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[40px] text-cream">Plans</h1>
        <div className="font-mono text-[10px] text-cream/40 tracking-wider">
          Plans map 1:1 to PushPress — no create/delete
        </div>
      </div>

      <div className="border border-cream/10">
        <div className="grid grid-cols-[60px_1fr_100px_80px_80px_80px] gap-4 px-4 py-3 border-b border-cream/10 font-mono text-[10px] tracking-[1.5px] text-muted">
          <div>SORT</div>
          <div>NAME</div>
          <div>TYPE</div>
          <div>PRICE</div>
          <div>FEAT.</div>
          <div>ACTIONS</div>
        </div>

        {plans.map(plan => (
          <div key={plan.id} className="grid grid-cols-[60px_1fr_100px_80px_80px_80px] gap-4 px-4 py-4 border-b border-cream/5 items-center">
            <div className="font-mono text-sm text-cream/50">{plan.sortOrder}</div>
            <div className="text-sm text-cream">{plan.name}</div>
            <div className="font-mono text-[10px] text-cream/60 uppercase">{plan.type}</div>
            <div className="text-sm text-cream/70">${plan.fallbackPrice}</div>
            <div className="text-sm">{plan.featured ? '⭐' : '—'}</div>
            <Link href={`/admin/plans/${plan.id}`} className="font-mono text-[10px] text-flag hover:text-cream transition-colors">
              EDIT
            </Link>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="px-4 py-8 text-center text-cream/30 font-mono text-sm">
            No plans found — run the seed script
          </div>
        )}
      </div>
    </div>
  );
}
