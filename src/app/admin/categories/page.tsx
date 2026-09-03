import { requireAdmin } from'@/lib/adminAuth';
import { getThemes, getColoringPages } from'@/lib/api';
import AdminShell from'../AdminShell';
import CategoriesManager from'@/components/admin/CategoriesManager';

export default async function CategoriesPage() {
  await requireAdmin();
  const themes = getThemes('en');
  const pages  = getColoringPages('en');

  const countByTheme: Record<string, number> = {};
  for (const p of pages) {
    countByTheme[p.parentTheme] = (countByTheme[p.parentTheme] || 0) + 1;
  }

  const categoryItems = themes.map(t => ({
    title: t.title,
    slug: t.slug,
    parentHub: t.parentHub,
    count: countByTheme[t.slug] || 0,
  })).sort((a, b) => b.count - a.count);

  return (
    <AdminShell title="Thema's & Categorieën Overzicht">
      <CategoriesManager categories={categoryItems} />
    </AdminShell>
  );
}
