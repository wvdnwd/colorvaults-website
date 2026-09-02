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

const HUB_GRADIENTS: Record<string, { gradient: string; text: string; bg: string }> = {
  'disney-and-fairy-tales': { gradient: 'linear-gradient(135deg, #FF6B8B 0%, #FFD166 100%)', text: '#E11D48', bg: 'rgba(255, 107, 139, 0.14)' },
  'tv-series-and-movies': { gradient: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', text: '#4F46E5', bg: 'rgba(99, 102, 241, 0.14)' },
  'games-and-pop-culture': { gradient: 'linear-gradient(135deg, #00D2D3 0%, #54A0FF 100%)', text: '#0284C7', bg: 'rgba(0, 210, 211, 0.14)' },
  'animals-and-nature': { gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', text: '#059669', bg: 'rgba(16, 185, 129, 0.14)' },
  'girls-themes': { gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)', text: '#DB2777', bg: 'rgba(236, 72, 153, 0.14)' },
  'toddler-specific': { gradient: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)', text: '#D97706', bg: 'rgba(249, 115, 22, 0.14)' },
  'adults': { gradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', text: '#7C3AED', bg: 'rgba(139, 92, 246, 0.14)' },
  'mandalas': { gradient: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)', text: '#6D28D9', bg: 'rgba(124, 58, 237, 0.14)' },
  'school-education-templates': { gradient: 'linear-gradient(135deg, #84CC16 0%, #10B981 100%)', text: '#65A30D', bg: 'rgba(132, 204, 22, 0.14)' },
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

  const hubColors = HUB_GRADIENTS[hubSlug] || {
    gradient: 'linear-gradient(135deg, #FF6B4A 0%, #FF9066 100%)',
    text: '#E05638',
    bg: 'rgba(255, 107, 74, 0.14)',
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

      <div className="card-img-wrapper" style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
        {images.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === currentIdx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
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
              top: '10px',
              left: '10px',
              background: hubColors.gradient,
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '0.25rem 0.65rem',
              fontSize: '0.7rem',
              fontWeight: 800,
              zIndex: 10,
              letterSpacing: '0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <span>📁</span>
            <span>{pageCount} {lang === 'en' ? 'pages' : 'platen'}</span>
          </div>
        )}

        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(6px)',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '0.25rem 0.6rem',
              fontSize: '0.68rem',
              fontWeight: 800,
              zIndex: 10,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>📷</span>
            <span>{currentIdx + 1}/{images.length}</span>
          </div>
        )}
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
        <h3 className="card-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.4rem' }}>
          {title}
        </h3>
        <p className="card-desc" style={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: 'auto' }}>
          <span
            style={{
              background: hubColors.bg,
              color: hubColors.text,
              borderRadius: 'var(--radius-full)',
              padding: '0.3rem 0.8rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            ✨ {pageCount ? `${pageCount} ${lang === 'en' ? 'Coloring Pages' : 'Kleurplaten'}` : (lang === 'en' ? 'Full Album' : 'Volledig Album')}
          </span>
        </div>
      </div>
    </Link>
  );
}
