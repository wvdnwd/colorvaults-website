const fs = require('fs');
const path = require('path');

const THEME_PROMPT_CONFIGS = [
  { theme: 'fantasy-kingdom', hub: 'disney-and-fairy-tales', count: 99, topic: 'majestic castles, royal thrones, enchanted kingdom landscapes, crown jewels, medieval banners, dragon spires, knightly courtyards, stone archways' },
  { theme: 'celtic-patterns', hub: 'collections', count: 99, topic: 'intricate celtic knotwork, shamrock mandalas, ancient triquetra symbols, celtic cross patterns, interwoven spiral borders, druidic tree of life' },
  { theme: 'generatie-2-johto', hub: 'games-and-pop-culture', count: 98, topic: 'Johto region creature line art, Lugia hovering over waves, Ho-Oh soaring, Cyndaquil, Totodile, Chikorita, Bellossom, Pichu, Togepi' },
  { theme: 'generatie-5-unova', hub: 'games-and-pop-culture', count: 98, topic: 'Unova region creature line art, Reshiram, Zekrom, Victini, Snivy, Tepig, Oshawott, Zoroark, Chandelure, Axew' },
  { theme: 'generatie-9-paldea', hub: 'games-and-pop-culture', count: 98, topic: 'Paldea region creature line art, Koraidon, Miraidon, Sprigatito, Fuecoco, Quaxly, Pawmi, Lechonk, Ceruledge, Armarouge' },
  { theme: 'large-print-flowers', hub: 'animals-and-nature', count: 98, topic: 'bold large print flowers, big sunflower petals, easy lotus blossom, simple rose, bold tulip outlines, daisy bouquet for toddlers' },
  { theme: 'anime-algemeen', hub: 'tv-series-and-movies', count: 97, topic: 'chibi anime characters, cat-eared anime girl, brave samurai boy, magical anime witch, anime school student, mecha robot helmet' },
  { theme: 'kawaii', hub: 'collections', count: 97, topic: 'cute kawaii boba tea cup, smiling kawaii avocado, happy donut with sprinkle, kawaii sushi roll, cute cloud with rainbow, kawaii ice cream cone' },
  { theme: 'art-nouveau', hub: 'collections', count: 96, topic: 'art nouveau flowing floral patterns, Alphonse Mucha style ornate hair curves, elegant lily borders, stained glass peacocks, dragonfly wings' },
  { theme: 'classroom-templates', hub: 'school-education-templates', count: 96, topic: 'school classroom worksheet border, teacher desk with apple, alphabet blocks, ABC learning pattern, pencil holder, backpack & books' },
  { theme: 'blippi', hub: 'tv-series-and-movies', count: 95, topic: 'playful orange-and-blue wearing explorer character, excavator exploration, fire truck visit, monster truck show, playground fun, science experiment' },
  { theme: 'bluey', hub: 'tv-series-and-movies', count: 94, topic: 'playful puppy dog family in living room, backyard games, scooter riding, tea party, beach day, obstacle course' },
  { theme: 'coloring-calendars', hub: 'collections', count: 94, topic: 'monthly calendar frame with seasonal flowers, winter snow scene border, spring butterfly border, summer sun border, autumn leaf border' },
  { theme: 'craft-sketches-food-and-sweets', hub: 'girls-themes', count: 94, topic: 'delicious layered cake with strawberries, ice cream sundae bowl, cupcake with cherry, macaron stack, chocolate bar, bakery display' },
  { theme: 'generatie-1-kanto', hub: 'games-and-pop-culture', count: 94, topic: 'classic Kanto creature line art, Pikachu eating berry, Charmander tail flame, Squirtle swimming, Bulbasaur garden, Eevee playing, Snorlax sleeping' },
  { theme: 'patterns', hub: 'collections', count: 94, topic: 'seamless repeating geometric pattern, floral tile mandala, tessellation art, abstract line swirls, diamond lattice design' },
  { theme: 'sinterklaas', hub: 'adults', count: 94, topic: 'Sinterklaas on white horse Amerigo, steamboat arriving in harbor, burlap bag with gifts and gingerbread cookies, chocolate letters, chimney night' },
  { theme: 'blank-calendars', hub: 'calendars', count: 94, topic: 'clean monthly calendar grid layout with seasonal corner decorations, habit tracker template, floral border planner page' },
  { theme: 'monthly-calendars', hub: 'calendars', count: 94, topic: 'january through december calendar pages with cute seasonal illustrations, snowmen, blossoms, sunshine, pumpkins, christmas tree' },
  { theme: 'yearly-calendars', hub: 'calendars', count: 94, topic: 'full year wall calendar overview template, decorative margin line art, goal setting planner grid' },
  { theme: 'lego-ninjago', hub: 'games-and-pop-culture', count: 93, topic: 'toy ninja warrior with katana, dragon rider figure, spinjitzu elemental vortex, temple training grounds, mecha suit' },
  { theme: 'disney-cinderella', hub: 'disney-and-fairy-tales', count: 92, topic: 'glass slipper on velvet pillow, pumpkin carriage, fairy godmother magic wand, ball gown transformation, castle clock striking midnight' },
  { theme: 'rainbows', hub: 'collections', count: 92, topic: 'vibrant rainbow over fluffy clouds, rainbow with smiling sun, unicorn under rainbow arch, rainbow balloon arch' },
];

const allPrompts = [];
let globalIndex = 1;

for (const cfg of THEME_PROMPT_CONFIGS) {
  for (let i = 1; i <= cfg.count; i++) {
    if (allPrompts.length >= 2000) break;

    const promptText = `Clean vector line art coloring page of ${cfg.topic} (item #${i}), sharp bold black outlines, pure white background, zero color fill, no grayscale, no shading, high resolution 8k, vector style lineart suitable for printable coloring book.`;

    allPrompts.push({
      id: globalIndex++,
      hub: cfg.hub,
      theme: cfg.theme,
      itemNumber: i,
      prompt: promptText,
    });
  }
}

console.log(`Generated ${allPrompts.length} prompts!`);

// Save JSON dataset
const outputJsonPath = path.join(__dirname, '../public/prompts-first-2000.json');
fs.writeFileSync(outputJsonPath, JSON.stringify(allPrompts, null, 2), 'utf8');

// Save Markdown summary file
const mdLines = [
  '# 🎨 AI Image Generation Prompts (First 2,000 Missing Coloring Pages)',
  '',
  `Generated **${allPrompts.length} prompts** across the lowest-count theme categories to reach the **min 100 pages per theme** threshold.`,
  '',
  '## Prompt Style Guidelines:',
  '- **Format**: Clean black vector line art on pure white background.',
  '- **Color**: Zero color fill, no grayscale, no gradient shading.',
  '- **Output**: High contrast 8k line-art ready for Midjourney v6 / DALL-E 3 / Stable Diffusion XL.',
  '',
  '---',
  '',
];

let currentTheme = '';
allPrompts.forEach(p => {
  if (p.theme !== currentTheme) {
    currentTheme = p.theme;
    mdLines.push(`\n### 📁 Theme: ${p.theme} (Hub: ${p.hub})\n`);
  }
  mdLines.push(`${p.id}. **Prompt #${p.itemNumber}**: \`${p.prompt}\``);
});

const outputMdPath = path.join(__dirname, '../public/prompts-first-2000.md');
fs.writeFileSync(outputMdPath, mdLines.join('\n'), 'utf8');

console.log(`Saved prompts JSON to ${outputJsonPath}`);
console.log(`Saved prompts Markdown to ${outputMdPath}`);
