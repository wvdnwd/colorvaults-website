const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

for (const lang of ['en', 'nl']) {
  const hubs = JSON.parse(fs.readFileSync(path.join(dataDir, lang, 'main-hubs.json'), 'utf8'));
  const themes = JSON.parse(fs.readFileSync(path.join(dataDir, lang, 'themes.json'), 'utf8'));
  const pages = JSON.parse(fs.readFileSync(path.join(dataDir, lang, 'coloring-pages.json'), 'utf8'));

  console.log(`\n=================== AUDIT: ${lang.toUpperCase()} ===================`);
  console.log(`Total Hubs: ${hubs.length}`);
  console.log(`Total Themes: ${themes.length}`);
  console.log(`Total Coloring Pages: ${pages.length}`);

  // Image checks
  const defaultHubImgs = hubs.filter(h => !h.image || h.image.includes('default.jpg'));
  const defaultThemeImgs = themes.filter(t => !t.image || t.image.includes('default.jpg'));
  const defaultPageImgs = pages.filter(p => !p.image || p.image.includes('default.jpg'));

  console.log(`Hubs with default/missing image: ${defaultHubImgs.length} / ${hubs.length}`);
  console.log(`Themes with default/missing image: ${defaultThemeImgs.length} / ${themes.length}`);
  console.log(`Pages with default/missing image: ${defaultPageImgs.length} / ${pages.length}`);

  // Orphan themes
  const hubSlugs = new Set(hubs.map(h => h.slug));
  const orphanThemes = themes.filter(t => !hubSlugs.has(t.parentHub));
  console.log(`Orphan Themes (parentHub not found): ${orphanThemes.length}`);

  // Orphan pages
  const themeKeys = new Set(themes.map(t => `${t.parentHub}/${t.slug}`));
  const orphanPages = pages.filter(p => !themeKeys.has(`${p.parentHub}/${p.parentTheme}`));
  console.log(`Orphan Coloring Pages (parentTheme not found): ${orphanPages.length}`);

  // Short/Missing metadata
  const missingMeta = pages.filter(p => !p.metaTitle || !p.metaDescription || p.metaTitle.length < 10 || p.metaDescription.length < 20);
  console.log(`Pages with missing/short metadata: ${missingMeta.length}`);

  // Check tags
  const pagesWithoutTags = pages.filter(p => !p.tags || p.tags.length === 0);
  console.log(`Pages without tags: ${pagesWithoutTags.length}`);
}
