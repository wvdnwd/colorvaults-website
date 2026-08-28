export interface CategorySeoData {
  shortIntro: string;
  bottomTitle: string;
  bottomContentHtml: string;
}

interface SpecificSeoOverride {
  enIntro?: string;
  nlIntro?: string;
  enBottomHtml?: string;
  nlBottomHtml?: string;
  relatedSlugs?: string[];
}

const SPECIFIC_SEO_DATA: Record<string, SpecificSeoOverride> = {
  animals: {
    enIntro: `Welcome to our extensive collection of free printable animals coloring pages! Whether you are looking for cute puppies, majestic lions, ocean creatures, or farm animals, we offer high-resolution PDF and image templates ready for instant download. Perfect for toddlers, school kids, and adults looking for creative fun without registration.`,
    nlIntro: `Welkom bij onze uitgebreide verzameling gratis dieren kleurplaten om uit te printen! Of je nu op zoek bent naar schattige honden, schattige katten, machtige leeuwen, zeedieren of boerderijdieren: wij bieden hoge resolutie PDF- en afbeeldingensjablonen die direct printbaar zijn. Ideaal voor peuters, basisschoolkinderen en volwassenen die ontspannen willen kleuren zonder te registreren.`,
    relatedSlugs: ['birds', 'safari-wildlife', 'cute-pets-animals', 'dolphins-underwater', 'farm'],
    enBottomHtml: `
      <h2>Who Are Our Animals Coloring Pages Suitable For?</h2>
      <p>Our printable animal coloring templates cater to colorists of all experience levels and ages. From simple thick outlines for toddlers to highly detailed wildlife portraits for adults, every nature lover will find their favorite creature ready to print.</p>

      <h3>Age Groups & Difficulty Levels</h3>
      <p>To help you find the perfect match, our animal coloring sheets are organized into three clear difficulty filters:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids (Makkelijk)</strong></a>: Simple shapes, large coloring areas, and cute animals like puppies and bunnies designed specifically for toddlers and young children.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens (Gemiddeld)</strong></a>: Action-packed wildlife scenes, forest habitats, and detailed animal poses ideal for school kids and teens.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults (Moeilijk)</strong></a>: Intricate animal mandalas, realistic fur textures, and complex natural environments crafted for adult mindfulness and stress relief.</li>
      </ul>

      <h3>Why Print Free Animal Sheets at ColorVaults?</h3>
      <p>All our high-quality animal coloring pages are completely free to download in standard print formats. Use long-tail keywords like <em>easy animal coloring sheets for toddlers</em> or <em>detailed adult animal mandala PDF</em> to explore our full library and start coloring immediately.</p>

      <h3>Explore Related Categories</h3>
      <p>If you love animals and nature, check out these related categories:</p>
      RELATED_LINKS
    `,
    nlBottomHtml: `
      <h2>Voor wie zijn onze Dieren Kleurplaten geschikt?</h2>
      <p>Onze gratis dieren kleurplaten zijn geschikt voor kleurders van elk niveau en elke leeftijd. Van eenvoudige dikke contouren voor peuters tot zeer gedetailleerde wilde dieren en natuurportretten voor volwassenen: elke dierenvriend vindt hier zijn favoriete kleurplaat.</p>

      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <p>Om snel de juiste kleurplaat te kiezen, zijn onze dierenkleurplaten ingedeeld in drie duidelijke moeilijkheidsgraden:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Peuters & Kinderen (Easy)</strong></a>: Grote kleurvlakken en schattige dieren zoals hondjes, katjes en konijntjes, speciaal ontwikkeld voor jonge kinderen.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners (Medium)</strong></a>: Dynamische wildernisscènes, bosdieren en gedetailleerde dierenfiguren voor basisschoolkinderen en tieners.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen (Hard)</strong></a>: Ingewikkelde dieren mandala's, gedetailleerde vachtstructuren en anti-stress natuurontwerpen voor volwassenen.</li>
      </ul>

      <h3>Waarom Dieren Kleurplaten Printen bij ColorVaults?</h3>
      <p>Al onze dieren kleurplaten zijn 100% gratis te downloaden in hoge resolutie A4-formaat. Zoek je naar <em>makkelijke dieren kleurplaat peuters pdf</em> of <em>gedetailleerde dieren kleurplaten volwassenen gratis printen</em>? Bij ColorVaults kun je direct aan de slag zonder account.</p>

      <h3>Ontdek ook gerelateerde categorieën</h3>
      <p>Bekijk ook deze populaire gerelateerde categorieën:</p>
      RELATED_LINKS
    `,
  },
  mandalas: {
    enIntro: `Explore our beautiful collection of free printable mandala coloring pages designed for mindfulness, stress relief, and artistic expression. Featuring circular geometric patterns, floral mandalas, and spiritual designs in high resolution ready to print or download instantly.`,
    nlIntro: `Ontdek onze prachtige verzameling gratis mandala kleurplaten om uit te printen voor ontspanning, mindfulness en creatieve rust. Met geometrische patronen, bloemen mandala's en spirituele sjablonen in hoge resolutie, direct printbaar zonder kosten.`,
    relatedSlugs: ['celtic-patterns', 'patterns', 'botanical-gardens', 'art-nouveau', 'flowers-botanical'],
    enBottomHtml: `
      <h2>Mindfulness & Relaxation with Mandala Coloring Pages</h2>
      <p>Mandala coloring is proven to reduce stress, improve concentration, and stimulate artistic creativity. Our collection offers a diverse range of symmetry designs suitable for beginners and seasoned colorists alike.</p>

      <h3>Age Groups & Difficulty Levels</h3>
      <p>Choose the level of detail that fits your mood:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Bold lines and simple symmetrical shapes ideal for children learning focus and symmetry.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Balanced geometric and nature-inspired mandalas perfect for relaxing after school.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Extremely detailed mandala art with fine intricate lines tailored for anti-stress therapy and adult coloring enthusiasts.</li>
      </ul>

      <h3>High Resolution Printable Mandalas</h3>
      <p>Download long-tail favorites such as <em>easy mandala printable for kids</em> or <em>intricate adult mandala coloring page PDF free</em> and transform your quiet time into a calming artistic session.</p>

      <h3>Explore Related Categories</h3>
      <p>Discover more relaxing pattern collections:</p>
      RELATED_LINKS
    `,
    nlBottomHtml: `
      <h2>Ontspanning & Mindfulness met Mandala Kleurplaten</h2>
      <p>Het inkleuren van mandala's helpt bij het verminderen van stress, bevordert de concentratie en geeft rust in je hoofd. Onze collectie biedt een brede waaier aan symmetrische patronen voor zowel beginners als gevorderden.</p>

      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <p>Selecteer de moeilijkheidsgraad die bij jouw ontspanningsmoment past:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen (Easy)</strong></a>: Duidelijke contouren en eenvoudige patronen voor kinderen die hun fijne motoriek willen oefenen.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners (Medium)</strong></a>: Harmonieuze geometrische en botanische mandala's voor creatieve tieners.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen (Hard)</strong></a>: Zeer gedetailleerde mandala sjablonen met fijne lijnen voor volwassenen en anti-stress kleurtherapie.</li>
      </ul>

      <h3>Gratis Printbare Mandala's in Hoge Resolutie</h3>
      <p>Zoek je <em>makkelijke mandala kleurplaat printen</em> of <em>ingewikkelde mandala kleurplaten volwassenen pdf gratis</em>? Alle mandala's op ColorVaults zijn direct in te kleuren.</p>

      <h3>Ontdek ook gerelateerde categorieën</h3>
      <p>Bekijk ook deze ontspannende patroon- en kunstcategorieën:</p>
      RELATED_LINKS
    `,
  },
  'disney-princesses': {
    enIntro: `Immerse yourself in a magical world with free printable Disney Princesses coloring pages! Print iconic heroines like Cinderella, Belle, Ariel, Jasmine, Snow White, and Rapunzel. High-resolution templates perfect for fairytale lovers, birthday activities, and creative family fun.`,
    nlIntro: `Stap binnen in een betoverende wereld met gratis Disney Prinsessen kleurplaten om uit te printen! Kleur je favoriete prinsessen zoals Assepoester, Belle, Ariël, Jasmine, Sneeuwwitje en Rapunzel. Hoge resolutie kleurplaten ideaal voor kindfeestjes, knutselmiddagen en sprookjesliefhebbers.`,
    relatedSlugs: ['disney-frozen', 'disney-ariel', 'disney-belle', 'princesses-castles', 'fairies'],
    enBottomHtml: `
      <h2>Magical Disney Princess Coloring Pages for Every Fan</h2>
      <p>From classic royal ballgowns to magical kingdom adventures, our Disney Princess collection brings magical fairytales to life right on your paper.</p>

      <h3>Age Groups & Difficulty Levels</h3>
      <p>Explore royalty tailored to every age:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Large outlines of princesses with cute animals, perfect for toddlers and young fairytale lovers.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Detailed ballgown dresses, royal castle backgrounds, and romantic scenes for kids and teens.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Artistic fairytale portrait art and intricate dress patterns for adult Disney fans.</li>
      </ul>

      <h3>Free High Quality Printables</h3>
      <p>Whether searching for <em>easy Disney princess coloring sheet PDF</em> or <em>printable princess castle coloring page</em>, download instantly and color your royal story today.</p>

      <h3>Explore Related Categories</h3>
      <p>Check out more fairytale magic:</p>
      RELATED_LINKS
    `,
    nlBottomHtml: `
      <h2>Betoverende Disney Prinsessen Kleurplaten voor Jong en Oud</h2>
      <p>Van klassieke baljurken tot magische kasteelavonturen: onze verzameling Disney prinsessen brengt de mooiste sprookjes tot leven op papier.</p>

      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <p>Vind de mooiste kleurplaat afgestemd op leeftijd:</p>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen (Easy)</strong></a>: Duidelijke lijnen van prinsessen met hun schattige dierenvriendjes, perfect voor peuters en kleuters.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners (Medium)</strong></a>: Gedetailleerde baljurken, koninklijke kasteelachtergronden en bekende sprookjesscènes voor tieners.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen (Hard)</strong></a>: Artistieke prinsessenportretten en complexe patronen voor volwassen Disney-liefhebbers.</li>
      </ul>

      <h3>Gratis Printbare Disney Sjablonen</h3>
      <p>Zoek je naar <em>gratis Disney prinsessen kleurplaat printen pdf</em> of <em>Assepoester en Belle kleurplaten voor kinderen</em>? Bij ColorVaults download je alles gratis.</p>

      <h3>Ontdek ook gerelateerde categorieën</h3>
      <p>Laat je betoveren door deze gerelateerde categorieën:</p>
      RELATED_LINKS
    `,
  },
};

