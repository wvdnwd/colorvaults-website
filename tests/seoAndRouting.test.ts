import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SITE_ORIGIN, VALID_LOCALES, isValidLocale, getCanonicalUrl, escapeXml } from '../src/lib/site';
import { buildCanonicalUrl, buildHreflangAlternates } from '../src/lib/seo';
import { safeJsonLd, buildWebsiteAndOrgSchema } from '../src/lib/structuredData';
import enPages from '../src/data/en/coloring-pages.json';
import enFeatured from '../src/data/en/featured-pages.json';
import enPawPatrol from '../src/data/en/themes-data/paw-patrol.json';
import nlPages from '../src/data/nl/coloring-pages.json';
import nlFeatured from '../src/data/nl/featured-pages.json';
import nlPawPatrol from '../src/data/nl/themes-data/paw-patrol.json';
import {
  buildThemeFilterHref,
  clampPage,
  filterByDifficulty,
  getAgeCounts,
  getDifficultyCounts,
  getPageDifficulty,
} from '../src/lib/themeFilters';
import { getAgeLabel } from '../src/lib/api';

describe('Site & Routing Helpers', () => {
  it('enforces exact site origin', () => {
    assert.equal(SITE_ORIGIN, 'https://www.colorvaults.com');
  });

  it('validates supported locales strictly', () => {
    assert.deepEqual(VALID_LOCALES, ['en', 'nl', 'de', 'fr']);
    assert.equal(isValidLocale('en'), true);
    assert.equal(isValidLocale('nl'), true);
    assert.equal(isValidLocale('de'), true);
    assert.equal(isValidLocale('fr'), true);
    assert.equal(isValidLocale('es'), false);
    assert.equal(isValidLocale('it'), false);
    assert.equal(isValidLocale(''), false);
    assert.equal(isValidLocale(undefined as unknown as string), false);
  });

  it('generates proper canonical URLs with leading slashes', () => {
    assert.equal(getCanonicalUrl('/en'), 'https://www.colorvaults.com/en');
    assert.equal(getCanonicalUrl('nl/calendars'), 'https://www.colorvaults.com/nl/calendars');
  });

  it('properly escapes XML special characters for sitemaps', () => {
    assert.equal(escapeXml('hello & world'), 'hello &amp; world');
    assert.equal(escapeXml('<tag attr="val" test=\'1\'>'), '&lt;tag attr=&quot;val&quot; test=&apos;1&apos;&gt;');
  });
});

describe('Theme Filter & Routing Helpers', () => {
  const pages = [
    { ageGroup: 'toddlers', difficulty: undefined },
    { ageGroup: 'kids', difficulty: undefined },
    { ageGroup: 'teens', difficulty: undefined },
    { ageGroup: 'kids', difficulty: 'hard' },
    { ageGroup: 'teens', difficulty: 'easy' },
  ];

  it('prefers explicit difficulty and falls back sensibly from age', () => {
    assert.equal(getPageDifficulty(pages[0]), 'easy');
    assert.equal(getPageDifficulty(pages[1]), 'medium');
    assert.equal(getPageDifficulty(pages[2]), 'hard');
    assert.equal(getPageDifficulty(pages[3]), 'hard');
    assert.equal(getPageDifficulty(pages[4]), 'easy');
  });

  it('labels age routes as age groups rather than inferred difficulty', () => {
    assert.equal(getAgeLabel('kids', 'en').label, 'Kids (5-8)');
    assert.equal(getAgeLabel('teens', 'nl').label, 'Oudere Kinderen (9-12)');
    assert.equal(getAgeLabel('adults', 'fr').label, 'Teens & Adults (13+)');
  });

  it('filters and counts from the same resolved difficulty', () => {
    assert.deepEqual(getDifficultyCounts(pages), { all: 5, easy: 2, medium: 1, hard: 2 });
    assert.equal(filterByDifficulty(pages, 'easy').length, 2);
    assert.equal(filterByDifficulty(pages, 'invalid').length, 5);
    assert.deepEqual(getAgeCounts(pages), { all: 5, toddlers: 1, kids: 2, teens: 2 });
  });

  it('uses the same fallback difficulty in catalog search and theme filters', async () => {
    const { searchCatalog } = await import('../src/lib/search');
    for (const ageGroup of ['toddlers', 'kids', 'teens'] as const) {
      const difficulty = getPageDifficulty({ ageGroup });
      const results = searchCatalog('en', new URLSearchParams({ type: 'page', age: ageGroup, difficulty: difficulty! }));
      assert.ok(results.length > 0);
      assert.ok(results.every(entry => getPageDifficulty({ ageGroup: entry.ageGroup!, difficulty: entry.difficulty }) === difficulty));
    }
  });

  it('preserves locale and theme routes for age and difficulty navigation', () => {
    const basePath = '/fr/animals-wildlife/cute-cats';
    assert.equal(buildThemeFilterHref(basePath), basePath);
    assert.equal(
      buildThemeFilterHref(basePath, { age: 'toddlers', difficulty: 'easy' }),
      `${basePath}/toddlers?difficulty=easy`,
    );
    assert.equal(
      buildThemeFilterHref(basePath, { age: 'kids', difficulty: 'medium', page: 3 }),
      `${basePath}/kids?difficulty=medium&page=3`,
    );
  });

  it('clamps invalid and oversized current pages to filtered totals', () => {
    assert.equal(clampPage('3', 100, 24), 3);
    assert.equal(clampPage('99', 25, 24), 2);
    assert.equal(clampPage('-4', 100, 24), 1);
    assert.equal(clampPage('not-a-page', 100, 24), 1);
    assert.equal(clampPage('8', 0, 24), 1);
  });
});

