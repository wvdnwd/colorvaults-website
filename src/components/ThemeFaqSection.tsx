'use client';

import React, { useState } from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface ThemeFaqSectionProps {
  themeTitle: string;
  isEn: boolean;
  hubSlug?: string;
  themeSlug?: string;
}

export default function ThemeFaqSection({ themeTitle, isEn, hubSlug = '', themeSlug = '' }: ThemeFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const slug = (themeSlug || '').toLowerCase();
  const hub = (hubSlug || '').toLowerCase();

  const isMandala = slug.includes('mandala') || slug.includes('pattern') || hub.includes('mandala');
  const isCharacter = hub.includes('disney') || hub.includes('anime') || hub.includes('gaming') || hub.includes('superhero') || hub.includes('kids-tv') || slug.includes('pokemon') || slug.includes('stitch') || slug.includes('mario') || slug.includes('sonic');
  const isAnimal = hub.includes('animal') || slug.includes('dino') || slug.includes('dog') || slug.includes('cat');

  const getGenreFaqs = (): FaqItem[] => {
    if (isMandala) {
      return isEn ? [
        {
          question: `Are these ${themeTitle} coloring pages suitable for adult stress relief and mindfulness?`,
          answer: `Yes! Our mandala collection features intricate sacred geometry, floral symmetries, and fine circular designs specifically formatted for adult relaxation, art therapy, and mindfulness meditation.`,
        },
        {
          question: `What pens and markers work best for intricate mandala lines?`,
          answer: `Fine-liner pens (0.3mm to 0.5mm), gel pens (metallic and glitter), and dual-brush watercolor markers work wonderfully. If using alcohol-based markers like Copics, we recommend placing a blank backing sheet or printing on 160+ gsm paper to prevent bleeding.`,
        },
      ] : [
        {
          question: `Zijn deze ${themeTitle} kleurplaten geschikt voor volwassenen en ontspanning?`,
          answer: `Zeker weten! Onze mandala's hebben fijne geometrische patronen en bloemensymmetrieën die speciaal zijn ontworpen voor ontspanning, mindfulness en anti-stress kleurtherapie bij volwassenen en jongeren.`,
        },
        {
          question: `Welke pennen en stiften werken het beste voor gedetailleerde mandala's?`,
          answer: `Fineliners (0.3 tot 0.5 mm), metallic gelpennen en brushpennen geven het mooiste resultaat. Gebruik je alcoholmarkers? Leg dan even een extra leeg vel achter je kleurplaat of print op 160 grams papier.`,
        },
      ];
    }

    if (isCharacter) {
      return isEn ? [
        {
          question: `Can I print these ${themeTitle} pages for a themed birthday party?`,
          answer: `Yes, absolutely! Many parents and party organizers print sets of our ${themeTitle} sheets to set up a craft coloring table, slip into goodie treat bags, or hand out as fun party activity games.`,
        },
        {
          question: `Which characters and styles are included in this ${themeTitle} collection?`,
          answer: `Our library covers a wide variety of character poses, action-packed scenes, cute chibi designs for younger kids, and detailed dynamic artwork for older fans and teens.`,
        },
      ] : [
        {
          question: `Kan ik deze ${themeTitle} kleurplaten printen voor een kinderfeestje?`,
          answer: `Ja, heel graag! Veel ouders en leerkrachten printen stapels ${themeTitle} platen voor een gezellige knutseltafel, als activiteit tijdens verjaardagsfeestjes of om mee te geven in traktatiezakjes.`,
        },
        {
          question: `Welke personages en stijlen zitten er in deze ${themeTitle} verzameling?`,
          answer: `Je vindt een gevarieerde mix van vrolijke poses, actiescènes, makkelijke tekeningen voor peuters en kleuters en gedetailleerde scènes voor oudere kinderen en tieners.`,
        },
      ];
    }

    if (isAnimal) {
      return isEn ? [
        {
          question: `Can teachers use these ${themeTitle} coloring sheets for science & nature lessons?`,
          answer: `Yes! Our wildlife and prehistoric sheets are widely used in preschools and elementary classrooms to accompany lessons about animal habitats, biology, paleontology, and environmental awareness.`,
        },
      ] : [
        {
          question: `Mogen juffen en meesters deze ${themeTitle} kleurplaten gebruiken voor natuurlessen?`,
          answer: `Ja, absoluut! Onze dieren- en natuurkleurplaten worden veelvuldig gebruikt in het basisonderwijs en op de kinderopvang bij themaweken over dieren, de seizoenen en het milieu.`,
        },
      ];
    }

    return [];
  };

  const baseFaqs: FaqItem[] = isEn ? [
    {
      question: `Are these ${themeTitle} coloring pages 100% free to print?`,
      answer: `Yes! Every single ${themeTitle} coloring page in our library is 100% free for personal, family, and educational use. There are no subscriptions, paywalls, or account registrations required. You can print as many copies as you like.`,
    },
    ...getGenreFaqs(),
    {
      question: `What paper size is recommended for best print quality?`,
      answer: `All our line art coloring sheets are rendered in high-resolution (300 DPI) and formatted to fit both standard international A4 and US Letter (8.5 x 11 inch) paper. For standard coloring, regular 80 gsm printer paper works wonderfully. For markers, watercolors, or crafts, we recommend 120–160 gsm cardstock to prevent bleed-through.`,
    },
    {
      question: `Can teachers and educators use these in classrooms and daycare?`,
      answer: `Absolutely! We enthusiastically support teachers, homeschoolers, daycare educators, and community organizers. You are welcome to print multiple copies for classroom activities, lesson plans, rainy-day recess, and art corners.`,
    },
    {
      question: `Can my child color these online without a printer?`,
      answer: `Yes! ColorVaults features an interactive Online Coloring Studio. Simply click the "Color Online" button on any ${themeTitle} page to start coloring directly on your iPad, tablet, smartphone, or laptop with digital fill buckets, brushes, and color palettes.`,
    },
    {
      question: `How do I bundle multiple ${themeTitle} pages into a custom coloring book?`,
      answer: `Click the "+ Bundle" button on any coloring page to add it to your custom bundle. Once you have selected your favorite sheets (e.g. 5, 10, or 20 pages), open the floating bundle bar at the bottom of your screen to download one unified, beautifully formatted PDF coloring book with a custom cover!`,
    },
    {
      question: `How do I print without black edges or cut-off borders?`,
      answer: `In your browser or printer dialog, ensure the print scale is set to "Fit to Printable Area" or "Fit to Page" (100% scale), and choose portrait orientation. This guarantees clean borders and full-margin clarity on all printer models.`,
    },
  ] : [
    {
      question: `Zijn deze ${themeTitle} kleurplaten echt 100% gratis te printen?`,
      answer: `Ja, absoluut! Alle ${themeTitle} kleurplaten op ColorVaults zijn 100% gratis te downloaden en te printen voor thuis, op school of op de opvang. Er zijn geen abonnementen, verborgen kosten of verplichte accounts nodig.`,
    },
    ...getGenreFaqs(),
    {
      question: `Welk papier en printerformaat is het beste om te gebruiken?`,
      answer: `Onze kleurplaten zijn ontworpen in haarscherpe 300 DPI resolutie en geoptimaliseerd voor standaard A4-formaat (en US Letter). Voor potloden en waskrijtjes volstaat standaard printpapier (80 g/m²). Ga je aan de slag met viltstiften, waterverf of knutselwerkjes? Dan adviseren we steviger papier van 120–160 g/m² om doordrukken te voorkomen.`,
    },
    {
      question: `Mogen leerkrachten en kinderopvang deze kleurplaten in de klas gebruiken?`,
      answer: `Zeker weten! Wij moedigen juffen, meesters, gastouders en bso-begeleiders van harte aan om onze kleurplaten te gebruiken als educatief lesmateriaal, ontspanning tussen de lessen door of voor creatieve themaweken.`,
    },
    {
      question: `Kan mijn kind deze kleurplaten ook digitaal inkleuren zonder printer?`,
      answer: `Ja! ColorVaults heeft een ingebouwde interactieve Online Kleurtool. Klik bij een ${themeTitle} kleurplaat op "Online Inkleuren" om direct op een tablet, iPad of telefoon te kleuren met verfemmers, kwasten en een rijk kleurenpalet.`,
    },
    {
      question: `Hoe stel ik mijn eigen ${themeTitle} kleurboek samen?`,
      answer: `Klik op de knop "+ Bundel" bij de gewenste kleurplaten. Ze worden verzameld in je persoonlijke kleurboek. Klik onderaan het scherm op de zwevende bundelbalk om in 1 klik één compleet PDF-kleurboek met een mooie voorpagina te downloaden!`,
    },
    {
      question: `Hoe print ik de kleurplaat netjes paginavullend zonder afgesneden randen?`,
      answer: `Selecteer in het printmenu van je browser de optie "Aanpassen aan pagina" (of "Fit to printable area") met staande afdrukstand (portrait). Hiermee worden de lijnen automatisch perfect gecentreerd afgedrukt.`,
    },
  ];

  const faqs: FaqItem[] = baseFaqs;

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section 
      style={{
        marginTop: '3.5rem',
        background: '#FFFFFF',
        borderRadius: '28px',
        padding: '2.5rem 2.25rem',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 12px 36px rgba(15, 23, 42, 0.05)',
      }}
      aria-label={isEn ? 'Frequently Asked Questions' : 'Veelgestelde Vragen'}
    >
      {/* Schema.org FAQPage Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(79, 70, 229, 0.1)',
          color: '#4F46E5',
          padding: '0.35rem 0.95rem',
          borderRadius: '9999px',
          fontWeight: 800,
          fontSize: '0.82rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08)',
        }}>
          <span aria-hidden="true">💡</span>
          {isEn ? 'Questions & Help' : 'Vragen & Hulp'}
        </span>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
          fontWeight: 900,
          color: '#0F172A',
          marginTop: '0.75rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
        }}>
          {isEn ? `Frequently Asked Questions About ${themeTitle} Coloring Pages` : `Veelgestelde Vragen over ${themeTitle} Kleurplaten`}
        </h2>
        <p style={{ color: '#475569', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.65, maxWidth: '800px' }}>
          {isEn
            ? `Everything parents, educators, and colorists need to know about printing, downloading, and classroom use:`
            : `Alles wat ouders, leerkrachten en kinderen willen weten over het downloaden, printen en gebruiken van deze tekeningen:`}
        </p>
      </div>

      {/* Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              style={{
                borderRadius: '18px',
                border: isOpen ? '1.5px solid #C7D2FE' : '1px solid #E2E8F0',
                background: isOpen ? '#F5F3FF' : '#F8FAFC',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer',
                  fontSize: '1.025rem',
                  fontWeight: 800,
                  color: isOpen ? '#4338CA' : '#0F172A',
                }}
              >
                <span>{faq.question}</span>
                <span 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: isOpen ? '#4F46E5' : '#E2E8F0',
                    color: isOpen ? '#FFFFFF' : '#475569',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                    transition: 'transform 0.25s ease, background 0.2s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>

              {isOpen && (
                <div 
                  style={{
                    padding: '0 1.4rem 1.35rem',
                    color: '#334155',
                    fontSize: '0.96rem',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(199, 210, 254, 0.4)',
                    paddingTop: '0.95rem',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
