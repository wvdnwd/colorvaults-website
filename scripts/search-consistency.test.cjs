/* eslint-disable @typescript-eslint/no-require-imports -- Node 20 test loader uses CommonJS. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');

// Use the installed compiler so these tests also run on the project's Node 20.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
};
const api = require('../src/lib/api.ts');
const { searchCatalog, getSearchPage } = require('../src/lib/search.ts');
const { buildSearchIndex } = require('../src/lib/search-index');
const params = values => new URLSearchParams(values);
const key = p => `${p.parentHub}/${p.parentTheme}/${p.ageGroup}/${p.slug}`;

test('featured cards use exact detail records without changing shipped identities', () => {
  for (const lang of ['en', 'nl', 'de', 'fr']) {
    const featured = api.getFeaturedPages(lang, 1000);
    assert.ok(featured.length > 0);
    for (const page of featured) {
      assert.strictEqual(page, api.getPageBySlug(lang, page.parentHub, page.parentTheme, page.ageGroup, page.slug));
    }
  }
  const sonic = api.getFeaturedPages('en', 1000).find(p => p.slug === 'sonic-the-hedgehog-1');
  assert.equal(sonic.title, 'Sonic The Hedgehog');
  assert.equal(sonic.id, 'page-sonic-the-hedgehog-1');
  assert.equal(key(sonic), 'gaming-virtual-worlds/sonic-the-hedgehog/teens/sonic-the-hedgehog-1');
  assert.ok(!sonic.image.includes('Naruto'));
  assert.equal(api.getPageBySlug('en', 'wrong-hub', sonic.parentTheme, sonic.ageGroup, sonic.slug), undefined);
});

test('empty search covers the complete catalog and pagination reaches its end', () => {
  for (const lang of ['en', 'nl', 'de', 'fr']) {
    const catalog = api.getColoringPages(lang);
    const first = getSearchPage(lang, params({}));
    assert.ok(first.total > 50);
    assert.equal(first.total, catalog.length);
    assert.equal(first.pages.length, 40);
    const second = getSearchPage(lang, params({ page: '2' }));
    assert.notEqual(key(first.pages[0]), key(second.pages[0]));
    const last = getSearchPage(lang, params({ page: '999999' }));
    assert.equal(last.page, Math.ceil(catalog.length / 40));
    assert.equal(key(last.pages.at(-1)), key(catalog.at(-1)));
    for (const page of [...first.pages, ...second.pages, ...last.pages]) {
      const detail = api.getPageBySlug(lang, page.parentHub, page.parentTheme, page.ageGroup, page.slug);
      assert.equal(page.title, detail.title);
      assert.equal(page.image, detail.image);
    }
    console.log(`${lang}: ${catalog.length} catalog pages, ${api.getFeaturedPages(lang, 1000).length} resolved featured pages`);
  }
  for (const page of ['NaN', '-1', '1.5', 'Infinity']) {
    assert.equal(getSearchPage('en', params({ page })).page, 1);
  }
});

test('search requires a text match and applies theme, localized age and real difficulty', () => {
  assert.deepEqual(searchCatalog('en', params({ q: 'zzzz-no-such-coloring-98765' })), []);
  assert.equal(getSearchPage('en', params({ q: '   ' })).total, api.getColoringPages('en').length);
  const sonic = getSearchPage('en', params({ theme: 'sonic-the-hedgehog', difficulty: 'hard', age: 'teens' }));
  assert.ok(sonic.pages.some(p => p.slug === 'sonic-the-hedgehog-1'));
  assert.ok(sonic.pages.every(p => p.parentTheme === 'sonic-the-hedgehog' && p.difficulty === 'hard' && p.ageGroup === 'teens'));
  const dutch = getSearchPage('nl', params({ age: 'kids' }));
  assert.ok(dutch.total > 0);
  assert.ok(dutch.pages.every(p => ['kids', 'kinderen', 'toddlers', 'peuters'].includes(p.ageGroup)));
  const naruto = getSearchPage('en', params({ q: 'Naruto' }));
  assert.ok(naruto.total > 0);
  assert.ok(!naruto.pages.some(p => p.slug === 'sonic-the-hedgehog-1'));
});

test('filtered searches are not limited by autocomplete and clearing restores the catalog', () => {
  const filters = { theme: 'sonic-the-hedgehog' };
  const first = getSearchPage('en', params(filters));
  const expected = api.getColoringPagesForTheme('en', 'gaming-virtual-worlds', filters.theme);
  assert.ok(expected.length > 50);
  assert.equal(first.total, expected.length);
  const second = getSearchPage('en', params({ ...filters, page: '2' }));
  assert.equal(second.pages.length, 40);
  assert.equal(key(second.pages[0]), key(expected[40]));
  assert.equal(getSearchPage('en', params({})).total, api.getColoringPages('en').length);
  assert.equal(searchCatalog('../invalid', params({ type: 'page' })).length, api.getColoringPages('en').length);
});

test('unrecognized age filters cannot access inherited object properties', () => {
  for (const age of ['toString', 'constructor', '__proto__', 'unknown']) {
    assert.equal(getSearchPage('en', params({ age })).total, 0);
    assert.deepEqual(searchCatalog('en', params({ age })), []);
  }
});

test('generated indexes contain exactly the runtime page records in all locales', () => {
  for (const lang of ['en', 'nl', 'de', 'fr']) {
    const generated = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', `search-index-${lang}.json`), 'utf8'));
    const expected = buildSearchIndex(lang, [], [], api.getColoringPages(lang));
    assert.deepEqual(generated.filter(e => e.type === 'page'), JSON.parse(JSON.stringify(expected)));
    assert.equal(new Set(expected.map(e => e.url)).size, expected.length);
  }
});
