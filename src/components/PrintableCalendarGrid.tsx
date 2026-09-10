'use client';

import React, { useState, useEffect, useTransition } from 'react';
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
  const [activeModalMonth, setActiveModalMonth] = useState<CalendarMonth | null>(null);
  const [pickingForMonth, setPickingForMonth] = useState<CalendarMonth | null>(null);
  
  // Picker state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChip, setActiveChip] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [, startTransition] = useTransition();

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
        setActiveModalMonth(null);
        setPickingForMonth(null);
      }
    };
    if (activeModalMonth || pickingForMonth) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalMonth, pickingForMonth]);

  // Execute drawing search when picker opens or query changes
  useEffect(() => {
    if (!pickingForMonth) return;

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

  // Randomize all 12 months with different seasonal items
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
    if (activeModalMonth && activeModalMonth.monthNumber === pickingForMonth.monthNumber) {
      setActiveModalMonth({
        ...activeModalMonth,
        image: item.image,
        themeTitleEn: item.title,
        themeTitleNl: item.title,
        seasonEn: item.title,
        seasonNl: item.title,
      });
    }
    setPickingForMonth(null);
  };

  const handlePrintAll = () => {
    window.print();
  };

  const daysOfWeekEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysOfWeekNl = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  const daysOfWeek = isEn ? daysOfWeekEn : daysOfWeekNl;

  return (
    <div className={styles.calendarContainer}>
      {/* ── Builder Action Bar ── */}
      <div className={styles.builderBar}>
        <div className={styles.builderLeft}>
          <div className={styles.builderIcon}>🎨</div>
          <div>
            <span className={styles.builderBadge}>
              {isEn ? 'Personalized Calendar Creator' : 'Interactieve Kalender Maker'}
            </span>
            <h2 className={styles.builderTitle}>
              {isEn ? `Create Your Custom ${year} Calendar` : `Maak Je Eigen ${year} Kleurkalender`}
            </h2>
            <p className={styles.builderSubtitle}>
              {isEn
                ? 'Choose your favorite coloring page for each month from 18,000+ designs! Print the complete 12-page calendar in 1 click.'
                : 'Kies voor elke maand zelf je favoriete kleurplaat uit 18.000+ tekeningen! Print jouw complete 12-maanden kalender in 1 klik.'}
            </p>
          </div>
        </div>

        <div className={styles.builderActions}>
          <button
            type="button"
            onClick={handlePrintAll}
            className={styles.printAllBtn}
          >
            <span>🖨️</span>
            <span>{isEn ? `Print Full ${year} Calendar (12 Pages)` : `Print Complete ${year} Kalender (12 Pagina’s)`}</span>
          </button>

          <button
            type="button"
            onClick={randomizeCalendar}
            className={styles.secondaryActionBtn}
            title={isEn ? 'Randomize coloring pages' : 'Willekeurige kleurplaten kiezen'}
          >
            <span>🎲</span>
            <span>{isEn ? 'Surprise Me' : 'Verras Mij'}</span>
          </button>

          <button
            type="button"
            onClick={resetToDefault}
            className={styles.secondaryActionBtn}
            title={isEn ? 'Reset to default calendar' : 'Herstel naar standaard kalender'}
          >
            <span>🔄</span>
            <span>{isEn ? 'Reset' : 'Herstel'}</span>
          </button>
        </div>
      </div>

      {/* ── Quick Preset Theme Bar ── */}
      {themes.length > 0 && (
        <div className={styles.presetSection}>
          <h4 className={styles.presetTitle}>
            <span>⚡</span>
            <span>{isEn ? 'Or pick a 1-click theme for all 12 months:' : 'Of kies een 1-klik snelthema voor alle 12 maanden:'}</span>
          </h4>
          <div className={styles.presetList}>
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyThemePreset(t.id)}
                className={styles.presetChip}
              >
                <span>{t.icon}</span>
                <span>{isEn ? t.titleEn : t.titleNl}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 12 Month Interactive Grid (100% full-width on mobile, 3 cols on desktop) ── */}
      <div className={styles.monthGrid}>
        {months.map((m) => (
          <div key={m.monthNumber} className={styles.monthCard}>
            {/* Header with Month Name */}
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

            {/* Crisp Centered Artwork Area (Click to change drawing) */}
            <div
              className={styles.cardImageContainer}
              onClick={() => setPickingForMonth(m)}
            >
              {m.image ? (
                <SafeImage
                  src={m.image}
                  alt={(isEn ? m.nameEn : m.nameNl) + ' Coloring Page'}
                  width={400}
                  height={280}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ fontSize: '3.5rem' }}>{m.icon}</div>
              )}

              {/* Hover overlay */}
              <div className={styles.changePageOverlay}>
                <span style={{ fontSize: '1.75rem' }}>🎨</span>
                <button type="button" className={styles.changePageButton}>
                  {isEn ? 'Change Drawing' : 'Kleurplaat Wijzigen'}
                </button>
              </div>

              <div className={styles.cardSubtitleText}>
                🎨 {isEn ? m.themeTitleEn : m.themeTitleNl}
              </div>
            </div>

            {/* Card Body & Mini Planning Grid */}
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

              {/* Card Action Buttons */}
              <div className={styles.cardButtonGroup}>
                <button
                  type="button"
                  onClick={() => setPickingForMonth(m)}
                  className={styles.changeDrawingBtn}
                >
                  <span>🎨</span>
                  <span>{isEn ? 'Choose Coloring Page (18k+)' : 'Kleurplaat Kiezen (18.000+)'}</span>
                </button>

                <div className={styles.cardActionRow}>
                  <button
                    type="button"
                    onClick={() => setActiveModalMonth(m)}
                    className={styles.previewCardBtn}
                  >
                    <span>🔍</span>
                    <span>{isEn ? 'A4 Preview' : 'A4 Voorbeeld'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalMonth(m)}
                    className={styles.printCardBtn}
                  >
                    <span>🖨️</span>
                    <span>{isEn ? 'Print Month' : 'Print Maand'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal 1: Drawing Picker (18,000+ Coloring Pages Search & Select) ── */}
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

            {/* Search Input & Category Chips */}
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
                        width={200}
                        height={160}
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
          </div>
        </div>
      )}

      {/* ── Modal 2: Fullscreen A4 Preview & Print Modal ── */}
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
                className={styles.pickerCloseBtn}
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
                onClick={() => {
                  setPickingForMonth(activeModalMonth);
                }}
                className={styles.modalChangeBtn}
              >
                <span>🎨</span>
                <span>{isEn ? 'Change Drawing' : 'Kleurplaat Wijzigen'}</span>
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

      {/* ── Dedicated Print View for 12 Pages ── */}
      <div className={styles.printAllContainer}>
        {months.map((m) => (
          <div key={m.monthNumber} className={styles.printPage}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '0.5cm' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0F172A', margin: 0, textTransform: 'uppercase' }}>
                {(isEn ? m.nameEn : m.nameNl) + ' ' + year}
              </h1>
              <p style={{ margin: '0.3rem 0 0', fontSize: '1.1rem', color: '#64748B', fontStyle: 'italic' }}>
                &ldquo;{isEn ? m.quoteEn : m.quoteNl}&rdquo;
              </p>
            </div>

            <div style={{
              flex: 1,
              margin: '1cm 0',
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
                  style={{ maxWidth: '100%', maxHeight: '420px', objectFit: 'contain' }}
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
              }}>
                {daysOfWeek.map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: '45px',
                gap: '4px',
              }}>
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = i + 1;
                  const isValidDay = dayNum <= m.days;

                  return (
                    <div
                      key={i}
                      style={{
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '4px',
                        padding: '4px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isValidDay ? '#0F172A' : 'transparent',
                        background: isValidDay ? '#FFFFFF' : '#F8FAFC',
                      }}
                    >
                      {isValidDay ? dayNum : ''}
                    </div>
                  );
                })}
              </div>
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