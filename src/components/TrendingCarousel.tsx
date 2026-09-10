'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import FavoriteButton from './FavoriteButton';
import styles from './TrendingCarousel.module.css';

interface TrendingPageItem {
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  image: string;
}

interface TrendingCarouselProps {
  items: TrendingPageItem[];
  lang: string;
  isEn: boolean;
  title?: string;
  subtitle?: string;
}

export default function TrendingCarousel({
  items,
  lang,
  isEn,
  title,
  subtitle,
}: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleCol}>
          <div className={styles.badgeRow}>
            <span className={styles.fireIcon}>🔥</span>
            <span className={styles.badgeText}>{isEn ? 'Featured Selection' : 'Uitgelichte Selectie'}</span>
          </div>
          <h2 className={styles.heading}>
            {title || (isEn ? 'Find Your Next Coloring Page' : 'Vind Je Volgende Kleurplaat')}
          </h2>
          <p className={styles.sub}>
            {subtitle || (isEn
              ? 'Explore a selection of printable designs for your next coloring break.'
              : 'Ontdek een selectie printbare tekeningen voor je volgende kleurmoment.')}
          </p>
        </div>

        <div className={styles.navControls}>
          <button
            onClick={() => scroll('left')}
            className={styles.navBtn}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className={styles.navBtn}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.carouselTrack} ref={scrollRef}>
        {items.map((item, idx) => {
          const pageUrl = `/${lang}/${item.parentHub}/${item.parentTheme}/${item.ageGroup}/${item.slug}`;
          return (
            <div key={item.slug + idx} className={styles.cardItem}>
              <Link href={pageUrl} className={styles.cardLink}>
                <div className={styles.imgWrapper}>
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className={styles.cardImg}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className={styles.trendingTag}>
                    <span>{isEn ? 'Featured' : 'Uitgelicht'}</span>
                  </div>
                  <div className={styles.favBtnWrapper} onClick={(e) => e.preventDefault()}>
                    <FavoriteButton
                      item={{
                        id: `${item.parentTheme}/${item.slug}`,
                        slug: item.slug,
                        title: item.title,
                        preview: item.image,
                        url: pageUrl,
                      }}
                    />
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <span className={styles.themeSlug}>
                    {item.parentTheme.replace(/-/g, ' ')}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
