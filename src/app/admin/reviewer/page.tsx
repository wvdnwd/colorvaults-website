import { Suspense } from 'react';
import { requireAdmin } from '@/lib/adminAuth';
import { getThemes } from '@/lib/api';
import AdminShell from '../AdminShell';
import TinderColoringReviewer from '@/components/admin/TinderColoringReviewer';

export default async function AdminReviewerPage() {
  await requireAdmin();

  const themes = getThemes('en').map(t => ({
    slug: t.slug,
    title: t.title,
    parentHub: t.parentHub,
  }));

  return (
    <AdminShell title="🔥 Snelle Tinder Keuring">
      <Suspense fallback={<div style={{ padding: '2rem', color: 'rgba(253,246,233,0.5)', textAlign: 'center' }}>Laden van review studio...</div>}>
        <TinderColoringReviewer initialPages={[]} themes={themes} />
      </Suspense>
    </AdminShell>
  );
}
