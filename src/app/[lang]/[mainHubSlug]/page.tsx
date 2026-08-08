import { getMainHubs, getThemes, validateDataModel } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import * as motion from 'framer-motion/client';

export async function generateStaticParams() {
  try { validateDataModel(); } catch(e) { console.error(e); throw e; }
  const hubsEn = getMainHubs('en').map(h => ({ lang: 'en', mainHubSlug: h.slug }));
  const hubsNl = getMainHubs('nl').map(h => ({ lang: 'nl', mainHubSlug: h.slug }));
  return [...hubsEn, ...hubsNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string }> }) {
  const { lang, mainHubSlug } = await params;
  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return {};
  return {
    title: `${hub.title} Coloring Pages | ColorVaults`,
    description: hub.description,
    alternates: {
      canonical: `/${lang}/${hub.slug}`,
      languages: { 'en': `/en/${hub.slug}`, 'nl': `/nl/${hub.slug}` }
    }
  };
}

export default async function MainHubPage({ params }: { params: Promise<{ lang: string, mainHubSlug: string }> }) {
  const { lang, mainHubSlug } = await params;
  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const allThemes = getThemes(lang).filter(t => t.parentHub === hub.slug);
  const isEn = lang === 'en';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: hub.title, href: `/${lang}/${hub.slug}` }]} lang={lang} />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>{hub.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', maxWidth: '600px', marginTop: '0.5rem', lineHeight: 1.7 }}>
            {hub.description}
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', marginTop: '1rem', fontWeight: 600 }}>
            {allThemes.length} {isEn ? 'themes available' : 'thema\'s beschikbaar'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="section-header">
          <h2 className="title-h2">{isEn ? 'Choose a Theme' : 'Kies een Thema'}</h2>
        </div>
        <div className="grid-4">
          {allThemes.map((theme, i) => (
            <motion.div 
              key={theme.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
              whileHover={{ y: -6 }}
            >
              <Link href={`/${lang}/${hub.slug}/${theme.slug}`} className="card" style={{ height: '100%' }}>
                <Image src={theme.image} alt={theme.title} width={400} height={400} className="card-img" />
                <div className="card-body">
                  <h3 className="card-title">{theme.title}</h3>
                  <p className="card-desc">{theme.description}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                    {theme.availableAges.map(age => (
                      <span key={age} style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        borderRadius: '100px',
                        padding: '0.15rem 0.6rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'capitalize'
                      }}>{age}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="seo-block" style={{ marginTop: '4rem' }}>
          <h2>{isEn ? `About ${hub.title} Coloring Pages` : `Over ${hub.title} Kleurplaten`}</h2>
          <p>{hub.description} {isEn
            ? `Explore our full collection of ${hub.title} themed coloring pages, carefully organized by theme and age group to help you find exactly what you need.`
            : `Ontdek onze volledige collectie ${hub.title} kleurplaten, zorgvuldig georganiseerd op thema en leeftijdsgroep.`}
          </p>
        </div>
      </div>
    </>
  );
}
