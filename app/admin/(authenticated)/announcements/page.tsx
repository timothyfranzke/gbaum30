'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { storage, db } from '@/app/lib/firebase';
import type { AnnouncementDoc, HeadlineAccent, DisplayMode, DismissBehavior, AnnouncementMediaType, CtaLinkOption } from '@/app/lib/types';

const EMPTY: Omit<AnnouncementDoc, 'id'> = {
  headline: '',
  headlineAccent: 'cream',
  subtitle: '',
  body: '',
  displayMode: 'modal',
  mediaType: null,
  mediaUrl: '',
  videoAutoplay: false,
  ctaEnabled: false,
  ctaText: '',
  ctaLink: '#programs',
  ctaExternalUrl: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: null,
  dismissBehavior: 'session',
  enabled: false,
};

const ACCENT_OPTIONS: { value: HeadlineAccent; label: string }[] = [
  { value: 'cream', label: 'CREAM' },
  { value: 'flag', label: 'FLAG' },
  { value: 'blue', label: 'BLUE' },
];

const DISPLAY_MODE_OPTIONS: { value: DisplayMode; label: string; desc: string }[] = [
  { value: 'modal', label: 'MODAL', desc: 'Popup overlay on page load' },
  { value: 'banner', label: 'BANNER', desc: 'Persistent bar above nav' },
  { value: 'both', label: 'BOTH', desc: 'Banner + modal popup' },
];

const DISMISS_OPTIONS: { value: DismissBehavior; label: string }[] = [
  { value: 'session', label: 'SESSION' },
  { value: 'every-visit', label: 'EVERY VISIT' },
];

const MEDIA_OPTIONS: { value: AnnouncementMediaType; label: string }[] = [
  { value: 'video-upload', label: 'UPLOAD' },
  { value: 'video-embed', label: 'EMBED URL' },
  { value: null, label: 'NONE' },
];

const CTA_LINK_OPTIONS: { value: CtaLinkOption; label: string }[] = [
  { value: '#programs', label: 'Programs' },
  { value: '#about', label: 'About' },
  { value: '#locations', label: 'Locations' },
  { value: '#booking', label: 'Contact' },
  { value: '#gallery', label: 'Gallery' },
  { value: 'external', label: 'External URL' },
];

