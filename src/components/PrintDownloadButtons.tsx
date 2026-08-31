'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import PrintPreviewModal from './PrintPreviewModal';
import OnlineColoringTool from './OnlineColoringTool';
import ReportButton from './ReportButton';

export default function PrintDownloadButtons({
  isEn,
  fileUrl,
  category = 'Unknown',
}: {
  isEn: boolean;
  fileUrl: string;
  category?: string;
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showColorOnline, setShowColorOnline] = useState(false);

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
          <span aria-hidden="true">🖨️</span> {isEn ? 'Print Free Coloring Page' : 'Gratis Kleurplaat Printen'}
        </button>

        {/* Color Online Button */}
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
          <span aria-hidden="true">🎨</span> {isEn ? 'Color Online (Interactive Canvas)' : 'Online Inkleuren (In Browser)'}
        </button>

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
          <span aria-hidden="true">📄</span>{' '}
          {downloadingPdf
            ? (isEn ? 'Creating A4 PDF...' : 'A4 PDF Genereren...')
            : (isEn ? 'Download A4 Printable PDF' : 'Download Printklare PDF (A4)')}
        </button>

        {/* Download PNG Image Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', cursor: downloading ? 'not-allowed' : 'pointer' }}
          type="button"
        >
          <span aria-hidden="true">🖼️</span>{' '}
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