describe('SEO & Canonical Helpers', () => {
  it('normalizes page=1 to canonical without query string', () => {
    const url = buildCanonicalUrl('/tv-shows', 'en', 1);
    assert.equal(url, 'https://www.colorvaults.com/en/tv-shows');
  });

  it('preserves page > 1 in canonical query string', () => {
    const url = buildCanonicalUrl('/animals', 'nl', 2);
    assert.equal(url, 'https://www.colorvaults.com/nl/animals?page=2');
  });

  it('builds hreflang alternates for all locales plus x-default', () => {
    const alternates = buildHreflangAlternates('/calendars');
    assert.equal(alternates['en'], 'https://www.colorvaults.com/en/calendars');
    assert.equal(alternates['nl'], 'https://www.colorvaults.com/nl/calendars');
    assert.equal(alternates['de'], 'https://www.colorvaults.com/de/calendars');
    assert.equal(alternates['fr'], 'https://www.colorvaults.com/fr/calendars');
    assert.equal(alternates['x-default'], 'https://www.colorvaults.com/en/calendars');
  });
});

describe('Structured Data Escaping', () => {
  it('prevents XSS by escaping < and > in JSON-LD stringify', () => {
    const malicious = { name: 'Test</script><script>alert(1)</script>' };
    const serialized = safeJsonLd(malicious);
    assert.ok(!serialized.includes('</script>'));
    assert.ok(serialized.includes('\\u003c/script\\u003e'));
  });

  it('outputs valid WebSite and Organization schema graph', () => {
    const schema = buildWebsiteAndOrgSchema('en');
    assert.equal(schema['@context'], 'https://schema.org');
    assert.equal(schema['@graph'].length, 2);
    const org = schema['@graph'].find((item: any) => item['@type'] === 'Organization');
    assert.ok(org);
    assert.equal(org.name, 'ColorVaults');
    assert.equal(org.url, 'https://www.colorvaults.com');
  });
});

describe('Catalog Source Data', () => {
  const rejectedIds = new Set(['page-paw-patrol-1', 'page-paw-patrol-123']);

  it('excludes reviewed Paw Patrol rejections from masters, shards, and featured data', () => {
    for (const catalog of [enPages, nlPages, enPawPatrol, nlPawPatrol, enFeatured, nlFeatured]) {
      assert.equal(catalog.some(({ id }) => rejectedIds.has(id)), false);
    }
  });

  it('keeps featured Frozen selectors aligned with authoritative records', () => {
    for (const [master, featured] of [[enPages, enFeatured], [nlPages, nlFeatured]] as const) {
      const frozen = featured.filter(({ parentTheme }) => parentTheme === 'frozen');
      assert.ok(frozen.length > 0);
      for (const item of frozen) {
        const authoritative = master.find(({ id }) => id === item.id);
        assert.ok(authoritative);
        assert.equal(item.slug, authoritative.slug);
        assert.equal(item.image, authoritative.image);
      }
    }
  });

  it('does not retain dangling featured Sonic selectors', () => {
    for (const featured of [enFeatured, nlFeatured]) {
      assert.equal(featured.some(({ parentTheme }) => parentTheme === 'sonic-the-hedgehog'), false);
    }
  });
});
