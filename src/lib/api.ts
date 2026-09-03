import fs from'fs';
import path from'path';

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
  slug: string;
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

const dataDir = path.join(process.cwd(),'src/data');

function readJson<T>(lang: string, filename: string): T[] {
  let filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) {
    // Fall back to en data for de, fr, etc.
    filePath = path.join(dataDir, 'en', filename);
  }
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
  const cacheKey =`${lang}_${key}`;
  if (!cache[cacheKey]) {
    cache[cacheKey] = readJson<T>(lang, filename);
  }
  return cache[cacheKey] as T[];
}

export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi,'<\\/script>');
}

const hubTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  de: {
    'disney-pixar': { title: 'Disney & Pixar', description: 'Entdecke magische Malvorlagen deiner Disney & Pixar Favoriten wie Frozen, Toy Story und König der Löwen.' },
    'anime-manga': { title: 'Anime & Manga', description: 'Tolle Anime und Manga Ausmalbilder mit Dragon Ball, Naruto, One Piece und Pokémon.' },
    'gaming-virtual-worlds': { title: 'Gaming & Videospiele', description: 'Epische Gaming-Malvorlagen mit Fortnite, Minecraft, Roblox, Super Mario und Sonic.' },
    'superheroes-comic-universes': { title: 'Superhelden & Comics', description: 'Actiongeladene Superhelden-Malvorlagen mit Spider-Man, Batman, Avengers und Superman.' },
    'kids-tv-shows': { title: 'Kinder & Zeichentrick', description: 'Fröhliche Ausmalbilder für Kinder mit Paw Patrol, Bluey, Peppa Wutz und SpongeBob.' },
    'animals-wildlife': { title: 'Tiere & Natur', description: 'Entdecke das Tierreich mit Malvorlagen von Dinosauriern, Hunden, Katzen und Pferden.' },
    'fantasy-fairytales': { title: 'Fantasy & Märchen', description: 'Tauche ein in magische Welten mit Einhörnern, Drachen, Feen und Zauberschlössern.' },
    'vehicles-transportation': { title: 'Fahrzeuge & Autos', description: 'Schnelle Ausmalbilder von Monstertrucks, Formel 1 Rennwagen, Polizeiautos und Zügen.' },
    'art-aesthetic': { title: 'Kunst & Ästhetik', description: 'Kreative Malvorlagen, florale Muster und ästhetische Kunst für Jugendliche und Erwachsene.' },
    'mandala-patterns-relaxation': { title: 'Mandalas & Entspannung', description: 'Wunderschöne Mandalas und geometrische Muster für Achtsamkeit und meditative Ruhe.' },
  },
  fr: {
    'disney-pixar': { title: 'Disney & Pixar', description: 'Découvrez des coloriages magiques de vos classiques Disney et Pixar comme La Reine des Neiges et Toy Story.' },
    'anime-manga': { title: 'Anime & Manga', description: 'Superbes coloriages d\'anime et manga avec Dragon Ball, Naruto, One Piece et Pokémon.' },
    'gaming-virtual-worlds': { title: 'Jeux Vidéo & Mondes Virtuels', description: 'Coloriages épiques de jeux vidéo avec Fortnite, Minecraft, Roblox, Super Mario et Sonic.' },
    'superheroes-comic-universes': { title: 'Super-héros & Comics', description: 'Coloriages de super-héros pleins d\'action avec Spider-Man, Batman, Avengers et Superman.' },
    'kids-tv-shows': { title: 'Enfants & Dessins Animés', description: 'Coloriages joyeux pour enfants avec Pat\' Patrouille, Bluey, Peppa Pig et Bob l\'éponge.' },
    'animals-wildlife': { title: 'Animaux & Nature', description: 'Explorez le royaume animal avec des coloriages de dinosaures, chiots, chatons et faune sauvage.' },
    'fantasy-fairytales': { title: 'Fantaisie & Contes de Fées', description: 'Entrez dans des mondes magiques avec licornes, dragons, fées, sirènes et châteaux enchantés.' },
    'vehicles-transportation': { title: 'Véhicules & Transports', description: 'Coloriages rapides de monster trucks, voitures de course F1, camions de pompiers et trains.' },
    'art-aesthetic': { title: 'Art & Esthétique', description: 'Coloriages créatifs et relaxants, motifs floraux et art esthétique pour ados et adultes.' },
    'mandala-patterns-relaxation': { title: 'Mandalas & Relaxation', description: 'Magnifiques mandalas et motifs géométriques pour la pleine conscience et la détente.' },
  }
};

