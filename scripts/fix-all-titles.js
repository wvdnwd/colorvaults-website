const fs = require('fs');
const path = require('path');

const MAP_PATH = 'C:/Users/Gebruiker/Desktop/colorvaults/output/prompt_history_map.json';
const EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'coloring-pages.json');
const NL_PATH = path.join(__dirname, '..', 'src', 'data', 'nl', 'coloring-pages.json');
const THEMES_EN_PATH = path.join(__dirname, '..', 'src', 'data', 'en', 'themes.json');

console.log('Loading prompt history map...');
const promptMap = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));

console.log('Loading coloring pages...');
const pagesEn = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
const pagesNl = JSON.parse(fs.readFileSync(NL_PATH, 'utf8'));
const themesEn = JSON.parse(fs.readFileSync(THEMES_EN_PATH, 'utf8'));

const themeTitleMap = {};
themesEn.forEach(t => {
  themeTitleMap[t.slug] = t.title;
});

// Translation map for common words and phrases
const NL_DICTIONARY = [
  // Phrases
  [/on Pride Rock/gi, 'op de Koningsrots'],
  [/at the Waterhole/gi, 'bij de Waterpoel'],
  [/on Jungle Log/gi, 'op de Boomstam'],
  [/in the Forest/gi, 'in het Bos'],
  [/in the Castle/gi, 'in het Kasteel'],
  [/in the Garden/gi, 'in de Tuin'],
  [/in the Snow/gi, 'in de Sneeuw'],
  [/in the Ocean/gi, 'in de Oceaan'],
  [/at the Beach/gi, 'op het Strand'],
  [/in the Sky/gi, 'in de Lucht'],
  [/under the Sea/gi, 'onder Water'],
  [/Great Circle of Life/gi, 'Kringloop van het Leven'],
  [/Emergency Meeting Table/gi, 'Spoedvergadering Tafel'],
  [/Space Corridor/gi, 'Ruimte Gang'],
  [/Hidden Leaf Village/gi, 'Hidden Leaf Dorp'],
  [/Hogwarts Castle/gi, 'Zweinstein Kasteel'],
  [/Enchanted Rose/gi, 'Betoverde Roos'],
  [/Magic Carpet/gi, 'Vliegend Tapijt'],
  [/Glass Slipper/gi, 'Glazen Muiltje'],
  [/Pumpkin Carriage/gi, 'Pompoenkoets'],
  [/Ballroom Dance/gi, 'Balspeeltuin Dans'],

  // Words
  [/\bBeing Lifted\b/gi, 'Getild'],
  [/\bLifted\b/gi, 'Getild'],
  [/\bTeaching\b/gi, 'Onderwijzend'],
  [/\bPlaying\b/gi, 'Spelend'],
  [/\bMarching\b/gi, 'Marcherend'],
  [/\bRunning\b/gi, 'Rennend'],
  [/\bJumping\b/gi, 'Springend'],
  [/\bFlying\b/gi, 'Vliegend'],
  [/\bSwimming\b/gi, 'Zwemmend'],
  [/\bDancing\b/gi, 'Dansend'],
  [/\bSinging\b/gi, 'Zingend'],
  [/\bSleeping\b/gi, 'Slapend'],
  [/\bEating\b/gi, 'Etend'],
  [/\bSmiling\b/gi, 'Lachend'],
  [/\bWearing\b/gi, 'Met'],
  [/\bHolding\b/gi, 'Met'],
  [/\bBuilding\b/gi, 'Bouwend'],
  [/\bExploring\b/gi, 'Op Avontuur'],
  [/\bAdventure\b/gi, 'Avontuur'],
  [/\bAdventures\b/gi, 'Avonturen'],
  [/\bCelebration\b/gi, 'Feest'],
  [/\bBirthday\b/gi, 'Verjaardag'],
  [/\bJourney\b/gi, 'Reis'],
  [/\bFriendship\b/gi, 'Vriendschap'],
  [/\bFriends\b/gi, 'Vrienden'],
  [/\bFamily\b/gi, 'Familie'],
  [/\bPrincess\b/gi, 'Prinses'],
  [/\bPrince\b/gi, 'Prins'],
  [/\bQueen\b/gi, 'Koningin'],
  [/\bKing\b/gi, 'Koning'],
  [/\bKnight\b/gi, 'Ridder'],
  [/\bKnights\b/gi, 'Ridders'],
  [/\bDragon\b/gi, 'Draak'],
  [/\bDragons\b/gi, 'Draken'],
  [/\bUnicorn\b/gi, 'Eenhoorn'],
  [/\bUnicorns\b/gi, 'Eenhoorns'],
  [/\bFairy\b/gi, 'Fee'],
  [/\bFairies\b/gi, 'Feeën'],
  [/\bMermaid\b/gi, 'Zeemeermin'],
  [/\bMermaids\b/gi, 'Zeemeerminnen'],
  [/\bMonster\b/gi, 'Monster'],
  [/\bMonsters\b/gi, 'Monsters'],
  [/\bPuppy\b/gi, 'Puppy'],
  [/\bPuppies\b/gi, 'Puppies'],
  [/\bDog\b/gi, 'Hond'],
  [/\bDogs\b/gi, 'Honden'],
  [/\bKitten\b/gi, 'Kitten'],
  [/\bKittens\b/gi, 'Kittens'],
  [/\bCat\b/gi, 'Kat'],
  [/\bCats\b/gi, 'Katten'],
  [/\bBunny\b/gi, 'Konijntje'],
  [/\bBunnies\b/gi, 'Konijntjes'],
  [/\bRabbit\b/gi, 'Konijn'],
  [/\bRabbits\b/gi, 'Konijnen'],
  [/\bHorse\b/gi, 'Paard'],
  [/\bHorses\b/gi, 'Paarden'],
  [/\bPony\b/gi, 'Pony'],
  [/\bPonies\b/gi, 'Pony\'s'],
  [/\bDinosaur\b/gi, 'Dinosaurus'],
  [/\bDinosaurs\b/gi, 'Dinosaurussen'],
  [/\bFlowers\b/gi, 'Bloemen'],
  [/\bFlower\b/gi, 'Bloem'],
  [/\bButterflies\b/gi, 'Vlinders'],
  [/\bButterfly\b/gi, 'Vlinder'],
  [/\bRainbow\b/gi, 'Regenboog'],
  [/\bRainbows\b/gi, 'Regenbogen'],
  [/\bCastle\b/gi, 'Kasteel'],
  [/\bCastles\b/gi, 'Kastelen'],
  [/\bChristmas\b/gi, 'Kerst'],
  [/\bWinter\b/gi, 'Winter'],
  [/\bSummer\b/gi, 'Zomer'],
  [/\bAutumn\b/gi, 'Herfst'],
  [/\bSpring\b/gi, 'Lente'],
  [/\bEaster\b/gi, 'Pasen'],
  [/\bHalloween\b/gi, 'Halloween'],
  [/\bSnowman\b/gi, 'Sneeuwpop'],
  [/\bSanta Claus\b/gi, 'Kerstman'],
  [/\bSanta\b/gi, 'Kerstman'],
  [/\bReindeer\b/gi, 'Rendier'],
  [/\bFire Engine\b/gi, 'Brandweerauto'],
  [/\bPolice Car\b/gi, 'Politieauto'],
  [/\bRace Car\b/gi, 'Raceauto'],
  [/\bRacecar\b/gi, 'Raceauto'],
  [/\bMonster Truck\b/gi, 'Monstertruck'],
  [/\bSpace Rocket\b/gi, 'Raket'],
  [/\bRocket\b/gi, 'Raket'],
  [/\bAstronaut\b/gi, 'Astronaut'],
  [/\bCrewmate\b/gi, 'Bemanningslid'],
  [/\bCrewmates\b/gi, 'Bemanningsleden'],
  [/\bImpostor\b/gi, 'Bedrieger'],
  [/\bwith\b/gi, 'met'],
  [/\band\b/gi, 'en'],
  [/\bin\b/gi, 'in'],
  [/\bon\b/gi, 'op'],
  [/\bat\b/gi, 'bij'],
  [/\bunder\b/gi, 'onder'],
  [/\bover\b/gi, 'over'],
  [/\bfor\b/gi, 'voor'],
  [/\bfrom\b/gi, 'van'],
  [/\bby\b/gi, 'door'],
  [/\bthe\b/gi, 'de'],
  [/\ba\b/gi, 'een'],
  [/\ban\b/gi, 'een'],
  [/\bView\b/gi, 'Weergave'],
  [/\bScene\b/gi, 'Scène']
];

