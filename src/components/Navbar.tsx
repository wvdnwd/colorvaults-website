'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export default function Navbar({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isEn = lang === 'en';
  const isNl = lang === 'nl';

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
        { label: isEn ? 'TV Series & Movies' : 'TV Series & Films', href: `/${lang}/tv-series-and-movies` },
        { label: isEn ? 'Disney & Fairy Tales' : 'Disney & Sprookjes', href: `/${lang}/disney-and-fairy-tales` },
        { label: isEn ? 'Games & Pop Culture' : 'Games & Popcultuur', href: `/${lang}/games-and-pop-culture` },
        { label: isEn ? 'Animals & Nature' : 'Dieren & Natuur', href: `/${lang}/animals-and-nature` },
        { label: isEn ? 'Girls Themes' : "Meisjes Thema's", href: `/${lang}/girls-themes` },
        { label: isEn ? 'Toddler Specific' : 'Speciaal voor Peuters', href: `/${lang}/toddler-specific` },
        { label: isEn ? 'Adults' : 'Volwassenen', href: `/${lang}/adults` },
      ],
    },
    { label: isEn ? 'Calendars' : 'Kalenders', href: `/${lang}/calendars` },
    { label: isEn ? 'Printables' : 'Printables', href: `/${lang}/school-education-templates` },
    { label: isEn ? 'Mandalas' : "Mandala's", href: `/${lang}/mandalas` },
    {
      label: isEn ? 'About' : 'Over',
      children: [
        { label: isEn ? 'About Us' : 'Over Ons', href: `/${lang}/about` },
        { label: 'Contact', href: `/${lang}/contact` },
        { label: isEn ? 'Contest' : 'Wedstrijd', href: `/${lang}/contest` },
        { label: isEn ? 'Request a Page' : 'Pagina Aanvragen', href: `/${lang}/request` },
        { label: isEn ? 'Licensing' : 'Licentie', href: `/${lang}/licensing` },
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
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href={`/${lang}`} className={styles.logo}>
          <img src="/images/logo.jpg" alt="ColorVaults" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Nav Items */}
        <div className={styles.navLinks}>
          {navItems.map(item => (
            <div key={item.label} className={styles.navItem}>
              {item.href && !item.children ? (
                <Link href={item.href} className={styles.link}>{item.label}</Link>
              ) : (
                <button
                  className={`${styles.link} ${styles.dropdownTrigger} ${openDropdown === item.label ? styles.active : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <span className={styles.chevron} aria-hidden="true">{openDropdown === item.label ? '▴' : '▾'}</span>
                </button>
              )}
              {item.children && openDropdown === item.label && (
                <div className={styles.dropdown}>
                  {item.children.map(child => (
                    <Link key={child.href} href={child.href} className={styles.dropdownItem} onClick={() => setOpenDropdown(null)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: search + fav + lang + theme + hamburger */}
        <div className={styles.navRight}>
          <Link href={`/${lang}/search`} className={styles.searchBtn} aria-label={isEn ? 'Search' : 'Zoeken'}>
            🔍
          </Link>
          <Link href={`/${lang}/favorites`} className={styles.searchBtn} aria-label={isEn ? 'Favorites' : 'Favorieten'}>
            ❤️
          </Link>
          <div className={styles.langSwitcher}>
            <Link href={getLangLink('en')} className={`${styles.langBtn} ${isEn ? styles.langActive : ''}`}>EN</Link>
            <Link href={getLangLink('nl')} className={`${styles.langBtn} ${isNl ? styles.langActive : ''}`}>NL</Link>
          </div>
          <ThemeToggle />
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
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
        <div className={styles.mobileMenu}>
          {navItems.map(item => (
            <div key={item.label} className={styles.mobileSection}>
              {item.href && !item.children ? (
                <Link href={item.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <>
                  <span className={styles.mobileSectionTitle}>{item.label}</span>
                  {item.children?.map(child => (
                    <Link key={child.href} href={child.href} className={styles.mobileLinkSub} onClick={() => setMobileOpen(false)}>
                      → {child.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
          <div className={styles.mobileLangRow}>
            <Link href={getLangLink('en')} className={`${styles.mobileLangBtn} ${isEn ? styles.langActive : ''}`} onClick={() => setMobileOpen(false)}>🇬🇧 English</Link>
            <Link href={getLangLink('nl')} className={`${styles.mobileLangBtn} ${isNl ? styles.langActive : ''}`} onClick={() => setMobileOpen(false)}>🇳🇱 Nederlands</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
