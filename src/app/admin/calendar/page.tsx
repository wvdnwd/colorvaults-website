import { requireAdmin } from '@/lib/adminAuth';
import AdminShell from '../AdminShell';
import MarketingCalendar from '@/components/admin/MarketingCalendar';

export const dynamic = 'force-dynamic';

export default async function AdminMarketingCalendarPage() {
  await requireAdmin();

  return (
    <AdminShell title="SEO & Feestdagen Marketing Kalender">
      <MarketingCalendar />
    </AdminShell>
  );
}
