import Image from 'next/image';
import { getThemes, getColoringPages } from '@/lib/api';
import styles from './page.module.css';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import React from 'react';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Hand-pick the best popular themes to show on the homepage
  const popularSlugs = [
    'dinosaurs', 'unicorns', 'space-exploration', 'fairies', 
    'mandalas', 'princesses-castles', 'animals', 'vehicles', 
    'disney-princesses', 'paw-patrol', 'superheroes', 'ocean-life'
  ];
  
  const allThemes = getThemes(lang);
  
  // Filter for our preferred slugs, fallback to nice looking themes (no "A_..." folders)
  let topThemes = allThemes.filter(t => popularSlugs.includes(t.slug));
  if (topThemes.length < 8) {
    const others = allThemes.filter(t => !popularSlugs.includes(t.slug) && !t.title.startsWith('A '));
    topThemes = [...topThemes, ...others];
  }
  topThemes = topThemes.slice(0, 8); // Show exactly 8

  const featuredPages = getColoringPages(lang).filter(p => !p.title.startsWith('A ')).slice(0, 8);
  const isEn = lang === 'en';

  const ageCards = [
    {
      slug: isEn ? 'kids' : 'kinderen',
      name: isEn ? 'Toddlers (1-3)' : 'Peuters (1-3)',
      emoji: '👶',
      desc: isEn ? 'Simple shapes & thick outlines' : 'Eenvoudige vormen & dikke lijnen',
      className: styles.ageToddlers,
      hubSlug: isEn ? 'tv-series-and-movies' : 'tv-series-en-films',
      themeSlug: 'paw-patrol',
      ageSlug: isEn ? 'kids' : 'kinderen'
    },
    {
      slug: isEn ? 'kids' : 'kinderen',
      name: isEn ? 'Kids (4-10)' : 'Kinderen (4-10)',
      emoji: '🧒',
      desc: isEn ? 'Fun characters & creative scenes' : 'Leuke karakters & creatieve scènes',
      className: styles.ageKids,
      hubSlug: isEn ? 'disney-and-fairy-tales' : 'disney-en-sprookjes',
      themeSlug: 'disney-princesses',
      ageSlug: isEn ? 'kids' : 'kinderen'
    },
    {
      slug: isEn ? 'teens' : 'tieners',
      name: isEn ? 'Teens (11-17)' : 'Tieners (11-17)',
      emoji: '🎨',
      desc: isEn ? 'Detailed anime, gaming & fantasy' : 'Gedetailleerde anime, games & fantasie',
      className: styles.ageTeens,
      hubSlug: isEn ? 'games-and-pop-culture' : 'games-en-popcultuur',
      themeSlug: 'pokemon',
      ageSlug: isEn ? 'teens' : 'tieners'
    },
    {
      slug: isEn ? 'adults' : 'volwassenen',
      name: isEn ? 'Adults (18+)' : 'Volwassenen (18+)',
      emoji: '✨',
      desc: isEn ? 'Intricate mandalas & cozy hygge' : 'Ingewikkelde mandala\'s & cozy hygge',
      className: styles.ageAdults,
      hubSlug: 'mandalas',
      themeSlug: 'mandalas',
      ageSlug: isEn ? 'adults' : 'volwassenen'
    }
  ];

  const quickSearchPills = [
    { name: isEn ? 'Dinosaurs' : 'Dinosaurussen', query: 'dinosaur' },
    { name: isEn ? 'Unicorns' : 'Eenhoorns', query: 'unicorn' },
    { name: isEn ? 'Pokemon' : 'Pokemon', query: 'pokemon' },
    { name: isEn ? 'Disney' : 'Disney', query: 'disney' },
    { name: 'SpongeBob', query: 'spongebob' },
    { name: 'Mandalas', query: 'mandala' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBgGlow} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>
            ✨ {isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}
          </span>
          <h1 className={styles.heroTitle}>
            {isEn ? (
              <>Free Premium<br /><span>Coloring Pages</span></>
            ) : (
              <>Gratis Premium<br /><span>Kleurplaten</span></>
            )}
          </h1>
          <p className={styles.heroSubtitle}>
            {isEn
              ? 'Discover thousands of high-quality printable coloring pages for toddlers, kids, teens, and adults. Free instant PDF & image downloads!'
              : 'Ontdek duizenden gratis printbare kleurplaten van topkwaliteit voor peuters, kinderen, tieners en volwassenen. Direct gratis printen & downloaden!'}
          </p>

          <form className={styles.searchWrapper} action={`/${lang}/search`} method="GET">
            <input 
              type="text" 
              name="q"
              placeholder={isEn ? "Search 10,000+ coloring pages (e.g. Paw Patrol, Dragon...)" : "Zoek 10.000+ kleurplaten (bijv. Paw Patrol, Draken...)"} 
              className={styles.searchInput}
              required
            />
            <button type="submit" className={styles.searchBtn}>
              {isEn ? "Search" : "Zoeken"}
            </button>
          </form>

          {/* Quick Search Pills */}
          <div className={styles.quickPills}>
            <span className={styles.pillLabel}>{isEn ? 'Trending:' : 'Populair:'}</span>
            {quickSearchPills.map((pill) => (
              <Link key={pill.name} href={`/${lang}/search?q=${pill.query}`} className={styles.quickPill}>
                {pill.name}
              </Link>
            ))}
          </div>

          <div className={styles.heroCtas}>
            <Link href={`/${lang}/collections`} className="btn-primary">
              🎨 {isEn ? 'Explore All Collections' : 'Alle Collecties Bekijken'}
            </Link>
            <Link href={`/${lang}/mandalas`} className="btn-secondary">
              🧘 {isEn ? 'Adult Mandalas' : 'Volwassenen Mandala\'s'}
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Google AdSense Header Banner */}
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        {/* Popular Categories */}
        <section className="section">
          <div className="section-header">
            <div>
              <span className="badge">✨ {isEn ? 'Popular Categories' : 'Populaire Categorieën'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Explore Our Top Themes' : 'Ontdek Onze Top Thema\'s'}
              </h2>
            </div>
          </div>
          <div className="grid-4">
            {topThemes.map((theme) => (
              <Link key={theme.slug} href={`/${lang}/${theme.parentHub}/${theme.slug}`} className="card">
                <div className="card-img-wrapper" style={{ aspectRatio: '4/3' }}>
                  <Image 
                    src={theme.image} 
                    alt={theme.title} 
                    fill 
                    className="card-img" 
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{theme.title}</h3>
                  <p className="card-desc" style={{ marginBottom: '0' }}>
                    {isEn ? 'Browse Collection →' : 'Bekijk Collectie →'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Age Section */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <div>
              <span className="badge">👶 {isEn ? 'All Ages' : 'Alle Leeftijden'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Browse by Age Group' : 'Blader op Leeftijdsgroep'}
              </h2>
            </div>
          </div>
          <div className={styles.ageGrid}>
            {ageCards.map((age) => (
              <Link 
                key={age.name} 
                href={`/${lang}/${age.hubSlug}/${age.themeSlug}/${age.ageSlug}`}
                className={`${styles.ageCard} ${age.className}`}
              >
                <div className={styles.ageEmoji}>{age.emoji}</div>
                <h3 className={styles.ageName}>{age.name}</h3>
                <p className={styles.ageDesc}>{age.desc}</p>
                <div className={styles.ageCta}>{isEn ? 'Explore →' : 'Ontdek →'}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* In-Feed Native Ad */}
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        {/* Latest Additions Grid */}
        <section className="section">
          <div className="section-header">
            <div>
              <span className="badge">🆕 {isEn ? 'Fresh Additions' : 'Nieuwste Kleurplaten'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Recently Added Coloring Pages' : 'Recente Kleurplaten'}
              </h2>
            </div>
          </div>
          <div className="grid-4">
            {featuredPages.map((page, index) => {
              if (index === 4) {
                return (
                  <React.Fragment key="ad-in-grid">
                    <AdSlot type="in-feed" text={isEn ? "Sponsored" : "Gesponsord"} />
                    <MotionCard page={page} lang={lang} isEn={isEn} />
                  </React.Fragment>
                );
              }
              return <MotionCard key={page.id} page={page} lang={lang} isEn={isEn} />;
            })}
          </div>
        </section>
      </div>

      {/* Trust & Benefits Section */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyInner}>
            <div>
              <span className="badge">💜 {isEn ? 'Why ColorVaults?' : 'Waarom ColorVaults?'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                {isEn ? 'The Best Free Printable Coloring Pages' : 'De Beste Gratis Printbare Kleurplaten'}
              </h2>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1rem', lineHeight: 1.8, fontSize: '1.025rem' }}>
                {isEn
                  ? 'ColorVaults is your premier destination for high-quality, free printable coloring pages. We believe creativity should be accessible to everyone — which is why our entire collection is 100% free with no signups required.'
                  : 'ColorVaults is jouw bestemming voor gratis printbare kleurplaten van topkwaliteit. Wij geloven dat creativiteit voor iedereen toegankelijk moet zijn — daarom is onze hele collectie 100% gratis zonder registratie.'}
              </p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, fontSize: '1.025rem' }}>
                {isEn
                  ? 'Whether you are a parent looking for easy toddler activities, a teacher needing classroom worksheets, or an adult unwinding with intricate mandalas — we have thousands of high-definition line art pages ready to print.'
                  : 'Of je nu een ouder bent die activiteiten zoekt voor peuters, een leraar voor lesmateriaal, of een volwassene die ontspant met mandala\'s — wij hebben duizenden hoge resolutie kleurplaten printklaar.'}
              </p>
            </div>
            <div>
              {[
                { icon: '🆓', title: isEn ? '100% Free Forever' : '100% Gratis Voor Altijd', desc: isEn ? 'No paywalls, no subscriptions, no accounts. Download & print instantly.' : 'Geen abonnementskosten, geen account nodig. Direct printen.' },
                { icon: '🖨️', title: isEn ? 'Print-Optimized' : 'Optimaal Af te Drukken', desc: isEn ? 'Clean crisp line art formatted for standard A4 and Letter paper.' : 'Scherpe lijnen geformatteerd voor A4 en Letter papier.' },
                { icon: '👶', title: isEn ? 'Curated by Age' : 'Gesorteerd op Leeftijd', desc: isEn ? 'Tailored difficulty levels for toddlers, kids, teens & adults.' : 'Aangepaste moeilijkheidsgraden voor peuters, kinderen & volwassenen.' },
                { icon: '🌍', title: isEn ? 'Bilingual Support' : 'Bilingual Support', desc: isEn ? 'Fully bilingual experience in English and Dutch.' : 'Volledig beschikbaar in Engels en Nederlands.' },
              ].map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{f.icon}</div>
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
      
      <div className="container">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />
      </div>
    </>
  );
}