export function getMainHubs(lang: string): MainHub[] {
  const hubs = getCached<MainHub>(lang, 'hubs', 'main-hubs.json');
  const pages = getColoringPages(lang);

  const countByHub: Record<string, number> = {};
  for (const p of pages) {
    countByHub[p.parentHub] = (countByHub[p.parentHub] || 0) + 1;
  }

  return hubs.map(h => {
    const tr = hubTranslations[lang]?.[h.slug];
    return {
      ...h,
      title: tr?.title || h.title,
      description: tr?.description || h.description,
      language: lang,
      pageCount: countByHub[h.slug] || h.themeCount || 0,
    };
  });
}

export function getThemes(lang: string): Theme[] {
  const themes = getCached<Theme>(lang,'themes','themes.json');
  const pages = getColoringPages(lang);

  const countByTheme: Record<string, number> = {};
  for (const p of pages) {
    const key =`${p.parentHub}/${p.parentTheme}`;
    countByTheme[key] = (countByTheme[key] || 0) + 1;
  }

  return themes.map(t => ({
    ...t,
    pageCount: countByTheme[`${t.parentHub}/${t.slug}`] || 0,
  }));
}

export function getThemeBySlug(lang: string, parentHubSlug: string, themeSlug: string): Theme | undefined {
  const themes = getThemes(lang);
  return themes.find(t => t.parentHub === parentHubSlug && t.slug === themeSlug);
}

export function getAgePages(lang: string): AgePage[] {
  return getCached<AgePage>(lang,'agePages','age-pages.json');
}

export function getAgePageBySlug(lang: string, parentHubSlug: string, themeSlug: string, ageGroupSlug: string): AgePage | undefined {
  const agePages = getAgePages(lang);
  return agePages.find(a => a.parentHub === parentHubSlug && a.parentTheme === themeSlug && a.ageGroup === ageGroupSlug);
}

export function getColoringPages(lang: string): ColoringPage[] {
  return getCached<ColoringPage>(lang,'coloringPages','coloring-pages.json');
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
  const result: string[] = [];
  if (defaultImage) {
    result.push(defaultImage);
  }
  const pages = getColoringPages(lang).filter(p => p.parentHub === parentHubSlug && p.parentTheme === themeSlug);
  for (const p of pages) {
    if (p.image && !result.includes(p.image) && result.length < count) {
      result.push(p.image);
    }
  }
  return result.length > 0 ? result : [defaultImage ||'/images/banner.jpg'];
}

