const fs = require('fs');
const path = require('path');

const SPACES_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST || 'https://colorvaults.ams3.cdn.digitaloceanspaces.com';
const inputDirs = [
  'c:\\Users\\Gebruiker\\Desktop\\colorvaults\\Geupload',
  'c:\\Users\\Gebruiker\\Desktop\\colorvaults\\Gecontroleerd'
];
const dataDir = path.join(__dirname, '..', 'src', 'data');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'en'))) fs.mkdirSync(path.join(dataDir, 'en'), { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'nl'))) fs.mkdirSync(path.join(dataDir, 'nl'), { recursive: true });

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function capitalize(text) {
  return text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getAllImages(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  
  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllImages(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  
  return arrayOfFiles;
}

const ageTranslations = {
  kids: { en: 'Kids', nl: 'Kinderen' },
  teens: { en: 'Teens', nl: 'Tieners' },
  adults: { en: 'Adults', nl: 'Volwassenen' }
};

const hubsConfig = [
  {
    en: { title: 'Collections', slug: 'collections', description: 'Explore our complete library of free printable coloring pages organized by theme, difficulty, and age group. High quality line art ready for instant download and printing.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Collecties', slug: 'collecties', description: 'Ontdek onze volledige bibliotheek met gratis printbare kleurplaten opgesplitst per thema, moeilijkheidsgraad en leeftijd. Hoge resolutie lijntekeningen klaar om direct te downloaden en af te drukken.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'TV Series and Movies', slug: 'tv-series-and-movies', description: 'Discover free coloring pages featuring your favorite TV series and movie characters including Paw Patrol, Bluey, SpongeBob, Anime, and more!', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'TV Series en Films', slug: 'tv-series-en-films', description: 'Ontdek gratis kleurplaten van al je favoriete tv-series en filmhelden zoals Paw Patrol, Bluey, SpongeBob, Anime en nog veel meer!', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Disney and Fairy Tales', slug: 'disney-and-fairy-tales', description: 'Step into a magical world with free Disney princess coloring pages, fairytale castles, dragons, unicorns, and timeless stories.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Disney en Sprookjes', slug: 'disney-en-sprookjes', description: 'Stap binnen in een magische wereld vol gratis Disney prinsessen kleurplaten, sprookjeskasteeltjes, draken, eenhoorns en tijdloze verhalen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Games and Pop Culture', slug: 'games-and-pop-culture', description: 'High-octane game coloring pages featuring Super Mario, Pokémon, Sonic, Fortnite, Roblox, and epic gaming icons.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Games en Popcultuur', slug: 'games-en-popcultuur', description: 'Stoere game kleurplaten van Super Mario, Pokémon, Sonic, Fortnite, Roblox en legendarische game-iconen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Animals and Nature', slug: 'animals-and-nature', description: 'Bring nature to life with thousands of free animal coloring pages — from cute pets and farm animals to safari wildlife, sea creatures, and birds.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Dieren en Natuur', slug: 'dieren-en-natuur', description: 'Breng de natuur tot leven met duizenden gratis dierenkleurplaten — van schattige huisdieren en boerderijdieren tot safari wildernis, zeedieren en vogels.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Toddler Specific', slug: 'toddler-specific', description: 'Simple, easy coloring pages designed specifically for toddlers and young children with thick bold outlines and large coloring areas.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Speciaal voor Peuters', slug: 'speciaal-voor-peuters', description: 'Eenvoudige en makkelijke kleurplaten speciaal ontworpen voor peuters en jonge kinderen met extra dikke zwarte contouren en grote kleurvlakken.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Girls Themes', slug: 'girls-themes', description: 'Wonderful collection of cute fashion, sweet desserts, adorable pets, and colorful creative themes for girls.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Meisjes Thema\'s', slug: 'meisjes-themas', description: 'Prachtige verzameling van schattige mode, zoete lekkernijen, lieve huisdieren en creatieve kleurthema\'s.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Adults', slug: 'adults', description: 'Relaxing, detailed coloring pages for adults including cozy hygge scenes, intricate mandalas, botanical art, and soothing anti-stress designs.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Volwassenen', slug: 'volwassenen', description: 'Ontspannende en gedetailleerde kleurplaten voor volwassenen waaronder gezellige hygge scènes, ingewikkelde mandala\'s, botanische kunst en anti-stress sjablonen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Mandalas', slug: 'mandalas', description: 'Beautiful mandala coloring pages for mindfulness, stress relief, and artistic relaxation. Free high-resolution printable templates.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Mandala\'s', slug: 'mandalas', description: 'Prachtige mandala kleurplaten voor ontspanning, mindfulness en creatieve rust. Gratis hoge resolutie sjablonen om uit te printen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Calendars', slug: 'calendars', description: 'Printable blank, monthly, and yearly calendars ready to color, personalize, and organize your year.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Kalenders', slug: 'calendars', description: 'Printbare blanco-, maand- en jaarkalenders om zelf in te kleuren, te personaliseren en je jaar georganiseerd te plannen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Printables', slug: 'school-education-templates', description: 'Educational templates, school activity sheets, and creative printable tools for home and classroom learning.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Printables', slug: 'school-en-educatie-sjablonen', description: 'Educatieve sjablonen, schoolwerkbladen en creatieve printables voor thuis en in de klas.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  }
];

function getParentHubSlug(folderName, lang) {
  const lower = folderName.toLowerCase();
  const isEn = lang === 'en';
  
  if (lower.includes('mandala')) {
    return 'mandalas';
  }
  if (lower.includes('bluey') || lower.includes('paw_patrol') || lower.includes('paw patrol') || lower.includes('spongebob') || lower.includes('peppa') || lower.includes('thomas') || lower.includes('blippi') || lower.includes('cocomelon') || lower.includes('anime') || lower.includes('dragonball') || lower.includes('naruto') || lower.includes('one piece') || lower.includes('sailor moon') || lower.includes('shenron') || lower.includes('lilo') || lower.includes('stitch')) {
    return isEn ? 'tv-series-and-movies' : 'tv-series-en-films';
  }
  if (lower.includes('disney') || lower.includes('fairy') || lower.includes('princess') || lower.includes('ariel') || lower.includes('belle') || lower.includes('cinderella') || lower.includes('frozen') || lower.includes('snow white') || lower.includes('unicorn') || lower.includes('dragon') || lower.includes('fantasy') || lower.includes('wizard')) {
    return isEn ? 'disney-and-fairy-tales' : 'disney-en-sprookjes';
  }
  if (lower.includes('pokemon') || lower.includes('pokémon') || lower.includes('generatie') || lower.includes('sonic') || lower.includes('mario') || lower.includes('ninjago') || lower.includes('fortnite') || lower.includes('gaming') || lower.includes('robot') || lower.includes('ninja') || lower.includes('samurai') || lower.includes('monster') || lower.includes('cyberpunk') || lower.includes('superhero') || lower.includes('games')) {
    return isEn ? 'games-and-pop-culture' : 'games-en-popcultuur';
  }
  if (lower.includes('dog') || lower.includes('cat') || lower.includes('farm') || lower.includes('sea') || lower.includes('ocean') || lower.includes('dolphin') || lower.includes('underwater') || lower.includes('dinosaur') || lower.includes('animal') || lower.includes('bird') || lower.includes('butterfly') || lower.includes('flower') || lower.includes('botanical') || lower.includes('landscape')) {
    return isEn ? 'animals-and-nature' : 'dieren-en-natuur';
  }
  if (lower.includes('toddler') || lower.includes('peuter') || lower.includes('large shape') || lower.includes('smiley') || lower.includes('vehicle') || lower.includes('construction') || lower.includes('senior')) {
    return isEn ? 'toddler-specific' : 'speciaal-voor-peuters';
  }
  if (lower.includes('fashion') || lower.includes('sweet') || lower.includes('food') || lower.includes('treat') || lower.includes('pet')) {
    return isEn ? 'girls-themes' : 'meisjes-themas';
  }
  if (lower.includes('cozy') || lower.includes('hygge') || lower.includes('cottagecore') || lower.includes('creepy') || lower.includes('autumn') || lower.includes('christmas') || lower.includes('easter') || lower.includes('halloween') || lower.includes('sinterklaas')) {
    return isEn ? 'adults' : 'volwassenen';
  }
  
  return isEn ? 'collections' : 'collecties';
}

const generateData = () => {
  console.log('Scanning directories:', inputDirs.join(', '));
  
  let translations = {};
  for (const inputDir of inputDirs) {
    if (!fs.existsSync(inputDir)) continue;
    const translationsPath = path.join(inputDir, 'translations.json');
    if (fs.existsSync(translationsPath)) {
      try {
        const loaded = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
        translations = { ...translations, ...loaded };
        console.log(`Loaded ${Object.keys(loaded).length} translations from ${translationsPath}`);
      } catch (e) {
        console.error('Failed to load translations.json', e);
      }
    }
  }

  // Define hubs
  const enHubs = hubsConfig.map(h => ({
    title: h.en.title,
    slug: h.en.slug,
    description: h.en.description,
    image: h.en.image,
    language: 'en'
  }));

  const nlHubs = hubsConfig.map(h => ({
    title: h.nl.title,
    slug: h.nl.slug,
    description: h.nl.description,
    image: h.nl.image,
    language: 'nl'
  }));

  const enThemes = [];
  const nlThemes = [];
  const enAges = [];
  const nlAges = [];
  const enPages = [];
  const nlPages = [];

  let globalIdCounter = 1;
  const groupedThemes = {};

  for (const inputDir of inputDirs) {
    if (!fs.existsSync(inputDir)) continue;

    const folders = fs.readdirSync(inputDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !['Afgekeurd', 'Twijfel_Score_6', 'Afgekeurd_of_Twijfel', 'Dubbele_Fotos', 'Te_Herstellen', 'Geupload'].includes(name));

    for (const folder of folders) {
      let cleanFolderName = folder.replace(/_?\d+\s*extra\s*needed_?/gi, '').replace(/_?\d+_ex_?/gi, '');
      cleanFolderName = cleanFolderName.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
      const themeSlug = slugify(cleanFolderName);
      const themePath = path.join(inputDir, folder);
      const absoluteFiles = getAllImages(themePath);
      
      if (absoluteFiles.length === 0) continue;

      const files = absoluteFiles.map(abs => path.relative(inputDir, abs).replace(/\\/g, '/'));

      if (!groupedThemes[themeSlug]) {
        groupedThemes[themeSlug] = {
          themeName: capitalize(cleanFolderName),
          originalFolderName: folder,
          files: [],
          seenFiles: new Set()
        };
      }

      for (const file of files) {
        const basename = path.basename(file).toLowerCase();
        if (!groupedThemes[themeSlug].seenFiles.has(basename)) {
          groupedThemes[themeSlug].seenFiles.add(basename);
          groupedThemes[themeSlug].files.push(file);
        }
      }
    }
  }

  const seenTitlesGlobalEn = {};
  const seenTitlesGlobalNl = {};

  for (const [themeSlug, data] of Object.entries(groupedThemes)) {
    const themeName = data.themeName;
    const folder = data.originalFolderName;
    const files = data.files;

    console.log(`Processing theme: ${themeName} (${files.length} images)`);

    // Use the first file to construct the banner image URL correctly
    const firstFileUrlParts = files[0].split('/').map(encodeURIComponent).join('/');
    const themeImage = `${SPACES_BASE_URL}/${firstFileUrlParts}`;
    
    const parentHubEn = getParentHubSlug(folder, 'en');
    const parentHubNl = getParentHubSlug(folder, 'nl');

    enThemes.push({
      title: themeName,
      slug: themeSlug,
      parentHub: parentHubEn,
      description: `Explore our collection of free printable ${themeName} coloring pages. Featuring high-resolution templates perfect for kids, toddlers, teens, and adults. Download or print instantly for free!`,
      image: themeImage,
      availableAges: Object.keys(ageTranslations),
      language: 'en'
    });

    nlThemes.push({
      title: themeName,
      slug: themeSlug,
      parentHub: parentHubNl,
      description: `Ontdek onze uitgebreide verzameling van gratis printbare ${themeName} kleurplaten. Hoge resolutie sjablonen perfect voor kinderen, peuters, tieners en volwassenen. Direct gratis te downloaden en af te drukken!`,
      image: themeImage,
      availableAges: Object.keys(ageTranslations).map(a => ageTranslations[a].nl.toLowerCase()),
      language: 'nl'
    });

    const agesList = Object.keys(ageTranslations);
    
    for (const age of agesList) {
      const enAge = age;
      const nlAge = ageTranslations[age].nl.toLowerCase();
      const enAgeTitle = ageTranslations[age].en;
      const nlAgeTitle = ageTranslations[age].nl;

      enAges.push({
        title: `${themeName} for ${enAgeTitle}`,
        slug: enAge,
        parentHub: parentHubEn,
        parentTheme: themeSlug,
        ageGroup: enAge,
        introText: `Welcome to our selection of ${themeName} coloring pages specially curated for ${enAgeTitle}. Choose your favorite designs below, print them out for free, and enjoy hours of creative fun!`,
        seoText: `Looking for high-quality ${themeName} coloring pages tailored for ${enAgeTitle}? ColorVaults offers a rich selection of clean, printable templates. Whether using crayons, colored pencils, or digital tablets, these designs provide relaxing and engaging artistic activities for all skill levels.`,
        faq: [
          {
            question: `How do I print these ${themeName} coloring pages for free?`,
            answer: `Select any coloring page card to open the preview modal, then click the 'Print Free Coloring Page' button to automatically render a full-page A4/Letter print.`
          },
          {
            question: `Are these ${themeName} sheets suitable for ${enAgeTitle}?`,
            answer: `Yes! All coloring sheets in this category feature line weight and detail density optimized specifically for ${enAgeTitle}.`
          },
          {
            question: `Can I download these templates for digital coloring?`,
            answer: `Absolutely. Click 'Download Image File' to save the high-resolution file to your iPad, tablet, or computer for use in drawing apps.`
          }
        ],
        language: 'en'
      });

      nlAges.push({
        title: `${themeName} voor ${nlAgeTitle}`,
        slug: nlAge,
        parentHub: parentHubNl,
        parentTheme: themeSlug,
        ageGroup: nlAge,
        introText: `Welkom bij onze verzameling van ${themeName} kleurplaten speciaal geselecteerd voor ${nlAgeTitle}. Kies hieronder je favoriete afbeeldingen, print ze gratis uit en beleef urenlang kleurplezier!`,
        seoText: `Op zoek naar hoge kwaliteit ${themeName} kleurplaten speciaal afgestemd op ${nlAgeTitle}? ColorVaults biedt een ruime keuze aan duidelijke, printbare sjablonen. Of je nu kleurt met viltstiften, potloden of digitaal op een tablet, deze ontwerpen zorgen voor ontspannende en creatieve activiteiten.`,
        faq: [
          {
            question: `Hoe kan ik deze ${themeName} kleurplaat gratis afdrukken?`,
            answer: `Klik op een kleurplaat om het afdrukvoorbeeld te openen en gebruik de grote 'Gratis Kleurplaat Printen' knop om direct op volledig A4-formaat af te drukken.`
          },
          {
            question: `Zijn deze ${themeName} kleurplaten geschikt voor ${nlAgeTitle}?`,
            answer: `Ja! Alle kleurplaten in deze categorie zijn wat betreft lijndikte en detailniveau zorgvuldig geselecteerd voor ${nlAgeTitle}.`
          },
          {
            question: `Kan ik de ${themeName} sjablonen ook digitaal inkleuren op een tablet?`,
            answer: `Zeker weten. Klik op 'Download Afbeelding' om het bestand op te slaan op je iPad, Android tablet of computer om het in je favoriete tekenapp te openen.`
          }
        ],
        language: 'nl'
      });
    }

    files.forEach((file, index) => {
      const pageId = `page-${globalIdCounter++}`;
      const pageSlug = `${themeSlug}-${index + 1}`;
      
      const fileUrlParts = file.split('/').map(encodeURIComponent).join('/');
      const imageUrl = `${SPACES_BASE_URL}/${fileUrlParts}`;
      
      // Determine custom bilingual titles
      let niceTitleEn = '';
      let niceTitleNl = '';
      let isGeneric = false;
      
      if (translations[file]) {
        niceTitleEn = translations[file].en;
        niceTitleNl = translations[file].nl;
      } else {
        // Fallback parsing logic
        const rawFilename = path.basename(file, path.extname(file));
        // Remove 13-digit timestamp (e.g., _1786116493671)
        let nameWithoutTimestamp = rawFilename.replace(/_\d{13}$/, "");
        // Remove trailing number suffixes if they exist
        nameWithoutTimestamp = nameWithoutTimestamp.replace(/_\d+$/, "");
        // Replace underscores with spaces
        let parsedTitle = nameWithoutTimestamp.replace(/_/g, " ").replace(/\s+/g, " ").trim();
        
        // Capitalize first letter
        if (parsedTitle) {
          parsedTitle = parsedTitle.charAt(0).toUpperCase() + parsedTitle.slice(1);
        }

        // Check if the title is generic (e.g., ComfyUI_00015 or is empty/just numbers)
        isGeneric = !parsedTitle || 
                    /^[0-9\-\s]+$/.test(parsedTitle) || 
                    parsedTitle.toLowerCase().includes("comfyui") || 
                    parsedTitle.toLowerCase() === "coloring page" || 
                    parsedTitle.toLowerCase() === "coloringpage";
                            
        const fallbackTitle = isGeneric ? `${themeName} ${index + 1}` : parsedTitle;
        niceTitleEn = fallbackTitle;
        niceTitleNl = fallbackTitle;
      }

      // Ensure 100% unique page title globally across the entire website
      const titleKeyEn = niceTitleEn.toLowerCase().replace(/[\s\-_]+/g, ' ').trim();
      const titleKeyNl = niceTitleNl.toLowerCase().replace(/[\s\-_]+/g, ' ').trim();

      if (seenTitlesGlobalEn[titleKeyEn]) {
        seenTitlesGlobalEn[titleKeyEn]++;
        const num = seenTitlesGlobalEn[titleKeyEn];
        niceTitleEn = `${niceTitleEn} #${num}`;
      } else {
        seenTitlesGlobalEn[titleKeyEn] = 1;
      }

      if (seenTitlesGlobalNl[titleKeyNl]) {
        seenTitlesGlobalNl[titleKeyNl]++;
        const num = seenTitlesGlobalNl[titleKeyNl];
        niceTitleNl = `${niceTitleNl} #${num}`;
      } else {
        seenTitlesGlobalNl[titleKeyNl] = 1;
      }

      const ageGroupKey = agesList[index % agesList.length];
      const enAge = ageGroupKey;
      const nlAge = ageTranslations[ageGroupKey].nl.toLowerCase();

      enPages.push({
        id: pageId,
        title: niceTitleEn,
        slug: pageSlug,
        parentHub: parentHubEn,
        parentTheme: themeSlug,
        ageGroup: enAge,
        image: imageUrl,
        preview: imageUrl,
        downloadableFile: imageUrl,
        metaTitle: `${niceTitleEn} - Free Printable Coloring Page | ColorVaults`,
        metaDescription: `Download and print this free high-resolution ${niceTitleEn} coloring page from the ${themeName} collection. Perfect for ${ageTranslations[ageGroupKey].en.toLowerCase()} and adults!`,
        shortDescription: `High-resolution printable ${niceTitleEn} coloring template from our ${themeName} collection. Download or print instantly for free.`,
        longDescription: `Enjoy this high-quality printable ${niceTitleEn} coloring page template from the ${themeName} category. Designed with crisp black outlines, this sheet is perfect for ${ageTranslations[ageGroupKey].en.toLowerCase()} and adults seeking a fun, creative, and relaxing activity. Download the high-res file or print directly in A4/Letter size for free!`,
        altText: `${niceTitleEn} coloring page`,
        tags: [themeSlug, enAge],
        relatedPages: [],
        language: 'en'
      });

      nlPages.push({
        id: pageId,
        title: niceTitleNl,
        slug: pageSlug,
        parentHub: parentHubNl,
        parentTheme: themeSlug,
        ageGroup: nlAge,
        image: imageUrl,
        preview: imageUrl,
        downloadableFile: imageUrl,
        metaTitle: `${niceTitleNl} - Gratis Printbare Kleurplaat | ColorVaults`,
        metaDescription: `Download en print deze gratis hoge resolutie ${niceTitleNl} kleurplaat uit de ${themeName} collectie. Ideaal voor ${ageTranslations[ageGroupKey].nl.toLowerCase()} en volwassenen!`,
        shortDescription: `Hoge kwaliteit printbare ${niceTitleNl} kleurplaat uit onze ${themeName} verzameling. Direct gratis te downloaden of te printen.`,
        longDescription: `Geniet van dit mooie printbare ${niceTitleNl} kleurplaat sjabloon uit de categorie ${themeName}. Ontworpen met scherpe zwarte contouren, uitermate geschikt voor ${ageTranslations[ageGroupKey].nl.toLowerCase()} en volwassenen die houden van creatief en ontspannend kleuren. Download het bestand gratis in hoge resolutie of print direct op A4 formaat!`,
        altText: `${niceTitleNl} kleurplaat`,
        tags: [themeSlug, nlAge],
        relatedPages: [],
        language: 'nl'
      });
    });
  }

  // --- CUSTOM CALENDARS INJECTION ---
  const calendarThemes = [
    { en: 'Blank Calendars', nl: 'Blanco Kalenders', slug: 'blank-calendars', images: ['blank-calendars-1.jpg', 'blank-calendars-2.jpg'] },
    { en: 'Monthly Calendars', nl: 'Maandkalenders', slug: 'monthly-calendars', images: ['monthly-calendars-1.jpg', 'monthly-calendars-2.jpg'] },
    { en: 'Yearly Calendars', nl: 'Jaarkalenders', slug: 'yearly-calendars', images: ['yearly-calendars-1.jpg', 'yearly-calendars-2.jpg'] }
  ];

  calendarThemes.forEach(ct => {
    enThemes.push({
      title: ct.en,
      slug: ct.slug,
      parentHub: 'calendars',
      description: `Free printable ${ct.en} for planning and organization.`,
      image: `/images/pages/${ct.images[0]}`,
      availableAges: ['kids', 'teens', 'adults'],
      language: 'en'
    });

    nlThemes.push({
      title: ct.nl,
      slug: ct.slug,
      parentHub: 'calendars',
      description: `Gratis printbare ${ct.nl} voor planning en organisatie.`,
      image: `/images/pages/${ct.images[0]}`,
      availableAges: ['kinderen', 'tieners', 'volwassenen'],
      language: 'nl'
    });

    const enAgesList = ['kids', 'teens', 'adults'];
    const nlAgesList = ['kinderen', 'tieners', 'volwassenen'];

    enAgesList.forEach(age => {
      enAges.push({
        title: `${ct.en} for ${age}`,
        slug: age,
        parentHub: 'calendars',
        parentTheme: ct.slug,
        ageGroup: age,
        introText: `Download free printable ${ct.en} for ${age}.`,
        seoText: `High-quality ${ct.en} for ${age}.`,
        faq: [],
        language: 'en'
      });
    });

    nlAgesList.forEach(age => {
      nlAges.push({
        title: `${ct.nl} voor ${age}`,
        slug: age,
        parentHub: 'calendars',
        parentTheme: ct.slug,
        ageGroup: age,
        introText: `Download gratis printbare ${ct.nl} voor ${age}.`,
        seoText: `Hoge kwaliteit ${ct.nl} voor ${age}.`,
        faq: [],
        language: 'nl'
      });
    });

    ct.images.forEach((imgName, index) => {
      const pageId = `page-calendar-${ct.slug}-${index + 1}`;
      const pageSlug = `${ct.slug}-${index + 1}`;
      const imagePath = `/images/pages/${imgName}`;
      const niceTitleEn = `${ct.en} Style ${index + 1}`;
      const niceTitleNl = `${ct.nl} Stijl ${index + 1}`;

      enAgesList.forEach(age => {
        enPages.push({
          id: `${pageId}-${age}`,
          title: niceTitleEn,
          slug: `${pageSlug}-${age}`,
          parentHub: 'calendars',
          parentTheme: ct.slug,
          ageGroup: age,
          image: imagePath,
          preview: imagePath,
          downloadableFile: imagePath,
          metaTitle: `${niceTitleEn} - Free Printable Calendar`,
          metaDescription: `Printable ${ct.en}: ${niceTitleEn}`,
          shortDescription: `Beautiful ${ct.en} printable.`,
          longDescription: `This is a beautiful printable calendar page featuring ${niceTitleEn}. Perfect for staying organized and creative.`,
          altText: niceTitleEn,
          tags: ['calendars'],
          relatedPages: [],
          language: 'en'
        });
      });

      nlAgesList.forEach(age => {
        nlPages.push({
          id: `${pageId}-${age}`,
          title: niceTitleNl,
          slug: `${pageSlug}-${age}`,
          parentHub: 'calendars',
          parentTheme: ct.slug,
          ageGroup: age,
          image: imagePath,
          preview: imagePath,
          downloadableFile: imagePath,
          metaTitle: `${niceTitleNl} - Gratis Printbare Kalender`,
          metaDescription: `Printbare ${ct.nl}: ${niceTitleNl}`,
          shortDescription: `Prachtige ${ct.nl} printable.`,
          longDescription: `Dit is een prachtige printbare kalender van ${niceTitleNl}. Perfect om georganiseerd en creatief te blijven.`,
          altText: niceTitleNl,
          tags: ['kalenders'],
          relatedPages: [],
          language: 'nl'
        });
      });
    });
  });

  // --- CUSTOM PRINTABLES INJECTION ---
  const printableThemes = [
    { en: 'Classroom Templates', nl: 'Klaslokaal Sjablonen', slug: 'classroom-templates', image: 'school-education-templates.png' }
  ];

  printableThemes.forEach(pt => {
    enThemes.push({
      title: pt.en,
      slug: pt.slug,
      parentHub: 'school-education-templates',
      description: `Free printable ${pt.en} for teachers, students, and classroom activities.`,
      image: `/images/categories/${pt.image}`,
      availableAges: ['kids', 'teens'],
      language: 'en'
    });

    nlThemes.push({
      title: pt.nl,
      slug: pt.slug,
      parentHub: 'school-en-educatie-sjablonen',
      description: `Gratis printbare ${pt.nl} voor leraren, studenten en klasactiviteiten.`,
      image: `/images/categories/${pt.image}`,
      availableAges: ['kinderen', 'tieners'],
      language: 'nl'
    });

    const enAgesList = ['kids', 'teens'];
    const nlAgesList = ['kinderen', 'tieners'];

    enAgesList.forEach(age => {
      enAges.push({
        title: `${pt.en} for ${age}`,
        slug: age,
        parentHub: 'school-education-templates',
        parentTheme: pt.slug,
        ageGroup: age,
        introText: `Download free printable ${pt.en} for ${age}.`,
        seoText: `High-quality classroom templates for ${age}.`,
        faq: [],
        language: 'en'
      });
    });

    nlAgesList.forEach(age => {
      nlAges.push({
        title: `${pt.nl} voor ${age}`,
        slug: age,
        parentHub: 'school-en-educatie-sjablonen',
        parentTheme: pt.slug,
        ageGroup: age,
        introText: `Download gratis printbare ${pt.nl} voor ${age}.`,
        seoText: `Hoge kwaliteit classroom templates voor ${age}.`,
        faq: [],
        language: 'nl'
      });
    });

    const mockSchoolFiles = ['blank-calendars-1.jpg', 'yearly-calendars-2.jpg'];

    mockSchoolFiles.forEach((imgName, index) => {
      const pageId = `page-printable-${pt.slug}-${index + 1}`;
      const pageSlug = `${pt.slug}-${index + 1}`;
      const imagePath = `/images/pages/${imgName}`;
      const niceTitleEn = `${pt.en} Style ${index + 1}`;
      const niceTitleNl = `${pt.nl} Stijl ${index + 1}`;

      enAgesList.forEach(age => {
        enPages.push({
          id: `${pageId}-${age}`,
          title: niceTitleEn,
          slug: `${pageSlug}-${age}`,
          parentHub: 'school-education-templates',
          parentTheme: pt.slug,
          ageGroup: age,
          image: imagePath,
          preview: imagePath,
          downloadableFile: imagePath,
          metaTitle: `${niceTitleEn} - Free Classroom Printable`,
          metaDescription: `Printable ${pt.en}: ${niceTitleEn}`,
          shortDescription: `Beautiful classroom printable.`,
          longDescription: `This is a beautiful classroom printable worksheet featuring ${niceTitleEn}. Perfect for teaching and student activities.`,
          altText: niceTitleEn,
          tags: ['classroom'],
          relatedPages: [],
          language: 'en'
        });
      });

      nlAgesList.forEach(age => {
        nlPages.push({
          id: `${pageId}-${age}`,
          title: niceTitleNl,
          slug: `${pageSlug}-${age}`,
          parentHub: 'school-en-educatie-sjablonen',
          parentTheme: pt.slug,
          ageGroup: age,
          image: imagePath,
          preview: imagePath,
          downloadableFile: imagePath,
          metaTitle: `${niceTitleNl} - Gratis Klaslokaal Printable`,
          metaDescription: `Printbare ${pt.nl}: ${niceTitleNl}`,
          shortDescription: `Prachtige classroom printable.`,
          longDescription: `Dit is een prachtige klaslokaal printable van ${niceTitleNl}. Perfect voor lesgeven en studentenactiviteiten.`,
          altText: niceTitleNl,
          tags: ['klaslokaal'],
          relatedPages: [],
          language: 'nl'
        });
      });
    });
  });

  console.log(`\nGenerated data for ${enThemes.length} themes and ${enPages.length} coloring pages.`);

  fs.writeFileSync(path.join(dataDir, 'en', 'main-hubs.json'), JSON.stringify(enHubs, null, 2));
  fs.writeFileSync(path.join(dataDir, 'nl', 'main-hubs.json'), JSON.stringify(nlHubs, null, 2));
  fs.writeFileSync(path.join(dataDir, 'en', 'themes.json'), JSON.stringify(enThemes, null, 2));
  fs.writeFileSync(path.join(dataDir, 'nl', 'themes.json'), JSON.stringify(nlThemes, null, 2));
  fs.writeFileSync(path.join(dataDir, 'en', 'age-pages.json'), JSON.stringify(enAges, null, 2));
  fs.writeFileSync(path.join(dataDir, 'nl', 'age-pages.json'), JSON.stringify(nlAges, null, 2));
  fs.writeFileSync(path.join(dataDir, 'en', 'coloring-pages.json'), JSON.stringify(enPages, null, 2));
  fs.writeFileSync(path.join(dataDir, 'nl', 'coloring-pages.json'), JSON.stringify(nlPages, null, 2));
};

generateData();
console.log('Successfully generated real data set with correct multi-hub category mapping.');
