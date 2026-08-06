import { getAgePages, getAgePageBySlug, getMainHubs, getThemes, getPagesByAgeGroup } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

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

export default async function AgePage({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug } = await params;

  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!agePage) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  const theme = getThemes(lang).find(t => t.slug === themeSlug && t.parentHub === mainHubSlug);
  if (!hub || !theme) return notFound();

  const coloringPages = getPagesByAgeGroup(lang, mainHubSlug, themeSlug, ageSlug);
  const isEn = lang === 'en';

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
            {coloringPages.length} {isEn ? 'pages available — all free' : 'pagina\'s beschikbaar — allemaal gratis'}
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
              <Link
                key={page.slug}
                href={`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}/${page.slug}`}
                className="card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={page.preview} alt={page.title} className="card-img" />
                <div className="card-body">
                  <h3 className="card-title">{page.title}</h3>
                  <p className="card-desc">{page.shortDescription}</p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginTop: '0.75rem',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    <span>🆓</span>
                    <span>{isEn ? 'Free Download' : 'Gratis Downloaden'}</span>
                  </div>
                </div>
              </Link>
            ))}
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
