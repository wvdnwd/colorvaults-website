'use client';

import React from 'react';
import SafeImage from './SafeImage';

interface PinterestThemeCardProps {
  themeTitle: string;
  themeImage: string;
  url: string;
  isEn: boolean;
  pageCount?: number;
}

export default function PinterestThemeCard({
  themeTitle,
  themeImage,
  url,
  isEn,
  pageCount = 40,
}: PinterestThemeCardProps) {
  const fullUrl = `https://colorvaults.com${url}`;
  const pinTitle = `${pageCount}+ Free Printable ${themeTitle} Coloring Pages (PDF Download) | ColorVaults`;
  const pinDescription = isEn
    ? `Download and print ${pageCount}+ free high-resolution ${themeTitle} coloring pages! Perfect for toddlers, kids, and teachers. 100% free A4/Letter PDF printables.`
    : `Download en print ${pageCount}+ gratis hoge resolutie ${themeTitle} kleurplaten! Ideaal voor kinderen, peuters en schoolklassen. 100% gratis A4 PDF.`;

  const pinShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
    fullUrl
  )}&media=${encodeURIComponent(themeImage)}&description=${encodeURIComponent(
    `${pinTitle} - ${pinDescription}`
  )}`;

  return (
    <div
      style={{
        marginTop: '2.5rem',
        background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF 100%)',
        border: '1.5px solid #FECDD3',
        borderRadius: '24px',
        padding: '1.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        boxShadow: '0 8px 30px rgba(225, 29, 72, 0.06)',
      }}
    >
      {/* Left Text Info */}
      <div style={{ flex: '1 1 480px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              background: '#E60023',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '0.2rem 0.65rem',
              fontSize: '0.74rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 8px rgba(230, 0, 35, 0.25)',
            }}
          >
            <span>📌</span>
            <span>Pinterest</span>
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#9F1239' }}>
            {isEn ? 'Parent & Teacher Favorite' : 'Favoriet bij Ouders & Scholen'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#881337', margin: '0.2rem 0 0.4rem', lineHeight: 1.3 }}>
          {isEn
            ? `Save this ${themeTitle} Collection to Your Pinterest Board`
            : `Bewaar deze ${themeTitle} Collectie op Pinterest`}
        </h3>

        <p style={{ fontSize: '0.92rem', color: '#4C0519', margin: 0, lineHeight: 1.6, maxWidth: '620px' }}>
          {isEn
            ? `Planning a rainy day craft, homeschool lesson, or birthday party? Pin this collection now so you can print them whenever you need them!`
            : `Handig voor een regenachtige middag, kinderfeestje of in het klaslokaal! Pin deze collectie op je bord om hem later met één klik weer terug te vinden.`}
        </p>
      </div>

      {/* Right Action Button & Pin Preview Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
        {themeImage && (
          <div
            style={{
              width: '56px',
              height: '75px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '2px solid #FFFFFF',
              position: 'relative',
              background: '#FFFFFF',
            }}
          >
            <SafeImage
              src={themeImage}
              alt={themeTitle}
              width={56}
              height={75}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
            />
          </div>
        )}

        <a
          href={pinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #E60023 0%, #BD081C 100%)',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '0.75rem 1.4rem',
            fontSize: '0.92rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 14px rgba(230, 0, 35, 0.35)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          title={isEn ? 'Save to Pinterest' : 'Bewaar op Pinterest'}
        >
          <span style={{ fontSize: '1.1rem' }}>📌</span>
          <span>{isEn ? 'Pin to Pinterest' : 'Bewaar op Pinterest'}</span>
        </a>
      </div>
    </div>
  );
}
