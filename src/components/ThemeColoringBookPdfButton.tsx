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

      // ── PAGE 1: LUXURY COVER PAGE ─────────────────────────────────────────
      // Subtle frame border
      pdf.setDrawColor(108, 92, 231);
      pdf.setLineWidth(1.5);
      pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

      pdf.setDrawColor(245, 158, 11);
      pdf.setLineWidth(0.6);
      pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);

      // Header Brand
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(108, 92, 231);
      pdf.text('COLORVAULTS.COM', pageWidth / 2, 45, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(100, 116, 139);
      pdf.text(isEn ? 'FREE PREMIUM COLORING BOOK' : 'GRATIS PREMIUM KLEURBOEK', pageWidth / 2, 53, { align: 'center' });

      // Big Title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(26);
      pdf.setTextColor(15, 23, 42);
      pdf.text(themeTitle.toUpperCase(), pageWidth / 2, 100, { align: 'center', maxWidth: 160 });

      // Subtitle
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(13);
      pdf.setTextColor(71, 85, 105);
      pdf.text(
        isEn
          ? `Complete ${pages.length}-Page Printable Collection`
          : `Complete ${pages.length}-Pagina Printbare Collectie`,
        pageWidth / 2,
        125,
        { align: 'center' }
      );

      // Cute illustration box / badge
      pdf.setFillColor(238, 242, 255);
      pdf.roundedRect(pageWidth / 2 - 40, 150, 80, 24, 6, 6, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(79, 70, 229);
      pdf.text(isEn ? '100% Free to Color' : '100% Gratis Inkleuren', pageWidth / 2, 165, { align: 'center' });

      // Footer disclaimer
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text('© ColorVaults.com — For personal & educational use only.', pageWidth / 2, pageHeight - 25, {
        align: 'center',
      });

      // ── PAGES 2..N: COLORING PAGES ────────────────────────────────────────
      const maxPages = Math.min(pages.length, 25);
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

            pdf.addPage();

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
