export interface HolidayMarketingEvent {
  id: string;
  month: number;
  approxDate: string;
  titleNl: string;
  titleEn: string;
  titleDe: string;
  titleFr: string;
  countries: Array<'NL' | 'BE' | 'US' | 'UK' | 'DE' | 'FR' | 'GLOBAL'>;
  trafficTier: 'extreme' | 'high' | 'medium';
  searchVolumeEstimate: string;
  leadTimeWeeks: number;
  seoPushWindow: string;
  socialPushWindow: string;
  peakTrafficWindow: string;
  targetThemeSlugs: string[];
  topKeywords: {
    nl: string[];
    en: string[];
    de: string[];
    fr: string[];
  };
  strategyAdviceNl: string;
  strategyAdviceEn: string;
  checklistItems: string[];
}

export const HOLIDAY_MARKETING_EVENTS: HolidayMarketingEvent[] = [
  {
    "id": "new-year",
    "month": 1,
    "approxDate": "1 Jan",
    "titleNl": "Nieuwjaar & Goede Voornemens",
    "titleEn": "New Year & 2026 Calendars",
    "titleDe": "Neujahr & Kalender 2026",
    "titleFr": "Nouvel An & Calendriers",
    "countries": [
      "GLOBAL",
      "NL",
      "US",
      "DE",
      "FR",
      "UK"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "250.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Medio November",
    "socialPushWindow": "Half December",
    "peakTrafficWindow": "26 Dec - 7 Jan",
    "targetThemeSlugs": [
      "coloring-calendars",
      "cute-kawaii-food-sushi",
      "art-nouveau-mucha-style"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat nieuwjaar",
        "kleurplaat 2026",
        "nieuwjaarskaart kleurplaat",
        "kalender 2026 printen"
      ],
      "en": [
        "new year coloring page",
        "2026 calendar printable",
        "happy new year coloring sheets"
      ],
      "de": [
        "malvorlagen neujahr",
        "silvester ausmalbilder",
        "kalender 2026 zum ausdrucken"
      ],
      "fr": [
        "coloriage nouvel an",
        "coloriage bonne annee",
        "calendrier 2026 a imprimer"
      ]
    },
    "strategyAdviceNl": "Plaats kalenders en vuurwerk/feest kleurplaten. Veel leerkrachten printen dit op de eerste schooldag na de kerstvakantie.",
    "strategyAdviceEn": "Promote printable coloring calendars and celebration pages for back-to-school after winter break.",
    "checklistItems": [
      "Kalenders controleren op juiste jaargang",
      "Nieuwjaars kleurplaten promoten op Pinterest",
      "Sitemap her-indexeren in Google Search Console"
    ]
  },
  {
    "id": "epiphany-three-kings",
    "month": 1,
    "approxDate": "6 Jan",
    "titleNl": "Driekoningen (Galette des Rois)",
    "titleEn": "Epiphany / Three Kings Day",
    "titleDe": "Heilige Drei Könige",
    "titleFr": "Épiphanie (Galette des Rois)",
    "countries": [
      "FR",
      "BE",
      "DE",
      "NL"
    ],
    "trafficTier": "medium",
    "searchVolumeEstimate": "80.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 4,
    "seoPushWindow": "Begin December",
    "socialPushWindow": "Eind December",
    "peakTrafficWindow": "2 Jan - 8 Jan",
    "targetThemeSlugs": [
      "fantasy-fairytales"
    ],
    "topKeywords": {
      "nl": [
        "driekoningen kleurplaat",
        "drie koningen kroon knutselen"
      ],
      "en": [
        "three kings coloring page",
        "epiphany crown printable"
      ],
      "de": [
        "heilige drei könige ausmalbilder",
        "sternsinger malvorlagen"
      ],
      "fr": [
        "coloriage galette des rois",
        "coloriage couronne epiphanie",
        "coloriage rois mages"
      ]
    },
    "strategyAdviceNl": "Enorm populair in Frankrijk en België (kronen knutselen & Galette des Rois). Zorg voor mooie kroon- en koningentekeningen.",
    "strategyAdviceEn": "Huge surge in France and Belgium. Focus on crown crafting and kings templates.",
    "checklistItems": [
      "Kronen en kastelen kleurplaten controleren",
      "Franse metadata up-to-date houden"
    ]
  },
  {
    "id": "carnaval-mardi-gras",
    "month": 2,
    "approxDate": "10-17 Feb (Variabel)",
    "titleNl": "Carnaval & Mardi Gras",
    "titleEn": "Carnival & Mardi Gras",
    "titleDe": "Karneval, Fasching & Fastnacht",
    "titleFr": "Carnaval & Mardi Gras",
    "countries": [
      "NL",
      "BE",
      "DE",
      "FR",
      "US"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "350.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Begin Januari",
    "socialPushWindow": "Eind Januari",
    "peakTrafficWindow": "1 Feb - 18 Feb",
    "targetThemeSlugs": [
      "cute-kawaii-food-sushi",
      "art-aesthetic",
      "fantasy-fairytales"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat carnaval",
        "carnavalsmasker knutselen",
        "clown kleurplaat",
        "carnaval optocht"
      ],
      "en": [
        "carnival coloring pages",
        "mardi gras mask printable",
        "clown coloring sheet"
      ],
      "de": [
        "ausmalbilder karneval",
        "fasching malvorlagen kinder",
        "masken ausmalen fasching"
      ],
      "fr": [
        "coloriage carnaval",
        "coloriage masque mardi gras",
        "coloriage arlequin"
      ]
    },
    "strategyAdviceNl": "Hoge zoekvraag in Zuid-Nederland, België, Duitsland (Köln/Mainz) en Frankrijk. Maskers om uit te knippen doen het fantastisch op scholen.",
    "strategyAdviceEn": "Strong demand across Europe and US for printable cut-out masks and carnival characters.",
    "checklistItems": [
      "Maskers en vrolijke feestfiguren toevoegen",
      "Pinterest pins publiceren met Carnaval knutselen"
    ]
  },
  {
    "id": "valentines-day",
    "month": 2,
    "approxDate": "14 Feb",
    "titleNl": "Valentijnsdag & Liefde",
    "titleEn": "Valentine's Day & Hearts",
    "titleDe": "Valentinstag Ausmalbilder",
    "titleFr": "Saint-Valentin & Cœurs",
    "countries": [
      "GLOBAL",
      "US",
      "UK",
      "NL",
      "DE",
      "FR"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "600.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 5,
    "seoPushWindow": "Begin Januari",
    "socialPushWindow": "25 Januari",
    "peakTrafficWindow": "1 Feb - 14 Feb",
    "targetThemeSlugs": [
      "cute-kittens-cats",
      "cute-puppies-dogs",
      "unicorns-pegasus",
      "cozy-life-hygge"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat valentijn",
        "valentijnsdag kleurplaat hartjes",
        "liefde kleurplaat kinderen"
      ],
      "en": [
        "valentines day coloring pages",
        "heart coloring sheet",
        "cute love coloring pages printable"
      ],
      "de": [
        "ausmalbilder valentinstag",
        "herzen malvorlagen zum ausdrucken",
        "liebe ausmalbilder"
      ],
      "fr": [
        "coloriage saint valentin",
        "coloriage coeur imprimer",
        "coloriage amour"
      ]
    },
    "strategyAdviceNl": "Kinderen maken massaal kleurplaten voor ouders en grootouders. Focus op schattige beertjes, hartjes, katjes en mandala hartjes.",
    "strategyAdviceEn": "High engagement across all ages. Promote cute animals holding hearts and intricate mandala hearts.",
    "checklistItems": [
      "Hartjes- en dierenkleurplaten controleren",
      "Uitlichten op de homepage 2 weken voor 14 februari"
    ]
  },
  {
    "id": "st-patricks-day",
    "month": 3,
    "approxDate": "17 Mar",
    "titleNl": "St. Patrick's Day & Klavertjes",
    "titleEn": "St. Patrick's Day & Lucky Clovers",
    "titleDe": "St. Patrick's Day Malvorlagen",
    "titleFr": "Saint-Patrick & Trèfles",
    "countries": [
      "US",
      "UK",
      "GLOBAL"
    ],
    "trafficTier": "medium",
    "searchVolumeEstimate": "300.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 5,
    "seoPushWindow": "Eind Januari",
    "socialPushWindow": "Begin Maart",
    "peakTrafficWindow": "1 Mar - 17 Mar",
    "targetThemeSlugs": [
      "fantasy-fairytales",
      "dragons",
      "botanical-gardens-greenhouses"
    ],
    "topKeywords": {
      "nl": [
        "st patricks day kleurplaat",
        "klavertje vier kleurplaat"
      ],
      "en": [
        "st patricks day coloring pages",
        "leprechaun coloring sheet",
        "four leaf clover printable",
        "pot of gold rainbow"
      ],
      "de": [
        "st patricks day ausmalbilder",
        "kobold malvorlage"
      ],
      "fr": [
        "coloriage saint patrick",
        "coloriage leprechaun",
        "coloriage trefle"
      ]
    },
    "strategyAdviceNl": "Enorme piek in de VS en UK. Leprechauns, regenbogen, potten goud en klavertjes vier.",
    "strategyAdviceEn": "Massive seasonal traffic surge in USA & UK schools and homeschooling communities.",
    "checklistItems": [
      "Regenbogen en klavertjes in gaming/fantasy taggen",
      "Engelse collecties promoten"
    ]
  },
  {
    "id": "spring-easter",
    "month": 4,
    "approxDate": "Maart / April (Variabel)",
    "titleNl": "Pasen & Vrolijke Lente",
    "titleEn": "Easter & Spring Bloom",
    "titleDe": "Ostern & Frühlingserwachen",
    "titleFr": "Pâques & Printemps",
    "countries": [
      "GLOBAL",
      "NL",
      "DE",
      "FR",
      "US",
      "UK",
      "BE"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "1.200.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 8,
    "seoPushWindow": "Begin Februari (6-8 wk voor Pasen)",
    "socialPushWindow": "Begin Maart",
    "peakTrafficWindow": "2 weken voor Pasen t/m Paasweekend",
    "targetThemeSlugs": [
      "easter-spring-bloom",
      "cute-bunnies-small-pets",
      "butterflies-garden-insects",
      "botanical-gardens-greenhouses"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat pasen",
        "paashaas kleurplaat",
        "paaseieren inkleuren",
        "lente kleurplaat"
      ],
      "en": [
        "easter coloring pages",
        "easter bunny printable",
        "easter egg coloring sheets",
        "spring flowers coloring pages"
      ],
      "de": [
        "ausmalbilder ostern",
        "osterhase malvorlagen",
        "ostereier zum ausmalen",
        "frühling ausmalbilder"
      ],
      "fr": [
        "coloriage paques",
        "coloriage lapin de paques",
        "coloriage oeuf de paques imprimer"
      ]
    },
    "strategyAdviceNl": "🔥 EEN VAN DE GROOTSTE PIEKEN VAN HET JAAR! Start al in februari met het boosten van paashazen, paaseieren en kuikentjes.",
    "strategyAdviceEn": "🔥 ONE OF THE TOP 3 ANNUAL TRAFFIC SPIKES! Start indexing Easter bunny and floral egg templates in February.",
    "checklistItems": [
      "Check thema easter-spring-bloom (244+ kleurplaten)",
      "Homepage seizoensbanner automatisch activeren",
      "Pinterest campagne starten 4 weken voor Pasen",
      "Kleurboek PDF bundel Paaspret klaarzetten"
    ]
  },
  {
    "id": "koningsdag",
    "month": 4,
    "approxDate": "27 Apr",
    "titleNl": "Koningsdag & Oranje Feest",
    "titleEn": "King's Day Netherlands",
    "titleDe": "Königstag Niederlande",
    "titleFr": "Fête du Roi (Pays-Bas)",
    "countries": [
      "NL"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "200.000+ zoekopdrachten in NL",
    "leadTimeWeeks": 5,
    "seoPushWindow": "Begin Maart",
    "socialPushWindow": "Begin April",
    "peakTrafficWindow": "15 Apr - 27 Apr",
    "targetThemeSlugs": [
      "coloring-calendars"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat koningsdag",
        "koning willem alexander kleurplaat",
        "kroon koningsdag knutselen",
        "oranje tompouce kleurplaat"
      ],
      "en": [
        "kings day netherlands coloring page",
        "dutch royal crown printable"
      ],
      "de": [
        "königstag holland ausmalbilder"
      ],
      "fr": [
        "fete du roi pays bas coloriage"
      ]
    },
    "strategyAdviceNl": "🇳🇱 Enorme Nederlandse piek! Vrijmarkt bordjes, kronen knutselen, vlaggetjes en oranje feestjes.",
    "strategyAdviceEn": "Massive Dutch holiday traffic. Promote crowns, royal crests, and festivities.",
    "checklistItems": [
      "Kronen en feestelijke vlaggen prominent zetten",
      "Nederlandse nieuwsbrief uitsturen medio april"
    ]
  },
  {
    "id": "mothers-day",
    "month": 5,
    "approxDate": "2e zondag in Mei",
    "titleNl": "Moederdag",
    "titleEn": "Mother's Day",
    "titleDe": "Muttertag",
    "titleFr": "Fête des Mères (Eind Mei)",
    "countries": [
      "GLOBAL",
      "NL",
      "BE",
      "DE",
      "US",
      "FR",
      "UK"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "950.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Eind Maart",
    "socialPushWindow": "Half April",
    "peakTrafficWindow": "25 Apr - 10 Mei (NL/US/DE) / Eind Mei (FR)",
    "targetThemeSlugs": [
      "botanical-gardens-greenhouses",
      "butterflies-garden-insects",
      "mandalas-sacred-geometry",
      "sweet-treats-bakery-desserts"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat moederdag",
        "moederdag kleurplaat met gedicht",
        "mooiste kleurplaat voor mama",
        "bloemen boeket kleurplaat"
      ],
      "en": [
        "mothers day coloring pages",
        "best mom ever coloring sheets",
        "flower bouquet coloring printable for mom"
      ],
      "de": [
        "ausmalbilder muttertag",
        "beste mama malvorlage",
        "blumenstrauß zum ausmalen muttertag"
      ],
      "fr": [
        "coloriage fete des meres",
        "coloriage bonne fete maman",
        "dessin coeur bouquet pour maman"
      ]
    },
    "strategyAdviceNl": "🔥 REUSACHTIG ZOEKVOLUME! Kinderen en basisscholen printen miljoenen bloemenboeketten en Beste Mama certificaten.",
    "strategyAdviceEn": "🔥 GIANT GLOBAL TRAFFIC PEAK! Flowers, Best Mom awards, and breakfast-in-bed templates.",
    "checklistItems": [
      "Bloemen en hartjes bundels uitlichten",
      "Homepage banner instellen 2 weken vooraf",
      "Speciale Moederdag Kleurkaart PDF maken"
    ]
  },
  {
    "id": "fathers-day",
    "month": 6,
    "approxDate": "3e zondag in Juni",
    "titleNl": "Vaderdag",
    "titleEn": "Father's Day",
    "titleDe": "Vatertag",
    "titleFr": "Fête des Pères",
    "countries": [
      "GLOBAL",
      "NL",
      "BE",
      "US",
      "UK",
      "FR",
      "DE"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "750.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 5,
    "seoPushWindow": "Begin Mei",
    "socialPushWindow": "Eind Mei",
    "peakTrafficWindow": "1 Jun - 18 Jun",
    "targetThemeSlugs": [
      "construction-heavy-vehicles",
      "formula-1-race-cars",
      "superheroes-comic-universes",
      "dinosaur-adventures"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat vaderdag",
        "beste papa kleurplaat",
        "gereedschap kleurplaat vaderdag",
        "super papa kleurplaat"
      ],
      "en": [
        "fathers day coloring pages",
        "best dad ever coloring sheet",
        "tools cars superhero dad printable"
      ],
      "de": [
        "ausmalbilder vatertag",
        "bester papa malvorlagen",
        "werkzeug autos zum ausmalen"
      ],
      "fr": [
        "coloriage fete des peres",
        "coloriage meilleur papa du monde",
        "dessin fete des peres a imprimer"
      ]
    },
    "strategyAdviceNl": "Gereedschap, snelle raceauto's, superhelden-papa's en bier/BBQ-thema kleurkaarten.",
    "strategyAdviceEn": "Tools, sports cars, superhero dad badges, and BBQ themes.",
    "checklistItems": [
      "Voertuigen en gereedschap pagina's taggen voor Vaderdag",
      "Promotie starten begin juni"
    ]
  },
  {
    "id": "summer-vacation",
    "month": 7,
    "approxDate": "Juli - Augustus",
    "titleNl": "Zomervakantie & Strandpret",
    "titleEn": "Summer Break & Beach Fun",
    "titleDe": "Sommerferien & Strand",
    "titleFr": "Vacances d'Été & Plage",
    "countries": [
      "GLOBAL",
      "NL",
      "DE",
      "FR",
      "US",
      "UK"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "500.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Medio Mei",
    "socialPushWindow": "Medio Juni",
    "peakTrafficWindow": "1 Juli - 25 Augustus",
    "targetThemeSlugs": [
      "dolphins-coral-reefs",
      "ocean-life-whales",
      "cute-kawaii-food-sushi",
      "cottagecore-rural-living"
    ],
    "topKeywords": {
      "nl": [
        "zomer kleurplaat",
        "strand kleurplaat",
        "ijsjes kleurplaat",
        "vakantie doeboek printen"
      ],
      "en": [
        "summer coloring pages",
        "beach vacation coloring sheets",
        "ice cream coloring printable",
        "ocean sea life"
      ],
      "de": [
        "sommer ausmalbilder",
        "strand malvorlagen kinder",
        "eis ausmalen sommerferien"
      ],
      "fr": [
        "coloriage ete",
        "coloriage plage vacances",
        "coloriage glace mer imprimer"
      ]
    },
    "strategyAdviceNl": "Ouders zoeken doeboeken en kleurplaten voor in de auto, vliegtuig en regenachtige campingdagen.",
    "strategyAdviceEn": "Parents search for road-trip activity bundles and rainy-day printable vacation books.",
    "checklistItems": [
      "Grote Zomervakantie Kleurboek PDF bundel samenstellen",
      "IJsjes, stranden en dolfijnen promoten"
    ]
  },
  {
    "id": "back-to-school",
    "month": 8,
    "approxDate": "Medio Aug - Begin Sep",
    "titleNl": "Terug naar School (Back to School)",
    "titleEn": "Back to School & Classroom Ideas",
    "titleDe": "Schulstart & Einschulung (Schultüte)",
    "titleFr": "Rentrée des Classes",
    "countries": [
      "GLOBAL",
      "US",
      "DE",
      "NL",
      "FR",
      "UK"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "1.100.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Begin Juli",
    "socialPushWindow": "Eind Juli",
    "peakTrafficWindow": "10 Aug - 15 Sep",
    "targetThemeSlugs": [
      "school-education",
      "bold-easy-toddlers",
      "coloring-calendars"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat school",
        "terug naar school kleurplaat",
        "eerste schooldag kleurplaat",
        "cijfers en letters leren"
      ],
      "en": [
        "back to school coloring pages",
        "first day of school coloring sheet",
        "teacher classroom coloring printable"
      ],
      "de": [
        "ausmalbilder schulanfang",
        "einschulung schultüte malvorlagen",
        "erster schultag ausmalen"
      ],
      "fr": [
        "coloriage rentree scolaire",
        "coloriage ecole maitresse",
        "coloriage rentree des classes"
      ]
    },
    "strategyAdviceNl": "🔥 ENORME PIEK VOOR ONDERWIJS! In Duitsland is Schultüte / Einschulung gigantisch. Leerkrachten printen honderdduizenden welkomstplaten.",
    "strategyAdviceEn": "🔥 MASSIVE TEACHER & PARENT SURGE! Classroom welcome sheets, alphabet coloring, and backpack items.",
    "checklistItems": [
      "Duitse Einschulung/Schultüte pagina's verifiëren",
      "School & Education album uitbreiden met nieuwe platen",
      "Pinterest campagne voor juffen en meesters starten"
    ]
  },
  {
    "id": "dierendag",
    "month": 10,
    "approxDate": "4 Okt",
    "titleNl": "Werelddierendag (World Animal Day)",
    "titleEn": "World Animal Day",
    "titleDe": "Welttierschutztag",
    "titleFr": "Journée Mondiale des Animaux",
    "countries": [
      "NL",
      "BE",
      "GLOBAL",
      "DE",
      "FR"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "350.000+ zoekopdrachten/mnd",
    "leadTimeWeeks": 4,
    "seoPushWindow": "Begin September",
    "socialPushWindow": "20 September",
    "peakTrafficWindow": "25 Sep - 5 Okt",
    "targetThemeSlugs": [
      "cute-puppies-dogs",
      "cute-kittens-cats",
      "cute-pandas-koalas",
      "safari-lions-big-cats",
      "birds-of-the-world"
    ],
    "topKeywords": {
      "nl": [
        "dierendag kleurplaat",
        "honden kleurplaat",
        "katten kleurplaat",
        "boerderijdieren inkleuren"
      ],
      "en": [
        "world animal day coloring pages",
        "cute animals coloring sheets printable"
      ],
      "de": [
        "welttierschutztag ausmalbilder",
        "tiere malvorlagen kinder"
      ],
      "fr": [
        "coloriage animaux journée mondiale",
        "coloriage chiens et chats"
      ]
    },
    "strategyAdviceNl": "Elke basisschool in Nederland viert Dierendag op 4 oktober. Zorg dat puppy's, kittens en boerderijdieren vooraan staan.",
    "strategyAdviceEn": "Great educational focus on pets and wildlife protection across schools.",
    "checklistItems": [
      "Dierenalbums controleren en uitlichten",
      "Homepage spotlight op dieren zetten begin oktober"
    ]
  },
  {
    "id": "halloween",
    "month": 10,
    "approxDate": "31 Okt",
    "titleNl": "Halloween & Spooky Nights",
    "titleEn": "Halloween & Haunted Pumpkins",
    "titleDe": "Halloween Ausmalbilder & Grusel",
    "titleFr": "Halloween & Citrouilles Magiques",
    "countries": [
      "GLOBAL",
      "US",
      "UK",
      "NL",
      "DE",
      "FR",
      "BE"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "2.500.000+ zoekopdrachten/mnd (TOP PIEK)",
    "leadTimeWeeks": 8,
    "seoPushWindow": "Medio Augustus (8 wk voor 31 okt!)",
    "socialPushWindow": "Begin Oktober",
    "peakTrafficWindow": "1 Okt - 31 Okt (piek 24-31 okt)",
    "targetThemeSlugs": [
      "halloween-spooky-nights",
      "halloween-spooky-creatures",
      "creepy-kawaii",
      "autumn-harvest-pumpkins"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat halloween",
        "halloween pompoen kleurplaat",
        "spook kleurplaat",
        "heks kleurplaat kinderen",
        "griezel kleurplaat"
      ],
      "en": [
        "halloween coloring pages",
        "spooky pumpkin coloring sheets",
        "ghost coloring pages free printable",
        "witch haunted house printable"
      ],
      "de": [
        "halloween ausmalbilder",
        "kürbis malvorlagen",
        "gespenst ausmalbilder gruselig",
        "hexe malvorlage"
      ],
      "fr": [
        "coloriage halloween",
        "coloriage citrouille qui fait peur",
        "coloriage fantome sorciere imprimer"
      ]
    },
    "strategyAdviceNl": "🎃 ABSOLUTE VERKEERSGIGANT! Halloween is wereldwijd de nummer 1 herfstkleurplatenperiode. Begin al in AUGUSTUS met indexeren!",
    "strategyAdviceEn": "🎃 ABSOLUTE #1 AUTUMN PEAK! Over 2.5 Million monthly searches. Start SEO indexing in August.",
    "checklistItems": [
      "Check thema halloween-spooky-nights (509+ pagina's)",
      "Check thema halloween-spooky-creatures (257+ pagina's)",
      "Controleer Pinterest SEO borden Halloween Coloring Pages",
      "Zet de oranje Halloween banner live op de homepage per 1 oktober"
    ]
  },
  {
    "id": "sint-maarten",
    "month": 11,
    "approxDate": "11 Nov",
    "titleNl": "Sint-Maarten & Lampionnen",
    "titleEn": "St. Martin's Day (Lanterns)",
    "titleDe": "Sankt Martin & Laternenumzug",
    "titleFr": "Saint-Martin & Lanternes",
    "countries": [
      "NL",
      "DE",
      "BE"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "220.000+ zoekopdrachten in NL/DE",
    "leadTimeWeeks": 4,
    "seoPushWindow": "Begin Oktober",
    "socialPushWindow": "Eind Oktober",
    "peakTrafficWindow": "1 Nov - 11 Nov",
    "targetThemeSlugs": [
      "cozy-life-hygge",
      "autumn-harvest-pumpkins"
    ],
    "topKeywords": {
      "nl": [
        "sint maarten kleurplaat",
        "lampion kleurplaat",
        "sint maarten lantaarn knutselen"
      ],
      "en": [
        "st martin lantern coloring page"
      ],
      "de": [
        "sankt martin ausmalbilder",
        "laternenumzug malvorlagen",
        "martinsgans ausmalen"
      ],
      "fr": [
        "coloriage saint martin lanterne"
      ]
    },
    "strategyAdviceNl": "Traditioneel lampionnen lopen in NL en Duitsland (Laternenfest). Veel vraag naar lampionnen knutselen.",
    "strategyAdviceEn": "Lantern festival in Netherlands and Germany. High demand for lantern templates.",
    "checklistItems": [
      "Lampionnen en herfstsferen klaarzetten",
      "Duitse zoekwoorden voor Laternenumzug optimaliseren"
    ]
  },
  {
    "id": "thanksgiving",
    "month": 11,
    "approxDate": "4e donderdag in Nov",
    "titleNl": "Thanksgiving (VS & Canada)",
    "titleEn": "Thanksgiving & Fall Harvest",
    "titleDe": "Thanksgiving Ausmalbilder",
    "titleFr": "Action de Grâce (Thanksgiving)",
    "countries": [
      "US",
      "GLOBAL"
    ],
    "trafficTier": "high",
    "searchVolumeEstimate": "850.000+ zoekopdrachten in de VS",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Eind September",
    "socialPushWindow": "Eind Oktober",
    "peakTrafficWindow": "1 Nov - 28 Nov",
    "targetThemeSlugs": [
      "autumn-harvest-pumpkins",
      "cottagecore-rural-living"
    ],
    "topKeywords": {
      "nl": [
        "thanksgiving kleurplaat kalkoen",
        "herfst oogst kleurplaat"
      ],
      "en": [
        "thanksgiving coloring pages",
        "turkey coloring sheets free printable",
        "thanksgiving dinner coloring pages",
        "fall harvest"
      ],
      "de": [
        "thanksgiving ausmalbilder truthahn",
        "erntedankfest malvorlagen"
      ],
      "fr": [
        "coloriage thanksgiving dindon",
        "coloriage recolte automne"
      ]
    },
    "strategyAdviceNl": "Enorme piek in de Verenigde Staten! Kalkoenen, pelgrims, pompoentaarten en herfstoogst.",
    "strategyAdviceEn": "Giant USA traffic driver. Turkey coloring sheets, pumpkin pies, and gratitude activity mats.",
    "checklistItems": [
      "Kalkoen en herfst platen taggen met Thanksgiving",
      "Amerikaanse SEO beschrijvingen updaten"
    ]
  },
  {
    "id": "sinterklaas",
    "month": 11,
    "approxDate": "15 Nov - 5 Dec",
    "titleNl": "Sinterklaas & Pieten (NL & BE)",
    "titleEn": "Sinterklaas & Saint Nicholas (Dutch Holiday)",
    "titleDe": "Nikolaus & Nikolaustag (6 Dez)",
    "titleFr": "Saint-Nicolas (6 Déc)",
    "countries": [
      "NL",
      "BE",
      "DE",
      "FR"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "900.000+ zoekopdrachten in NL/BE/DE",
    "leadTimeWeeks": 6,
    "seoPushWindow": "Begin Oktober (6 wk voor intocht!)",
    "socialPushWindow": "Begin November",
    "peakTrafficWindow": "12 Nov - 5 Dec (Nederland) / 6 Dec (DE/FR/BE)",
    "targetThemeSlugs": [
      "sinterklaas-pieten",
      "sweet-treats-bakery-desserts"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat sinterklaas",
        "sinterklaas kleurplaat pieten",
        "schoenzetten kleurplaat",
        "stoomboot kleurplaat",
        "pakjesavond kleurplaat"
      ],
      "en": [
        "sinterklaas coloring pages",
        "saint nicholas printable"
      ],
      "de": [
        "nikolaus ausmalbilder",
        "nikolausstiefel malvorlage",
        "nikolaus zum ausdrucken"
      ],
      "fr": [
        "coloriage saint nicolas",
        "coloriage saint nicolas et son ane"
      ]
    },
    "strategyAdviceNl": "🎁 DE ABSOLUTE NUMMER 1 VOOR NEDERLAND & VLAANDEREN! Vanaf de intocht tot pakjesavond printen miljoenen gezinnen schoenzet-kleurplaten.",
    "strategyAdviceEn": "Top priority for Dutch, Belgian, German & French visitors in November and December.",
    "checklistItems": [
      "Check thema sinterklaas-pieten (238+ kleurplaten)",
      "Promoot Kleurplaat voor in de Schoen",
      "Zorg dat stoomboot en paard Ozosnel platen vooraan staan"
    ]
  },
  {
    "id": "christmas-winter",
    "month": 12,
    "approxDate": "25 Dec",
    "titleNl": "Kerstmis & Winter Wonderland",
    "titleEn": "Christmas & Winter Wonderland",
    "titleDe": "Weihnachten & Winterzauber",
    "titleFr": "Noël & Magie de l'Hiver",
    "countries": [
      "GLOBAL",
      "NL",
      "US",
      "UK",
      "DE",
      "FR",
      "BE"
    ],
    "trafficTier": "extreme",
    "searchVolumeEstimate": "3.000.000+ zoekopdrachten/mnd (WERELDWIJDE PIEK)",
    "leadTimeWeeks": 8,
    "seoPushWindow": "Medio Oktober (8 wk voor Kerst!)",
    "socialPushWindow": "Medio November",
    "peakTrafficWindow": "15 Nov - 25 Dec (piek 10-24 dec)",
    "targetThemeSlugs": [
      "christmas-winter-holidays",
      "cozy-winter-wonderland",
      "cozy-life-hygge"
    ],
    "topKeywords": {
      "nl": [
        "kleurplaat kerst",
        "kerstboom kleurplaat",
        "kerstman kleurplaat",
        "kerststal kleurplaat",
        "winter kleurplaat sneeuwpop"
      ],
      "en": [
        "christmas coloring pages",
        "santa claus coloring printable",
        "christmas tree coloring sheets",
        "gingerbread snowman printable"
      ],
      "de": [
        "weihnachten ausmalbilder",
        "weihnachtsmann malvorlagen",
        "tannenbaum ausmalen",
        "schneemann winter malvorlagen"
      ],
      "fr": [
        "coloriage noel",
        "coloriage pere noel",
        "coloriage sapin de noel",
        "coloriage bonhomme de neige imprimer"
      ]
    },
    "strategyAdviceNl": "🎄 WERELDWIJD DE ALLERGROOTSTE PIEK! Zorg dat de kerstboom, de Kerstman, rendieren en kerststallen optimaal vindbaar zijn.",
    "strategyAdviceEn": "🎄 BIGGEST GLOBAL TRAFFIC SURGE! Over 3 Million searches across Dec. High conversion for full PDF coloring books.",
    "checklistItems": [
      "Check thema christmas-winter-holidays (312+ pagina's)",
      "Check thema cozy-winter-wonderland (126+ pagina's)",
      "Start Pinterest borden Christmas Printable Coloring Pages in november",
      "Zet de Kerst homepage banner live per 1 december"
    ]
  }
];
