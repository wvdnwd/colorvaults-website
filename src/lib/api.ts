import fs from 'fs';
import path from 'path';

export interface MainHub {
  slug: string;
  title: string;
  description: string;
  image?: string;
  themeCount?: number;
}

export interface Theme {
  slug: string;
  parentHub: string;
  title: string;
  description: string;
  seoIntro?: string;
  seoContent?: string;
  faq?: Array<{ question: string; answer: string }>;
  image: string;
  pageCount?: number;
  availableAges: string[];
}

export interface AgePage {
  slug: string; // 'kids' | 'teens' | 'adults'
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  seoText: string;
  pageCount?: number;
}

export interface ColoringPage {
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  title: string;
  shortDescription: string;
  image: string;
  fileSize?: string;
  dimensions?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  faq?: Array<{ question: string; answer: string }>;
}

const dataDir = path.join(process.cwd(), 'src/data');

function readJson<T>(lang: string, filename: string): T[] {
  const filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) return [];
  const fileContents = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(fileContents) as T[];
  } catch (e) {
    console.error(`[ColorVaults] Failed to parse JSON at ${filePath}:`, e);
    return [];
  }
}

// Cached memory so we don't read JSONs thousands of times during build
let cache: Record<string, unknown[]> = {};

function getCached<T>(lang: string, key: string, filename: string): T[] {
  const cacheKey = `${lang}_${key}`;
  if (!cache[cacheKey]) {
    cache[cacheKey] = readJson<T>(lang, filename);
  }
  return cache[cacheKey] as T[];
}

export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi, '<\\/script>');
}

export function getMainHubs(lang: string): MainHub[] {
  return getCached<MainHub>(lang, 'hubs', 'main-hubs.json');
}

export function getThemes(lang: string): Theme[] {
  return getCached<Theme>(lang, 'themes', 'themes.json');
}

export function getThemeBySlug(lang: string, parentHubSlug: string, themeSlug: string): Theme | undefined {
  const themes = getThemes(lang);
  return themes.find(t => t.parentHub === parentHubSlug && t.slug === themeSlug);
}

export function getAgePages(lang: string): AgePage[] {
  return getCached<AgePage>(lang, 'agePages', 'age-pages.json');
}

export function getAgePageBySlug(lang: string, parentHubSlug: string, themeSlug: string, ageGroupSlug: string): AgePage | undefined {
  const agePages = getAgePages(lang);
  return agePages.find(a => a.parentHub === parentHubSlug && a.parentTheme === themeSlug && a.ageGroup === ageGroupSlug);
}

export function getColoringPages(lang: string): ColoringPage[] {
  return getCached<ColoringPage>(lang, 'coloringPages', 'coloring-pages.json');
}

export function getPagesByAgeGroup(lang: string, parentHubSlug: string, themeSlug: string, ageGroupSlug: string): ColoringPage[] {
  const pages = getColoringPages(lang);
  return pages.filter(p => p.parentHub === parentHubSlug && p.parentTheme === themeSlug && p.ageGroup === ageGroupSlug);
}

export function getPageBySlug(lang: string, parentHubSlug: string, themeSlug: string, ageGroupSlug: string, pageSlug: string): ColoringPage | undefined {
  const pages = getColoringPages(lang);
  return pages.find(p => p.parentHub === parentHubSlug && p.parentTheme === themeSlug && p.ageGroup === ageGroupSlug && p.slug === pageSlug);
}

export function getSampleImagesForTheme(lang: string, parentHubSlug: string, themeSlug: string, defaultImage: string, count = 3): string[] {
  const pages = getColoringPages(lang).filter(p => p.parentHub === parentHubSlug && p.parentTheme === themeSlug);
  const images = pages.map(p => p.image).filter(Boolean);
  if (images.length === 0) return [defaultImage];
  // Select up to count unique images starting with defaultImage if available
  const result: string[] = [];
  if (defaultImage && images.includes(defaultImage)) {
    result.push(defaultImage);
  }
  for (const img of images) {
    if (!result.includes(img) && result.length < count) {
      result.push(img);
    }
  }
  if (result.length === 0 && defaultImage) result.push(defaultImage);
  return result;
}

