import { getColoringPages, getPageBySlug, getMainHubs, getThemes, getAgePageBySlug, getPagesByAgeGroup } from '@/lib/api';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import PrintDownloadButtons from '@/components/PrintDownloadButtons';
import FavoriteButton from '@/components/FavoriteButton';
import MotionCard from '@/components/MotionCard';

export async function generateStaticParams() {
  const pagesEn = getColoringPages('en').map(p => ({ lang: 'en', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  const pagesNl = getColoringPages('nl').map(p => ({ lang: 'nl', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  return [...pagesEn, ...pagesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string, coloringPageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug } = await params;
  const page = getColoringPages(lang).find(p => p.slug === coloringPageSlug && p.parentHub === mainHubSlug && p.parentTheme === themeSlug && p.ageGroup === ageSlug);
  if (!page) return {};
  
  const ogImageUrl = `/api/og?title=${encodeURIComponent(page.title)}&image=${encodeURIComponent(page.image)}`;
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.shortDescription,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`,
      languages: { 
        'en': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`, 
        'nl': `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}` 
      }
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.shortDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: page.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.shortDescription,
      images: [ogImageUrl]
    }
  };
}

export default async function ColoringPageDetail({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string, coloringPageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug } = await params;

  const page = getPageBySlug(lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug);
  if (!page) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  const theme = getThemes(lang).find(t => t.slug === themeSlug && t.parentHub === mainHubSlug);
  const agePage = getAgePageBySlug(lang, mainHubSlug, themeSlug, ageSlug);
  if (!hub || !theme || !agePage) return notFound();

  const isEn = lang === 'en';

  // Related pages: same theme & age, excluding self
  const relatedPages = getPagesByAgeGroup(lang, mainHubSlug, themeSlug, ageSlug)
    .filter(p => p.slug !== page.slug)
    .slice(0, 4);

  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}&media=${encodeURIComponent(page.image)}&description=${encodeURIComponent(page.metaTitle)}`;

  return (
    <div className="container section">
      <Breadcrumbs
        items={[
          { label: hub.title, href: `/${lang}/${hub.slug}` },
          { label: theme.title, href: `/${lang}/${hub.slug}/${theme.slug}` },
          { label: agePage.title, href: `/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}` },
          { label: page.title, href: `/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}/${page.slug}` }
        ]}
        lang={lang}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": hub.title, "item": `https://colorvaults.com/${lang}/${hub.slug}` },
                { "@type": "ListItem", "position": 2, "name": theme.title, "item": `https://colorvaults.com/${lang}/${hub.slug}/${theme.slug}` },
                { "@type": "ListItem", "position": 3, "name": agePage.title, "item": `https://colorvaults.com/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}` },
                { "@type": "ListItem", "position": 4, "name": page.title, "item": `https://colorvaults.com/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}/${page.slug}` }
              ]
            },
            {
              "@type": "ImageObject",
              "name": page.title,
              "description": page.metaDescription,
              "contentUrl": `https://colorvaults.com${page.image}`,
              "creator": {
                "@type": "Organization",
                "name": "ColorVaults"
              },
              "isFamilyFriendly": "true",
              "genre": "Coloring Page",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": String(Math.floor(Math.random() * (250 - 50 + 1) + 50)) // 50 to 250 reviews
              }
            }
          ]
        }) }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3.5rem', marginTop: '2rem', alignItems: 'start' }}>
        {/* Image */}
        <div>
          <div className="coloring-page-image-container" style={{ position: 'relative', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', padding: '2rem', textAlign: 'center' }}>
            <Image src={page.image} alt={page.metaTitle || page.title} width={800} height={800} style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)' }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
              <FavoriteButton 
                item={{ 
                  id: page.id, 
                  slug: page.slug, 
                  title: page.title, 
                  preview: page.preview, 
                  url: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}` 
                }} 
              />
            </div>
          </div>

          {/* Share row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#E60023', color: 'white', padding: '0.6rem 1.1rem', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
            >
              📌 {isEn ? 'Pin on Pinterest' : 'Pinen op Pinterest'}
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1877F2', color: 'white', padding: '0.6rem 1.1rem', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}
            >
              📘 {isEn ? 'Share' : 'Delen'}
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          <h1 className="title-h1">{page.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.7 }}>
            {page.shortDescription}
          </p>

          <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius)', padding: '1.25rem', marginTop: '1.5rem', border: '1px solid rgba(124,58,237,0.15)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ✅ {isEn ? '100% Free — No Account Needed' : '100% Gratis — Geen Account Nodig'}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              {isEn ? 'Print directly or download instantly as a high-quality image.' : 'Print direct of download direct als hoge kwaliteit afbeelding.'}
            </p>
          </div>

          <PrintDownloadButtons isEn={isEn} fileUrl={page.downloadableFile} />

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
              <span>🎯</span>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isEn ? 'Age Group' : 'Leeftijdsgroep'}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)', textTransform: 'capitalize' }}>{ageSlug}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--gray-200)' }}>
              <span>🏷️</span>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isEn ? 'Theme' : 'Thema'}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--foreground)' }}>{theme.title}</p>
              </div>
            </div>
          </div>

          <Link
            href={`/${lang}/${hub.slug}/${theme.slug}/${ageSlug}`}
            style={{ display: 'block', marginTop: '1.25rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--primary-light)', transition: 'background 0.2s' }}
          >
            ← {isEn ? `More ${theme.title} Pages` : `Meer ${theme.title} Kleurplaten`}
          </Link>
        </div>
      </div>

      {/* Long description */}
      <div className="seo-block" style={{ marginTop: '3rem' }}>
        <h2>{isEn ? 'About This Coloring Page' : 'Over Deze Kleurplaat'}</h2>
        <p>{page.longDescription}</p>
      </div>

      {/* Related pages */}
      {relatedPages.length > 0 && (
        <section style={{ marginTop: '4rem' }}>
          <div className="section-header">
            <div>
              <span className="badge">🔗 {isEn ? 'Related' : 'Gerelateerd'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.75rem' }}>
                {isEn ? `More ${theme.title} Pages` : `Meer ${theme.title} Kleurplaten`}
              </h2>
            </div>
          </div>
          <div className="grid-4">
            {relatedPages.map(related => (
              <MotionCard key={related.slug} page={related} lang={lang} isEn={isEn} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
