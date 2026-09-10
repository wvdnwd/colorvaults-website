'use client';

import React, { useState, useEffect, useTransition } from 'react';
import SafeImage from './SafeImage';
import { CalendarMonth, CalendarThemeBundle } from '@/data/calendarData';
import { generateMonthGrid } from '@/lib/calendar';
import styles from './PrintableCalendarGrid.module.css';

interface PrintableCalendarProps {
  themes?: CalendarThemeBundle[];
  months?: CalendarMonth[];
  year: number;
  isEn: boolean;
  lang: string;
}

interface SearchItem {
  title: string;
  image: string;
  slug?: string;
  parentTheme?: string;
}

const CATEGORY_CHIPS = [
  { id: 'all', labelEn: '🔥 Popular', labelNl: '🔥 Populair', query: 'cute' },
  { id: 'animals', labelEn: '🐾 Cute Animals', labelNl: '🐾 Schattige Dieren', query: 'animal' },
  { id: 'unicorns', labelEn: '🦄 Fairytales & Unicorns', labelNl: '🦄 Sprookjes & Eenhoorns', query: 'unicorn' },
  { id: 'dinosaurs', labelEn: '🦖 Dinosaurs', labelNl: '🦖 Dinosaurussen', query: 'dinosaur' },
  { id: 'space', labelEn: '🚀 Space & Astronauts', labelNl: '🚀 Ruimtevaart', query: 'space' },
  { id: 'mandalas', labelEn: '🏵️ Mandalas & Mindfulness', labelNl: '🏵️ Mandala’s', query: 'mandala' },
  { id: 'vehicles', labelEn: '🚗 Cars & Vehicles', labelNl: '🚗 Auto’s & Voertuigen', query: 'car' },
  { id: 'nature', labelEn: '🌸 Flowers & Nature', labelNl: '🌸 Bloemen & Natuur', query: 'flower' },
  { id: 'holidays', labelEn: '🎄 Christmas & Holidays', labelNl: '🎄 Kerst & Feestdagen', query: 'christmas' },
  { id: 'halloween', labelEn: '🎃 Halloween & Monsters', labelNl: '🎃 Halloween', query: 'halloween' },
  { id: 'birthday', labelEn: '🎂 Birthday & Party', labelNl: '🎂 Verjaardag & Feest', query: 'birthday' },
  { id: 'ocean', labelEn: '🌊 Ocean & Sea Animals', labelNl: '🌊 Onderwaterwereld', query: 'ocean' },
  { id: 'school', labelEn: '🎒 Back to School', labelNl: '🎒 School & Educatie', query: 'school' },
];

