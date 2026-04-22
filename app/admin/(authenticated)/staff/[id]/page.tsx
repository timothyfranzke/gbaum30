'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StaffForm from '../components/StaffForm';
import type { StaffDoc } from '@/app/lib/types';

export default function EditStaffPage() {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<StaffDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/staff/${id}`)
      .then(res => res.json())
      .then(data => { setStaff(data); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;
  if (!staff) return <div className="text-red-400 font-mono text-sm">Staff member not found</div>;

  return (
    <div>
      <h1 className="font-display text-[40px] text-cream mb-8">Edit: {staff.name}</h1>
      <StaffForm initialData={staff} />
    </div>
  );
}
