'use client';

import React, { useState } from 'react';
import styles from './SearchPage.module.css';

interface ThemeOption {
 slug: string;
 title: string;
}

interface SearchFilterBarProps {
 lang: string;
 query: string;
 difficulty: string;
 age: string;
 theme: string;
 themes: ThemeOption[];
 onFilterChange: (filters: { query?: string; difficulty?: string; age?: string; theme?: string }) => void;
}

export default function SearchFilterBar({
 lang,
 query,
 difficulty,
 age,
 theme,
 themes,
 onFilterChange,
}: SearchFilterBarProps) {
 const [mobileOpen, setMobileOpen] = useState(false);
 const isEn = lang === 'en';

 const activeCount = [
 Boolean(query),
 Boolean(difficulty),
 Boolean(age),
 Boolean(theme),
 ].filter(Boolean).length;

 const difficultyLabels: Record<string, { en: string; nl: string; emoji: string }> = {
 easy: { en: 'Easy', nl: 'Makkelijk', emoji: '' },
 medium: { en: 'Medium', nl: 'Gemiddeld', emoji: '' },
 hard: { en: 'Hard', nl: 'Moeilijk', emoji: '' },
 };

 const ageLabels: Record<string, { en: string; nl: string; emoji: string }> = {
 kids: { en: 'Toddlers & Kids', nl: 'Peuters & Kinderen', emoji: '' },
 teens: { en: 'Teens', nl: 'Tieners', emoji: '' },
 adults: { en: 'Adults', nl: 'Volwassenen', emoji: '' },
 };

 const selectedThemeTitle = themes.find(t => t.slug === theme)?.title || theme;

 const clearAll = () => {
 onFilterChange({ query: '', difficulty: '', age: '', theme: '' });
 };

 return (
 <div className={styles.filterBarContainer}>
 {/* Top Search input */}
 <div className={styles.searchBar}>
 <span className={styles.searchIcon}></span>
 <input
 type="search"
 value={query}
 onChange={e => onFilterChange({ query: e.target.value })}
 placeholder={
 isEn
 ? 'Search by title, tag, or topic...'
 : 'Zoek op titel, tag of onderwerp...'
 }
 className={styles.input}
 />
 {query && (
 <button
 onClick={() => onFilterChange({ query: '' })}
 className={styles.clearBtn}
 aria-label="Clear query"
 >
 
 </button>
 )}
 </div>

 
      {/* Quick Search Trending Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', overflowX: 'auto', padding: '0.35rem 0 0.85rem', scrollbarWidth: 'none' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-500)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {isEn ? 'Trending:' : 'Populair:'}
        </span>
        {[
          { label: 'Frozen', q: 'Frozen' },
          { label: 'Pokemon', q: 'Pokemon' },
          { label: 'Spider-Man', q: 'Spider-Man' },
          { label: 'Paw Patrol', q: 'Paw Patrol' },
          { label: isEn ? 'Dinosaurs' : 'Dino', q: 'Dinosaur' },
          { label: 'Mandalas', q: 'Mandala' },
          { label: 'Super Mario', q: 'Mario' },
          { label: isEn ? 'Princesses' : 'Prinsessen', q: 'Princess' },
          { label: isEn ? 'Unicorns' : 'Eenhoorns', q: 'Unicorn' },
          { label: 'Lion King', q: 'Lion' },
        ].map((pill) => (
          <button
            key={pill.q}
            type="button"
            onClick={() => onFilterChange({ query: pill.q })}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: query.toLowerCase() === pill.q.toLowerCase() ? 'var(--primary)' : 'var(--surface-2, #F1F5F9)',
              color: query.toLowerCase() === pill.q.toLowerCase() ? '#FFFFFF' : 'var(--gray-600)',
              border: '1px solid var(--gray-200)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {pill.label}
          </button>
        ))}
      </div>


      {/* Mobile Toggle Button */}
 <div className={styles.mobileToggleRow}>
 <button
 type="button"
 className={styles.mobileToggleBtn}
 onClick={() => setMobileOpen(!mobileOpen)}
 >
 ️ {isEn ? 'Filters' : 'Filters'}{' '}
 {activeCount > 0 && <span className={styles.activeBadge}>{activeCount}</span>}
 <span>{mobileOpen ? '▲' : '▼'}</span>
 </button>
 </div>

 {/* Filter Controls Row */}
 <div className={`${styles.filterControlsRow} ${mobileOpen ? styles.filterControlsOpen : ''}`}>
 {/* Difficulty Filter */}
 <div className={styles.filterGroup}>
 <label className={styles.filterLabel}>{isEn ? 'Difficulty' : 'Moeilijkheidsgraad'}</label>
 <div className={styles.selectGroup}>
 <button
 type="button"
 className={`${styles.filterChipBtn} ${!difficulty ? styles.chipActive : ''}`}
 onClick={() => onFilterChange({ difficulty: '' })}
 >
 {isEn ? 'All' : 'Alle'}
 </button>
 {Object.keys(difficultyLabels).map(key => (
 <button
 key={key}
 type="button"
 className={`${styles.filterChipBtn} ${difficulty === key ? styles.chipActive : ''}`}
 onClick={() => onFilterChange({ difficulty: difficulty === key ? '' : key })}
 >
 {difficultyLabels[key].emoji} {isEn ? difficultyLabels[key].en : difficultyLabels[key].nl}
 </button>
 ))}
 </div>
 </div>

 {/* Age Group Filter */}
 <div className={styles.filterGroup}>
 <label className={styles.filterLabel}>{isEn ? 'Age Group' : 'Leeftijdscategorie'}</label>
 <div className={styles.selectGroup}>
 <button
 type="button"
 className={`${styles.filterChipBtn} ${!age ? styles.chipActive : ''}`}
 onClick={() => onFilterChange({ age: '' })}
 >
 {isEn ? 'All' : 'Alle'}
 </button>
 {Object.keys(ageLabels).map(key => (
 <button
 key={key}
 type="button"
 className={`${styles.filterChipBtn} ${age === key ? styles.chipActive : ''}`}
 onClick={() => onFilterChange({ age: age === key ? '' : key })}
 >
 {ageLabels[key].emoji} {isEn ? ageLabels[key].en : ageLabels[key].nl}
 </button>
 ))}
 </div>
 </div>

 {/* Theme Dropdown Filter */}
 <div className={styles.filterGroup}>
 <label className={styles.filterLabel}>{isEn ? 'Theme' : 'Thema'}</label>
 <select
 className={styles.themeSelect}
 value={theme}
 onChange={e => onFilterChange({ theme: e.target.value })}
 >
 <option value="">{isEn ? ' All Themes' : ' Alle Thema\'s'}</option>
 {themes.map(t => (
 <option key={t.slug} value={t.slug}>
 {t.title}
 </option>
 ))}
 </select>
 </div>
 </div>

 {/* Active Filter Chips Bar */}
 {activeCount > 0 && (
 <div className={styles.activeChipsRow}>
 <span className={styles.activeChipsLabel}>{isEn ? 'Active filters:' : 'Actieve filters:'}</span>

 {query && (
 <span className={styles.chipItem}>
 ️ &ldquo;{query}&rdquo;
 <button
 type="button"
 onClick={() => onFilterChange({ query: '' })}
 className={styles.chipRemoveBtn}
 aria-label="Remove query filter"
 >
 
 </button>
 </span>
 )}

 {difficulty && (
 <span className={styles.chipItem}>
 {isEn ? difficultyLabels[difficulty]?.en : difficultyLabels[difficulty]?.nl}
 <button
 type="button"
 onClick={() => onFilterChange({ difficulty: '' })}
 className={styles.chipRemoveBtn}
 aria-label="Remove difficulty filter"
 >
 
 </button>
 </span>
 )}

 {age && (
 <span className={styles.chipItem}>
 {isEn ? ageLabels[age]?.en : ageLabels[age]?.nl}
 <button
 type="button"
 onClick={() => onFilterChange({ age: '' })}
 className={styles.chipRemoveBtn}
 aria-label="Remove age filter"
 >
 
 </button>
 </span>
 )}

 {theme && (
 <span className={styles.chipItem}>
 {selectedThemeTitle}
 <button
 type="button"
 onClick={() => onFilterChange({ theme: '' })}
 className={styles.chipRemoveBtn}
 aria-label="Remove theme filter"
 >
 
 </button>
 </span>
 )}

 <button type="button" onClick={clearAll} className={styles.clearAllBtn}>
 {isEn ? 'Clear all' : 'Wis alle filters'}
 </button>
 </div>
 )}
 </div>
 );
}
