import { Suspense } from 'react';
import { requireAdmin } from '@/lib/adminAuth';
import { getColoringPages, getThemes } from '@/lib/api';
import AdminShell from '../AdminShell';
import TinderColoringReviewer, { ReviewColoringPage } from '@/components/admin/TinderColoringReviewer';

export default async function AdminReviewerPage() {
  await requireAdmin();

  const pagesEn = getColoringPages('en');
  const pagesNl = getColoringPages('nl');
  const themes = getThemes('en').map(t => ({
    slug: t.slug,
    title: t.title,
    parentHub: t.parentHub,
  }));

  const nlMap = new Map<string, string>();
  pagesNl.forEach(p => {
    nlMap.set(`${p.parentTheme}/${p.slug}`, p.title);
  });

  const combinedPages: ReviewColoringPage[] = pagesEn.map(p => {
    const raw = p as unknown as Record<string, unknown>;
    return {
      slug: p.slug,
      parentHub: p.parentHub,
      parentTheme: p.parentTheme,
      ageGroup: p.ageGroup,
      title: p.title,
      titleNl: nlMap.get(`${p.parentTheme}/${p.slug}`) || p.title,
      shortDescription: p.shortDescription,
      image: p.image,
      reviewed: Boolean(raw?.reviewed),
    };
  });

  return (
    <AdminShell title="🔥 Snelle Tinder Keuring">
      <Suspense fallback={<div style={{ padding: '2rem', color: 'rgba(253,246,233,0.5)', textAlign: 'center' }}>Laden van review studio...</div>}>
        <TinderColoringReviewer initialPages={combinedPages} themes={themes} />
      </Suspense>
    </AdminShell>
  );
}
