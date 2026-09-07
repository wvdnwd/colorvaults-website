import { requireAdmin } from '@/lib/adminAuth';
import { getThemes } from '@/lib/api';
import AdminShell from '../AdminShell';
import Link from 'next/link';
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

function getMessageCount() {
  const file = path.join(process.cwd(), 'src', 'data', 'messages.json');
  if (!fs.existsSync(file)) return 0;
  try {
    const messages = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return messages.length;
  } catch { return 0; }
}

export default async function DashboardPage() {
  await requireAdmin();

  const themes = getThemes('en');
  const totalPages = themes.reduce((sum, t) => sum + (t.pageCount || 0), 0);
  const reportCount = getReportCount();
  const messageCount = getMessageCount();

  const stats = [
    { value: themes.length, label: "Categories (Thema's)", href: '/admin/categories' },
    { value: totalPages.toLocaleString(), label: 'Kleurplaten (Totaal)', href: '/admin/coloring-pages' },
    { value: reportCount, label: 'Open Meldingen', href: '/admin/reports', highlight: reportCount > 0 },
    { value: messageCount, label: 'Berichten', href: '/admin/messages' },
  ];

  return (
    <AdminShell title="Dashboard Overzicht"reportCount={reportCount}>
      {/* Clickable Stat Cards */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <Link key={i} href={s.href} className={styles.statCardLink}>
            <div className={styles.statCard}>
              <div
                className={styles.statValue}
                style={s.highlight ? { color:'#f87171'} : undefined}
              >
                {s.value}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1rem', marginBottom:'2rem'}}>
        <Link
          href="/admin/coloring-pages"style={{
            background:'linear-gradient(135deg, rgba(255,107,74,0.15), rgba(255,107,74,0.05))',
            border:'1px solid rgba(255,107,74,0.3)',
            borderRadius:'0.75rem',
            padding:'1.25rem',
            textDecoration:'none',
            display:'flex',
            alignItems:'center',
            gap:'1rem',
            transition:'transform 0.15s ease',
          }}
        >
          <div style={{ fontSize: '2rem' }}>🎨</div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem', color: '#FDF6E9', fontSize: '1rem', fontWeight: 800 }}>
              Kleurplaten Beheer
            </h3>
            <p style={{ margin: 0, color: 'rgba(253,246,233,0.55)', fontSize: '0.8rem' }}>
              Zoek, filter op dubbele namen, bekijk previews en inspecteer alle {totalPages.toLocaleString()} kleurplaten.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/categories"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            transition: 'transform 0.15s ease',
          }}
        >
          <div style={{ fontSize: '2rem' }}>🗂️</div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem', color: '#FDF6E9', fontSize: '1rem', fontWeight: 800 }}>
              Categorieën Overzicht
            </h3>
            <p style={{ margin: 0, color: 'rgba(253,246,233,0.55)', fontSize: '0.8rem' }}>
              Bekijk categorieën op aantal afbeeldingen, controleer lege thema&apos;s en spring direct naar de platen.
            </p>
          </div>
        </Link>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '2rem' }}>🌍</div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem', color: '#FDF6E9', fontSize: '1rem', fontWeight: 800 }}>
              SEO & Meertaligheid Live
            </h3>
            <p style={{ margin: 0, color: 'rgba(253,246,233,0.55)', fontSize: '0.8rem', lineHeight: 1.4 }}>
              4 talen actief (NL, EN, DE, FR) met Google hreflang. <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', textDecoration: 'underline', fontWeight: 700 }}>Bekijk sitemap.xml ↗</a>
            </p>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className={styles.tableWrap}>
        <div style={{ padding:'1rem 1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(253,246,233,0.08)'}}>
          <div className={styles.tableTitle} style={{ padding: 0, border:'none'}}>
            Alle Categorieën ({themes.length})
          </div>
          <Link
            href="/admin/categories"style={{ color:'#FF6B4A', fontSize:'0.82rem', fontWeight: 700, textDecoration:'none'}}
          >
            Bekijk alle {themes.length} thema&apos;s →
          </Link>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Categorie (Klik voor platen)</th>
              <th>Hoofd-Hub</th>
              <th>Aantal Platen</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {themes.slice(0, 40).map((t, i) => {
              const count = t.pageCount || 0;
              return (
                <tr key={i}>
                  <td>
                    <Link
                      href={`/admin/coloring-pages?theme=${t.slug}`}
                      style={{ fontWeight: 700, color:'#FDF6E9', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}
                    >
                      <span>📁</span> {t.title}
                    </Link>
                    <div style={{ color:'rgba(253,246,233,0.35)', fontSize:'0.72rem', marginTop:'0.2rem'}}>
                      /{t.slug}
                    </div>
                  </td>
                  <td>
                    <span style={{ color:'rgba(253,246,233,0.6)'}}>{t.parentHub}</span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/coloring-pages?theme=${t.slug}`}
                      style={{ textDecoration:'none'}}
                    >
                      <span
                        className={styles.badge}
                        style={count === 0
                          ? { background:'rgba(239,68,68,0.15)', color:'#f87171'}
                          : count < 10
                          ? { background:'rgba(245,158,11,0.15)', color:'#fbbf24'}
                          : { background:'rgba(16,185,129,0.15)', color:'#10b981'}
                        }
                      >
                        {count} platen
                      </span>
                    </Link>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Link
                        href={`/admin/coloring-pages?theme=${t.slug}`}
                        className={styles.btnDismiss}
                        style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.3rem'}}
                      >
                        <span>⚙️</span> Beheer
                      </Link>
                      <a
                        href={`/en/${t.parentHub}/${t.slug}`}
                        target="_blank"rel="noopener noreferrer"className={styles.btnDismiss}
                        style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.3rem'}}
                      >
                        <span>👁️</span> Live ↗
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
