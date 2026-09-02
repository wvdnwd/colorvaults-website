'use client';

import { useState } from 'react';
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

export default function CategoryExplorerTabs({
  lang,
  hubs,
  themes,
}: CategoryExplorerTabsProps) {
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const isEn = lang === 'en';

  const filteredThemes = selectedHub === 'all' 
    ? themes.slice(0, 12) 
    : themes.filter(t => t.parentHub === selectedHub);

  const activeHubObj = hubs.find(h => h.slug === selectedHub);

  return (
    <div className={styles.explorerWrapper}>
      {/* Category Pills Navigation */}
      <div className={styles.tabScrollContainer} role="tablist" aria-label="Category filter">
        <button
          type="button"
          role="tab"
          aria-selected={selectedHub === 'all'}
          onClick={() => setSelectedHub('all')}
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
              onClick={() => setSelectedHub(hub.slug)}
              className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
            >
              <span>{hub.title}</span>
              <span className={styles.tabBadge}>{hubThemeCount}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Theme Cards in Portrait 3:4 Format */}
      <div className={styles.grid}>
        {filteredThemes.slice(0, 12).map((theme) => {
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
                <span className={styles.hubTag}>
                  {theme.parentHub.replace(/-/g, ' ')}
                </span>
                <h3 className={styles.cardTitle}>{theme.title}</h3>
                <div className={styles.cardBottomRow}>
                  <span className={styles.cardLinkText}>
                    {isEn ? 'Explore Album →' : 'Bekijk Album →'}
                  </span>
                  <span className={styles.freeBadge}>
                    100% Free
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA to view entire Hub */}
      <div className={styles.bottomCtaRow}>
        {selectedHub !== 'all' && activeHubObj ? (
          <Link
            href={`/${lang}/${selectedHub}`}
            className="btn-secondary"
            style={{ fontWeight: 800 }}
          >
            {isEn 
              ? `View All ${filteredThemes.length} ${activeHubObj.title} Collections →`
              : `Bekijk Alle ${filteredThemes.length} ${activeHubObj.title} Albums →`}
          </Link>
        ) : (
          <Link
            href={`/${lang}/search`}
            className="btn-secondary"
            style={{ fontWeight: 800 }}
          >
            {isEn ? 'Search All 133+ Theme Collections →' : 'Zoek in Alle 133+ Thema Albums →'}
          </Link>
        )}
      </div>
    </div>
  );
}