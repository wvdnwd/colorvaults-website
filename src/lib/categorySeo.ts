import { getThemes } from './api';

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
    enIntro:`Welcome to our extensive collection of free printable animals coloring pages! Whether you are looking for cute puppies, majestic lions, ocean creatures, or farm animals, we offer high-resolution PDF and image templates ready for instant download. Perfect for toddlers, school kids, and adults looking for creative fun without registration.`,
    nlIntro:`Welkom bij onze uitgebreide verzameling gratis dieren kleurplaten om uit te printen! Of je nu op zoek bent naar schattige honden, schattige katten, machtige leeuwen, zeedieren of boerderijdieren: wij bieden hoge resolutie PDF- en afbeeldingensjablonen die direct printbaar zijn. Ideaal voor peuters, basisschoolkinderen en volwassenen die ontspannen willen kleuren zonder te registreren.`,
    relatedSlugs: ['birds','safari-wildlife','cute-pets-animals','dolphins-underwater','farm'],
    enBottomHtml:`<h2>Who Are Our Animals Coloring Pages Suitable For?</h2>
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
      RELATED_LINKS`,
    nlBottomHtml:`<h2>Voor wie zijn onze Dieren Kleurplaten geschikt?</h2>
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
      RELATED_LINKS`,
  },
  mandalas: {
    enIntro:`Explore our beautiful collection of free printable mandala coloring pages designed for mindfulness, stress relief, and artistic expression. Featuring circular geometric patterns, floral mandalas, and spiritual designs in high resolution ready to print or download instantly.`,
    nlIntro:`Ontdek onze prachtige verzameling gratis mandala kleurplaten om uit te printen voor ontspanning, mindfulness en creatieve rust. Met geometrische patronen, bloemen mandala's en spirituele sjablonen in hoge resolutie, direct printbaar zonder kosten.`,
    relatedSlugs: ['celtic-patterns','patterns','botanical-gardens','art-nouveau','flowers-botanical'],
    enBottomHtml:`<h2>Mindfulness & Relaxation with Mandala Coloring Pages</h2>
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
      RELATED_LINKS`,
    nlBottomHtml:`<h2>Ontspanning & Mindfulness met Mandala Kleurplaten</h2>
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
      RELATED_LINKS`,
  },'disney-princesses': {
    enIntro:`Immerse yourself in a magical world with free printable Disney Princesses coloring pages! Print iconic heroines like Cinderella, Belle, Ariel, Jasmine, Snow White, and Rapunzel. High-resolution templates perfect for fairytale lovers, birthday activities, and creative family fun.`,
    nlIntro:`Stap binnen in een betoverende wereld met gratis Disney Prinsessen kleurplaten om uit te printen! Kleur je favoriete prinsessen zoals Assepoester, Belle, Ariël, Jasmine, Sneeuwwitje en Rapunzel. Hoge resolutie kleurplaten ideaal voor kindfeestjes, knutselmiddagen en sprookjesliefhebbers.`,
    relatedSlugs: ['disney-frozen','disney-ariel','disney-belle','princesses-castles','fairies'],
    enBottomHtml:`<h2>Magical Disney Princess Coloring Pages for Every Fan</h2>
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
      RELATED_LINKS`,
    nlBottomHtml:`<h2>Betoverende Disney Prinsessen Kleurplaten voor Jong en Oud</h2>
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
      RELATED_LINKS`,
  },
  'pokemon': {
    enIntro: `Catch 'em all with our massive collection of free printable Pokémon coloring pages! From iconic favorites like Pikachu, Charizard, and Gengar to beloved starter Pokémon and legendary beasts, our high-resolution line art templates are ready to download and print in A4/Letter format. Perfect for kids, anime enthusiasts, and family craft afternoons.`,
    nlIntro: `Vang ze allemaal met onze enorme verzameling gratis Pokémon kleurplaten om uit te printen! Van favorieten zoals Pikachu, Charizard en Eevee tot legendarische Pokémon: al onze sjablonen zijn direct in hoge resolutie te downloaden en te printen op A4-formaat. Ideaal voor kinderen, Pokémon-fans en creatieve middagen.`,
    relatedSlugs: ['pokemon-eevee-evolutions', 'super-mario', 'sonic-the-hedgehog', 'dragonball'],
    enBottomHtml: `<h2>Print Free High-Resolution Pokémon Coloring Pages</h2>
      <p>Bring the vibrant world of Pokémon to life with your favorite pencils, crayons, and markers. Our collection features dynamic battle scenes, cute pocket monsters, and intricate illustrations designed for trainers of all skill levels.</p>
      <h3>Age Groups & Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Adorable baby Pokémon and simple outlines of Pikachu, Squirtle, and Bulbasaur designed for toddlers and early learners.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Action-packed evolution battles, gym leader stadium showdowns, and anime scenes for school-age kids and teens.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Detailed mosaic Pokémon mandalas and complex legendary beast illustrations for advanced colorists.</li>
      </ul>
      <h3>Why Trainers Love ColorVaults</h3>
      <p>Download search favorites like <em>free printable Pikachu coloring sheet PDF</em>, <em>Charizard fire battle coloring page</em>, or <em>starter Pokemon printables</em> with zero subscription fees and unlimited downloads.</p>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Gratis Pokémon Kleurplaten Printen in Hoge Resolutie</h2>
      <p>Breng de kleurrijke wereld van Pokémon tot leven op papier! Onze collectie bevat spannende gevechten, schattige monstertjes en epische legendaries voor trainers van alle leeftijden.</p>
      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Schattige Pikachu, Charmander en Eevee tekeningen met duidelijke dikke lijnen voor peuters en kleuters.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Spannende arena-gevechten en krachtige evoluties voor basisschoolkinderen en tieners.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen</strong></a>: Ingewikkelde Pokémon mandala's en gedetailleerde kunstwerken voor volwassen fans.</li>
      </ul>
      RELATED_LINKS`,
  },
  'lilo-stitch': {
    enIntro: `Say Aloha to our delightful collection of free printable Stitch coloring pages! Featuring Disney's mischievous yet lovable Experiment 626, Lilo, Angel, and Hawaiian island adventures. Download and print crisp, high-resolution A4 and Letter PDF coloring sheets for kids, teens, and Disney fans of all ages.`,
    nlIntro: `Zeg Aloha tegen onze vrolijke verzameling gratis Stitch kleurplaten om uit te printen! Met het ondeugende blauwe ruimtewezen Experiment 626, Lilo, Angel en tropische Hawaïaanse avonturen. Download direct haarscherpe A4-printables voor kinderen, tieners en Disney-liefhebbers.`,
    relatedSlugs: ['frozen', 'disney-princesses', 'cute-puppies-dogs', 'unicorns-pegasus'],
    enBottomHtml: `<h2>High-Resolution Free Printable Stitch Coloring Sheets</h2>
      <p>Stitch has captured hearts across the globe with his hilarious antics and deep love for family (Ohana). Our printable sheets capture Stitch playing guitar, eating ice cream, riding surfboards, and dressing up in cute costumes.</p>
      <h3>Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Big, cheerful outlines of Stitch eating snacks and smiling for toddlers and preschoolers.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Hawaiian beach scenes, Stitch with guitar, and tropical flora for school-age kids.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Detailed tropical floral patterns and intricate Stitch portraits for relaxing mindfulness.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Haarscherpe Gratis Stitch Kleurplaten Printen</h2>
      <p>Stitch heeft de harten van miljoenen veroverd met zijn grappige streken en zijn liefde voor 'Ohana' (familie). Ontdek kleurplaten van Stitch op een surfboard, met een ijsje of gitaar spelend op het strand.</p>
      <h3>Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Grote vrolijke tekeningen van Stitch voor peuters en kleuters.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Tropische Hawaï-stranden en grappige avonturen voor basisschoolkinderen.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen</strong></a>: Gedetailleerde botanische bloemenpatronen gecombineerd met Stitch voor ontspanning.</li>
      </ul>
      RELATED_LINKS`,
  },
  'paw-patrol': {
    enIntro: `No job is too big, no pup is too small! Explore our action-packed collection of free printable PAW Patrol coloring pages. Join Chase, Marshall, Skye, Rubble, Zuma, and Rocky on exciting Adventure Bay rescue missions. 100% free high-resolution PDFs ready for instant home or classroom printing.`,
    nlIntro: `Geen klus te groot, geen pup te klein! Ontdek onze spannende verzameling gratis PAW Patrol kleurplaten om uit te printen. Ga op reddingsmissie in Avonturenbaai met Chase, Marshall, Skye, Puin, Zuma en Rocky. 100% gratis en direct printklaar op A4-formaat.`,
    relatedSlugs: ['cute-puppies-dogs', 'super-mario', 'sonic-the-hedgehog', 'dinosaur-adventures'],
    enBottomHtml: `<h2>Printable PAW Patrol Hero Rescue Sheets</h2>
      <p>Inspire courage, teamwork, and problem-solving in young children with our curated PAW Patrol coloring sheets. Perfect for birthday party craft stations, rainy afternoons, and preschool rewards.</p>
      <h3>Characters & Difficulty</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Bold lines featuring individual hero pups in their rescue vehicles.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Lookout tower scenes, Mighty Pups superhero action, and Adventure City missions.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Gratis PAW Patrol Kleurplaten voor Kinderen</h2>
      <p>Stimuleer de creativiteit en fijne motoriek van jonge kinderen met de heldhaftige reddingshonden van PAW Patrol. Ideaal voor kinderfeestjes, op de opvang of gewoon gezellig thuis aan tafel.</p>
      RELATED_LINKS`,
  },
  'frozen': {
    enIntro: `Enter the winter wonderland of Arendelle with free printable Frozen coloring pages! Print enchanting designs of Queen Elsa, Princess Anna, Olaf the Snowman, Kristoff, and Sven. High-definition A4/Letter PDF templates ready for royal coloring fun.`,
    nlIntro: `Stap in de betoverende winterwereld van Arendelle met gratis Frozen kleurplaten om uit te printen! Kleur koningin Elsa, prinses Anna, sneeuwpop Olaf, Kristoff en rendier Sven in hoge resolutie A4-formaat. 100% gratis zonder registratie.`,
    relatedSlugs: ['disney-princesses', 'unicorns-pegasus', 'fairies', 'princesses-castles'],
    enBottomHtml: `<h2>Magical Elsa & Anna Frozen Coloring Pages for Kids & Disney Fans</h2>
      <p>From Elsa's glittering ice palace to warm hugs with Olaf, our Frozen sheets transport colorists into a breathtaking snowy kingdom filled with magic and song. Whether recreating scenes from Frozen 1 and Frozen 2 or designing custom royal gowns, our line art brings Arendelle straight to your craft table.</p>

      <h3>Age Groups & Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids (Makkelijk)</strong></a>: Big, cheerful outlines of Olaf building snowmen, baby Sven, and young Anna with thick contours for toddlers and preschoolers.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens (Gemiddeld)</strong></a>: Elegant ice-magic poses of Queen Elsa, Princess Anna in coronation dress, and enchanted forest adventures for school kids.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults (Moeilijk)</strong></a>: Intricate snowflake mandalas, detailed ice crystal fractals, and artistic royal portraits for adult Disney enthusiasts.</li>
      </ul>

      <h3>Creative Coloring Tips for Frozen Pages</h3>
      <p>Pair light blue and violet pencils with metallic silver gel pens or light glitter on Elsa's magical cape. Print on heavier A4 paper for marker coloring without bleed-through.</p>

      <h3>Explore Related Fairytale Categories</h3>
      <p>Discover more magical royalty and fantasy collections:</p>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Magische Frozen Kleurplaten met Elsa & Anna voor Jong en Oud</h2>
      <p>Van het schitterende ijspaleis tot warme knuffels van Olaf: breng de magie van Frozen tot leven met je mooiste blauwe, paarse en zilveren potloden. Of je kind nu dol is op het meezingen met <em>Laat Het Los</em> of de betoverde bossen uit Frozen 2 wil ontdekken: onze printbare kleurplaten brengen Arendelle rechtstreeks naar de keukentafel.</p>

      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Peuters & Kleuters (Easy)</strong></a>: Vrolijke grote tekeningen van Olaf de sneeuwpop, jonge Anna en baby Sven met extra dikke lijnen om makkelijk binnen de lijntjes te kleuren.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Basisschool & Tieners (Medium)</strong></a>: Prachtige ijskracht-acties van koningin Elsa, kroningsjurken van Anna en spannende scènes in de sneeuw voor basisschoolkinderen.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen & Mandala's (Hard)</strong></a>: Ingewikkelde ijskristallen, gedetailleerde sneeuwvlokmandala's en sierlijke prinsessenportretten voor rustgevende kleursessies.</li>
      </ul>

      <h3>Knutsel- & Kleurtips voor Frozen Kleurplaten</h3>
      <p>Geef Elsa's jurk een echt magisch effect met zilveren glitterstiften of pastelblauwe waterverf. Tip: knip Olaf en Elsa na het kleuren uit en plak ze op een ijsblauw karton voor je eigen winterse kijkdoos!</p>

      <h3>Ontdek ook gerelateerde magische categorieën</h3>
      <p>Laat je betoveren door meer sprookjes- en fantasiethema's:</p>
      RELATED_LINKS`,
  },
  'marvel-spider-man': {
    enIntro: `Swing through New York City with our thrilling collection of free printable Spider-Man coloring pages! Print web-slinging heroics featuring Peter Parker, Miles Morales, Spider-Gwen, and iconic villains. High-definition PDFs optimized for crisp printing.`,
    nlIntro: `Slinger door de straten van New York met onze actievolle gratis Spider-Man kleurplaten! Kleur Peter Parker, Miles Morales, Spider-Gwen en bekende schurken in haarscherpe A4-kwaliteit. Direct gratis printen.`,
    relatedSlugs: ['super-mario', 'sonic-the-hedgehog', 'dragonball', 'formula-1-race-cars'],
    enBottomHtml: `<h2>Web-Slinging Spider-Man Coloring Sheets</h2>
      <p>Unleash your inner superhero with action poses, wall-crawling adventures, and rooftop battles across the Marvel Universe.</p>
      <h3>Age Groups & Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Bold outlines of Spider-Man jumping, web-shooters, and friendly chibi heroes for toddlers.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: City skyline battles, Miles Morales venom strikes, and comic book covers.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Intricate web-pattern line art and detailed comic splash pages.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Actievolle Spider-Man Kleurplaten</h2>
      <p>Laat je innerlijke superheld los met dynamische poses, web-slingerende actie en spectaculaire stadsgezichten.</p>
      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Duidelijke lijnen van Spider-Man en vrolijke superheldenmaskers voor peuters.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Gave actiescènes tussen wolkenkrabbers en ontmoetingen met schurken.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen</strong></a>: Complexe webstructuren en gedetailleerde stripboekcovers.</li>
      </ul>
      RELATED_LINKS`,
  },
  'dinosaur-adventures': {
    enIntro: `Travel back to prehistoric times with our roaring collection of free printable dinosaur coloring pages! Featuring the mighty Tyrannosaurus Rex, Triceratops, Brachiosaurus, Velociraptor, and Pterodactyl in lush Jurassic jungles. Ready to print in A4/Letter size.`,
    nlIntro: `Reis miljoenen jaren terug in de tijd met onze stoere gratis dinosaurus kleurplaten! Van de machtige Tyrannosaurus Rex en gehoornde Triceratops tot vliegende Pterodactyls in prehistorische oerwouden. Direct printklaar op A4.`,
    relatedSlugs: ['safari-lions-big-cats', 'animals', 'dragons'],
    enBottomHtml: `<h2>Prehistoric Jurassic Dinosaur Printables</h2>
      <p>Spark curiosity about science and paleontology with detailed dinosaur coloring pages suitable for toddler dino lovers and older fossil fans alike.</p>
      <h3>Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Cute baby dinos hatching from eggs and friendly plant-eaters with thick outlines.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Realistic Jurassic landscapes, volcanic eruptions, and hunting raptors.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Highly textured dinosaur skin, fossil skeletons, and prehistoric flora.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Stoere Dinosaurus Kleurplaten voor Jong en Oud</h2>
      <p>Ontdek brullende T-Rexen, vreedzame planteneters en prehistorische landschappen om zelf in te kleuren met potlood of verf.</p>
      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Schattige baby dinootjes uit eieren en vrolijke dino's met dikke lijnen.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Spannende oerwoudscènes met vulkanen, T-Rexen en vliegende Pterodactyls.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen</strong></a>: Gedetailleerde fossielen, skeletten en realistische huidstructuren.</li>
      </ul>
      RELATED_LINKS`,
  },
  'unicorns-pegasus': {
    enIntro: `Step into a fairy tale realm with our enchanting free printable unicorn coloring pages! Discover magical winged pegasi, rainbow unicorns, starry night skies, and baby unicorn foals. High-resolution PDF downloads for kids and fantasy lovers.`,
    nlIntro: `Betreed een sprookjeswereld vol magie met onze gratis eenhoorn kleurplaten om uit te printen! Met magische regenbogen, sterrenhemels, gevleugelde pegasus-paarden en schattige baby eenhoorns op A4-formaat.`,
    relatedSlugs: ['frozen', 'disney-princesses', 'cute-kittens-cats', 'cute-puppies-dogs'],
    enBottomHtml: `<h2>Magical Unicorn & Rainbow Coloring Pages</h2>
      <p>Perfect for dreamy afternoons, glitter pens, and pastel colors. Free high-definition printables ready to spark pure imagination.</p>
      <h3>Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Sweet smiling baby unicorns on fluffy clouds with rainbows and big stars.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Majestic winged pegasus soaring over castles and enchanted fantasy forests.</li>
        <li><a href="URL_ADULTS"><strong>Hard / Adults</strong></a>: Intricate celestial unicorn mandalas and flowing mane line art.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Magische Eenhoorn & Regenboog Kleurplaten</h2>
      <p>Pak je glitters en pastelkleuren erbij voor de mooiste magische eenhoorns en betoverde bossen.</p>
      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Schattige baby-eenhoorns op wolkjes met regenbogen en sterren.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Gevleugelde pegasus-paarden boven sprookjeskastelen en magische bossen.</li>
        <li><a href="URL_ADULTS"><strong>Moeilijk / Volwassenen</strong></a>: Gedetailleerde mandala-eenhoorns met sierlijke manen en bloemenkransen.</li>
      </ul>
      RELATED_LINKS`,
  },
  'bluey': {
    enIntro: `Play along with the Heeler family! Download free printable Bluey coloring pages featuring Bluey, Bingo, Bandit, Chilli, and their neighborhood friends. Wholesome, cheerful line art ready for toddlers, preschoolers, and family fun.`,
    nlIntro: `Speel mee met Bluey en Bingo! Download gratis Bluey kleurplaten om uit te printen met de vrolijke Heeler familie. Warme, herkenbare en gezellige tekeningen voor peuters, kleuters en het hele gezin.`,
    relatedSlugs: ['paw-patrol', 'cute-puppies-dogs', 'super-mario', 'pokemon'],
    enBottomHtml: `<h2>Free Bluey & Bingo Coloring Sheets</h2>
      <p>Celebrate family games, imagination, and laughter with our crisp Bluey printables. Perfect for quiet play and preschool motor skills development.</p>
      <h3>Difficulty Levels</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Easy / Kids</strong></a>: Simple outlines of Bluey, Bingo, and Chattermax for toddlers and early learners.</li>
        <li><a href="URL_TEENS"><strong>Medium / Teens</strong></a>: Backyard games, Grannies dress-up, and living room adventures.</li>
      </ul>
      RELATED_LINKS`,
    nlBottomHtml: `<h2>Vrolijke Bluey Kleurplaten voor Peuters en Kleuters</h2>
      <p>Beleef de leukste spelletjes uit de serie opnieuw op papier. Ideaal voor het oefenen van de fijne motoriek en urenlang kleurplezier.</p>
      <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
      <ul>
        <li><a href="URL_KIDS"><strong>Makkelijk / Kinderen</strong></a>: Duidelijke tekeningen van Bluey en Bingo voor peuters en kleuters.</li>
        <li><a href="URL_TEENS"><strong>Gemiddeld / Tieners</strong></a>: Avonturen in de achtertuin, omaatjes spelen en leuke scènes uit de serie.</li>
      </ul>
      RELATED_LINKS`,
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
      .slice(0, 4)
      .map((t) => t.slug);
  }

  const allThemes = getThemes(lang);
  const relatedLinksList = relatedSlugs
    .map((slug) => {
      const foundInHub = allThemesInHub.find((t) => t.slug === slug);
      const foundInAll = allThemes.find((t) => t.slug === slug);
      const title = foundInHub?.title || foundInAll?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const targetHub = foundInAll?.parentHub || hubSlug;
      return `<li><a href="/${lang}/${targetHub}/${slug}"><strong>${title} ${isEn ? 'Coloring Pages' : 'Kleurplaten'}</strong></a></li>`;
    })
    .join('');

  const relatedLinksHtml = relatedLinksList ? `<ul>${relatedLinksList}</ul>` : '';

  if (override) {
    const rawIntro = isEn ? override.enIntro : override.nlIntro;
    const rawBottom = isEn ? override.enBottomHtml : override.nlBottomHtml;

    const formattedBottom = (rawBottom ||'')
      .replace(/URL_KIDS/g, kidsUrl)
      .replace(/URL_TEENS/g, teensUrl)
      .replace(/URL_ADULTS/g, adultsUrl)
      .replace(/RELATED_LINKS/g, relatedLinksHtml);

    return {
      shortIntro: rawIntro || getDefaultShortIntro(isEn, themeTitle),
      bottomTitle: isEn ?`About ${themeTitle} Coloring Pages`:`Over ${themeTitle} Kleurplaten`,
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
    bottomTitle: isEn ?`About ${themeTitle} Coloring Pages`:`Over ${themeTitle} Kleurplaten`,
    bottomContentHtml,
  };
}

