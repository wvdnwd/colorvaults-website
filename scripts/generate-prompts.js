const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'en');
const outputTxtPath = path.join(__dirname, '..', 'flux-prompts.txt');

// Load Data
const hubs = JSON.parse(fs.readFileSync(path.join(dataDir, 'main-hubs.json'), 'utf8'));
const themes = JSON.parse(fs.readFileSync(path.join(dataDir, 'themes.json'), 'utf8'));
const ages = JSON.parse(fs.readFileSync(path.join(dataDir, 'age-pages.json'), 'utf8'));

// Mappings
const levelMap = {
  toddlers: { tag: '[L1]', desc: 'very simple, thick bold outlines, minimal details, no shading, pure white background, easy to color, cute style' },
  kids: { tag: '[L2]', desc: 'simple clear outlines, fun and engaging elements, pure white background, easy to color' },
  teens: { tag: '[L3]', desc: 'detailed, thinner lines, pure white background, creative composition' },
  adults: { tag: '[L4]', desc: 'very complex, intricate, dense patterns, adult coloring book style, thin lines, pure white background' }
};

let output = '';

for (const hub of hubs) {
  output += `# ${hub.title}\n\n`;

  const hubThemes = themes.filter(t => t.parentHub === hub.slug);

  for (const theme of hubThemes) {
    const themeAges = ages.filter(a => a.parentTheme === theme.slug);

    for (const age of themeAges) {
      const ageKey = age.slug; // 'toddlers', 'kids', 'teens', 'adults'
      if (!levelMap[ageKey]) continue; // fallback

      const levelInfo = levelMap[ageKey];
      const ageCapitalized = ageKey.charAt(0).toUpperCase() + ageKey.slice(1);

      output += `## ${theme.title} - ${ageCapitalized}\n`;

      for (let i = 1; i <= 15; i++) {
        // Vary the subject slightly using the index so the prompts aren't 100% identical
        let subjectVariation = '';
        if (i % 3 === 0) subjectVariation = 'close-up portrait of ';
        if (i % 3 === 1) subjectVariation = 'full body showing ';
        if (i % 3 === 2) subjectVariation = 'action pose of ';

        const prompt = `${levelInfo.tag} A black and white coloring page of ${subjectVariation}${theme.title}, ${levelInfo.desc}`;
        output += `${prompt}\n`;
      }
      
      output += '\n';
    }
  }
}

fs.writeFileSync(outputTxtPath, output);
console.log(`✅ Generated prompts successfully at: ${outputTxtPath}`);
