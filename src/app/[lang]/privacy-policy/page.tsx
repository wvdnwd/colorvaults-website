export default async function UtilityPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return (
    <div className="container section">
      <h1 className="title-h1">{isEn ? 'Privacy Policy' : 'Privacybeleid'}</h1>
      <p style={{ color: 'var(--gray-600)' }}>
        {isEn ? 'This page is currently under construction.' : 'Deze pagina is momenteel in aanbouw.'}
      </p>
    </div>
  );
}
