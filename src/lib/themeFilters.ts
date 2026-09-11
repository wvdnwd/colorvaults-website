import type { ColoringPage } from './api';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type AgeRoute = 'toddlers' | 'kids' | 'teens';

const DIFFICULTIES = new Set<Difficulty>(['easy', 'medium', 'hard']);

const FALLBACK_DIFFICULTY_BY_AGE: Record<string, Difficulty> = {
  toddlers: 'easy',
  peuters: 'easy',
  kids: 'medium',
  kinderen: 'medium',
  teens: 'hard',
  tieners: 'hard',
  adults: 'hard',
  volwassenen: 'hard',
};

export function normalizeDifficulty(value?: string | null): Difficulty | undefined {
  const normalized = value?.trim().toLowerCase() as Difficulty | undefined;
  return normalized && DIFFICULTIES.has(normalized) ? normalized : undefined;
}

export function getPageDifficulty(page: Pick<ColoringPage, 'difficulty' | 'ageGroup'>): Difficulty | undefined {
  return normalizeDifficulty(page.difficulty) || FALLBACK_DIFFICULTY_BY_AGE[page.ageGroup.toLowerCase()];
}

export function filterByDifficulty<T extends Pick<ColoringPage, 'difficulty' | 'ageGroup'>>(
  pages: T[],
  difficulty?: string | null,
): T[] {
  const normalized = normalizeDifficulty(difficulty);
  return normalized ? pages.filter(page => getPageDifficulty(page) === normalized) : pages;
}

export function getDifficultyCounts(pages: Array<Pick<ColoringPage, 'difficulty' | 'ageGroup'>>) {
  const counts = { all: pages.length, easy: 0, medium: 0, hard: 0 };
  for (const page of pages) {
    const difficulty = getPageDifficulty(page);
    if (difficulty) counts[difficulty] += 1;
  }
  return counts;
}

export function getAgeCounts(pages: Array<Pick<ColoringPage, 'ageGroup'>>) {
  const counts = { all: pages.length, toddlers: 0, kids: 0, teens: 0 };
  for (const page of pages) {
    const age = page.ageGroup.toLowerCase();
    if (age === 'toddlers' || age === 'peuters') counts.toddlers += 1;
    if (age === 'kids' || age === 'kinderen') counts.kids += 1;
    if (age === 'teens' || age === 'tieners') counts.teens += 1;
  }
  return counts;
}

export function clampPage(value: string | string[] | undefined, totalItems: number, perPage: number): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const requested = Number(raw);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  return Number.isSafeInteger(requested) && requested > 0
    ? Math.min(requested, totalPages)
    : 1;
}

export function buildThemeFilterHref(
  basePath: string,
  options: { age?: AgeRoute; difficulty?: Difficulty; page?: number } = {},
): string {
  const pathname = options.age ? `${basePath}/${options.age}` : basePath;
  const params = new URLSearchParams();
  if (options.difficulty) params.set('difficulty', options.difficulty);
  if (options.page && options.page > 1) params.set('page', String(options.page));
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
