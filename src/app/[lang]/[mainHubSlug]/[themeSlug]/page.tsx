import { getThemes, getThemeBySlug, getMainHubs, safeJsonLd } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';

export async function generateStaticParams() {
  const themesEn = getThemes('en').map(t => ({ lang: 'en', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesNl = getThemes('nl').map(t => ({ lang: 'nl', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  return [...themesEn, ...themesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string }> }) {
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
        'en': `/en/${mainHubSlug}/${theme.slug}`, 
        'nl': `/nl/${mainHubSlug}/${theme.slug}`,
        'x-default': `/en/${mainHubSlug}/${theme.slug}`
      }
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

export default async function ThemePage({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const isEn = lang === 'en';

  const ageLabels: Record<string, { en: string; nl: string; emoji: string }> = {
    toddlers: { en: 'Toddlers (1–3)', nl: 'Peuters (1–3)', emoji: '🍼' },
    kids:     { en: 'Kids (4–10)',     nl: 'Kinderen (4–10)', emoji: '🧒' },
    peuters:  { en: 'Toddlers (1–3)', nl: 'Peuters (1–3)', emoji: '🍼' },
    kinderen: { en: 'Kids (4–10)',     nl: 'Kinderen (4–10)', emoji: '🧒' },
    teens:    { en: 'Teens (11–17)',   nl: 'Tieners (11–17)', emoji: '🧑' },
    tieners:  { en: 'Teens (11–17)',   nl: 'Tieners (11–17)', emoji: '🧑' },
    adults:   { en: 'Adults (18+)',    nl: 'Volwassenen (18+)', emoji: '🧑‍🎨' },
    volwassenen: { en: 'Adults (18+)', nl: 'Volwassenen (18+)', emoji: '🧑‍🎨' },
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: hub.title, href: `/${lang}/${hub.slug}` },
              { label: theme.title }
            ]}
            lang={lang}
          />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>
            {isEn ? `${theme.title} Coloring Pages` : `${theme.title} Kleurplaten`}
          </h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.6rem', lineHeight: 1.7, maxWidth: '640px' }}>
            {theme.description}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="section-header">
          <h2 className="title-h2">{isEn ? 'Select an Age Group' : 'Kies een Leeftijdsgroep'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {theme.availableAges.map(age => {
            const label = ageLabels[age];
            return (
              <Link
                key={age}
                href={`/${lang}/${hub.slug}/${theme.slug}/${age}`}
                className="age-card-link"
                style={{ textDecoration: 'none' }}
              >
                <div className="age-card">
                  <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
                    {label?.emoji || '🎨'}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.35rem', textTransform: 'capitalize' }}>
                    {label ? (isEn ? label.en : label.nl) : age}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 600 }}>
                    {isEn ? 'Browse pages →' : 'Bladeren →'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="seo-block" style={{ marginTop: '3.5rem' }}>
          <h2>{isEn ? `About ${theme.title} Coloring Pages` : `Over ${theme.title} Kleurplaten`}</h2>
          <p>{theme.description} {isEn
            ? `Find the perfect ${theme.title} coloring page for any age group. All pages are free to download and print.`
            : `Vind de perfecte ${theme.title} kleurplaat voor elke leeftijdsgroep. Alle pagina's zijn gratis te downloaden en afdrukken.`}
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${theme.title} Coloring Pages`,
          "description": theme.description,
          "url": `https://colorvaults.com/${lang}/${mainHubSlug}/${theme.slug}`,
          "isPartOf": { "@id": "https://colorvaults.com/#website" },
          "inLanguage": lang,
          "hasPart": theme.availableAges.map(age => ({
            "@type": "WebPage",
            "name": `${theme.title} Coloring Pages for ${ageLabels[age] ? (isEn ? ageLabels[age].en : ageLabels[age].nl) : age}`,
            "url": `https://colorvaults.com/${lang}/${mainHubSlug}/${theme.slug}/${age}`
          }))
        }) }}
      />
    </>
  );
}
