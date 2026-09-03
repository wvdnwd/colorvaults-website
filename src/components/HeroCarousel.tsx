'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroCarousel.module.css';

export interface CarouselItem {
  src: string;
  alt: string;
  href: string;
  badge?: string;
}

export interface QuickShortcut {
  name: string;
  href: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  lang?: string;
  shortcuts?: QuickShortcut[];
}

export default function HeroCarousel({ items, lang = 'nl', shortcuts = [] }: HeroCarouselProps) {
  const [shuffledItems, setShuffledItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffledItems(copy.slice(0, 8));
  }, [items]);

  const displayItems = shuffledItems.length > 0 ? shuffledItems : items.slice(0, 8);
  const count = displayItems.length;

  if (count === 0) return null;

  const isEn = lang === 'en';

  return (
    <div className={styles.widescreenHeroMaster}>
      {/* 3D Bank Vault Master Artwork Backdrop */}
      <div className={styles.vaultFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.jpg"
          alt="ColorVaults 3D Vault Stage"
          className={styles.vaultImage}
        />
        <div className={styles.vaultPortalAura} />
      </div>

      {/* 1. TOP: Space for 3D COLORVAULTS Logo */}
      <div className={styles.vaultTopHeaderArea} aria-hidden="true" />

      {/* 2. MIDDLE: 3D Carousel Spinning Inside the Vault Portal */}
      <div className={styles.portalStage}>
        <div className={styles.scene}>
          <div className={styles.ring} style={{ '--count': count } as React.CSSProperties}>
            {displayItems.map((img, i) => (
              <Link
                key={`${img.href}-${i}`}
                href={img.href}
                className={styles.card}
                style={{ '--i': i, '--count': count } as React.CSSProperties}
                title={img.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className={styles.img} />
                <div className={styles.shine} />
                
                {/* Album Badge Top Left */}
                <div className={styles.albumBadge}>
                  <span>Album</span>
                </div>

                {/* Album Title Bottom */}
                <div className={styles.cardLabel}>
                  <span className={styles.albumTitle}>{img.alt}</span>
                  <span className={styles.albumCta}>{isEn ? 'Explore →' : 'Bekijk Album →'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM: Unified Master Console Sitting on the Artist Desk */}
      <div className={styles.stageConsoleWrapper}>
        <div className={styles.stageFrostedCard}>
          {/* Free Badge */}
          <div className={styles.badgeWrapper}>
            <span className={styles.freeBadge}>
              {isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}
            </span>
          </div>

          {/* Title */}
          <h1 className={styles.heroTitle}>
            {isEn ? (
              <>Free Premium <span className={styles.titleGradient}>Coloring Pages</span></>
            ) : (
              <>Gratis Premium <span className={styles.titleGradient}>Kleurplaten</span></>
            )}
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            {isEn
              ? 'Thousands of high-quality printable coloring pages for toddlers, kids, teens, and adults. Free instant downloads — no account needed!'
              : 'Duizenden gratis printbare kleurplaten voor peuters, kinderen, tieners en volwassenen. Direct gratis downloaden — geen account nodig!'}
          </p>

          {/* Trust Pills */}
          <div className={styles.trustBadges}>
            <span className={styles.trustPill}>{isEn ? '100% Free' : '100% Gratis'}</span>
            <span className={styles.trustPill}>A4 / Letter PDF</span>
            <span className={styles.trustPill}>{isEn ? 'Color Online' : 'Online Inkleuren'}</span>
            <span className={styles.trustPill}>{isEn ? 'Instant Access' : 'Geen Account'}</span>
          </div>

          {/* Sleek Divider */}
          <div className={styles.consoleDivider} />

          {/* Trending Categories Section */}
          {shortcuts && shortcuts.length > 0 && (
            <div className={styles.categoriesBlock}>
              <div className={styles.categoriesHeader}>
                <span className={styles.categoriesTitle}>
                  {isEn ? 'Top Trending Albums & Categories' : 'Top Trending Albums & Categorieën'}
                </span>
                <span className={styles.categoriesCountBadge}>
                  130+ {isEn ? 'Themes' : "Thema's"}
                </span>
              </div>
              <div className={styles.categoriesGrid}>
                {shortcuts.map((pill) => (
                  <Link key={pill.name} href={pill.href} className={styles.categoryPill}>
                    {pill.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Action CTAs */}
          <div className={styles.ctaRow}>
            <Link href={`/${lang}/search`} className="btn-primary" style={{ padding: '0.85rem 2.4rem', fontSize: '0.95rem', fontWeight: 800 }}>
              {isEn ? 'Explore All Collections' : 'Alle Collecties Bekijken'}
            </Link>
            <Link
              href={`/${lang}/art-aesthetic/mandalas-sacred-geometry`}
              className="btn-secondary"
              style={{
                padding: '0.85rem 2.4rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                background: 'rgba(255, 255, 255, 0.12)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
              }}
            >
              {isEn ? 'Mandalas' : "Mandala's"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
