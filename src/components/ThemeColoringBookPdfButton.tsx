'use client';

import React, { useState } from 'react';
import { fireConfetti } from '@/lib/confetti';

interface ThemeColoringBookPdfButtonProps {
  themeTitle: string;
  pages: Array<{ title: string; image: string }>;
  isEn: boolean;
}

export default function ThemeColoringBookPdfButton({
  themeTitle,
  pages,
  isEn,
}: ThemeColoringBookPdfButtonProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGeneratePdf = async () => {
    if (generating || !pages || pages.length === 0) return;
    setGenerating(true);
    setProgress(0);

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      // ── COLORING PAGES (Starts directly on Page 1) ──────────────────────
      let addedPagesCount = 0;
      const maxPages = Math.min(pages.length, 30);
      for (let i = 0; i < maxPages; i++) {
        setProgress(i + 1);
        const p = pages[i];
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(p.image)}`;

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
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(12);
            pdf.setTextColor(15, 23, 42);
            pdf.text(p.title, 14, 16);

            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text(`${i + 1} / ${maxPages}`, pageWidth - 14, 16, { align: 'right' });

            // Draw coloring page image centered in A4
            const margin = 14;
            const maxWidth = pageWidth - margin * 2;
            const maxHeight = pageHeight - margin * 2 - 14; // header space

            const imgRatio = (img.width || 800) / (img.height || 800);
            let renderWidth = maxWidth;
            let renderHeight = maxWidth / imgRatio;

            if (renderHeight > maxHeight) {
              renderHeight = maxHeight;
              renderWidth = maxHeight * imgRatio;
            }

            const x = margin + (maxWidth - renderWidth) / 2;
            const y = 22 + (maxHeight - renderHeight) / 2;

            pdf.addImage(img, 'JPEG', x, y, renderWidth, renderHeight);

            // Page footer
            pdf.setFontSize(8);
            pdf.setTextColor(180, 190, 205);
            pdf.text('ColorVaults.com', pageWidth / 2, pageHeight - 8, { align: 'center' });

            URL.revokeObjectURL(img.src);
          }
        } catch (err) {
          console.warn('Failed to load page image for PDF booklet:', err);
        }
      }

      const cleanSlug = themeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      pdf.save(`colorvaults-${cleanSlug}-coloring-book.pdf`);
      fireConfetti();
    } catch (e) {
      console.error('Failed to generate coloring book PDF:', e);
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  return (
    <button
      onClick={handleGeneratePdf}
      disabled={generating}
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: '#FFFFFF',
        fontWeight: 800,
        fontSize: '0.95rem',
        padding: '0.75rem 1.4rem',
        borderRadius: '9999px',
        border: 'none',
        cursor: generating ? 'not-allowed' : 'pointer',
        boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
        transition: 'all 0.25s ease',
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>📕</span>
      <span>
        {generating
          ? (isEn ? `Building PDF Book (${progress}/${pages.length})...` : `Kleurboek Maken (${progress}/${pages.length})...`)
          : (isEn ? `Download Full Coloring Book (${pages.length} Pages PDF)` : `Download Heel Kleurboek (${pages.length} Pagina's PDF)`)}
      </span>
    </button>
  );
}
