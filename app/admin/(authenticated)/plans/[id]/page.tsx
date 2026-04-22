'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { PlanDoc } from '@/app/lib/types';

export default function EditPlanPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [plan, setPlan] = useState<PlanDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    tag: '',
    fallbackPrice: 0,
    unit: '',
    desc: '',
    items: '',
    featured: false,
    href: '',
    type: 'monthly' as 'monthly' | 'pack',
    sortOrder: 0,
  });

  useEffect(() => {
    fetch(`/api/admin/plans/${id}`)
      .then(res => res.json())
      .then((data: PlanDoc) => {
        setPlan(data);
        setForm({
          name: data.name,
          tag: data.tag,
          fallbackPrice: data.fallbackPrice,
          unit: data.unit,
          desc: data.desc,
          items: data.items.join('\n'),
          featured: data.featured || false,
          href: data.href,
          type: data.type,
          sortOrder: data.sortOrder,
        });
        setLoading(false);
      });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`/api/admin/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          tag: form.tag,
          fallbackPrice: Number(form.fallbackPrice),
          unit: form.unit,
          desc: form.desc,
          items: form.items.split('\n').map(s => s.trim()).filter(Boolean),
          featured: form.featured,
          href: form.href,
          type: form.type,
          sortOrder: Number(form.sortOrder),
        }),
      });
      router.push('/admin/plans');
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;
  if (!plan) return <div className="text-red-400 font-mono text-sm">Plan not found</div>;

  return (
    <div>
      <h1 className="font-display text-[40px] text-cream mb-8">Edit: {plan.name}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">PUSHPRESS ID</label>
          <div className="px-4 py-3 bg-cream/5 border border-cream/10 text-cream/50 text-sm font-mono">
            {plan.pushpressId}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">NAME</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">TAG</label>
            <input name="tag" value={form.tag} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">FALLBACK PRICE</label>
            <input name="fallbackPrice" type="number" value={form.fallbackPrice} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">UNIT</label>
            <input name="unit" value={form.unit} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">TYPE</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none">
              <option value="monthly">Monthly</option>
              <option value="pack">Pack</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">DESCRIPTION</label>
          <textarea name="desc" value={form.desc} onChange={handleChange} rows={3} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y" />
        </div>

        <div>
          <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">ITEMS (one per line)</label>
          <textarea name="items" value={form.items} onChange={handleChange} rows={4} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y" />
        </div>

        <div>
          <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">HREF</label>
          <input name="href" value={form.href} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">SORT ORDER</label>
            <input name="sortOrder" type="number" value={form.sortOrder} onChange={handleChange} className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none" />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-flag" />
              <span className="font-mono text-[10px] tracking-[1.5px] text-cream/70">FEATURED</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={saving} className="bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold px-6 py-3 hover:bg-cream transition-colors disabled:opacity-50 cursor-pointer">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => router.push('/admin/plans')} className="border border-cream/20 text-cream/60 font-mono text-[11px] tracking-[1.5px] uppercase px-6 py-3 hover:text-cream transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
