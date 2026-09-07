import { requireAdmin } from '@/lib/adminAuth';
import { getThemes } from '@/lib/api';
import AdminShell from '../AdminShell';
import CategoriesManager from '@/components/admin/CategoriesManager';

export default async function CategoriesPage() {
  await requireAdmin();
  const themes = getThemes('en');

  const categoryItems = themes.map(t => ({
    title: t.title,
    slug: t.slug,
    parentHub: t.parentHub,
    count: t.pageCount || 0,
  })).sort((a, b) => b.count - a.count);

  return (
    <AdminShell title="Thema's & Categorieën Overzicht">
      <CategoriesManager categories={categoryItems} />
    </AdminShell>
  );
}
