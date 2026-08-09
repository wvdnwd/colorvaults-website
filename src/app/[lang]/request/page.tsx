import RequestForm from "@/components/RequestForm";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Request a Coloring Page | ColorVaults' : 'Kleurplaat Aanvragen | ColorVaults',
    description: lang === 'en'
      ? 'Can\'t find what you\'re looking for? Request a custom coloring page!'
      : 'Kun je niet vinden wat je zoekt? Vraag een aangepaste kleurplaat aan!',
  };
}

export default async function RequestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">{isEn ? '✉️ Request a Coloring Page' : '✉️ Kleurplaat Aanvragen'}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '600px', lineHeight: 1.7 }}>
            {isEn
              ? "Can't find the coloring page you're looking for? Let us know and we'll try to add it!"
              : 'Kun je de kleurplaat die je zoekt niet vinden? Laat het ons weten en we proberen hem toe te voegen!'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <div className="seo-block">
              <h2>{isEn ? 'How Requests Work' : 'Hoe Aanvragen Werken'}</h2>
              <p>
                {isEn
                  ? 'We love hearing from our community! If there\'s a character, theme, or style you want to see on ColorVaults, send us a message and we\'ll do our best to create it.'
                  : 'We horen graag van onze community! Als er een personage, thema of stijl is die je op ColorVaults wilt zien, stuur ons dan een bericht en we doen ons best om het te maken.'}
              </p>
              <p style={{ marginTop: '1rem' }}>
                {isEn
                  ? 'Popular requests are prioritized and added to our upcoming releases. You\'ll receive credit on the page as the person who requested it!'
                  : 'Populaire aanvragen krijgen prioriteit en worden toegevoegd aan onze aankomende releases. Je ontvangt een vermelding op de pagina als degene die het heeft aangevraagd!'}
              </p>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '⚡', text: isEn ? 'Most requests are fulfilled within 2 weeks' : 'De meeste aanvragen worden binnen 2 weken verwerkt' },
                { icon: '🆓', text: isEn ? 'All requested pages are free to download' : 'Alle aangevraagde pagina\'s zijn gratis te downloaden' },
                { icon: '🙏', text: isEn ? 'You\'ll be credited as the requester' : 'Je wordt vermeld als aanvrager' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius)', border: '1px solid rgba(124,58,237,0.15)' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <RequestForm lang={lang} isEn={isEn} />
        </div>
      </div>
    </>
  );
}
