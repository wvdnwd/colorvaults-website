import SafeImage from'@/components/SafeImage';
import DailyColoringChallenge from'@/components/DailyColoringChallenge';
import DailyFeaturedCard from'@/components/DailyFeaturedCard';
import SeasonalEventBanner from'@/components/SeasonalEventBanner';
import { getThemes, getFeaturedPages, getMainHubs, getSampleImagesForTheme } from'@/lib/api';
import ThemeCard from'@/components/ThemeCard';
import { blogPosts } from'@/data/blogs';
import styles from'./page.module.css';
import Link from'next/link';
import MotionCard from'@/components/MotionCard';
import AdSlot from'@/components/AdSlot';
import AdCard from'@/components/AdCard';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import TrendingCarousel from '@/components/TrendingCarousel';
import HeaderSearchBar from '@/components/HeaderSearchBar';
import CategoryExplorerTabs from '@/components/CategoryExplorerTabs';
import FaqSection from '@/components/FaqSection';
import React from 'react';
import { createMetadata } from '@/lib/seo';
import { SITE_ORIGIN } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const title = isDe
    ? 'ColorVaults | Kostenlose Malvorlagen & Ausmalbilder'
    : isFr
    ? 'ColorVaults | Coloriages Gratuits à Imprimer'
    : isEn
    ? 'Free Printable Coloring Pages: PDF & Online | ColorVaults'
    : 'Gratis kleurplaten printen en downloaden | ColorVaults';

  const description = isDe
    ? 'Kostenlose Malvorlagen und Ausmalbilder für Kinder, Kleinkinder und Erwachsene zum Ausdrucken als PDF.'
    : isFr
    ? 'Téléchargez des coloriages gratuits et dessins à imprimer pour enfants et adultes. Gratuit en PDF.'
    : isEn
    ? 'Download free printable coloring pages for kids, toddlers, teens and adults. Print or color online without an account.'
    : 'Download gratis printbare kleurplaten voor kinderen, peuters, tieners en volwassenen. Print direct of kleur online zonder account.';

  return createMetadata({
    lang,
    path: '/',
    title,
    description,
    image: `${SITE_ORIGIN}/images/og-share.jpg`,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang !== 'nl';

  const allThemes = getThemes(lang);
  const mainHubs = getMainHubs(lang);
  const featuredPool = getFeaturedPages(lang, 50);
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const dailyPage = featuredPool[dayOfYear % (featuredPool.length || 1)] || featuredPool[0];
  const dailyTheme = allThemes.find(t => t.slug === dailyPage?.parentTheme);

  // Popular character theme slugs
  const characterSlugs = ['frozen','pokemon','sonic-the-hedgehog','marvel-spider-man','paw-patrol','beauty-and-the-beast-belle','bluey','spongebob-squarepants','super-mario','dragonball','minecraft-voxel-worlds','the-lion-king'];

  // Animal & nature slugs
  const animalSlugs = ['dinosaur-adventures','unicorns-pegasus','cute-puppies-dogs','cute-kittens-cats','safari-lions-big-cats','ocean-life-whales','horses-ponies','birds-of-the-world'];

  const popularCharacters = allThemes
    .filter(t => characterSlugs.some(s => t.slug.includes(s)))
    .slice(0, 12);

  const popularAnimals = allThemes
    .filter(t => animalSlugs.some(s => t.slug.includes(s)))
    .slice(0, 4);

  const featuredPages = featuredPool.slice(0, 24);

  const difficultyCards = [
    {
      slug:'easy',
      name: isEn ?'Easy':'Makkelijk',
      badge: isEn ?'Level 1':'Niveau 1',
      desc: isEn ?'Simple shapes & fun designs for preschoolers and toddlers':'Eenvoudige vormen & leuke designs voor peuters en kleuters',
      className: styles.ageKids},
    {
      slug:'medium',
      name: isEn ?'Medium':'Gemiddeld',
      badge: isEn ?'Level 2':'Niveau 2',
      desc: isEn ?'Creative scenes with rich details and vibrant characters':'Creatieve scènes met leuke details en populaire karakters',
      className: styles.ageTeens},
    {
      slug:'hard',
      name: isEn ?'Hard':'Moeilijk',
      badge: isEn ?'Level 3':'Niveau 3',
      desc: isEn ?'Intricate floral mandalas and relaxing complex line art':'Ingewikkelde bloemenmandala\'s en ontspannende lijntekeningen',
      className: styles.ageAdults}
  ];

  const quickShortcuts = [
    { name: 'Paw Patrol', icon: '🐶', href: `/${lang}/kids-tv-shows/paw-patrol` },
    { name: 'Pokémon', icon: '⚡', href: `/${lang}/gaming-virtual-worlds/pokemon` },
    { name: 'Frozen (Elsa)', icon: '❄️', href: `/${lang}/disney-pixar/frozen` },
    { name: 'Spider-Man', icon: '🕷️', href: `/${lang}/superheroes-comic-universes/marvel-spider-man` },
    { name: isEn ? 'Dinosaurs' : 'Dinosauriërs', icon: '🦖', href: `/${lang}/animals-wildlife/dinosaur-adventures` },
    { name: isEn ? 'Unicorns' : 'Eenhoorns', icon: '🦄', href: `/${lang}/fantasy-fairytales/unicorns-pegasus` },
    { name: 'Bluey', icon: '🐾', href: `/${lang}/kids-tv-shows/bluey` },
    { name: 'Super Mario', icon: '🍄', href: `/${lang}/gaming-virtual-worlds/super-mario` },
    { name: 'Minecraft', icon: '⛏️', href: `/${lang}/gaming-virtual-worlds/minecraft-voxel-worlds` },
    { name: 'Sonic', icon: '🦔', href: `/${lang}/gaming-virtual-worlds/sonic-the-hedgehog` },
    { name: 'Stitch', icon: '🌺', href: `/${lang}/disney-pixar/lilo-stitch` },
    { name: isEn ? 'Mandalas' : "Mandala's", icon: '🧘', href: `/${lang}/art-aesthetic/mandalas-sacred-geometry` },
    { name: isEn ? 'Puppies & Dogs' : "Puppy's & Honden", icon: '🐕', href: `/${lang}/animals-wildlife/cute-puppies-dogs` },
    { name: isEn ? 'Kittens & Cats' : 'Kittens & Katten', icon: '🐱', href: `/${lang}/animals-wildlife/cute-kittens-cats` },
    { name: 'Dragon Ball', icon: '🥋', href: `/${lang}/anime-manga/dragonball` },
    { name: isEn ? 'Formula 1 & Racing' : 'Formule 1 & Racers', icon: '🏎️', href: `/${lang}/vehicles-transportation/formula-1-race-cars` },
    { name: isEn ? '2026 Calendars' : '2026 Kalenders', icon: '📅', href: `/${lang}/calendars` },
    { name: isEn ? 'How to Draw' : 'Leren Tekenen', icon: '✏️', href: `/${lang}/how-to-draw` },
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={`ink-blob ${styles.blobTopLeft}`} aria-hidden="true"/>
        <div className={`ink-blob ${styles.blobBottomRight}`} aria-hidden="true"/>
        <div className={styles.blobCenter} aria-hidden="true"/>

        <div className="container" style={{ maxWidth: '1200px' }}>
          {/* 1. Top Hero Intro & Live Search (Above Banner, Light & Welcoming) */}
          <div className={styles.heroHeaderWrapper}>
            <div className={styles.heroTopBadge}>
              <span aria-hidden="true">✨</span>
              <span>{isEn ? '100% Free — High Resolution Printables' : '100% Gratis — Hoge Resolutie Printables'}</span>
            </div>
            
            <h1 className={styles.heroMainTitle}>
              {lang === 'de' ? (
                <>Kostenlose Malvorlagen <span className={styles.heroTitleGradient}>zum Ausdrucken & Ausmalen</span></>
              ) : lang === 'fr' ? (
                <>Coloriages gratuits <span className={styles.heroTitleGradient}>à imprimer et à colorier</span></>
              ) : isEn ? (
                <>Free Printable <span className={styles.heroTitleGradient}>Coloring Pages</span></>
              ) : (
                <>Gratis kleurplaten <span className={styles.heroTitleGradient}>om te printen en online in te kleuren</span></>
              )}
            </h1>
            
            <p className={styles.heroMainSubtitle}>
              {isEn
                ? 'Free printable coloring pages for toddlers, kids, teens, and adults. Download without an account!'
                : 'Gratis printbare kleurplaten voor peuters, kinderen, tieners en volwassenen. Download zonder account!'}
            </p>

            {/* Central Hero Search Bar */}
            <div className={styles.heroSearchWrapper}>
              <HeaderSearchBar
                lang={lang}
                variant="hero"
                placeholder={isEn ? 'Search coloring pages (e.g. Spider-Man, Unicorn, Elsa)...' : 'Zoek kleurplaten (bijv. Pokémon, Stitch, Dinos)...'}
              />
            </div>

            {/* Feature & Trust Highlights */}
            <div className={styles.heroFeaturesBar}>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">⚡</span>
                {isEn ? 'Instant PDF Download' : 'Direct PDF Downloaden'}
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">📄</span>
                A4 / Letter Ready
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">🎨</span>
                {isEn ? 'Color Online Tool' : 'Online Inkleuren'}
              </span>
              <span className={styles.heroFeatureItem}>
                <span aria-hidden="true">🛡️</span>
                {isEn ? 'Free Without an Account' : 'Gratis Zonder Account'}
              </span>
            </div>
          </div>

          {/* 2. Full-Width Pure 16:9 3D Vault Banner (Zero text obstruction, centered carousel) */}
          <HeroCarousel
            items={allThemes
              .filter(t => t.image && !t.image.includes('default.jpg'))
              .slice(0, 16)
              .map(t => ({
                src: t.image,
                alt: t.title,
                href: `/${lang}/${t.parentHub}/${t.slug}`,
              }))}
            lang={lang}
          />

          {/* 3. Top Trending Albums & Categories Showcase Shelf (Below Banner, Light & Elegant) */}
          {/* 3. Top Trending Albums & Categories Showcase Shelf (With 3D Art Studio Banner Backdrop) */}
          <div className={styles.trendingShelf}>
            {/* 3D Creative Studio Workbench Artwork Backdrop */}
            <div className={styles.trendingBackdropWrapper} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/trending-banner.jpg"
                alt="3D Creative Craft Studio Workbench"
                className={styles.trendingBackdropImg}
              />
              <div className={styles.trendingBackdropOverlay} />
            </div>

            {/* Interactive Content Layer */}
            <div className={styles.trendingContentLayer}>
              <div className={styles.trendingHeader}>
                <div className={styles.trendingHeaderLeft}>
                  <span className={styles.trendingFireIcon} aria-hidden="true">🔥</span>
                  <div>
                    <h3 className={styles.trendingTitle}>
                      {isEn ? 'Explore Albums & Categories' : 'Ontdek Albums & Categorieën'}
                    </h3>
                    <span className={styles.trendingSubtitle}>
                      {isEn ? 'Quick links to coloring themes and activities' : 'Direct naar kleurthema’s en activiteiten'}
                    </span>
                  </div>
                </div>
                <Link href="#categories" className={styles.trendingBadgeBtn}>
                  <span className={styles.trendingBadgeDot} aria-hidden="true" />
                  <span>{allThemes.length} {isEn ? 'Themes' : "Thema's"}</span>
                  <span aria-hidden="true" className={styles.trendingBadgeArrow}>→</span>
                </Link>
              </div>

              <div className={styles.trendingPillsContainer}>
                {quickShortcuts.map((pill) => (
                  <Link
                    key={pill.name}
                    href={pill.href}
                    className={styles.trendingPill}
                  >
                    <span className={styles.pillIcon} aria-hidden="true">{pill.icon}</span>
                    <span>{pill.name}</span>
                  </Link>
                ))}
              </div>

              {/* Action CTAs */}
              <div className={styles.trendingCtas}>
                <Link
                  href="#collections"
                  className="btn-primary"
                  style={{
                    padding: '0.85rem 2.2rem',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    boxShadow: '0 8px 24px rgba(255, 107, 74, 0.4)',
                  }}
                >
                  {isEn ? '✨ Explore All Collections' : '✨ Alle Collecties Bekijken'}
                </Link>
                <Link
                  href={`/${lang}/how-to-draw`}
                  className="btn-secondary"
                  style={{
                    padding: '0.85rem 2rem',
                    fontSize: '0.96rem',
                    fontWeight: 800,
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(8px)',
                    borderColor: '#CBD5E1',
                    color: '#0F172A',
                  }}
                >
                  {isEn ? '✏️ Learn How to Draw' : '✏️ Stap-voor-stap Leren Tekenen'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore all main hubs */}
      <section id="collections" className="section" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem', scrollMarginTop: '80px' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{mainHubs.length} {isEn ?'Master Hubs':'Hoofdcategorieën'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ? `Explore All ${mainHubs.length} Hubs` : `Ontdek Alle ${mainHubs.length} Hoofdcategorieën`}
              </h2>
            </div>
            <Link href={`/${lang}/search`} className="btn-secondary">
              {isEn ?'Explore All Coloring Pages →':'Alle Kleurplaten →'}
            </Link>
          </ScrollReveal>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(230px, 1fr))',
            gap:'1.25rem',
          }}>
            {mainHubs.map((hub, i) => {
              const hubThemeCount = allThemes.filter(t => t.parentHub === hub.slug).length;
              return (
                <ScrollReveal key={hub.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                  <Link
                    href={`/${lang}/${hub.slug}`}
                    style={{
                      position:'relative',
                      borderRadius:'var(--radius-lg, 16px)',
                      overflow:'hidden',
                      aspectRatio:'16/10',
                      display:'flex',
                      flexDirection:'column',
                      justifyContent:'flex-end',
                      padding:'1.25rem',
                      textDecoration:'none',
                      border:'1px solid var(--gray-200)',
                      boxShadow:'0 4px 14px rgba(0,0,0,0.06)',
                      transition:'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    <SafeImage
                      src={hub.image}
                      alt={hub.title}
                      width={480}
                      height={300}
                      style={{ position:'absolute', inset: 0, width:'100%', height:'100%', objectFit:'cover'}}
                    />
                    <div style={{
                      position:'absolute',
                      inset: 0,
                      background:'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.85) 100%)',
                      zIndex: 1,
                    }} />
                    <div style={{ position:'relative', zIndex: 2 }}>
                      <span style={{
                        display:'inline-block',
                        background:'rgba(255,255,255,0.2)',
                        backdropFilter:'blur(8px)',
                        color:'#FFFFFF',
                        fontSize:'0.72rem',
                        fontWeight: 800,
                        padding:'0.2rem 0.6rem',
                        borderRadius:'9999px',
                        marginBottom:'0.4rem',
                        border:'1px solid rgba(255,255,255,0.3)',
                      }}>
                        {hubThemeCount} {isEn ?'Themes':'Thema’s'}
                      </span>
                      <h3 style={{
                        color:'#FFFFFF',
                        fontSize:'1.15rem',
                        fontWeight: 800,
                        margin: 0,
                        lineHeight: 1.25,
                        textShadow:'0 2px 8px rgba(0,0,0,0.5)',
                      }}>
                        {hub.title}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Daily Coloring Page Spotlight */}
          {dailyPage && (
            <DailyFeaturedCard
              page={dailyPage}
              isEn={isEn}
              lang={lang}
              themeTitle={dailyTheme?.title}
            />
          )}

          {/* Trending Carousel */}
          <TrendingCarousel
            items={featuredPool.slice(0, 15)}
            lang={lang}
            isEn={isEn}
          />

          <SeasonalEventBanner isEn={isEn} lang={lang} />
        </div>
      </section>

      {/* ── Section: Custom Coloring Book Builder Showcase (ColorVaults Superpower) ── */}
      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 40%, #FAF5FF 100%)',
            border: '2px solid #C7D2FE',
            borderRadius: '28px',
            padding: '2.5rem 2.25rem',
            boxShadow: '0 15px 40px rgba(79, 70, 229, 0.08)',
          }}>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.25rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#4F46E5',
                color: '#FFFFFF',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
              }}>
                <span>✨</span>
                <span>{isEn ? 'Free Coloring Book Maker' : 'Gratis Kleurboek Maker'}</span>
              </span>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                fontWeight: 900,
                color: '#0F172A',
                marginTop: '0.85rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}>
                {isEn ? 'Create Your Own Custom Coloring Book in 3 Easy Steps' : 'Stel Je Eigen Printbare Kleurboek Samen in 3 Stappen'}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', marginTop: '0.6rem', lineHeight: 1.6 }}>
                {isEn
                  ? 'Why download 20 separate PDF files? ColorVaults lets you bundle your child’s or classroom’s favorite characters into one organized, printable coloring booklet with a personalized front cover!'
                  : 'Waarom zou je 20 losse PDF’s downloaden? Bij ColorVaults bundel je al je favoriete thema’s in één compleet, printklaar boekje met een gepersonaliseerd voorblad!'}
              </p>
            </div>

            {/* 3 Step Visual Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {[
                {
                  step: '1',
                  icon: '🎨',
                  title: isEn ? '1. Pick Your Favorites' : '1. Kies Je Favoriete Platen',
                  desc: isEn
                    ? 'Click "+ Bundle" on any coloring sheet (mix Pokémon, Stitch, Dinosaurs, and Mandalas together!).'
                    : 'Tik op "+ Kleurboek" bij elke gewenste plaat. Mix gerust Pokémon, Stitch, Dino’s en Mandala’s door elkaar!',
                },
                {
                  step: '2',
                  icon: '✍️',
                  title: isEn ? '2. Personalize Your Book' : '2. Personaliseer Met Een Naam',
                  desc: isEn
                    ? 'Open your bundle drawer, reorder pages, and add your child’s or student group name for the cover.'
                    : 'Open je boekje onderaan het scherm, kies de volgorde en vul een naam in voor het officiële titelblad.',
                },
                {
                  step: '3',
                  icon: '🖨️',
                  title: isEn ? '3. Instant 1-Click PDF' : '3. Download & Print in 1 Klik',
                  desc: isEn
                    ? 'Generate your high-resolution A4 or Letter PDF book instantly. Print at home or school in seconds!'
                    : 'Genereer direct je complete A4-boekje in hoge resolutie. Print alles in één keer uit zonder gedoe!',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '1.75rem 1.5rem',
                    border: '1.5px solid #C7D2FE',
                    boxShadow: '0 4px 16px rgba(79, 70, 229, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '16px',
                    background: '#EEF2FF',
                    border: '1.5px solid #C7D2FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0.3rem 0 0' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Action CTA */}
            <div style={{ textAlign: 'center' }}>
              <Link
                href="#collections"
                className="btn-primary"
                style={{
                  padding: '0.95rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                }}
              >
                {isEn ? '📚 Start Building Your Free Coloring Book Now' : '📚 Start Nu Met Je Eigen Gratis Kleurboek'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive artwork feedback */}
      <section style={{ padding: '0 0 2rem 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,74,0.1) 0%, rgba(255,246,233,0.8) 100%)',
              border: '1.5px solid rgba(255,107,74,0.3)',
              borderRadius: '24px',
              padding: '1.75rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              boxShadow: '0 8px 30px rgba(255,107,74,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', maxWidth: '750px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(255,107,74,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.85rem',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(255,107,74,0.15)',
                }}
              >
                ✏️
              </div>
              <div>
                <span
                  style={{
                    background: 'rgba(255,107,74,0.15)',
                    color: '#FF6B4A',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'inline-block',
                    marginBottom: '0.35rem',
                  }}
                >
                  {isEn ? 'Help Improve Our Artwork' : 'Help Onze Tekeningen Verbeteren'}
                </span>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                  {isEn ? 'Spot a stray line? Circle it with our digital red pencil!' : 'Zie je een foutje of los lijntje? Omcirkel het met ons digitale potlood!'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                  {isEn
                    ? 'At ColorVaults, every visitor can help refine our artwork. Click "Circle an issue" under any coloring page to draw right on the template with your finger or mouse!'
                    : 'Bij ColorVaults kan iedere bezoeker helpen onze tekeningen te verbeteren. Klik onder elke kleurplaat op ons potlood en omcirkel het probleem direct op de plaat!'}
                </p>
              </div>
            </div>

            <Link
              href={`/${lang}/disney-pixar`}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #FF6B4A 0%, #F0501F 100%)',
                padding: '0.8rem 1.6rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                borderRadius: '9999px',
                boxShadow: '0 4px 14px rgba(255,107,74,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {isEn ? '🎨 Explore Coloring Pages →' : '🎨 Bekijk Kleurplaten →'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 1: Trending Characters & Shows ── */}
      {popularCharacters.length > 0 && (
        <section className="section">
          <div className="container">
            <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />

            <ScrollReveal className="section-header">
              <div>
                <span className="badge">{isEn ?'Character Themes':'Karakterthema’s'}</span>
                <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                  {isEn ?'Series & Movies':'Series & Films'}
                </h2>
              </div>
              <Link href={`/${lang}/disney-pixar`} className="btn-secondary">
                {isEn ?'View All Series →':'Bekijk Alle Series →'}
              </Link>
            </ScrollReveal>

            <div className="grid-4">
              {popularCharacters.map((theme, i) => {
                const sampleImages = getSampleImagesForTheme(lang, theme.parentHub, theme.slug, theme.image, 3);
                return (
                  <React.Fragment key={theme.slug}>
                    {i === 5 && <AdCard key="char-ad-card" />}
                    <ScrollReveal delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
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
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="container"style={{ marginBottom:'2.5rem'}}>
        <DailyColoringChallenge isEn={isEn} lang={lang} />
      </div>

      {/* ── Section 2: Interactive Category Explorer (Tabbed) ── */}
      <section id="categories" className="section-light" style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{allThemes.length} {isEn ?'Albums Available':'Albums Beschikbaar'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Explore by Category':'Blader op Categorie'}
              </h2>
            </div>
            <Link href={`/${lang}/search`} className="btn-secondary">
              {isEn ?'Full Search & Filters →':'Uitgebreid Zoeken & Filteren →'}
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
              <span className="badge">{isEn ?'Choose Difficulty':'Kies Moeilijkheidsgraad'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Browse by Difficulty Level':'Blader op Moeilijkheidsgraad'}
              </h2>
            </div>
          </ScrollReveal>

          <div className={styles.ageGrid}>
            {difficultyCards.map((age, i) => (
              <ScrollReveal key={age.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
                <Link
                  href={`/${lang}/search?difficulty=${age.slug}`}
                  className={`${styles.ageCard} ${age.className}`}
                >
                  <div className={styles.ageEmoji}>{age.badge}</div>
                  <h3 className={styles.ageName}>{age.name}</h3>
                  <p className={styles.ageDesc}>{age.desc}</p>
                  <div className={styles.ageCta}>{isEn ?'Explore →':'Ontdek →'}</div>
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
                <span className="badge">{isEn ?'Fauna & Nature':'Dierenrijk'}</span>
                <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                  {isEn ?'Animals & Wildlife':'Dieren & Natuur'}
                </h2>
              </div>
              <Link href={`/${lang}/animals-wildlife`} className="btn-secondary">
                {isEn ?'All Animal Pages →':'Alle Dierenplaten →'}
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
          <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />

          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ?'Featured Pages':'Uitgelichte Kleurplaten'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Coloring Pages to Explore':'Ontdek Deze Kleurplaten'}
              </h2>
            </div>
          </ScrollReveal>

          {Array.from({ length: Math.ceil(featuredPages.length / 12) }).map((_, chunkIndex) => {
            const chunk = featuredPages.slice(chunkIndex * 12, chunkIndex * 12 + 12);
            const showAdBar = chunkIndex < Math.ceil(featuredPages.length / 12) - 1;

            const gridItems: React.ReactNode[] = [];
            chunk.forEach((page, idx) => {
              if (idx === 5) {
                gridItems.push(<AdCard key={`hp-ad-card-${chunkIndex}`} />);
              }
              gridItems.push(
                <ScrollReveal key={page.slug} delay={(idx % 4) as 0 | 1 | 2 | 3 | 4}>
                  <MotionCard page={page} lang={lang} isEn={isEn} />
                </ScrollReveal>
              );
            });

            return (
              <React.Fragment key={chunkIndex}>
                <div className="grid-4" style={{ marginBottom: showAdBar ? '2.5rem' : 0 }}>
                  {gridItems}
                </div>
                {showAdBar && (
                  <div style={{ margin: '2.5rem 0' }}>
                    <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* ── Section 6: Guides & Articles ── */}
      <section className="section-light">
        <div className="container">
          <ScrollReveal className="section-header">
            <div>
              <span className="badge">{isEn ?'Educational Guides':'Tips & Lesideën'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?'Latest Guides & Parenting Tips':'Laatste Tips voor Ouders & Onderwijs'}
              </h2>
            </div>
            <Link href={`/${lang}/blog`} className="btn-secondary">
              {isEn ?'View All Guides →':'Bekijk Alle Tips →'}
            </Link>
          </ScrollReveal>

          <div className="grid-3">
            {(blogPosts[lang ==='nl'?'nl':'en'] || blogPosts.en).map(post => (
              <ScrollReveal key={post.slug}>
                <Link href={`/${lang}/blog/${post.slug}`} className="card">
                  <div className="card-img-wrapper"style={{ aspectRatio:'16/9', position:'relative'}}>
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="card-img"style={{ width:'100%', height:'100%', objectFit:'cover'}}
                    />
                  </div>
                  <div className="card-body">
                    <span style={{ fontSize:'0.72rem', fontWeight: 800, color:'var(--primary)', textTransform:'uppercase', display:'block', marginBottom:'0.4rem'}}>
                      {post.category}
                    </span>
                    <h3 className="card-title"style={{ fontSize:'1.1rem', lineHeight: 1.4, marginBottom:'0.5rem'}}>
                      {post.title}
                    </h3>
                    <p className="card-desc"style={{ display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
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
              <span className="badge"style={{ background:'rgba(79, 70, 229, 0.08)', color:'var(--color-primary)', borderColor:'rgba(79, 70, 229, 0.2)'}}>
                {isEn ?'Why ColorVaults?':'Waarom ColorVaults?'}
              </span>
              <h2 className="title-h2"style={{ marginTop:'0.75rem', marginBottom:'1.25rem'}}>
                {isEn ?'Free Printable Coloring Pages for Every Age':'Gratis Printbare Kleurplaten voor Elke Leeftijd'}
              </h2>
              <p className={styles.whyLead}>
                {isEn
                  ?'ColorVaults is your premier destination for high-quality, free printable coloring pages. We believe creativity should be accessible to everyone — which is why our entire collection is 100% free with no signups required.':'ColorVaults is jouw bestemming voor gratis printbare kleurplaten van topkwaliteit. Wij geloven dat creativiteit voor iedereen toegankelijk moet zijn — daarom is onze hele collectie 100% gratis zonder registratie.'}
              </p>
              <p className={styles.whyLead} style={{ marginBottom: 0 }}>
                {isEn
                  ?'Find printable line art for family activities, classroom projects, or a relaxing moment with mandalas.':'Ontdek printbare kleurplaten voor gezinsactiviteiten, schoolprojecten of een ontspannen moment met mandala\'s.'}
              </p>
            </ScrollReveal>

            <div>
              {[
                { number:'01', title: isEn ?'Free Downloads':'Gratis Downloads', desc: isEn ?'No paywalls, no subscriptions, no accounts. Download & print instantly.':'Geen abonnementskosten, geen account nodig. Direct printen.'},
                { number:'02', title: isEn ?'Print-Optimized':'Optimaal Af te Drukken', desc: isEn ?'Clean crisp line art formatted for standard A4 and Letter paper.':'Scherpe lijnen geformatteerd voor A4 en Letter papier.'},
                { number:'03', title: isEn ?'Curated by Age':'Gesorteerd op Leeftijd', desc: isEn ?'Tailored difficulty levels for toddlers, kids, teens & adults.':'Aangepaste moeilijkheidsgraden voor peuters, kinderen & volwassenen.'},
                { number:'04', title: isEn ?'Interactive Artwork Feedback':'Interactieve Feedback', desc: isEn ?'Spot an error? Circle it with our digital red pencil and send it to our team for review.':'Zie je een foutje? Omcirkel het met ons digitale potlood en stuur het naar ons team ter beoordeling.'},
                { number:'05', title: isEn ?'Multilingual (EN, NL, DE, FR)':'4 Talen Beschikbaar', desc: isEn ?'Native localized experience in English, Dutch, German and French.':'Volledig beschikbaar in het Nederlands, Engels, Duits en Frans.'},
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

      <div className="container"style={{ padding:'2rem 0'}}>
        <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />
      </div>
    </>
  );
}
