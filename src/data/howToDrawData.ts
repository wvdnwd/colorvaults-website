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
  category: 'animals' | 'fantasy' | 'nature' | 'vehicles' | 'kids';
  difficulty: 'easy' | 'medium';
  timeMinutes: number;
  icon: string;
  titleEn: string;
  titleNl: string;
  descEn: string;
  descNl: string;
  relatedThemeSlug: string;
  relatedHubSlug: string;
  image?: string;
  coloringPageSlug?: string;
  coloringPageUrl?: string;
  steps: DrawingStep[];
}

export const HOW_TO_DRAW_LESSONS: HowToDrawLesson[] = [
  {
    "slug": "how-to-draw-a-dinosaur",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦖",
    "titleEn": "How to Draw a T-Rex Dinosaur",
    "titleNl": "Hoe Teken Je een T-Rex Dinosaurus",
    "descEn": "Learn how to draw a fun, easy t-rex dinosaur step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke t-rex dinosaurus tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "dinosaur-adventures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for T-Rex Dinosaur",
        "titleNl": "Stap 1: Basisvormen voor T-Rex Dinosaurus",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your t-rex dinosaur.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je t-rex dinosaurus.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your t-rex dinosaur its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je t-rex dinosaurus te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dinosaur%20Adventures/A_Friendly_Spiky_Dinosaur_1788433082694.webp",
    "coloringPageSlug": "dinosaur-adventures-1",
    "coloringPageUrl": "/en/animals-wildlife/dinosaur-adventures/kids/dinosaur-adventures-1"
  },
  {
    "slug": "how-to-draw-a-triceratops",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦕",
    "titleEn": "How to Draw a Triceratops Dinosaur",
    "titleNl": "Hoe Teken Je een Triceratops Dinosaurus",
    "descEn": "Learn how to draw a fun, easy triceratops dinosaur step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke triceratops dinosaurus tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "dinosaur-adventures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Triceratops Dinosaur",
        "titleNl": "Stap 1: Basisvormen voor Triceratops Dinosaurus",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your triceratops dinosaur.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je triceratops dinosaurus.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your triceratops dinosaur its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je triceratops dinosaurus te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dinosaur%20Adventures/Cartoon_Alligator_Dinosaur_1787903491461.webp",
    "coloringPageSlug": "dinosaur-adventures-2",
    "coloringPageUrl": "/en/animals-wildlife/dinosaur-adventures/teens/dinosaur-adventures-2"
  },
  {
    "slug": "how-to-draw-a-brachiosaurus",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦕",
    "titleEn": "How to Draw a Brachiosaurus Longneck",
    "titleNl": "Hoe Teken Je een Brachiosaurus Langnek",
    "descEn": "Learn how to draw a fun, easy brachiosaurus longneck step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke brachiosaurus langnek tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "dinosaur-adventures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Brachiosaurus Longneck",
        "titleNl": "Stap 1: Basisvormen voor Brachiosaurus Langnek",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your brachiosaurus longneck.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je brachiosaurus langnek.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your brachiosaurus longneck its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je brachiosaurus langnek te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dinosaur%20Adventures/Cartoon_Character_Rides_Dinosaur_1787914182842.webp",
    "coloringPageSlug": "dinosaur-adventures-3",
    "coloringPageUrl": "/en/animals-wildlife/dinosaur-adventures/toddlers/dinosaur-adventures-3"
  },
  {
    "slug": "how-to-draw-a-stegosaurus",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦖",
    "titleEn": "How to Draw a Stegosaurus",
    "titleNl": "Hoe Teken Je een Stegosaurus",
    "descEn": "Learn how to draw a fun, easy stegosaurus step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke stegosaurus tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "dinosaur-adventures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Stegosaurus",
        "titleNl": "Stap 1: Basisvormen voor Stegosaurus",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your stegosaurus.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je stegosaurus.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your stegosaurus its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je stegosaurus te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dinosaur%20Adventures/Cartoon_Dinosaur_1787912134785.webp",
    "coloringPageSlug": "dinosaur-adventures-4",
    "coloringPageUrl": "/en/animals-wildlife/dinosaur-adventures/kids/dinosaur-adventures-4"
  },
  {
    "slug": "how-to-draw-a-pterodactyl",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦅",
    "titleEn": "How to Draw a Pterodactyl Flying Dino",
    "titleNl": "Hoe Teken Je een Pterodactylus Vliegdino",
    "descEn": "Learn how to draw a fun, easy pterodactyl flying dino step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke pterodactylus vliegdino tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "dinosaur-adventures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Pterodactyl Flying Dino",
        "titleNl": "Stap 1: Basisvormen voor Pterodactylus Vliegdino",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your pterodactyl flying dino.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je pterodactylus vliegdino.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your pterodactyl flying dino its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je pterodactylus vliegdino te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dinosaur%20Adventures/Cartoon_Dinosaur_Adventure_1787912454417.webp",
    "coloringPageSlug": "dinosaur-adventures-5",
    "coloringPageUrl": "/en/animals-wildlife/dinosaur-adventures/teens/dinosaur-adventures-5"
  },
  {
    "slug": "how-to-draw-a-puppy",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🐶",
    "titleEn": "How to Draw a Cute Puppy Dog",
    "titleNl": "Hoe Teken Je een Schattige Puppy Hond",
    "descEn": "Learn how to draw a fun, easy cute puppy dog step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke schattige puppy hond tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "cute-pets-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Cute Puppy Dog",
        "titleNl": "Stap 1: Basisvormen voor Schattige Puppy Hond",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your cute puppy dog.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je schattige puppy hond.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your cute puppy dog its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je schattige puppy hond te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Ancient%20Mythology/Athena_with_owl_or_Goddess_Athena_holding_a_shield_1788270214760.webp",
    "coloringPageSlug": "birds-of-the-world-6",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-6"
  },
  {
    "slug": "how-to-draw-a-kitten",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🐱",
    "titleEn": "How to Draw a Playful Kitten",
    "titleNl": "Hoe Teken Je een Speels Katje",
    "descEn": "Learn how to draw a fun, easy playful kitten step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke speels katje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "cute-pets-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Playful Kitten",
        "titleNl": "Stap 1: Basisvormen voor Speels Katje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your playful kitten.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je speels katje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your playful kitten its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je speels katje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bald_Eagle_Flight_1788438810635.webp",
    "coloringPageSlug": "birds-of-the-world-7",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/toddlers/birds-of-the-world-7"
  },
  {
    "slug": "how-to-draw-a-bunny",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🐰",
    "titleEn": "How to Draw a Fluffy Bunny Rabbit",
    "titleNl": "Hoe Teken Je een Pluizig Konijntje",
    "descEn": "Learn how to draw a fun, easy fluffy bunny rabbit step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke pluizig konijntje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "cute-pets-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Fluffy Bunny Rabbit",
        "titleNl": "Stap 1: Basisvormen voor Pluizig Konijntje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your fluffy bunny rabbit.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je pluizig konijntje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your fluffy bunny rabbit its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je pluizig konijntje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds/Bald_Eagle_in_Flight.webp",
    "coloringPageSlug": "birds-of-the-world-8",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/toddlers/birds-of-the-world-8"
  },
  {
    "slug": "how-to-draw-a-lion",
    "category": "animals",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🦁",
    "titleEn": "How to Draw a Majestic Lion King",
    "titleNl": "Hoe Teken Je een Koninklijke Leeuw",
    "descEn": "Learn how to draw a fun, easy majestic lion king step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke koninklijke leeuw tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "safari-jungle",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Majestic Lion King",
        "titleNl": "Stap 1: Basisvormen voor Koninklijke Leeuw",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your majestic lion king.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je koninklijke leeuw.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your majestic lion king its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je koninklijke leeuw te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds/Bald_Eagle_in_flight_1.webp",
    "coloringPageSlug": "birds-of-the-world-9",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-9"
  },
  {
    "slug": "how-to-draw-an-elephant",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐘",
    "titleEn": "How to Draw a Baby Elephant",
    "titleNl": "Hoe Teken Je een Baby Olifantje",
    "descEn": "Learn how to draw a fun, easy baby elephant step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke baby olifantje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "safari-jungle",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Baby Elephant",
        "titleNl": "Stap 1: Basisvormen voor Baby Olifantje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your baby elephant.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je baby olifantje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your baby elephant its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je baby olifantje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bald_Eagle_in_flight_1788438558681.webp",
    "coloringPageSlug": "birds-of-the-world-10",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-10"
  },
  {
    "slug": "how-to-draw-a-giraffe",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦒",
    "titleEn": "How to Draw a Tall Giraffe",
    "titleNl": "Hoe Teken Je een Lange Giraf",
    "descEn": "Learn how to draw a fun, easy tall giraffe step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke lange giraf tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "safari-jungle",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Tall Giraffe",
        "titleNl": "Stap 1: Basisvormen voor Lange Giraf",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your tall giraffe.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je lange giraf.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your tall giraffe its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je lange giraf te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds/Bears_Garden_1788559958256.webp",
    "coloringPageSlug": "birds-of-the-world-11",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-11"
  },
  {
    "slug": "how-to-draw-a-panda",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐼",
    "titleEn": "How to Draw a Giant Panda Bear",
    "titleNl": "Hoe Teken Je een Reuze Pandabeer",
    "descEn": "Learn how to draw a fun, easy giant panda bear step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke reuze pandabeer tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "cute-pets-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Giant Panda Bear",
        "titleNl": "Stap 1: Basisvormen voor Reuze Pandabeer",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your giant panda bear.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je reuze pandabeer.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your giant panda bear its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je reuze pandabeer te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird-Like_Creature_Landing_1787900907865.webp",
    "coloringPageSlug": "birds-of-the-world-12",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-12"
  },
  {
    "slug": "how-to-draw-a-dolphin",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐬",
    "titleEn": "How to Draw a Leaping Dolphin",
    "titleNl": "Hoe Teken Je een Springende Dolfijn",
    "descEn": "Learn how to draw a fun, easy leaping dolphin step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke springende dolfijn tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "ocean-sea-creatures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Leaping Dolphin",
        "titleNl": "Stap 1: Basisvormen voor Springende Dolfijn",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your leaping dolphin.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je springende dolfijn.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your leaping dolphin its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je springende dolfijn te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird-headed_Character_Drinks_Tea_With_Female_Artist_1788369193193.webp",
    "coloringPageSlug": "birds-of-the-world-13",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/toddlers/birds-of-the-world-13"
  },
  {
    "slug": "how-to-draw-a-sea-turtle",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐢",
    "titleEn": "How to Draw a Sea Turtle",
    "titleNl": "Hoe Teken Je een Zeeschildpad",
    "descEn": "Learn how to draw a fun, easy sea turtle step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke zeeschildpad tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "ocean-sea-creatures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sea Turtle",
        "titleNl": "Stap 1: Basisvormen voor Zeeschildpad",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sea turtle.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je zeeschildpad.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sea turtle its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je zeeschildpad te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird_in_Nature_1788441894503.webp",
    "coloringPageSlug": "birds-of-the-world-14",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/toddlers/birds-of-the-world-14"
  },
  {
    "slug": "how-to-draw-a-shark",
    "category": "animals",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🦈",
    "titleEn": "How to Draw a Great White Shark",
    "titleNl": "Hoe Teken Je een Witte Haai",
    "descEn": "Learn how to draw a fun, easy great white shark step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke witte haai tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "ocean-sea-creatures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Great White Shark",
        "titleNl": "Stap 1: Basisvormen voor Witte Haai",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your great white shark.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je witte haai.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your great white shark its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je witte haai te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird_in_flight_above_a_picnic_1788438576629.webp",
    "coloringPageSlug": "birds-of-the-world-15",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-15"
  },
  {
    "slug": "how-to-draw-an-owl",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦉",
    "titleEn": "How to Draw a Wise Forest Owl",
    "titleNl": "Hoe Teken Je een Wijze Bosuil",
    "descEn": "Learn how to draw a fun, easy wise forest owl step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke wijze bosuil tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "birds-insects",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Wise Forest Owl",
        "titleNl": "Stap 1: Basisvormen voor Wijze Bosuil",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your wise forest owl.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je wijze bosuil.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your wise forest owl its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je wijze bosuil te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird_in_flight_above_nature_scene_1788434055448.webp",
    "coloringPageSlug": "birds-of-the-world-16",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-16"
  },
  {
    "slug": "how-to-draw-a-fox",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦊",
    "titleEn": "How to Draw a Clever Red Fox",
    "titleNl": "Hoe Teken Je een Slimme Rode Vos",
    "descEn": "Learn how to draw a fun, easy clever red fox step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke slimme rode vos tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "forest-woodland",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Clever Red Fox",
        "titleNl": "Stap 1: Basisvormen voor Slimme Rode Vos",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your clever red fox.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je slimme rode vos.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your clever red fox its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je slimme rode vos te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Bird_in_flight_over_serene_lake_scene_1788438486851.webp",
    "coloringPageSlug": "birds-of-the-world-17",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-17"
  },
  {
    "slug": "how-to-draw-a-bear",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐻",
    "titleEn": "How to Draw a Grizzly Bear",
    "titleNl": "Hoe Teken Je een Grizzlybeer",
    "descEn": "Learn how to draw a fun, easy grizzly bear step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke grizzlybeer tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "forest-woodland",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Grizzly Bear",
        "titleNl": "Stap 1: Basisvormen voor Grizzlybeer",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your grizzly bear.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je grizzlybeer.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your grizzly bear its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je grizzlybeer te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Blippi_the_Bird_1787912939769.webp",
    "coloringPageSlug": "birds-of-the-world-18",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-18"
  },
  {
    "slug": "how-to-draw-a-frog",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🐸",
    "titleEn": "How to Draw a Jumping Frog",
    "titleNl": "Hoe Teken Je een Springende Kikker",
    "descEn": "Learn how to draw a fun, easy jumping frog step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke springende kikker tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "forest-woodland",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Jumping Frog",
        "titleNl": "Stap 1: Basisvormen voor Springende Kikker",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your jumping frog.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je springende kikker.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your jumping frog its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je springende kikker te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Cartoon_Bird_1787902999551.webp",
    "coloringPageSlug": "birds-of-the-world-19",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-19"
  },
  {
    "slug": "how-to-draw-a-horse",
    "category": "animals",
    "difficulty": "medium",
    "timeMinutes": 15,
    "icon": "🐴",
    "titleEn": "How to Draw a Galloping Horse",
    "titleNl": "Hoe Teken Je een Galopperend Paard",
    "descEn": "Learn how to draw a fun, easy galloping horse step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke galopperend paard tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "farm-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Galloping Horse",
        "titleNl": "Stap 1: Basisvormen voor Galopperend Paard",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your galloping horse.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je galopperend paard.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your galloping horse its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je galopperend paard te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Farm%20Animals/Coloring_Sheep_Family_1788440926447.webp",
    "coloringPageSlug": "farm-animals-20",
    "coloringPageUrl": "/en/animals-wildlife/farm-animals/toddlers/farm-animals-20"
  },
  {
    "slug": "how-to-draw-a-koala",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🐨",
    "titleEn": "How to Draw a Sweet Koala",
    "titleNl": "Hoe Teken Je een Lieve Koala",
    "descEn": "Learn how to draw a fun, easy sweet koala step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke lieve koala tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "cute-pets-animals",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sweet Koala",
        "titleNl": "Stap 1: Basisvormen voor Lieve Koala",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sweet koala.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je lieve koala.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sweet koala its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je lieve koala te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Cartoon_Bird_with_Plant_1787926462721.webp",
    "coloringPageSlug": "birds-of-the-world-21",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-21"
  },
  {
    "slug": "how-to-draw-a-kangaroo",
    "category": "animals",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🦘",
    "titleEn": "How to Draw a Kangaroo with Joey",
    "titleNl": "Hoe Teken Je een Kangoeroe met Baby",
    "descEn": "Learn how to draw a fun, easy kangaroo with joey step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke kangoeroe met baby tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "safari-jungle",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Kangaroo with Joey",
        "titleNl": "Stap 1: Basisvormen voor Kangoeroe met Baby",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your kangaroo with joey.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je kangoeroe met baby.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your kangaroo with joey its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je kangoeroe met baby te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Celestial_Woman_with_Peacock_Feathers_1788283696862.webp",
    "coloringPageSlug": "birds-of-the-world-22",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-22"
  },
  {
    "slug": "how-to-draw-a-penguin",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🐧",
    "titleEn": "How to Draw a Emperor Penguin",
    "titleNl": "Hoe Teken Je een Keizerspinguïn",
    "descEn": "Learn how to draw a fun, easy emperor penguin step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke keizerspinguïn tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "ocean-sea-creatures",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Emperor Penguin",
        "titleNl": "Stap 1: Basisvormen voor Keizerspinguïn",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your emperor penguin.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je keizerspinguïn.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your emperor penguin its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je keizerspinguïn te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Celtic_Cross_and_Owl_Coloring_Page_1787899190306.webp",
    "coloringPageSlug": "birds-of-the-world-23",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/toddlers/birds-of-the-world-23"
  },
  {
    "slug": "how-to-draw-a-toucan",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🦜",
    "titleEn": "How to Draw a Tropical Toucan",
    "titleNl": "Hoe Teken Je een Tropische Toekan",
    "descEn": "Learn how to draw a fun, easy tropical toucan step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke tropische toekan tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "birds-insects",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Tropical Toucan",
        "titleNl": "Stap 1: Basisvormen voor Tropische Toekan",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your tropical toucan.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je tropische toekan.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your tropical toucan its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je tropische toekan te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds%20Of%20The%20World/Character_in_nature_with_a_bird_companion_1788368079409.webp",
    "coloringPageSlug": "birds-of-the-world-24",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/teens/birds-of-the-world-24"
  },
  {
    "slug": "how-to-draw-a-hedgehog",
    "category": "animals",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🦔",
    "titleEn": "How to Draw a Cute Hedgehog",
    "titleNl": "Hoe Teken Je een Schattig Egeltje",
    "descEn": "Learn how to draw a fun, easy cute hedgehog step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke schattig egeltje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "animals-wildlife",
    "relatedThemeSlug": "forest-woodland",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Cute Hedgehog",
        "titleNl": "Stap 1: Basisvormen voor Schattig Egeltje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your cute hedgehog.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je schattig egeltje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your cute hedgehog its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je schattig egeltje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Birds/Colorful_birds_by_an_egg-shaped_plant_1788559949249.webp",
    "coloringPageSlug": "birds-of-the-world-25",
    "coloringPageUrl": "/en/animals-wildlife/birds-of-the-world/kids/birds-of-the-world-25"
  },
  {
    "slug": "how-to-draw-a-unicorn",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 12,
    "icon": "🦄",
    "titleEn": "How to Draw a Magical Unicorn",
    "titleNl": "Hoe Teken Je een Magische Eenhoorn",
    "descEn": "Learn how to draw a fun, easy magical unicorn step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke magische eenhoorn tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "unicorns-pegasus",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Magical Unicorn",
        "titleNl": "Stap 1: Basisvormen voor Magische Eenhoorn",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your magical unicorn.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je magische eenhoorn.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your magical unicorn its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je magische eenhoorn te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Unicorns%20%26%20Pegasus/Unicorns___Pegasus__A_clean_printable_co_1788447944112.webp",
    "coloringPageSlug": "unicorns-pegasus-26",
    "coloringPageUrl": "/en/fantasy-fairytales/unicorns-pegasus/toddlers/unicorns-pegasus-26"
  },
  {
    "slug": "how-to-draw-a-dragon",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🐉",
    "titleEn": "How to Draw a Friendly Fire Dragon",
    "titleNl": "Hoe Teken Je een Vriendelijke Vuurspuwende Draak",
    "descEn": "Learn how to draw a fun, easy friendly fire dragon step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vriendelijke vuurspuwende draak tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "dragons-mythical",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Friendly Fire Dragon",
        "titleNl": "Stap 1: Basisvormen voor Vriendelijke Vuurspuwende Draak",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your friendly fire dragon.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vriendelijke vuurspuwende draak.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your friendly fire dragon its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vriendelijke vuurspuwende draak te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dragons/Dragons__A_clean_printable_coloring_page_1788447014944.webp",
    "coloringPageSlug": "dragons-27",
    "coloringPageUrl": "/en/fantasy-fairytales/dragons/teens/dragons-27"
  },
  {
    "slug": "how-to-draw-a-mermaid",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🧜‍♀️",
    "titleEn": "How to Draw a Mermaid Princess",
    "titleNl": "Hoe Teken Je een Zeemeermin Prinses",
    "descEn": "Learn how to draw a fun, easy mermaid princess step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke zeemeermin prinses tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Mermaid Princess",
        "titleNl": "Stap 1: Basisvormen voor Zeemeermin Prinses",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your mermaid princess.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je zeemeermin prinses.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your mermaid princess its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je zeemeermin prinses te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454733282.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-28",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/kids/fairytale-kingdoms-castles-28"
  },
  {
    "slug": "how-to-draw-a-fairy",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🧚‍♀️",
    "titleEn": "How to Draw a Winged Garden Fairy",
    "titleNl": "Hoe Teken Je een Gevleugelde Tuinfee",
    "descEn": "Learn how to draw a fun, easy winged garden fairy step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gevleugelde tuinfee tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Winged Garden Fairy",
        "titleNl": "Stap 1: Basisvormen voor Gevleugelde Tuinfee",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your winged garden fairy.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gevleugelde tuinfee.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your winged garden fairy its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gevleugelde tuinfee te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454742518.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-29",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/teens/fairytale-kingdoms-castles-29"
  },
  {
    "slug": "how-to-draw-a-castle",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 15,
    "icon": "🏰",
    "titleEn": "How to Draw a Medieval Fairytale Castle",
    "titleNl": "Hoe Teken Je een Middeleeuws Sprookjeskasteel",
    "descEn": "Learn how to draw a fun, easy medieval fairytale castle step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke middeleeuws sprookjeskasteel tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Medieval Fairytale Castle",
        "titleNl": "Stap 1: Basisvormen voor Middeleeuws Sprookjeskasteel",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your medieval fairytale castle.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je middeleeuws sprookjeskasteel.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your medieval fairytale castle its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je middeleeuws sprookjeskasteel te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454751534.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-30",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/toddlers/fairytale-kingdoms-castles-30"
  },
  {
    "slug": "how-to-draw-a-pirate",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🏴‍☠️",
    "titleEn": "How to Draw a Pirate Captain",
    "titleNl": "Hoe Teken Je een Stoere Piratenkapitein",
    "descEn": "Learn how to draw a fun, easy pirate captain step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke stoere piratenkapitein tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Pirate Captain",
        "titleNl": "Stap 1: Basisvormen voor Stoere Piratenkapitein",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your pirate captain.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je stoere piratenkapitein.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your pirate captain its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je stoere piratenkapitein te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454760781.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-31",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/kids/fairytale-kingdoms-castles-31"
  },
  {
    "slug": "how-to-draw-a-pirate-ship",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 15,
    "icon": "⛵",
    "titleEn": "How to Draw a Pirate Galleon Ship",
    "titleNl": "Hoe Teken Je een Piratenschip op Zee",
    "descEn": "Learn how to draw a fun, easy pirate galleon ship step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke piratenschip op zee tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Pirate Galleon Ship",
        "titleNl": "Stap 1: Basisvormen voor Piratenschip op Zee",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your pirate galleon ship.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je piratenschip op zee.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your pirate galleon ship its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je piratenschip op zee te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454770029.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-32",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/teens/fairytale-kingdoms-castles-32"
  },
  {
    "slug": "how-to-draw-a-treasure-chest",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "💎",
    "titleEn": "How to Draw a Treasure Chest",
    "titleNl": "Hoe Teken Je een Gouden Schatkist",
    "descEn": "Learn how to draw a fun, easy treasure chest step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gouden schatkist tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Treasure Chest",
        "titleNl": "Stap 1: Basisvormen voor Gouden Schatkist",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your treasure chest.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gouden schatkist.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your treasure chest its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gouden schatkist te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454779302.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-33",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/toddlers/fairytale-kingdoms-castles-33"
  },
  {
    "slug": "how-to-draw-an-astronaut",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "👨‍🚀",
    "titleEn": "How to Draw a Space Astronaut",
    "titleNl": "Hoe Teken Je een Ruimte Astronaut",
    "descEn": "Learn how to draw a fun, easy space astronaut step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke ruimte astronaut tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "space-rockets",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Space Astronaut",
        "titleNl": "Stap 1: Basisvormen voor Ruimte Astronaut",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your space astronaut.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je ruimte astronaut.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your space astronaut its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je ruimte astronaut te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Coloring_Page_of_a_Construction_Vehicle_1786140629650.webp",
    "coloringPageSlug": "construction-heavy-vehicles-34",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-34"
  },
  {
    "slug": "how-to-draw-an-alien-ufo",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🛸",
    "titleEn": "How to Draw a Cute Alien & Flying Saucer",
    "titleNl": "Hoe Teken Je een Schattige Alien & Vliegende Schotel",
    "descEn": "Learn how to draw a fun, easy cute alien & flying saucer step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke schattige alien & vliegende schotel tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "space-rockets",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Cute Alien & Flying Saucer",
        "titleNl": "Stap 1: Basisvormen voor Schattige Alien & Vliegende Schotel",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your cute alien & flying saucer.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je schattige alien & vliegende schotel.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your cute alien & flying saucer its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je schattige alien & vliegende schotel te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Coloring_Page_of_a_Construction_Vehicle_1786140641722.webp",
    "coloringPageSlug": "construction-heavy-vehicles-35",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-35"
  },
  {
    "slug": "how-to-draw-a-wizard",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🧙‍♂️",
    "titleEn": "How to Draw a Wizard with Magic Staff",
    "titleNl": "Hoe Teken Je een Tovenaar met Toverstaf",
    "descEn": "Learn how to draw a fun, easy wizard with magic staff step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke tovenaar met toverstaf tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "dragons-mythical",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Wizard with Magic Staff",
        "titleNl": "Stap 1: Basisvormen voor Tovenaar met Toverstaf",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your wizard with magic staff.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je tovenaar met toverstaf.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your wizard with magic staff its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je tovenaar met toverstaf te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dragons/Dragons__A_clean_printable_coloring_page_1788447095812.webp",
    "coloringPageSlug": "dragons-36",
    "coloringPageUrl": "/en/fantasy-fairytales/dragons/teens/dragons-36"
  },
  {
    "slug": "how-to-draw-a-ghost",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "👻",
    "titleEn": "How to Draw a Friendly Halloween Ghost",
    "titleNl": "Hoe Teken Je een Vriendelijk Spookje",
    "descEn": "Learn how to draw a fun, easy friendly halloween ghost step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vriendelijk spookje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "halloween-spooky",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Friendly Halloween Ghost",
        "titleNl": "Stap 1: Basisvormen voor Vriendelijk Spookje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your friendly halloween ghost.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vriendelijk spookje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your friendly halloween ghost its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vriendelijk spookje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513359545.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-37",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/kids/autumn-harvest-pumpkins-37"
  },
  {
    "slug": "how-to-draw-a-knight",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🛡️",
    "titleEn": "How to Draw a Brave Armored Knight",
    "titleNl": "Hoe Teken Je een Dappere Ridder in Harnas",
    "descEn": "Learn how to draw a fun, easy brave armored knight step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke dappere ridder in harnas tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Brave Armored Knight",
        "titleNl": "Stap 1: Basisvormen voor Dappere Ridder in Harnas",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your brave armored knight.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je dappere ridder in harnas.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your brave armored knight its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je dappere ridder in harnas te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454824752.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-38",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/teens/fairytale-kingdoms-castles-38"
  },
  {
    "slug": "how-to-draw-a-princess",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "👸",
    "titleEn": "How to Draw a Royal Princess",
    "titleNl": "Hoe Teken Je een Koninklijke Prinses",
    "descEn": "Learn how to draw a fun, easy royal princess step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke koninklijke prinses tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Royal Princess",
        "titleNl": "Stap 1: Basisvormen voor Koninklijke Prinses",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your royal princess.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je koninklijke prinses.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your royal princess its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je koninklijke prinses te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454833932.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-39",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/toddlers/fairytale-kingdoms-castles-39"
  },
  {
    "slug": "how-to-draw-a-crown",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "👑",
    "titleEn": "How to Draw a Golden Royal Crown",
    "titleNl": "Hoe Teken Je een Gouden Koninklijke Kroon",
    "descEn": "Learn how to draw a fun, easy golden royal crown step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gouden koninklijke kroon tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Golden Royal Crown",
        "titleNl": "Stap 1: Basisvormen voor Gouden Koninklijke Kroon",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your golden royal crown.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gouden koninklijke kroon.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your golden royal crown its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gouden koninklijke kroon te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788454842736.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-40",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/kids/fairytale-kingdoms-castles-40"
  },
  {
    "slug": "how-to-draw-a-robot",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🤖",
    "titleEn": "How to Draw a Retro Smiling Robot",
    "titleNl": "Hoe Teken Je een Vrolijke Retro Robot",
    "descEn": "Learn how to draw a fun, easy retro smiling robot step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vrolijke retro robot tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "gaming-virtual-worlds",
    "relatedThemeSlug": "cyberpunk-future",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Retro Smiling Robot",
        "titleNl": "Stap 1: Basisvormen voor Vrolijke Retro Robot",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your retro smiling robot.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vrolijke retro robot.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your retro smiling robot its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vrolijke retro robot te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Among%20Us/Among_Us__A_clean_printable_coloring_pag_1788416987708.webp",
    "coloringPageSlug": "among-us-41",
    "coloringPageUrl": "/en/gaming-virtual-worlds/among-us/toddlers/among-us-41"
  },
  {
    "slug": "how-to-draw-a-superhero-boy",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🦸‍♂️",
    "titleEn": "How to Draw a Flying Superhero Boy",
    "titleNl": "Hoe Teken Je een Vliegende Superheld Jongen",
    "descEn": "Learn how to draw a fun, easy flying superhero boy step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vliegende superheld jongen tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "superheroes-comic-universes",
    "relatedThemeSlug": "marvel-spider-man",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Flying Superhero Boy",
        "titleNl": "Stap 1: Basisvormen voor Vliegende Superheld Jongen",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your flying superhero boy.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vliegende superheld jongen.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your flying superhero boy its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vliegende superheld jongen te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Marvel%20-%20Spider-Man/Marvel__A_clean_printable_coloring_page__1788418940611.webp",
    "coloringPageSlug": "marvel-spider-man-42",
    "coloringPageUrl": "/en/superheroes-comic-universes/marvel-spider-man/toddlers/marvel-spider-man-42"
  },
  {
    "slug": "how-to-draw-a-superhero-girl",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🦸‍♀️",
    "titleEn": "How to Draw a Mighty Superhero Girl",
    "titleNl": "Hoe Teken Je een Sterke Superheldin Meisje",
    "descEn": "Learn how to draw a fun, easy mighty superhero girl step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke sterke superheldin meisje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "superheroes-comic-universes",
    "relatedThemeSlug": "marvel-spider-man",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Mighty Superhero Girl",
        "titleNl": "Stap 1: Basisvormen voor Sterke Superheldin Meisje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your mighty superhero girl.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je sterke superheldin meisje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your mighty superhero girl its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je sterke superheldin meisje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Marvel%20-%20Spider-Man/Marvel__A_clean_printable_coloring_page__1788418949614.webp",
    "coloringPageSlug": "marvel-spider-man-43",
    "coloringPageUrl": "/en/superheroes-comic-universes/marvel-spider-man/kids/marvel-spider-man-43"
  },
  {
    "slug": "how-to-draw-a-cute-monster",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "👾",
    "titleEn": "How to Draw a Furry Cute Monster",
    "titleNl": "Hoe Teken Je een Vriendelijk Pluizig Monster",
    "descEn": "Learn how to draw a fun, easy furry cute monster step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vriendelijk pluizig monster tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "kids-tv-shows",
    "relatedThemeSlug": "cartoons",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Furry Cute Monster",
        "titleNl": "Stap 1: Basisvormen voor Vriendelijk Pluizig Monster",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your furry cute monster.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vriendelijk pluizig monster.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your furry cute monster its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vriendelijk pluizig monster te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Blippi/Blippi__A_clean_printable_coloring_page__1788424304271.webp",
    "coloringPageSlug": "blippi-44",
    "coloringPageUrl": "/en/kids-tv-shows/blippi/teens/blippi-44"
  },
  {
    "slug": "how-to-draw-an-airship",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🎈",
    "titleEn": "How to Draw a Steampunk Airship",
    "titleNl": "Hoe Teken Je een Steampunk Luchtschip",
    "descEn": "Learn how to draw a fun, easy steampunk airship step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke steampunk luchtschip tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "airplanes-helicopters",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Steampunk Airship",
        "titleNl": "Stap 1: Basisvormen voor Steampunk Luchtschip",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your steampunk airship.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je steampunk luchtschip.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your steampunk airship its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je steampunk luchtschip te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_Adventure_1786140665859.webp",
    "coloringPageSlug": "construction-heavy-vehicles-45",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-45"
  },
  {
    "slug": "how-to-draw-a-pumpkin",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🎃",
    "titleEn": "How to Draw a Smiling Jack-o-Lantern",
    "titleNl": "Hoe Teken Je een Vrolijke Halloween Pompoen",
    "descEn": "Learn how to draw a fun, easy smiling jack-o-lantern step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vrolijke halloween pompoen tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "halloween-spooky",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Smiling Jack-o-Lantern",
        "titleNl": "Stap 1: Basisvormen voor Vrolijke Halloween Pompoen",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your smiling jack-o-lantern.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vrolijke halloween pompoen.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your smiling jack-o-lantern its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vrolijke halloween pompoen te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513451514.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-46",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/kids/autumn-harvest-pumpkins-46"
  },
  {
    "slug": "how-to-draw-santa-claus",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🎅",
    "titleEn": "How to Draw a Jolly Santa Claus",
    "titleNl": "Hoe Teken Je een Vrolijke Kerstman",
    "descEn": "Learn how to draw a fun, easy jolly santa claus step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vrolijke kerstman tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "christmas-winter",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Jolly Santa Claus",
        "titleNl": "Stap 1: Basisvormen voor Vrolijke Kerstman",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your jolly santa claus.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vrolijke kerstman.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your jolly santa claus its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vrolijke kerstman te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513461030.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-47",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/teens/autumn-harvest-pumpkins-47"
  },
  {
    "slug": "how-to-draw-an-easter-basket",
    "category": "fantasy",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🧺",
    "titleEn": "How to Draw a Easter Egg Basket",
    "titleNl": "Hoe Teken Je een Paasmandje vol Eieren",
    "descEn": "Learn how to draw a fun, easy easter egg basket step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke paasmandje vol eieren tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "spring-easter",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Easter Egg Basket",
        "titleNl": "Stap 1: Basisvormen voor Paasmandje vol Eieren",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your easter egg basket.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je paasmandje vol eieren.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your easter egg basket its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je paasmandje vol eieren te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513470062.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-48",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/toddlers/autumn-harvest-pumpkins-48"
  },
  {
    "slug": "how-to-draw-a-pegasus",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 15,
    "icon": "🪽",
    "titleEn": "How to Draw a Winged Pegasus Horse",
    "titleNl": "Hoe Teken Je een Gevleugeld Pegasus Paard",
    "descEn": "Learn how to draw a fun, easy winged pegasus horse step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gevleugeld pegasus paard tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "unicorns-pegasus",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Winged Pegasus Horse",
        "titleNl": "Stap 1: Basisvormen voor Gevleugeld Pegasus Paard",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your winged pegasus horse.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gevleugeld pegasus paard.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your winged pegasus horse its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gevleugeld pegasus paard te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Unicorns%20%26%20Pegasus/Unicorns___Pegasus__A_clean_printable_co_1788448152394.webp",
    "coloringPageSlug": "unicorns-pegasus-49",
    "coloringPageUrl": "/en/fantasy-fairytales/unicorns-pegasus/kids/unicorns-pegasus-49"
  },
  {
    "slug": "how-to-draw-a-phoenix",
    "category": "fantasy",
    "difficulty": "medium",
    "timeMinutes": 15,
    "icon": "🔥",
    "titleEn": "How to Draw a Mythical Fire Phoenix",
    "titleNl": "Hoe Teken Je een Mythische Vuur Feniks",
    "descEn": "Learn how to draw a fun, easy mythical fire phoenix step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke mythische vuur feniks tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "dragons-mythical",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Mythical Fire Phoenix",
        "titleNl": "Stap 1: Basisvormen voor Mythische Vuur Feniks",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your mythical fire phoenix.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je mythische vuur feniks.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your mythical fire phoenix its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je mythische vuur feniks te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Dragons/Dragons__A_clean_printable_coloring_page_1788447222437.webp",
    "coloringPageSlug": "dragons-50",
    "coloringPageUrl": "/en/fantasy-fairytales/dragons/kids/dragons-50"
  },
  {
    "slug": "how-to-draw-a-race-car",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🏎️",
    "titleEn": "How to Draw a Formula 1 Race Car",
    "titleNl": "Hoe Teken Je een Formule 1 Raceauto",
    "descEn": "Learn how to draw a fun, easy formula 1 race car step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke formule 1 raceauto tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Formula 1 Race Car",
        "titleNl": "Stap 1: Basisvormen voor Formule 1 Raceauto",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your formula 1 race car.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je formule 1 raceauto.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your formula 1 race car its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je formule 1 raceauto te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_Crane_1786116360918.webp",
    "coloringPageSlug": "construction-heavy-vehicles-51",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-51"
  },
  {
    "slug": "how-to-draw-a-monster-truck",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🛻",
    "titleEn": "How to Draw a Big Wheel Monster Truck",
    "titleNl": "Hoe Teken Je een Grote Monster Truck",
    "descEn": "Learn how to draw a fun, easy big wheel monster truck step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke grote monster truck tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Big Wheel Monster Truck",
        "titleNl": "Stap 1: Basisvormen voor Grote Monster Truck",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your big wheel monster truck.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je grote monster truck.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your big wheel monster truck its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je grote monster truck te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_Crane_1786140659829.webp",
    "coloringPageSlug": "construction-heavy-vehicles-52",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-52"
  },
  {
    "slug": "how-to-draw-a-fire-truck",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚒",
    "titleEn": "How to Draw a Emergency Fire Truck",
    "titleNl": "Hoe Teken Je een Brandweerwagen met Ladder",
    "descEn": "Learn how to draw a fun, easy emergency fire truck step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke brandweerwagen met ladder tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Emergency Fire Truck",
        "titleNl": "Stap 1: Basisvormen voor Brandweerwagen met Ladder",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your emergency fire truck.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je brandweerwagen met ladder.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your emergency fire truck its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je brandweerwagen met ladder te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_Crane_1786140659829_1.webp",
    "coloringPageSlug": "construction-heavy-vehicles-53",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-53"
  },
  {
    "slug": "how-to-draw-a-police-car",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚓",
    "titleEn": "How to Draw a City Police Patrol Car",
    "titleNl": "Hoe Teken Je een Politieauto met Zwaailicht",
    "descEn": "Learn how to draw a fun, easy city police patrol car step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke politieauto met zwaailicht tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for City Police Patrol Car",
        "titleNl": "Stap 1: Basisvormen voor Politieauto met Zwaailicht",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your city police patrol car.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je politieauto met zwaailicht.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your city police patrol car its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je politieauto met zwaailicht te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_Digging_1787740537779.webp",
    "coloringPageSlug": "construction-heavy-vehicles-54",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-54"
  },
  {
    "slug": "how-to-draw-a-train",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚂",
    "titleEn": "How to Draw a Steam Locomotive Train",
    "titleNl": "Hoe Teken Je een Klassieke Stoomtrein",
    "descEn": "Learn how to draw a fun, easy steam locomotive train step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke klassieke stoomtrein tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "trains-railways",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Steam Locomotive Train",
        "titleNl": "Stap 1: Basisvormen voor Klassieke Stoomtrein",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your steam locomotive train.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je klassieke stoomtrein.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your steam locomotive train its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je klassieke stoomtrein te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_and_Moon_1785056022726.webp",
    "coloringPageSlug": "construction-heavy-vehicles-55",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-55"
  },
  {
    "slug": "how-to-draw-a-rocket",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🚀",
    "titleEn": "How to Draw a Space Rocket",
    "titleNl": "Hoe Teken Je een Ruimteraket",
    "descEn": "Learn how to draw a fun, easy space rocket step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke ruimteraket tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "space-rockets",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Space Rocket",
        "titleNl": "Stap 1: Basisvormen voor Ruimteraket",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your space rocket.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je ruimteraket.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your space rocket its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je ruimteraket te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_and_Surfboard_1786116348833.webp",
    "coloringPageSlug": "construction-heavy-vehicles-56",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-56"
  },
  {
    "slug": "how-to-draw-a-helicopter",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🚁",
    "titleEn": "How to Draw a Rescue Helicopter",
    "titleNl": "Hoe Teken Je een Reddingshelikopter",
    "descEn": "Learn how to draw a fun, easy rescue helicopter step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke reddingshelikopter tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "airplanes-helicopters",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Rescue Helicopter",
        "titleNl": "Stap 1: Basisvormen voor Reddingshelikopter",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your rescue helicopter.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je reddingshelikopter.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your rescue helicopter its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je reddingshelikopter te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Unsorted%20Coloring%20Pages/Construction_Vehicle_at_Carnival_1787912353264.webp",
    "coloringPageSlug": "construction-heavy-vehicles-57",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-57"
  },
  {
    "slug": "how-to-draw-an-airplane",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "✈️",
    "titleEn": "How to Draw a Passenger Jet Airplane",
    "titleNl": "Hoe Teken Je een Passagiersvliegtuig",
    "descEn": "Learn how to draw a fun, easy passenger jet airplane step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke passagiersvliegtuig tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "airplanes-helicopters",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Passenger Jet Airplane",
        "titleNl": "Stap 1: Basisvormen voor Passagiersvliegtuig",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your passenger jet airplane.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je passagiersvliegtuig.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your passenger jet airplane its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je passagiersvliegtuig te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_in_Nature_1786116161340.webp",
    "coloringPageSlug": "construction-heavy-vehicles-58",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-58"
  },
  {
    "slug": "how-to-draw-a-school-bus",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚌",
    "titleEn": "How to Draw a Yellow School Bus",
    "titleNl": "Hoe Teken Je een Gele Schoolbus",
    "descEn": "Learn how to draw a fun, easy yellow school bus step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gele schoolbus tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Yellow School Bus",
        "titleNl": "Stap 1: Basisvormen voor Gele Schoolbus",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your yellow school bus.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gele schoolbus.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your yellow school bus its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gele schoolbus te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Unsorted%20Coloring%20Pages/Construction_Vehicle_in_the_Mountains_1787913279152.webp",
    "coloringPageSlug": "construction-heavy-vehicles-59",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-59"
  },
  {
    "slug": "how-to-draw-an-excavator",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🚜",
    "titleEn": "How to Draw a Construction Excavator",
    "titleNl": "Hoe Teken Je een Graafmachine",
    "descEn": "Learn how to draw a fun, easy construction excavator step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke graafmachine tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "construction-vehicles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Construction Excavator",
        "titleNl": "Stap 1: Basisvormen voor Graafmachine",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your construction excavator.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je graafmachine.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your construction excavator its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je graafmachine te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_with_Crane_1786116360918.webp",
    "coloringPageSlug": "construction-heavy-vehicles-60",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-60"
  },
  {
    "slug": "how-to-draw-a-dump-truck",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚛",
    "titleEn": "How to Draw a Dump Truck",
    "titleNl": "Hoe Teken Je een Kiepwagen",
    "descEn": "Learn how to draw a fun, easy dump truck step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke kiepwagen tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "construction-vehicles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Dump Truck",
        "titleNl": "Stap 1: Basisvormen voor Kiepwagen",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your dump truck.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je kiepwagen.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your dump truck its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je kiepwagen te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_with_Crane_1786140536350.webp",
    "coloringPageSlug": "construction-heavy-vehicles-61",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-61"
  },
  {
    "slug": "how-to-draw-a-bulldozer",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🚜",
    "titleEn": "How to Draw a Powerful Bulldozer",
    "titleNl": "Hoe Teken Je een Sterke Bulldozer",
    "descEn": "Learn how to draw a fun, easy powerful bulldozer step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke sterke bulldozer tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "construction-vehicles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Powerful Bulldozer",
        "titleNl": "Stap 1: Basisvormen voor Sterke Bulldozer",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your powerful bulldozer.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je sterke bulldozer.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your powerful bulldozer its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je sterke bulldozer te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_with_Crane_Arm_1786116221668.webp",
    "coloringPageSlug": "construction-heavy-vehicles-62",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-62"
  },
  {
    "slug": "how-to-draw-a-motorcycle",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🏍️",
    "titleEn": "How to Draw a Sport Motorcycle",
    "titleNl": "Hoe Teken Je een Snelle Motorfiets",
    "descEn": "Learn how to draw a fun, easy sport motorcycle step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke snelle motorfiets tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sport Motorcycle",
        "titleNl": "Stap 1: Basisvormen voor Snelle Motorfiets",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sport motorcycle.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je snelle motorfiets.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sport motorcycle its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je snelle motorfiets te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Vehicle_with_Hard_Hat_1786116318627.webp",
    "coloringPageSlug": "construction-heavy-vehicles-63",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-63"
  },
  {
    "slug": "how-to-draw-a-bicycle",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚲",
    "titleEn": "How to Draw a City Bicycle with Basket",
    "titleNl": "Hoe Teken Je een Stadsfiets met Mandje",
    "descEn": "Learn how to draw a fun, easy city bicycle with basket step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke stadsfiets met mandje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for City Bicycle with Basket",
        "titleNl": "Stap 1: Basisvormen voor Stadsfiets met Mandje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your city bicycle with basket.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je stadsfiets met mandje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your city bicycle with basket its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je stadsfiets met mandje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Worker_Character_in_Motion_1786106514796.webp",
    "coloringPageSlug": "construction-heavy-vehicles-64",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-64"
  },
  {
    "slug": "how-to-draw-a-sailboat",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "⛵",
    "titleEn": "How to Draw a Sailboat on Ocean",
    "titleNl": "Hoe Teken Je een Zeilboot op het Water",
    "descEn": "Learn how to draw a fun, easy sailboat on ocean step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke zeilboot op het water tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "boats-ships",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sailboat on Ocean",
        "titleNl": "Stap 1: Basisvormen voor Zeilboot op het Water",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sailboat on ocean.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je zeilboot op het water.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sailboat on ocean its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je zeilboot op het water te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Worker_with_Rocket_1787734166923.webp",
    "coloringPageSlug": "construction-heavy-vehicles-65",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-65"
  },
  {
    "slug": "how-to-draw-a-submarine",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🤿",
    "titleEn": "How to Draw a Yellow Submarine",
    "titleNl": "Hoe Teken Je een Gele Onderzeeër",
    "descEn": "Learn how to draw a fun, easy yellow submarine step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke gele onderzeeër tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "boats-ships",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Yellow Submarine",
        "titleNl": "Stap 1: Basisvormen voor Gele Onderzeeër",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your yellow submarine.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je gele onderzeeër.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your yellow submarine its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je gele onderzeeër te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Construction_Worker_with_Rocket_1787734522292.webp",
    "coloringPageSlug": "construction-heavy-vehicles-66",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-66"
  },
  {
    "slug": "how-to-draw-a-tractor",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚜",
    "titleEn": "How to Draw a Farm Tractor",
    "titleNl": "Hoe Teken Je een Boerderij Tractor",
    "descEn": "Learn how to draw a fun, easy farm tractor step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke boerderij tractor tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "construction-vehicles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Farm Tractor",
        "titleNl": "Stap 1: Basisvormen voor Boerderij Tractor",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your farm tractor.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je boerderij tractor.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your farm tractor its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je boerderij tractor te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Crane_Truck_Coloring_Page_1785055950337.webp",
    "coloringPageSlug": "construction-heavy-vehicles-67",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-67"
  },
  {
    "slug": "how-to-draw-a-hot-air-balloon",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🎈",
    "titleEn": "How to Draw a Hot Air Balloon",
    "titleNl": "Hoe Teken Je een Kleurrijke Luchtballon",
    "descEn": "Learn how to draw a fun, easy hot air balloon step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke kleurrijke luchtballon tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "airplanes-helicopters",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Hot Air Balloon",
        "titleNl": "Stap 1: Basisvormen voor Kleurrijke Luchtballon",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your hot air balloon.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je kleurrijke luchtballon.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your hot air balloon its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je kleurrijke luchtballon te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Crane_with_extended_boom_1785055950337.webp",
    "coloringPageSlug": "construction-heavy-vehicles-68",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-68"
  },
  {
    "slug": "how-to-draw-a-garbage-truck",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚛",
    "titleEn": "How to Draw a City Garbage Truck",
    "titleNl": "Hoe Teken Je een Vuilniswagen",
    "descEn": "Learn how to draw a fun, easy city garbage truck step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vuilniswagen tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for City Garbage Truck",
        "titleNl": "Stap 1: Basisvormen voor Vuilniswagen",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your city garbage truck.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vuilniswagen.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your city garbage truck its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vuilniswagen te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/Excavator_Adventure_1787912013247.webp",
    "coloringPageSlug": "construction-heavy-vehicles-69",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-69"
  },
  {
    "slug": "how-to-draw-an-ambulance",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚑",
    "titleEn": "How to Draw a Emergency Ambulance",
    "titleNl": "Hoe Teken Je een Ambulance",
    "descEn": "Learn how to draw a fun, easy emergency ambulance step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke ambulance tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Emergency Ambulance",
        "titleNl": "Stap 1: Basisvormen voor Ambulance",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your emergency ambulance.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je ambulance.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your emergency ambulance its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je ambulance te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/Excavator_Adventure_1787912428131.webp",
    "coloringPageSlug": "construction-heavy-vehicles-70",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-70"
  },
  {
    "slug": "how-to-draw-a-forklift",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🏗️",
    "titleEn": "How to Draw a Warehouse Forklift",
    "titleNl": "Hoe Teken Je een Heftruck",
    "descEn": "Learn how to draw a fun, easy warehouse forklift step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke heftruck tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "construction-vehicles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Warehouse Forklift",
        "titleNl": "Stap 1: Basisvormen voor Heftruck",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your warehouse forklift.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je heftruck.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your warehouse forklift its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je heftruck te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/Excavator_Adventure_1787912899436.webp",
    "coloringPageSlug": "construction-heavy-vehicles-71",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-71"
  },
  {
    "slug": "how-to-draw-a-speedboat",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🚤",
    "titleEn": "How to Draw a Fast Speedboat",
    "titleNl": "Hoe Teken Je een Snelle Speedboot",
    "descEn": "Learn how to draw a fun, easy fast speedboat step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke snelle speedboot tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "boats-ships",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Fast Speedboat",
        "titleNl": "Stap 1: Basisvormen voor Snelle Speedboot",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your fast speedboat.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je snelle speedboot.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your fast speedboat its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je snelle speedboot te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Excavator_digging_a_hole_1785055944303.webp",
    "coloringPageSlug": "construction-heavy-vehicles-72",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-72"
  },
  {
    "slug": "how-to-draw-a-hovercraft",
    "category": "vehicles",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🛸",
    "titleEn": "How to Draw a Rescue Hovercraft",
    "titleNl": "Hoe Teken Je een Luchtkussenboot",
    "descEn": "Learn how to draw a fun, easy rescue hovercraft step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke luchtkussenboot tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "boats-ships",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Rescue Hovercraft",
        "titleNl": "Stap 1: Basisvormen voor Luchtkussenboot",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your rescue hovercraft.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je luchtkussenboot.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your rescue hovercraft its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je luchtkussenboot te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Excavator_under_the_Moon_1785056022726.webp",
    "coloringPageSlug": "construction-heavy-vehicles-73",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/teens/construction-heavy-vehicles-73"
  },
  {
    "slug": "how-to-draw-a-skateboard",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🛹",
    "titleEn": "How to Draw a Street Skateboard",
    "titleNl": "Hoe Teken Je een Stoer Skateboard",
    "descEn": "Learn how to draw a fun, easy street skateboard step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke stoer skateboard tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Street Skateboard",
        "titleNl": "Stap 1: Basisvormen voor Stoer Skateboard",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your street skateboard.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je stoer skateboard.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your street skateboard its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je stoer skateboard te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20%26%20Heavy%20Vehicles/Friendly_Bulldozer_1787734136652.webp",
    "coloringPageSlug": "construction-heavy-vehicles-74",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/kids/construction-heavy-vehicles-74"
  },
  {
    "slug": "how-to-draw-an-electric-scooter",
    "category": "vehicles",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🛴",
    "titleEn": "How to Draw a Electric Kick Scooter",
    "titleNl": "Hoe Teken Je een Elektrische Step",
    "descEn": "Learn how to draw a fun, easy electric kick scooter step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke elektrische step tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "vehicles-transportation",
    "relatedThemeSlug": "cars-trucks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Electric Kick Scooter",
        "titleNl": "Stap 1: Basisvormen voor Elektrische Step",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your electric kick scooter.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je elektrische step.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your electric kick scooter its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je elektrische step te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/Friendly_Bulldozer_1787911962823.webp",
    "coloringPageSlug": "construction-heavy-vehicles-75",
    "coloringPageUrl": "/en/vehicles-transportation/construction-heavy-vehicles/toddlers/construction-heavy-vehicles-75"
  },
  {
    "slug": "how-to-draw-a-sunflower",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🌻",
    "titleEn": "How to Draw a Blooming Sunflower",
    "titleNl": "Hoe Teken Je een Bloeiende Zonnebloem",
    "descEn": "Learn how to draw a fun, easy blooming sunflower step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke bloeiende zonnebloem tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "flowers-floral-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Blooming Sunflower",
        "titleNl": "Stap 1: Basisvormen voor Bloeiende Zonnebloem",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your blooming sunflower.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je bloeiende zonnebloem.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your blooming sunflower its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je bloeiende zonnebloem te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493330903.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-76",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-76"
  },
  {
    "slug": "how-to-draw-a-rose",
    "category": "nature",
    "difficulty": "medium",
    "timeMinutes": 10,
    "icon": "🌹",
    "titleEn": "How to Draw a Elegant Red Rose",
    "titleNl": "Hoe Teken Je een Elegante Rode Roos",
    "descEn": "Learn how to draw a fun, easy elegant red rose step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke elegante rode roos tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "flowers-floral-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Elegant Red Rose",
        "titleNl": "Stap 1: Basisvormen voor Elegante Rode Roos",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your elegant red rose.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je elegante rode roos.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your elegant red rose its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je elegante rode roos te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493356089_1.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-77",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-77"
  },
  {
    "slug": "how-to-draw-a-tulip",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🌷",
    "titleEn": "How to Draw a Spring Tulip in Pot",
    "titleNl": "Hoe Teken Je een Lentetulp in Pot",
    "descEn": "Learn how to draw a fun, easy spring tulip in pot step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke lentetulp in pot tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "flowers-floral-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Spring Tulip in Pot",
        "titleNl": "Stap 1: Basisvormen voor Lentetulp in Pot",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your spring tulip in pot.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je lentetulp in pot.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your spring tulip in pot its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je lentetulp in pot te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493356116_2.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-78",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-78"
  },
  {
    "slug": "how-to-draw-a-cactus",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🌵",
    "titleEn": "How to Draw a Desert Cactus",
    "titleNl": "Hoe Teken Je een Woestijncactus",
    "descEn": "Learn how to draw a fun, easy desert cactus step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke woestijncactus tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "flowers-floral-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Desert Cactus",
        "titleNl": "Stap 1: Basisvormen voor Woestijncactus",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your desert cactus.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je woestijncactus.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your desert cactus its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je woestijncactus te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493433305.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-79",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-79"
  },
  {
    "slug": "how-to-draw-a-mushroom-house",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🍄",
    "titleEn": "How to Draw a Fairytale Mushroom House",
    "titleNl": "Hoe Teken Je een Sprookjes Paddestoelenhuisje",
    "descEn": "Learn how to draw a fun, easy fairytale mushroom house step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke sprookjes paddestoelenhuisje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "fantasy-fairytales",
    "relatedThemeSlug": "fairytale-kingdoms-castles",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Fairytale Mushroom House",
        "titleNl": "Stap 1: Basisvormen voor Sprookjes Paddestoelenhuisje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your fairytale mushroom house.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je sprookjes paddestoelenhuisje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your fairytale mushroom house its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je sprookjes paddestoelenhuisje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Fairytale%20Kingdoms%20%26%20Castles/Fairytale_Kingdoms___Castles__A_magical__1788455207245.webp",
    "coloringPageSlug": "fairytale-kingdoms-castles-80",
    "coloringPageUrl": "/en/fantasy-fairytales/fairytale-kingdoms-castles/teens/fairytale-kingdoms-castles-80"
  },
  {
    "slug": "how-to-draw-an-oak-tree",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🌳",
    "titleEn": "How to Draw a Majestic Oak Tree",
    "titleNl": "Hoe Teken Je een Grote Eikenboom",
    "descEn": "Learn how to draw a fun, easy majestic oak tree step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke grote eikenboom tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "nature-landscapes",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Majestic Oak Tree",
        "titleNl": "Stap 1: Basisvormen voor Grote Eikenboom",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your majestic oak tree.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je grote eikenboom.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your majestic oak tree its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je grote eikenboom te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493451361.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-81",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-81"
  },
  {
    "slug": "how-to-draw-a-palm-tree",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🌴",
    "titleEn": "How to Draw a Tropical Beach Palm Tree",
    "titleNl": "Hoe Teken Je een Tropische Palmboom",
    "descEn": "Learn how to draw a fun, easy tropical beach palm tree step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke tropische palmboom tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "nature-landscapes",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Tropical Beach Palm Tree",
        "titleNl": "Stap 1: Basisvormen voor Tropische Palmboom",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your tropical beach palm tree.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je tropische palmboom.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your tropical beach palm tree its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je tropische palmboom te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493460279.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-82",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-82"
  },
  {
    "slug": "how-to-draw-a-birthday-cake",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🎂",
    "titleEn": "How to Draw a 3-Tier Birthday Cake",
    "titleNl": "Hoe Teken Je een Verjaardagstaart met Kaarsjes",
    "descEn": "Learn how to draw a fun, easy 3-tier birthday cake step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke verjaardagstaart met kaarsjes tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "birthday-celebrations",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for 3-Tier Birthday Cake",
        "titleNl": "Stap 1: Basisvormen voor Verjaardagstaart met Kaarsjes",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your 3-tier birthday cake.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je verjaardagstaart met kaarsjes.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your 3-tier birthday cake its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je verjaardagstaart met kaarsjes te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513792851.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-83",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/teens/autumn-harvest-pumpkins-83"
  },
  {
    "slug": "how-to-draw-a-pizza-slice",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🍕",
    "titleEn": "How to Draw a Cheesy Pizza Slice",
    "titleNl": "Hoe Teken Je een Punt Pizza met Kaas",
    "descEn": "Learn how to draw a fun, easy cheesy pizza slice step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke punt pizza met kaas tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Cheesy Pizza Slice",
        "titleNl": "Stap 1: Basisvormen voor Punt Pizza met Kaas",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your cheesy pizza slice.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je punt pizza met kaas.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your cheesy pizza slice its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je punt pizza met kaas te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493478588.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-84",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-84"
  },
  {
    "slug": "how-to-draw-a-cheeseburger",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🍔",
    "titleEn": "How to Draw a Juicy Cheeseburger",
    "titleNl": "Hoe Teken Je een Sappige Hamburger met Frietjes",
    "descEn": "Learn how to draw a fun, easy juicy cheeseburger step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke sappige hamburger met frietjes tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Juicy Cheeseburger",
        "titleNl": "Stap 1: Basisvormen voor Sappige Hamburger met Frietjes",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your juicy cheeseburger.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je sappige hamburger met frietjes.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your juicy cheeseburger its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je sappige hamburger met frietjes te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493487599.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-85",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-85"
  },
  {
    "slug": "how-to-draw-an-ice-cream",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🍦",
    "titleEn": "How to Draw a Triple Scoop Ice Cream Cone",
    "titleNl": "Hoe Teken Je een IJsje met Drie Bollen",
    "descEn": "Learn how to draw a fun, easy triple scoop ice cream cone step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke ijsje met drie bollen tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Triple Scoop Ice Cream Cone",
        "titleNl": "Stap 1: Basisvormen voor IJsje met Drie Bollen",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your triple scoop ice cream cone.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je ijsje met drie bollen.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your triple scoop ice cream cone its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je ijsje met drie bollen te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493588054.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-86",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-86"
  },
  {
    "slug": "how-to-draw-a-donut",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🍩",
    "titleEn": "How to Draw a Sweet Glazed Donut",
    "titleNl": "Hoe Teken Je een Geglazuurde Donut met Spikkels",
    "descEn": "Learn how to draw a fun, easy sweet glazed donut step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke geglazuurde donut met spikkels tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sweet Glazed Donut",
        "titleNl": "Stap 1: Basisvormen voor Geglazuurde Donut met Spikkels",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sweet glazed donut.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je geglazuurde donut met spikkels.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sweet glazed donut its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je geglazuurde donut met spikkels te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493596747.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-87",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-87"
  },
  {
    "slug": "how-to-draw-an-apple",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "🍎",
    "titleEn": "How to Draw a Crisp Red Apple",
    "titleNl": "Hoe Teken Je een Rode Appel met Blaadje",
    "descEn": "Learn how to draw a fun, easy crisp red apple step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke rode appel met blaadje tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Crisp Red Apple",
        "titleNl": "Stap 1: Basisvormen voor Rode Appel met Blaadje",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your crisp red apple.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je rode appel met blaadje.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your crisp red apple its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je rode appel met blaadje te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493605890.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-88",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-88"
  },
  {
    "slug": "how-to-draw-a-pineapple",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🍍",
    "titleEn": "How to Draw a Tropical Pineapple",
    "titleNl": "Hoe Teken Je een Tropische Ananas",
    "descEn": "Learn how to draw a fun, easy tropical pineapple step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke tropische ananas tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Tropical Pineapple",
        "titleNl": "Stap 1: Basisvormen voor Tropische Ananas",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your tropical pineapple.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je tropische ananas.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your tropical pineapple its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je tropische ananas te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493614795.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-89",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-89"
  },
  {
    "slug": "how-to-draw-a-cupcake",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🧁",
    "titleEn": "How to Draw a Party Cupcake",
    "titleNl": "Hoe Teken Je een Feestelijke Cupcake",
    "descEn": "Learn how to draw a fun, easy party cupcake step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke feestelijke cupcake tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "cute-food-drinks",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Party Cupcake",
        "titleNl": "Stap 1: Basisvormen voor Feestelijke Cupcake",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your party cupcake.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je feestelijke cupcake.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your party cupcake its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je feestelijke cupcake te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493624076.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-90",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-90"
  },
  {
    "slug": "how-to-draw-a-diamond",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 6,
    "icon": "💎",
    "titleEn": "How to Draw a Sparkling Cut Diamond",
    "titleNl": "Hoe Teken Je een Fonkelende Diamant",
    "descEn": "Learn how to draw a fun, easy sparkling cut diamond step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke fonkelende diamant tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "geometric-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Sparkling Cut Diamond",
        "titleNl": "Stap 1: Basisvormen voor Fonkelende Diamant",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your sparkling cut diamond.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je fonkelende diamant.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your sparkling cut diamond its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je fonkelende diamant te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493643970_1.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-91",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-91"
  },
  {
    "slug": "how-to-draw-a-guitar",
    "category": "kids",
    "difficulty": "medium",
    "timeMinutes": 12,
    "icon": "🎸",
    "titleEn": "How to Draw a Rockstar Electric Guitar",
    "titleNl": "Hoe Teken Je een Elektrische Gitaar",
    "descEn": "Learn how to draw a fun, easy rockstar electric guitar step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke elektrische gitaar tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "music-instruments",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Rockstar Electric Guitar",
        "titleNl": "Stap 1: Basisvormen voor Elektrische Gitaar",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your rockstar electric guitar.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je elektrische gitaar.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your rockstar electric guitar its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je elektrische gitaar te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493643997_2.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-92",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-92"
  },
  {
    "slug": "how-to-draw-a-grand-piano",
    "category": "kids",
    "difficulty": "medium",
    "timeMinutes": 14,
    "icon": "🎹",
    "titleEn": "How to Draw a Grand Piano",
    "titleNl": "Hoe Teken Je een Klassieke Vleugelpiano",
    "descEn": "Learn how to draw a fun, easy grand piano step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke klassieke vleugelpiano tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "music-instruments",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Grand Piano",
        "titleNl": "Stap 1: Basisvormen voor Klassieke Vleugelpiano",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your grand piano.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je klassieke vleugelpiano.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your grand piano its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je klassieke vleugelpiano te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493716335.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-93",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-93"
  },
  {
    "slug": "how-to-draw-an-art-palette",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "🎨",
    "titleEn": "How to Draw a Artist Palette & Paintbrush",
    "titleNl": "Hoe Teken Je een Schilderspalet en Penseel",
    "descEn": "Learn how to draw a fun, easy artist palette & paintbrush step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke schilderspalet en penseel tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "art-studios",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Artist Palette & Paintbrush",
        "titleNl": "Stap 1: Basisvormen voor Schilderspalet en Penseel",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your artist palette & paintbrush.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je schilderspalet en penseel.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your artist palette & paintbrush its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je schilderspalet en penseel te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493725235.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-94",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-94"
  },
  {
    "slug": "how-to-draw-a-camera",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "📷",
    "titleEn": "How to Draw a Vintage Photo Camera",
    "titleNl": "Hoe Teken Je een Fotocamera",
    "descEn": "Learn how to draw a fun, easy vintage photo camera step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke fotocamera tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "retro-vintage",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Vintage Photo Camera",
        "titleNl": "Stap 1: Basisvormen voor Fotocamera",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your vintage photo camera.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je fotocamera.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your vintage photo camera its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je fotocamera te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493734522.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-95",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-95"
  },
  {
    "slug": "how-to-draw-an-hourglass",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "⏳",
    "titleEn": "How to Draw a Hourglass of Time",
    "titleNl": "Hoe Teken Je een Zandloper",
    "descEn": "Learn how to draw a fun, easy hourglass of time step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke zandloper tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "geometric-patterns",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Hourglass of Time",
        "titleNl": "Stap 1: Basisvormen voor Zandloper",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your hourglass of time.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je zandloper.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your hourglass of time its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je zandloper te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493744231.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-96",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/kids/art-nouveau-mucha-style-96"
  },
  {
    "slug": "how-to-draw-a-lighthouse",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "🗼",
    "titleEn": "How to Draw a Coastal Lighthouse",
    "titleNl": "Hoe Teken Je een Vuurtoren aan Zee",
    "descEn": "Learn how to draw a fun, easy coastal lighthouse step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke vuurtoren aan zee tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "nature-landscapes",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Coastal Lighthouse",
        "titleNl": "Stap 1: Basisvormen voor Vuurtoren aan Zee",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your coastal lighthouse.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je vuurtoren aan zee.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your coastal lighthouse its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je vuurtoren aan zee te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493753360.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-97",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/adults/art-nouveau-mucha-style-97"
  },
  {
    "slug": "how-to-draw-a-campfire-tent",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 10,
    "icon": "⛺",
    "titleEn": "How to Draw a Camping Tent & Campfire",
    "titleNl": "Hoe Teken Je een Kampeertent en Kampvuur",
    "descEn": "Learn how to draw a fun, easy camping tent & campfire step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke kampeertent en kampvuur tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "art-aesthetic",
    "relatedThemeSlug": "nature-landscapes",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Camping Tent & Campfire",
        "titleNl": "Stap 1: Basisvormen voor Kampeertent en Kampvuur",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your camping tent & campfire.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je kampeertent en kampvuur.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your camping tent & campfire its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je kampeertent en kampvuur te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Art%20Nouveau%20%28Mucha%20Style%29/Art_Nouveau__Mucha_Style___A_clean_print_1788493762276.webp",
    "coloringPageSlug": "art-nouveau-mucha-style-98",
    "coloringPageUrl": "/en/art-aesthetic/art-nouveau-mucha-style/teens/art-nouveau-mucha-style-98"
  },
  {
    "slug": "how-to-draw-a-snowflake",
    "category": "nature",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "❄️",
    "titleEn": "How to Draw a Symmetrical Ice Snowflake",
    "titleNl": "Hoe Teken Je een Symmetrische Sneeuwvlok",
    "descEn": "Learn how to draw a fun, easy symmetrical ice snowflake step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke symmetrische sneeuwvlok tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "christmas-winter",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Symmetrical Ice Snowflake",
        "titleNl": "Stap 1: Basisvormen voor Symmetrische Sneeuwvlok",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your symmetrical ice snowflake.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je symmetrische sneeuwvlok.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your symmetrical ice snowflake its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je symmetrische sneeuwvlok te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513940906.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-99",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/toddlers/autumn-harvest-pumpkins-99"
  },
  {
    "slug": "how-to-draw-a-cup-of-cocoa",
    "category": "kids",
    "difficulty": "easy",
    "timeMinutes": 8,
    "icon": "☕",
    "titleEn": "How to Draw a Hot Chocolate Mug with Marshmallows",
    "titleNl": "Hoe Teken Je een Warme Chocolademelk met Marshmallows",
    "descEn": "Learn how to draw a fun, easy hot chocolate mug with marshmallows step-by-step in 6 simple illustrated stages! Perfect for kids, parents, and classrooms.",
    "descNl": "Leer stap voor stap een vrolijke warme chocolademelk met marshmallows tekenen in 6 simpele, duidelijke stappen! Ideaal voor kinderen, thuis en in de klas.",
    "relatedHubSlug": "holidays-seasons",
    "relatedThemeSlug": "christmas-winter",
    "steps": [
      {
        "stepNumber": 1,
        "titleEn": "Step 1: Basic Guidelines for Hot Chocolate Mug with Marshmallows",
        "titleNl": "Stap 1: Basisvormen voor Warme Chocolademelk met Marshmallows",
        "instructionEn": "Start by lightly sketching simple oval and circular guide shapes for the body and structure of your hot chocolate mug with marshmallows.",
        "instructionNl": "Begin met het zachtjes schetsen van eenvoudige cirkels en ovalen voor het lichaam en de basis van je warme chocolademelk met marshmallows.",
        "tipEn": "Keep your pencil strokes light so they are easy to refine later.",
        "tipNl": "Druk niet te hard op je potlood zodat je lijntjes straks makkelijk kunt uitgummen."
      },
      {
        "stepNumber": 2,
        "titleEn": "Step 2: Connecting Contours",
        "titleNl": "Stap 2: Lijnen Verbinden",
        "instructionEn": "Connect your initial guidelines with smooth, confident outer curves to give your hot chocolate mug with marshmallows its true silhouette.",
        "instructionNl": "Verbind de basisvormen met soepele lijnen om de herkenbare omtrek van je warme chocolademelk met marshmallows te vormen.",
        "tipEn": "Focus on clean flowing lines.",
        "tipNl": "Let op mooie ronde en vloeiende lijnen."
      },
      {
        "stepNumber": 3,
        "titleEn": "Step 3: Key Features & Proportions",
        "titleNl": "Stap 3: Belangrijkste Details",
        "instructionEn": "Draw in the primary characteristic features such as limbs, facial outlines, wings, or wheels.",
        "instructionNl": "Teken de belangrijkste herkenbare onderdelen zoals pootjes, wielen, vleugels of het gezicht."
      },
      {
        "stepNumber": 4,
        "titleEn": "Step 4: Expressive Details & Textures",
        "titleNl": "Stap 4: Uitdrukking en Textuur",
        "instructionEn": "Add friendly facial expressions, textures, patterns, and signature accessories to bring your drawing to life.",
        "instructionNl": "Voeg vrolijke ogen, een lach, patronen en details toe om je tekening echt tot leven te wekken."
      },
      {
        "stepNumber": 5,
        "titleEn": "Step 5: Refine & Clean Up",
        "titleNl": "Stap 5: Verfijnen & Gummen",
        "instructionEn": "Trace over your best lines with a clean, confident darker pencil or marker and erase any overlapping sketch lines.",
        "instructionNl": "Trek de mooiste lijnen wat donkerder over en gum alle hulplijntjes die je niet meer nodig hebt netjes weg."
      },
      {
        "stepNumber": 6,
        "titleEn": "Step 6: Final Line Art & Coloring!",
        "titleNl": "Stap 6: Omlijnen & Inkleuren!",
        "instructionEn": "Finish your masterpiece! Add crisp black outlines, then grab your pencils, markers, or use our Online Coloring Studio to color it in!",
        "instructionNl": "Maak je meesterwerk af! Trek strakke zwarte contourlijnen en kleur alles prachtig in met viltstiften, potloden of in onze Online Kleurtool!"
      }
    ],
    "image": "https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn%20Harvest%20%26%20Pumpkins/Autumn_Harvest___Pumpkins__A_clean_print_1788513950293.webp",
    "coloringPageSlug": "autumn-harvest-pumpkins-100",
    "coloringPageUrl": "/en/holidays-seasons/autumn-harvest-pumpkins/kids/autumn-harvest-pumpkins-100"
  }
];

export function getLessonBySlug(slug: string): HowToDrawLesson | undefined {
  return HOW_TO_DRAW_LESSONS.find(l => l.slug === slug);
}

export function getRelatedLessons(slug: string, limit = 4): HowToDrawLesson[] {
  return HOW_TO_DRAW_LESSONS.filter(l => l.slug !== slug).slice(0, limit);
}
