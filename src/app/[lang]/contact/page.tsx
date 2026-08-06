export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Contact | ColorVaults' : 'Contact | ColorVaults',
    description: lang === 'en'
      ? 'Get in touch with the ColorVaults team. We love hearing from our community!'
      : 'Neem contact op met het ColorVaults team. We horen graag van onze community!',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const reasons = [
    { icon: '💡', label: isEn ? 'Request a coloring page' : 'Kleurplaat aanvragen' },
    { icon: '🐛', label: isEn ? 'Report a broken link' : 'Kapotte link melden' },
    { icon: '🤝', label: isEn ? 'Business or licensing' : 'Zakelijk of licentie' },
    { icon: '⚖️', label: isEn ? 'Copyright / IP issue' : 'Auteursrecht / IP probleem' },
    { icon: '💬', label: isEn ? 'General feedback' : 'Algemene feedback' },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="title-h1">Contact</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '560px', lineHeight: 1.7 }}>
            {isEn
              ? "Have a question, suggestion, or just want to say hi? We'd love to hear from you!"
              : 'Heb je een vraag, suggestie, of wil je gewoon even hallo zeggen? We horen graag van je!'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left info */}
          <div>
            <h2 className="title-h2">{isEn ? "We're Here to Help" : 'We Helpen Je Graag'}</h2>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: '2rem' }}>
              {isEn
                ? 'Whether you need a specific coloring page, want to report an issue, or have a business inquiry — reach out and we\'ll get back to you within 2 business days.'
                : 'Of je nu een specifieke kleurplaat nodig hebt, een probleem wil melden of een zakelijke vraag hebt — neem contact op en we reageren binnen 2 werkdagen.'}
            </p>

            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gray-400)', marginBottom: '1rem' }}>
              {isEn ? 'Common Reasons to Contact Us' : 'Veelvoorkomende Redenen'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {reasons.map(r => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--gray-50)', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
                  <span style={{ fontSize: '1.1rem' }}>{r.icon}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-700)' }}>{r.label}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(124,58,237,0.15)' }}>
              <p style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                ✉️ colorvaults@email.com
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)' }}>
                {isEn ? 'We typically reply within 2 business days.' : 'We reageren doorgaans binnen 2 werkdagen.'}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '2px solid var(--gray-200)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.75rem' }}>
              {isEn ? 'Send Us a Message' : 'Stuur Ons een Bericht'}
            </h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
                    {isEn ? 'First Name' : 'Voornaam'} *
                  </label>
                  <input type="text" required style={inputStyle} placeholder={isEn ? 'John' : 'Jan'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
                    {isEn ? 'Last Name' : 'Achternaam'}
                  </label>
                  <input type="text" style={inputStyle} placeholder={isEn ? 'Doe' : 'Jansen'} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
                  {isEn ? 'Email Address' : 'E-mailadres'} *
                </label>
                <input type="email" required style={inputStyle} placeholder="you@example.com" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
                  {isEn ? 'Subject' : 'Onderwerp'} *
                </label>
                <select required style={inputStyle}>
                  <option value="">{isEn ? 'Select a topic...' : 'Kies een onderwerp...'}</option>
                  <option value="request">{isEn ? 'Page Request' : 'Pagina Aanvragen'}</option>
                  <option value="bug">{isEn ? 'Report a Bug' : 'Bug Melden'}</option>
                  <option value="business">{isEn ? 'Business / Licensing' : 'Zakelijk / Licentie'}</option>
                  <option value="copyright">{isEn ? 'Copyright Issue' : 'Auteursrechtprobleem'}</option>
                  <option value="other">{isEn ? 'Other' : 'Anders'}</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
                  {isEn ? 'Message' : 'Bericht'} *
                </label>
                <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder={isEn ? 'Tell us how we can help...' : 'Vertel ons hoe we kunnen helpen...'} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {isEn ? '✉️ Send Message' : '✉️ Bericht Versturen'}
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center' }}>
                {isEn ? 'By submitting you agree to our Privacy Policy.' : 'Door te versturen ga je akkoord met ons Privacybeleid.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius)',
  border: '1.5px solid var(--gray-200)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  color: 'var(--foreground)',
  background: 'var(--gray-50)',
  outline: 'none',
  transition: 'border-color 0.2s',
};
