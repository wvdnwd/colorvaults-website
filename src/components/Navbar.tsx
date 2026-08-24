'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';


interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isEn = lang === 'en';
  const isNl = lang === 'nl';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLangLink = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'nl') {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    return `/${segments.join('/')}`;
  };

  const navItems: NavItem[] = [
    {
      label: isEn ? 'Coloring Pages' : 'Kleurplaten',
      children: [
        { label: isEn ? '🎬 TV Series & Movies' : '🎬 TV Series & Films', href: `/${lang}/tv-series-and-movies` },
        { label: isEn ? '👑 Disney & Fairy Tales' : '👑 Disney & Sprookjes', href: `/${lang}/disney-and-fairy-tales` },
        { label: isEn ? '🎮 Games & Pop Culture' : '🎮 Games & Popcultuur', href: `/${lang}/games-and-pop-culture` },
        { label: isEn ? '🦁 Animals & Nature' : '🦁 Dieren & Natuur', href: `/${lang}/animals-and-nature` },
        { label: isEn ? '💖 Girls Themes' : "💖 Meisjes Thema's", href: `/${lang}/girls-themes` },
        { label: isEn ? '👶 Toddler Specific' : '👶 Speciaal voor Peuters', href: `/${lang}/toddler-specific` },
        { label: isEn ? '✨ Adults & Mandalas' : '✨ Volwassenen & Mandala\'s', href: `/${lang}/adults` },
      ],
    },
    { label: isEn ? '📅 Calendars' : '📅 Kalenders', href: `/${lang}/calendars` },
    { label: isEn ? '✏️ Printables' : '✏️ Printables', href: `/${lang}/school-education-templates` },
    { label: isEn ? '🧘 Mandalas' : "🧘 Mandala's", href: `/${lang}/mandalas` },
    {
      label: isEn ? 'About' : 'Over',
      children: [
        { label: isEn ? 'ℹ️ About Us' : 'ℹ️ Over Ons', href: `/${lang}/about` },
        { label: '📧 Contact', href: `/${lang}/contact` },
        { label: isEn ? '🏆 Contest' : '🏆 Wedstrijd', href: `/${lang}/contest` },
        { label: isEn ? '💡 Request a Page' : '💡 Pagina Aanvragen', href: `/${lang}/request` },
        { label: isEn ? '📜 Licensing' : '📜 Licentie', href: `/${lang}/licensing` },
      ],
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    // Find all focusable elements inside the mobile menu
    const drawer = document.querySelector(`.${styles.mobileMenu}`) as HTMLElement | null;
    if (!drawer) return;
    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelectors));
    if (focusableEls.length === 0) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    
    // Move focus into the drawer
    firstEl.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <Link href={`/${lang}`} className={styles.logo}>
          <div className={styles.logoBadge}>🎨</div>
          <span className={styles.logoText}>
            Color<span className={styles.logoAccent}>Vaults</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className={styles.navLinks}>
          {navItems.map(item => (
            <div key={item.label} className={styles.navItem}>
              {item.href && !item.children ? (
                <Link href={item.href} className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}>
                  {item.label}
                </Link>
              ) : (
                <button
                  className={`${styles.link} ${styles.dropdownTrigger} ${openDropdown === item.label ? styles.active : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  aria-controls={`dropdown-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="menu"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpenDropdown(null);
                    } else if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }
                  }}
                >
                  {item.label}
                  <span className={styles.chevron}>{openDropdown === item.label ? '▴' : '▾'}</span>
                </button>
              )}
              {item.children && openDropdown === item.label && (
                <div 
                  id={`dropdown-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className={styles.dropdown} 
                  role="menu"
                >
                  {item.children.map(child => (
                    <Link 
                      key={child.href} 
                      href={child.href} 
                      className={styles.dropdownItem} 
                      onClick={() => setOpenDropdown(null)}
                      role="menuitem"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.navRight}>
          <Link href={`/${lang}/search`} className={styles.iconBtn} aria-label={isEn ? 'Search' : 'Zoeken'} title={isEn ? 'Search' : 'Zoeken'}>
            🔍
          </Link>
          <Link href={`/${lang}/favorites`} className={styles.iconBtn} aria-label={isEn ? 'Favorites' : 'Favorieten'} title={isEn ? 'Favorites' : 'Favorieten'}>
            ❤️
          </Link>

          <div className={styles.langSwitcher}>
            <Link 
              href={getLangLink('en')} 
              className={`${styles.langBtn} ${isEn ? styles.langActive : ''}`}
              aria-label="Switch to English"
              aria-current={isEn ? 'true' : undefined}
            >EN</Link>
            <Link 
              href={getLangLink('nl')} 
              className={`${styles.langBtn} ${isNl ? styles.langActive : ''}`}
              aria-label="Overschakelen naar Nederlands"
              aria-current={isNl ? 'true' : undefined}
            >NL</Link>
          </div>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen 
              ? (isEn ? 'Close navigation menu' : 'Navigatiemenu sluiten')
              : (isEn ? 'Open navigation menu' : 'Navigatiemenu openen')
            }
            aria-expanded={mobileOpen}
          >
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div 
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label={isEn ? 'Navigation menu' : 'Navigatiemenu'}
        >
          {navItems.map(item => (
            <div key={item.label} className={styles.mobileSection}>
              {item.href && !item.children ? (
                <Link href={item.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <>
                  <span className={styles.mobileSectionTitle}>{item.label}</span>
                  <div className={styles.mobileGrid}>
                    {item.children?.map(child => (
                      <Link key={child.href} href={child.href} className={styles.mobileLinkSub} onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <div className={styles.mobileLangRow}>
            <Link 
              href={getLangLink('en')} 
              className={`${styles.mobileLangBtn} ${isEn ? styles.langActive : ''}`} 
              onClick={() => setMobileOpen(false)}
              aria-label="Switch to English"
              aria-current={isEn ? 'true' : undefined}
            >🇬🇧 English</Link>
            <Link 
              href={getLangLink('nl')} 
              className={`${styles.mobileLangBtn} ${isNl ? styles.langActive : ''}`} 
              onClick={() => setMobileOpen(false)}
              aria-label="Overschakelen naar Nederlands"
              aria-current={isNl ? 'true' : undefined}
            >🇳🇱 Nederlands</Link>
          </div>
        </div>
      )}
    </header>
  );
}
