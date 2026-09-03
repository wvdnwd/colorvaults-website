'use client';

import { useState } from'react';
import styles from'./FaqSection.module.css';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection({ isEn }: { isEn: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = isEn
    ? [
        {
          question:'Are all coloring pages on ColorVaults really 100% free to print?',
          answer:'Yes! Every single coloring page on ColorVaults is completely free to download, print, or color online. There are no paywalls, no subscriptions, and no user registration required. You can print unlimited copies for personal use, at home, or in classrooms.'},
        {
          question:'What is the best paper and printer setting for printing coloring pages?',
          answer:'All our coloring pages are formatted in high-definition (300 DPI) for standard A4 and US Letter paper. For best results, choose"Fit to Printable Area"or"100% Scale"with 0 margins in your printer settings. Standard 80gsm copy paper is great for crayons and colored pencils, while 120-160gsm cardstock is recommended for alcohol markers and watercolors to prevent bleed-through.'},
        {
          question:'Can teachers use these coloring sheets in school and daycare classrooms?',
          answer:'Absolutely! Teachers, daycare educators, homeschoolers, and therapists are welcome to print our educational templates, alphabet sheets, animal diagrams, and seasonal holiday pages for classroom activities, lesson plans, and group crafts.'},
        {
          question:'How do I download high-resolution PDF or PNG image templates?',
          answer:'Simply click on any coloring page card to open its detail view. You can use the"Print Free Coloring Page"button for instant browser printing, or click"Download Image File"to save a clean, high-resolution watermarked file ready for digital apps like Procreate or offline printing.'},
        {
          question:'Do you offer complex adult coloring pages and mindfulness mandalas?',
          answer:'Yes! We have hundreds of intricate adult coloring pages, including sacred geometry mandalas, Art Nouveau floral patterns, fantasy architecture, and mindfulness anti-stress line art in our"Art & Aesthetic"and"Mandalas"categories.'},
        {
          question:'How often are new coloring pages and character themes added?',
          answer:'We continuously expand our vault with new trending characters, animated series, superhero sagas, seasonal festivals (Christmas, Halloween, Easter, Sinterklaas), and nature collections every week.'}
      ]
    : [
        {
          question:'Zijn alle kleurplaten op ColorVaults echt 100% gratis om te printen?',
          answer:'Ja, absoluut! Elke kleurplaat op ColorVaults is volledig gratis te downloaden, uit te printen of direct online in te kleuren. Er zijn geen verborgen kosten, geen abonnementen en je hoeft geen account aan te maken. Je mag onbeperkt printen voor thuis, op school of bij de opvang.'},
        {
          question:'Wat is de beste printerinstelling en papiersoort voor het afdrukken?',
          answer:'Onze kleurplaten zijn geoptimaliseerd in hoge resolutie (300 DPI) voor standaard A4-formaat. Stel in je printerdialoog de schaal in op"100%"of"Aanpassen aan afdrukbaar gebied"zonder marges. Normaal 80 grams printerpapier is ideaal voor kleurpotloden en wasco, terwijl 120-160 grams dikker papier perfect is voor viltstiften en waterverf tegen doordrukken.'},
        {
          question:'Mogen leerkrachten en basisscholen deze kleurplaten in de klas gebruiken?',
          answer:'Zeker weten! Leerkrachten, gastouders, kinderopvanglocaties en BSO\'s mogen onze educatieve sjablonen, dierenplaten, seizoenskleurplaten en themaplaten vrij gebruiken voor knutselactiviteiten, weekthema\'s en feestdagen in de klas.'},
        {
          question:'Hoe kan ik een kleurplaat opslaan als PDF of hoge resolutie afbeelding?',
          answer:'Klik op een gewenste kleurplaat om de detailpagina te openen. Klik vervolgens op"Gratis Kleurplaat Printen"om direct via je browser af te drukken, of op"Download Afbeelding"om de hoge resolutie afbeelding direct op te slaan op je telefoon, tablet of computer.'},
        {
          question:'Zijn er ook moeilijke mandala\'s en kleurplaten voor volwassenen (anti-stress)?',
          answer:'Ja! Wij hebben honderden gedetailleerde kleurplaten voor volwassenen, waaronder ingewikkelde bloemenmandala\'s, Art Nouveau kunstplaten, geometrische patronen en ontspannende mindfulness lijntekeningen in de categorie"Kunst & Mandala\'s".'},
        {
          question:'Hoe vaak worden er nieuwe kleurplaten en karakters toegevoegd?',
          answer:'Onze collectie wordt wekelijks aangevuld met nieuwe populaire karakters, kinderseries, superhelden, seizoensfeesten (Sinterklaas, Kerstmis, Halloween, Pasen) en educatieve sjablonen.'}
      ];

  const jsonLdFaq = {'@context':'https://schema.org','@type':'FAQPage',
    mainEntity: faqs.map(item => ({'@type':'Question',
      name: item.question,
      acceptedAnswer: {'@type':'Answer',
        text: item.answer,
      }
    }))
  };

  return (
    <section className={styles.faqSection}>
      <script
        type="application/ld+json"dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className="container">
        <div className={styles.faqHeader}>
          <span className="badge">
            {isEn ?'Frequently Asked Questions':'Veelgestelde Vragen'}
          </span>
          <h2 className="title-h2"style={{ marginTop:'0.65rem'}}>
            {isEn ?'Everything You Need to Know About Printing & Coloring':'Alles over Gratis Kleurplaten Downloaden & Printen'}
          </h2>
          <p style={{ color:'var(--gray-600)', maxWidth:'640px', margin:'0.6rem auto 0', lineHeight: 1.6 }}>
            {isEn
              ?'Find answers to common questions about paper sizes, printer settings, educational use, and adult mindfulness coloring.':'Vind antwoorden op vragen over printerinstellingen, A4-formaat, gebruik in de klas en ontspannend kleuren voor volwassenen.'}
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen :''}`}
              >
                <button
                  type="button"className={styles.faqQuestionBtn}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <span className={styles.toggleIcon}>{isOpen ?'−':'+'}</span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
