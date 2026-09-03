import { getMainHubs, getThemes, validateDataModel, safeJsonLd, getSampleImagesForTheme } from '@/lib/api';
import CategorySeoBlock from '@/components/CategorySeoBlock';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import ThemeCard from '@/components/ThemeCard';
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
  const ogImageUrl = hub.image
    ? `/api/og?title=${encodeURIComponent(hub.title + ' Coloring Pages')}&image=${encodeURIComponent(hub.image)}`
    : '/images/banner.jpg';
  return {
    title: `${hub.title} Coloring Pages | ColorVaults`,
    description: hub.description,
    alternates: {
      canonical: `/${lang}/${hub.slug}`,
      languages: { 
        'en': `/en/${hub.slug}`, 
        'nl': `/nl/${hub.slug}`,
        'x-default': `/en/${hub.slug}`
      }
    },
    openGraph: {
      title: `${hub.title} Coloring Pages | ColorVaults`,
      description: hub.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: hub.title }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImageUrl],
    },
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
      <div className="page-hero" data-hub={mainHubSlug}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: hub.image ? '1.2fr 0.8fr' : '1fr', gap: '2.5rem', alignItems: 'center' }}>
          <div>
            <Breadcrumbs items={[{ label: hub.title }]} lang={lang} />
            <h1 className="title-h1" style={{ marginTop: '1rem' }}>{hub.title}</h1>
            <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', maxWidth: '640px', marginTop: '0.6rem', lineHeight: 1.7 }}>
              {hub.description}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <span className="badge">
                {allThemes.length} {isEn ? 'Collections' : 'Collecties'}
              </span>
              <span className="badge" style={{ background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>
                🟢 {isEn ? 'Toddlers (2-4y)' : 'Peuters (2-4j)'}
              </span>
              <span className="badge" style={{ background: '#EFF6FF', color: '#1E40AF', borderColor: '#BFDBFE' }}>
                🔵 {isEn ? 'Kids (5-8y)' : 'Kids (5-8j)'}
              </span>
              <span className="badge" style={{ background: '#FAF5FF', color: '#6B21A8', borderColor: '#E9D5FF' }}>
                🟣 {isEn ? 'Teens (9-12y)' : 'Tieners (9-12j)'}
              </span>
              <span className="badge" style={{ background: '#FFF1F2', color: '#9F1239', borderColor: '#FECDD3' }}>
                🔴 {isEn ? 'Adults (13+)' : 'Volwassenen'}
              </span>
            </div>
          </div>

          {/* 8K Hub Master Artwork Banner */}
          {hub.image && (
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              border: '3px solid #FFFFFF',
              aspectRatio: '16/10',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hub.image}
                alt={hub.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="section-header">
          <div>
            <span className="badge">{isEn ? 'Browse Hub' : 'Bladeren'}</span>
            <h2 className="title-h2" style={{ marginTop: '0.5rem' }}>{isEn ? 'All Themes in this Hub' : 'Alle Thema\'s in deze Hoofdcategorie'}</h2>
          </div>
          <Link href={`/${lang}/how-to-draw`} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            ✏️ {isEn ? 'Drawing Academy' : 'Leren Tekenen'}
          </Link>
        </div>
        
        <div className="grid-4">
          {allThemes.map((theme, i) => {
            const sampleImages = getSampleImagesForTheme(lang, hub.slug, theme.slug, theme.image, 3);
            return (
              <motion.div 
                key={theme.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                whileHover={{ y: -6 }}
              >
                <ThemeCard
                  lang={lang}
                  hubSlug={hub.slug}
                  themeSlug={theme.slug}
                  title={theme.title}
                  description={theme.description}
                  images={sampleImages}
                  pageCount={theme.pageCount}
                />
              </motion.div>
            );
          })}
        </div>

        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <CategorySeoBlock
          title={isEn ? `About ${hub.title} Coloring Pages` : `Over ${hub.title} Kleurplaten`}
          contentHtml={isEn ? `
            <h2>Free Printable ${hub.title} Coloring Collection</h2>
            <p>${hub.description} Explore our complete library of high-resolution printable coloring pages, carefully categorized by sub-theme and difficulty level.</p>
            <h3>Featured Themes in ${hub.title}</h3>
            <ul>
              ${allThemes.slice(0, 6).map(t => `<li><a href="/${lang}/${hub.slug}/${t.slug}"><strong>${t.title}</strong></a> — ${t.description}</li>`).join('')}
            </ul>
            <h3>Easy Printing & High Quality Downloads</h3>
            <p>Download your favorite ${hub.title} coloring pages instantly in clean line vector PDF format. Ideal for toddlers, children, teens, and adults.</p>
          ` : `
            <h2>Gratis Printbare ${hub.title} Kleurplaten Collectie</h2>
            <p>${hub.description} Ontdek onze volledige verzameling van hoge resolutie printbare kleurplaten, zorgvuldig ingedeeld per subthema en moeilijkheidsgraad.</p>
            <h3>Populaire Thema's in ${hub.title}</h3>
            <ul>
              ${allThemes.slice(0, 6).map(t => `<li><a href="/${lang}/${hub.slug}/${t.slug}"><strong>${t.title}</strong></a> — ${t.description}</li>`).join('')}
            </ul>
            <h3>Eenvoudig Printen & Hoge Kwaliteit Downloads</h3>
            <p>Download je favoriete ${hub.title} kleurplaten direct in strak PDF-formaat. Ideaal voor peuters, kinderen, tieners en volwassenen.</p>
          `}
          lang={lang}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              'name': hub.title,
              'description': hub.description,
              'url': `https://colorvaults.com/${lang}/${hub.slug}`,
              'isPartOf': { '@id': 'https://colorvaults.com/#website' },
              'hasPart': allThemes.map(t => ({
                '@type': 'WebPage',
                'name': t.title,
                'url': `https://colorvaults.com/${lang}/${hub.slug}/${t.slug}`
              }))
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': hub.title,
                  'item': `https://colorvaults.com/${lang}/${hub.slug}`
                }
              ]
            }
          ]
        }) }}
      />
    </>
  );
}
