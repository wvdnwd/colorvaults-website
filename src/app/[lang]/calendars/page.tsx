import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import PrintableCalendarGrid from '@/components/PrintableCalendarGrid';
import { getCalendarYear } from '@/data/calendarData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn
      ? 'Free Printable 2026 & 2027 Coloring Calendars (34 Theme Editions, 408 Designs) | ColorVaults'
      : 'Gratis Printbare 2026 & 2027 Kleurkalenders (34 Thema Uitgaven, 408 Tekeningen) | ColorVaults',
    description: isEn
      ? 'Download and print our 34 free 12-month printable coloring calendars for 2026 and 2027! Over 408 clean landscape coloring pages across animals, dinosaurs, space, mandalas, fairytales, and monthly planning grids.'
      : 'Download en print onze 34 gratis 12-maanden jaarkalenders voor 2026 en 2027! Meer dan 408 liggende kleurplaten met dieren, dino’s, ruimte, mandala’s, seizoenen en handige maandplanning.',
  };
}

export default async function CalendarsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const calendarData = getCalendarYear(2026);

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #F0FDF4 0%, var(--background) 100%)', borderBottomColor: '#BBF7D0' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isEn ? 'Coloring Calendars' : 'Kleurkalenders' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(22, 163, 74, 0.15)',
            color: '#16A34A',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            {isEn ? '🎨 Custom 12-Month Calendar Maker (18,000+ Designs)' : '🎨 Maak Je Eigen 12-Maanden Kalender (18.000+ Kleurplaten)'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn ? 'Free Printable Custom Coloring Calendars' : 'Gratis Printbare Gepersonaliseerde Kleurkalenders'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isEn
              ? 'Create and print your personalized 12-month coloring calendar! Customize each month with your favorite drawings from 18,000+ pages and print the complete year in 1 click.'
              : 'Stel je eigen gepersonaliseerde 12-maanden kleurkalender samen! Kies voor elke maand zelf je favoriete tekening uit 18.000+ kleurplaten en print het hele jaar in 1 klik uit.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <PrintableCalendarGrid
          themes={calendarData.themes}
          months={calendarData.months}
          year={2026}
          isEn={isEn}
          lang={lang}
        />

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </> 
  );
}