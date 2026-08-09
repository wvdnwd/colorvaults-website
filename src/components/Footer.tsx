import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer({ lang }: { lang: string }) {
  const isEn = lang === 'en';

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>

          <div className={styles.brand}>
            <Link href={`/${lang}`} className={styles.logo}>
              <img src="/images/logo.jpg" alt="ColorVaults" width={180} height={56} style={{ objectFit: 'contain' }} />
            </Link>
            <p className={styles.tagline}>
              {isEn
                ? 'Thousands of free, high-quality printable coloring pages for every age and interest.'
                : 'Duizenden gratis, hoogwaardige kleurplaten voor elke leeftijd en interesse.'}
            </p>
            <p className={styles.taglineSmall}>
              {isEn ? '🌍 Available in English & Dutch' : '🌍 Beschikbaar in Engels & Nederlands'}
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Collections' : 'Collecties'}</span>
              <Link href={`/${lang}/tv-series-and-movies`} className={styles.link}>{isEn ? 'TV & Movies' : 'TV & Films'}</Link>
              <Link href={`/${lang}/animals-and-nature`} className={styles.link}>{isEn ? 'Animals & Nature' : 'Dieren & Natuur'}</Link>
              <Link href={`/${lang}/mandalas`} className={styles.link}>Mandalas</Link>
              <Link href={`/${lang}/disney-and-fairy-tales`} className={styles.link}>{isEn ? 'Disney & Fairy Tales' : 'Disney & Sprookjes'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Pages' : "Pagina's"}</span>
              <Link href={`/${lang}`} className={styles.link}>{isEn ? 'Home' : 'Home'}</Link>
              <Link href={`/${lang}/about`} className={styles.link}>{isEn ? 'About Us' : 'Over Ons'}</Link>
              <Link href={`/${lang}/contact`} className={styles.link}>Contact</Link>
              <Link href={`/${lang}/contest`} className={styles.link}>{isEn ? 'Contest' : 'Wedstrijd'}</Link>
              <Link href={`/${lang}/request`} className={styles.link}>{isEn ? 'Request a Page' : 'Pagina Aanvragen'}</Link>
              <Link href={`/${lang}/licensing`} className={styles.link}>{isEn ? 'Licensing' : 'Licentie'}</Link>
            </div>
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnTitle}>{isEn ? 'Legal' : 'Legaal'}</span>
              <Link href={`/${lang}/privacy-policy`} className={styles.link}>Privacy Policy</Link>
              <Link href={`/${lang}/terms-of-service`} className={styles.link}>Terms of Service</Link>
              <Link href={`/${lang}/ip-policy`} className={styles.link}>IP & Takedown Policy</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} ColorVaults. {isEn ? 'All rights reserved.' : 'Alle rechten voorbehouden.'}</p>
          <p>{isEn ? 'Made with ❤️ for creatives everywhere.' : 'Gemaakt met ❤️ voor creatievelingen overal.'}</p>
        </div>
      </div>
    </footer>
  );
}
