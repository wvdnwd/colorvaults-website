import { getMainHubs, getColoringPages } from '@/lib/api';
import styles from './page.module.css';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const hubs = getMainHubs(lang);
  const featuredPages = getColoringPages(lang).slice(0, 8);
  const isEn = lang === 'en';

  const stats = [
    { num: '10,000+', label: isEn ? 'Coloring Pages' : 'Kleurplaten' },
    { num: '100%', label: isEn ? 'Free to Download' : 'Gratis te Downloaden' },
    { num: '2', label: isEn ? 'Languages' : 'Talen' },
    { num: '4+', label: isEn ? 'Age Groups' : 'Leeftijdsgroepen' },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>
            ✨ {isEn ? '100% Free — No Signup Required' : '100% Gratis — Geen Account Nodig'}
          </span>
          <h1 className={styles.heroTitle}>
            {isEn ? (
              <>Free Premium<br /><span className="gradient-text">Coloring Pages</span></>
            ) : (
              <>Gratis Premium<br /><span className="gradient-text">Kleurplaten</span></>
            )}
          </h1>
          <p className={styles.heroSubtitle}>
            {isEn
              ? 'Download thousands of high-quality, free printable coloring pages for toddlers, kids, teens, and adults. Spark creativity today!'
              : 'Download duizenden gratis printbare kleurplaten van hoge kwaliteit voor peuters, kinderen, tieners en volwassenen. Stimuleer creativiteit vandaag!'}
          </p>
          <div className={styles.heroCtas}>
            <Link href={`/${lang}/tv-series-and-movies`} className="btn-primary">
              {isEn ? '🎨 Start Exploring' : '🎨 Begin met Ontdekken'}
            </Link>
            <Link href={`/${lang}/mandalas`} className="btn-secondary">
              {isEn ? 'Mandalas & Adults' : "Mandala's & Volwassenen"}
            </Link>
          </div>
          <div className={styles.statsRow}>
            {stats.map(s => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroBgImg} />
      </section>

      <div className="container">

        {/* Main Collections */}
        <section className="section">
          <div className="section-header">
            <div>
              <span className="badge">📚 {isEn ? 'Collections' : 'Collecties'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>
                {isEn ? 'Browse All Categories' : 'Alle Categorieën Bekijken'}
              </h2>
            </div>
          </div>
          <div className={styles.hubGrid}>
            {hubs.map((hub, i) => (
              <Link key={hub.slug} href={`/${lang}/${hub.slug}`} className={`${styles.hubCard} card`}>
                <div className={styles.hubCardEmoji}>{getHubEmoji(i)}</div>
                <div className="card-body">
                  <h3 className="card-title">{hub.title}</h3>
                  <p className="card-desc">{hub.description}</p>
                  <span className={styles.hubCardArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Pages */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <div>
              <span className="badge">🆕 {isEn ? 'Latest' : 'Nieuwste'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>
                {isEn ? 'Latest Additions' : 'Nieuwste Kleurplaten'}
              </h2>
            </div>
          </div>
          <div className="grid-4">
            {featuredPages.map(page => (
              <Link
                key={page.id}
                href={`/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`}
                className="card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={page.preview} alt={page.title} className="card-img" />
                <div className="card-body">
                  <h3 className="card-title">{page.title}</h3>
                  <p className="card-desc">{page.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Why ColorVaults */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyInner}>
            <div className={styles.whyText}>
              <span className="badge">💜 {isEn ? 'Why Us?' : 'Waarom Wij?'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>
                {isEn ? 'Why Choose ColorVaults?' : 'Waarom ColorVaults Kiezen?'}
              </h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1rem', lineHeight: 1.8 }}>
                {isEn
                  ? 'ColorVaults is your premier destination for high-quality, free printable coloring pages. We believe creativity should be accessible to everyone — which is why our entire collection is completely free.'
                  : 'ColorVaults is jouw bestemming voor gratis printbare kleurplaten van topkwaliteit. Wij geloven dat creativiteit voor iedereen toegankelijk moet zijn — daarom is onze hele collectie gratis.'}
              </p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
                {isEn
                  ? 'Whether you\'re a parent, teacher, or adult looking to unwind with a mandala — you\'ll find exactly what you need in our carefully curated vaults.'
                  : 'Of je nu een ouder, leraar of volwassene bent die wil ontspannen met een mandala — je vindt bij ons precies wat je zoekt.'}
              </p>
            </div>
            <div className={styles.whyFeatures}>
              {[
                { icon: '🆓', title: isEn ? '100% Free' : '100% Gratis', desc: isEn ? 'No account, no paywall. Download any page instantly.' : 'Geen account, geen betaalmuur. Download meteen.' },
                { icon: '🖨️', title: isEn ? 'Print-Ready' : 'Drukklaar', desc: isEn ? 'High-resolution PDFs optimized for home printing.' : 'Hoge resolutie PDF\'s voor thuis afdrukken.' },
                { icon: '👶', title: isEn ? 'All Ages' : 'Alle Leeftijden', desc: isEn ? 'Pages for toddlers, kids, teens & adults.' : 'Kleurplaten voor peuters, kinderen, tieners & volwassenen.' },
                { icon: '🌍', title: isEn ? 'Bilingual' : 'Tweetalig', desc: isEn ? 'Full site in English & Dutch.' : 'De hele site in Engels & Nederlands.' },
              ].map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function getHubEmoji(index: number): string {
  const emojis = ['📺', '🏰', '🎮', '🦊', '👶', '👧', '🧘', '🕉️', '📅', '🏫'];
  return emojis[index] || '🎨';
}
