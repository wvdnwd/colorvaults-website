'use client';

import { useState, useMemo } from'react';
import Link from'next/link';
import styles from'@/app/admin/admin.module.css';

interface CategoryItem {
  title: string;
  slug: string;
  parentHub: string;
  count: number;
}

export default function CategoriesManager({ categories }: { categories: CategoryItem[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all'|'empty'|'low'|'growing'|'good'>('all');
  const [hubFilter, setHubFilter] = useState('all');

  const hubs = useMemo(() => {
    return Array.from(new Set(categories.map(c => c.parentHub))).sort();
  }, [categories]);

  const filtered = useMemo(() => {
    return categories.filter(c => {
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const match = c.title.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q) || c.parentHub.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Hub filter
      if (hubFilter !=='all'&& c.parentHub !== hubFilter) {
        return false;
      }

      // Status filter
      if (statusFilter ==='empty') return c.count === 0;
      if (statusFilter ==='low') return c.count > 0 && c.count < 10;
      if (statusFilter ==='growing') return c.count >= 10 && c.count < 30;
      if (statusFilter ==='good') return c.count >= 30;

      return true;
    });
  }, [categories, search, statusFilter, hubFilter]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: categories.length,
      empty: categories.filter(c => c.count === 0).length,
      low: categories.filter(c => c.count > 0 && c.count < 10).length,
      growing: categories.filter(c => c.count >= 10 && c.count < 30).length,
      good: categories.filter(c => c.count >= 30).length,
    };
  }, [categories]);

  return (
    <div>
      {/* Filter & Search Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <input
            type="search"placeholder="🔍 Zoek categorie of slug..."value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.filterInput}
            style={{ width: 260 }}
          />

          <select
            value={hubFilter}
            onChange={e => setHubFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">🌐 Alle Hoofd-Hubs</option>
            {hubs.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Quick Filter Pills */}
        <div className={styles.chipGroup} style={{ margin: 0 }}>
          <button
            type="button"className={`${styles.chipBtn} ${statusFilter ==='all'? styles.chipActive :''}`}
            onClick={() => setStatusFilter('all')}
          >
            Alle ({counts.all})
          </button>
          <button
            type="button"className={`${styles.chipBtn} ${statusFilter ==='empty'? styles.chipActive :''}`}
            onClick={() => setStatusFilter('empty')}
            style={statusFilter !=='empty'&& counts.empty > 0 ? { color:'#f87171'} : undefined}
          >
            Leeg ({counts.empty})
          </button>
          <button
            type="button"className={`${styles.chipBtn} ${statusFilter ==='low'? styles.chipActive :''}`}
            onClick={() => setStatusFilter('low')}
            style={statusFilter !=='low'&& counts.low > 0 ? { color:'#fbbf24'} : undefined}
          >
            Weinig &lt;10 ({counts.low})
          </button>
          <button
            type="button"className={`${styles.chipBtn} ${statusFilter ==='growing'? styles.chipActive :''}`}
            onClick={() => setStatusFilter('growing')}
          >
            Groeiend 10-29 ({counts.growing})
          </button>
          <button
            type="button"className={`${styles.chipBtn} ${statusFilter ==='good'? styles.chipActive :''}`}
            onClick={() => setStatusFilter('good')}
            style={statusFilter !=='good'? { color:'#34d399'} : undefined}
          >
            Goed 30+ ({counts.good})
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className={styles.tableWrap}>
        <div className={styles.tableTitle} style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span>Gevonden Categorieën ({filtered.length})</span>
          <span style={{ fontSize:'0.75rem', textTransform:'none', color:'rgba(253,246,233,0.45)'}}>
            Klik op een categorie om direct de bijbehorende platen te beheren
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <p>Geen categorieën gevonden die voldoen aan je filters.</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Categorie Naam</th>
                <th>Hoofd-Hub</th>
                <th>Kleurplaten</th>
                <th>Status</th>
                <th>Slug</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat, idx) => {
                const status =
                  cat.count === 0  ? { bg:'rgba(239,68,68,0.15)',    fg:'#f87171', label:'⚠️ Leeg (0)'}
                  : cat.count < 10 ? { bg:'rgba(245,158,11,0.15)',  fg:'#fbbf24', label:'Weinig (<10)'}
                  : cat.count < 30 ? { bg:'rgba(99,102,241,0.15)',  fg:'#818cf8', label:'Groeiend'}
                  :                  { bg:'rgba(16,185,129,0.15)', fg:'#10b981', label:'Uitstekend (30+)'};

                return (
                  <tr key={cat.slug}>
                    <td style={{ color:'rgba(253,246,233,0.3)', fontWeight: 600 }}>{idx + 1}</td>
                    <td>
                      <Link
                        href={`/admin/coloring-pages?theme=${cat.slug}`}
                        style={{ fontWeight: 700, color:'#FDF6E9', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.4rem'}}
                      >
                        <span>📁</span> {cat.title}
                      </Link>
                    </td>
                    <td style={{ color:'rgba(253,246,233,0.6)'}}>{cat.parentHub}</td>
                    <td>
                      <Link
                        href={`/admin/coloring-pages?theme=${cat.slug}`}
                        style={{ textDecoration:'none'}}
                      >
                        <span style={{ fontWeight: 800, color:'#FDF6E9', fontSize:'0.9rem'}}>
                          {cat.count}
                        </span>{''}
                        <span style={{ fontSize:'0.75rem', color:'rgba(253,246,233,0.4)'}}>platen</span>
                      </Link>
                    </td>
                    <td>
                      <span className={styles.badge} style={{ background: status.bg, color: status.fg }}>
                        {status.label}
                      </span>
                    </td>
                    <td style={{ color:'rgba(253,246,233,0.35)', fontFamily:'monospace', fontSize:'0.75rem'}}>
                      /{cat.slug}
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link
                          href={`/admin/coloring-pages?theme=${cat.slug}`}
                          className={styles.btnDismiss}
                          style={{ textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'0.3rem'}}
                        >
                          <span></span> Bekijk Platen
                        </Link>
                        <a
                          href={`/en/${cat.parentHub}/${cat.slug}`}
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
        )}
      </div>
    </div>
  );
}
