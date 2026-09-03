import { getAgePages, getAgePageBySlug, getMainHubs, getThemes, getPagesByAgeGroup, getAgeLabel, safeJsonLd } from '@/lib/api';
import CategorySeoBlock from '@/components/CategorySeoBlock';
import RelatedThemes from '@/components/RelatedThemes';
import CraftIdeasSection from '@/components/CraftIdeasSection';
import CharacterIpDisclaimer from '@/components/CharacterIpDisclaimer';
import NewsletterBox from '@/components/NewsletterBox';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import SafeImage from '@/components/SafeImage';
import React from 'react';

export async function generateStaticParams() {
  const agesEn = getAgePages('en').map(a => ({ lang: 'en', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  const agesNl = getAgePages('nl').map(a => ({ lang: 'nl', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  return [...agesEn, ...agesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug } = await params;
  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!agePage) return {};
  const theme = getThemes(lang).find(t => t.parentHub === mainHubSlug && t.slug === themeSlug);
  const ogImageUrl = theme?.image
    ? `/api/og?title=${encodeURIComponent(agePage.title)}&image=${encodeURIComponent(theme.image)}`
    : '/images/banner.jpg';
  return {
    title: `${agePage.title} (Free PDF Printables) | ColorVaults`,
    description: agePage.seoText,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}`,
      languages: { 
        'en': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}`, 
        'nl': `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}`,
        'x-default': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}`
      }
    },
    openGraph: {
      title: `${agePage.title} (Free PDF Printables) | ColorVaults`,
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
  const isEn = lang === 'en';

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
      {/* ── MondayMandala Style Top Article & Hero Header ── */}
      <div className="page-hero" data-hub={mainHubSlug} style={{ padding: '3.5rem 0 2.5rem' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[
                { label: hub.title, href: `/${lang}/${hub.slug}` },
                { label: theme.title, href: `/${lang}/${hub.slug}/${theme.slug}` },
                { label: difficultyLabel.label }
              ]}
              lang={lang}
            />
          </div>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
            {theme.title} — {difficultyLabel.label} {isEn ? '(Free PDF Printables)' : '(Gratis PDF Printables)'}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.875rem', color: '#CBD5E1', fontWeight: 600, flexWrap: 'wrap' }}>
            <span>✍️ {isEn ? 'By ColorVaults Studio Team' : 'Door ColorVaults Redactie'}</span>
            <span>•</span>
            <span>📅 {isEn ? 'Updated March 2026' : 'Bijgewerkt Maart 2026'}</span>
            <span>•</span>
            <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.4)' }}>
              ✓ {allColoringPages.length} {isEn ? 'Free Printables' : 'Gratis Kleurplaten'}
            </span>
          </div>

          {/* Intro Paragraphs */}
          <div style={{ marginTop: '1.5rem', textAlign: 'left', background: 'rgba(255, 255, 255, 0.95)', padding: '1.75rem 2rem', borderRadius: '20px', border: '1.5px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
            <p style={{ color: '#0F172A', fontSize: '1.05rem', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>
              {agePage.seoText}
            </p>
          </div>

          {/* Centered 8K Banner Artwork Photo */}
          {theme.image && (
            <div style={{
              margin: '2rem auto 1.5rem',
              maxWidth: '560px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18)',
              border: '3px solid #FFFFFF',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 5,
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#F8FAFC',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                🎨 {isEn ? 'Fan-Art Coloring Edition' : 'Fan-Art & Kleurplaat Editie'}
              </div>
              <SafeImage
                src={theme.image}
                alt={`${theme.title} Master Poster`}
                width={560}
                height={380}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* Custom Coloring Book Multi-Select Guide Banner */}
          <div style={{
            marginTop: '1.75rem',
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            border: '1.5px solid #C7D2FE',
            borderRadius: '20px',
            padding: '1.15rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ fontSize: '1.8rem' }}>🧺</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#312E81' }}>
                  {isEn ? 'Create Your Own Coloring Book' : 'Stel je Eigen Kleurboek Samen'}
                </h3>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: '#4338CA' }}>
                  {isEn
                    ? 'Click the ➕ button on any coloring page below to collect your favorites into a single custom PDF!'
                    : 'Klik op het ➕ icoon bij een kleurplaat om je favorieten te verzamelen in 1 printbare PDF!'}
                </p>
              </div>
            </div>
          </div>

          {/* Paper Size & How to Use Notice */}
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC, #F1F5F9)',
            border: '1.5px dashed var(--gray-300)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            fontSize: '0.9rem',
            color: '#475569',
            lineHeight: 1.6,
            textAlign: 'center',
          }}>
            📄 <strong>{isEn ? 'Easy Print Instructions:' : 'Eenvoudig Printen:'}</strong>{' '}
            {isEn
              ? 'Click any coloring sheet below to open full size, print directly on standard A4 or US Letter paper, or color online in our digital studio!'
              : 'Klik op een willekeurige kleurplaat om hem op ware grootte te openen, print direct op standaard A4 papier of kleur hem online in via onze digitale studio!'}
          </div>

          {/* Quick Related Topic Pills */}
          {relatedPills.length > 0 && (
            <div style={{
              marginTop: '1.75rem',
              background: '#FFFFFF',
              border: '1.5px solid var(--gray-200)',
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.6rem' }}>
                {isEn ? 'While you are here, grab these related coloring pages:' : 'Bekijk ook deze gerelateerde thema’s:'}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {relatedPills.map(rp => (
                  <Link
                    key={rp.slug}
                    href={`/${lang}/${mainHubSlug}/${rp.slug}`}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      background: 'var(--surface-2, #F1F5F9)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--gray-200)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {rp.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="section-header" style={{ marginTop: '2rem' }}>
          <div>
            <span className="badge">
              {allColoringPages.length} {isEn ? 'Printables in this Collection' : 'Kleurplaten'}
            </span>
            <h2 className="title-h2" style={{ marginTop: '0.4rem' }}>
              {isEn ? `All ${theme.title} (${difficultyLabel.label}) Sheets` : `Alle ${theme.title} (${difficultyLabel.label}) Kleurplaten`}
            </h2>
          </div>
        </div>

        {coloringPages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--gray-400)', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)' }}>
              {isEn ? 'Pages coming soon! Check back later.' : 'Kleurplaten binnenkort beschikbaar!'}
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
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: showAdBar ? '2.5rem' : 0,
                    }}
                  >
                    {chunk.map(page => (
                      <MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />
                    ))}
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
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 600, marginBottom: '0.6rem' }}>
                {isEn
                  ? `Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, allColoringPages.length)} of ${allColoringPages.length} pages`
                  : `Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, allColoringPages.length)} van ${allColoringPages.length} kleurplaten`
                }
              </p>
              <div style={{
                height: '6px',
                background: 'var(--gray-200)',
                borderRadius: '9999px',
                overflow: 'hidden',
                maxWidth: '320px',
                margin: '0 auto',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(currentPage / totalPages) * 100}%`,
                  background: 'linear-gradient(90deg, var(--primary), #A29BFE)',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {currentPage > 1 && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}?page=${currentPage - 1}`}
                  className="btn-secondary"
                >
                  ← {isEn ? 'Previous' : 'Vorige'}
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
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius)',
                      fontWeight: 700,
                      background: isActive ? 'var(--primary)' : 'var(--surface)',
                      color: isActive ? '#FFFFFF' : 'var(--foreground)',
                      border: '1px solid var(--gray-200)',
                      textDecoration: 'none',
                    }}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}?page=${currentPage + 1}`}
                  className="btn-secondary"
                >
                  {isEn ? 'Next' : 'Volgende'} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ✂️ 5 Fun Craft Ideas & Activities (SEO Supercharger) */}
        <CraftIdeasSection themeTitle={theme.title} isEn={isEn} />

        {/* 💌 Newsletter & Coloring Club */}
        <NewsletterBox isEn={isEn} lang={lang} />

        {/* 🔗 Related Themes */}
        <RelatedThemes lang={lang} isEn={isEn} currentThemeSlug={theme.slug} allThemes={getThemes(lang)} />

        {/* ⚖️ Intellectual Property & Fair-Use Disclaimer */}
        <CharacterIpDisclaimer themeTitle={theme.title} isEn={isEn} lang={lang} />
      </div>
    </>
  );
}