'use client';

import { useState } from 'react';
import { useFavoritesContext } from '@/context/FavoritesContext';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { motion } from 'framer-motion';
import FavoriteButton from '@/components/FavoriteButton';
import * as React from 'react';

export default function FavoritesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { favorites, isLoaded } = useFavoritesContext();
  const { lang } = React.use(params);
  const isEn = lang === 'en';

  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');

  const handleDownloadBooklet = async () => {
    if (favorites.length === 0 || generatingPdf) return;
    setGeneratingPdf(true);
    setPdfProgress(isEn ? 'Starting PDF generation...' : 'PDF genereren starten...');

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 12;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2 - 16;

      // Cover Page
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(26);
      pdf.setTextColor(99, 102, 241);
      pdf.text(isEn ? 'My Custom Coloring Book' : 'Mijn Persoonlijk Kleurboek', pageWidth / 2, 80, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        isEn
          ? `A collection of ${favorites.length} hand-picked coloring pages from ColorVaults.com`
          : `Een bundel van ${favorites.length} favoriete kleurplaten van ColorVaults.com`,
        pageWidth / 2,
        96,
        { align: 'center' }
      );

      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin + 20, 115, pageWidth - margin - 20, 115);

      pdf.setFontSize(11);
      pdf.setTextColor(130, 130, 130);
      pdf.text(
        isEn
          ? 'Name: _______________________________   Date: ______________'
          : 'Naam: _______________________________   Datum: ______________',
        pageWidth / 2,
        140,
        { align: 'center' }
      );

      pdf.setFontSize(9);
      pdf.setTextColor(160, 160, 160);
      pdf.text('© ColorVaults.com — 100% Free Printable Coloring Pages', pageWidth / 2, pageHeight - 15, { align: 'center' });

      // Add each favorite page
      for (let i = 0; i < favorites.length; i++) {
        const item = favorites[i];
        setPdfProgress(isEn ? `Adding page ${i + 1} of ${favorites.length}...` : `Pagina ${i + 1} van ${favorites.length} toevoegen...`);

        pdf.addPage('a4', 'portrait');

        // Header
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(120, 120, 120);
        pdf.text('ColorVaults.com — Free Printable Coloring Pages', pageWidth / 2, margin, { align: 'center' });

        try {
          // Fetch image via proxy to avoid CORS
          const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(item.preview)}`;
          const response = await fetch(proxyUrl);
          if (response.ok) {
            const blob = await response.blob();
            const img = new Image();
            img.src = URL.createObjectURL(blob);

            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });

            const imgRatio = img.width / img.height;
            let renderWidth = maxWidth;
            let renderHeight = maxWidth / imgRatio;

            if (renderHeight > maxHeight) {
              renderHeight = maxHeight;
              renderWidth = maxHeight * imgRatio;
            }

            const x = (pageWidth - renderWidth) / 2;
            const y = margin + 8;

            pdf.addImage(img, 'JPEG', x, y, renderWidth, renderHeight, undefined, 'FAST');
            URL.revokeObjectURL(img.src);
          }
        } catch (imgErr) {
          console.error('Error adding image to booklet PDF:', imgErr);
        }

        // Footer
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `© ColorVaults.com — ${item.title} — Page ${i + 1} of ${favorites.length}`,
          pageWidth / 2,
          pageHeight - 6,
          { align: 'center' }
        );
      }

      pdf.save(`colorvaults-coloring-book-${favorites.length}-pages.pdf`);
      setGeneratingPdf(false);
      setPdfProgress('');
    } catch (err) {
      console.error('Failed to generate PDF booklet:', err);
      alert(isEn ? 'Could not generate PDF booklet.' : 'Kleurboek kon niet worden gegenereerd.');
      setGeneratingPdf(false);
      setPdfProgress('');
    }
  };

  const handlePrintAll = () => {
    window.print();
  };

  if (!isLoaded) {
    return <div className="container section" style={{ minHeight: '60vh' }}></div>;
  }

  return (
    <div className="container section" style={{ minHeight: '60vh' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 className="title-h1">{isEn ? 'Your Favorites' : 'Jouw Favorieten'}</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: '0.4rem', fontSize: '0.95rem' }}>
            {isEn
              ? `${favorites.length} saved coloring ${favorites.length === 1 ? 'page' : 'pages'}`
              : `${favorites.length} opgeslagen ${favorites.length === 1 ? 'kleurplaat' : 'kleurplaten'}`}
          </p>
        </div>

        {favorites.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadBooklet}
              disabled={generatingPdf}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: generatingPdf ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{generatingPdf ? '⏳' : '📚'}</span>
              <span>
                {generatingPdf
                  ? pdfProgress || (isEn ? 'Building Booklet...' : 'Kleurboek maken...')
                  : isEn
                  ? 'Download All as PDF Book'
                  : 'Download als Kleurboek (PDF)'}
              </span>
            </button>

            <button
              onClick={handlePrintAll}
              style={{
                background: 'var(--surface-2)',
                color: 'var(--foreground)',
                border: '1.5px solid var(--gray-300)',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🖨️</span>
              <span>{isEn ? 'Print All' : 'Alles Printen'}</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--surface)',
            borderRadius: '24px',
            border: '1.5px solid var(--gray-200)',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              fontSize: '2.5rem',
            }}
          >
            ❤️
          </div>
          <h2 className="title-h2" style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>
            {isEn ? 'No favorites saved yet' : 'Nog geen favorieten bewaard'}
          </h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1rem' }}>
            {isEn
              ? 'Explore our coloring pages and tap the heart icon on any page to easily create and print your own custom coloring book.'
              : 'Ontdek onze kleurplaten en klik op het hartje om je favorieten op te slaan en in 1 klik je eigen kleurboek te downloaden.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${lang}`} className="btn-primary">
              {isEn ? 'Browse Coloring Pages' : 'Bekijk Kleurplaten'}
            </Link>
            <Link href={`/${lang}/search`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
              {isEn ? 'Search Themes' : 'Zoek Thema’s'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid-4">
          {favorites.map((fav, i) => (
            <motion.div
              key={fav.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              style={{ position: 'relative' }}
            >
              <Link href={fav.url} className="card" style={{ height: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <SafeImage
                    src={fav.preview}
                    alt={fav.title}
                    className="card-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <FavoriteButton item={fav} />
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{fav.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
