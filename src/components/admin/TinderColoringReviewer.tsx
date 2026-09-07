'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import SafeImage from '@/components/SafeImage';

export interface ReviewColoringPage {
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  titleNl?: string;
  shortDescription?: string;
  image: string;
  reviewed?: boolean;
}

interface ThemeOption {
  slug: string;
  title: string;
  parentHub: string;
}

interface TinderReviewerProps {
  initialPages: ReviewColoringPage[];
  themes: ThemeOption[];
}

interface HistoryAction {
  type: 'approve' | 'reject' | 'move';
  page: ReviewColoringPage;
  prevTheme?: { hub: string; theme: string };
  prevTitles?: { en: string; nl: string };
}

export default function TinderColoringReviewer({ initialPages, themes }: TinderReviewerProps) {
  const [pages, setPages] = useState<ReviewColoringPage[]>(initialPages);
  const [selectedTheme, setSelectedTheme] = useState<string>(themes[0]?.slug || 'all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [hideReviewed, setHideReviewed] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadingTheme, setLoadingTheme] = useState<boolean>(false);

  // Editable titles
  const [singleLanguageMode, setSingleLanguageMode] = useState<boolean>(true);
  const [editTitleEn, setEditTitleEn] = useState<string>('');
  const [editTitleNl, setEditTitleNl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null);

  // Move Modal State
  const [isMoveModalOpen, setIsMoveModalOpen] = useState<boolean>(false);
  const [themeSearch, setThemeSearch] = useState<string>('');

  // Zoom / Lightbox
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Undo Stack & Notifications
  const [historyStack, setHistoryStack] = useState<HistoryAction[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Motion Values for Touch/Mouse Drag & Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const approveOpacity = useTransform(x, [40, 150], [0, 1]);
  const rejectOpacity = useTransform(x, [-40, -150], [0, 1]);
  const moveOpacity = useTransform(y, [-40, -150], [0, 1]);

  // Dynamic theme loader
  useEffect(() => {
    let active = true;
    async function loadTheme() {
      setLoadingTheme(true);
      try {
        const url = `/api/admin/coloring-pages?theme=${encodeURIComponent(selectedTheme)}&withNl=true`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.pages)) {
            setPages(data.pages);
            setCurrentIndex(0);
          }
        }
      } catch (err) {
        console.error('Failed to load theme for review:', err);
      } finally {
        if (active) setLoadingTheme(false);
      }
    }
    loadTheme();
    return () => { active = false; };
  }, [selectedTheme]);

  // Themes lookup
  const themeMap = useMemo(() => {
    const map = new Map<string, ThemeOption>();
    themes.forEach(t => map.set(t.slug, t));
    return map;
  }, [themes]);

  // Filtered queue of pages for review
  const activeQueue = useMemo(() => {
    return pages.filter(p => {
      if (selectedTheme !== 'all' && p.parentTheme !== selectedTheme) return false;
      if (selectedAge !== 'all' && p.ageGroup !== selectedAge) return false;
      if (hideReviewed && p.reviewed) return false;
      return true;
    });
  }, [pages, selectedTheme, selectedAge, hideReviewed]);

  const currentPage = activeQueue[currentIndex] || null;

  const [editAgeGroup, setEditAgeGroup] = useState<string>('kids');

  // Sync title and age inputs when current page changes
  useEffect(() => {
    if (currentPage) {
      setEditTitleEn(currentPage.title || '');
      setEditTitleNl(currentPage.titleNl || currentPage.title || '');
      setEditAgeGroup(currentPage.ageGroup || 'kids');
    }
  }, [currentPage]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedTheme, selectedAge, hideReviewed]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleSkip = useCallback(() => {
    if (isProcessing) return;
    if (currentIndex < activeQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      showNotification('⏭️ Kleurplaat overgeslagen');
    } else {
      showNotification('🏁 Einde van de lijst bereikt');
    }
  }, [activeQueue.length, currentIndex, isProcessing]);

  const cleanTitle = (raw: string) => {
    return raw
      .replace(/_\d{10,14}$/, '')
      .replace(/^[a-zA-Z0-9_-]+__A_clean_printable_colo_/, '')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // 1. APPROVE ACTION (Groen Vinkje / Swipe Right)
  const handleApprove = useCallback(async () => {
    if (!currentPage || isProcessing) return;
    setIsProcessing(true);
    setExitDirection('right');

    const updatedPage: ReviewColoringPage = {
      ...currentPage,
      title: editTitleEn.trim() || currentPage.title,
      titleNl: editTitleNl.trim() || currentPage.title,
      reviewed: true,
    };

    setHistoryStack(prev => [{
      type: 'approve',
      page: currentPage,
      prevTitles: { en: currentPage.title, nl: currentPage.titleNl || currentPage.title }
    }, ...prev.slice(0, 25)]);

    setPages(prev => prev.map(p => 
      p.slug === currentPage.slug && p.parentTheme === currentPage.parentTheme ? updatedPage : p
    ));

    showNotification(`✔️ "${updatedPage.title}" goedgekeurd!`);

    setTimeout(() => {
      setExitDirection(null);
      setIsProcessing(false);
      x.set(0);
      y.set(0);
    }, 250);

    try {
      await fetch('/api/admin/coloring-pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: currentPage.slug,
          parentHub: currentPage.parentHub,
          parentTheme: currentPage.parentTheme,
          title: updatedPage.title,
          titleNl: updatedPage.titleNl,
          ageGroup: editAgeGroup || currentPage.ageGroup,
          reviewed: true,
        }),
      });
    } catch (e) {
      console.error('Approve error:', e);
    }
  }, [currentPage, editTitleEn, editTitleNl, isProcessing, x, y]);

  // 2. REJECT ACTION (Rood Kruis / Swipe Left)
  const handleReject = useCallback(async () => {
    if (!currentPage || isProcessing) return;
    setIsProcessing(true);
    setExitDirection('left');

    const rejected = currentPage;

    setHistoryStack(prev => [{
      type: 'reject',
      page: rejected,
    }, ...prev.slice(0, 25)]);

    setPages(prev => prev.filter(p => 
      !(p.slug === rejected.slug && p.parentTheme === rejected.parentTheme)
    ));

    showNotification(`❌ "${rejected.title}" afgekeurd & verwijderd`);

    setTimeout(() => {
      setExitDirection(null);
      setIsProcessing(false);
      x.set(0);
      y.set(0);
    }, 250);

    try {
      await fetch('/api/admin/coloring-pages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: rejected.slug,
          parentHub: rejected.parentHub,
          parentTheme: rejected.parentTheme,
        }),
      });
    } catch (e) {
      console.error('Reject error:', e);
    }
  }, [currentPage, isProcessing, x, y]);

  // 3. MOVE TO ANOTHER ALBUM ACTION (Mapje / Swipe Up)
  const handleMoveTheme = useCallback(async (targetThemeSlug: string) => {
    if (!currentPage || !targetThemeSlug || isProcessing) return;
    const targetThemeObj = themeMap.get(targetThemeSlug);
    if (!targetThemeObj) return;

    setIsProcessing(true);
    setExitDirection('up');
    setIsMoveModalOpen(false);

    const movedPage: ReviewColoringPage = {
      ...currentPage,
      parentHub: targetThemeObj.parentHub,
      parentTheme: targetThemeObj.slug,
      title: editTitleEn.trim() || currentPage.title,
      titleNl: editTitleNl.trim() || currentPage.title,
      reviewed: true,
    };

    setHistoryStack(prev => [{
      type: 'move',
      page: currentPage,
      prevTheme: { hub: currentPage.parentHub, theme: currentPage.parentTheme }
    }, ...prev.slice(0, 25)]);

    setPages(prev => prev.map(p => 
      p.slug === currentPage.slug && p.parentTheme === currentPage.parentTheme ? movedPage : p
    ));

    showNotification(`📁 Verplaatst naar "${targetThemeObj.title}"!`);

    setTimeout(() => {
      setExitDirection(null);
      setIsProcessing(false);
      x.set(0);
      y.set(0);
    }, 250);

    try {
      await fetch('/api/admin/coloring-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'move',
          slug: currentPage.slug,
          parentHub: currentPage.parentHub,
          parentTheme: currentPage.parentTheme,
          targetHub: targetThemeObj.parentHub,
          targetTheme: targetThemeObj.slug,
          title: movedPage.title,
          titleNl: movedPage.titleNl,
        }),
      });
    } catch (e) {
      console.error('Move error:', e);
    }
  }, [currentPage, editTitleEn, editTitleNl, isProcessing, themeMap, x, y]);

  // 4. UNDO ACTION (Ctrl+Z)
  const handleUndo = useCallback(async () => {
    if (historyStack.length === 0 || isProcessing) return;
    const lastAction = historyStack[0];
    setHistoryStack(prev => prev.slice(1));

    if (lastAction.type === 'reject') {
      setPages(prev => [lastAction.page, ...prev]);
      showNotification(`↩️ Hersteld: "${lastAction.page.title}"`);
      await fetch('/api/admin/coloring-pages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: lastAction.page.slug,
          parentHub: lastAction.page.parentHub,
          parentTheme: lastAction.page.parentTheme,
          title: lastAction.page.title,
          reviewed: false,
        }),
      });
    } else if (lastAction.type === 'approve') {
      setPages(prev => prev.map(p => 
        p.slug === lastAction.page.slug && p.parentTheme === lastAction.page.parentTheme
          ? { ...lastAction.page, reviewed: false }
          : p
      ));
      showNotification(`↩️ Goedkeuring ongedaan gemaakt`);
    } else if (lastAction.type === 'move' && lastAction.prevTheme) {
      setPages(prev => prev.map(p => 
        p.slug === lastAction.page.slug
          ? { ...lastAction.page, parentHub: lastAction.prevTheme!.hub, parentTheme: lastAction.prevTheme!.theme }
          : p
      ));
      showNotification(`↩️ Verplaatsing ongedaan gemaakt`);
    }
  }, [historyStack, isProcessing]);

  // Touch / Drag End Handler (Tinder Swipe)
  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    const swipeThreshold = 100;
    const swipeVelocity = 500;

    // Horizontal Swipes
    if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      handleApprove();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      handleReject();
    } 
    // Vertical Up Swipe (Move Album)
    else if (info.offset.y < -swipeThreshold || info.velocity.y < -swipeVelocity) {
      setIsMoveModalOpen(true);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleApprove();
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        handleApprove();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' || e.key === 'Backspace') {
        e.preventDefault();
        handleReject();
      } else if (e.key === 'ArrowUp' || e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMoveModalOpen(true);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleSkip();
      } else if (e.key === '1') {
        e.preventDefault();
        setEditAgeGroup('toddlers');
        showNotification('👶 Leeftijd gezet op: Peuters (1-3 Jaar)');
      } else if (e.key === '2') {
        e.preventDefault();
        setEditAgeGroup('kids');
        showNotification('🧒 Leeftijd gezet op: Kinderen (4-8 Jaar)');
      } else if (e.key === '3') {
        e.preventDefault();
        setEditAgeGroup('teens');
        showNotification('🧑 Leeftijd gezet op: Tieners (9-12 Jaar)');
      } else if (e.key === '4') {
        e.preventDefault();
        setEditAgeGroup('adults');
        showNotification('🎨 Leeftijd gezet op: Volwassenen (13+)');
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsZoomed(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleApprove, handleReject, handleUndo, handleSkip]);

  const currentThemeTitle = currentPage 
    ? (themeMap.get(currentPage.parentTheme)?.title || currentPage.parentTheme)
    : 'Selecteer album';

  const totalInCurrentFilter = activeQueue.length;
  const progressPercent = totalInCurrentFilter > 0 
    ? Math.min(100, Math.round(((currentIndex) / totalInCurrentFilter) * 100))
    : 100;

  const filteredThemes = useMemo(() => {
    if (!themeSearch.trim()) return themes;
    const q = themeSearch.toLowerCase();
    return themes.filter(t => t.title.toLowerCase().includes(q) || t.slug.includes(q));
  }, [themes, themeSearch]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem', touchAction: 'pan-y' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#071417',
          color: '#FDF6E9',
          border: '1px solid #FF6B4A',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          padding: '0.8rem 1.4rem',
          borderRadius: '12px',
          zIndex: 9999,
          fontWeight: 600,
        }}>
          {notification}
        </div>
      )}

      {/* TOP CONTROL BAR */}
      <div style={{
        background: '#071417',
        border: '1px solid rgba(253, 246, 233, 0.08)',
        borderRadius: '16px',
        padding: '1.2rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          
          {/* Album / Theme Selector */}
          <div style={{ flex: '1 1 280px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.5)', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
              📁 Huidig Album / Thema
            </label>
            <select
              value={selectedTheme}
              onChange={e => setSelectedTheme(e.target.value)}
              style={{
                width: '100%',
                background: '#0a1b1c',
                border: '1px solid rgba(253, 246, 233, 0.15)',
                color: '#FDF6E9',
                padding: '0.6rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                outline: 'none',
              }}
            >
              <option value="all">🌟 Alle Albums & Thema&apos;s</option>
              {themes.map(t => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Age Group Selector */}
          <div style={{ flex: '0 1 140px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.5)', textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
              👶 Leeftijd
            </label>
            <select
              value={selectedAge}
              onChange={e => setSelectedAge(e.target.value)}
              style={{
                width: '100%',
                background: '#0a1b1c',
                border: '1px solid rgba(253, 246, 233, 0.15)',
                color: '#FDF6E9',
                padding: '0.6rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            >
              <option value="all">Alle Leeftijden</option>
              <option value="toddlers">Peuters (Toddlers)</option>
              <option value="kids">Kinderen (Kids)</option>
              <option value="teens">Tieners (Teens)</option>
              <option value="adults">Volwassenen (Adults)</option>
            </select>
          </div>

          {/* Filter Reviewed checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-end', paddingBottom: '0.4rem' }}>
            <input
              type="checkbox"
              id="hideReviewedCheckbox"
              checked={hideReviewed}
              onChange={e => setHideReviewed(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#FF6B4A', cursor: 'pointer' }}
            />
            <label htmlFor="hideReviewedCheckbox" style={{ fontSize: '0.85rem', color: 'rgba(253, 246, 233, 0.8)', cursor: 'pointer' }}>
              Alleen nog te keuren
            </label>
          </div>

          {/* Undo Button */}
          <div style={{ alignSelf: 'flex-end' }}>
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              title="Herstel laatste actie (Ctrl+Z)"
              style={{
                background: historyStack.length > 0 ? 'rgba(253, 246, 233, 0.08)' : 'transparent',
                border: '1px solid rgba(253, 246, 233, 0.15)',
                color: historyStack.length > 0 ? '#FDF6E9' : 'rgba(253, 246, 233, 0.3)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: historyStack.length > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>↩️</span> Undo ({historyStack.length})
            </button>
          </div>

        </div>

        {/* Progress bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.6)', marginBottom: '0.4rem' }}>
            <span>Voortgang in {selectedTheme === 'all' ? 'alle mappen' : currentThemeTitle}:</span>
            <span style={{ fontWeight: 700, color: '#FF6B4A' }}>
              {currentPage ? `${currentIndex + 1} / ${totalInCurrentFilter}` : '0 / 0'} ({progressPercent}%)
            </span>
          </div>
          <div style={{ height: '6px', width: '100%', background: 'rgba(253, 246, 233, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #FF6B4A, #2ecc71)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      </div>

      {/* TINDER SWIPEABLE CARD CONTAINER */}
      {currentPage ? (
        <div style={{ position: 'relative', width: '100%', minHeight: '620px', perspective: 1000 }}>
          
          <AnimatePresence>
            <motion.div
              key={currentPage.slug + currentPage.parentTheme}
              style={{
                x,
                y,
                rotate,
                position: 'relative',
                background: '#071417',
                border: '1px solid rgba(253, 246, 233, 0.12)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                touchAction: 'none',
                cursor: 'grab',
                userSelect: 'none',
              }}
              drag={true}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: 'grabbing' }}
              animate={
                exitDirection === 'left' 
                  ? { x: -500, rotate: -25, opacity: 0 }
                  : exitDirection === 'right'
                  ? { x: 500, rotate: 25, opacity: 0 }
                  : exitDirection === 'up'
                  ? { y: -500, opacity: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.25 }}
            >

              {/* DYNAMIC SWIPE OVERLAYS (STAMPS) */}
              {/* Green Approve Stamp */}
              <motion.div
                style={{
                  opacity: approveOpacity,
                  position: 'absolute',
                  top: '30px',
                  left: '30px',
                  zIndex: 20,
                  border: '4px solid #2ecc71',
                  color: '#2ecc71',
                  background: 'rgba(7, 20, 23, 0.85)',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  transform: 'rotate(-12deg)',
                  pointerEvents: 'none',
                  boxShadow: '0 0 20px rgba(46, 204, 113, 0.5)',
                }}
              >
                ✔️ GOEDKEUREN
              </motion.div>

              {/* Red Reject Stamp */}
              <motion.div
                style={{
                  opacity: rejectOpacity,
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  zIndex: 20,
                  border: '4px solid #e74c3c',
                  color: '#e74c3c',
                  background: 'rgba(7, 20, 23, 0.85)',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  transform: 'rotate(12deg)',
                  pointerEvents: 'none',
                  boxShadow: '0 0 20px rgba(231, 76, 60, 0.5)',
                }}
              >
                ❌ AFKEUREN
              </motion.div>

              {/* Blue Move Album Stamp */}
              <motion.div
                style={{
                  opacity: moveOpacity,
                  position: 'absolute',
                  bottom: '120px',
                  left: '50%',
                  x: '-50%',
                  zIndex: 20,
                  border: '4px solid #3498db',
                  color: '#3498db',
                  background: 'rgba(7, 20, 23, 0.85)',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '12px',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  pointerEvents: 'none',
                  boxShadow: '0 0 20px rgba(52, 152, 219, 0.5)',
                }}
              >
                📁 VERPLAATSEN
              </motion.div>

              {/* Card Header Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                background: 'rgba(253, 246, 233, 0.03)',
                borderBottom: '1px solid rgba(253, 246, 233, 0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255, 107, 74, 0.15)', color: '#FF6B4A', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                    {currentPage.parentHub}
                  </span>
                  <span style={{ color: 'rgba(253, 246, 233, 0.4)' }}>➔</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FDF6E9' }}>
                    {currentThemeTitle}
                  </span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(253, 246, 233, 0.1)', color: 'rgba(253, 246, 233, 0.8)', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'capitalize' }}>
                    {currentPage.ageGroup}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'rgba(253, 246, 233, 0.4)', fontFamily: 'monospace' }}>
                  {currentPage.slug}
                </div>
              </div>

              {/* Large Image Preview with Touch/Click Zoom */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '440px',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
                onClick={(e) => {
                  // Only zoom if not dragging
                  if (Math.abs(x.get()) < 5 && Math.abs(y.get()) < 5) {
                    setIsZoomed(true);
                  }
                }}
              >
                <SafeImage
                  src={currentPage.image}
                  alt={currentPage.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem', pointerEvents: 'none' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  pointerEvents: 'none',
                }}>
                  👆 Swipe links (afkeuren) of rechts (goedkeuren)
                </div>
              </div>

              {/* Editable Details & Actions */}
              <div style={{ padding: '1.5rem', background: '#071417' }} onPointerDown={e => e.stopPropagation()}>

                {/* Quick Age Group Selector (1, 2, 3, 4) */}
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.6)', fontWeight: 600 }}>
                    🎯 Doelgroep (toets 1-4):
                  </span>
                  {[
                    { id: 'toddlers', label: '👶 Peuters (1)', num: '1' },
                    { id: 'kids', label: '🧒 Kinderen (2)', num: '2' },
                    { id: 'teens', label: '🧑 Tieners (3)', num: '3' },
                    { id: 'adults', label: '🎨 Volwassenen (4)', num: '4' },
                  ].map(age => {
                    const isSelected = editAgeGroup === age.id;
                    return (
                      <button
                        key={age.id}
                        type="button"
                        onClick={() => {
                          setEditAgeGroup(age.id);
                          showNotification(`Leeftijdsgroep gezet op: ${age.label}`);
                        }}
                        style={{
                          background: isSelected ? '#FF6B4A' : 'rgba(253, 246, 233, 0.06)',
                          border: `1px solid ${isSelected ? '#FF6B4A' : 'rgba(253, 246, 233, 0.15)'}`,
                          color: isSelected ? '#ffffff' : 'rgba(253, 246, 233, 0.8)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {age.label}
                      </button>
                    );
                  })}
                </div>

                {singleLanguageMode ? (
                  /* ── 1-Taal Turbo Modus (Auto-Sync) ── */
                  <div style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.75rem', color: '#FF6B4A', fontWeight: 700 }}>
                          ⚡ Titel (Auto-Sync naar alle talen & partitions)
                        </label>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(253, 246, 233, 0.4)' }}>
                          • 1x aanpassen = overal live geüpdatet
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const cleaned = cleanTitle(editTitleNl || editTitleEn);
                            setEditTitleNl(cleaned);
                            setEditTitleEn(cleaned);
                            showNotification('🪄 Titel opgeschoond!');
                          }}
                          style={{ background: 'rgba(255, 107, 74, 0.1)', border: '1px solid rgba(255, 107, 74, 0.3)', color: '#FF6B4A', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          🪄 Schoonmaken
                        </button>
                        <button
                          type="button"
                          onClick={() => setSingleLanguageMode(false)}
                          style={{ background: 'none', border: 'none', color: 'rgba(253, 246, 233, 0.5)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          🌐 2 Talen apart tonen
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={editTitleNl || editTitleEn}
                      onChange={e => {
                        const val = e.target.value;
                        setEditTitleNl(val);
                        setEditTitleEn(val);
                      }}
                      placeholder="Bijv. Pikachu met heksenhoed..."
                      style={{
                        width: '100%',
                        background: '#0a1b1c',
                        border: '1px solid rgba(255, 107, 74, 0.3)',
                        color: '#FDF6E9',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        outline: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                ) : (
                  /* ── Geavanceerd: 2 Talen Apart ── */
                  <div style={{ marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.3rem' }}>
                      <button
                        type="button"
                        onClick={() => setSingleLanguageMode(true)}
                        style={{ background: 'none', border: 'none', color: '#FF6B4A', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        ⚡ Terug naar 1-Taal Turbo Modus
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {/* Dutch Title Input */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label style={{ fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.6)', fontWeight: 600 }}>
                            🇳🇱 Nederlandse Titel
                          </label>
                          <button
                            type="button"
                            onClick={() => setEditTitleNl(cleanTitle(editTitleNl))}
                            style={{ background: 'none', border: 'none', color: '#FF6B4A', fontSize: '0.7rem', cursor: 'pointer' }}
                          >
                            🪄 Schoonmaken
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editTitleNl}
                          onChange={e => setEditTitleNl(e.target.value)}
                          placeholder="Bijv. Beerus laadt een energiebol..."
                          style={{
                            width: '100%',
                            background: '#0a1b1c',
                            border: '1px solid rgba(253, 246, 233, 0.15)',
                            color: '#FDF6E9',
                            padding: '0.7rem 0.9rem',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* English Title Input */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <label style={{ fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.6)', fontWeight: 600 }}>
                            🇬🇧 English Title
                          </label>
                          <button
                            type="button"
                            onClick={() => setEditTitleEn(cleanTitle(editTitleEn))}
                            style={{ background: 'none', border: 'none', color: '#FF6B4A', fontSize: '0.7rem', cursor: 'pointer' }}
                          >
                            🪄 Clean up
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editTitleEn}
                          onChange={e => setEditTitleEn(e.target.value)}
                          placeholder="E.g. Beerus charges energy sphere..."
                          style={{
                            width: '100%',
                            background: '#0a1b1c',
                            border: '1px solid rgba(253, 246, 233, 0.15)',
                            color: '#FDF6E9',
                            padding: '0.7rem 0.9rem',
                            borderRadius: '8px',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4 ACTION BUTTONS: REJECT, MOVE, SKIP, APPROVE */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.8rem',
                  paddingTop: '0.5rem',
                }}>
                  
                  {/* 🔴 RED REJECT BUTTON */}
                  <button
                    onClick={handleReject}
                    disabled={isProcessing}
                    title="Afkeuren & Verwijderen (Swipe Links / Pijltje Links / Backspace)"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                      border: '3px solid rgba(231, 76, 60, 0.4)',
                      color: '#ffffff',
                      fontSize: '1.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(231, 76, 60, 0.4)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  >
                    ✕
                  </button>

                  {/* 📁 BLUE/AMBER MOVE ALBUM BUTTON */}
                  <button
                    onClick={() => setIsMoveModalOpen(true)}
                    disabled={isProcessing}
                    title="Verplaats naar ander thema (Swipe Omhoog / Pijltje Omhoog)"
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3498db, #2980b9)',
                      border: '3px solid rgba(52, 152, 219, 0.4)',
                      color: '#ffffff',
                      fontSize: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.35)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  >
                    📁
                  </button>

                  {/* ⏭️ GREY/AMBER SKIP BUTTON */}
                  <button
                    onClick={handleSkip}
                    disabled={isProcessing}
                    title="Overslaan naar volgende (Pijltje Omlaag / S)"
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7f8c8d, #34495e)',
                      border: '3px solid rgba(127, 140, 141, 0.4)',
                      color: '#ffffff',
                      fontSize: '1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  >
                    ⏭️
                  </button>

                  {/* 🟢 GREEN APPROVE BUTTON */}
                  <button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    title="Goedkeuren & Opslaan (Swipe Rechts / Pijltje Rechts / Enter)"
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                      border: '3px solid rgba(46, 204, 113, 0.4)',
                      color: '#ffffff',
                      fontSize: '2.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(46, 204, 113, 0.4)',
                      transition: 'transform 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  >
                    ✓
                  </button>
                </div>

                {/* Keyboard Shortcut Legend Bar */}
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.8rem',
                  borderTop: '1px solid rgba(253, 246, 233, 0.08)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  fontSize: '0.75rem',
                  color: 'rgba(253, 246, 233, 0.5)',
                }}>
                  <span>⌨️ <strong>←</strong> Afkeuren</span>
                  <span><strong>→ / Enter</strong> Goedkeuren</span>
                  <span><strong>↑</strong> Verplaatsen</span>
                  <span><strong>↓ / S</strong> Overslaan</span>
                  <span><strong>1-4</strong> Leeftijd</span>
                  <span><strong>Space</strong> Zoom</span>
                  <span><strong>Ctrl+Z</strong> Herstellen</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      ) : (
        /* FINISHED SCREEN */
        <div style={{
          background: '#071417',
          border: '1px solid rgba(253, 246, 233, 0.1)',
          borderRadius: '24px',
          padding: '4rem 2rem',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', color: '#2ecc71', marginBottom: '0.5rem' }}>
            Helemaal klaar!
          </h2>
          <p style={{ color: 'rgba(253, 246, 233, 0.7)', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Alle kleurplaten in deze selectie zijn gecontroleerd en goedgekeurd.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setHideReviewed(false);
                setCurrentIndex(0);
              }}
              style={{
                background: 'rgba(253, 246, 233, 0.1)',
                border: '1px solid rgba(253, 246, 233, 0.2)',
                color: '#FDF6E9',
                padding: '0.8rem 1.4rem',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Toon alle platen opnieuw
            </button>
            <button
              onClick={() => {
                setSelectedTheme('all');
                setHideReviewed(true);
              }}
              style={{
                background: '#FF6B4A',
                border: 'none',
                color: '#ffffff',
                padding: '0.8rem 1.4rem',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Volgende categorie bekijken ➔
            </button>
          </div>
        </div>
      )}

      {/* MOVE ALBUM MODAL */}
      {isMoveModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '1rem',
        }} onClick={() => setIsMoveModalOpen(false)}>
          
          <div style={{
            background: '#071417',
            border: '1px solid rgba(253, 246, 233, 0.15)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(253, 246, 233, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#FDF6E9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📁 Verplaats naar ander album
              </h3>
              <button
                onClick={() => setIsMoveModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(253, 246, 233, 0.5)', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '1rem 1.5rem' }}>
              <input
                type="text"
                value={themeSearch}
                onChange={e => setThemeSearch(e.target.value)}
                placeholder="Zoek een thema (bijv. Dragonball, Bluey, Dieren)..."
                autoFocus
                style={{
                  width: '100%',
                  background: '#0a1b1c',
                  border: '1px solid #FF6B4A',
                  color: '#FDF6E9',
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {filteredThemes.map(t => (
                  <button
                    key={t.slug}
                    onClick={() => handleMoveTheme(t.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      background: currentPage?.parentTheme === t.slug ? 'rgba(255, 107, 74, 0.15)' : 'rgba(253, 246, 233, 0.03)',
                      border: '1px solid rgba(253, 246, 233, 0.08)',
                      borderRadius: '8px',
                      color: '#FDF6E9',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 107, 74, 0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = currentPage?.parentTheme === t.slug ? 'rgba(255, 107, 74, 0.15)' : 'rgba(253, 246, 233, 0.03)'}
                  >
                    <span style={{ fontWeight: 600 }}>{t.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(253, 246, 233, 0.4)' }}>{t.parentHub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FULLSCREEN ZOOM / LIGHTBOX */}
      {isZoomed && currentPage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          padding: '2rem',
          cursor: 'zoom-out',
        }} onClick={() => setIsZoomed(false)}>
          <div style={{ position: 'relative', width: '90vw', height: '90vh', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
            <SafeImage
              src={currentPage.image}
              alt={currentPage.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem' }}
            />
          </div>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}>
            ✕
          </div>
        </div>
      )}

    </div>
  );
}
