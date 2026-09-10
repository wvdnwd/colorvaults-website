import { getAgePages, getAgePageBySlug, getMainHubs, getThemes, getPagesByAgeGroup, getAgeLabel, safeJsonLd } from'@/lib/api';
import CategorySeoBlock from'@/components/CategorySeoBlock';
import RelatedThemes from'@/components/RelatedThemes';
import CraftIdeasSection from'@/components/CraftIdeasSection';
import CharacterIpDisclaimer from'@/components/CharacterIpDisclaimer';
import NewsletterBox from'@/components/NewsletterBox';
import { notFound } from'next/navigation';
import Link from'next/link';
import Breadcrumbs from'@/components/Breadcrumbs';
import MotionCard from'@/components/MotionCard';
import AdSlot from'@/components/AdSlot';
import AdCard from'@/components/AdCard';
import SafeImage from'@/components/SafeImage';
import React from'react';

export async function generateStaticParams() {
  const agesEn = getAgePages('en').map(a => ({ lang: 'en', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  const agesNl = getAgePages('nl').map(a => ({ lang: 'nl', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  const agesDe = getAgePages('de').map(a => ({ lang: 'de', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  const agesFr = getAgePages('fr').map(a => ({ lang: 'fr', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  return [...agesEn, ...agesNl, ...agesDe, ...agesFr];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug } = await params;
  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!agePage) return {};
  const theme = getThemes(lang).find(t => t.parentHub === mainHubSlug && t.slug === themeSlug);
  const ogImageUrl = theme?.image
    ? `/api/og?title=${encodeURIComponent(agePage.title)}&image=${encodeURIComponent(theme.image)}`
    : '/images/banner.jpg';

  let title = `${agePage.title} (Free Printable PDF Coloring Pages) | ColorVaults`;
  if (lang === 'nl') {
    title = `${agePage.title} (Gratis Printbare Kleurplaten PDF) | ColorVaults`;
  } else if (lang === 'de') {
    title = `${agePage.title} (Kostenlose Malvorlagen PDF zum Drucken) | ColorVaults`;
  } else if (lang === 'fr') {
    title = `${agePage.title} (Coloriages Gratuits à Imprimer PDF) | ColorVaults`;
  }

  return {
    title,
    description: agePage.seoText,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}`,
      languages: {
        en: `/en/${mainHubSlug}/${themeSlug}/${ageSlug}`,
        nl: `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}`,
        de: `/de/${mainHubSlug}/${themeSlug}/${ageSlug}`,
        fr: `/fr/${mainHubSlug}/${themeSlug}/${ageSlug}`,
        'x-default': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}`,
      },
    },
    openGraph: {
      title,
      description: agePage.seoText,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: agePage.title }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImageUrl],
    },
  };
}

export default async function AgePage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang, mainHubSlug, themeSlug, ageSlug } = await params;
  const { page } = await searchParams;

  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!agePage) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  const theme = getThemes(lang).find(t => t.slug === themeSlug && t.parentHub === mainHubSlug);
  if (!hub || !theme) return notFound();

  const allColoringPages = getPagesByAgeGroup(lang, mainHubSlug, themeSlug, ageSlug);
  const isEn = lang ==='en';

  const PER_PAGE = 24;
  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(allColoringPages.length / PER_PAGE);
  const coloringPages = allColoringPages.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const difficultyLabel = getAgeLabel(ageSlug, lang);

  // 4 Related themes in this hub for quick pill navigation
  const relatedPills = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug && t.slug !== themeSlug)
    .slice(0, 5);

  return (
    <>
            {/* ── Cinematic Full-Width Age Header with 100% Uncropped Artwork ── */}
      <div className="page-hero"data-hub={mainHubSlug} style={{ padding:'2rem 0 2.5rem'}}>
        <div className="container"style={{ maxWidth:'1200px'}}>
          {/* Full-Width Cinematic Theme Master Banner */}
          <div style={{
            position:'relative',
            borderRadius:'28px',
            overflow:'hidden',
            boxShadow:'0 25px 60px -15px rgba(15, 23, 42, 0.45)',
            border:'2px solid rgba(255, 255, 255, 0.3)',
            background:'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          }}>
            {/* Ambient Blurred Color Glow Backdrop */}
            {theme.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={theme.image}
                alt=""aria-hidden="true"style={{
                  position:'absolute',
                  inset:'-30px',
                  width:'calc(100% + 60px)',
                  height:'calc(100% + 60px)',
                  objectFit:'cover',
                  filter:'blur(50px) brightness(0.35)',
                  opacity: 0.65,
                  pointerEvents:'none',
                }}
              />
            )}

            {/* Dark Vignette Overlay for High Contrast */}
            <div style={{
              position:'absolute',
              inset: 0,
              background:'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%)',
              pointerEvents:'none',
            }} />

            {/* Foreground Content */}
            <div style={{
              position:'relative',
              zIndex: 3,
              padding:'2.5rem 2.25rem',
              display:'flex',
              flexWrap:'wrap',
              alignItems:'center',
              justifyContent:'space-between',
              gap:'2.5rem',
            }}>
              {/* Left Column: Breadcrumbs, Title, Intro & Badges */}
              <div style={{ flex:'1 1 540px', textAlign:'left', minWidth:'280px'}}>
                <div style={{
                  display:'inline-block',
                  background:'rgba(15, 23, 42, 0.75)',
                  backdropFilter:'blur(8px)',
                  WebkitBackdropFilter:'blur(8px)',
                  padding:'0.25rem 0.75rem',
                  borderRadius:'9999px',
                  border:'1px solid rgba(255, 255, 255, 0.25)',
                  marginBottom:'0.85rem',
                }}>
                  <Breadcrumbs
                    items={[
                      { label: hub.title, href:`/${lang}/${hub.slug}`},
                      { label: theme.title, href:`/${lang}/${hub.slug}/${theme.slug}`},
                      { label: difficultyLabel.label }
                    ]}
                    lang={lang}
                  />
                </div>

                <h1 className="title-h1"style={{
                  color:'#FFFFFF',
                  fontSize:'clamp(2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  textShadow:'0 4px 20px rgba(0, 0, 0, 0.8)',
                  margin:'0.25rem 0 0.6rem',
                  fontFamily:'var(--font-display),"Fredoka", sans-serif',
                  letterSpacing:'-0.02em',
                  lineHeight: 1.15,
                }}>
                  {theme.title} — {difficultyLabel.label}
                </h1>

                <p style={{
                  color:'#F1F5F9',
                  fontSize:'1.025rem',
                  lineHeight: 1.65,
                  textShadow:'0 2px 10px rgba(0, 0, 0, 0.8)',
                  maxWidth:'680px',
                  margin:'0.5rem 0 1.35rem',
                }}>
                  {agePage.seoText}
                </p>

                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', flexWrap:'wrap'}}>
                  <span className="badge"style={{ background:'#FF6B35', color:'#FFFFFF', borderColor:'#FF6B35', fontWeight: 800 }}>
                    ✓ {allColoringPages.length} {isEn ?'Printable Pages':'Printbare Kleurplaten'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#065F46', borderColor:'#A7F3D0', fontWeight: 700 }}>
                    100% {isEn ?'Free':'Gratis'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#1E40AF', borderColor:'#BFDBFE', fontWeight: 700 }}>
                    A4 / Letter PDF
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#6B21A8', borderColor:'#E9D5FF', fontWeight: 700 }}>
                    {isEn ?'Color Online':'Online Inkleuren'}
                  </span>
                </div>
              </div>

              {/* Right Column: 100% Complete Uncropped Artwork Card */}
              {theme.image && (
                <div style={{
                  flex:'0 0 auto',
                  margin:'0 auto',
                  position:'relative',
                }}>
                  <div style={{
                    position:'absolute',
                    top:'12px',
                    right:'12px',
                    zIndex: 5,
                    background:'rgba(15, 23, 42, 0.85)',
                    backdropFilter:'blur(8px)',
                    WebkitBackdropFilter:'blur(8px)',
                    color:'#F8FAFC',
                    borderRadius:'9999px',
                    padding:'0.25rem 0.75rem',
                    fontSize:'0.72rem',
                    fontWeight: 800,
                    border:'1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.35)',
                  }}>
                    {['tv-series-and-movies', 'disney-and-fairy-tales', 'games-and-pop-culture', 'anime-and-manga'].includes(mainHubSlug)
                      ? (isEn ? 'Fan-Art Edition' : 'Fan-Art Editie')
                      : (isEn ? '✨ Free Printables' : '✨ Gratis Printbaar')}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={theme.image}
                    alt={`${theme.title} Artwork`}
                    style={{
                      maxHeight:'340px',
                      maxWidth:'100%',
                      width:'auto',
                      height:'auto',
                      objectFit:'contain',
                      borderRadius:'20px',
                      border:'3px solid rgba(255, 255, 255, 0.9)',
                      boxShadow:'0 16px 40px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 107, 74, 0.25)',
                      display:'block',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container section">


        {/* Quick Related Topic Pills */}
        {relatedPills.length > 0 && (
          <div style={{
            marginTop:'1.75rem',
            background:'#FFFFFF',
            border:'1.5px solid var(--gray-200)',
            borderRadius:'16px',
            padding:'1rem 1.25rem',
            textAlign:'center',
          }}>
            <span style={{ fontSize:'0.85rem', fontWeight: 800, color:'#64748B', textTransform:'uppercase', letterSpacing:'0.04em', display:'block', marginBottom:'0.6rem'}}>
              {isEn ?'While you are here, grab these related coloring pages:':'Bekijk ook deze gerelateerde thema’s:'}
            </span>
            <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', flexWrap:'wrap'}}>
              {relatedPills.map(rp => (
                <Link
                  key={rp.slug}
                  href={`/${lang}/${mainHubSlug}/${rp.slug}`}
                  style={{
                    padding:'0.35rem 0.85rem',
                    borderRadius:'9999px',
                    background:'var(--surface-2, #F1F5F9)',
                    color:'var(--foreground)',
                    border:'1px solid var(--gray-200)',
                    fontSize:'0.85rem',
                    fontWeight: 700,
                    textDecoration:'none',
                    transition:'all 0.2s',
                  }}
                >
                  {rp.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <AdSlot type="banner"text={isEn ?"Sponsored Content":"Gesponsord"} />

        <div className="section-header"style={{ marginTop:'2rem'}}>
          <div>
            <span className="badge">
              {allColoringPages.length} {isEn ?'Printables in this Collection':'Kleurplaten'}
            </span>
            <h2 className="title-h2"style={{ marginTop:'0.4rem'}}>
              {isEn ?`All ${theme.title} (${difficultyLabel.label}) Sheets`:`Alle ${theme.title} (${difficultyLabel.label}) Kleurplaten`}
            </h2>
          </div>
        </div>

        {coloringPages.length === 0 ? (
          <div style={{ textAlign:'center', padding:'5rem 2rem', color:'var(--gray-400)', background:'var(--surface)', borderRadius:'var(--radius-xl)', border:'1px solid var(--gray-200)'}}>
            <p style={{ fontSize:'1.2rem', fontWeight: 700, color:'var(--foreground)'}}>
              {isEn ?'Pages coming soon! Check back later.':'Kleurplaten binnenkort beschikbaar!'}
            </p>
          </div>
        ) : (
          <div>
            {/* 3-row chunks (12 cards) → AdCard in middle → banner between groups */}
            {Array.from({ length: Math.ceil(coloringPages.length / 12) }).map((_, chunkIndex) => {
              const chunk = coloringPages.slice(chunkIndex * 12, chunkIndex * 12 + 12);
              const showAdBar = chunkIndex < Math.ceil(coloringPages.length / 12) - 1;

              // Inject AdCard at grid position 5 (middle of 2nd row in a 4-col grid)
              const gridItems: React.ReactNode[] = [];
              chunk.forEach((page, i) => {
                if (i === 5) gridItems.push(<AdCard key="ad-card" />);
                gridItems.push(<MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />);
              });

              return (
                <React.Fragment key={chunkIndex}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: showAdBar ? '2.5rem' : 0,
                    }}
                  >
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
        )}

        {/* Pagination Progress */}
        {totalPages > 1 && (
          <div style={{ marginTop:'3.5rem'}}>
            <div style={{ marginBottom:'1.5rem', textAlign:'center'}}>
              <p style={{ fontSize:'0.85rem', color:'var(--gray-500)', fontWeight: 600, marginBottom:'0.6rem'}}>
                {isEn
                  ?`Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, allColoringPages.length)} of ${allColoringPages.length} pages`:`Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, allColoringPages.length)} van ${allColoringPages.length} kleurplaten`}
              </p>
              <div style={{
                height:'6px',
                background:'var(--gray-200)',
                borderRadius:'9999px',
                overflow:'hidden',
                maxWidth:'320px',
                margin:'0 auto',
              }}>
                <div style={{
                  height:'100%',
                  width:`${(currentPage / totalPages) * 100}%`,
                  background:'linear-gradient(90deg, var(--primary), #A29BFE)',
                  borderRadius:'9999px',
                  transition:'width 0.4s ease',
                }} />
              </div>
            </div>

            <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem', flexWrap:'wrap'}}>
              {currentPage > 1 && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}?page=${currentPage - 1}`}
                  className="btn-secondary">
                  ← {isEn ?'Previous':'Vorige'}
                </Link>
              )}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}?page=${pageNum}`}
                    style={{
                      width:'40px',
                      height:'40px',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:'var(--radius)',
                      fontWeight: 700,
                      background: isActive ?'var(--primary)':'var(--surface)',
                      color: isActive ?'#FFFFFF':'var(--foreground)',
                      border:'1px solid var(--gray-200)',
                      textDecoration:'none',
                    }}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}?page=${currentPage + 1}`}
                  className="btn-secondary">
                  {isEn ?'Next':'Volgende'} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 5 Fun Craft Ideas & Activities (SEO Supercharger) */}
        <CraftIdeasSection themeTitle={theme.title} isEn={isEn} />

        {/* Newsletter & Coloring Club */}
        <NewsletterBox isEn={isEn} lang={lang} />

        {/* Related Themes */}
        <RelatedThemes lang={lang} isEn={isEn} currentThemeSlug={theme.slug} allThemes={getThemes(lang)} />

        {/* Intellectual Property & Fair-Use Disclaimer */}
        <CharacterIpDisclaimer themeTitle={theme.title} isEn={isEn} lang={lang} />
      </div>
    </>
  );
}