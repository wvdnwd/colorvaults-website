export async function generateStaticParams() {
 return [{ lang:'en'}, { lang:'nl'}];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 return {
 title: lang ==='en'?'Licensing | ColorVaults':'Licentie | ColorVaults',
 description: lang ==='en'?'Learn about licensing and commercial use of ColorVaults content.':'Lees meer over licenties en commercieel gebruik van ColorVaults content.',
 };
}

export default async function LicensingPage({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 const isEn = lang ==='en';

 const tiers = [
 {
 name: isEn ?'Personal Use':'Persoonlijk Gebruik',
 price: isEn ?'Free':'Gratis',
 icon:'🏠',
 features: [
 isEn ?'Unlimited personal downloads':'Onbeperkte persoonlijke downloads',
 isEn ?'Home printing':'Thuis afdrukken',
 isEn ?'Family & classroom use':'Gezin & klaslokaalgebruik',
 isEn ?'Non-commercial sharing':'Niet-commercieel delen',
 ],
 highlight: false,
 },
 {
 name: isEn ?'Commercial License':'Commerciële Licentie',
 price: isEn ?'Contact Us':'Neem Contact Op',
 icon:'💼',
 features: [
 isEn ?'Use in products for sale':'Gebruik in producten te koop',
 isEn ?'Printing & distribution':'Drukwerk & verspreiding',
 isEn ?'Digital product bundles':'Digitale productbundels',
 isEn ?'Subscription services':'Abonnementsdiensten',
 ],
 highlight: true,
 },
 ];

 return (
 <>
 <div className="page-hero">
 <div className="container">
 <h1 className="title-h1">{isEn ?'Licensing':'Licentie'}</h1>
 <p style={{ color:'#CBD5E1', fontSize:'1.1rem', marginTop:'0.5rem', maxWidth:'600px', lineHeight: 1.7 }}>
 {isEn
 ?'All ColorVaults pages are free for personal use. For commercial use, please read our licensing terms.':'Alle ColorVaults kleurplaten zijn gratis voor persoonlijk gebruik. Voor commercieel gebruik, lees onze licentievoorwaarden.'}
 </p>
 </div>
 </div>

 <div className="container section">
 <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'2rem', marginBottom:'4rem'}}>
 {tiers.map(tier => (
 <div
 key={tier.name}
 style={{
 background: tier.highlight ?'linear-gradient(135deg, var(--primary), #a855f7)':'white',
 borderRadius:'var(--radius-lg)',
 padding:'2.5rem',
 border: tier.highlight ?'none':'2px solid var(--gray-200)',
 boxShadow: tier.highlight ?'var(--shadow-purple)':'var(--shadow-sm)',
 }}
 >
 <div style={{ fontSize:'2.5rem', marginBottom:'1rem'}}>{tier.icon}</div>
 <h3 style={{ fontSize:'1.4rem', fontWeight: 800, color: tier.highlight ?'white':'var(--foreground)', marginBottom:'0.5rem'}}>
 {tier.name}
 </h3>
 <p style={{ fontSize:'1.75rem', fontWeight: 900, color: tier.highlight ?'white':'var(--primary)', marginBottom:'1.5rem'}}>
 {tier.price}
 </p>
 <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
 {tier.features.map(f => (
 <li key={f} style={{ display:'flex', gap:'0.5rem', alignItems:'flex-start', fontSize:'0.9rem', color: tier.highlight ?'rgba(255,255,255,0.85)':'var(--gray-600)'}}>
 <span style={{ color: tier.highlight ?'#86efac':'var(--primary)', fontWeight: 700, flexShrink: 0 }}></span>
 {f}
 </li>
 ))}
 </ul>
 {tier.highlight && (
 <a
 href={`/${lang}/contact`}
 className="btn-secondary"style={{ marginTop:'2rem', display:'inline-flex', width:'100%', justifyContent:'center'}}
 >
 {isEn ?'Get in Touch':'Neem Contact Op'}
 </a>
 )}
 </div>
 ))}
 </div>

 <div className="seo-block">
 <h2>{isEn ?'Full License Terms':'Volledige Licentievoorwaarden'}</h2>
 <p>
 {isEn
 ?'ColorVaults grants you a non-exclusive, royalty-free license to download and use our coloring pages for personal, educational, and non-commercial purposes. You may not redistribute, sell, or use our pages in any commercial product without a commercial license.':'ColorVaults verleent u een niet-exclusieve, royaltyvrije licentie om onze kleurplaten te downloaden en te gebruiken voor persoonlijke, educatieve en niet-commerciële doeleinden. U mag onze pagina\'s niet herverspreiden, verkopen of gebruiken in commerciële producten zonder een commerciële licentie.'}
 </p>
 <p>
 {isEn
 ?'For licensing inquiries, please contact us via our contact page. We\'ll get back to you within 2 business days.':'Voor licentievragen kunt u contact met ons opnemen via onze contactpagina. We reageren binnen 2 werkdagen.'}
 </p>
 </div>
 </div>
 </>
 );
}
