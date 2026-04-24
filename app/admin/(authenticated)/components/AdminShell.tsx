'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Staff', href: '/admin/staff' },
  { label: 'Plans', href: '/admin/plans' },
  { label: 'Gallery', href: '/admin/gallery' },
  { label: 'Announcements', href: '/admin/announcements' },
  { label: 'Contacts', href: '/admin/contacts' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Top bar */}
      <header className="border-b border-cream/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin/staff" className="font-display text-[24px] text-flag tracking-tight">
            U30 <span className="text-cream/50 text-[16px]">Admin</span>
          </Link>
          <nav className="flex gap-1">
            {NAV_ITEMS.map(item => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 font-mono text-[11px] tracking-[1.5px] uppercase transition-colors ${
                    active
                      ? 'bg-flag text-ink font-bold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="font-mono text-[11px] tracking-[1.5px] text-cream/40 hover:text-cream transition-colors cursor-pointer"
        >
          LOGOUT
        </button>
      </header>

      {/* Content */}
      <main className="p-6 max-w-[1200px] mx-auto">
        {children}
      </main>
    </div>
  );
}
