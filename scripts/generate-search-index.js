/**
 * Generates a static search index JSON file at public/search-index.json
 * Run: node scripts/generate-search-index.js
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const outputPath = path.join(__dirname, '..', 'public', 'search-index.json');

function readJson(lang, filename) {
  const filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const index = [];

for (const lang of ['en', 'nl']) {
  const hubs = readJson(lang, 'main-hubs.json');
  const themes = readJson(lang, 'themes.json');

  for (const hub of hubs) {
    index.push({
      lang,
      type: 'hub',
      title: hub.title,
      description: hub.description || '',
      image: hub.image || '',
      url: `/${lang}/${hub.slug}`,
    });
  }

  for (const theme of themes) {
    index.push({
      lang,
      type: 'theme',
      title: theme.title,
      description: theme.description || '',
      image: theme.image || '',
      parentHub: theme.parentHub,
      parentTheme: theme.slug,
      url: `/${lang}/${theme.parentHub}/${theme.slug}`,
    });
  }

  const themesDataDir = path.join(dataDir, lang, 'themes-data');
  if (fs.existsSync(themesDataDir)) {
    const files = fs.readdirSync(themesDataDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const themePages = JSON.parse(fs.readFileSync(path.join(themesDataDir, f), 'utf8'));
      for (const page of themePages) {
        index.push({
          lang,
          type: 'page',
          title: page.title,
          image: page.image || '',
          parentHub: page.parentHub,
          parentTheme: page.parentTheme,
          ageGroup: page.ageGroup,
          url: `/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`,
          tags: page.tags || [],
        });
      }
    }
  }
}

fs.writeFileSync(outputPath, JSON.stringify(index));
const stats = fs.statSync(outputPath);
console.log(`Search index generated: ${index.length} entries → ${outputPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);