function getDefaultShortIntro(isEn: boolean, themeTitle: string): string {
  if (isEn) {
    return`Discover our vast collection of free printable ${themeTitle} coloring pages! Perfect for kids, toddlers, teens, and adults. Download high-resolution PDF and image templates ready for instant printing at home or in school without any registration.`;
  }
  return`Ontdek onze uitgebreide verzameling gratis ${themeTitle} kleurplaten om direct uit te printen! Geschikt voor peuters, kinderen, tieners en volwassenen. Download hoge resolutie PDF- en afbeeldingensjablonen gratis voor thuis of in de klas.`;
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
    return `<h2>The Ultimate ${themeTitle} Coloring Guide: Creative Fun & Learning</h2>
      <p>Welcome to ColorVaults’ comprehensive library of free printable <strong>${themeTitle} coloring pages</strong>! Whether you are a parent looking for wholesome weekend activities, an educator preparing classroom lesson plans, or an art enthusiast seeking mindful creative relaxation, our high-resolution line art templates provide hours of engaging entertainment.</p>

      <h3>Recommended Color Palettes & Creative Supplies</h3>
      <p>To achieve the most vibrant and satisfying results with your ${themeTitle} illustrations, consider using these suggested materials:</p>
      <ul>
        <li><strong>Soft-Core Colored Pencils:</strong> Excellent for smooth blending, gradient shading, and fine boundary control on intricate line art.</li>
        <li><strong>Dual-Tip Brush Markers:</strong> Ideal for bold, saturated coverage across large areas with zero streaks. Always place a scrap sheet behind your page to prevent bleed-through.</li>
        <li><strong>Fine-Liner Pens (0.4mm):</strong> Perfect for accentuating delicate outlines, patterns, and decorative borders.</li>
        <li><strong>Standard 120–160 GSM Paper:</strong> For the best drawing feel and durability, print on medium-weight cardstock rather than thin copy paper.</li>
      </ul>

      <h3>Age Groups & Difficulty Levels</h3>
      <p>Our ${themeTitle} collection is thoughtfully organized across three skill tiers to ensure an enjoyable experience for every colorist:</p>
      <ul>
        <li><a href="${kidsUrl}"><strong>Easy / Kids (Makkelijk)</strong></a>: Bold, thick borders and simplified shapes designed specifically for toddlers, preschoolers, and early learners building pencil grip.</li>
        <li><a href="${teensUrl}"><strong>Medium / Teens (Gemiddeld)</strong></a>: Dynamic scenes, expressive character poses, and detailed scenery perfect for school-aged kids and creative teenagers.</li>
        <li><a href="${adultsUrl}"><strong>Hard / Adults (Moeilijk)</strong></a>: Complex compositions, detailed backgrounds, and intricate mandala-style shading areas crafted for adult relaxation and mindfulness.</li>
      </ul>

      <h3>Educational & Developmental Benefits</h3>
      <p>Engaging in coloring exercises featuring ${themeTitle} supports child cognitive development in several fundamental ways: it improves fine motor precision and grip endurance, enhances spatial reasoning and boundary awareness, and encourages emotional self-regulation through tactile focus.</p>

      <h3>How to Print Free ${themeTitle} Coloring Pages</h3>
      <ol>
        <li>Click on your favorite ${themeTitle} image thumbnail to open the full-page view.</li>
        <li>Click the purple <strong>"Print Free Coloring Page"</strong> button for an instant print preview.</li>
        <li>In your browser's printer settings, select <em>A4</em> or <em>US Letter</em> size, choose <em>Portrait orientation</em>, and ensure scale is set to <strong>100% (Fit to Page)</strong>.</li>
        <li>Click Print or hit the <strong>"Download Image File"</strong> button to save the 300 DPI high-definition image to your computer or tablet.</li>
      </ol>

      ${relatedLinksHtml ? `<h3>Explore Related Coloring Collections</h3><p>Discover more free printable pages from our library:</p>${relatedLinksHtml}` : ''}`;
  }

  return `<h2>De Complete ${themeTitle} Kleurgids: Creatief Plezier & Educatie</h2>
    <p>Welkom bij de uitgebreide verzameling gratis printbare <strong>${themeTitle} kleurplaten</strong> op ColorVaults! Of je nu als ouder zoekt naar een gezellige activiteit voor het weekend, als juf of meester lesmateriaal zoekt voor de klas, of als volwassene ontspanning zoekt na een drukke dag: onze haarscherpe kleurplaten bieden urenlang creatief plezier.</p>

    <h3>Aanbevolen Kleurmaterialen & Tips</h3>
    <p>Voor het allermooiste resultaat bij het inkleuren van ${themeTitle} tekeningen adviseren we de volgende materialen:</p>
    <ul>
      <li><strong>Zachte Kleurpotloden:</strong> Ideaal voor het zachtjes mengen van kleuren, het maken van schaduwen en strak werken binnen de lijntjes.</li>
      <li><strong>Viltstiften & Brushpennen:</strong> Voor felle, sprekende kleuren. Tip: leg even een extra leeg printpapiertje onder de kleurplaat om doordrukken te voorkomen.</li>
      <li><strong>Fineliners (0.4 mm):</strong> Geweldig voor het accentueren van kleine details en sierlijke lijntjes.</li>
      <li><strong>120–160 Grams Tekenpapier:</strong> Print bij voorkeur op iets steviger papier voor een professioneel en kreukvrij eindresultaat.</li>
    </ul>

    <h3>Leeftijdsgroepen & Moeilijkheidsgraden</h3>
    <p>Onze ${themeTitle} collectie is ingedeeld in drie duidelijke niveaus zodat iedereen op zijn eigen tempo kan genieten:</p>
    <ul>
      <li><a href="${kidsUrl}"><strong>Makkelijk / Peuters & Kleuters (Easy)</strong></a>: Extra dikke lijnen en overzichtelijke vlakken om de pengreep en motoriek te oefenen.</li>
      <li><a href="${teensUrl}"><strong>Gemiddeld / Tieners & Basisschool (Medium)</strong></a>: Vrolijke scènes, gedetailleerde personages en creatieve achtergronden.</li>
      <li><a href="${adultsUrl}"><strong>Moeilijk / Volwassenen (Hard)</strong></a>: Ingewikkelde patronen en verfijnde illustraties voor rustgevende kleurtherapie en mindfulness.</li>
    </ul>

    <h3>Ontwikkelingsvoordelen van Kleuren</h3>
    <p>Het regelmatig inkleuren van ${themeTitle} kleurplaten stimuleert de fijne motoriek en handspieren bij jonge kinderen, bevordert het ruimtelijk inzicht en helpt kinderen en volwassenen om tot rust te komen na een dag vol prikkels.</p>

    <h3>Stappenplan: Gratis ${themeTitle} Kleurplaat Printen</h3>
    <ol>
      <li>Klik op een ${themeTitle} afbeelding om de detailpagina te openen.</li>
      <li>Klik op de knop <strong>"Gratis Kleurplaat Printen"</strong> voor een direct afdrukvoorbeeld.</li>
      <li>Kies in je printermenu voor <em>A4-formaat</em> en selecteer <em>Aanpassen aan pagina (100% schaal)</em> in staande afdrukstand.</li>
      <li>Druk op Printen of kies <strong>"Download Afbeelding"</strong> om het bestand digitaal op te slaan op je pc, tablet of telefoon.</li>
    </ol>

    ${relatedLinksHtml ? `<h3>Ontdek ook gerelateerde categorieën</h3><p>Bekijk ook deze populaire thema's:</p>${relatedLinksHtml}` : ''}`;
}
