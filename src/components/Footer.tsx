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
              <div className={styles.logoBadge}>🎨</div>
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
              {isEn ? '🌍 Available in English & Dutch' : '🌍 Beschikbaar in Engels & Nederlands'}
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Popular Categories' : 'Populaire Categorieën'}</span>
              <Link href={`/${lang}/tv-series-and-movies`} className={styles.link}>{isEn ? 'TV & Movies' : 'TV & Films'}</Link>
              <Link href={`/${lang}/animals-and-nature`} className={styles.link}>{isEn ? 'Animals & Nature' : 'Dieren & Natuur'}</Link>
              <Link href={`/${lang}/mandalas`} className={styles.link}>Mandalas</Link>
              <Link href={`/${lang}/disney-and-fairy-tales`} className={styles.link}>{isEn ? 'Disney & Fairy Tales' : 'Disney & Sprookjes'}</Link>
              <Link href={`/${lang}/adults`} className={styles.link}>{isEn ? 'Adults' : 'Volwassenen'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Quick Links' : 'Snelle Links'}</span>
              <Link href={`/${lang}`} className={styles.link}>{isEn ? 'Home' : 'Home'}</Link>
              <Link href={`/${lang}/about`} className={styles.link}>{isEn ? 'About Us' : 'Over Ons'}</Link>
              <Link href={`/${lang}/contact`} className={styles.link}>Contact</Link>
              <Link href={`/${lang}/contest`} className={styles.link}>{isEn ? 'Contest' : 'Wedstrijd'}</Link>
              <Link href={`/${lang}/request`} className={styles.link}>{isEn ? 'Request a Page' : 'Pagina Aanvragen'}</Link>
              <Link href={`/${lang}/licensing`} className={styles.link}>{isEn ? 'Licensing' : 'Licentie'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Legal & Info' : 'Legaal & Info'}</span>
              <Link href={`/${lang}/privacy-policy`} className={styles.link}>Privacy Policy</Link>
              <Link href={`/${lang}/terms-of-service`} className={styles.link}>Terms of Service</Link>
              <Link href={`/${lang}/ip-policy`} className={styles.link}>IP & Takedown Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} ColorVaults.com. {isEn ? 'All rights reserved.' : 'Alle rechten voorbehouden.'}</p>
          <p>{isEn ? 'Made with ❤️ for creative minds everywhere.' : 'Gemaakt met ❤️ voor creatievelingen overal.'}</p>
        </div>
      </div>
    </footer>
  );
}
