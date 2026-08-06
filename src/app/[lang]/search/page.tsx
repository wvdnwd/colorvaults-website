import SearchClient from '@/components/SearchClient';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Search Coloring Pages | ColorVaults' : 'Zoeken | ColorVaults',
    description: lang === 'en'
      ? 'Search thousands of free coloring pages by theme, character, or age group.'
      : 'Zoek door duizenden gratis kleurplaten op thema, personage of leeftijdsgroep.',
  };
}

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">
            {isEn ? '🔍 Search Coloring Pages' : '🔍 Kleurplaten Zoeken'}
          </h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            {isEn ? 'Find exactly what you\'re looking for — instantly.' : 'Vind precies wat je zoekt — direct.'}
          </p>
        </div>
      </div>
      <div className="container section">
        <SearchClient lang={lang} />
      </div>
    </>
  );
}
