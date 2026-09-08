import { getPageBySlug, getFeaturedPages, getMainHubs, getThemes, getAgePageBySlug, getColoringPagesForTheme, safeJsonLd } from '@/lib/api';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import AdCard from '@/components/AdCard';
import InteractiveColoringStudio from '@/components/InteractiveColoringStudio';
import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  const pagesEn = getFeaturedPages('en', 20).map(p => ({ lang: 'en', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  const pagesNl = getFeaturedPages('nl', 20).map(p => ({ lang: 'nl', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  return [...pagesEn, ...pagesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string, coloringPageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug } = await params;
  const page = getPageBySlug(lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug);
  if (!page) return {};
  
  const isEn = lang === 'en';
  const title = isEn 
    ? `Color ${page.title} Online for Free | ColorVaults` : `${page.title} Gratis Online Inkleuren | ColorVaults`;
  const description = isEn
    ? `Color the ${page.title} coloring page online for free! Interactive in-browser painting studio with fill bucket, custom brush tools, and instant download.` : `Kleur de ${page.title} kleurplaat gratis online in! Interactieve online kleurstudio met verfemmer, kwasten en direct opslaan als kunstwerk.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
      languages: {
        en: `/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
        nl: `/nl/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
        de: `/de/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
        fr: `/fr/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
        'x-default': `/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`,
      },
    },
    openGraph: {
      title,
      description,
      images: [{ url: page.image, width: 832, height: 1184, alt: page.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [page.image]
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
  const backUrl = `/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`;

  // Related pages: get all pages from the same theme (excluding current page)
  const allThemePages = getColoringPagesForTheme(lang, mainHubSlug, themeSlug).filter(
    p => p.slug !== page.slug
  );
  
  // Prioritize same age group first, then other age groups in same theme
  allThemePages.sort((a, b) => {
    if (a.ageGroup === ageSlug && b.ageGroup !== ageSlug) return -1;
    if (b.ageGroup === ageSlug && a.ageGroup !== ageSlug) return 1;
    return 0;
  });

  // Show up to 24 related pages
  const displayPages = allThemePages.slice(0, 24);

  // Split into chunks of 12 (3 rows x 4 cols) to insert AdSlot in between rows
  const pageChunks = [];
  for (let i = 0; i < displayPages.length; i += 12) {
    pageChunks.push(displayPages.slice(i, i + 12));
  }

  const pinterestUrl =`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}&media=${encodeURIComponent(page.image)}&description=${encodeURIComponent(page.metaTitle || page.title)}`;

  return (
    <div className="container section"style={{ paddingBottom:'4rem'}}>
      <Breadcrumbs
        items={[
          { label: hub.title, href:`/${lang}/${hub.slug}`},
          { label: theme.title, href:`/${lang}/${hub.slug}/${theme.slug}`},
          { label: agePage.title, href:`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}`},
          { label: page.title, href:`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`},
          { label: isEn ?'Color Online Studio':'Online Inkleuren Studio'}
        ]}
        lang={lang}
      />

      {/* Interactive Digital Coloring Studio Workspace */}
      <InteractiveColoringStudio
        imageUrl={page.image}
        title={page.title}
        isEn={isEn}
        backUrl={backUrl}
        themeTitle={theme.title}
      />

      {/* Related Pages Section */}
      {displayPages.length > 0 && (
        <section style={{ marginTop:'5rem'}}>
          <div className="section-header"style={{ marginBottom:'2rem'}}>
            <div>
              <span className="badge">{isEn ?'Related Collection':'Gerelateerde Collectie'}</span>
              <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
                {isEn ?`More ${theme.title} Coloring Pages`:`Meer ${theme.title} Kleurplaten`}
              </h2>
            </div>
            <Link
              href={`/${lang}/${hub.slug}/${theme.slug}`}
              className="btn-secondary"style={{ fontSize:'0.875rem', padding:'0.6rem 1.25rem'}}
            >
              {isEn ?`View All ${theme.title} (${allThemePages.length + 1}) →`:`Bekijk Alle ${theme.title} (${allThemePages.length + 1}) →`}
            </Link>
          </div>

          {pageChunks.map((chunk, chunkIdx) => {
            const gridItems: React.ReactNode[] = [];
            chunk.forEach((related, i) => {
              if (i === 5) gridItems.push(<AdCard key="related-ad-card" />);
              gridItems.push(<MotionCard key={related.slug} page={related} lang={lang} isEn={isEn} />);
            });

            return (
              <React.Fragment key={chunkIdx}>
                <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
                  {gridItems}
                </div>

                {/* Advertisement between rows of coloring pages */}
                {chunkIdx < pageChunks.length - 1 && (
                  <div style={{ margin: '3.5rem 0', background: 'var(--surface-2)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)' }}>
                    <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <div style={{ textAlign:'center', marginTop:'3.5rem'}}>
            <Link
              href={`/${lang}/${hub.slug}/${theme.slug}`}
              className="download-btn"style={{ display:'inline-flex', padding:'1rem 2.5rem', fontSize:'1rem', justifyContent:'center'}}
            >
              {isEn ?`Explore All ${theme.title} Coloring Pages (${allThemePages.length + 1})`:`Ontdek Alle ${theme.title} Kleurplaten (${allThemePages.length + 1})`}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
