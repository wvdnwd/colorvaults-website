import SafeImage from '@/components/SafeImage';
import { getThemes, getThemeBySlug, getMainHubs, getColoringPages, safeJsonLd } from '@/lib/api';
import { getCategorySeoData } from '@/lib/categorySeo';
import CategorySeoBlock from '@/components/CategorySeoBlock';
import RelatedThemes from '@/components/RelatedThemes';
import CraftIdeasSection from '@/components/CraftIdeasSection';
import PdfBookBundleModal from '@/components/PdfBookBundleModal';
import NewsletterBox from '@/components/NewsletterBox';
import DifficultyFilterBar from '@/components/DifficultyFilterBar';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import React from 'react';

const PER_PAGE = 24;

export async function generateStaticParams() {
  const themesEn = getThemes('en').map(t => ({ lang: 'en', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  const themesNl = getThemes('nl').map(t => ({ lang: 'nl', mainHubSlug: t.parentHub, themeSlug: t.slug }));
  return [...themesEn, ...themesNl];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; mainHubSlug: string; themeSlug: string }>;
}) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return {};
  const ogImageUrl = theme.image
    ? `/api/og?title=${encodeURIComponent(theme.title + ' Coloring Pages')}&image=${encodeURIComponent(theme.image)}`
    : '/images/banner.jpg';
  return {
    title: `${theme.title} Coloring Pages (Free PDF Printables) | ColorVaults`,
    description: theme.description,
    alternates: {
      canonical: `/${lang}/${mainHubSlug}/${theme.slug}`,
      languages: {
        en: `/en/${mainHubSlug}/${theme.slug}`,
        nl: `/nl/${mainHubSlug}/${theme.slug}`,
        'x-default': `/en/${mainHubSlug}/${theme.slug}`,
      },
    },
    openGraph: {
      title: `${theme.title} Coloring Pages (Free PDF Printables) | ColorVaults`,
      description: theme.description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: theme.title }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImageUrl],
    },
  };
}

