'use client';

import React, { useState, useEffect } from 'react';
import SafeImage from './SafeImage';
import { CalendarMonth, CalendarThemeBundle } from '@/data/calendarData';
import styles from './PrintableCalendarGrid.module.css';

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
    <div className={styles.calendarContainer}>
      {/* 10 Theme Selection Pills */}
      {themes.length > 0 && (
        <div className={styles.themePicker}>
          <h3 className={styles.themePickerTitle}>
            {isEn ? '🌟 Choose Your Calendar Theme (10 Full 12-Month Editions):' : '🌟 Kies Je Kalender Thema (10 Complete 12-Maanden Uitgaven):'}
          </h3>
          <div className={styles.themeButtonsList}>
            {themes.map((theme) => {
              const isSelected = theme.id === selectedThemeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={`${styles.themeButton} ${isSelected ? styles.themeButtonActive : styles.themeButtonInactive}`}
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
      <div className={styles.heroBanner}>
        <div className={styles.heroLeft}>
          <div className={styles.heroIcon}>{activeTheme ? activeTheme.icon : '📅'}</div>
          <div>
            <span className={styles.heroBadge}>
              {isEn ? '12-Month Printable Calendar' : '12-Maanden Printbare Kalender'}
            </span>
            <h2 className={styles.heroTitle}>
              {activeTheme ? (isEn ? activeTheme.titleEn + ' (' + year + ')' : activeTheme.titleNl + ' (' + year + ')') : (isEn ? 'Free Printable ' + year + ' Coloring Calendar' : 'Gratis Printbare ' + year + ' Kleurkalender')}
            </h2>
            <p className={styles.heroSubtitle}>
              {isEn
                ? 'Each month features an adorable coloring header and spacious planning boxes for school & home!'
                : 'Elke maand heeft een prachtige kleurplaat-kop en ruime vakjes voor verjaardagen en afspraken!'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrintAll}
          className={styles.heroPrintButton}
        >
          <span>🖨️</span>
          <span>{isEn ? `Print Full ${year} Calendar (12 Pages)` : `Print Complete ${year} Kalender (12 Pagina’s)`}</span>
        </button>
      </div>

      {/* 12 Month Grid (Responsive 1-column on mobile, 2/3 columns on larger screens) */}
      <div className={styles.monthGrid}>
        {months.map((m) => (
          <div
            key={m.monthNumber}
            className={styles.monthCard}
            onClick={() => setActiveModalMonth(m)}
          >
            {/* Clean Header with Month Name */}
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.cardSeason}>
                  {isEn ? m.seasonEn : m.seasonNl}
                </span>
                <h3 className={styles.cardTitle}>
                  {(isEn ? m.nameEn : m.nameNl) + ' ' + year}
                </h3>
              </div>
              <span className={styles.cardIcon}>{m.icon}</span>
            </div>

            {/* Clean Crisp Centered Coloring Artwork */}
            <div className={styles.cardImageWrapper}>
              {m.image ? (
                <SafeImage
                  src={m.image}
                  alt={m.nameEn + ' Coloring Page'}
                  width={400}
                  height={280}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ fontSize: '3.5rem' }}>{m.icon}</div>
              )}

              <span className={styles.openBadge}>
                🔍 {isEn ? 'Click to Open' : 'Klik om te Openen'}
              </span>
            </div>

            {/* Mini Month Calendar Grid */}
            <div className={styles.cardBody}>
              <div className={styles.daysHeader}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              <div className={styles.daysGrid}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isValidDay = dayNum <= m.days;

                  return (
                    <div
                      key={i}
                      className={`${styles.dayCell} ${isValidDay ? styles.dayCellValid : styles.dayCellEmpty}`}
                    >
                      <span>{isValidDay ? dayNum : ''}</span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModalMonth(m);
                }}
                className={styles.openMonthButton}
              >
                <span>🔍</span>
                <span>{isEn ? 'Open & Print ' + m.nameEn : 'Bekijk & Print ' + m.nameNl}</span>
              </button>
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
          className={styles.modalOverlay}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalContent}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
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
                className={styles.modalCloseBtn}
                aria-label={isEn ? 'Close preview' : 'Voorbeeld sluiten'}
              >
                ✕
              </button>
            </div>

            {/* A4 Printable Sheet Preview */}
            <div className={styles.modalSheetWrapper}>
              <div className={styles.printableSheet}>
                {/* Month Banner */}
                <div className={styles.sheetBanner}>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {(isEn ? activeModalMonth.nameEn : activeModalMonth.nameNl) + ' ' + year}
                  </h2>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic' }}>
                    &ldquo;{isEn ? activeModalMonth.quoteEn : activeModalMonth.quoteNl}&rdquo;
                  </p>
                </div>

                {/* Big Clean Line Art Image to Color */}
                <div className={styles.sheetImageWrapper}>
                  {activeModalMonth.image ? (
                    <SafeImage
                      src={activeModalMonth.image}
                      alt={activeModalMonth.nameEn + ' Coloring Artwork'}
                      width={420}
                      height={290}
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
            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => window.print()}
                className={styles.modalPrintBtn}
              >
                <span>🖨️</span>
                <span>{isEn ? 'Print This Month (Full A4)' : 'Nu Afdrukken (A4 Formaat)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalMonth(null)}
                className={styles.modalCancelBtn}
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