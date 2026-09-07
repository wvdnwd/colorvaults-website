'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { HOLIDAY_MARKETING_EVENTS, HolidayMarketingEvent } from '@/data/holidayMarketingCalendar';
import styles from './MarketingCalendar.module.css';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];

export default function MarketingCalendar() {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'timeline' | 'monthly' | 'urgent'>('urgent');
  const [activeMonthFilter, setActiveMonthFilter] = useState<number>(currentMonth);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load checklist state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cv_calendar_checklist');
      if (saved) setCheckedItems(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleCheck = (id: string, itemIdx: number) => {
    const key = `${id}_${itemIdx}`;
    setCheckedItems(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('cv_calendar_checklist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return HOLIDAY_MARKETING_EVENTS.filter(e => {
      if (selectedCountry !== 'ALL' && !e.countries.includes(selectedCountry as any) && !e.countries.includes('GLOBAL')) {
        return false;
      }
      if (selectedTier !== 'ALL' && e.trafficTier !== selectedTier) {
        return false;
      }
      if (activeTab === 'monthly' && e.month !== activeMonthFilter) {
        return false;
      }
      return true;
    });
  }, [selectedCountry, selectedTier, activeTab, activeMonthFilter]);

  // Urgent / Next 90 days timeline calculation
  const urgentActions = useMemo(() => {
    const now = new Date();
    const currM = now.getMonth() + 1; // 1-12

    return HOLIDAY_MARKETING_EVENTS.map(event => {
      // Calculate months until event
      let monthDiff = event.month - currM;
      if (monthDiff < 0) monthDiff += 12;

      let statusType: 'peak_now' | 'push_seo_now' | 'push_social_now' | 'upcoming' = 'upcoming';
      let urgencyText = '';

      if (monthDiff === 0) {
        statusType = 'peak_now';
        urgencyText = '🚨 NU LIVE: Piekverkeer & Zoekvolume deze maand!';
      } else if (monthDiff === 1) {
        statusType = 'push_social_now';
        urgencyText = '📢 SOCIAL & PROMOTIE: Start binnen nu en 2-3 weken!';
      } else if (monthDiff === 2) {
        statusType = 'push_seo_now';
        urgencyText = '⏳ SEO & UPLOADS: Upload en indexeer VANDAAG in Google!';
      } else {
        urgencyText = `📅 Gepland over ${monthDiff} maanden`;
      }

      return {
        ...event,
        monthDiff,
        statusType,
        urgencyText,
      };
    }).sort((a, b) => a.monthDiff - b.monthDiff);
  }, []);

  const getTierBadge = (tier: string) => {
    if (tier === 'extreme') return { label: '🔥🔥🔥 TOP PIEK (1M+)', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
    if (tier === 'high') return { label: '📈 HOOG VERKEER (300k+)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    return { label: '🌱 GEMIDDELD (100k+)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
  };

  const getCountryFlags = (countries: string[]) => {
    return countries.map(c => {
      if (c === 'NL') return '🇳🇱';
      if (c === 'BE') return '🇧🇪';
      if (c === 'US') return '🇺🇸';
      if (c === 'UK') return '🇬🇧';
      if (c === 'DE') return '🇩🇪';
      if (c === 'FR') return '🇫🇷';
      return '🌍';
    }).join(' ');
  };

  return (
    <div className={styles.container}>
      
      {/* ── Top Strategic Real-time Alert Banner ── */}
      <div className={styles.urgentBanner}>
        <div className={styles.urgentIcon}>🎯</div>
        <div className={styles.urgentTextCol}>
          <div className={styles.urgentHeaderRow}>
            <span className={styles.currentMonthBadge}>
              Huidige Maand: {MONTH_NAMES[currentMonth - 1]}
            </span>
            <span className={styles.urgentSubBadge}>SEO Lead Time Regel: 6 tot 8 weken vooraf</span>
          </div>
          <h2 className={styles.urgentTitle}>
            Wat moet je nu voorbereiden om straks #1 in Google te staan?
          </h2>
          <p className={styles.urgentDesc}>
            Google heeft gemiddeld <strong>4 tot 8 weken</strong> nodig om nieuwe kleurplaten en categorieën te indexeren en te laten ranken. 
            Wanneer een feestdag begint, is het te laat om te uploaden. Zorg dat je de onderstaande pieken nu alvast klaarzet!
          </p>
        </div>
      </div>

      {/* ── Filter & Navigation Bar ── */}
      <div className={styles.filterBar}>
        
        {/* Main View Tabs */}
        <div className={styles.tabGroup}>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`${styles.tabBtn} ${activeTab === 'urgent' ? styles.tabBtnActive : ''}`}
          >
            ⚡ Wat moet ik NU doen? ({urgentActions.filter(a => a.monthDiff <= 2).length})
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`${styles.tabBtn} ${activeTab === 'monthly' ? styles.tabBtnActive : ''}`}
          >
            📅 Kalender per Maand
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`${styles.tabBtn} ${activeTab === 'timeline' ? styles.tabBtnActive : ''}`}
          >
            📋 Volledig Jaaroverzicht ({HOLIDAY_MARKETING_EVENTS.length})
          </button>
        </div>

        {/* Filters: Country & Tier */}
        <div className={styles.filterControls}>
          <div className={styles.filterSelectWrapper}>
            <label>Land / Regio:</label>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className={styles.select}
            >
              <option value="ALL">🌍 Alle Landen & Wereldwijd</option>
              <option value="NL">🇳🇱 Nederland & België</option>
              <option value="US">🇺🇸 Verenigde Staten & UK</option>
              <option value="DE">🇩🇪 Duitsland & Oostenrijk</option>
              <option value="FR">🇫🇷 Frankrijk</option>
            </select>
          </div>

          <div className={styles.filterSelectWrapper}>
            <label>Verkeersvolume:</label>
            <select
              value={selectedTier}
              onChange={e => setSelectedTier(e.target.value)}
              className={styles.select}
            >
              <option value="ALL">🔥 Alle Verkeersniveaus</option>
              <option value="extreme">🔥🔥🔥 Alleen Top Pieken</option>
              <option value="high">📈 Hoog & Top Pieken</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className={styles.printBtn}
            title="Print marketing kalender schema"
          >
            🖨️ Print Schema
          </button>
        </div>
      </div>

      {/* ── Month Selector (When Monthly tab is active) ── */}
      {activeTab === 'monthly' && (
        <div className={styles.monthPillsRow}>
          {MONTH_NAMES.map((name, idx) => {
            const mNum = idx + 1;
            const count = HOLIDAY_MARKETING_EVENTS.filter(e => e.month === mNum).length;
            const isCurrent = mNum === currentMonth;
            const isSelected = mNum === activeMonthFilter;
            return (
              <button
                key={name}
                onClick={() => setActiveMonthFilter(mNum)}
                className={`${styles.monthPill} ${isSelected ? styles.monthPillActive : ''}`}
              >
                <span>{name}</span>
                <span className={styles.monthBadgeCount}>{count}</span>
                {isCurrent && <span className={styles.nowDot}>• Nu</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Events Grid Display ── */}
      <div className={styles.eventsGrid}>
        {(activeTab === 'urgent' ? urgentActions : filteredEvents).map((event) => {
          const tier = getTierBadge(event.trafficTier);
          const flags = getCountryFlags(event.countries);
          const isUrgentNow = (event as any).statusType === 'push_seo_now' || (event as any).statusType === 'peak_now';

          return (
            <div
              key={event.id}
              className={`${styles.eventCard} ${isUrgentNow ? styles.eventCardUrgent : ''}`}
            >
              {/* Top Card Header */}
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.metaRow}>
                    <span className={styles.dateTag}>🗓️ {event.approxDate} ({MONTH_NAMES[event.month - 1]})</span>
                    <span className={styles.countryTag}>{flags}</span>
                    <span
                      className={styles.tierTag}
                      style={{ color: tier.color, background: tier.bg, border: `1px solid ${tier.color}40` }}
                    >
                      {tier.label}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{event.titleNl}</h3>
                  <div className={styles.intlTitles}>
                    <span>🇬🇧 {event.titleEn}</span>
                    <span>🇩🇪 {event.titleDe}</span>
                    <span>🇫🇷 {event.titleFr}</span>
                  </div>
                </div>

                <div className={styles.searchVolumeCol}>
                  <span className={styles.volumeNumber}>{event.searchVolumeEstimate}</span>
                  <span className={styles.leadTimeText}>⏳ {event.leadTimeWeeks} wk vooraf starten</span>
                </div>
              </div>

              {/* Urgency Status Banner if in Urgent Mode */}
              {(event as any).urgencyText && (
                <div className={`
                  ${styles.actionAlert}
                  ${(event as any).statusType === 'peak_now' ? styles.alertPeak : ''}
                  ${(event as any).statusType === 'push_seo_now' ? styles.alertSeo : ''}
                  ${(event as any).statusType === 'push_social_now' ? styles.alertSocial : ''}
                `}>
                  {(event as any).urgencyText}
                </div>
              )}

              {/* 3-Step Publishing Timeline */}
              <div className={styles.timelineBox}>
                <div className={styles.timelineStep}>
                  <span className={styles.stepNum}>1</span>
                  <div className={styles.stepCol}>
                    <span className={styles.stepLabel}>🔍 SEO & Uploads Klaarzetten:</span>
                    <strong className={styles.stepValue}>{event.seoPushWindow}</strong>
                  </div>
                </div>

                <div className={styles.timelineStep}>
                  <span className={styles.stepNum}>2</span>
                  <div className={styles.stepCol}>
                    <span className={styles.stepLabel}>📢 Social Media & Pinterest:</span>
                    <strong className={styles.stepValue}>{event.socialPushWindow}</strong>
                  </div>
                </div>

                <div className={styles.timelineStep}>
                  <span className={styles.stepNum}>3</span>
                  <div className={styles.stepCol}>
                    <span className={styles.stepLabel}>⚡ Piekverkeer Periode:</span>
                    <strong className={styles.stepValue} style={{ color: '#10b981' }}>{event.peakTrafficWindow}</strong>
                  </div>
                </div>
              </div>

              {/* Top Keywords to target */}
              <div className={styles.keywordsSection}>
                <span className={styles.sectionLabel}>🎯 Top Zoekwoorden voor Google & Pinterest:</span>
                <div className={styles.keywordPills}>
                  {event.topKeywords.nl.map(kw => (
                    <span key={kw} className={styles.kwPillNl}>🇳🇱 {kw}</span>
                  ))}
                  {event.topKeywords.en.slice(0, 2).map(kw => (
                    <span key={kw} className={styles.kwPillEn}>🇬🇧 {kw}</span>
                  ))}
                  {event.topKeywords.de.slice(0, 2).map(kw => (
                    <span key={kw} className={styles.kwPillDe}>🇩🇪 {kw}</span>
                  ))}
                </div>
              </div>

              {/* Practical Strategy Advice */}
              <div className={styles.adviceBox}>
                <span className={styles.adviceIcon}>💡</span>
                <p className={styles.adviceText}>{event.strategyAdviceNl}</p>
              </div>

              {/* Action Checklist & Theme Links */}
              <div className={styles.cardFooter}>
                <div className={styles.checklistCol}>
                  <span className={styles.sectionLabel}>✅ Uitvoer Checklist:</span>
                  <div className={styles.checklistItems}>
                    {event.checklistItems.map((item, idx) => {
                      const isChecked = !!checkedItems[`${event.id}_${idx}`];
                      return (
                        <label key={idx} className={styles.checkLabel}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(event.id, idx)}
                            className={styles.checkbox}
                          />
                          <span className={isChecked ? styles.checkedText : ''}>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className={styles.actionButtonsCol}>
                  {event.targetThemeSlugs.map(slug => (
                    <div key={slug} className={styles.actionBtnRow}>
                      <Link
                        href={`/admin/reviewer`}
                        className={styles.btnTinder}
                        title="Review & keur kleurplaten in dit thema"
                      >
                        🔥 Tinder Keuring ({slug})
                      </Link>
                      <a
                        href={`/nl/holidays-seasons/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnLive}
                        title="Bekijk live themapagina"
                      >
                        🌐 Live Pagina ↗
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
