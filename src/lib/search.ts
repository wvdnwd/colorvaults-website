import { getColoringPages, getMainHubs, getThemes, type ColoringPage } from './api';
import { buildSearchIndex } from './search-index';

export interface SearchEntry {
  lang: string;
  type: string;
  title: string;
  description: string;
  image: string;
  url: string;
  parentHub?: string;
  parentTheme?: string;
  ageGroup?: string;
  difficulty?: string;
  tags?: string[];
}

const indices = new Map<string, SearchEntry[]>();
const ages: Record<string, string[]> = {
  kids: ['kids', 'kinderen', 'toddlers', 'peuters'],
  teens: ['teens', 'tieners'],
  adults: ['adults', 'volwassenen'],
};

export function searchCatalog(lang: string, params: URLSearchParams): SearchEntry[] {
  lang = ['en', 'nl', 'de', 'fr'].includes(lang) ? lang : 'en';
  if (!indices.has(lang)) {
    indices.set(lang, buildSearchIndex(lang, getMainHubs(lang), getThemes(lang), getColoringPages(lang)));
  }
  const query = (params.get('q') || '').trim().toLowerCase();
  const theme = params.get('theme');
  const age = params.get('age');
  const difficulty = params.get('difficulty')?.toLowerCase();
  const type = params.get('type');
  return indices.get(lang)!.flatMap(entry => {
    if (type && entry.type !== type) return [];
    if (theme && entry.parentTheme !== theme) return [];
    if (age && !(Object.hasOwn(ages, age) ? ages[age] : [age]).includes(entry.ageGroup || '')) return [];
    if (difficulty) {
      const inferred = ages.kids.includes(entry.ageGroup || '') ? 'easy'
        : ages.teens.includes(entry.ageGroup || '') ? 'medium'
        : ages.adults.includes(entry.ageGroup || '') ? 'hard' : '';
      if ((entry.difficulty || inferred) !== difficulty) return [];
    }
    if (!query) return [{ entry, score: 0 }];
    const title = entry.title.toLowerCase();
    let score = title === query ? 200 : title.startsWith(query) ? 100 : title.includes(query) ? 60 : 0;
    if (entry.tags?.some(t => t.toLowerCase() === query)) score += 35;
    else if (entry.tags?.some(t => t.toLowerCase().includes(query))) score += 20;
    if (entry.description.toLowerCase().includes(query)) score += 10;
    // Type boosts rank real matches, never turn unrelated entries into matches.
    if (!score) return [];
    score += entry.type === 'theme' ? 40 : entry.type === 'hub' ? 30 : 0;
    return [{ entry, score }];
  }).sort((a, b) => b.score - a.score).map(result => result.entry);
}

export function getSearchPage(lang: string, params: URLSearchParams) {
  const filters = new URLSearchParams(params);
  filters.set('type', 'page');
  const results = searchCatalog(lang, filters);
  const perPage = 40;
  const requested = Number(params.get('page') || 1);
  const page = Math.min(Math.max(1, Math.ceil(results.length / perPage)),
    Number.isSafeInteger(requested) && requested > 0 ? requested : 1);
  const pages: ColoringPage[] = results.slice((page - 1) * perPage, page * perPage).map(entry => ({
    slug: entry.url.split('/').pop()!, parentHub: entry.parentHub!, parentTheme: entry.parentTheme!,
    ageGroup: entry.ageGroup!, title: entry.title, shortDescription: entry.description,
    image: entry.image, tags: entry.tags, difficulty: entry.difficulty,
  }));
  return { pages, total: results.length, page, perPage };
}
