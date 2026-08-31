#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fix_translations.py - Verbetert titels en beschrijvingen in translations.json
voor ALLE categorieën door echte karakter- en themagerichte namen te gebruiken.

Hoe gebruiken:
  python fix_translations.py

Wat het doet:
  - Leest translations.json (9.000 entries)
  - Detecteert generieke/vage titels per map
  - Vervangt ze door titels met echte karakternamen op basis van bestandsnaam + mapnaam
  - Verbetert ook NL vertalingen
  - Schrijft verbeterde translations.json terug
"""

import json
import os
import re
import random

TRANSLATIONS_FILE = r"C:\Users\Gebruiker\Desktop\colorvaults\Gecontroleerd\translations.json"
BACKUP_FILE = r"C:\Users\Gebruiker\Desktop\colorvaults\Gecontroleerd\translations_backup.json"

# ============================================================
# KARAKTER DATABASE — per map/categorie
# ============================================================
CHARACTER_DB = {
    # Anime
    "anime - dragonball": {
        "characters": [
            ("Goku", "Son Goku"),
            ("Vegeta", "Prince Vegeta"),
            ("Gohan", "Son Gohan"),
            ("Piccolo", "Piccolo"),
            ("Frieza", "Frieza"),
            ("Cell", "Cell"),
            ("Trunks", "Future Trunks"),
            ("Bulma", "Bulma Briefs"),
            ("Krillin", "Krillin"),
            ("Beerus", "Beerus the Destroyer"),
            ("Broly", "Broly"),
            ("Goten", "Goten"),
            ("Android 18", "Android 18"),
            ("Master Roshi", "Master Roshi"),
        ],
        "actions_en": [
            "in Super Saiyan form with golden spiky hair",
            "charging a massive Kamehameha energy wave",
            "flying through the sky with golden aura",
            "in battle stance with power level over 9000",
            "performing the Fusion Dance pose",
            "wearing his iconic orange gi training uniform",
            "transforming into Super Saiyan Blue",
        ],
        "actions_nl": [
            "in Super Saiyan vorm met gouden stekelhaar",
            "die een gigantische Kamehameha energiegolf laadt",
            "vliegend door de lucht met gouden aura",
            "in gevechtshouding met krachtniveau over 9000",
            "de Fusion Dans pose uitvoerend",
            "gekleed in zijn iconische oranje gi trainingsuniform",
        ],
    },
    "anime - naruto": {
        "characters": [
            ("Naruto", "Naruto Uzumaki"),
            ("Sasuke", "Sasuke Uchiha"),
            ("Sakura", "Sakura Haruno"),
            ("Kakashi", "Kakashi Hatake"),
            ("Hinata", "Hinata Hyuga"),
            ("Itachi", "Itachi Uchiha"),
            ("Jiraiya", "Jiraiya"),
            ("Tsunade", "Tsunade"),
            ("Gaara", "Gaara of the Sand"),
            ("Shikamaru", "Shikamaru Nara"),
            ("Rock Lee", "Rock Lee"),
            ("Minato", "Minato Namikaze"),
        ],
        "actions_en": [
            "performing the Rasengan jutsu with spinning chakra",
            "wearing his orange jumpsuit with Leaf Village headband",
            "in Nine-Tails Chakra Mode with orange aura",
            "executing the Shadow Clone Jutsu technique",
            "with Sharingan eye spinning red",
            "standing on top of the Fourth Hokage's monument",
        ],
        "actions_nl": [
            "de Rasengan jutsu uitvoerend met draaiende chakra",
            "gekleed in zijn oranje jumpsuit met Bladerdorp hoofdband",
            "in Negen-Staarten Chakra Modus met oranje aura",
            "de Schaduw Kloon Jutsu techniek uitvoerend",
        ],
    },
    "anime - one piece": {
        "characters": [
            ("Luffy", "Monkey D. Luffy"),
            ("Zoro", "Roronoa Zoro"),
            ("Nami", "Nami"),
            ("Sanji", "Sanji"),
            ("Chopper", "Tony Tony Chopper"),
            ("Robin", "Nico Robin"),
            ("Franky", "Franky"),
            ("Brook", "Brook"),
            ("Usopp", "Usopp"),
            ("Shanks", "Red-Haired Shanks"),
            ("Ace", "Portgas D. Ace"),
            ("Law", "Trafalgar D. Water Law"),
        ],
        "actions_en": [
            "wearing his iconic straw hat and red vest",
            "stretching his rubber arm in Gear Fifth form",
            "using Three Sword Style with three katanas",
            "navigating the Grand Line on the Thousand Sunny ship",
            "using Gear Fourth Boundman with steam aura",
        ],
        "actions_nl": [
            "met zijn iconische strooien hoed en rood vest",
            "zijn rubberen arm rekkend in Gear Fifth vorm",
            "de Driezwaardenstijl gebruikend met drie katana's",
        ],
    },
    "anime - sailor moon": {
        "characters": [
            ("Sailor Moon", "Sailor Moon / Usagi Tsukino"),
            ("Sailor Mars", "Sailor Mars / Rei Hino"),
            ("Sailor Mercury", "Sailor Mercury / Ami Mizuno"),
            ("Sailor Jupiter", "Sailor Jupiter / Makoto Kino"),
            ("Sailor Venus", "Sailor Venus / Minako Aino"),
            ("Sailor Chibi Moon", "Sailor Chibi Moon"),
            ("Sailor Saturn", "Sailor Saturn / Hotaru Tomoe"),
            ("Tuxedo Mask", "Tuxedo Mask / Mamoru Chiba"),
            ("Luna", "Luna the black cat"),
        ],
        "actions_en": [
            "holding her Moon Wand scepter with glowing crescent moon",
            "performing Moon Prism Power transformation",
            "wearing her iconic sailor fuku with twin buns hairstyle",
            "surrounded by sparkling heart shapes and stars",
        ],
        "actions_nl": [
            "de Maan Toverstaf vasthoudend met gloeiende wassende maan",
            "de Moon Prism Power transformatie uitvoerend",
            "gekleed in haar iconische sailor fuku met tweelingknots kapsel",
        ],
    },
    "anime": {
        "characters": [
            ("Goku", "Son Goku"),
            ("Naruto", "Naruto Uzumaki"),
            ("Luffy", "Monkey D. Luffy"),
            ("Tanjiro", "Tanjiro Kamado"),
            ("Deku", "Izuku Midoriya"),
            ("Pikachu", "Pikachu"),
            ("Sailor Moon", "Sailor Moon"),
        ],
        "actions_en": ["in a heroic battle pose", "with dramatic energy aura", "in their iconic outfit"],
        "actions_nl": ["in een heroïsche gevechtspose", "met dramatische energieaura"],
    },
    "anime  algemeen": {
        "characters": [
            ("Goku", "Son Goku"),
            ("Naruto", "Naruto Uzumaki"),
            ("Luffy", "Monkey D. Luffy"),
            ("Tanjiro", "Tanjiro Kamado"),
            ("Deku", "Izuku Midoriya"),
        ],
        "actions_en": ["in a heroic battle pose", "with dramatic energy aura"],
        "actions_nl": ["in een heroïsche gevechtspose"],
    },

    # Disney
    "disney - frozen": {
        "characters": [
            ("Elsa", "Elsa the Snow Queen"),
            ("Anna", "Princess Anna"),
            ("Olaf", "Olaf the snowman"),
            ("Kristoff", "Kristoff the ice harvester"),
            ("Sven", "Sven the reindeer"),
            ("Hans", "Prince Hans"),
        ],
        "actions_en": [
            "casting ice magic with sparkling snowflake effects",
            "wearing her iconic ice blue flowing gown",
            "building a magnificent ice palace",
            "singing Let It Go on a snowy mountain",
            "with braided hair and warm winter clothes",
        ],
        "actions_nl": [
            "ijsmagie werpend met glinsterende sneeuwvlokeffecten",
            "gekleed in haar iconische ijsblauwe jurk",
            "een prachtig ijspaleis bouwend",
        ],
    },
    "disney - ariel": {
        "characters": [
            ("Ariel", "Ariel the Little Mermaid"),
            ("Sebastian", "Sebastian the crab"),
            ("Flounder", "Flounder"),
            ("Ursula", "Ursula the Sea Witch"),
            ("Prince Eric", "Prince Eric"),
        ],
        "actions_en": [
            "swimming gracefully with her beautiful red hair and green tail",
            "sitting on a rock combing her long flowing red hair",
            "collecting human world treasures in her grotto",
            "singing Part of Your World under the sea",
        ],
        "actions_nl": [
            "elegante zwemmend met haar mooie rode haar en groene staart",
            "op een rots zittend haar lange rode haar kammend",
        ],
    },
    "disney - belle": {
        "characters": [
            ("Belle", "Belle"),
            ("Beast", "the Beast / Prince Adam"),
            ("Lumiere", "Lumiere the candlestick"),
            ("Cogsworth", "Cogsworth the clock"),
            ("Mrs Potts", "Mrs. Potts"),
        ],
        "actions_en": [
            "wearing her iconic golden ballgown dancing in the ballroom",
            "reading a book in the Beast's enchanted library",
            "holding a single red rose from the enchanted rose jar",
        ],
        "actions_nl": [
            "gekleed in haar iconische gouden baljurk dansend in de balzaal",
            "een boek lezend in de betoverde bibliotheek",
        ],
    },
    "disney - cinderella": {
        "characters": [
            ("Cinderella", "Cinderella"),
            ("Prince Charming", "Prince Charming"),
            ("Fairy Godmother", "the Fairy Godmother"),
            ("Gus", "Gus the mouse"),
            ("Jaq", "Jaq the mouse"),
        ],
        "actions_en": [
            "wearing her sparkling blue ballgown at the royal ball",
            "holding her glass slipper",
            "with her pumpkin carriage",
            "being transformed by the Fairy Godmother's wand",
        ],
        "actions_nl": [
            "gekleed in haar glinsterende blauwe baljurk op het koninklijk bal",
            "haar glazen muiltje vasthoudend",
        ],
    },
    "disney - snow white": {
        "characters": [
            ("Snow White", "Snow White"),
            ("Evil Queen", "the Evil Queen"),
            ("Prince", "the Prince"),
            ("Dopey", "Dopey the dwarf"),
            ("Happy", "Happy the dwarf"),
            ("Grumpy", "Grumpy the dwarf"),
        ],
        "actions_en": [
            "wearing her iconic yellow and blue dress with red bow headband",
            "holding a red apple",
            "dancing with the seven dwarfs",
            "with forest animals gathered around her",
        ],
        "actions_nl": [
            "gekleed in haar iconische geel-blauwe jurk met rode strik",
            "een rode appel vasthoudend",
        ],
    },
    "disney princesses": {
        "characters": [
            ("Cinderella", "Cinderella"),
            ("Belle", "Belle"),
            ("Ariel", "Ariel"),
            ("Jasmine", "Princess Jasmine"),
            ("Rapunzel", "Rapunzel"),
            ("Moana", "Moana"),
            ("Tiana", "Princess Tiana"),
            ("Aurora", "Princess Aurora / Sleeping Beauty"),
            ("Merida", "Merida from Brave"),
        ],
        "actions_en": [
            "wearing her iconic princess gown",
            "with a magical crown and royal jewelry",
            "in a grand palace ballroom",
        ],
        "actions_nl": [
            "gekleed in haar iconische prinsessenjurk",
            "met een magische kroon en koninklijke sieraden",
        ],
    },

    # TV Series
    "bluey": {
        "characters": [
            ("Bluey", "Bluey Heeler"),
            ("Bingo", "Bingo Heeler"),
            ("Bandit", "Bandit the dad"),
            ("Chilli", "Chilli the mum"),
            ("Mackenzie", "Mackenzie"),
            ("Judo", "Judo"),
        ],
        "actions_en": [
            "playing a fun imaginative game",
            "doing the Taxi episode Dad game",
            "with her blue heeler puppy ears and tail",
            "with her sister Bingo playing together",
        ],
        "actions_nl": [
            "een leuk fantasiespel spelend",
            "met haar blauwe heeler-puppy oren en staart",
        ],
    },
    "paw patrol": {
        "characters": [
            ("Chase", "Chase the police pup"),
            ("Marshall", "Marshall the fire pup"),
            ("Skye", "Skye the helicopter pup"),
            ("Rocky", "Rocky the eco pup"),
            ("Rubble", "Rubble the construction pup"),
            ("Zuma", "Zuma the water rescue pup"),
            ("Ryder", "Ryder"),
            ("Everest", "Everest"),
            ("Tracker", "Tracker"),
        ],
        "actions_en": [
            "in his police uniform ready to go on a mission",
            "using his fire truck to save the day",
            "flying her helicopter over Adventure Bay",
            "with the PAW Patrol Lookout Tower",
        ],
        "actions_nl": [
            "in zijn politie-uniform klaar voor een missie",
            "zijn brandweerwagen gebruikend om de dag te redden",
        ],
    },
    "peppa pig": {
        "characters": [
            ("Peppa", "Peppa Pig"),
            ("George", "George Pig"),
            ("Mummy Pig", "Mummy Pig"),
            ("Daddy Pig", "Daddy Pig"),
            ("Suzy Sheep", "Suzy Sheep"),
            ("Rebecca Rabbit", "Rebecca Rabbit"),
        ],
        "actions_en": [
            "jumping in muddy puddles with rubber boots",
            "with her family at their house",
            "playing at the playground",
        ],
        "actions_nl": [
            "springend in modderpetassen met laarzen",
            "met haar familie bij hun huis",
        ],
    },
    "cocomelon": {
        "characters": [
            ("JJ", "JJ from Cocomelon"),
            ("TomTom", "TomTom"),
            ("YoYo", "YoYo"),
            ("Cody", "Cody"),
        ],
        "actions_en": ["singing a nursery rhyme", "playing with colorful toys", "on the family farm"],
        "actions_nl": ["een versje zingend", "spelend met kleurrijk speelgoed"],
    },
    "blippi": {
        "characters": [
            ("Blippi", "Blippi in his orange and blue hat"),
            ("Meekah", "Meekah"),
        ],
        "actions_en": [
            "wearing his iconic orange and blue outfit",
            "exploring a fire station",
            "riding a tractor",
        ],
        "actions_nl": [
            "gekleed in zijn iconische oranje en blauwe outfit",
            "een brandweerkazerne verkennend",
        ],
    },
    "thomas the tank engine": {
        "characters": [
            ("Thomas", "Thomas the Tank Engine"),
            ("Percy", "Percy the small engine"),
            ("James", "James the red engine"),
            ("Gordon", "Gordon the big engine"),
            ("Emily", "Emily"),
        ],
        "actions_en": [
            "puffing along the tracks on the Island of Sodor",
            "with a big smile on his blue face",
            "at Tidmouth Sheds with his engine friends",
        ],
        "actions_nl": [
            "rijdend langs de rails op het eiland Sodor",
            "met een grote glimlach op zijn blauwe gezicht",
        ],
    },
    "lilo stitch": {
        "characters": [
            ("Stitch", "Stitch / Experiment 626"),
            ("Lilo", "Lilo Pelekai"),
            ("Nani", "Nani"),
            ("Jumba", "Dr. Jumba Jookiba"),
        ],
        "actions_en": [
            "with big blue eyes and four arms showing mischievous grin",
            "surfing a wave in Hawaii",
            "hugging his best friend Lilo",
        ],
        "actions_nl": [
            "met grote blauwe ogen en vier armen en een ondeugende grins",
            "surfend op een golf in Hawaï",
        ],
    },
    "lego ninjago": {
        "characters": [
            ("Lloyd", "Lloyd the Green Ninja"),
            ("Kai", "Kai the Red Ninja of Fire"),
            ("Cole", "Cole the Black Ninja of Earth"),
            ("Zane", "Zane the White Ninja of Ice"),
            ("Jay", "Jay the Blue Ninja of Lightning"),
            ("Nya", "Nya the Water Ninja"),
        ],
        "actions_en": [
            "in Ninjago battle gear with elemental power",
            "performing spinjitzu tornado attack",
            "with golden Ninja weapons drawn",
        ],
        "actions_nl": [
            "in Ninjago gevechtsuitrusting met elementaire kracht",
            "de spinjitzu tornado aanval uitvoerend",
        ],
    },
    "spongebob": {
        "characters": [
            ("SpongeBob", "SpongeBob SquarePants"),
            ("Patrick", "Patrick Star"),
            ("Sandy", "Sandy Cheeks"),
            ("Squidward", "Squidward Tentacles"),
            ("Mr. Krabs", "Mr. Krabs"),
            ("Gary", "Gary the Snail"),
        ],
        "actions_en": [
            "flipping Krabby Patties at the Krusty Krab",
            "with Patrick blowing bubbles in Bikini Bottom",
            "wearing his square pants and white shirt with tie",
        ],
        "actions_nl": [
            "Krabby Patties bakkend bij het Krusty Krab",
            "met Patrick zeepbellen blazend in Bikini Bottom",
        ],
    },

    # Games
    "pokemon": {
        "characters": [
            ("Pikachu", "Pikachu"),
            ("Charizard", "Charizard"),
            ("Mewtwo", "Mewtwo"),
            ("Eevee", "Eevee"),
            ("Bulbasaur", "Bulbasaur"),
            ("Squirtle", "Squirtle"),
            ("Gengar", "Gengar"),
            ("Snorlax", "Snorlax"),
            ("Lucario", "Lucario"),
            ("Garchomp", "Garchomp"),
            ("Umbreon", "Umbreon"),
            ("Sylveon", "Sylveon"),
            ("Greninja", "Greninja"),
            ("Rayquaza", "Rayquaza"),
            ("Legendario", "Legendary Pokémon"),
        ],
        "actions_en": [
            "using Thunderbolt attack with electric sparks",
            "with a Pokéball ready to battle",
            "in the tall grass on a Pokémon adventure",
            "with a trainer on Pallet Town route",
        ],
        "actions_nl": [
            "de Donderslag aanval gebruikend met elektrische vonken",
            "met een Pokébal klaar voor de strijd",
        ],
    },
    "super mario": {
        "characters": [
            ("Mario", "Mario"),
            ("Luigi", "Luigi"),
            ("Princess Peach", "Princess Peach"),
            ("Bowser", "Bowser"),
            ("Yoshi", "Yoshi"),
            ("Toad", "Toad"),
            ("Wario", "Wario"),
            ("Waluigi", "Waluigi"),
        ],
        "actions_en": [
            "jumping on a Goomba in the Mushroom Kingdom",
            "collecting gold coins and power-up mushrooms",
            "wearing his iconic red cap with M logo and blue overalls",
            "inside a green Warp Pipe",
        ],
        "actions_nl": [
            "springend op een Goomba in het Paddenstoelenkeizerrijk",
            "gouden munten en power-up paddenstoelen verzamelend",
        ],
    },
    "sonic": {
        "characters": [
            ("Sonic", "Sonic the Hedgehog"),
            ("Tails", "Miles Tails Prower"),
            ("Knuckles", "Knuckles the Echidna"),
            ("Amy Rose", "Amy Rose"),
            ("Shadow", "Shadow the Hedgehog"),
            ("Dr. Eggman", "Dr. Eggman / Robotnik"),
        ],
        "actions_en": [
            "running at supersonic speed with motion blur",
            "in his iconic red sneakers and white gloves",
            "collecting golden rings in Green Hill Zone",
            "performing a Spin Dash attack",
        ],
        "actions_nl": [
            "rennend op supersonische snelheid met bewegingsvervaging",
            "in zijn iconische rode sneakers en witte handschoenen",
        ],
    },

    # Mickey & Minnie
    "mickey mouse": {
        "characters": [
            ("Mickey Mouse", "Mickey Mouse"),
            ("Minnie Mouse", "Minnie Mouse"),
            ("Donald Duck", "Donald Duck"),
            ("Goofy", "Goofy"),
            ("Pluto", "Pluto"),
            ("Daisy Duck", "Daisy Duck"),
        ],
        "actions_en": [
            "wearing his iconic red shorts, yellow shoes and white gloves",
            "waving cheerfully with his big round ears",
            "at Disneyland with Minnie Mouse",
            "celebrating with balloons and confetti",
        ],
        "actions_nl": [
            "gekleed in zijn iconische rode korte broek, gele schoenen en witte handschoenen",
            "vrolijk zwaaiend met zijn grote ronde oren",
        ],
    },
    "minnie mouse": {
        "characters": [
            ("Minnie Mouse", "Minnie Mouse"),
            ("Mickey Mouse", "Mickey Mouse"),
            ("Daisy Duck", "Daisy Duck"),
        ],
        "actions_en": [
            "wearing her iconic polka dot bow and dress",
            "holding a bouquet of flowers",
            "blowing a kiss with her white gloves",
        ],
        "actions_nl": [
            "gekleed in haar iconische gestippelde strik en jurk",
            "een boeket bloemen vasthoudend",
        ],
    },

    # Other themes
    "superheroes": {
        "characters": [
            ("Spider-Man", "Spider-Man"),
            ("Batman", "Batman"),
            ("Superman", "Superman"),
            ("Wonder Woman", "Wonder Woman"),
            ("Iron Man", "Iron Man"),
            ("Captain America", "Captain America"),
            ("Thor", "Thor"),
            ("Hulk", "the Hulk"),
            ("Black Panther", "Black Panther"),
        ],
        "actions_en": [
            "in heroic pose with cape flowing in the wind",
            "saving the city from danger",
            "with iconic superhero symbol on chest",
        ],
        "actions_nl": [
            "in heroïsche pose met mantel wapperend in de wind",
            "de stad reddend van gevaar",
        ],
    },
}

# Generieke woorden die aangeven dat een titel niet specifiek genoeg is
GENERIC_KEYWORDS = [
    "boy", "girl", "child", "person", "figure", "character", "anime character",
    "superhero", "warrior", "monster", "creature", "animal", "object",
    "scene", "landscape", "abstract", "design", "pattern", "image",
    "coloring page", "drawing", "illustration",
    "with spiky hair", "with long hair", "with wings", "standing",
    "young boy", "young girl", "young man", "young woman",
]

def is_generic_title(title):
    """Check if a title is too generic and needs improvement"""
    if not title or len(title) < 3:
        return True
    tl = title.lower()
    # Check if it contains any generic keywords but NO character names
    for kw in GENERIC_KEYWORDS:
        if kw in tl:
            return True
    # Very short or just numbers
    if re.match(r'^[\d\s\-_]+$', title):
        return True
    return False

def get_theme_from_path(filepath):
    """Extract theme/folder name from file path"""
    parts = filepath.replace('\\', '/').split('/')
    if len(parts) >= 2:
        return parts[0].lower()
    return ""

def get_character_for_file(filename, theme):
    """Try to extract character name from filename"""
    # Remove timestamp and extension
    name = re.sub(r'_\d{10,}', '', filename)  # remove timestamps
    name = re.sub(r'\.\w+$', '', name)  # remove extension
    name = name.replace('_', ' ').strip()
    
    # Check if the filename already contains a known character name
    theme_data = CHARACTER_DB.get(theme, {})
    if theme_data:
        for char_short, char_full in theme_data.get("characters", []):
            if char_short.lower() in name.lower():
                return char_short, char_full
    
    # Check common cross-theme names
    common_chars = {
        "goku": ("Goku", "Son Goku"),
        "vegeta": ("Vegeta", "Prince Vegeta"),
        "naruto": ("Naruto", "Naruto Uzumaki"),
        "sasuke": ("Sasuke", "Sasuke Uchiha"),
        "luffy": ("Luffy", "Monkey D. Luffy"),
        "pikachu": ("Pikachu", "Pikachu"),
        "charizard": ("Charizard", "Charizard"),
        "elsa": ("Elsa", "Elsa the Snow Queen"),
        "anna": ("Anna", "Princess Anna"),
        "olaf": ("Olaf", "Olaf the snowman"),
        "mickey": ("Mickey Mouse", "Mickey Mouse"),
        "minnie": ("Minnie Mouse", "Minnie Mouse"),
        "donald": ("Donald Duck", "Donald Duck"),
        "bluey": ("Bluey", "Bluey Heeler"),
        "bingo": ("Bingo", "Bingo Heeler"),
        "chase": ("Chase", "Chase the police pup"),
        "marshall": ("Marshall", "Marshall the fire pup"),
        "peppa": ("Peppa", "Peppa Pig"),
        "george pig": ("George", "George Pig"),
        "sonic": ("Sonic", "Sonic the Hedgehog"),
        "mario": ("Mario", "Mario"),
        "luigi": ("Luigi", "Luigi"),
        "tanjiro": ("Tanjiro", "Tanjiro Kamado"),
        "nezuko": ("Nezuko", "Nezuko Kamado"),
        "spider": ("Spider-Man", "Spider-Man"),
        "batman": ("Batman", "Batman"),
        "superman": ("Superman", "Superman"),
        "iron man": ("Iron Man", "Iron Man"),
        "stitch": ("Stitch", "Stitch / Experiment 626"),
        "lilo": ("Lilo", "Lilo Pelekai"),
        "thomas": ("Thomas", "Thomas the Tank Engine"),
        "spongebob": ("SpongeBob", "SpongeBob SquarePants"),
        "patrick": ("Patrick", "Patrick Star"),
        "ariel": ("Ariel", "Ariel the Little Mermaid"),
        "belle": ("Belle", "Belle"),
        "cinderella": ("Cinderella", "Cinderella"),
        "rapunzel": ("Rapunzel", "Rapunzel"),
        "moana": ("Moana", "Moana"),
        "simba": ("Simba", "Simba the Lion King"),
        "nemo": ("Nemo", "Nemo"),
        "dory": ("Dory", "Dory"),
        "merida": ("Merida", "Merida from Brave"),
    }
    
    name_lower = name.lower()
    for key, val in common_chars.items():
        if key in name_lower:
            return val
    
    return None, None

def improve_title_en(title, theme, filename):
    """Improve English title with character name and theme context"""
    char_short, char_full = get_character_for_file(filename, theme)
    
    theme_data = CHARACTER_DB.get(theme, {})
    actions_en = theme_data.get("actions_en", [])
    
    if char_short and is_generic_title(title):
        # Build a better title
        if actions_en:
            action = random.choice(actions_en)
            return f"{char_short} {action}"
        else:
            return f"{char_short} Coloring Page"
    
    # Title already has a character name, just clean it up
    if not is_generic_title(title):
        return title
    
    # No character found, use theme-based improvement
    if char_full is None and theme_data.get("characters"):
        char_short, char_full = random.choice(theme_data["characters"])
        if actions_en:
            action = random.choice(actions_en)
            return f"{char_short} {action}"
        return f"{char_short} Coloring Page"
    
    return title

def improve_title_nl(title_en, title_nl, theme, filename):
    """Improve Dutch title"""
    char_short, char_full = get_character_for_file(filename, theme)
    
    theme_data = CHARACTER_DB.get(theme, {})
    actions_nl = theme_data.get("actions_nl", [])
    
    if char_short and is_generic_title(title_nl):
        if actions_nl:
            action = random.choice(actions_nl)
            return f"{char_short} {action}"
        else:
            return f"{char_short} Kleurplaat"
    
    if not is_generic_title(title_nl):
        return title_nl
    
    # Use English title with "Kleurplaat" suffix as fallback
    if not is_generic_title(title_en):
        return title_en + " Kleurplaat"
    
    return title_nl

def main():
    print("ColorVaults Translations Fixer")
    print("=" * 50)
    
    # Load translations
    if not os.path.exists(TRANSLATIONS_FILE):
        print(f"❌ Translations file not found: {TRANSLATIONS_FILE}")
        return
    
    with open(TRANSLATIONS_FILE, 'r', encoding='utf-8') as f:
        translations = json.load(f)
    
    print(f"Loaded {len(translations)} translations")
    
    # Backup first
    with open(BACKUP_FILE, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    print(f"Backup saved to {BACKUP_FILE}")
    
    improved_count = 0
    total_checked = 0
    
    for filepath, data in translations.items():
        total_checked += 1
        
        # Get theme from path
        theme = get_theme_from_path(filepath)
        filename = os.path.basename(filepath)
        
        original_en = data.get('en', '')
        original_nl = data.get('nl', '')
        
        new_en = improve_title_en(original_en, theme, filename)
        new_nl = improve_title_nl(new_en, original_nl, theme, filename)
        
        if new_en != original_en or new_nl != original_nl:
            data['en'] = new_en
            data['nl'] = new_nl
            improved_count += 1
            
            if improved_count <= 20:  # Show first 20 improvements
                print(f"  >> {filepath[:50]}")
                print(f"     EN: '{original_en}' -> '{new_en}'")
                print(f"     NL: '{original_nl}' -> '{new_nl}'")
        
        if total_checked % 1000 == 0:
            print(f"  Progress: {total_checked}/{len(translations)} ({improved_count} improved)")
    
    # Save improved translations
    with open(TRANSLATIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(translations, f, ensure_ascii=False, indent=2)
    
    print(f"\nDone!")
    print(f"   Total checked: {total_checked}")
    print(f"   Improved: {improved_count}")
    print(f"   Unchanged: {total_checked - improved_count}")
    print(f"   Saved to: {TRANSLATIONS_FILE}")
    print(f"\nNow run: node scripts/generate-real-data.js")

if __name__ == '__main__':
    main()
