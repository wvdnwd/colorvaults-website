import React from 'react';
import { getCraftIdeas } from '@/lib/craftIdeas';
import styles from './CraftIdeasSection.module.css';

interface Props {
  // Support both page-level and theme-level props seamlessly!
  pageTitle?: string;
  themeTitle?: string;
  parentHub?: string;
  ageGroup?: string;
  hubSlug?: string;
  themeSlug?: string;
  lang?: string;
  isEn?: boolean;
}

const HUB_BADGES: Record<string, Record<string, string>> = {
  'animals-wildlife': {
    nl: '🐾 12 Dieren & Safari Knutselideeën',
    en: '🐾 12 Animal & Wildlife Craft Activities',
    de: '🐾 12 Tier- & Natur-Bastelideen',
    fr: '🐾 12 Activités & Bricolages Animaux Sauvages'
  },
  'vehicles-transportation': {
    nl: '🏎️ 12 Race & Voertuigen Knutseltips',
    en: '🏎️ 12 Vehicle & Racing Craft Activities',
    de: '🏎️ 12 Renn- & Fahrzeug-Bastelideen',
    fr: '🏎️ 12 Bricolages Véhicules & Circuits de Course'
  },
  'fantasy-fairytales': {
    nl: '✨ 12 Magische Sprookjes Knutselideeën',
    en: '✨ 12 Magical Fairy Tale Craft Ideas',
    de: '✨ 12 Magische Märchen-Bastelideen',
    fr: '✨ 12 Bricolages Magiques & Contes de Fées'
  },
  'disney-pixar': {
    nl: '👑 12 Magische Kasteel & Karakter Ideeën',
    en: '👑 12 Magical Castle & Character Crafts',
    de: '👑 12 Schloss- & Märchen-Bastelideen',
    fr: '👑 12 Bricolages Royaux & Personnages Magiques'
  },
  'art-aesthetic': {
    nl: '🧘 12 Mindful Mandala & Zen Kunstideeën',
    en: '🧘 12 Mindful Mandala & Zen Art Activities',
    de: '🧘 12 Achtsame Mandala- & Zen-Bastelideen',
    fr: '🧘 12 Activités Zen & Mandalas Méditatifs'
  },
  'gaming-virtual-worlds': {
    nl: '🎮 12 Gaming & Arcade DIY Projecten',
    en: '🎮 12 Gaming & Arcade DIY Craft Quests',
    de: '🎮 12 Gaming- & Arcade-Bastelprojekte',
    fr: '🎮 12 Quêtes & Bricolages Rétro Gaming'
  },
  'superheroes-comic-universes': {
    nl: '⚡ 12 Superhelden & Comic Actieprojecten',
    en: '⚡ 12 Superhero & Comic Action Projects',
    de: '⚡ 12 Superhelden- & Comic-Mitmachideen',
    fr: '⚡ 12 Missions & Bricolages Super-Héros'
  },
  'anime-manga': {
    nl: '⚡ 12 Anime & Manga Creatieve Projecten',
    en: '⚡ 12 Anime & Manga Creative DIY Projects',
    de: '⚡ 12 Anime- & Manga-Kreativideen',
    fr: '⚡ 12 Créations Manga & Projets Otaku'
  },
  'holidays-seasons': {
    nl: '🎉 12 Feestdagen & Seizoensknutsels',
    en: '🎉 12 Holiday & Seasonal Celebration Crafts',
    de: '🎉 12 Feiertags- & Jahreszeiten-Basteltipps',
    fr: '🎉 12 Bricolages Festifs de Saison & Réveillon'
  },
  'kids-tv-shows': {
    nl: '🧸 12 Peuter- & Kleuter Doe-Activiteiten',
    en: '🧸 12 Toddler & Preschool Fun Activities',
    de: '🧸 12 Mitmach-Aktivitäten für Kleinkinder',
    fr: '🧸 12 Activités Mignonnes pour Tout-Petits'
  }
};

