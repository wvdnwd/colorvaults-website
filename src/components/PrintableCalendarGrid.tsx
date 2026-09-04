'use client';

import React, { useState } from 'react';
import SafeImage from './SafeImage';
import { CalendarMonth, CalendarThemeBundle } from '@/data/calendarData';

interface PrintableCalendarProps {
  themes?: CalendarThemeBundle[];
  months?: CalendarMonth[];
  year: number;
  isEn: boolean;
  lang: string;
}

export default function PrintableCalendarGrid({ themes = [], months: initialMonths = [], year, isEn, lang }: PrintableCalendarProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(themes[0]?.id || 'cute-animals');

  const activeTheme = themes.length > 0 ? (themes.find(t => t.id === selectedThemeId) || themes[0]) : null;
  const months = activeTheme ? activeTheme.months : initialMonths;

  const handlePrintAll = () => {
    window.print();
  };

  const daysOfWeekEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfWeekNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const daysOfWeek = isEn ? daysOfWeekEn : daysOfWeekNl;

  return (
    <div>
      {themes.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
            {isEn ? '🌟 Choose Your Calendar Theme (10 Full 12-Month Editions):' : '🌟 Kies Je Kalender Thema (10 Complete 12-Maanden Uitgaven):'}
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
          }}>
            {themes.map((theme) => {
              const isSelected = theme.id === selectedThemeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedThemeId(theme.id)}
                  style={{
                    padding: '0.65rem 1.15rem',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    border: isSelected ? '2px solid #2563EB' : '1.5px solid var(--gray-200)',
                    background: isSelected ? '#2563EB' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{theme.icon}</span>
                  <span>{isEn ? theme.titleEn : theme.titleNl}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        borderRadius: '24px',
        padding: '2rem',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap',
        boxShadow: '0 15px 35px rgba(30, 27, 75, 0.25)',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ fontSize: '3rem' }}>{activeTheme ? activeTheme.icon : '📅'}</div>
          <div>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              padding: '0.2rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {isEn ? '12-Month Printable Calendar' : '12-Maanden Printbare Kalender'}
            </span>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: '0.4rem 0 0.2rem', color: '#FFFFFF' }}>
              {activeTheme ? (isEn ? activeTheme.titleEn + ' (' + year + ')' : activeTheme.titleNl + ' (' + year + ')') : (isEn ? 'Free Printable ' + year + ' Coloring Calendar' : 'Gratis Printbare ' + year + ' Kleurkalender')}
            </h2>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#C7D2FE' }}>
              {isEn
                ? 'Each month features an adorable coloring header and spacious planning boxes for school & home!'
                : 'Elke maand heeft een prachtige kleurplaat-kop en ruime vakjes voor verjaardagen en afspraken!'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrintAll}
          style={{
            padding: '0.9rem 2rem',
            borderRadius: '9999px',
            background: 'var(--gradient-primary, linear-gradient(135deg, #FF6B35, #FF3B30))',
            color: '#FFFFFF',
            border: 'none',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span>🖨️</span>
          <span>{isEn ? 'Print Full ' + year + ' Calendar (12 Pages)' : 'Print Complete ' + year + ' Kalender (12 Pagina\'s)'}</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '2rem',
      }}>
        {months.map((m) => (
          <div
            key={m.monthNumber}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid var(--gray-200)',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              pageBreakAfter: 'always',
            }}
          >
            <div style={{
              position: 'relative',
              height: '180px',
              background: '#F1F5F9',
              overflow: 'hidden',
            }}>
              <SafeImage
                src={m.image}
                alt={m.nameEn + ' Coloring Calendar Header'}
                width={400}
                height={200}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                color: '#FFFFFF',
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#CBD5E1' }}>
                    {isEn ? m.seasonEn : m.seasonNl}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#FFFFFF' }}>
                    {(isEn ? m.nameEn : m.nameNl) + ' ' + year}
                  </h3>
                </div>
                <span style={{ fontSize: '1.75rem' }}>{m.icon}</span>
              </div>
            </div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '0.75rem',
                color: '#64748B',
                marginBottom: '0.5rem',
              }}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: '38px',
                gap: '4px',
                flex: 1,
              }}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isValidDay = dayNum <= m.days;

                  return (
                    <div
                      key={i}
                      style={{
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        background: isValidDay ? '#F8FAFC' : 'transparent',
                        padding: '4px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: isValidDay ? '#1E293B' : 'transparent',
                      }}
                    >
                      <span>{isValidDay ? dayNum : ''}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                background: '#F1F5F9',
                fontSize: '0.8rem',
                color: '#475569',
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
                &ldquo;{isEn ? m.quoteEn : m.quoteNl}&rdquo;
              </div>

              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#2563EB',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  🖨️ {isEn ? 'Print ' + m.nameEn : 'Print ' + m.nameNl}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}