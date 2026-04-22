import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/app/lib/auth-guard';
import AdminShell from './components/AdminShell';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
