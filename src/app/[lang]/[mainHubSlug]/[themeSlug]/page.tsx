import { getThemes, getThemeBySlug, getMainHubs, getColoringPages, safeJsonLd } from '@/lib/api';
import { getCategorySeoData } from '@/lib/categorySeo';
import CategorySeoBlock from '@/components/CategorySeoBlock';
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
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10));

  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const isEn = lang === 'en';

  const allThemesInHub = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug)
    .map(t => ({ slug: t.slug, title: t.title }));

  const seoData = getCategorySeoData(lang, mainHubSlug, themeSlug, theme.title, allThemesInHub);

  // Get ALL coloring pages for this theme (combining all age groups into 1 single folder/page)
  const allColoringPages = getColoringPages(lang).filter(
    p => p.parentHub === mainHubSlug && p.parentTheme === themeSlug
  );

  const totalPages = Math.ceil(allColoringPages.length / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;
  const coloringPages = allColoringPages.slice(offset, offset + PER_PAGE);

  return (
    <>
      <div className="page-hero" data-hub={mainHubSlug}>
        <div className="container">
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
              maxWidth: '640px',
            }}
          >
            {theme.seoIntro || seoData.shortIntro}
          </p>
          <span className="badge" style={{ marginTop: '1.25rem' }}>
            ✨ {allColoringPages.length}{' '}
            {isEn ? 'pages available — 100% free' : 'kleurplaten beschikbaar — 100% gratis'}
          </span>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <div className="section-header">
          <h2 className="title-h2">{isEn ? 'All Coloring Pages' : 'Alle Kleurplaten'}</h2>
        </div>

        {allColoringPages.length === 0 ? (
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
                    <AdSlot type="in-feed" text={isEn ? 'Sponsored' : 'Gesponsord'} />
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
                      allColoringPages.length
                    )} of ${allColoringPages.length} coloring pages`
                  : `Pagina ${currentPage} van ${totalPages} — ${Math.min(
                      currentPage * PER_PAGE,
                      allColoringPages.length
                    )} van ${allColoringPages.length} kleurplaten`}
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
                  href={`/${lang}/${hub.slug}/${theme.slug}?page=${currentPage - 1}`}
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
                  href={`/${lang}/${hub.slug}/${theme.slug}?page=${currentPage + 1}`}
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
