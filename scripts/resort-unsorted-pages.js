const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const MAPPINGS_EN = {
  'default-1': { hub: 'collections', theme: 'architecture' },
  'default-2': { hub: 'collections', theme: 'magical-forest' },
  'unsorted-1': { hub: 'collections', theme: 'cars-trucks' },
  'unsorted-2': { hub: 'collections', theme: 'cars-trucks' },
  'unsorted-3': { hub: 'collections', theme: 'cars-trucks' },
  'unsorted-4': { hub: 'animals-and-nature', theme: 'animals' },
  'unsorted-5': { hub: 'collections', theme: 'cars-trucks' },
  'unsorted-6': { hub: 'disney-and-fairy-tales', theme: 'fantasy-kingdom' },
  'unsorted-7': { hub: 'disney-and-fairy-tales', theme: 'fairy-tale-kingdom' },
  'unsorted-8': { hub: 'animals-and-nature', theme: 'botanical-gardens' },
  'unsorted-9': { hub: 'collections', theme: 'cars-trucks' },
};

const MAPPINGS_NL = {
  'default-1': { hub: 'collecties', theme: 'architecture' },
  'default-2': { hub: 'collecties', theme: 'magical-forest' },
  'unsorted-1': { hub: 'collecties', theme: 'cars-trucks' },
  'unsorted-2': { hub: 'collecties', theme: 'cars-trucks' },
  'unsorted-3': { hub: 'collecties', theme: 'cars-trucks' },
  'unsorted-4': { hub: 'dieren-en-natuur', theme: 'animals' },
  'unsorted-5': { hub: 'collecties', theme: 'cars-trucks' },
  'unsorted-6': { hub: 'disney-en-sprookjes', theme: 'fantasy-kingdom' },
  'unsorted-7': { hub: 'disney-en-sprookjes', theme: 'fairy-tale-kingdom' },
  'unsorted-8': { hub: 'dieren-en-natuur', theme: 'botanical-gardens' },
  'unsorted-9': { hub: 'collecties', theme: 'cars-trucks' },
};

for (const lang of ['en', 'nl']) {
  const mappings = lang === 'en' ? MAPPINGS_EN : MAPPINGS_NL;
  const pagesPath = path.join(dataDir, lang, 'coloring-pages.json');

  let pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

  pages = pages.map(p => {
    if (mappings[p.slug]) {
      const target = mappings[p.slug];
      return { ...p, parentHub: target.hub, parentTheme: target.theme };
    }
    return p;
  });

  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  console.log(`Successfully mapped pages to cars-trucks for ${lang}!`);
}
