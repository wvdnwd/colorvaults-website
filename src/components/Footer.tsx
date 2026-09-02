import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({ lang }: { lang: string }) {
  const isEn = lang === 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href={`/${lang}`} className={styles.logo}>
              <div className={styles.logoBadge} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <p className={styles.brandDesc}>
              {isEn 
                ? 'Your premier destination for high-quality, free printable coloring pages. Spark creativity today!'
                : 'Jouw bestemming voor gratis printbare kleurplaten van topkwaliteit. Stimuleer creativiteit vandaag!'}
            </p>
            <div className={styles.langPill}>
              {isEn ? 'Available in English & Dutch' : 'Beschikbaar in Engels & Nederlands'}
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Popular Hubs' : 'Populaire Categorieën'}</span>
              <Link href={`/${lang}/disney-pixar`} className={styles.link}>Disney & Pixar</Link>
              <Link href={`/${lang}/anime-manga`} className={styles.link}>Anime & Manga</Link>
              <Link href={`/${lang}/gaming-virtual-worlds`} className={styles.link}>{isEn ? 'Gaming & Minecraft' : 'Games & Minecraft'}</Link>
              <Link href={`/${lang}/superheroes-comic-universes`} className={styles.link}>{isEn ? 'Superheroes & Marvel' : 'Superhelden & Marvel'}</Link>
              <Link href={`/${lang}/kids-tv-shows`} className={styles.link}>{isEn ? 'Kids TV & Cartoons' : 'Paw Patrol & Peppa Pig'}</Link>
              <Link href={`/${lang}/animals-wildlife`} className={styles.link}>{isEn ? 'Animals & Nature' : 'Dieren & Dinosauriërs'}</Link>
              <Link href={`/${lang}/art-aesthetic`} className={styles.link}>{isEn ? 'Mandalas & Adult Coloring' : 'Mandala’s & Volwassenen'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Quick Links' : 'Snelle Links'}</span>
              <Link href={`/${lang}`} className={styles.link}>{isEn ? 'Home' : 'Home'}</Link>
              <Link href={`/${lang}/search`} className={styles.link}>{isEn ? 'Search All Pages' : 'Alle Kleurplaten Zoeken'}</Link>
              <Link href={`/${lang}/favorites`} className={styles.link}>{isEn ? 'My Favorites' : 'Mijn Favorieten'}</Link>
              <Link href={`/${lang}/how-to-draw`} className={styles.link}>{isEn ? 'How to Draw (Tutorials)' : 'Leren Tekenen (Stappenplan)'}</Link>
              <Link href={`/${lang}/calendars`} className={styles.link}>{isEn ? '2026 Coloring Calendars' : '2026 Kleurkalenders'}</Link>
              <Link href={`/${lang}/blog`} className={styles.link}>{isEn ? 'Coloring Guides' : 'Kleurplaten Tips & Blog'}</Link>
              <Link href={`/${lang}/about`} className={styles.link}>{isEn ? 'About Us' : 'Over Ons'}</Link>
              <Link href={`/${lang}/contact`} className={styles.link}>Contact</Link>
              <Link href={`/${lang}/contest`} className={styles.link}>{isEn ? 'Monthly Contest' : 'Maandelijkse Wedstrijd'}</Link>
              <Link href={`/${lang}/request`} className={styles.link}>{isEn ? 'Request a Page' : 'Kleurplaat Aanvragen'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Legal & Info' : 'Legaal & Info'}</span>
              <Link href={`/${lang}/privacy-policy`} className={styles.link}>Privacy Policy</Link>
              <Link href={`/${lang}/terms-of-service`} className={styles.link}>Terms of Service</Link>
              <Link href={`/${lang}/ip-policy`} className={styles.link}>IP & Takedown Policy</Link>
              <Link href={`/${lang}/licensing`} className={styles.link}>{isEn ? 'Licensing' : 'Licentie'}</Link>
            </div>
          </div>
        </div>

        {/* Clear AI Attribution & Disclosure Notice */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--radius)',
          fontSize: '0.825rem',
          color: 'rgba(253, 246, 233, 0.75)',
          lineHeight: '1.6',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <strong>{isEn ? 'AI Content Disclosure:' : 'AI Content Transparantie:'}</strong>{' '}
          {isEn
            ? 'All coloring pages and artwork on ColorVaults are created with the assistance of artificial intelligence (AI) technology and curated for high-quality printing and digital coloring. In accordance with our Terms of Service, all artwork is provided free for personal and educational use.'
            : 'Alle kleurplaten en illustraties op ColorVaults zijn gemaakt met behulp van kunstmatige intelligentie (AI) technologie en zorgvuldig geselecteerd voor hoge kwaliteit printen en digitaal inkleuren. In overeenstemming met onze Algemene Voorwaarden worden alle tekeningen gratis aangeboden voor persoonlijk en educatief gebruik.'
          }
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} ColorVaults.com. {isEn ? 'All rights reserved.' : 'Alle rechten voorbehouden.'}</p>
          <p>{isEn ? 'Made for creative minds everywhere.' : 'Gemaakt voor creatievelingen overal.'}</p>
        </div>
      </div>
    </footer>
  );
}