export function getCategorySeoData(
  lang: string,
  hubSlug: string,
  themeSlug: string,
  themeTitle: string,
  allThemesInHub: Array<{ slug: string; title: string }> = []
): CategorySeoData {
  const isEn = lang === 'en';
  const override = SPECIFIC_SEO_DATA[themeSlug];

  // Base URLs for difficulty levels
  const baseUrl = `/${lang}/${hubSlug}/${themeSlug}`;
  const kidsUrl = `${baseUrl}/kids`;
  const teensUrl = `${baseUrl}/teens`;
  const adultsUrl = `${baseUrl}/adults`;

  // Related category links builder
  let relatedSlugs: string[] = override?.relatedSlugs || [];
  if (relatedSlugs.length === 0 && allThemesInHub.length > 0) {
    relatedSlugs = allThemesInHub
      .filter((t) => t.slug !== themeSlug)
      .slice(0, 3)
      .map((t) => t.slug);
  }

  const relatedLinksList = relatedSlugs
    .map((slug) => {
      const found = allThemesInHub.find((t) => t.slug === slug);
      const title = found ? found.title : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return `<li><a href="/${lang}/${hubSlug}/${slug}"><strong>${title} ${isEn ? 'Coloring Pages' : 'Kleurplaten'}</strong></a></li>`;
    })
    .join('');

  const relatedLinksHtml = relatedLinksList ? `<ul>${relatedLinksList}</ul>` : '';

  if (override) {
    const rawIntro = isEn ? override.enIntro : override.nlIntro;
    const rawBottom = isEn ? override.enBottomHtml : override.nlBottomHtml;

    const formattedBottom = (rawBottom || '')
      .replace(/URL_KIDS/g, kidsUrl)
      .replace(/URL_TEENS/g, teensUrl)
      .replace(/URL_ADULTS/g, adultsUrl)
      .replace(/RELATED_LINKS/g, relatedLinksHtml);

    return {
      shortIntro: rawIntro || getDefaultShortIntro(isEn, themeTitle),
      bottomTitle: isEn ? `About ${themeTitle} Coloring Pages` : `Over ${themeTitle} Kleurplaten`,
      bottomContentHtml: formattedBottom,
    };
  }

  // Dynamic fallback generator for all other themes
  const shortIntro = getDefaultShortIntro(isEn, themeTitle);
  const bottomContentHtml = getDefaultBottomHtml(
    isEn,
    themeTitle,
    kidsUrl,
    teensUrl,
    adultsUrl,
    relatedLinksHtml
  );

  return {
    shortIntro,
    bottomTitle: isEn ? `About ${themeTitle} Coloring Pages` : `Over ${themeTitle} Kleurplaten`,
    bottomContentHtml,
  };
}