export function validateDataModel() {
  const languages = ['en', 'nl'];
  
  for (const lang of languages) {
    const hubs = getMainHubs(lang);
    const themes = getThemes(lang);
    const agePages = getAgePages(lang);
    const pages = getColoringPages(lang);

    const hubSlugs = new Set<string>();
    for (const h of hubs) {
      validateSlug(h.slug, 'MainHub');
      if (hubSlugs.has(h.slug)) throw new Error(`Duplicate MainHub slug: ${h.slug} in ${lang}`);
      hubSlugs.add(h.slug);
    }

    const themeKeys = new Set<string>();
    for (const t of themes) {
      validateSlug(t.slug, 'Theme');
      if (!hubSlugs.has(t.parentHub)) throw new Error(`Orphan Theme: ${t.slug} points to missing hub ${t.parentHub}`);
      const key = `${t.parentHub}/${t.slug}`;
      if (themeKeys.has(key)) throw new Error(`Duplicate Theme slug: ${key} in ${lang}`);
      themeKeys.add(key);
    }

    const ageKeys = new Set<string>();
    for (const a of agePages) {
      validateSlug(a.ageGroup, 'AgePage');
      const parentKey = `${a.parentHub}/${a.parentTheme}`;
      if (!themeKeys.has(parentKey)) throw new Error(`Orphan AgePage: ${a.ageGroup} points to missing theme ${parentKey}`);
      const key = `${parentKey}/${a.ageGroup}`;
      if (ageKeys.has(key)) throw new Error(`Duplicate AgePage slug: ${key} in ${lang}`);
      ageKeys.add(key);
    }

    const pageKeys = new Set();
    for (const p of pages) {
      validateSlug(p.slug, 'ColoringPage');
      const parentKey = `${p.parentHub}/${p.parentTheme}/${p.ageGroup}`;
      if (!ageKeys.has(parentKey)) throw new Error(`Orphan ColoringPage: ${p.slug} points to missing age page ${parentKey}`);
      const key = `${parentKey}/${p.slug}`;
      if (pageKeys.has(key)) throw new Error(`Duplicate ColoringPage slug: ${key} in ${lang}`);
      if (!p.metaTitle || !p.metaDescription) throw new Error(`Missing metadata for ColoringPage: ${p.slug}`);
      pageKeys.add(key);
    }
  }
}

function validateSlug(slug: string, typeName: string) {
  if (!slug || typeof slug !== 'string') {
    throw new Error(`Invalid ${typeName} slug: must be non-empty string`);
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Invalid ${typeName} slug "${slug}": must be lowercase alphanumeric with hyphens only`);
  }
}

export function getAgeLabel(ageSlug: string, lang: string): { label: string; emoji: string; desc: string } {
  const isEn = lang === 'en';
  const map: Record<string, { en: string; nl: string; emoji: string; descEn: string; descNl: string }> = {
    kids:        { en: 'Easy',   nl: 'Makkelijk', emoji: '⭐',     descEn: 'Simple shapes & fun designs',         descNl: 'Eenvoudige vormen & leuke designs' },
    kinderen:    { en: 'Easy',   nl: 'Makkelijk', emoji: '⭐',     descEn: 'Simple shapes & fun designs',         descNl: 'Eenvoudige vormen & leuke designs' },
    toddlers:    { en: 'Easy',   nl: 'Makkelijk', emoji: '⭐',     descEn: 'Simple shapes & fun designs',         descNl: 'Eenvoudige vormen & leuke designs' },
    peuters:     { en: 'Easy',   nl: 'Makkelijk', emoji: '⭐',     descEn: 'Simple shapes & fun designs',         descNl: 'Eenvoudige vormen & leuke designs' },
    teens:       { en: 'Medium', nl: 'Gemiddeld', emoji: '⭐⭐',   descEn: 'More detail & creative scenes',       descNl: 'Meer detail & creatieve scènes' },
    tieners:     { en: 'Medium', nl: 'Gemiddeld', emoji: '⭐⭐',   descEn: 'More detail & creative scenes',       descNl: 'Meer detail & creatieve scènes' },
    adults:      { en: 'Hard',   nl: 'Moeilijk',  emoji: '⭐⭐⭐', descEn: 'Intricate patterns & fine details',   descNl: 'Ingewikkelde patronen & fijne details' },
    volwassenen: { en: 'Hard',   nl: 'Moeilijk',  emoji: '⭐⭐⭐', descEn: 'Intricate patterns & fine details',   descNl: 'Ingewikkelde patronen & fijne details' },
  };
  const entry = map[ageSlug];
  if (!entry) return { label: ageSlug, emoji: '🎨', desc: '' };
  return {
    label: isEn ? entry.en : entry.nl,
    emoji: entry.emoji,
    desc:  isEn ? entry.descEn : entry.descNl,
  };
}
