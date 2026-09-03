'use client';

import React from'react';
import Link from'next/link';
import SafeImage from'./SafeImage';
import styles from'./RelatedThemes.module.css';

interface ThemeItem {
  slug: string;
  title: string;
  parentHub: string;
  image?: string;
  pageCount?: number;
}

interface RelatedThemesProps {
  lang: string;
  isEn: boolean;
  currentThemeSlug: string;
  allThemes: ThemeItem[];
}

export default function RelatedThemes({
  lang,
  isEn,
  currentThemeSlug,
  allThemes,
}: RelatedThemesProps) {
  const current = allThemes.find(t => t.slug === currentThemeSlug);
  if (!current) return null;

  // Find themes in same hub, or pick top popular themes
  let related = allThemes.filter(t => t.parentHub === current.parentHub && t.slug !== currentThemeSlug);
  if (related.length < 4) {
    const others = allThemes.filter(t => t.slug !== currentThemeSlug && !related.some(r => r.slug === t.slug));
    related = [...related, ...others];
  }

  const displayThemes = related.slice(0, 4);
  if (displayThemes.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className="badge"style={{ background:'rgba(79, 70, 229, 0.08)', color:'var(--color-primary)'}}>
          {isEn ?'Discover More':'Ontdek Meer'}
        </span>
        <h2 className="title-h2"style={{ marginTop:'0.5rem'}}>
          {isEn ?'You Might Also Like':'Bekijk Ook Deze Thema’s'}
        </h2>
        <p style={{ color:'var(--gray-600)', fontSize:'0.95rem', marginTop:'0.4rem'}}>
          {isEn ?'Explore complementary collections with thousands of free printable line art pages.':'Ontdek bijpassende collecties met honderden gratis printbare kleurplaten.'}
        </p>
      </div>

      <div className={styles.grid}>
        {displayThemes.map(theme => (
          <Link
            key={theme.slug}
            href={`/${lang}/${theme.parentHub}/${theme.slug}`}
            className={styles.card}
          >
            <div className={styles.imgWrapper}>
              <SafeImage
                src={theme.image ||'/images/banner.jpg'}
                alt={theme.title}
                width={320}
                height={420}
                className={styles.themeImg}
                loading="lazy"/>
              <span className={styles.badge}>
                {theme.pageCount || 60}+ {isEn ?'Pages':'Platen'}
              </span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{theme.title}</h3>
              <span className={styles.linkText}>
                {isEn ?'Explore Album →':'Bekijk Album →'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}