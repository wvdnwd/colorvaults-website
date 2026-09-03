export async function generateStaticParams() {
 return [{ lang:'en'}, { lang:'nl'}];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 return {
 title: lang ==='en'?'Terms of Service | ColorVaults':'Algemene Voorwaarden | ColorVaults',
 description: lang ==='en'?'Read the Terms of Service for ColorVaults — including AI content disclosure, licensing, and usage rules.':'Lees de Algemene Voorwaarden van ColorVaults — inclusief AI content transparantie, licenties en gebruiksregels.',
 };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 const isEn = lang ==='en';

 return (
 <div className="container section">
 <div style={{ maxWidth:'820px', margin:'0 auto'}}>
 <h1 className="title-h1">{isEn ?'Terms of Service & AI Content Agreement':'Algemene Voorwaarden & AI Overeenkomst'}</h1>
 <p style={{ color:'var(--gray-500)', fontSize:'0.9rem', marginBottom:'2rem'}}>
 {isEn ?'Last Updated: August 2026':'Laatst bijgewerkt: Augustus 2026'}
 </p>

 <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem', color:'var(--gray-800)', lineHeight:'1.7'}}>
 
 {/* AI Disclosure Highlight Box */}
 <div style={{
 background:'linear-gradient(135deg, rgba(108, 92, 231, 0.08), rgba(255, 107, 74, 0.08))',
 border:'2px solid var(--primary)',
 borderRadius:'var(--radius-lg)',
 padding:'1.75rem',
 }}>
 <h2 style={{ fontSize:'1.25rem', fontWeight: 800, color:'var(--primary)', marginBottom:'0.75rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
 {isEn ?'Artificial Intelligence (AI) Content Disclosure':'Kunstmatige Intelligentie (AI) Content Verklaring'}
 </h2>
 <p style={{ margin: 0 }}>
 {isEn
 ?'All coloring pages, artwork, illustrations, and line art published on ColorVaults.com are generated with the assistance of Artificial Intelligence (AI) tools and algorithms. By accessing, downloading, or printing content from this website, you acknowledge and agree that the artwork is AI-assisted and subject to the terms set forth herein.':'Alle kleurplaten, afbeeldingen, illustraties en lijntekeningen op ColorVaults.com zijn gemaakt met behulp van Kunstmatige Intelligentie (AI) tools en algoritmen. Door de inhoud van deze website te bekijken, te downloaden of af te drukken, erkent u en gaat u ermee akkoord dat de kunstwerken AI-gegenereerd zijn en onderworpen zijn aan de hierin uiteengezette voorwaarden.'}
 </p>
 </div>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 1. {isEn ?'Acceptance of Terms':'Aanvaarding van de Voorwaarden'}
 </h2>
 <p>
 {isEn
 ?'By using ColorVaults.com ("the Website"), you enter into a binding agreement to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the Website immediately.':'Door gebruik te maken van ColorVaults.com ("de Website"), gaat u een bindende overeenkomst aan om te voldoen aan deze Algemene Voorwaarden. Indien u niet akkoord gaat met enig onderdeel van deze voorwaarden, dient u het gebruik van de Website onmiddellijk te staken.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 2. {isEn ?'License and Allowed Usage':'Licentie en Toegestaan Gebruik'}
 </h2>
 <p>
 {isEn
 ?'ColorVaults grants you a non-exclusive, non-transferable, revocable license to access, download, and print AI-generated coloring pages under the following conditions:':'ColorVaults verleent u een niet-exclusieve, niet-overdraagbare, herroepbare licentie om AI-gegenereerde kleurplaten te bekijken, te downloaden en af te drukken onder de volgende voorwaarden:'}
 </p>
 <ul style={{ paddingLeft:'1.75rem', display:'flex', flexDirection:'column', gap:'0.6rem'}}>
 <li>
 <strong>{isEn ?'Personal & Non-Commercial Use:':'Persoonlijk & Niet-Commercieel Gebruik:'}</strong>{''}
 {isEn
 ?'You may print and color our pages at home for your own enjoyment, or with your family and friends.':'U mag onze pagina\'s thuis afdrukken en inkleuren voor uw eigen plezier, of met uw familie en vrienden.'}
 </li>
 <li>
 <strong>{isEn ?'Educational Use:':'Educatief Gebruik:'}</strong>{''}
 {isEn
 ?'Teachers, educators, daycare providers, and schools are permitted to print multiple copies for classroom activities.':'Docenten, opvoeders, kinderopvanglocaties en scholen is het toegestaan om meerdere exemplaren af te drukken voor klasactiviteiten.'}
 </li>
 <li>
 <strong>{isEn ?'Commercial Restrictions:':'Commerciële Beperkingen:'}</strong>{''}
 {isEn
 ?'You may not sell, redistribute, bundle in physical books, or resell digital files or printed copies of our AI artwork for profit without prior written authorization.':'Het is niet toegestaan om onze AI-illustraties of digitale bestanden te verkopen, te herdistribueren, op te nemen in fysieke boeken of afgedrukte exemplaren met winstoogmerk te verkopen zonder voorafgaande schriftelijke toestemming.'}
 </li>
 </ul>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 3. {isEn ?'AI Generated Intellectual Property':'AI Gegenereerd Intellectueel Eigendom'}
 </h2>
 <p>
 {isEn
 ?'ColorVaults utilizes generative artificial intelligence models to design clean line-art templates. We respect intellectual property rights. If you believe any AI output on our website inadvertently infringes upon a valid copyright or trademark, please consult our IP & Takedown Policy or contact us at colorvaults@hotmail.com for prompt evaluation and removal.':'ColorVaults maakt gebruik van generatieve kunstmatige intelligentie modellen om schone lijntekening-sjablonen te ontwerpen. Wij respecteren intellectuele eigendomsrechten. Als u van mening bent dat een AI-output op onze website onbedoeld inbreuk maakt op een geldig auteursrecht of handelsmerk, raadpleeg dan ons Beleid inzake IE-inbreuk of neem contact op via colorvaults@hotmail.com voor snelle evaluatie en verwijdering.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 4. {isEn ?'Disclaimer of Warranties':'Uitsluiting van Garanties'}
 </h2>
 <p>
 {isEn
 ?'All AI artwork and services provided on ColorVaults are offered on an"AS IS"and"AS AVAILABLE"basis. We make no express or implied warranties regarding completeness, suitability, or error-free rendering.':'Alle AI-illustraties en diensten op ColorVaults worden aangeboden op een"ZOALS ZE ZIJN"en"ZOALS BESCHIKBAAR"basis. Wij geven geen uitdrukkelijke of stilzwijgende garanties met betrekking tot volledigheid, geschiktheid of foutloze weergave.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 5. {isEn ?'Contact & Legal Inquiries':'Contact & Juridische Vragen'}
 </h2>
 <p>
 {isEn
 ?'For questions regarding these Terms or AI Content disclosures, please contact us at:':'Voor vragen over deze Voorwaarden of AI Content verklaringen kunt u contact met ons opnemen via:'}
 </p>
 <div style={{ background:'var(--gray-100)', padding:'1.25rem 1.5rem', borderRadius:'var(--radius)'}}>
 <strong>Email:</strong> <a href="mailto:colorvault@hotmail.com"style={{ color:'var(--primary)'}}>colorvault@hotmail.com</a>
 </div>

 </div>
 </div>
 </div>
 );
}
