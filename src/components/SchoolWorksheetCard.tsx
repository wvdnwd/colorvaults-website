'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import { SchoolWorksheet } from '@/data/schoolData';

interface SchoolWorksheetCardProps {
  sheet: SchoolWorksheet;
  isEn: boolean;
}

export default function SchoolWorksheetCard({ sheet, isEn }: SchoolWorksheetCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math':
        return { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8', gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)' };
      case 'writing':
        return { bg: '#FDF2F8', border: '#FBCFE8', text: '#BE185D', gradient: 'linear-gradient(135deg, #DB2777 0%, #EC4899 100%)' };
      case 'language':
      default:
        return { bg: '#FEF3C7', border: '#FDE68A', text: '#B45309', gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)' };
    }
  };

  const colors = getSubjectColor(sheet.subject);

  return (
    <>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1.5px solid var(--gray-200)',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Real Coloring Artwork Mockup Top */}
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--gray-200)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '240px',
          padding: '1rem',
          cursor: 'pointer',
        }}
        onClick={() => setShowModal(true)}
        >
          {sheet.image ? (
            <SafeImage
              src={sheet.image}
              alt={isEn ? sheet.titleEn : sheet.titleNl}
              width={320}
              height={220}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <span style={{ fontSize: '3.5rem' }}>{sheet.icon}</span>
          )}

          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}>
            {sheet.grade}
          </span>

          <span style={{
            position: 'absolute',
            bottom: '8px',
            left: '12px',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#475569',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '0.15rem 0.5rem',
            borderRadius: '6px',
            border: '1px solid var(--gray-200)',
          }}>
            {sheet.icon} {isEn ? 'Printable A4 Worksheet' : 'Printbaar A4 Werkblad'}
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1, background: '#FAFAFA' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem', lineHeight: 1.35 }}>
            {isEn ? sheet.titleEn : sheet.titleNl}
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
            {isEn ? sheet.descEn : sheet.descNl}
          </p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: '12px',
              background: colors.gradient,
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.2s ease',
            }}
          >
            <span>🖨️</span>
            <span>{isEn ? 'Preview & Print Worksheet' : 'Bekijk & Print Werkblad'}</span>
          </button>
        </div>
      </div>

      {/* Printable Worksheet Preview Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          }}>
            {/* Printable Sheet Box */}
            <div
              id="printable-worksheet"
              style={{
                border: '2px solid #CBD5E1',
                borderRadius: '16px',
                padding: '1.75rem',
                background: '#FFFFFF',
                marginBottom: '1.5rem',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0F172A', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                    {isEn ? sheet.titleEn : sheet.titleNl}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 700 }}>
                    ColorVaults Education • {sheet.grade.toUpperCase()}
                  </span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#475569' }}>
                  <div><strong>{isEn ? 'Name:' : 'Naam:'}</strong> ___________________</div>
                  <div style={{ marginTop: '0.4rem' }}><strong>{isEn ? 'Date:' : 'Datum:'}</strong> ___________________</div>
                </div>
              </div>

              {/* Real Worksheet Line Art Drawing */}
              <div style={{
                height: '300px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                marginBottom: '1.25rem',
              }}>
                {sheet.image ? (
                  <SafeImage
                    src={sheet.image}
                    alt={isEn ? sheet.titleEn : sheet.titleNl}
                    width={420}
                    height={290}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '5rem' }}>{sheet.icon}</span>
                )}
              </div>

              {/* Instructions & Tracing Practice Box */}
              <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1E293B', textAlign: 'center', margin: '0 0 1rem', lineHeight: 1.5 }}>
                {isEn ? sheet.descEn : sheet.descNl}
              </p>

              <div style={{
                border: '2px dashed #94A3B8',
                borderRadius: '12px',
                padding: '1.5rem',
                background: '#F8FAFC',
                fontSize: '0.95rem',
                color: '#64748B',
                fontWeight: 600,
                textAlign: 'center',
              }}>
                ✏️ {isEn ? 'Practice Area — Trace numbers, write answers, and color the drawing above!' : 'Oefenvak — Schrijf je antwoorden, oefen met schrijven en kleur de tekening hierboven in!'}
              </div>

              {/* Star Score Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E2E8F0', paddingTop: '1rem', marginTop: '1.25rem', fontSize: '0.85rem', color: '#64748B' }}>
                <span>© ColorVaults.com — Free Educational Worksheets</span>
                <span>⭐ ⭐ ⭐ ⭐ ⭐ <strong>{isEn ? 'Great Job!' : 'Goed gedaan!'}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.85rem 1.4rem',
                  borderRadius: '9999px',
                  border: '1.5px solid var(--gray-300)',
                  background: '#FFFFFF',
                  color: '#475569',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Close' : 'Sluiten'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                style={{
                  padding: '0.85rem 2rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: colors.gradient,
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                }}
              >
                <span>🖨️</span>
                <span>{isEn ? 'Print Full A4 Worksheet' : 'Print A4 Werkblad'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}