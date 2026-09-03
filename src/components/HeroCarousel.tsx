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
        <div className={styles.vaultPortalAura} />
      </div>

      {/* 3D Carousel Revolving in Center of Vault Door (shifted slightly down) */}
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
    </div>
  );
}
