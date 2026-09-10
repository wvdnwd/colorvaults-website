import SearchClient from'@/components/SearchClient';
import { getThemes } from'@/lib/api';
import { getSearchPage } from '@/lib/search';
import Breadcrumbs from'@/components/Breadcrumbs';

import { SITE_ORIGIN, VALID_LOCALES } from '@/lib/site';

export async function generateStaticParams() {
  return VALID_LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; difficulty?: string; age?: string; theme?: string }>;
}) {
  const { lang } = await params;
  const { q, difficulty, age, theme } = await searchParams;
  const isEn = lang === 'en';

  let titleParts: string[] = [];

  if (q) titleParts.push(`"${q}"`);
  if (difficulty) {
    const dMap: Record<string, string> = {
      easy: isEn ? 'Easy' : 'Makkelijk',
      medium: isEn ? 'Medium' : 'Gemiddeld',
      hard: isEn ? 'Hard' : 'Moeilijk',
    };
    titleParts.push(dMap[difficulty] || difficulty);
  }
  if (age) {
    const aMap: Record<string, string> = {
      kids: isEn ? 'Kids' : 'Kinderen',
      teens: isEn ? 'Teens' : 'Tieners',
      adults: isEn ? 'Adults' : 'Volwassenen',
    };
    titleParts.push(aMap[age] || age);
  }
  if (theme) {
    const foundTheme = getThemes(lang).find(t => t.slug === theme);
    titleParts.push(foundTheme ? foundTheme.title : theme);
  }

  const mainTitle = titleParts.length > 0
    ? `${titleParts.join(' • ')} ${isEn ? 'Coloring Pages' : 'Kleurplaten'}` : (isEn ? 'Search Free Coloring Pages' : 'Zoek Gratis Kleurplaten');

  // Build canonical URL query string
  const urlParams = new URLSearchParams();
  if (q) urlParams.set('q', q);
  if (difficulty) urlParams.set('difficulty', difficulty);
  if (age) urlParams.set('age', age);
  if (theme) urlParams.set('theme', theme);
  const qString = urlParams.toString();
  const canonicalPath = qString ? `${SITE_ORIGIN}/${lang}/search?${qString}` : `${SITE_ORIGIN}/${lang}/search`;

  const languages: Record<string, string> = {};
  for (const l of VALID_LOCALES) {
    languages[l] = `${SITE_ORIGIN}/${l}/search${qString ? `?${qString}` : ''}`;
  }
  languages['x-default'] = `${SITE_ORIGIN}/en/search${qString ? `?${qString}` : ''}`;

  return {
    title: `${mainTitle} | ColorVaults`,
    description: isEn
      ? `Search and filter thousands of free printable coloring pages by theme, difficulty, and age group.`
      : `Zoek en filter door duizenden gratis printbare kleurplaten op onderwerp, moeilijkheidsgraad en leeftijd.`,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalPath,
      languages,
    },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; difficulty?: string; age?: string; theme?: string; page?: string }>;
}) {
  const { lang } = await params;
  const { q = '', difficulty = '', age = '', theme = '', page = '1' } = await searchParams;
  const isEn = lang === 'en';

  const allThemes = getThemes(lang).map(t => ({ slug: t.slug, title: t.title }));

  const results = getSearchPage(lang, new URLSearchParams({ q, difficulty, age, theme, page }));

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ label: isEn ? 'Search' : 'Zoeken' }]}
            lang={lang}
          />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>
            {isEn ? 'Search & Filter Coloring Pages' : 'Kleurplaten Zoeken & Filteren'}
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '640px' }}>
            {isEn
              ? 'Filter thousands of free printable coloring pages by topic, difficulty level, and age group.'
              : 'Filter door duizenden gratis printbare kleurplaten op onderwerp, moeilijkheidsgraad en leeftijd.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <SearchClient
          lang={lang}
          initialQuery={q}
          initialDifficulty={difficulty}
          initialAge={age}
          initialTheme={theme}
          allThemes={allThemes}
          initialPages={results.pages}
          total={results.total}
          currentPage={results.page}
        />
      </div>
    </>
  );
}
