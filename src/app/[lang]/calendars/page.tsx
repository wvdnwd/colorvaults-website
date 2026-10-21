import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import PrintableCalendarGrid from '@/components/PrintableCalendarGrid';
import { getCalendarYear } from '@/data/calendarData';

import { VALID_LOCALES } from '@/lib/site';
import { createMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return VALID_LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ year?: string }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const year = resolvedSearchParams?.year === '2027' ? 2027 : 2026;
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const title = isDe
    ? `Kostenloser Ausmal-Kalender Generator ${year} | ColorVaults`
    : isFr
    ? `Créateur de Calendrier de Coloriage Gratuit ${year} | ColorVaults`
    : isEn
    ? `Free Printable Coloring Calendar Maker ${year} | ColorVaults`
    : `Gratis kleurkalender ${year} maken en printen | ColorVaults`;

  const description = isDe
    ? `Erstelle und drucke deinen kostenlosen 12-Monate Ausmal-Kalender für ${year}. Wähle deine Lieblingsmotive und drucke direkt im DIN A4 Format.`
    : isFr
    ? `Créez et imprimez votre calendrier de coloriage personnalisé 12 mois pour ${year}. Gratuit au format A4.`
    : isEn
    ? `Create and print your free 12-month custom coloring calendar for ${year}. Choose favorite designs, add notes, and print in clean A4 / Letter format.`
    : `Maak en print je eigen gratis 12-maanden kleurkalender voor ${year}. Kies je favoriete tekeningen en print direct in A4-formaat.`;

  return createMetadata({
    lang,
    path: `/calendars${year === 2027 ? '?year=2027' : ''}`,
    title,
    description,
  });
}

export default async function CalendarsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ year?: string }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const year = resolvedSearchParams?.year === '2027' ? 2027 : 2026;
  const isEn = lang === 'en';
  const calendarData = getCalendarYear(year);

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #F0FDF4 0%, var(--background) 100%)', borderBottomColor: '#BBF7D0' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isEn ? `Coloring Calendars ${year}` : `Kleurkalenders ${year}` }]}
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
            {isEn ? `🎨 Custom 12-Month Calendar Maker ${year} (18,000+ Designs)` : `🎨 Maak Je Eigen 12-Maanden Kalender ${year} (18.000+ Kleurplaten)`}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {lang === 'de'
              ? `Kostenloser Ausmal-Kalender Generator ${year}`
              : lang === 'fr'
              ? `Créateur de Calendrier de Coloriage Gratuit ${year}`
              : isEn
              ? `Free Printable Coloring Calendar Maker ${year}`
              : `Gratis kleurkalender ${year} maken en printen`}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isEn
              ? `Create and print your personalized 12-month coloring calendar for ${year}! Customize each month with your favorite drawings from 18,000+ pages and print the complete year in 1 click.`
              : `Stel je eigen gepersonaliseerde 12-maanden kleurkalender voor ${year} samen! Kies voor elke maand zelf je favoriete tekening uit 18.000+ kleurplaten en print het hele jaar in 1 klik uit.`}
          </p>

          {/* Year Switcher Pills */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#FFFFFF',
            padding: '0.35rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0',
            marginTop: '1.5rem',
            gap: '0.35rem',
          }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B', padding: '0 0.5rem 0 0.75rem' }}>
              {isEn ? 'Year:' : 'Kalenderjaar:'}
            </span>
            <Link
              href={`/${lang}/calendars?year=2026`}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 800,
                textDecoration: 'none',
                background: year === 2026 ? '#16A34A' : 'transparent',
                color: year === 2026 ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📅 2026
            </Link>
            <Link
              href={`/${lang}/calendars?year=2027`}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 800,
                textDecoration: 'none',
                background: year === 2027 ? '#16A34A' : 'transparent',
                color: year === 2027 ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease',
              }}
            >
              📅 2027 {isEn ? '(Preview)' : '(Nieuw)'}
            </Link>
          </div>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <PrintableCalendarGrid
          themes={calendarData.themes}
          months={calendarData.months}
          year={year}
          isEn={isEn}
          lang={lang}
        />

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </> 
  );
}
