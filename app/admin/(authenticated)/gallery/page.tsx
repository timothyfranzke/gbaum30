'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import type { GalleryDoc } from '@/app/lib/types';

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const fetchItems = useCallback(async () => {
    const res = await fetch('/api/admin/gallery');
    if (res.ok) setItems(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function uploadFiles(files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      const ext = file.name.split('.').pop() || 'webp';

      // Create placeholder doc
      const createRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaType, sortOrder: items.length }),
      });
      const { id: docId } = await createRes.json();

      // Upload file
      const fd = new FormData();
      fd.append('file', file);
      fd.append('path', `gallery/${docId}/file.${ext}`);
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const { url } = await uploadRes.json();

      // Update doc with URL
      await fetch(`/api/admin/gallery/${docId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl: url }),
      });
    }
    setUploading(false);
    fetchItems();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  function debouncedUpdate(id: string, data: Partial<GalleryDoc>) {
    if (debounceTimers.current[id]) clearTimeout(debounceTimers.current[id]);
    debounceTimers.current[id] = setTimeout(async () => {
      await fetch(`/api/admin/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }, 600);
  }

  function updateLocal(id: string, field: keyof GalleryDoc, value: string | number | boolean) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    debouncedUpdate(id, { [field]: value });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(item => item.id !== id));
  }

  async function toggleVisibility(id: string, visible: boolean) {
    updateLocal(id, 'visible', !visible);
  }

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div>
      <h1 className="font-display text-[40px] text-cream mb-8">Gallery</h1>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed p-10 text-center mb-8 transition-colors ${
          dragOver ? 'border-flag bg-flag/5' : 'border-cream/20'
        }`}
      >
        <div className="font-mono text-[11px] tracking-[1.5px] text-cream/50">
          {uploading ? 'UPLOADING...' : 'DROP FILES HERE — IMAGES & VIDEO'}
        </div>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
          className="hidden"
          id="gallery-upload"
        />
        <label htmlFor="gallery-upload" className="inline-block mt-4 px-5 py-3 bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors">
          Or Browse Files
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className={`border border-cream/10 ${!item.visible ? 'opacity-40' : ''}`}>
            {/* Thumbnail */}
            <div className="relative aspect-square bg-cream/5">
              {item.fileUrl && item.mediaType === 'video' ? (
                <video src={item.fileUrl} className="w-full h-full object-cover" muted />
              ) : item.fileUrl ? (
                <Image src={item.fileUrl} alt={item.caption || ''} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream/20 font-mono text-xs">
                  No file
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-3 space-y-2">
              <input
                value={item.caption}
                onChange={e => updateLocal(item.id, 'caption', e.target.value)}
                placeholder="Caption..."
                className="w-full bg-transparent border border-cream/10 text-cream text-xs px-2 py-1.5 focus:border-flag focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.sortOrder}
                  onChange={e => updateLocal(item.id, 'sortOrder', Number(e.target.value))}
                  className="w-16 bg-transparent border border-cream/10 text-cream text-xs px-2 py-1.5 focus:border-flag focus:outline-none"
                />
                <button
                  onClick={() => toggleVisibility(item.id, item.visible)}
                  className={`font-mono text-[9px] tracking-wider px-2 py-1.5 border cursor-pointer ${
                    item.visible ? 'border-flag/30 text-flag' : 'border-cream/10 text-cream/30'
                  }`}
                >
                  {item.visible ? 'VISIBLE' : 'HIDDEN'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="font-mono text-[9px] tracking-wider text-red-400 hover:text-red-300 ml-auto cursor-pointer"
                >
                  DEL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-cream/30 font-mono text-sm py-12">
          No gallery items — drop some files above
        </div>
      )}
    </div>
  );
}
