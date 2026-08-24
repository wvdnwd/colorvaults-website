import fs from 'fs';
import path from 'path';

export interface MainHub {
  title: string;
  slug: string;
  description: string;
  image: string;
  language: string;
}

export interface Theme {
  title: string;
  slug: string;
  parentHub: string;
  description: string;
  image: string;
  availableAges: string[];
  language: string;
}

export interface AgePage {
  title: string;
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  introText: string;
  seoText: string;
  faq: { question: string; answer: string }[];
  language: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  slug: string;
  parentHub: string;
  parentTheme: string;
  ageGroup: string;
  image: string;
  preview: string;
  downloadableFile: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  longDescription: string;
  altText: string;
  tags: string[];
  relatedPages: string[];
  language: string;
  faq?: { question: string; answer: string }[];
}

const dataDir = path.join(process.cwd(), 'src/data');

const RESERVED_SLUGS = [
  'about', 'contact', 'privacy-policy', 'terms', 'terms-of-service', 'ip-policy',
  'sitemap.xml', 'robots.txt', 'favicon.ico', 'search', 'latest', 'popular',
  'featured', 'downloads', 'categories', 'category', 'coloring-page', 'api', 'new', 'help',
  'en', 'nl', 'contest', 'request', 'licensing'
];

function validateSlug(slug: string, context: string) {
  if (RESERVED_SLUGS.includes(slug)) {
    throw new Error(`Validation Error: Slug "${slug}" in ${context} is a reserved word.`);
  }
}

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

export function getAgePages(lang: string): AgePage[] {
  return getCached<AgePage>(lang, 'agePages', 'age-pages.json');
}

export function getColoringPages(lang: string): ColoringPage[] {
  return getCached<ColoringPage>(lang, 'pages', 'coloring-pages.json');
}

// Advanced Fetchers
export function getThemeBySlug(lang: string, hubSlug: string, themeSlug: string) {
  return getThemes(lang).find(t => t.parentHub === hubSlug && t.slug === themeSlug);
}

export function getAgePageBySlug(lang: string, hubSlug: string, themeSlug: string, ageSlug: string) {
  return getAgePages(lang).find(a => a.parentHub === hubSlug && a.parentTheme === themeSlug && a.ageGroup === ageSlug);
}

export function getPagesByAgeGroup(lang: string, hubSlug: string, themeSlug: string, ageSlug: string) {
  return getColoringPages(lang).filter(p => p.parentHub === hubSlug && p.parentTheme === themeSlug && p.ageGroup === ageSlug);
}

export function getPageBySlug(lang: string, hubSlug: string, themeSlug: string, ageSlug: string, pageSlug: string) {
  return getColoringPages(lang).find(p => p.parentHub === hubSlug && p.parentTheme === themeSlug && p.ageGroup === ageSlug && p.slug === pageSlug);
}

// VALIDATION ENGINE
export function validateDataModel() {
  const languages = ['en', 'nl'];
  
  for (const lang of languages) {
    const hubs = getMainHubs(lang);
    const themes = getThemes(lang);
    const agePages = getAgePages(lang);
    const pages = getColoringPages(lang);
    
    // Validate Hubs
    const hubSlugs = new Set();
    for (const h of hubs) {
      validateSlug(h.slug, 'MainHub');
      if (hubSlugs.has(h.slug)) throw new Error(`Duplicate MainHub slug: ${h.slug} in ${lang}`);
      hubSlugs.add(h.slug);
    }
    
    // Validate Themes
    const themeKeys = new Set();
    for (const t of themes) {
      validateSlug(t.slug, 'Theme');
      if (!hubSlugs.has(t.parentHub)) throw new Error(`Orphan Theme: ${t.slug} points to missing hub ${t.parentHub}`);
      const key = `${t.parentHub}/${t.slug}`;
      if (themeKeys.has(key)) throw new Error(`Duplicate Theme slug: ${key} in ${lang}`);
      themeKeys.add(key);
    }
    
    // Validate Age Pages
    const ageKeys = new Set();
    for (const a of agePages) {
      validateSlug(a.slug, 'AgePage');
      const parentKey = `${a.parentHub}/${a.parentTheme}`;
      if (!themeKeys.has(parentKey)) throw new Error(`Orphan AgePage: ${a.slug} points to missing theme ${parentKey}`);
      const key = `${parentKey}/${a.ageGroup}`;
      if (ageKeys.has(key)) throw new Error(`Duplicate AgePage slug: ${key} in ${lang}`);
      ageKeys.add(key);
    }
    
    // Validate Coloring Pages
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
