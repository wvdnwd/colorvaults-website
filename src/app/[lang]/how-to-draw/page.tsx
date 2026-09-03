import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import { HOW_TO_DRAW_LESSONS } from '@/data/howToDrawData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn
      ? 'How to Draw for Kids & Beginners (Step-by-Step Easy Tutorials) | ColorVaults'
      : 'Leren Tekenen in Stappen voor Kinderen (Makkelijke Tekenlessen) | ColorVaults',
    description: isEn
      ? 'Learn how to draw dinosaurs, unicorns, animals, and cartoon characters with our free 6-step printable drawing tutorials and worksheets.'
      : 'Leer stap voor stap dinosaurussen, eenhoorns, dieren en figuren tekenen met onze gratis 6-stappen tekengidsen en oefenbladen.',
  };
}

export default async function HowToDrawHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #EFF6FF 0%, var(--background) 100%)', borderBottomColor: '#BFDBFE' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isEn ? 'How to Draw' : 'Leren Tekenen' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#2563EB',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            ✏️ {isEn ? 'Drawing Academy' : 'Tekenacademie voor Kinderen'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
            {isEn ? 'Step-by-Step Drawing Tutorials' : 'Stap-voor-Stap Leren Tekenen'}
          </h1>

          <p style={{ color: '#E2E8F0', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isEn
              ? 'Master the art of drawing in 6 fun and easy steps! Perfect for kids, parents, and teachers looking for printable drawing worksheets.'
              : 'Word een echte kunstenaar in 6 simpele stappen! Ideaal voor kinderen, ouders en scholen inclusief printbare oefenbladen.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <div className="section-header">
          <div>
            <span className="badge">{HOW_TO_DRAW_LESSONS.length} {isEn ? 'Lessons Available' : 'Tekenlessen Beschikbaar'}</span>
            <h2 className="title-h2" style={{ marginTop: '0.4rem' }}>
              {isEn ? 'Choose What You Want to Draw' : 'Kies Wat Je Wilt Tekenen'}
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {HOW_TO_DRAW_LESSONS.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/${lang}/how-to-draw/${lesson.slug}`}
              className="card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1.5px solid var(--gray-200)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                fontSize: '4.5rem',
                borderBottom: '1px solid var(--gray-200)',
                position: 'relative',
              }}>
                <span>{lesson.icon}</span>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(37, 99, 235, 0.12)',
                  color: '#2563EB',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}>
                  ⏱️ {lesson.timeMinutes} min
                </span>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.3rem',
                }}>
                  6 {isEn ? 'Easy Steps' : 'Makkelijke Stappen'}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  {isEn ? lesson.titleEn : lesson.titleNl}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.925rem', lineHeight: 1.6, margin: '0 0 1.25rem', flex: 1 }}>
                  {isEn ? lesson.descEn : lesson.descNl}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--gray-100)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: '#2563EB',
                }}>
                  <span>{isEn ? 'Start Drawing Lesson' : 'Start Tekenles'}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}