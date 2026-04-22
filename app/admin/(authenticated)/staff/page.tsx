'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { StaffDoc } from '@/app/lib/types';

export default function StaffListPage() {
  const [staff, setStaff] = useState<StaffDoc[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStaff() {
    const res = await fetch('/api/admin/staff');
    if (res.ok) setStaff(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchStaff(); }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' });
    fetchStaff();
  }

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[40px] text-cream">Staff</h1>
        <Link
          href="/admin/staff/new"
          className="bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold px-5 py-3 hover:bg-cream transition-colors"
        >
          Add New
        </Link>
      </div>

      <div className="border border-cream/10">
        <div className="grid grid-cols-[60px_1fr_1fr_120px] gap-4 px-4 py-3 border-b border-cream/10 font-mono text-[10px] tracking-[1.5px] text-muted">
          <div>SORT</div>
          <div>NAME</div>
          <div>ROLE</div>
          <div>ACTIONS</div>
        </div>

        {staff.map(member => (
          <div key={member.id} className="grid grid-cols-[60px_1fr_1fr_120px] gap-4 px-4 py-4 border-b border-cream/5 items-center">
            <div className="font-mono text-sm text-cream/50">{member.sortOrder}</div>
            <div className="text-sm text-cream">{member.name}</div>
            <div className="text-sm text-cream/70">{member.role}</div>
            <div className="flex gap-3">
              <Link href={`/admin/staff/${member.id}`} className="font-mono text-[10px] text-flag hover:text-cream transition-colors">
                EDIT
              </Link>
              <button
                onClick={() => handleDelete(member.id, member.name)}
                className="font-mono text-[10px] text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}

        {staff.length === 0 && (
          <div className="px-4 py-8 text-center text-cream/30 font-mono text-sm">
            No staff members yet
          </div>
        )}
      </div>
    </div>
  );
}
