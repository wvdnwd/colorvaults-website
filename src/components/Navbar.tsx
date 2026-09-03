'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import HeaderSearchBar from './HeaderSearchBar';
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
  const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/` || pathname === '/' || !pathname;

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
      label: isEn ? 'Categories' : 'Categorieën',
      children: [
        { label: 'Disney & Pixar', href: `/${lang}/disney-pixar` },
        { label: 'Anime & Manga', href: `/${lang}/anime-manga` },
        { label: isEn ? 'Gaming & Virtual Worlds' : 'Games & Gaming', href: `/${lang}/gaming-virtual-worlds` },
        { label: isEn ? 'Superheroes & Comics' : 'Superhelden & Comics', href: `/${lang}/superheroes-comic-universes` },
        { label: isEn ? 'Kids TV & Cartoons' : 'Kinderseries & Tekenfilms', href: `/${lang}/kids-tv-shows` },
        { label: isEn ? 'Animals & Wildlife' : 'Dieren & Natuur', href: `/${lang}/animals-wildlife` },
        { label: isEn ? 'Fantasy & Fairytales' : 'Sprookjes & Fantasie', href: `/${lang}/fantasy-fairytales` },
        { label: isEn ? 'Vehicles & Space' : 'Voertuigen & Ruimte', href: `/${lang}/vehicles-transportation` },
        { label: isEn ? 'Art, Mandalas & Aesthetic' : 'Kunst & Mandala’s', href: `/${lang}/art-aesthetic` },
        { label: isEn ? 'Holidays & Seasons' : 'Feestdagen & Seizoenen', href: `/${lang}/holidays-seasons` },
      ],
    },
    {
      label: isEn ? 'Popular' : 'Populair',
      children: [
        // Disney
        { label: 'Frozen (Elsa & Anna)', href: `/${lang}/disney-pixar/frozen` },
        { label: 'The Lion King', href: `/${lang}/disney-pixar/the-lion-king` },
        { label: isEn ? 'The Little Mermaid (Ariel)' : 'De Kleine Zeemeermin (Ariël)', href: `/${lang}/disney-pixar/the-little-mermaid-ariel` },
        { label: isEn ? 'Beauty & the Beast' : 'Belle & het Beest', href: `/${lang}/disney-pixar/beauty-and-the-beast-belle` },
        // Gaming
        { label: 'Pokémon', href: `/${lang}/gaming-virtual-worlds/pokemon` },
        { label: 'Super Mario', href: `/${lang}/gaming-virtual-worlds/super-mario` },
        { label: 'Sonic the Hedgehog', href: `/${lang}/gaming-virtual-worlds/sonic-the-hedgehog` },
        { label: 'Minecraft', href: `/${lang}/gaming-virtual-worlds/minecraft-voxel-worlds` },
        // Superheroes & Anime
        { label: 'Spider-Man', href: `/${lang}/superheroes-comic-universes/marvel-spider-man` },
        { label: 'Batman', href: `/${lang}/superheroes-comic-universes/dc-batman` },
        { label: 'Dragon Ball', href: `/${lang}/anime-manga/dragonball` },
        { label: 'Naruto', href: `/${lang}/anime-manga/naruto` },
        // Kids
        { label: 'Paw Patrol', href: `/${lang}/kids-tv-shows/paw-patrol` },
        { label: 'Bluey', href: `/${lang}/kids-tv-shows/bluey` },
        // Art & Nature
        { label: isEn ? 'Mandalas (Adults)' : 'Mandala’s (Volwassenen)', href: `/${lang}/art-aesthetic/mandalas-sacred-geometry` },
        { label: isEn ? 'Dinosaurs' : 'Dinosauriërs', href: `/${lang}/animals-wildlife/dinosaur-adventures` },
      ],
    },
    { label: isEn ? 'Search' : 'Zoeken', href: `/${lang}/search` },
    { label: isEn ? 'Favorites' : 'Favorieten', href: `/${lang}/favorites` },
    { label: isEn ? 'How to Draw' : 'Leren Tekenen', href: `/${lang}/how-to-draw` },
    { label: isEn ? 'Calendars' : 'Kalenders', href: `/${lang}/calendars` },
    { label: isEn ? 'Blog & Tips' : 'Tips & Blog', href: `/${lang}/blog` },
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

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href={`/${lang}`} className={styles.logo} aria-label="ColorVaults Home">
          <div className={styles.logoBadge} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.66 22 15 20.66 15 19C15 18.23 14.7 17.53 14.21 17.01C13.73 16.5 13.43 15.82 13.43 15.07C13.43 13.41 14.77 12.07 16.43 12.07H18.93C20.59 12.07 21.93 10.73 21.93 9.07C21.93 5.16 17.48 2 12 2Z" fill="white" fillOpacity="0.95"/>
              <circle cx="6.5" cy="11.5" r="1.5" fill="#FF4B72"/>
              <circle cx="9.5" cy="7.5" r="1.5" fill="#FF8A00"/>
              <circle cx="14.5" cy="7.5" r="1.5" fill="#FFD600"/>
              <circle cx="17.5" cy="11.5" r="1.5" fill="#00D2D3"/>
            </svg>
          </div>
          <span className={styles.logoText}>
            Color<span className={styles.logoAccent}>Vaults</span>
          </span>
        </Link>

        {/* Search Bar in Header - hidden on homepage top to prevent duplicate search bars */}
        {(!isHomepage || scrolled) && (
          <div className={styles.searchWrapper}>
            <HeaderSearchBar lang={lang} />
          </div>
        )}

        {/* Desktop Navigation Links */}
        <nav className={styles.navMenu} aria-label="Main Navigation">
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openDropdown === item.label;

            if (hasChildren) {
              return (
                <div key={item.label} className={styles.dropdownWrapper}>
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.dropdownTrigger} ${isOpen ? styles.active : ''}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <span className={styles.arrow} aria-hidden="true">▾</span>
                  </button>
                  {isOpen && (
                    <div className={styles.dropdownMenu}>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href || `/${lang}`}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher & Mobile Hamburger */}
        <div className={styles.headerRight}>
          <div className={styles.langSwitcher}>
            <Link
              href={getLangLink('en')}
              className={`${styles.langBtn} ${isEn ? styles.langActive : ''}`}
              aria-label="Switch to English"
            >
              EN
            </Link>
            <span className={styles.langDivider}>/</span>
            <Link
              href={getLangLink('nl')}
              className={`${styles.langBtn} ${isNl ? styles.langActive : ''}`}
              aria-label="Schakel naar Nederlands"
            >
              NL
            </Link>
          </div>

          <button
            type="button"
            className={styles.hamburgerBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileSearchWrapper}>
            <HeaderSearchBar lang={lang} />
          </div>

          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <div key={item.label} className={styles.mobileGroup}>
                {item.children ? (
                  <>
                    <div className={styles.mobileGroupTitle}>{item.label}</div>
                    <div className={styles.mobileSubList}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || `/${lang}`}
                    className={styles.mobileMainLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}