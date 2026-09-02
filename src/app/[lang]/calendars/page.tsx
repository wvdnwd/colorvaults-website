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
      ? 'Free Printable 2026 & 2027 Coloring Calendars (12-Month PDF Bundle) | ColorVaults'
      : 'Gratis Printbare 2026 & 2027 Kleurkalender (12 Maanden PDF Bundel) | ColorVaults',
    description: isEn
      ? 'Download and print our free 12-month printable coloring calendar for 2026 and 2027! Includes cute monthly coloring headers and planning grids for kids, classrooms, and home.'
      : 'Download en print onze gratis 12-maanden jaarkalender voor 2026 en 2027! Met vrolijke kleurplaat-koppen en handige maandvakken voor kinderen, scholen en thuis.',
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
            📅 {isEn ? '2026 & 2027 Annual Printables' : '2026 & 2027 Jaaruitgaven'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn ? 'Free Printable Coloring Calendars' : 'Gratis Printbare Kleurkalenders'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isEn
              ? 'Stay organized all year round with our full 12-month printable coloring calendar! Print the entire year in 1 click or download individual monthly planning sheets.'
              : 'Blijf het hele jaar door georganiseerd met onze complete 12-maanden kleurkalender! Print het hele jaar in 1 klik uit of print losse maandbladen voor thuis of in de klas.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <PrintableCalendarGrid
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