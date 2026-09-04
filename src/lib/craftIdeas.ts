export interface CraftIdea {
  number: number;
  icon: string;
  title: string;
  tag: string;
  difficulty: string;
  estimatedTime: string;
  description: string;
  materials: string[];
  steps: string[];
}

interface CraftTemplate {
  icon: string;
  tagKey: 'craft' | 'decor' | 'game' | 'gift' | 'school' | 'art';
  difficultyKey: 'easy' | 'medium';
  time: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  materials: Record<string, string[]>;
  steps: Record<string, string[]>;
}

const TAGS: Record<string, Record<string, string>> = {
  craft: { nl: 'Knutselen', en: 'Paper Craft', de: 'Bastelarbeit', fr: 'Bricolage' },
  decor: { nl: 'Kamerdecoratie', en: 'Room Decor', de: 'Zimmerdeko', fr: 'Décoration' },
  game: { nl: 'Spelletje', en: 'Fun Game', de: 'Lustiges Spiel', fr: 'Jeu Amusant' },
  gift: { nl: 'Cadeautip', en: 'Gift Idea', de: 'Geschenkidee', fr: 'Idée Cadeau' },
  school: { nl: 'School & Leren', en: 'School & Study', de: 'Schule & Lernen', fr: 'École & Étude' },
  art: { nl: 'Creatieve Kunst', en: 'Creative Art', de: 'Kreativkunst', fr: 'Art Créatif' },
};

const DIFFS: Record<string, Record<string, string>> = {
  easy: { nl: 'Eenvoudig', en: 'Easy', de: 'Einfach', fr: 'Facile' },
  medium: { nl: 'Gemiddeld', en: 'Medium', de: 'Mittel', fr: 'Moyen' },
};

