import { requireAdmin } from '@/lib/adminAuth';
import { getThemes, getColoringPages } from '@/lib/api';
import AdminShell from '../AdminShell';
import fs from 'fs';
import path from 'path';
import styles from '../admin.module.css';

function getReportCount() {
  const file = path.join(process.cwd(), 'src', 'data', 'reports.json');
  if (!fs.existsSync(file)) return 0;
  try {
    const reports = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return reports.filter((r: { status: string }) => r.status === 'open').length;
  } catch { return 0; }
}

export default async function DashboardPage() {
  await requireAdmin();

  const themes = getThemes('en');
  const pages  = getColoringPages('en');
  const reportCount = getReportCount();

  // Count pages per theme slug
  const countByTheme: Record<string, number> = {};
  for (const p of pages) {
    countByTheme[p.parentTheme] = (countByTheme[p.parentTheme] || 0) + 1;
  }

  const stats = [
    { value: themes.length,  label: 'Categories' },
    { value: pages.length,   label: 'Total Coloring Pages' },
    { value: reportCount,    label: 'Open Reports', highlight: reportCount > 0 },
    { value: '✓',            label: 'System Status' },
  ];

  return (
    <AdminShell title="Dashboard" reportCount={reportCount}>
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={styles.statCard}>
            <div
              className={styles.statValue}
              style={s.highlight ? { color: '#f87171' } : undefined}
            >
              {s.value}
            </div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableTitle}>All Categories</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Hub</th>
              <th>Images</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {themes.slice(0, 80).map((t, i) => {
              const count = countByTheme[t.slug] || 0;
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#FDF6E9' }}>{t.title}</td>
                  <td>{t.parentHub}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={count < 10
                        ? { background: 'rgba(239,68,68,0.15)', color: '#f87171' }
                        : { background: 'rgba(16,185,129,0.15)', color: '#10b981' }
                      }
                    >
                      {count}
                    </span>
                  </td>
                  <td style={{ color: 'rgba(253,246,233,0.35)', fontSize: '0.75rem' }}>/{t.slug}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
