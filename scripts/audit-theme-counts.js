const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

for (const lang of ['en', 'nl']) {
  const themes = JSON.parse(fs.readFileSync(path.join(dataDir, lang, 'themes.json'), 'utf8'));
  const pages = JSON.parse(fs.readFileSync(path.join(dataDir, lang, 'coloring-pages.json'), 'utf8'));

  const countByTheme = {};
  for (const p of pages) {
    const key = `${p.parentHub}/${p.parentTheme}`;
    countByTheme[key] = (countByTheme[key] || 0) + 1;
  }

  const themeStats = themes.map(t => {
    const key = `${t.parentHub}/${t.slug}`;
    const count = countByTheme[key] || 0;
    const needed = Math.max(0, 100 - count);
    return {
      hub: t.parentHub,
      slug: t.slug,
      title: t.title,
      count,
      needed,
    };
  });

  // Sort by count ascending (lowest first)
  themeStats.sort((a, b) => a.count - b.count);

  const below100 = themeStats.filter(t => t.count < 100);
  const totalPages = pages.length;

  console.log(`\n=================== THEME COUNT AUDIT (${lang.toUpperCase()}) ===================`);
  console.log(`Total Themes: ${themes.length}`);
  console.log(`Total Coloring Pages: ${totalPages}`);
  console.log(`Themes with >= 100 pages: ${themes.length - below100.length} / ${themes.length}`);
  console.log(`Themes with < 100 pages: ${below100.length} / ${themes.length}`);

  let totalNeeded = 0;
  console.log(`\n--- LIST OF THEMES NEEDING MORE PAGES (MIN 100) ---`);
  below100.forEach((t, index) => {
    totalNeeded += t.needed;
    console.log(`${index + 1}. [${t.hub} -> ${t.slug}] "${t.title}": Huidig: ${t.count} | Nog nodig: ${t.needed}`);
  });

  console.log(`\nTotaal extra kleurplaten nodig voor ${lang.toUpperCase()} om overal minimaal 100 te hebben: ${totalNeeded}`);
}