const TEMPLATES: CraftTemplate[] = [
  // 1. Popsicle stick puppet / Poppenkast
  {
    icon: '🎭',
    tagKey: 'craft',
    difficultyKey: 'easy',
    time: '15 min',
    titles: {
      nl: 'Vingerpopje & Poppenkast Marionet',
      en: 'Popsicle Stick Puppet & Theatre',
      de: 'Fingerpuppe & Puppentheater-Figur',
      fr: 'Marionnette sur Bâtonnet & Théâtre'
    },
    descriptions: {
      nl: 'Kleur je {TITLE} in, knip de omtrek netjes uit en plak hem op een stevig ijsstokje of rietje voor je eigen poppenshow.',
      en: 'Color your {TITLE}, carefully cut along the outlines, and glue it onto a popsicle stick or sturdy straw for a puppet show.',
      de: 'Male dein {TITLE} aus, schneide die Konturen sauber aus und klebe es auf ein Holzstäbchen für dein eigenes Puppenspiel.',
      fr: 'Coloriez votre {TITLE}, découpez soigneusement les contours et collez-le sur un bâtonnet en bois pour un spectacle de marionnettes.'
    },
    materials: {
      nl: ['Kleurpotloden of stiften', 'Kinderschaar', 'Houten ijsstokje of rietje', 'Lijmstift'],
      en: ['Colored pencils or markers', 'Safety scissors', 'Wooden popsicle stick or straw', 'Glue stick'],
      de: ['Buntstifte oder Filzstifte', 'Kinderschere', 'Eisstiel aus Holz', 'Klebestift'],
      fr: ['Crayons de couleur ou feutres', 'Ciseaux adaptés', 'Bâtonnet de glace en bois', 'Bâton de colle']
    },
    steps: {
      nl: [
        'Kleur het centrale figuur van de {TITLE} zo kleurrijk en levendig mogelijk in met stiften of potloden.',
        'Knip de figuur voorzichtig uit met een randje van ongeveer 2 millimeter witruimte eromheen.',
        'Plak met een stevige lijmstift of plakband een houten ijsstokje aan de achterzijde.',
        'Verzin een vrolijke stem en voer een spannend toneelstukje op achter een omgekeerde kartonnen doos of tafel!'
      ],
      en: [
        'Color the main figure of {TITLE} brightly with vibrant colored pencils or felt-tip pens.',
        'Carefully cut out the shape with scissors, leaving a tiny 2mm white margin around the edge.',
        'Attach a wooden popsicle stick or craft stick to the back using craft glue or clear tape.',
        'Create a fun voice and stage your very own puppet show behind a couch or decorated cardboard box!'
      ],
      de: [
        'Male die Hauptfigur von {TITLE} mit bunten Farben kräftig und fröhlich aus.',
        'Schneide die Konturen vorsichtig aus und lasse dabei einen kleinen weißen Rand stehen.',
        'Befestige ein Holzstäbchen mit Klebstoff oder Klebeband auf der Rückseite der Figur.',
        'Denke dir eine kleine Geschichte aus und starte deine eigene Puppenshow im Wohnzimmer!'
      ],
      fr: [
        'Coloriez avec soin le personnage principal de votre {TITLE} avec des feutres vifs.',
        'Découpez les contours en laissant une petite bordure blanche de 2 millimètres.',
        'Collez un bâtonnet de glace en bois à l\'arrière avec de la colle forte ou du ruban adhésif.',
        'Inventez une histoire amusante et mettez en scène votre spectacle de marionnettes!'
      ]
    }
  },

  // 2. Window Sun Catcher / Raamhanger
  {
    icon: '✨',
    tagKey: 'decor',
    difficultyKey: 'easy',
    time: '20 min',
    titles: {
      nl: 'Glanzende Gebrandschilderde Raamhanger',
      en: 'Stained Glass Window Suncatcher',
      de: 'Glänzender Buntglas-Fensterfänger',
      fr: 'Attrape-Soleil Vitrail pour Fenêtre'
    },
    descriptions: {
      nl: 'Wrijf een klein drupje babyolie of zonnebloemolie op de achterkant van je gekleurde {TITLE} om het papier magisch doorschijnend te maken voor het raam.',
      en: 'Lightly dab a drop of baby oil onto the back of your colored {TITLE} to turn normal paper into magical translucent stained glass in the sun.',
      de: 'Reibe einen Tropfen Pflanzenöl oder Babyöl auf die Rückseite deines ausgemalten {TITLE}, damit es im Sonnenlicht wie echtes Buntglas leuchtet.',
      fr: 'Frottez une goutte d\'huile pour bébé au dos de votre coloriage {TITLE} pour rendre le papier magiquement translucide face au soleil.'
    },
    materials: {
      nl: ['Wasco krijtjes of viltstiften', 'Een druppel babyolie of zonnebloemolie', 'Wattenstaafje of keukenrol', 'Plakband voor het raam'],
      en: ['Wax crayons or markers', 'A drop of baby oil or cooking oil', 'Cotton swab or paper towel', 'Clear tape'],
      de: ['Wachsmalstifte oder Filzstifte', 'Ein Tropfen Babyöl oder Speiseöl', 'Wattestäbchen', 'Fensterklebeband'],
      fr: ['Craies grasses ou feutres', 'Une goutte d\'huile végétale ou pour bébé', 'Coton-tige', 'Ruban adhésif']
    },
    steps: {
      nl: [
        'Kleur het hele blad intensief in met warme en felle kleuren voor het mooiste effect.',
        'Doop een wattenstaafje heel licht in babyolie en wrijf het zachtjes over de achterkant van het papier.',
        'Dep overtollige olie droog met een stukje keukenpapier; het papier wordt direct semi-transparant!',
        'Plak je kunstwerk met een plakbandje tegen het raam en zie hoe het zonlicht er betoverend doorheen schijnt.'
      ],
      en: [
        'Fill in the drawing with bold, vibrant colors using markers or wax crayons.',
        'Dip a cotton swab lightly into baby oil and gently brush it across the backside of the coloring sheet.',
        'Dab off any excess oil with a paper towel. The paper instantly becomes semi-transparent like glass!',
        'Tape it to a sunny window and watch the natural sunlight illuminate every single color.'
      ],
      de: [
        'Male das Bild mit kräftigen, leuchtenden Farben vollständig aus.',
        'Tupfe mit einem Wattestäbchen etwas Öl auf die Rückseite des Blattes und verstreiche es gleichmäßig.',
        'Wische überschüssiges Öl mit einem Papiertuch trocken. Das Blatt wird magisch durchscheinend!',
        'Befestige dein Kunstwerk mit Tesa am Fenster und genieße den warmen Buntglas-Effekt.'
      ],
      fr: [
        'Coloriez généreusement l\'ensemble du dessin avec des teintes éclatantes.',
        'Trempez un coton-tige dans un soupçon d\'huile et appliquez doucement au verso de la feuille.',
        'Épongez l\'excédent avec du papier absorbant pour révéler la transparence immédiate du papier.',
        'Fixez votre création sur une fenêtre ensoleillée pour admirer l\'effet vitrail lumineux!'
      ]
    }
  },

  // 3. 3D Pop-up card / Wenskaart
  {
    icon: '💌',
    tagKey: 'gift',
    difficultyKey: 'medium',
    time: '25 min',
    titles: {
      nl: '3D Pop-up Verjaardags- of Wenskaart',
      en: '3D Pop-Up Greeting & Birthday Card',
      de: '3D Pop-Up Glückwunschkarte',
      fr: 'Carte de Vœux Pop-Up 3D Féerique'
    },
    descriptions: {
      nl: 'Bouw een verrassende pop-up wenskaart waarbij {TITLE} naar voren springt zodra iemand de kaart openvouwt.',
      en: 'Surprise friends and family by creating a pop-up card where {TITLE} leaps forward when the card is opened.',
      de: 'Gestalte eine faszinierende Klappkarte, aus der {TITLE} beim Öffnen dreidimensional hervorspringt.',
      fr: 'Fabriquez une magnifique carte pop-up où {TITLE} jaillit en relief dès qu\'on l\'ouvre.'
    },
    materials: {
      nl: ['Gekleurd stevig knutselkarton (A4)', 'Kinderschaar', 'Lijm', 'Ingekleurde kleurplaat'],
      en: ['Colored cardstock paper (A4/Letter)', 'Child scissors', 'Glue stick', 'Colored coloring page'],
      de: ['Bunter Tonkarton', 'Kinderschere', 'Bastelkleber', 'Ausgemaltes Bild'],
      fr: ['Feuille de papier cartonné coloré', 'Ciseaux', 'Colle', 'Dessin colorié']
    },
    steps: {
      nl: [
        'Vouw een vel stevig knutselpapier precies in tweeën als dubbele kaart.',
        'Knip aan de vouwrand twee evenwijdige sneetjes van ongeveer 2 centimeter in en duw het ontstane lipje naar binnen.',
        'Kleur en knip de hoofdfiguur van je {TITLE} uit.',
        'Plak je ingekleurde figuur op het trappetje, schrijf je wens erbij en sluit de kaart.'
      ],
      en: [
        'Fold a sheet of colored cardstock in half. On the fold, cut two parallel 1-inch slits.',
        'Push the resulting tab inward so it forms a standing step when the card opens.',
        'Glue your colored cutout onto the front of the tab and write your special message around it.',
        'Fold the card shut and decorate the front cover to make the ultimate handmade gift.'
      ],
      de: [
        'Falte einen Bogen Tonpapier zur Hälfte und schneide am Falz zwei kurze, parallele Schlitze ein.',
        'Drücke die entstandene Lasche nach innen, sodass eine kleine Stufe entsteht.',
        'Klebe deine ausgemalte Figur auf diese Stufe und schreibe liebe Wünsche dazu.',
        'Klappe die Karte zu und verziere die Vorderseite für ein persönliches Geschenk.'
      ],
      fr: [
        'Pliez une feuille de papier cartonné en deux et découpez deux encoches parallèles de 2 cm sur le pli.',
        'Poussez la languette vers l\'intérieur pour former une petite marche mécanique.',
        'Collez votre dessin sur la marche et ajoutez un message personnalisé.',
        'Refermez la carte et décorez la couverture pour offrir un superbe cadeau artisanal.'
      ]
    }
  },

  // 4. DIY Jigsaw puzzle / Legpuzzel
  {
    icon: '🧩',
    tagKey: 'game',
    difficultyKey: 'medium',
    time: '20 min',
    titles: {
      nl: 'DIY Legpuzzel op Karton',
      en: 'Homemade Cardboard Jigsaw Puzzle',
      de: 'Eigenes Karton-Puzzlespiel',
      fr: 'Puzzle Fait Maison sur Carton'
    },
    descriptions: {
      nl: 'Tover je kunstwerk om in een uitdagende legpuzzel met 12 tot 24 stukjes die je keer op keer opnieuw kunt oplossen.',
      en: 'Turn your completed masterpiece into a personalized jigsaw puzzle with 12 to 24 pieces for your siblings or classmates.',
      de: 'Verwandle dein Meisterwerk in ein kniffliges Puzzle mit 12 bis 24 Teilen zum immer wieder neu Legen.',
      fr: 'Transformez votre chef-d\'œuvre en un véritable puzzle de 12 à 24 pièces à reconstituer à l\'infini.'
    },
    materials: {
      nl: ['Volledig ingekleurde kleurplaat', 'Oud karton van verzenddoos of ontbijtgranen', 'Potlood en liniaal', 'Schaar'],
      en: ['Completed coloring page', 'Cardboard backer', 'Pencil and ruler', 'Scissors'],
      de: ['Fertig buntes Bild', 'Fester Karton', 'Bleistift & Lineal', 'Schere'],
      fr: ['Coloriage entièrement rempli', 'Carton solide', 'Crayon et règle', 'Ciseaux']
    },
    steps: {
      nl: [
        'Plak je ingekleurde kleurplaat met lijm strak en glad op een stuk stevig karton en laat even drogen.',
        'Teken op de achterkant met potlood een raster van 12 tot 20 speelse puzzelvormen met bochtjes en haken.',
        'Knip alle stukjes voorzichtig los, schud ze door elkaar en daag iemand uit om de puzzel te voltooien!'
      ],
      en: [
        'Glue the finished coloring sheet firmly onto cardboard and press flat to dry completely.',
        'On the blank back of the cardboard, sketch a grid of interlocking puzzle piece shapes.',
        'Cut out all pieces carefully, shuffle them, and challenge family or friends to solve it!'
      ],
      de: [
        'Klebe das fertige Bild glatt auf den Karton und lasse den Kleber kurz trocknen.',
        'Zeichne auf die Rückseite mit Bleistift ein Gitter mit welligen Puzzlemustern.',
        'Schneide die Puzzleteile sorgfältig aus, mische sie gut durch und lege los!'
      ],
      fr: [
        'Collez soigneusement votre feuille sur un carton rigide et laissez bien sécher.',
        'Au verso, tracez au crayon les contours de pièces emboîtables.',
        'Découpez chaque pièce, mélangez-les et défiez votre famille de reconstituer l\'image!'
      ]
    }
  },

  // 5. Bookmark with tassel / Boekenlegger
  {
    icon: '🔖',
    tagKey: 'school',
    difficultyKey: 'easy',
    time: '15 min',
    titles: {
      nl: 'Luxe Boekenlegger met Kwastje',
      en: 'Reading Bookmark with Yarn Tassel',
      de: 'Leselesezeichen mit Wollquaste',
      fr: 'Marque-Page Rigide avec Gland en Laine'
    },
    descriptions: {
      nl: 'Knip het mooiste detail uit {TITLE}, plak het op een stevige strook karton en vlecht een kwastje van wol voor in je favoriete leesboek.',
      en: 'Snip the finest detail from {TITLE}, paste it on a stiff cardboard strip, and add a colorful yarn tassel for your favorite book.',
      de: 'Schneide ein tolles Motiv aus {TITLE} aus, laminiere es auf Tonpapier und binde eine Quaste daran für dein Lieblingsbuch.',
      fr: 'Découpez votre détail préféré de {TITLE}, montez-le sur carton rigide et ajoutez un gland en laine pour vos livres.'
    },
    materials: {
      nl: ['Gekleurde strook van {TITLE}', 'Stevig karton (5 x 18 cm)', 'Perforator of gaatjestang', 'Garen of wol'],
      en: ['Colored strip from {TITLE}', 'Cardstock strip (2 x 7 inches)', 'Hole punch', 'Yarn or ribbon'],
      de: ['Ausgeschnittenes {TITLE}-Motiv', 'Kartonstreifen (5 x 18 cm)', 'Locher', 'Wollfaden oder Band'],
      fr: ['Motif découpé de {TITLE}', 'Bande cartonnée (5 x 18 cm)', 'Perforatrice', 'Fil de laine ou ruban']
    },
    steps: {
      nl: [
        'Kleur het detailrijkste deel van de tekening in en knip een rechthoekige strook van circa 5 bij 15 centimeter uit.',
        'Lijm deze strook op een stuk stevig gekleurd knutselkarton voor extra duurzaamheid.',
        'Maak aan de bovenkant met de perforator een gaatje.',
        'Haal een vrolijk gekleurd wollen draadje of lintje door het gaatje en maak een decoratief knoopje.'
      ],
      en: [
        'Color the most detailed section and trim it into a rectangular strip (approx. 2 by 6 inches).',
        'Mount it onto heavy cardstock with a glue stick for stiffness and durability.',
        'Punch a neat hole at the top edge using a standard hole punch.',
        'Thread a brightly colored piece of yarn or ribbon through the hole and tie a decorative knot.'
      ],
      de: [
        'Male den schönsten Bereich des Bildes aus und schneide einen ca. 5x15 cm großen Streifen zurecht.',
        'Klebe den Streifen auf ein Stück festen Fotokarton, um ihn knickfest zu machen.',
        'Stanzt oben in der Mitte mit einem Locher ein sauberes Loch.',
        'Ziehe ein buntes Wollband durch die Öffnung und knote eine schicke Quaste fest.'
      ],
      fr: [
        'Coloriez la partie la plus expressive et découpez une bande de 5 x 15 cm environ.',
        'Collez cette bande sur un carton résistant pour éviter qu\'elle ne se corne.',
        'Perforez un trou centré dans la partie supérieure.',
        'Passez-y un brin de laine colorée ou un ruban et serrez un joli nœud décoratif.'
      ]
    }
  },

  // 6. Textured Collage / Textuur Mozaïek
  {
    icon: '🎨',
    tagKey: 'art',
    difficultyKey: 'medium',
    time: '30 min',
    titles: {
      nl: 'Sensopathisch Textuur- & Propjes Mozaïek',
      en: 'Tactile Tissue Paper & Collage Art',
      de: 'Taktile Krepppapier- & Textur-Collage',
      fr: 'Mosaïque Sensorielle en Papier Crépon'
    },
    descriptions: {
      nl: 'Gebruik gerolde propjes vloeipapier, wattenbolletjes, glitters of zand om {TITLE} een voelbaar 3D reliëf te geven.',
      en: 'Elevate your {TITLE} into a tactile sensory collage using rolled tissue balls, cotton balls, sequins, and natural textures.',
      de: 'Verleihe {TITLE} dreidimensionale Textur mit geknüllten Krepppapier-Kügelchen, Watte, Glitzer oder Knöpfen.',
      fr: 'Sublimez {TITLE} avec des boulettes de papier crépon froissé, du coton doux et des paillettes scintillantes.'
    },
    materials: {
      nl: ['Kleurplaat {TITLE}', 'Gekleurd crêpepapier of vloeipapier', 'Witte hobbylijm', 'Watten of glitter (optioneel)'],
      en: ['{TITLE} coloring page', 'Colored tissue or crepe paper', 'Craft PVA glue', 'Cotton balls or sparkles'],
      de: ['{TITLE} Malvorlage', 'Buntes Krepp- oder Seidenpapier', 'Bastelkleber', 'Wattebällchen oder Glitzer'],
      fr: ['Coloriage {TITLE}', 'Papier crépon ou de soie multicolore', 'Colle blanche liquide', 'Coton ou paillettes']
    },
    steps: {
      nl: [
        'Kies welke vlakken van {TITLE} je wilt inkleuren en welke vlakken je reliëf wilt geven.',
        'Scheur kleine vierkantjes crêpepapier af en rol ze tussen je handpalmen tot compacte balletjes.',
        'Breng een druppel hobbylijm aan op de tekening en druk de propjes stevig op hun plek.',
        'Voeg watten toe voor zachte onderdelen of een vleugje glitter voor een magische finish!'
      ],
      en: [
        'Decide which parts of {TITLE} you will color flat, and which parts will pop with texture.',
        'Tear small squares of colorful tissue paper and roll them between your palms into tight little balls.',
        'Dab small drops of craft glue across the sheet and press the tissue balls firmly into place.',
        'Add fluffy cotton for clouds or fur, and a pinch of glitter for extra sparkle!'
      ],
      de: [
        'Wähle aus, welche Abschnitte flach ausgemalt und welche mit 3D-Materialien beklebt werden sollen.',
        'Reiße kleine Krepppapier-Stücke ab und rolle sie zwischen den Fingern zu kleinen Kügelchen.',
        'Trage flüssigen Bastelkleber punktförmig auf und drücke die bunten Kügelchen fest an.',
        'Nutze Watte für weiche Wolken oder Fell, um ein wunderbar fühlbares Kunstwerk zu erschaffen.'
      ],
      fr: [
        'Choisissez les zones à colorier normalement et celles à habiller en relief tactile.',
        'Déchirez de petits morceaux de papier crépon et roulez-les en petites boules serrées.',
        'Déposez des points de colle blanche et pressez fermement chaque boulette sur le dessin.',
        'Ajoutez un peu de coton pour créer des nuages ou du pelage doux au toucher!'
      ]
    }
  },

  // 7. Pen holder / Pennenbakje
  {
    icon: '✏️',
    tagKey: 'school',
    difficultyKey: 'easy',
    time: '20 min',
    titles: {
      nl: 'Upcycled Bureau Pennenbakje',
      en: 'Upcycled Desk Pencil & Pen Holder',
      de: 'Upcycling Schreibtisch-Stiftehalter',
      fr: 'Pot à Crayons Recyclé pour Bureau'
    },
    descriptions: {
      nl: 'Wikkel je ingekleurde {TITLE} rond een leeg conservenblikje of wc-rolletje voor een stijlvolle en opgeruimde werkplek.',
      en: 'Wrap and glue your finished {TITLE} around an empty tin can or cardboard tube to organize your art markers in style.',
      de: 'Wickle dein ausgemaltes {TITLE} um eine leere Dose oder Papprolle, um deinen Zeichentisch perfekt zu ordnen.',
      fr: 'Enroulez votre {TITLE} colorié autour d\'une boîte de conserve propre pour créer un pot à crayons unique.'
    },
    materials: {
      nl: ['Ingekleurde {TITLE}', 'Schoon leeg blikje of toiletrol', 'Plakband of lijm', 'Schaar'],
      en: ['Completed {TITLE}', 'Clean empty tin can or toilet paper roll', 'Clear tape or glue', 'Scissors'],
      de: ['Ausgemaltes {TITLE}-Blatt', 'Saubere Blechdose oder Papprolle', 'Klebeband / Leim', 'Schere'],
      fr: ['Coloriage {TITLE} terminé', 'Boîte de conserve propre ou rouleau cartonné', 'Colle ou ruban adhésif', 'Ciseaux']
    },
    steps: {
      nl: [
        'Meet de hoogte en de omtrek van het blikje op met een liniaal.',
        'Knip je kleurplaat precies op maat zodat de randen elkaar net een halve centimeter overlappen.',
        'Smeer de buitenkant van het blikje in met hobbylijm of gebruik dubbelzijdig plakband.',
        'Wikkel het papier strak om het blikje en strijk eventuele luchtbellen glad met een theedoek.'
      ],
      en: [
        'Measure the height and circumference of your clean tin can with a ruler.',
        'Trim your {TITLE} coloring page so it wraps around with a 0.5-inch overlap.',
        'Apply craft glue or double-sided tape around the outer surface of the can.',
        'Wrap the artwork snugly around the cylinder and smooth it down for a personalized desk organizer.'
      ],
      de: [
        'Messe die Höhe und den Umfang der sauberen Dose mit einem Lineal ab.',
        'Schneide deine Vorlage so zu, dass sich die Enden um einen halben Zentimeter überlappen.',
        'Trage Kleber oder doppelseitiges Klebeband auf die Dosenwand auf.',
        'Wickle das Bild straff herum und streiche es glatt – fertig ist der persönliche Stiftehalter!'
      ],
      fr: [
        'Mesurez la hauteur et la circonférence de votre boîte avec une règle.',
        'Découpez votre dessin aux dimensions exactes en laissant un rabat de 1 cm.',
        'Appliquez de la colle ou de l\'adhésif double face sur le pourtour.',
        'Enroulez fermement le dessin autour du contenant pour ranger tous vos feutres et crayons.'
      ]
    }
  },

  // 8. Garland / Feestelijke Slinger
  {
    icon: '🎉',
    tagKey: 'decor',
    difficultyKey: 'easy',
    time: '25 min',
    titles: {
      nl: 'Feestelijke Wimpelslinger & Vlaggetjes',
      en: 'Party Pennant Banner & Garland',
      de: 'Festliche Wimpelkette & Girlande',
      fr: 'Guirlande Fanion de Fête Personnalisée'
    },
    descriptions: {
      nl: 'Print 3 tot 5 exemplaren van {TITLE}, knip ze in driehoekige wimpels en rijg ze aan een lang touw voor feestversiering.',
      en: 'Print multiple copies of {TITLE}, cut them into triangular flags, and string them together to decorate your bedroom or party.',
      de: 'Drucke mehrere Exemplare von {TITLE}, schneide sie als Dreiecke aus und fädle sie auf eine bunte Schnur.',
      fr: 'Imprimez plusieurs exemplaires de {TITLE}, découpez-les en fanions triangulaires et suspendez-les pour une fête.'
    },
    materials: {
      nl: ['Meerdere afdrukken van {TITLE}', 'Lang touwtje of lint (2 meter)', 'Schaar', 'Plakband of perforator'],
      en: ['Multiple prints of {TITLE}', 'Twine or ribbon (6 feet)', 'Scissors', 'Tape or hole punch'],
      de: ['Mehrere {TITLE}-Ausdrucke', 'Kordel oder Band (2 m)', 'Schere', 'Klebeband oder Locher'],
      fr: ['Plusieurs impressions de {TITLE}', 'Cordon ou ruban (2 m)', 'Ciseaux', 'Adhésif ou perforatrice']
    },
    steps: {
      nl: [
        'Kleur meerdere versies van {TITLE} in met verschillende kleurenpaletten.',
        'Knip de tekeningen uit in klassieke wimpeldriehoeken of volg de speelse contouren van het figuur.',
        'Vouw een klein randje aan de bovenzijde om het touw heen en plak vast met plakband.',
        'Hang je vrolijke slinger op langs de muur, het plafond of boven je bed!'
      ],
      en: [
        'Color several prints of {TITLE} experimenting with varied and contrasting color palettes.',
        'Cut each sheet into a pennant triangle or follow the character outline.',
        'Fold a small top tab over your string or twine and tape it securely on the back.',
        'Hang your vibrant handmade banner across your room or party table!'
      ],
      de: [
        'Male mehrere Exemplare mit unterschiedlichen, fröhlichen Farbkombinationen aus.',
        'Schneide jedes Blatt in eine klassische Wimpelform oder entlang der Figurenkontur.',
        'Falte die obere Kante über die Schnur und fixiere sie mit etwas Klebeband.',
        'Hänge deine handgemachte Girlande quer durchs Zimmer oder an die Geburtstagswand!'
      ],
      fr: [
        'Coloriez plusieurs exemplaires en testant des palettes de couleurs différentes.',
        'Découpez chaque feuille en forme de fanion triangulaire.',
        'Repliez le haut de chaque triangle autour du cordon et fixez avec de l\'adhésif.',
        'Accrochez votre guirlande festive au mur pour illuminer la pièce!'
      ]
    }
  },

  // 9. Party Mask / Feestmasker
  {
    icon: '🎭',
    tagKey: 'craft',
    difficultyKey: 'medium',
    time: '25 min',
    titles: {
      nl: 'Verkleed Feestmasker met Elastiekje',
      en: 'Dress-Up Character Costume Mask',
      de: 'Karneval-Kostümmaske mit Gummiband',
      fr: 'Masque de Déguisement avec Élastique'
    },
    descriptions: {
      nl: 'Transformeer jezelf in {TITLE}! Knip ooggaatjes uit, verstevig de achterzijde en bevestig een zacht elastiekje rond je hoofd.',
      en: 'Step directly into character! Cut out eye holes in {TITLE}, reinforce the sides, and slip on an elastic band for dress-up fun.',
      de: 'Verkleide dich als {TITLE}! Schneide Augenschlitze aus, verstärke die Ränder und befestige ein Gummiband.',
      fr: 'Glissez-vous dans la peau de {TITLE}! Percez les yeux, renforcez les côtés et ajoutez un élastique pour vous déguiser.'
    },
    materials: {
      nl: ['Kleurplaat {TITLE}', 'Stevig knutselkarton of lamineerfolie', 'Elastiekje of touwtje', 'Schaar en plakband'],
      en: ['{TITLE} coloring page', 'Heavy cardstock backer', 'Elastic string or yarn', 'Scissors and tape'],
      de: ['{TITLE} Malvorlage', 'Fester Karton', 'Elastikkordel', 'Schere & Klebeband'],
      fr: ['Coloriage {TITLE}', 'Feuille cartonnée rigide', 'Fil élastique doux', 'Ciseaux et adhésif']
    },
    steps: {
      nl: [
        'Kleur het gezicht of de hoofdcontour van {TITLE} met felle, dekkende kleuren.',
        'Plak het papier op stevig karton voor stevigheid en knip de buitenlijn nauwkeurig uit.',
        'Knip met behulp van een volwassene twee ronde kijkgaten uit voor de ogen.',
        'Maak aan beide zijkanten een gaatje, verstevig ze met plakband en knoop het elastiekje op maat vast.'
      ],
      en: [
        'Color the character face boldly with markers or crayons.',
        'Back the sheet with sturdy cardstock and cut out the outer silhouette.',
        'With adult assistance, carefully puncture and cut out two circular eye holes.',
        'Punch holes on both sides, reinforce them with tape, and knot the elastic string to fit comfortably.'
      ],
      de: [
        'Male das Gesichtsmotiv von {TITLE} mit deckenden Farben aus.',
        'Klebe das Blatt auf Karton und schneide die Maskenkontur sauber aus.',
        'Schneide mit Hilfe eines Erwachsenen vorsichtig zwei runde Sehschlitze aus.',
        'Loche beide Seiten, verstärke sie mit Klebestreifen und knote ein Gummiband fest.'
      ],
      fr: [
        'Coloriez le visage ou le motif central avec des feutres bien couvrants.',
        'Collez le dessin sur un carton rigide puis découpez la silhouette extérieure.',
        'Avec l\'aide d\'un adulte, découpez deux ouvertures rondes pour les yeux.',
        'Percez chaque côté, renforcez avec du ruban et nouez l\'élastique ajusté à votre tête.'
      ]
    }
  },

  // 10. Memory Card Game / Geheugenspel
  {
    icon: '🧠',
    tagKey: 'game',
    difficultyKey: 'easy',
    time: '20 min',
    titles: {
      nl: 'Memory & Concentratie Kaartspel',
      en: 'Custom Memory Matching Card Game',
      de: 'Eigenes Memory Gedächtnisspiel',
      fr: 'Jeu de Paires & Memory Fait Main'
    },
    descriptions: {
      nl: 'Print twee identieke {TITLE} kleurplaten, knip ze in vierkante kaartjes en speel een spannend zoek-het-paar geheugenspel met vrienden.',
      en: 'Print two identical copies of {TITLE}, cut them into matching square tiles, and challenge someone to a memory matching duel.',
      de: 'Drucke zwei Kopien von {TITLE}, zerschneide sie in quadratische Kärtchen und spiele ein lustiges Merkspiel.',
      fr: 'Imprimez deux exemplaires de {TITLE}, découpez-les en cartes carrées identiques et jouez au jeu des paires.'
    },
    materials: {
      nl: ['2x afdruk van {TITLE}', 'Stevig karton voor de achterkant', 'Liniaal en schaar', 'Lijmstift'],
      en: ['2x prints of {TITLE}', 'Opaque cardstock backer', 'Ruler and scissors', 'Glue stick'],
      de: ['2x Ausdrucke von {TITLE}', 'Blickdichter Tonkarton', 'Lineal & Schere', 'Klebestift'],
      fr: ['2x impressions de {TITLE}', 'Carton opaque pour le dos', 'Règle et ciseaux', 'Bâton de colle']
    },
    steps: {
      nl: [
        'Kleur beide kleurplaten exact hetzelfde in, zodat er identieke paren ontstaan.',
        'Plak beide vellen op ondoorzichtig donker karton zodat je er niet doorheen kunt kijken.',
        'Teken met een liniaal gelijke vierkanten van 6 bij 6 cm en knip alle kaartjes los.',
        'Leg alle kaarten ondersteboven op tafel en zoek om de beurt de bijbehorende paren!'
      ],
      en: [
        'Color both prints identically so you have matching pairs of colored sections.',
        'Glue both sheets onto dark, opaque cardstock so the artwork cannot be seen from behind.',
        'Use a ruler to draw identical 2.5-inch squares and cut out all tiles.',
        'Lay all cards facedown on the table and take turns flipping two tiles to find matching pairs!'
      ],
      de: [
        'Male beide Blätter mit den gleichen Farben aus, damit identische Paare entstehen.',
        'Klebe beide Seiten auf blickdichten Karton, damit man die Motive nicht durchsehen kann.',
        'Schneide mit Lineal und Schere gleich große quadratische Karten (ca. 6x6 cm) zu.',
        'Mische alle Kärtchen, lege sie verdeckt auf den Tisch und finde die meisten Paare!'
      ],
      fr: [
        'Coloriez les deux impressions avec des couleurs identiques pour former des doubles parfaits.',
        'Collez les feuilles sur un carton foncé et opaque pour masquer la transparence.',
        'Tracez des carrés réguliers de 6 x 6 cm à la règle et découpez toutes les cartes.',
        'Retournez toutes les cartes face cachée sur la table et retrouvez un maximum de paires!'
      ]
    }
  },

  // 11. Gift Wrap & Tags / Cadeaupapier & Labels
  {
    icon: '🎁',
    tagKey: 'gift',
    difficultyKey: 'easy',
    time: '15 min',
    titles: {
      nl: 'Luxe Cadeauverpakking & Cadeaulabels',
      en: 'Designer Gift Wrap & Present Tags',
      de: 'Design-Geschenkpapier & Geschenkanhänger',
      fr: 'Emballage Cadeau & Étiquette Décorative'
    },
    descriptions: {
      nl: 'Geef een verjaardagscadeautje een unieke persoonlijke noot door {TITLE} te gebruiken als inpakpapier of decoratief naamlabeltje.',
      en: 'Give any gift an unforgettable handcrafted touch by using {TITLE} as personalized wrap or punch-out name tags.',
      de: 'Verpacke kleine Geschenke stilvoll mit {TITLE} oder schneide einen bezaubernden Namensanhänger aus.',
      fr: 'Emballez un petit présent avec {TITLE} ou découpez une superbe étiquette avec le prénom du destinataire.'
    },
    materials: {
      nl: ['Kleurplaat {TITLE}', 'Satijnen lint of touwtje', 'Perforator', 'Plakband'],
      en: ['{TITLE} coloring page', 'Satin ribbon or twine', 'Hole punch', 'Clear tape'],
      de: ['{TITLE} Malvorlage', 'Satinband oder Paketkordel', 'Locher', 'Klebeband'],
      fr: ['Coloriage {TITLE}', 'Ruban satiné ou ficelle', 'Perforatrice', 'Ruban adhésif']
    },
    steps: {
      nl: [
        'Kleur het ontwerp in met feestelijke kleuren zoals zilver, goud of pastel.',
        'Voor een klein cadeautje: wikkel de ingekleurde pagina strak rond het doosje en vouw de hoeken in.',
        'Voor een groot cadeau: knip een ovaal of rechthoekig label uit met de mooiste figuur en perforeer een gaatje.',
        'Schrijf op de achterkant voor wie het is en bind het label met een sierlijk lint aan het pakketje.'
      ],
      en: [
        'Color the illustration in celebratory festive shades (pastels, brights, or metallics).',
        'For small gifts: wrap the sheet directly around the box, creasing edges neatly with tape.',
        'For larger presents: trim the best character detail into a gift tag badge and punch a hole at the corner.',
        'Write a personalized note on the back and secure it to the package with ribbon.'
      ],
      de: [
        'Male das Motiv mit festlichen Farben und Mustern aus.',
        'Für kleine Geschenke: Wickle das Papier direkt um die Geschenkbox und fixiere die Ecken.',
        'Für große Pakete: Schneide einen Anhänger aus der Figur aus und stanze oben ein Loch hinein.',
        'Schreibe den Namen des Beschenkten auf die Rückseite und binde ihn mit einer Schleife fest.'
      ],
      fr: [
        'Coloriez la feuille avec des teintes festives et chaleureuses.',
        'Pour un petit cadeau: emballez directement la boîte dans la feuille coloriée.',
        'Pour un gros cadeau: découpez une étiquette ovale autour du motif et perforez-la.',
        'Écrivez un mot doux au verso et attachez l\'étiquette avec un ruban satiné.'
      ]
    }
  },

  // 12. Framed Gallery Art / Ingelijst Kunstwerk
  {
    icon: '🖼️',
    tagKey: 'art',
    difficultyKey: 'easy',
    time: '20 min',
    titles: {
      nl: 'Museumwaardige Muurkunst in Fotolijst',
      en: 'Framed Wall Gallery Masterpiece',
      de: 'Eingerahmtes Wand-Galeriebild',
      fr: 'Chef-d\'Œuvre Encadré pour Galerie Murale'
    },
    descriptions: {
      nl: 'Maak een professioneel passe-partout kader van gekleurd karton en hang je meesterwerk {TITLE} trots op in je slaapkamer of woonkamer.',
      en: 'Craft a custom mat border from contrasting paper and display your finished {TITLE} in a frame as certified gallery art.',
      de: 'Gestalte ein elegantes Passepartout aus Tonpapier und hänge dein fertiges {TITLE} stolz im Kinderzimmer auf.',
      fr: 'Créez un passe-partout sur mesure en papier de couleur pour exposer fièrement {TITLE} dans votre chambre.'
    },
    materials: {
      nl: ['Perfect ingekleurde {TITLE}', 'A4 fotolijst of groot gekleurd posterkarton (A3)', 'Lijm of fotoplakkers', 'Liniaal'],
      en: ['Completed {TITLE}', 'A4/Letter photo frame or large contrasting poster board', 'Photo corners or glue', 'Ruler'],
      de: ['Fertig ausgemaltes {TITLE}', 'A4 Bilderrahmen oder großer bunter Tonkarton', 'Fotokleber', 'Lineal'],
      fr: ['Coloriage {TITLE} achevé', 'Cadre photo A4 ou grande feuille de couleur A3', 'Coins photo ou colle', 'Règle']
    },
    steps: {
      nl: [
        'Kleur de kleurplaat met veel aandacht voor schaduwen en achtergrondaccenten.',
        'Neem een iets groter vel gekleurd karton in een complementaire tint als lijst of passe-partout.',
        'Centreer je kleurplaat precies in het midden van het karton en plak hem vast met fotoplakkers.',
        'Onderteken je kunstwerk rechtsonder met je voornaam en datum, en plaats het in een echte fotolijst aan de muur!'
      ],
      en: [
        'Color the full drawing with special attention to shading and contrasting accents.',
        'Choose a slightly larger sheet of colored cardstock in a contrasting accent color to act as a mat frame.',
        'Center the coloring sheet onto the backing card and mount it neatly with craft glue or photo tape.',
        'Sign and date your artwork in the bottom-right corner, then frame and display it proudly on the wall!'
      ],
      de: [
        'Male das Bild mit Schattierungen und feinen Kontrasten kunstvoll aus.',
        'Wähle einen etwas größeren Bogen Tonkarton in einer passenden Kontrastfarbe als Passepartout.',
        'Klebe deine Zeichnung zentriert auf den Tonkarton auf.',
        'Signiere dein Werk unten rechts mit deinem Namen und Datum und rahme es für die Wand ein!'
      ],
      fr: [
        'Coloriez le dessin avec soin en travaillant les nuances et les détails.',
        'Prenez une feuille de papier cartonné un peu plus grande pour former un cadre contrasté.',
        'Centrez votre dessin et fixez-le délicatement avec de la colle ou des pastilles adhésives.',
        'Signez et datez votre création en bas à droite, puis placez-la dans un vrai cadre au mur!'
      ]
    }
  }
];

