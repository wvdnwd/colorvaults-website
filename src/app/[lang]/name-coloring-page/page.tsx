import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdSlot from '@/components/AdSlot';
import NewsletterBox from '@/components/NewsletterBox';
import NameColoringStudio from '@/components/NameColoringStudio';
import { VALID_LOCALES } from '@/lib/site';
import { createMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return VALID_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang !== 'nl';

  const title = isEn
    ? 'Free Name Coloring Page Generator (Printable A4 PDF) | ColorVaults'
    : 'Gratis Naam-Kleurplaat Maken & Printen (A4 PDF) | ColorVaults';

  const description = isEn
    ? 'Create your custom personalized name coloring page for free! Type any name in hollow bubble letters with dinosaurs, unicorns, puppies & birthday themes. Instant A4 PDF download!'
    : 'Maak gratis je eigen gepersonaliseerde naam-kleurplaat! Typ een voornaam in grote inkleur-bubble-letters met dinosauriërs, eenhoorns, puppy’s en feestthema’s. Direct printen of downloaden als A4 PDF!';

  return createMetadata({
    lang,
    path: '/name-coloring-page',
    title,
    description,
  });
}

export default async function NameColoringPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang !== 'nl';

  return (
    <>
      <div
        className="page-hero"
        style={{
          padding: '3.5rem 0 2.5rem',
          background: 'linear-gradient(180deg, #EEF2FF 0%, var(--background) 100%)',
          borderBottomColor: '#C7D2FE',
        }}
      >
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Breadcrumbs
              items={[{ label: isEn ? 'Name Coloring Page Generator' : 'Naam-Kleurplaat Maken' }]}
              lang={lang}
            />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(79, 70, 229, 0.12)',
              color: '#4F46E5',
              padding: '0.3rem 0.95rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            ✨ {isEn ? '100% Free Personalized Printable' : '100% Gratis Gepersonaliseerde Printables'}
          </span>

          <h1 className="title-h1" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.25, color: '#0F172A' }}>
            {isEn
              ? 'Free Name Coloring Page Generator'
              : 'Gratis Naam-Kleurplaat Maken & Printen'}
          </h1>

          <p
            style={{
              color: '#475569',
              fontSize: '1.08rem',
              marginTop: '0.8rem',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0.8rem auto 0',
            }}
          >
            {isEn
              ? 'Type any name or birthday message to create a personalized coloring sheet with big hollow bubble letters, surrounded by cute dinosaurs, unicorns, puppies, rockets, or birthday cakes!'
              : 'Typ een naam of verjaardagswens en maak direct een gepersonaliseerde kleurplaat met grote inkleur-letters, omringd door schattige dino’s, eenhoorns, puppy’s, raketten of taart!'}
          </p>
        </div>
      </div>

      <div className="container section">
        <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />

        <NameColoringStudio lang={lang} isEn={isEn} />

        <div style={{ marginTop: '3.5rem' }}>
          <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
        </div>

        {/* SEO Editorial block for Name Coloring Search Traffic */}
        <div className="seo-block" style={{ marginTop: '3rem' }}>
          <h2>{isEn ? 'How Does the Name Coloring Generator Work?' : 'Hoe Werkt de Naam-Kleurplaat Generator?'}</h2>
          <p>
            {isEn
              ? 'ColorVaults makes it easy to generate personalized coloring sheets for kids, toddlers, preschool classrooms, and birthday parties. Enter the child’s name, select their favorite artwork theme, and click "Download A4 PDF" or "Print Direct".'
              : 'Met de ColorVaults naamgenerator maak je binnen enkele seconden een unieke kleurplaat voor een kinderfeestje, in de klas of thuis aan de keukentafel. Typ de naam van het kind in, kies een favoriet thema en download direct een scherpe A4-PDF om in te kleuren!'}
          </p>

          <h3 style={{ marginTop: '1.5rem' }}>
            {isEn ? '💡 Popular Ideas for Name Coloring Sheets' : '💡 Leuke Ideeën voor een Kleurplaat op Naam'}
          </h3>
          <ul>
            <li>
              <strong>{isEn ? 'Birthday Parties:' : 'Kinderfeestjes:'}</strong>{' '}
              {isEn
                ? 'Print a personalized name sheet with the Birthday Cake theme for every little guest as a fun welcome activity!'
                : 'Print voor elk feestganger een eigen kleurplaat met verjaardagstaart en ballonnen als leuke binnenkomer!'}
            </li>
            <li>
              <strong>{isEn ? 'Classroom & School:' : 'In de Klas & Kleutergroep:'}</strong>{' '}
              {isEn
                ? 'Teachers can print custom sheets with each student’s name for the first week of school to practice letter recognition and fine motor skills.'
                : 'Leerkrachten kunnen voor de eerste schoolweken voor elk kind een eigen naamkleurplaat printen om letters te leren herkennen en de fijne motoriek te oefenen.'}
            </li>
            <li>
              <strong>{isEn ? 'Bedroom Poster:' : 'Kamerposter:'}</strong>{' '}
              {isEn
                ? 'After coloring in the big bubble letters, hang the artwork on the bedroom door or wall!'
                : 'Laat je kind de grote letters mooi inkleuren met stiften of glitters en hang hem daarna op de slaapkamerdeur!'}
            </li>
          </ul>
        </div>

        <NewsletterBox isEn={isEn} lang={lang} />
      </div>
    </>
  );
}
