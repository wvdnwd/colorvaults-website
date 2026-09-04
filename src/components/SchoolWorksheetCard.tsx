'use client';

import React from 'react';
import { SchoolWorksheet } from '@/data/schoolData';

interface SchoolWorksheetCardProps {
  sheet: SchoolWorksheet;
  isEn: boolean;
}

export default function SchoolWorksheetCard({ sheet, isEn }: SchoolWorksheetCardProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--gray-200)',
        padding: '1.5rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{sheet.icon}</span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            background: '#EFF6FF',
            color: '#2563EB',
          }}>
            {sheet.grade}
          </span>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem', lineHeight: 1.35 }}>
          {isEn ? sheet.titleEn : sheet.titleNl}
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          {isEn ? sheet.descEn : sheet.descNl}
        </p>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        style={{
          width: '100%',
          padding: '0.65rem 1rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: '#FFFFFF',
          border: 'none',
          fontWeight: 800,
          fontSize: '0.88rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
          transition: 'all 0.2s',
        }}
      >
        <span>🖨️</span>
        <span>{isEn ? 'Print Worksheet PDF' : 'Print Werkblad PDF'}</span>
      </button>
    </div>
  );
}
