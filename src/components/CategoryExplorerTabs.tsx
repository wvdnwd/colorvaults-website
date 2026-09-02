'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import styles from './CategoryExplorerTabs.module.css';

interface ThemeItem {
  slug: string;
  title: string;
  parentHub: string;
  image?: string;
  pageCount?: number;
  featured?: boolean;
}

interface HubItem {
  slug: string;
  title: string;
}

interface CategoryExplorerTabsProps {
  lang: string;
  hubs: HubItem[];
  themes: ThemeItem[];
}

const TOP_FEATURED_SLUGS = [
  'frozen', 'pokemon', 'marvel-spider-man', 'dinosaur-adventures',
  'sonic-the-hedgehog', 'paw-patrol', 'unicorns-pegasus', 'mandalas-sacred-geometry',
  'super-mario', 'cute-puppies-dogs', 'cute-kittens-cats', 'princesses-castles',
  'the-lion-king', 'beauty-and-the-beast-belle', 'the-little-mermaid-ariel', 'aladdin-jasmine'
];

export default function CategoryExplorerTabs({
  lang,
  hubs,
  themes,
}: CategoryExplorerTabsProps) {
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const isEn = lang === 'en';

  let allCategoryThemes: ThemeItem[] = [];
  if (selectedHub === 'all') {
    const featured = themes.filter(t => TOP_FEATURED_SLUGS.some(slug => t.slug.includes(slug)));
    const remaining = themes.filter(t => !TOP_FEATURED_SLUGS.some(slug => t.slug.includes(slug)));
    allCategoryThemes = [...featured, ...remaining];
  } else {
    allCategoryThemes = themes.filter(t => t.parentHub === selectedHub);
  }

  const visibleThemes = showAll ? allCategoryThemes : allCategoryThemes.slice(0, 12);
  const hasMore = allCategoryThemes.length > 12;
  const activeHubObj = hubs.find(h => h.slug === selectedHub);

  const handleTabChange = (hubSlug: string) => {
    setSelectedHub(hubSlug);
    setShowAll(false);
  };

  const handleToggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className={styles.explorerWrapper}>
      {/* Category Pills Navigation */}
      <div className={styles.tabScrollContainer} role="tablist" aria-label="Category filter">
        <button
          type="button"
          role="tab"
          aria-selected={selectedHub === 'all'}
          onClick={() => handleTabChange('all')}
          className={`${styles.tabBtn} ${selectedHub === 'all' ? styles.activeTab : ''}`}
        >
          <span>{isEn ? 'Featured Albums' : 'Uitgelichte Albums'}</span>
          <span className={styles.tabBadge}>{themes.length}</span>
        </button>

        {hubs.map((hub) => {
          const hubThemeCount = themes.filter(t => t.parentHub === hub.slug).length;
          if (hubThemeCount === 0) return null;
          const isActive = selectedHub === hub.slug;

          return (
            <button
              key={hub.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(hub.slug)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
            >
              <span>{hub.title}</span>
              <span className={styles.tabBadge}>{hubThemeCount}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Theme Cards in Portrait 3:4 Format */}
      <div className={styles.grid} ref={gridRef}>
        {visibleThemes.map((theme) => {
          const cardUrl = `/${lang}/${theme.parentHub}/${theme.slug}`;

          return (
            <Link
              key={`${theme.parentHub}-${theme.slug}`}
              href={cardUrl}
              className={styles.themeCard}
            >
              <div className={styles.imgWrapper}>
                <SafeImage
                  src={theme.image || '/images/banner.jpg'}
                  alt={theme.title}
                  className={styles.themeImg}
                  width={380}
                  height={500}
                  loading="lazy"
                />
                <span className={styles.countBadge}>
                  {theme.pageCount || 90}+ {isEn ? 'Pages' : 'Platen'}
                </span>
              </div>
              <div className={styles.cardContent}>
                {/* Subject Title Only (No Disney Pixar tag) */}
                <h3 className={styles.cardTitle}>{theme.title}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', background: 'var(--primary-light)', padding: '0.15rem 0.6rem', borderRadius: '9999px' }}>
                    {theme.pageCount || 90} {isEn ? 'Pages' : 'Platen'}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-500)' }}>
                    100% Free
                  </span>
                </div>

                <div className={styles.cardBottomRow}>
                  <span className={styles.cardLinkText}>
                    {isEn ? 'Explore Album →' : 'Bekijk Album →'}
                  </span>
                  <span className={styles.freeBadge}>
                    PDF / PNG
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA & Expansion Controls */}
      <div className={styles.bottomCtaRow} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
        {hasMore && (
          <button
            type="button"
            onClick={handleToggleShowAll}
            className="btn-primary"
            style={{ fontWeight: 800, cursor: 'pointer', padding: '0.85rem 1.75rem' }}
          >
            {showAll
              ? (isEn ? '↑ Show Less' : '↑ Minder Weergeven')
              : (isEn ? `↓ View All ${allCategoryThemes.length} Collections` : `↓ Bekijk Alle ${allCategoryThemes.length} Collecties`)}
          </button>
        )}

        {selectedHub !== 'all' && activeHubObj && (
          <Link
            href={`/${lang}/${selectedHub}`}
            className="btn-secondary"
            style={{ fontWeight: 800, padding: '0.85rem 1.75rem' }}
          >
            {isEn 
              ? `Open ${activeHubObj.title} Hub →`
              : `Open ${activeHubObj.title} Overzicht →`}
          </Link>
        )}

        {selectedHub === 'all' && (
          <Link
            href={`/${lang}/search`}
            className="btn-secondary"
            style={{ fontWeight: 800, padding: '0.85rem 1.75rem' }}
          >
            {isEn ? 'Search All 133+ Theme Collections →' : 'Zoek in Alle 133+ Thema Albums →'}
          </Link>
        )}
      </div>
    </div>
  );
}