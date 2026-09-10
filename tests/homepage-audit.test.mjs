import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const { resolveTitle } = require('next/dist/lib/metadata/resolvers/resolve-title');
const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

function load(code, mocks = {}) {
  const exports = {};
  const compiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  runInNewContext(compiled, {
    exports,
    URL,
    require: (id) => {
      if (id in mocks) return mocks[id];
      if (id === 'react' || id === 'react/jsx-runtime') return require(id);
      if (id.endsWith('.css')) return new Proxy({}, { get: (_, key) => key });
      if (id.startsWith('@/components/') || id === 'next/link') return id;
      throw new Error(`Unexpected import: ${id}`);
    },
  });
  return exports;
}

const homepageSource = source('src/app/[lang]/page.tsx');
const homepage = (hubs = [], themes = []) => load(homepageSource, {
  '@/lib/api': {
    getMainHubs: () => hubs,
    getThemes: () => themes,
    getFeaturedPages: () => [],
    getSampleImagesForTheme: () => [],
  },
  '@/data/blogs': { blogPosts: { en: [], nl: [] } },
});

function elements(node) {
  if (Array.isArray(node)) return node.flatMap(elements);
  if (!node || typeof node !== 'object') return [];
  return [node, ...elements(node.props?.children)];
}

function text(node) {
  if (Array.isArray(node)) return node.map(text).join('');
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'object') return text(node.props?.children);
  return String(node);
}

test('layout preserves complete route titles without a duplicate brand', () => {
  const code = source('src/app/[lang]/layout.tsx');
  const ast = ts.createSourceFile('layout.tsx', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let initializer;
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(ast) === 'metadata') initializer = declaration.initializer.getText(ast);
    }
  }
  assert.ok(initializer);
  const { metadata } = load(`export const metadata = ${initializer}`);
  assert.equal(metadata.metadataBase.origin, 'https://www.colorvaults.com');
  const inheritedTemplate = resolveTitle(metadata.title, null).template;
  for (const title of ['Contact | ColorVaults', 'ColorVaults | Free Premium Coloring Pages', 'Parenting & Teaching Guides']) {
    assert.equal(resolveTitle(title, inheritedTemplate).absolute, title);
  }
});

test('homepage metadata uses the preferred host for every supported locale', async () => {
  for (const lang of ['en', 'nl', 'de', 'fr']) {
    const metadata = await homepage().generateMetadata({ params: Promise.resolve({ lang }) });
    assert.equal(metadata.title.match(/ColorVaults/g).length, 1);
    assert.equal(metadata.alternates.canonical, `/${lang}`);
    assert.equal(new URL(metadata.openGraph.url, 'https://www.colorvaults.com').href, `https://www.colorvaults.com/${lang}`);
    assert.equal(metadata.alternates.languages['x-default'], '/en');
  }
});

test('robots allows public Next assets and keeps API paths disallowed', () => {
  const robots = load(source('src/app/robots.ts')).default();
  const rule = robots.rules[0];
  assert.equal(rule.allow, '/');
  assert.ok(rule.disallow.includes('/api/'));
  for (const asset of ['/_next/static/chunks/app.js', '/_next/static/css/app.css', '/_next/image']) {
    assert.ok(!rule.disallow.some((path) => asset.startsWith(path)), asset);
  }
  assert.equal(robots.sitemap.length, 5);
  assert.ok(robots.sitemap.every((url) => new URL(url).hostname === 'www.colorvaults.com'));
});

test('homepage counts reflect supplied data and difficulty links use supported search filters', async () => {
  for (const lang of ['en', 'nl']) {
    for (const count of [0, 2, 11]) {
      const hubs = Array.from({ length: count }, (_, i) => ({ slug: `hub-${i}`, title: `Hub ${i}` }));
      const themes = hubs.flatMap((hub) => [0, 1].map((i) => ({ slug: `theme-${hub.slug}-${i}`, parentHub: hub.slug, title: 'Theme' })));
      const tree = await homepage(hubs, themes).default({ params: Promise.resolve({ lang }) });
      const nodes = elements(tree);
      const content = text(tree);
      assert.ok(content.includes(lang === 'en' ? `Explore All ${count} Hubs` : `Ontdek Alle ${count} Hoofdcategorieën`));
      assert.ok(content.includes(`${themes.length} ${lang === 'en' ? 'Themes' : "Thema's"}`));
      const links = nodes.map((node) => node.props?.href).filter((href) => href?.includes('difficulty='));
      assert.deepEqual(links, ['easy', 'medium', 'hard'].map((difficulty) => `/${lang}/search?difficulty=${difficulty}`));
    }
  }
});

test('homepage age labels and promotional copy avoid the audited claims', () => {
  const card = source('src/components/MotionCard.tsx');
  assert.ok(card.includes("age.includes('teen')"));
  assert.ok(card.includes("age.includes('adult')"));
  for (const label of ['Older Kids (9-12y)', 'Oudere Kinderen (9-12j)', 'Teens & Adults (13+)', 'Tieners & Volwassenen (13+)']) {
    assert.ok(card.includes(label));
  }
  for (const path of ['src/app/[lang]/page.tsx', 'src/components/HeaderSearchBar.tsx', 'src/components/NewsletterBox.tsx', 'src/components/TrendingCarousel.tsx', 'src/components/FaqSection.tsx']) {
    assert.doesNotMatch(source(path), /world[- ]first|wereldprimeur|10[,.]000\+|15[,.]000\+|18[,.]800\+|130\+|printed and colored by thousands/i, path);
  }
});
