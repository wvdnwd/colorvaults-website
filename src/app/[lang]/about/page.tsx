import Link from 'next/link';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'About Us | ColorVaults' : 'Over Ons | ColorVaults',
    description: lang === 'en'
      ? 'Learn about ColorVaults — our mission to make creativity free and accessible for everyone.'
      : 'Leer meer over ColorVaults — onze missie om creativiteit gratis en toegankelijk te maken voor iedereen.',
    openGraph: {
      title: lang === 'en' ? 'About ColorVaults' : 'Over ColorVaults',
      description: lang === 'en' ? 'Free premium coloring pages for all ages.' : 'Gratis premium kleurplaten voor alle leeftijden.',
      images: ['/images/banner.jpg'],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const values = [
    { icon: '🆓', title: isEn ? 'Always Free' : 'Altijd Gratis', desc: isEn ? 'We believe creativity should never come with a price tag. Every single page on ColorVaults is and will always be free to download.' : 'Wij geloven dat creativiteit nooit een prijskaartje mag hebben. Elke pagina op ColorVaults is en blijft gratis te downloaden.' },
    { icon: '✨', title: isEn ? 'Premium Quality' : 'Premium Kwaliteit', desc: isEn ? 'All our coloring pages are carefully crafted and optimized for home printing — sharp, clean lines and perfect proportions.' : 'Al onze kleurplaten zijn zorgvuldig gemaakt en geoptimaliseerd voor thuis afdrukken — scherpe, schone lijnen en perfecte verhoudingen.' },
    { icon: '🌍', title: isEn ? 'For Everyone' : 'Voor Iedereen', desc: isEn ? 'From toddlers taking their first creative steps, to adults seeking relaxation — we have something for every age and interest.' : 'Van peuters die hun eerste creatieve stappen zetten, tot volwassenen die ontspanning zoeken — we hebben iets voor elke leeftijd en interesse.' },
    { icon: '🇳🇱', title: isEn ? 'Dutch Roots' : 'Nederlandse Roots', desc: isEn ? 'ColorVaults was born in the Netherlands and serves both Dutch and international audiences with a fully bilingual experience.' : 'ColorVaults is geboren in Nederland en bedient zowel het Nederlandse als het internationale publiek met een volledig tweetalige ervaring.' },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">{isEn ? 'About ColorVaults' : 'Over ColorVaults'}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.15rem', marginTop: '0.75rem', maxWidth: '640px', lineHeight: 1.7 }}>
            {isEn
              ? 'We are on a mission to make high-quality coloring pages free and accessible to everyone — in any language, for any age.'
              : 'Wij zijn op een missie om hoogwaardige kleurplaten gratis en toegankelijk te maken voor iedereen — in elke taal, voor elke leeftijd.'}
          </p>
        </div>
      </div>

      <div className="container section">
        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <span className="badge">📖 {isEn ? 'Our Story' : 'Ons Verhaal'}</span>
            <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>{isEn ? 'Why We Started' : 'Waarom We Begonnen'}</h2>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1rem' }}>
              {isEn
                ? 'ColorVaults started with a simple observation: great coloring pages were either locked behind paywalls or hard to find for specific themes and age groups. Parents and teachers deserve better.'
                : 'ColorVaults begon met een simpele observatie: goede kleurplaten waren ofwel achter betaalmuren verstopt of moeilijk te vinden voor specifieke thema\'s en leeftijdsgroepen. Ouders en leraren verdienen beter.'}
            </p>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              {isEn
                ? "So we built ColorVaults — a clean, organized, and completely free library of thousands of coloring pages, organized by theme and age group, available in both English and Dutch."
                : 'Dus bouwden we ColorVaults — een overzichtelijke, georganiseerde en volledig gratis bibliotheek van duizenden kleurplaten, georganiseerd op thema en leeftijdsgroep, beschikbaar in zowel Engels als Nederlands.'}
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, var(--primary-light), #fce7f3)', borderRadius: 'var(--radius-xl)', padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎨</div>
            <p style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.03em' }}>10,000+</p>
            <p style={{ color: 'var(--gray-600)', fontWeight: 600 }}>{isEn ? 'Free coloring pages and counting' : 'Gratis kleurplaten en groeiend'}</p>
          </div>
        </div>

        {/* AI Transparency Section */}
        <div style={{
          marginBottom: '5rem',
          background: 'var(--surface-2)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem',
          border: '1px solid var(--gray-200)'
        }}>
          <span className="badge">🤖 {isEn ? 'AI & Technology Disclosure' : 'AI & Technologie Transparantie'}</span>
          <h2 className="title-h2" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
            {isEn ? 'Created with AI, Curated for Quality' : 'Gemaakt met AI, Zorgvuldig Geselecteerd'}
          </h2>
          <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1rem' }}>
            {isEn
              ? 'At ColorVaults, all coloring page templates and artwork are generated using state-of-the-art Artificial Intelligence (AI) models. By leveraging AI technology, we can continuously generate thousands of diverse, creative, and unique line-art designs across dozens of themes.'
              : 'Bij ColorVaults worden alle kleurplaatsjablonen en illustraties gegenereerd met behulp van geavanceerde Kunstmatige Intelligentie (AI) modellen. Door AI-technologie in te zetten, kunnen we continu duizenden gevarieerde, creatieve en unieke lijntekeningen genereren binnen tientallen thema\'s.'
            }
          </p>
          <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
            {isEn
              ? 'Every AI-generated image undergoes quality evaluation, contrast enhancement, and formatting to ensure clean black outlines that are easy and satisfying to color — whether printed on A4 paper or colored digitally.'
              : 'Elke door AI gegenereerde afbeelding ondergaat een kwaliteitsbeoordeling, contrastverbetering en formattering om te zorgen voor scherpe zwarte contouren die makkelijk en fijn zijn om in te kleuren — of ze nu op A4-papier worden afgedrukt of digitaal worden ingekleurd.'
            }
          </p>
        </div>

        {/* Values */}
        <div>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div>
              <span className="badge">💜 {isEn ? 'Our Values' : 'Onze Waarden'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>{isEn ? 'What We Stand For' : 'Waar We Voor Staan'}</h2>
            </div>
          </div>
          <div className="grid-4">
            {values.map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '5rem', background: 'linear-gradient(135deg, var(--foreground), #2e1065)', borderRadius: 'var(--radius-xl)', padding: '4rem 3rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
            {isEn ? 'Ready to Start Coloring?' : 'Klaar om te Beginnen?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {isEn ? 'Browse thousands of free coloring pages — no account needed.' : 'Blader door duizenden gratis kleurplaten — geen account nodig.'}
          </p>
          <Link href={`/${lang}/${isEn ? 'collections' : 'collecties'}`} className="btn-primary" style={{ display: 'inline-flex' }}>
            {isEn ? '🎨 Explore Collections' : '🎨 Ontdek Collecties'}
          </Link>
        </div>
      </div>
    </>
  );
}
