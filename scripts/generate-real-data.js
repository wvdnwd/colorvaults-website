const fs = require('fs');
const path = require('path');

// Configure this to match your DigitalOcean Spaces URL once you buy it
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

const generateData = () => {
  console.log('Scanning directory:', inputDir);
  
  if (!fs.existsSync(inputDir)) {
    console.error(`Error: Directory ${inputDir} does not exist!`);
    return;
  }

  const enHubs = [{
    title: 'Collections',
    slug: 'collections',
    description: 'Explore all our coloring page collections.',
    image: `${SPACES_BASE_URL}/banner/default.jpg`,
    language: 'en'
  }];
  
  const nlHubs = [{
    title: 'Collecties',
    slug: 'collecties',
    description: 'Ontdek al onze kleurplaat collecties.',
    image: `${SPACES_BASE_URL}/banner/default.jpg`,
    language: 'nl'
  }];

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
    const themeSlug = slugify(folder);
    const themePath = path.join(inputDir, folder);
    const absoluteFiles = getAllImages(themePath);
    
    if (absoluteFiles.length === 0) continue;

    // Convert absolute paths back to relative paths for URL generation
    const files = absoluteFiles.map(abs => path.relative(inputDir, abs).replace(/\\/g, '/'));

    if (!groupedThemes[themeSlug]) {
      groupedThemes[themeSlug] = {
        themeName: capitalize(folder), // use first encountered folder name
        files: []
      };
    }
    
    groupedThemes[themeSlug].files.push(...files);
  }

  for (const [themeSlug, data] of Object.entries(groupedThemes)) {
    const themeName = data.themeName;
    const files = data.files;

    console.log(`Processing theme: ${themeName} (${files.length} images)`);

    // Use the first file to construct the banner image URL correctly
    const firstFileUrlParts = files[0].split('/').map(encodeURIComponent).join('/');
    const themeImage = `${SPACES_BASE_URL}/${firstFileUrlParts}`;
    
    enThemes.push({
      title: themeName,
      slug: themeSlug,
      parentHub: 'collections',
      description: `Best ${themeName} coloring pages.`,
      image: themeImage,
      availableAges: Object.keys(ageTranslations),
      language: 'en'
    });

    nlThemes.push({
      title: themeName,
      slug: themeSlug,
      parentHub: 'collecties',
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
        parentHub: 'collections',
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
        parentHub: 'collecties',
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
        parentHub: 'collections',
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
        parentHub: 'collecties',
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
console.log('Successfully generated real data set.');
