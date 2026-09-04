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

const UI_STRINGS: Record<string, {
  badge: string;
  heading: string;
  subheading: string;
  materialsNeeded: string;
  showSteps: string;
  difficultyLabel: string;
}> = {
  nl: {
    badge: '12 Creatieve Knutsel Ideeën',
    heading: '12 Leuke Dingen Om Te Doen Met Deze Kleurplaat',
    subheading: 'Klaar met inkleuren? Gooi je meesterwerk niet weg! Hier zijn 12 geweldige, originele knutselprojecten en spelletjes die je kunt maken met deze {TITLE} kleurplaat.',
    materialsNeeded: 'Benodigdheden',
    showSteps: 'Bekijk stappenplan',
    difficultyLabel: 'Niveau'
  },
  en: {
    badge: '12 Creative Craft Activities',
    heading: '12 Fun Things To Do With This Coloring Page',
    subheading: 'Finished coloring? Don’t let your masterpiece go to waste! Here are 12 original, hands-on craft projects and games you can make with this {TITLE} coloring sheet.',
    materialsNeeded: 'Supplies Needed',
    showSteps: 'View step-by-step guide',
    difficultyLabel: 'Level'
  },
  de: {
    badge: '12 Kreative Bastelideen',
    heading: '12 Tolle Bastel- und Spielideen mit diesem Bild',
    subheading: 'Fertig ausgemalt? Werfe dein Meisterwerk nicht weg! Hier sind 12 originelle Bastelideen und Spiele für deine {TITLE} Malvorlage.',
    materialsNeeded: 'Benötigte Materialien',
    showSteps: 'Schritt-für-Schritt Anleitung',
    difficultyLabel: 'Schwierigkeit'
  },
  fr: {
    badge: '12 Idées de Bricolage Créatives',
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

  return (
    <section className={styles.container} aria-label={headingText}>
      <div className={styles.header}>
        <div className={styles.topBadge}>
          <span>💡</span>
          <span>{t.badge}</span>
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