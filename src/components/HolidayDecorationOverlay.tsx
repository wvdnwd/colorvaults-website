'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HolidayThemeConfig, HOLIDAY_THEMES, resolveHolidayTheme, HolidayThemeId } from '@/data/holidayThemes';
import styles from './HolidayDecorationOverlay.module.css';

interface ThemeResponse {
  config: {
    activeTheme: HolidayThemeId;
    effectsEnabled: boolean;
    bannerEnabled: boolean;
  };
  resolvedTheme: HolidayThemeConfig;
}

export default function HolidayDecorationOverlay({ lang }: { lang?: string }) {
  const pathname = usePathname();
  const currentLang = lang || (pathname?.startsWith('/nl') ? 'nl' : 'en');
  const isEn = currentLang === 'en';

  const [themeData, setThemeData] = useState<ThemeResponse | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('cv_holiday_banner_dismissed');
      if (dismissed) setBannerDismissed(true);
    } catch {
      // ignore
    }

    // Fetch live theme config from API
    fetch('/api/theme-config')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.resolvedTheme) {
          setThemeData(data);
          
          // Apply CSS Variables to root
          const t = data.resolvedTheme as HolidayThemeConfig;
          if (t && t.id !== 'default') {
            document.documentElement.setAttribute('data-holiday-theme', t.id);
            document.documentElement.style.setProperty('--holiday-primary', t.primaryColor);
            document.documentElement.style.setProperty('--holiday-secondary', t.secondaryColor);
            document.documentElement.style.setProperty('--holiday-glow', t.accentGlow);
            document.documentElement.style.setProperty('--holiday-banner-bg', t.bannerGradient);
          } else {
            document.documentElement.removeAttribute('data-holiday-theme');
          }
        }
      })
      .catch(err => console.error('[HolidayDecorationOverlay]', err));
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    try {
      sessionStorage.setItem('cv_holiday_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const resolved = themeData?.resolvedTheme;
  const showBanner = themeData?.config?.bannerEnabled && !bannerDismissed && resolved && resolved.id !== 'default';
  const showParticles = themeData?.config?.effectsEnabled && resolved && resolved.particleType !== 'none';

  // Generate deterministic particles for 60fps performance
  const particles = useMemo(() => {
    if (!showParticles || !resolved) return [];
    const count = resolved.particleCount || 15;
    const items = [];
    
    for (let i = 0; i < count; i++) {
      const left = `${Math.floor((i / count) * 96) + 2}%`;
      const duration = `${(8 + (i % 7) * 1.5).toFixed(1)}s`;
      const delay = `${((i * 0.7) % 6).toFixed(1)}s`;
      const size = `${0.9 + (i % 5) * 0.25}rem`;
      items.push({ id: i, left, duration, delay, size });
    }
    return items;
  }, [showParticles, resolved]);

  if (!resolved || resolved.id === 'default') {
    return null;
  }

  // Get particle emoji or symbol based on particleType
  const getParticleSymbol = (type: string, index: number) => {
    switch (type) {
      case 'bats':
        return index % 2 === 0 ? '🦇' : '👻';
      case 'snow':
        return ['❄️', '❅', '❆', '•'][index % 4];
      case 'pepernoten':
        return ['🎁', '🍪', '⭐', '👢'][index % 4];
      case 'petals':
        return ['🌸', '🌺', '🥚', '🌷'][index % 4];
      case 'hearts':
        return ['💖', '💕', '💗', '❤️'][index % 4];
      case 'confetti':
        return ['🎉', '✨', '👑', '🎊'][index % 4];
      case 'leaves':
        return ['🍂', '🍁', '🌰', '🍄'][index % 4];
      case 'sun':
        return ['☀️', '🌴', '🕶️', '✨'][index % 4];
      case 'frost':
        return ['❄️', '✨', '🧊', '⭐'][index % 4];
      default:
        return '✨';
    }
  };

  const getParticleClass = (type: string) => {
    switch (type) {
      case 'bats': return styles.batParticle;
      case 'hearts': return styles.heartParticle;
      case 'leaves': return styles.leafParticle;
      case 'confetti': return styles.confettiParticle;
      default: return styles.snowParticle;
    }
  };

  return (
    <>
      {/* 1. Festive Top Announcement Bar */}
      {showBanner && (
        <div className={styles.bannerWrapper} role="region" aria-label="Holiday Announcement">
          <div className={styles.bannerInner}>
            <div className={styles.bannerContent}>
              <span className={styles.emojiIcon} aria-hidden="true">{resolved.emoji}</span>
              <div className={styles.textGroup}>
                <span className={styles.pillTag}>
                  {isEn ? resolved.banner.tagEn : resolved.banner.tagNl}
                </span>
                <span className={styles.mainText}>
                  {isEn ? resolved.banner.titleEn : resolved.banner.titleNl}
                </span>
                <span className={styles.subText}>
                  — {isEn ? resolved.banner.descEn : resolved.banner.descNl}
                </span>
              </div>
            </div>

            <div className={styles.bannerActions}>
              <Link
                href={`/${currentLang}/${resolved.banner.targetSlug}`}
                className={styles.ctaBtn}
              >
                {isEn ? resolved.banner.ctaEn : resolved.banner.ctaNl}
              </Link>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleDismissBanner}
                aria-label={isEn ? 'Close banner' : 'Sluit banner'}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Atmospheric Particles */}
      {showParticles && (
        <div className={styles.particleContainer} aria-hidden="true">
          {particles.map(p => (
            <span
              key={p.id}
              className={getParticleClass(resolved.particleType)}
              style={{
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
                fontSize: p.size,
              }}
            >
              {getParticleSymbol(resolved.particleType, p.id)}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
