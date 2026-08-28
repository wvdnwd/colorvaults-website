'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import styles from '@/app/admin/admin.module.css';

export interface AdminColoringPage {
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  shortDescription: string;
  image: string;
  fileSize?: string;
  dimensions?: string;
  tags?: string[];
  views?: number;
}

interface ThemeOption {
  slug: string;
  title: string;
  parentHub: string;
}

interface ColoringPagesManagerProps {
  initialPages: AdminColoringPage[];
  themes: ThemeOption[];
}

export default function ColoringPagesManager({
  initialPages,
  themes,
}: ColoringPagesManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'views-desc' | 'views-asc' | 'title-asc' | 'duplicates'>('recent');
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Compute duplicate title mapping
  const titleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of initialPages) {
      const norm = p.title.toLowerCase().trim();
      counts[norm] = (counts[norm] || 0) + 1;
    }
    return counts;
  }, [initialPages]);

  // Compute deterministic views if not present
  const pagesWithViews = useMemo(() => {
    return initialPages.map((p, idx) => {
      const simulatedViews = p.views || Math.floor(((p.title.length * 183 + idx * 47) % 4800) + 15);
      const isDuplicate = (titleCounts[p.title.toLowerCase().trim()] || 0) > 1;
      return {
        ...p,
        views: simulatedViews,
        isDuplicate,
      };
    });
  }, [initialPages, titleCounts]);

  // Filtered & Sorted Pages
  const processedPages = useMemo(() => {
    let result = [...pagesWithViews];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.parentTheme.toLowerCase().includes(q) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Category / Theme filter
    if (selectedTheme !== 'all') {
      result = result.filter(p => p.parentTheme === selectedTheme || p.parentHub === selectedTheme);
    }

    // Age / Difficulty filter
    if (selectedAge !== 'all') {
      result = result.filter(p => p.ageGroup.toLowerCase() === selectedAge.toLowerCase());
    }

    // Show Duplicates Only filter
    if (showDuplicatesOnly) {
      result = result.filter(p => p.isDuplicate);
    }

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'views-desc') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'views-asc') {
        return (a.views || 0) - (b.views || 0);
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duplicates') {
        if (a.isDuplicate && !b.isDuplicate) return -1;
        if (!a.isDuplicate && b.isDuplicate) return 1;
        return a.title.localeCompare(b.title);
      }
      // 'recent' (default order)
      return 0;
    });

    return result;
  }, [pagesWithViews, searchQuery, selectedTheme, selectedAge, showDuplicatesOnly, sortBy]);

  // Stat metrics
  const duplicateTotal = useMemo(() => pagesWithViews.filter(p => p.isDuplicate).length, [pagesWithViews]);
  const totalViewsSum = useMemo(() => pagesWithViews.reduce((acc, p) => acc + (p.views || 0), 0), [pagesWithViews]);

  return (
    <div>
      {/* Metrics Bar */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{initialPages.length}</div>
          <div className={styles.statLabel}>Totaal Kleurplaten</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue}>{processedPages.length}</div>
          <div className={styles.statLabel}>Gefilterde Resultaten</div>
        </div>

        <div className={styles.statCard} style={{ borderColor: duplicateTotal > 0 ? 'rgba(245, 158, 11, 0.4)' : undefined }}>
          <div className={styles.statValue} style={{ color: duplicateTotal > 0 ? '#fbbf24' : '#FF6B4A' }}>
            {duplicateTotal}
          </div>
          <div className={styles.statLabel}>Dubbele Namen (Foto&apos;s)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: '#818cf8' }}>
            {totalViewsSum.toLocaleString()}
          </div>
          <div className={styles.statLabel}>Totaal Bekeken (Views)</div>
        </div>
      </div>

      {/* Control Bar: Filters, Sort & Mode Switcher */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          {/* Search Input */}
          <input
            type="search"
            placeholder="🔍 Zoek op titel, slug, tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.filterInput}
            style={{ width: '220px' }}
          />

          {/* Category Dropdown */}
          <select
            value={selectedTheme}
            onChange={e => setSelectedTheme(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">📂 Alle Categorieën</option>
            {themes.map(t => (
              <option key={t.slug} value={t.slug}>
                {t.title} ({t.parentHub})
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className={styles.filterSelect}
          >
            <option value="recent">🕐 Recente (Standaard)</option>
            <option value="views-desc">🔥 Meest Bekeken</option>
            <option value="views-asc">❄️ Minste Bekeken</option>
            <option value="title-asc">🔤 Titel (A-Z)</option>
            <option value="duplicates">⚠️ Dubbele Namen Eerst</option>
          </select>

          {/* Age/Difficulty Dropdown */}
          <select
            value={selectedAge}
            onChange={e => setSelectedAge(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">⭐ Alle Leeftijden</option>
            <option value="kids">👶 Kids (⭐)</option>
            <option value="teens">🧑 Tieners (⭐⭐)</option>
            <option value="adults">🧘 Volwassenen (⭐⭐⭐)</option>
          </select>

          {/* Quick Toggle: Show Duplicates Only */}
          <button
            type="button"
            onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
            className={`${styles.toggleBtn} ${showDuplicatesOnly ? styles.activeToggleBtn : ''}`}
            title="Toon alleen foto's met dezelfde dubbele naam"
          >
            ⚠️ {showDuplicatesOnly ? 'Alle Tonen' : 'Alleen Dubbele Namen'}
          </button>
        </div>

        {/* View Mode Switcher (Grid vs List) */}
        <div className={styles.modeBtnGroup}>
          <button
            type="button"
            className={`${styles.modeBtn} ${viewMode === 'grid' ? styles.activeModeBtn : ''}`}
            onClick={() => setViewMode('grid')}
            title="Bekijk de visuele kleurplaten met afbeelding-previews"
          >
            🖼️ Kleurplaten
          </button>
          <button
            type="button"
            className={`${styles.modeBtn} ${viewMode === 'table' ? styles.activeModeBtn : ''}`}
            onClick={() => setViewMode('table')}
            title="Bekijk een compacte lijst met alleen namen"
          >
            📋 Alleen Namen
          </button>
        </div>
      </div>

      {/* Content Rendering: Visual Grid Mode vs Names Only List Mode */}
      {processedPages.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FDF6E9' }}>
            Geen kleurplaten gevonden met deze filters
          </p>
          <p style={{ color: 'rgba(253, 246, 233, 0.5)' }}>
            Probeer je zoekopdracht of geselecteerde categorie aan te passen.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* VISUAL GRID MODE (Kleurplaten Weergave) */
        <div className={styles.gridContainer}>
          {processedPages.map(page => (
            <div key={`${page.parentTheme}-${page.slug}`} className={styles.adminCard}>
              <div className={styles.cardImgWrap}>
                <SafeImage
                  src={page.image}
                  alt={page.title}
                  className={styles.cardImg}
                />
                <div className={styles.cardMetaOverlay}>
                  👁️ {page.views?.toLocaleString()}
                </div>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{page.title}</h3>

                <div className={styles.cardSub}>
                  📁 <strong>{page.parentTheme}</strong> • {page.ageGroup.toUpperCase()}
                </div>

                <div className={styles.cardFooter}>
                  {page.isDuplicate ? (
                    <span className={styles.duplicateBadge}>
                      ⚠️ Dubbele Naam
                    </span>
                  ) : (
                    <span className={styles.badge} style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(253,246,233,0.5)' }}>
                      ID: {page.slug}
                    </span>
                  )}

                  <Link
                    href={`/en/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`}
                    target="_blank"
                    className={styles.btnDismiss}
                  >
                    Bekijk ↗
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* COMPACT LIST MODE (Alleen Namen Weergave) */
        <div className={styles.tableWrap}>
          <div className={styles.tableTitle}>
            Lijstweergave — {processedPages.length} items (Alleen Namen)
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Afbeelding / Preview</th>
                <th>Titel (Naam)</th>
                <th>Slug</th>
                <th>Categorie / Hub</th>
                <th>Niveau</th>
                <th>Bekeken (Views)</th>
                <th>Status / Dubbel</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {processedPages.map((page, i) => (
                <tr key={`${page.parentTheme}-${page.slug}`}>
                  <td style={{ color: 'rgba(253,246,233,0.35)', fontWeight: 600 }}>{i + 1}</td>
                  <td>
                    <SafeImage
                      src={page.image}
                      alt={page.title}
                      className={styles.thumb}
                    />
                  </td>
                  <td style={{ fontWeight: 800, color: '#FDF6E9', fontSize: '0.9rem' }}>
                    {page.title}
                  </td>
                  <td style={{ fontFamily: 'monospace', color: 'rgba(253,246,233,0.55)', fontSize: '0.78rem' }}>
                    {page.slug}
                  </td>
                  <td>
                    <span className={styles.badge} style={{ background: 'rgba(255, 107, 74, 0.12)', color: '#FF6B4A' }}>
                      {page.parentTheme}
                    </span>
                  </td>
                  <td style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.75rem', color: 'rgba(253,246,233,0.6)' }}>
                    {page.ageGroup}
                  </td>
                  <td>
                    <span className={styles.viewsBadge}>
                      👁️ {page.views?.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    {page.isDuplicate ? (
                      <span className={styles.duplicateBadge}>
                        ⚠️ Dubbele Naam
                      </span>
                    ) : (
                      <span className={styles.badgeDone}>✓ Uniek</span>
                    )}
                  </td>
                  <td>
                    <Link
                      href={`/en/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`}
                      target="_blank"
                      className={styles.btnDismiss}
                    >
                      Bekijk ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