export function validateDataModel() {
  const languages = ['en','nl'];
  
  for (const lang of languages) {
    const hubs = getMainHubs(lang);
    const themes = getThemes(lang);
    const agePages = getAgePages(lang);
    const pages = getColoringPages(lang);

    const hubSlugs = new Set<string>();
    for (const h of hubs) {
      validateSlug(h.slug,'MainHub');
      if (hubSlugs.has(h.slug)) throw new Error(`Duplicate MainHub slug: ${h.slug} in ${lang}`);
      hubSlugs.add(h.slug);
    }

    const themeKeys = new Set<string>();
    for (const t of themes) {
      validateSlug(t.slug,'Theme');
      if (!hubSlugs.has(t.parentHub)) throw new Error(`Orphan Theme: ${t.slug} points to missing hub ${t.parentHub}`);
      const key =`${t.parentHub}/${t.slug}`;
      if (themeKeys.has(key)) throw new Error(`Duplicate Theme slug: ${key} in ${lang}`);
      themeKeys.add(key);
    }

    const ageKeys = new Set<string>();
    for (const a of agePages) {
      validateSlug(a.ageGroup,'AgePage');
      const parentKey =`${a.parentHub}/${a.parentTheme}`;
      if (!themeKeys.has(parentKey)) throw new Error(`Orphan AgePage: ${a.ageGroup} points to missing theme ${parentKey}`);
      const key =`${parentKey}/${a.ageGroup}`;
      if (ageKeys.has(key)) throw new Error(`Duplicate AgePage slug: ${key} in ${lang}`);
      ageKeys.add(key);
    }

    const pageKeys = new Set();
    for (const p of pages) {
      validateSlug(p.slug,'ColoringPage');
      const parentKey =`${p.parentHub}/${p.parentTheme}/${p.ageGroup}`;
      if (!ageKeys.has(parentKey)) throw new Error(`Orphan ColoringPage: ${p.slug} points to missing age page ${parentKey}`);
      const key =`${parentKey}/${p.slug}`;
      if (pageKeys.has(key)) throw new Error(`Duplicate ColoringPage slug: ${key} in ${lang}`);
      if (!p.metaTitle || !p.metaDescription) throw new Error(`Missing metadata for ColoringPage: ${p.slug}`);
      pageKeys.add(key);
    }
  }
}

function validateSlug(slug: string, typeName: string) {
  if (!slug || typeof slug !=='string') {
    throw new Error(`Invalid ${typeName} slug: must be non-empty string`);
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Invalid ${typeName} slug"${slug}": must be lowercase alphanumeric with hyphens only`);
  }
}

export function getAgeLabel(ageSlug: string, lang: string): { label: string; emoji: string; desc: string } {
  const isEn = lang ==='en';
  const map: Record<string, { en: string; nl: string; emoji: string; descEn: string; descNl: string }> = {
    kids:        { en:'Easy',   nl:'Makkelijk', emoji:'', descEn:'Simple shapes & fun designs',       descNl:'Eenvoudige vormen & leuke designs'},
    kinderen:    { en:'Easy',   nl:'Makkelijk', emoji:'', descEn:'Simple shapes & fun designs',       descNl:'Eenvoudige vormen & leuke designs'},
    toddlers:    { en:'Easy',   nl:'Makkelijk', emoji:'', descEn:'Simple shapes & fun designs',       descNl:'Eenvoudige vormen & leuke designs'},
    peuters:     { en:'Easy',   nl:'Makkelijk', emoji:'', descEn:'Simple shapes & fun designs',       descNl:'Eenvoudige vormen & leuke designs'},
    teens:       { en:'Medium', nl:'Gemiddeld', emoji:'', descEn:'More detail & creative scenes',     descNl:'Meer detail & creatieve scènes'},
    tieners:     { en:'Medium', nl:'Gemiddeld', emoji:'', descEn:'More detail & creative scenes',     descNl:'Meer detail & creatieve scènes'},
    adults:      { en:'Hard',   nl:'Moeilijk',  emoji:'', descEn:'Intricate patterns & fine details', descNl:'Ingewikkelde patronen & fijne details'},
    volwassenen: { en:'Hard',   nl:'Moeilijk',  emoji:'', descEn:'Intricate patterns & fine details', descNl:'Ingewikkelde patronen & fijne details'},
  };
  const entry = map[ageSlug];
  if (!entry) return { label: ageSlug, emoji:'', desc:''};
  return {
    label: isEn ? entry.en : entry.nl,
    emoji: entry.emoji,
    desc:  isEn ? entry.descEn : entry.descNl,
  };
}