function translateToDutch(enTitle) {
  let nl = enTitle;
  for (const [pattern, replacement] of NL_DICTIONARY) {
    nl = nl.replace(pattern, replacement);
  }
  return nl.charAt(0).toUpperCase() + nl.slice(1);
}

function cleanPromptToTitle(prompt, themeTitle) {
  if (!prompt) return themeTitle;

  let text = prompt;

  // 1. Remove style suffixes and boilerplates
  text = text.replace(/,?\s*(?:clean open contour|elegant hollow|spacious white|strictly no|no black|no dark|no heavy|no gray|zero fill|8k digital art|iconic characters filling|rich saturated|dramatic cinematic|full-bleed|zero borders|no margins|no letterboxing|strictly textless|no text|no words|no letters|zero typography|masterpiece 8k|banner tag).*$/i, '');

  // 2. Pattern: '...: <SCENE>'
  const colonIdx = text.indexOf(':');
  if (colonIdx !== -1 && colonIdx < 80) {
    text = text.substring(colonIdx + 1).trim();
  }

  // 3. Pattern: 'showing <SCENE>'
  const showingMatch = text.match(/showing\s+(.+)$/i);
  if (showingMatch) {
    text = showingMatch[1].trim();
  }

  // 4. Pattern: 'coloring page of <SCENE>'
  const ofMatch = text.match(/coloring page of\s+(.+)$/i);
  if (ofMatch) {
    text = ofMatch[1].trim();
  }

  // Strip any lingering 'coloring page' phrases
  text = text.replace(/\bcoloring pages?\s*(of\s*(a|an|the)?)?/gi, '');

  // 5. Pattern: '<Franchise>, <Character> from <Show>, <SCENE>'
  const fromMatch = text.match(/from\s+[^,]+,\s*(.+)$/i);
  if (fromMatch && fromMatch[1].length > 10) {
    text = fromMatch[1].trim();
  }

  // 6. Cut off background/setting details if too long: ', set in ...'
  text = text.replace(/,?\s*set in\s+.*$/i, '');
  text = text.replace(/,?\s*filling the vertical frame.*$/i, '');
  text = text.replace(/,?\s*stunning vibrant.*$/i, '');

  // Specific cleanup of redundant prompt words
  text = text.replace(/\bhigh into the sunrise atop the peak of\b/gi, 'on');
  text = text.replace(/\bsplashing water with friendly zebra colts\b/gi, '');
  text = text.replace(/\bsitting on a grassy cliff at sunset\b/gi, '');
  text = text.replace(/\bacross a fallen jungle log\b/gi, 'on Jungle Log');
  text = text.replace(/\bthe meerkat\b/gi, '');
  text = text.replace(/\bthe warthog\b/gi, '');
  text = text.replace(/\bthe cute fire salamander\b/gi, '');
  text = text.replace(/\bplaying with magical flames\b/gi, 'with Magical Flames');
  text = text.replace(/\bbeing lifted\b/gi, 'Lifted');
  text = text.replace(/\bdischarging crackling yellow electric sparks from red cheeks\b/gi, 'Electric Sparks');
  text = text.replace(/\bwith glowing spiky silver hair.*$/gi, '');
  text = text.replace(/\bcommanding a towering Sand Tsunami.*$/gi, 'Sand Tsunami');

  // Split by comma and take meaningful parts
  let parts = text.split(',').map(s => s.trim()).filter(Boolean);
  if (parts.length > 0) {
    let candidate = parts[0];
    if (candidate.length < 25 && parts[1] && (candidate.length + parts[1].length < 60)) {
      candidate += ' and ' + parts[1];
    }
    text = candidate;
  }

  // Remove leading articles & clean
  text = text.replace(/^(a|an|the)\s+/i, '');
  text = text.replace(/\s+(of|the|with|and|at|in|on|to|for|from|into|atop|about)$/i, '');

  if (text.length > 55) {
    text = text.slice(0, 55).replace(/\s+\S*$/, '');
  }

  text = text.replace(/\s{2,}/g, ' ').trim();
  return toTitleCase(text);
}

