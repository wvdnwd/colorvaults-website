import Image from 'next/image';
import { getThemes, getColoringPages } from '@/lib/api';
import styles from './page.module.css';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'nl': '/nl',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: isEn ? 'ColorVaults | Free Premium Coloring Pages' : 'ColorVaults | Gratis Premium Kleurplaten',
      description: isEn
        ? 'Download thousands of high-quality free printable coloring pages for kids, toddlers, teens and adults. 100% free, no account required.'
        : 'Download duizenden gratis printbare kleurplaten van topkwaliteit voor kinderen, peuters, tieners en volwassenen. 100% gratis.',
      url: `https://colorvaults.com/${lang}`,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const popularSlugs = [
    'dinosaurs', 'unicorns', 'space-exploration', 'fairies',
    'mandalas', 'princesses-castles', 'animals', 'vehicles',
    'disney-princesses', 'paw-patrol', 'superheroes', 'ocean-life'
  ];

  const allThemes = getThemes(lang);

  let topThemes = allThemes.filter(t => popularSlugs.includes(t.slug));
  if (topThemes.length < 8) {
    const others = allThemes.filter(t => !popularSlugs.includes(t.slug) && !t.title.startsWith('A '));
    topThemes = [...topThemes, ...others];
  }
  topThemes = topThemes.slice(0, 8);

  const featuredPages = getColoringPages(lang).filter(p => !p.title.startsWith('A ')).slice(0, 8);
  const isEn = lang === 'en';

  const difficultyCards = [
    {
      slug: 'kids',
      name: isEn ? 'Easy' : 'Makkelijk',
      emoji: '⭐',
      desc: isEn ? 'Simple shapes & fun designs for everyone' : 'Eenvoudige vormen & leuke designs voor iedereen',
      className: styles.ageKids,
      hubSlug: isEn ? 'animals-and-nature' : 'animals-and-nature',
      themeSlug: 'animals',
      ageSlug: 'kids'
    },
    {
      slug: 'teens',
      name: isEn ? 'Medium' : 'Gemiddeld',
      emoji: '⭐⭐',
      desc: isEn ? 'More detail & creative scenes' : 'Meer detail & creatieve scènes',
      className: styles.ageTeens,
      hubSlug: isEn ? 'games-and-pop-culture' : 'games-and-pop-culture',
      themeSlug: 'pokemon',
      ageSlug: 'teens'
    },
    {
      slug: 'adults',
      name: isEn ? 'Hard' : 'Moeilijk',
      emoji: '⭐⭐⭐',
      desc: isEn ? 'Intricate patterns & fine details' : 'Ingewikkelde patronen & fijne details',
      className: styles.ageAdults,
      hubSlug: 'mandalas',
      themeSlug: 'mandalas',
      ageSlug: 'adults'
    }
  ];

  const quickSearchPills = [
    { name: isEn ? 'Dinosaurs' : 'Dinosaurussen', query: 'dinosaur' },
    { name: isEn ? 'Unicorns' : 'Eenhoorns', query: 'unicorn' },
    { name: 'Pokemon', query: 'pokemon' },
    { name: 'Disney', query: 'disney' },
    { name: 'SpongeBob', query: 'spongebob' },
    { name: 'Mandalas', query: 'mandala' }
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        {/* Decorative ink blobs — pointer-events: none in CSS */}
        <div className={`ink-blob ${styles.blobTopLeft}`} aria-hidden="true" />
        <div className={`ink-blob ${styles.blobBottomRight}`} aria-hidden="true" />
        <div className={styles.blobCenter} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroLayout}>

            {/* LEFT: text content */}
            <div className={styles.heroContent}>
              <span className={`${styles.heroBadge} hero-anim-0`}>
                ✨ {isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}
              </span>
              <h1 className={`${styles.heroTitle} hero-anim-1`}>
                {isEn ? (
                  <>Free Premium<br /><span>Coloring Pages</span></>
                ) : (
                  <>Gratis Premium<br /><span>Kleurplaten</span></>
                )}
              </h1>
              <p className={`${styles.heroSubtitle} hero-anim-2`}>
                {isEn
                  ? 'Thousands of high-quality printable coloring pages for toddlers, kids, teens, and adults. Free instant downloads — no account needed!'
                  : 'Duizenden gratis printbare kleurplaten voor peuters, kinderen, tieners en volwassenen. Direct gratis downloaden — geen account nodig!'}
              </p>

              <form className={`${styles.searchWrapper} hero-anim-3`} action={`/${lang}/search`} method="GET">
                <input
                  type="text"
                  name="q"
                  placeholder={isEn ? 'Search 10,000+ coloring pages...' : 'Zoek 10.000+ kleurplaten...'}
                  className={styles.searchInput}
                  required
                />
                <button type="submit" className={styles.searchBtn}>
                  {isEn ? 'Search' : 'Zoeken'}
                </button>
              </form>

              <div className={`${styles.quickPills} hero-anim-3`}>
                <span className={styles.pillLabel}>{isEn ? 'Trending:' : 'Populair:'}</span>
                {quickSearchPills.map((pill) => (
                  <Link key={pill.name} href={`/${lang}/search?q=${pill.query}`} className={styles.quickPill}>
                    {pill.name}
                  </Link>
                ))}
              </div>

              <div className={`${styles.heroCtas} hero-anim-4`}>
                <Link href={`/${lang}/collections`} className="btn-primary">
                  🎨 {isEn ? 'Explore All Collections' : 'Alle Collecties Bekijken'}
                </Link>
                <Link href={`/${lang}/mandalas`} className="btn-secondary">
                  🧘 {isEn ? 'Adult Mandalas' : 'Volwassenen Mandala\'s'}
                </Link>
              </div>
            </div>

            {/* RIGHT: 3D rotating carousel */}
            <div className={`${styles.heroVisual} hero-anim-1`}>
              <HeroCarousel
                images={topThemes.map(t => ({ src: t.image, alt: t.title }))}
              />
            </div>

          </div>
        </div>
      </section>


      {/* ── Section 1: Popular Categories — dark teal ── */}
      <section className="section-dark">
        <div className="container">
          <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

          <ScrollReveal className="section-header">
            <div>
              <span className="badge">✨ {isEn ? 'Popular Categories' : 'Populaire Categorieën'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem', color: 'var(--color-text-light)' }}>
                {isEn ? 'Explore Our Top Themes' : 'Ontdek Onze Top Thema\'s'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {topThemes.map((theme, i) => (
              <ScrollReveal key={theme.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <Link href={`/${lang}/${theme.parentHub}/${theme.slug}`} className="card">
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
                    <p className="card-desc" style={{ marginBottom: 0 }}>
                      {isEn ? 'Browse Collection →' : 'Bekijk Collectie →'}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Browse by Difficulty — light cream ── */}
      <section className="section-light">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">⭐ {isEn ? 'Choose Difficulty' : 'Kies Moeilijkheidsgraad'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Browse by Difficulty Level' : 'Blader op Moeilijkheidsgraad'}
              </h2>
            </div>
          </ScrollReveal>

          <div className={styles.ageGrid}>
            {difficultyCards.map((age, i) => (
              <ScrollReveal key={age.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <Link
                  href={`/${lang}/${age.hubSlug}/${age.themeSlug}/${age.ageSlug}`}
                  className={`${styles.ageCard} ${age.className}`}
                >
                  <div className={styles.ageEmoji}>{age.emoji}</div>
                  <h3 className={styles.ageName}>{age.name}</h3>
                  <p className={styles.ageDesc}>{age.desc}</p>
                  <div className={styles.ageCta}>{isEn ? 'Explore →' : 'Ontdek →'}</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Recently Added — dark teal ── */}
      <section className="section-dark">
        <div className="container">
          <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

          <ScrollReveal className="section-header">
            <div>
              <span className="badge">🆕 {isEn ? 'Fresh Additions' : 'Nieuwste Kleurplaten'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem', color: 'var(--color-text-light)' }}>
                {isEn ? 'Recently Added Coloring Pages' : 'Recente Kleurplaten'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {featuredPages.map((page, index) => {
              if (index === 4) {
                return (
                  <React.Fragment key="ad-in-grid">
                    <AdSlot type="in-feed" text={isEn ? 'Sponsored' : 'Gesponsord'} />
                    <ScrollReveal delay={0}>
                      <MotionCard page={page} lang={lang} isEn={isEn} />
                    </ScrollReveal>
                  </React.Fragment>
                );
              }
              return (
                <ScrollReveal key={page.id} delay={(index % 4) as 0 | 1 | 2 | 3 | 4}>
                  <MotionCard page={page} lang={lang} isEn={isEn} />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Why ColorVaults — light cream ── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyInner}>
            <ScrollReveal>
              <span className="badge" style={{ background: 'rgba(15,61,62,0.08)', color: 'var(--color-primary)', borderColor: 'rgba(15,61,62,0.18)' }}>
                🎨 {isEn ? 'Why ColorVaults?' : 'Waarom ColorVaults?'}
              </span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem', marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>
                {isEn ? 'The Best Free Printable Coloring Pages' : 'De Beste Gratis Printbare Kleurplaten'}
              </h2>
              <p className={styles.whyLead}>
                {isEn
                  ? 'ColorVaults is your premier destination for high-quality, free printable coloring pages. We believe creativity should be accessible to everyone — which is why our entire collection is 100% free with no signups required.'
                  : 'ColorVaults is jouw bestemming voor gratis printbare kleurplaten van topkwaliteit. Wij geloven dat creativiteit voor iedereen toegankelijk moet zijn — daarom is onze hele collectie 100% gratis zonder registratie.'}
              </p>
              <p className={styles.whyLead} style={{ marginBottom: 0 }}>
                {isEn
                  ? 'Whether you are a parent, a teacher, or an adult unwinding with intricate mandalas — we have thousands of high-definition line art pages ready to print.'
                  : 'Of je nu een ouder bent, een leraar, of een volwassene die ontspant met mandala\'s — wij hebben duizenden hoge resolutie kleurplaten printklaar.'}
              </p>
            </ScrollReveal>

            <div>
              {[
                { icon: '🆓', title: isEn ? '100% Free Forever' : '100% Gratis Voor Altijd', desc: isEn ? 'No paywalls, no subscriptions, no accounts. Download & print instantly.' : 'Geen abonnementskosten, geen account nodig. Direct printen.' },
                { icon: '🖨️', title: isEn ? 'Print-Optimized' : 'Optimaal Af te Drukken', desc: isEn ? 'Clean crisp line art formatted for standard A4 and Letter paper.' : 'Scherpe lijnen geformatteerd voor A4 en Letter papier.' },
                { icon: '👶', title: isEn ? 'Curated by Age' : 'Gesorteerd op Leeftijd', desc: isEn ? 'Tailored difficulty levels for toddlers, kids, teens & adults.' : 'Aangepaste moeilijkheidsgraden voor peuters, kinderen & volwassenen.' },
                { icon: '🌍', title: isEn ? 'Bilingual Support' : 'Tweetalig', desc: isEn ? 'Fully bilingual experience in English and Dutch.' : 'Volledig beschikbaar in Engels en Nederlands.' },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{f.icon}</div>
                    <div>
                      <h3 className={styles.featureTitle}>{f.title}</h3>
                      <p className={styles.featureDesc}>{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
      </div>
    </>
  );
}