export default function AnnouncementsAdminPage() {
  const [form, setForm] = useState<Omit<AnnouncementDoc, 'id'>>(EMPTY);
  const [docId, setDocId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, 'announcements'));
      if (!snap.empty) {
        const first = snap.docs[0];
        const data = first.data() as Omit<AnnouncementDoc, 'id'>;
        setDocId(first.id);
        setForm(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  function update<K extends keyof Omit<AnnouncementDoc, 'id'>>(field: K, value: Omit<AnnouncementDoc, 'id'>[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      if (docId) {
        await updateDoc(doc(db, 'announcements', docId), { ...form });
      } else {
        const newRef = doc(collection(db, 'announcements'));
        await setDoc(newRef, { ...form });
        setDocId(newRef.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Save failed:', e);
      alert('Save failed — check console');
    }
    setSaving(false);
  }

  async function handleMediaUpload(file: File) {
    const id = docId || doc(collection(db, 'announcements')).id;
    if (!docId) {
      await setDoc(doc(db, 'announcements', id), { ...form });
      setDocId(id);
    }

    const ext = file.name.split('.').pop() || 'mp4';
    const storageRef = ref(storage, `announcements/${id}/media.${ext}`);
    setUploadProgress(0);

    const url = await new Promise<string>((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file);
      task.on('state_changed',
        (snap) => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        (err) => reject(err),
        async () => resolve(await getDownloadURL(task.snapshot.ref)),
      );
    });

    const isImage = file.type.startsWith('image/');
    const mediaType: AnnouncementMediaType = isImage ? 'image' : 'video-upload';
    setForm(prev => ({ ...prev, mediaUrl: url, mediaType }));
    await updateDoc(doc(db, 'announcements', id), { mediaUrl: url, mediaType });
    setUploadProgress(null);
  }

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-[40px] text-cream mb-8">Announcements</h1>

      {/* Status toggle */}
      <div className="flex items-center gap-4 mb-8 p-4 border border-cream/10">
        <button
          onClick={() => update('enabled', !form.enabled)}
          className={`px-5 py-2 font-mono text-[11px] tracking-[1.5px] font-bold cursor-pointer transition-colors ${
            form.enabled ? 'bg-flag text-ink' : 'bg-cream/10 text-cream/40'
          }`}
        >
          {form.enabled ? 'LIVE' : 'DISABLED'}
        </button>
        <span className="font-mono text-[10px] tracking-wider text-cream/30">
          {form.enabled ? 'Announcement is visible to the public' : 'Announcement is hidden'}
        </span>
      </div>

      {/* Display mode */}
      <fieldset className="mb-6">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">DISPLAY MODE</legend>
        <div className="flex gap-2">
          {DISPLAY_MODE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => update('displayMode', opt.value)}
              className={`px-4 py-2 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
                form.displayMode === opt.value
                  ? 'border-flag bg-flag text-ink font-bold'
                  : 'border-cream/10 text-cream/40 hover:border-cream/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <span className="font-mono text-[10px] tracking-wider text-cream/30 self-center ml-2">
            {DISPLAY_MODE_OPTIONS.find(o => o.value === form.displayMode)?.desc}
          </span>
        </div>
      </fieldset>

      {/* Schedule */}
      <fieldset className="mb-6 space-y-3">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">SCHEDULE</legend>
        <div className="flex gap-4">
          <label className="flex-1">
            <span className="font-mono text-[10px] tracking-wider text-cream/40 block mb-1">START DATE</span>
            <input
              type="date"
              value={form.startDate}
              onChange={e => update('startDate', e.target.value)}
              className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
            />
          </label>
          <label className="flex-1">
            <span className="font-mono text-[10px] tracking-wider text-cream/40 block mb-1">
              END DATE <span className="text-cream/20">{!form.endDate && '— No expiration'}</span>
            </span>
            <div className="flex gap-2">
              <input
                type="date"
                value={form.endDate || ''}
                onChange={e => update('endDate', e.target.value || null)}
                className="flex-1 bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
              />
              {form.endDate && (
                <button
                  onClick={() => update('endDate', null)}
                  className="font-mono text-[9px] text-cream/30 hover:text-cream px-2 cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>
          </label>
        </div>
      </fieldset>

      {/* Dismiss behavior */}
      <fieldset className="mb-6">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">DISMISS BEHAVIOR</legend>
        <div className="flex gap-2">
          {DISMISS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => update('dismissBehavior', opt.value)}
              className={`px-4 py-2 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
                form.dismissBehavior === opt.value
                  ? 'border-flag bg-flag text-ink font-bold'
                  : 'border-cream/10 text-cream/40 hover:border-cream/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Headline + accent */}
      <fieldset className="mb-6 space-y-2">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">HEADLINE</legend>
        <input
          value={form.headline}
          onChange={e => update('headline', e.target.value)}
          placeholder="Announcement headline..."
          className="w-full bg-transparent border border-cream/10 text-cream text-lg px-3 py-2 focus:border-flag focus:outline-none font-display"
        />
        <div className="font-mono text-[9px] tracking-wider text-cream/25">
          WRAP WORDS IN [BRACKETS] TO COLORIZE THEM — e.g. &quot;New [Summer] Schedule&quot;
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider text-cream/40">ACCENT:</span>
          {ACCENT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => update('headlineAccent', opt.value)}
              className={`px-3 py-1 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
                form.headlineAccent === opt.value
                  ? `border-${opt.value} bg-${opt.value} ${opt.value === 'cream' ? 'text-ink' : 'text-cream'} font-bold`
                  : 'border-cream/10 text-cream/40 hover:border-cream/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Subtitle */}
      <fieldset className="mb-6">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">SUBTITLE</legend>
        <input
          value={form.subtitle}
          onChange={e => update('subtitle', e.target.value)}
          placeholder="Optional subtitle..."
          className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
        />
      </fieldset>

      {/* Body */}
      <fieldset className="mb-6">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">BODY</legend>
        <textarea
          value={form.body}
          onChange={e => update('body', e.target.value)}
          placeholder="Announcement body text..."
          rows={4}
          className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none resize-y"
        />
      </fieldset>

      {/* Media */}
      <fieldset className="mb-6 space-y-3">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">MEDIA</legend>
        <div className="flex gap-2">
          {MEDIA_OPTIONS.map(opt => (
            <button
              key={String(opt.value)}
              onClick={() => {
                update('mediaType', opt.value);
                if (opt.value === null) update('mediaUrl', '');
              }}
              className={`px-4 py-2 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
                form.mediaType === opt.value
                  ? 'border-flag bg-flag text-ink font-bold'
                  : 'border-cream/10 text-cream/40 hover:border-cream/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {(form.mediaType === 'video-upload' || form.mediaType === 'video-embed') && (
          <button
            onClick={() => update('videoAutoplay', !form.videoAutoplay)}
            className={`px-4 py-2 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
              form.videoAutoplay
                ? 'border-flag bg-flag text-ink font-bold'
                : 'border-cream/10 text-cream/40 hover:border-cream/30'
            }`}
          >
            {form.videoAutoplay ? 'AUTOPLAY ON' : 'AUTOPLAY OFF'}
          </button>
        )}

        {(form.mediaType === 'video-upload' || form.mediaType === 'image') && (
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) handleMediaUpload(e.dataTransfer.files[0]);
            }}
            className="border-2 border-dashed border-cream/20 p-8 text-center"
          >
            {uploadProgress !== null ? (
              <div className="space-y-2">
                <div className="font-mono text-[11px] tracking-[1.5px] text-flag font-bold">
                  UPLOADING
                </div>
                <div className="max-w-[300px] mx-auto h-2 bg-cream/10 overflow-hidden">
                  <div className="h-full bg-flag transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                </div>
                <div className="font-mono text-[10px] text-cream/40">{uploadProgress}%</div>
              </div>
            ) : (
              <>
                <div className="font-mono text-[11px] tracking-[1.5px] text-cream/50">
                  DROP FILE HERE — IMAGE OR VIDEO
                </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={e => e.target.files?.[0] && handleMediaUpload(e.target.files[0])}
                  className="hidden"
                  id="announcement-upload"
                />
                <label htmlFor="announcement-upload" className="inline-block mt-4 px-5 py-3 bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors">
                  Browse Files
                </label>
              </>
            )}
          </div>
        )}

        {form.mediaType === 'video-embed' && (
          <input
            value={form.mediaUrl}
            onChange={e => update('mediaUrl', e.target.value)}
            placeholder="YouTube or Vimeo URL..."
            className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
          />
        )}

        {/* Media preview */}
        {form.mediaUrl && (
          <div className="border border-cream/10 p-2">
            <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-2">PREVIEW</div>
            {form.mediaType === 'video-upload' && (
              <video src={form.mediaUrl} controls className="w-full max-h-[300px]" />
            )}
            {form.mediaType === 'video-embed' && (
              <div className="aspect-video">
                <iframe
                  src={toEmbedUrl(form.mediaUrl)}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>
            )}
            {form.mediaType === 'image' && (
              <div className="relative w-full h-[300px]">
                <Image src={form.mediaUrl} alt="Preview" fill className="object-contain" />
              </div>
            )}
          </div>
        )}
      </fieldset>

      {/* CTA */}
      <fieldset className="mb-8 space-y-3">
        <legend className="font-mono text-[11px] tracking-[1.5px] text-cream/50 mb-2">CALL TO ACTION</legend>
        <button
          onClick={() => update('ctaEnabled', !form.ctaEnabled)}
          className={`px-4 py-2 font-mono text-[10px] tracking-[1.5px] border cursor-pointer transition-colors ${
            form.ctaEnabled
              ? 'border-flag bg-flag text-ink font-bold'
              : 'border-cream/10 text-cream/40 hover:border-cream/30'
          }`}
        >
          {form.ctaEnabled ? 'CTA ENABLED' : 'CTA DISABLED'}
        </button>

        {form.ctaEnabled && (
          <div className="space-y-3 pl-0">
            <input
              value={form.ctaText}
              onChange={e => update('ctaText', e.target.value)}
              placeholder="Button text..."
              className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
            />
            <select
              value={form.ctaLink}
              onChange={e => update('ctaLink', e.target.value as CtaLinkOption)}
              className="w-full bg-ink border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
            >
              {CTA_LINK_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {form.ctaLink === 'external' && (
              <input
                value={form.ctaExternalUrl}
                onChange={e => update('ctaExternalUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent border border-cream/10 text-cream text-sm px-3 py-2 focus:border-flag focus:outline-none"
              />
            )}
          </div>
        )}
      </fieldset>

      {/* Save button + success message */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-flag text-ink font-mono text-[11px] tracking-[1.5px] uppercase font-bold cursor-pointer hover:bg-cream transition-colors disabled:opacity-50"
        >
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
        {saved && (
          <span className="font-mono text-[11px] tracking-[1.5px] text-flag font-bold animate-pulse">
            SAVED
          </span>
        )}
      </div>
    </div>
  );
}

function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}
