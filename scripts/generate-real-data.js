const fs = require('fs');
const path = require('path');

const SPACES_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST || 'https://colorvaults.ams3.cdn.digitaloceanspaces.com';
const inputDir = 'c:\\Users\\Gebruiker\\Desktop\\colorvaults\\Gecontroleerd';
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
    en: { title: 'Collections', slug: 'collections', description: 'Explore all our coloring page collections.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Collecties', slug: 'collecties', description: 'Ontdek al onze kleurplaat collecties.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'TV Series and Movies', slug: 'tv-series-and-movies', description: 'Explore all TV series and movie coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'TV Series en Films', slug: 'tv-series-en-films', description: 'Ontdek alle TV-series en film kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Disney and Fairy Tales', slug: 'disney-and-fairy-tales', description: 'Explore Disney and fairy tale coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Disney en Sprookjes', slug: 'disney-en-sprookjes', description: 'Ontdek alle Disney en sprookjes kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Games and Pop Culture', slug: 'games-and-pop-culture', description: 'Explore games and pop culture coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Games en Popcultuur', slug: 'games-en-popcultuur', description: 'Ontdek alle games en popcultuur kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Animals and Nature', slug: 'animals-and-nature', description: 'Explore animals and nature coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Dieren en Natuur', slug: 'dieren-en-natuur', description: 'Ontdek alle dieren en natuur kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Toddler Specific', slug: 'toddler-specific', description: 'Explore toddler specific coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Speciaal voor Peuters', slug: 'speciaal-voor-peuters', description: 'Ontdek alle kleurplaten speciaal voor peuters.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Girls Themes', slug: 'girls-themes', description: 'Explore girls themes coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Meisjes Thema\'s', slug: 'meisjes-themas', description: 'Ontdek alle meisjes thema\'s.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Adults', slug: 'adults', description: 'Explore adult coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Volwassenen', slug: 'volwassenen', description: 'Ontdek alle kleurplaten voor volwassenen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Mandalas', slug: 'mandalas', description: 'Explore mandala coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Mandala\'s', slug: 'mandalas', description: 'Ontdek alle mandala kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Calendars', slug: 'calendars', description: 'Explore calendar coloring pages.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Kalenders', slug: 'calendars', description: 'Ontdek alle kalender kleurplaten.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
  },
  {
    en: { title: 'Printables', slug: 'school-education-templates', description: 'Explore school and education templates.', image: `${SPACES_BASE_URL}/banner/default.jpg` },
    nl: { title: 'Printables', slug: 'school-en-educatie-sjablonen', description: 'Ontdek alle school- en educatiesjablonen.', image: `${SPACES_BASE_URL}/banner/default.jpg` }
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
  console.log('Scanning directory:', inputDir);
  
  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Directory ${inputDir} does not exist!`);
    return;
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

  const folders = fs.readdirSync(inputDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !['Afgekeurd', 'Twijfel_Score_6', 'Afgekeurd_of_Twijfel', 'Dubbele_Fotos', 'Te_Herstellen'].includes(name));

  let globalIdCounter = 1;
  const groupedThemes = {};

  for (const folder of folders) {
    let cleanFolderName = folder.replace(/_?\d+\s*extra\s*needed_?/gi, '').replace(/_?\d+_ex_?/gi, '');
    cleanFolderName = cleanFolderName.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
    const themeSlug = slugify(cleanFolderName);
    const themePath = path.join(inputDir, folder);
    const absoluteFiles = getAllImages(themePath);
    
    if (absoluteFiles.length === 0) continue;

    // Convert absolute paths back to relative paths for URL generation
    const files = absoluteFiles.map(abs => path.relative(inputDir, abs).replace(/\\/g, '/'));

    if (!groupedThemes[themeSlug]) {
      groupedThemes[themeSlug] = {
        themeName: capitalize(cleanFolderName), // use cleaned folder name
        originalFolderName: folder,
        files: []
      };
    }
    
    groupedThemes[themeSlug].files.push(...files);
  }

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
      description: `Best ${themeName} coloring pages.`,
      image: themeImage,
      availableAges: Object.keys(ageTranslations),
      language: 'en'
    });

    nlThemes.push({
      title: themeName,
      slug: themeSlug,
      parentHub: parentHubNl,
      description: `Beste ${themeName} kleurplaten.`,
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
        introText: `Great ${themeName} coloring pages for ${enAgeTitle}.`,
        seoText: `Download the best ${themeName} coloring pages for ${enAgeTitle}`,
        faq: [],
        language: 'en'
      });

      nlAges.push({
        title: `${themeName} voor ${nlAgeTitle}`,
        slug: nlAge,
        parentHub: parentHubNl,
        parentTheme: themeSlug,
        ageGroup: nlAge,
        introText: `Geweldige ${themeName} kleurplaten voor ${nlAgeTitle}.`,
        seoText: `Download de beste ${themeName} kleurplaten voor ${nlAgeTitle}`,
        faq: [],
        language: 'nl'
      });
    }

    files.forEach((file, index) => {
      const pageId = `page-${globalIdCounter++}`;
      const pageSlug = `${themeSlug}-${index + 1}`;
      
      const fileUrlParts = file.split('/').map(encodeURIComponent).join('/');
      const imageUrl = `${SPACES_BASE_URL}/${fileUrlParts}`;
      
      // Extract a nice title from the filename!
      const fileName = file.split('/').pop() || '';
      // Remove the _1784881533249.png part (timestamp and extension)
      let niceTitle = fileName.replace(/_\d{13}\.(png|jpg|jpeg|webp)$/i, '');
      // Replace underscores with spaces
      niceTitle = niceTitle.replace(/_/g, ' ').trim();
      // Clean up multiple spaces
      niceTitle = niceTitle.replace(/\s+/g, ' ');
      // If it ends up empty, fallback to the old way
      if (!niceTitle || niceTitle.length < 3) {
        niceTitle = `${themeName} ${index + 1}`;
      }

      const ageGroupKey = agesList[index % agesList.length];
      const enAge = ageGroupKey;
      const nlAge = ageTranslations[ageGroupKey].nl.toLowerCase();

      enPages.push({
        id: pageId,
        title: niceTitle,
        slug: pageSlug,
        parentHub: parentHubEn,
        parentTheme: themeSlug,
        ageGroup: enAge,
        image: imageUrl,
        preview: imageUrl,
        downloadableFile: imageUrl,
        metaTitle: `${niceTitle} - Coloring Page`,
        metaDescription: `Printable ${themeName} coloring page: ${niceTitle}`,
        shortDescription: `Beautiful ${themeName} coloring page.`,
        longDescription: `This is a beautiful coloring page featuring ${niceTitle}. Perfect for ${ageTranslations[ageGroupKey].en} who love being creative.`,
        altText: niceTitle,
        tags: [themeSlug],
        relatedPages: [],
        language: 'en'
      });

      nlPages.push({
        id: pageId,
        title: niceTitle,
        slug: pageSlug,
        parentHub: parentHubNl,
        parentTheme: themeSlug,
        ageGroup: nlAge,
        image: imageUrl,
        preview: imageUrl,
        downloadableFile: imageUrl,
        metaTitle: `${niceTitle} - Kleurplaat`,
        metaDescription: `Printbare ${themeName} kleurplaat: ${niceTitle}`,
        shortDescription: `Prachtige ${themeName} kleurplaat.`,
        longDescription: `Dit is een prachtige kleurplaat van ${niceTitle}. Perfect voor ${ageTranslations[ageGroupKey].nl.toLowerCase()} die graag creatief bezig zijn.`,
        altText: niceTitle,
        tags: [themeSlug],
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
