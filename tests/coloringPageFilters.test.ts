import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterColoringPages,
  getAgeCounts,
  getDifficultyCounts,
  getPageDifficulty,
  normalizeAge,
  normalizeDifficulty,
  paginate,
} from '../src/lib/coloringPageFilters';

const pages = [
  { id: 'explicit', ageGroup: 'kids', difficulty: 'hard' },
  { id: 'fallback', ageGroup: 'kids' },
  { id: 'teen', ageGroup: 'teens', difficulty: 'medium' },
  { id: 'adult', ageGroup: 'volwassenen', difficulty: 'easy' },
  { id: 'invalid', ageGroup: 'adults', difficulty: 'expert' },
];

describe('coloring page filter normalization', () => {
  it('normalizes canonical values and supported aliases', () => {
    assert.equal(normalizeDifficulty(' Kids '), 'easy');
    assert.equal(normalizeDifficulty('ADULTS'), 'hard');
    assert.equal(normalizeDifficulty('unknown'), undefined);
    assert.equal(normalizeAge('kinderen'), 'kids');
    assert.equal(normalizeAge('Adultes'), 'adults');
    assert.equal(normalizeAge(['kids']), undefined);
  });

  it('prefers explicit difficulty and falls back to age only when missing', () => {
    assert.equal(getPageDifficulty(pages[0]), 'hard');
    assert.equal(getPageDifficulty(pages[1]), 'easy');
    assert.equal(getPageDifficulty(pages[3]), 'easy');
    assert.equal(getPageDifficulty(pages[4]), undefined);
  });

  it('applies age and difficulty as independent filters', () => {
    assert.deepEqual(filterColoringPages(pages, { age: 'kids' }).map(page => page.id), ['explicit', 'fallback']);
    assert.deepEqual(filterColoringPages(pages, { difficulty: 'easy' }).map(page => page.id), ['fallback', 'adult']);
    assert.deepEqual(filterColoringPages(pages, { age: 'kids', difficulty: 'hard' }).map(page => page.id), ['explicit']);
  });

  it('uses the same precedence for facet counts', () => {
    assert.deepEqual(getDifficultyCounts(pages), { all: 5, easy: 2, medium: 1, hard: 1 });
    assert.deepEqual(getAgeCounts(pages), { all: 5, toddlers: 0, kids: 2, teens: 1, adults: 2 });
  });
});

describe('filtered pagination', () => {
  it('clamps malformed, low, and high page requests', () => {
    assert.equal(paginate(pages, 'bad', 2).currentPage, 1);
    assert.equal(paginate(pages, '-2', 2).currentPage, 1);
    assert.equal(paginate(pages, '99', 2).currentPage, 3);
    assert.deepEqual(paginate(pages, '99', 2).items.map(page => page.id), ['invalid']);
  });

  it('returns a stable first page for an empty result', () => {
    assert.deepEqual(paginate([], '4', 24), { items: [], currentPage: 1, totalPages: 1 });
  });
});
