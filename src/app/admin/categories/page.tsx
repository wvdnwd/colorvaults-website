import { requireAdmin } from '@/lib/adminAuth';
import { getThemes, getColoringPages } from '@/lib/api';
import AdminShell from '../AdminShell';
import styles from '../admin.module.css';

export default async function CategoriesPage() {
  await requireAdmin();
  const themes = getThemes('en');
  const pages  = getColoringPages('en');

  const countByTheme: Record<string, number> = {};
  for (const p of pages) {
    countByTheme[p.parentTheme] = (countByTheme[p.parentTheme] || 0) + 1;
  }

  const sorted = [...themes].sort((a, b) => (countByTheme[a.slug] || 0) - (countByTheme[b.slug] || 0));

  return (
    <AdminShell title="Categories">
      <p style={{ color: 'rgba(253,246,233,0.45)', fontSize: '0.82rem', marginTop: 0, marginBottom: '1.5rem' }}>
        Overview of all {themes.length} categories. To add banner images or update descriptions,
        edit the files in{' '}
        <code style={{ background: 'rgba(255,107,74,0.1)', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>
          src/data/
        </code>, then run{' '}
        <code style={{ background: 'rgba(255,107,74,0.1)', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>
          npm run generate:data
        </code>.
      </p>

      <div className={styles.tableWrap}>
        <div className={styles.tableTitle}>All Categories ({themes.length}) — sorted by image count</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Hub</th>
              <th>Images</th>
              <th>Status</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t, i) => {
              const count = countByTheme[t.slug] || 0;
              const status =
                count === 0  ? { bg: 'rgba(239,68,68,0.15)',    fg: '#f87171', label: 'Empty' }
                : count < 10 ? { bg: 'rgba(245,158,11,0.15)',  fg: '#fbbf24', label: 'Low' }
                : count < 30 ? { bg: 'rgba(99,102,241,0.15)',  fg: '#818cf8', label: 'Growing' }
                :               { bg: 'rgba(16,185,129,0.15)', fg: '#10b981', label: 'Good' };
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#FDF6E9' }}>{t.title}</td>
                  <td style={{ color: 'rgba(253,246,233,0.5)' }}>{t.parentHub}</td>
                  <td style={{ fontWeight: 700, color: '#FDF6E9' }}>{count}</td>
                  <td>
                    <span className={styles.badge} style={{ background: status.bg, color: status.fg }}>
                      {status.label}
                    </span>
                  </td>
                  <td style={{ color: 'rgba(253,246,233,0.3)', fontSize: '0.72rem' }}>/{t.slug}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
