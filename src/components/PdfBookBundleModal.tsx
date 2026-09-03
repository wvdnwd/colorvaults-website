'use client';

import React, { useState } from'react';
import { fireConfetti } from'@/lib/confetti';

interface PdfBookBundleModalProps {
  themeTitle: string;
  count: number;
  isEn: boolean;
  lang: string;
  pages?: Array<{ title: string; image: string }>;
}

export default function PdfBookBundleModal({ themeTitle, count, isEn, lang, pages = [] }: PdfBookBundleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGeneratePdf = async () => {
    if (downloading) return;
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
      const maxPages = Math.min(pages.length, 30);
      for (let i = 0; i < maxPages; i++) {
        setProgress(i + 1);
        const p = pages[i];
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
            pdf.text(`${i + 1} / ${maxPages}`, pageWidth - 14, 16, { align:'right'});

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
            pdf.text('ColorVaults.com', pageWidth / 2, pageHeight - 8, { align:'center'});

            URL.revokeObjectURL(img.src);
          }
        } catch (err) {
          console.warn('Failed to load page image for PDF booklet:', err);
        }
      }

      const cleanSlug = themeTitle.toLowerCase().replace(/[^a-z0-9]+/g,'-');
      pdf.save(`colorvaults-${cleanSlug}-coloring-book.pdf`);
      fireConfetti();
      setIsOpen(false);
    } catch (e) {
      console.error('Failed to generate coloring book PDF:', e);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <div style={{
        marginTop:'1.75rem',
        background:'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
        borderRadius:'20px',
        padding:'1.25rem 1.75rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'1.25rem',
        flexWrap:'wrap',
        boxShadow:'0 10px 30px rgba(108, 92, 231, 0.3)',
        color:'#FFFFFF',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem'}}>
          <div style={{
            fontSize:'2.25rem',
            background:'rgba(255, 255, 255, 0.2)',
            width:'54px',
            height:'54px',
            borderRadius:'14px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}>
            📚
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize:'1.2rem', fontWeight: 800, color:'#FFFFFF'}}>
              {isEn
                ?`Download Complete ${themeTitle} Coloring Book (PDF)`:`Download Compleet ${themeTitle} Kleurboek (PDF)`}
            </h3>
            <p style={{ margin:'0.2rem 0 0', fontSize:'0.9rem', color:'#E0E7FF'}}>
              {isEn
                ?`All ${count} high-resolution printable pages bundled in a single printable file.`:`Alle ${count} haarscherpe platen handig gebundeld in 1 bestand voor thuis of in de klas.`}
            </p>
          </div>
        </div>

        <button
          type="button"onClick={handleGeneratePdf}
          disabled={downloading}
          style={{
            padding:'0.75rem 1.5rem',
            borderRadius:'9999px',
            background:'#FFFFFF',
            color:'#4F46E5',
            fontWeight: 800,
            fontSize:'0.95rem',
            border:'none',
            cursor: downloading ?'not-allowed':'pointer',
            boxShadow:'0 4px 15px rgba(0, 0, 0, 0.15)',
            transition:'all 0.2s',
            whiteSpace:'nowrap',
          }}
        >
          {downloading
            ? (isEn ?`Generating (${progress}/${pages.length || count})...`:`Genereren (${progress}/${pages.length || count})...`)
            : (isEn ?'Download PDF Book':'Download PDF Kleurboek')}
        </button>
      </div>
    </>
  );
}
