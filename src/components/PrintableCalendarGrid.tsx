'use client';

import React, { useState, useEffect } from 'react';
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
  const [activeModalMonth, setActiveModalMonth] = useState<CalendarMonth | null>(null);

  const activeTheme = themes.length > 0 ? (themes.find(t => t.id === selectedThemeId) || themes[0]) : null;
  const months = activeTheme ? activeTheme.months : initialMonths;

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalMonth(null);
      }
    };
    if (activeModalMonth) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalMonth]);

  const handlePrintAll = () => {
    window.print();
  };

  const daysOfWeekEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfWeekNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const daysOfWeek = isEn ? daysOfWeekEn : daysOfWeekNl;

  return (
    <div>
      {/* 10 Theme Selection Pills */}
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

      {/* Hero Banner with Theme Title */}
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
          <span>{isEn ? `Print Full ${year} Calendar (12 Pages)` : `Print Complete ${year} Kalender (12 Pagina’s)`}</span>
        </button>
      </div>

      {/* 12 Month Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem',
      }}>
        {months.map((m) => (
          <div
            key={m.monthNumber}
            onClick={() => setActiveModalMonth(m)}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid var(--gray-200)',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.04)';
            }}
          >
            {/* Clean Header with Month Name */}
            <div style={{
              padding: '1rem 1.25rem 0.75rem',
              background: '#F8FAFC',
              borderBottom: '1px solid var(--gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B' }}>
                  {isEn ? m.seasonEn : m.seasonNl}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: '#0F172A' }}>
                  {(isEn ? m.nameEn : m.nameNl) + ' ' + year}
                </h3>
              </div>
              <span style={{ fontSize: '1.8rem' }}>{m.icon}</span>
            </div>

            {/* Clean Crisp Centered Coloring Artwork */}
            <div style={{
              position: 'relative',
              height: '240px',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              borderBottom: '1px solid var(--gray-200)',
            }}>
              {m.image ? (
                <SafeImage
                  src={m.image}
                  alt={m.nameEn + ' Coloring Page'}
                  width={380}
                  height={240}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ fontSize: '3.5rem' }}>{m.icon}</div>
              )}

              <span style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.25rem 0.65rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                🔍 {isEn ? 'Click to Open' : 'Klik om te Openen'}
              </span>
            </div>

            {/* Mini Month Calendar Grid */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', background: '#FAFAFA' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '0.72rem',
                color: '#64748B',
                marginBottom: '0.4rem',
              }}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: '28px',
                gap: '3px',
                flex: 1,
              }}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isValidDay = dayNum <= m.days;

                  return (
                    <div
                      key={i}
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        background: isValidDay ? '#FFFFFF' : 'transparent',
                        padding: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isValidDay ? '#1E293B' : 'transparent',
                      }}
                    >
                      <span>{isValidDay ? dayNum : ''}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalMonth(m);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#2563EB',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>🔍</span>
                  <span>{isEn ? 'Open & Print ' + m.nameEn : 'Bekijk & Print ' + m.nameNl}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Fullscreen Interactive A4 Calendar Preview Modal ── */}
      {activeModalMonth && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalMonth(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid var(--gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                  {isEn ? activeModalMonth.seasonEn : activeModalMonth.seasonNl}
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: '0.2rem 0 0' }}>
                  {(isEn ? activeModalMonth.nameEn : activeModalMonth.nameNl) + ' ' + year + ' Kleurkalender'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalMonth(null)}
                style={{
                  background: 'var(--gray-100)',
                  border: 'none',
                  borderRadius: '9999px',
                  width: '36px',
                  height: '36px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* A4 Printable Sheet Preview */}
            <div style={{ padding: '1.75rem', background: '#F8FAFC', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid var(--gray-300)',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '480px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {/* Month Banner */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {(isEn ? activeModalMonth.nameEn : activeModalMonth.nameNl) + ' ' + year}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic' }}>
                    &ldquo;{isEn ? activeModalMonth.quoteEn : activeModalMonth.quoteNl}&rdquo;
                  </p>
                </div>

                {/* Big Clean Line Art Image to Color */}
                <div style={{
                  height: '280px',
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  overflow: 'hidden',
                }}>
                  {activeModalMonth.image ? (
                    <SafeImage
                      src={activeModalMonth.image}
                      alt={activeModalMonth.nameEn + ' Coloring Artwork'}
                      width={400}
                      height={280}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>{activeModalMonth.icon}</span>
                  )}
                </div>

                {/* Planning Grid */}
                <div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: '#334155',
                    marginBottom: '0.4rem',
                  }}>
                    {daysOfWeek.map((d, i) => (
                      <div key={i}>{d}</div>
                    ))}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridAutoRows: '32px',
                    gap: '3px',
                  }}>
                    {Array.from({ length: 35 }).map((_, i) => {
                      const dayNum = i + 1;
                      const isValidDay = dayNum <= activeModalMonth.days;

                      return (
                        <div
                          key={i}
                          style={{
                            borderRadius: '4px',
                            border: '1px solid #CBD5E1',
                            background: isValidDay ? '#FFFFFF' : '#F1F5F9',
                            padding: '2px 4px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isValidDay ? '#0F172A' : 'transparent',
                          }}
                        >
                          {isValidDay ? dayNum : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94A3B8' }}>
                  © ColorVaults.com • {isEn ? 'Free Printable Coloring Calendar' : 'Gratis Printbare Kleurkalender'}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '1.25rem 1.75rem',
              borderTop: '1px solid var(--gray-200)',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  flex: 2,
                  padding: '0.9rem',
                  borderRadius: '9999px',
                  background: 'var(--gradient-primary, linear-gradient(135deg, #6C5CE7, #A29BFE))',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(108, 92, 231, 0.3)',
                }}
              >
                <span>🖨️</span>
                <span>{isEn ? 'Print This Month (Full A4)' : 'Nu Afdrukken (A4 Formaat)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalMonth(null)}
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  borderRadius: '9999px',
                  border: '2px solid var(--gray-200)',
                  background: '#FFFFFF',
                  color: '#475569',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {isEn ? 'Close' : 'Sluiten'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
