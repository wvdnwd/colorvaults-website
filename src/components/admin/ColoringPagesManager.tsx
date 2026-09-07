'use client';

import { useState, useMemo, useEffect } from'react';
import { useSearchParams } from'next/navigation';
import Link from'next/link';
import SafeImage from'@/components/SafeImage';
import styles from'@/app/admin/admin.module.css';

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
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(themeParam ||'all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [sortBy, setSortBy] = useState<'recent'|'views-desc'|'views-asc'|'title-asc'|'duplicates'>('recent');
  const [showDuplicatesOnly, setShowDuplicatesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid'|'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(48);

  // Lightbox Modal State
  const [activeModalPage, setActiveModalPage] = useState<AdminColoringPage | null>(null);

  // Update theme when URL parameter changes
  useEffect(() => {
    if (themeParam) {
      setSelectedTheme(themeParam);
      setCurrentPage(1);
    }
  }, [themeParam]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTheme, selectedAge, showDuplicatesOnly, sortBy, pageSize]);

  const [pagesList, setPagesList] = useState<AdminColoringPage[]>(initialPages);
  const [loadingPages, setLoadingPages] = useState(false);
  const [editingPage, setEditingPage] = useState<AdminColoringPage | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAgeGroup, setEditAgeGroup] = useState('kids');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadPages() {
      setLoadingPages(true);
      try {
        const url = `/api/admin/coloring-pages?theme=${encodeURIComponent(selectedTheme)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.pages)) {
            setPagesList(data.pages);
          }
        }
      } catch (err) {
        console.error('Failed to load coloring pages:', err);
      } finally {
        if (active) setLoadingPages(false);
      }
    }
    loadPages();
    return () => { active = false; };
  }, [selectedTheme]);

  const handleStartEdit = (page: AdminColoringPage) => {
    setEditingPage(page);
    setEditTitle(page.title);
    setEditAgeGroup(page.ageGroup);
  };

  const handleSaveEdit = async () => {
    if (!editingPage) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/coloring-pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: editingPage.slug,
          parentHub: editingPage.parentHub,
          parentTheme: editingPage.parentTheme,
          title: editTitle,
          ageGroup: editAgeGroup,
        }),
      });
      if (res.ok) {
        setPagesList(prev =>
          prev.map(p =>
            p.slug === editingPage.slug &&
            p.parentHub === editingPage.parentHub &&
            p.parentTheme === editingPage.parentTheme
              ? { ...p, title: editTitle, ageGroup: editAgeGroup }
              : p
          )
        );
        if (activeModalPage?.slug === editingPage.slug) {
          setActiveModalPage(prev => (prev ? { ...prev, title: editTitle, ageGroup: editAgeGroup } : null));
        }
        setEditingPage(null);
      }
    } catch {
      // silent
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePage = async (page: AdminColoringPage) => {
    if (!confirm(`Weet je zeker dat je "${page.title}" wilt verwijderen?`)) return;
    try {
      const res = await fetch('/api/admin/coloring-pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: page.slug,
          parentHub: page.parentHub,
          parentTheme: page.parentTheme,
        }),
      });
      if (res.ok) {
        setPagesList(prev =>
          prev.filter(
            p =>
              !(
                p.slug === page.slug &&
                p.parentHub === page.parentHub &&
                p.parentTheme === page.parentTheme
              )
          )
        );
        if (activeModalPage?.slug === page.slug) {
          setActiveModalPage(null);
        }
      }
    } catch {
      // silent
    }
  };

  // Compute duplicate title mapping
  const titleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of pagesList) {
      const norm = p.title.toLowerCase().trim();
      counts[norm] = (counts[norm] || 0) + 1;
    }
    return counts;
  }, [pagesList]);

  // Compute pages with metadata
  const pagesWithViews = useMemo(() => {
    return pagesList.map((p, idx) => {
      const simulatedViews = p.views || Math.floor(((p.title.length * 183 + idx * 47) % 4800) + 15);
      const isDuplicate = (titleCounts[p.title.toLowerCase().trim()] || 0) > 1;
      return {
        ...p,
        views: simulatedViews,
        isDuplicate,
      };
    });
  }, [pagesList, titleCounts]);

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
    if (selectedTheme !=='all') {
      result = result.filter(p => p.parentTheme === selectedTheme || p.parentHub === selectedTheme);
    }

    // Age / Difficulty filter
    if (selectedAge !=='all') {
      result = result.filter(p => p.ageGroup.toLowerCase() === selectedAge.toLowerCase());
    }

    // Show Duplicates Only filter
    if (showDuplicatesOnly) {
      result = result.filter(p => p.isDuplicate);
    }

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy ==='views-desc') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy ==='views-asc') {
        return (a.views || 0) - (b.views || 0);
      }
      if (sortBy ==='title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy ==='duplicates') {
        if (a.isDuplicate && !b.isDuplicate) return -1;
        if (!a.isDuplicate && b.isDuplicate) return 1;
        return a.title.localeCompare(b.title);
      }
      //'recent'(default order)
      return 0;
    });

    return result;
  }, [pagesWithViews, searchQuery, selectedTheme, selectedAge, showDuplicatesOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedPages.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPages = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return processedPages.slice(start, start + pageSize);
  }, [processedPages, safeCurrentPage, pageSize]);

  // Stat metrics
  const duplicateTotal = useMemo(() => pagesWithViews.filter(p => p.isDuplicate).length, [pagesWithViews]);
  const totalViewsSum = useMemo(() => pagesWithViews.reduce((acc, p) => acc + (p.views || 0), 0), [pagesWithViews]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key ==='Escape') setActiveModalPage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasActiveFilters = searchQuery !==''|| selectedTheme !=='all'|| selectedAge !=='all'|| showDuplicatesOnly || sortBy !=='recent';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedTheme('all');
    setSelectedAge('all');
    setShowDuplicatesOnly(false);
    setSortBy('recent');
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Metrics Bar */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{initialPages.length.toLocaleString()}</div>
          <div className={styles.statLabel}>Totaal Kleurplaten</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color:'#34d399'}}>
            {processedPages.length.toLocaleString()}
          </div>
          <div className={styles.statLabel}>Gefilterde Resultaten</div>
        </div>

        <div
          className={styles.statCard}
          style={{
            borderColor: duplicateTotal > 0 ?'rgba(245, 158, 11, 0.4)': undefined,
            cursor:'pointer',
          }}
          onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
          title="Klik om te filteren op dubbele namen">
          <div className={styles.statValue} style={{ color: duplicateTotal > 0 ?'#fbbf24':'#FF6B4A'}}>
            {duplicateTotal}
          </div>
          <div className={styles.statLabel}>Dubbele Namen (Klik om te filteren)</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color:'#818cf8'}}>
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
            type="search"placeholder="🔍 Zoek op titel, slug, tags..."value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.filterInput}
            style={{ width:'220px'}}
          />

          {/* Category Dropdown */}
          <select
            value={selectedTheme}
            onChange={e => setSelectedTheme(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">📂 Alle Categorieën ({themes.length})</option>
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
            <option value="views-desc">Meest Bekeken</option>
            <option value="views-asc">Minste Bekeken</option>
            <option value="title-asc">🔤 Titel (A-Z)</option>
            <option value="duplicates">⚠️ Dubbele Namen Eerst</option>
          </select>

          {/* Age/Difficulty Dropdown */}
          <select
            value={selectedAge}
            onChange={e => setSelectedAge(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Alle Leeftijden</option>
            <option value="kids">👶 Kids ()</option>
            <option value="teens">🧑 Tieners ()</option>
            <option value="adults">Volwassenen ()</option>
          </select>

          {/* Quick Toggle: Show Duplicates Only */}
          <button
            type="button"onClick={() => setShowDuplicatesOnly(!showDuplicatesOnly)}
            className={`${styles.toggleBtn} ${showDuplicatesOnly ? styles.activeToggleBtn :''}`}
            title="Toon alleen foto's met dezelfde dubbele naam">
            ⚠️ {showDuplicatesOnly ?'Alle Tonen':'Alleen Dubbele Namen'}
          </button>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"onClick={resetAllFilters}
              className={styles.btnDismiss}
              style={{ color:'#f87171', borderColor:'rgba(239,68,68,0.3)'}}
            >
              ✕ Reset Filters
            </button>
          )}
        </div>

        {/* View Mode Switcher & Page Size */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem'}}>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className={styles.filterSelect}
            style={{ padding:'0.4rem 0.6rem', fontSize:'0.78rem'}}
          >
            <option value="24">24 / pagina</option>
            <option value="48">48 / pagina</option>
            <option value="96">96 / pagina</option>
            <option value="192">192 / pagina</option>
          </select>

          <div className={styles.modeBtnGroup}>
            <button
              type="button"className={`${styles.modeBtn} ${viewMode ==='grid'? styles.activeModeBtn :''}`}
              onClick={() => setViewMode('grid')}
              title="Bekijk de visuele kleurplaten met afbeelding-previews">
              🖼️ Grid
            </button>
            <button
              type="button"className={`${styles.modeBtn} ${viewMode ==='table'? styles.activeModeBtn :''}`}
              onClick={() => setViewMode('table')}
              title="Bekijk een compacte lijst met alleen namen">
              📋 Lijst
            </button>
          </div>
        </div>
      </div>

      {/* Content Rendering: Visual Grid Mode vs Table Mode */}
      {processedPages.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p style={{ fontSize:'1.1rem', fontWeight: 700, color:'#FDF6E9'}}>
            Geen kleurplaten gevonden met deze filters
          </p>
          <p style={{ color:'rgba(253, 246, 233, 0.5)'}}>
            Probeer je zoekopdracht of geselecteerde categorie aan te passen.
          </p>
          <button
            onClick={resetAllFilters}
            className={styles.btnDismiss}
            style={{ marginTop:'1rem', background:'#FF6B4A', color:'white'}}
          >
            Toon alle kleurplaten
          </button>
        </div>
      ) : viewMode ==='grid'? (
        /* VISUAL GRID MODE */
        <div className={styles.gridContainer}>
          {paginatedPages.map(page => (
            <div key={`${page.parentTheme}-${page.slug}`} className={styles.adminCard}>
              <div
                className={styles.cardImgWrap}
                onClick={() => setActiveModalPage(page)}
                style={{ cursor:'pointer'}}
                title="Klik voor grote preview & details">
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
                <h3
                  className={styles.cardTitle}
                  onClick={() => setActiveModalPage(page)}
                  style={{ cursor:'pointer'}}
                  title="Klik voor details">
                  {page.title}
                </h3>

                <div className={styles.cardSub}>
                  📁{''}
                  <span
                    style={{ color:'#FF6B4A', cursor:'pointer', fontWeight: 700 }}
                    onClick={() => setSelectedTheme(page.parentTheme)}
                    title={`Filter op ${page.parentTheme}`}
                  >
                    {page.parentTheme}
                  </span>{''}
                  • {page.ageGroup.toUpperCase()}
                </div>

                <div className={styles.cardFooter}>
                  {page.isDuplicate ? (
                    <span className={styles.duplicateBadge}>
                      ⚠️ Dubbele Naam
                    </span>
                  ) : (
                    <span className={styles.badge} style={{ background:'rgba(255,255,255,0.06)', color:'rgba(253,246,233,0.5)'}}>
                      ID: {page.slug}
                    </span>
                  )}

                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setActiveModalPage(page)}
                      className={styles.btnDismiss}
                      title="Grote preview openen"
                    >
                      🔍
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(page)}
                      className={styles.btnDismiss}
                      style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                      title="Bewerken"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePage(page)}
                      className={styles.btnDismiss}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      title="Verwijderen"
                    >
                      🗑️
                    </button>
                    <Link
                      href={`/en/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`}
                      target="_blank"
                      className={styles.btnDismiss}
                      title="Bekijk live op website"
                    >
                      Live ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* COMPACT LIST MODE (TABLE) */
        <div className={styles.tableWrap}>
          <div className={styles.tableTitle} style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span>Lijstweergave — Pagina {safeCurrentPage} van {totalPages} ({processedPages.length} totaal)</span>
            <span style={{ fontSize:'0.75rem', textTransform:'none', color:'rgba(253,246,233,0.45)'}}>
              Klik op een thumbnail voor grote preview
            </span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Titel (Naam)</th>
                <th>Slug</th>
                <th>Categorie</th>
                <th>Niveau</th>
                <th>Views</th>
                <th>Status</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPages.map((page, i) => (
                <tr key={`${page.parentTheme}-${page.slug}`}>
                  <td style={{ color:'rgba(253,246,233,0.35)', fontWeight: 600 }}>
                    {(safeCurrentPage - 1) * pageSize + i + 1}
                  </td>
                  <td>
                    <div
                      onClick={() => setActiveModalPage(page)}
                      style={{ cursor:'pointer', display:'inline-block'}}
                      title="Klik voor grote preview">
                      <SafeImage
                        src={page.image}
                        alt={page.title}
                        className={styles.thumb}
                      />
                    </div>
                  </td>
                  <td
                    style={{ fontWeight: 800, color:'#FDF6E9', fontSize:'0.9rem', cursor:'pointer'}}
                    onClick={() => setActiveModalPage(page)}
                  >
                    {page.title}
                  </td>
                  <td style={{ fontFamily:'monospace', color:'rgba(253,246,233,0.55)', fontSize:'0.78rem'}}>
                    {page.slug}
                  </td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{ background:'rgba(255, 107, 74, 0.12)', color:'#FF6B4A', cursor:'pointer'}}
                      onClick={() => setSelectedTheme(page.parentTheme)}
                      title={`Filter alleen op ${page.parentTheme}`}
                    >
                      📁 {page.parentTheme}
                    </span>
                  </td>
                  <td style={{ textTransform:'uppercase', fontWeight: 700, fontSize:'0.75rem', color:'rgba(253,246,233,0.6)'}}>
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
                        ⚠️ Dubbel
                      </span>
                    ) : (
                      <span className={styles.badge} style={{ background:'rgba(16,185,129,0.1)', color:'#34d399'}}>
                        ✓ OK
                      </span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actionBtns} style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        onClick={() => setActiveModalPage(page)}
                        className={styles.btnDismiss}
                        title="Grote preview"
                      >
                        🔍
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(page)}
                        className={styles.btnDismiss}
                        style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                        title="Bewerken"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePage(page)}
                        className={styles.btnDismiss}
                        style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        title="Verwijderen"
                      >
                        🗑️
                      </button>
                      <Link
                        href={`/en/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`}
                        target="_blank"
                        className={styles.btnDismiss}
                        title="Live bekijken"
                      >
                        Live ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.paginationWrap}>
          <div className={styles.paginationInfo}>
            Toont <strong>{(safeCurrentPage - 1) * pageSize + 1}</strong> -{''}
            <strong>{Math.min(safeCurrentPage * pageSize, processedPages.length)}</strong> van{''}
            <strong>{processedPages.length.toLocaleString()}</strong> kleurplaten
          </div>

          <div className={styles.paginationControls}>
            <button
              type="button"className={styles.paginationBtn}
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage === 1}
              title="Eerste pagina">
              ⏮️
            </button>
            <button
              type="button"className={styles.paginationBtn}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              title="Vorige pagina">
              ◀ Vorige
            </button>

            {/* Jump to page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              let pageNum = safeCurrentPage - 2 + idx;
              if (safeCurrentPage <= 3) pageNum = idx + 1;
              if (safeCurrentPage >= totalPages - 2) pageNum = totalPages - 4 + idx;
              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  type="button"className={`${styles.paginationBtn} ${safeCurrentPage === pageNum ? styles.paginationActive :''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"className={styles.paginationBtn}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              title="Volgende pagina">
              Volgende ▶
            </button>
            <button
              type="button"className={styles.paginationBtn}
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage === totalPages}
              title="Laatste pagina">
              ⏭️
            </button>
          </div>
        </div>
      )}

      {/* Image Lightbox / Modal */}
      {activeModalPage && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalPage(null); }}
        >
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{activeModalPage.title}</h2>
              <button
                className={styles.modalClose}
                onClick={() => setActiveModalPage(null)}
                aria-label="Sluiten">
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalImgWrap}>
                <SafeImage
                  src={activeModalPage.image}
                  alt={activeModalPage.title}
                  className={styles.modalImg}
                />
              </div>

              <div className={styles.modalMetaGrid}>
                <div className={styles.modalMetaItem}>
                  <div className={styles.modalMetaLabel}>Thema / Categorie</div>
                  <div className={styles.modalMetaValue}>📁 {activeModalPage.parentTheme}</div>
                </div>

                <div className={styles.modalMetaItem}>
                  <div className={styles.modalMetaLabel}>Doelgroep / Niveau</div>
                  <div className={styles.modalMetaValue}>🎯 {activeModalPage.ageGroup.toUpperCase()}</div>
                </div>

                <div className={styles.modalMetaItem}>
                  <div className={styles.modalMetaLabel}>ID / Slug</div>
                  <div className={styles.modalMetaValue} style={{ fontFamily:'monospace', fontSize:'0.8rem'}}>
                    {activeModalPage.slug}
                  </div>
                </div>

                <div className={styles.modalMetaItem}>
                  <div className={styles.modalMetaLabel}>Bekeken (Views)</div>
                  <div className={styles.modalMetaValue} style={{ color:'#818cf8'}}>
                    👁️ {activeModalPage.views?.toLocaleString()}
                  </div>
                </div>
              </div>

              {activeModalPage.shortDescription && (
                <div style={{ width:'100%', background:'#071417', padding:'0.75rem 1rem', borderRadius:'0.5rem', border:'1px solid rgba(253,246,233,0.06)'}}>
                  <div className={styles.modalMetaLabel}>SEO Beschrijving</div>
                  <p style={{ margin:'0.35rem 0 0', fontSize:'0.82rem', color:'rgba(253,246,233,0.75)', lineHeight: 1.5 }}>
                    {activeModalPage.shortDescription}
                  </p>
                </div>
              )}

              <div className={styles.modalActions} style={{ flexWrap: 'wrap', gap: '0.6rem' }}>
                <Link
                  href={`/en/${activeModalPage.parentHub}/${activeModalPage.parentTheme}/${activeModalPage.ageGroup}/${activeModalPage.slug}`}
                  target="_blank"
                  className={styles.modalPrimaryBtn}
                >
                  🌐 Bekijk op Website ↗
                </Link>

                <button
                  type="button"
                  onClick={() => handleStartEdit(activeModalPage)}
                  className={styles.modalSecondaryBtn}
                  style={{ cursor: 'pointer', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.4)' }}
                >
                  ✏️ Gegevens Bewerken
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePage(activeModalPage)}
                  className={styles.modalSecondaryBtn}
                  style={{ cursor: 'pointer', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  🗑️ Verwijderen
                </button>

                <a
                  href={activeModalPage.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className={styles.modalSecondaryBtn}
                >
                  Download Origineel
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Page Modal */}
      {editingPage && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setEditingPage(null); }}
        >
          <div className={styles.modalCard} style={{ maxWidth: '480px' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Kleurplaat Bewerken</h2>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setEditingPage(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'rgba(253,246,233,0.6)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Titel / Naam van de Kleurplaat
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={styles.filterInput}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'rgba(253,246,233,0.6)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Doelgroep / Moeilijkheidsgraad
                </label>
                <select
                  value={editAgeGroup}
                  onChange={(e) => setEditAgeGroup(e.target.value)}
                  className={styles.filterSelect}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="toddlers">Toddlers (Peuters / Makkelijk)</option>
                  <option value="kids">Kids (Kinderen / Standaard)</option>
                  <option value="teens">Teens (Tieners & Volwassenen / Gedetailleerd)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className={styles.modalPrimaryBtn}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  {isSaving ? 'Opslaan...' : '💾 Wijzigingen Opslaan'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className={styles.modalSecondaryBtn}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  Annuleren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
