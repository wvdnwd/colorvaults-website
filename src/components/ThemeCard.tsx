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
  availableAges: string[];
  images: string[];
}

export default function ThemeCard({
  lang,
  hubSlug,
  themeSlug,
  title,
  description,
  availableAges,
  images
}: ThemeCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % images.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [images]);

  const handleMouseEnter = () => {
    if (images && images.length > 1) {
      setCurrentIdx(prev => (prev + 1) % images.length);
    }
  };

  return (
    <Link
      href={`/${lang}/${hubSlug}/${themeSlug}`}
      className="card"
      style={{ height: '100%', display: 'flex', flexDirection: 'column', textDecoration: 'none' }}
      onMouseEnter={handleMouseEnter}
    >
      <div className="card-img-wrapper" style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: 'var(--gray-100)' }}>
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

        {images.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.55)',
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
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {availableAges.map(age => (
            <span
              key={age}
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'capitalize',
              }}
            >
              {age}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
