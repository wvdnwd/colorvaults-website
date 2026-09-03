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

interface HeroCarouselProps {
  items: CarouselItem[];
  lang?: string;
}

export default function HeroCarousel({ items, lang = 'nl' }: HeroCarouselProps) {
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
      {/* 3D Bank Vault Artwork Backdrop */}
      <div className={styles.vaultFrame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.jpg"
          alt="ColorVaults 3D Vault Stage"
          className={styles.vaultImage}
        />
        {/* Subtle bottom gradient so top COLORVAULTS letters POP out with zero obstruction */}
        <div className={styles.cinematicOverlay} />
        <div className={styles.vaultPortalAura} />
      </div>

      {/* 1. TOP: Clean space for glowing 3D COLORVAULTS letters to shine */}
      <div className={styles.vaultTopHeaderArea} aria-hidden="true" />

      {/* 2. MIDDLE: 3D Carousel Revolving in Center of Vault Door */}
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
                  <span>⭐ {isEn ? 'Album' : 'Album'}</span>
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

      {/* 3. BOTTOM: Title, Subtitle & Trust Badges at Bottom of Photo */}
      <div className={styles.heroBottomSection}>
        <div className={styles.bottomFrostedCard}>
          <div className={styles.badgeWrapper}>
            <span className={styles.freeBadge}>
              ✨ {isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}
            </span>
          </div>

          <h1 className={styles.heroTitle}>
            {isEn ? (
              <>Free Premium <span className={styles.titleGradient}>Coloring Pages</span></>
            ) : (
              <>Gratis Premium <span className={styles.titleGradient}>Kleurplaten</span></>
            )}
          </h1>

          <p className={styles.heroSubtitle}>
            {isEn
              ? 'Thousands of high-quality printable coloring pages for toddlers, kids, teens, and adults. Free instant downloads — no account needed!'
              : 'Duizenden gratis printbare kleurplaten voor peuters, kinderen, tieners en volwassenen. Direct gratis downloaden — geen account nodig!'}
          </p>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <span className={styles.trustPill}>⚡ {isEn ? '100% Free' : '100% Gratis'}</span>
            <span className={styles.trustPill}>🖨️ A4 / Letter PDF</span>
            <span className={styles.trustPill}>🎨 {isEn ? 'Color Online' : 'Online Inkleuren'}</span>
            <span className={styles.trustPill}>🚀 {isEn ? 'Instant Access' : 'Geen Account'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
