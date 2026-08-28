import { requireAdmin } from '@/lib/adminAuth';
import { getColoringPages, getThemes } from '@/lib/api';
import AdminShell from '../AdminShell';
import ColoringPagesManager from '@/components/admin/ColoringPagesManager';

export default async function AdminColoringPagesPage() {
  await requireAdmin();

  const pages = getColoringPages('en');
  const themes = getThemes('en').map(t => ({
    slug: t.slug,
    title: t.title,
    parentHub: t.parentHub,
  }));

  return (
    <AdminShell title="Kleurplaten Beheer & Filters">
      <ColoringPagesManager initialPages={pages} themes={themes} />
    </AdminShell>
  );
}