function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
            .replace(/\b(A|An|The|And|Or|In|On|At|To|For|With|By|Of|De|Van|Het|Een|En|Met|Op|Bij)\b/gi, (match, p1, offset) => {
              return offset === 0 ? p1.charAt(0).toUpperCase() + p1.substr(1).toLowerCase() : p1.toLowerCase();
            });
}

function cleanFilenameTitle(filename, themeTitle) {
  let s = filename.replace(/\.[^.]+$/, '');
  s = s.replace(/_\d{10,}.*$/, '');
  s = s.replace(/__A_clean_printable_colorin.*$/i, '');
  s = s.replace(/_A_clean_printable_colorin.*$/i, '');
  s = s.replace(/__A_clean_printable_coloring_page.*$/i, '');
  s = s.replace(/_A_clean_printable_coloring_page.*$/i, '');
  s = s.replace(/^auto_rejected_/i, '');
  s = s.replace(/^ComfyUI_\d+_/i, '');
  s = s.replace(/_\d+$/, '');
  s = s.replace(/[_-]+/g, ' ').trim();
  s = s.replace(/\bcoloring pages?\b/gi, '');
  s = s.replace(/^(A|An|The)\s+/i, '');
  s = s.replace(/\s+/g, ' ').trim();

  if (!s || s.toLowerCase() === 'coloring page' || s.length < 3) {
    return themeTitle;
  }
  return toTitleCase(s);
}

