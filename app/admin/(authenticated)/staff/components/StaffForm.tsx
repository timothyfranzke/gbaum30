'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaffDoc } from '@/app/lib/types';

interface Props {
  initialData?: StaffDoc;
}

export default function StaffForm({ initialData }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');

  const [form, setForm] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    tag: initialData?.tag || '',
    bio: initialData?.bio || '',
    certifications: initialData?.certifications?.join('\n') || '',
    achievements: initialData?.achievements?.join('\n') || '',
    quote: initialData?.quote || '',
    sortOrder: initialData?.sortOrder ?? 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        role: form.role,
        tag: form.tag,
        bio: form.bio,
        certifications: form.certifications.split('\n').map(s => s.trim()).filter(Boolean),
        achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
        quote: form.quote || null,
        sortOrder: Number(form.sortOrder),
      };

      let docId = initialData?.id;

      if (docId) {
        await fetch(`/api/admin/staff/${docId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch('/api/admin/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        docId = data.id;
      }

      if (imageFile && docId) {
        const ext = imageFile.name.split('.').pop() || 'webp';
        const fd = new FormData();
        fd.append('file', imageFile);
        fd.append('path', `staff/${docId}/photo.${ext}`);
        const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const { url } = await uploadRes.json();
        await fetch(`/api/admin/staff/${docId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: url }),
        });
      }

      router.push('/admin/staff');
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Role" name="role" value={form.role} onChange={handleChange} required />
      </div>

      <Field label="Tag" name="tag" value={form.tag} onChange={handleChange} />

      <div>
        <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">BIO</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">CERTIFICATIONS (one per line)</label>
        <textarea
          name="certifications"
          value={form.certifications}
          onChange={handleChange}
          rows={3}
          className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">ACHIEVEMENTS (one per line)</label>
        <textarea
          name="achievements"
          value={form.achievements}
          onChange={handleChange}
          rows={3}
          className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">QUOTE</label>
        <textarea
          name="quote"
          value={form.quote}
          onChange={handleChange}
          rows={2}
          className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">PHOTO</label>
        <div className="flex items-start gap-4">
          {imagePreview && (
            <div className="relative w-24 h-32 bg-ink border border-cream/10 overflow-hidden">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 border border-cream/20 font-mono text-[10px] tracking-[1.5px] text-cream/70 hover:text-cream hover:border-cream/40 transition-colors cursor-pointer"
          >
            {imagePreview ? 'CHANGE PHOTO' : 'UPLOAD PHOTO'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      </div>

      <Field label="Sort Order" name="sortOrder" type="number" value={String(form.sortOrder)} onChange={handleChange} />

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold px-6 py-3 hover:bg-cream transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/staff')}
          className="border border-cream/20 text-cream/60 font-mono text-[11px] tracking-[1.5px] uppercase px-6 py-3 hover:text-cream transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label, name, value, onChange, type = 'text', required,
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[1.5px] text-muted mb-2">{label.toUpperCase()}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-ink border border-cream/20 text-cream px-4 py-3 text-sm focus:border-flag focus:outline-none"
      />
    </div>
  );
}
