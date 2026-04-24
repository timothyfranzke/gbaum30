'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import type { ContactDoc } from '@/app/lib/types';

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<ContactDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactDoc)));
      setLoading(false);
    }
    load();
  }, []);

  async function toggleRead(id: string, read: boolean) {
    await updateDoc(doc(db, 'contacts', id), { read: !read });
    setContacts(prev => prev.map(c => c.id === id ? { ...c, read: !read } : c));
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this contact?')) return;
    await deleteDoc(doc(db, 'contacts', id));
    setContacts(prev => prev.filter(c => c.id !== id));
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  const unreadCount = contacts.filter(c => !c.read).length;

  if (loading) return <div className="text-cream/50 font-mono text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="font-display text-[40px] text-cream">Contacts</h1>
        {unreadCount > 0 && (
          <span className="bg-flag text-ink font-mono text-[11px] tracking-[1.5px] font-bold px-3 py-1">
            {unreadCount} NEW
          </span>
        )}
      </div>

      {contacts.length === 0 ? (
        <div className="text-center text-cream/30 font-mono text-sm py-12">
          No contact submissions yet
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map(c => (
            <div
              key={c.id}
              className={`border transition-colors ${
                c.read ? 'border-cream/10' : 'border-flag/30 bg-flag/[0.03]'
              }`}
            >
              {/* Row summary */}
              <button
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id);
                  if (!c.read) toggleRead(c.id, c.read);
                }}
                className="w-full px-4 py-3 flex items-center gap-4 text-left cursor-pointer hover:bg-cream/[0.03] transition-colors"
              >
                {!c.read && (
                  <div className="w-2 h-2 bg-flag rounded-full flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-cream truncate">{c.parent}</span>
                    <span className="font-mono text-[10px] tracking-wider text-cream/30">{c.program}</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-wider text-cream/40 truncate">
                    {c.player} &middot; {c.email}
                  </div>
                </div>
                <span className="font-mono text-[9px] tracking-wider text-cream/25 flex-shrink-0">
                  {formatDate(c.createdAt)}
                </span>
              </button>

              {/* Expanded detail */}
              {expanded === c.id && (
                <div className="px-4 pb-4 border-t border-cream/10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">PARENT</div>
                      <div className="text-sm text-cream">{c.parent}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">EMAIL</div>
                      <a href={`mailto:${c.email}`} className="text-sm text-flag hover:text-cream transition-colors">
                        {c.email}
                      </a>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">PLAYER</div>
                      <div className="text-sm text-cream">{c.player}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">AGE</div>
                      <div className="text-sm text-cream">{c.age || '—'}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">PROGRAM</div>
                      <div className="text-sm text-cream">{c.program}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">EXPERIENCE</div>
                      <div className="text-sm text-cream">{c.exp}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-wider text-cream/30 mb-1">MESSAGE</div>
                    <div className="text-sm text-cream/80 whitespace-pre-line">{c.notes}</div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => toggleRead(c.id, c.read)}
                      className={`font-mono text-[9px] tracking-wider px-3 py-1.5 border cursor-pointer transition-colors ${
                        c.read ? 'border-cream/10 text-cream/30 hover:border-cream/30' : 'border-flag/30 text-flag'
                      }`}
                    >
                      {c.read ? 'MARK UNREAD' : 'MARK READ'}
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="font-mono text-[9px] tracking-wider text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
