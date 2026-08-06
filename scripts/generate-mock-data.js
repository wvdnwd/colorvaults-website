const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'en'))) fs.mkdirSync(path.join(dataDir, 'en'), { recursive: true });
if (!fs.existsSync(path.join(dataDir, 'nl'))) fs.mkdirSync(path.join(dataDir, 'nl'), { recursive: true });

const generateData = () => {
  const hubs = [
    { en: { title: 'TV Series and Movies', slug: 'tv-series-and-movies', description: 'Popular TV and movie inspired coloring pages.' }, nl: { title: 'TV Series en Films', slug: 'tv-series-en-films', description: 'Populaire TV en film geïnspireerde kleurplaten.' } },
    { en: { title: 'Animals and Nature', slug: 'animals-and-nature', description: 'Beautiful animal and nature coloring pages.' }, nl: { title: 'Dieren en Natuur', slug: 'dieren-en-natuur', description: 'Prachtige dieren en natuur kleurplaten.' } },
    { en: { title: 'Mandalas', slug: 'mandalas', description: 'Relaxing mandala coloring pages.' }, nl: { title: 'Mandala\'s', slug: 'mandalas', description: 'Ontspannende mandala kleurplaten.' } }
  ];

  const themesData = {
    'tv-series-and-movies': [
      { en: { title: 'Bluey', slug: 'bluey' }, nl: { title: 'Bluey', slug: 'bluey' } },
      { en: { title: 'Paw Patrol', slug: 'paw-patrol' }, nl: { title: 'Paw Patrol', slug: 'paw-patrol' } }
    ],
    'animals-and-nature': [
      { en: { title: 'Dogs', slug: 'dogs' }, nl: { title: 'Honden', slug: 'honden' } },
      { en: { title: 'Cats', slug: 'cats' }, nl: { title: 'Katten', slug: 'katten' } }
    ],
    'mandalas': [
      { en: { title: 'Classic Mandalas', slug: 'classic-mandalas' }, nl: { title: 'Klassieke Mandala\'s', slug: 'klassieke-mandalas' } },
      { en: { title: 'Animal Mandalas', slug: 'animal-mandalas' }, nl: { title: 'Dieren Mandala\'s', slug: 'dieren-mandalas' } }
    ]
  };

  const ages = [
    { en: 'toddlers', nl: 'peuters' },
    { en: 'kids', nl: 'kinderen' }
  ];

  const enHubs = [];
  const nlHubs = [];
  const enThemes = [];
  const nlThemes = [];
  const enAges = [];
  const nlAges = [];
  const enPages = [];
  const nlPages = [];

  let idCounter = 1;

  for (const hub of hubs) {
    enHubs.push({ ...hub.en, image: '/images/categories/nature.jpg', language: 'en' });
    nlHubs.push({ ...hub.nl, image: '/images/categories/nature.jpg', language: 'nl' });

    for (const theme of themesData[hub.en.slug]) {
      enThemes.push({ ...theme.en, parentHub: hub.en.slug, description: `Best ${theme.en.title} pages.`, image: '/images/categories/animals.jpg', availableAges: ['toddlers', 'kids'], language: 'en' });
      nlThemes.push({ ...theme.nl, parentHub: hub.nl.slug, description: `Beste ${theme.nl.title} kleurplaten.`, image: '/images/categories/animals.jpg', availableAges: ['peuters', 'kinderen'], language: 'nl' });

      for (let i = 0; i < ages.length; i++) {
        const enAge = ages[i].en;
        const nlAge = ages[i].nl;

        enAges.push({ title: `${theme.en.title} for ${enAge}`, slug: enAge, parentHub: hub.en.slug, parentTheme: theme.en.slug, ageGroup: enAge, introText: `Great pages for ${enAge}.`, seoText: `Download ${theme.en.title} for ${enAge}`, faq: [], language: 'en' });
        nlAges.push({ title: `${theme.nl.title} voor ${nlAge}`, slug: nlAge, parentHub: hub.nl.slug, parentTheme: theme.nl.slug, ageGroup: nlAge, introText: `Geweldige kleurplaten voor ${nlAge}.`, seoText: `Download ${theme.nl.title} voor ${nlAge}`, faq: [], language: 'nl' });

        for (let j = 1; j <= 3; j++) {
          const pageId = `page-${idCounter++}`;
          enPages.push({
            id: pageId,
            title: `${theme.en.title} ${j}`,
            slug: `${theme.en.slug}-${j}`,
            parentHub: hub.en.slug,
            parentTheme: theme.en.slug,
            ageGroup: enAge,
            image: '/images/pages/cute-cat-mandala-preview.jpg',
            preview: '/images/pages/cute-cat-mandala-preview.jpg',
            downloadableFile: '/pdfs/coloring-page.pdf',
            metaTitle: `${theme.en.title} ${j} Coloring Page`,
            metaDescription: `Printable ${theme.en.title} page ${j}`,
            shortDescription: `Cute ${theme.en.title}.`,
            longDescription: `This is a long description for ${theme.en.title}.`,
            tags: [theme.en.slug],
            relatedPages: [],
            language: 'en'
          });

          nlPages.push({
            id: pageId,
            title: `${theme.nl.title} ${j}`,
            slug: `${theme.nl.slug}-${j}`,
            parentHub: hub.nl.slug,
            parentTheme: theme.nl.slug,
            ageGroup: nlAge,
            image: '/images/pages/cute-cat-mandala-preview.jpg',
            preview: '/images/pages/cute-cat-mandala-preview.jpg',
            downloadableFile: '/pdfs/coloring-page.pdf',
            metaTitle: `${theme.nl.title} ${j} Kleurplaat`,
            metaDescription: `Printbare ${theme.nl.title} pagina ${j}`,
            shortDescription: `Schattige ${theme.nl.title}.`,
            longDescription: `Dit is een lange beschrijving voor ${theme.nl.title}.`,
            tags: [theme.nl.slug],
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
console.log('Successfully generated large mock data set.');
