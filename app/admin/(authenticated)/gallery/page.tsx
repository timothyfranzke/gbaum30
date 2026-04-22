'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query, writeBatch } from 'firebase/firestore';
import { storage, db } from '@/app/lib/firebase';
import type { GalleryDoc, AboutSlot } from '@/app/lib/types';

interface UploadProgress {
  current: number;
  total: number;
  fileName: string;
  percent: number;
  status: 'uploading' | 'processing';
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const fetchItems = useCallback(async () => {
    const q = query(collection(db, 'gallery'), orderBy('sortOrder'));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryDoc)));
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function uploadFiles(files: FileList) {
    const fileArray = Array.from(files);
    const total = fileArray.length;

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      const ext = file.name.split('.').pop() || 'webp';

      setProgress({ current: i + 1, total, fileName: file.name, percent: 0, status: 'uploading' });

      const docRef = await addDoc(collection(db, 'gallery'), {
        fileUrl: '',
        caption: '',
        mediaType,
        sortOrder: items.length + i,
        visible: true,
      });

      const storageRef = ref(storage, `gallery/${docRef.id}/file.${ext}`);
      const url = await new Promise<string>((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, file);
        task.on('state_changed',
          (snap) => {
            const percent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setProgress(prev => prev ? { ...prev, percent } : null);
          },
          (err) => reject(err),
          async () => {
            const downloadUrl = await getDownloadURL(task.snapshot.ref);
            resolve(downloadUrl);
          }
        );
      });

      setProgress(prev => prev ? { ...prev, percent: 100, status: 'processing' } : null);
      await updateDoc(doc(db, 'gallery', docRef.id), { fileUrl: url });

      setItems(prev => [...prev, {
        id: docRef.id,
        fileUrl: url,
        caption: '',
        mediaType,
        sortOrder: items.length + i,
        visible: true,
      }]);
    }

    setProgress(null);
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  // --- Reorder drag-and-drop ---
  function handleReorderDrop(targetIdx: number) {
    if (dragIndex === null || dragIndex === targetIdx) {
      setDragIndex(null);
      setDropIndex(null);
      return;
    }

    const updated = [...items];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(targetIdx, 0, moved);

    // Update sortOrder for all items
    const reordered = updated.map((item, i) => ({ ...item, sortOrder: i }));
    setItems(reordered);
    setDragIndex(null);
    setDropIndex(null);

    // Batch write new sortOrders to Firestore
    const batch = writeBatch(db);
    reordered.forEach((item) => {
      batch.update(doc(db, 'gallery', item.id), { sortOrder: item.sortOrder });
    });
    batch.commit();
  }

  function debouncedUpdate(id: string, data: Partial<GalleryDoc>) {
    if (debounceTimers.current[id]) clearTimeout(debounceTimers.current[id]);
    debounceTimers.current[id] = setTimeout(async () => {
      await updateDoc(doc(db, 'gallery', id), data);
    }, 600);
  }

  function updateLocal(id: string, field: keyof GalleryDoc, value: string | number | boolean) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    debouncedUpdate(id, { [field]: value });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this item?')) return;
    await deleteDoc(doc(db, 'gallery', id));
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function toggleVisibility(id: string, visible: boolean) {
    updateLocal(id, 'visible', !visible);
  }

  const ABOUT_SLOTS: { value: AboutSlot; label: string }[] = [
    { value: 'main', label: 'MAIN' },
    { value: 'left', label: 'LEFT' },
    { value: 'right', label: 'RIGHT' },
  ];

  function setAboutSlot(id: string, slot: AboutSlot | null) {
    // If assigning a slot, clear it from any other item first
    if (slot) {
      const existing = items.find(i => i.aboutSlot === slot && i.id !== id);
      if (existing) {
        setItems(prev => prev.map(i => i.id === existing.id ? { ...i, aboutSlot: null } : i));
        updateDoc(doc(db, 'gallery', existing.id), { aboutSlot: null });
      }
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, aboutSlot: slot } : i));
    updateDoc(doc(db, 'gallery', id), { aboutSlot: slot });
  }

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div>
      <h1 className="font-display text-[40px] text-cream mb-8">Gallery</h1>

      {/* Drop zone for file uploads */}
      <div
        onDragOver={e => {
          // Only show upload zone highlight for file drags, not reorder drags
          if (dragIndex !== null) return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          if (dragIndex !== null) return;
          handleFileDrop(e);
        }}
        className={`border-2 border-dashed p-10 text-center mb-8 transition-colors ${
          dragOver ? 'border-flag bg-flag/5' : 'border-cream/20'
        }`}
      >
        {progress ? (
          <div className="space-y-3">
            <div className="font-mono text-[11px] tracking-[1.5px] text-flag font-bold">
              UPLOADING {progress.current} OF {progress.total}
            </div>
            <div className="font-mono text-[10px] tracking-wider text-cream/70 truncate max-w-[300px] mx-auto">
              {progress.fileName}
            </div>
            <div className="max-w-[400px] mx-auto h-2 bg-cream/10 overflow-hidden">
              <div
                className="h-full bg-flag transition-all duration-200"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <div className="font-mono text-[10px] tracking-wider text-cream/40">
              {progress.status === 'processing' ? 'SAVING...' : `${progress.percent}%`}
            </div>
          </div>
        ) : (
          <>
            <div className="font-mono text-[11px] tracking-[1.5px] text-cream/50">
              DROP FILES HERE — IMAGES & VIDEO
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
          </>
        )}
      </div>

      {/* Reorder hint */}
      {items.length > 1 && (
        <div className="font-mono text-[10px] tracking-wider text-cream/30 mb-3">
          DRAG ITEMS TO REORDER
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              setDragIndex(idx);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={(e) => {
              if (dragIndex === null) return;
              e.preventDefault();
              setDropIndex(idx);
            }}
            onDragLeave={() => {
              if (dropIndex === idx) setDropIndex(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleReorderDrop(idx);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setDropIndex(null);
            }}
            className={`border transition-all cursor-grab active:cursor-grabbing ${
              !item.visible ? 'opacity-40' : ''
            } ${
              dragIndex === idx
                ? 'opacity-30 border-flag/50'
                : dropIndex === idx
                  ? 'border-flag border-2 scale-[1.02]'
                  : 'border-cream/10'
            }`}
          >
            {/* Drag handle + sort position */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-cream/[0.03] border-b border-cream/10">
              <span className="font-mono text-[9px] tracking-wider text-cream/30">
                ⠿ {idx + 1}
              </span>
              <span className="font-mono text-[9px] tracking-wider text-cream/20 uppercase">
                {item.mediaType}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="relative aspect-square bg-cream/5">
              {item.fileUrl && item.mediaType === 'video' ? (
                <video src={item.fileUrl} className="w-full h-full object-cover" muted />
              ) : item.fileUrl ? (
                <Image src={item.fileUrl} alt={item.caption || ''} fill className="object-cover" draggable={false} />
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
              {/* About section slot picker */}
              <div className="flex items-center gap-1">
                <span className="font-mono text-[8px] tracking-wider text-cream/30 mr-1">ABOUT:</span>
                {ABOUT_SLOTS.map(s => (
                  <button
                    key={s.value}
                    onClick={() => setAboutSlot(item.id, item.aboutSlot === s.value ? null : s.value)}
                    className={`font-mono text-[8px] tracking-wider px-1.5 py-1 border cursor-pointer transition-colors ${
                      item.aboutSlot === s.value
                        ? 'border-blue bg-blue text-cream'
                        : 'border-cream/10 text-cream/30 hover:border-cream/30'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
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
