import SafeImage from '@/components/SafeImage';
import DailyColoringChallenge from '@/components/DailyColoringChallenge';
import SeasonalEventBanner from '@/components/SeasonalEventBanner';
import NewsletterBox from '@/components/NewsletterBox';
import { getThemes, getColoringPages, getMainHubs, getSampleImagesForTheme } from '@/lib/api';
import ThemeCard from '@/components/ThemeCard';
import { blogPosts } from '@/data/blogs';
import styles from './page.module.css';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryExplorerTabs from '@/components/CategoryExplorerTabs';
import FaqSection from '@/components/FaqSection';
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
  const isEn = lang === 'en';

  const allThemes = getThemes(lang);
  const mainHubs = getMainHubs(lang);

  // Popular character theme slugs
  const characterSlugs = [
    'frozen', 'pokemon', 'sonic-the-hedgehog', 'marvel-spider-man', 
    'paw-patrol', 'beauty-and-the-beast-belle', 'bluey', 'spongebob-squarepants',
    'super-mario', 'dragonball', 'minecraft-voxel-worlds', 'the-lion-king'
  ];

  // Animal & nature slugs
  const animalSlugs = [
    'dinosaur-adventures', 'unicorns-pegasus', 'cute-puppies-dogs', 'cute-kittens-cats',
    'safari-lions-big-cats', 'ocean-life-whales', 'horses-ponies', 'birds-of-the-world'
  ];

  const popularCharacters = allThemes
    .filter(t => characterSlugs.some(s => t.slug.includes(s)))
    .slice(0, 8);

  const popularAnimals = allThemes
    .filter(t => animalSlugs.some(s => t.slug.includes(s)))
    .slice(0, 4);

  const featuredPages = getColoringPages(lang).filter(p => !p.title.startsWith('A ')).slice(0, 8);

  const difficultyCards = [
    {
      slug: 'kids',
      name: isEn ? 'Easy' : 'Makkelijk',
      badge: isEn ? 'Level 1' : 'Niveau 1',
      desc: isEn ? 'Simple shapes & fun designs for preschoolers and toddlers' : 'Eenvoudige vormen & leuke designs voor peuters en kleuters',
      className: styles.ageKids,
      hubSlug: 'kids-tv-shows',
      themeSlug: 'paw-patrol',
      ageSlug: 'kids'
    },
    {
      slug: 'teens',
      name: isEn ? 'Medium' : 'Gemiddeld',
      badge: isEn ? 'Level 2' : 'Niveau 2',
      desc: isEn ? 'Creative scenes with rich details and vibrant characters' : 'Creatieve scènes met leuke details en populaire karakters',
      className: styles.ageTeens,
      hubSlug: 'gaming-virtual-worlds',
      themeSlug: 'pokemon',
      ageSlug: 'teens'
    },
    {
      slug: 'adults',
      name: isEn ? 'Hard' : 'Moeilijk',
      badge: isEn ? 'Level 3' : 'Niveau 3',
      desc: isEn ? 'Intricate floral mandalas and relaxing complex line art' : 'Ingewikkelde bloemenmandala\'s en ontspannende lijntekeningen',
      className: styles.ageAdults,
      hubSlug: 'art-aesthetic',
      themeSlug: 'mandalas-sacred-geometry',
      ageSlug: 'adults'
    }
  ];

  const quickSearchPills = [
    { name: isEn ? '🦖 Dinosaurs' : '🦖 Dinosauriërs', href: `/${lang}/animals-wildlife/dinosaur-adventures` },
    { name: isEn ? '🦄 Unicorns' : '🦄 Eenhoorns', href: `/${lang}/fantasy-fairytales/unicorns-pegasus` },
    { name: '⚡ Pokémon', href: `/${lang}/gaming-virtual-worlds/pokemon` },
    { name: '🏰 Disney', href: `/${lang}/disney-pixar` },
    { name: '🍍 SpongeBob', href: `/${lang}/kids-tv-shows/spongebob-squarepants` },
    { name: isEn ? '🧘 Mandalas' : '🧘 Mandala\'s', href: `/${lang}/art-aesthetic/mandalas-sacred-geometry` }
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={`ink-blob ${styles.blobTopLeft}`} aria-hidden="true" />
        <div className={`ink-blob ${styles.blobBottomRight}`} aria-hidden="true" />
        <div className={styles.blobCenter} aria-hidden="true" />

        <div className="container">
          <div className={styles.heroLayout}>
            {/* LEFT: text content */}
            <div className={styles.heroContent}>
              <span className={`${styles.heroBadge} hero-anim-0`}>
                {isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}
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
                  <Link key={pill.name} href={pill.href} className={styles.quickPill}>
                    {pill.name}
                  </Link>
                ))}
              </div>

              <div className={`${styles.heroCtas} hero-anim-4`}>
                <Link href={`/${lang}/search`} className="btn-primary">
                  {isEn ? 'Explore All Collections' : 'Alle Collecties Bekijken'}
                </Link>
                <Link href={`/${lang}/art-aesthetic/mandalas-sacred-geometry`} className="btn-secondary">
                  {isEn ? 'Mandalas' : 'Mandala\'s'}
                </Link>
              </div>
            </div>

            {/* RIGHT: 3D rotating carousel */}
            <div className={`${styles.heroVisual} hero-anim-1`}>
              <HeroCarousel
                items={getColoringPages(lang)
                  .filter(p => p.image && !p.image.includes('default.jpg'))
                  .slice(0, 16)
                  .map(p => ({
                    src: p.image,
                    alt: p.title,
                    href: `/${lang}/${p.parentHub}/${p.parentTheme}/${p.ageGroup}`,
                  }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 0: Explore All 10 Master Hubs Showcase ── */}
      <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">10 {isEn ? 'Master Hubs' : 'Hoofdcategorieën'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Explore All 10 Hubs' : 'Ontdek Alle 10 Hoofdcategorieën'}
              </h2>
            </div>
            <Link href={`/${lang}/search`} className="btn-secondary">
              {isEn ? 'Explore All 10,000+ Pages →' : 'Alle 10.000+ Kleurplaten →'}
            </Link>
          </ScrollReveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.25rem',
          }}>
            {mainHubs.map((hub, i) => {
              const hubThemeCount = allThemes.filter(t => t.parentHub === hub.slug).length;
              return (
                <ScrollReveal key={hub.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                  <Link
                    href={`/${lang}/${hub.slug}`}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-lg, 16px)',
                      overflow: 'hidden',
                      aspectRatio: '16/10',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '1.25rem',
                      textDecoration: 'none',
                      border: '1px solid var(--gray-200)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <SafeImage
                      src={hub.image}
                      alt={hub.title}
                      width={480}
                      height={300}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.85) 100%)',
                      zIndex: 1,
                    }} />
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        marginBottom: '0.4rem',
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}>
                        {hubThemeCount} {isEn ? 'Themes' : 'Thema’s'}
                      </span>
                      <h3 style={{
                        color: '#FFFFFF',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.25,
                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      }}>
                        {hub.title}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
          <SeasonalEventBanner isEn={isEn} lang={lang} />
        </div>
      </section>

      {/* ── Section 1: Trending Characters & Shows ── */}
      {popularCharacters.length > 0 && (
        <section className="section">
          <div className="container">
            <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

            <ScrollReveal className="section-header">
              <div>
                <span className="badge">{isEn ? 'Trending Characters' : 'Populaire Karakters'}</span>
                <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                  {isEn ? 'Popular Series & Movies' : 'Populaire Series & Films'}
                </h2>
              </div>
              <Link href={`/${lang}/disney-pixar`} className="btn-secondary">
                {isEn ? 'View All Series →' : 'Bekijk Alle Series →'}
              </Link>
            </ScrollReveal>

            <div className="grid-4">
              {popularCharacters.map((theme, i) => {
                const sampleImages = getSampleImagesForTheme(lang, theme.parentHub, theme.slug, theme.image, 3);
                return (
                  <ScrollReveal key={theme.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                    <ThemeCard
                      lang={lang}
                      hubSlug={theme.parentHub}
                      themeSlug={theme.slug}
                      title={theme.title}
                      description={theme.description}
                      images={sampleImages}
                      pageCount={theme.pageCount}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="container" style={{ marginBottom: '2.5rem' }}>
        <DailyColoringChallenge isEn={isEn} lang={lang} />
      </div>

      {/* ── Section 2: Interactive Category Explorer (Tabbed) ── */}
      <section className="section-light">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{allThemes.length} {isEn ? 'Albums Available' : 'Albums Beschikbaar'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Explore by Category' : 'Blader op Categorie'}
              </h2>
            </div>
            <Link href={`/${lang}/search`} className="btn-secondary">
              {isEn ? 'Full Search & Filters →' : 'Uitgebreid Zoeken & Filteren →'}
            </Link>
          </ScrollReveal>

          <CategoryExplorerTabs
            lang={lang}
            hubs={mainHubs}
            themes={allThemes}
          />
        </div>
      </section>

      {/* ── Section 3: Browse by Difficulty ── */}
      <section className="section">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ? 'Choose Difficulty' : 'Kies Moeilijkheidsgraad'}</span>
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
                  <div className={styles.ageEmoji}>{age.badge}</div>
                  <h3 className={styles.ageName}>{age.name}</h3>
                  <p className={styles.ageDesc}>{age.desc}</p>
                  <div className={styles.ageCta}>{isEn ? 'Explore →' : 'Ontdek →'}</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Cute Animals & Nature Showcase ── */}
      {popularAnimals.length > 0 && (
        <section className="section-light">
          <div className="container">
            <ScrollReveal className="section-header">
              <div>
                <span className="badge">{isEn ? 'Fauna & Nature' : 'Dierenrijk'}</span>
                <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                  {isEn ? 'Animals & Wildlife' : 'Dieren & Natuur'}
                </h2>
              </div>
              <Link href={`/${lang}/animals-wildlife`} className="btn-secondary">
                {isEn ? 'All Animal Pages →' : 'Alle Dierenplaten →'}
              </Link>
            </ScrollReveal>

            <div className="grid-4">
              {popularAnimals.map((theme, i) => {
                const sampleImages = getSampleImagesForTheme(lang, theme.parentHub, theme.slug, theme.image, 3);
                return (
                  <ScrollReveal key={theme.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                    <ThemeCard
                      lang={lang}
                      hubSlug={theme.parentHub}
                      themeSlug={theme.slug}
                      title={theme.title}
                      description={theme.description}
                      images={sampleImages}
                      pageCount={theme.pageCount}
                    />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 5: Recently Added Coloring Pages ── */}
      <section className="section">
        <div className="container">
          <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ? 'Fresh Additions' : 'Nieuwste Kleurplaten'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Recently Added Line Art' : 'Recente Kleurplaten'}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid-4">
            {featuredPages.map((page, idx) => (
              <ScrollReveal key={page.slug} delay={(idx % 4) as 0 | 1 | 2 | 3 | 4}>
                <MotionCard page={page} lang={lang} isEn={isEn} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Guides & Articles ── */}
      <section className="section-light">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ? 'Educational Guides' : 'Tips & Lesideën'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? 'Latest Guides & Parenting Tips' : 'Laatste Tips voor Ouders & Onderwijs'}
              </h2>
            </div>
            <Link href={`/${lang}/blog`} className="btn-secondary">
              {isEn ? 'View All Guides →' : 'Bekijk Alle Tips →'}
            </Link>
          </ScrollReveal>

          <div className="grid-3">
            {(blogPosts[lang === 'nl' ? 'nl' : 'en'] || blogPosts.en).map(post => (
              <ScrollReveal key={post.slug}>
                <Link href={`/${lang}/blog/${post.slug}`} className="card">
                  <div className="card-img-wrapper" style={{ aspectRatio: '16/9', position: 'relative' }}>
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body">
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                      {post.category}
                    </span>
                    <h3 className="card-title" style={{ fontSize: '1.1rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                      {post.title}
                    </h3>
                    <p className="card-desc" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Why ColorVaults ── */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyInner}>
            <ScrollReveal>
              <span className="badge" style={{ background: 'rgba(79, 70, 229, 0.08)', color: 'var(--color-primary)', borderColor: 'rgba(79, 70, 229, 0.2)' }}>
                {isEn ? 'Why ColorVaults?' : 'Waarom ColorVaults?'}
              </span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
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
                { number: '01', title: isEn ? '100% Free Forever' : '100% Gratis Voor Altijd', desc: isEn ? 'No paywalls, no subscriptions, no accounts. Download & print instantly.' : 'Geen abonnementskosten, geen account nodig. Direct printen.' },
                { number: '02', title: isEn ? 'Print-Optimized' : 'Optimaal Af te Drukken', desc: isEn ? 'Clean crisp line art formatted for standard A4 and Letter paper.' : 'Scherpe lijnen geformatteerd voor A4 en Letter papier.' },
                { number: '03', title: isEn ? 'Curated by Age' : 'Gesorteerd op Leeftijd', desc: isEn ? 'Tailored difficulty levels for toddlers, kids, teens & adults.' : 'Aangepaste moeilijkheidsgraden voor peuters, kinderen & volwassenen.' },
                { number: '04', title: isEn ? 'Bilingual Support' : 'Tweetalig', desc: isEn ? 'Fully bilingual experience in English and Dutch.' : 'Volledig beschikbaar in Engels en Nederlands.' },
              ].map((f, i) => (
                <ScrollReveal key={f.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureIcon}>{f.number}</div>
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

      {/* ── Section 8: FAQ & SEO Knowledge Base ── */}
      <FaqSection isEn={isEn} />

      <div className="container" style={{ padding: '2rem 0' }}>
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
      </div>
    </>
  );
}