'use client';
import { useEffect, useRef } from 'react';
import styles from './HeroCarousel.module.css';

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
}

/**
 * CSS-only 3D rotating carousel of coloring page cards.
 * Uses perspective + rotateY to create a spinning ring of cards.
 * No JavaScript animation — pure CSS @keyframes.
 */
export default function HeroCarousel({ images }: HeroCarouselProps) {
  const count = Math.min(images.length, 8);
  const items = images.slice(0, count);

  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.ring} style={{ '--count': count } as React.CSSProperties}>
        {items.map((img, i) => (
          <div
            key={i}
            className={styles.card}
            style={{ '--i': i, '--count': count } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className={styles.img} />
            <div className={styles.shine} />
          </div>
        ))}
      </div>
    </div>
  );
}
