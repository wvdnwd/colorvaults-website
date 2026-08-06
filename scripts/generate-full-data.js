const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'en'))) fs.mkdirSync(path.join(dataDir, 'en'), { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'nl'))) fs.mkdirSync(path.join(dataDir, 'nl'), { recursive: true });

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const hubsConfig = [
  {
    en: { title: 'TV Series and Movies', slug: 'tv-series-and-movies' },
    nl: { title: 'TV Series en Films', slug: 'tv-series-en-films' },
    themes: [
      { en: 'Bluey', nl: 'Bluey', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Paw Patrol', nl: 'Paw Patrol', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'SpongeBob', nl: 'SpongeBob', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Peppa Pig', nl: 'Peppa Pig', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Thomas the Tank Engine', nl: 'Thomas de Stoomlocomotief', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'My Little Pony', nl: 'My Little Pony', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Blippi', nl: 'Blippi', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'CoComelon', nl: 'CoComelon', ages: ['toddlers', 'kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Disney and Fairy Tales', slug: 'disney-and-fairy-tales' },
    nl: { title: 'Disney en Sprookjes', slug: 'disney-en-sprookjes' },
    themes: [
      { en: 'Disney Princesses', nl: 'Disney Prinsessen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Lilo & Stitch', nl: 'Lilo & Stitch', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Unicorns', nl: 'Eenhoorns', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Fairies', nl: 'Feeën', ages: ['toddlers', 'kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Games and Pop Culture', slug: 'games-and-pop-culture' },
    nl: { title: 'Games en Popcultuur', slug: 'games-en-popcultuur' },
    themes: [
      { en: 'Pokémon', nl: 'Pokémon', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Sonic', nl: 'Sonic', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Super Mario', nl: 'Super Mario', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Lego Ninjago', nl: 'Lego Ninjago', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Fortnite', nl: 'Fortnite', ages: ['toddlers', 'kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Animals and Nature', slug: 'animals-and-nature' },
    nl: { title: 'Dieren en Natuur', slug: 'dieren-en-natuur' },
    themes: [
      { en: 'Dogs', nl: 'Honden', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Cats', nl: 'Katten', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Farm Animals', nl: 'Boerderijdieren', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Sea Creatures', nl: 'Zeediere', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Dinosaurs', nl: 'Dinosaurussen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Toddler Specific', slug: 'toddler-specific' },
    nl: { title: 'Speciaal voor Peuters', slug: 'speciaal-voor-peuters' },
    themes: [
      { en: 'Large Shapes', nl: 'Grote Vormen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Smiley Faces', nl: 'Smileys', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Simple Vehicles', nl: 'Simpele Voertuigen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Rainbows', nl: 'Regenbogen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Nijntje Miffy', nl: 'Nijntje', ages: ['toddlers'] },
      { en: 'Bumba', nl: 'Bumba', ages: ['toddlers'] },
      { en: 'Woezel and Pip', nl: 'Woezel en Pip', ages: ['toddlers'] },
    ]
  },
  {
    en: { title: 'Girls Themes', slug: 'girls-themes' },
    nl: { title: 'Meisjes Thema\'s', slug: 'meisjes-themas' },
    themes: [
      { en: 'Popular Girls Themes', nl: 'Populaire Meisjes Thema\'s', ages: ['toddlers', 'kids', 'teens', 'adults'] }
    ]
  },
  {
    en: { title: 'Adults', slug: 'adults' },
    nl: { title: 'Volwassenen', slug: 'volwassenen' },
    themes: [
      { en: 'Nature and Plants', nl: 'Natuur en Planten', ages: ['teens', 'adults'] },
      { en: 'Art and Patterns', nl: 'Kunst en Patronen', ages: ['teens', 'adults'] },
      { en: 'Lifestyle and Aesthetics', nl: 'Lifestyle en Esthetiek', ages: ['teens', 'adults'] },
      { en: 'Pop Culture and Fandoms', nl: 'Popcultuur en Fandoms', ages: ['teens', 'adults'] },
      { en: 'Miscellaneous', nl: 'Diversen', ages: ['teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Mandalas', slug: 'mandalas' },
    nl: { title: 'Mandala\'s', slug: 'mandalas' },
    themes: [
      { en: 'Classic Mandalas', nl: 'Klassieke Mandala\'s', ages: ['teens', 'adults'] },
      { en: 'Animal Mandalas', nl: 'Dieren Mandala\'s', ages: ['teens', 'adults'] },
      { en: 'Flower Mandalas', nl: 'Bloemen Mandala\'s', ages: ['teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Calendars', slug: 'calendars' },
    nl: { title: 'Kalenders', slug: 'kalenders' },
    themes: [
      { en: 'Yearly Calendars', nl: 'Jaarkalenders', ages: ['kids', 'teens', 'adults'] },
      { en: 'Monthly Calendars', nl: 'Maandkalenders', ages: ['kids', 'teens', 'adults'] },
      { en: 'Blank Calendars', nl: 'Blanco Kalenders', ages: ['kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'School, Education & Templates', slug: 'school-education-templates' },
    nl: { title: 'School, Educatie & Sjablonen', slug: 'school-educatie-sjablonen' },
    themes: [
      { en: 'Templates', nl: 'Sjablonen', ages: ['toddlers', 'kids'] },
      { en: 'Stencils', nl: 'Stencils', ages: ['toddlers', 'kids'] },
      { en: 'Party Decorations', nl: 'Feestversiering', ages: ['toddlers', 'kids'] },
    ]
  },
  {
    en: { title: 'Holidays and Seasons', slug: 'holidays-and-seasons' },
    nl: { title: 'Feestdagen en Seizoenen', slug: 'feestdagen-en-seizoenen' },
    themes: [
      { en: 'Christmas', nl: 'Kerst', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: 'Sinterklaas', nl: 'Sinterklaas', ages: ['toddlers', 'kids'] },
      { en: 'Easter', nl: 'Pasen', ages: ['toddlers', 'kids', 'teens', 'adults'] },
      { en: "King's Day", nl: 'Koningsdag', ages: ['toddlers', 'kids'] },
      { en: 'Halloween', nl: 'Halloween', ages: ['toddlers', 'kids', 'teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Activities and Styles', slug: 'activities-and-styles' },
    nl: { title: 'Activiteiten en Stijlen', slug: 'activiteiten-en-stijlen' },
    themes: [
      { en: 'Color by Number', nl: 'Kleuren op Nummer', ages: ['kids', 'teens', 'adults'] },
      { en: 'Bold and Easy', nl: 'Makkelijke Grote Lijnen', ages: ['toddlers', 'kids', 'adults'] },
      { en: 'Stress Relief', nl: 'Ontspanning en Anti-stress', ages: ['teens', 'adults'] },
    ]
  },
  {
    en: { title: 'Senior and Dementia Friendly', slug: 'senior-and-dementia-friendly' },
    nl: { title: 'Senioren en Dementievriendelijk', slug: 'senioren-en-dementievriendelijk' },
    themes: [
      { en: 'Large Flowers', nl: 'Grote Bloemen', ages: ['adults'] },
      { en: 'Nostalgic Landscapes', nl: 'Nostalgische Landschappen', ages: ['adults'] },
      { en: 'Simple Classic Patterns', nl: 'Simpele Klassieke Patronen', ages: ['adults'] },
    ]
  },
  {
    en: { title: 'Occupations and Careers', slug: 'occupations-and-careers' },
    nl: { title: 'Beroepen', slug: 'beroepen' },
    themes: [
      { en: 'Firefighters', nl: 'Brandweer', ages: ['toddlers', 'kids'] },
      { en: 'Police', nl: 'Politie', ages: ['toddlers', 'kids'] },
      { en: 'Doctors and Nurses', nl: 'Dokters en Verpleegsters', ages: ['kids', 'teens'] },
      { en: 'Astronauts', nl: 'Astronauten', ages: ['kids', 'teens'] },
    ]
  }
];

const ageTranslations = {
  toddlers: { en: 'Toddlers', nl: 'Peuters' },
  kids: { en: 'Kids', nl: 'Kinderen' },
  teens: { en: 'Teens', nl: 'Tieners' },
  adults: { en: 'Adults', nl: 'Volwassenen' }
};

const generateData = () => {
  const enHubs = [];
  const nlHubs = [];
  const enThemes = [];
  const nlThemes = [];
  const enAges = [];
  const nlAges = [];
  const enPages = [];
  const nlPages = [];

  let idCounter = 1;

  for (const hub of hubsConfig) {
    enHubs.push({ 
      title: hub.en.title, 
      slug: hub.en.slug, 
      description: `Explore all ${hub.en.title} coloring pages.`,
      image: '/images/categories/nature.jpg', 
      language: 'en' 
    });
    nlHubs.push({ 
      title: hub.nl.title, 
      slug: hub.nl.slug, 
      description: `Ontdek alle ${hub.nl.title} kleurplaten.`,
      image: '/images/categories/nature.jpg', 
      language: 'nl' 
    });

    for (const theme of hub.themes) {
      const themeSlugEn = slugify(theme.en);
      const themeSlugNl = slugify(theme.nl);

      enThemes.push({ 
        title: theme.en, 
        slug: themeSlugEn, 
        parentHub: hub.en.slug, 
        description: `Best ${theme.en} coloring pages.`, 
        image: '/images/categories/animals.jpg', 
        availableAges: theme.ages, 
        language: 'en' 
      });
      nlThemes.push({ 
        title: theme.nl, 
        slug: themeSlugNl, 
        parentHub: hub.nl.slug, 
        description: `Beste ${theme.nl} kleurplaten.`, 
        image: '/images/categories/animals.jpg', 
        availableAges: theme.ages.map(a => ageTranslations[a].nl.toLowerCase()), 
        language: 'nl' 
      });

      for (const age of theme.ages) {
        const enAge = age;
        const nlAge = ageTranslations[age].nl.toLowerCase();
        const enAgeTitle = ageTranslations[age].en;
        const nlAgeTitle = ageTranslations[age].nl;

        enAges.push({ 
          title: `${theme.en} for ${enAgeTitle}`, 
          slug: enAge, 
          parentHub: hub.en.slug, 
          parentTheme: themeSlugEn, 
          ageGroup: enAge, 
          introText: `Great ${theme.en} coloring pages for ${enAgeTitle}.`, 
          seoText: `Download the best ${theme.en} coloring pages for ${enAgeTitle}`, 
          faq: [], 
          language: 'en' 
        });
        nlAges.push({ 
          title: `${theme.nl} voor ${nlAgeTitle}`, 
          slug: nlAge, 
          parentHub: hub.nl.slug, 
          parentTheme: themeSlugNl, 
          ageGroup: nlAge, 
          introText: `Geweldige ${theme.nl} kleurplaten voor ${nlAgeTitle}.`, 
          seoText: `Download de beste ${theme.nl} kleurplaten voor ${nlAgeTitle}`, 
          faq: [], 
          language: 'nl' 
        });

        for (let j = 1; j <= 2; j++) {
          const pageId = `page-${idCounter++}`;
          const pageSlugEn = `${themeSlugEn}-${j}`;
          enPages.push({
            id: pageId,
            title: `${theme.en} ${j}`,
            slug: pageSlugEn,
            parentHub: hub.en.slug,
            parentTheme: themeSlugEn,
            ageGroup: enAge,
            image: `/images/pages/${pageSlugEn}.jpg`,
            preview: `/images/pages/${pageSlugEn}.jpg`,
            downloadableFile: `/images/pages/${pageSlugEn}.jpg`,
            metaTitle: `${theme.en} ${j} Coloring Page`,
            metaDescription: `Printable ${theme.en} page ${j}`,
            shortDescription: `Cute ${theme.en}.`,
            longDescription: `This is a beautiful coloring page featuring ${theme.en}. Perfect for ${enAgeTitle} who love being creative.`,
            altText: `Easy ${theme.en} coloring page for ${enAgeTitle.toLowerCase()} with bold outlines`,
            tags: [themeSlugEn],
            relatedPages: [],
            language: 'en'
          });

          const pageSlugNl = `${themeSlugNl}-${j}`;
          nlPages.push({
            id: pageId,
            title: `${theme.nl} ${j}`,
            slug: pageSlugNl,
            parentHub: hub.nl.slug,
            parentTheme: themeSlugNl,
            ageGroup: nlAge,
            image: `/images/pages/${pageSlugNl}.jpg`,
            preview: `/images/pages/${pageSlugNl}.jpg`,
            downloadableFile: `/images/pages/${pageSlugNl}.jpg`,
            metaTitle: `${theme.nl} ${j} Kleurplaat`,
            metaDescription: `Printbare ${theme.nl} pagina ${j}`,
            shortDescription: `Schattige ${theme.nl}.`,
            longDescription: `Dit is een prachtige kleurplaat van ${theme.nl}. Perfect voor ${nlAgeTitle.toLowerCase()} die graag creatief bezig zijn.`,
            altText: `Makkelijke ${theme.nl} kleurplaat voor ${nlAgeTitle.toLowerCase()} met dikke lijnen`,
            tags: [themeSlugNl],
            relatedPages: [],
            language: 'nl'
          });
        }
      }
    }
  }

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
console.log('Successfully generated full exhaustive mock data set.');
