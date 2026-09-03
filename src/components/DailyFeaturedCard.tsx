'use client';

import React, { useState } from'react';
import Link from'next/link';
import SafeImage from'./SafeImage';
import PrintPreviewModal from'./PrintPreviewModal';
import OnlineColoringTool from'./OnlineColoringTool';
import styles from'./DailyFeaturedCard.module.css';

interface DailyPageProps {
  page: {
    slug: string;
    title: string;
    image: string;
    parentHub: string;
    parentTheme: string;
    ageGroup: string;
    shortDescription?: string;
  };
  isEn: boolean;
  lang: string;
  themeTitle?: string;
}

export default function DailyFeaturedCard({ page, isEn, lang, themeTitle }: DailyPageProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showColorOnline, setShowColorOnline] = useState(false);

  if (!page) return null;

  const pageUrl =`/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`;
  const themeUrl =`/${lang}/${page.parentHub}/${page.parentTheme}`;
  const previewUrl =`/api/proxy-image?url=${encodeURIComponent(page.image)}`;

  const doActualPrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Left: Highlight Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.dailyBadge}>
            <span className={styles.star}>⭐</span>
            <span>{isEn ?'Coloring Page of the Day':'Kleurplaat van de Dag'}</span>
          </div>
          <Link href={pageUrl} className={styles.imgLink}>
            <SafeImage
              src={page.image}
              alt={page.title}
              width={400}
              height={500}
              className={styles.img}
            />
          </Link>
        </div>

        {/* Right: Info & Actions */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.themeBadge}>
              {themeTitle || page.parentTheme.replace(/-/g,'')}
            </span>
            <span className={styles.ageBadge}>
              {page.ageGroup.toUpperCase()}
            </span>
          </div>

          <h3 className={styles.title}>
            <Link href={pageUrl}>{page.title}</Link>
          </h3>

          <p className={styles.description}>
            {page.shortDescription || (isEn
              ?'Today\'s featured high-resolution coloring page! Free to download, print on A4/Letter, or color directly in your browser.':'De uitgelichte gratis kleurplaat van vandaag! Direct printklaar op A4-formaat of kleur hem meteen online in.')}
          </p>

          <div className={styles.actions}>
            <button
              className={styles.btnColorOnline}
              onClick={() => setShowColorOnline(true)}
              type="button">
              <span>🎨</span> {isEn ?'Color Online Studio':'Online Inkleuren'}
            </button>

            <button
              className={styles.btnPrint}
              onClick={() => setShowPreview(true)}
              type="button">
              <span>🖨️</span> {isEn ?'Print / Preview':'Afdrukken'}
            </button>

            <Link href={themeUrl} className={styles.btnTheme}>
              {isEn ?'Explore Album →':'Bekijk Heel Album →'}
            </Link>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        imageUrl={previewUrl}
        title={page.title}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirmPrint={doActualPrint}
        isEn={isEn}
      />

      {/* Online Coloring Canvas */}
      <OnlineColoringTool
        imageUrl={page.image}
        title={page.title}
        isOpen={showColorOnline}
        onClose={() => setShowColorOnline(false)}
        isEn={isEn}
      />
    </div>
  );
}
