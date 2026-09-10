export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export const AGES = ['toddlers', 'kids', 'teens', 'adults'] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];
export type Age = (typeof AGES)[number];

export interface FilterableColoringPage {
  difficulty?: string;
  ageGroup?: string;
}

const difficultyAliases: Record<string, Difficulty> = {
  easy: 'easy',
  makkelijk: 'easy',
  einfach: 'easy',
  facile: 'easy',
  kids: 'easy',
  children: 'easy',
  medium: 'medium',
  gemiddeld: 'medium',
  mittel: 'medium',
  moyen: 'medium',
  teens: 'medium',
  teenagers: 'medium',
  hard: 'hard',
  moeilijk: 'hard',
  schwer: 'hard',
  difficile: 'hard',
  adults: 'hard',
};

const ageAliases: Record<string, Age> = {
  toddler: 'toddlers',
  toddlers: 'toddlers',
  kleinkinder: 'toddlers',
  'tout-petits': 'toddlers',
  kid: 'kids',
  kids: 'kids',
  children: 'kids',
  kinderen: 'kids',
  kinder: 'kids',
  enfants: 'kids',
  teen: 'teens',
  teens: 'teens',
  teenagers: 'teens',
  tieners: 'teens',
  jugendliche: 'teens',
  ados: 'teens',
  adult: 'adults',
  adults: 'adults',
  volwassenen: 'adults',
  erwachsene: 'adults',
  adultes: 'adults',
};

function normalizedKey(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const key = value.trim().toLowerCase();
  return key || undefined;
}

export function normalizeDifficulty(value: unknown): Difficulty | undefined {
  const key = normalizedKey(value);
  return key ? difficultyAliases[key] : undefined;
}

export function normalizeAge(value: unknown): Age | undefined {
  const key = normalizedKey(value);
  return key ? ageAliases[key] : undefined;
}

export function getPageDifficulty(page: FilterableColoringPage): Difficulty | undefined {
  if (normalizedKey(page.difficulty)) return normalizeDifficulty(page.difficulty);

  const age = normalizeAge(page.ageGroup);
  if (age === 'toddlers' || age === 'kids') return 'easy';
  if (age === 'teens') return 'medium';
  if (age === 'adults') return 'hard';
  return undefined;
}

export function filterColoringPages<T extends FilterableColoringPage>(
  pages: readonly T[],
  filters: { difficulty?: unknown; age?: unknown } = {},
): T[] {
  const difficulty = normalizeDifficulty(filters.difficulty);
  const age = normalizeAge(filters.age);

  return pages.filter(page => {
    if (age && normalizeAge(page.ageGroup) !== age) return false;
    if (difficulty && getPageDifficulty(page) !== difficulty) return false;
    return true;
  });
}

export function getDifficultyCounts(pages: readonly FilterableColoringPage[]) {
  return {
    all: pages.length,
    easy: pages.filter(page => getPageDifficulty(page) === 'easy').length,
    medium: pages.filter(page => getPageDifficulty(page) === 'medium').length,
    hard: pages.filter(page => getPageDifficulty(page) === 'hard').length,
  };
}

export function getAgeCounts(pages: readonly FilterableColoringPage[]) {
  return {
    all: pages.length,
    toddlers: pages.filter(page => normalizeAge(page.ageGroup) === 'toddlers').length,
    kids: pages.filter(page => normalizeAge(page.ageGroup) === 'kids').length,
    teens: pages.filter(page => normalizeAge(page.ageGroup) === 'teens').length,
    adults: pages.filter(page => normalizeAge(page.ageGroup) === 'adults').length,
  };
}

export function paginate<T>(items: readonly T[], requestedPage: unknown, perPage: number) {
  if (!Number.isInteger(perPage) || perPage < 1) {
    throw new RangeError('perPage must be a positive integer');
  }

  const parsed = typeof requestedPage === 'string' || typeof requestedPage === 'number'
    ? Number(requestedPage)
    : 1;
  const page = Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * perPage;

  return {
    items: items.slice(offset, offset + perPage),
    currentPage,
    totalPages,
  };
}
