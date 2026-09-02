import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import { HOW_TO_DRAW_LESSONS, getLessonBySlug } from '@/data/howToDrawData';

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

          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{lesson.icon}</div>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn ? lesson.titleEn : lesson.titleNl}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600, flexWrap: 'wrap' }}>
            <span>⏱️ {lesson.timeMinutes} {isEn ? 'minutes' : 'minuten'}</span>
            <span>•</span>
            <span>📊 {isEn ? 'Difficulty: Easy' : 'Niveau: Makkelijk'}</span>
            <span>•</span>
            <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#16A34A', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
              ✓ 6 {isEn ? 'Steps Guide' : 'Stappen Gids'}
            </span>
          </div>

          <p style={{ color: '#475569', fontSize: '1.05rem', marginTop: '1rem', lineHeight: 1.7, maxWidth: '640px', margin: '1rem auto 0' }}>
            {isEn ? lesson.descEn : lesson.descNl}
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${lang}/${lesson.relatedHubSlug}/${lesson.relatedThemeSlug}`}
              className="btn-primary"
              style={{ fontSize: '0.9rem' }}
            >
              🎨 {isEn ? 'Coloring Pages For This Theme' : 'Bekijk Bijbehorende Kleurplaten'}
            </Link>
          </div>
        </div>
      </div>

      <div className="container section" style={{ maxWidth: '900px' }}>
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        {/* 6 Step Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
          {lesson.steps.map((step) => (
            <div
              key={step.stepNumber}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '2rem',
                border: '1.5px solid var(--gray-200)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.03)',
                display: 'flex',
                gap: '1.75rem',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #2563EB, #60A5FA)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              }}>
                {step.stepNumber}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.6rem' }}>
                  {isEn ? step.titleEn : step.titleNl}
                </h3>
                <p style={{ color: '#334155', fontSize: '1.025rem', lineHeight: 1.7, margin: '0 0 0.85rem' }}>
                  {isEn ? step.instructionEn : step.instructionNl}
                </p>

                {(step.tipEn || step.tipNl) && (
                  <div style={{
                    background: '#FEF3C7',
                    border: '1px solid #FDE68A',
                    borderRadius: '12px',
                    padding: '0.6rem 1rem',
                    color: '#92400E',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    💡 <strong>{isEn ? 'Artist Tip:' : 'Kunstenaars Tip:'}</strong> {isEn ? step.tipEn : step.tipNl}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Printable Drawing Worksheet Box */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(15, 23, 42, 0.25)',
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>📄</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#FFFFFF' }}>
            {isEn ? 'Printable Drawing Practice Worksheet' : 'Printbaar Oefenblad (A4)'}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.975rem', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            {isEn
              ? 'Print this full-page guide with step diagrams and grid paper for students to practice drawing right at their desk!'
              : 'Print deze complete gids met stappendiagrammen en ruitjespapier zodat kinderen direct op papier kunnen oefenen!'}
          </p>
          <button
            type="button"
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '0.85rem 2rem', cursor: 'pointer' }}
          >
            🖨️ {isEn ? 'Print Free Worksheet (PDF)' : 'Print Oefenblad (PDF)'}
          </button>
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}