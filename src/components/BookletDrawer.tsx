'use client';

import React, { useState } from'react';
import { useColoringBook } from'@/context/ColoringBookContext';
import { fireConfetti } from'@/lib/confetti';
import SafeImage from'./SafeImage';
import styles from'./BookletDrawer.module.css';

interface BookletDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export default function BookletDrawer({ isOpen, onClose, lang }: BookletDrawerProps) {
  const { selectedPages, clearSelection, removePage, totalSelected } = useColoringBook();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const isEn = lang ==='en';

  const handleDownloadCustomBooklet = async () => {
    if (downloading || selectedPages.length === 0) return;
    setDownloading(true);
    setProgress(0);

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation:'portrait',
        unit:'mm',
        format:'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      let addedPagesCount = 0;
      for (let i = 0; i < selectedPages.length; i++) {
        setProgress(i + 1);
        const p = selectedPages[i];
        const proxyUrl =`/api/proxy-image?url=${encodeURIComponent(p.image)}`;

        try {
          const res = await fetch(proxyUrl);
          if (res.ok) {
            const blob = await res.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);

            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });

            if (addedPagesCount > 0) {
              pdf.addPage();
            }
            addedPagesCount++;

            // Page Header Title
            pdf.setFont('helvetica','bold');
            pdf.setFontSize(12);
            pdf.setTextColor(15, 23, 42);
            pdf.text(p.title, 14, 16);

            pdf.setFont('helvetica','normal');
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text(`${i + 1} / ${selectedPages.length}`, pageWidth - 14, 16, { align:'right'});

            // Draw coloring page image centered in A4
            const margin = 14;
            const maxWidth = pageWidth - margin * 2;
            const maxHeight = pageHeight - margin * 2 - 14;

            const imgRatio = (img.width || 800) / (img.height || 800);
            let renderWidth = maxWidth;
            let renderHeight = maxWidth / imgRatio;

            if (renderHeight > maxHeight) {
              renderHeight = maxHeight;
              renderWidth = maxHeight * imgRatio;
            }

            const x = margin + (maxWidth - renderWidth) / 2;
            const y = 22 + (maxHeight - renderHeight) / 2;

            pdf.addImage(img,'JPEG', x, y, renderWidth, renderHeight);

            // Page footer
            pdf.setFontSize(8);
            pdf.setTextColor(180, 190, 205);
            pdf.text('© ColorVaults.com — 100% Free Printable Coloring Pages', pageWidth / 2, pageHeight - 8, { align:'center'});

            URL.revokeObjectURL(img.src);
          }
        } catch (err) {
          console.warn('Failed to load page image for custom PDF booklet:', err);
        }
      }

      pdf.save(`colorvaults-custom-bundle-${selectedPages.length}-pages.pdf`);
      fireConfetti();
      onClose();
    } catch (e) {
      console.error('Failed to generate custom coloring book PDF:', e);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.drawer} role="dialog"aria-modal="true"aria-label="Coloring bundle basket">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.basketIcon}></div>
            <div>
              <h2 className={styles.title}>
                {isEn ?'My Coloring Bundle':'Mijn Kleurboek Bundel'}
              </h2>
              <p className={styles.subtitle}>
                {totalSelected} {isEn ?`page${totalSelected === 1 ?'':'s'} in your print basket`:`kleurplaat${totalSelected === 1 ?'':'en'} in je printmandje`}
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Content List */}
        <div className={styles.body}>
          {totalSelected === 0 ? (
            <div className={styles.emptyState}>
              <div style={{ fontSize:'3rem', marginBottom:'0.5rem'}}></div>
              <p style={{ fontWeight: 800, fontSize:'1.1rem', color:'var(--foreground)'}}>
                {isEn ?'Your bundle is still empty':'Je printmandje is nog leeg'}
              </p>
              <p style={{ fontSize:'0.875rem', color:'var(--gray-500)', maxWidth:'300px', margin:'0 auto', lineHeight: 1.6 }}>
                {isEn
                  ?'Browse different categories and click the button on any coloring page to build your custom collection!':'Blader door de categorieën en klik op de knop bij een kleurplaat om je eigen verzameling samen te stellen!'}
              </p>
            </div>
          ) : (
            <div className={styles.itemsGrid}>
              {selectedPages.map((page) => (
                <div key={page.slug} className={styles.cardItem}>
                  <div className={styles.thumbWrapper}>
                    <SafeImage src={page.image} alt={page.title} width={60} height={75} className={styles.thumbImg} />
                  </div>
                  <div className={styles.cardDetails}>
                    <div className={styles.cardTheme}>
                      {page.parentTheme ? page.parentTheme.replace(/-/g,'') :'Coloring Page'}
                    </div>
                    <h4 className={styles.cardTitle}>{page.title}</h4>
                  </div>
                  <button
                    type="button"className={styles.removeBtn}
                    onClick={() => removePage(page.slug)}
                    title={isEn ?'Remove from bundle':'Verwijder uit bundel'}
                  >
                   
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {totalSelected > 0 && (
          <div className={styles.footer}>
            <button
              type="button"className={styles.clearBtn}
              onClick={clearSelection}
              disabled={downloading}
            >
              {isEn ?'Clear All':'Alles Wissen'}
            </button>
            <button
              type="button"
              className={styles.downloadBtn}
              onClick={handleDownloadCustomBooklet}
              disabled={downloading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <span>
                {downloading
                  ? (isEn ?`Generating (${progress}/${totalSelected})...`:`Genereren (${progress}/${totalSelected})...`)
                  : (isEn ?`Download PDF Bundle (${totalSelected} Pages)`:`Download PDF Bundel (${totalSelected} Platen)`)}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
