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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isFr = lang === 'fr';

  const title = isDe
    ? 'Kostenloser Ausmal-Kalender Generator | ColorVaults'
    : isFr
    ? 'Créateur de Calendrier de Coloriage Gratuit | ColorVaults'
    : isEn
    ? 'Free Printable Coloring Calendar Maker | ColorVaults'
    : 'Gratis kleurkalender maken en printen | ColorVaults';

  const description = isDe
    ? 'Erstelle und drucke deinen kostenlosen 12-Monate Ausmal-Kalender für 2026. Wähle deine Lieblingsmotive und drucke direkt im DIN A4 Format.'
    : isFr
    ? 'Créez et imprimez votre calendrier de coloriage personnalisé 12 mois pour 2026. Gratuit au format A4.'
    : isEn
    ? 'Create and print your free 12-month custom coloring calendar for 2026. Choose favorite designs, add notes, and print in clean A4 / Letter format.'
    : 'Maak en print je eigen gratis 12-maanden kleurkalender voor 2026. Kies je favoriete tekeningen en print direct in A4-formaat.';

  return createMetadata({
    lang,
    path: '/calendars',
    title,
    description,
  });
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
            {lang === 'de'
              ? 'Kostenloser Ausmal-Kalender Generator'
              : lang === 'fr'
              ? 'Créateur de Calendrier de Coloriage Gratuit'
              : isEn
              ? 'Free Printable Coloring Calendar Maker'
              : 'Gratis kleurkalender maken en printen'}
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