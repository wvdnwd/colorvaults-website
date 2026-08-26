import { getColoringPages, getPageBySlug, getMainHubs, getThemes, getAgePageBySlug, getPagesByAgeGroup, safeJsonLd } from '@/lib/api';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import PrintDownloadButtons from '@/components/PrintDownloadButtons';
import FavoriteButton from '@/components/FavoriteButton';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render top 30 sample pages at build time to keep build memory low (<120MB).
  // All other pages render dynamically on-demand (ISR) and cache permanently!
  const pagesEn = getColoringPages('en').slice(0, 30).map(p => ({ lang: 'en', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  const pagesNl = getColoringPages('nl').slice(0, 30).map(p => ({ lang: 'nl', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
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
        'nl': `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`,
        'x-default': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}` 
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

  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}&media=${encodeURIComponent(page.image)}&description=${encodeURIComponent(page.metaTitle || page.title)}`;

  return (
    <div className="container section">
      <Breadcrumbs
        items={[
          { label: hub.title, href: `/${lang}/${hub.slug}` },
          { label: theme.title, href: `/${lang}/${hub.slug}/${theme.slug}` },
          { label: agePage.title, href: `/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}` },
          { label: page.title }
        ]}
        lang={lang}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ImageObject",
              "name": page.title,
              "description": page.metaDescription,
              "contentUrl": page.image,
              "creator": {
                "@type": "Organization",
                "name": "ColorVaults"
              },
              "isFamilyFriendly": "true",
              "genre": "Coloring Page"
            },
            ...(page.faq && page.faq.length > 0 ? [{
              "@type": "FAQPage",
              "mainEntity": page.faq.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            }] : [])
          ]
        }) }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3.5rem', marginTop: '2rem', alignItems: 'start' }}>
        {/* Main Stage Image */}
        <div>
          <div 
            className="coloring-page-image-container" 
            style={{ 
              position: 'relative', 
              background: '#FFFFFF', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid var(--gray-200)', 
              padding: '2.5rem', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <SafeImage 
              src={page.image} 
              alt={page.metaTitle || page.title} 
              width={800} 
              height={800} 
              loading="eager"
              fetchPriority="high"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }} 
            />
            <div style={{ position: 'absolute', top: '18px', right: '18px' }}>
              <FavoriteButton 
                item={{ 
                  id: page.slug, 
                  slug: page.slug, 
                  title: page.title, 
                  preview: page.image, 
                  url: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}` 
                }} 
              />
            </div>
          </div>

          {/* Social Share bar */}
          <div style={{ display: 'flex', gap: '0.85rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isEn ? 'Share on Pinterest (opens in new tab)' : 'Delen op Pinterest (opent in nieuw tabblad)'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#E60023', color: 'white', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(230,0,35,0.25)' }}
            >
              <span aria-hidden="true">📌</span> {isEn ? 'Pin on Pinterest' : 'Pinen op Pinterest'}
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isEn ? 'Share on Facebook (opens in new tab)' : 'Delen op Facebook (opent in nieuw tabblad)'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#1877F2', color: 'white', padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 4px 12px rgba(24,119,242,0.25)' }}
            >
              <span aria-hidden="true">📘</span> {isEn ? 'Share on Facebook' : 'Delen op Facebook'}
            </a>
          </div>

          {/* Long SEO text */}
          <div className="seo-block" style={{ marginTop: '2.5rem' }}>
            <h2>{isEn ? 'About This Coloring Page' : 'Over Deze Kleurplaat'}</h2>
            <p>{page.shortDescription || page.metaDescription}</p>
          </div>

          {page.faq && page.faq.length > 0 && (
            <div className="seo-block" style={{ marginTop: '2.5rem' }}>
              <h2>{isEn ? 'Frequently Asked Questions' : 'Veelgestelde Vragen'}</h2>
              {page.faq.map((item, i) => (
                <details key={i} style={{ marginTop: '1rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '1rem' }}>
                  <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--foreground)' }}>
                    {item.question}
                  </summary>
                  <p style={{ marginTop: '0.75rem', color: 'var(--gray-600)', lineHeight: 1.8 }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div style={{ position: 'sticky', top: '5.5rem' }}>
          <h1 className="title-h1" style={{ fontSize: '2rem' }}>{page.title}</h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1rem', marginTop: '0.6rem', lineHeight: 1.7 }}>
            {page.shortDescription}
          </p>

          <div style={{ background: 'var(--primary-light)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginTop: '1.5rem', border: '1px solid rgba(108,92,231,0.18)' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ✅ {isEn ? '100% Free — No Signup Required' : '100% Gratis — Geen Account Nodig'}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              {isEn ? 'Print directly or download instantly as a high-resolution image file.' : 'Print direct of download direct als hoge resolutie afbeelding.'}
            </p>
          </div>

          {/* Action CTAs */}
          <PrintDownloadButtons isEn={isEn} fileUrl={page.image} />

          {/* Metadata Chips */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: '1.2rem' }}>🎯</span>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{isEn ? 'Age Group' : 'Leeftijdsgroep'}</p>
                <p style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--foreground)', textTransform: 'capitalize' }}>{ageSlug}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)' }}>
              <span style={{ fontSize: '1.2rem' }}>🏷️</span>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{isEn ? 'Theme' : 'Thema'}</p>
                <p style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--foreground)' }}>{theme.title}</p>
              </div>
            </div>
          </div>

          {/* Google AdSense Rectangle Sidebar Ad */}
          <div style={{ marginTop: '1.5rem' }}>
            <AdSlot type="rectangle" text={isEn ? "Sponsored Content" : "Gesponsord"} />
          </div>

          <Link
            href={`/${lang}/${hub.slug}/${theme.slug}/${ageSlug}`}
            style={{ display: 'block', marginTop: '1.25rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', padding: '0.85rem', borderRadius: 'var(--radius-full)', background: 'var(--primary-light)', border: '1px solid rgba(108,92,231,0.2)', transition: 'all 0.2s' }}
          >
            ← {isEn ? `Browse All ${theme.title} Pages` : `Bekijk Alle ${theme.title} Kleurplaten`}
          </Link>
        </div>
      </div>

      {/* Related Pages Section */}
      {relatedPages.length > 0 && (
        <section style={{ marginTop: '4.5rem' }}>
          <div className="section-header">
            <div>
              <span className="badge">🔗 {isEn ? 'Related' : 'Gerelateerd'}</span>
              <h2 className="title-h2" style={{ marginTop: '0.65rem' }}>
                {isEn ? `More ${theme.title} Coloring Pages` : `Meer ${theme.title} Kleurplaten`}
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
