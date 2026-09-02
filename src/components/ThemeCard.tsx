'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';

interface ThemeCardProps {
  lang: string;
  hubSlug: string;
  themeSlug: string;
  title: string;
  description: string;
  images: string[];
  pageCount?: number;
}

const HUB_GRADIENTS: Record<string, { gradient: string; text: string; bg: string; labelEn: string; labelNl: string }> = {
  'disney-and-fairy-tales': { gradient: 'linear-gradient(135deg, #FF6B8B 0%, #FFD166 100%)', text: '#E11D48', bg: 'rgba(255, 107, 139, 0.12)', labelEn: 'Disney & Fairytales', labelNl: 'Disney & Sprookjes' },
  'tv-series-and-movies': { gradient: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', text: '#4F46E5', bg: 'rgba(99, 102, 241, 0.12)', labelEn: 'TV & Movies', labelNl: 'TV & Films' },
  'games-and-pop-culture': { gradient: 'linear-gradient(135deg, #00D2D3 0%, #54A0FF 100%)', text: '#0284C7', bg: 'rgba(0, 210, 211, 0.12)', labelEn: 'Games & Pop Culture', labelNl: 'Games & Popcultuur' },
  'animals-and-nature': { gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', text: '#059669', bg: 'rgba(16, 185, 129, 0.12)', labelEn: 'Animals & Nature', labelNl: 'Dieren & Natuur' },
  'girls-themes': { gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)', text: '#DB2777', bg: 'rgba(236, 72, 153, 0.12)', labelEn: 'Magic & Fairies', labelNl: 'Magie & Sprookjes' },
  'toddler-specific': { gradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)', text: '#D97706', bg: 'rgba(249, 115, 22, 0.12)', labelEn: 'Preschool & Toddlers', labelNl: 'Peuters & Kleuters' },
  'adults': { gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', text: '#7C3AED', bg: 'rgba(139, 92, 246, 0.12)', labelEn: 'Mindfulness & Adults', labelNl: 'Mindfulness & Volwassenen' },
  'mandalas': { gradient: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)', text: '#6D28D9', bg: 'rgba(124, 58, 237, 0.12)', labelEn: 'Intricate Mandalas', labelNl: 'Ingewikkelde Mandala\'s' },
  'school-education-templates': { gradient: 'linear-gradient(135deg, #84CC16 0%, #10B981 100%)', text: '#65A30D', bg: 'rgba(132, 204, 22, 0.12)', labelEn: 'School & Education', labelNl: 'School & Educatie' },
};

export default function ThemeCard({
  lang,
  hubSlug,
  themeSlug,
  title,
  description,
  images,
  pageCount,
}: ThemeCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isEn = lang === 'en';

  const hubColors = HUB_GRADIENTS[hubSlug] || {
    gradient: 'linear-gradient(135deg, #FF4B72 0%, #FF8A00 100%)',
    text: '#FF4B72',
    bg: 'rgba(255, 75, 114, 0.12)',
    labelEn: 'Coloring Album',
    labelNl: 'Kleurplaten Album',
  };

  useEffect(() => {
    if (!isHovered || !images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % images.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [isHovered, images]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (images && images.length > 1) {
      setCurrentIdx(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentIdx(0);
  };

  return (
    <Link
      href={`/${lang}/${hubSlug}/${themeSlug}`}
      className="card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Colorful Accent Ribbon */}
      <div style={{ height: '4px', width: '100%', background: hubColors.gradient }} />

      {/* Portrait 3:4 Image Wrapper for Gorgeous Vertical Banners */}
      <div className="card-img-wrapper" style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', background: '#F1F5F9' }}>
        {images.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === currentIdx ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              zIndex: idx === currentIdx ? 2 : 1,
            }}
          >
            <SafeImage
              src={imgUrl}
              alt={`${title} coloring page ${idx + 1}`}
              className="card-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}

        {/* Dynamic Album Page Counter Badge (Top Left) */}
        {pageCount !== undefined && pageCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              zIndex: 10,
              letterSpacing: '0.02em',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <span>{pageCount} {isEn ? 'Pages' : 'Platen'}</span>
          </div>
        )}

        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.25rem 0.65rem',
              fontSize: '0.7rem',
              fontWeight: 800,
              zIndex: 10,
              letterSpacing: '0.04em',
            }}
          >
            <span>{currentIdx + 1}/{images.length}</span>
          </div>
        )}
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: hubColors.text,
              background: hubColors.bg,
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {isEn ? hubColors.labelEn : hubColors.labelNl}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-500)' }}>
            100% Free
          </span>
        </div>

        {/* Large, High-Contrast Subject Title */}
        <h3 className="card-title" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
          {title}
        </h3>

        <p className="card-desc" style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.55, marginBottom: '1rem', flex: 1 }}>
          {description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-200)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            {isEn ? 'Explore Album →' : 'Bekijk Kleurplaten →'}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-500)' }}>
            A4 • PDF / PNG
          </span>
        </div>
      </div>
    </Link>
  );
}