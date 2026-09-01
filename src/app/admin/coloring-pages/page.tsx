import { Suspense } from 'react';
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
      <Suspense fallback={<div style={{ padding: '2rem', color: 'rgba(253,246,233,0.5)', textAlign: 'center' }}>Laden van beheerpaneel...</div>}>
        <ColoringPagesManager initialPages={pages} themes={themes} />
      </Suspense>
    </AdminShell>
  );
}
