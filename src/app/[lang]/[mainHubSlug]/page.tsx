import { getMainHubs, getThemes, validateDataModel, safeJsonLd, getSampleImagesForTheme } from'@/lib/api';
import CategorySeoBlock from'@/components/CategorySeoBlock';
import CharacterIpDisclaimer from'@/components/CharacterIpDisclaimer';
import { notFound } from'next/navigation';
import Link from'next/link';
import Breadcrumbs from'@/components/Breadcrumbs';
import AdSlot from'@/components/AdSlot';
import AdCard from'@/components/AdCard';
import ThemeCard from'@/components/ThemeCard';
import * as motion from'framer-motion/client';
import React from'react';

export async function generateStaticParams() {
  try { validateDataModel(); } catch(e) { console.error(e); throw e; }
  const hubsEn = getMainHubs('en').map(h => ({ lang: 'en', mainHubSlug: h.slug }));
  const hubsNl = getMainHubs('nl').map(h => ({ lang: 'nl', mainHubSlug: h.slug }));
  const hubsDe = getMainHubs('de').map(h => ({ lang: 'de', mainHubSlug: h.slug }));
  const hubsFr = getMainHubs('fr').map(h => ({ lang: 'fr', mainHubSlug: h.slug }));
  return [...hubsEn, ...hubsNl, ...hubsDe, ...hubsFr];
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
        'de': `/de/${hub.slug}`,
        'fr': `/fr/${hub.slug}`,
        'x-default': `/en/${hub.slug}`,
      },
    },
    openGraph: {
      title:`${hub.title} Coloring Pages | ColorVaults`,
      description: hub.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: hub.title }],
    },
    twitter: {
      card:'summary_large_image',
      images: [ogImageUrl],
    },
  };
}

