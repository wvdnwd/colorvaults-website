'use client';

import React, { useState } from 'react';
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
        {/* Visual Worksheet Mockup Top */}
        <div style={{
          background: colors.bg,
          padding: '1.75rem 1.5rem',
          borderBottom: `1px solid ${colors.border}`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '140px',
        }}>
          <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }}>
            {sheet.icon}
          </span>

          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            background: '#FFFFFF',
            color: colors.text,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          }}>
            {sheet.grade}
          </span>

          <span style={{
            position: 'absolute',
            bottom: '8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: colors.text,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            📄 {isEn ? 'Printable A4 Worksheet' : 'Printbaar A4 Werkblad'}
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              background: colors.gradient,
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
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
            background: 'rgba(0,0,0,0.65)',
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
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
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
                padding: '2rem',
                background: '#FFFFFF',
                marginBottom: '1.5rem',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #E2E8F0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
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

              {/* Exercise Area */}
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>
                  {sheet.icon}
                </span>
                <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                  {isEn ? sheet.descEn : sheet.descNl}
                </p>

                {/* Tracing & Drawing Practice Box */}
                <div style={{
                  border: '2px dashed #94A3B8',
                  borderRadius: '14px',
                  padding: '2.5rem 1rem',
                  background: '#F8FAFC',
                  fontSize: '0.95rem',
                  color: '#64748B',
                  fontWeight: 600,
                }}>
                  ✏️ {isEn ? 'Practice Area — Write, draw, and color inside this box!' : 'Oefenvak — Schrijf, teken en kleur in dit vak!'}
                </div>
              </div>

              {/* Star Score Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E2E8F0', paddingTop: '1rem', marginTop: '1.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                <span>© ColorVaults.com — Free for Schools & Families</span>
                <span>⭐ ⭐ ⭐ ⭐ ⭐ <strong>{isEn ? 'Great Job!' : 'Goed gedaan!'}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.75rem 1.25rem',
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
                  padding: '0.75rem 1.75rem',
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
                <span>{isEn ? 'Print Full A4 Page' : 'Print A4 Werkblad'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
