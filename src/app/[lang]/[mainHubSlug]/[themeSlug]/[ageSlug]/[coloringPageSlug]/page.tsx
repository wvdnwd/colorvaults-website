import { getColoringPages, getPageBySlug, getMainHubs, getThemes, getAgePageBySlug, getPagesByAgeGroup, safeJsonLd } from'@/lib/api';
import { notFound } from'next/navigation';
import Breadcrumbs from'@/components/Breadcrumbs';
import Link from'next/link';
import Image from'next/image';
import SafeImage from'@/components/SafeImage';
import PrintDownloadButtons from'@/components/PrintDownloadButtons';
import SocialShareButtons from'@/components/SocialShareButtons';
import FavoriteButton from'@/components/FavoriteButton';
import MotionCard from'@/components/MotionCard';
import CharacterIpDisclaimer from'@/components/CharacterIpDisclaimer';
import AdSlot from'@/components/AdSlot';
import ReportButton from'@/components/ReportButton';
import CraftIdeasSection from '@/components/CraftIdeasSection';
import ThemeFaqSection from '@/components/ThemeFaqSection';
import NewsletterBox from '@/components/NewsletterBox';
import React from'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render top 30 sample pages at build time to keep build memory low (<120MB).
  // All other pages render dynamically on-demand (ISR) and cache permanently!
  const pagesEn = getColoringPages('en').slice(0, 30).map(p => ({ lang:'en', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  const pagesNl = getColoringPages('nl').slice(0, 30).map(p => ({ lang:'nl', mainHubSlug: p.parentHub, themeSlug: p.parentTheme, ageSlug: p.ageGroup, coloringPageSlug: p.slug }));
  return [...pagesEn, ...pagesNl];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, mainHubSlug: string, themeSlug: string, ageSlug: string, coloringPageSlug: string }> }) {
  const { lang, mainHubSlug, themeSlug, ageSlug, coloringPageSlug } = await params;
  const page = getColoringPages(lang).find(p => p.slug === coloringPageSlug && p.parentHub === mainHubSlug && p.parentTheme === themeSlug && p.ageGroup === ageSlug);
  if (!page) return {};
  
  const ogImageUrl =`/api/og?title=${encodeURIComponent(page.title)}&image=${encodeURIComponent(page.image)}`;
  
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.shortDescription,
    alternates: {
      canonical:`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`,
      languages: {'en':`/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`,'nl':`/nl/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`,'x-default':`/en/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`}
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
      card:'summary_large_image',
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

  const isEn = lang !== 'nl';

  // Related pages: get all pages from the same theme (excluding current page)
  const allThemePages = getColoringPages(lang).filter(
    p => p.parentTheme === themeSlug && p.slug !== page.slug
  );
  
  // Prioritize same age group first, then other age groups in same theme
  allThemePages.sort((a, b) => {
    if (a.ageGroup === ageSlug && b.ageGroup !== ageSlug) return -1;
    if (b.ageGroup === ageSlug && a.ageGroup !== ageSlug) return 1;
    return 0;
  });

  // If theme has fewer than 16 pages, also grab pages from same main hub
  let relatedPool = allThemePages;
  if (relatedPool.length < 16) {
    const hubPages = getColoringPages(lang).filter(
      p => p.parentHub === mainHubSlug && p.parentTheme !== themeSlug && p.slug !== page.slug
    );
    relatedPool = [...relatedPool, ...hubPages];
  }
  
  // Show up to 24 related pages
  const displayPages = relatedPool.slice(0, 24);

  // Split into chunks of 8 to insert AdSlot in between rows
  const pageChunks = [];
  for (let i = 0; i < displayPages.length; i += 8) {
    pageChunks.push(displayPages.slice(i, i + 8));
  }

  const pinterestUrl =`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`)}&media=${encodeURIComponent(page.image)}&description=${encodeURIComponent(page.metaTitle || page.title)}`;

  return (
    <div className="container section">
      <Breadcrumbs
        items={[
          { label: hub.title, href:`/${lang}/${hub.slug}`},
          { label: theme.title, href:`/${lang}/${hub.slug}/${theme.slug}`},
          { label: agePage.title, href:`/${lang}/${hub.slug}/${theme.slug}/${agePage.ageGroup}`},
          { label: page.title }
        ]}
        lang={lang}
      />
      
      <script
        type="application/ld+json"dangerouslySetInnerHTML={{ __html: safeJsonLd({"@context":"https://schema.org","@graph": [
            {"@type":"BreadcrumbList","itemListElement": [
                {"@type":"ListItem","position": 1,"name":"Home","item":`https://colorvaults.com/${lang}`},
                {"@type":"ListItem","position": 2,"name": hub.title,"item":`https://colorvaults.com/${lang}/${hub.slug}`},
                {"@type":"ListItem","position": 3,"name": theme.title,"item":`https://colorvaults.com/${lang}/${hub.slug}/${theme.slug}`},
                {"@type":"ListItem","position": 4,"name": page.title,"item":`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`}
              ]
            },
            {"@type":"ImageObject","name": page.title,"description": page.metaDescription || page.shortDescription,"contentUrl": page.image,"thumbnailUrl": page.image,"caption": page.title,"keywords":`${theme.title}, ${isEn ?'coloring page':'kleurplaat'}, ${isEn ?'free printable':'gratis printbaar'}, ${ageSlug}`,"license":`https://colorvaults.com/${lang}/licensing`,"acquireLicensePage":`https://colorvaults.com/${lang}/licensing`,"creditText":"ColorVaults","copyrightNotice":"© ColorVaults.com - Free for personal & educational use","creator": {"@type":"Organization","name":"ColorVaults","url":"https://colorvaults.com"},"isFamilyFriendly":"true","genre":"Coloring Page"},
            {"@type":"HowTo","name": isEn ?`How to Print the ${page.title} Coloring Page`:`Hoe Print je de ${page.title} Kleurplaat`,"description": isEn
                ?`Step-by-step guide to download and print this free high-resolution ${page.title} coloring sheet in A4 or Letter format.`:`Stapsgewijze handleiding om deze gratis hoge resolutie ${page.title} kleurplaat af te drukken op A4-formaat.`,"step": [
                {"@type":"HowToStep","name": isEn ?"Preview & Open":"Bekijk & Open","text": isEn
                    ?"Click the'Print Free Coloring Page'button to open the instant print preview modal.":"Klik op'Gratis Kleurplaat Printen'om direct het afdrukvoorbeeld te openen."},
                {"@type":"HowToStep","name": isEn ?"Configure Printer":"Stel Printer In","text": isEn
                    ?"Ensure your printer settings are set to A4 or Letter paper size at 100% scale with no margins.":"Zorg dat de printerinstellingen op A4-formaat en 100% schaal zonder marges staan."},
                {"@type":"HowToStep","name": isEn ?"Print & Enjoy Coloring":"Print & Kleur In","text": isEn
                    ?"Send to your printer and enjoy hours of creative relaxation with crayons, colored pencils, or markers.":"Druk af en geniet van urenlang creatief kleurplezier met viltstiften, potloden of verf."}
              ]
            },
            {"@type":"FAQPage","mainEntity": (page.faq && page.faq.length > 0 ? page.faq : [
                {
                  question: isEn ?`Is this ${page.title} coloring page free to print?`:`Is deze ${page.title} kleurplaat gratis te printen?`,
                  answer: isEn
                    ?`Yes! All coloring pages on ColorVaults are 100% free for personal, classroom, and non-commercial educational use.`:`Ja! Alle kleurplaten op ColorVaults zijn 100% gratis voor persoonlijk gebruik en in de klas.`},
                {
                  question: isEn ?`What paper size is best for printing?`:`Welk papierformaat is het beste om af te drukken?`,
                  answer: isEn
                    ?`These templates are optimized for standard A4 and US Letter sizes at high resolution (300 DPI equivalent line art).`:`Deze sjablonen zijn geoptimaliseerd voor standaard A4 en Letter formaat in hoge resolutie.`},
                {
                  question: isEn ?`Can I color this template digitally on iPad or tablet?`:`Kan ik deze kleurplaat ook digitaal inkleuren op een tablet?`,
                  answer: isEn
                    ?`Yes! Click the'Download Image File'button to save the crisp image to your tablet or drawing app like Procreate.`:`Zeker! Klik op'Download Afbeelding'om het bestand op te slaan op je iPad of tablet voor tekenapps zoals Procreate.`},
                {
                  question: isEn ?`What should I do if I spot an error or stray line in this coloring page?`:`Wat moet ik doen als ik een foutje of los lijntje zie in deze kleurplaat?`,
                  answer: isEn
                    ?`Use our interactive red pencil tool directly below the image! Grab the pencil, draw a circle around the issue on the drawing, and click send. Our team reviews and refines the artwork right away.`:`Gebruik ons unieke interactieve rode potlood direct onder de afbeelding! Omcirkel het foutje met je vinger of muis en stuur het in. Onze tekenstudio fixt de lijnen direct.`}
              ]).map(item => ({"@type":"Question","name": item.question,"acceptedAnswer": {"@type":"Answer","text": item.answer
                }
              }))
            }
          ]
        }) }}
      />

      <div className="coloring-page-detail-grid">
        {/* Main Stage Image */}
        <div>
          <div 
            className="coloring-page-image-container"style={{ 
              position:'relative', 
              background:'#FFFFFF', 
              borderRadius:'var(--radius-xl)', 
              border:'1px solid var(--gray-200)', 
              padding:'2.5rem', 
              textAlign:'center',
              boxShadow:'var(--shadow-md)'}}
          >
            <SafeImage 
              src={page.image} 
              alt={page.metaTitle || page.title} 
              width={800} 
              height={800} 
              loading="eager"fetchPriority="high"style={{ maxWidth:'100%', height:'auto', borderRadius:'var(--radius)', boxShadow:'var(--shadow-sm)'}} 
            />
            <div style={{ position:'absolute', top:'18px', right:'18px'}}>
              <FavoriteButton 
                item={{ 
                  id: page.slug, 
                  slug: page.slug, 
                  title: page.title, 
                  preview: page.image, 
                  url:`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`}} 
              />
            </div>
          </div>

          {/* Prominent Friendly Pencil Error Finder Tool Banner */}
          <ReportButton
            imageUrl={page.image}
            category={theme.title}
            isEn={isEn}
            variant="hero-banner"
          />

          {/* Social Share bar */}
          <SocialShareButtons
            isEn={isEn}
            title={page.title}
            url={`https://colorvaults.com/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}`}
            imageUrl={page.image}
          />

          {/* Long SEO text */}
          <div className="seo-block"style={{ marginTop:'2.5rem'}}>
            <h2>{isEn ?'About This Coloring Page':'Over Deze Kleurplaat'}</h2>
            <p>{page.shortDescription || page.metaDescription}</p>
          </div>

          {page.faq && page.faq.length > 0 && (
            <div className="seo-block"style={{ marginTop:'2.5rem'}}>
              <h2>{isEn ?'Frequently Asked Questions':'Veelgestelde Vragen'}</h2>
              {page.faq.map((item, i) => (
                <details key={i} style={{ marginTop:'1rem', borderBottom:'1px solid var(--gray-200)', paddingBottom:'1rem'}}>
                  <summary style={{ fontWeight: 700, cursor:'pointer', color:'var(--foreground)'}}>
                    {item.question}
                  </summary>
                  <p style={{ marginTop:'0.75rem', color:'var(--gray-600)', lineHeight: 1.8 }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Sidebar */}
        <div style={{ position:'sticky', top:'5.5rem'}}>
          <h1 className="title-h1"style={{ fontSize:'2rem'}}>{page.title}</h1>
          <p style={{ color:'var(--gray-600)', fontSize:'1rem', marginTop:'0.6rem', lineHeight: 1.7 }}>
            {page.shortDescription}
          </p>

          <div style={{ background:'var(--primary-light)', borderRadius:'var(--radius-lg)', padding:'1.25rem 1.5rem', marginTop:'1.5rem', border:'1px solid rgba(108,92,231,0.18)'}}>
            <p style={{ fontSize:'0.8rem', fontWeight: 800, color:'var(--primary)', marginBottom:'0.35rem', textTransform:'uppercase', letterSpacing:'0.06em'}}>
              {isEn ?'100% Free — No Signup Required':'100% Gratis — Geen Account Nodig'}
            </p>
            <p style={{ fontSize:'0.875rem', color:'var(--gray-600)'}}>
              {isEn ?'Print directly or download instantly as a high-resolution image file.':'Print direct of download direct als hoge resolutie afbeelding.'}
            </p>
          </div>

          {/* Action CTAs */}
          <PrintDownloadButtons 
            isEn={isEn} 
            fileUrl={page.image} 
            colorPageUrl={`/${lang}/${mainHubSlug}/${themeSlug}/${ageSlug}/${page.slug}/color`}
            lang={lang}
            category={theme.title}
          />

          {/* Metadata Chips */}
          <div style={{ marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'0.6rem'}}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.85rem 1rem', background:'var(--surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--gray-200)'}}>
              <div>
                <p style={{ fontSize:'0.7rem', fontWeight: 800, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{isEn ?'Age Group':'Leeftijdsgroep'}</p>
                <p style={{ fontSize:'0.925rem', fontWeight: 800, color:'var(--foreground)', textTransform:'capitalize'}}>{ageSlug}</p>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', padding:'0.85rem 1rem', background:'var(--surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--gray-200)'}}>
              <div>
                <p style={{ fontSize:'0.7rem', fontWeight: 800, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{isEn ?'Theme':'Thema'}</p>
                <p style={{ fontSize:'0.925rem', fontWeight: 800, color:'var(--foreground)'}}>{theme.title}</p>
              </div>
            </div>
          </div>

          {/* Clickable SEO Tags */}
          <div style={{ marginTop:'1.25rem'}}>
            <p style={{ fontSize:'0.72rem', fontWeight: 800, color:'var(--gray-400)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem'}}>
              {isEn ?'Popular Tags':'Populaire Tags'}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem'}}>
              <Link href={`/${lang}/${hub.slug}`} className="tag-chip">#{hub.title.replace(/\s+/g,'')}</Link>
              <Link href={`/${lang}/${hub.slug}/${theme.slug}`} className="tag-chip">#{theme.title.replace(/\s+/g,'')}</Link>
              <Link href={`/${lang}/${hub.slug}/${theme.slug}/${ageSlug}`} className="tag-chip">#{ageSlug}</Link>
              <Link href={`/${lang}/search?q=${encodeURIComponent(theme.title)}`} className="tag-chip">#{isEn ?'FreeColoringSheet':'GratisKleurplaat'}</Link>
              <Link href={`/${lang}/search?q=${encodeURIComponent('PDF')}`} className="tag-chip">#PDF</Link>
            </div>
          </div>

          {/* Google AdSense Rectangle Sidebar Ad */}
          <div style={{ marginTop:'1.5rem'}}>
            <AdSlot type="rectangle"text={isEn ?"Sponsored Content":"Gesponsord"} />
          </div>

          <Link
            href={`/${lang}/${hub.slug}/${theme.slug}/${ageSlug}`}
            style={{ display:'block', marginTop:'1.25rem', textAlign:'center', color:'var(--primary)', fontWeight: 700, fontSize:'0.9rem', padding:'0.85rem', borderRadius:'var(--radius-full)', background:'var(--primary-light)', border:'1px solid rgba(108,92,231,0.2)', transition:'all 0.2s'}}
          >
            ← {isEn ?`Browse All ${theme.title} Pages`:`Bekijk Alle ${theme.title} Kleurplaten`}
          </Link>
        </div>
      </div>
      
      {/* 12 Creative Craft Ideas & DIY Activities */}
      <CraftIdeasSection
        pageTitle={page.title}
        parentHub={mainHubSlug}
        ageGroup={ageSlug}
        lang={lang}
        isEn={isEn}
      />

      {/* Related Pages Section with Ads in between */}
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

          {pageChunks.map((chunk, chunkIdx) => (
            <React.Fragment key={chunkIdx}>
              <div className="grid-4"style={{ marginBottom:'2.5rem'}}>
                {chunk.map(related => (
                  <MotionCard key={related.slug} page={related} lang={lang} isEn={isEn} />
                ))}
              </div>

              {/* Advertisement between rows of coloring pages */}
              {chunkIdx < pageChunks.length - 1 && (
                <div style={{ margin:'3.5rem 0', background:'var(--surface-2)', padding:'1.5rem', borderRadius:'var(--radius-lg)', border:'1px solid var(--gray-200)'}}>
                  <AdSlot type="banner"text={isEn ?"Sponsored Content":"Gesponsord"} />
                </div>
              )}
            </React.Fragment>
          ))}

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

      {/* Frequently Asked Questions (Schema.org FAQPage Rich Results) */}
      <ThemeFaqSection
        themeTitle={theme.title}
        pageTitle={page.title}
        isEn={isEn}
        hubSlug={mainHubSlug}
        themeSlug={themeSlug}
      />

      {/* Newsletter & Coloring Club */}
      <NewsletterBox isEn={isEn} lang={lang} />

      {/* Intellectual Property & Fair-Use Disclaimer */}
      <CharacterIpDisclaimer themeTitle={theme.title} isEn={isEn} lang={lang} />
    </div>
  );
}
