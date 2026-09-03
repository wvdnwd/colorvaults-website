import Link from'next/link';

export async function generateStaticParams() {
 return [{ lang: 'en' }, { lang: 'nl' }, { lang: 'de' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 return {
 title: lang ==='en'?'About Us | ColorVaults':'Over Ons | ColorVaults',
 description: lang ==='en'?'Learn about ColorVaults — our mission to make creativity free and accessible for everyone.':'Leer meer over ColorVaults — onze missie om creativiteit gratis en toegankelijk te maken voor iedereen.',
 openGraph: {
 title: lang ==='en'?'About ColorVaults':'Over ColorVaults',
 description: lang ==='en'?'Free premium coloring pages for all ages.':'Gratis premium kleurplaten voor alle leeftijden.',
 images: ['/images/banner.jpg'],
 },
 };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 const isEn = lang ==='en';

 const values = [
    { icon: '🎁', title: isEn ? 'Always Free' : 'Altijd Gratis', desc: isEn ? 'We believe creativity should never come with a price tag. Every single page on ColorVaults is and will always be free to download.' : 'Wij geloven dat creativiteit nooit een prijskaartje mag hebben. Elke pagina op ColorVaults is en blijft gratis te downloaden.' },
    { icon: '⭐', title: isEn ? 'Studio Line Art' : 'Zuivere Lijnkunst', desc: isEn ? 'All our coloring pages are crafted and optimized for home and school printing — sharp, clean lines in 300 DPI clarity.' : 'Al onze kleurplaten zijn zorgvuldig geoptimaliseerd voor thuis en in de klas — haarscherpe 300 DPI lijnen en perfecte verhoudingen.' },
    { icon: '👨‍👩‍👧‍👦', title: isEn ? 'For Everyone' : 'Voor Iedereen', desc: isEn ? 'From toddlers taking their first creative steps, to adults seeking mindfulness and relaxation.' : 'Van peuters die hun eerste creatieve stappen zetten, tot volwassenen die ontspanning zoeken in mandala’s.' },
    { icon: '🌍', title: isEn ? 'Global & Multilingual' : 'Internationaal & Meertalig', desc: isEn ? 'Available in English, Dutch, German, and French to inspire families and classrooms worldwide.' : 'Volledig beschikbaar in het Nederlands, Engels, Duits en Frans om creatievelingen wereldwijd te inspireren.' },
  ];

 return (
 <>
 <div className="page-hero">
 <div className="container">
 <h1 className="title-h1">{isEn ?'About ColorVaults':'Over ColorVaults'}</h1>
 <p style={{ color: '#CBD5E1', fontSize:'1.15rem', marginTop:'0.75rem', maxWidth:'640px', lineHeight: 1.7 }}>
 {isEn
 ?'We are on a mission to make high-quality coloring pages free and accessible to everyone — in any language, for any age.':'Wij zijn op een missie om hoogwaardige kleurplaten gratis en toegankelijk te maken voor iedereen — in elke taal, voor elke leeftijd.'}
 </p>
 </div>
 </div>

 <div className="container section">
 {/* Story */}
 <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'center', marginBottom:'5rem'}}>
 <div>
 <span className="badge">📖 {isEn ?'Our Story':'Ons Verhaal'}</span>
 <h2 className="title-h2"style={{ marginTop:'0.75rem'}}>{isEn ?'Why We Started':'Waarom We Begonnen'}</h2>
 <p style={{ color:'var(--gray-600)', lineHeight: 1.8, marginBottom:'1rem'}}>
 {isEn
 ?'ColorVaults started with a simple observation: great coloring pages were either locked behind paywalls or hard to find for specific themes and age groups. Parents and teachers deserve better.':'ColorVaults begon met een simpele observatie: goede kleurplaten waren ofwel achter betaalmuren verstopt of moeilijk te vinden voor specifieke thema\'s en leeftijdsgroepen. Ouders en leraren verdienen beter.'}
 </p>
 <p style={{ color:'var(--gray-600)', lineHeight: 1.8 }}>
 {isEn
 ?"So we built ColorVaults — a clean, organized, and completely free library of thousands of coloring pages, organized by theme and age group, available in both English and Dutch.":'Dus bouwden we ColorVaults — een overzichtelijke, georganiseerde en volledig gratis bibliotheek van duizenden kleurplaten, georganiseerd op thema en leeftijdsgroep, beschikbaar in zowel Engels als Nederlands.'}
 </p>
 </div>
  <div style={{ background:'linear-gradient(135deg, rgba(255,107,74,0.1) 0%, rgba(254,242,242,0.9) 100%)', border: '1.5px solid rgba(255,107,74,0.25)', borderRadius:'var(--radius-xl)', padding:'3rem 2rem', textAlign:'center', boxShadow: '0 8px 30px rgba(255,107,74,0.08)'}}>
  <div style={{ fontSize:'4.5rem', marginBottom:'0.75rem'}}>🎨</div>
  <p style={{ fontSize:'3.25rem', fontWeight: 900, color:'var(--primary, #FF6B4A)', letterSpacing:'-0.03em', margin: 0 }}>18.800+</p>
  <p style={{ color:'var(--gray-600)', fontWeight: 700, fontSize: '1.05rem', marginTop: '0.4rem' }}>{isEn ?'Free coloring pages and counting':'Gratis kleurplaten en groeiend'}</p>
  </div>
  </div>

  {/* Studio & Quality Craftsmanship Section */}
  <div style={{
  marginBottom:'5rem',
  background:'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
  borderRadius:'var(--radius-xl)',
  padding:'3rem',
  border:'1.5px solid #E2E8F0',
  boxShadow: '0 10px 35px rgba(15, 23, 42, 0.04)'}}>
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1rem' }}>
    <span>✨ {isEn ?'Our Digital Drawing Studio':'Onze Digitale Tekenstudio'}</span>
  </div>
  <h2 className="title-h2"style={{ marginBottom:'1.25rem'}}>
  {isEn ?'Innovative Digital Artistry, Perfected by Hand':'Innovatieve Digitale Kunst, Handmatig Geperfectioneerd'}
  </h2>
  <p style={{ color:'var(--gray-600)', lineHeight: 1.85, marginBottom:'1.25rem', fontSize: '1.02rem' }}>
  {isEn
  ?'Behind ColorVaults is a modern digital illustration studio where cutting-edge creative technology meets a passion for clean line art. By pairing advanced digital artistry with meticulous curation, we bring thousands of imaginative, high-definition templates to life across hundreds of beloved themes.'
  :'Achter ColorVaults staat een moderne digitale tekenstudio waar geavanceerde illustratietechnologie en artistieke passie voor zuivere lijnkunst samenkomen. In plaats van standaard sjablonen combineren we innovatieve digitale ontwerptools met creatief vakmanschap om unieke, fantasierijke composities tot leven te brengen.'}
  </p>
  <p style={{ color:'var(--gray-600)', lineHeight: 1.85, marginBottom:'1.25rem', fontSize: '1.02rem' }}>
  {isEn
  ?'Every single artwork undergoes strict quality evaluation, contrast calibration, and vector smoothing. This guarantees crisp, deep-black 300-DPI outlines that never pixelate or smudge when printed on A4 or Letter paper — making coloring smooth, effortless, and satisfying for children, classrooms, and hobbyists.'
  :'Ieder sjabloon doorloopt een strenge kwaliteitscontrole, contrastverbetering en vectoroptimalisatie. Dit garandeert diepzwarte, zuivere lijnen op 300 DPI drukwerkniveau die niet vlekken bij het printen op A4 — ideaal en heerlijk vlot in te kleuren met potloden, viltstiften of digitaal op een tablet.'}
  </p>
  <div style={{ background: 'rgba(255, 107, 74, 0.06)', border: '1.5px dashed rgba(255, 107, 74, 0.35)', borderRadius: '1rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
    <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>✏️</span>
    <p style={{ margin: 0, color: 'var(--foreground)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 600 }}>
      {isEn
        ? 'A world-first innovation: with our interactive red pencil tool under every coloring page, our global community can circle any stray line directly on the drawing. Our artwork team refines it right away!'
        : 'Unieke wereldprimeur: met ons interactieve rode potlood onder elke kleurplaat kan onze community elk los lijntje direct omcirkelen. Onze tekenstudio herstelt het direct om de strakste collectie ter wereld te waarborgen!'}
    </p>
  </div>
  </div>

 {/* Values */}
 <div>
 <div className="section-header"style={{ marginBottom:'2rem'}}>
 <div>
 <span className="badge"> {isEn ?'Our Values':'Onze Waarden'}</span>
 <h2 className="title-h2"style={{ marginTop:'0.75rem'}}>{isEn ?'What We Stand For':'Waar We Voor Staan'}</h2>
 </div>
 </div>
 <div className="grid-4">
 {values.map(v => (
 <div key={v.title} style={{ background:'white', borderRadius:'var(--radius-lg)', padding:'2rem', border:'1px solid var(--gray-200)', boxShadow:'var(--shadow-sm)'}}>
 <div style={{ fontSize:'2rem', marginBottom:'0.75rem'}}>{v.icon}</div>
 <h3 style={{ fontSize:'1.1rem', fontWeight: 800, marginBottom:'0.5rem'}}>{v.title}</h3>
 <p style={{ fontSize:'0.875rem', color:'var(--gray-600)', lineHeight: 1.6 }}>{v.desc}</p>
 </div>
 ))}
 </div>
 </div>

 {/* CTA */}
 <div style={{ marginTop:'5rem', background:'linear-gradient(135deg, var(--foreground), #2e1065)', borderRadius:'var(--radius-xl)', padding:'4rem 3rem', textAlign:'center', color:'white'}}>
 <h2 style={{ color:'white', fontSize:'2rem', fontWeight: 800, marginBottom:'1rem'}}>
 {isEn ?'Ready to Start Coloring?':'Klaar om te Beginnen?'}
 </h2>
 <p style={{ color:'rgba(255,255,255,0.7)', marginBottom:'2rem', fontSize:'1.1rem'}}>
 {isEn ?'Browse thousands of free coloring pages — no account needed.':'Blader door duizenden gratis kleurplaten — geen account nodig.'}
 </p>
  <Link href={`/${lang}/disney-pixar`} className="btn-primary" style={{ display: 'inline-flex', padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 800 }}>
  {isEn ?'Explore Coloring Pages':'Ontdek Kleurplaten'}
  </Link>
 </div>
 </div>
 </>
 );
}