export default async function ThemePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; mainHubSlug: string; themeSlug: string }>;
  searchParams: Promise<{ page?: string; difficulty?: string }>;
}) {
  const { lang, mainHubSlug, themeSlug } = await params;
  const { page: pageParam, difficulty: diffParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10));
  const rawDiff = (diffParam || '').toLowerCase();

  const theme = getThemeBySlug(lang, mainHubSlug, themeSlug);
  if (!theme) return notFound();

  const hub = getMainHubs(lang).find(h => h.slug === mainHubSlug);
  if (!hub) return notFound();

  const isEn = lang === 'en';

  const allThemesInHub = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug)
    .map(t => ({ slug: t.slug, title: t.title }));

  const seoData = getCategorySeoData(lang, mainHubSlug, themeSlug, theme.title, allThemesInHub);

  // Get ALL coloring pages for this theme
  const allColoringPages = getColoringPages(lang).filter(
    p => p.parentHub === mainHubSlug && p.parentTheme === themeSlug
  );

  const counts = {
    all: allColoringPages.length,
    easy: allColoringPages.filter(p => p.ageGroup === 'kids' || p.ageGroup === 'kinderen').length,
    medium: allColoringPages.filter(p => p.ageGroup === 'teens' || p.ageGroup === 'tieners').length,
    hard: allColoringPages.filter(p => p.ageGroup === 'adults' || p.ageGroup === 'volwassenen').length,
  };

  let filteredPages = allColoringPages;
  if (rawDiff === 'easy' || rawDiff === 'kids') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'kids' || p.ageGroup === 'kinderen');
  } else if (rawDiff === 'medium' || rawDiff === 'teens') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'teens' || p.ageGroup === 'tieners');
  } else if (rawDiff === 'hard' || rawDiff === 'adults') {
    filteredPages = allColoringPages.filter(p => p.ageGroup === 'adults' || p.ageGroup === 'volwassenen');
  }

  const totalPages = Math.ceil(filteredPages.length / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;
  const coloringPages = filteredPages.slice(offset, offset + PER_PAGE);

  const difficultyQueryString = rawDiff ? `&difficulty=${encodeURIComponent(rawDiff)}` : '';

  // 4 Related themes in this hub for quick pill navigation
  const relatedPills = getThemes(lang)
    .filter(t => t.parentHub === mainHubSlug && t.slug !== themeSlug)
    .slice(0, 5);

  return (
    <>
      {/* ── MondayMandala Style Top Article & Hero Header ── */}
      <div className="page-hero" data-hub={mainHubSlug} style={{ padding: '3.5rem 0 2.5rem' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[
                { label: hub.title, href: `/${lang}/${hub.slug}` },
                { label: theme.title },
              ]}
              lang={lang}
            />
          </div>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
            {isEn ? `${theme.title} Coloring Pages (Free PDF Printables)` : `${theme.title} Kleurplaten (Gratis Printen & PDF)`}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.875rem', color: '#CBD5E1', fontWeight: 600, flexWrap: 'wrap' }}>
            <span>✍️ {isEn ? 'By ColorVaults Studio Team' : 'Door ColorVaults Redactie'}</span>
            <span>•</span>
            <span>📅 {isEn ? 'Updated March 2026' : 'Bijgewerkt Maart 2026'}</span>
            <span>•</span>
            <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.25)', color: '#4ADE80', borderColor: 'rgba(74, 222, 128, 0.4)' }}>
              ✓ {allColoringPages.length} {isEn ? 'Free Printables' : 'Gratis Kleurplaten'}
            </span>
          </div>

          {/* Intro Paragraphs */}
          <div style={{ marginTop: '1.5rem', textAlign: 'left', background: 'rgba(255, 255, 255, 0.95)', padding: '1.75rem 2rem', borderRadius: '20px', border: '1.5px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
            <p style={{ color: '#0F172A', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '0.85rem', fontWeight: 500 }}>
              {theme.seoIntro || seoData.shortIntro}
            </p>
            <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.7 }}>
              {isEn
                ? `Explore this premier collection of ${allColoringPages.length}+ high-resolution printable line art drawings. Designed for kids, toddlers, and adults seeking hours of mindful creative relaxation!`
                : `Ontdek deze prachtige collectie van ${allColoringPages.length}+ haarscherpe printbare lijntekeningen. Perfect voor peuters, kinderen en volwassenen voor urenlang ontspannen kleurplezier!`}
            </p>
          </div>

          {/* Centered 8K Banner Artwork Photo */}
          {theme.image && (
            <div style={{
              margin: '2rem auto 1.5rem',
              maxWidth: '560px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18)',
              border: '3px solid #FFFFFF',
            }}>
              <SafeImage
                src={theme.image}
                alt={`${theme.title} Master Poster`}
                width={560}
                height={380}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}

          {/* 📚 Complete PDF Coloring Book Download Modal */}
          <PdfBookBundleModal
            themeTitle={theme.title}
            count={allColoringPages.length}
            isEn={isEn}
            lang={lang}
            pages={allColoringPages.map(p => ({ title: p.title, image: p.image }))}
          />

          {/* Paper Size & How to Use Notice */}
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC, #F1F5F9)',
            border: '1.5px dashed var(--gray-300)',
            borderRadius: '16px',
            padding: '1rem 1.5rem',
            fontSize: '0.9rem',
            color: '#475569',
            lineHeight: 1.6,
            textAlign: 'center',
          }}>
            📄 <strong>{isEn ? 'Easy Print Instructions:' : 'Eenvoudig Printen:'}</strong>{' '}
            {isEn
              ? 'Click any coloring sheet below to open full size, print directly on standard A4 or US Letter paper, or color online in our digital studio!'
              : 'Klik op een willekeurige kleurplaat om hem op ware grootte te openen, print direct op standaard A4 papier of kleur hem online in via onze digitale studio!'}
          </div>

          {/* Quick Related Topic Pills */}
          {relatedPills.length > 0 && (
            <div style={{
              marginTop: '1.75rem',
              background: '#FFFFFF',
              border: '1.5px solid var(--gray-200)',
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.6rem' }}>
                {isEn ? 'While you are here, grab these related coloring pages:' : 'Bekijk ook deze gerelateerde thema’s:'}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {relatedPills.map(rp => (
                  <Link
                    key={rp.slug}
                    href={`/${lang}/${mainHubSlug}/${rp.slug}`}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      background: 'var(--surface-2, #F1F5F9)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--gray-200)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {rp.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <DifficultyFilterBar isEn={isEn} counts={counts} />

        <div className="section-header" style={{ marginTop: '2rem' }}>
          <div>
            <span className="badge">
              {filteredPages.length} {isEn ? 'Printables in this View' : 'Kleurplaten'}
            </span>
            <h2 className="title-h2" style={{ marginTop: '0.4rem' }}>
              {isEn ? `Free Printable ${theme.title} Coloring Sheets` : `Gratis Printbare ${theme.title} Kleurplaten`}
            </h2>
          </div>
        </div>

        {filteredPages.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: 'var(--gray-400)',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--gray-200)',
            }}
          >
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎨</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)' }}>
              {isEn ? 'No coloring pages found for this difficulty level.' : 'Geen kleurplaten gevonden voor deze moeilijkheidsgraad.'}
            </p>
          </div>
        ) : (
          <div>
            {/* 2x3 Grid -> In-feed Ad -> 2x3 Grid -> In-feed Ad pattern */}
            {Array.from({ length: Math.ceil(coloringPages.length / 6) }).map((_, chunkIndex) => {
              const chunk = coloringPages.slice(chunkIndex * 6, chunkIndex * 6 + 6);
              const showAdBar = chunkIndex < Math.ceil(coloringPages.length / 6) - 1;

              return (
                <React.Fragment key={chunkIndex}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: showAdBar ? '2.5rem' : 0,
                    }}
                  >
                    {chunk.map(page => (
                      <MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />
                    ))}
                  </div>

                  {showAdBar && (
                    <div style={{ margin: '2.5rem 0' }}>
                      <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Pagination Progress */}
        {totalPages > 1 && (
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', fontWeight: 600, marginBottom: '0.6rem' }}>
                {isEn
                  ? `Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} of ${filteredPages.length} pages`
                  : `Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} van ${filteredPages.length} kleurplaten`
                }
              </p>
              <div style={{
                height: '6px',
                background: 'var(--gray-200)',
                borderRadius: '9999px',
                overflow: 'hidden',
                maxWidth: '320px',
                margin: '0 auto',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(currentPage / totalPages) * 100}%`,
                  background: 'linear-gradient(90deg, var(--primary), #A29BFE)',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {currentPage > 1 && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${currentPage - 1}${difficultyQueryString}`}
                  className="btn-secondary"
                >
                  ← {isEn ? 'Previous' : 'Vorige'}
                </Link>
              )}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <Link
                    key={pageNum}
                    href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${pageNum}${difficultyQueryString}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius)',
                      fontWeight: 700,
                      background: isActive ? 'var(--primary)' : 'var(--surface)',
                      color: isActive ? '#FFFFFF' : 'var(--foreground)',
                      border: '1px solid var(--gray-200)',
                      textDecoration: 'none',
                    }}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={`/${lang}/${mainHubSlug}/${themeSlug}?page=${currentPage + 1}${difficultyQueryString}`}
                  className="btn-secondary"
                >
                  {isEn ? 'Next' : 'Volgende'} →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ✂️ 5 Fun Craft Ideas & Activities (SEO Supercharger) */}
        <CraftIdeasSection themeTitle={theme.title} isEn={isEn} />

        {/* 💌 Newsletter & Coloring Club */}
        <NewsletterBox isEn={isEn} lang={lang} />

        {/* 🔗 Related Themes */}
        <RelatedThemes lang={lang} isEn={isEn} currentThemeSlug={theme.slug} allThemes={getThemes(lang)} />

        {/* 📖 Category SEO Knowledge & FAQ */}
        <CategorySeoBlock
          title={seoData.bottomTitle}
          contentHtml={seoData.bottomContentHtml}
          lang={lang}
        />
      </div>
    </>
  );
}