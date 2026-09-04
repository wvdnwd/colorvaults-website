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

export interface CraftTemplate {
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

const HUB_TEMPLATES: Record<string, CraftTemplate[]> = {
  "animals-wildlife": [
    {
      "icon": "📦",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "3D Schoenendoos Safari & Jungle Diorama",
        "en": "3D Shoebox Wildlife Habitat Diorama",
        "de": "3D Schuhkarton Dschungel & Safari Diorama",
        "fr": "Diorama 3D Safari & Jungle en Boîte à Chaussures"
      },
      "descriptions": {
        "nl": "Tover een oude schoenendoos om tot een echt natuurpark of oerwoud voor je {TITLE} met echte takjes, bladeren en mos.",
        "en": "Transform an ordinary shoebox into a realistic wild habitat for {TITLE} using real twigs, pebbles, and moss.",
        "de": "Verwandle einen Schuhkarton in ein echtes Safari-Reservat für dein {TITLE} mit Ästen, Blättern und Moos.",
        "fr": "Transformez une boîte à chaussures en réserve naturelle pour votre {TITLE} avec brindilles, feuilles et mousse."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Lege schoenendoos",
          "Echte takjes en bladeren",
          "Lijm en kinderschaar"
        ],
        "en": [
          "Colored {TITLE}",
          "Empty shoebox",
          "Twigs and dry leaves",
          "Craft glue and scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Leerer Schuhkarton",
          "Äste und Naturmaterialien",
          "Kleber und Schere"
        ],
        "fr": [
          "{TITLE} colorié",
          "Boîte à chaussures vide",
          "Brindilles et feuilles séchées",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Schilder of beplak de binnenzijde van de schoenendoos met een blauwe lucht en groene heuvels.",
          "Kleur {TITLE} levendig in, knip de figuur uit en vouw een klein kartonnen lipje aan de onderkant.",
          "Lijm echte takjes, kiezels en mos op de bodem voor een realistische leefomgeving.",
          "Plak je {TITLE} rechtop in het midden en bewonder je eigen miniatuur natuurreservaat!"
        ],
        "en": [
          "Paint or line the inside of the shoebox with sky blue and rolling green plains.",
          "Color and cut out {TITLE}, leaving a 1-inch fold tab at the bottom to stand upright.",
          "Glue down real twigs, moss, and pebbles onto the floor to build a realistic terrain.",
          "Secure {TITLE} standing proudly in the habitat for an award-winning science project!"
        ],
        "de": [
          "Male das Innere des Kartons blau und grün als Himmel und Landschaft an.",
          "Schneide dein buntes {TITLE} aus und falte unten eine kleine Standlasche um.",
          "Klebe Zweige, Kiesel und Moos auf den Boden für eine echte Wildnis-Atmosphäre.",
          "Stelle {TITLE} aufrecht hinein und präsentiere dein eigenes Tiergehege!"
        ],
        "fr": [
          "Peignez le fond de la boîte pour représenter le ciel et la savane verdoyante.",
          "Découpez votre {TITLE} en laissant un onglet à la base pour le faire tenir debout.",
          "Collez de vraies brindilles et de la mousse au sol pour créer un décor naturel.",
          "Fixez {TITLE} au centre pour admirer votre réserve miniature!"
        ]
      }
    },
    {
      "icon": "🐾",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Geheime Pootafdrukken & Dieren Zoektocht",
        "en": "Animal Trackers & Footprint Trail Game",
        "de": "Tierspuren-Suchspiel & Entdeckerpfad",
        "fr": "Jeu de Piste des Traces d'Animaux Sauvages"
      },
      "descriptions": {
        "nl": "Knip pootafdrukken uit en creëer een spannend spoor door de woonkamer dat naar {TITLE} leidt.",
        "en": "Craft footprint stamps and lay out a playful scavenger trail across the living room leading to {TITLE}.",
        "de": "Schneide Pfotenabdrücke aus und lege eine abenteuerliche Fährte durch die Wohnung, die zu {TITLE} führt.",
        "fr": "Découpez des empreintes de pattes pour concevoir une piste secrète menant jusqu'à votre {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Kleurpapier of karton",
          "Schilderstape",
          "Kinderschaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Colored paper or cardstock",
          "Painter tape",
          "Safety scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Buntpapier",
          "Kreppband",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papier couleur",
          "Ruban adhésif doux",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en verstop deze op een geheime verstopplek in huis.",
          "Knip 8 tot 12 dierlijke pootafdrukken uit gekleurd papier.",
          "Plak de pootjes met een klein stukje schilderstape op de vloer als een speurtochtroute.",
          "Laat broertjes, zusjes of ouders het spoor volgen om de verrassing te ontdekken!"
        ],
        "en": [
          "Finish coloring {TITLE} and hide it in a secret hiding spot indoors.",
          "Cut out 8 to 12 paw prints or animal tracks from colored paper.",
          "Tape the tracks along the floor to form a fun detective scavenger trail.",
          "Invite family or friends to track the animal clues until they uncover {TITLE}!"
        ],
        "de": [
          "Male {TITLE} bunt aus und verstecke es an einem geheimen Ort im Haus.",
          "Schneide 8 bis 12 Pfotenspuren aus Papier aus.",
          "Befestige die Spuren mit Kreppband auf dem Boden als Fährte.",
          "Lass Freunde oder Geschwister der Spur folgen und das Tier aufspüren!"
        ],
        "fr": [
          "Coloriez {TITLE} et dissimulez-le dans une cachette secrète.",
          "Découpez 8 à 12 empreintes d'animaux dans du papier coloré.",
          "Disposez les empreintes sur le sol pour former un chemin de détective.",
          "Invitez vos proches à suivre la piste pour retrouver l'animal caché!"
        ]
      }
    },
    {
      "icon": "🦁",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Houten IJsstokjes Dierenmasker & Snuit",
        "en": "Animal Snout Mask on a Craft Stick",
        "de": "Holzstäbchen Tiermaske mit Schnauze",
        "fr": "Masque Museau d'Animal sur Bâtonnet"
      },
      "descriptions": {
        "nl": "Knip het gezicht van {TITLE} uit, bevestig snorharen van wol en houd het masker voor je gezicht met een houten stokje.",
        "en": "Cut out {TITLE}'s face, glue yarn whiskers, and hold it up as an adorable handheld photo booth mask.",
        "de": "Schneide das Gesicht von {TITLE} aus, klebe Woll-Schnurrhaare an und halte es vor dein Gesicht.",
        "fr": "Découpez le museau de {TITLE}, ajoutez des moustaches en fil et tenez votre masque devant vous."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton",
          "Wol of chenilledraad (snorharen)",
          "Houten ijsstokje of roerhoutje"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Cardboard backer",
          "Yarn or pipe cleaners (whiskers)",
          "Popsicle stick"
        ],
        "de": [
          "{TITLE} Malblatt",
          "Kartonverstärkung",
          "Wollfäden oder Pfeifenputzer",
          "Holzstab"
        ],
        "fr": [
          "Feuille {TITLE}",
          "Carton rigide",
          "Fils de laine (moustaches)",
          "Bâtonnet en bois"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kop en ogen van {TITLE} met expressieve kleuren.",
          "Plak het blad op stevig karton en knip de kop nauwkeurig uit.",
          "Plak kleine stukjes wol of chenilledraad aan weerszijden als levensechte snorharen.",
          "Bevestig een stevig ijsstokje aan de onderkant zodat je het masker voor je snoet kunt houden!"
        ],
        "en": [
          "Color the face features of {TITLE} with realistic or rainbow shades.",
          "Reinforce onto cardstock and cut cleanly around the snout contours.",
          "Glue yarn or pipe cleaner strands on both cheeks to mimic real animal whiskers.",
          "Attach a craft stick to the lower edge to create a photo prop for pretend play!"
        ],
        "de": [
          "Male die Kopfform von {TITLE} mit ausdrucksstarken Farben aus.",
          "Verstärke das Bild mit Karton und schneide die Umrisse sorgfältig aus.",
          "Befestige Wollfäden als Schnurrhaare an den Wangen.",
          "Klebe einen Holzstiel an die Rückseite und mache lustige Tierfotos!"
        ],
        "fr": [
          "Coloriez le visage de {TITLE} avec des teintes éclatantes.",
          "Collez sur du carton rigide et découpez le contour de la tête.",
          "Collez des brins de laine sur les joues pour former de vraies moustaches.",
          "Fixez un bâtonnet au bas pour tenir votre masque lors de jeux amusants!"
        ]
      }
    },
    {
      "icon": "🌿",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Natuur & Bladeren Vacht-Collage",
        "en": "Real Leaves & Botanicals Fur Collage",
        "de": "Echte Blätter & Natur-Fellcollage",
        "fr": "Collage Végétal en Feuilles d'Arbres & Mousse"
      },
      "descriptions": {
        "nl": "Verzamel gevallen bladeren in de tuin of het bos en plak ze als natuurlijke veren of vacht op {TITLE}.",
        "en": "Collect fallen autumn leaves, pine needles, or petals to texture {TITLE} with authentic wild textures.",
        "de": "Sammle bunte Herbstblätter und Blüten und beklebe {TITLE} mit echtem Blätter-Fell oder Federkleid.",
        "fr": "Ramassez de jolies feuilles mortes et pétales pour composer un pelage végétal sur {TITLE}."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Gedroogde herfstbladeren of bloemblaadjes",
          "Vloeibare knutsellijm",
          "Penseeltje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Pressed leaves or flower petals",
          "Liquid PVA glue",
          "Small brush"
        ],
        "de": [
          "{TITLE} Malvorlage",
          "Gepresste Blätter oder Blüten",
          "Flüssigkleber",
          "Klebe-Pinsel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Feuilles séchées ou pétales",
          "Colle liquide",
          "Pinceau"
        ]
      },
      "steps": {
        "nl": [
          "Ga naar buiten en verzamel mooie bladeren van verschillende formaten en herfstkleuren.",
          "Kleur het gezicht en de achtergrond van {TITLE} in met potloden.",
          "Smeer lijm op het lichaam en schik de bladeren dakpansgewijs alsof het schubben, veren of vacht zijn.",
          "Laat het kunstwerk een uurtje drogen onder een zwaar boek voor een prachtig botanisch schilderij."
        ],
        "en": [
          "Take a short outdoor walk to gather varied leaves, ferns, or colorful petals.",
          "Color the eyes, face, and sky around {TITLE} with colored pencils.",
          "Brush craft glue across the body and layer overlapping leaves to mimic fur, scales, or plumage.",
          "Press flat under a heavy book until dry to preserve an organic eco-art masterpiece!"
        ],
        "de": [
          "Mache einen Spaziergang und sammle bunte Blätter in verschiedenen Formen.",
          "Male Kopf und Details von {TITLE} mit Buntstiften sauber aus.",
          "Bestreiche den Körper mit Kleber und schichte die Blätter wie ein Feder- oder Schuppenkleid auf.",
          "Lasse das Naturkunstwerk trocknen und hänge es stolz an die Zimmerwand!"
        ],
        "fr": [
          "Promenez-vous pour ramasser de jolies feuilles dorées et texturées.",
          "Coloriez la tête et les détails fins de {TITLE}.",
          "Appliquez de la colle sur le corps et superposez les feuilles pour imiter le pelage ou les plumes.",
          "Laissez sécher à plat sous un livre lourd pour un tableau 100% naturel."
        ]
      }
    },
    {
      "icon": "🦚",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Wasknijper Klembeestje & Notitiehouder",
        "en": "Clothespin Snapping Critter & Memo Clip",
        "de": "Wäscheklammer Schnapp-Tier & Notizhalter",
        "fr": "Pince à Linge Animal & Porte-Mémo Amusant"
      },
      "descriptions": {
        "nl": "Plak {TITLE} doormidden op een houten wasknijper zodat de bek of vleugels openklappen als je erin knijpt!",
        "en": "Slice {TITLE} horizontally across its mouth and glue each half to a clothespin to make a snapping creature.",
        "de": "Klebe {TITLE} zweigeteilt auf eine Wäscheklammer, damit das Maul beim Zusammendrücken aufklappt!",
        "fr": "Collez {TITLE} coupé en deux sur une pince à linge pour que sa bouche s'ouvre d'un clic rigolo!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Houten wasknijper",
          "Knutsellijm",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Wooden clothespin",
          "Craft glue",
          "Scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "Holz-Wäscheklammer",
          "Bastelkleber",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Pince à linge en bois",
          "Colle forte",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de dierenkop of het dier van {TITLE} vrolijk in.",
          "Knip de figuur horizontaal precies doormidden waar de bek of kaken samenkomen.",
          "Plak de bovenste helft op de bovenkant van de wasknijperbek en het onderkaakje op de onderkant.",
          "Knijp in de wasknijper en kijk hoe {TITLE} hapgrage bewegingen maakt en briefjes kan vasthouden!"
        ],
        "en": [
          "Color the character illustration with bright vibrant markers.",
          "Cut the shape out, then make a horizontal slit exactly where the mouth or beak separates.",
          "Glue the upper head to the top prong of the clothespin and the lower jaw to the bottom prong.",
          "Pinch the clothespin to make {TITLE} chomp on notes, photos, or your fingers!"
        ],
        "de": [
          "Male den Tierkopf von {TITLE} bunt und freundlich an.",
          "Schneide die Figur waagerecht genau entlang der Mundlinie in zwei Teile.",
          "Klebe den oberen Kopf auf den oberen Klammerschenkel und das Kinn auf den unteren.",
          "Drücke die Klammer zusammen und bringe {TITLE} zum Schnappen!"
        ],
        "fr": [
          "Coloriez le motif animal avec des feutres vifs.",
          "Découpez la silhouette puis coupez-la horizontalement au niveau de la bouche.",
          "Collez la partie haute sur la mâchoire supérieure de la pince et le bas sur l'autre branche.",
          "Pincez pour voir {TITLE} ouvrir grand la bouche et tenir vos petits mots!"
        ]
      }
    },
    {
      "icon": "🐦",
      "tagKey": "decor",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Zwevende Plafond Dierenmobiel",
        "en": "Floating Ceiling Nursery Mobile",
        "de": "Schwebendes Tier-Mobile für die Decke",
        "fr": "Mobile Suspendu Animaux de la Forêt"
      },
      "descriptions": {
        "nl": "Kleur 3 tot 4 dierenfiguren rond {TITLE}, hang ze aan gekruiste satéstokjes en laat ze rustig rondzweven in de wind.",
        "en": "String multiple colored figures of {TITLE} onto crisscrossed sticks to craft a peaceful floating ceiling mobile.",
        "de": "Befestige mehrere {TITLE}-Motive an gekreuzten Holzstäbchen für ein wunderschön schwebendes Zimmer-Mobile.",
        "fr": "Suspendez plusieurs dessins de {TITLE} à des baguettes croisées pour bercer la chambre au gré de l'air."
      },
      "materials": {
        "nl": [
          "Meerdere afdrukken van {TITLE}",
          "2 houten satéstokjes of takjes",
          "Visdraad of touw",
          "Plakband"
        ],
        "en": [
          "Multiple prints of {TITLE}",
          "2 wooden dowels or craft sticks",
          "Clear thread or yarn",
          "Tape"
        ],
        "de": [
          "Mehrere {TITLE}-Bilder",
          "2 Holzspieße oder Zweige",
          "Garn oder Angelschnur",
          "Klebeband"
        ],
        "fr": [
          "Plusieurs impressions de {TITLE}",
          "2 baguettes en bois",
          "Fil transparent ou laine",
          "Adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de figuren aan beide zijden in of plak twee ingekleurde kanten rug-aan-rug tegen elkaar.",
          "Bind twee houtjes in het midden kruislings stevig aan elkaar vast met touw.",
          "Knoop aan elk uiteinde een draadje van verschillende lengte vast.",
          "Bevestig de diertjes aan de draadjes en hang de mobiel boven een bed of bij het raam."
        ],
        "en": [
          "Color front and back sheets identically and glue them back-to-back for double-sided designs.",
          "Tie two wooden dowels in an \"X\" shape firmly at the center with string.",
          "Tie hanging threads of varying lengths to the four stick arms.",
          "Tape your {TITLE} cutouts to the ends and suspend from the ceiling where gentle air can twirl them."
        ],
        "de": [
          "Male die Figuren doppelt aus und klebe sie Rücken an Rücken zusammen.",
          "Binde zwei Holzstäbchen kreuzförmig in der Mitte mit einer Kordel zusammen.",
          "Befestige an jedem Ende einen Faden mit unterschiedlicher Hängelänge.",
          "Klebe die Tiere an die Fäden und hänge das Mobile über den Schreibtisch!"
        ],
        "fr": [
          "Coloriez deux exemplaires et collez-les dos à dos pour un résultat réversible.",
          "Croisez deux baguettes en bois et nouez-les solidement en croix au centre.",
          "Attachez des fils de longueurs variées aux quatre extrémités.",
          "Fixez vos silhouettes de {TITLE} et suspendez le mobile près d'une fenêtre."
        ]
      }
    },
    {
      "icon": "🥣",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Versierde Voerbak & Huisdier Label",
        "en": "Personalized Pet Dish Placemat & Food Label",
        "de": "Personalisierte Napf-Unterlage & Futterlabel",
        "fr": "Set de Table pour Gamelle & Étiquette Friandises"
      },
      "descriptions": {
        "nl": "Maak een waterafstotende placemat voor onder de drink- of voerbak van je hond, kat of konijn met {TITLE}.",
        "en": "Laminate {TITLE} to create a wipe-clean feeding mat for your pet's water dish or food pantry jar.",
        "de": "Laminiere {TITLE} als abwischbare Unterlegmatte für den Fressnapf deines Haustiers.",
        "fr": "Plastifiez {TITLE} pour fabriquer un set de table étanche et adorable sous la gamelle de votre animal."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Zelfklevend transparant boekenfolie of lamineerhoes",
          "Schaar",
          "Waterdichte stift"
        ],
        "en": [
          "{TITLE} coloring page",
          "Clear contact paper or lamination pouch",
          "Scissors",
          "Waterproof marker"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Klarsicht-Klebefolie / Laminiergerät",
          "Schere",
          "Wasserfester Filzstift"
        ],
        "fr": [
          "Feuille {TITLE}",
          "Film adhésif transparent ou plastifieuse",
          "Ciseaux",
          "Feutre résistant à l'eau"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en schrijf de naam van je favoriete dier of huisdier met sierlijke letters erbij.",
          "Plak de voor- en achterkant strak tussen twee lagen zelfklevend plastic folie.",
          "Knip de randen netjes bij met een veilige rand van 1 centimeter folie rondom.",
          "Leg de mat onder de voer- of waterbak; geknoeide brokjes veeg je zo schoon met een doekje!"
        ],
        "en": [
          "Color the artwork and personalize it with your pet's name in large playful letters.",
          "Seal both sides tightly inside clear contact film or run through a laminator.",
          "Trim edges leaving a sealed 0.5-inch water-resistant clear border.",
          "Position under your pet's bowls to keep mealtime stylish and completely mess-free!"
        ],
        "de": [
          "Male das Motiv aus und schreibe den Namen deines Lieblingshaustiers groß dazu.",
          "Schütze das Bild beidseitig mit durchsichtiger Schutzfolie oder laminiere es ein.",
          "Schneide die Kanten mit etwas Überstand wasserdicht zu.",
          "Platziere die Matte unter dem Napf – Tropfen und Krümel lassen sich nun kinderleicht abwischen!"
        ],
        "fr": [
          "Coloriez le dessin et inscrivez le prénom de votre animal en lettres soignées.",
          "Recouvrez soigneusement les deux faces de film adhésif transparent protecteur.",
          "Découpez les bordures en gardant 1 cm de marge étanche tout autour.",
          "Glissez la nappe sous la gamelle: un coup d'éponge suffit désormais pour tout nettoyer!"
        ]
      }
    },
    {
      "icon": "🛂",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Dierenpaspoort & Ranger Expeditiepas",
        "en": "Official Wildlife Ranger Passport & Field Guide",
        "de": "Offizieller Tier-Reisepass & Ranger-Ausweis",
        "fr": "Passeport d'Explorateur & Guide de Terrain"
      },
      "descriptions": {
        "nl": "Vouw een heus natuurpaspoort waarin je feiten over {TITLE} noteert (gewicht, leefgebied, dieet) met je eigen officiële stempel.",
        "en": "Fold an authentic field guide passport tracking fun wildlife stats for {TITLE} like habitat, diet, and speed.",
        "de": "Falte einen Entdecker-Pass mit spannenden Steckbrief-Fakten zu {TITLE} (Nahrung, Lebensraum, Superkraft).",
        "fr": "Pliez un carnet d'explorateur pour consigner la fiche d'identité secrète de {TITLE} et ses anecdotes."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "A4 vouwblaadje of karton",
          "Stiften",
          "Stempelkussen of stickers"
        ],
        "en": [
          "Colored {TITLE}",
          "Folded cardstock sheet",
          "Markers",
          "Reward stickers or stamp pad"
        ],
        "de": [
          "Buntes {TITLE}-Bild",
          "Gefaltetes Tonpapier",
          "Buntstifte",
          "Stempel oder Aufkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Feuille pliée en livret",
          "Stylos",
          "Autocollants ou tampon"
        ]
      },
      "steps": {
        "nl": [
          "Vouw een vel stevig papier in vieren als een handzaam mini-paspoort.",
          "Knip de kop van {TITLE} uit en plak deze als officiële pasfoto op de binnenpagina.",
          "Schrijf leuke weetjes op: wat eet dit dier, waar slaapt het en hoe snel kan het rennen of vliegen?",
          "Zet met een muntje of stift je eigen officiële \"Natuurwachter\" stempel erbij!"
        ],
        "en": [
          "Fold a blank piece of paper into four quarters to build a pocket-sized field booklet.",
          "Trim {TITLE}'s portrait into a square and glue it in as the official photo ID.",
          "Fill in species details: natural habitat, favorite foods, sound it makes, and lifespan.",
          "Stamp with a gold star or sticker to certify your official wildlife discovery badge!"
        ],
        "de": [
          "Falte ein Blatt Papier zweimal, sodass ein handliches Pass-Heftchen entsteht.",
          "Schneide das Porträt von {TITLE} wie ein echtes Passbild aus und klebe es hinein.",
          "Notiere wissenswerte Fakten: Lieblingsessen, Höchstgeschwindigkeit und Lebensraum.",
          "Stemple den Ausweis mit deinem eigenen Ranger-Siegel ab!"
        ],
        "fr": [
          "Pliez une feuille de papier en quatre pour créer un livret de poche authentique.",
          "Découpez la tête de {TITLE} au format photo d'identité et collez-la à l'intérieur.",
          "Inscrivez les faits captivants: alimentation, habitat naturel et cri de l'animal.",
          "Apposez un tampon ou une étoile pour valider votre statut d'explorateur officiel!"
        ]
      }
    },
    {
      "icon": "🧩",
      "tagKey": "game",
      "difficultyKey": "medium",
      "time": "20 min",
      "titles": {
        "nl": "DIY Dieren Legpuzzel op Karton",
        "en": "Cardboard Animal Habitat Jigsaw Puzzle",
        "de": "Karton Tier-Puzzle mit Naturformen",
        "fr": "Puzzle Animalier Découpé sur Carton"
      },
      "descriptions": {
        "nl": "Plak je ingekleurde {TITLE} op stevig karton en knip grillige puzzelstukjes voor een spannend puzzelspel.",
        "en": "Mount your completed {TITLE} on rigid cardboard and cut organic interlocking pieces for puzzle challenges.",
        "de": "Klebe dein fertig buntes {TITLE} auf dicken Karton und schneide geschwungene Puzzleteile aus.",
        "fr": "Collez votre dessin {TITLE} sur du carton épais pour créer un puzzle robuste à reconstituer."
      },
      "materials": {
        "nl": [
          "Volledig ingekleurde {TITLE}",
          "Karton van ontbijtgranendoos",
          "Potlood en liniaal",
          "Schaar"
        ],
        "en": [
          "Finished {TITLE}",
          "Cereal box cardboard",
          "Pencil and ruler",
          "Scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Fester Karton",
          "Bleistift",
          "Schere"
        ],
        "fr": [
          "Coloriage {TITLE}",
          "Carton de boîte de céréales",
          "Crayon à papier",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Plak je ingekleurde plaat glad en strak op het karton met een lijmstift.",
          "Teken op de blanco achterkant een raster van 15 tot 20 speelse puzzelstukjes.",
          "Knip alle stukjes zorgvuldig los langs de potloodlijnen.",
          "Schud de stapel door elkaar en kijk hoe snel jij {TITLE} weer in elkaar zet!"
        ],
        "en": [
          "Glue your completed art smoothly onto clean flat cardboard with a glue stick.",
          "Sketch 16 to 24 puzzle shapes with interlocking knobs on the reverse blank side.",
          "Carefully cut along every line with sharp scissors.",
          "Mix up all the tiles and race the clock to rebuild {TITLE}!"
        ],
        "de": [
          "Klebe das fertige Kunstwerk glatt auf den Karton und lasse es kurz anziehen.",
          "Zeichne auf die Rückseite 16 geschwungene Puzzleteile mit Halterungen.",
          "Schneide alle Teile mit der Schere vorsichtig auseinander.",
          "Mische alle Teile und stoppe die Zeit beim Wiederaufbau von {TITLE}!"
        ],
        "fr": [
          "Collez soigneusement la feuille sur le carton à l'aide d'un bâton de colle.",
          "Tracez au verso 16 à 20 pièces emboîtables au crayon.",
          "Découpez méticuleusement chaque pièce le long des traits.",
          "Mélangez le tout et chronométrez-vous pour reconstituer {TITLE}!"
        ]
      }
    },
    {
      "icon": "✨",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Zonsondergang Dieren Raamhanger",
        "en": "Safari Sunset Stained Glass Suncatcher",
        "de": "Sonnenuntergang Buntglas-Fensterbild",
        "fr": "Attrape-Soleil Vitrail Coucher de Soleil Sauvage"
      },
      "descriptions": {
        "nl": "Kleur de achtergrond als een warme Afrikaanse savanne en maak het papier doorschijnend met een drupje babyolie voor het raam.",
        "en": "Color a glowing golden sunset and make paper translucent with baby oil to illuminate on sunny windows.",
        "de": "Gestalte einen leuchtenden Savannen-Himmel und mache das Papier mit Babyöl durchscheinend.",
        "fr": "Créez un coucher de soleil chaleureux et appliquez une goutte d'huile pour faire briller la lumière à travers la vitre."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Wasco of stiften",
          "Een druppel babyolie",
          "Wattenstaafje en plakband"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Wax crayons or markers",
          "A drop of baby oil",
          "Cotton swab and tape"
        ],
        "de": [
          "{TITLE} Bild",
          "Wachsmalstifte",
          "Ein Tropfen Babyöl",
          "Wattestäbchen & Klebeband"
        ],
        "fr": [
          "Coloriage {TITLE}",
          "Craies grasses ou feutres",
          "Une goutte d'huile douce",
          "Coton-tige et adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Gebruik warme tinten zoals geel, oranje en dieprood om de lucht rond {TITLE} in te kleuren.",
          "Wrijf met een wattenstaafje lichtjes babyolie over de achterzijde van het papier.",
          "Dep overtollige olie droog met keukenpapier; de tekening licht direct magisch op!",
          "Plak het blad met plakband tegen het raam en bewonder de stralende zonsopkomst."
        ],
        "en": [
          "Fill in bold sunset shades of amber, fiery orange, and crimson behind {TITLE}.",
          "Dab a cotton swab in a tiny drop of baby oil and blend across the reverse side.",
          "Wipe clean with a paper napkin; the paper transforms into vibrant stained glass!",
          "Stick it on a sun-drenched window to glow every single morning."
        ],
        "de": [
          "Male den Himmel hinter {TITLE} in warmen Rot-, Orange- und Gelbtönen an.",
          "Verstreiche vorsichtig etwas Öl mit einem Wattestäbchen auf der Blattrückseite.",
          "Tupfe überschüssiges Öl mit Küchenkrepp trocken – das Papier wird transparent!",
          "Befestige es am Fenster und freue dich über das strahlende Sonnenlicht."
        ],
        "fr": [
          "Coloriez le ciel avec un dégradé flamboyant de jaune, orange et carmin.",
          "Étalez une noisette d'huile au dos de la feuille avec un coton-tige.",
          "Absorbez le surplus avec un essuie-tout: le papier devient translucide comme du verre!",
          "Collez sur la fenêtre pour observer les reflets dorés sous le soleil."
        ]
      }
    },
    {
      "icon": "🔖",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Dierenoren Boekenlegger met Kwastje",
        "en": "Animal Ears Bookmark with Wool Tassel",
        "de": "Tierohren-Lesezeichen mit Fransenschwanz",
        "fr": "Marque-Page Oreilles d'Animaux & Queue en Laine"
      },
      "descriptions": {
        "nl": "Knip een rechthoekige strook met de kop van {TITLE}, laat de oortjes boven de bladzijde uitsteken en voeg een wollen staartje toe.",
        "en": "Snip a sturdy bookmark featuring {TITLE}'s perky ears popping over your book pages with a yarn tail.",
        "de": "Bastle ein lustiges Lesezeichen, bei dem die Ohren von {TITLE} frech aus dem Buch hervorlugen.",
        "fr": "Découpez un marque-page rigide où les oreilles de {TITLE} dépassent joyeusement du livre."
      },
      "materials": {
        "nl": [
          "Gekleurde strook van {TITLE}",
          "Stevig knutselkarton",
          "Perforator",
          "Stukje wol"
        ],
        "en": [
          "Colored strip from {TITLE}",
          "Cardstock backer",
          "Hole punch",
          "Piece of yarn"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Tonkarton",
          "Locher",
          "Wollfaden"
        ],
        "fr": [
          "Bande découpée de {TITLE}",
          "Carton fort",
          "Perforatrice",
          "Fil de laine"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kop en de oren van {TITLE} in met mooie contrasten.",
          "Knip een strook van 5 bij 15 cm uit, maar knip zorgvuldig rond de oortjes zodat ze boven de strook uitsteken.",
          "Plak de strook op gekleurd karton en maak onderaan een gaatje met de perforator.",
          "Knoop een vrolijk wollen draadje als dierenstaartje door het gaatje!"
        ],
        "en": [
          "Color {TITLE}'s face and upright ears with vibrant shades.",
          "Trim into a 2x6 inch bookmark strip, carefully keeping the ears contoured above the top edge.",
          "Glue onto cardstock and punch a neat hole at the base.",
          "Loop a fluffy piece of yarn through to represent a soft dangling tail."
        ],
        "de": [
          "Male Gesicht und Ohren von {TITLE} kräftig aus.",
          "Schneide einen 5x15 cm Streifen zu, bei dem die Ohren oben als Kontur herausragen.",
          "Klebe den Streifen auf Tonpapier und loche das untere Ende.",
          "Knote einen bunten Wollfaden als Quastenschwanz hinein!"
        ],
        "fr": [
          "Coloriez le museau et les oreilles de {TITLE} avec application.",
          "Découpez une bande de 5 x 15 cm en laissant les oreilles dépasser au sommet.",
          "Collez sur un carton rigide et perforez la base de la bande.",
          "Nouez un fil de laine duveteux pour figurer une petite queue amusante!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Ingelijst Natuurportret voor de Slaapkamer",
        "en": "Framed Wildlife Portrait & Wall Art",
        "de": "Gerahmtes Natur-Porträt für das Kinderzimmer",
        "fr": "Portrait Animalier Encadré pour la Chambre"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een stijlvol passe-partout kader van kraftpapier en hang het trots aan de muur van je slaapkamer.",
        "en": "Craft an earthy wood-toned mat border and display {TITLE} proudly as verified nature gallery artwork.",
        "de": "Gestalte ein Passepartout aus naturbraunem Papier und hänge {TITLE} gerahmt an die Zimmerwand.",
        "fr": "Créez un passe-partout en papier kraft pour mettre en valeur {TITLE} dans un vrai cadre au mur."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "A4 fotolijst of bruin kraftkarton",
          "Fotoplakkers of lijm",
          "Fineliner voor handtekening"
        ],
        "en": [
          "Finished artwork of {TITLE}",
          "A4/Letter photo frame or kraft cardstock",
          "Glue or tape corners",
          "Pen for signature"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "A4 Bilderrahmen oder Kraftpapier",
          "Fotokleber",
          "Kugelschreiber für Signatur"
        ],
        "fr": [
          "Dessin achevé de {TITLE}",
          "Cadre A4 ou carton kraft",
          "Pastilles adhésives",
          "Stylo fin pour signature"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de hele tekening zorgvuldig af met oog voor schaduw en achtergronddetails.",
          "Snijd of knip een contrasterend kader uit stevig kraftpapier of gekleurd karton.",
          "Plak je kleurplaat precies in het midden van de achterwand.",
          "Zet rechtsonder je handtekening en datum met een fineliner, plaats in de lijst en hang hem op!"
        ],
        "en": [
          "Finish coloring the entire page paying attention to background textures and gentle shading.",
          "Cut a mat border from earthy brown kraft paper or forest green cardstock.",
          "Mount the finished coloring sheet centered on your backing board.",
          "Sign and date the bottom-right corner like a real professional wildlife illustrator and frame it!"
        ],
        "de": [
          "Male die Szene bis in die Ecken mit harmonischen Farbtönen aus.",
          "Schneide einen schicken Rahmen aus Tonpapier zurecht.",
          "Klebe das Meisterwerk mittig auf das Passepartout auf.",
          "Setze deine Künstlersignatur mit Datum in die Ecke und hänge das Bild im Rahmen auf!"
        ],
        "fr": [
          "Appliquez-vous à peaufiner les ombres et les éléments de décor environnants.",
          "Découpez un cadre élégant dans du papier cartonné ou kraft naturel.",
          "Fixez votre création parfaitement centrée au dos du cadre.",
          "Signez fièrement de votre prénom et de la date dans le coin inférieur avant d'accrocher!"
        ]
      }
    }
  ],
  "vehicles-transportation": [
    {
      "icon": "🏎️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "3D Kartonnen Racebaan & Verkeersparcours",
        "en": "Cardboard Raceway & Traffic Track",
        "de": "Karton-Rennstrecke & Verkehrsparcours",
        "fr": "Circuit de Course & Piste Routière en Carton"
      },
      "descriptions": {
        "nl": "Teken wegen, zebrapaden en bochten op een opengevouwen doos en laat je ingekleurde {TITLE} eroverheen racen!",
        "en": "Map asphalt roads, lane markings, and pit stops on flattened cardboard for {TITLE} to zoom through!",
        "de": "Zeichne Fahrspuren, Zebrastreifen und Kurven auf einen Karton und starte das Rennen mit {TITLE}!",
        "fr": "Tracez des routes, virages et parkings sur un grand carton pour faire rouler votre {TITLE}!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Grote platte kartonnen doos",
          "Zwarte stift en wit krijtje",
          "Kinderschaar en lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large cardboard box",
          "Black marker and white crayon",
          "Scissors and glue"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Großer flacher Karton",
          "Schwarzer Marker & weiße Kreide",
          "Schere & Kleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grand carton plat",
          "Feutre noir et craie blanche",
          "Ciseaux et colle"
        ]
      },
      "steps": {
        "nl": [
          "Kleur en knip {TITLE} uit en plak de wielen op een klein kartonnen vouwvoetje zodat hij rechtop kan staan.",
          "Teken met een zwarte stift kronkelende straten, kruispunten en parkeervakken op het grote karton.",
          "Teken met een wit krijtje stippellijnen en zebrapaden op het zwarte wegdek.",
          "Plaats verkeersborden langs de weg en stuur je {TITLE} met gierende banden door de bochten!"
        ],
        "en": [
          "Color and cut out {TITLE}, folding a cardboard stand tab beneath so it glides upright.",
          "Draw winding roads, intersections, and parking spots on the flattened box using a black marker.",
          "Use a white crayon or chalk to mark lane dividers, crosswalks, and finish lines.",
          "Zoom your {TITLE} along the highway and build roadside pit stops!"
        ],
        "de": [
          "Schneide dein ausgemaltes {TITLE} aus und bringe unten eine kleine Standlasche an.",
          "Zeichne mit schwarzem Stift Straßen, Kreisverkehre und Parkplätze auf den Karton.",
          "Male weiße Fahrbahnmarkierungen und Ziellinien mit Kreide auf den Asphalt.",
          "Lass dein {TITLE} über die Rennstrecke sausen!"
        ],
        "fr": [
          "Découpez votre {TITLE} colorié et ajoutez une languette dessous pour le faire glisser debout.",
          "Tracez au feutre des routes sinueuses, des ronds-points et des zones d'arrêt.",
          "Dessinez les lignes blanches et les passages piétons à la craie.",
          "Faites vrombir {TITLE} sur votre nouveau circuit de compétition!"
        ]
      }
    },
    {
      "icon": "🛞",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "Rijdend Wagentje met Flessendoppen & Assen",
        "en": "Rolling Vehicle with Bottle Cap Wheels",
        "de": "Rollendes Fahrzeug mit Flaschendeckel-Rädern",
        "fr": "Véhicule Roulant avec Roues en Bouchons de Bouteille"
      },
      "descriptions": {
        "nl": "Monteer {TITLE} op een wc-rolletje met satéprikkers en flessendoppen zodat het voertuig écht over de vloer kan rijden.",
        "en": "Mount {TITLE} onto a cardboard tube with skewer axles and plastic bottle caps to create a real rolling toy car.",
        "de": "Baue {TITLE} auf eine Klorolle mit Spieß-Achsen und Schraubdeckeln, damit es wirklich über den Teppich saust.",
        "fr": "Montez {TITLE} sur un rouleau cartonné avec essieux en piques à brochette et roues qui tournent pour de vrai."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Wc-rolletje",
          "4 plastic flessendoppen",
          "2 houten satéstokjes en rietjes"
        ],
        "en": [
          "Colored {TITLE}",
          "Toilet paper roll",
          "4 plastic bottle caps",
          "2 wooden skewers and drinking straws"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Papprolle",
          "4 Flaschendeckel",
          "2 Holzspieße und Trinkhalme"
        ],
        "fr": [
          "{TITLE} colorié",
          "Rouleau de papier toilette",
          "4 bouchons en plastique",
          "2 piques en bois et pailles"
        ]
      },
      "steps": {
        "nl": [
          "Plak twee stukjes rietje dwars onderaan de wc-rol als lagerbuisjes.",
          "Steek de houten satéstokjes door de rietjes voor de voor- en achteras.",
          "Prik met behulp van een volwassene een gaatje in de 4 flessendoppen en druk ze klem op de as-uiteinden.",
          "Plak de zijkanten van je ingekleurde {TITLE} op de rol en geef hem een duwtje over de vloer!"
        ],
        "en": [
          "Tape two drinking straw segments underneath the cardboard tube to serve as axle sleeves.",
          "Slide wooden skewers through both straws to form working front and back wheel axles.",
          "With adult help, pierce holes through 4 bottle caps and push them securely onto the axle ends.",
          "Glue {TITLE} to the chassis and test-drive your rolling vehicle across the room!"
        ],
        "de": [
          "Klebe zwei Halmstücke quer unter die Papprolle als Achsenführung.",
          "Schiebe die Holzspieße durch die Halme für die Vorder- und Hinterachse.",
          "Lass von einem Erwachsenen Löcher in 4 Deckel bohren und stecke sie als Räder fest.",
          "Klebe dein ausgemaltes {TITLE} auf das Fahrgestell und rolle los!"
        ],
        "fr": [
          "Collez deux morceaux de paille sous le rouleau pour guider les essieux.",
          "Glissez les piques en bois dans les pailles pour créer les essieux avant et arrière.",
          "Percez 4 bouchons de bouteille et enfilez-les pour faire les 4 roues motrices.",
          "Collez votre dessin {TITLE} sur le dessus et lancez votre bolide à toute vitesse!"
        ]
      }
    },
    {
      "icon": "🚦",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Verkeersborden & Rijbewijs Speelset",
        "en": "Mini Traffic Signs & Drivers License Play Set",
        "de": "Mini-Verkehrsschilder & Kinder-Führerschein",
        "fr": "Panneaux de Signalisation & Permis de Conduire"
      },
      "descriptions": {
        "nl": "Knutsel stopborden en verkeerslichten op ijsstokjes en slaag voor je officiële verkeersexamen met {TITLE}.",
        "en": "Craft stop signs and traffic lights on craft sticks and test your driving rules with {TITLE}.",
        "de": "Bastle Stoppschilder und Ampeln auf Holzstäbchen und meistere deine Fahrprüfung mit {TITLE}.",
        "fr": "Fabriquez des feux tricolores et des panneaux stop pour passer votre permis junior avec {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Karton of bierviltjes",
          "IJsstokjes",
          "Rode, gele en groene stiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Cardboard",
          "Popsicle sticks",
          "Red, yellow, and green markers"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Pappe",
          "Holzstäbchen",
          "Ampelfarben-Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton",
          "Bâtonnets en bois",
          "Feutres rouge, orange, vert"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en knip een klein rechthoekig \"Rijbewijs\" kaartje met je pasfoto.",
          "Teken een achthoekig STOP-bord en een driekleurig verkeerslicht op karton.",
          "Plak de verkeersborden op houten stokjes en steek ze in bolletjes klei zodat ze rechtop staan.",
          "Rijd met {TITLE} over de tafel en stop netjes voor rood licht!"
        ],
        "en": [
          "Color {TITLE} and draw a personalized pocket driver's license with your name.",
          "Cut an octagon STOP sign and a vertical traffic light from stiff cardboard.",
          "Mount each sign onto a craft stick and press into playdough bases to stand firmly.",
          "Drive {TITLE} through your indoor traffic test obeying every single road sign!"
        ],
        "de": [
          "Male {TITLE} aus und fülle einen Miniatur-Führerschein mit deinem Namen aus.",
          "Zeichne ein rotes Stoppschild und eine Ampel auf Tonpapier.",
          "Klebe die Schilder auf Stäbchen und stecke sie in Knetmasse als Sockel.",
          "Fahre mit {TITLE} durch den Raum und befolge alle Verkehrsregeln!"
        ],
        "fr": [
          "Coloriez {TITLE} et préparez un petit permis de conduire personnalisé.",
          "Dessinez un panneau STOP octogonal et un feu de signalisation.",
          "Fixez-les sur des bâtonnets plantés dans de la pâte à modeler.",
          "Faites circuler {TITLE} en respectant scrupuleusement la priorité et les feux rouges!"
        ]
      }
    },
    {
      "icon": "⛽",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "25 min",
      "titles": {
        "nl": "DIY Kartonnen Tankstation & Wasstraat",
        "en": "Toy Car Wash & Gas Station Pump",
        "de": "Spielzeug-Tankstelle & Autowaschanlage",
        "fr": "Station-Service & Portique de Lavage en Carton"
      },
      "descriptions": {
        "nl": "Bouw een tankstation met een rietje als brandstofslang en hangende lintjes als wasborstels voor {TITLE}.",
        "en": "Craft a refueling station with yarn fuel hoses and hanging felt car-wash brushes for {TITLE}.",
        "de": "Baue eine Zapfsäule mit einem Schlauch und Flatterstreifen-Waschbürsten für {TITLE}.",
        "fr": "Concevez une station d'essence avec tuyau souple et rouleaux de lavage pour bichonner {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Klein doosje (bv. hagelslag of thee)",
          "Touw of rietje (tankslang)",
          "Repen crêpepapier"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Small cardboard box",
          "Yarn or flexible straw (fuel hose)",
          "Felt or paper strips"
        ],
        "de": [
          "{TITLE} Malblatt",
          "Kleine Schachtel",
          "Schnur oder Strohhalm",
          "Krepppapier-Streifen"
        ],
        "fr": [
          "Feuille {TITLE}",
          "Petite boîte en carton",
          "Cordon ou paille flexible",
          "Lanières de papier crépon"
        ]
      },
      "steps": {
        "nl": [
          "Beplak een klein doosje met papier en schrijf \"BRANDSTOF / ELEKTRO\" op de voorkant.",
          "Bevestig een rietje of touwtje aan de zijkant als tankpistool om {TITLE} vol te tanken.",
          "Knip een boogpoort uit en hang stroken crêpepapier als automatische wasborstels.",
          "Rijd je voertuig door de wasstraat en glim over de boulevard!"
        ],
        "en": [
          "Cover a small pantry box in clean paper and label it \"FAST FUEL & CHARGING\".",
          "Fasten a flexible straw or cord on the side to serve as your handheld fuel nozzle.",
          "Cut an entrance archway and hang fringe paper strips as spinning cleaning rollers.",
          "Roll {TITLE} in for a complete wash, wax, and full tank before your next big trip!"
        ],
        "de": [
          "Beklebe eine kleine Schachtel und beschrifte sie als Tank- und Ladestation.",
          "Befestige einen Trinkhalm als Tankschlauch an der Seite.",
          "Schneide ein Torportal aus und hänge bunte Papierstreifen als Waschwalzen auf.",
          "Fahre dein {TITLE} zur Inspektion und lasse es blitzsauber waschen!"
        ],
        "fr": [
          "Recouvrez une boîte pour créer une borne de recharge moderne.",
          "Fixez une paille flexible en guise de pistolet de ravitaillement.",
          "Découpez une arche et suspendez des bandelettes pour créer les rouleaux de lavage.",
          "Faites passer {TITLE} au lavage pour le rendre brillant comme un sou neuf!"
        ]
      }
    },
    {
      "icon": "🏁",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Zwart-Witte Finishvlag & Seinvlaggen",
        "en": "Grand Prix Checkered Finish Flag",
        "de": "Schwarz-Weiß Karierte Zielflagge",
        "fr": "Drapeau à Damiers de Victoire Grand Prix"
      },
      "descriptions": {
        "nl": "Knip {TITLE} uit als kampioensembleem en plak hem in het hart van een echte zwart-witte race-finishvlag.",
        "en": "Mount {TITLE} in the center of a bold checkered pennant flag to wave at the finish line.",
        "de": "Klebe dein {TITLE} mitten auf eine karierte Zielflagge zum echten Siegerjubel.",
        "fr": "Collez {TITLE} au centre d'un drapeau à damier pour célébrer la victoire sur la ligne d'arrivée."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "A4 wit papier",
          "Zwarte stift en liniaal",
          "Houten stokje of rietje"
        ],
        "en": [
          "{TITLE} coloring page",
          "White paper sheet",
          "Black marker and ruler",
          "Wooden stick or straw"
        ],
        "de": [
          "{TITLE} Malvorlage",
          "Weißes Papier",
          "Schwarzer Filzstift & Lineal",
          "Holzstab"
        ],
        "fr": [
          "Coloriage {TITLE}",
          "Feuille blanche",
          "Feutre noir et règle",
          "Bâtonnet support"
        ]
      },
      "steps": {
        "nl": [
          "Teken met liniaal een dambordpatroon van vierkantjes op een wit A4-vel en kleur ze om en om zwart in.",
          "Kleur de auto of het voertuig van {TITLE} met vurige racekleuren.",
          "Knip het voertuig uit en plak het pontificaal in het midden van de vlag.",
          "Plak de vlag aan een houten stokje en zwaai ermee bij de overwinning!"
        ],
        "en": [
          "Rule a grid of 1-inch squares and fill alternating boxes black to form a checkered pattern.",
          "Color {TITLE} with blazing neon speed colors and cut out its silhouette.",
          "Paste the racing machine in the center of your checkered banner.",
          "Fasten onto a wooden dowel and wave it triumphantly as you take 1st place!"
        ],
        "de": [
          "Zeichne ein Karomuster mit dem Lineal und male jedes zweite Quadrat schwarz aus.",
          "Male {TITLE} in rasanten Rennfarben an und schneide es aus.",
          "Platziere dein Fahrzeug stolz in der Mitte des Flaggenmusters.",
          "Befestige die Fahne an einem Stöckchen und schwenke sie am Zielstrich!"
        ],
        "fr": [
          "Tracez un quadrillage à la règle et noircissez une case sur deux pour créer le damier.",
          "Coloriez {TITLE} avec des teintes dynamiques et découpez-le.",
          "Collez l'engin au centre du drapeau de compétition.",
          "Fixez sur une baguette pour agiter le drapeau du champion!"
        ]
      }
    },
    {
      "icon": "🎫",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Kaartjes Knippen: Conducteur & Passagiers",
        "en": "Punch-Out Transit Tickets & Conductor Badge",
        "de": "Fahrkarten-Lochspiel & Schaffner-Ausweis",
        "fr": "Billets de Transport Poinçonnés & Rôle de Conducteur"
      },
      "descriptions": {
        "nl": "Print kaartjes voor {TITLE}, knip ze in strookjes en gebruik een perforator om echte gaatjes te knippen als conducteur.",
        "en": "Print personalized passenger boarding passes for {TITLE} and punch them with a hole puncher.",
        "de": "Drucke Tickets für {TITLE}, loche sie mit einem Locher und spiele Eisenbahn- oder Bus-Schaffner.",
        "fr": "Préparez des tickets de voyage pour {TITLE} et perforez-les comme un vrai contrôleur de train."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Gekleurd papier",
          "Perforator of gaatjestang",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Colored paper",
          "Hole punch",
          "Scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Buntpapier",
          "Locher",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papier couleur",
          "Perforatrice",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de ramen en passagiers van {TITLE} zorgvuldig in.",
          "Knip 6 rechthoekige instapkaartjes uit met prijzen en bestemmingen.",
          "Plak een rond badge-figuurtje op je borst met de tekst \"HOOFDCONDUCTEUR\".",
          "Vraag je passagiers om hun kaartje en knip er met de perforator een gaatje in!"
        ],
        "en": [
          "Color passengers and driver details inside {TITLE}.",
          "Cut 6 rectangular boarding tickets marked with fun destinations and seat numbers.",
          "Craft an official \"CHIEF CONDUCTOR\" inspector badge to pin onto your shirt.",
          "Collect tickets from your travelers and clip them with the hole puncher!"
        ],
        "de": [
          "Male die Details und Passagiere von {TITLE} bunt aus.",
          "Schneide 6 Fahrkarten mit Reisezielen und Preisen zurecht.",
          "Mache dir einen Schaffner-Anstecker für dein T-Shirt.",
          "Kontrolliere die Fahrscheine und stanze mit dem Locher Löcher hinein!"
        ],
        "fr": [
          "Coloriez les détails du véhicule et de son habitacle.",
          "Découpez 6 tickets de voyage avec destinations insolites.",
          "Fabriquez un badge de \"CONTRÔLEUR EN CHEF\" à épingler.",
          "Demandez les billets à vos passagers et perforez-les avant le départ!"
        ]
      }
    },
    {
      "icon": "✈️",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "3D Zweefvliegtuigje van Wasknijper & Karton",
        "en": "Clothespin Aeroplane with Cardboard Wings",
        "de": "Wäscheklammer-Flugzeug mit Kartonflügeln",
        "fr": "Avion Biplan en Pince à Linge & Ailes Carton"
      },
      "descriptions": {
        "nl": "Bouw een aerodynamisch zweefvliegtuigje rond een wasknijper met vleugels uit je ingekleurde {TITLE}.",
        "en": "Transform a wooden clothespin into a soaring biplane with wings trimmed from {TITLE}.",
        "de": "Baue aus einer Holzkappe und Flügeln von {TITLE} einen echten Doppeldecker-Flieger.",
        "fr": "Assemblez un biplan miniature avec une pince à linge et les ailes décorées de {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Houten wasknijper",
          "IJsstokjes of stevig karton",
          "Lijmpistool of hobbylijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Wooden clothespin",
          "Popsicle sticks or cardstock",
          "Craft glue"
        ],
        "de": [
          "{TITLE} Bild",
          "Wäscheklammer",
          "Eisstiele oder Karton",
          "Bastelkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Pince à linge",
          "Bâtonnets ou carton",
          "Colle forte"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de patronen op {TITLE} en knip twee vleugels en een kleine staartvin uit.",
          "Plak één vleugel bovenop de wasknijper en één aan de onderkant voor een dubbeldekker.",
          "Bevestig de staartvin aan het achterste uiteinde.",
          "Houd de knijper vast en laat je vliegtuig spectaculaire loopings maken door de kamer!"
        ],
        "en": [
          "Color rich aerodynamic designs on {TITLE} and cut out wing and tail fins.",
          "Glue one craft stick across the top of the clothespin and one below to form a classic biplane.",
          "Glue the tail rudder securely at the rear tip.",
          "Swoop your hand through the air performing barrel rolls and loop-the-loops!"
        ],
        "de": [
          "Male die Tragflächen von {TITLE} mit schnittigen Mustern aus.",
          "Klebe einen Flügel oben und einen unten auf die Klammer für den Doppeldecker-Look.",
          "Bringe das kleine Leitwerk am hinteren Ende an.",
          "Fliege Kunststücke und Loopings quer durch das Wohnzimmer!"
        ],
        "fr": [
          "Coloriez les ailes de {TITLE} avec des motifs vifs et aérodynamiques.",
          "Collez une aile sur le dessus de la pince et une dessous pour former un biplan.",
          "Ajoutez le petit aileron arrière sur la queue de la pince.",
          "Faites planer votre création en réalisant des loopings aériens!"
        ]
      }
    },
    {
      "icon": "🚢",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Drijvend Bad- & Vijverbootje van Kurk",
        "en": "Floating Cork Raft & Sailboat for the Tub",
        "de": "Schwimmendes Korken-Segelboot für die Wanne",
        "fr": "Bateau Flottant en Liège pour le Bain"
      },
      "descriptions": {
        "nl": "Prik een mast met het zeil van {TITLE} in drie kurken en kijk hoe je bootje echt blijft drijven in het water!",
        "en": "Anchor a paper sail made from {TITLE} into wine corks to sail a buoyant vessel in your bath or sink.",
        "de": "Stecke ein Papiersegel von {TITLE} auf drei Korken und lasse dein Boot im Wasser schwimmen!",
        "fr": "Plantez un mât et une voile de {TITLE} sur des bouchons de liège pour faire naviguer votre bateau dans l'eau!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "3 wijnkurken",
          "2 elastiekjes",
          "Houten satéprikker als mast"
        ],
        "en": [
          "{TITLE} coloring page",
          "3 wine corks",
          "2 rubber bands",
          "Wooden skewer for mast"
        ],
        "de": [
          "{TITLE} Bild",
          "3 Weinkorken",
          "2 Gummibänder",
          "Holzspieß als Mast"
        ],
        "fr": [
          "Dessin {TITLE}",
          "3 bouchons de liège",
          "2 élastiques",
          "Pique en bois pour le mât"
        ]
      },
      "steps": {
        "nl": [
          "Bind 3 kurken strak naast elkaar vast met twee elastiekjes voor een stabiele vlotbodem.",
          "Kleur en knip een driehoekig zeil uit van {TITLE} en maak het zeil waterafstotend met wat plakband.",
          "Prik de houten prikker door het zeil en steek de punt stevig in de middelste kurk.",
          "Laat het bootje te water in een teil of badkuip en blaas tegen het zeil om te varen!"
        ],
        "en": [
          "Bind three corks tightly side-by-side using two rubber bands to build a raft hull.",
          "Color and cut out a triangular mainsail from {TITLE}, covering it with tape to waterproof it.",
          "Thread the skewer through the top and bottom of the sail and plunge into the center cork.",
          "Set sail in the bathtub or kitchen sink and blow wind into the sails!"
        ],
        "de": [
          "Binde 3 Korken mit zwei Gummibändern fest nebeneinander als Rumpf zusammen.",
          "Schneide ein dreieckiges Segel aus {TITLE} aus und schütze es mit etwas Klebeband vor Nässe.",
          "Spieße das Segel auf den Holzstab und stecke ihn in den mittleren Korken.",
          "Lass das Boot in der Wanne zu Wasser und puste es über die Wellen!"
        ],
        "fr": [
          "Assemblez 3 bouchons côte à côte avec deux élastiques serrés pour former la coque.",
          "Découpez une voile triangulaire dans {TITLE} et imperméabilisez-la avec de l'adhésif.",
          "Enfilez la voile sur le mât en bois et plantez-le au centre du radeau.",
          "Mettez à l'eau dans la baignoire et soufflez dans la voile pour traverser l'océan!"
        ]
      }
    },
    {
      "icon": "🚀",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Papieren Rietjes-Raket Schietspel",
        "en": "Straw-Powered Rocket Blast-Off Toy",
        "de": "Strohhalm-Raketen Abschuss-Spiel",
        "fr": "Fusée Propulsée par Paille à Souffler"
      },
      "descriptions": {
        "nl": "Bouw een raketmotorhuls achter {TITLE}, schuif hem over een rietje en blaas zo hard je kunt om hem te lanceren!",
        "en": "Attach a paper sleeve behind {TITLE}, slip it onto a drinking straw, and blow hard to launch into orbit!",
        "de": "Befestige eine Papierhülse an {TITLE}, stecke sie auf einen Halm und puste für den Raketenstart!",
        "fr": "Fixez un manchon papier sous {TITLE}, glissez-le sur une paille et soufflez fort pour le faire décoller!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Drinkrietje",
          "Plakband",
          "Kinderschaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Drinking straw",
          "Clear tape",
          "Safety scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "Trinkhalm",
          "Klebeband",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Paille à boire",
          "Ruban adhésif",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de raket of het snelle voertuig van {TITLE} vurig in en knip de omtrek uit.",
          "Rol een klein stukje papier om het rietje heen tot een passend buisje en plak het dicht.",
          "Vouw de bovenkant van het buisje dicht met plakband zodat er geen lucht kan ontsnappen.",
          "Plak het buisje achter {TITLE}, schuif hem over het rietje en lanceer je voertuig door de lucht!"
        ],
        "en": [
          "Color {TITLE} with thruster flames and aerodynamic markings, then cut out.",
          "Roll a small scrap of paper loosely around the straw to form a snug sleeve cylinder.",
          "Pinch and fold the top tip shut with tape so air cannot escape through the top.",
          "Tape the rocket tube behind {TITLE}, slide onto the straw, and blow hard to launch towards the stars!"
        ],
        "de": [
          "Male die Triebwerke und Karosserie von {TITLE} mit feurigen Farben an.",
          "Wickle einen kleinen Papierstreifen um den Strohhalm und klebe ihn zur Röhre.",
          "Verschließe das obere Ende luftdicht mit Klebeband.",
          "Klebe die Röhre hinter {TITLE}, stecke sie auf den Halm und puste kräftig!"
        ],
        "fr": [
          "Coloriez les flammes de propulsion et les motifs supersoniques de {TITLE}.",
          "Enroulez une bandelette de papier autour de la paille pour former un tube fermé au sommet.",
          "Scellez hermétiquement le haut du tube avec de l'adhésif.",
          "Fixez le tube derrière {TITLE}, insérez la paille et soufflez un grand coup pour lancer l'engin!"
        ]
      }
    },
    {
      "icon": "🎒",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Koffer & Rugzak Bagagelabel met Naam",
        "en": "Sturdy Backpack & Luggage Travel Tag",
        "de": "Stabiler Rucksack- & Koffer-Gepäckanhänger",
        "fr": "Étiquette de Bagage & Cartable de Voyage"
      },
      "descriptions": {
        "nl": "Maak een opvallend en waterdicht reislabeled met {TITLE} voor aan je schooltas, sporttas of koffer.",
        "en": "Laminate a vibrant ID badge featuring {TITLE} to easily identify your school backpack or vacation luggage.",
        "de": "Laminiere einen coolen Kofferanhänger mit {TITLE} für deinen Schulranzen oder deine Reisetasche.",
        "fr": "Plastifiez une étiquette d'identification avec {TITLE} pour retrouver votre sac d'école en un clin d'œil."
      },
      "materials": {
        "nl": [
          "Gekleurd detail van {TITLE}",
          "Stevig karton",
          "Zelfklevend plakplastic",
          "Perforator en ringetje of lint"
        ],
        "en": [
          "Colored cutout from {TITLE}",
          "Heavy cardstock",
          "Clear contact paper",
          "Hole punch and key ring"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Starker Tonkarton",
          "Selbstklebefolie",
          "Locher & Schlüsselring"
        ],
        "fr": [
          "Motif découpé de {TITLE}",
          "Carton rigide",
          "Film plastique adhésif",
          "Perforatrice et anneau"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en schrijf op de achterkant je voornaam en een telefoonnummer.",
          "Plak de kaart tussen twee lagen stevig doorzichtig plastic folie.",
          "Perforeer een gaatje in de bovenhoek.",
          "Bevestig het label met een ringetje of stevig koordje aan de ritssluiting van je tas!"
        ],
        "en": [
          "Color {TITLE} brightly and jot your name and contact phone number on the blank back.",
          "Encase the cutout between two layers of clear protective laminate film.",
          "Punch a hole near the top reinforced corner.",
          "Thread a key ring or durable zip tie through and loop securely to your backpack zipper!"
        ],
        "de": [
          "Male das Fahrzeug aus und notiere deinen Namen auf der Rückseite.",
          "Bette die Karte zwischen zwei Schichten Schutzfolie ein.",
          "Stanzt oben ein sauberes Loch hinein.",
          "Befestige den Anhänger mit einem Band am Reißverschluss deiner Schultasche!"
        ],
        "fr": [
          "Coloriez {TITLE} et inscrivez vos coordonnées au verso.",
          "Plastifiez le badge pour le protéger des frottements et de la pluie.",
          "Perforez un trou solide au coin supérieur.",
          "Attachez l'étiquette avec un anneau à la fermeture éclair de votre sac!"
        ]
      }
    },
    {
      "icon": "🅿️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Parkeergarage & Helikopterplatform van Eierdoos",
        "en": "Egg Carton Multi-Level Parking Garage",
        "de": "Eierkarton Parkhaus mit Hubschrauberlandeplatz",
        "fr": "Garage à Étages & Héliport en Boîte d'Œufs"
      },
      "descriptions": {
        "nl": "Bouw een parkeergarage met genummerde parkeervakken en een helikopterdek voor {TITLE} uit een eierdoos.",
        "en": "Engineer a multi-bay parking facility and rooftop helipad from an upcycled egg carton for {TITLE}.",
        "de": "Baue aus einem Eierkarton ein Parkhaus mit nummerierten Stellplätzen für {TITLE}.",
        "fr": "Créez un parking couvert avec places numérotées et héliport sur le toit pour votre {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Lege eierdoos van 10 of 12 eieren",
          "Verf of stiften",
          "Kartonnen oprijplaat"
        ],
        "en": [
          "{TITLE} coloring page",
          "Empty 10 or 12 egg carton",
          "Craft paint or markers",
          "Cardboard entry ramp"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Leerer Eierkarton",
          "Farbe / Filzstifte",
          "Karton-Auffahrrampe"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Boîte d'œufs vide",
          "Peinture ou feutres",
          "Rampe en carton"
        ]
      },
      "steps": {
        "nl": [
          "Schilder de deksel van de eierdoos grijs als parkeerdek en teken gele parkeervakken.",
          "Plak een kartonnen strook als oprijhelling van de vloer naar het dak van de doos.",
          "Teken een grote witte cirkel met een \"H\" op het dak als helikopterlandingsplaats.",
          "Parkeer je ingekleurde {TITLE} in zijn eigen overdekte VIP-parkeergarage!"
        ],
        "en": [
          "Paint the carton top asphalt gray and mark out yellow parking stalls with numbers.",
          "Tape a stiff cardboard ramp sloping from the floor up to the garage roof level.",
          "Draw a bold white circle with an \"H\" on the roof for emergency helicopter landings.",
          "Park {TITLE} neatly into its personal covered stall after a day of speedy adventures!"
        ],
        "de": [
          "Male den Deckel grau wie Beton an und nummeriere die Parkbuchten.",
          "Befestige einen Kartonstreifen als Auffahrrampe zum Dach.",
          "Zeichne ein weißes Lande-H für Hubschrauber auf das Parkdeck.",
          "Parke dein fertiges {TITLE} sicher in der neuen Garage ein!"
        ],
        "fr": [
          "Peignez le dessus de la boîte en gris goudron et tracez les lignes jaunes de stationnement.",
          "Fixez une bande cartonnée inclinée pour créer la rampe d'accès au toit.",
          "Dessinez un grand \"H\" blanc au sommet pour accueillir les hélicoptères.",
          "Garez votre {TITLE} dans sa place réservée après une grande journée d'action!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Vintage Garage & Race Poster in Lijst",
        "en": "Vintage Motor Club Garage Poster in Frame",
        "de": "Klassisches Werkstatt- & Rennposter im Rahmen",
        "fr": "Affiche Rétro de Circuit Automobile Encadrée"
      },
      "descriptions": {
        "nl": "Geef {TITLE} stoere race-strepen, onderteken je meesterwerk en hang het op als officiële garageposter.",
        "en": "Detail {TITLE} with custom sponsor badges, sign your creation, and display it proudly on your wall.",
        "de": "Vollende {TITLE} mit coolen Rennstreifen und rahme es als Rennfahrer-Poster ein.",
        "fr": "Ajoutez des bandes de course à {TITLE}, signez votre œuvre et exposez votre affiche de stand."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4",
          "Glanzende lakstift of metallic stiften",
          "Kartonnen kader"
        ],
        "en": [
          "Finished art of {TITLE}",
          "A4/Letter picture frame",
          "Metallic silver/gold markers",
          "Cardboard mat"
        ],
        "de": [
          "Fertiges {TITLE}-Bild",
          "Bilderrahmen A4",
          "Silber- / Goldstift",
          "Passepartout-Karton"
        ],
        "fr": [
          "Dessin {TITLE} achevé",
          "Cadre photo A4",
          "Marqueurs argentés ou dorés",
          "Cadre passe-partout"
        ]
      },
      "steps": {
        "nl": [
          "Kleur velgen en chroomdelen in met zilveren of gouden metallic stiften voor extra glans.",
          "Teken een retro achtergrond met geblokte vlaggen en een startnummer.",
          "Lijm de plaat strak op een contrasterende zwarte of dieprode achtergrond.",
          "Plaats in een lijst en bewonder je professionele motorsport galerijposter!"
        ],
        "en": [
          "Accent chrome rims, bumpers, and lights using reflective metallic gold or silver markers.",
          "Sketch retro speed stripes or a racing team emblem in the backdrop.",
          "Mount squarely onto a black or dark red mat board for intense visual contrast.",
          "Seal inside a frame and hang it up in your room like a true racing paddock!"
        ],
        "de": [
          "Betone Felgen und Chromleisten mit glänzenden Silber- oder Goldstiften.",
          "Zeichne eine coole Rennstrecken-Kulisse mit Tribüne in den Hintergrund.",
          "Befestige das Blatt zentriert auf schwarzem Tonpapier.",
          "Rahme das Bild ein und verwandle dein Zimmer in eine echte Boxengasse!"
        ],
        "fr": [
          "Rehaussez les jantes et le pare-chocs avec des feutres métallisés argent ou or.",
          "Dessinez un décor de circuit avec drapeaux et drapeaux d'écurie en arrière-plan.",
          "Montez la feuille sur un carton noir pour faire ressortir les contrastes vifs.",
          "Insérez sous cadre pour créer une authentique décoration de passionné de mécanique!"
        ]
      }
    }
  ],
  "fantasy-fairytales": [
    {
      "icon": "👑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Koninklijke Gouden Kroon & Tiara met Glitters",
        "en": "Royal Golden Tiara & Crystal Crown",
        "de": "Königliche Glitzer-Krone & Diadem",
        "fr": "Couronne Royale & Diadème Scintillant"
      },
      "descriptions": {
        "nl": "Kleur {TITLE} in, knip de kroonpunten uit en versier hem met glittersteentjes om als echte prins of prinses gekroond te worden.",
        "en": "Cut out radiant crown peaks featuring {TITLE} and embellish with faux jewels for royal dress-up.",
        "de": "Gestalte eine glänzende Krone mit {TITLE}, beklebe sie mit Schmucksteinen und spiele König oder Königin.",
        "fr": "Découpez les pointes d'une couronne royale ornée de {TITLE} et parsemez de strass étincelants."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Goud of zilver karton",
          "Zelfklevende glittersteentjes",
          "Nietmachine of plakband"
        ],
        "en": [
          "{TITLE} coloring page",
          "Gold or silver cardstock",
          "Peel-and-stick craft gems",
          "Stapler or tape"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Gold- oder Silberkarton",
          "Glitzer-Schmucksteine",
          "Tacker oder Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton doré ou argenté",
          "Strass autocollants",
          "Agrafeuse ou adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kroon en juwelen van {TITLE} met glinsterende kleuren.",
          "Plak de figuur op een lange strook goudkleurig karton die precies om je hoofd past.",
          "Knip koninklijke kartelpunten aan de bovenzijde.",
          "Plak glittersteentjes op de punten, pas de band op maat en niet hem vast!"
        ],
        "en": [
          "Color {TITLE}'s royal regalia and gemstones with metallic crayons or markers.",
          "Mount the cutout centered upon an elongated gold cardstock headband.",
          "Scallop regal triangular peaks along the crown crest with scissors.",
          "Affix sparkling gemstones to every peak and staple the headband to fit comfortably!"
        ],
        "de": [
          "Male die Kronen-Elemente von {TITLE} mit glänzenden Stiften an.",
          "Befestige das Motiv auf einem langen goldenen Papierstreifen.",
          "Schneide zackige Spitzen in den oberen Rand der Krone.",
          "Verziere die Spitzen mit Strasssteinen und passe das Band an deinen Kopf an!"
        ],
        "fr": [
          "Coloriez les détails royaux de {TITLE} avec des teintes dorées et pourpres.",
          "Collez le motif au centre d'un bandeau ajusté au tour de tête.",
          "Découpez de jolies pointes crénelées au sommet de la couronne.",
          "Parsemez de faux diamants adhésifs et agrafez le bandeau pour votre sacre!"
        ]
      }
    },
    {
      "icon": "🪄",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Magische Toverstaf met Linten & Sterrenstof",
        "en": "Enchanted Fairy Wand with Flowing Ribbons",
        "de": "Magischer Zauberstab mit Sternenstaub",
        "fr": "Baguette Magique Étoilée & Rubans Féeriques"
      },
      "descriptions": {
        "nl": "Bevestig een betoverende ster of figuur van {TITLE} op een toverstokje en hang er zachte satijnen lintjes aan.",
        "en": "Top a wooden wand with {TITLE}'s magical emblem and cascade shimmering ribbons to cast cheerful spells.",
        "de": "Kröne einen Holzstab mit dem Motiv von {TITLE} und binde wehende Bänder für echte Zaubertricks daran.",
        "fr": "Couronnez une baguette avec {TITLE} et nouez des rubans satinés pour exaucer tous les vœux."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Houten stokje of rietje",
          "Satijnen lintjes (roze, goud, blauw)",
          "Glitterlijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Wooden dowel or straw",
          "Satin ribbons (gold, pastel)",
          "Glitter glue"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Holzstab oder Halm",
          "Satinbänder",
          "Glitzerkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Baguette en bois",
          "Rubans de satin",
          "Colle pailletée"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het meest magische deel van {TITLE} in met zachte pastel- of neonkleuren.",
          "Knip de figuur dubbel uit en plak ze met de ruggen tegen elkaar met het stokje ertussen.",
          "Knoop 3 tot 4 lange lintjes net onder de figuur vast aan het stokje.",
          "Zwaai met je toverstaf en spreek je eigen magische toverspreuk uit!"
        ],
        "en": [
          "Color {TITLE} focusing on magical sparkles and radiant gradient tones.",
          "Cut two matching prints back-to-back and sandwich the top of the wooden dowel between them.",
          "Knot 3 to 4 flowing ribbon strands directly under the wand topper.",
          "Twirl through the air and whisper your secret fairy spells!"
        ],
        "de": [
          "Male die magischen Symbole von {TITLE} in schimmernden Farben aus.",
          "Schneide die Figur zweimal aus und klebe sie um die Stabspitze herum zusammen.",
          "Knote bunte Satinbänder direkt unterhalb des Kopfes fest.",
          "Schwinge deinen Zauberstab und verzaubere die Welt!"
        ],
        "fr": [
          "Coloriez le symbole magique de {TITLE} avec des teintes féeriques.",
          "Découpez deux exemplaires et collez-les dos à dos en enfermant le haut de la baguette.",
          "Nouez plusieurs rubans colorés juste sous le motif.",
          "Agitez votre baguette et prononcez votre formule magique préférée!"
        ]
      }
    },
    {
      "icon": "🏰",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "3D Kasteelpoort met Werkende Ophaalbrug",
        "en": "3D Fairy Tale Castle Gate with Working Drawbridge",
        "de": "3D Märchenschloss-Tor mit Zugbrücke",
        "fr": "Porte de Château Fort 3D & Pont-Levis Mobile"
      },
      "descriptions": {
        "nl": "Bouw torentjes van wc-rolletjes en een poort met touwtjes waardoor de ophaalbrug echt open en dicht kan voor {TITLE}.",
        "en": "Construct fortress towers from cardboard tubes with string-operated drawbridge doors welcoming {TITLE}.",
        "de": "Errichte Schlosstürme aus Papprollen und eine funktionierende Zugbrücke mit Schnüren für {TITLE}.",
        "fr": "Bâtissez des tours crénelées et un pont-levis à cordelettes pour accueillir {TITLE} dans son donjon."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 lege wc-rollen",
          "Stevig karton doosje",
          "Stukje touw"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 toilet paper tubes",
          "Small cardboard box",
          "String or yarn"
        ],
        "de": [
          "{TITLE} Bild",
          "2 Papprollen",
          "Kleine Schachtel",
          "Kordel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 rouleaux en carton",
          "Boîte cartonnée",
          "Ficelle"
        ]
      },
      "steps": {
        "nl": [
          "Knip kanteeltjes aan de bovenkant van de wc-rollen voor twee kasteeltorens.",
          "Knip een rechthoekige poortdeur in het doosje, maar laat de onderrand vastzitten als scharnier.",
          "Maak twee gaatjes bovenin de deur en haal er touwtjes doorheen om de brug op te hijsen.",
          "Plak {TITLE} trots op de kasteelmuur als heerser van het koninkrijk!"
        ],
        "en": [
          "Snip battlements along the rims of both tubes to form fortified fortress watchtowers.",
          "Slice an arched gate in the box face, keeping the bottom edge intact as a hinge.",
          "Punch two holes near the top corners of the drawbridge door and thread pulling strings through.",
          "Station {TITLE} triumphantly on the parapet to rule over the royal court!"
        ],
        "de": [
          "Schneide Zinnen in die Papprollen für wehrhafte Wachtürme.",
          "Schneide ein Tor in die Schachtelwand, wobei die Unterkante als Klappscharnier bleibt.",
          "Ziehe zwei Schnüre durch die Türoberkante, um die Brücke hochzuziehen.",
          "Setze {TITLE} auf die Schlossmauer und bewache dein Königreich!"
        ],
        "fr": [
          "Découpez des créneaux au sommet des rouleaux pour créer deux hautes tours de guet.",
          "Découpez une porte en arche en conservant le bas comme charnière pliante.",
          "Enfilez deux cordelettes pour manœuvrer le pont-levis à volonté.",
          "Installez {TITLE} sur les remparts pour veiller sur le royaume enchanté!"
        ]
      }
    },
    {
      "icon": "🪞",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Magische Handspiegel van de Sneeuwkoningin",
        "en": "Enchanted Handheld Vanity Mirror",
        "de": "Magischer Handspiegel der Schneekönigin",
        "fr": "Miroir Magique Enchanté des Contes de Fées"
      },
      "descriptions": {
        "nl": "Plak glanzend aluminiumfolie als spiegelglas in een sierlijk kader met {TITLE} en stel hem de beroemde vraag!",
        "en": "Frame reflective silver foil inside an ornate cutout handle with {TITLE} to mimic Snow White's magic mirror.",
        "de": "Spanne Alufolie als Spiegelfläche in einen kunstvollen Griff mit {TITLE} für dein Märchenspiel.",
        "fr": "Placez une feuille d'aluminium réfléchissante dans un cadre orné de {TITLE} pour interroger le miroir magique."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton",
          "Keuken aluminiumfolie",
          "Glitterlijm en parels"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Cardboard backer",
          "Kitchen foil",
          "Craft pearls and sequins"
        ],
        "de": [
          "{TITLE} Bild",
          "Fester Karton",
          "Alufolie",
          "Glitzer und Perlen"
        ],
        "fr": [
          "Feuille {TITLE}",
          "Carton rigide",
          "Feuille d'aluminium ménager",
          "Perles et paillettes"
        ]
      },
      "steps": {
        "nl": [
          "Teken de vorm van een klassieke handspiegel met een handvat op stevig karton en knip uit.",
          "Plak een strakgetrokken stukje aluminiumfolie in het midden als echt spiegelend glas.",
          "Knip de mooiste ornamenten en figuren van {TITLE} uit en plak ze rond de rand van de spiegel.",
          "Versier met glitterlijm en vraag: \"Spiegeltje, spiegeltje aan de wand...\""
        ],
        "en": [
          "Sketch a vintage mirror silhouette with a comfortable handle on thick cardstock and cut out.",
          "Paste smooth wrinkle-free kitchen foil across the center oval to reflect light.",
          "Border the frame with delicate fairy motifs and characters snipped from {TITLE}.",
          "Accentuate with faux pearls and ask: \"Mirror, mirror on the wall, who is the fairest of them all?\""
        ],
        "de": [
          "Zeichne einen Handspiegel mit Griff auf Karton und schneide die Form aus.",
          "Klebe ein glattes Stück Alufolie als Spiegelfläche in die Mitte.",
          "Umrande den Spiegel mit den feinsten Zeichnungen von {TITLE}.",
          "Verziere mit Glitzer und spiele die berühmte Märchenszene nach!"
        ],
        "fr": [
          "Tracez la silhouette d'un miroir à manche d'époque sur du carton et découpez.",
          "Collez un morceau d'aluminium bien lisse au centre pour créer la surface réfléchissante.",
          "Décorez tout le pourtour avec les détails délicats de {TITLE}.",
          "Ajoutez des strass et récitez: \"Miroir, mon beau miroir, dis-moi qui est la plus belle...\""
        ]
      }
    },
    {
      "icon": "🦄",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Glinsterende Eenhoorn & Sprookjes Diadeem",
        "en": "Glitter Unicorn Horn & Floral Headband",
        "de": "Glänzender Einhorn-Haarreif mit Blüten",
        "fr": "Serre-Tête Corne de Licorne & Fleurs Magiques"
      },
      "descriptions": {
        "nl": "Rol een gouden spiraalhoorn, versier met bloemetjes uit {TITLE} en bevestig hem op een comfortabele haarband.",
        "en": "Roll a spiraling pastel horn and accent with paper flowers from {TITLE} to wear on any headband.",
        "de": "Rolle ein gedrehtes Zauberhorn aus Papier, dekoriere es mit {TITLE}-Blumen und befestige es am Haarreif.",
        "fr": "Confectionnez une corne torsadée et ornez-la des fleurs féeriques de {TITLE} sur un serre-tête."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Vouwkarton",
          "Gewone plastic diadeem of elastische band",
          "Lijmpistool of stevige lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Craft cardstock",
          "Plastic headband or elastic band",
          "Craft glue"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier",
          "Haarreif oder Gummiband",
          "Bastelkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papier cartonné souple",
          "Serre-tête ou élastique",
          "Colle forte"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de bloemen, sterren en magische details van {TITLE} met dromerige kleuren.",
          "Rol een stukje geel of roze papier tot een strakke kegelvorm als hoorn en plak de naad dicht.",
          "Knip twee schattige oortjes en de bloemen uit {TITLE}.",
          "Lijm de hoorn, oortjes en bloemen bovenop de diadeem en transformeer jezelf in een mythisch wezen!"
        ],
        "en": [
          "Color celestial stars and botanical blossoms in {TITLE} using pastel rainbow hues.",
          "Roll a sheet of cardstock into a tapered cone horn and wrap with golden twine.",
          "Trim two matching animal ears and flower clusters from the artwork.",
          "Fasten the horn and floral accents atop your headband to step into a fantasy realm!"
        ],
        "de": [
          "Male die magischen Blüten und Sterne von {TITLE} mit Pastelltönen aus.",
          "Rolle ein Blatt zu einer spitzen Kegeltüte zusammen und klebe die Kante fest.",
          "Schneide zarte Ohren und Blumen aus deiner Vorlage aus.",
          "Befestige Horn und Ohren auf dem Haarreif für einen märchenhaften Auftritt!"
        ],
        "fr": [
          "Coloriez les motifs floraux et féeriques de {TITLE} avec des teintes pastel.",
          "Enroulez une feuille pour former un cône pointu bien serré figurant la corne.",
          "Découpez deux petites oreilles assorties et les fleurs dans le dessin.",
          "Fixez la corne et les fleurs sur le serre-tête pour incarner une créature légendaire!"
        ]
      }
    },
    {
      "icon": "🛡️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Dapper Ridder- & Helden Schild met Wapen",
        "en": "Valiant Knight Crest & Heraldic Shield",
        "de": "Tapferes Ritterschild mit Wappen",
        "fr": "Bouclier de Chevalier & Blason Héraldique"
      },
      "descriptions": {
        "nl": "Knip een stoer ridderschild uit golfkarton, plak het koninklijke embleem van {TITLE} erop en bevestig een armhandvat.",
        "en": "Reinforce heavy cardboard into an authentic curved knight shield bearing {TITLE}'s heraldic crest.",
        "de": "Bastle ein stabiles Ritterschild aus Wellpappe mit dem Wappen von {TITLE} und Armgriff.",
        "fr": "Découpez un bouclier médiéval dans du carton fort avec le blason protecteur de {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig golfkarton",
          "Schilderstape of brede strook karton voor handvat",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Corrugated cardboard",
          "Cardboard strip for arm strap",
          "Scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "Wellpappe",
          "Kartonstreifen als Griffschlaufe",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton ondulé épais",
          "Lanière de carton pour la poignée",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Teken een traditionele puntige schildvorm op stevig golfkarton en knip uit.",
          "Kleur {TITLE} met krachtige, heraldische kleuren en knip de centrale figuur als familiewapen uit.",
          "Lijm het wapen precies in het midden van het schild.",
          "Niet of plak een gebogen kartonnen handvat aan de achterzijde zodat je het schild stevig vast kunt houden!"
        ],
        "en": [
          "Draw an authentic medieval pointed shield shape onto corrugated cardboard and trim cleanly.",
          "Color {TITLE} with bold champion colors and trim out the main figure as your official crest.",
          "Glue the emblem squarely into the center of the shield face.",
          "Tape a looped cardboard strap onto the reverse side for a comfortable arm grip in battle!"
        ],
        "de": [
          "Zeichne eine spitze Schildform auf dicke Wellpappe und schneide sie aus.",
          "Male {TITLE} in strahlenden Wappenfarben an und platziere es als Wappentier in der Mitte.",
          "Befestige eine gebogene Pappschlaufe als Griff auf der Rückseite.",
          "Nimm dein Schild in die Hand und verteidige das Schloss gegen Drachen!"
        ],
        "fr": [
          "Tracez une forme d'écu médiéval pointu sur du carton ondulé et découpez.",
          "Coloriez le motif héroïque de {TITLE} et collez-le au cœur du blason.",
          "Fixez une anse en carton souple au verso pour glisser votre avant-bras.",
          "Brandissez votre bouclier pour partir à la conquête des légendes!"
        ]
      }
    },
    {
      "icon": "📜",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Oude Perkamentrol met Zegellak Sluiting",
        "en": "Aged Kingdom Royal Proclamation Scroll",
        "de": "Alte königliche Pergament-Urkunde",
        "fr": "Parchemin Médiéval & Décret Royal Scellé"
      },
      "descriptions": {
        "nl": "Geef het papier van {TITLE} een antieke perkament-look met een theezakje en rol het op met een sierlijk rood lint.",
        "en": "Antique your {TITLE} coloring page with a damp tea bag to look centuries old and seal with ribbon.",
        "de": "Färbe dein {TITLE} mit einem Teebeutel auf antik und rolle es wie ein echtes königliches Dekret auf.",
        "fr": "Vieillissez le papier de {TITLE} avec un sachet de thé pour créer un parchemin royal d'époque."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Vochtig gebruikt theezakje",
          "Rood satijnen lint",
          "Rode wasco voor de zegel"
        ],
        "en": [
          "{TITLE} coloring page",
          "Damp used black tea bag",
          "Red satin ribbon",
          "Red crayon for wax seal"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Feuchter Teebeutel",
          "Rotes Geschenkband",
          "Wachsmaler für das Siegel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Sachet de thé noir humide",
          "Ruban rouge",
          "Craie rouge pour le sceau"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in met potloden en scheur de vier buitenranden lichtjes rafelig af met je vingers.",
          "Dep een vochtig theezakje over het papier zodat het een authentieke vintage sepia-tint krijgt.",
          "Laat het vel drogen en schrijf een officiële koninklijke boodschap aan de onderkant.",
          "Rol het perkament strak op en bind er een rood lint omheen met een getekende zegel!"
        ],
        "en": [
          "Color {TITLE} with pencils, then tear gentle frayed edges around all four borders by hand.",
          "Dab a warm, damp black tea bag across the paper surface to produce an authentic sepia patina.",
          "Once completely dry, pen a secret royal decree or treasure map message along the footer.",
          "Roll the parchment tightly and bind with a crimson ribbon sealed with a faux wax badge!"
        ],
        "de": [
          "Male {TITLE} aus und reiße die Kanten leicht unregelmäßig mit den Fingern ein.",
          "Tupfe vorsichtig mit einem abgekühlten Teebeutel über das Blatt für den antiken Pergament-Ton.",
          "Lasse das Blatt trocknen und verfasse einen königlichen Erlass mit Tinte.",
          "Rolle das Dokument zusammen und verschnüre es mit einem feierlichen roten Band!"
        ],
        "fr": [
          "Coloriez {TITLE} puis déchirez légèrement les bordures à la main pour créer un effet usé.",
          "Tapotez un sachet de thé humide sur toute la feuille pour lui donner une teinte bistre patinée.",
          "Une fois sec, rédigez un message royal officiel ou une carte au trésor secrète.",
          "Enroulez le rouleau et nouez un ruban rouge orné d'un sceau de cire dessiné!"
        ]
      }
    },
    {
      "icon": "✨",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Fairy Dust Lichtgevend Toverflesje",
        "en": "Luminous Fairy Dust Potion Bottle",
        "de": "Leuchtendes Feenstaub Zaubertrank-Fläschchen",
        "fr": "Fiole Magique de Poussière de Fée Luminescente"
      },
      "descriptions": {
        "nl": "Plak een miniatuur {TITLE} op een klein glazen potje gevuld met glitters en water voor een betoverend feeëndrankje.",
        "en": "Affix miniature art from {TITLE} to a small sensory potion bottle filled with glitter and magical swirls.",
        "de": "Beklebe ein kleines Glas mit {TITLE}, fülle es mit Glitzerwasser und erschaffe deinen eigenen Zaubertrank.",
        "fr": "Collez une miniature de {TITLE} sur une petite fiole garnie d'eau scintillante et de paillettes magiques."
      },
      "materials": {
        "nl": [
          "Verkleind knipsel van {TITLE}",
          "Schoon leeg glazen potje of flesje",
          "Water en paar druppels glycerine of zeep",
          "Glitters"
        ],
        "en": [
          "Mini cutout from {TITLE}",
          "Clean small jar or potion bottle",
          "Water and drops of baby oil or soap",
          "Sparkling glitter"
        ],
        "de": [
          "Miniatur {TITLE}",
          "Kleines Schraubglas",
          "Wasser & etwas Glitzer",
          "Klebeband"
        ],
        "fr": [
          "Miniature {TITLE}",
          "Petit flacon en verre",
          "Eau et paillettes",
          "Colle imperméable"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de betoverde figuur van {TITLE} met glanzende kleuren en knip hem uit op postzegelformaat.",
          "Vul het potje met water, een drupje vloeibare zeep en gouden of zilveren glitters.",
          "Draai de deksel stevig vast (eventueel met een druppeltje lijm zodat hij niet lekt).",
          "Plak je {TITLE} label op het glas, schud zachtjes en kijk hoe het magische elixer wervelt!"
        ],
        "en": [
          "Color {TITLE} with radiant hues and trim into a petite potion label.",
          "Fill the glass bottle with warm water, craft glitter, and a pump of clear hand soap to slow the swirl.",
          "Fasten the cap tightly with waterproof glue to avoid spills.",
          "Glue your character crest onto the front, give it a gentle shake, and watch the fairy dust shimmer!"
        ],
        "de": [
          "Male das {TITLE}-Motiv klein aus und schneide es als Flaschenetikett zurecht.",
          "Fülle das Glas mit Wasser, Glitzerflocken und einem Tropfen Spülmittel.",
          "Schraube den Deckel fest zu, damit nichts auslaufen kann.",
          "Schüttle die Flasche und bestaune den schwebenden Sternenstaub!"
        ],
        "fr": [
          "Coloriez le motif de {TITLE} et découpez-le au format d'une étiquette précieuse.",
          "Remplissez le bocal d'eau, de paillettes irisées et d'une larme de savon liquide.",
          "Vissez hermétiquement le bouchon pour éviter les fuites.",
          "Collez l'étiquette sur le flacon et secouez doucement pour réveiller la magie!"
        ]
      }
    },
    {
      "icon": "🎭",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Gemaskerd Bal Venetiaans Oogmasker",
        "en": "Masquerade Ball Venetian Eye Mask",
        "de": "Venezianische Maskenball Augenmaske",
        "fr": "Loup Vénitien de Bal Masqué avec Plumes"
      },
      "descriptions": {
        "nl": "Knip sierlijke amandelvormige ooggaatjes rond {TITLE}, voeg veren en glitters toe voor een sprookjesachtig bal.",
        "en": "Shape an elegant cat-eye Venetian mask around {TITLE}, festooned with craft feathers and metallic piping.",
        "de": "Schneide eine elegante Augenmaske mit {TITLE} aus und schmücke sie mit bunten Federn.",
        "fr": "Découpez un masque loup mystérieux autour de {TITLE} paré de plumes douces et de liserés dorés."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Knutselkarton",
          "Sierveertjes en glitters",
          "Elastiekje of houten handstokje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Cardstock backing",
          "Craft feathers and sequins",
          "Elastic ribbon or side stick"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier",
          "Bastelfedern & Pailletten",
          "Gummiband oder Stab"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Support cartonné",
          "Plumes colorées et paillettes",
          "Élastique fin ou tige latérale"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de sierlijke patronen en ogen van {TITLE} met feestelijke kleuren.",
          "Verstevig het papier met karton en knip voorzichtig twee ovale kijkgaten uit.",
          "Plak zachte veertjes aan de zijkant en omlijn de oogranden met glitterlijm.",
          "Bevestig een elastiekje of plak een stokje aan de zijkant om het masker mysterieus vast te houden!"
        ],
        "en": [
          "Color elaborate scrollwork patterns across {TITLE} using jewel tones.",
          "Back onto thick paper and cut smooth almond-shaped eye openings.",
          "Glue soft plume feathers at the temples and outline with metallic glitter paint.",
          "Affix a side-mounted wooden stick or elastic strap to hold the disguise at the royal ball!"
        ],
        "de": [
          "Male die Verzierungen von {TITLE} mit festlichen Farben und Glanz aus.",
          "Verstärke das Blatt und schneide vorsichtig zwei Sehschlitze aus.",
          "Dekoriere den oberen Rand mit echten Federn und Pailletten.",
          "Befestige ein Gummiband und erscheine unerkannt auf dem Maskenball!"
        ],
        "fr": [
          "Coloriez les arabesques délicates de {TITLE} avec des teintes somptueuses.",
          "Collez sur carton et évidez délicatement deux ouvertures en amande pour les yeux.",
          "Collez des plumes vaporeuses sur les côtés et soulignez les contours de paillettes.",
          "Ajoutez un élastique ou une tige latérale pour tenir votre masque lors du grand bal!"
        ]
      }
    },
    {
      "icon": "🔖",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Koninklijke Boekenlegger met Gouddraad",
        "en": "Royal Storybook Bookmark with Golden Tassel",
        "de": "Königliches Märchen-Lesezeichen mit Goldquaste",
        "fr": "Marque-Page des Mille et Une Nuits avec Cordon d'Or"
      },
      "descriptions": {
        "nl": "Vouw een chique boekenlegger met de magische figuur van {TITLE} en vlecht een kwastje van goudkleurig garen.",
        "en": "Fashion an opulent bookmark featuring {TITLE} crowned with a braided golden embroidery thread tassel.",
        "de": "Bastle ein edles Lesezeichen mit {TITLE} und flechte eine schimmernde Goldquaste.",
        "fr": "Concevez un marque-page féerique mettant en scène {TITLE} avec un gland en fil doré."
      },
      "materials": {
        "nl": [
          "Gekleurde strook van {TITLE}",
          "Goud of donkerblauw karton",
          "Perforator",
          "Gouddraad of geel garen"
        ],
        "en": [
          "Cutout strip from {TITLE}",
          "Gold or navy cardstock",
          "Hole punch",
          "Gold metallic or yellow yarn"
        ],
        "de": [
          "{TITLE}-Ausschnitt",
          "Edler Tonkarton",
          "Locher",
          "Goldenes Garn"
        ],
        "fr": [
          "Bande de {TITLE}",
          "Carton bleu nuit ou doré",
          "Perforatrice",
          "Fil doré ou jaune soleil"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de sprookjesfiguur van {TITLE} met aandacht voor magische tinten.",
          "Lijm de strook op diepblauw of goudkleurig karton voor een vorstelijke uitstraling.",
          "Perforeer bovenin een gaatje.",
          "Haal het gouden kwastje door de opening; zo raak je nooit meer de weg kwijt in je sprookjesboek!"
        ],
        "en": [
          "Color {TITLE}'s character illustration paying close attention to highlights.",
          "Layer onto midnight blue or rich gold cardstock for a regal storybook look.",
          "Punch an accurate hole centered at the top crest.",
          "Thread the gleaming gold tassel through to mark your chapters in fairy tale adventures!"
        ],
        "de": [
          "Male die Märchenfigur von {TITLE} mit feinen Schattierungen aus.",
          "Klebe den Streifen auf königsblaues Papier.",
          "Stanzt oben ein Loch hinein.",
          "Binde eine glänzende Goldquaste fest – ideal für jedes Vorlesebuch!"
        ],
        "fr": [
          "Coloriez le personnage féerique de {TITLE} avec éclat.",
          "Collez la bande sur un carton bleu nuit pour un contraste splendide.",
          "Perforez un trou centré au sommet.",
          "Passez le gland en fil d'or pour marquer les pages de vos contes préférés!"
        ]
      }
    },
    {
      "icon": "💌",
      "tagKey": "gift",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Sprookjesachtige 3D Pop-Up Kasteelkaart",
        "en": "Enchanted 3D Pop-Up Storybook Greeting Card",
        "de": "Zauberhafte 3D Pop-Up Schlosskarte",
        "fr": "Carte de Vœux Pop-Up 3D Royaume Enchanté"
      },
      "descriptions": {
        "nl": "Laat {TITLE} als door een wonder naar voren zweven zodra de ontvanger deze feestelijke kaart openvouwt.",
        "en": "Engineer an intricate pop-up tab so {TITLE} glides forward gracefully when the card unfolds.",
        "de": "Lass {TITLE} beim Öffnen der Karte wie von Zauberhand dreidimensional hervorspringen.",
        "fr": "Faites jaillir {TITLE} en relief féerique dès que votre proche ouvre cette carte de vœux."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "A4 dubbelgevouwen karton",
          "Lijmstift",
          "Schaar"
        ],
        "en": [
          "Colored {TITLE}",
          "A4/Letter folded cardstock",
          "Glue stick",
          "Safety scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Klappkarte aus Tonpapier",
          "Klebestift",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE} colorié",
          "Papier cartonné plié en deux",
          "Colle",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Vouw een vel stevig pastelkleurig karton in tweeën.",
          "Knip aan de vouwrand twee parallelle sneetjes van 2 cm en duw het lipje naar binnen als een trappetje.",
          "Knip je ingekleurde {TITLE} uit en plak deze tegen de voorzijde van het trappetje.",
          "Schrijf je wens met gouden letters op de kaart en sluit hem!"
        ],
        "en": [
          "Fold a sheet of lavender or rose cardstock in half to create your card base.",
          "Cut two parallel 1-inch slits along the inner spine and invert the tab inward.",
          "Mount your {TITLE} cutout squarely against the pop-up step.",
          "Inscribe a heartwarming message in shimmering ink and fold shut for a delightful surprise!"
        ],
        "de": [
          "Falte Tonpapier zur Hälfte als Karte.",
          "Schneide am Mittelfalz zwei 2 cm lange Schlitze ein und drücke die Lasche nach innen.",
          "Klebe {TITLE} auf die aufspringende Stufe auf.",
          "Verfasse deine Glückwünsche mit einem Goldstift auf der Innenseite!"
        ],
        "fr": [
          "Pliez une feuille cartonnée en deux pour former la carte.",
          "Découpez deux entailles parallèles sur le pli et repoussez la languette vers l'intérieur.",
          "Collez {TITLE} sur la marche pop-up mécanique.",
          "Rédigez un message magique à l'intérieur et refermez la carte!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Koninklijke Portretgalerij in Gouden Lijst",
        "en": "Royal Gallery Masterpiece in Gilded Frame",
        "de": "Königliches Galerie-Porträt im Goldrahmen",
        "fr": "Tableau de Cour Royale Encadré de Moulures Dorées"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een vorstelijke goudkleurige omlijsting en hang het op als een officieel vorstenportret.",
        "en": "Frame {TITLE} within an ornate gilded border and display it as an authentic palace portrait.",
        "de": "Rahme {TITLE} mit glänzendem Goldrand ein und präsentiere es wie ein echtes Schlossgemälde.",
        "fr": "Sublimez {TITLE} avec un cadre aux dorures baroques digne des plus grands palais."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4",
          "Gouden verf of metallic stift",
          "Passe-partout"
        ],
        "en": [
          "Finished art of {TITLE}",
          "A4/Letter frame",
          "Gold paint or metallic marker",
          "Mat board"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "A4 Bilderrahmen",
          "Goldfarbe / Stift",
          "Passepartout"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre A4",
          "Peinture dorée ou feutre doré",
          "Passe-partout"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de jurk, het kasteel of het personage van {TITLE} met veel diepte en schaduwen in.",
          "Teken met een gouden metallic stift barokke krullen en patronen op het passe-partout kader.",
          "Lijm het schilderij zorgvuldig gecentreerd in het kader.",
          "Onderteken je meesterwerk en hang het op in de kamer!"
        ],
        "en": [
          "Finish coloring robes and scenic landscapes in {TITLE} using deep royal pigments.",
          "Draw baroque swirls and filigree accents on the mat border with gold metallic markers.",
          "Mount the illustration centered inside the frame.",
          "Sign your signature in the corner and mount upon your wall like royal hall of fame art!"
        ],
        "de": [
          "Male die Details von {TITLE} mit königlichen Schattierungen aus.",
          "Verziere den Passepartout-Rand mit goldenen Ornamenten und Ranken.",
          "Setze das Kunstwerk zentriert in den Rahmen ein.",
          "Setze deine Signatur in die Ecke und hänge dein Schloss-Porträt auf!"
        ],
        "fr": [
          "Peaufinez les étoffes et décors de {TITLE} avec des nuances profondes.",
          "Dessinez des volutes dorées baroques sur les bordures du passe-partout.",
          "Centrez votre illustration dans le cadre.",
          "Signez fièrement au bas du tableau avant de l'exposer dans votre galerie personnelle!"
        ]
      }
    }
  ],
  "disney-pixar": [
    {
      "icon": "👑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Koninklijke Gouden Kroon & Tiara met Glitters",
        "en": "Royal Golden Tiara & Crystal Crown",
        "de": "Königliche Glitzer-Krone & Diadem",
        "fr": "Couronne Royale & Diadème Scintillant"
      },
      "descriptions": {
        "nl": "Kleur {TITLE} in, knip de kroonpunten uit en versier hem met glittersteentjes om als echte prins of prinses gekroond te worden.",
        "en": "Cut out radiant crown peaks featuring {TITLE} and embellish with faux jewels for royal dress-up.",
        "de": "Gestalte eine glänzende Krone mit {TITLE}, beklebe sie mit Schmucksteinen und spiele König oder Königin.",
        "fr": "Découpez les pointes d'une couronne royale ornée de {TITLE} et parsemez de strass étincelants."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Goud of zilver karton",
          "Zelfklevende glittersteentjes",
          "Nietmachine of plakband"
        ],
        "en": [
          "{TITLE} coloring page",
          "Gold or silver cardstock",
          "Peel-and-stick craft gems",
          "Stapler or tape"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Gold- oder Silberkarton",
          "Glitzer-Schmucksteine",
          "Tacker oder Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton doré ou argenté",
          "Strass autocollants",
          "Agrafeuse ou adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kroon en juwelen van {TITLE} met glinsterende kleuren.",
          "Plak de figuur op een lange strook goudkleurig karton die precies om je hoofd past.",
          "Knip koninklijke kartelpunten aan de bovenzijde.",
          "Plak glittersteentjes op de punten, pas de band op maat en niet hem vast!"
        ],
        "en": [
          "Color {TITLE}'s royal regalia and gemstones with metallic crayons or markers.",
          "Mount the cutout centered upon an elongated gold cardstock headband.",
          "Scallop regal triangular peaks along the crown crest with scissors.",
          "Affix sparkling gemstones to every peak and staple the headband to fit comfortably!"
        ],
        "de": [
          "Male die Kronen-Elemente von {TITLE} mit glänzenden Stiften an.",
          "Befestige das Motiv auf einem langen goldenen Papierstreifen.",
          "Schneide zackige Spitzen in den oberen Rand der Krone.",
          "Verziere die Spitzen mit Strasssteinen und passe das Band an deinen Kopf an!"
        ],
        "fr": [
          "Coloriez les détails royaux de {TITLE} avec des teintes dorées et pourpres.",
          "Collez le motif au centre d'un bandeau ajusté au tour de tête.",
          "Découpez de jolies pointes crénelées au sommet de la couronne.",
          "Parsemez de faux diamants adhésifs et agrafez le bandeau pour votre sacre!"
        ]
      }
    },
    {
      "icon": "🪄",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Magische Toverstaf met Linten & Sterrenstof",
        "en": "Enchanted Fairy Wand with Flowing Ribbons",
        "de": "Magischer Zauberstab mit Sternenstaub",
        "fr": "Baguette Magique Étoilée & Rubans Féeriques"
      },
      "descriptions": {
        "nl": "Bevestig een betoverende ster of figuur van {TITLE} op een toverstokje en hang er zachte satijnen lintjes aan.",
        "en": "Top a wooden wand with {TITLE}'s magical emblem and cascade shimmering ribbons to cast cheerful spells.",
        "de": "Kröne einen Holzstab mit dem Motiv von {TITLE} und binde wehende Bänder für echte Zaubertricks daran.",
        "fr": "Couronnez une baguette avec {TITLE} et nouez des rubans satinés pour exaucer tous les vœux."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Houten stokje of rietje",
          "Satijnen lintjes (roze, goud, blauw)",
          "Glitterlijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Wooden dowel or straw",
          "Satin ribbons (gold, pastel)",
          "Glitter glue"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Holzstab oder Halm",
          "Satinbänder",
          "Glitzerkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Baguette en bois",
          "Rubans de satin",
          "Colle pailletée"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het meest magische deel van {TITLE} in met zachte pastel- of neonkleuren.",
          "Knip de figuur dubbel uit en plak ze met de ruggen tegen elkaar met het stokje ertussen.",
          "Knoop 3 tot 4 lange lintjes net onder de figuur vast aan het stokje.",
          "Zwaai met je toverstaf en spreek je eigen magische toverspreuk uit!"
        ],
        "en": [
          "Color {TITLE} focusing on magical sparkles and radiant gradient tones.",
          "Cut two matching prints back-to-back and sandwich the top of the wooden dowel between them.",
          "Knot 3 to 4 flowing ribbon strands directly under the wand topper.",
          "Twirl through the air and whisper your secret fairy spells!"
        ],
        "de": [
          "Male die magischen Symbole von {TITLE} in schimmernden Farben aus.",
          "Schneide die Figur zweimal aus und klebe sie um die Stabspitze herum zusammen.",
          "Knote bunte Satinbänder direkt unterhalb des Kopfes fest.",
          "Schwinge deinen Zauberstab und verzaubere die Welt!"
        ],
        "fr": [
          "Coloriez le symbole magique de {TITLE} avec des teintes féeriques.",
          "Découpez deux exemplaires et collez-les dos à dos en enfermant le haut de la baguette.",
          "Nouez plusieurs rubans colorés juste sous le motif.",
          "Agitez votre baguette et prononcez votre formule magique préférée!"
        ]
      }
    },
    {
      "icon": "🏰",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "3D Kasteelpoort met Werkende Ophaalbrug",
        "en": "3D Fairy Tale Castle Gate with Working Drawbridge",
        "de": "3D Märchenschloss-Tor mit Zugbrücke",
        "fr": "Porte de Château Fort 3D & Pont-Levis Mobile"
      },
      "descriptions": {
        "nl": "Bouw torentjes van wc-rolletjes en een poort met touwtjes waardoor de ophaalbrug echt open en dicht kan voor {TITLE}.",
        "en": "Construct fortress towers from cardboard tubes with string-operated drawbridge doors welcoming {TITLE}.",
        "de": "Errichte Schlosstürme aus Papprollen und eine funktionierende Zugbrücke mit Schnüren für {TITLE}.",
        "fr": "Bâtissez des tours crénelées et un pont-levis à cordelettes pour accueillir {TITLE} dans son donjon."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 lege wc-rollen",
          "Stevig karton doosje",
          "Stukje touw"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 toilet paper tubes",
          "Small cardboard box",
          "String or yarn"
        ],
        "de": [
          "{TITLE} Bild",
          "2 Papprollen",
          "Kleine Schachtel",
          "Kordel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 rouleaux en carton",
          "Boîte cartonnée",
          "Ficelle"
        ]
      },
      "steps": {
        "nl": [
          "Knip kanteeltjes aan de bovenkant van de wc-rollen voor twee kasteeltorens.",
          "Knip een rechthoekige poortdeur in het doosje, maar laat de onderrand vastzitten als scharnier.",
          "Maak twee gaatjes bovenin de deur en haal er touwtjes doorheen om de brug op te hijsen.",
          "Plak {TITLE} trots op de kasteelmuur als heerser van het koninkrijk!"
        ],
        "en": [
          "Snip battlements along the rims of both tubes to form fortified fortress watchtowers.",
          "Slice an arched gate in the box face, keeping the bottom edge intact as a hinge.",
          "Punch two holes near the top corners of the drawbridge door and thread pulling strings through.",
          "Station {TITLE} triumphantly on the parapet to rule over the royal court!"
        ],
        "de": [
          "Schneide Zinnen in die Papprollen für wehrhafte Wachtürme.",
          "Schneide ein Tor in die Schachtelwand, wobei die Unterkante als Klappscharnier bleibt.",
          "Ziehe zwei Schnüre durch die Türoberkante, um die Brücke hochzuziehen.",
          "Setze {TITLE} auf die Schlossmauer und bewache dein Königreich!"
        ],
        "fr": [
          "Découpez des créneaux au sommet des rouleaux pour créer deux hautes tours de guet.",
          "Découpez une porte en arche en conservant le bas comme charnière pliante.",
          "Enfilez deux cordelettes pour manœuvrer le pont-levis à volonté.",
          "Installez {TITLE} sur les remparts pour veiller sur le royaume enchanté!"
        ]
      }
    },
    {
      "icon": "🪞",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Magische Handspiegel van de Sneeuwkoningin",
        "en": "Enchanted Handheld Vanity Mirror",
        "de": "Magischer Handspiegel der Schneekönigin",
        "fr": "Miroir Magique Enchanté des Contes de Fées"
      },
      "descriptions": {
        "nl": "Plak glanzend aluminiumfolie als spiegelglas in een sierlijk kader met {TITLE} en stel hem de beroemde vraag!",
        "en": "Frame reflective silver foil inside an ornate cutout handle with {TITLE} to mimic Snow White's magic mirror.",
        "de": "Spanne Alufolie als Spiegelfläche in einen kunstvollen Griff mit {TITLE} für dein Märchenspiel.",
        "fr": "Placez une feuille d'aluminium réfléchissante dans un cadre orné de {TITLE} pour interroger le miroir magique."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton",
          "Keuken aluminiumfolie",
          "Glitterlijm en parels"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Cardboard backer",
          "Kitchen foil",
          "Craft pearls and sequins"
        ],
        "de": [
          "{TITLE} Bild",
          "Fester Karton",
          "Alufolie",
          "Glitzer und Perlen"
        ],
        "fr": [
          "Feuille {TITLE}",
          "Carton rigide",
          "Feuille d'aluminium ménager",
          "Perles et paillettes"
        ]
      },
      "steps": {
        "nl": [
          "Teken de vorm van een klassieke handspiegel met een handvat op stevig karton en knip uit.",
          "Plak een strakgetrokken stukje aluminiumfolie in het midden als echt spiegelend glas.",
          "Knip de mooiste ornamenten en figuren van {TITLE} uit en plak ze rond de rand van de spiegel.",
          "Versier met glitterlijm en vraag: \"Spiegeltje, spiegeltje aan de wand...\""
        ],
        "en": [
          "Sketch a vintage mirror silhouette with a comfortable handle on thick cardstock and cut out.",
          "Paste smooth wrinkle-free kitchen foil across the center oval to reflect light.",
          "Border the frame with delicate fairy motifs and characters snipped from {TITLE}.",
          "Accentuate with faux pearls and ask: \"Mirror, mirror on the wall, who is the fairest of them all?\""
        ],
        "de": [
          "Zeichne einen Handspiegel mit Griff auf Karton und schneide die Form aus.",
          "Klebe ein glattes Stück Alufolie als Spiegelfläche in die Mitte.",
          "Umrande den Spiegel mit den feinsten Zeichnungen von {TITLE}.",
          "Verziere mit Glitzer und spiele die berühmte Märchenszene nach!"
        ],
        "fr": [
          "Tracez la silhouette d'un miroir à manche d'époque sur du carton et découpez.",
          "Collez un morceau d'aluminium bien lisse au centre pour créer la surface réfléchissante.",
          "Décorez tout le pourtour avec les détails délicats de {TITLE}.",
          "Ajoutez des strass et récitez: \"Miroir, mon beau miroir, dis-moi qui est la plus belle...\""
        ]
      }
    },
    {
      "icon": "🦄",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Glinsterende Eenhoorn & Sprookjes Diadeem",
        "en": "Glitter Unicorn Horn & Floral Headband",
        "de": "Glänzender Einhorn-Haarreif mit Blüten",
        "fr": "Serre-Tête Corne de Licorne & Fleurs Magiques"
      },
      "descriptions": {
        "nl": "Rol een gouden spiraalhoorn, versier met bloemetjes uit {TITLE} en bevestig hem op een comfortabele haarband.",
        "en": "Roll a spiraling pastel horn and accent with paper flowers from {TITLE} to wear on any headband.",
        "de": "Rolle ein gedrehtes Zauberhorn aus Papier, dekoriere es mit {TITLE}-Blumen und befestige es am Haarreif.",
        "fr": "Confectionnez une corne torsadée et ornez-la des fleurs féeriques de {TITLE} sur un serre-tête."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Vouwkarton",
          "Gewone plastic diadeem of elastische band",
          "Lijmpistool of stevige lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Craft cardstock",
          "Plastic headband or elastic band",
          "Craft glue"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier",
          "Haarreif oder Gummiband",
          "Bastelkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papier cartonné souple",
          "Serre-tête ou élastique",
          "Colle forte"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de bloemen, sterren en magische details van {TITLE} met dromerige kleuren.",
          "Rol een stukje geel of roze papier tot een strakke kegelvorm als hoorn en plak de naad dicht.",
          "Knip twee schattige oortjes en de bloemen uit {TITLE}.",
          "Lijm de hoorn, oortjes en bloemen bovenop de diadeem en transformeer jezelf in een mythisch wezen!"
        ],
        "en": [
          "Color celestial stars and botanical blossoms in {TITLE} using pastel rainbow hues.",
          "Roll a sheet of cardstock into a tapered cone horn and wrap with golden twine.",
          "Trim two matching animal ears and flower clusters from the artwork.",
          "Fasten the horn and floral accents atop your headband to step into a fantasy realm!"
        ],
        "de": [
          "Male die magischen Blüten und Sterne von {TITLE} mit Pastelltönen aus.",
          "Rolle ein Blatt zu einer spitzen Kegeltüte zusammen und klebe die Kante fest.",
          "Schneide zarte Ohren und Blumen aus deiner Vorlage aus.",
          "Befestige Horn und Ohren auf dem Haarreif für einen märchenhaften Auftritt!"
        ],
        "fr": [
          "Coloriez les motifs floraux et féeriques de {TITLE} avec des teintes pastel.",
          "Enroulez une feuille pour former un cône pointu bien serré figurant la corne.",
          "Découpez deux petites oreilles assorties et les fleurs dans le dessin.",
          "Fixez la corne et les fleurs sur le serre-tête pour incarner une créature légendaire!"
        ]
      }
    },
    {
      "icon": "🛡️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Dapper Ridder- & Helden Schild met Wapen",
        "en": "Valiant Knight Crest & Heraldic Shield",
        "de": "Tapferes Ritterschild mit Wappen",
        "fr": "Bouclier de Chevalier & Blason Héraldique"
      },
      "descriptions": {
        "nl": "Knip een stoer ridderschild uit golfkarton, plak het koninklijke embleem van {TITLE} erop en bevestig een armhandvat.",
        "en": "Reinforce heavy cardboard into an authentic curved knight shield bearing {TITLE}'s heraldic crest.",
        "de": "Bastle ein stabiles Ritterschild aus Wellpappe mit dem Wappen von {TITLE} und Armgriff.",
        "fr": "Découpez un bouclier médiéval dans du carton fort avec le blason protecteur de {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig golfkarton",
          "Schilderstape of brede strook karton voor handvat",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Corrugated cardboard",
          "Cardboard strip for arm strap",
          "Scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "Wellpappe",
          "Kartonstreifen als Griffschlaufe",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton ondulé épais",
          "Lanière de carton pour la poignée",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Teken een traditionele puntige schildvorm op stevig golfkarton en knip uit.",
          "Kleur {TITLE} met krachtige, heraldische kleuren en knip de centrale figuur als familiewapen uit.",
          "Lijm het wapen precies in het midden van het schild.",
          "Niet of plak een gebogen kartonnen handvat aan de achterzijde zodat je het schild stevig vast kunt houden!"
        ],
        "en": [
          "Draw an authentic medieval pointed shield shape onto corrugated cardboard and trim cleanly.",
          "Color {TITLE} with bold champion colors and trim out the main figure as your official crest.",
          "Glue the emblem squarely into the center of the shield face.",
          "Tape a looped cardboard strap onto the reverse side for a comfortable arm grip in battle!"
        ],
        "de": [
          "Zeichne eine spitze Schildform auf dicke Wellpappe und schneide sie aus.",
          "Male {TITLE} in strahlenden Wappenfarben an und platziere es als Wappentier in der Mitte.",
          "Befestige eine gebogene Pappschlaufe als Griff auf der Rückseite.",
          "Nimm dein Schild in die Hand und verteidige das Schloss gegen Drachen!"
        ],
        "fr": [
          "Tracez une forme d'écu médiéval pointu sur du carton ondulé et découpez.",
          "Coloriez le motif héroïque de {TITLE} et collez-le au cœur du blason.",
          "Fixez une anse en carton souple au verso pour glisser votre avant-bras.",
          "Brandissez votre bouclier pour partir à la conquête des légendes!"
        ]
      }
    },
    {
      "icon": "📜",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Oude Perkamentrol met Zegellak Sluiting",
        "en": "Aged Kingdom Royal Proclamation Scroll",
        "de": "Alte königliche Pergament-Urkunde",
        "fr": "Parchemin Médiéval & Décret Royal Scellé"
      },
      "descriptions": {
        "nl": "Geef het papier van {TITLE} een antieke perkament-look met een theezakje en rol het op met een sierlijk rood lint.",
        "en": "Antique your {TITLE} coloring page with a damp tea bag to look centuries old and seal with ribbon.",
        "de": "Färbe dein {TITLE} mit einem Teebeutel auf antik und rolle es wie ein echtes königliches Dekret auf.",
        "fr": "Vieillissez le papier de {TITLE} avec un sachet de thé pour créer un parchemin royal d'époque."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Vochtig gebruikt theezakje",
          "Rood satijnen lint",
          "Rode wasco voor de zegel"
        ],
        "en": [
          "{TITLE} coloring page",
          "Damp used black tea bag",
          "Red satin ribbon",
          "Red crayon for wax seal"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Feuchter Teebeutel",
          "Rotes Geschenkband",
          "Wachsmaler für das Siegel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Sachet de thé noir humide",
          "Ruban rouge",
          "Craie rouge pour le sceau"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in met potloden en scheur de vier buitenranden lichtjes rafelig af met je vingers.",
          "Dep een vochtig theezakje over het papier zodat het een authentieke vintage sepia-tint krijgt.",
          "Laat het vel drogen en schrijf een officiële koninklijke boodschap aan de onderkant.",
          "Rol het perkament strak op en bind er een rood lint omheen met een getekende zegel!"
        ],
        "en": [
          "Color {TITLE} with pencils, then tear gentle frayed edges around all four borders by hand.",
          "Dab a warm, damp black tea bag across the paper surface to produce an authentic sepia patina.",
          "Once completely dry, pen a secret royal decree or treasure map message along the footer.",
          "Roll the parchment tightly and bind with a crimson ribbon sealed with a faux wax badge!"
        ],
        "de": [
          "Male {TITLE} aus und reiße die Kanten leicht unregelmäßig mit den Fingern ein.",
          "Tupfe vorsichtig mit einem abgekühlten Teebeutel über das Blatt für den antiken Pergament-Ton.",
          "Lasse das Blatt trocknen und verfasse einen königlichen Erlass mit Tinte.",
          "Rolle das Dokument zusammen und verschnüre es mit einem feierlichen roten Band!"
        ],
        "fr": [
          "Coloriez {TITLE} puis déchirez légèrement les bordures à la main pour créer un effet usé.",
          "Tapotez un sachet de thé humide sur toute la feuille pour lui donner une teinte bistre patinée.",
          "Une fois sec, rédigez un message royal officiel ou une carte au trésor secrète.",
          "Enroulez le rouleau et nouez un ruban rouge orné d'un sceau de cire dessiné!"
        ]
      }
    },
    {
      "icon": "✨",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Fairy Dust Lichtgevend Toverflesje",
        "en": "Luminous Fairy Dust Potion Bottle",
        "de": "Leuchtendes Feenstaub Zaubertrank-Fläschchen",
        "fr": "Fiole Magique de Poussière de Fée Luminescente"
      },
      "descriptions": {
        "nl": "Plak een miniatuur {TITLE} op een klein glazen potje gevuld met glitters en water voor een betoverend feeëndrankje.",
        "en": "Affix miniature art from {TITLE} to a small sensory potion bottle filled with glitter and magical swirls.",
        "de": "Beklebe ein kleines Glas mit {TITLE}, fülle es mit Glitzerwasser und erschaffe deinen eigenen Zaubertrank.",
        "fr": "Collez une miniature de {TITLE} sur une petite fiole garnie d'eau scintillante et de paillettes magiques."
      },
      "materials": {
        "nl": [
          "Verkleind knipsel van {TITLE}",
          "Schoon leeg glazen potje of flesje",
          "Water en paar druppels glycerine of zeep",
          "Glitters"
        ],
        "en": [
          "Mini cutout from {TITLE}",
          "Clean small jar or potion bottle",
          "Water and drops of baby oil or soap",
          "Sparkling glitter"
        ],
        "de": [
          "Miniatur {TITLE}",
          "Kleines Schraubglas",
          "Wasser & etwas Glitzer",
          "Klebeband"
        ],
        "fr": [
          "Miniature {TITLE}",
          "Petit flacon en verre",
          "Eau et paillettes",
          "Colle imperméable"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de betoverde figuur van {TITLE} met glanzende kleuren en knip hem uit op postzegelformaat.",
          "Vul het potje met water, een drupje vloeibare zeep en gouden of zilveren glitters.",
          "Draai de deksel stevig vast (eventueel met een druppeltje lijm zodat hij niet lekt).",
          "Plak je {TITLE} label op het glas, schud zachtjes en kijk hoe het magische elixer wervelt!"
        ],
        "en": [
          "Color {TITLE} with radiant hues and trim into a petite potion label.",
          "Fill the glass bottle with warm water, craft glitter, and a pump of clear hand soap to slow the swirl.",
          "Fasten the cap tightly with waterproof glue to avoid spills.",
          "Glue your character crest onto the front, give it a gentle shake, and watch the fairy dust shimmer!"
        ],
        "de": [
          "Male das {TITLE}-Motiv klein aus und schneide es als Flaschenetikett zurecht.",
          "Fülle das Glas mit Wasser, Glitzerflocken und einem Tropfen Spülmittel.",
          "Schraube den Deckel fest zu, damit nichts auslaufen kann.",
          "Schüttle die Flasche und bestaune den schwebenden Sternenstaub!"
        ],
        "fr": [
          "Coloriez le motif de {TITLE} et découpez-le au format d'une étiquette précieuse.",
          "Remplissez le bocal d'eau, de paillettes irisées et d'une larme de savon liquide.",
          "Vissez hermétiquement le bouchon pour éviter les fuites.",
          "Collez l'étiquette sur le flacon et secouez doucement pour réveiller la magie!"
        ]
      }
    },
    {
      "icon": "🎭",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Gemaskerd Bal Venetiaans Oogmasker",
        "en": "Masquerade Ball Venetian Eye Mask",
        "de": "Venezianische Maskenball Augenmaske",
        "fr": "Loup Vénitien de Bal Masqué avec Plumes"
      },
      "descriptions": {
        "nl": "Knip sierlijke amandelvormige ooggaatjes rond {TITLE}, voeg veren en glitters toe voor een sprookjesachtig bal.",
        "en": "Shape an elegant cat-eye Venetian mask around {TITLE}, festooned with craft feathers and metallic piping.",
        "de": "Schneide eine elegante Augenmaske mit {TITLE} aus und schmücke sie mit bunten Federn.",
        "fr": "Découpez un masque loup mystérieux autour de {TITLE} paré de plumes douces et de liserés dorés."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Knutselkarton",
          "Sierveertjes en glitters",
          "Elastiekje of houten handstokje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Cardstock backing",
          "Craft feathers and sequins",
          "Elastic ribbon or side stick"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier",
          "Bastelfedern & Pailletten",
          "Gummiband oder Stab"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Support cartonné",
          "Plumes colorées et paillettes",
          "Élastique fin ou tige latérale"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de sierlijke patronen en ogen van {TITLE} met feestelijke kleuren.",
          "Verstevig het papier met karton en knip voorzichtig twee ovale kijkgaten uit.",
          "Plak zachte veertjes aan de zijkant en omlijn de oogranden met glitterlijm.",
          "Bevestig een elastiekje of plak een stokje aan de zijkant om het masker mysterieus vast te houden!"
        ],
        "en": [
          "Color elaborate scrollwork patterns across {TITLE} using jewel tones.",
          "Back onto thick paper and cut smooth almond-shaped eye openings.",
          "Glue soft plume feathers at the temples and outline with metallic glitter paint.",
          "Affix a side-mounted wooden stick or elastic strap to hold the disguise at the royal ball!"
        ],
        "de": [
          "Male die Verzierungen von {TITLE} mit festlichen Farben und Glanz aus.",
          "Verstärke das Blatt und schneide vorsichtig zwei Sehschlitze aus.",
          "Dekoriere den oberen Rand mit echten Federn und Pailletten.",
          "Befestige ein Gummiband und erscheine unerkannt auf dem Maskenball!"
        ],
        "fr": [
          "Coloriez les arabesques délicates de {TITLE} avec des teintes somptueuses.",
          "Collez sur carton et évidez délicatement deux ouvertures en amande pour les yeux.",
          "Collez des plumes vaporeuses sur les côtés et soulignez les contours de paillettes.",
          "Ajoutez un élastique ou une tige latérale pour tenir votre masque lors du grand bal!"
        ]
      }
    },
    {
      "icon": "🔖",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Koninklijke Boekenlegger met Gouddraad",
        "en": "Royal Storybook Bookmark with Golden Tassel",
        "de": "Königliches Märchen-Lesezeichen mit Goldquaste",
        "fr": "Marque-Page des Mille et Une Nuits avec Cordon d'Or"
      },
      "descriptions": {
        "nl": "Vouw een chique boekenlegger met de magische figuur van {TITLE} en vlecht een kwastje van goudkleurig garen.",
        "en": "Fashion an opulent bookmark featuring {TITLE} crowned with a braided golden embroidery thread tassel.",
        "de": "Bastle ein edles Lesezeichen mit {TITLE} und flechte eine schimmernde Goldquaste.",
        "fr": "Concevez un marque-page féerique mettant en scène {TITLE} avec un gland en fil doré."
      },
      "materials": {
        "nl": [
          "Gekleurde strook van {TITLE}",
          "Goud of donkerblauw karton",
          "Perforator",
          "Gouddraad of geel garen"
        ],
        "en": [
          "Cutout strip from {TITLE}",
          "Gold or navy cardstock",
          "Hole punch",
          "Gold metallic or yellow yarn"
        ],
        "de": [
          "{TITLE}-Ausschnitt",
          "Edler Tonkarton",
          "Locher",
          "Goldenes Garn"
        ],
        "fr": [
          "Bande de {TITLE}",
          "Carton bleu nuit ou doré",
          "Perforatrice",
          "Fil doré ou jaune soleil"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de sprookjesfiguur van {TITLE} met aandacht voor magische tinten.",
          "Lijm de strook op diepblauw of goudkleurig karton voor een vorstelijke uitstraling.",
          "Perforeer bovenin een gaatje.",
          "Haal het gouden kwastje door de opening; zo raak je nooit meer de weg kwijt in je sprookjesboek!"
        ],
        "en": [
          "Color {TITLE}'s character illustration paying close attention to highlights.",
          "Layer onto midnight blue or rich gold cardstock for a regal storybook look.",
          "Punch an accurate hole centered at the top crest.",
          "Thread the gleaming gold tassel through to mark your chapters in fairy tale adventures!"
        ],
        "de": [
          "Male die Märchenfigur von {TITLE} mit feinen Schattierungen aus.",
          "Klebe den Streifen auf königsblaues Papier.",
          "Stanzt oben ein Loch hinein.",
          "Binde eine glänzende Goldquaste fest – ideal für jedes Vorlesebuch!"
        ],
        "fr": [
          "Coloriez le personnage féerique de {TITLE} avec éclat.",
          "Collez la bande sur un carton bleu nuit pour un contraste splendide.",
          "Perforez un trou centré au sommet.",
          "Passez le gland en fil d'or pour marquer les pages de vos contes préférés!"
        ]
      }
    },
    {
      "icon": "💌",
      "tagKey": "gift",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Sprookjesachtige 3D Pop-Up Kasteelkaart",
        "en": "Enchanted 3D Pop-Up Storybook Greeting Card",
        "de": "Zauberhafte 3D Pop-Up Schlosskarte",
        "fr": "Carte de Vœux Pop-Up 3D Royaume Enchanté"
      },
      "descriptions": {
        "nl": "Laat {TITLE} als door een wonder naar voren zweven zodra de ontvanger deze feestelijke kaart openvouwt.",
        "en": "Engineer an intricate pop-up tab so {TITLE} glides forward gracefully when the card unfolds.",
        "de": "Lass {TITLE} beim Öffnen der Karte wie von Zauberhand dreidimensional hervorspringen.",
        "fr": "Faites jaillir {TITLE} en relief féerique dès que votre proche ouvre cette carte de vœux."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "A4 dubbelgevouwen karton",
          "Lijmstift",
          "Schaar"
        ],
        "en": [
          "Colored {TITLE}",
          "A4/Letter folded cardstock",
          "Glue stick",
          "Safety scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Klappkarte aus Tonpapier",
          "Klebestift",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE} colorié",
          "Papier cartonné plié en deux",
          "Colle",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Vouw een vel stevig pastelkleurig karton in tweeën.",
          "Knip aan de vouwrand twee parallelle sneetjes van 2 cm en duw het lipje naar binnen als een trappetje.",
          "Knip je ingekleurde {TITLE} uit en plak deze tegen de voorzijde van het trappetje.",
          "Schrijf je wens met gouden letters op de kaart en sluit hem!"
        ],
        "en": [
          "Fold a sheet of lavender or rose cardstock in half to create your card base.",
          "Cut two parallel 1-inch slits along the inner spine and invert the tab inward.",
          "Mount your {TITLE} cutout squarely against the pop-up step.",
          "Inscribe a heartwarming message in shimmering ink and fold shut for a delightful surprise!"
        ],
        "de": [
          "Falte Tonpapier zur Hälfte als Karte.",
          "Schneide am Mittelfalz zwei 2 cm lange Schlitze ein und drücke die Lasche nach innen.",
          "Klebe {TITLE} auf die aufspringende Stufe auf.",
          "Verfasse deine Glückwünsche mit einem Goldstift auf der Innenseite!"
        ],
        "fr": [
          "Pliez une feuille cartonnée en deux pour former la carte.",
          "Découpez deux entailles parallèles sur le pli et repoussez la languette vers l'intérieur.",
          "Collez {TITLE} sur la marche pop-up mécanique.",
          "Rédigez un message magique à l'intérieur et refermez la carte!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Koninklijke Portretgalerij in Gouden Lijst",
        "en": "Royal Gallery Masterpiece in Gilded Frame",
        "de": "Königliches Galerie-Porträt im Goldrahmen",
        "fr": "Tableau de Cour Royale Encadré de Moulures Dorées"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een vorstelijke goudkleurige omlijsting en hang het op als een officieel vorstenportret.",
        "en": "Frame {TITLE} within an ornate gilded border and display it as an authentic palace portrait.",
        "de": "Rahme {TITLE} mit glänzendem Goldrand ein und präsentiere es wie ein echtes Schlossgemälde.",
        "fr": "Sublimez {TITLE} avec un cadre aux dorures baroques digne des plus grands palais."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4",
          "Gouden verf of metallic stift",
          "Passe-partout"
        ],
        "en": [
          "Finished art of {TITLE}",
          "A4/Letter frame",
          "Gold paint or metallic marker",
          "Mat board"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "A4 Bilderrahmen",
          "Goldfarbe / Stift",
          "Passepartout"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre A4",
          "Peinture dorée ou feutre doré",
          "Passe-partout"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de jurk, het kasteel of het personage van {TITLE} met veel diepte en schaduwen in.",
          "Teken met een gouden metallic stift barokke krullen en patronen op het passe-partout kader.",
          "Lijm het schilderij zorgvuldig gecentreerd in het kader.",
          "Onderteken je meesterwerk en hang het op in de kamer!"
        ],
        "en": [
          "Finish coloring robes and scenic landscapes in {TITLE} using deep royal pigments.",
          "Draw baroque swirls and filigree accents on the mat border with gold metallic markers.",
          "Mount the illustration centered inside the frame.",
          "Sign your signature in the corner and mount upon your wall like royal hall of fame art!"
        ],
        "de": [
          "Male die Details von {TITLE} mit königlichen Schattierungen aus.",
          "Verziere den Passepartout-Rand mit goldenen Ornamenten und Ranken.",
          "Setze das Kunstwerk zentriert in den Rahmen ein.",
          "Setze deine Signatur in die Ecke und hänge dein Schloss-Porträt auf!"
        ],
        "fr": [
          "Peaufinez les étoffes et décors de {TITLE} avec des nuances profondes.",
          "Dessinez des volutes dorées baroques sur les bordures du passe-partout.",
          "Centrez votre illustration dans le cadre.",
          "Signez fièrement au bas du tableau avant de l'exposer dans votre galerie personnelle!"
        ]
      }
    }
  ],
  "art-aesthetic": [
    {
      "icon": "☕",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Geometrische Kurk-Onderzetters voor Thee & Koffie",
        "en": "Mindful Geometric Cork Drink Coasters",
        "de": "Geometrische Kork-Untersetzer für Tee & Kaffee",
        "fr": "Dessous de Verre Géométriques Zen en Liège"
      },
      "descriptions": {
        "nl": "Lamineer cirkels uit je ingekleurde {TITLE} en plak ze op ronde kurken schijfjes om je houten tafel te beschermen.",
        "en": "Mount laminated circular segments of {TITLE} onto round cork pads for heat-resistant artistic drink coasters.",
        "de": "Laminiere runde Ausschnitte von {TITLE} und klebe sie auf Korkscheiben als hitzebeständige Untersetzer.",
        "fr": "Plastifiez des découpes circulaires de {TITLE} montées sur liège pour créer d'élégants dessous de tasse."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Ronde kurken schijven (10 cm)",
          "Zelfklevend transparant folie",
          "Lijm en schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Round cork coaster blanks (4 inch)",
          "Clear laminate film",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Runde Korkscheiben",
          "Selbstklebefolie",
          "Kleber und Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Rondelles de liège",
          "Film protecteur transparent",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de symmetrische patronen van {TITLE} zorgvuldig in met harmonieuze kleuren.",
          "Trek een cirkel van 9,5 cm om het mooiste detail en knip uit.",
          "Plak doorzichtig plakplastic over de afbeelding zodat hij bestand is tegen vochtige theeglazen.",
          "Lijm de cirkel op de kurken schijf en geniet van een mindful theemoment!"
        ],
        "en": [
          "Fill in the balanced geometric rings of {TITLE} with a soothing mindful palette.",
          "Trace a 3.8-inch circle around the most striking mandala motif and trim neatly.",
          "Cover with clear laminate contact paper to seal against hot coffee or tea condensation.",
          "Glue onto your cork base and enjoy a tranquil Zen coffee break!"
        ],
        "de": [
          "Male die Mandala-Muster von {TITLE} mit harmonischen Farben meditativ aus.",
          "Schneide einen Kreis mit 9,5 cm Durchmesser aus dem schönsten Bereich aus.",
          "Schütze die Oberfläche mit transparenter Folie vor Wassertropfen.",
          "Klebe den Kreis auf den Korken und serviere deinen Tee mit Stil!"
        ],
        "fr": [
          "Coloriez les motifs symétriques de {TITLE} avec des teintes apaisantes.",
          "Découpez un cercle centré sur les plus beaux détails du mandala.",
          "Recouvrez d'un film transparent imperméable pour résister à la condensation.",
          "Fixez sur la rondelle de liège pour savourer une pause thé pleine de sérénité!"
        ]
      }
    },
    {
      "icon": "🕯️",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "25 min",
      "titles": {
        "nl": "Sfeervol Windlicht & Kaarsenhouder Wikkel",
        "en": "Ambient Luminary & Candle Lantern Wrap",
        "de": "Stimmungsvolles Windlicht & Teelichthalter",
        "fr": "Photophore Ambiance Zen & Lanterne Tamisée"
      },
      "descriptions": {
        "nl": "Wikkel je ingekleurde {TITLE} om een glazen potje met een theelichtje erin voor een magisch warm schaduwspel.",
        "en": "Wrap translucent oiled patterns from {TITLE} around a glass jar to cast peaceful flickering candle shadows.",
        "de": "Wickle dein ausgemaltes {TITLE} um ein Glas mit Teelicht und genieße das sanfte Kerzenlichtspiel.",
        "fr": "Enroulez votre {TITLE} autour d'un bocal en verre pour diffuser une douce lumière tamisée et apaisante."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Schoon glazen potje",
          "Een druppel babyolie",
          "Led-theelichtje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Clean glass mason jar",
          "A drop of baby oil",
          "Flameless LED tealight"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Sauberes Einmachglas",
          "Tropfen Babyöl",
          "LED-Teelicht"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Bocal en verre",
          "Une goutte d'huile",
          "Bougie chauffe-plat LED"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de patronen van {TITLE} in met warme oranje, paarse en gouden tinten.",
          "Wrijf met een doekje een heel klein drupje babyolie over het papier zodat het lichtdoorlatend wordt.",
          "Knip de strook op maat en plak deze rond de buitenkant van het glazen potje.",
          "Plaats een led-theelichtje binnenin en bewonder de rustgevende gloed!"
        ],
        "en": [
          "Color the intricate motifs of {TITLE} in warm twilight ambers, purples, and golds.",
          "Rub a tiny drop of baby oil across the paper backside to turn it into glowing parchment.",
          "Trim to height and tape snugly around the outer cylinder of your glass jar.",
          "Drop a safe LED tealight inside and watch the intricate shadows dance across the walls!"
        ],
        "de": [
          "Male die feinen Ornamente von {TITLE} in warmen Dämmerungsfarben aus.",
          "Reibe etwas Öl auf die Rückseite des Papiers, um es durchscheinend zu machen.",
          "Schneide die Banderole passend zu und klebe sie um das Glas.",
          "Schalte ein LED-Teelicht ein und entspanne im sanften Schein!"
        ],
        "fr": [
          "Coloriez les mandalas de {TITLE} avec des nuances crépusculaires dorées et pourpres.",
          "Appliquez un voile d'huile au dos de la feuille pour rendre le motif translucide.",
          "Ajustez et collez la bande autour du bocal en verre.",
          "Déposez une bougie LED à l'intérieur pour créer une atmosphère de méditation!"
        ]
      }
    },
    {
      "icon": "🧘",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Mindful Meditatie- & Notitieboek Omslag",
        "en": "Mindfulness Journal & Planner Cover Wrap",
        "de": "Achtsamkeits-Tagebuch & Notizheft-Umschlag",
        "fr": "Couverture de Carnet de Gratitude & Journal Intime"
      },
      "descriptions": {
        "nl": "Kaft je favoriete notitieboek of dagboek met {TITLE} voor een dagelijkse dosis rust en creatieve inspiratie.",
        "en": "Cover your personal diary or sketch journal with {TITLE} for daily calm and mindful reflection.",
        "de": "Schlage dein Notizbuch oder Tagebuch mit {TITLE} ein für tägliche Inspiration und innere Ruhe.",
        "fr": "Habillez votre carnet de notes ou journal intime avec {TITLE} pour un rituel d'écriture inspirant."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Notitieboek of schriftje",
          "Zelfklevend kaftplastic",
          "Plakband en schaar"
        ],
        "en": [
          "Finished {TITLE}",
          "Blank notebook or journal",
          "Clear book laminate",
          "Tape and scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Notizbuch / Notizheft",
          "Klarsichtfolie",
          "Klebeband & Schere"
        ],
        "fr": [
          "{TITLE} colorié",
          "Carnet ou cahier de notes",
          "Film protège-cahier transparent",
          "Adhésif et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kleurplaat ontspannen in met je favoriete kleurenpalet.",
          "Leg het opengevouwen notitieboek op de achterkant van het blad en vouw de randen naar binnen om.",
          "Plak de hoeken strak vast aan de binnenkant van de kaft met plakband.",
          "Breng transparant kaftplastic aan zodat je unieke kaft jarenlang mooi blijft!"
        ],
        "en": [
          "Color the illustration mindfully, focusing on your breathing with each gentle stroke.",
          "Place your opened notebook spine centered onto the blank back of the sheet.",
          "Fold a 1-inch border over the front and back inner covers, taping tightly in place.",
          "Shield with clear laminate wrap to preserve your personalized sanctuary journal!"
        ],
        "de": [
          "Male das Bild achtsam und entspannt mit deinen Lieblingsfarben aus.",
          "Lege das aufgeschlagene Heft mittig auf die Rückseite des Blattes.",
          "Falte die Überstände um die Buchdeckel nach innen und fixiere sie mit Klebestreifen.",
          "Schütze den Einband mit transparenter Folie für jahrelange Freude!"
        ],
        "fr": [
          "Coloriez chaque détail dans le calme et la pleine conscience.",
          "Posez le carnet ouvert au centre du verso de la feuille.",
          "Rabattez les bords vers l'intérieur de la couverture et fixez avec de l'adhésif.",
          "Recouvrez d'un film protecteur pour emporter votre carnet partout avec vous!"
        ]
      }
    },
    {
      "icon": "🪷",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "3D Lotusbloem & Origami Rozet Decoratie",
        "en": "3D Lotus Blossom & Origami Mandala Rosette",
        "de": "3D Lotusblüte & Gefaltete Mandala-Rosette",
        "fr": "Rosace 3D en Fleur de Lotus & Origami Décoratif"
      },
      "descriptions": {
        "nl": "Vouw je ingekleurde {TITLE} als een harmonicawaaier tot een schitterende 3D rozet voor aan de muur.",
        "en": "Accordion-fold strips of {TITLE} and fan them out into an intricate dimensional wall rosette.",
        "de": "Falte Streifen von {TITLE} wie eine Ziehharmonika zu einer prächtigen 3D-Wandblüte.",
        "fr": "Pliez votre dessin {TITLE} en accordéon pour créer une somptueuse rosace murale en relief."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Nietmachine of lijm",
          "Satijnen ophanglintje",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Stapler or craft glue",
          "Hanging satin loop",
          "Scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "Tacker oder Klebstoff",
          "Aufhängeband",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Agrafeuse ou colle",
          "Ruban de suspension",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kleurplaat helemaal vol met kleurrijke patronen.",
          "Snijd het blad in twee gelijke stroken en vouw beide stroken als een harmonica met plooien van 1,5 cm.",
          "Niet de twee gevouwen stroken in het midden stevig aan elkaar.",
          "Vouw de uiteinden open tot een volle ronde cirkel en plak de randen aan elkaar vast!"
        ],
        "en": [
          "Cover {TITLE} completely in vibrant radiating color gradients.",
          "Cut into two equal horizontal strips and pleat both like an accordion with 0.5-inch folds.",
          "Staple the pleated strips together tightly at the midpoint.",
          "Fan open the outer pleats into a continuous full circle and glue the adjoining ends!"
        ],
        "de": [
          "Male die Flächen von {TITLE} mit leuchtenden Kontrasten aus.",
          "Schneide das Blatt in zwei Längsstreifen und falte sie im Zickzack-Muster.",
          "Tackere beide Streifen in der Mitte fest zusammen.",
          "Fächere die Papierschichten zu einem Kreis auf und klebe die Kanten aneinander!"
        ],
        "fr": [
          "Remplissez toute la feuille avec des dégradés harmonieux.",
          "Coupez la feuille en deux bandes et pliez chacune en accordéon régulier.",
          "Agrafez solidement les deux bandes repliées en leur centre.",
          "Déployez les plis en éventail circulaire et collez les extrémités jointives!"
        ]
      }
    },
    {
      "icon": "🎨",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "Puntjes Dot-Art met Acrylverf & Wattenstaafjes",
        "en": "Aboriginal-Style Dot Mandala Painting",
        "de": "Punktmalerei Dot-Art mit Wattestäbchen",
        "fr": "Peinture par Points Dot-Art & Méditation Visuelle"
      },
      "descriptions": {
        "nl": "Gebruik het uiteinde van een satéprikker of wattenstaafje om ritmische stippen acrylverf over de lijnen van {TITLE} te stempelen.",
        "en": "Dip cotton swabs and pencil erasers into acrylic paint to layer tactile dot rings across {TITLE}.",
        "de": "Tupfe mit Wattestäbchen und Acrylfarben meditative Farbpunkte entlang der Linien von {TITLE}.",
        "fr": "Déposez des points de peinture acrylique au coton-tige le long des tracés de {TITLE} pour un effet dot-art."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Acrylverf (diverse felle kleuren)",
          "Wattenstaafjes en potloodgummetjes",
          "Verfbordje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Acrylic craft paints",
          "Cotton swabs and pencil erasers",
          "Paint palette"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Acrylfarben",
          "Wattestäbchen & Radiergummis",
          "Farbpalette"
        ],
        "fr": [
          "Coloriage {TITLE}",
          "Peinture acrylique",
          "Cotons-tiges et gommes au bout de crayons",
          "Palette"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de basisvlakken rustig in met een lichte ondertoon.",
          "Doop de ronde top van een wattenstaafje loodrecht in een druppel verf.",
          "Druk zachte, gelijkmatige stipjes op de geometrische lijnen van {TITLE}.",
          "Wissel af met verschillende formaten stipjes van het centrum naar buiten toe voor een hypnotiserend effect!"
        ],
        "en": [
          "Shade the base background lightly in muted watercolor or colored pencil.",
          "Dip the round tip of a cotton swab straight down into thick acrylic paint.",
          "Stamp measured, rhythmic dots directly over the contour lines of {TITLE}.",
          "Alternate dot sizes from center outward for a breathtaking tactile texture!"
        ],
        "de": [
          "Töne den Hintergrund zunächst zart mit Buntstiften ab.",
          "Tauche die Spitze eines Wattestäbchens senkrecht in die Acrylfarbe.",
          "Stemple gleichmäßige Farbpunkte entlang der Symmetrielinien von {TITLE}.",
          "Verändere die Punktgrößen nach außen hin für eine faszinierende Tiefenwirkung!"
        ],
        "fr": [
          "Coloriez le fond avec des teintes légères en dégradé.",
          "Trempez l'embout d'un coton-tige verticalement dans la peinture acrylique.",
          "Appliquez des points réguliers le long des contours géométriques de {TITLE}.",
          "Variez la taille des points du centre vers les bords pour un relief tactile unique!"
        ]
      }
    },
    {
      "icon": "🪟",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Zen Mandala Zonnevanger voor het Raam",
        "en": "Zen Mandala Stained Glass Suncatcher",
        "de": "Zen Mandala Fenster-Sonnenfänger",
        "fr": "Attrape-Soleil Vitrail Mandala Énergisant"
      },
      "descriptions": {
        "nl": "Kleur met felle markeerstiften en maak het papier semi-transparant met olie voor schitterend gekleurd licht in de kamer.",
        "en": "Saturate intricate facets in neon ink and oil the reverse to turn {TITLE} into radiant window art.",
        "de": "Male Facetten mit Neonstiften aus und öle die Rückseite für wunderschöne Lichteffekte am Fenster.",
        "fr": "Remplissez les facettes aux feutres vifs et huilez le dos pour projeter des halos lumineux dans la pièce."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Viltstiften of markeerstiften",
          "Een druppel olie",
          "Wattenstaafje en plakband"
        ],
        "en": [
          "{TITLE} coloring page",
          "Bright markers or highlighters",
          "A drop of vegetable or baby oil",
          "Tape"
        ],
        "de": [
          "{TITLE} Bild",
          "Leuchtende Filzstifte",
          "Etwas Pflanzenöl",
          "Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Feutres fluorescents",
          "Goutte d'huile douce",
          "Ruban adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de patronen in met contrasterende kleuren zodat elk vlakje helder afsteekt.",
          "Wrijf met een wattenstaafje lichtjes babyolie over de achterzijde van het papier.",
          "Veeg het blad droog met keukenpapier; het papier wordt kristalhelder doorschijnend!",
          "Plak het blad met plakband tegen een zonnig raam en zie de kamer oplichten in kleur."
        ],
        "en": [
          "Fill each quadrant with contrasting high-saturation hues so facets pop.",
          "Brush a cotton swab dipped in baby oil across the entire back side.",
          "Blot thoroughly with kitchen towels; the sheet transforms into translucent stained glass!",
          "Tape securely to an east-facing window to bathe your room in colored sunbeams every dawn."
        ],
        "de": [
          "Fülle alle Segmente mit leuchtenden Komplementärfarben aus.",
          "Bestreiche die Rückseite hauchdünn mit Öl.",
          "Wische überschüssiges Öl mit Küchenpapier ab – das Papier wird glasartig durchsichtig!",
          "Befestige es an einer Fensterscheibe und genieße das sanfte Farbenspiel!"
        ],
        "fr": [
          "Coloriez chaque facette avec des couleurs vives et contrastées.",
          "Passez délicatement un coton-tige imbibé d'huile au dos de la feuille.",
          "Épongez soigneusement avec un papier absorbant pour révéler la transparence.",
          "Fixez sur une fenêtre ensoleillée pour illuminer votre intérieur de reflets colorés."
        ]
      }
    },
    {
      "icon": "🎐",
      "tagKey": "decor",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Japanse Windgong & Rustgevende Klokjes",
        "en": "Japanese Zen Wind Chime & Bell mobile",
        "de": "Japanisches Windspiel & Klangglöckchen",
        "fr": "Carillon à Vent Zen & Clochette Murale Japonaise"
      },
      "descriptions": {
        "nl": "Hang stroken en cirkels van {TITLE} aan een houten ring met belletjes die zacht rinkelen in de bries.",
        "en": "Dangle circular concentric rings of {TITLE} beneath a hoop fitted with soft chiming mini bells.",
        "de": "Hänge kreisrunde Mandala-Segmente von {TITLE} an einen Holzring mit zart klingenden Glöckchen.",
        "fr": "Suspendez des disques concentriques de {TITLE} sous un cercle garni de petites clochettes tressées."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Borduurring of stevig kartonnen ringetje",
          "Touwtjes en 3 kleine rinkelbelletjes",
          "Schaar"
        ],
        "en": [
          "Colored {TITLE}",
          "Embroidery hoop or cardstock ring",
          "Twine and 3 small craft jingle bells",
          "Scissors"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Stickrahmen oder Pappring",
          "Schnur & kleine Glöckchen",
          "Schere"
        ],
        "fr": [
          "{TITLE} colorié",
          "Cercle à broder ou anneau rigide",
          "Ficelle et 3 petits grelots",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Knip 3 tot 5 cirkels van verschillende formaten uit je ingekleurde {TITLE}.",
          "Lamineer de cirkels of plak ze op stevig papier.",
          "Bevestig touwtjes aan de houten ring en knoop de cirkels op wisselende hoogtes vast.",
          "Knoop onderaan elk touwtje een belletje en hang je windgong bij een open raam of terras!"
        ],
        "en": [
          "Cut 3 to 5 concentric circular discs of varying diameters from your {TITLE} artwork.",
          "Mount onto cardstock for wind resistance and balance.",
          "Knot strings at staggered lengths around the outer perimeter of the hoop ring.",
          "Tie delicate jingle bells to the lowest fringe and suspend where gentle breezes make them sing!"
        ],
        "de": [
          "Schneide 3 bis 5 Kreise in verschiedenen Größen aus deinem Kunstwerk aus.",
          "Verstärke die Kreise mit festem Tonpapier.",
          "Binde Schnüre in unterschiedlichen Längen an den Reifen.",
          "Befestige Glöckchen an den Enden und lausche dem beruhigenden Klang im Wind!"
        ],
        "fr": [
          "Découpez 3 à 5 disques de tailles dégressives dans votre coloriage {TITLE}.",
          "Renforcez chaque disque sur un carton léger.",
          "Nouez des fils de longueurs variées autour de l'anneau.",
          "Attachez les grelots au bas de chaque fil pour profiter d'un tintement relaxant!"
        ]
      }
    },
    {
      "icon": "🎁",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Luxe Cadeaupapier & Boekomslag",
        "en": "Artisan Designer Gift Wrap & Parcel Band",
        "de": "Design-Geschenkpapier & Buchbanderole",
        "fr": "Papier Cadeau Artisanal & Bandeau Décoratif"
      },
      "descriptions": {
        "nl": "Verpak een mooi boek of cadeautje in {TITLE} met een contrasterend jute touwtje voor een onvergetelijke presentatie.",
        "en": "Enclose a novel or gift box in {TITLE} bound with natural jute twine and a fresh sprig of lavender.",
        "de": "Verpacke Geschenke stilvoll in {TITLE} und binde sie mit Naturkordel und einem Lavendelzweig zusammen.",
        "fr": "Emballez un livre ou un présent délicat avec {TITLE} et liez d'une ficelle naturelle ornée d'un brin de lavande."
      },
      "materials": {
        "nl": [
          "Voltooid blad van {TITLE}",
          "Jute touw of satijnlint",
          "Takje lavendel of gedroogde bloem",
          "Plakband"
        ],
        "en": [
          "Finished {TITLE} sheet",
          "Natural jute twine or ribbon",
          "Dried flower sprig",
          "Clear tape"
        ],
        "de": [
          "Fertiges {TITLE}-Blatt",
          "Juteschnur oder Satinband",
          "Trockenblume",
          "Klebeband"
        ],
        "fr": [
          "Feuille {TITLE} achevée",
          "Ficelle de jute ou ruban",
          "Brin de fleur séchée",
          "Adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} met elegante, stijlvolle tinten.",
          "Vouw het blad strak om een cadeau of boekje heen en zet de vouwen vast met een klein plakbandje.",
          "Wikkel jute touw twee keer kruislings rond het pakketje.",
          "Steek een geurend takje lavendel of droogbloem onder het touw voor een rustgevend geschenk!"
        ],
        "en": [
          "Color {TITLE} with refined botanical or monochromatic tones.",
          "Wrap tightly around your gift package, creasing sharp corners neatly with tape.",
          "Crisscross rustic jute twine twice across the belly of the parcel.",
          "Tuck a fragrant sprig of dried lavender under the knot for a presentation straight out of an art boutique!"
        ],
        "de": [
          "Male {TITLE} in eleganten, zeitlosen Farben aus.",
          "Schlage das Geschenk sauber darin ein und klebe die Kanten fest.",
          "Wickle Juteschnur kreuzweise um das Päckchen.",
          "Stecke einen kleinen Lavendelzweig darunter – das edelste Geschenk auf jedem Tisch!"
        ],
        "fr": [
          "Coloriez {TITLE} dans un camaïeu de couleurs raffinées.",
          "Emballez soigneusement votre cadeau en marquant bien les plis.",
          "Croisez une ficelle de jute naturelle autour du paquet.",
          "Glissez un brin de lavande sous le nœud pour un emballage digne d'une boutique d'artisanat!"
        ]
      }
    },
    {
      "icon": "🧩",
      "tagKey": "game",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Complexe Concentratie Mandala Puzzel",
        "en": "Mindful Mandala Meditation Jigsaw",
        "de": "Kniffliges Mandala Gedächtnis-Puzzle",
        "fr": "Puzzle Mandala de Méditation & Haute Concentration"
      },
      "descriptions": {
        "nl": "Maak een uitdagende legpuzzel met ronde en gebogen stukjes die je geduld en focus traint.",
        "en": "Mount {TITLE} to heavy chipboard and cut curving spiral tiles for a calming solo focus puzzle.",
        "de": "Verwandle {TITLE} in ein anspruchsvolles Puzzle mit geschwungenen Teilen für tiefe Entspannung.",
        "fr": "Transformez {TITLE} en un puzzle aux courbes sinueuses exigeant calme et concentration absolue."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig grijskarton",
          "Potlood en liniaal",
          "Scherpe schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Heavy grey chipboard",
          "Pencil and compass",
          "Craft scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Graukarton",
          "Bleistift",
          "Scharfe Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton gris dense",
          "Crayon et compas",
          "Bons ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de kleurplaat intensief in met verfijnde patronen.",
          "Plak het blad strak en zonder bobbels op dik karton.",
          "Teken op de achterkant een spiraalvormig patroon van 20 tot 30 in elkaar grijpende stukjes.",
          "Knip alle stukjes los en ervaar de ontspanning van het leggen van je eigen mandala-puzzel!"
        ],
        "en": [
          "Color {TITLE} with dense, intricate patterns so every piece has unique visual cues.",
          "Mount smooth and flat onto heavy chipboard with a craft glue stick.",
          "Draw an organic web of 24 to 32 interlocking curving pieces on the reverse.",
          "Cut out carefully and treat yourself to a deeply satisfying mindfulness puzzle session!"
        ],
        "de": [
          "Male {TITLE} mit detailreichen Mustern vollständig aus.",
          "Klebe das Blatt faltenfrei auf festen Graukarton.",
          "Zeichne auf die Rückseite 20 bis 30 geschwungene Puzzleteile.",
          "Schneide die Teile aus und finde Ruhe beim meditativen Wiederzusammensetzen!"
        ],
        "fr": [
          "Coloriez minutieusement chaque détail pour offrir des repères visuels distincts.",
          "Collez parfaitement la feuille sur un carton rigide.",
          "Tracez au dos un réseau de 20 à 30 pièces aux formes galbées.",
          "Découpez chaque pièce et goûtez au plaisir d'une séance de puzzle méditative!"
        ]
      }
    },
    {
      "icon": "🌿",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Geperste Bloemen & Mandala Wandbord",
        "en": "Pressed Botanicals & Mandala Wall Plate",
        "de": "Gepresste Blüten & Mandala-Wandteller",
        "fr": "Tableau Botanique de Fleurs Séchées & Mandala"
      },
      "descriptions": {
        "nl": "Combineer de strakke lijnen van {TITLE} met echte gedroogde bloemblaadjes op een rond bordje.",
        "en": "Embellish the mandala symmetry of {TITLE} with real pressed flowers on a round display plate.",
        "de": "Kombiniere die Linien von {TITLE} mit getrockneten Blütenblättern auf einem Wandteller.",
        "fr": "Harmonisez les arabesques de {TITLE} avec de vraies fleurs séchées pressées sur assiette décorative."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Geperste droogbloemen",
          "Kartonnen bordje of schildersdoek",
          "Blanke vernis of lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "Pressed dried flowers",
          "Paper plate or small canvas",
          "Clear decoupage varnish"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Gepresste Trockenblumen",
          "Pappteller oder Keilrahmen",
          "Serviettenkleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Fleurs séchées sous presse",
          "Assiette en carton ou toile",
          "Vernis-colle transparent"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de centrale cirkel van {TITLE} in met zachte aardetinten.",
          "Plak de cirkel in het midden van een rond wit kartonnen bordje.",
          "Lijm gedroogde bloemblaadjes symmetrisch tussen de uitstralende patronen.",
          "Breng een beschermend laagje vernis aan en hang je botanische wandbord aan de muur!"
        ],
        "en": [
          "Color {TITLE} in soft muted earth tones of sage green, terracotta, and cream.",
          "Glue the central mandala disc neatly into the center of a circular plate or round canvas.",
          "Affix real pressed daisy or lavender petals radiating in symmetry with the lines.",
          "Brush with clear decoupage sealer and display as an organic wellness focal point!"
        ],
        "de": [
          "Male {TITLE} in sanften Salbei-, Terrakotta- und Erdtönen aus.",
          "Klebe das Motiv mittig auf einen runden Teller oder eine Leinwand.",
          "Platziere getrocknete Blütenblätter symmetrisch entlang der Linien.",
          "Versiegle das Werk mit Klarlack und hänge deinen Natur-Wandteller auf!"
        ],
        "fr": [
          "Coloriez {TITLE} avec des teintes sauge, terracotta et crème.",
          "Fixez le mandala découpé au cœur d'une assiette ronde ou d'un châssis.",
          "Collez délicatement les pétales séchés en respectant la symétrie rayonnante.",
          "Protégez d'une couche de vernis-colle pour admirer votre création florale au mur!"
        ]
      }
    },
    {
      "icon": "🏷️",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Meditatieve Cadeau- & Geurkaartjes",
        "en": "Aromatherapy Gift Tags & Scented Badges",
        "de": "Duftende Geschenk- & Achtsamkeitsanhänger",
        "fr": "Étiquettes Cadeaux d'Aromathérapie Parfumées"
      },
      "descriptions": {
        "nl": "Knip kleine cirkels uit {TITLE}, breng een druppel etherische olie aan en bind ze als geurend label aan cadeautjes.",
        "en": "Punch medallion gift tags from {TITLE}, infuse with a drop of essential oil, and tie to gifts.",
        "de": "Stanze Medaillon-Anhänger aus {TITLE}, beträufle sie mit Duftöl und hänge sie an Geschenke.",
        "fr": "Découpez de petits médaillons dans {TITLE}, parfumez d'huile essentielle et attachez à vos paquets."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Stevig karton",
          "Druppeltje lavendelolie",
          "Touwtje en perforator"
        ],
        "en": [
          "Finished {TITLE}",
          "Cardstock disc backing",
          "Drop of lavender essential oil",
          "Twine and hole punch"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Karton-Rückseite",
          "Tropfen Lavendelöl",
          "Kordel & Locher"
        ],
        "fr": [
          "{TITLE} colorié",
          "Carton rond",
          "Goutte d'huile essentielle de lavande",
          "Ficelle et perforatrice"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de patronen van {TITLE} met veel fijne details in.",
          "Knip 4 tot 6 ronde medaillons uit en plak ze op dik karton.",
          "Perforeer bovenin een gaatje en haal er een touwtje doorheen.",
          "Doe één minuscuul drupje etherische lavendelolie op de achterkant voor een heerlijk geurend cadeau!"
        ],
        "en": [
          "Color {TITLE} with fine point gel pens or sharp colored pencils.",
          "Punch 4 to 6 round medallion tags and glue firmly to thick cardstock backers.",
          "Punch a hole at the top and thread natural twine.",
          "Add a single drop of relaxing lavender or citrus essential oil to the back for scented luxury!"
        ],
        "de": [
          "Male die feinen Muster von {TITLE} sorgfältig aus.",
          "Schneide 4 bis 6 runde Geschenkanhänger aus und verstärke sie mit Karton.",
          "Stanzt oben ein Loch hinein und fädle eine Kordel durch.",
          "Träufle einen Tropfen Duftöl auf die Rückseite – ein duftendes Fest für die Sinne!"
        ],
        "fr": [
          "Coloriez les motifs avec des feutres fins ou crayons bien taillés.",
          "Découpez 4 à 6 médaillons circulaires montés sur carton épais.",
          "Perforez le haut et passez une ficelle naturelle.",
          "Déposez une goutte d'huile essentielle au dos pour offrir un cadeau parfumé!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Moderne Zen Kunstgalerij in Lijst",
        "en": "Contemporary Framed Zen Art Gallery",
        "de": "Moderne Zen-Galerie im Glasrahmen",
        "fr": "Tableau Moderne d'Art Abstrait sous Verre"
      },
      "descriptions": {
        "nl": "Geef je meesterwerk {TITLE} een strak wit passe-partout en creëer een minimalistische eyecatcher in huis.",
        "en": "Frame {TITLE} inside an oversized clean white mat board for a chic contemporary gallery focal point.",
        "de": "Rahme {TITLE} mit breitem weißen Passepartout für ein modernes Designer-Wandbild ein.",
        "fr": "Encadrez {TITLE} au centre d'un large passe-partout blanc immaculé pour un rendu digne d'une galerie."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "A4 fotolijst",
          "Wit of zwart passe-partout",
          "Fotoplakkers"
        ],
        "en": [
          "Finished artwork of {TITLE}",
          "A4/Letter frame",
          "White or black mat board",
          "Mounting tape"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Bilderrahmen A4",
          "Weißes Passepartout",
          "Fotokleber"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre photo A4",
          "Passe-partout blanc ou noir",
          "Pastilles adhésives"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de tekening volledig af met vloeiende kleurovergangen en contrasten.",
          "Leg het witte passe-partout over de tekening en centreer het patroon exact in het midden.",
          "Plak de hoeken vast met fotoplakkers zodat het papier strak blijft zitten.",
          "Onderteken discreet rechtsonder en hang je zen-kunstwerk op in de woon- of slaapkamer!"
        ],
        "en": [
          "Complete the entire coloring sheet blending gradients smoothly from dark to light.",
          "Overlay an oversized pristine white mat board, centering the focal point precisely.",
          "Fasten with archival photo corners so the paper lies flat without ripples.",
          "Sign your name with a fine tip pen in the corner and display your sophisticated modern wall art!"
        ],
        "de": [
          "Schließe dein Kunstwerk mit sauberen Farbverläufen und Kontrasten ab.",
          "Zentriere das Bild millimetergenau unter dem weißen Passepartout.",
          "Fixiere die Ecken mit Fotostickern glatt im Rahmen.",
          "Setze deine Signatur in die Ecke und hänge dein Zen-Meisterwerk auf!"
        ],
        "fr": [
          "Achevez le dessin en soignant les dégradés du centre vers l'extérieur.",
          "Centrez le motif au millimètre sous la fenêtre du passe-partout blanc.",
          "Fixez les coins bien tendus avec des pastilles adhésives.",
          "Apposez votre signature en bas à droite avant d'accrocher votre œuvre d'art moderne!"
        ]
      }
    }
  ],
  "gaming-virtual-worlds": [
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Superhelden Krachtmanchetten & Polsbanden",
        "en": "Superhero Power Cuffs & Energy Bracers",
        "de": "Superhelden Kraft-Manschetten & Armbänder",
        "fr": "Manchettes de Super-Héros & Bracelets d'Énergie"
      },
      "descriptions": {
        "nl": "Knip twee wc-rollen doormidden en beplak ze met {TITLE} en bliksemschichten om je superkrachten te activeren!",
        "en": "Split cardboard tubes down the middle and armor them with {TITLE} badges to channel your superpowers!",
        "de": "Schneide Papprollen auf und beklebe sie mit {TITLE} für unbesiegbare Superhelden-Kräfte!",
        "fr": "Fendez des rouleaux cartonnés et ornez-les des emblèmes de {TITLE} pour lancer vos super-pouvoirs!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 lege wc-rollen",
          "Aluminiumfolie of zilverpapier",
          "Schaar en lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 empty toilet paper tubes",
          "Silver foil or metallic paper",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 leere Papprollen",
          "Alufolie oder Silberpapier",
          "Schere & Kleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 rouleaux en carton",
          "Papier aluminium ou argenté",
          "Ciseaux et colle"
        ]
      },
      "steps": {
        "nl": [
          "Knip beide wc-rollen in de lengte open zodat ze gemakkelijk om je polsen klemmen.",
          "Omwikkel de rollen met zilverfolie als kogelwerend pantser.",
          "Kleur de krachtige symbolen en helden van {TITLE} fel in en knip ze uit.",
          "Lijm de helden-insignes op de polsbanden, schuif ze om en red de wereld!"
        ],
        "en": [
          "Slit both cardboard tubes lengthwise so they spring open and slip comfortably over your wrists.",
          "Wrap the cuffs in silver foil for an impenetrable high-tech metallic finish.",
          "Color the fierce action icons of {TITLE} in high-voltage colors and cut out.",
          "Paste your hero badges onto each wrist guard, snap them on, and unleash your powers!"
        ],
        "de": [
          "Schneide beide Klorollen der Länge nach auf, damit sie um deine Handgelenke passen.",
          "Umwickle die Manschetten mit Alufolie für einen futuristischen Rüstungs-Look.",
          "Male die Action-Symbole von {TITLE} mit feurigen Farben aus und schneide sie aus.",
          "Klebe die Abzeichen auf deine Armbänder und ziehe ins Abenteuer!"
        ],
        "fr": [
          "Fendez les deux rouleaux sur la longueur pour les enfiler facilement aux poignets.",
          "Recouvrez les manchettes de papier argenté pour imiter un blindage de titan.",
          "Coloriez les emblèmes héroïques de {TITLE} avec des feutres éclatants.",
          "Collez les écussons sur vos bracelets, claquez vos poignets et sauvez la planète!"
        ]
      }
    },
    {
      "icon": "👾",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Retro Pixel-Art Mozaïek van Vouwblaadjes",
        "en": "Retro 8-Bit Pixel Art Mosaic Grid",
        "de": "Retro 8-Bit Pixel-Art Mosaik",
        "fr": "Mosaïque Pixel-Art Rétro 8-Bit en Carreaux"
      },
      "descriptions": {
        "nl": "Knip kleine vierkante pixel-blokjes uit gekleurd papier en plak ze op {TITLE} voor een echte vintage arcade videogame look.",
        "en": "Snip neat tiny colored paper squares and build a textured 8-bit arcade mosaic over {TITLE}.",
        "de": "Schneide kleine bunte Papierquadrate und verwandle {TITLE} in ein echtes Retro-Arcade Pixelspiel.",
        "fr": "Découpez de petits carrés de papier coloré pour composer une mosaïque rétro façon jeu vidéo d'arcade."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Gekleurde vouwblaadjes",
          "Lijmstift",
          "Schaar of papiersnijder"
        ],
        "en": [
          "{TITLE} coloring page",
          "Colored origami squares",
          "Glue stick",
          "Scissors or paper trimmer"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Buntes Faltpapier",
          "Klebestift",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papiers origami colorés",
          "Bâton de colle",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Knip verschillende kleuren vouwpapier in kleine vierkantjes van precies 1 bij 1 cm.",
          "Kies welke delen van {TITLE} je wilt inkleuren en welke vlakken je gaat bestraten met \"pixels\".",
          "Lijm de vierkante blokjes strak tegen elkaar aan in rijen alsof het een digitaal beeldscherm is.",
          "Bewonder je authentieke retro 8-bit videogame kunstwerk!"
        ],
        "en": [
          "Slice sheets of bright craft paper into precise 0.5-inch square pixel tiles.",
          "Determine which hero features of {TITLE} to color and which to pave in blocky pixels.",
          "Glue tiles tightly edge-to-edge in horizontal raster scan lines.",
          "Step back and admire your authentic 8-bit arcade gaming masterpiece!"
        ],
        "de": [
          "Schneide buntes Papier in exakte 1x1 cm kleine Mosaik-Pixelquadrate.",
          "Entscheide, welche Bereiche von {TITLE} mit Pixeln belegt werden sollen.",
          "Klebe die bunten Kacheln Reihe für Reihe nahtlos aneinander.",
          "Fertig ist dein cooles Retro-Videospiel Kunstwerk!"
        ],
        "fr": [
          "Découpez du papier vif en petits carrés réguliers de 1 cm de côté.",
          "Repérez les zones de {TITLE} à habiller de pixels colorés.",
          "Collez les carrés bord à bord en damier pour reproduire l'écran d'une console rétro.",
          "Admirez votre tableau pixélisé inspiré des plus grands classiques du jeu vidéo!"
        ]
      }
    },
    {
      "icon": "🃏",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Verzamelbare Helden Trading Cards (Ruilkaarten)",
        "en": "Collectible Hero Trading Cards with Power Stats",
        "de": "Sammelbare Helden-Sammelkarten mit Werten",
        "fr": "Cartes à Collectionner de Héros & Statistiques d'Attaque"
      },
      "descriptions": {
        "nl": "Knip {TITLE} op speelkaartformaat, bedenk statistieken (Aanval, Snelheid, HP) en speel spannende duels tegen vrienden.",
        "en": "Trim {TITLE} to standard trading card size, draft battle stats (Attack, Defense, HP), and duel your friends.",
        "de": "Schneide {TITLE} im Spielkarten-Format aus, erfinde Kampfpunkte (Angriff, Tempo, KP) und duelliere dich.",
        "fr": "Découpez {TITLE} au format carte de jeu, attribuez des points de puissance et défiez vos amis en duel."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Speelkaartkarton (6,3 x 8,8 cm)",
          "Fineliner of gelpen",
          "Lamineerhoesjes"
        ],
        "en": [
          "Colored {TITLE}",
          "Cardstock blanks (2.5 x 3.5 inch)",
          "Fine tip pen",
          "Card sleeves or laminate"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Spielkarten-Karton",
          "Fineliner",
          "Schutzhüllen"
        ],
        "fr": [
          "{TITLE} colorié",
          "Cartonnette format carte",
          "Feutre fin",
          "Protège-cartes transparents"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het karakter of wapen van {TITLE} met veel actie en contrast in.",
          "Plak de figuur op een stevig stuk karton van precies 6,3 bij 8,8 centimeter.",
          "Teken onderaan een scorebalk met aanvalskracht (ATK), verdediging (DEF) en speciale vaart (SPEED).",
          "Steek je kaart in een beschermhoesje en daag je vrienden uit voor een episch ruilkaartenspel!"
        ],
        "en": [
          "Color {TITLE}'s character illustration with fierce energy aura and high contrast.",
          "Mount onto rigid 2.5 x 3.5 inch playing card backing.",
          "Draw stat boxes along the footer listing Attack Power, Defense Shield, and Special Move.",
          "Slide into clear trading card sleeves and challenge your rivals to a showdown!"
        ],
        "de": [
          "Male die Heldenfigur von {TITLE} mit dynamischen Effekten aus.",
          "Klebe das Motiv auf eine feste Spielkarte im Standard-Format.",
          "Erstelle Wertungsfelder für Angriffskraft, Verteidigung und Spezial-Attacke.",
          "Schiebe die Karte in eine Sammelhülle und starte spannende Duelle!"
        ],
        "fr": [
          "Coloriez le personnage héroïque de {TITLE} avec une aura d'énergie vibrante.",
          "Montez l'image sur un carton découpé au format standard de 6,3 x 8,8 cm.",
          "Inscrivez les points d'Attaque, de Défense et le nom de l'Attaque Spéciale.",
          "Glissez la carte dans une pochette transparente et lancez une partie de cartes endiablée!"
        ]
      }
    },
    {
      "icon": "🚪",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Niet Storen: Gamer Bezig! Deurhanger",
        "en": "Gaming in Progress / Do Not Disturb Door Hanger",
        "de": "Gaming im Gange / Bitte Nicht Stören Türhänger",
        "fr": "Accroche-Porte Gamer: Mission en Cours / Ne Pas Déranger"
      },
      "descriptions": {
        "nl": "Maak een officiële deurhanger met {TITLE} die je aan je slaapkamerklink hangt wanneer je ongestoord wilt gamen.",
        "en": "Craft a bold bedroom door hanger featuring {TITLE} warning visitors to stay quiet during clutch matches.",
        "de": "Bastle ein Schild mit {TITLE} für deine Türklinke: Zutritt nur für echte Team-Mitglieder!",
        "fr": "Fabriquez un accroche-porte stylé avec {TITLE} pour avertir que la partie est lancée."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton (10 x 25 cm)",
          "Ronde passer of glas voor de klinkopening",
          "Stiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Heavy cardstock (4 x 10 inch)",
          "Compass or cup to trace knob hole",
          "Markers"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonkarton",
          "Glas zum Anzeichnen des Klinkenlochs",
          "Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton fort (10 x 25 cm)",
          "Verre pour tracer l'orifice de poignée",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de actieheld van {TITLE} met opvallende neonkleuren.",
          "Knip een langwerpige strook karton uit en snijd bovenin een ronde opening die om je deurklink past.",
          "Plak {TITLE} op de hanger en schrijf in grote letters: \"PRO GAMER BEZIG — NIET STOREN!\".",
          "Hang hem aan je klink wanneer je gefocust aan het spelen bent!"
        ],
        "en": [
          "Color the action pose of {TITLE} in punchy vibrant neon shades.",
          "Cut a tall cardstock rectangle, cutting a 2.5-inch circular notch at the top to slide over your door handle.",
          "Affix {TITLE} squarely in the center with bold lettering: \"LEVELING UP — DO NOT DISTURB!\".",
          "Hang over your bedroom door handle whenever you're locked in a high-stakes campaign!"
        ],
        "de": [
          "Male die Heldengestalt von {TITLE} in kräftigen Neonfarben an.",
          "Schneide einen Kartonstreifen mit rundem Loch für die Türklinke zurecht.",
          "Platziere {TITLE} auf dem Hänger und schreibe: \"LEVEL UP IM GANGE — BITTE NICHT STÖREN!\".",
          "Hänge das Schild an deine Zimmertür vor jeder Gaming-Session!"
        ],
        "fr": [
          "Coloriez la pose dynamique de {TITLE} avec des feutres néon percutants.",
          "Découpez une bande de carton avec une ouverture circulaire adaptée à la poignée de porte.",
          "Collez votre dessin et inscrivez: \"PARTIE EN COURS — NE PAS DÉRANGER!\".",
          "Suspendez votre panneau à la porte pour jouer en toute tranquillité!"
        ]
      }
    },
    {
      "icon": "🎮",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "DIY Retro Kartonnen Mini Arcade Kastje",
        "en": "Cardboard Desktop Mini Arcade Cabinet",
        "de": "Karton Retro Mini-Spielautomat",
        "fr": "Mini Borne d'Arcade Rétro de Bureau en Carton"
      },
      "descriptions": {
        "nl": "Vouw een kleine 3D speelautomaat met een schermpje van {TITLE}, joystick van een prikker en knoppen van doppen.",
        "en": "Construct an authentic desktop arcade machine showcasing {TITLE} as the marquee title screen.",
        "de": "Baue ein 3D-Arcade Gehäuse mit {TITLE} als Spielbildschirm, Knöpfen und Mini-Joystick.",
        "fr": "Bâtissez une réplique de borne d'arcade avec {TITLE} en guise d'écran de jeu et joystick en bois."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen doosje",
          "Kralen of flessendoppen voor knoppen",
          "Tandenstoker of kurk (joystick)"
        ],
        "en": [
          "Colored {TITLE}",
          "Small cardboard box",
          "Plastic caps or beads for buttons",
          "Toothpick and cork (joystick)"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Pappkarton",
          "Knöpfe oder Perlen",
          "Korken und Spieß"
        ],
        "fr": [
          "{TITLE} colorié",
          "Boîte cartonnée",
          "Bouchons ou perles (boutons)",
          "Cure-dent et liège (manette)"
        ]
      },
      "steps": {
        "nl": [
          "Knip de zijkanten van een klein doosje schuin af in de klassieke vorm van een arcade-speelkast.",
          "Plak je ingekleurde {TITLE} precies in het schuine schermvenster als de actie-game.",
          "Prik een tandenstoker met een klein kurkje of bolletje klei als beweegbare joystick.",
          "Lijm twee felgekleurde kralen als A- en B-knoppen en speel je eigen retro game!"
        ],
        "en": [
          "Angle the sides of a small pantry box to replicate a slanted retro coin-op cabinet silhouette.",
          "Mount your {TITLE} art inside the angled monitor display as the hero gameplay scene.",
          "Puncture a toothpick with a clay sphere knob into the control deck for a tactile joystick.",
          "Glue bright button tokens beside it to complete your desktop arcade shrine!"
        ],
        "de": [
          "Schneide die Seiten einer Schachtel schräg zu wie bei einem echten Spielautomaten.",
          "Setze dein {TITLE}-Bild als leuchtenden Spielbildschirm ein.",
          "Stecke einen Holzstab mit kleiner Kugel als beweglichen Joystick in das Bedienfeld.",
          "Klebe zwei bunte Knöpfe auf und hole dir das Spielhallen-Feeling nach Hause!"
        ],
        "fr": [
          "Découpez les flancs d'une boîte en biseau pour recréer la forme mythique d'une borne d'arcade.",
          "Collez votre illustration {TITLE} sur la vitre inclinée de l'écran de jeu.",
          "Plantez un cure-dent surmonté d'une boule en pâte à modeler pour faire le joystick.",
          "Ajoutez deux perles colorées pour les boutons d'action et jouez des parties infinies!"
        ]
      }
    },
    {
      "icon": "🏆",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Gouden Kampioens Beker & Toernooitrofee",
        "en": "Victory Royale Gold Champion Trophy",
        "de": "Sieger-Pokal & Champion-Turniertrophäe",
        "fr": "Trophée de Champion & Coupe de la Victoire Royale"
      },
      "descriptions": {
        "nl": "Bouw een glanzende beker van twee papieren bekertjes en zet het kampioens-embleem van {TITLE} op de top!",
        "en": "Stack two paper cups base-to-base and crown with {TITLE}'s victory badge for tournament bragging rights.",
        "de": "Baue aus zwei Pappbechern einen goldenen Pokal mit {TITLE} für den ultimativen Siegertitel.",
        "fr": "Assemblez deux gobelets peints en or surmontés de {TITLE} pour célébrer votre victoire au tournoi."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 papieren drinkbekertjes",
          "Goudgele verf of folie",
          "Lijm en schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 paper drink cups",
          "Gold craft paint or foil",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 Pappbecher",
          "Goldfarbe",
          "Kleber & Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 gobelets en carton",
          "Peinture dorée",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Plak twee papieren bekertjes met de bodems aan elkaar vast: één als voet en één als kelk.",
          "Schilder de bekers goudgeel of beplak ze met aluminiumfolie.",
          "Knip twee gebogen kartonnen handvatten en lijm ze aan de zijkant van de beker.",
          "Plak het heldhaftige figuur van {TITLE} pontificaal op de voorkant van je trofee!"
        ],
        "en": [
          "Glue the bases of two paper cups firmly together to form a standing trophy pedestal and chalice.",
          "Coat with shimmering gold paint or smooth reflective metallic paper.",
          "Cut two curved ear handles from scrap cardstock and affix to either side of the chalice rim.",
          "Mount the heroic victor crest of {TITLE} to the front and hoist your trophy high!"
        ],
        "de": [
          "Klebe zwei Pappbecher mit den Böden aneinander – einer dient als Sockel, der andere als Pokal.",
          "Male den Pokal rundherum mit glänzender Goldfarbe an.",
          "Befestige zwei geschwungene Griffe an den Seiten.",
          "Platziere dein {TITLE}-Abzeichen vorne auf dem Pokal und feiere deinen ersten Platz!"
        ],
        "fr": [
          "Collez le fond de deux gobelets ensemble pour créer le pied et la coupe du trophée.",
          "Peignez l'ensemble en doré étincelant.",
          "Découpez deux anses courbées et fixez-les de chaque côté de la coupe.",
          "Collez l'emblème victorieux de {TITLE} au centre et brandissez votre trophée bien haut!"
        ]
      }
    },
    {
      "icon": "🎯",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Schietschijf & Precisie Mikpunt Spel",
        "en": "Target Practice Bullseye & Blaster Game",
        "de": "Präzisions-Zielscheibe & Wurftraining-Spiel",
        "fr": "Cible d'Entraînement de Tir & Jeu de Précision"
      },
      "descriptions": {
        "nl": "Teken score-cirkels (10, 50, 100 punten) rond {TITLE} en gooi met propjes papier of zuignappijltjes.",
        "en": "Ring concentric point values around {TITLE} for target practice with paper balls or dart blasters.",
        "de": "Zeichne Punktekreise um {TITLE} und treffe das Ziel mit weichen Papierbällchen oder Saugnapfpfeilen.",
        "fr": "Tracez des zones de points concentriques autour de {TITLE} pour tester votre précision au tir."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot stuk karton",
          "Stiften voor scorepunten",
          "Propjes papier of foam balletjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large cardstock backer",
          "Score markers",
          "Soft paper wads or foam darts"
        ],
        "de": [
          "{TITLE} Bild",
          "Großer Karton",
          "Marker für Punkte",
          "Papierbällchen"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grand carton support",
          "Feutres pour marquer les points",
          "Boulettes de papier"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} exact in het midden van een groot vel karton als de ultieme roos (\"BULLSEYE\").",
          "Teken met een stift drie grote concentrische cirkels eromheen met punten: 20, 50 en 100.",
          "Hang het doelwit op aan de deur of zet het stevig tegen een stoel.",
          "Gooi om de beurt met drie zachte propjes papier en tel wie de hoogste score haalt!"
        ],
        "en": [
          "Mount {TITLE} dead center upon your cardstock backer as the primary high-value bullseye.",
          "Draw three concentric score rings around the character awarding 25, 50, and 100 bonus points.",
          "Prop the target securely against a wall or chair cushion.",
          "Take turns launching three foam darts or soft rolled paper projectiles to crown the sharpest shooter!"
        ],
        "de": [
          "Klebe {TITLE} genau in das Zentrum des Kartons als Volltreffer-Punkt.",
          "Ziehe konzentrische Kreise darum herum mit Punktwerten wie 10, 50 und 100 Punkten.",
          "Befestige die Zielscheibe an der Wand oder an einer Sofakante.",
          "Wirf mit weichen Papierkügelchen und zähle deine Treffer zusammen!"
        ],
        "fr": [
          "Collez {TITLE} au centre exact du carton pour figurer le cœur de la cible.",
          "Tracez des anneaux concentriques valant 20, 50 et 100 points tout autour.",
          "Installez la cible contre un mur ou le dossier d'une chaise.",
          "Lancez trois boulettes de papier à tour de rôle et comptez vos points pour désigner le vainqueur!"
        ]
      }
    },
    {
      "icon": "🔑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Gepantserde Sleutelhanger voor je Fietssleutel",
        "en": "Laminated Action Keyring & Backpack Charm",
        "de": "Robuster Schlüsselanhänger für den Fahrradschlüssel",
        "fr": "Porte-Clés Héroïque Plastifié pour Vélo & Casier"
      },
      "descriptions": {
        "nl": "Verklein en lamineer {TITLE} tot een onverwoestbare sleutelhanger voor je kluisje of fietssleutel.",
        "en": "Shrink and double-laminate {TITLE} into a durable scratch-proof keychain fob for keys and gym lockers.",
        "de": "Laminiere das Symbol von {TITLE} als unzerstörbaren Schlüsselanhänger für dein Fahrrad.",
        "fr": "Plastifiez le motif de {TITLE} pour en faire un porte-clés incassable à emporter partout."
      },
      "materials": {
        "nl": [
          "Gekleurd detail van {TITLE}",
          "Zelfklevend plakplastic of lamineermachine",
          "Perforator",
          "Sleutelring of koord"
        ],
        "en": [
          "Cutout detail from {TITLE}",
          "Self-adhesive laminate or pouch",
          "Hole punch",
          "Split keyring or cord"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Laminierfolie",
          "Locher",
          "Schlüsselring"
        ],
        "fr": [
          "Motif découpé de {TITLE}",
          "Pochette de plastification",
          "Perforatrice",
          "Anneau de porte-clés"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de heldhaftige figuur van {TITLE} met heldere, krachtige kleuren.",
          "Knip de figuur compact uit en seal hem tussen twee lagen dik lamineerfolie.",
          "Knip de folie bij met een waterdichte rand van 3 millimeter.",
          "Perforeer een gaatje in de bovenhoek en haal je sleutelring erdoorheen!"
        ],
        "en": [
          "Color {TITLE} intensely so the icon stands out at a compact size.",
          "Trim around the silhouette and seal between heavy heat laminate or clear contact film.",
          "Cut leaving a sealed 0.15-inch clear water-resistant rim around the edges.",
          "Punch a reinforced hole at the top and loop your split steel keyring through!"
        ],
        "de": [
          "Male die Figur von {TITLE} mit kontrastreichen Farben an.",
          "Schneide das Motiv sauber aus und laminiere es knickfest ein.",
          "Lasse einen kleinen Rand stehen, damit die Folie wasserdicht verschweißt bleibt.",
          "Loche den oberen Rand und fädle deinen Schlüsselring ein!"
        ],
        "fr": [
          "Coloriez le symbole de {TITLE} avec des nuances éclatantes.",
          "Découpez la silhouette et plastifiez-la solidement.",
          "Découpez en laissant une marge étanche de quelques millimètres autour du motif.",
          "Perforez le sommet et passez votre anneau de porte-clés pour ne plus jamais perdre vos clés!"
        ]
      }
    },
    {
      "icon": "🎲",
      "tagKey": "game",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "DIY Helden Bordspel met Actievakjes",
        "en": "Action Heroes DIY Board Game with Obstacles",
        "de": "Eigenes Helden-Brettspiel mit Aktionsfeldern",
        "fr": "Jeu de Plateau Héroïque Fait Maison avec Pièges"
      },
      "descriptions": {
        "nl": "Teken een slingerend pad van 30 vakjes naar de eindbaas {TITLE} met power-ups en valstrikken.",
        "en": "Draft a 30-tile quest trail leading to final boss {TITLE}, packed with power boost tiles and hazard traps.",
        "de": "Zeichne einen Spielplan mit 30 Feldern bis zum Endgegner {TITLE} mit Power-Ups und Fallen.",
        "fr": "Tracez un parcours de 30 cases semé de pièges menant jusqu'au boss final {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot vel tekenpapier (A3)",
          "Dobbelsteen",
          "Stiften en speelfiguurtjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large drawing paper sheet (A3/Poster)",
          "Standard dice",
          "Markers and game tokens"
        ],
        "de": [
          "{TITLE} Bild",
          "Großes Zeichenblatt",
          "Würfel",
          "Spielfiguren & Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grande feuille cartonnée A3",
          "Dé à 6 faces",
          "Pions et feutres"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} op het eindvak als de grote eindbaas van het spelbord.",
          "Teken een slingerend pad van 25 tot 30 vakjes vanaf \"START\" naar de finish.",
          "Verzin leuke actievakjes: \"Teleporteer 3 vakken vooruit!\", \"Valstrik! 1 beurt overslaan\".",
          "Pak een dobbelsteen en pionnetjes en race tegen je vrienden naar de overwinning!"
        ],
        "en": [
          "Paste {TITLE} on the final \"VICTORY\" tile as the ultimate champion destination.",
          "Sketch a winding path of 30 square stepping tiles leading out from START.",
          "Inscribe surprise action tiles: \"+2 Speed Boost!\", \"Monster Ambush! Roll again\", \"Shield Up!\".",
          "Grab dice and token movers to race your friends across the board!"
        ],
        "de": [
          "Klebe {TITLE} auf das Zielfeld als legendären Endgegner.",
          "Zeichne einen geschwungenen Pfad mit nummerierten Feldern von Start bis Ziel.",
          "Erfinde lustige Sonderfelder: \"Gehe 3 Felder vor!\", \"Pause machen!\", \"Superkraft aktivieren!\".",
          "Schnapp dir einen Würfel und Spielfiguren und würfle dich zum Sieg!"
        ],
        "fr": [
          "Collez {TITLE} sur la case d'arrivée pour figurer le boss légendaire.",
          "Tracez une piste sinueuse de 30 cases numérotées depuis la case DÉPART.",
          "Ajoutez des cases spéciales: \"Turbo: avance de 3 cases!\", \"Passer un tour\", \"Super bouclier!\".",
          "Prenez un dé et des pions pour vous affronter dans une course haletante!"
        ]
      }
    },
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "3D Helden Embleem Badge voor je Rugzak",
        "en": "Dimensional Hero Backpack Badge & Patch",
        "de": "3D Helden-Emblem Anstecker für den Ranzen",
        "fr": "Écusson 3D de Héros pour Sac à Dos & Veste"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een opvallende kartonnen rand en bevestig een veiligheidsspeld om hem als ereteken te dragen.",
        "en": "Craft an embossed cardstock insignia patch with {TITLE} to wear proudly on your clothing or backpack.",
        "de": "Bastle ein erhabenes Emblem von {TITLE} als Ehrenabzeichen für deinen Schulranzen.",
        "fr": "Montez {TITLE} en médaillon avec épingle de sûreté pour arborer votre insigne de membre de la ligue."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen bierviltje of dik karton",
          "Veiligheidsspeld en plakband",
          "Glitters"
        ],
        "en": [
          "Finished {TITLE}",
          "Coaster blank or heavy cardboard",
          "Safety pin and durable tape",
          "Glitter trim"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Bierdeckel oder Pappe",
          "Sicherheitsnadel & Tape",
          "Glitzer"
        ],
        "fr": [
          "{TITLE} colorié",
          "Rond de carton épais",
          "Épingle de nourrice et adhésif renforcé",
          "Paillettes"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het centrale insigne van {TITLE} met knallende heldenkleuren.",
          "Knip de figuur cirkelvormig uit en plak hem op een stevig rond stuk karton.",
          "Versier de buitenrand met stoere bliksemschichten of glitters.",
          "Plak een veiligheidsspeld stevig vast aan de achterzijde en draag je heldeninsigne met trots!"
        ],
        "en": [
          "Color {TITLE}'s primary emblem using bold comic book color palettes.",
          "Trim into a medallion shield shape and back with thick circular cardboard.",
          "Border the perimeter with silver metallic pen or fiery trim.",
          "Tape a safety pin securely across the back and fasten to your jacket or backpack!"
        ],
        "de": [
          "Male das {TITLE}-Wappen mit energiegeladenen Farben aus.",
          "Schneide das Abzeichen rund aus und klebe es auf festen Karton.",
          "Verziere den Rand mit Blitzen oder Zackenmustern.",
          "Fixiere eine Sicherheitsnadel auf der Rückseite und trage deinen Orden stolz!"
        ],
        "fr": [
          "Coloriez le blason héroïque de {TITLE} avec des teintes vives et contrastées.",
          "Découpez en cercle et montez sur un support rigide.",
          "Soulignez le tour avec des éclairs dessinés ou des paillettes argentées.",
          "Scotchez solidement une épingle de sûreté au verso et arborez votre badge sur votre veste!"
        ]
      }
    },
    {
      "icon": "📖",
      "tagKey": "school",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Eigen Comic Stripverhaal Boekomslag",
        "en": "Original Comic Book Graphic Novel Cover",
        "de": "Eigenes Comic-Heft & Abenteuer-Cover",
        "fr": "Couverture de Bande Dessinée & Comics Original"
      },
      "descriptions": {
        "nl": "Ontwerp een spectaculaire stripboek-omslag met {TITLE} inclusief spraakballonnen en geluidseffecten (\"BAM!\", \"POW!\").",
        "en": "Design an action-packed comic cover starring {TITLE} with explosive sound effects like \"BAM!\" and \"POW!\".",
        "de": "Gestalte dein eigenes Comic-Cover mit {TITLE}, Sprechblasen und Knall-Effekten wie \"BAM!\" und \"ZAP!\".",
        "fr": "Créez une véritable couverture de comic book avec {TITLE}, bulles de dialogue et onomatopées percutantes!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Knutselkarton A4",
          "Tekenvellen voor de binnenpagina's",
          "Zwarte fineliner"
        ],
        "en": [
          "{TITLE} coloring page",
          "A4/Letter cardstock",
          "Blank paper sheets for comic pages",
          "Black fineliner"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier A4",
          "Weiße Blätter für Comicszenen",
          "Schwarzer Fineliner"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton A4",
          "Feuilles blanches pour les planches",
          "Feutre fin noir"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en knip grote explosie-sterren uit gekleurd papier.",
          "Schrijf krachtige geluidseffecten in de sterren zoals \"KAPOW!\", \"BOOM!\" en \"KRACH!\".",
          "Plak {TITLE} en de actieteksten op de voorkant van een gevouwen vel karton.",
          "Niet 4 lege witte vellen aan de binnenkant en teken je eigen spannende stripverhaal!"
        ],
        "en": [
          "Color {TITLE} with sharp, punchy comic-book halftone shading.",
          "Cut jagged speech burst clouds from yellow cardstock and pen dynamic words: \"POW!\", \"BOOM!\".",
          "Paste {TITLE} and the action burst starbursts onto the front cover of folded cardstock.",
          "Staple 4 blank pages inside and illustrate your own thrilling episodic graphic novel!"
        ],
        "de": [
          "Male {TITLE} wie eine echte Comicfigur mit kräftigen Schatten aus.",
          "Schneide zackige Explosions-Sterne aus gelbem Papier und schreibe \"BAM!\" und \"POW!\" hinein.",
          "Arrangiere die Elemente auf der Vorderseite deines Comic-Hefts.",
          "Hefte weiße Seiten hinein und zeichne dein eigenes Abenteuer in Comic-Kästchen!"
        ],
        "fr": [
          "Coloriez {TITLE} en accentuant les contours comme dans les comics américains.",
          "Découpez des bulles d'explosion jaunes et inscrivez des onomatopées: \"BOOM!\", \"SPLASH!\", \"BAM!\".",
          "Composez la couverture sur une chemise cartonnée.",
          "Agrafez des feuilles blanches à l'intérieur et dessinez les planches de votre première bande dessinée!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Epische Gaming Poster in Stoere Zwarte Lijst",
        "en": "Framed Epic Gaming Wall Art & Poster",
        "de": "Episches Gaming-Poster im schwarzen Rahmen",
        "fr": "Poster de Gaming Épique Encadré Noir Mat"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een donkere cyberpunk of neon achtergrond en hang hem op als ultieme gaming room poster.",
        "en": "Highlight {TITLE} with electric neon accents and display in a matte black frame over your battle station.",
        "de": "Verpasse {TITLE} leuchtende Neon-Effekte und hänge es gerahmt über deine Zockerecke.",
        "fr": "Faites ressortir les contrastes néon de {TITLE} et exposez votre affiche dans votre espace de jeu."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4 (zwart)",
          "Zwart of donkerblauw karton",
          "Neon stiften"
        ],
        "en": [
          "Finished {TITLE} artwork",
          "A4/Letter black frame",
          "Black cardstock mat board",
          "Neon or gel pens"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Schwarzer Bilderrahmen",
          "Schwarzer Tonkarton",
          "Neonstifte"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre noir A4",
          "Passe-partout noir mat",
          "Feutres néon"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de tekening met felle contrasterende neonkleuren tegen een donkere achtergrond.",
          "Snijd een strak zwart kartonnen kader uit om het artwork intens naar voren te laten springen.",
          "Plak je poster stevig in het midden van het kader.",
          "Plaats in een zwarte lijst en hang hem trots boven je bureau of gaming setup!"
        ],
        "en": [
          "Shade {TITLE} with brilliant glowing neon highlights against dark ink shadows.",
          "Mount squarely upon a jet-black matte board to make the electric pigments jump forward.",
          "Fasten securely inside an ebony frame.",
          "Mount proudly above your computer desk or game station to showcase your creator status!"
        ],
        "de": [
          "Male das Bild mit strahlenden Neonfarben und tiefen Schatten aus.",
          "Setze das Bild zentriert auf mattschwarzes Tonpapier für maximale Leuchtkraft.",
          "Schließe den schwarzen Glasrahmen fest.",
          "Hänge dein persönliches Gaming-Artwork über deinem Schreibtisch auf!"
        ],
        "fr": [
          "Illuminez {TITLE} avec des rehauts fluorescents contrastant avec les ombres.",
          "Montez la feuille sur un carton noir mat profond pour exalter les couleurs.",
          "Placez délicatement sous verre dans un cadre noir sobre.",
          "Accrochez votre poster au-dessus de votre console ou bureau de jeu!"
        ]
      }
    }
  ],
  "superheroes-comic-universes": [
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Superhelden Krachtmanchetten & Polsbanden",
        "en": "Superhero Power Cuffs & Energy Bracers",
        "de": "Superhelden Kraft-Manschetten & Armbänder",
        "fr": "Manchettes de Super-Héros & Bracelets d'Énergie"
      },
      "descriptions": {
        "nl": "Knip twee wc-rollen doormidden en beplak ze met {TITLE} en bliksemschichten om je superkrachten te activeren!",
        "en": "Split cardboard tubes down the middle and armor them with {TITLE} badges to channel your superpowers!",
        "de": "Schneide Papprollen auf und beklebe sie mit {TITLE} für unbesiegbare Superhelden-Kräfte!",
        "fr": "Fendez des rouleaux cartonnés et ornez-les des emblèmes de {TITLE} pour lancer vos super-pouvoirs!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 lege wc-rollen",
          "Aluminiumfolie of zilverpapier",
          "Schaar en lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 empty toilet paper tubes",
          "Silver foil or metallic paper",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 leere Papprollen",
          "Alufolie oder Silberpapier",
          "Schere & Kleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 rouleaux en carton",
          "Papier aluminium ou argenté",
          "Ciseaux et colle"
        ]
      },
      "steps": {
        "nl": [
          "Knip beide wc-rollen in de lengte open zodat ze gemakkelijk om je polsen klemmen.",
          "Omwikkel de rollen met zilverfolie als kogelwerend pantser.",
          "Kleur de krachtige symbolen en helden van {TITLE} fel in en knip ze uit.",
          "Lijm de helden-insignes op de polsbanden, schuif ze om en red de wereld!"
        ],
        "en": [
          "Slit both cardboard tubes lengthwise so they spring open and slip comfortably over your wrists.",
          "Wrap the cuffs in silver foil for an impenetrable high-tech metallic finish.",
          "Color the fierce action icons of {TITLE} in high-voltage colors and cut out.",
          "Paste your hero badges onto each wrist guard, snap them on, and unleash your powers!"
        ],
        "de": [
          "Schneide beide Klorollen der Länge nach auf, damit sie um deine Handgelenke passen.",
          "Umwickle die Manschetten mit Alufolie für einen futuristischen Rüstungs-Look.",
          "Male die Action-Symbole von {TITLE} mit feurigen Farben aus und schneide sie aus.",
          "Klebe die Abzeichen auf deine Armbänder und ziehe ins Abenteuer!"
        ],
        "fr": [
          "Fendez les deux rouleaux sur la longueur pour les enfiler facilement aux poignets.",
          "Recouvrez les manchettes de papier argenté pour imiter un blindage de titan.",
          "Coloriez les emblèmes héroïques de {TITLE} avec des feutres éclatants.",
          "Collez les écussons sur vos bracelets, claquez vos poignets et sauvez la planète!"
        ]
      }
    },
    {
      "icon": "👾",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Retro Pixel-Art Mozaïek van Vouwblaadjes",
        "en": "Retro 8-Bit Pixel Art Mosaic Grid",
        "de": "Retro 8-Bit Pixel-Art Mosaik",
        "fr": "Mosaïque Pixel-Art Rétro 8-Bit en Carreaux"
      },
      "descriptions": {
        "nl": "Knip kleine vierkante pixel-blokjes uit gekleurd papier en plak ze op {TITLE} voor een echte vintage arcade videogame look.",
        "en": "Snip neat tiny colored paper squares and build a textured 8-bit arcade mosaic over {TITLE}.",
        "de": "Schneide kleine bunte Papierquadrate und verwandle {TITLE} in ein echtes Retro-Arcade Pixelspiel.",
        "fr": "Découpez de petits carrés de papier coloré pour composer une mosaïque rétro façon jeu vidéo d'arcade."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Gekleurde vouwblaadjes",
          "Lijmstift",
          "Schaar of papiersnijder"
        ],
        "en": [
          "{TITLE} coloring page",
          "Colored origami squares",
          "Glue stick",
          "Scissors or paper trimmer"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Buntes Faltpapier",
          "Klebestift",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papiers origami colorés",
          "Bâton de colle",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Knip verschillende kleuren vouwpapier in kleine vierkantjes van precies 1 bij 1 cm.",
          "Kies welke delen van {TITLE} je wilt inkleuren en welke vlakken je gaat bestraten met \"pixels\".",
          "Lijm de vierkante blokjes strak tegen elkaar aan in rijen alsof het een digitaal beeldscherm is.",
          "Bewonder je authentieke retro 8-bit videogame kunstwerk!"
        ],
        "en": [
          "Slice sheets of bright craft paper into precise 0.5-inch square pixel tiles.",
          "Determine which hero features of {TITLE} to color and which to pave in blocky pixels.",
          "Glue tiles tightly edge-to-edge in horizontal raster scan lines.",
          "Step back and admire your authentic 8-bit arcade gaming masterpiece!"
        ],
        "de": [
          "Schneide buntes Papier in exakte 1x1 cm kleine Mosaik-Pixelquadrate.",
          "Entscheide, welche Bereiche von {TITLE} mit Pixeln belegt werden sollen.",
          "Klebe die bunten Kacheln Reihe für Reihe nahtlos aneinander.",
          "Fertig ist dein cooles Retro-Videospiel Kunstwerk!"
        ],
        "fr": [
          "Découpez du papier vif en petits carrés réguliers de 1 cm de côté.",
          "Repérez les zones de {TITLE} à habiller de pixels colorés.",
          "Collez les carrés bord à bord en damier pour reproduire l'écran d'une console rétro.",
          "Admirez votre tableau pixélisé inspiré des plus grands classiques du jeu vidéo!"
        ]
      }
    },
    {
      "icon": "🃏",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Verzamelbare Helden Trading Cards (Ruilkaarten)",
        "en": "Collectible Hero Trading Cards with Power Stats",
        "de": "Sammelbare Helden-Sammelkarten mit Werten",
        "fr": "Cartes à Collectionner de Héros & Statistiques d'Attaque"
      },
      "descriptions": {
        "nl": "Knip {TITLE} op speelkaartformaat, bedenk statistieken (Aanval, Snelheid, HP) en speel spannende duels tegen vrienden.",
        "en": "Trim {TITLE} to standard trading card size, draft battle stats (Attack, Defense, HP), and duel your friends.",
        "de": "Schneide {TITLE} im Spielkarten-Format aus, erfinde Kampfpunkte (Angriff, Tempo, KP) und duelliere dich.",
        "fr": "Découpez {TITLE} au format carte de jeu, attribuez des points de puissance et défiez vos amis en duel."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Speelkaartkarton (6,3 x 8,8 cm)",
          "Fineliner of gelpen",
          "Lamineerhoesjes"
        ],
        "en": [
          "Colored {TITLE}",
          "Cardstock blanks (2.5 x 3.5 inch)",
          "Fine tip pen",
          "Card sleeves or laminate"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Spielkarten-Karton",
          "Fineliner",
          "Schutzhüllen"
        ],
        "fr": [
          "{TITLE} colorié",
          "Cartonnette format carte",
          "Feutre fin",
          "Protège-cartes transparents"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het karakter of wapen van {TITLE} met veel actie en contrast in.",
          "Plak de figuur op een stevig stuk karton van precies 6,3 bij 8,8 centimeter.",
          "Teken onderaan een scorebalk met aanvalskracht (ATK), verdediging (DEF) en speciale vaart (SPEED).",
          "Steek je kaart in een beschermhoesje en daag je vrienden uit voor een episch ruilkaartenspel!"
        ],
        "en": [
          "Color {TITLE}'s character illustration with fierce energy aura and high contrast.",
          "Mount onto rigid 2.5 x 3.5 inch playing card backing.",
          "Draw stat boxes along the footer listing Attack Power, Defense Shield, and Special Move.",
          "Slide into clear trading card sleeves and challenge your rivals to a showdown!"
        ],
        "de": [
          "Male die Heldenfigur von {TITLE} mit dynamischen Effekten aus.",
          "Klebe das Motiv auf eine feste Spielkarte im Standard-Format.",
          "Erstelle Wertungsfelder für Angriffskraft, Verteidigung und Spezial-Attacke.",
          "Schiebe die Karte in eine Sammelhülle und starte spannende Duelle!"
        ],
        "fr": [
          "Coloriez le personnage héroïque de {TITLE} avec une aura d'énergie vibrante.",
          "Montez l'image sur un carton découpé au format standard de 6,3 x 8,8 cm.",
          "Inscrivez les points d'Attaque, de Défense et le nom de l'Attaque Spéciale.",
          "Glissez la carte dans une pochette transparente et lancez une partie de cartes endiablée!"
        ]
      }
    },
    {
      "icon": "🚪",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Niet Storen: Gamer Bezig! Deurhanger",
        "en": "Gaming in Progress / Do Not Disturb Door Hanger",
        "de": "Gaming im Gange / Bitte Nicht Stören Türhänger",
        "fr": "Accroche-Porte Gamer: Mission en Cours / Ne Pas Déranger"
      },
      "descriptions": {
        "nl": "Maak een officiële deurhanger met {TITLE} die je aan je slaapkamerklink hangt wanneer je ongestoord wilt gamen.",
        "en": "Craft a bold bedroom door hanger featuring {TITLE} warning visitors to stay quiet during clutch matches.",
        "de": "Bastle ein Schild mit {TITLE} für deine Türklinke: Zutritt nur für echte Team-Mitglieder!",
        "fr": "Fabriquez un accroche-porte stylé avec {TITLE} pour avertir que la partie est lancée."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton (10 x 25 cm)",
          "Ronde passer of glas voor de klinkopening",
          "Stiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Heavy cardstock (4 x 10 inch)",
          "Compass or cup to trace knob hole",
          "Markers"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonkarton",
          "Glas zum Anzeichnen des Klinkenlochs",
          "Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton fort (10 x 25 cm)",
          "Verre pour tracer l'orifice de poignée",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de actieheld van {TITLE} met opvallende neonkleuren.",
          "Knip een langwerpige strook karton uit en snijd bovenin een ronde opening die om je deurklink past.",
          "Plak {TITLE} op de hanger en schrijf in grote letters: \"PRO GAMER BEZIG — NIET STOREN!\".",
          "Hang hem aan je klink wanneer je gefocust aan het spelen bent!"
        ],
        "en": [
          "Color the action pose of {TITLE} in punchy vibrant neon shades.",
          "Cut a tall cardstock rectangle, cutting a 2.5-inch circular notch at the top to slide over your door handle.",
          "Affix {TITLE} squarely in the center with bold lettering: \"LEVELING UP — DO NOT DISTURB!\".",
          "Hang over your bedroom door handle whenever you're locked in a high-stakes campaign!"
        ],
        "de": [
          "Male die Heldengestalt von {TITLE} in kräftigen Neonfarben an.",
          "Schneide einen Kartonstreifen mit rundem Loch für die Türklinke zurecht.",
          "Platziere {TITLE} auf dem Hänger und schreibe: \"LEVEL UP IM GANGE — BITTE NICHT STÖREN!\".",
          "Hänge das Schild an deine Zimmertür vor jeder Gaming-Session!"
        ],
        "fr": [
          "Coloriez la pose dynamique de {TITLE} avec des feutres néon percutants.",
          "Découpez une bande de carton avec une ouverture circulaire adaptée à la poignée de porte.",
          "Collez votre dessin et inscrivez: \"PARTIE EN COURS — NE PAS DÉRANGER!\".",
          "Suspendez votre panneau à la porte pour jouer en toute tranquillité!"
        ]
      }
    },
    {
      "icon": "🎮",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "DIY Retro Kartonnen Mini Arcade Kastje",
        "en": "Cardboard Desktop Mini Arcade Cabinet",
        "de": "Karton Retro Mini-Spielautomat",
        "fr": "Mini Borne d'Arcade Rétro de Bureau en Carton"
      },
      "descriptions": {
        "nl": "Vouw een kleine 3D speelautomaat met een schermpje van {TITLE}, joystick van een prikker en knoppen van doppen.",
        "en": "Construct an authentic desktop arcade machine showcasing {TITLE} as the marquee title screen.",
        "de": "Baue ein 3D-Arcade Gehäuse mit {TITLE} als Spielbildschirm, Knöpfen und Mini-Joystick.",
        "fr": "Bâtissez une réplique de borne d'arcade avec {TITLE} en guise d'écran de jeu et joystick en bois."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen doosje",
          "Kralen of flessendoppen voor knoppen",
          "Tandenstoker of kurk (joystick)"
        ],
        "en": [
          "Colored {TITLE}",
          "Small cardboard box",
          "Plastic caps or beads for buttons",
          "Toothpick and cork (joystick)"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Pappkarton",
          "Knöpfe oder Perlen",
          "Korken und Spieß"
        ],
        "fr": [
          "{TITLE} colorié",
          "Boîte cartonnée",
          "Bouchons ou perles (boutons)",
          "Cure-dent et liège (manette)"
        ]
      },
      "steps": {
        "nl": [
          "Knip de zijkanten van een klein doosje schuin af in de klassieke vorm van een arcade-speelkast.",
          "Plak je ingekleurde {TITLE} precies in het schuine schermvenster als de actie-game.",
          "Prik een tandenstoker met een klein kurkje of bolletje klei als beweegbare joystick.",
          "Lijm twee felgekleurde kralen als A- en B-knoppen en speel je eigen retro game!"
        ],
        "en": [
          "Angle the sides of a small pantry box to replicate a slanted retro coin-op cabinet silhouette.",
          "Mount your {TITLE} art inside the angled monitor display as the hero gameplay scene.",
          "Puncture a toothpick with a clay sphere knob into the control deck for a tactile joystick.",
          "Glue bright button tokens beside it to complete your desktop arcade shrine!"
        ],
        "de": [
          "Schneide die Seiten einer Schachtel schräg zu wie bei einem echten Spielautomaten.",
          "Setze dein {TITLE}-Bild als leuchtenden Spielbildschirm ein.",
          "Stecke einen Holzstab mit kleiner Kugel als beweglichen Joystick in das Bedienfeld.",
          "Klebe zwei bunte Knöpfe auf und hole dir das Spielhallen-Feeling nach Hause!"
        ],
        "fr": [
          "Découpez les flancs d'une boîte en biseau pour recréer la forme mythique d'une borne d'arcade.",
          "Collez votre illustration {TITLE} sur la vitre inclinée de l'écran de jeu.",
          "Plantez un cure-dent surmonté d'une boule en pâte à modeler pour faire le joystick.",
          "Ajoutez deux perles colorées pour les boutons d'action et jouez des parties infinies!"
        ]
      }
    },
    {
      "icon": "🏆",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Gouden Kampioens Beker & Toernooitrofee",
        "en": "Victory Royale Gold Champion Trophy",
        "de": "Sieger-Pokal & Champion-Turniertrophäe",
        "fr": "Trophée de Champion & Coupe de la Victoire Royale"
      },
      "descriptions": {
        "nl": "Bouw een glanzende beker van twee papieren bekertjes en zet het kampioens-embleem van {TITLE} op de top!",
        "en": "Stack two paper cups base-to-base and crown with {TITLE}'s victory badge for tournament bragging rights.",
        "de": "Baue aus zwei Pappbechern einen goldenen Pokal mit {TITLE} für den ultimativen Siegertitel.",
        "fr": "Assemblez deux gobelets peints en or surmontés de {TITLE} pour célébrer votre victoire au tournoi."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 papieren drinkbekertjes",
          "Goudgele verf of folie",
          "Lijm en schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 paper drink cups",
          "Gold craft paint or foil",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 Pappbecher",
          "Goldfarbe",
          "Kleber & Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 gobelets en carton",
          "Peinture dorée",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Plak twee papieren bekertjes met de bodems aan elkaar vast: één als voet en één als kelk.",
          "Schilder de bekers goudgeel of beplak ze met aluminiumfolie.",
          "Knip twee gebogen kartonnen handvatten en lijm ze aan de zijkant van de beker.",
          "Plak het heldhaftige figuur van {TITLE} pontificaal op de voorkant van je trofee!"
        ],
        "en": [
          "Glue the bases of two paper cups firmly together to form a standing trophy pedestal and chalice.",
          "Coat with shimmering gold paint or smooth reflective metallic paper.",
          "Cut two curved ear handles from scrap cardstock and affix to either side of the chalice rim.",
          "Mount the heroic victor crest of {TITLE} to the front and hoist your trophy high!"
        ],
        "de": [
          "Klebe zwei Pappbecher mit den Böden aneinander – einer dient als Sockel, der andere als Pokal.",
          "Male den Pokal rundherum mit glänzender Goldfarbe an.",
          "Befestige zwei geschwungene Griffe an den Seiten.",
          "Platziere dein {TITLE}-Abzeichen vorne auf dem Pokal und feiere deinen ersten Platz!"
        ],
        "fr": [
          "Collez le fond de deux gobelets ensemble pour créer le pied et la coupe du trophée.",
          "Peignez l'ensemble en doré étincelant.",
          "Découpez deux anses courbées et fixez-les de chaque côté de la coupe.",
          "Collez l'emblème victorieux de {TITLE} au centre et brandissez votre trophée bien haut!"
        ]
      }
    },
    {
      "icon": "🎯",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Schietschijf & Precisie Mikpunt Spel",
        "en": "Target Practice Bullseye & Blaster Game",
        "de": "Präzisions-Zielscheibe & Wurftraining-Spiel",
        "fr": "Cible d'Entraînement de Tir & Jeu de Précision"
      },
      "descriptions": {
        "nl": "Teken score-cirkels (10, 50, 100 punten) rond {TITLE} en gooi met propjes papier of zuignappijltjes.",
        "en": "Ring concentric point values around {TITLE} for target practice with paper balls or dart blasters.",
        "de": "Zeichne Punktekreise um {TITLE} und treffe das Ziel mit weichen Papierbällchen oder Saugnapfpfeilen.",
        "fr": "Tracez des zones de points concentriques autour de {TITLE} pour tester votre précision au tir."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot stuk karton",
          "Stiften voor scorepunten",
          "Propjes papier of foam balletjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large cardstock backer",
          "Score markers",
          "Soft paper wads or foam darts"
        ],
        "de": [
          "{TITLE} Bild",
          "Großer Karton",
          "Marker für Punkte",
          "Papierbällchen"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grand carton support",
          "Feutres pour marquer les points",
          "Boulettes de papier"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} exact in het midden van een groot vel karton als de ultieme roos (\"BULLSEYE\").",
          "Teken met een stift drie grote concentrische cirkels eromheen met punten: 20, 50 en 100.",
          "Hang het doelwit op aan de deur of zet het stevig tegen een stoel.",
          "Gooi om de beurt met drie zachte propjes papier en tel wie de hoogste score haalt!"
        ],
        "en": [
          "Mount {TITLE} dead center upon your cardstock backer as the primary high-value bullseye.",
          "Draw three concentric score rings around the character awarding 25, 50, and 100 bonus points.",
          "Prop the target securely against a wall or chair cushion.",
          "Take turns launching three foam darts or soft rolled paper projectiles to crown the sharpest shooter!"
        ],
        "de": [
          "Klebe {TITLE} genau in das Zentrum des Kartons als Volltreffer-Punkt.",
          "Ziehe konzentrische Kreise darum herum mit Punktwerten wie 10, 50 und 100 Punkten.",
          "Befestige die Zielscheibe an der Wand oder an einer Sofakante.",
          "Wirf mit weichen Papierkügelchen und zähle deine Treffer zusammen!"
        ],
        "fr": [
          "Collez {TITLE} au centre exact du carton pour figurer le cœur de la cible.",
          "Tracez des anneaux concentriques valant 20, 50 et 100 points tout autour.",
          "Installez la cible contre un mur ou le dossier d'une chaise.",
          "Lancez trois boulettes de papier à tour de rôle et comptez vos points pour désigner le vainqueur!"
        ]
      }
    },
    {
      "icon": "🔑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Gepantserde Sleutelhanger voor je Fietssleutel",
        "en": "Laminated Action Keyring & Backpack Charm",
        "de": "Robuster Schlüsselanhänger für den Fahrradschlüssel",
        "fr": "Porte-Clés Héroïque Plastifié pour Vélo & Casier"
      },
      "descriptions": {
        "nl": "Verklein en lamineer {TITLE} tot een onverwoestbare sleutelhanger voor je kluisje of fietssleutel.",
        "en": "Shrink and double-laminate {TITLE} into a durable scratch-proof keychain fob for keys and gym lockers.",
        "de": "Laminiere das Symbol von {TITLE} als unzerstörbaren Schlüsselanhänger für dein Fahrrad.",
        "fr": "Plastifiez le motif de {TITLE} pour en faire un porte-clés incassable à emporter partout."
      },
      "materials": {
        "nl": [
          "Gekleurd detail van {TITLE}",
          "Zelfklevend plakplastic of lamineermachine",
          "Perforator",
          "Sleutelring of koord"
        ],
        "en": [
          "Cutout detail from {TITLE}",
          "Self-adhesive laminate or pouch",
          "Hole punch",
          "Split keyring or cord"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Laminierfolie",
          "Locher",
          "Schlüsselring"
        ],
        "fr": [
          "Motif découpé de {TITLE}",
          "Pochette de plastification",
          "Perforatrice",
          "Anneau de porte-clés"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de heldhaftige figuur van {TITLE} met heldere, krachtige kleuren.",
          "Knip de figuur compact uit en seal hem tussen twee lagen dik lamineerfolie.",
          "Knip de folie bij met een waterdichte rand van 3 millimeter.",
          "Perforeer een gaatje in de bovenhoek en haal je sleutelring erdoorheen!"
        ],
        "en": [
          "Color {TITLE} intensely so the icon stands out at a compact size.",
          "Trim around the silhouette and seal between heavy heat laminate or clear contact film.",
          "Cut leaving a sealed 0.15-inch clear water-resistant rim around the edges.",
          "Punch a reinforced hole at the top and loop your split steel keyring through!"
        ],
        "de": [
          "Male die Figur von {TITLE} mit kontrastreichen Farben an.",
          "Schneide das Motiv sauber aus und laminiere es knickfest ein.",
          "Lasse einen kleinen Rand stehen, damit die Folie wasserdicht verschweißt bleibt.",
          "Loche den oberen Rand und fädle deinen Schlüsselring ein!"
        ],
        "fr": [
          "Coloriez le symbole de {TITLE} avec des nuances éclatantes.",
          "Découpez la silhouette et plastifiez-la solidement.",
          "Découpez en laissant une marge étanche de quelques millimètres autour du motif.",
          "Perforez le sommet et passez votre anneau de porte-clés pour ne plus jamais perdre vos clés!"
        ]
      }
    },
    {
      "icon": "🎲",
      "tagKey": "game",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "DIY Helden Bordspel met Actievakjes",
        "en": "Action Heroes DIY Board Game with Obstacles",
        "de": "Eigenes Helden-Brettspiel mit Aktionsfeldern",
        "fr": "Jeu de Plateau Héroïque Fait Maison avec Pièges"
      },
      "descriptions": {
        "nl": "Teken een slingerend pad van 30 vakjes naar de eindbaas {TITLE} met power-ups en valstrikken.",
        "en": "Draft a 30-tile quest trail leading to final boss {TITLE}, packed with power boost tiles and hazard traps.",
        "de": "Zeichne einen Spielplan mit 30 Feldern bis zum Endgegner {TITLE} mit Power-Ups und Fallen.",
        "fr": "Tracez un parcours de 30 cases semé de pièges menant jusqu'au boss final {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot vel tekenpapier (A3)",
          "Dobbelsteen",
          "Stiften en speelfiguurtjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large drawing paper sheet (A3/Poster)",
          "Standard dice",
          "Markers and game tokens"
        ],
        "de": [
          "{TITLE} Bild",
          "Großes Zeichenblatt",
          "Würfel",
          "Spielfiguren & Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grande feuille cartonnée A3",
          "Dé à 6 faces",
          "Pions et feutres"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} op het eindvak als de grote eindbaas van het spelbord.",
          "Teken een slingerend pad van 25 tot 30 vakjes vanaf \"START\" naar de finish.",
          "Verzin leuke actievakjes: \"Teleporteer 3 vakken vooruit!\", \"Valstrik! 1 beurt overslaan\".",
          "Pak een dobbelsteen en pionnetjes en race tegen je vrienden naar de overwinning!"
        ],
        "en": [
          "Paste {TITLE} on the final \"VICTORY\" tile as the ultimate champion destination.",
          "Sketch a winding path of 30 square stepping tiles leading out from START.",
          "Inscribe surprise action tiles: \"+2 Speed Boost!\", \"Monster Ambush! Roll again\", \"Shield Up!\".",
          "Grab dice and token movers to race your friends across the board!"
        ],
        "de": [
          "Klebe {TITLE} auf das Zielfeld als legendären Endgegner.",
          "Zeichne einen geschwungenen Pfad mit nummerierten Feldern von Start bis Ziel.",
          "Erfinde lustige Sonderfelder: \"Gehe 3 Felder vor!\", \"Pause machen!\", \"Superkraft aktivieren!\".",
          "Schnapp dir einen Würfel und Spielfiguren und würfle dich zum Sieg!"
        ],
        "fr": [
          "Collez {TITLE} sur la case d'arrivée pour figurer le boss légendaire.",
          "Tracez une piste sinueuse de 30 cases numérotées depuis la case DÉPART.",
          "Ajoutez des cases spéciales: \"Turbo: avance de 3 cases!\", \"Passer un tour\", \"Super bouclier!\".",
          "Prenez un dé et des pions pour vous affronter dans une course haletante!"
        ]
      }
    },
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "3D Helden Embleem Badge voor je Rugzak",
        "en": "Dimensional Hero Backpack Badge & Patch",
        "de": "3D Helden-Emblem Anstecker für den Ranzen",
        "fr": "Écusson 3D de Héros pour Sac à Dos & Veste"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een opvallende kartonnen rand en bevestig een veiligheidsspeld om hem als ereteken te dragen.",
        "en": "Craft an embossed cardstock insignia patch with {TITLE} to wear proudly on your clothing or backpack.",
        "de": "Bastle ein erhabenes Emblem von {TITLE} als Ehrenabzeichen für deinen Schulranzen.",
        "fr": "Montez {TITLE} en médaillon avec épingle de sûreté pour arborer votre insigne de membre de la ligue."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen bierviltje of dik karton",
          "Veiligheidsspeld en plakband",
          "Glitters"
        ],
        "en": [
          "Finished {TITLE}",
          "Coaster blank or heavy cardboard",
          "Safety pin and durable tape",
          "Glitter trim"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Bierdeckel oder Pappe",
          "Sicherheitsnadel & Tape",
          "Glitzer"
        ],
        "fr": [
          "{TITLE} colorié",
          "Rond de carton épais",
          "Épingle de nourrice et adhésif renforcé",
          "Paillettes"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het centrale insigne van {TITLE} met knallende heldenkleuren.",
          "Knip de figuur cirkelvormig uit en plak hem op een stevig rond stuk karton.",
          "Versier de buitenrand met stoere bliksemschichten of glitters.",
          "Plak een veiligheidsspeld stevig vast aan de achterzijde en draag je heldeninsigne met trots!"
        ],
        "en": [
          "Color {TITLE}'s primary emblem using bold comic book color palettes.",
          "Trim into a medallion shield shape and back with thick circular cardboard.",
          "Border the perimeter with silver metallic pen or fiery trim.",
          "Tape a safety pin securely across the back and fasten to your jacket or backpack!"
        ],
        "de": [
          "Male das {TITLE}-Wappen mit energiegeladenen Farben aus.",
          "Schneide das Abzeichen rund aus und klebe es auf festen Karton.",
          "Verziere den Rand mit Blitzen oder Zackenmustern.",
          "Fixiere eine Sicherheitsnadel auf der Rückseite und trage deinen Orden stolz!"
        ],
        "fr": [
          "Coloriez le blason héroïque de {TITLE} avec des teintes vives et contrastées.",
          "Découpez en cercle et montez sur un support rigide.",
          "Soulignez le tour avec des éclairs dessinés ou des paillettes argentées.",
          "Scotchez solidement une épingle de sûreté au verso et arborez votre badge sur votre veste!"
        ]
      }
    },
    {
      "icon": "📖",
      "tagKey": "school",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Eigen Comic Stripverhaal Boekomslag",
        "en": "Original Comic Book Graphic Novel Cover",
        "de": "Eigenes Comic-Heft & Abenteuer-Cover",
        "fr": "Couverture de Bande Dessinée & Comics Original"
      },
      "descriptions": {
        "nl": "Ontwerp een spectaculaire stripboek-omslag met {TITLE} inclusief spraakballonnen en geluidseffecten (\"BAM!\", \"POW!\").",
        "en": "Design an action-packed comic cover starring {TITLE} with explosive sound effects like \"BAM!\" and \"POW!\".",
        "de": "Gestalte dein eigenes Comic-Cover mit {TITLE}, Sprechblasen und Knall-Effekten wie \"BAM!\" und \"ZAP!\".",
        "fr": "Créez une véritable couverture de comic book avec {TITLE}, bulles de dialogue et onomatopées percutantes!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Knutselkarton A4",
          "Tekenvellen voor de binnenpagina's",
          "Zwarte fineliner"
        ],
        "en": [
          "{TITLE} coloring page",
          "A4/Letter cardstock",
          "Blank paper sheets for comic pages",
          "Black fineliner"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier A4",
          "Weiße Blätter für Comicszenen",
          "Schwarzer Fineliner"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton A4",
          "Feuilles blanches pour les planches",
          "Feutre fin noir"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en knip grote explosie-sterren uit gekleurd papier.",
          "Schrijf krachtige geluidseffecten in de sterren zoals \"KAPOW!\", \"BOOM!\" en \"KRACH!\".",
          "Plak {TITLE} en de actieteksten op de voorkant van een gevouwen vel karton.",
          "Niet 4 lege witte vellen aan de binnenkant en teken je eigen spannende stripverhaal!"
        ],
        "en": [
          "Color {TITLE} with sharp, punchy comic-book halftone shading.",
          "Cut jagged speech burst clouds from yellow cardstock and pen dynamic words: \"POW!\", \"BOOM!\".",
          "Paste {TITLE} and the action burst starbursts onto the front cover of folded cardstock.",
          "Staple 4 blank pages inside and illustrate your own thrilling episodic graphic novel!"
        ],
        "de": [
          "Male {TITLE} wie eine echte Comicfigur mit kräftigen Schatten aus.",
          "Schneide zackige Explosions-Sterne aus gelbem Papier und schreibe \"BAM!\" und \"POW!\" hinein.",
          "Arrangiere die Elemente auf der Vorderseite deines Comic-Hefts.",
          "Hefte weiße Seiten hinein und zeichne dein eigenes Abenteuer in Comic-Kästchen!"
        ],
        "fr": [
          "Coloriez {TITLE} en accentuant les contours comme dans les comics américains.",
          "Découpez des bulles d'explosion jaunes et inscrivez des onomatopées: \"BOOM!\", \"SPLASH!\", \"BAM!\".",
          "Composez la couverture sur une chemise cartonnée.",
          "Agrafez des feuilles blanches à l'intérieur et dessinez les planches de votre première bande dessinée!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Epische Gaming Poster in Stoere Zwarte Lijst",
        "en": "Framed Epic Gaming Wall Art & Poster",
        "de": "Episches Gaming-Poster im schwarzen Rahmen",
        "fr": "Poster de Gaming Épique Encadré Noir Mat"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een donkere cyberpunk of neon achtergrond en hang hem op als ultieme gaming room poster.",
        "en": "Highlight {TITLE} with electric neon accents and display in a matte black frame over your battle station.",
        "de": "Verpasse {TITLE} leuchtende Neon-Effekte und hänge es gerahmt über deine Zockerecke.",
        "fr": "Faites ressortir les contrastes néon de {TITLE} et exposez votre affiche dans votre espace de jeu."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4 (zwart)",
          "Zwart of donkerblauw karton",
          "Neon stiften"
        ],
        "en": [
          "Finished {TITLE} artwork",
          "A4/Letter black frame",
          "Black cardstock mat board",
          "Neon or gel pens"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Schwarzer Bilderrahmen",
          "Schwarzer Tonkarton",
          "Neonstifte"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre noir A4",
          "Passe-partout noir mat",
          "Feutres néon"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de tekening met felle contrasterende neonkleuren tegen een donkere achtergrond.",
          "Snijd een strak zwart kartonnen kader uit om het artwork intens naar voren te laten springen.",
          "Plak je poster stevig in het midden van het kader.",
          "Plaats in een zwarte lijst en hang hem trots boven je bureau of gaming setup!"
        ],
        "en": [
          "Shade {TITLE} with brilliant glowing neon highlights against dark ink shadows.",
          "Mount squarely upon a jet-black matte board to make the electric pigments jump forward.",
          "Fasten securely inside an ebony frame.",
          "Mount proudly above your computer desk or game station to showcase your creator status!"
        ],
        "de": [
          "Male das Bild mit strahlenden Neonfarben und tiefen Schatten aus.",
          "Setze das Bild zentriert auf mattschwarzes Tonpapier für maximale Leuchtkraft.",
          "Schließe den schwarzen Glasrahmen fest.",
          "Hänge dein persönliches Gaming-Artwork über deinem Schreibtisch auf!"
        ],
        "fr": [
          "Illuminez {TITLE} avec des rehauts fluorescents contrastant avec les ombres.",
          "Montez la feuille sur un carton noir mat profond pour exalter les couleurs.",
          "Placez délicatement sous verre dans un cadre noir sobre.",
          "Accrochez votre poster au-dessus de votre console ou bureau de jeu!"
        ]
      }
    }
  ],
  "anime-manga": [
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Superhelden Krachtmanchetten & Polsbanden",
        "en": "Superhero Power Cuffs & Energy Bracers",
        "de": "Superhelden Kraft-Manschetten & Armbänder",
        "fr": "Manchettes de Super-Héros & Bracelets d'Énergie"
      },
      "descriptions": {
        "nl": "Knip twee wc-rollen doormidden en beplak ze met {TITLE} en bliksemschichten om je superkrachten te activeren!",
        "en": "Split cardboard tubes down the middle and armor them with {TITLE} badges to channel your superpowers!",
        "de": "Schneide Papprollen auf und beklebe sie mit {TITLE} für unbesiegbare Superhelden-Kräfte!",
        "fr": "Fendez des rouleaux cartonnés et ornez-les des emblèmes de {TITLE} pour lancer vos super-pouvoirs!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 lege wc-rollen",
          "Aluminiumfolie of zilverpapier",
          "Schaar en lijm"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 empty toilet paper tubes",
          "Silver foil or metallic paper",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 leere Papprollen",
          "Alufolie oder Silberpapier",
          "Schere & Kleber"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 rouleaux en carton",
          "Papier aluminium ou argenté",
          "Ciseaux et colle"
        ]
      },
      "steps": {
        "nl": [
          "Knip beide wc-rollen in de lengte open zodat ze gemakkelijk om je polsen klemmen.",
          "Omwikkel de rollen met zilverfolie als kogelwerend pantser.",
          "Kleur de krachtige symbolen en helden van {TITLE} fel in en knip ze uit.",
          "Lijm de helden-insignes op de polsbanden, schuif ze om en red de wereld!"
        ],
        "en": [
          "Slit both cardboard tubes lengthwise so they spring open and slip comfortably over your wrists.",
          "Wrap the cuffs in silver foil for an impenetrable high-tech metallic finish.",
          "Color the fierce action icons of {TITLE} in high-voltage colors and cut out.",
          "Paste your hero badges onto each wrist guard, snap them on, and unleash your powers!"
        ],
        "de": [
          "Schneide beide Klorollen der Länge nach auf, damit sie um deine Handgelenke passen.",
          "Umwickle die Manschetten mit Alufolie für einen futuristischen Rüstungs-Look.",
          "Male die Action-Symbole von {TITLE} mit feurigen Farben aus und schneide sie aus.",
          "Klebe die Abzeichen auf deine Armbänder und ziehe ins Abenteuer!"
        ],
        "fr": [
          "Fendez les deux rouleaux sur la longueur pour les enfiler facilement aux poignets.",
          "Recouvrez les manchettes de papier argenté pour imiter un blindage de titan.",
          "Coloriez les emblèmes héroïques de {TITLE} avec des feutres éclatants.",
          "Collez les écussons sur vos bracelets, claquez vos poignets et sauvez la planète!"
        ]
      }
    },
    {
      "icon": "👾",
      "tagKey": "art",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Retro Pixel-Art Mozaïek van Vouwblaadjes",
        "en": "Retro 8-Bit Pixel Art Mosaic Grid",
        "de": "Retro 8-Bit Pixel-Art Mosaik",
        "fr": "Mosaïque Pixel-Art Rétro 8-Bit en Carreaux"
      },
      "descriptions": {
        "nl": "Knip kleine vierkante pixel-blokjes uit gekleurd papier en plak ze op {TITLE} voor een echte vintage arcade videogame look.",
        "en": "Snip neat tiny colored paper squares and build a textured 8-bit arcade mosaic over {TITLE}.",
        "de": "Schneide kleine bunte Papierquadrate und verwandle {TITLE} in ein echtes Retro-Arcade Pixelspiel.",
        "fr": "Découpez de petits carrés de papier coloré pour composer une mosaïque rétro façon jeu vidéo d'arcade."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Gekleurde vouwblaadjes",
          "Lijmstift",
          "Schaar of papiersnijder"
        ],
        "en": [
          "{TITLE} coloring page",
          "Colored origami squares",
          "Glue stick",
          "Scissors or paper trimmer"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Buntes Faltpapier",
          "Klebestift",
          "Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papiers origami colorés",
          "Bâton de colle",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Knip verschillende kleuren vouwpapier in kleine vierkantjes van precies 1 bij 1 cm.",
          "Kies welke delen van {TITLE} je wilt inkleuren en welke vlakken je gaat bestraten met \"pixels\".",
          "Lijm de vierkante blokjes strak tegen elkaar aan in rijen alsof het een digitaal beeldscherm is.",
          "Bewonder je authentieke retro 8-bit videogame kunstwerk!"
        ],
        "en": [
          "Slice sheets of bright craft paper into precise 0.5-inch square pixel tiles.",
          "Determine which hero features of {TITLE} to color and which to pave in blocky pixels.",
          "Glue tiles tightly edge-to-edge in horizontal raster scan lines.",
          "Step back and admire your authentic 8-bit arcade gaming masterpiece!"
        ],
        "de": [
          "Schneide buntes Papier in exakte 1x1 cm kleine Mosaik-Pixelquadrate.",
          "Entscheide, welche Bereiche von {TITLE} mit Pixeln belegt werden sollen.",
          "Klebe die bunten Kacheln Reihe für Reihe nahtlos aneinander.",
          "Fertig ist dein cooles Retro-Videospiel Kunstwerk!"
        ],
        "fr": [
          "Découpez du papier vif en petits carrés réguliers de 1 cm de côté.",
          "Repérez les zones de {TITLE} à habiller de pixels colorés.",
          "Collez les carrés bord à bord en damier pour reproduire l'écran d'une console rétro.",
          "Admirez votre tableau pixélisé inspiré des plus grands classiques du jeu vidéo!"
        ]
      }
    },
    {
      "icon": "🃏",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Verzamelbare Helden Trading Cards (Ruilkaarten)",
        "en": "Collectible Hero Trading Cards with Power Stats",
        "de": "Sammelbare Helden-Sammelkarten mit Werten",
        "fr": "Cartes à Collectionner de Héros & Statistiques d'Attaque"
      },
      "descriptions": {
        "nl": "Knip {TITLE} op speelkaartformaat, bedenk statistieken (Aanval, Snelheid, HP) en speel spannende duels tegen vrienden.",
        "en": "Trim {TITLE} to standard trading card size, draft battle stats (Attack, Defense, HP), and duel your friends.",
        "de": "Schneide {TITLE} im Spielkarten-Format aus, erfinde Kampfpunkte (Angriff, Tempo, KP) und duelliere dich.",
        "fr": "Découpez {TITLE} au format carte de jeu, attribuez des points de puissance et défiez vos amis en duel."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Speelkaartkarton (6,3 x 8,8 cm)",
          "Fineliner of gelpen",
          "Lamineerhoesjes"
        ],
        "en": [
          "Colored {TITLE}",
          "Cardstock blanks (2.5 x 3.5 inch)",
          "Fine tip pen",
          "Card sleeves or laminate"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Spielkarten-Karton",
          "Fineliner",
          "Schutzhüllen"
        ],
        "fr": [
          "{TITLE} colorié",
          "Cartonnette format carte",
          "Feutre fin",
          "Protège-cartes transparents"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het karakter of wapen van {TITLE} met veel actie en contrast in.",
          "Plak de figuur op een stevig stuk karton van precies 6,3 bij 8,8 centimeter.",
          "Teken onderaan een scorebalk met aanvalskracht (ATK), verdediging (DEF) en speciale vaart (SPEED).",
          "Steek je kaart in een beschermhoesje en daag je vrienden uit voor een episch ruilkaartenspel!"
        ],
        "en": [
          "Color {TITLE}'s character illustration with fierce energy aura and high contrast.",
          "Mount onto rigid 2.5 x 3.5 inch playing card backing.",
          "Draw stat boxes along the footer listing Attack Power, Defense Shield, and Special Move.",
          "Slide into clear trading card sleeves and challenge your rivals to a showdown!"
        ],
        "de": [
          "Male die Heldenfigur von {TITLE} mit dynamischen Effekten aus.",
          "Klebe das Motiv auf eine feste Spielkarte im Standard-Format.",
          "Erstelle Wertungsfelder für Angriffskraft, Verteidigung und Spezial-Attacke.",
          "Schiebe die Karte in eine Sammelhülle und starte spannende Duelle!"
        ],
        "fr": [
          "Coloriez le personnage héroïque de {TITLE} avec une aura d'énergie vibrante.",
          "Montez l'image sur un carton découpé au format standard de 6,3 x 8,8 cm.",
          "Inscrivez les points d'Attaque, de Défense et le nom de l'Attaque Spéciale.",
          "Glissez la carte dans une pochette transparente et lancez une partie de cartes endiablée!"
        ]
      }
    },
    {
      "icon": "🚪",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Niet Storen: Gamer Bezig! Deurhanger",
        "en": "Gaming in Progress / Do Not Disturb Door Hanger",
        "de": "Gaming im Gange / Bitte Nicht Stören Türhänger",
        "fr": "Accroche-Porte Gamer: Mission en Cours / Ne Pas Déranger"
      },
      "descriptions": {
        "nl": "Maak een officiële deurhanger met {TITLE} die je aan je slaapkamerklink hangt wanneer je ongestoord wilt gamen.",
        "en": "Craft a bold bedroom door hanger featuring {TITLE} warning visitors to stay quiet during clutch matches.",
        "de": "Bastle ein Schild mit {TITLE} für deine Türklinke: Zutritt nur für echte Team-Mitglieder!",
        "fr": "Fabriquez un accroche-porte stylé avec {TITLE} pour avertir que la partie est lancée."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton (10 x 25 cm)",
          "Ronde passer of glas voor de klinkopening",
          "Stiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Heavy cardstock (4 x 10 inch)",
          "Compass or cup to trace knob hole",
          "Markers"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonkarton",
          "Glas zum Anzeichnen des Klinkenlochs",
          "Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton fort (10 x 25 cm)",
          "Verre pour tracer l'orifice de poignée",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de actieheld van {TITLE} met opvallende neonkleuren.",
          "Knip een langwerpige strook karton uit en snijd bovenin een ronde opening die om je deurklink past.",
          "Plak {TITLE} op de hanger en schrijf in grote letters: \"PRO GAMER BEZIG — NIET STOREN!\".",
          "Hang hem aan je klink wanneer je gefocust aan het spelen bent!"
        ],
        "en": [
          "Color the action pose of {TITLE} in punchy vibrant neon shades.",
          "Cut a tall cardstock rectangle, cutting a 2.5-inch circular notch at the top to slide over your door handle.",
          "Affix {TITLE} squarely in the center with bold lettering: \"LEVELING UP — DO NOT DISTURB!\".",
          "Hang over your bedroom door handle whenever you're locked in a high-stakes campaign!"
        ],
        "de": [
          "Male die Heldengestalt von {TITLE} in kräftigen Neonfarben an.",
          "Schneide einen Kartonstreifen mit rundem Loch für die Türklinke zurecht.",
          "Platziere {TITLE} auf dem Hänger und schreibe: \"LEVEL UP IM GANGE — BITTE NICHT STÖREN!\".",
          "Hänge das Schild an deine Zimmertür vor jeder Gaming-Session!"
        ],
        "fr": [
          "Coloriez la pose dynamique de {TITLE} avec des feutres néon percutants.",
          "Découpez une bande de carton avec une ouverture circulaire adaptée à la poignée de porte.",
          "Collez votre dessin et inscrivez: \"PARTIE EN COURS — NE PAS DÉRANGER!\".",
          "Suspendez votre panneau à la porte pour jouer en toute tranquillité!"
        ]
      }
    },
    {
      "icon": "🎮",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "35 min",
      "titles": {
        "nl": "DIY Retro Kartonnen Mini Arcade Kastje",
        "en": "Cardboard Desktop Mini Arcade Cabinet",
        "de": "Karton Retro Mini-Spielautomat",
        "fr": "Mini Borne d'Arcade Rétro de Bureau en Carton"
      },
      "descriptions": {
        "nl": "Vouw een kleine 3D speelautomaat met een schermpje van {TITLE}, joystick van een prikker en knoppen van doppen.",
        "en": "Construct an authentic desktop arcade machine showcasing {TITLE} as the marquee title screen.",
        "de": "Baue ein 3D-Arcade Gehäuse mit {TITLE} als Spielbildschirm, Knöpfen und Mini-Joystick.",
        "fr": "Bâtissez une réplique de borne d'arcade avec {TITLE} en guise d'écran de jeu et joystick en bois."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen doosje",
          "Kralen of flessendoppen voor knoppen",
          "Tandenstoker of kurk (joystick)"
        ],
        "en": [
          "Colored {TITLE}",
          "Small cardboard box",
          "Plastic caps or beads for buttons",
          "Toothpick and cork (joystick)"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Pappkarton",
          "Knöpfe oder Perlen",
          "Korken und Spieß"
        ],
        "fr": [
          "{TITLE} colorié",
          "Boîte cartonnée",
          "Bouchons ou perles (boutons)",
          "Cure-dent et liège (manette)"
        ]
      },
      "steps": {
        "nl": [
          "Knip de zijkanten van een klein doosje schuin af in de klassieke vorm van een arcade-speelkast.",
          "Plak je ingekleurde {TITLE} precies in het schuine schermvenster als de actie-game.",
          "Prik een tandenstoker met een klein kurkje of bolletje klei als beweegbare joystick.",
          "Lijm twee felgekleurde kralen als A- en B-knoppen en speel je eigen retro game!"
        ],
        "en": [
          "Angle the sides of a small pantry box to replicate a slanted retro coin-op cabinet silhouette.",
          "Mount your {TITLE} art inside the angled monitor display as the hero gameplay scene.",
          "Puncture a toothpick with a clay sphere knob into the control deck for a tactile joystick.",
          "Glue bright button tokens beside it to complete your desktop arcade shrine!"
        ],
        "de": [
          "Schneide die Seiten einer Schachtel schräg zu wie bei einem echten Spielautomaten.",
          "Setze dein {TITLE}-Bild als leuchtenden Spielbildschirm ein.",
          "Stecke einen Holzstab mit kleiner Kugel als beweglichen Joystick in das Bedienfeld.",
          "Klebe zwei bunte Knöpfe auf und hole dir das Spielhallen-Feeling nach Hause!"
        ],
        "fr": [
          "Découpez les flancs d'une boîte en biseau pour recréer la forme mythique d'une borne d'arcade.",
          "Collez votre illustration {TITLE} sur la vitre inclinée de l'écran de jeu.",
          "Plantez un cure-dent surmonté d'une boule en pâte à modeler pour faire le joystick.",
          "Ajoutez deux perles colorées pour les boutons d'action et jouez des parties infinies!"
        ]
      }
    },
    {
      "icon": "🏆",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Gouden Kampioens Beker & Toernooitrofee",
        "en": "Victory Royale Gold Champion Trophy",
        "de": "Sieger-Pokal & Champion-Turniertrophäe",
        "fr": "Trophée de Champion & Coupe de la Victoire Royale"
      },
      "descriptions": {
        "nl": "Bouw een glanzende beker van twee papieren bekertjes en zet het kampioens-embleem van {TITLE} op de top!",
        "en": "Stack two paper cups base-to-base and crown with {TITLE}'s victory badge for tournament bragging rights.",
        "de": "Baue aus zwei Pappbechern einen goldenen Pokal mit {TITLE} für den ultimativen Siegertitel.",
        "fr": "Assemblez deux gobelets peints en or surmontés de {TITLE} pour célébrer votre victoire au tournoi."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "2 papieren drinkbekertjes",
          "Goudgele verf of folie",
          "Lijm en schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "2 paper drink cups",
          "Gold craft paint or foil",
          "Glue and scissors"
        ],
        "de": [
          "{TITLE} Bild",
          "2 Pappbecher",
          "Goldfarbe",
          "Kleber & Schere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "2 gobelets en carton",
          "Peinture dorée",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Plak twee papieren bekertjes met de bodems aan elkaar vast: één als voet en één als kelk.",
          "Schilder de bekers goudgeel of beplak ze met aluminiumfolie.",
          "Knip twee gebogen kartonnen handvatten en lijm ze aan de zijkant van de beker.",
          "Plak het heldhaftige figuur van {TITLE} pontificaal op de voorkant van je trofee!"
        ],
        "en": [
          "Glue the bases of two paper cups firmly together to form a standing trophy pedestal and chalice.",
          "Coat with shimmering gold paint or smooth reflective metallic paper.",
          "Cut two curved ear handles from scrap cardstock and affix to either side of the chalice rim.",
          "Mount the heroic victor crest of {TITLE} to the front and hoist your trophy high!"
        ],
        "de": [
          "Klebe zwei Pappbecher mit den Böden aneinander – einer dient als Sockel, der andere als Pokal.",
          "Male den Pokal rundherum mit glänzender Goldfarbe an.",
          "Befestige zwei geschwungene Griffe an den Seiten.",
          "Platziere dein {TITLE}-Abzeichen vorne auf dem Pokal und feiere deinen ersten Platz!"
        ],
        "fr": [
          "Collez le fond de deux gobelets ensemble pour créer le pied et la coupe du trophée.",
          "Peignez l'ensemble en doré étincelant.",
          "Découpez deux anses courbées et fixez-les de chaque côté de la coupe.",
          "Collez l'emblème victorieux de {TITLE} au centre et brandissez votre trophée bien haut!"
        ]
      }
    },
    {
      "icon": "🎯",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Schietschijf & Precisie Mikpunt Spel",
        "en": "Target Practice Bullseye & Blaster Game",
        "de": "Präzisions-Zielscheibe & Wurftraining-Spiel",
        "fr": "Cible d'Entraînement de Tir & Jeu de Précision"
      },
      "descriptions": {
        "nl": "Teken score-cirkels (10, 50, 100 punten) rond {TITLE} en gooi met propjes papier of zuignappijltjes.",
        "en": "Ring concentric point values around {TITLE} for target practice with paper balls or dart blasters.",
        "de": "Zeichne Punktekreise um {TITLE} und treffe das Ziel mit weichen Papierbällchen oder Saugnapfpfeilen.",
        "fr": "Tracez des zones de points concentriques autour de {TITLE} pour tester votre précision au tir."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot stuk karton",
          "Stiften voor scorepunten",
          "Propjes papier of foam balletjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large cardstock backer",
          "Score markers",
          "Soft paper wads or foam darts"
        ],
        "de": [
          "{TITLE} Bild",
          "Großer Karton",
          "Marker für Punkte",
          "Papierbällchen"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grand carton support",
          "Feutres pour marquer les points",
          "Boulettes de papier"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} exact in het midden van een groot vel karton als de ultieme roos (\"BULLSEYE\").",
          "Teken met een stift drie grote concentrische cirkels eromheen met punten: 20, 50 en 100.",
          "Hang het doelwit op aan de deur of zet het stevig tegen een stoel.",
          "Gooi om de beurt met drie zachte propjes papier en tel wie de hoogste score haalt!"
        ],
        "en": [
          "Mount {TITLE} dead center upon your cardstock backer as the primary high-value bullseye.",
          "Draw three concentric score rings around the character awarding 25, 50, and 100 bonus points.",
          "Prop the target securely against a wall or chair cushion.",
          "Take turns launching three foam darts or soft rolled paper projectiles to crown the sharpest shooter!"
        ],
        "de": [
          "Klebe {TITLE} genau in das Zentrum des Kartons als Volltreffer-Punkt.",
          "Ziehe konzentrische Kreise darum herum mit Punktwerten wie 10, 50 und 100 Punkten.",
          "Befestige die Zielscheibe an der Wand oder an einer Sofakante.",
          "Wirf mit weichen Papierkügelchen und zähle deine Treffer zusammen!"
        ],
        "fr": [
          "Collez {TITLE} au centre exact du carton pour figurer le cœur de la cible.",
          "Tracez des anneaux concentriques valant 20, 50 et 100 points tout autour.",
          "Installez la cible contre un mur ou le dossier d'une chaise.",
          "Lancez trois boulettes de papier à tour de rôle et comptez vos points pour désigner le vainqueur!"
        ]
      }
    },
    {
      "icon": "🔑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Gepantserde Sleutelhanger voor je Fietssleutel",
        "en": "Laminated Action Keyring & Backpack Charm",
        "de": "Robuster Schlüsselanhänger für den Fahrradschlüssel",
        "fr": "Porte-Clés Héroïque Plastifié pour Vélo & Casier"
      },
      "descriptions": {
        "nl": "Verklein en lamineer {TITLE} tot een onverwoestbare sleutelhanger voor je kluisje of fietssleutel.",
        "en": "Shrink and double-laminate {TITLE} into a durable scratch-proof keychain fob for keys and gym lockers.",
        "de": "Laminiere das Symbol von {TITLE} als unzerstörbaren Schlüsselanhänger für dein Fahrrad.",
        "fr": "Plastifiez le motif de {TITLE} pour en faire un porte-clés incassable à emporter partout."
      },
      "materials": {
        "nl": [
          "Gekleurd detail van {TITLE}",
          "Zelfklevend plakplastic of lamineermachine",
          "Perforator",
          "Sleutelring of koord"
        ],
        "en": [
          "Cutout detail from {TITLE}",
          "Self-adhesive laminate or pouch",
          "Hole punch",
          "Split keyring or cord"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Laminierfolie",
          "Locher",
          "Schlüsselring"
        ],
        "fr": [
          "Motif découpé de {TITLE}",
          "Pochette de plastification",
          "Perforatrice",
          "Anneau de porte-clés"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de heldhaftige figuur van {TITLE} met heldere, krachtige kleuren.",
          "Knip de figuur compact uit en seal hem tussen twee lagen dik lamineerfolie.",
          "Knip de folie bij met een waterdichte rand van 3 millimeter.",
          "Perforeer een gaatje in de bovenhoek en haal je sleutelring erdoorheen!"
        ],
        "en": [
          "Color {TITLE} intensely so the icon stands out at a compact size.",
          "Trim around the silhouette and seal between heavy heat laminate or clear contact film.",
          "Cut leaving a sealed 0.15-inch clear water-resistant rim around the edges.",
          "Punch a reinforced hole at the top and loop your split steel keyring through!"
        ],
        "de": [
          "Male die Figur von {TITLE} mit kontrastreichen Farben an.",
          "Schneide das Motiv sauber aus und laminiere es knickfest ein.",
          "Lasse einen kleinen Rand stehen, damit die Folie wasserdicht verschweißt bleibt.",
          "Loche den oberen Rand und fädle deinen Schlüsselring ein!"
        ],
        "fr": [
          "Coloriez le symbole de {TITLE} avec des nuances éclatantes.",
          "Découpez la silhouette et plastifiez-la solidement.",
          "Découpez en laissant une marge étanche de quelques millimètres autour du motif.",
          "Perforez le sommet et passez votre anneau de porte-clés pour ne plus jamais perdre vos clés!"
        ]
      }
    },
    {
      "icon": "🎲",
      "tagKey": "game",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "DIY Helden Bordspel met Actievakjes",
        "en": "Action Heroes DIY Board Game with Obstacles",
        "de": "Eigenes Helden-Brettspiel mit Aktionsfeldern",
        "fr": "Jeu de Plateau Héroïque Fait Maison avec Pièges"
      },
      "descriptions": {
        "nl": "Teken een slingerend pad van 30 vakjes naar de eindbaas {TITLE} met power-ups en valstrikken.",
        "en": "Draft a 30-tile quest trail leading to final boss {TITLE}, packed with power boost tiles and hazard traps.",
        "de": "Zeichne einen Spielplan mit 30 Feldern bis zum Endgegner {TITLE} mit Power-Ups und Fallen.",
        "fr": "Tracez un parcours de 30 cases semé de pièges menant jusqu'au boss final {TITLE}."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Groot vel tekenpapier (A3)",
          "Dobbelsteen",
          "Stiften en speelfiguurtjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Large drawing paper sheet (A3/Poster)",
          "Standard dice",
          "Markers and game tokens"
        ],
        "de": [
          "{TITLE} Bild",
          "Großes Zeichenblatt",
          "Würfel",
          "Spielfiguren & Stifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Grande feuille cartonnée A3",
          "Dé à 6 faces",
          "Pions et feutres"
        ]
      },
      "steps": {
        "nl": [
          "Plak {TITLE} op het eindvak als de grote eindbaas van het spelbord.",
          "Teken een slingerend pad van 25 tot 30 vakjes vanaf \"START\" naar de finish.",
          "Verzin leuke actievakjes: \"Teleporteer 3 vakken vooruit!\", \"Valstrik! 1 beurt overslaan\".",
          "Pak een dobbelsteen en pionnetjes en race tegen je vrienden naar de overwinning!"
        ],
        "en": [
          "Paste {TITLE} on the final \"VICTORY\" tile as the ultimate champion destination.",
          "Sketch a winding path of 30 square stepping tiles leading out from START.",
          "Inscribe surprise action tiles: \"+2 Speed Boost!\", \"Monster Ambush! Roll again\", \"Shield Up!\".",
          "Grab dice and token movers to race your friends across the board!"
        ],
        "de": [
          "Klebe {TITLE} auf das Zielfeld als legendären Endgegner.",
          "Zeichne einen geschwungenen Pfad mit nummerierten Feldern von Start bis Ziel.",
          "Erfinde lustige Sonderfelder: \"Gehe 3 Felder vor!\", \"Pause machen!\", \"Superkraft aktivieren!\".",
          "Schnapp dir einen Würfel und Spielfiguren und würfle dich zum Sieg!"
        ],
        "fr": [
          "Collez {TITLE} sur la case d'arrivée pour figurer le boss légendaire.",
          "Tracez une piste sinueuse de 30 cases numérotées depuis la case DÉPART.",
          "Ajoutez des cases spéciales: \"Turbo: avance de 3 cases!\", \"Passer un tour\", \"Super bouclier!\".",
          "Prenez un dé et des pions pour vous affronter dans une course haletante!"
        ]
      }
    },
    {
      "icon": "⚡",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "3D Helden Embleem Badge voor je Rugzak",
        "en": "Dimensional Hero Backpack Badge & Patch",
        "de": "3D Helden-Emblem Anstecker für den Ranzen",
        "fr": "Écusson 3D de Héros pour Sac à Dos & Veste"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een opvallende kartonnen rand en bevestig een veiligheidsspeld om hem als ereteken te dragen.",
        "en": "Craft an embossed cardstock insignia patch with {TITLE} to wear proudly on your clothing or backpack.",
        "de": "Bastle ein erhabenes Emblem von {TITLE} als Ehrenabzeichen für deinen Schulranzen.",
        "fr": "Montez {TITLE} en médaillon avec épingle de sûreté pour arborer votre insigne de membre de la ligue."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Kartonnen bierviltje of dik karton",
          "Veiligheidsspeld en plakband",
          "Glitters"
        ],
        "en": [
          "Finished {TITLE}",
          "Coaster blank or heavy cardboard",
          "Safety pin and durable tape",
          "Glitter trim"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Bierdeckel oder Pappe",
          "Sicherheitsnadel & Tape",
          "Glitzer"
        ],
        "fr": [
          "{TITLE} colorié",
          "Rond de carton épais",
          "Épingle de nourrice et adhésif renforcé",
          "Paillettes"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het centrale insigne van {TITLE} met knallende heldenkleuren.",
          "Knip de figuur cirkelvormig uit en plak hem op een stevig rond stuk karton.",
          "Versier de buitenrand met stoere bliksemschichten of glitters.",
          "Plak een veiligheidsspeld stevig vast aan de achterzijde en draag je heldeninsigne met trots!"
        ],
        "en": [
          "Color {TITLE}'s primary emblem using bold comic book color palettes.",
          "Trim into a medallion shield shape and back with thick circular cardboard.",
          "Border the perimeter with silver metallic pen or fiery trim.",
          "Tape a safety pin securely across the back and fasten to your jacket or backpack!"
        ],
        "de": [
          "Male das {TITLE}-Wappen mit energiegeladenen Farben aus.",
          "Schneide das Abzeichen rund aus und klebe es auf festen Karton.",
          "Verziere den Rand mit Blitzen oder Zackenmustern.",
          "Fixiere eine Sicherheitsnadel auf der Rückseite und trage deinen Orden stolz!"
        ],
        "fr": [
          "Coloriez le blason héroïque de {TITLE} avec des teintes vives et contrastées.",
          "Découpez en cercle et montez sur un support rigide.",
          "Soulignez le tour avec des éclairs dessinés ou des paillettes argentées.",
          "Scotchez solidement une épingle de sûreté au verso et arborez votre badge sur votre veste!"
        ]
      }
    },
    {
      "icon": "📖",
      "tagKey": "school",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Eigen Comic Stripverhaal Boekomslag",
        "en": "Original Comic Book Graphic Novel Cover",
        "de": "Eigenes Comic-Heft & Abenteuer-Cover",
        "fr": "Couverture de Bande Dessinée & Comics Original"
      },
      "descriptions": {
        "nl": "Ontwerp een spectaculaire stripboek-omslag met {TITLE} inclusief spraakballonnen en geluidseffecten (\"BAM!\", \"POW!\").",
        "en": "Design an action-packed comic cover starring {TITLE} with explosive sound effects like \"BAM!\" and \"POW!\".",
        "de": "Gestalte dein eigenes Comic-Cover mit {TITLE}, Sprechblasen und Knall-Effekten wie \"BAM!\" und \"ZAP!\".",
        "fr": "Créez une véritable couverture de comic book avec {TITLE}, bulles de dialogue et onomatopées percutantes!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Knutselkarton A4",
          "Tekenvellen voor de binnenpagina's",
          "Zwarte fineliner"
        ],
        "en": [
          "{TITLE} coloring page",
          "A4/Letter cardstock",
          "Blank paper sheets for comic pages",
          "Black fineliner"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Tonpapier A4",
          "Weiße Blätter für Comicszenen",
          "Schwarzer Fineliner"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton A4",
          "Feuilles blanches pour les planches",
          "Feutre fin noir"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in en knip grote explosie-sterren uit gekleurd papier.",
          "Schrijf krachtige geluidseffecten in de sterren zoals \"KAPOW!\", \"BOOM!\" en \"KRACH!\".",
          "Plak {TITLE} en de actieteksten op de voorkant van een gevouwen vel karton.",
          "Niet 4 lege witte vellen aan de binnenkant en teken je eigen spannende stripverhaal!"
        ],
        "en": [
          "Color {TITLE} with sharp, punchy comic-book halftone shading.",
          "Cut jagged speech burst clouds from yellow cardstock and pen dynamic words: \"POW!\", \"BOOM!\".",
          "Paste {TITLE} and the action burst starbursts onto the front cover of folded cardstock.",
          "Staple 4 blank pages inside and illustrate your own thrilling episodic graphic novel!"
        ],
        "de": [
          "Male {TITLE} wie eine echte Comicfigur mit kräftigen Schatten aus.",
          "Schneide zackige Explosions-Sterne aus gelbem Papier und schreibe \"BAM!\" und \"POW!\" hinein.",
          "Arrangiere die Elemente auf der Vorderseite deines Comic-Hefts.",
          "Hefte weiße Seiten hinein und zeichne dein eigenes Abenteuer in Comic-Kästchen!"
        ],
        "fr": [
          "Coloriez {TITLE} en accentuant les contours comme dans les comics américains.",
          "Découpez des bulles d'explosion jaunes et inscrivez des onomatopées: \"BOOM!\", \"SPLASH!\", \"BAM!\".",
          "Composez la couverture sur une chemise cartonnée.",
          "Agrafez des feuilles blanches à l'intérieur et dessinez les planches de votre première bande dessinée!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Epische Gaming Poster in Stoere Zwarte Lijst",
        "en": "Framed Epic Gaming Wall Art & Poster",
        "de": "Episches Gaming-Poster im schwarzen Rahmen",
        "fr": "Poster de Gaming Épique Encadré Noir Mat"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een donkere cyberpunk of neon achtergrond en hang hem op als ultieme gaming room poster.",
        "en": "Highlight {TITLE} with electric neon accents and display in a matte black frame over your battle station.",
        "de": "Verpasse {TITLE} leuchtende Neon-Effekte und hänge es gerahmt über deine Zockerecke.",
        "fr": "Faites ressortir les contrastes néon de {TITLE} et exposez votre affiche dans votre espace de jeu."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Fotolijst A4 (zwart)",
          "Zwart of donkerblauw karton",
          "Neon stiften"
        ],
        "en": [
          "Finished {TITLE} artwork",
          "A4/Letter black frame",
          "Black cardstock mat board",
          "Neon or gel pens"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Schwarzer Bilderrahmen",
          "Schwarzer Tonkarton",
          "Neonstifte"
        ],
        "fr": [
          "Dessin {TITLE} terminé",
          "Cadre noir A4",
          "Passe-partout noir mat",
          "Feutres néon"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de tekening met felle contrasterende neonkleuren tegen een donkere achtergrond.",
          "Snijd een strak zwart kartonnen kader uit om het artwork intens naar voren te laten springen.",
          "Plak je poster stevig in het midden van het kader.",
          "Plaats in een zwarte lijst en hang hem trots boven je bureau of gaming setup!"
        ],
        "en": [
          "Shade {TITLE} with brilliant glowing neon highlights against dark ink shadows.",
          "Mount squarely upon a jet-black matte board to make the electric pigments jump forward.",
          "Fasten securely inside an ebony frame.",
          "Mount proudly above your computer desk or game station to showcase your creator status!"
        ],
        "de": [
          "Male das Bild mit strahlenden Neonfarben und tiefen Schatten aus.",
          "Setze das Bild zentriert auf mattschwarzes Tonpapier für maximale Leuchtkraft.",
          "Schließe den schwarzen Glasrahmen fest.",
          "Hänge dein persönliches Gaming-Artwork über deinem Schreibtisch auf!"
        ],
        "fr": [
          "Illuminez {TITLE} avec des rehauts fluorescents contrastant avec les ombres.",
          "Montez la feuille sur un carton noir mat profond pour exalter les couleurs.",
          "Placez délicatement sous verre dans un cadre noir sobre.",
          "Accrochez votre poster au-dessus de votre console ou bureau de jeu!"
        ]
      }
    }
  ],
  "holidays-seasons": [
    {
      "icon": "🎄",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Glinsterende Seizoens- & Kerstboomhanger",
        "en": "Sparkling Holiday Tree & Wreath Bauble",
        "de": "Glänzender Weihnachtsbaum- & Festanhänger",
        "fr": "Boule de Noël & Ornement de Sapin Étincelant"
      },
      "descriptions": {
        "nl": "Knip {TITLE} in een ronde medaillon-vorm, beplak met glitter en hang hem met een lintje in de kerstboom of aan de seizoenskrans.",
        "en": "Trim {TITLE} into a circular disc ornament, rim with dazzling glitter, and hang from tree branches.",
        "de": "Schneide {TITLE} kreisrund aus, glitzere den Rand ein und hänge es mit Geschenkband an den Weihnachtsbaum.",
        "fr": "Découpez {TITLE} en disque décoratif, pailletez le contour et suspendez-le aux branches du sapin."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton",
          "Glitterlijm",
          "Zilveren of gouden lintje"
        ],
        "en": [
          "{TITLE} coloring page",
          "Stiff cardboard disc",
          "Glitter glue",
          "Silver or gold hanging ribbon"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Pappscheibe",
          "Glitzerkleber",
          "Glanzband zum Aufhängen"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Rond de carton fort",
          "Colle pailletée",
          "Ruban d'attache argenté ou doré"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in met feestelijke kleuren zoals dennengroen, dieprood en sneeuwwit.",
          "Plak de figuur op een cirkel van dik karton van ongeveer 9 cm.",
          "Versier de buitenste rand met een fonkelend randje glitterlijm.",
          "Maak bovenin een klein gaatje, haal het gouden lintje erdoorheen en hang hem in de boom!"
        ],
        "en": [
          "Color {TITLE} with rich celebratory tones of pine green, cranberry, and snowflake silver.",
          "Mount squarely onto a 3.5-inch round cardboard medallion for firmness.",
          "Trace a bead of sparkling glitter glue around the rim.",
          "Pierce a small eyelet at the peak, thread festive ribbon, and display prominently on the branches!"
        ],
        "de": [
          "Male {TITLE} in feierlichen Rot-, Tannengrün- und Schneeweißtönen an.",
          "Klebe das Motiv auf eine stabile runde Kartonscheibe.",
          "Verziere den Rand mit funkelndem Glitzer.",
          "Fädle ein goldenes Band durch ein Loch am oberen Rand und schmücke den Baum!"
        ],
        "fr": [
          "Coloriez {TITLE} avec des teintes de fête: rouge rubis, vert sapin et blanc neige.",
          "Collez le médaillon sur un disque de carton de 9 cm.",
          "Bordez le pourtour d'un liseré de colle pailletée.",
          "Perforez un trou, passez le ruban doré et suspendez fièrement au sapin de Noël!"
        ]
      }
    },
    {
      "icon": "🎃",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Griezelig / Vrolijk Raamsilhouet",
        "en": "Spooky / Festive Holiday Window Silhouette",
        "de": "Saisonales Fenster-Schattenbild",
        "fr": "Silhouette Festive Découpée pour Vitre"
      },
      "descriptions": {
        "nl": "Knip het schaduwsilhouet van {TITLE} uit en plak het met een klein plakbandje op het raam tegen de avondschemering.",
        "en": "Cut a high-contrast cutout silhouette of {TITLE} to cast bold festive shapes on glowing windows at dusk.",
        "de": "Schneide die Konturen von {TITLE} aus und klebe das Bild als stimmungsvolles Schattenbild an die Fensterscheibe.",
        "fr": "Découpez les contours nets de {TITLE} pour créer un jeu d'ombres festif sur vos fenêtres au coucher du soleil."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Zwart of oranje papier (optioneel)",
          "Schaar",
          "Plakband voor het raam"
        ],
        "en": [
          "{TITLE} coloring page",
          "Black or vibrant paper",
          "Safety scissors",
          "Window-safe tape"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Schwarzes Tonpapier",
          "Schere",
          "Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Papier noir ou orangé",
          "Ciseaux",
          "Ruban adhésif pour vitres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} met diepe, mysterieuze feestkleuren of knip de zwarte omtrek nauwkeurig uit.",
          "Verwijder alle witte restjes rondom de figuur.",
          "Plak kleine stukjes transparant plakband op de achterkant van de randen.",
          "Druk het silhouet tegen het raam; als 's avonds de lampen aangaan, ziet de hele straat je decoratie!"
        ],
        "en": [
          "Color {TITLE} with rich twilight contrast or trim around black contour lines.",
          "Carefully shear away all negative background paper.",
          "Dab small clear tape tabs to the back tips.",
          "Affix to your front windowpane; as indoor lights turn on, your silhouette glows into the night street!"
        ],
        "de": [
          "Male {TITLE} aus oder schneide die Silhouette direkt an der Außenlinie aus.",
          "Schneide alle weißen Zwischenräume sorgfältig weg.",
          "Bringe kleine Streifen Klebeband auf der Rückseite an.",
          "Klebe das Schattenbild ans Fenster – im Abendlicht wird es von draußen wunderbar leuchten!"
        ],
        "fr": [
          "Coloriez {TITLE} en contrastes vifs ou découpez minutieusement la silhouette extérieure.",
          "Évidez soigneusement les espaces intérieurs.",
          "Placez de petits morceaux d'adhésif au verso.",
          "Appliquez sur la vitre: dès la tombée de la nuit, votre création s'illumine de l'extérieur!"
        ]
      }
    },
    {
      "icon": "🕯️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "30 min",
      "titles": {
        "nl": "Feestelijke Lampion & Sint-Maarten Lichtje",
        "en": "Festive Paper Lantern & Candle Carrier",
        "de": "Festliche Laterne & Martinslicht",
        "fr": "Lanterne de Fête & Lampion en Papier Plié"
      },
      "descriptions": {
        "nl": "Vouw en knip verticale lamelletjes in {TITLE}, rol het tot een cilinder en plaats een veilig led-lampje binnenin.",
        "en": "Slit vertical paper slats across {TITLE}, fold into an accordion barrel, and light up with a safe LED glow.",
        "de": "Schneide feine Streifen in {TITLE}, forme einen Laternenzylinder und bringe ihn mit einem LED-Licht zum Strahlen.",
        "fr": "Incisez des fentes verticales régulières sur {TITLE}, formez un cylindre et illuminez avec une veilleuse LED."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Lijmstift en schaar",
          "Led-lampje of theelichtje",
          "Strookje karton voor hengsel"
        ],
        "en": [
          "{TITLE} coloring page",
          "Glue stick and scissors",
          "Battery LED light",
          "Paper strip for handle"
        ],
        "de": [
          "{TITLE} Bild",
          "Kleber & Schere",
          "LED-Licht",
          "Papierstreifen als Bügel"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Bâton de colle et ciseaux",
          "Bougie chauffe-plat LED",
          "Bande cartonnée pour la anse"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het hele blad vrolijk en helder in met stiften.",
          "Vouw het blad horizontaal dubbel en knip vanaf de vouw gelijkmatige verticale sneetjes tot 2 cm voor de rand.",
          "Vouw het blad weer open en plak de twee korte zijkanten tot een ronde cilinder aan elkaar vast.",
          "Niet een hengsel aan de bovenkant, zet het led-lampje erin en wandel trots met je lampion!"
        ],
        "en": [
          "Fill the coloring page from edge to edge in vibrant celebration colors.",
          "Fold horizontal midpoint, cutting parallel slits 1-inch apart from fold to within 1-inch of the top edge.",
          "Open the sheet and curl into a cylinder, gluing opposing ends so the slats flare outward.",
          "Staple a paper arched handle across the rim and illuminate with a safe battery candle!"
        ],
        "de": [
          "Male das Blatt rundherum in bunten Farben an.",
          "Falte das Blatt längs in der Mitte und schneide parallele Schlitze bis kurz vor den Rand.",
          "Klappe das Papier auf und klebe die kurzen Enden zu einem Zylinder zusammen.",
          "Befestige einen Tragegriff oben und stelle ein sicheres LED-Licht hinein!"
        ],
        "fr": [
          "Coloriez toute la surface avec des couleurs chaudes et éclatantes.",
          "Pliez la feuille en deux dans la longueur et entaillez des fentes régulières le long du pli.",
          "Rouvrez la feuille et collez les deux petits côtés pour former un lampion galbé.",
          "Agrafez une anse au sommet, insérez la veilleuse LED et défilez avec votre lampion lumineux!"
        ]
      }
    },
    {
      "icon": "❄️",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Winterse 3D Sneeuwbol met Glitters",
        "en": "Winter Wonder DIY Glitter Snow Globe",
        "de": "Winterliche 3D Glitzer-Schneekugel",
        "fr": "Boule à Neige 3D Féerique Fait Maison"
      },
      "descriptions": {
        "nl": "Lamineer {TITLE}, lijm hem op de deksel van een glazen potje en vul met water en glitter voor een magische sneeuwbui.",
        "en": "Laminate {TITLE}, glue upright inside a jar lid, and submerge in water with swirling snow glitter.",
        "de": "Laminiere {TITLE}, klebe es auf die Innenseite des Deckels und fülle das Glas mit glitzerndem Schneewasser.",
        "fr": "Plastifiez {TITLE}, fixez au revers d'un couvercle et remplissez d'eau scintillante pour créer une tempête de neige."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Glazen potje met schroefdeksel",
          "Glitter of kunstsneeuw",
          "Water en paar druppels glycerine/babyolie"
        ],
        "en": [
          "Colored {TITLE}",
          "Clean glass jar with seal lid",
          "White/silver glitter",
          "Water and drops of baby oil"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Schraubglas",
          "Glitzer / Kunstschnee",
          "Wasser & Tropfen Babyöl"
        ],
        "fr": [
          "{TITLE} colorié",
          "Bocal en verre hermétique",
          "Paillettes blanches et argentées",
          "Eau et goutte d'huile"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in, knip de figuur uit en lamineer hem waterdicht tussen twee lagen folie.",
          "Lijm de onderkant van de figuur met watervaste lijm stevig op de binnenkant van de deksel.",
          "Vul het potje tot de rand met water, een scheutje babyolie en twee theelepels glitters.",
          "Draai de deksel er muurvast op, keer het potje om en schud voor een betoverende sneeuwstorm!"
        ],
        "en": [
          "Color {TITLE} brightly, trim neatly, and seal water-tight in heavy plastic laminate.",
          "Glue the figure firmly to the inner surface of the jar lid using waterproof craft adhesive.",
          "Fill the jar with clean water, a few drops of baby oil to slow settling, and sparkling glitter flakes.",
          "Screw the lid on tightly, flip the jar upside down, and watch the winter snowfall swirl!"
        ],
        "de": [
          "Male {TITLE} aus und laminiere die Figur wasserdicht ein.",
          "Klebe die Figur mit wasserfestem Kleber auf die Deckel-Innenseite.",
          "Fülle das Glas mit Wasser, einem Tropfen Babyöl und feinem Kunstschnee.",
          "Schraube den Deckel fest zu, drehe das Glas um und lasse es schneien!"
        ],
        "fr": [
          "Coloriez {TITLE}, découpez-le et plastifiez-le hermétiquement pour le rendre étanche.",
          "Collez le bas de la silhouette sur la face intérieure du couvercle avec de la colle forte.",
          "Remplissez le bocal d'eau, d'une goutte d'huile douce et d'une cuillère de paillettes argentées.",
          "Vissez le couvercle à fond, retournez le pot et secouez pour faire tourbillonner la neige!"
        ]
      }
    },
    {
      "icon": "🐰",
      "tagKey": "craft",
      "difficultyKey": "medium",
      "time": "25 min",
      "titles": {
        "nl": "Lente- & Paas Traktatiemandje van Papier",
        "en": "Spring Celebration Treat & Candy Basket",
        "de": "Frühlings- & Oster-Körbchen für Süßigkeiten",
        "fr": "Panier de Printemps & Corbeille de Friandises"
      },
      "descriptions": {
        "nl": "Vouw een schattig mandje van karton met {TITLE} op de voorkant, gevuld met paaseitjes of lekkers.",
        "en": "Weave a cardstock gift basket adorned with {TITLE} to hold holiday treats, candies, and Easter eggs.",
        "de": "Falte ein süßes Osterkörbchen mit {TITLE} für Schokoeier und Frühlings-Überraschungen.",
        "fr": "Fabriquez un petit panier cartonne orné de {TITLE} pour récolter les œufs de Pâques et gourmandises."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Vierkant vel karton",
          "Lijmstift en schaar",
          "Snoepjes of paaseitjes"
        ],
        "en": [
          "{TITLE} coloring page",
          "Square sheet of colored cardstock",
          "Glue stick and scissors",
          "Holiday candy"
        ],
        "de": [
          "{TITLE} Bild",
          "Quadratischer Tonkarton",
          "Kleber & Schere",
          "Leckereien"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Feuille de carton carrée",
          "Colle et ciseaux",
          "Chocolats de fête"
        ]
      },
      "steps": {
        "nl": [
          "Verdeel een vierkant stuk karton met potlood in een 3x3 raster en knip de vier hoeklijntjes in.",
          "Vouw de zijkanten omhoog en plak de hoeken tegen elkaar zodat er een open bakje ontstaat.",
          "Plak een strook karton als hengsel over het mandje.",
          "Kleur en knip {TITLE} uit en plak deze vrolijk op de voorkant van je traktatiemandje!"
        ],
        "en": [
          "Score a square cardstock sheet into a 3x3 grid and cut four corner slits.",
          "Fold the side flaps upward and glue the corner corners to build a sturdy open box basket.",
          "Arch an overhead cardstock strip across the basket rim to serve as a carrying handle.",
          "Mount your {TITLE} illustration on the basket front and fill with holiday chocolates!"
        ],
        "de": [
          "Unterteile ein quadratisches Blatt in ein 3x3 Raster und schneide die vier Ecken ein.",
          "Falte die Wände nach oben und klebe die Ecken zu einer Schale zusammen.",
          "Bringe einen Papierstreifen als Tragegriff an.",
          "Klebe dein ausgemaltes {TITLE} auf die Vorderseite und fülle das Körbchen mit Leckereien!"
        ],
        "fr": [
          "Tracez une grille de 3x3 cases sur un carton carré et découpez les quatre fentes de coin.",
          "Relevez les côtés et collez les rabats pour former une corbeille carrée.",
          "Ajoutez une anse arquée fixée de part et d'autre de la corbeille.",
          "Collez {TITLE} sur le devant du panier et garnissez-le de délicieuses douceurs!"
        ]
      }
    },
    {
      "icon": "🎉",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Feestelijke Confetti-Popper voor Oud & Nieuw",
        "en": "New Year Party Balloon Confetti Popper",
        "de": "Silvester Party Ballon-Konfettikanone",
        "fr": "Canon à Confettis de Fête & Réveillon"
      },
      "descriptions": {
        "nl": "Span een geknoopte ballon over een wc-rol beplakt met {TITLE}, vul met confetti en trek voor een knallend feest!",
        "en": "Stretch a knotted balloon over a tube decorated with {TITLE} to launch eco-paper confetti at midnight!",
        "de": "Spanne einen Ballon über eine Klorolle mit {TITLE} und schieße buntes Konfetti in die Luft!",
        "fr": "Tendez un ballon noué sur un rouleau habillé de {TITLE} pour projeter une pluie de confettis festifs!"
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Wc-rolletje",
          "Feestballon",
          "Gekleurde confetti van papier"
        ],
        "en": [
          "Colored {TITLE}",
          "Cardboard tube",
          "Standard party balloon",
          "Paper confetti punches"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Papprolle",
          "Luftballon",
          "Buntes Papierkonfetti"
        ],
        "fr": [
          "{TITLE} colorié",
          "Rouleau en carton",
          "Ballon de baudruche",
          "Confettis en papier"
        ]
      },
      "steps": {
        "nl": [
          "Knoop het tuutje van een onopgeblazen ballon dicht en knip de bolle bovenkant eraf.",
          "Span de afgesneden ballon strak over één uiteinde van de wc-rol en plak goed vast met tape.",
          "Wikkel je ingekleurde feestelijke {TITLE} rond de buis.",
          "Doe wat confetti in de rol, trek aan het knoopje en laat los: KNAL!"
        ],
        "en": [
          "Tie a tight knot in the neck of an uninflated party balloon, then snip the top dome off.",
          "Stretch the severed balloon membrane snugly over one end of your tube and tape down firmly.",
          "Wrap your joyous {TITLE} coloring art around the outer barrel.",
          "Load with paper confetti wads, pull back the rubber knot, and release to shower the room with confetti!"
        ],
        "de": [
          "Knote das Ende eines Ballons zu und schneide die obere Kappe mit der Schere ab.",
          "Spanne den Ballon über ein Ende der Klorolle und sichere ihn mit Klebeband.",
          "Beklebe die Außenseite mit deinem bunten {TITLE}-Bild.",
          "Fülle Konfetti hinein, ziehe am Knoten und lasse los – BUMM!"
        ],
        "fr": [
          "Faites un nœud sur l'embout d'un ballon dégonflé et coupez la partie supérieure ronde.",
          "Étirez la membrane du ballon sur une extrémité du rouleau et scotchez fermement.",
          "Enroulez votre illustration festive de {TITLE} autour du tube.",
          "Déposez des confettis à l'intérieur, tirez sur le nœud et lâchez pour faire éclater la fête!"
        ]
      }
    },
    {
      "icon": "💌",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Zelfgemaakte Feestdagen Wenskaart met Reliëf",
        "en": "Dimensional Holiday Greeting & Thank You Card",
        "de": "Handgemachte Feiertags-Glückwunschkarte",
        "fr": "Carte de Vœux Festive & Remerciements en Relief"
      },
      "descriptions": {
        "nl": "Vouw een luxe dubbele wenskaart met {TITLE}, versierd met glitters en lint voor familie en vrienden.",
        "en": "Craft an artisanal seasonal card starring {TITLE} with embossed borders and handwritten best wishes.",
        "de": "Gestalte eine liebevolle Klappkarte mit {TITLE} für Oma, Opa oder beste Freunde.",
        "fr": "Fabriquez une carte de vœux raffinée avec {TITLE} pour souhaiter de joyeuses fêtes à vos proches."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Dubbelgevouwen A4 knutselkarton",
          "Satijnen strikje",
          "Gouden gelpen"
        ],
        "en": [
          "{TITLE} coloring page",
          "Folded heavy card blank",
          "Mini satin bow",
          "Metallic gold pen"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Klappkarte aus Fotokarton",
          "Kleine Schleife",
          "Goldener Gelstift"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carte double cartonnée",
          "Petit nœud en satin",
          "Stylo gel métallisé"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de feestelijke elementen van {TITLE} met veel warmte in.",
          "Knip de figuur ovaal of rechthoekig uit en plak hem op de voorzijde van de kaart.",
          "Plak een schattig rood of goud satijnen strikje bovenop.",
          "Schrijf aan de binnenkant met gouden letters je warme wensen en verstuur per post!"
        ],
        "en": [
          "Color festive details of {TITLE} highlighting heartwarming seasonal warmth.",
          "Trim in an oval medallion and layer onto cardstock with 3D foam pads for depth.",
          "Top with a mini red or emerald satin bow.",
          "Pen warm blessings and wishes in gold gel ink on the inside page!"
        ],
        "de": [
          "Male die Festmotive von {TITLE} mit stimmungsvollen Farben aus.",
          "Schneide das Bild zurecht und klebe es mit Schaumstoff-Klebepunkten auf die Karte.",
          "Bringe eine kleine Schleife als Dekoration an.",
          "Schreibe herzliche Feiertagsgrüße mit einem Goldstift ins Innere!"
        ],
        "fr": [
          "Coloriez les motifs festifs de {TITLE} avec des teintes chaudes et réconfortantes.",
          "Découpez en médaillon et collez au centre de la carte avec de la mousse 3D pour donner du relief.",
          "Ajoutez un nœud en satin rouge ou doré.",
          "Rédigez vos vœux les plus chaleureux au stylo doré avant de glisser dans l'enveloppe!"
        ]
      }
    },
    {
      "icon": "👑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Feestelijke Verjaardags- & Seizoensmuts",
        "en": "Party Cone Hat with Fluffy Pom-Pom Topper",
        "de": "Bunter Party-Hut mit flauschigem Bommel",
        "fr": "Chapeau Pointu de Fête & Pompon Duveteux"
      },
      "descriptions": {
        "nl": "Rol {TITLE} in een kegelvormig feestmutsje met een zacht wattenbolletje op de punt en een elastiekje.",
        "en": "Roll {TITLE} into a celebratory cone party hat topped with a puffy yarn pom-pom and chin cord.",
        "de": "Rolle {TITLE} zu einem spitzen Partyhut zusammen mit einem Bommel auf der Spitze.",
        "fr": "Enroulez {TITLE} en chapeau pointu festif surmonté d'un pompon doux avec élastique de maintien."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Wattenbolletje of pompom",
          "Dun elastiekje",
          "Nietmachine en plakband"
        ],
        "en": [
          "{TITLE} coloring page",
          "Fluffy cotton ball or pom-pom",
          "Elastic chin cord",
          "Stapler and tape"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Wattebällchen / Bommel",
          "Elastikband",
          "Tacker & Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Pompon en laine ou coton",
          "Fil élastique doux",
          "Agrafeuse et ruban"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het feestelijke patroon van {TITLE} helemaal vol met confetti en ballonnen.",
          "Snijd het papier in een kwartcirkel en rol het strak op tot een kegelmuts.",
          "Niet de rand vast en plak een zachte pompom op het puntje.",
          "Bevestig een elastiekje aan weerszijden en zet je feestmuts op om het feest te vieren!"
        ],
        "en": [
          "Fill {TITLE} with confetti dots, streamers, and vibrant party colors.",
          "Trim the paper into an arched fan and curve tightly into a cone hat.",
          "Secure the seam with clear tape and glue a fluffy pom-pom on the apex tip.",
          "Staple elastic cord to the brim to secure under your chin and kick off the festivities!"
        ],
        "de": [
          "Male {TITLE} bunt mit Luftschlangen und Partyfarben aus.",
          "Schneide das Blatt halbrund zu und drehe es zu einer Hütchentüte.",
          "Klammere die Naht fest und klebe oben einen flauschigen Bommel auf.",
          "Bringe ein Gummiband an und starte gut gelaunt in die Feier!"
        ],
        "fr": [
          "Coloriez {TITLE} avec des guirlandes, confettis et cotillons joyeux.",
          "Découpez en arc de cercle et enroulez en forme de cône pointu.",
          "Agrafez le bord et collez un pompon duveteux au sommet.",
          "Attachez l'élastique de maintien sous le menton pour être le roi de la fête!"
        ]
      }
    },
    {
      "icon": "🍂",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Herfst & Oogst Tafeldecoratie Ring",
        "en": "Harvest & Seasonal Napkin Ring Bands",
        "de": "Herbst- & Erntedank Serviettenringe",
        "fr": "Ronds de Serviette Festifs de Table & Moisson"
      },
      "descriptions": {
        "nl": "Maak feestelijke servetringen voor het kerst- of paasdiner met {TITLE} als stijlvol naamkaartje.",
        "en": "Roll cardstock rings bearing {TITLE} motifs to wrap dining napkins for Thanksgiving or holiday dinner.",
        "de": "Bastle stimmungsvolle Serviettenringe mit {TITLE} für die festliche Familientafel.",
        "fr": "Créez de jolis ronds de serviette avec {TITLE} pour sublimer la table du réveillon."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Kartonnen stroken (4 x 15 cm)",
          "Plakband of klittenbandstipjes",
          "Servetten"
        ],
        "en": [
          "{TITLE} coloring page",
          "Cardstock bands (1.5 x 6 inch)",
          "Glue or Velcro dots",
          "Cloth or paper napkins"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Kartonstreifen",
          "Klebeband",
          "Servietten"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Bandes de carton (4 x 15 cm)",
          "Colle ou pastilles adhésives",
          "Serviettes de table"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de figuren van {TITLE} met passende seizoenskleuren in.",
          "Knip kleine ronde badges uit en plak ze op kartonnen ringen.",
          "Vouw de ringen rond en plak de uiteinden aan elkaar vast.",
          "Schuif je feestelijke servetten erdoorheen voor een prachtig gedekte eettafel!"
        ],
        "en": [
          "Color several miniature seasonal icons in {TITLE} to match your table linens.",
          "Trim badges and mount onto stiff cardstock rings.",
          "Loop bands together securing with clear tape.",
          "Slide rolled napkins through to welcome your guests to an unforgettable feast!"
        ],
        "de": [
          "Male die Festtagsmotive von {TITLE} passend zur Tischdecke aus.",
          "Schneide kleine Wappen aus und klebe sie auf Papierstreifen.",
          "Schließe die Ringe mit Klebeband zu Ringen.",
          "Stecke die Servietten hinein und überrasche deine Gäste beim Festessen!"
        ],
        "fr": [
          "Coloriez plusieurs petits motifs de {TITLE} assortis aux couleurs de votre nappe.",
          "Découpez les écussons et montez-les sur des bandes cartonnées.",
          "Fermez les bandes en anneaux avec un point de colle.",
          "Glissez les serviettes au centre pour dresser une table de fête mémorable!"
        ]
      }
    },
    {
      "icon": "🎁",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Gepersonaliseerde Cadeauzakjes & Cadeaulabels",
        "en": "Holiday Gift Bags & Punch-Out Present Tags",
        "de": "Feiertags-Geschenktüten & Namensanhänger",
        "fr": "Sachets Cadeaux Personnalisés & Étiquettes Festives"
      },
      "descriptions": {
        "nl": "Tover een simpel papieren zakje om in een feestelijk geschenkzakje met {TITLE} en schrijf de naam van de ontvanger erop.",
        "en": "Embellish kraft paper gift sacks with vibrant {TITLE} cutouts and hand-lettered recipient tags.",
        "de": "Verwandle schlichte Papiertüten in festliche Geschenktaschen mit {TITLE} und Namensschildern.",
        "fr": "Habillez de simples sachets en papier kraft avec {TITLE} et inscrivez le prénom de l'heureux destinataire."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Bruin kraft papieren zakje",
          "Perforator en feestlint",
          "Lijmstift"
        ],
        "en": [
          "Colored {TITLE}",
          "Kraft paper gift bag",
          "Hole punch and holiday ribbon",
          "Glue stick"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Kraftpapiertüte",
          "Locher & Geschenkband",
          "Klebestift"
        ],
        "fr": [
          "{TITLE} colorié",
          "Sachet en papier kraft",
          "Perforatrice et ruban satin",
          "Bâton de colle"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de feestelijke illustratie van {TITLE} met feestelijke glitter- of pasteltinten.",
          "Knip de figuur met een witte rand uit en plak deze strak op de voorzijde van het zakje.",
          "Knip een klein labeltje uit en perforeer een gaatje voor een lintje.",
          "Schrijf \"Speciaal voor jou\" op het label en knoop het zakje dicht!"
        ],
        "en": [
          "Color festive illustrations of {TITLE} in celebratory glittering jewel tones.",
          "Trim leaving a neat white margin and mount onto the flat front of your gift bag.",
          "Snip an accompanying gift tag and punch an eyelet at the corner.",
          "Handwrite \"Warmest Holiday Wishes\" and tie closed with curling ribbon!"
        ],
        "de": [
          "Male die Feiertags-Zeichnung von {TITLE} mit funkelnden Farben aus.",
          "Schneide die Figur sauber aus und klebe sie mitten auf die Geschenktüte.",
          "Loche ein kleines Kärtchen für den Namen des Beschenkten.",
          "Binde die Tasche mit festlichem Band zu – eine wunderschöne Überraschung!"
        ],
        "fr": [
          "Coloriez le motif festif de {TITLE} avec des teintes éclatantes.",
          "Découpez en laissant une fine bordure blanche et collez sur la face avant du sac.",
          "Perforez une petite étiquette assortie pour y inscrire le prénom.",
          "Nouez le sac d'un beau ruban satiné pour offrir un paquet cadeau inoubliable!"
        ]
      }
    },
    {
      "icon": "🌻",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Zomerse Vouwwaaier tegen de Hitte",
        "en": "Summer Accordion Cooling Hand Fan",
        "de": "Sommerlicher Zickzack-Kühlfächer",
        "fr": "Éventail d'Été Plié en Accordéon Rafraîchissant"
      },
      "descriptions": {
        "nl": "Vouw je zonnige {TITLE} kleurplaat in harmonica-plooien en bind de onderkant vast tot een werkende verkoelende handwaaier.",
        "en": "Pleat your colorful {TITLE} into an accordion fan bound at the handle to stay cool on warm sunny days.",
        "de": "Falte dein sommerliches {TITLE} zu einem praktischen Handfächer für heiße Ferientage.",
        "fr": "Pliez votre coloriage {TITLE} en accordéon pour confectionner un éventail et vous rafraîchir en été."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stukje plakband of elastiekje",
          "2 ijsstokjes voor handvatten",
          "Stiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Tape or rubber band",
          "2 popsicle sticks for handles",
          "Markers"
        ],
        "de": [
          "{TITLE} Bild",
          "Klebeband",
          "2 Holzstäbchen als Griffe",
          "Filzstifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Ruban adhésif",
          "2 bâtonnets en bois pour les poignées",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur het hele blad vol met zonnige, vrolijke seizoenskleuren.",
          "Vouw het papier in de breedte als een harmonica met plooien van 1,5 cm breed.",
          "Knijp de onderkant strak samen en plak er stevig plakband omheen als handvat.",
          "Lijm twee ijsstokjes aan de buitenzijden en waaier jezelf heerlijk koelte toe!"
        ],
        "en": [
          "Color the full sheet in radiant sunny vacation tones.",
          "Accordion-pleat the entire page lengthwise with crisp 0.75-inch creases.",
          "Pinch the lower 2 inches together tightly and wrap with colorful tape as a grip.",
          "Glue craft sticks along the two outer edges and fan open for instant summer breezes!"
        ],
        "de": [
          "Male das gesamte Blatt mit sonnigen Urlaubsfarben aus.",
          "Falte das Papier wie eine Ziehharmonika in gleichmäßige Falten.",
          "Drücke das untere Ende fest zusammen und umwickle es mit Klebeband als Griff.",
          "Klebe Holzstäbchen an die Außenkanten und fächere dir kühle Luft zu!"
        ],
        "fr": [
          "Coloriez toute la page avec des couleurs chaudes et ensoleillées.",
          "Pliez la feuille en accordéon régulier avec des plis de 1,5 cm.",
          "Serrez fermement la base et scotchez pour former la poignée.",
          "Collez les bâtonnets sur les côtés extérieurs et déployez pour vous éventer avec panache!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Jaarkalender & Seizoensposter in Fotolijst",
        "en": "Annual Seasonal Calendar & Holiday Art in Frame",
        "de": "Saisonales Jahreszeiten-Kunstwerk im Rahmen",
        "fr": "Tableau de Saison & Calendrier d'Art sous Cadre"
      },
      "descriptions": {
        "nl": "Maak een feestelijke herinnering van {TITLE} met de datum van de feestdag en hang hem in de woonkamer.",
        "en": "Frame {TITLE} with hand-lettered holiday dates to preserve cherished family festive memories.",
        "de": "Rahme {TITLE} mit dem Festdatum ein als wunderbare Erinnerung an das gemeinsame Feiern.",
        "fr": "Encadrez {TITLE} annoté de la date de la fête pour immortaliser de précieux souvenirs familiaux."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "A4 fotolijst",
          "Seizoenskleur karton voor kader",
          "Fineliner"
        ],
        "en": [
          "Finished {TITLE} artwork",
          "A4/Letter frame",
          "Seasonal colored mat board",
          "Fineliner pen"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "A4 Bilderrahmen",
          "Bunter Rahmenkarton",
          "Fineliner"
        ],
        "fr": [
          "Dessin {TITLE} achevé",
          "Cadre photo A4",
          "Passe-partout aux couleurs de saison",
          "Feutre fin"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de tekening met veel toewijding en sfeervolle schaduwen in.",
          "Snijd een passe-partout in een warme seizoenskleur (zoals herfstoranje, kerstrood of lentegroen).",
          "Plak je kunstwerk gecentreerd achter het kader.",
          "Schrijf het jaartal en de feestdag onderaan en hang hem op als familietraditie!"
        ],
        "en": [
          "Finish coloring the festive illustration with nuanced shadows and glowing highlights.",
          "Mount inside a mat board selected in rich seasonal shades (crimson, pine, or harvest amber).",
          "Center the artwork neatly inside your glass display frame.",
          "Inscribe the year and holiday name in calligraphy across the lower mat and display as an annual tradition!"
        ],
        "de": [
          "Male die Zeichnung bis ins Detail mit stimmungsvollen Lichteffekten aus.",
          "Wähle ein Passepartout in Festtagsfarben wie Tannengrün oder Beerenrot.",
          "Befestige dein Bild gerade hinter dem Ausschnitt.",
          "Notiere die Jahreszahl und Feier unten rechts und hänge deine Festtags-Galerie auf!"
        ],
        "fr": [
          "Peaufinez votre coloriage avec des ombres travaillées et des reflets lumineux.",
          "Glissez sous un passe-partout aux teintes de saison (vert forêt, rouge grenat ou vert tendre).",
          "Centrez votre dessin sous le verre du cadre.",
          "Inscrivez le nom de la fête et l'année au feutre fin avant de suspendre dans le salon!"
        ]
      }
    }
  ],
  "kids-tv-shows": [
    {
      "icon": "🎭",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Poppenkast Marionet op Houten IJsstokje",
        "en": "Preschool Popsicle Stick Theatre Puppet",
        "de": "Kasperletheater-Puppe auf Holzstäbchen",
        "fr": "Marionnette de Spectacle sur Bâtonnet en Bois"
      },
      "descriptions": {
        "nl": "Kleur je vriendje {TITLE} in, knip de figuur uit en plak hem op een ijsstokje voor je eigen poppenkastvoorstelling!",
        "en": "Color your buddy {TITLE}, snip along outlines, and tape to a craft stick to act out funny TV episodes!",
        "de": "Male deinen Liebling {TITLE} aus, klebe ihn auf ein Eisstiel und spiele lustige Geschichten nach!",
        "fr": "Coloriez votre compagnon {TITLE}, découpez-le et fixez-le sur un bâtonnet pour rejouer vos épisodes favoris!"
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Houten ijsstokje of rietje",
          "Lijmstift",
          "Kinderschaar"
        ],
        "en": [
          "{TITLE} coloring sheet",
          "Popsicle stick or straw",
          "Glue stick",
          "Safety scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Holzstäbchen",
          "Klebestift",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Bâtonnet de glace ou paille",
          "Bâton de colle",
          "Ciseaux à bouts ronds"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de vriendelijke figuur van {TITLE} zo kleurrijk mogelijk in met wasco of viltstiften.",
          "Knip de figuur voorzichtig uit langs de dikke buitenlijnen.",
          "Plak een houten ijsstokje stevig aan de achterzijde met lijm of plakband.",
          "Verstop je achter de bank of tafel en voer een grappig toneelstukje op met gekke stemmetjes!"
        ],
        "en": [
          "Color {TITLE} brightly with washable markers or chunky crayons.",
          "Carefully trim around the bold outlines leaving a safe white edge.",
          "Fasten a craft stick securely along the back spine using tape or glue.",
          "Duck behind the living room sofa and put on a hilarious puppet show for the family!"
        ],
        "de": [
          "Male {TITLE} mit bunten Wachsmalern oder Filzstiften fröhlich aus.",
          "Schneide die Umrisse mit der Kinderschere sauber aus.",
          "Klebe ein Holzstäbchen auf die Rückseite.",
          "Tauche hinter dem Sofa ab und starte dein eigenes Puppentheater!"
        ],
        "fr": [
          "Coloriez joyeusement {TITLE} avec des feutres lavables ou craies grasses.",
          "Découpez la silhouette le long des gros traits noirs protecteurs.",
          "Collez un bâtonnet en bois au verso à l'aide d'un morceau de ruban adhésif.",
          "Accroupissez-vous derrière le canapé et improvisez une scène amusante avec des voix rigolotes!"
        ]
      }
    },
    {
      "icon": "🎨",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Zachte Wattenbolletjes & Textuur Propjes",
        "en": "Fluffy Cotton Balls & Tissue Paper Collage",
        "de": "Kuschelige Wattebällchen & Krepppapier-Collage",
        "fr": "Collage Tout Doux en Boules de Coton & Papier Crépon"
      },
      "descriptions": {
        "nl": "Plak zachte wattenbolletjes op de buik, oren of wolken van {TITLE} voor een heerlijk aaibaar 3D knutselwerkje.",
        "en": "Dab fluffy white cotton balls onto {TITLE}'s tummy, fur, or clouds for a delightful sensory art texture.",
        "de": "Beklebe {TITLE} mit flauschigen Wattebällchen und Krepppapier für ein fühlbar weiches Kuschel-Bild.",
        "fr": "Collez du coton tout doux sur le pelage ou le ventre de {TITLE} pour créer un tableau en relief tactile."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Wattenbolletjes of gekleurd crêpepapier",
          "Kinderlijm",
          "Viltstiften"
        ],
        "en": [
          "{TITLE} coloring page",
          "Soft cotton balls or colored tissue",
          "Kid-safe glue",
          "Markers"
        ],
        "de": [
          "{TITLE} Bild",
          "Wattebällchen oder Krepppapier",
          "Bastelkleber",
          "Buntstifte"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Boules de coton ou papier crépon",
          "Colle sans solvant",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de achtergrond en de ogen van {TITLE} mooi in met stiften.",
          "Smeer een beetje kinderlijm op de buik, wangen of zachte oren van de figuur.",
          "Trek een wattenbolletje een beetje pluizig uit elkaar en druk het op de lijm.",
          "Strijk zachtjes over je kunstwerk: wat voelt {TITLE} nu heerlijk zacht en donzig aan!"
        ],
        "en": [
          "Color the backdrop and expressive eyes of {TITLE} with colored pencils or markers.",
          "Dab kid-safe glue across the cheeks, tummy, or paws.",
          "Tease cotton balls gently into fluffy clouds and press onto the glue spots.",
          "Stroke the finished artwork to experience a soft, huggable tactile masterpiece!"
        ],
        "de": [
          "Male Hintergrund und Augen von {TITLE} mit bunten Farben an.",
          "Trage etwas Kleber auf Bauch oder Wangen auf.",
          "Zupfe die Watte etwas fluffig auf und drücke sie vorsichtig an.",
          "Fahre mit den Fingern über das Bild – wie wunderbar weich sich {TITLE} anfühlt!"
        ],
        "fr": [
          "Coloriez le décor et le regard expressif de {TITLE}.",
          "Étalez un peu de colle douce sur le ventre ou les oreilles du personnage.",
          "Étirez les boules de coton pour les rendre vaporeuses et pressez-les sur la colle.",
          "Caressez votre dessin du bout des doigts: {TITLE} est devenu tout doux comme une peluche!"
        ]
      }
    },
    {
      "icon": "🐾",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Beweeg- & Doe-Spelletje: Doe {TITLE} Na!",
        "en": "Animal Action Game: Freeze & Move Like {TITLE}!",
        "de": "Bewegungsspiel: Tanze und Hupfe wie {TITLE}!",
        "fr": "Jeu Mime & Mouvement: Fais Comme {TITLE}!"
      },
      "descriptions": {
        "nl": "Zet vrolijke muziek op en dans door de kamer. Als de muziek stopt, hou je de kleurplaat omhoog en doet iedereen {TITLE} na!",
        "en": "Turn on music and dance: when the beat stops, hold up {TITLE} and everyone freezes in character pose!",
        "de": "Spiele Musik ab und tanze herum. Stoppt die Musik, zeige {TITLE} und alle ahmen die Figur nach!",
        "fr": "Lancez la musique et dansez! Dès qu'elle s'arrête, brandissez {TITLE} et tout le monde mime sa posture!"
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Vrolijke kindermuziek",
          "Stevig karton",
          "Plakband"
        ],
        "en": [
          "Colored {TITLE}",
          "Upbeat music player",
          "Cardboard backing",
          "Tape"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Lieblingsmusik",
          "Tonpapier",
          "Klebeband"
        ],
        "fr": [
          "{TITLE} colorié",
          "Musique entraînante",
          "Carton souple",
          "Ruban adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in een opvallende, dansende actiepose in.",
          "Plak het blad op stevig karton zodat je het makkelijk als stopbord omhoog kunt houden.",
          "Zet je favoriete kinderliedje op en dans allemaal vrolijk in het rond.",
          "Zet de muziek plotseling op pauze: wie kan het beste en grappigste stil blijven staan als {TITLE}?"
        ],
        "en": [
          "Color {TITLE} in an energetic, playful pose using bold happy colors.",
          "Mount on thick paper so it stays rigid when held up like a traffic sign.",
          "Play your favorite catchy tune and dance all around the room.",
          "Pause the music unexpectedly: who can strike the funniest freeze frame like {TITLE}?"
        ],
        "de": [
          "Male {TITLE} in einer lustigen Bewegungspose bunt aus.",
          "Klebe das Blatt auf Karton, damit es stabil in der Hand liegt.",
          "Starte fröhliche Kindermusik und hüpft gemeinsam im Kreis herum.",
          "Drücke unerwartet auf Stopp: Wer kann die witzigste {TITLE}-Pose am längsten halten?"
        ],
        "fr": [
          "Coloriez {TITLE} dans une posture dynamique pleine d'énergie.",
          "Collez la feuille sur un carton solide pour la brandir facilement.",
          "Mettez votre chanson préférée et dansez à perdre haleine.",
          "Coupez le son: la statue qui réussit la meilleure imitation de {TITLE} gagne la manche!"
        ]
      }
    },
    {
      "icon": "✨",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Vrolijke Kleuter Raamhanger in de Zon",
        "en": "Sunny Bedroom Suncatcher for Little Hands",
        "de": "Fröhlicher Sonnenfänger für kleine Hände",
        "fr": "Attrape-Soleil Magique pour Petites Mains"
      },
      "descriptions": {
        "nl": "Kleur met wascokrijtjes, wrijf zachtjes in met babyolie en hang {TITLE} op het raam waar de ochtendzon erop schijnt.",
        "en": "Scribble boldly with wax crayons and brush baby oil on the back to shine sunshine through {TITLE}.",
        "de": "Male mit dicken Wachsmalern und trage etwas Öl auf, damit {TITLE} am sonnigen Fenster strahlt.",
        "fr": "Gribouillez aux craies grasses et appliquez un peu d'huile pour voir {TITLE} scintiller face au soleil."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Wascokrijtjes of dikke stiften",
          "Drupje babyolie",
          "Wattenstaafje en plakband"
        ],
        "en": [
          "{TITLE} coloring page",
          "Wax crayons or chunky markers",
          "A drop of baby oil",
          "Cotton swab and tape"
        ],
        "de": [
          "{TITLE} Bild",
          "Wachsmalkreiden",
          "Ein Tropfen Öl",
          "Wattestäbchen & Klebeband"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Craies grasses triangulaires",
          "Une larme d'huile douce",
          "Coton-tige et adhésif"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de vlakken van {TITLE} lekker dik in met vrolijke wascokrijtjes.",
          "Druk met een volwassene een wattenstaafje met een drupje olie over de achterkant van het papier.",
          "Dep droog met keukenpapier en zie hoe het papier direct doorschijnend wordt.",
          "Plak het blad met plakband op het slaapkamerraam en begroet {TITLE} elke ochtend in de zon!"
        ],
        "en": [
          "Fill the shapes of {TITLE} thickly with chunky wax crayons in happy colors.",
          "With grown-up help, dab a cotton swab lightly moistened with oil across the back.",
          "Blot excess with a paper napkin; the paper turns wonderfully clear like real stained glass!",
          "Tape to your windowpane and say hello to {TITLE} every sunny morning!"
        ],
        "de": [
          "Male die Flächen von {TITLE} satt mit Wachsmalstiften aus.",
          "Verstreiche zusammen mit einem Erwachsenen vorsichtig einen Hauch Öl auf der Rückseite.",
          "Tupfe das Papier trocken – es wird herrlich durchsichtig!",
          "Befestige dein Sonnenbild am Fenster und freue dich jeden Morgen darauf!"
        ],
        "fr": [
          "Remplissez généreusement les contours de {TITLE} avec des craies grasses bien couvrantes.",
          "Avec l'aide d'un adulte, étalez une petite goutte d'huile au dos de la feuille.",
          "Épongez avec un mouchoir pour révéler la transparence immédiate du papier.",
          "Scotchez sur la vitre de votre chambre pour dire bonjour à {TITLE} sous les rayons du matin!"
        ]
      }
    },
    {
      "icon": "🧩",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Eenvoudige Peuterpuzzel met 4 tot 6 Stukken",
        "en": "Toddler Big-Piece Cardboard Starter Puzzle",
        "de": "Großteile Starter-Puzzle für Kleinkinder",
        "fr": "Mon Premier Puzzle Géant de 4 à 6 Pièces"
      },
      "descriptions": {
        "nl": "Plak {TITLE} op karton en knip met rechte lijnen in 4 grote stukken die peuters zelf makkelijk kunnen leggen.",
        "en": "Mount {TITLE} on thick cardboard and cut into 4 or 6 chunky square tiles for early problem solving.",
        "de": "Klebe {TITLE} auf dicken Karton und schneide 4 bis 6 große Teile für erste Puzzle-Erfolge zurecht.",
        "fr": "Collez {TITLE} sur carton et découpez en 4 grandes pièces faciles à emboîter pour les tout-petits."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Stevig karton",
          "Liniaal en potlood",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Heavy cardstock backer",
          "Ruler and pencil",
          "Safety scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Stabiler Karton",
          "Bleistift",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Carton rigide",
          "Règle et crayon",
          "Ciseaux adaptés"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} met duidelijke, herkenbare kleuren in.",
          "Plak het papier met een lijmstift stevig en kreukvrij op het karton.",
          "Trek met een liniaal één horizontale en twee verticale lijnen op de achterkant voor 6 grote stukken.",
          "Knip de stukken recht door en help je peuter de stukken weer op de juiste plek te leggen!"
        ],
        "en": [
          "Color {TITLE} with distinct, easily recognizable character colors.",
          "Glue the sheet firmly to sturdy cardboard without any wrinkles.",
          "Rule 1 horizontal and 2 vertical lines across the back to form 6 large chunky blocks.",
          "Snip the straight lines and cheer on your little one as they reassemble {TITLE}!"
        ],
        "de": [
          "Male {TITLE} in klaren, leuchtenden Farben an.",
          "Klebe das Bild glatt und fest auf den Karton.",
          "Ziehe auf der Rückseite gerade Linien für 4 bis 6 extragroße Puzzleteile.",
          "Schneide die Teile auseinander und freue dich über jedes gelöste Puzzlestück!"
        ],
        "fr": [
          "Coloriez {TITLE} avec des teintes vives facilement identifiables.",
          "Collez soigneusement la feuille sur le carton bien plat.",
          "Tracez 1 ligne horizontale et 2 verticales au verso pour obtenir 6 grands rectangles.",
          "Découpez droit et encouragez votre enfant à reconstituer son personnage préféré!"
        ]
      }
    },
    {
      "icon": "🥣",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Gekleurde Eettafel Placemat (Smeer-Proof)",
        "en": "Toddler Mess-Free Dining Placemat",
        "de": "Abwischbare Essplatz-Matte für Kleinkinder",
        "fr": "Set de Table Tout-Petit Plastifié Facile à Nettoyer"
      },
      "descriptions": {
        "nl": "Lamineer {TITLE} tussen twee lagen doorzichtig folie zodat bordjes en bekers op een vrolijke placemat staan.",
        "en": "Laminate {TITLE} to build a durable water-resistant mealtime placemat that wipes clean with a damp rag.",
        "de": "Laminiere {TITLE} als abwischbare Platzmatte für Frühstück und Abendessen am Familientisch.",
        "fr": "Plastifiez {TITLE} pour créer un set de table imperméable qui résiste aux petits déversements."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Zelfklevend kaftplastic of lamineerhoes",
          "Schaar",
          "Vochtige doek"
        ],
        "en": [
          "Finished {TITLE}",
          "Clear contact paper or lamination pouch",
          "Scissors",
          "Damp sponge"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Selbstklebende Klarsichtfolie",
          "Schere",
          "Feuchter Lappen"
        ],
        "fr": [
          "{TITLE} colorié",
          "Film adhésif transparent protecteur",
          "Ciseaux",
          "Éponge humide"
        ]
      },
      "steps": {
        "nl": [
          "Laat je kindje {TITLE} naar hartenlust vrolijk inkleuren.",
          "Schrijf de voornaam van je kindje met dikke letters onderaan het blad.",
          "Plak de voor- en achterkant netjes tussen twee lagen doorzichtig plakfolie.",
          "Leg de placemat op tafel onder het bordje; gemorste vla of melk veeg je er zo van af!"
        ],
        "en": [
          "Encourage your toddler to color {TITLE} freely with their favorite shades.",
          "Write your child's name in big bold friendly letters along the bottom edge.",
          "Seal front and back tightly between two sheets of clear protective laminate.",
          "Place under their meal dish at dinner: any spilled milk or soup wipes clean in seconds!"
        ],
        "de": [
          "Lass dein Kind {TITLE} nach Herzenslust mit bunten Farben füllen.",
          "Schreibe den Vornamen deines Kindes in großen Buchstaben unten auf das Blatt.",
          "Laminiere das Kunstwerk beidseitig wasserdicht ein.",
          "Lege die Matte unter den Kinderteller – gekleckertes Essen lässt sich einfach wegwischen!"
        ],
        "fr": [
          "Laissez votre enfant colorier {TITLE} en toute liberté.",
          "Écrivez son prénom en grosses lettres rondes au bas du dessin.",
          "Emprisonnez la feuille entre deux couches de film adhésif transparent.",
          "Installez sous son assiette: un coup d'éponge magique efface toutes les petites taches!"
        ]
      }
    },
    {
      "icon": "🧠",
      "tagKey": "game",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Zoek-het-Zelfde Memory Kaartjes",
        "en": "Peekaboo Matching Memory Cards for Pairs",
        "de": "Kuckuck Paar-Suchspiel für Kleinkinder",
        "fr": "Jeu de Coucou & Paires de Memory pour Débutants"
      },
      "descriptions": {
        "nl": "Print twee exemplaren van {TITLE}, knip 6 gelijke kaartjes en draai ze om om de paren te ontdekken.",
        "en": "Print two matching sheets of {TITLE}, glue to dark cardstock, and play simple 6-card memory peekaboo.",
        "de": "Drucke zwei Blätter von {TITLE}, schneide 6 Kärtchen und finde die gleichen Bildpaare.",
        "fr": "Imprimez deux exemplaires de {TITLE} et découpez 6 cartes carrées pour retrouver les jumeaux."
      },
      "materials": {
        "nl": [
          "2x afdruk van {TITLE}",
          "Donker knutselkarton voor achterkant",
          "Lijmstift en schaar"
        ],
        "en": [
          "2x prints of {TITLE}",
          "Opaque colored cardstock backing",
          "Glue stick and scissors"
        ],
        "de": [
          "2x Ausdrucke von {TITLE}",
          "Blickdichter Tonkarton",
          "Klebestift & Schere"
        ],
        "fr": [
          "2x impressions de {TITLE}",
          "Carton opaque foncé pour le dos",
          "Colle et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur beide tekeningen met dezelfde herkenbare kleurtjes in.",
          "Plak de bladen op donker karton zodat niemand door het papier heen kan spieken.",
          "Knip 3 gelijke paren vierkante kaartjes (totaal 6 kaarten) uit.",
          "Leg ze ondersteboven op het tapijt en draai er om de beurt twee om: waar is {TITLE}?"
        ],
        "en": [
          "Color identical features on both prints using the same bright markers.",
          "Mount sheets onto dark cardstock backing so pictures don't show through.",
          "Trim out 3 matching pairs of square tiles (6 cards total for toddlers).",
          "Lay face down on the rug and flip two tiles to spot the matching pair!"
        ],
        "de": [
          "Male beide Blätter mit den gleichen Farbtönen aus.",
          "Klebe beide Seiten auf dunkles Papier, damit nichts durchscheint.",
          "Schneide 3 gleiche Paare (insgesamt 6 quadratische Karten) zurecht.",
          "Verteile die Karten verdeckt auf dem Teppich und decke abwechselnd zwei auf!"
        ],
        "fr": [
          "Coloriez les deux impressions avec des teintes similaires.",
          "Collez sur un carton sombre pour masquer la transparence du papier.",
          "Découpez 3 paires de cartes carrées (6 cartes au total, idéal pour les débutants).",
          "Retournez face cachée sur le tapis et retournez deux cartes pour trouver la paire!"
        ]
      }
    },
    {
      "icon": "🎉",
      "tagKey": "decor",
      "difficultyKey": "easy",
      "time": "20 min",
      "titles": {
        "nl": "Vrolijke Feestslinger voor de Kinderslaapkamer",
        "en": "Nursery Bedroom Pennant Bunting Garland",
        "de": "Bunte Kinderzimmer Wimpelkette",
        "fr": "Guirlande Fanions de Chambre d'Enfant"
      },
      "descriptions": {
        "nl": "Kleur 3 tot 5 vlaggetjes met {TITLE}, vouw ze om een vrolijk lint en hang de slinger gezellig boven het ledikantje.",
        "en": "String 4 or 5 triangular flag prints of {TITLE} along colorful yarn to brighten any toddler bedroom.",
        "de": "Fädle 3 bis 5 bunte {TITLE}-Wimpel auf eine Schnur und dekoriere die Wand über dem Kinderbett.",
        "fr": "Accrochez 3 à 5 fanions illustrés de {TITLE} sur un ruban coloré pour décorer le lit de bébé."
      },
      "materials": {
        "nl": [
          "Meerdere afdrukken van {TITLE}",
          "Lang touwtje of wol (2 meter)",
          "Plakband en schaar"
        ],
        "en": [
          "Multiple prints of {TITLE}",
          "Twine or soft yarn (6 feet)",
          "Tape and safety scissors"
        ],
        "de": [
          "Mehrere {TITLE}-Ausdrucke",
          "Bunte Kordel oder Wolle",
          "Klebeband & Schere"
        ],
        "fr": [
          "Plusieurs impressions de {TITLE}",
          "Ficelle ou fil de laine (2 m)",
          "Adhésif et ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de figuren van {TITLE} met vrolijke snoepkleurtjes.",
          "Knip de tekeningen in grote driehoekige vlaggen met een rechte bovenrand.",
          "Vouw een klein randje van 1 cm over het wollen touwtje en plak vast met plakband.",
          "Hang de vrolijke slinger aan de muur of over de kledingkast voor een instant feestelijke kamer!"
        ],
        "en": [
          "Color multiple prints of {TITLE} in playful candy-colored pastel tones.",
          "Cut each page into a classic triangular pennant with a flat upper tab.",
          "Fold the 0.5-inch top lip over your hanging string and seal on the back with clear tape.",
          "String across the nursery wall or above a toy chest to brighten the whole room!"
        ],
        "de": [
          "Male die Bilder von {TITLE} mit bunten Bonbonfarben aus.",
          "Schneide Dreieckswimpel mit einer geraden Oberkante aus.",
          "Falte den oberen Rand um die Kordel und fixiere ihn mit Klebestreifen.",
          "Hänge die Girlande an die Wand über der Spielecke auf!"
        ],
        "fr": [
          "Coloriez plusieurs exemplaires de {TITLE} avec des teintes pastel joyeuses.",
          "Découpez les pages en forme de fanions triangulaires.",
          "Repliez le rebord supérieur autour de la ficelle et fixez avec de l'adhésif.",
          "Suspendez votre guirlande au-dessus du lit pour illuminer la chambre d'enfant!"
        ]
      }
    },
    {
      "icon": "👑",
      "tagKey": "craft",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Schattige Dierenoren Hoofdband & Kroon",
        "en": "Cute Ears Headband & Birthday Party Crown",
        "de": "Süßer Ohren-Haarreif & Geburtstagskrone",
        "fr": "Couronne à Oreilles Rigolotes & Bandeau de Fête"
      },
      "descriptions": {
        "nl": "Knip de lieve oortjes of de snoet van {TITLE} uit en plak ze op een papieren strook die precies om je hoofd past.",
        "en": "Snip the friendly ears or snout of {TITLE} and tape to a paper headband to dress up like your idol.",
        "de": "Schneide die süßen Ohren von {TITLE} aus und klebe sie auf ein Stirnband für kleine Tierfans.",
        "fr": "Découpez les oreilles mignonnes de {TITLE} et collez-les sur un bandeau adapté au tour de tête."
      },
      "materials": {
        "nl": [
          "Kleurplaat {TITLE}",
          "Strook stevig gekleurd papier (5 x 55 cm)",
          "Plakband of nietmachine",
          "Schaar"
        ],
        "en": [
          "{TITLE} coloring page",
          "Cardstock headband strip (2 x 22 inch)",
          "Tape or stapler",
          "Safety scissors"
        ],
        "de": [
          "{TITLE} Vorlage",
          "Papierstreifen für die Stirn",
          "Klebeband oder Tacker",
          "Kinderschere"
        ],
        "fr": [
          "Dessin {TITLE}",
          "Bande de papier cartonné (5 x 55 cm)",
          "Adhésif ou agrafeuse",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de oren, muts of strik van {TITLE} met felle kleurtjes in.",
          "Knip de oortjes voorzichtig uit met een klein plaklipje aan de onderkant.",
          "Meet een papieren strook om het hoofdje van je kindje en plak de uiteinden op maat vast.",
          "Plak de oren fier rechtop aan de hoofdband en spring vrolijk rond als {TITLE}!"
        ],
        "en": [
          "Color the perky ears, cap, or bow of {TITLE} with vibrant hues.",
          "Cut out the ear features, retaining a small fold tab at the base.",
          "Loop the paper headband strip gently around your toddler's head and tape to exact size.",
          "Tape the ears upright on the headband and watch your little one giggle in character!"
        ],
        "de": [
          "Male die Ohren oder Mütze von {TITLE} mit fröhlichen Farben an.",
          "Schneide die Elemente aus und lasse unten eine kleine Klebelasche stehen.",
          "Passe das Stirnband an den Kopf deines Kindes an und schließe es mit Klebeband.",
          "Klebe die Ohren aufrecht an das Band und hüpft gemeinsam durch den Raum!"
        ],
        "fr": [
          "Coloriez les oreilles ou le couvre-chef de {TITLE} avec des teintes vives.",
          "Découpez les oreilles en conservant une petite languette de fixation à la base.",
          "Ajustez la bande de papier autour de la tête de l'enfant et fermez d'un point de ruban.",
          "Collez les oreilles bien dressées sur le bandeau et bondissez de joie comme votre héros!"
        ]
      }
    },
    {
      "icon": "🎁",
      "tagKey": "gift",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Knuffel-Kleurplaat Cadeautje voor Opa & Oma",
        "en": "Heartfelt Hug-in-an-Envelope for Grandparents",
        "de": "Herzensgruß & Kuschelbild für Oma und Opa",
        "fr": "Dessin Câlin & Cadeau Souvenir pour Papy et Mamie"
      },
      "descriptions": {
        "nl": "Zet de handafdruk van je peuter op de achterkant van {TITLE} en stuur een warme knuffel in een envelop naar opa en oma.",
        "en": "Trace your toddler's tiny hands over the reverse of {TITLE} to mail a warm hug gift to grandparents.",
        "de": "Zeichne die Handabdrücke deines Kindes auf die Rückseite von {TITLE} als liebevollen Gruß per Post.",
        "fr": "Tracez les petites mains de votre enfant au dos de {TITLE} pour envoyer un doux câlin par la poste."
      },
      "materials": {
        "nl": [
          "Ingekleurde {TITLE}",
          "Vingerverf of potlood voor handomtrek",
          "Grote envelop",
          "Stiften"
        ],
        "en": [
          "Colored {TITLE}",
          "Finger paint or pencil for hand tracing",
          "Mailing envelope",
          "Markers"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Fingerfarbe oder Buntstift für Hände",
          "Briefumschlag",
          "Stifte"
        ],
        "fr": [
          "{TITLE} colorié",
          "Peinture aux doigts ou feutre pour l'empreinte",
          "Enveloppe postale",
          "Feutres"
        ]
      },
      "steps": {
        "nl": [
          "Kleur de lieve figuur van {TITLE} gezellig samen in.",
          "Draai het vel om, zet de handjes van je kind op het papier en trek de vingertjes om met een stift.",
          "Schrijf de datum en een lieve groet erbij: \"Een dikke knuffel van mij!\".",
          "Vouw het blad in een envelop en bezorg opa en oma de mooiste post van de week!"
        ],
        "en": [
          "Color the joyful character of {TITLE} side-by-side with your toddler.",
          "Flip the page over, press your child's hands flat, and trace around their tiny fingers with a marker.",
          "Add today's date and write: \"A giant warm hug from me to you!\".",
          "Tuck into an envelope and mail to grandma and grandpa for an unforgettable keepsake!"
        ],
        "de": [
          "Male die liebevolle Zeichnung von {TITLE} gemeinsam mit deinem Kind aus.",
          "Drehe das Blatt um und fahre mit dem Stift um die kleinen Händchen deines Kindes herum.",
          "Schreibe das Datum und eine liebe Botschaft dazu: \"Eine Riesen-Umarmung für euch!\".",
          "Falte den Brief in einen Umschlag und zaubere Oma und Opa ein Lächeln ins Gesicht!"
        ],
        "fr": [
          "Coloriez le doux personnage de {TITLE} main dans la main avec votre tout-petit.",
          "Retournez la feuille, posez ses petites mains à plat et tracez le contour des doigts.",
          "Inscrivez la date du jour et la dédicace: \"Un énorme câlin envoyé avec amour!\".",
          "Glissez dans une belle enveloppe pour faire fondre le cœur de papy et mamie!"
        ]
      }
    },
    {
      "icon": "🔖",
      "tagKey": "school",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Dikke Kartonnen Voorlees Boekenlegger",
        "en": "Bedtime Storybook Chunky Corner Bookmark",
        "de": "Karton-Lesezeichen für Gute-Nacht-Geschichten",
        "fr": "Grand Marque-Page Épais pour Histoires du Soir"
      },
      "descriptions": {
        "nl": "Plak een extra brede strook van {TITLE} op dik karton zodat peuters zelf hun favoriete voorleesboek kunnen openen.",
        "en": "Fashion an extra-wide sturdy bookmark featuring {TITLE} so little hands can bookmark bedtime stories.",
        "de": "Bastle ein extrabreites Lesezeichen mit {TITLE}, damit dein Kind die Gute-Nacht-Geschichte selbst aufschlagen kann.",
        "fr": "Fabriquez un marque-page géant avec {TITLE} pour retrouver l'histoire du coucher en un clin d'œil."
      },
      "materials": {
        "nl": [
          "Gekleurd detail van {TITLE}",
          "Extra dik karton",
          "Zelfklevend plakplastic",
          "Schaar"
        ],
        "en": [
          "Cutout from {TITLE}",
          "Heavy cardboard strip",
          "Clear contact laminate",
          "Scissors"
        ],
        "de": [
          "Ausgeschnittenes {TITLE}",
          "Dicker Tonkarton",
          "Selbstklebefolie",
          "Schere"
        ],
        "fr": [
          "Motif découpé de {TITLE}",
          "Carton très épais",
          "Film protecteur transparent",
          "Ciseaux"
        ]
      },
      "steps": {
        "nl": [
          "Kleur {TITLE} in met duidelijke, vrolijke kleuren.",
          "Knip een brede rechthoek van 7 bij 18 cm uit en plak deze op stevig karton.",
          "Bescherm beide kanten met transparant plakfolie tegen kleuterhandjes.",
          "Steek hem in het voorleesboek; je peuter kan nu zelf trots de juiste bladzijde vinden!"
        ],
        "en": [
          "Color {TITLE} in bright, comforting bedtime hues.",
          "Trim an extra-broad 3x7 inch strip and mount onto heavy cardboard.",
          "Seal both sides in wipe-clean clear laminate to withstand sticky fingers.",
          "Slip into tonight's storybook so your toddler can proudly turn to the bookmark!"
        ],
        "de": [
          "Male {TITLE} in sanften Farben für den Abend an.",
          "Schneide einen breiten Streifen (ca. 7x18 cm) zurecht und klebe ihn auf dicke Pappe.",
          "Schütze das Lesezeichen beidseitig mit Folie vor kleinen Keksfingern.",
          "Lege es in das Lieblingsbuch – so macht das Vorlesen noch mehr Spaß!"
        ],
        "fr": [
          "Coloriez {TITLE} avec des teintes douces et apaisantes.",
          "Découpez une large bande cartonnée de 7 x 18 cm bien rigide.",
          "Recouvrez d'un film protecteur pour résister aux petites mains curieuses.",
          "Glissez la bande dans le livre du soir: votre enfant sera fier d'ouvrir la bonne page!"
        ]
      }
    },
    {
      "icon": "🖼️",
      "tagKey": "art",
      "difficultyKey": "easy",
      "time": "15 min",
      "titles": {
        "nl": "Koelkast Kunstgalerij met Magneetjes",
        "en": "Proud Refrigerator Art Gallery Frame",
        "de": "Kühlschrank-Kunstgalerie mit Magneten",
        "fr": "Galerie d'Art Aimantée pour le Réfrigérateur"
      },
      "descriptions": {
        "nl": "Geef {TITLE} een vrolijk gekleurd kartonnen randje en hang het met magneetjes op de koelkast als ere-tentoonstelling.",
        "en": "Frame {TITLE} inside a colorful cardstock border and magnetize proudly to the kitchen fridge door.",
        "de": "Umrande {TITLE} mit buntem Papier und hänge es mit Magneten an den Kühlschrank.",
        "fr": "Entourez {TITLE} d'un cadre en couleur et aimantez-le sur le frigo pour exposer le chef-d'œuvre familial."
      },
      "materials": {
        "nl": [
          "Voltooid kunstwerk van {TITLE}",
          "Gekleurd A4 papier voor kader",
          "Plakband en koelkastmagneten",
          "Datumstempel"
        ],
        "en": [
          "Finished {TITLE} page",
          "Bright cardstock frame border",
          "Tape and fridge magnets",
          "Date pen"
        ],
        "de": [
          "Ausgemaltes {TITLE}",
          "Bunter Papierrahmen",
          "Kühlschrankmagnete",
          "Stift für Datum"
        ],
        "fr": [
          "Dessin achevé de {TITLE}",
          "Papier cartonné pour le cadre",
          "Aimants de frigo",
          "Feutre pour dater"
        ]
      },
      "steps": {
        "nl": [
          "Bewonder samen met je kind het voltooide kunstwerk van {TITLE}.",
          "Plak de tekening op een iets groter vel gekleurd papier in de lievelingskleur van je kindje.",
          "Schrijf met trotse letters de voornaam en de leeftijd van je kindje onderaan.",
          "Bevestig met twee vrolijke magneten op de koelkast op ooghoogte van je kindje!"
        ],
        "en": [
          "Celebrate your toddler's finished coloring triumph of {TITLE}.",
          "Mount onto a slightly larger sheet of colored cardstock in your child's favorite color.",
          "Inscribe your child's name, age, and date proudly in the lower margin.",
          "Magnetize to the kitchen refrigerator at your toddler's eye level for daily praise!"
        ],
        "de": [
          "Feiert gemeinsam das bunte {TITLE}-Meisterwerk deines Kindes.",
          "Klebe das Bild mittig auf einen etwas größeren Bogen buntes Papier als Rahmen.",
          "Notiere Namen, Alter und das Datum mit stolzen Buchstaben darunter.",
          "Befestige das Bild mit bunten Magneten am Kühlschrank auf Augenhöhe deines Kindes!"
        ],
        "fr": [
          "Félicitez votre enfant pour son superbe coloriage de {TITLE}.",
          "Collez l'œuvre sur une feuille de couleur contrastée pour former un cadre joyeux.",
          "Inscrivez son prénom, son âge et la date du jour avec fierté au bas du dessin.",
          "Aimantez la création sur la porte du réfrigérateur à hauteur des yeux de l'enfant!"
        ]
      }
    }
  ]
};

export function getCraftIdeas(
  pageTitle: string,
  parentHub?: string,
  ageGroup?: string,
  lang: string = 'nl'
): CraftIdea[] {
  const effectiveLang = ['nl', 'en', 'de', 'fr'].includes(lang) ? lang : 'nl';
  
  // Select matching category pool or default to animals/kidsTv/art
  const poolKey = parentHub && HUB_TEMPLATES[parentHub] ? parentHub : 'animals-wildlife';
  const templates = HUB_TEMPLATES[poolKey] || HUB_TEMPLATES['animals-wildlife'];

  return templates.map((tpl, idx) => {
    const rawTitle = tpl.titles[effectiveLang] || tpl.titles['en'] || tpl.titles['nl'] || '';
    const rawDesc = tpl.descriptions[effectiveLang] || tpl.descriptions['en'] || tpl.descriptions['nl'] || '';
    const rawMaterials = tpl.materials[effectiveLang] || tpl.materials['en'] || tpl.materials['nl'] || [];
    const rawSteps = tpl.steps[effectiveLang] || tpl.steps['en'] || tpl.steps['nl'] || [];

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