export default function PrintableCalendarGrid({ themes = [], months: initialMonths = [], year, isEn, lang }: PrintableCalendarProps) {
  const [months, setMonths] = useState<CalendarMonth[]>(initialMonths);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);
  const [pickingForMonth, setPickingForMonth] = useState<CalendarMonth | null>(null);
  
  // Picker state
  const [pickerTab, setPickerTab] = useState<'calendarArt' | 'catalog'>('calendarArt');
  const [selectedPickerTheme, setSelectedPickerTheme] = useState<string>('cute-animals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const activeMonth = months[selectedMonthIndex] || months[0];

  // Load saved custom calendar from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`colorvaults_custom_calendar_${year}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 12) {
          setMonths(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, [year]);

  // Save to localStorage whenever months update
  const updateCustomMonths = (newMonths: CalendarMonth[]) => {
    setMonths(newMonths);
    try {
      localStorage.setItem(`colorvaults_custom_calendar_${year}`, JSON.stringify(newMonths));
    } catch {
      // ignore
    }
  };

  // Keyboard escape listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPickingForMonth(null);
      }
    };
    if (pickingForMonth) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [pickingForMonth]);

  // Execute drawing search when picker opens or query changes
  useEffect(() => {
    if (!pickingForMonth || pickerTab !== 'catalog') return;

    let isMounted = true;
    const query = searchQuery.trim() || (CATEGORY_CHIPS.find(c => c.id === activeChip)?.query || 'cute');

    setIsLoadingSearch(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${lang}&type=page`);
        if (res.ok) {
          const data = await res.json();
          const items: SearchItem[] = Array.isArray(data) ? data : (data.pages || []);
          if (isMounted) {
            startTransition(() => {
              setSearchResults(items.slice(0, 48));
              setIsLoadingSearch(false);
            });
          }
        } else {
          if (isMounted) setIsLoadingSearch(false);
        }
      } catch (err) {
        console.error('Search fetch error:', err);
        if (isMounted) setIsLoadingSearch(false);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pickingForMonth, searchQuery, activeChip, lang]);

  // Apply a theme preset to all 12 months
  const applyThemePreset = (themeId: string) => {
    const foundTheme = themes.find(t => t.id === themeId);
    if (foundTheme && foundTheme.months.length === 12) {
      updateCustomMonths(foundTheme.months);
    }
  };

  // Randomize all 12 months
  const randomizeCalendar = () => {
    if (themes.length < 2) return;
    const randomized = months.map((m, idx) => {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const randomMonth = randomTheme.months[idx];
      return {
        ...m,
        image: randomMonth.image,
        themeTitleEn: randomMonth.themeTitleEn,
        themeTitleNl: randomMonth.themeTitleNl,
        seasonEn: randomMonth.seasonEn,
        seasonNl: randomMonth.seasonNl,
      };
    });
    updateCustomMonths(randomized);
  };

  // Reset to original default calendar
  const resetToDefault = () => {
    if (initialMonths.length > 0) {
      updateCustomMonths(initialMonths);
    }
  };

  // Select a specific drawing for a month
  const handleSelectDrawing = (item: SearchItem) => {
    if (!pickingForMonth) return;

    const newMonths = months.map(m => {
      if (m.monthNumber === pickingForMonth.monthNumber) {
        return {
          ...m,
          image: item.image,
          themeTitleEn: item.title,
          themeTitleNl: item.title,
          seasonEn: item.title,
          seasonNl: item.title,
        };
      }
      return m;
    });

    updateCustomMonths(newMonths);
    setPickingForMonth(null);
  };

  const handlePrintCurrentMonth = () => {
    window.print();
  };

  const daysOfWeekEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfWeekNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const daysOfWeek = isEn ? daysOfWeekEn : daysOfWeekNl;

  return (
    <div className={styles.studioContainer}>
      {/* ── 12-Month Switcher Tabs ── */}
      <div className={styles.monthTabsNav}>
        {months.map((m, idx) => {
          const isActive = idx === selectedMonthIndex;
          return (
            <button
              key={m.monthNumber}
              type="button"
              onClick={() => setSelectedMonthIndex(idx)}
              className={`${styles.monthTabBtn} ${isActive ? styles.monthTabBtnActive : ''}`}
            >
              <span>{m.icon}</span>
              <span>{isEn ? m.nameEn : m.nameNl}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Studio Stage (Real A4 Sheet + Control Sidebar) ── */}
      <div className={styles.studioStage}>
        {/* Realistic A4 Paper Sheet */}
        <div className={styles.a4PaperStage}>
          <div className={styles.a4Sheet}>
            {/* Sheet Header */}
            <div className={styles.sheetHeader}>
              <span className={styles.sheetSeasonTag}>
                {isEn ? activeMonth.seasonEn : activeMonth.seasonNl}
              </span>
              <h2 className={styles.sheetTitle}>
                {(isEn ? activeMonth.nameEn : activeMonth.nameNl) + ' ' + year}
              </h2>
              <p className={styles.sheetQuote}>
                &ldquo;{isEn ? activeMonth.quoteEn : activeMonth.quoteNl}&rdquo;
              </p>
            </div>

            {/* 🌟 Big Hero Artwork Frame (Fills allocated space with 0 empty voids) 🌟 */}
            <div
              className={styles.sheetArtworkFrame}
              onClick={() => setPickingForMonth(activeMonth)}
              title={isEn ? 'Click to change coloring page' : 'Klik om kleurplaat te wijzigen'}
            >
              {activeMonth.image ? (
                <SafeImage
                  src={activeMonth.image}
                  alt={(isEn ? activeMonth.nameEn : activeMonth.nameNl) + ' Coloring Page'}
                  width={600}
                  height={440}
                  className={styles.sheetArtworkImage}
                />
              ) : (
                <div style={{ fontSize: '5rem' }}>{activeMonth.icon}</div>
              )}

              {/* Hover overlay */}
              <div className={styles.artworkHoverOverlay}>
                <span style={{ fontSize: '2rem' }}>🎨</span>
                <button type="button" className={styles.overlayChangeBtn}>
                  {isEn ? 'Change Drawing (18,000+)' : 'Kleurplaat Wijzigen (18.000+)'}
                </button>
              </div>

              <div className={styles.drawingCaption}>
                🎨 {isEn ? activeMonth.themeTitleEn : activeMonth.themeTitleNl}
              </div>
            </div>

            {/* Crisp Planner Grid */}
            <div className={styles.sheetPlannerGrid}>
              <div className={styles.plannerDaysHeader}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              {(() => {
                const monthGrid = generateMonthGrid(year, activeMonth.monthNumber);
                return (
                  <div
                    className={styles.plannerDaysGrid}
                    style={{
                      gridTemplateRows: `repeat(${monthGrid.rowCount}, 1fr)`,
                    }}
                  >
                    {monthGrid.cells.map((cell, i) => (
                      <div
                        key={i}
                        className={`${styles.plannerDayBox} ${!cell.isCurrentMonth ? styles.plannerDayBoxEmpty : ''}`}
                      >
                        <span>{cell.dayNumber ?? ''}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className={styles.sheetFooter}>
              © ColorVaults.com • {isEn ? 'Free Printable 12-Month Coloring Calendar' : 'Gratis Printbare 12-Maanden Kleurkalender'}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className={styles.studioSidebar}>
          <div>
            <h3 className={styles.sidebarTitle}>
              {isEn ? '🎨 Customize & Print' : '🎨 Aanpassen & Printen'}
            </h3>
            <p className={styles.sidebarDesc}>
              {isEn
                ? `You are viewing ${activeMonth.nameEn} ${year}. Customize the drawing or print on standard A4 paper!`
                : `Je bekijkt ${activeMonth.nameNl} ${year}. Pas de kleurplaat aan of print direct op A4 papier!`}
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrintCurrentMonth}
            className={styles.actionBtnPrimary}
          >
            <span>🖨️</span>
            <span>{isEn ? `Print ${activeMonth.nameEn} (A4 Page)` : `Print ${activeMonth.nameNl} (A4 Formaat)`}</span>
          </button>

          <button
            type="button"
            onClick={() => setPickingForMonth(activeMonth)}
            className={styles.actionBtnCustom}
          >
            <span>🎨</span>
            <span>{isEn ? 'Choose Coloring Page (18k+)' : 'Kleurplaat Wijzigen (18.000+)'}</span>
          </button>

          <div className={styles.secondaryRow}>
            <button
              type="button"
              onClick={randomizeCalendar}
              className={styles.sidebarSmallBtn}
            >
              <span>🎲</span>
              <span>{isEn ? 'Surprise Me' : 'Verras Mij'}</span>
            </button>

            <button
              type="button"
              onClick={resetToDefault}
              className={styles.sidebarSmallBtn}
            >
              <span>🔄</span>
              <span>{isEn ? 'Reset' : 'Herstel'}</span>
            </button>
          </div>

          {/* 1-Click Themes */}
          {themes.length > 0 && (
            <div className={styles.quickThemesBox}>
              <div className={styles.quickThemesHeader}>
                <span>⚡</span>
                <span>{isEn ? '1-Click Theme Bundles (12 Months):' : '1-Klik Thema Bundels (12 Maanden):'}</span>
              </div>
              <div className={styles.quickThemesList}>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => applyThemePreset(t.id)}
                    className={styles.themeChipBtn}
                  >
                    <span>{t.icon}</span>
                    <span>{isEn ? t.titleEn : t.titleNl}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom 12-Month Gallery Ribbon ── */}
      <div className={styles.allMonthsSection}>
        <div className={styles.allMonthsHeader}>
          <h3 className={styles.allMonthsTitle}>
            {isEn ? `📅 All 12 Months of ${year}:` : `📅 Alle 12 Maanden van ${year}:`}
          </h3>

          <button
            type="button"
            onClick={handlePrintCurrentMonth}
            className={styles.actionBtnPrimary}
            style={{ width: 'auto', padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
          >
            <span>🖨️</span>
            <span>{isEn ? `Print Complete ${year} Calendar (12 Pages)` : `Print Complete ${year} Kalender (12 Pagina’s)`}</span>
          </button>
        </div>

        <div className={styles.monthsMiniGrid}>
          {months.map((m, idx) => {
            const isActive = idx === selectedMonthIndex;
            return (
              <div
                key={m.monthNumber}
                onClick={() => {
                  setSelectedMonthIndex(idx);
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`${styles.miniMonthCard} ${isActive ? styles.miniMonthCardActive : ''}`}
              >
                <div className={styles.miniImageFrame}>
                  {m.image ? (
                    <SafeImage
                      src={m.image}
                      alt={m.nameEn}
                      width={160}
                      height={130}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '2.5rem' }}>{m.icon}</span>
                  )}
                </div>
                <h4 className={styles.miniTitle}>
                  {isEn ? m.nameEn : m.nameNl}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Drawing Picker Modal (18,000+ Coloring Pages Search & Select) ── */}
      {pickingForMonth && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPickingForMonth(null)}
          className={styles.pickerOverlay}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.pickerModal}
          >
            {/* Picker Header */}
            <div className={styles.pickerHeader}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                  {isEn ? 'Custom Calendar Builder' : 'Kleurplaat Selecteren'}
                </span>
                <h3 className={styles.pickerTitle}>
                  {isEn
                    ? `Choose Drawing for ${pickingForMonth.nameEn} ${year}`
                    : `Kies Kleurplaat voor ${pickingForMonth.nameNl} ${year}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPickingForMonth(null)}
                className={styles.pickerCloseBtn}
                aria-label={isEn ? 'Close picker' : 'Sluiten'}
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs: Dedicated Calendar Art (34 Themes / 408 Designs) vs Search 18k Catalog */}
            <div style={{ padding: '0.85rem 1.75rem 0', background: '#F8FAFC' }}>
              <div className={styles.pickerModeTabs}>
                <button
                  type="button"
                  onClick={() => setPickerTab('calendarArt')}
                  className={`${styles.pickerModeTab} ${pickerTab === 'calendarArt' ? styles.pickerModeTabActive : ''}`}
                >
                  <span>📅</span>
                  <span>{isEn ? 'Dedicated Calendar Art (34 Themes)' : 'Speciale Kalenderplaten (34 Thema’s)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPickerTab('catalog')}
                  className={`${styles.pickerModeTab} ${pickerTab === 'catalog' ? styles.pickerModeTabActive : ''}`}
                >
                  <span>🔍</span>
                  <span>{isEn ? 'Search 18,000+ Catalog' : 'Zoek in 18.000+ Catalogus'}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DEDICATED CALENDAR ART */}
            {pickerTab === 'calendarArt' && (
              <>
                <div className={styles.pickerControls}>
                  <div className={styles.themeSelectorRow}>
                    <label htmlFor="calendar-theme-select" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155' }}>
                      {isEn ? 'Select Theme Bundle:' : 'Selecteer Thema:'}
                    </label>
                    <select
                      id="calendar-theme-select"
                      value={selectedPickerTheme}
                      onChange={(e) => setSelectedPickerTheme(e.target.value)}
                      className={styles.themeSelectDropdown}
                    >
                      {themes.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.icon} {isEn ? t.titleEn : t.titleNl} (12 Designs)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.pickerGrid}>
                  {(() => {
                    const currentThemeBundle = themes.find(t => t.id === selectedPickerTheme) || themes[0];
                    if (!currentThemeBundle) return null;

                    return currentThemeBundle.months.map((itemMonth) => {
                      const itemTitle = isEn ? itemMonth.themeTitleEn : itemMonth.themeTitleNl;
                      return (
                        <div
                          key={itemMonth.monthNumber}
                          className={styles.pickerCard}
                          onClick={() => handleSelectDrawing({
                            title: itemTitle,
                            image: itemMonth.image,
                          })}
                        >
                          <div className={styles.pickerCardImageWrapper}>
                            <SafeImage
                              src={itemMonth.image}
                              alt={itemTitle}
                              width={220}
                              height={180}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          <p className={styles.pickerCardTitle} title={itemTitle}>
                            {itemMonth.icon} {isEn ? itemMonth.nameEn : itemMonth.nameNl} ({itemTitle})
                          </p>
                          <button
                            type="button"
                            className={styles.pickerCardSelectBtn}
                          >
                            ✨ {isEn ? `Select for ${pickingForMonth.nameEn}` : `Kies voor ${pickingForMonth.nameNl}`}
                          </button>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            )}

            {/* TAB 2: SEARCH 18K CATALOG */}
            {pickerTab === 'catalog' && (
              <>
                <div className={styles.pickerControls}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveChip('');
                    }}
                    placeholder={isEn
                      ? '🔍 Search 18,000+ coloring pages... (e.g. unicorn, dinosaur, flowers, mandala, cat)'
                      : '🔍 Zoek in 18.000+ kleurplaten... (bijv. eenhoorn, dino, bloemen, mandala, hond)'}
                    className={styles.pickerSearchInput}
                    autoFocus
                  />

                  <div className={styles.pickerChips}>
                    {CATEGORY_CHIPS.map((chip) => {
                      const isActive = activeChip === chip.id;
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => {
                            setActiveChip(chip.id);
                            setSearchQuery('');
                          }}
                          className={`${styles.pickerChip} ${isActive ? styles.pickerChipActive : ''}`}
                        >
                          {isEn ? chip.labelEn : chip.labelNl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results Grid */}
                <div className={styles.pickerGrid}>
                  {isLoadingSearch ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                      <p style={{ fontWeight: 700 }}>
                        {isEn ? 'Searching 18,000+ coloring pages...' : '18.000+ kleurplaten doorzoeken...'}
                      </p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((item, idx) => (
                      <div
                        key={idx}
                        className={styles.pickerCard}
                        onClick={() => handleSelectDrawing(item)}
                      >
                        <div className={styles.pickerCardImageWrapper}>
                          <SafeImage
                            src={item.image}
                            alt={item.title}
                            width={220}
                            height={180}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <p className={styles.pickerCardTitle} title={item.title}>
                          {item.title}
                        </p>
                        <button
                          type="button"
                          className={styles.pickerCardSelectBtn}
                        >
                          ✨ {isEn ? `Select for ${pickingForMonth.nameEn}` : `Kies voor ${pickingForMonth.nameNl}`}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                      <p style={{ fontWeight: 700 }}>
                        {isEn ? 'No coloring pages found. Try another search term!' : 'Geen kleurplaten gevonden. Probeer een andere zoekterm!'}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Dedicated Print View for 12 Pages ── */}
      <div className={styles.printAllContainer}>
        {months.map((m) => (
          <div key={m.monthNumber} className={styles.printPage}>
            <div style={{ textAlign: 'center', borderBottom: '2.5px solid #0F172A', paddingBottom: '0.5cm' }}>
              <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#0F172A', margin: 0, textTransform: 'uppercase' }}>
                {(isEn ? m.nameEn : m.nameNl) + ' ' + year}
              </h1>
              <p style={{ margin: '0.3rem 0 0', fontSize: '1.1rem', color: '#64748B', fontStyle: 'italic' }}>
                &ldquo;{isEn ? m.quoteEn : m.quoteNl}&rdquo;
              </p>
            </div>

            <div style={{
              flex: 1,
              margin: '0.8cm 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
            }}>
              {m.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.image}
                  alt={m.nameEn}
                  style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' }}
                />
              ) : null}
            </div>

            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: '1rem',
                color: '#0F172A',
                marginBottom: '0.3cm',
                borderBottom: '1.5px solid #E2E8F0',
                paddingBottom: '0.2cm',
              }}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              {(() => {
                const mGrid = generateMonthGrid(year, m.monthNumber);
                return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridAutoRows: mGrid.rowCount === 6 ? '38px' : '45px',
                    gap: '4px',
                  }}>
                    {mGrid.cells.map((cell, i) => (
                      <div
                        key={i}
                        style={{
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '4px',
                          padding: '4px',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: cell.isCurrentMonth ? '#0F172A' : 'transparent',
                          background: cell.isCurrentMonth ? '#FFFFFF' : '#F8FAFC',
                        }}
                      >
                        {cell.dayNumber ?? ''}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.5cm' }}>
              © ColorVaults.com • {isEn ? 'Free Printable Coloring Calendar' : 'Gratis Printbare Kleurkalender'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}