export function getCraftIdeas(
  pageTitle: string,
  parentHub?: string,
  ageGroup?: string,
  lang: string = 'nl'
): CraftIdea[] {
  const effectiveLang = ['nl', 'en', 'de', 'fr'].includes(lang) ? lang : 'nl';

  return TEMPLATES.map((tpl, idx) => {
    const rawTitle = tpl.titles[effectiveLang] || tpl.titles['en'] || tpl.titles['nl'];
    const rawDesc = tpl.descriptions[effectiveLang] || tpl.descriptions['en'] || tpl.descriptions['nl'];
    const rawMaterials = tpl.materials[effectiveLang] || tpl.materials['en'] || tpl.materials['nl'];
    const rawSteps = tpl.steps[effectiveLang] || tpl.steps['en'] || tpl.steps['nl'];

    const title = rawTitle.replace(/{TITLE}/g, pageTitle);
    const description = rawDesc.replace(/{TITLE}/g, pageTitle);
    const materials = rawMaterials.map(m => m.replace(/{TITLE}/g, pageTitle));
    const steps = rawSteps.map(s => s.replace(/{TITLE}/g, pageTitle));

    const tagObj = TAGS[tpl.tagKey] || TAGS.craft;
    const diffObj = DIFFS[tpl.difficultyKey] || DIFFS.easy;

    return {
      number: idx + 1,
      icon: tpl.icon,
      title,
      tag: tagObj[effectiveLang] || tagObj['en'] || tagObj['nl'],
      difficulty: diffObj[effectiveLang] || diffObj['en'] || diffObj['nl'],
      estimatedTime: tpl.time,
      description,
      materials,
      steps
    };
  });
}
