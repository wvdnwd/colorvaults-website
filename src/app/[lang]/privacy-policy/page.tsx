export async function generateStaticParams() {
 return [{ lang:'en'}, { lang:'nl'}];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 return {
 title: lang ==='en'?'Privacy Policy | ColorVaults':'Privacybeleid | ColorVaults',
 description: lang ==='en'?'Read the Privacy Policy for ColorVaults — how we handle cookies, Google AdSense, Analytics, and GDPR data protection.':'Lees het Privacybeleid van ColorVaults — hoe wij omgaan met cookies, Google AdSense, Analytics en AVG gegevensbescherming.',
 };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
 const { lang } = await params;
 const isEn = lang ==='en';

 return (
 <div className="container section">
 <div style={{ maxWidth:'820px', margin:'0 auto'}}>
 <h1 className="title-h1">{isEn ?'Privacy Policy & GDPR Compliance':'Privacybeleid & AVG Compliance'}</h1>
 <p style={{ color:'var(--gray-500)', fontSize:'0.9rem', marginBottom:'2rem'}}>
 {isEn ?'Last Updated: August 2026':'Laatst bijgewerkt: Augustus 2026'}
 </p>

 <div style={{ display:'flex', flexDirection:'column', gap:'1.75rem', color:'var(--gray-800)', lineHeight:'1.7'}}>
 
 <p>
 {isEn
 ?'ColorVaults ("we","us", or"our") operates the website colorvaults.com ("the Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.':'ColorVaults ("wij","ons"of"onze") beheert de website colorvaults.com ("de Dienst"). Deze pagina informeert u over ons beleid met betrekking tot het verzamelen, gebruiken en openbaarmaken van persoonsgegevens wanneer u onze Dienst gebruikt en de keuzes die u heeft met betrekking tot die gegevens.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 1. {isEn ?'Information We Collect':'Informatie Die Wij Verzamelen'}
 </h2>
 <p>
 {isEn
 ?'ColorVaults is designed to be accessible without requiring any user registration or account creation. We collect minimal personal data under the following circumstances:':'ColorVaults is ontworpen om toegankelijk te zijn zonder dat gebruikersregistratie of het aanmaken van een account vereist is. Wij verzamelen een minimale hoeveelheid persoonsgegevens in de volgende gevallen:'}
 </p>
 <ul style={{ paddingLeft:'1.75rem', display:'flex', flexDirection:'column', gap:'0.6rem'}}>
 <li>
 <strong>{isEn ?'Contact & Report Forms:':'Contact- & Meldingsformulieren:'}</strong>{''}
 {isEn
 ?'When you submit a contact message or report an issue with a page, we collect your name, email address, and message content to respond to your inquiry.':'Wanneer u een contactbericht verstuurt of een probleem met een pagina meldt, verzamelen wij uw naam, e-mailadres en berichtinhoud om op uw vraag te kunnen reageren.'}
 </li>
 <li>
 <strong>{isEn ?'Technical Log Data:':'Technische Loggegevens:'}</strong>{''}
 {isEn
 ?'Our servers automatically record standard web browser information, including IP address, browser type, operating system, referring pages, and timestamps for security and operational monitoring.':'Onze servers leggen automatisch standaard webbrowser-informatie vast, waaronder IP-adres, browsertype, besturingssysteem, verwijzende pagina\'s en tijdstempels voor beveiliging en operationele monitoring.'}
 </li>
 </ul>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 2. {isEn ?'Cookies and Third-Party Advertising (Google AdSense)':'Cookies en Advertenties van Derden (Google AdSense)'}
 </h2>
 <p>
 {isEn
 ?'We use cookies and similar tracking technologies to enhance your browsing experience, store your favorite coloring pages locally, and display relevant advertisements.':'Wij gebruiken cookies en soortgelijke trackingtechnologieën om uw ervaring te verbeteren, uw favoriete kleurplaten lokaal op te slaan en relevante advertenties weer te geven.'}
 </p>
 
 <div style={{ background:'var(--gray-100)', padding:'1.5rem', borderRadius:'var(--radius)', borderLeft:'4px solid var(--primary)'}}>
 <h3 style={{ fontSize:'1.1rem', fontWeight: 800, marginBottom:'0.5rem'}}>
 {isEn ?'Google AdSense Cookie Disclosure':'Google AdSense Cookie Verklaring'}
 </h3>
 <ul style={{ paddingLeft:'1.25rem', display:'flex', flexDirection:'column', gap:'0.5rem', fontSize:'0.9rem'}}>
 <li>
 {isEn
 ?'Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to our website or other websites.':'Leveranciers van derden, waaronder Google, gebruiken cookies om advertenties weer te geven op basis van eerdere bezoeken van een gebruiker aan onze website of andere websites.'}
 </li>
 <li>
 {isEn
 ?'Google\'s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.':'Door het gebruik van advertentiecookies kunnen Google en zijn partners advertenties weergeven op basis van het bezoek aan onze sites en/of andere sites op het internet.'}
 </li>
 <li>
 {isEn
 ?'Users may opt out of personalized advertising by visiting Google Ad Settings (www.google.com/settings/ads) or www.aboutads.info.':'Gebruikers kunnen zich afmelden voor gepersonaliseerde advertenties door naar Google Advertentie-instellingen (www.google.com/settings/ads) of www.aboutads.info te gaan.'}
 </li>
 </ul>
 </div>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 3. {isEn ?'Google Analytics 4':'Google Analytics 4'}
 </h2>
 <p>
 {isEn
 ?'We use Google Analytics to analyze website traffic, aggregate user interactions, and improve site performance. Google Analytics uses cookies to collect non-identifiable usage statistics with IP anonymization enabled.':'Wij gebruiken Google Analytics om het websiteverkeer te analyseren, gebruikersinteracties te aggregeren en de prestaties van de site te verbeteren. Google Analytics gebruikt cookies om niet-identificeerbare gebruiksstatistieken te verzamelen met IP-anonimisering ingeschakeld.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 4. {isEn ?'Your Rights Under GDPR / AVG':'Uw Rechten Onder de AVG (GDPR)'}
 </h2>
 <p>
 {isEn
 ?'If you are a resident of the European Union (EU) or European Economic Area (EEA), you possess statutory data protection rights under the General Data Protection Regulation (GDPR):':'Indien u woonachtig bent in de Europese Unie (EU) of Europese Economische Ruimte (EER), beschikt u over wettelijke rechten op het gebied van gegevensbescherming onder de Algemene Verordening Gegevensbescherming (AVG):'}
 </p>
 <ul style={{ paddingLeft:'1.75rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
 <li><strong>{isEn ?'Right of Access:':'Recht op Inzage:'}</strong> {isEn ?'You can request copies of any personal data we hold about you.':'U kunt kopieën opvragen van eventuele persoonsgegevens die wij over u bewaren.'}</li>
 <li><strong>{isEn ?'Right to Erasure:':'Recht op Verwijdering:'}</strong> {isEn ?'You can request that we erase your personal contact submission data.':'U kunt ons verzoeken uw persoonlijke contact- en meldingsgegevens te verwijderen.'}</li>
 <li><strong>{isEn ?'Right to Object:':'Recht van Bezwaar:'}</strong> {isEn ?'You can object to the processing of your data or cookie preferences.':'U kunt bezwaar maken tegen de verwerking van uw gegevens of cookievoorkeuren.'}</li>
 </ul>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 5. {isEn ?'Children\'s Privacy':'Privacy van Kinderen'}
 </h2>
 <p>
 {isEn
 ?'Our website provides coloring pages suitable for children. We do not knowingly collect or solicit personal identifiable information from children under the age of 16. If you are a parent or guardian and become aware that your child has submitted personal data to us, please contact us for immediate deletion.':'Onze website biedt kleurplaten die geschikt zijn voor kinderen. Wij verzamelen of vragen niet wissentlijk persoonlijk identificeerbare informatie van kinderen jonger dan 16 jaar. Als u een ouder of voogd bent en ontdekt dat uw kind persoonsgegevens aan ons heeft verstrekt, neem dan contact met ons op voor onmiddellijke verwijdering.'}
 </p>

 <h2 className="title-h2"style={{ fontSize:'1.4rem', marginTop:'1rem'}}>
 6. {isEn ?'Contact Us':'Contact Opnemen'}
 </h2>
 <p>
 {isEn ?'For any questions or privacy-related requests, please reach out to us at:':'Voor vragen of privacygerelateerde verzoeken kunt u contact opnemen via:'}
 </p>
 <div style={{ background:'var(--gray-100)', padding:'1.25rem 1.5rem', borderRadius:'var(--radius)'}}>
 <strong>Email:</strong> <a href="mailto:colorvaults@hotmail.com"style={{ color:'var(--primary)'}}>colorvaults@hotmail.com</a>
 </div>

 </div>
 </div>
 </div>
 );
}
