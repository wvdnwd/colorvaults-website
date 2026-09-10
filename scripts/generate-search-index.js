/* eslint-disable @typescript-eslint/no-require-imports -- Node 20 CommonJS build script. */
/** Run: node scripts/generate-search-index.js */
const fs = require('fs');
const path = require('path');
const { buildSearchIndex } = require('../src/lib/search-index');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const publicDir = path.join(__dirname, '..', 'public');

function readJson(lang, filename) {
  let filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) filePath = path.join(dataDir, 'en', filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const index = [];
for (const lang of ['en', 'nl', 'de', 'fr']) {
  const hubs = readJson(lang, 'main-hubs.json');
  const themes = readJson(lang, 'themes.json');
  // Match runtime catalog membership and per-file English fallback, not directory contents.
  const pages = themes.flatMap(theme =>
    readJson(lang, `themes-data/${theme.slug}.json`)
      .filter(page => page.parentHub === theme.parentHub && page.parentTheme === theme.slug));
  const entries = buildSearchIndex(lang, hubs, themes, pages);
  fs.writeFileSync(path.join(publicDir, `search-index-${lang}.json`), JSON.stringify(entries));
  index.push(...entries);
  console.log(`Search index (${lang}): ${entries.length} entries`);
}
fs.writeFileSync(path.join(publicDir, 'search-index.json'), JSON.stringify(index));