const UI_STRINGS: Record<string, {
  defaultBadge: string;
  heading: string;
  subheading: string;
  materialsNeeded: string;
  showSteps: string;
  difficultyLabel: string;
}> = {
  nl: {
    defaultBadge: '💡 12 Creatieve Knutsel Ideeën',
    heading: '12 Leuke Dingen Om Te Doen Met Deze Kleurplaat',
    subheading: 'Klaar met inkleuren? Gooi je meesterwerk niet weg! Hier zijn 12 geweldige, originele knutselprojecten en spelletjes die je kunt maken met deze {TITLE} kleurplaat.',
    materialsNeeded: 'Benodigdheden',
    showSteps: 'Bekijk stappenplan',
    difficultyLabel: 'Niveau'
  },
  en: {
    defaultBadge: '💡 12 Creative Craft Activities',
    heading: '12 Fun Things To Do With This Coloring Page',
    subheading: 'Finished coloring? Don’t let your masterpiece go to waste! Here are 12 original, hands-on craft projects and games you can make with this {TITLE} coloring sheet.',
    materialsNeeded: 'Supplies Needed',
    showSteps: 'View step-by-step guide',
    difficultyLabel: 'Level'
  },
  de: {
    defaultBadge: '💡 12 Kreative Bastelideen',
    heading: '12 Tolle Bastel- und Spielideen mit diesem Bild',
    subheading: 'Fertig ausgemalt? Werfe dein Meisterwerk nicht weg! Hier sind 12 originelle Bastelideen und Spiele für deine {TITLE} Malvorlage.',
    materialsNeeded: 'Benötigte Materialien',
    showSteps: 'Schritt-für-Schritt Anleitung',
    difficultyLabel: 'Schwierigkeit'
  },
  fr: {
    defaultBadge: '💡 12 Idées de Bricolage Créatives',
    heading: '12 Choses Amusantes à Faire avec ce Coloriage',
    subheading: 'Votre coloriage est terminé? Ne le laissez pas traîner! Voici 12 projets créatifs manuels et jeux originaux à fabriquer avec ce coloriage {TITLE}.',
    materialsNeeded: 'Matériel nécessaire',
    showSteps: 'Voir les étapes détaillées',
    difficultyLabel: 'Difficulté'
  }
};

export default function CraftIdeasSection({
  pageTitle,
  themeTitle,
  parentHub,
  ageGroup,
  hubSlug,
  themeSlug,
  lang = 'nl',
  isEn = false
}: Props) {
  const currentLang = ['nl', 'en', 'de', 'fr'].includes(lang) ? lang : (isEn ? 'en' : 'nl');
  const t = UI_STRINGS[currentLang] || UI_STRINGS.nl;
  const effectiveTitle = pageTitle || themeTitle || (currentLang === 'en' ? 'Coloring Page' : 'Kleurplaat');
  const effectiveHub = parentHub || hubSlug;
  const ideas = getCraftIdeas(effectiveTitle, effectiveHub, ageGroup, currentLang);

  const headingText = t.heading.replace(/{TITLE}/g, effectiveTitle);
  const subheadText = t.subheading.replace(/{TITLE}/g, effectiveTitle);
  
  // Theme-specific badge
  const categoryBadge = (effectiveHub && HUB_BADGES[effectiveHub] && HUB_BADGES[effectiveHub][currentLang]) 
    ? HUB_BADGES[effectiveHub][currentLang] 
    : t.defaultBadge;

  return (
    <section className={styles.container} aria-label={headingText}>
      <div className={styles.header}>
        <div className={styles.topBadge}>
          <span>{categoryBadge}</span>
        </div>
        <h2 className={styles.title}>{headingText}</h2>
        <p className={styles.subtitle}>{subheadText}</p>
      </div>

      <div className={styles.grid}>
        {ideas.map((craft) => (
          <article key={craft.number} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.badgeGroup}>
                <span className={styles.numberBadge}>
                  #{craft.number < 10 ? `0${craft.number}` : craft.number}
                </span>
                <span className={styles.tagBadge}>{craft.tag}</span>
              </div>
              <div className={styles.metaBadge}>
                <span>⏱️ {craft.estimatedTime}</span>
                <span>•</span>
                <span>{craft.difficulty}</span>
              </div>
            </div>

            <div className={styles.cardTitleArea}>
              <span className={styles.cardIcon} aria-hidden="true">{craft.icon}</span>
              <h3 className={styles.cardTitle}>{craft.title}</h3>
            </div>

            <p className={styles.cardDesc}>{craft.description}</p>

            <div className={styles.materialsSection}>
              <div className={styles.sectionLabel}>
                <span>✂️</span>
                <span>{t.materialsNeeded}</span>
              </div>
              <ul className={styles.materialsList}>
                {craft.materials.map((item, mIdx) => (
                  <li key={mIdx} className={styles.materialPill}>{item}</li>
                ))}
              </ul>
            </div>

            <details className={styles.stepsDetails}>
              <summary className={styles.stepsSummary}>
                <span>👉</span>
                <span>{t.showSteps} ({craft.steps.length})</span>
              </summary>
              <ol className={styles.stepsList}>
                {craft.steps.map((step, sIdx) => (
                  <li key={sIdx} className={styles.stepItem}>{step}</li>
                ))}
              </ol>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}