function getDefaultShortIntro(isEn: boolean, themeTitle: string): string {
  if (isEn) {
    return `Discover our vast collection of free printable ${themeTitle} coloring pages! Perfect for kids, toddlers, teens, and adults. Download high-resolution PDF and image templates ready for instant printing at home or in school without any registration.`;
  }
  return `Ontdek onze uitgebreide verzameling gratis ${themeTitle} kleurplaten om direct uit te printen! Geschikt voor peuters, kinderen, tieners en volwassenen. Download hoge resolutie PDF- en afbeeldingensjablonen gratis voor thuis of in de klas.`;
}

function getDefaultBottomHtml(
  isEn: boolean,
  themeTitle: string,
  kidsUrl: string,
  teensUrl: string,
  adultsUrl: string,
  relatedLinksHtml: string
): string {
  if (isEn) {
    return `
      <h2>Free Printable ${themeTitle} Coloring Pages for All Ages</h2>
      <p>Our high-quality ${themeTitle} coloring collection offers creative inspiration for everyone. Designed in crisp line vector format, these templates are optimized for easy A4 printing and digital coloring apps.</p>

      <h3>Age Groups & Difficulty Levels</h3>
      <p>Find the best ${themeTitle} coloring page suited for your skill level:</p>
      <ul>
        <li><a href="${kidsUrl}"><strong>Easy / Kids (Makkelijk)</strong></a>: Simple outlines and playful designs perfect for toddlers and young beginners.</li>
        <li><a href="${teensUrl}"><strong>Medium / Teens (Gemiddeld)</strong></a>: Creative scenes and expressive details ideal for school-aged kids and teens.</li>
        <li><a href="${adultsUrl}"><strong>Hard / Adults (Moeilijk)</strong></a>: Intricate patterns and detailed artwork tailored for adult coloring and stress reduction.</li>
      </ul>

      <h3>High Resolution PDF & Image Downloads</h3>
      <p>Looking for <em>free printable ${themeTitle} coloring pages PDF</em> or <em>easy ${themeTitle} coloring sheets for toddlers</em>? ColorVaults provides clean, instant downloads for endless hours of coloring fun.</p>

      ${relatedLinksHtml ? `<h3>Explore Related Categories</h3><p>Check out these popular coloring categories:</p>${relatedLinksHtml}` : ''}
    `;
  }

  return `
    <h2>Gratis Printbare ${themeTitle} Kleurplaten voor Elke Leeftijd</h2>
    <p>Onze hoogwaardige verzameling ${themeTitle} kleurplaten biedt creatieve inspiratie voor jong en oud. Alle sjablonen zijn strak getekend en geoptimaliseerd voor eenvoudig A4-afdrukken en digitaal kleuren.</p>

    <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
    <p>Kies de perfecte ${themeTitle} kleurplaat op basis van je ervaring en niveau:</p>
    <ul>
      <li><a href="${kidsUrl}"><strong>Makkelijk / Peuters & Kinderen (Easy)</strong></a>: Duidelijke contouren en schattige vormen voor peuters en kleuters.</li>
      <li><a href="${teensUrl}"><strong>Gemiddeld / Tieners (Medium)</strong></a>: Creatieve scènes en meer details voor basisschoolkinderen en tieners.</li>
      <li><a href="${adultsUrl}"><strong>Moeilijk / Volwassenen (Hard)</strong></a>: Gedetailleerde patronen en uitdagende ontwerpen voor volwassenen en ontspanning.</li>
    </ul>

    <h3>Gratis PDF & Hoge Resolutie Afbeeldingen</h3>
    <p>Zoek je naar <em>gratis ${themeTitle} kleurplaat printen pdf</em> of <em>makkelijke ${themeTitle} kleurplaten voor kinderen</em>? Bij ColorVaults download je snel en zonder account.</p>

    ${relatedLinksHtml ? `<h3>Ontdek ook gerelateerde categorieën</h3><p>Bekijk ook deze populaire categorieën:</p>${relatedLinksHtml}` : ''}
  `;
}
