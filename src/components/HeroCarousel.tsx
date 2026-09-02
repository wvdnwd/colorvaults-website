'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ColorSplash from './ColorSplash';
import styles from './HeroCarousel.module.css';

export interface CarouselItem {
  src: string;
  alt: string;
  href: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [shuffledItems, setShuffledItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) return;
    // Fisher-Yates shuffle to pick 8 random items on client load
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

  return (
    <div className={styles.sceneWrapper}>
      {/* Radiant Watercolor Paint Splash Backdrop */}
      <ColorSplash />

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
              <div className={styles.cardLabel}>{img.alt}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
