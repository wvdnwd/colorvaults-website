import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import AdCard from '@/components/AdCard';
import NewsletterBox from '@/components/NewsletterBox';
import SchoolWorksheetCard from '@/components/SchoolWorksheetCard';
import { SCHOOL_WORKSHEETS_DATA } from '@/data/schoolData';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn
      ? 'School & Educational Worksheets (Math, Letters, Spelling) | ColorVaults'
      : 'School & Educatieve Werkbladen (Rekenen, Schrijven, Woorden) | ColorVaults',
    description: isEn
      ? 'Download 100+ free printable educational coloring worksheets for kids! Math sums, letter tracing A-Z, handwriting practice, and bilingual vocabulary.'
      : 'Download 100+ gratis printbare educatieve werkbladen voor kinderen! Rekensommen, letters schrijven A-Z, woordenschat en kleuren.',
  };
}

export default async function SchoolHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const mathWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'math');
  const writingWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'writing');
  const langWorksheets = SCHOOL_WORKSHEETS_DATA.filter(w => w.subject === 'language');

  const categories = [
    {
      id: 'math',
      title: isEn ? '🧮 Math & Numbers' : '🧮 Rekenen & Cijfers',
      desc: isEn ? 'Numbers 1-10, addition, subtraction, shapes, telling time, and fractions' : 'Cijfers 1-10, optellen, aftrekken, vormen, klokkijken en breuken',
      items: mathWorksheets,
      badge: isEn ? '35 Math Sheets' : '35 Rekenbladen'
    },
    {
      id: 'writing',
      title: isEn ? '🔤 Handwriting & Alphabet A-Z' : '🔤 Letters Schrijven & Alfabet A-Z',
      desc: isEn ? 'Alphabet A to Z letter tracing, stroke guides, handwriting lines, and phonics' : 'Alfabet A t/m Z overtrekken, schrijfregels, klinkers en motoriek',
      items: writingWorksheets,
      badge: isEn ? '35 Writing Sheets' : '35 Schrijfbladen'
    },
    {
      id: 'language',
      title: isEn ? '📖 Vocabulary & Spelling (Bilingual NL/EN)' : '📖 Woordenschat & Spellen (Tweetalig)',
      desc: isEn ? 'Colors, emotions, body parts, 4 seasons, animals, rhyming words, and word searches' : "Kleuren, emoties, seizoenen, rijmwoorden, woordzoekers en diploma's",
      items: langWorksheets,
      badge: isEn ? '30 Language Sheets' : '30 Taalbladen'
    }
  ];

  return (
    <>
      <div className="page-hero" style={{ padding: '3.5rem 0 2.5rem', background: 'linear-gradient(180deg, #FEF3C7 0%, var(--background) 100%)', borderBottomColor: '#FDE68A' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isEn ? 'School & Education' : 'School & Educatie' }]}
              lang={lang}
            />
          </div>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(217, 119, 6, 0.15)',
            color: '#B45309',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            {isEn ? '🎓 Educational Learning Hub' : '🎓 Educatieve Leerhub voor Kinderen'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn ? 'School, Math & Handwriting Worksheets' : 'School, Rekenen & Letters Schrijven'}
          </h1>

          <p style={{ color: '#475569', fontSize: '1.1rem', marginTop: '0.8rem', lineHeight: 1.7, maxWidth: '680px', margin: '0.8rem auto 0' }}>
            {isEn
              ? '100 free printable educational worksheets for preschool, kindergarten, and elementary school! Practice math counting, letter tracing A to Z, and bilingual vocabulary.'
              : '100 gratis printbare educatieve werkbladen voor peuters, kleuters en de basisschool! Oefen met tellen, sommen maken, letters schrijven en woordjes leren.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        {categories.map((cat, catIdx) => (
          <React.Fragment key={cat.id}>
            <section style={{ marginBottom: '4rem' }}>
              <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>
                    {cat.badge}
                  </span>
                  <h2 className="title-h2" style={{ marginTop: '0.5rem' }}>{cat.title}</h2>
                  <p style={{ color: '#64748B', marginTop: '0.25rem', fontSize: '0.95rem' }}>{cat.desc}</p>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '1.5rem',
              }}>
                {cat.items.map((sheet, idx) => (
                  <React.Fragment key={sheet.slug}>
                    {idx === 5 && <AdCard key={'ad-school-' + cat.id} />}
                    <SchoolWorksheetCard sheet={sheet} isEn={isEn} />
                  </React.Fragment>
                ))}
              </div>
            </section>

            {catIdx < categories.length - 1 && (
              <div style={{ margin: '3rem 0' }}>
                <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
              </div>
            )}
          </React.Fragment>
        ))}

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
