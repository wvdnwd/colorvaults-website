'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrintPreviewModal from './PrintPreviewModal';
import OnlineColoringTool from './OnlineColoringTool';
import ReportButton from './ReportButton';
import { useColoringBook } from '@/context/ColoringBookContext';

export default function PrintDownloadButtons({
  isEn,
  fileUrl,
  category = 'Unknown',
  colorPageUrl,
}: {
  isEn: boolean;
  fileUrl: string;
  category?: string;
  colorPageUrl?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showColorOnline, setShowColorOnline] = useState(false);

  const { isPageSelected, toggleSelectPage } = useColoringBook();
  const pageSlug = fileUrl.split('/').pop()?.replace(/\.[^.]+$/, '') || 'page';
  const isSelected = isPageSelected(pageSlug);

  const pageTitle = fileUrl.split('/').pop()?.replace(/_/g, ' ').replace(/\.[^.]+$/, '') || (isEn ? 'Coloring Page' : 'Kleurplaat');
  const previewUrl = `/api/proxy-image?url=${encodeURIComponent(fileUrl)}`;

  const handlePrintClick = () => setShowPreview(true);
  const doActualPrint = () => window.print();

  // Download High-Res Image with Watermark
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);

    try {
      const response = await fetch(previewUrl);
      if (!response.ok) throw new Error('Proxy fetch failed');

      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      ctx.drawImage(img, 0, 0);

      // Watermark
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      const fontSize = Math.max(14, img.width * 0.02);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 4;
      ctx.fillText('© ColorVaults.com — Free Printable', canvas.width - 20, canvas.height - 20);

      // Convert to PNG blob and download
      canvas.toBlob((watermarkedBlob) => {
        if (!watermarkedBlob) {
          const a = document.createElement('a');
          a.href = previewUrl;
          a.download = `colorvaults-${pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setDownloading(false);
          return;
        }
        const url = URL.createObjectURL(watermarkedBlob);
        const a = document.createElement('a');
        a.href = url;
        const cleanSlug = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        a.download = `colorvaults-${cleanSlug}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDownloading(false);
      }, 'image/png');
    } catch (err) {
      console.error('Failed to add watermark, falling back to direct download', err);
      const a = document.createElement('a');
      a.href = previewUrl;
      a.download = `colorvaults-${pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
    }
  };

  // Download Print-Ready A4 PDF
  const handleDownloadPdf = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloadingPdf) return;
    setDownloadingPdf(true);

    try {
      const response = await fetch(previewUrl);
      if (!response.ok) throw new Error('Proxy fetch failed');

      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // A4 dimensions: 210mm x 297mm
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 12; // 12mm margin
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2 - 16; // 16mm for header & footer

      const imgRatio = img.width / img.height;
      let renderWidth = maxWidth;
      let renderHeight = maxWidth / imgRatio;

      if (renderHeight > maxHeight) {
        renderHeight = maxHeight;
        renderWidth = maxHeight * imgRatio;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = margin + 8;

      // Header Text
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      pdf.text('ColorVaults.com — Free Printable Coloring Pages', pageWidth / 2, margin, { align: 'center' });

      // Add image to PDF
      pdf.addImage(img, 'JPEG', x, y, renderWidth, renderHeight, undefined, 'FAST');

      // Footer Text
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `© ColorVaults.com — ${pageTitle} — Free for personal, home and classroom educational use.`,
        pageWidth / 2,
        pageHeight - 6,
        { align: 'center' }
      );

      const cleanSlug = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      pdf.save(`colorvaults-${cleanSlug}-A4.pdf`);
      setDownloadingPdf(false);
    } catch (err) {
      console.error('Failed to generate PDF', err);
      alert(isEn ? 'Could not generate PDF, please try downloading image.' : 'PDF kon niet worden gegenereerd.');
      setDownloadingPdf(false);
    }
  };

  return (
    <>
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Primary Action: Print */}
        <button
          onClick={handlePrintClick}
          className="download-btn"
          style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', padding: '0.95rem' }}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
          </svg>
          {isEn ? 'Print Free Coloring Page' : 'Gratis Kleurplaat Printen'}
        </button>

        {/* Add to Custom Coloring Book Bundle Button */}
        <button
          onClick={() => {
            toggleSelectPage({
              id: pageSlug,
              slug: pageSlug,
              title: pageTitle,
              image: fileUrl,
            });
          }}
          type="button"
          style={{
            width: '100%',
            padding: '0.85rem',
            background: isSelected ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            color: isSelected ? '#FFFFFF' : '#4F46E5',
            border: isSelected ? '1.5px solid #059669' : '1.5px solid #C7D2FE',
            borderRadius: 'var(--radius-full)',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: isSelected ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{ fontSize: '1.05rem' }}>{isSelected ? '✓' : '➕'}</span>
          <span>
            {isSelected
              ? (isEn ? 'Added to Custom Coloring Book' : 'Toegevoegd aan je Kleurboek')
              : (isEn ? 'Add to My Coloring Book Bundle' : 'Voeg toe aan Kleurboek Bundel')}
          </span>
        </button>

        {/* Color Online Button -> Opens Dedicated Studio Page */}
        {colorPageUrl ? (
          <Link
            href={colorPageUrl}
            style={{
              width: '100%',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.925rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.28 19.58 10.59 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-3 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            {isEn ? 'Color Online Studio' : 'Online Inkleuren Studio'}
          </Link>
        ) : (
          <button
            onClick={() => setShowColorOnline(true)}
            type="button"
            style={{
              width: '100%',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              fontWeight: 800,
              fontSize: '0.925rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.28 19.58 10.59 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-3 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            {isEn ? 'Color Online Studio' : 'Online Inkleuren Studio'}
          </button>
        )}

        {/* Download A4 PDF Button */}
        <button
          onClick={handleDownloadPdf}
          disabled={downloadingPdf}
          type="button"
          style={{
            width: '100%',
            padding: '0.8rem',
            background: 'var(--surface-2)',
            color: 'var(--foreground)',
            border: '1.5px solid var(--gray-300)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: downloadingPdf ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          {downloadingPdf
            ? (isEn ? 'Creating A4 PDF...' : 'A4 PDF Genereren...')
            : (isEn ? 'Download A4 Printable PDF' : 'Download Printklare PDF (A4)')}
        </button>

        {/* Download PNG Image Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', cursor: downloading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          type="button"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          {downloading
            ? (isEn ? 'Preparing PNG...' : 'PNG Verwerken...')
            : (isEn ? 'Download PNG Image' : 'Download PNG Afbeelding')}
        </button>
      </div>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        imageUrl={previewUrl}
        title={pageTitle}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirmPrint={doActualPrint}
        isEn={isEn}
      />

      {/* Interactive Online Coloring Canvas Modal */}
      <OnlineColoringTool
        imageUrl={fileUrl}
        title={pageTitle}
        isOpen={showColorOnline}
        onClose={() => setShowColorOnline(false)}
        isEn={isEn}
      />

      <ReportButton imageUrl={fileUrl} category={category} isEn={isEn} />
    </>
  );
}
