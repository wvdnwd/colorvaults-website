import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Contest | ColorVaults' : 'Wedstrijd | ColorVaults',
    description: lang === 'en'
      ? 'Join the ColorVaults coloring contest and win prizes!'
      : 'Doe mee aan de ColorVaults kleurwedstrijd en win prijzen!',
  };
}

export default async function ContestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">{isEn ? '🏆 Coloring Contest' : '🏆 Kleurwedstrijd'}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '600px', lineHeight: 1.7 }}>
            {isEn
              ? 'Show us your best coloring work and win amazing prizes!'
              : 'Laat ons je beste kleurwerk zien en win fantastische prijzen!'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="seo-block">
          <h2>{isEn ? 'How It Works' : 'Hoe Werkt Het'}</h2>
          <p>
            {isEn
              ? 'Download any coloring page from ColorVaults, color it in, and submit a photo. Our community votes for the best entries and winners receive special prizes each month.'
              : 'Download een kleurplaat van ColorVaults, kleur hem in, en stuur een foto in. Onze community stemt op de beste inzendingen en winnaars ontvangen elke maand speciale prijzen.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {[
            { step: '1', icon: '⬇️', title: isEn ? 'Download a Page' : 'Download een Kleurplaat', desc: isEn ? 'Choose any free coloring page from our collection.' : 'Kies een gratis kleurplaat uit onze collectie.' },
            { step: '2', icon: '🎨', title: isEn ? 'Color It In' : 'Kleur Het In', desc: isEn ? 'Use pencils, markers, or digital tools — get creative!' : 'Gebruik potloden, stiften of digitale tools — wees creatief!' },
            { step: '3', icon: '📸', title: isEn ? 'Submit Your Entry' : 'Stuur Je Inzending', desc: isEn ? 'Send us a photo via our contact page with "Contest" in the subject.' : 'Stuur ons een foto via onze contactpagina met "Wedstrijd" in het onderwerp.' },
            { step: '4', icon: '🏅', title: isEn ? 'Win Prizes!' : 'Win Prijzen!', desc: isEn ? 'Our community votes and winners are announced monthly.' : 'Onze community stemt en winnaars worden maandelijks bekendgemaakt.' },
          ].map(item => (
            <div key={item.step} style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, var(--primary), #a855f7)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', color: 'white', marginTop: '3rem' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
            {isEn ? 'Ready to Join?' : 'Klaar om Mee te Doen?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
            {isEn ? 'The contest is open to everyone — all ages welcome!' : 'De wedstrijd staat open voor iedereen — alle leeftijden welkom!'}
          </p>
          <a href={`/${lang}/contact`} className="btn-secondary">
            {isEn ? '✉️ Submit Your Entry' : '✉️ Stuur Je Inzending'}
          </a>
        </div>
      </div>
    </>
  );
}
