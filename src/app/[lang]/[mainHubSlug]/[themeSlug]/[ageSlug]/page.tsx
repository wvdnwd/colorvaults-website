import { getAgePages, getAgePageBySlug, getMainHubs, getThemes, getPagesByAgeGroup } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
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
    title: `${agePage.title} | Free Printable | ColorVaults`,
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
      title: `${agePage.title} | Free Printable | ColorVaults`,
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

  const PER_PAGE = 40;
  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(allColoringPages.length / PER_PAGE);
  const coloringPages = allColoringPages.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: hub.title, href: `/${lang}/${hub.slug}` },
              { label: theme.title, href: `/${lang}/${hub.slug}/${theme.slug}` },
              { label: agePage.title }
            ]}
            lang={lang}
          />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>{agePage.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.6rem', lineHeight: 1.7, maxWidth: '640px' }}>
            {agePage.introText}
          </p>
          <span className="badge" style={{ marginTop: '1.25rem' }}>
            ✨ {allColoringPages.length} {isEn ? 'pages available — 100% free' : 'pagina\'s beschikbaar — 100% gratis'}
          </span>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="section-header">
          <h2 className="title-h2">
            {isEn ? 'All Coloring Pages' : 'Alle Kleurplaten'}
          </h2>
        </div>

        {coloringPages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--gray-400)', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)' }}>
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎨</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)' }}>
              {isEn ? 'Pages coming soon! Check back later.' : 'Kleurplaten binnenkort beschikbaar!'}
            </p>
          </div>
        ) : (
          <div className="grid-4">
            {coloringPages.map((page, index) => {
              const shouldShowAd = (index + 1) % 8 === 0;
              
              return (
                <React.Fragment key={page.slug}>
                  <MotionCard page={page} lang={lang} isEn={isEn} />
                  {shouldShowAd && (
                    <AdSlot type="in-feed" text={isEn ? "Sponsored" : "Gesponsord"} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ marginTop: '3.5rem' }}>
            {/* Progress indicator */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 600, marginBottom: '0.6rem' }}>
                {isEn
                  ? `Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, allColoringPages.length)} of ${allColoringPages.length} coloring pages`
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

            {/* Prev / Next buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              {currentPage > 1 ? (
                <Link href={`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}?page=${currentPage - 1}`} className="btn-secondary">
                  ← {isEn ? 'Previous' : 'Vorige'}
                </Link>
              ) : (
                <span className="btn-secondary" style={{ opacity: 0.4, pointerEvents: 'none' }}>← {isEn ? 'Previous' : 'Vorige'}</span>
              )}
              
              <span style={{ fontWeight: 800, color: 'var(--foreground)', padding: '0.5rem 1rem', background: 'var(--surface-2)', borderRadius: 'var(--radius-full)' }}>
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link href={`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}?page=${currentPage + 1}`} className="btn-secondary">
                  {isEn ? 'Next' : 'Volgende'} →
                </Link>
              ) : (
                <span className="btn-secondary" style={{ opacity: 0.4, pointerEvents: 'none' }}>{isEn ? 'Next' : 'Volgende'} →</span>
              )}
            </div>
          </div>
        )}

        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="seo-block" style={{ marginTop: '3.5rem' }}>
          <h2>{isEn ? `About These Pages` : `Over Deze Kleurplaten`}</h2>
          <p>{agePage.seoText}</p>
        </div>
      </div>
    </>
  );
}
