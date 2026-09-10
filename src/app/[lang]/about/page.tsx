import Link from 'next/link';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'About Us | ColorVaults' : 'Over Ons | ColorVaults',
    description:
      lang === 'en'
        ? 'Learn about ColorVaults — our mission to make high-quality, creative educational resources free and accessible for families, teachers, and artists worldwide.'
        : 'Leer meer over ColorVaults — onze missie om hoogwaardige, educatieve kleurplaten en creatieve hulpmiddelen gratis toegankelijk te maken voor gezinnen en scholen.',
    openGraph: {
      title: lang === 'en' ? 'About ColorVaults' : 'Over ColorVaults',
      description:
        lang === 'en'
          ? 'Free premium coloring pages, educational guides, and printable resources for all ages.'
          : 'Gratis premium kleurplaten, educatieve gidsen en printbare hulpmiddelen voor alle leeftijden.',
      images: ['/images/banner.jpg'],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const values = isEn
    ? [
        {
          icon: '🎨',
          title: 'Artistic Excellence',
          desc: 'Every illustration is crafted with clear, clean outlines optimized for crisp printing on standard home and school printers.',
        },
        {
          icon: '📚',
          title: 'Educational Value',
          desc: 'Our collections nurture fine motor control, hand-eye coordination, color theory understanding, and mindfulness for all age groups.',
        },
        {
          icon: '🌱',
          title: '100% Free & Accessible',
          desc: 'Creativity should never be behind a paywall. All printable pages, activity sheets, and educational guides are free for personal and classroom use.',
        },
        {
          icon: '🛡️',
          title: 'Safe & Family-Friendly',
          desc: 'We maintain strict editorial standards ensuring all content is wholesome, positive, and safe for young children and classroom environments.',
        },
      ]
    : [
        {
          icon: '🎨',
          title: 'Artistieke Kwaliteit',
          desc: 'Elke illustratie is ontworpen met duidelijke, strakke lijnen geoptimaliseerd voor scherp printen op elke printer.',
        },
        {
          icon: '📚',
          title: 'Educatieve Waarde',
          desc: 'Onze collecties stimuleren de fijne motoriek, oog-handcoördinatie, kleurinzicht en concentratie voor jong en oud.',
        },
        {
          icon: '🌱',
          title: '100% Gratis & Toegankelijk',
          desc: 'Creativiteit hoort voor iedereen beschikbaar te zijn. Al onze kleurplaten en educatieve gidsen zijn gratis voor thuis en in de klas.',
        },
        {
          icon: '🛡️',
          title: 'Veilig & Kindvriendelijk',
          desc: 'Wij hanteren strenge redactionele normen zodat alle inhoud positief, pedagogisch verantwoord en veilig is voor kinderen.',
        },
      ];

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>
            {isEn ? 'Our Mission & Story' : 'Onze Missie & Verhaal'}
          </span>
          <h1 className="title-h1" style={{ marginBottom: '1.25rem' }}>
            {isEn ? 'Inspiring Creativity Worldwide' : 'Creativiteit Wereldwijd Inspireren'}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
            {isEn
              ? 'ColorVaults is a free digital library dedicated to providing high-quality coloring pages, mindfulness activities, and educational art resources for children, parents, teachers, and hobbyists.'
              : 'ColorVaults is een gratis digitale bibliotheek gewijd aan hoogwaardige kleurplaten, mindfulness-activiteiten en educatieve kunsthulpmiddelen voor kinderen, ouders, docenten en creatievelingen.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Story Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <h2 className="title-h2" style={{ marginBottom: '1rem' }}>
              {isEn ? 'Why We Created ColorVaults' : 'Waarom ColorVaults Ontstaan Is'}
            </h2>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {isEn
                ? 'We believe coloring is much more than a pastime. For children, it is a foundational skill that builds pencil grip, patience, and visual-spatial reasoning. For teens and adults, intricate mandalas and detailed nature scenes offer a proven screen-free method to unwind and reduce stress.'
                : 'Wij geloven dat kleuren veel meer is dan een tijdverdrijf. Voor kinderen is het een essentiële vaardigheid die pengreep, geduld en ruimtelijk inzicht versterkt. Voor volwassenen bieden gedetailleerde mandala’s en natuurtekeningen een effectieve manier om te ontspannen zonder beeldscherm.'}
            </p>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
              {isEn
                ? 'Frustrated by cluttered websites full of low-resolution images and broken print formats, we built ColorVaults with a clean, modern experience that puts high-quality art first.'
                : 'Omdat veel bestaande websites vol staan met wazige afbeeldingen en onhandige printformaten, hebben we ColorVaults ontworpen met een overzichtelijke, moderne interface waarin kwaliteit en gebruiksgemak centraal staan.'}
            </p>
          </div>
          <div style={{ background: 'var(--surface-2, #f8fafc)', borderRadius: 'var(--radius-xl, 24px)', padding: '2.5rem', border: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>
              {isEn ? '📊 By the Numbers' : '📊 ColorVaults in Cijfers'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎨</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem' }}>26,000+</strong>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{isEn ? 'Original coloring pages & templates' : 'Originele kleurplaten & sjablonen'}</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🌍</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem' }}>4 {isEn ? 'Languages' : 'Talen'}</strong>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{isEn ? 'English, Dutch, German & French' : 'Engels, Nederlands, Duits & Frans'}</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🖨️</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem' }}>A4 & Letter Ready</strong>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{isEn ? 'Optimized one-click printing' : 'Geoptimaliseerd voor direct printen'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge">{isEn ? 'Our Principles' : 'Onze Principes'}</span>
            <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>
              {isEn ? 'What We Stand For' : 'Waar Wij Voor Staan'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg, 16px)',
                  padding: '2rem',
                  border: '1px solid var(--gray-200)',
                  boxShadow: 'var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))',
                }}
              >
                <div style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Standards */}
        <div style={{ background: 'var(--surface-2, #f8fafc)', borderRadius: 'var(--radius-xl, 24px)', padding: '3rem', border: '1px solid var(--gray-200)', marginBottom: '5rem' }}>
          <h2 className="title-h2" style={{ marginBottom: '1rem' }}>
            {isEn ? 'Editorial & Quality Standards' : 'Redactionele & Kwaliteitsnormen'}
          </h2>
          <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '1rem' }}>
            {isEn
              ? 'Our team of educators and digital artists inspects every template before publication. We verify line clarity, stroke contrast, appropriate age categorization, and cultural sensitivity. We also provide comprehensive color palette guides and printing tips to ensure the best possible experience at home and in the classroom.'
              : 'Ons team van ontwerpers en pedagogen controleert elk sjabloon voor publicatie. We letten nauwkeurig op lijndikte, contrast, geschikte leeftijdscategorieën en gebruiksvriendelijkheid. Daarnaast voorzien we elke categorie van uitgebreide kleur- en materiaaltips.'}
          </p>
          <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>
            {isEn
              ? 'Have suggestions or requests for new themes? We continuously expand our catalog based on feedback from parents, art therapists, and educators.'
              : 'Heeft u suggesties voor nieuwe thema’s of educatieve categorieën? We breiden ons aanbod voortdurend uit op basis van feedback van ouders, leerkrachten en therapeuten.'}
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--foreground, #1e1b4b), #312e81)',
            borderRadius: 'var(--radius-xl, 24px)',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h2 style={{ color: 'white', fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            {isEn ? 'Ready to Start Coloring?' : 'Klaar om te Beginnen?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            {isEn
              ? 'Browse thousands of free, high-resolution coloring sheets and print your favorites instantly.'
              : 'Blader door duizenden gratis kwaliteitskleurplaten en print direct uw favorieten.'}
          </p>
          <Link
            href={`/${lang}/disney-pixar`}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              padding: '0.9rem 2.25rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              textDecoration: 'none',
              borderRadius: '9999px',
            }}
          >
            {isEn ? 'Explore All Themes' : 'Ontdek Alle Thema’s'}
          </Link>
        </div>
      </div>
    </>
  );
}
