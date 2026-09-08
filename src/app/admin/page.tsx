import { notFound, redirect } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/adminAuth';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const isAuth = await isAdminLoggedIn();
  if (isAuth) {
    redirect('/admin/dashboard');
  }

  const { secret } = await searchParams;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'cv-vault-8942';

  // If secret parameter is missing or does not match, return 404 Not Found (completely hidden from bots/hackers)
  if (!secret || secret !== expectedSecret) {
    notFound();
  }

  return <AdminLoginForm />;
}