// Group pages by theme to ensure uniqueness and clean titles
const themeGroupsEn = {};
pagesEn.forEach((p, idx) => {
  if (!themeGroupsEn[p.parentTheme]) themeGroupsEn[p.parentTheme] = [];
  themeGroupsEn[p.parentTheme].push({ page: p, idx });
});

let totalFixed = 0;
let fromPrompts = 0;
let fromFilename = 0;

for (const [themeSlug, items] of Object.entries(themeGroupsEn)) {
  const themeTitle = themeTitleMap[themeSlug] || toTitleCase(themeSlug.replace(/-/g, ' '));
  const seenTitles = {};

  items.forEach(({ page, idx }) => {
    const filename = decodeURIComponent(page.image.split('/').pop());
    const isBad = (/\d{10,}/.test(page.title) || /clean printable/i.test(page.title) || /colorin/i.test(page.title) || /^Coloring Page/i.test(page.title) || page.title.trim().toLowerCase() === themeTitle.toLowerCase());

    let cleanTitle = page.title;

    if (isBad || promptMap[filename]) {
      const promptInfo = promptMap[filename];
      if (promptInfo && promptInfo.prompt) {
        cleanTitle = cleanPromptToTitle(promptInfo.prompt, themeTitle);
        fromPrompts++;
      } else {
        cleanTitle = cleanFilenameTitle(filename, themeTitle);
        fromFilename++;
      }
      totalFixed++;
    }

    if (!cleanTitle || cleanTitle.toLowerCase() === 'coloring page' || cleanTitle.length < 3) {
      cleanTitle = themeTitle;
    }

    // Ensure uniqueness within theme
    if (!seenTitles[cleanTitle]) {
      seenTitles[cleanTitle] = 1;
    } else {
      seenTitles[cleanTitle]++;
      cleanTitle = `${cleanTitle} (Scene ${seenTitles[cleanTitle]})`;
    }

    // Update EN page
    page.title = cleanTitle;
    page.metaTitle = `${cleanTitle} - Free Printable Coloring Page | ColorVaults`;
    page.metaDescription = `Download and print this free ${cleanTitle} coloring page from the ${themeTitle} collection. Print instantly in A4/Letter size!`;
    page.shortDescription = `Free printable ${cleanTitle} coloring page from our ${themeTitle} collection.`;
    page.longDescription = `Enjoy this high-quality ${cleanTitle} coloring page from the ${themeTitle} category. Designed with crisp black outlines, download or print directly in A4/Letter size for free!`;
    page.altText = `${cleanTitle} coloring page - free printable`;

    // Update NL page
    const nlTitle = translateToDutch(cleanTitle);
    const nlPage = pagesNl[idx];
    if (nlPage) {
      nlPage.title = nlTitle;
      nlPage.metaTitle = `${nlTitle} - Gratis Printbare Kleurplaat | ColorVaults`;
      nlPage.metaDescription = `Download en print deze gratis ${nlTitle} kleurplaat uit de ${themeTitle} collectie. Direct printklaar op A4-formaat!`;
      nlPage.shortDescription = `Gratis printbare ${nlTitle} kleurplaat uit onze ${themeTitle} collectie.`;
      nlPage.longDescription = `Geniet van deze hoogwaardige ${nlTitle} kleurplaat uit de categorie ${themeTitle}. Prachtig ontworpen met strakke zwarte lijnen, gratis te printen of direct online in te kleuren!`;
      nlPage.altText = `${nlTitle} kleurplaat - gratis printbaar`;
    }
  });
}

console.log(`Title fix complete! Total titles updated: ${totalFixed} (${fromPrompts} from prompts, ${fromFilename} from filenames)`);

// Save updated files
fs.writeFileSync(EN_PATH, JSON.stringify(pagesEn, null, 2), 'utf8');
fs.writeFileSync(NL_PATH, JSON.stringify(pagesNl, null, 2), 'utf8');
console.log('Saved updated coloring-pages.json (EN & NL)!');
