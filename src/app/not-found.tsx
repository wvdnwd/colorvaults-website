import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '3rem 1.5rem',
      background: 'var(--background)',
      color: 'var(--color-text-light)',
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>
        
      </div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        color: 'var(--color-accent)',
        marginBottom: '0.5rem',
        fontFamily: 'var(--font-display), sans-serif',
      }}>
        404 — Page Not Found / Pagina Niet Gevonden
      </h1>
      <p style={{
        color: 'var(--color-text-muted)',
        fontSize: '1.1rem',
        maxWidth: '520px',
        lineHeight: 1.6,
        marginBottom: '2rem',
      }}>
        Oops! The coloring page or category you are looking for does not exist or has been moved.
        <br />
        Oeps! De kleurplaat of categorie die je zoekt bestaat niet meer of is verplaatst.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/en" className="btn-primary">
           English Home
        </Link>
        <Link href="/nl" className="btn-primary" style={{ background: 'var(--color-primary-light)', border: '1px solid var(--color-accent)' }}>
           Nederlandse Home
        </Link>
      </div>
    </div>
  );
}
