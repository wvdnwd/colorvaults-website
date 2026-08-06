const fs = require('fs');
const path = require('path');

const srcDir = '\\\\?\\C:\\Users\\Gebruiker\\Desktop\\colorvaults\\output\\website picture ';
const destDir = path.join(__dirname, '..', 'public', 'images', 'categories');
const bannerDest = path.join(__dirname, '..', 'public', 'images', 'banner.png');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const jsonFiles = {
  hubsEn: path.join(dataDir, 'en', 'main-hubs.json'),
  hubsNl: path.join(dataDir, 'nl', 'main-hubs.json'),
  themesEn: path.join(dataDir, 'en', 'themes.json'),
  themesNl: path.join(dataDir, 'nl', 'themes.json')
};

// Ensure destDir exists
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

let hubsEn = readJson(jsonFiles.hubsEn);
let themesEn = readJson(jsonFiles.themesEn);
let hubsNl = readJson(jsonFiles.hubsNl);
let themesNl = readJson(jsonFiles.themesNl);

// Helper to sanitize folder names to find matches
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findMatch(folderName) {
  const norm = normalize(folderName);
  
  if (norm.includes('homepage') || norm.includes('banner')) return { type: 'banner' };
  if (norm.includes('minecraft')) return { type: 'theme', slug: 'fortnite' }; // Special case
  
  if (folderName === 'Animals _ Nature') return { type: 'hub', slug: 'animals-and-nature' };
  if (folderName === 'Disney _ Fairy Tales') return { type: 'hub', slug: 'disney-and-fairy-tales' };
  if (folderName === 'Games _ Pop Culture') return { type: 'hub', slug: 'games-and-pop-culture' };
  if (folderName === 'TV Series _ Movies') return { type: 'hub', slug: 'tv-series-and-movies' };
  if (folderName === 'School _ Templates') return { type: 'hub', slug: 'school-education-templates' };

  let match = hubsEn.find(h => normalize(h.title) === norm);
  if (match) return { type: 'hub', slug: match.slug };

  match = themesEn.find(t => normalize(t.title) === norm);
  if (match) return { type: 'theme', slug: match.slug };
  
  // Try relaxed match
  match = hubsEn.find(h => normalize(h.title).includes(norm) || norm.includes(normalize(h.title)));
  if (match) return { type: 'hub', slug: match.slug };
  
  match = themesEn.find(t => normalize(t.title).includes(norm) || norm.includes(normalize(t.title)));
  if (match) return { type: 'theme', slug: match.slug };

  return null;
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (f.endsWith('.png') || f.endsWith('.jpg')) {
      const parentFolder = path.basename(path.dirname(fullPath));
      const match = findMatch(parentFolder);
      
      if (match) {
        if (match.type === 'banner') {
          fs.copyFileSync(fullPath, bannerDest);
          console.log(`✅ Copied Banner: ${parentFolder} -> banner.png`);
        } else {
          const newPath = `/images/categories/${match.slug}.png`;
          const destFile = path.join(destDir, `${match.slug}.png`);
          fs.copyFileSync(fullPath, destFile);
          console.log(`✅ Copied ${match.type}: ${parentFolder} -> ${match.slug}.png`);

          // Update JSON
          if (match.type === 'hub') {
            hubsEn = hubsEn.map(h => h.slug === match.slug ? { ...h, image: newPath } : h);
            hubsNl = hubsNl.map(h => h.slug === match.slug ? { ...h, image: newPath } : h);
          } else if (match.type === 'theme') {
            themesEn = themesEn.map(t => t.slug === match.slug ? { ...t, image: newPath } : t);
            themesNl = themesNl.map(t => t.slug === match.slug ? { ...t, image: newPath } : t);
          }
        }
      } else {
        console.log(`❌ No match found for folder: ${parentFolder} (File: ${f})`);
      }
    }
  }
}

console.log('Starting import...');
walk(srcDir);

// Save updated JSONs
writeJson(jsonFiles.hubsEn, hubsEn);
writeJson(jsonFiles.hubsNl, hubsNl);
writeJson(jsonFiles.themesEn, themesEn);
writeJson(jsonFiles.themesNl, themesNl);

console.log('JSON files updated successfully.');
