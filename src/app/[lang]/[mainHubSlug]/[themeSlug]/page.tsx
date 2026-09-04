import { getThemes, getThemeBySlug, getMainHubs, getColoringPages, getColoringPagesForTheme, safeJsonLd } from '@/lib/api';
import { getCategorySeoData } from'@/lib/categorySeo';
import CategorySeoBlock from'@/components/CategorySeoBlock';
import RelatedThemes from '@/components/RelatedThemes';
import CraftIdeasSection from '@/components/CraftIdeasSection';
import ThemeFaqSection from '@/components/ThemeFaqSection';
import PinterestThemeCard from '@/components/PinterestThemeCard';
import CharacterIpDisclaimer from '@/components/CharacterIpDisclaimer';
import NewsletterBox from'@/components/NewsletterBox';
import DifficultyFilterBar from'@/components/DifficultyFilterBar';
import { notFound } from'next/navigation';
import Link from'next/link';
import Breadcrumbs from'@/components/Breadcrumbs';
import MotionCard from'@/components/MotionCard';
import AdSlot from'@/components/AdSlot';
import React from'react';

const PER_PAGE = 24;

export async function generateStaticParams() {
  const themesEn = getThemes('en').map(t => ({ lang: 'en', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesNl = getThemes('nl').map(t => ({ lang: 'nl', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesDe = getThemes('de').map(t => ({ lang: 'de', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesFr = getThemes('fr').map(t => ({ lang: 'fr', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  return [...themesEn, ...themesNl, ...themesDe, ...themesFr];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; mainHubSlug: string; themeSlug: string }>;
}) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return {};
  const ogImageUrl = theme.image
    ? `/api/og?title=${encodeURIComponent(theme.title + ' Coloring Pages')}&image=${encodeURIComponent(theme.image)}`
    : '/images/banner.jpg';
  return {
    title: `${theme.title} Coloring Pages (Free PDF Printables) | ColorVaults`,
    description: theme.description,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${theme.slug}`,
      languages: {
        en: `/en/${mainHubSlug}/${theme.slug}`,
        nl: `/nl/${mainHubSlug}/${theme.slug}`,
        de: `/de/${mainHubSlug}/${theme.slug}`,
        fr: `/fr/${mainHubSlug}/${theme.slug}`,
        'x-default': `/en/${mainHubSlug}/${theme.slug}`,
      },
    },
    openGraph: {
      title:`${theme.title} Coloring Pages (Free PDF Printables) | ColorVaults`,
      description: theme.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: theme.title }],
    },
    twitter: {
      card:'summary_large_image',
      images: [ogImageUrl],
    },
  };
}

export default async function ThemePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; mainHubSlug: string; themeSlug: string }>;
  searchParams: Promise<{ page?: string; difficulty?: string }>;
}) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const { page: pageParam, difficulty: diffParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ||'1', 10));
  const rawDiff = (diffParam ||'').toLowerCase();

  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const isEn = lang !== 'nl';

  const allThemesInHub = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug)
    .map(t => ({ slug: t.slug, title: t.title }));

  const seoData = getCategorySeoData(lang, mainHubSlug, themeSlug, theme.title, allThemesInHub);

  // Get ALL coloring pages for this theme via O(1) index
  const allColoringPages = getColoringPagesForTheme(lang, mainHubSlug, themeSlug);

  const counts = {
    all: allColoringPages.length,
    easy: allColoringPages.filter(p => p.ageGroup ==='kids'|| p.ageGroup ==='kinderen').length,
    medium: allColoringPages.filter(p => p.ageGroup ==='teens'|| p.ageGroup ==='tieners').length,
    hard: allColoringPages.filter(p => p.ageGroup ==='adults'|| p.ageGroup ==='volwassenen').length,
  };

  let filteredPages = allColoringPages;
  if (rawDiff ==='easy'|| rawDiff ==='kids') {
    filteredPages = allColoringPages.filter(p => p.ageGroup ==='kids'|| p.ageGroup ==='kinderen');
  } else if (rawDiff ==='medium'|| rawDiff ==='teens') {
    filteredPages = allColoringPages.filter(p => p.ageGroup ==='teens'|| p.ageGroup ==='tieners');
  } else if (rawDiff ==='hard'|| rawDiff ==='adults') {
    filteredPages = allColoringPages.filter(p => p.ageGroup ==='adults'|| p.ageGroup ==='volwassenen');
  }

  const totalPages = Math.ceil(filteredPages.length / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;
  const coloringPages = filteredPages.slice(offset, offset + PER_PAGE);

  const difficultyQueryString = rawDiff ?`&difficulty=${encodeURIComponent(rawDiff)}`:'';

  // 4 Related themes in this hub for quick pill navigation
  const relatedPills = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug && t.slug !== themeSlug)
    .slice(0, 5);

  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${theme.title} Free Printable Coloring Pages`,
    description: theme.description,
    url: `https://colorvaults.com/${lang}/${mainHubSlug}/${theme.slug}`,
    image: coloringPages.slice(0, 16).map(p => ({
      '@type': 'ImageObject',
      contentUrl: p.image,
      name: p.title,
      description: `${p.title} - Free printable coloring page on ColorVaults`,
    })),
  };

  return (
    <>
      {/* Schema.org ImageGallery Rich Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(imageGallerySchema) }}
      />

      {/* ── Cinematic Full-Width Theme Header with 100% Uncropped Artwork ── */}
      <div className="page-hero" data-hub={mainHubSlug} style={{ padding: '2rem 0 2.5rem' }}>
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
                      { label: theme.title },
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
                  {isEn ?`${theme.title} Coloring Pages`:`${theme.title} Kleurplaten`}
                </h1>

                <p style={{
                  color:'#F1F5F9',
                  fontSize:'1.025rem',
                  lineHeight: 1.65,
                  textShadow:'0 2px 10px rgba(0, 0, 0, 0.8)',
                  maxWidth:'680px',
                  margin:'0.5rem 0 1.35rem',
                }}>
                  {theme.seoIntro || seoData.shortIntro}
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
                    {isEn ?'Fan-Art Edition':'Fan-Art Editie'}
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
        {/* Custom Coloring Book Multi-Select Guide Banner */}
        <div style={{
          marginBottom:'1.75rem',
          background:'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          border:'1.5px solid #C7D2FE',
          borderRadius:'20px',
          padding:'1.15rem 1.5rem',
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          gap:'1rem',
          flexWrap:'wrap',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.85rem'}}>
            <div style={{ fontSize:'1.8rem'}}></div>
            <div style={{ textAlign:'left'}}>
              <h3 style={{ margin: 0, fontSize:'1.05rem', fontWeight: 800, color:'#312E81'}}>
                {isEn ?'Create Your Own Coloring Book':'Stel je Eigen Kleurboek Samen'}
              </h3>
              <p style={{ margin:'0.15rem 0 0', fontSize:'0.85rem', color:'#4338CA'}}>
                {isEn
                  ?'Click the button on any coloring page below to collect your favorites into a single custom PDF!':'Klik op het icoon bij een kleurplaat om je favorieten te verzamelen in 1 printbare PDF!'}
              </p>
            </div>
          </div>
        </div>

        {/* Paper Size & How to Use Notice */}
        <div style={{
          background:'linear-gradient(135deg, #F8FAFC, #F1F5F9)',
          border:'1.5px dashed var(--gray-300)',
          borderRadius:'16px',
          padding:'1rem 1.5rem',
          fontSize:'0.9rem',
          color:'#475569',
          lineHeight: 1.6,
          textAlign:'center',
        }}>
          📄 <strong>{isEn ?'Easy Print Instructions:':'Eenvoudig Printen:'}</strong>{''}
          {isEn
            ?'Click any coloring sheet below to open full size, print directly on standard A4 or US Letter paper, or color online in our digital studio!':'Klik op een willekeurige kleurplaat om hem op ware grootte te openen, print direct op standaard A4 papier of kleur hem online in via onze digitale studio!'}
        </div>

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

        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        {/* 🎨 Create Your Own Coloring Book Callout Banner (Exclusive ColorVaults Feature) */}
        <div style={{
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #F5F3FF 100%)',
          border: '1.5px solid #C7D2FE',
          borderRadius: '24px',
          padding: '1.5rem 1.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          flexWrap: 'wrap',
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '720px' }}>
            <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>📚</span>
            <div>
              <span style={{
                display: 'inline-block',
                background: '#4F46E5',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.35rem',
              }}>
                {isEn ? 'Exclusive Free Feature' : 'Exclusieve Gratis Functie'}
              </span>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 900, color: '#0F172A', margin: '0 0 0.25rem', lineHeight: 1.3 }}>
                {isEn ? `Create a Custom ${theme.title} Coloring Book (PDF)` : `Stel Je Eigen ${theme.title} Kleurboek Samen (PDF)`}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                {isEn 
                  ? `Click "+ Bundle" on your favorite sheets below to combine them into one organized, ready-to-print booklet with a personalized front cover!`
                  : `Klik op "+ Kleurboek" bij je favoriete tekeningen en download ze als één compleet, printklaar boekje met eigen titelblad!`}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{
              background: '#FFFFFF',
              border: '1.5px solid #C7D2FE',
              borderRadius: '9999px',
              padding: '0.45rem 1.1rem',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#4F46E5',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.1)',
            }}>
              {isEn ? '✨ 100% Free • Unlimited' : '✨ 100% Gratis • Onbeperkt'}
            </span>
          </div>
        </div>

        <DifficultyFilterBar isEn={isEn} counts={counts} />

        <div className="section-header"style={{ marginTop:'2rem'}}>
          <div>
            <span className="badge">
              {filteredPages.length} {isEn ?'Printables in this View':'Kleurplaten'}
            </span>
            <h2 className="title-h2"style={{ marginTop:'0.4rem'}}>
              {isEn ?`Free Printable ${theme.title} Coloring Sheets`:`Gratis Printbare ${theme.title} Kleurplaten`}
            </h2>
          </div>
        </div>

        {filteredPages.length === 0 ? (
          <div
            style={{
              textAlign:'center',
              padding:'5rem 2rem',
              color:'var(--gray-400)',
              background:'var(--surface)',
              borderRadius:'var(--radius-xl)',
              border:'1px solid var(--gray-200)',
            }}
          >
            <p style={{ fontSize:'3.5rem', marginBottom:'1rem'}}></p>
            <p style={{ fontSize:'1.2rem', fontWeight: 700, color:'var(--foreground)'}}>
              {isEn ?'No coloring pages found for this difficulty level.':'Geen kleurplaten gevonden voor deze moeilijkheidsgraad.'}
            </p>
          </div>
        ) : (
          <div>
            {/* 2x3 Grid -> In-feed Ad -> 2x3 Grid -> In-feed Ad pattern */}
            {Array.from({ length: Math.ceil(coloringPages.length / 6) }).map((_, chunkIndex) => {
              const chunk = coloringPages.slice(chunkIndex * 6, chunkIndex * 6 + 6);
              const showAdBar = chunkIndex < Math.ceil(coloringPages.length / 6) - 1;

              return (
                <React.Fragment key={chunkIndex}>
                  <div
                    style={{
                      display:'grid',
                      gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))',
                      gap:'1.5rem',
                      marginBottom: showAdBar ?'2.5rem': 0,
                    }}
                  >
                    {chunk.map(page => (
                      <MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />
                    ))}
                  </div>

                  {showAdBar && (
                    <div style={{ margin:'2.5rem 0'}}>
                      <AdSlot type="banner"text={isEn ?'Sponsored Content':'Gesponsord'} />
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
                  ?`Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} of ${filteredPages.length} pages`:`Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} van ${filteredPages.length} kleurplaten`}
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
                  href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${currentPage - 1}${difficultyQueryString}`}
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
                    href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${pageNum}${difficultyQueryString}`}
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
                  href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${currentPage + 1}${difficultyQueryString}`}
                  className="btn-secondary">
                  {isEn ?'Next':'Volgende'} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 10 Fun Craft Ideas & Activities (SEO Supercharger) */}
        <CraftIdeasSection themeTitle={theme.title} isEn={isEn} hubSlug={mainHubSlug} themeSlug={themeSlug} />

        {/* Frequently Asked Questions (Schema.org FAQPage Rich Results) */}
        <ThemeFaqSection themeTitle={theme.title} isEn={isEn} hubSlug={mainHubSlug} themeSlug={themeSlug} />

        {/* Pinterest Viral Share Card */}
        <PinterestThemeCard
          themeTitle={theme.title}
          themeImage={theme.image}
          url={`/${lang}/${mainHubSlug}/${themeSlug}`}
          isEn={isEn}
          pageCount={allColoringPages.length}
        />

        {/* Newsletter & Coloring Club */}
        <NewsletterBox isEn={isEn} lang={lang} />

        {/* Related Themes */}
        <RelatedThemes lang={lang} isEn={isEn} currentThemeSlug={theme.slug} allThemes={getThemes(lang)} />

        {/* Category SEO Knowledge & FAQ */}
        <CategorySeoBlock
          title={seoData.bottomTitle}
          contentHtml={seoData.bottomContentHtml}
          lang={lang}
        />

        {/* Intellectual Property & Fair-Use Disclaimer */}
        <CharacterIpDisclaimer themeTitle={theme.title} isEn={isEn} lang={lang} />
      </div>
    </>
  );
}