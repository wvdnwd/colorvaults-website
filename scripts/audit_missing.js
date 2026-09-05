const fs = require('fs');
const path = require('path');

const THEMES_EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'themes.json');
const HUBS_EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'main-hubs.json');
const PAGES_EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'coloring-pages.json');
const PAGES_NL_PATH = path.join(__dirname, '..', 'src', 'data', 'nl', 'coloring-pages.json');
const UNMATCHED_EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'unmatched-pages.json');
const GEUPLOAD_DIR = 'C:/Users/Gebruiker/Desktop/colorvaults/Geupload';

const themesEn = JSON.parse(fs.readFileSync(THEMES_EN_PATH, 'utf8'));
const hubsEn = JSON.parse(fs.readFileSync(HUBS_EN_PATH, 'utf8'));
const pagesEn = JSON.parse(fs.readFileSync(PAGES_EN_PATH, 'utf8'));
const pagesNl = JSON.parse(fs.readFileSync(PAGES_NL_PATH, 'utf8'));
const unmatchedEn = fs.existsSync(UNMATCHED_EN_PATH) ? JSON.parse(fs.readFileSync(UNMATCHED_EN_PATH, 'utf8')) : [];

console.log('====================================================');
console.log('🔍 COLORVAULTS FULL PLATFORM & DATASET AUDIT');
console.log('====================================================');
console.log(`Total Main Hubs: ${hubsEn.length}`);
console.log(`Total Themes in themes.json: ${themesEn.length}`);
console.log(`Total Pages in coloring-pages.json (EN): ${pagesEn.length}`);
console.log(`Total Pages in coloring-pages.json (NL): ${pagesNl.length}`);
console.log(`Total Unmatched Pages in Quarantine: ${unmatchedEn.length}`);

// 1. Check folders in Geupload vs themes.json
console.log('\n--- 1. FOLDER MAPPING IN GEUPLOAD ---');
const geuploadFolders = fs.readdirSync(GEUPLOAD_DIR).filter(f => {
  const p = path.join(GEUPLOAD_DIR, f);
  return fs.statSync(p).isDirectory() && !['Afgekeurd', 'Twijfel_Score_6', 'Dubbele_Fotos', 'Te_Herstellen'].includes(f);
});

console.log(`Total valid category folders in Geupload: ${geuploadFolders.length}`);

// Check which themes in themes.json have pages
const themeCounts = {};
themesEn.forEach(t => themeCounts[t.slug] = 0);
pagesEn.forEach(p => {
  if (themeCounts[p.parentTheme] !== undefined) {
    themeCounts[p.parentTheme]++;
  }
});

const emptyThemes = [];
const lowThemes = [];
const wellPopulatedThemes = [];

themesEn.forEach(t => {
  const count = themeCounts[t.slug] || 0;
  if (count === 0) {
    emptyThemes.push({ slug: t.slug, title: t.title, hub: t.parentHub });
  } else if (count < 40) {
    lowThemes.push({ slug: t.slug, title: t.title, hub: t.parentHub, count });
  } else {
    wellPopulatedThemes.push({ slug: t.slug, title: t.title, count });
  }
});

console.log(`\n--- 2. THEMES PAGE COUNT AUDIT ---`);
console.log(`✅ Well-populated themes (>= 40 pages): ${wellPopulatedThemes.length}`);
console.log(`⚠️ Low-populated themes (< 40 pages): ${lowThemes.length}`);
if (lowThemes.length > 0) {
  lowThemes.forEach(t => console.log(`  - ${t.title} (${t.slug}) [${t.hub}]: ${t.count} pages`));
}

console.log(`❌ Completely EMPTY themes (0 pages): ${emptyThemes.length}`);
if (emptyThemes.length > 0) {
  emptyThemes.forEach(t => console.log(`  - ❌ ${t.title} (${t.slug}) [${t.hub}]`));
}

// 3. Check Hubs
console.log('\n--- 3. HUBS BREAKDOWN ---');
hubsEn.forEach(h => {
  const themesInHub = themesEn.filter(t => t.parentHub === h.slug);
  const totalPages = themesInHub.reduce((sum, t) => sum + (themeCounts[t.slug] || 0), 0);
  const emptyInHub = themesInHub.filter(t => (themeCounts[t.slug] || 0) === 0).length;
  console.log(`[${h.title}] (${h.slug}): ${themesInHub.length} themes, ${totalPages} total pages | Empty: ${emptyInHub}`);
});

// 4. Check for Banner existence
console.log('\n--- 4. BANNER AUDIT ---');
const missingThemeBanners = themesEn.filter(t => !t.image || t.image === '');
console.log(`Themes missing image/banner in themes.json: ${missingThemeBanners.length}`);
if (missingThemeBanners.length > 0) {
  missingThemeBanners.forEach(t => console.log(`  - ${t.title} (${t.slug})`));
}

// 5. Check translation parity
console.log('\n--- 5. TRANSLATION PARITY (EN vs NL) ---');
console.log(`EN count: ${pagesEn.length} | NL count: ${pagesNl.length}`);
if (pagesEn.length !== pagesNl.length) {
  console.log('⚠️ Warning: EN and NL page count mismatch!');
} else {
  console.log('✅ 100% parity between EN and NL datasets.');
}

// 6. Check for missing metadata fields
console.log('\n--- 6. METADATA QUALITY AUDIT ---');
let missingSlug = 0;
let missingImage = 0;
let missingTitle = 0;
let missingMetaTitle = 0;

pagesEn.forEach(p => {
  if (!p.slug) missingSlug++;
  if (!p.image) missingImage++;
  if (!p.title) missingTitle++;
  if (!p.metaTitle) missingMetaTitle++;
});

console.log(`Missing slug: ${missingSlug} | Missing image: ${missingImage} | Missing title: ${missingTitle} | Missing metaTitle: ${missingMetaTitle}`);
