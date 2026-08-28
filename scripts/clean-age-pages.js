const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

for (const lang of ['en', 'nl']) {
  const agePath = path.join(dataDir, lang, 'age-pages.json');
  let agePages = JSON.parse(fs.readFileSync(agePath, 'utf8'));

  const countBefore = agePages.length;
  agePages = agePages.filter(a => a.parentTheme !== 'default' && a.parentTheme !== 'unsorted');

  fs.writeFileSync(agePath, JSON.stringify(agePages, null, 2), 'utf8');
  console.log(`Cleaned age-pages.json for ${lang}: ${countBefore} -> ${agePages.length} entries`);
}
