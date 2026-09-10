import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import SafeImage from '@/components/SafeImage';
import { HOW_TO_DRAW_LESSONS, getLessonBySlug, getRelatedLessons } from '@/data/howToDrawData';

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ['en', 'nl']) {
    for (const lesson of HOW_TO_DRAW_LESSONS) {
      params.push({ lang, slug: lesson.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  const isEn = lang === 'en';

  return {
    title: isEn
      ? `${lesson.titleEn} (Step-by-Step Drawing Tutorial) | ColorVaults`
      : `${lesson.titleNl} (Stap voor Stap Tekengids) | ColorVaults`,
    description: isEn ? lesson.descEn : lesson.descNl,
    openGraph: lesson.image ? {
      images: [{ url: lesson.image }],
    } : undefined,
  };
}

export default async function HowToDrawLessonPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return notFound();

  const isEn = lang === 'en';
  const related = getRelatedLessons(slug, 3);

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #EFF6FF 0%, var(--background) 100%)', borderBottomColor: '#BFDBFE' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[
                { label: isEn ? 'How to Draw' : 'Leren Tekenen', href: `/${lang}/how-to-draw` },
                { label: isEn ? lesson.titleEn : lesson.titleNl },
              ]}
              lang={lang}
            />
          </div>

          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{lesson.icon}</div>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn ? lesson.titleEn : lesson.titleNl}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.875rem', color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
            <span>⏱️ {lesson.timeMinutes} {isEn ? 'minutes' : 'minuten'}</span>
            <span>•</span>
            <span>📊 {isEn ? 'Difficulty: Easy' : 'Niveau: Makkelijk'}</span>
            <span>•</span>
            <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#15803D', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
              ✓ 6 {isEn ? 'Steps Guide' : 'Stappen Gids'}
            </span>
          </div>

          <p style={{ color: '#475569', fontSize: '1.05rem', marginTop: '1rem', lineHeight: 1.7, maxWidth: '640px', margin: '1rem auto 0' }}>
            {isEn ? lesson.descEn : lesson.descNl}
          </p>
        </div>
      </div>

      <div className="container section" style={{ maxWidth: '920px' }}>
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        {/* Artwork Showcase & Action Card */}
        {lesson.image && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid var(--gray-200)',
            padding: '2rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            marginBottom: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
          }}>
            <div style={{
              position: 'relative',
              aspectRatio: '4/3',
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid var(--gray-200)',
              overflow: 'hidden',
            }}>
              <SafeImage
                src={lesson.image}
                alt={isEn ? lesson.titleEn : lesson.titleNl}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.03em',
              }}>
                ✨ {isEn ? 'Final Result' : 'Eindresultaat'}
              </span>
            </div>

            <div>
              <span className="badge" style={{ background: '#EFF6FF', color: '#2563EB', borderColor: '#BFDBFE', marginBottom: '0.75rem' }}>
                {isEn ? 'Print & Practice' : 'Printen & Oefenen'}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.6rem' }}>
                {isEn ? 'Ready to draw & color?' : 'Klaar om te tekenen & kleuren?'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {isEn
                  ? 'Follow the 6 steps below with a pencil. When you finish, download or print this official coloring sheet to practice your colors!'
                  : 'Volg de 6 stappen hieronder met potlood. Print daarna deze bijbehorende kleurplaat uit om je tekening prachtig in te kleuren!'}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {lesson.coloringPageUrl && (
                  <Link
                    href={lesson.coloringPageUrl}
                    className="btn-primary"
                    style={{ fontSize: '0.925rem', padding: '0.75rem 1.25rem' }}
                  >
                    <span>🖨️</span>
                    <span>{isEn ? 'Open Printable Coloring Page' : 'Open Printbare Kleurplaat'}</span>
                  </Link>
                )}
                <Link
                  href={`/${lang}/${lesson.relatedHubSlug}/${lesson.relatedThemeSlug}`}
                  className="btn-secondary"
                  style={{ fontSize: '0.925rem', padding: '0.75rem 1.25rem' }}
                >
                  {isEn ? 'More In This Theme' : 'Meer In Dit Thema'}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 6 Step Cards */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="title-h2">{isEn ? '6-Step Drawing Instructions' : '6 Stappen Tekeninstructies'}</h2>
          <p style={{ color: '#64748B', marginTop: '0.25rem' }}>
            {isEn ? 'Grab a blank sheet of paper and a pencil to get started!' : 'Pak een leeg vel papier en een potlood om te beginnen!'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {lesson.steps.map((step) => {
            const stepBadgesEn = ['✏️ Stage 1: Basic Shapes', '📐 Stage 2: Outer Contours', '🔍 Stage 3: Facial & Body Details', '🖋️ Stage 4: Line Inking', '🎨 Stage 5: Shading & Highlights', '✨ Stage 6: Full Coloring'];
            const stepBadgesNl = ['✏️ Fase 1: Basis Schets', '📐 Fase 2: Omtrek & Vorm', '🔍 Fase 3: Karakterdetails', '🖋️ Fase 4: Lijnen Overstiften', '🎨 Fase 5: Schaduw & Reliëf', '✨ Fase 6: Inkleuren'];
            const badgeText = isEn ? stepBadgesEn[step.stepNumber - 1] || `Step ${step.stepNumber}` : stepBadgesNl[step.stepNumber - 1] || `Stap ${step.stepNumber}`;

            return (
              <div
                key={step.stepNumber}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '1.75rem 2rem',
                  border: '1.5px solid var(--gray-200)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                }}>
                  {step.stepNumber}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'rgba(37, 99, 235, 0.1)',
                      color: '#2563EB',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}>
                      {badgeText}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                    {isEn ? step.titleEn : step.titleNl}
                  </h3>
                  <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.7, margin: '0 0 0.85rem' }}>
                    {isEn ? step.instructionEn : step.instructionNl}
                  </p>

                  {(step.tipEn || step.tipNl) && (
                    <div style={{
                      background: '#FEF3C7',
                      border: '1px solid #FDE68A',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.875rem',
                      color: '#92400E',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <span>💡</span>
                      <span><strong>{isEn ? 'Artist Tip:' : 'Teken Tip:'}</strong> {isEn ? step.tipEn : step.tipNl}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Related Drawing Lessons */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3 className="title-h2" style={{ marginBottom: '1.25rem' }}>
              {isEn ? 'More Drawing Lessons You Might Like' : 'Meer Leuke Tekenlessen'}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${lang}/how-to-draw/${rel.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1.5px solid var(--gray-200)',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '2.25rem' }}>{rel.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.2rem' }}>
                      {isEn ? rel.titleEn : rel.titleNl}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 700 }}>
                      {isEn ? 'Start Tutorial →' : 'Start Les →'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
