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
        <div className="container">
          <Breadcrumbs items={[{ label: hub.title }]} lang={lang} />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>{hub.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', maxWidth: '640px', marginTop: '0.6rem', lineHeight: 1.7 }}>
            {hub.description}
          </p>
          <span className="badge" style={{ marginTop: '1.25rem' }}>
            ✨ {allThemes.length} {isEn ? 'themes available' : 'thema\'s beschikbaar'}
          </span>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />

        <div className="section-header">
          <h2 className="title-h2">{isEn ? 'Explore Themes' : 'Kies een Thema'}</h2>
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
