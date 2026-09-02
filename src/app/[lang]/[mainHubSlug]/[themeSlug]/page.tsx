import SafeImage from '@/components/SafeImage';
import { getThemes, getThemeBySlug, getMainHubs, getColoringPages, safeJsonLd } from '@/lib/api';
import { getCategorySeoData } from '@/lib/categorySeo';
import CategorySeoBlock from '@/components/CategorySeoBlock';
import DifficultyFilterBar from '@/components/DifficultyFilterBar';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import React from 'react';

const PER_PAGE = 24;

export async function generateStaticParams() {
  const themesEn = getThemes('en').map(t => ({ lang: 'en', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesNl = getThemes('nl').map(t => ({ lang: 'nl', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  return [...themesEn, ...themesNl];
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
    title: `${theme.title} Coloring Pages | ColorVaults`,
    description: theme.description,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${theme.slug}`,
      languages: {
        en: `/en/${mainHubSlug}/${theme.slug}`,
        nl: `/nl/${mainHubSlug}/${theme.slug}`,
        'x-default': `/en/${mainHubSlug}/${theme.slug}`,
      },
    },
    openGraph: {
      title: `${theme.title} Coloring Pages | ColorVaults`,
      description: theme.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: theme.title }],
    },
    twitter: {
      card: 'summary_large_image',
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
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10));
  const rawDiff = (diffParam || '').toLowerCase();

  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const isEn = lang === 'en';

  const allThemesInHub = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug)
    .map(t => ({ slug: t.slug, title: t.title }));

  const seoData = getCategorySeoData(lang, mainHubSlug, themeSlug, theme.title, allThemesInHub);

  // Get ALL coloring pages for this theme
  const allColoringPages = getColoringPages(lang).filter(
    p => p.parentHub === mainHubSlug && p.parentTheme === themeSlug
  );

  const counts = {
    all: allColoringPages.length,
    easy: allColoringPages.filter(p => p.ageGroup === 'kids' || p.ageGroup === 'kinderen').length,
    medium: allColoringPages.filter(p => p.ageGroup === 'teens' || p.ageGroup === 'tieners').length,
    hard: allColoringPages.filter(p => p.ageGroup === 'adults' || p.ageGroup === 'volwassenen').length,
  };

  let filteredPages = allColoringPages;
  if (rawDiff === 'easy' || rawDiff === 'kids') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'kids' || p.ageGroup === 'kinderen');
  } else if (rawDiff === 'medium' || rawDiff === 'teens') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'teens' || p.ageGroup === 'tieners');
  } else if (rawDiff === 'hard' || rawDiff === 'adults') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'adults' || p.ageGroup === 'volwassenen');
  }

  const totalPages = Math.ceil(filteredPages.length / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;
  const coloringPages = filteredPages.slice(offset, offset + PER_PAGE);

  const difficultyQueryString = rawDiff ? `&difficulty=${encodeURIComponent(rawDiff)}` : '';

  return (
    <>
      <div className="page-hero" data-hub={mainHubSlug}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px', maxWidth: '680px' }}>
            <Breadcrumbs
              items={[
                { label: hub.title, href: `/${lang}/${hub.slug}` },
                { label: theme.title },
              ]}
              lang={lang}
            />
            <h1 className="title-h1" style={{ marginTop: '1rem' }}>
              {isEn ? `${theme.title} Coloring Pages` : `${theme.title} Kleurplaten`}
            </h1>
            <p
              style={{
                color: 'var(--gray-600)',
                fontSize: '1.1rem',
                marginTop: '0.6rem',
                lineHeight: 1.7,
              }}
            >
              {theme.seoIntro || seoData.shortIntro}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <span className="badge">
                {allColoringPages.length}{' '}
                {isEn ? 'pages available — 100% free' : 'kleurplaten beschikbaar — 100% gratis'}
              </span>
              <span className="badge" style={{ background: 'rgba(255, 46, 147, 0.15)', color: '#FF2E93', borderColor: 'rgba(255, 46, 147, 0.3)' }}>
                {isEn ? 'Official Album' : 'Officieel Album'}
              </span>
            </div>
          </div>

          {theme.image && (
            <div style={{
              flex: '0 0 220px',
              maxWidth: '260px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0,0,0,0.35), 0 0 0 2px rgba(255,255,255,0.15)',
              position: 'relative',
              aspectRatio: '3/4',
              background: 'var(--surface)',
            }}>
              <SafeImage
                src={theme.image}
                alt={`${theme.title} Banner`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <DifficultyFilterBar isEn={isEn} counts={counts} />

        <div className="section-header">
          <h2 className="title-h2">{isEn ? 'Coloring Pages' : 'Kleurplaten'}</h2>
        </div>

        {filteredPages.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: 'var(--gray-400)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--gray-200)',
            }}
          >
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}></p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)' }}>
              {isEn ? 'No coloring pages found for this difficulty level.' : 'Geen kleurplaten gevonden voor deze moeilijkheidsgraad.'}
            </p>
          </div>
        ) : (
          <div>
            {Array.from({ length: Math.ceil(coloringPages.length / 6) }).map((_, chunkIndex) => {
              const chunk = coloringPages.slice(chunkIndex * 6, chunkIndex * 6 + 6);
              const showAdBar = chunkIndex < Math.ceil(coloringPages.length / 6) - 1;

              return (
                <React.Fragment key={chunkIndex}>
                  <div className="grid-4" style={{ marginBottom: showAdBar ? '2.5rem' : 0 }}>
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

        {totalPages > 1 && (
          <div style={{ marginTop: '3.5rem' }}>
            {/* Progress indicator */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--gray-500)',
                  fontWeight: 600,
                  marginBottom: '0.6rem',
                }}
              >
                {isEn
                  ? `Page ${currentPage} of ${totalPages} — ${Math.min(
                      currentPage * PER_PAGE,
                      filteredPages.length
                    )} of ${filteredPages.length} coloring pages`
                  : `Pagina ${currentPage} van ${totalPages} — ${Math.min(
                      currentPage * PER_PAGE,
                      filteredPages.length
                    )} van ${filteredPages.length} kleurplaten`}
              </p>
              <div
                style={{
                  height: '6px',
                  background: 'var(--gray-200)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  maxWidth: '320px',
                  margin: '0 auto',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(currentPage / totalPages) * 100}%`,
                    background: 'linear-gradient(90deg, var(--primary), #A29BFE)',
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>

            {/* Prev / Next buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {currentPage > 1 ? (
                <Link
                  href={`/${lang}/${hub.slug}/${theme.slug}?page=${currentPage - 1}${difficultyQueryString}`}
                  className="btn-secondary"
                >
                  ← {isEn ? 'Previous' : 'Vorige'}
                </Link>
              ) : (
                <span
                  className="btn-secondary"
                  style={{ opacity: 0.4, pointerEvents: 'none' }}
                >
                  ← {isEn ? 'Previous' : 'Vorige'}
                </span>
              )}

              <span
                style={{
                  fontWeight: 800,
                  color: 'var(--foreground)',
                  padding: '0.5rem 1rem',
                  background: 'var(--surface-2)',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {currentPage} / {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={`/${lang}/${hub.slug}/${theme.slug}?page=${currentPage + 1}${difficultyQueryString}`}
                  className="btn-primary"
                >
                  {isEn ? 'Next' : 'Volgende'} →
                </Link>
              ) : (
                <span
                  className="btn-primary"
                  style={{ opacity: 0.4, pointerEvents: 'none' }}
                >
                  {isEn ? 'Next' : 'Volgende'} →
                </span>
              )}
            </div>
          </div>
        )}

        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <CategorySeoBlock
          title={seoData.bottomTitle}
          contentHtml={theme.seoContent || seoData.bottomContentHtml}
          lang={lang}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                name: `${theme.title} Coloring Pages`,
                description: theme.description,
                url: `https://colorvaults.com/${lang}/${mainHubSlug}/${theme.slug}`,
                isPartOf: { '@id': 'https://colorvaults.com/#website' },
                inLanguage: lang,
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: hub.title,
                    item: `https://colorvaults.com/${lang}/${hub.slug}`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: theme.title,
                    item: `https://colorvaults.com/${lang}/${hub.slug}/${theme.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
