export interface DrawingStep {
  stepNumber: number;
  titleEn: string;
  titleNl: string;
  instructionEn: string;
  instructionNl: string;
  tipEn?: string;
  tipNl?: string;
}

export interface HowToDrawLesson {
  slug: string;
  category:'animals'|'fantasy'|'nature'|'vehicles'|'kids';
  difficulty:'easy'|'medium';
  timeMinutes: number;
  icon: string;
  titleEn: string;
  titleNl: string;
  descEn: string;
  descNl: string;
  relatedThemeSlug: string;
  relatedHubSlug: string;
  steps: DrawingStep[];
}

export const HOW_TO_DRAW_LESSONS: HowToDrawLesson[] = [
  {
    slug:'how-to-draw-a-dinosaur',
    category:'animals',
    difficulty:'easy',
    timeMinutes: 10,
    icon:'',
    titleEn:'How to Draw a T-Rex Dinosaur',
    titleNl:'Hoe Teken Je een T-Rex Dinosaurus',
    descEn:'Learn how to draw a friendly cartoon T-Rex dinosaur in 6 simple, easy-to-follow steps!',
    descNl:'Leer stap voor stap een stoere en vrolijke T-Rex dinosaurus tekenen in 6 simpele stappen!',
    relatedHubSlug:'animals-wildlife',
    relatedThemeSlug:'dinosaur-adventures',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: Head and Body Guidelines',
        titleNl:'Stap 1: Hoofd- en Lichaamsvormen',
        instructionEn:'Draw a large oval shape for the body and a rounded egg-like shape above it for the dinosaur head.',
        instructionNl:'Teken een grote ovale vorm voor het lichaam en een afgeronde ei-vorm erboven voor de dino-kop.',
        tipEn:'Draw with light pencil lines so you can easily erase them later.',
        tipNl:'Teken met lichte potloodlijnen zodat je ze later makkelijk kunt uitgummen.'},
      {
        stepNumber: 2,
        titleEn:'Step 2: Connecting Neck and Big Tail',
        titleNl:'Stap 2: Nek en de Grote Staart',
        instructionEn:'Connect the head to the body with two curved neck lines, and draw a long, tapering tail pointing upwards at the back.',
        instructionNl:'Verbind de kop met het lichaam met twee gebogen neklijnen en teken aan de achterkant een lange staart.',
        tipEn:'Make the tail wide at the base and sharp at the tip.',
        tipNl:'Maak de staart breed aan het begin en puntig aan het uiteinde.'},
      {
        stepNumber: 3,
        titleEn:'Step 3: Sturdy Legs and Feet',
        titleNl:'Stap 3: Stevige Poten en Voeten',
        instructionEn:'Draw two strong, muscular back legs with three rounded claws on each foot to keep your dino standing tall.',
        instructionNl:'Teken twee sterke achterpoten met aan elke voet drie afgeronde klauwtjes.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Cute Tiny Arms and Eye',
        titleNl:'Stap 4: Kleine Armpjes en het Oog',
        instructionEn:'Add the iconic tiny T-Rex arms on the chest with two little fingers each. Draw a big, cheerful circle for the eye with a white reflection dot.',
        instructionNl:'Teken de bekende kleine T-Rex armpjes op de borst met twee vingertjes. Maak een groot vrolijk oog met een glanspuntje.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Big Smile and Back Spikes',
        titleNl:'Stap 5: Grote Lach en Stekels',
        instructionEn:'Draw a happy smiling jawline with small zig-zag teeth. Along the back from head to tail, add small triangle spikes.',
        instructionNl:'Teken een vrolijke bek met kleine tandjes. Voeg langs de rug tot aan de staart kleine driehoekige stekeltjes toe.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Outline & Color!',
        titleNl:'Stap 6: Omlijnen & Inkleuren!',
        instructionEn:'Trace your final lines with a black marker, erase your pencil sketch, and color your dinosaur green, blue, or rainbow in our coloring studio!',
        instructionNl:'Trek de definitieve lijnen over met een zwarte stift, gum het potlood weg en kleur je dinosaurus groen, blauw of paars in!',
      }
    ]
  },
  {
    slug:'how-to-draw-a-unicorn',
    category:'fantasy',
    difficulty:'easy',
    timeMinutes: 12,
    icon:'',
    titleEn:'How to Draw a Magical Unicorn',
    titleNl:'Hoe Teken Je een Magische Eenhoorn',
    descEn:'Follow these 6 simple steps to draw a beautiful, majestic unicorn with a glowing spiral horn and flowing mane.',
    descNl:'Volg deze 6 simpele stappen om een prachtige eenhoorn met een magische hoorn en golvende manen te tekenen.',
    relatedHubSlug:'fantasy-fairytales',
    relatedThemeSlug:'unicorns-pegasus',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: Head and Muzzle',
        titleNl:'Stap 1: Hoofd en Snuit',
        instructionEn:'Draw a soft rounded muzzle that curves up into the forehead and cheek of the unicorn.',
        instructionNl:'Teken een zachte afgeronde snuit die omhoog buigt naar het voorhoofd en de wang van de eenhoorn.',
      },
      {
        stepNumber: 2,
        titleEn:'Step 2: The Magic Spiral Horn',
        titleNl:'Stap 2: De Magische Spiraal Hoorn',
        instructionEn:'Draw a long, pointy cone shape on the forehead. Add diagonal lines across it to make it look twisted and magical!',
        instructionNl:'Teken een lange puntige hoorn op het voorhoofd. Voeg schuine lijntjes toe voor een magisch spiraal-effect!',
      },
      {
        stepNumber: 3,
        titleEn:'Step 3: Gentle Eye and Ears',
        titleNl:'Stap 3: Vriendelijk Oog en Oortjes',
        instructionEn:'Draw two pointed horse ears next to the horn, and a large sparkling eye with cute long eyelashes.',
        instructionNl:'Teken twee spitse oortjes naast de hoorn en een groot glanzend oog met lange wimpers.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Flowing Rainbow Mane',
        titleNl:'Stap 4: Golvende Manen',
        instructionEn:'Draw wavy, ribbon-like hair locks cascading down the neck in lush layers.',
        instructionNl:'Teken golvende lokken haar die sierlijk langs de hals naar beneden vallen.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Slender Body and Hooves',
        titleNl:'Stap 5: Slank Lichaam en Hoefjes',
        instructionEn:'Draw the graceful back curve, four slender legs with small hooves, and a fluffy cloud-like tail.',
        instructionNl:'Teken de sierlijke rug, vier slanke beentjes met hoefjes en een weelderige staart.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Sparkling Details & Color',
        titleNl:'Stap 6: Glitters & Inkleuren',
        instructionEn:'Add little stars around your unicorn and color with pastel pinks, purples, blues, and gold!',
        instructionNl:'Teken kleine fonkelende sterretjes om je eenhoorn heen en kleur hem in met pastelroze, paars en goud!',
      }
    ]
  },
  {
    slug:'how-to-draw-a-puppy',
    category:'animals',
    difficulty:'easy',
    timeMinutes: 8,
    icon:'',
    titleEn:'How to Draw a Cute Puppy',
    titleNl:'Hoe Teken Je een Schattig Hondje',
    descEn:'A fun and easy drawing guide to sketch an adorable puppy with floppy ears and a wagging tail.',
    descNl:'Een leuke en makkelijke tekengids om een schattig puppyhondje met flaporen en een kwispelstaart te tekenen.',
    relatedHubSlug:'animals-wildlife',
    relatedThemeSlug:'cute-pets-animals',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: Circle Head and Floppy Ears',
        titleNl:'Stap 1: Rond Hoofdje en Flaporen',
        instructionEn:'Start with a round circle for the head, then add two teardrop-shaped floppy ears on both sides.',
        instructionNl:'Begin met een ronde cirkel voor het hoofd en teken twee hangende druppelvormige flaporen aan de zijkanten.',
      },
      {
        stepNumber: 2,
        titleEn:'Step 2: Big Button Nose and Smile',
        titleNl:'Stap 2: Grote Neusdop en Lach',
        instructionEn:'In the center of the face, draw a shiny round nose, an anchor-shaped smile, and a cute little tongue sticking out.',
        instructionNl:'Teken in het midden een glanzend zwart neusje, een anker-vormige lach en een klein uitstekend tongetje.',
      },
      {
        stepNumber: 3,
        titleEn:'Step 3: Big Puppy Eyes',
        titleNl:'Stap 3: Grote Puppy-ogen',
        instructionEn:'Draw two large dark circles with two white highlight circles inside each eye for that irresistible puppy look.',
        instructionNl:'Teken twee grote donkere ogen met twee witte glanscirkels voor die onweerstaanbare puppy-blik.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Sitting Body and Front Paws',
        titleNl:'Stap 4: Zittend Lichaampje en Voorpootjes',
        instructionEn:'Draw the body sitting down with two straight front legs and rounded paws with three toe lines.',
        instructionNl:'Teken het zittende lijfje met twee rechte voorpootjes en afgeronde kussentjes met teentjes.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Back Legs and Wagging Tail',
        titleNl:'Stap 5: Achterpootjes en Kwispelstaart',
        instructionEn:'Add the curved sitting hind legs on the sides and a perky tail wagging happily in the air.',
        instructionNl:'Voeg de gebogen zittende achterpoten toe en een vrolijk omhoogstaand kwispelstaartje.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Spots and Color',
        titleNl:'Stap 6: Vlekjes & Inkleuren',
        instructionEn:'Add an eye patch or spots on the back, ink with a pen, and color in warm golden brown or dalmatian spots!',
        instructionNl:'Geef je hondje een oogvlek of stippen op de rug en kleur hem warm bruin, beige of als een dalmatiër in!',
      }
    ]
  },
  {
    slug:'how-to-draw-a-kitty-cat',
    category:'animals',
    difficulty:'easy',
    timeMinutes: 8,
    icon:'',
    titleEn:'How to Draw a Cute Kitty Cat',
    titleNl:'Hoe Teken Je een Lieve Poes',
    descEn:'Learn how to draw a sweet, purring kitten with triangle ears, whiskers, and big shiny eyes.',
    descNl:'Leer stap voor stap een schattig katje tekenen met spitse oortjes, snorharen en grote glanzende oogjes.',
    relatedHubSlug:'animals-wildlife',
    relatedThemeSlug:'cute-pets-animals',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: Head & Triangle Ears',
        titleNl:'Stap 1: Hoofdje & Driehoekige Oortjes',
        instructionEn:'Draw a slightly squished circle for the head and two pointy triangle ears on top.',
        instructionNl:'Teken een licht afgeplat rondje voor het hoofdje met twee spitse driehoekige oortjes erbovenop.',
      },
      {
        stepNumber: 2,
        titleEn:'Step 2: Sweet Cat Face',
        titleNl:'Stap 2: Lief Kattengezichtje',
        instructionEn:'Draw a small triangle nose, a"w"-shaped smiling mouth, and 3 long whiskers on each cheek.',
        instructionNl:'Teken een klein driehoekig neusje, een"w"-vormig mondje en aan elke kant 3 lange snorharen.',
      },
      {
        stepNumber: 3,
        titleEn:'Step 3: Almond Eyes',
        titleNl:'Stap 3: Grote Kattenogen',
        instructionEn:'Draw two big sparkling almond eyes with vertical cat pupils and shiny white highlights.',
        instructionNl:'Teken twee grote amandelvormige ogen met een verticale pupil en glanspuntjes.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Curved Body & Paws',
        titleNl:'Stap 4: Zittend Lichaam & Pootjes',
        instructionEn:'Draw the curved chest and two neat little front paws tucked together in front.',
        instructionNl:'Teken het zachte borstje en twee nette voorpootjes die netjes naast elkaar staan.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Curved Tail',
        titleNl:'Stap 5: Sierlijke Kattenstaart',
        instructionEn:'Draw a smooth, elegant S-curved tail wrapping around the kitten’s side.',
        instructionNl:'Teken een sierlijke, gebogen staart die gezellig om het lijfje heen krult.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Stripes & Color',
        titleNl:'Stap 6: Streepjes & Inkleuren',
        instructionEn:'Add tiger stripes or calico patches, and color with soft orange, grey, or black and white!',
        instructionNl:'Voeg cypers-streepjes of vlekjes toe en kleur je katje oranje, grijs, wit of zwart in!',
      }
    ]
  },
  {
    slug:'how-to-draw-a-butterfly',
    category:'nature',
    difficulty:'easy',
    timeMinutes: 10,
    icon:'🦋',
    titleEn:'How to Draw a Beautiful Butterfly',
    titleNl:'Hoe Teken Je een Prachtige Vlinder',
    descEn:'Create symmetrical, ornate butterfly wings with simple geometric curves and beautiful patterns.',
    descNl:'Teken een symmetrische, sierlijke vlinder met prachtige vleugelpatronen en voelsprieten.',
    relatedHubSlug:'animals-wildlife',
    relatedThemeSlug:'insects-bugs',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: The Slender Body',
        titleNl:'Stap 1: Het Slanke Lijfje',
        instructionEn:'Draw a small circle for the head and a long slender oval below it for the butterfly body.',
        instructionNl:'Teken een klein rondje voor het kopje en een langwerpig ovaal lijfje eronder.',
      },
      {
        stepNumber: 2,
        titleEn:'Step 2: Top Wings',
        titleNl:'Stap 2: De Bovenste Vleugels',
        instructionEn:'Draw two large, sweeping heart-shaped curves expanding outward from the shoulders.',
        instructionNl:'Teken twee grote, zwierige vleugelbogen die vanuit de schouders naar buiten waaieren.',
      },
      {
        stepNumber: 3,
        titleEn:'Step 3: Bottom Wings',
        titleNl:'Stap 3: De Onderste Vleugels',
        instructionEn:'Draw two slightly smaller teardrop-shaped lower wings beneath the top wings.',
        instructionNl:'Teken twee iets kleinere, ronde ondervleugels direct onder de bovenste vleugels.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Antennae & Eyes',
        titleNl:'Stap 4: Voelsprieten & Oogjes',
        instructionEn:'Add two graceful curved antennae on top of the head with small spiral tips.',
        instructionNl:'Voeg twee sierlijke gekrulde voelsprieten toe op het kopje met kleine krulletjes.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Wing Patterns & Spots',
        titleNl:'Stap 5: Vleugelpatronen & Cirkels',
        instructionEn:'Draw circles, teardrops, and stained-glass veins inside the wings for vibrant detail.',
        instructionNl:'Teken cirkels, druppelvormen en adertjes binnenin de vleugels voor een betoverend patroon.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Rainbow Color Explosion',
        titleNl:'Stap 6: Regenboog Inkleuren',
        instructionEn:'Color with brilliant turquoise, magenta, yellow, and deep purple gradients!',
        instructionNl:'Kleur je vlinder in met fel turquoise, roze, goudgeel en diep paars!',
      }
    ]
  },
  {
    slug:'how-to-draw-a-space-rocket',
    category:'vehicles',
    difficulty:'easy',
    timeMinutes: 10,
    icon:'',
    titleEn:'How to Draw a Space Rocket',
    titleNl:'Hoe Teken Je een Ruimteschip',
    descEn:'Blast off into space by drawing a cool rocket ship with flame thrusters and astronaut windows!',
    descNl:'Vlieg de ruimte in door een stoere raket te tekenen met vlammen en een rond astronautenraam!',
    relatedHubSlug:'vehicles-transportation',
    relatedThemeSlug:'spacecraft-rockets',
    steps: [
      {
        stepNumber: 1,
        titleEn:'Step 1: The Fuselage Cone',
        titleNl:'Stap 1: De Raketromp',
        instructionEn:'Draw a tall bullet-shaped curve that comes to a sharp point at the top nosecone.',
        instructionNl:'Teken een lange kogelvormige romp die bovenaan eindigt in een spitse neus.',
      },
      {
        stepNumber: 2,
        titleEn:'Step 2: Porthole Window',
        titleNl:'Stap 2: Rond Patrijspoort Raam',
        instructionEn:'Draw a large double-circle in the upper center of the rocket for the astronaut viewing window.',
        instructionNl:'Teken een grote dubbele cirkel in het midden van de raket voor het astronautenraam.',
      },
      {
        stepNumber: 3,
        titleEn:'Step 3: Rocket Fins',
        titleNl:'Stap 3: Vleugels & Vinnen',
        instructionEn:'Add two sharp aerodynamic booster fins on the left and right sides of the base, and one in the center.',
        instructionNl:'Teken twee scherpe vleugelvinnen aan de zijkanten van de raket en een vin in het midden.',
      },
      {
        stepNumber: 4,
        titleEn:'Step 4: Exhaust Engine Nozzle',
        titleNl:'Stap 4: Uitlaat & Motor',
        instructionEn:'Draw a trapezoid exhaust cone attached to the bottom of the fuselage.',
        instructionNl:'Teken de motoruitlaat aan de onderkant van de raketromp.',
      },
      {
        stepNumber: 5,
        titleEn:'Step 5: Blazing Rocket Flames',
        titleNl:'Stap 5: Vlammenzee',
        instructionEn:'Draw dynamic zig-zag fire and smoke clouds bursting out from the engine.',
        instructionNl:'Teken felle puntige vlammen en rookwolken die onderuit de motor schieten.',
      },
      {
        stepNumber: 6,
        titleEn:'Step 6: Stars and Planets',
        titleNl:'Stap 6: Sterren & Planeten',
        instructionEn:'Add planets, twinkling stars, and color your rocket shiny silver, bright red, and neon orange!',
        instructionNl:'Teken planeten en sterren om je raket heen en kleur hem in met zilver, vlammend rood en oranje!',
      }
    ]
  }
];

export function getHowToDrawLessons(lang: string) {
  return HOW_TO_DRAW_LESSONS;
}

export function getLessonBySlug(slug: string) {
  return HOW_TO_DRAW_LESSONS.find(l => l.slug === slug);
}