'use client';

import React, { useState } from'react';
import { useColoringBook } from'@/context/ColoringBookContext';
import { fireConfetti } from'@/lib/confetti';
import SafeImage from'./SafeImage';
import styles from'./FloatingBookletBar.module.css';

export default function FloatingBookletBar({ lang }: { lang: string }) {
  const { selectedPages, clearSelection, removePage, totalSelected } = useColoringBook();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (totalSelected === 0) return null;

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

      // ── COLORING PAGES (Starts directly on Page 1) ──────────────────────
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

      pdf.save(`colorvaults-custom-coloring-book-${selectedPages.length}-pages.pdf`);
      fireConfetti();
    } catch (e) {
      console.error('Failed to generate custom coloring book PDF:', e);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <div className={styles.barContainer}>
      <div className={styles.floatingBar}>
        {/* Left: Booklet Summary & Count */}
        <div className={styles.infoGroup}>
          <div className={styles.bookletIcon}>📕</div>
          <div>
            <div className={styles.barTitle}>
              {isEn ?'My Custom Coloring Book':'Mijn Eigen Kleurboek'}
            </div>
            <div className={styles.barSubtitle}>
              {isEn
                ?`${totalSelected} page${totalSelected > 1 ?'s':''} selected across categories`:`${totalSelected} kleurplaat${totalSelected > 1 ?'en':''} geselecteerd`}
            </div>
          </div>
        </div>

        {/* Center: Selected Thumbnails preview */}
        <div className={styles.thumbnailsList}>
          {selectedPages.slice(0, 6).map((p) => (
            <div key={p.slug} className={styles.thumbWrapper} title={p.title}>
              <SafeImage src={p.image} alt={p.title} width={36} height={36} className={styles.thumbImg} />
              <button
                type="button"className={styles.removeThumbBtn}
                onClick={() => removePage(p.slug)}
                title={isEn ?'Remove from booklet':'Verwijderen'}
              >
                ✕
              </button>
            </div>
          ))}
          {totalSelected > 6 && (
            <div className={styles.moreBadge}>+{totalSelected - 6}</div>
          )}
        </div>

        {/* Right: Actions */}
        <div className={styles.actionGroup}>
          <button
            type="button"className={styles.btnClear}
            onClick={clearSelection}
            disabled={downloading}
          >
            {isEn ?'Clear':'Wissen'}
          </button>

          <button
            type="button"className={styles.btnDownload}
            onClick={handleDownloadCustomBooklet}
            disabled={downloading}
          >
            <span></span>
            <span>
              {downloading
                ? (isEn ?`Generating (${progress}/${totalSelected})...`:`Genereren (${progress}/${totalSelected})...`)
                : (isEn ?`Download PDF Booklet (${totalSelected})`:`Download PDF Boekje (${totalSelected})`)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
