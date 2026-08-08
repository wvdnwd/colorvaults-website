import { getAgePages, getAgePageBySlug, getMainHubs, getThemes, getPagesByAgeGroup } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import MotionCard from '@/components/MotionCard';

export async function generateStaticParams() {
  const agesEn = getAgePages('en').map(a => ({ lang: 'en', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  const agesNl = getAgePages('nl').map(a => ({ lang: 'nl', mainHubSlug: a.parentHub, themeSlug: a.parentTheme, ageSlug: a.ageGroup }));
  return [...agesEn, ...agesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug } = await params;
  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!agePage) return {};
  return {
    title: `${agePage.title} | Free Printable | ColorVaults`,
    description: agePage.seoText,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}`,
      languages: { 'en': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}`, 'nl': `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}` }
    }
  };
}

import Image from 'next/image';

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
              { label: agePage.title, href: `/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}` }
            ]}
            lang={lang}
          />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>{agePage.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.5rem', lineHeight: 1.7, maxWidth: '600px' }}>
            {agePage.introText}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', marginTop: '0.75rem', fontWeight: 600 }}>
            {allColoringPages.length} {isEn ? 'pages available — all free' : 'pagina\'s beschikbaar — allemaal gratis'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="section-header">
          <h2 className="title-h2">
            {isEn ? 'All Coloring Pages' : 'Alle Kleurplaten'}
          </h2>
        </div>

        {coloringPages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</p>
            <p>{isEn ? 'Pages coming soon! Check back later.' : 'Kleurplaten binnenkort beschikbaar!'}</p>
          </div>
        ) : (
          <div className="grid-4">
            {coloringPages.map(page => (
              <MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
            {currentPage > 1 ? (
              <Link href={`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}?page=${currentPage - 1}`} className="btn-secondary">
                ← {isEn ? 'Previous' : 'Vorige'}
              </Link>
            ) : (
              <span className="btn-secondary" style={{ opacity: 0.5, pointerEvents: 'none' }}>← {isEn ? 'Previous' : 'Vorige'}</span>
            )}
            
            <span style={{ fontWeight: 600, color: 'var(--gray-600)' }}>
              {currentPage} / {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link href={`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}?page=${currentPage + 1}`} className="btn-secondary">
                {isEn ? 'Next' : 'Volgende'} →
              </Link>
            ) : (
              <span className="btn-secondary" style={{ opacity: 0.5, pointerEvents: 'none' }}>{isEn ? 'Next' : 'Volgende'} →</span>
            )}
          </div>
        )}

        <div className="seo-block" style={{ marginTop: '4rem' }}>
          <h2>{isEn ? `About These Pages` : `Over Deze Kleurplaten`}</h2>
          <p>{agePage.seoText}</p>
        </div>
      </div>
    </>
  );
}