export default async function MainHubPage({ params }: { params: Promise<{ lang: string, mainHubSlug: string }> }) {
  const { lang, mainHubSlug } = await params;
  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const allThemes = getThemes(lang).filter(t => t.parentHub === hub.slug);
  const isEn = lang !== 'nl';

  return (
    <>
            {/* ── Cinematic Full-Width Hub Header with 100% Uncropped Artwork ── */}
      <div className="page-hero"data-hub={mainHubSlug} style={{ padding:'2rem 0 2.5rem'}}>
        <div className="container"style={{ maxWidth:'1200px'}}>
          {/* Full-Width Cinematic Hub Master Banner */}
          <div style={{
            position:'relative',
            borderRadius:'28px',
            overflow:'hidden',
            boxShadow:'0 25px 60px -15px rgba(15, 23, 42, 0.45)',
            border:'2px solid rgba(255, 255, 255, 0.3)',
            background:'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          }}>
            {/* Ambient Blurred Color Glow Backdrop */}
            {hub.image && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={hub.image}
                alt=""aria-hidden="true"style={{
                  position:'absolute',
                  inset:'-30px',
                  width:'calc(100% + 60px)',
                  height:'calc(100% + 60px)',
                  objectFit:'cover',
                  filter:'blur(50px) brightness(0.35)',
                  opacity: 0.65,
                  pointerEvents:'none',
                }}
              />
            )}

            {/* Dark Vignette Overlay */}
            <div style={{
              position:'absolute',
              inset: 0,
              background:'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 100%)',
              pointerEvents:'none',
            }} />

            {/* Foreground Content */}
            <div style={{
              position:'relative',
              zIndex: 3,
              padding:'2.5rem 2.25rem',
              display:'flex',
              flexWrap:'wrap',
              alignItems:'center',
              justifyContent:'space-between',
              gap:'2.5rem',
            }}>
              {/* Left Column: Breadcrumbs, Title, Intro & Badges */}
              <div style={{ flex:'1 1 540px', textAlign:'left', minWidth:'280px'}}>
                <div style={{
                  display:'inline-block',
                  background:'rgba(15, 23, 42, 0.75)',
                  backdropFilter:'blur(8px)',
                  WebkitBackdropFilter:'blur(8px)',
                  padding:'0.25rem 0.75rem',
                  borderRadius:'9999px',
                  border:'1px solid rgba(255, 255, 255, 0.25)',
                  marginBottom:'0.85rem',
                }}>
                  <Breadcrumbs items={[{ label: hub.title }]} lang={lang} />
                </div>

                <h1 className="title-h1"style={{
                  color:'#FFFFFF',
                  fontSize:'clamp(2rem, 3.8vw, 3.2rem)',
                  fontWeight: 900,
                  textShadow:'0 4px 20px rgba(0, 0, 0, 0.8)',
                  margin:'0.25rem 0 0.6rem',
                  fontFamily:'var(--font-display),"Fredoka", sans-serif',
                  letterSpacing:'-0.02em',
                  lineHeight: 1.15,
                }}>
                  {hub.title}
                </h1>

                <p style={{
                  color:'#F1F5F9',
                  fontSize:'1.05rem',
                  lineHeight: 1.6,
                  textShadow:'0 2px 10px rgba(0, 0, 0, 0.8)',
                  maxWidth:'680px',
                  margin:'0.5rem 0 1.35rem',
                }}>
                  {hub.description}
                </p>

                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', flexWrap:'wrap'}}>
                  <span className="badge"style={{ background:'#FF6B35', color:'#FFFFFF', borderColor:'#FF6B35', fontWeight: 800 }}>
                    {allThemes.length} {isEn ?'Collections':'Collecties'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#065F46', borderColor:'#A7F3D0', fontWeight: 700 }}>
                    {isEn ?'Toddlers (2-4y)':'Peuters (2-4j)'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#1E40AF', borderColor:'#BFDBFE', fontWeight: 700 }}>
                    {isEn ?'Kids (5-8y)':'Kids (5-8j)'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#6B21A8', borderColor:'#E9D5FF', fontWeight: 700 }}>
                    {isEn ?'Teens (9-12y)':'Tieners (9-12j)'}
                  </span>
                  <span className="badge"style={{ background:'rgba(255, 255, 255, 0.95)', color:'#9F1239', borderColor:'#FECDD3', fontWeight: 700 }}>
                    {isEn ?'Adults (13+)':'Volwassenen'}
                  </span>
                </div>
              </div>

              {/* Right Column: 100% Complete Uncropped Artwork Card */}
              {hub.image && (
                <div style={{
                  flex:'0 0 auto',
                  margin:'0 auto',
                  position:'relative',
                }}>
                  <div style={{
                    position:'absolute',
                    top:'12px',
                    right:'12px',
                    zIndex: 5,
                    background:'rgba(15, 23, 42, 0.85)',
                    backdropFilter:'blur(8px)',
                    WebkitBackdropFilter:'blur(8px)',
                    color:'#F8FAFC',
                    borderRadius:'9999px',
                    padding:'0.25rem 0.75rem',
                    fontSize:'0.72rem',
                    fontWeight: 800,
                    border:'1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow:'0 2px 8px rgba(0,0,0,0.35)',
                  }}>
                    {isEn ?'Fan-Art Hub Edition':'Fan-Art & Kleurplaat Editie'}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hub.image}
                    alt={`${hub.title} Artwork`}
                    style={{
                      maxHeight:'340px',
                      maxWidth:'100%',
                      width:'auto',
                      height:'auto',
                      objectFit:'contain',
                      borderRadius:'20px',
                      border:'3px solid rgba(255, 255, 255, 0.9)',
                      boxShadow:'0 16px 40px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 107, 74, 0.25)',
                      display:'block',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner"text={isEn ?"Sponsored Content":"Gesponsord"} />

        <div className="section-header">
          <div>
            <span className="badge">{isEn ?'Browse Hub':'Bladeren'}</span>
            <h2 className="title-h2"style={{ marginTop:'0.5rem'}}>{isEn ?'All Themes in this Hub':'Alle Thema\'s in deze Hoofdcategorie'}</h2>
          </div>
          <Link href={`/${lang}/how-to-draw`} className="btn-secondary"style={{ fontSize:'0.85rem'}}>
            {isEn ?'Drawing Academy':'Leren Tekenen'}
          </Link>
        </div>
        
        {/* 3-row chunks (12 themes) → AdCard in middle → banner between groups */}
        {Array.from({ length: Math.ceil(allThemes.length / 12) }).map((_, chunkIndex) => {
          const chunk = allThemes.slice(chunkIndex * 12, chunkIndex * 12 + 12);
          const showAdBar = chunkIndex < Math.ceil(allThemes.length / 12) - 1;

          const gridItems: React.ReactNode[] = [];
          chunk.forEach((theme, i) => {
            if (i === 5) {
              gridItems.push(<AdCard key="hub-ad-card" />);
            }
            const sampleImages = getSampleImagesForTheme(lang, hub.slug, theme.slug, theme.image, 3);
            gridItems.push(
              <motion.div 
                key={theme.slug}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin:'-50px'}}
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
          });

          return (
            <React.Fragment key={chunkIndex}>
              <div className="grid-4" style={{ marginBottom: showAdBar ? '2.5rem' : 0 }}>
                {gridItems}
              </div>

              {showAdBar && (
                <div style={{ margin: '2.5rem 0' }}>
                  <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />
                </div>
              )}
            </React.Fragment>
          );
        })}

        <div style={{ margin: '2.5rem 0' }}>
          <AdSlot type="banner" text={isEn ? "Sponsored Content" : "Gesponsord"} />
        </div>

        <CategorySeoBlock
          title={isEn ?`About ${hub.title} Coloring Pages`:`Over ${hub.title} Kleurplaten`}
          contentHtml={isEn ?`<h2>Free Printable ${hub.title} Coloring Collection</h2>
            <p>${hub.description} Explore our complete library of high-resolution printable coloring pages, carefully categorized by sub-theme and difficulty level.</p>
            <h3>Featured Themes in ${hub.title}</h3>
            <ul>
              ${allThemes.slice(0, 6).map(t =>`<li><a href="/${lang}/${hub.slug}/${t.slug}"><strong>${t.title}</strong></a> — ${t.description}</li>`).join('')}
            </ul>
            <h3>Easy Printing & High Quality Downloads</h3>
            <p>Download your favorite ${hub.title} coloring pages instantly in clean line vector PDF format. Ideal for toddlers, children, teens, and adults.</p>`:`<h2>Gratis Printbare ${hub.title} Kleurplaten Collectie</h2>
            <p>${hub.description} Ontdek onze volledige verzameling van hoge resolutie printbare kleurplaten, zorgvuldig ingedeeld per subthema en moeilijkheidsgraad.</p>
            <h3>Populaire Thema's in ${hub.title}</h3>
            <ul>
              ${allThemes.slice(0, 6).map(t =>`<li><a href="/${lang}/${hub.slug}/${t.slug}"><strong>${t.title}</strong></a> — ${t.description}</li>`).join('')}
            </ul>
            <h3>Eenvoudig Printen & Hoge Kwaliteit Downloads</h3>
            <p>Download je favoriete ${hub.title} kleurplaten direct in strak PDF-formaat. Ideaal voor peuters, kinderen, tieners en volwassenen.</p>`}
          lang={lang}
        />

        {/* Intellectual Property & Fair-Use Disclaimer */}
        <CharacterIpDisclaimer themeTitle={hub.title} isEn={isEn} lang={lang} />
      </div>

      <script
        type="application/ld+json"dangerouslySetInnerHTML={{ __html: safeJsonLd({'@context':'https://schema.org','@graph': [
            {'@type':'CollectionPage','name': hub.title,'description': hub.description,'url':`https://colorvaults.com/${lang}/${hub.slug}`,'isPartOf': {'@id':'https://colorvaults.com/#website'},'hasPart': allThemes.map(t => ({'@type':'WebPage','name': t.title,'url':`https://colorvaults.com/${lang}/${hub.slug}/${t.slug}`}))
            },
            {'@type':'BreadcrumbList','itemListElement': [
                {'@type':'ListItem','position': 1,'name': hub.title,'item':`https://colorvaults.com/${lang}/${hub.slug}`}
              ]
            }
          ]
        }) }}
      />
    </>
  );
}
