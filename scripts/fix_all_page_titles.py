import os
import sys
import json
import re
from collections import defaultdict

WORKSPACE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(WORKSPACE_ROOT, 'src', 'data')
EN_THEMES_DATA_DIR = os.path.join(DATA_DIR, 'en', 'themes-data')
NL_THEMES_DATA_DIR = os.path.join(DATA_DIR, 'nl', 'themes-data')

MAP_PATH = r'c:\Users\Gebruiker\Desktop\colorvaults\output\prompt_history_map.json'
EMBEDDED_MAP_PATH = r'c:\Users\Gebruiker\Desktop\colorvaults\output\comfy_embedded_prompts.json'

print('Loading prompt maps...')
prompt_map = {}
if os.path.exists(MAP_PATH):
    with open(MAP_PATH, 'r', encoding='utf-8') as fp:
        prompt_map.update(json.load(fp))
if os.path.exists(EMBEDDED_MAP_PATH):
    with open(EMBEDDED_MAP_PATH, 'r', encoding='utf-8') as fp:
        prompt_map.update(json.load(fp))
print(f'Total prompt map entries: {len(prompt_map)}')

themes_en_path = os.path.join(DATA_DIR, 'en', 'themes.json')
themes_nl_path = os.path.join(DATA_DIR, 'nl', 'themes.json')
theme_title_map_en = {}
theme_title_map_nl = {}

if os.path.exists(themes_en_path):
    with open(themes_en_path, 'r', encoding='utf-8') as fp:
        for t in json.load(fp):
            theme_title_map_en[t['slug']] = t['title']

if os.path.exists(themes_nl_path):
    with open(themes_nl_path, 'r', encoding='utf-8') as fp:
        for t in json.load(fp):
            theme_title_map_nl[t['slug']] = t['title']

THEME_FALLBACK_DESCRIPTORS = {
    'lego-ninjago': 'Lego Ninjago Warrior Action',
    'among-us': 'Among Us Crewmate Mission',
    'bluey': 'Bluey and Family Playtime',
    'farm-animals': 'Farm Animal Friends',
    'bold-easy-toddlers': 'Simple Bold Playtime',
    'sailor-moon': 'Sailor Moon Magical Guardian',
    'sonic-the-hedgehog': 'Sonic Speed Adventure',
    'super-mario': 'Super Mario Mushroom Kingdom',
    'pokemon': 'Pokemon Battle Adventure',
    'paw-patrol': 'Paw Patrol Hero Pup Mission',
    'peppa-pig': 'Peppa Pig Cheerful Fun',
    'cocomelon': 'Cocomelon Sing-Along Joy',
    'snow-white': 'Snow White Forest Fairytale',
    'unicorns-pegasus': 'Majestic Mythical Unicorn',
    'mermaids-of-the-deep': 'Enchanted Mermaid Underwater',
    'the-lion-king': 'Lion King Savanna Adventure',
    'frozen': 'Frozen Magical Kingdom',
    'minecraft-voxel-worlds': 'Minecraft Blocky World',
    'halloween-spooky-creatures': 'Halloween Spooky Celebration',
    'christmas-winter-holidays': 'Festive Holiday Winter Wonder',
    'sinterklaas-pieten': 'Sinterklaas en Pieten Feest',
}

NL_PHRASE_REPLACEMENTS = [
    (r'\bon Pride Rock\b', 'op de Koningsrots'),
    (r'\bat the Waterhole\b', 'bij de Waterpoel'),
    (r'\bon Jungle Log\b', 'op de Boomstam'),
    (r'\bin the Forest\b', 'in het Bos'),
    (r'\bin the Castle\b', 'in het Kasteel'),
    (r'\bin the Garden\b', 'in de Tuin'),
    (r'\bin the Snow\b', 'in de Sneeuw'),
    (r'\bin the Ocean\b', 'in de Oceaan'),
    (r'\bat the Beach\b', 'op het Strand'),
    (r'\bin the Sky\b', 'in de Lucht'),
    (r'\bunder the Sea\b', 'onder Water'),
    (r'\bGreat Circle of Life\b', 'Kringloop van het Leven'),
    (r'\bEmergency Meeting Table\b', 'Spoedvergadering Tafel'),
    (r'\bSpace Corridor\b', 'Ruimte Gang'),
    (r'\bHidden Leaf Village\b', 'Hidden Leaf Dorp'),
    (r'\bHogwarts Castle\b', 'Zweinstein Kasteel'),
    (r'\bEnchanted Rose\b', 'Betoverde Roos'),
    (r'\bMagic Carpet\b', 'Vliegend Tapijt'),
    (r'\bGlass Slipper\b', 'Glazen Muiltje'),
    (r'\bPumpkin Carriage\b', 'Pompoenkoets'),
    (r'\bBallroom Dance\b', 'Balzaal Dans'),
    (r'\bwishing well\b', 'wensput'),
    (r'\bapple blossoms\b', 'appelbloesems'),
    (r'\bfront and center\b', 'in het Midden'),
    (r'\bstanding in center\b', 'in het Midden'),
    (r'\bin center\b', 'in het Midden'),
    (r'\bin front center\b', 'in het Midden'),
    (r'\bweb-slinging\b', 'webslingerend'),
    (r'\bweb slinging\b', 'webslingerend'),
    (r'\bBeing Lifted\b', 'Getild'),
    (r'\bLifted\b', 'Getild'),
    (r'\bTeaching\b', 'Onderwijzend'),
    (r'\bPlaying\b', 'Spelend'),
    (r'\bMarching\b', 'Marcherend'),
    (r'\bRunning\b', 'Rennend'),
    (r'\bJumping\b', 'Springend'),
    (r'\bFlying\b', 'Vliegend'),
    (r'\bSwimming\b', 'Zwemmend'),
    (r'\bDancing\b', 'Dansend'),
    (r'\bSinging\b', 'Zingend'),
    (r'\bSleeping\b', 'Slapend'),
    (r'\bEating\b', 'Etend'),
    (r'\bSmiling\b', 'Glimlachend'),
    (r'\bLaughing\b', 'Lachend'),
    (r'\bWaving\b', 'Zwaaiend'),
    (r'\bReading\b', 'Lezend'),
    (r'\bWearing\b', 'Met'),
    (r'\bHolding\b', 'Met'),
    (r'\bBuilding\b', 'Bouwend'),
    (r'\bExploring\b', 'Op Avontuur'),
    (r'\bAdventure\b', 'Avontuur'),
    (r'\bAdventures\b', 'Avonturen'),
    (r'\bCelebration\b', 'Feest'),
    (r'\bBirthday\b', 'Verjaardag'),
    (r'\bJourney\b', 'Reis'),
    (r'\bFriendship\b', 'Vriendschap'),
    (r'\bFriends\b', 'Vrienden'),
    (r'\bFamily\b', 'Familie'),
    (r'\bPlaytime\b', 'Speeltijd'),
    (r'\bMission\b', 'Missie'),
    (r'\bWarrior\b', 'Krijger'),
    (r'\bAction\b', 'Actie'),
    (r'\bSimple\b', 'Eenvoudige'),
    (r'\bBold\b', 'Dikke Lijnen'),
    (r'\bGuardian\b', 'Beschermer'),
    (r'\bSpeed\b', 'Snelheids'),
    (r'\bHero\b', 'Helden'),
    (r'\bPup\b', 'Pup'),
    (r'\bCheerful\b', 'Vrolijke'),
    (r'\bFairytale\b', 'Sprookje'),
    (r'\bMythical\b', 'Mythische'),
    (r'\bPrincess\b', 'Prinses'),
    (r'\bPrincesses\b', 'Prinsessen'),
    (r'\bPrince\b', 'Prins'),
    (r'\bQueen\b', 'Koningin'),
    (r'\bKing\b', 'Koning'),
    (r'\bKnight\b', 'Ridder'),
    (r'\bKnights\b', 'Ridders'),
    (r'\bDragon\b', 'Draak'),
    (r'\bDragons\b', 'Draken'),
    (r'\bUnicorn\b', 'Eenhoorn'),
    (r'\bUnicorns\b', 'Eenhoorns'),
    (r'\bFairy\b', 'Fee'),
    (r'\bFairies\b', 'Feeën'),
    (r'\bMermaid\b', 'Zeemeermin'),
    (r'\bMermaids\b', 'Zeemeerminnen'),
    (r'\bMonster\b', 'Monster'),
    (r'\bMonsters\b', 'Monsters'),
    (r'\bPuppy\b', 'Puppy'),
    (r'\bPuppies\b', 'Puppy\'s'),
    (r'\bDog\b', 'Hond'),
    (r'\bDogs\b', 'Honden'),
    (r'\bKitten\b', 'Kitten'),
    (r'\bKittens\b', 'Kittens'),
    (r'\bCat\b', 'Kat'),
    (r'\bCats\b', 'Katten'),
    (r'\bBunny\b', 'Konijntje'),
    (r'\bBunnies\b', 'Konijntjes'),
    (r'\bRabbit\b', 'Konijn'),
    (r'\bRabbits\b', 'Konijnen'),
    (r'\bHorse\b', 'Paard'),
    (r'\bHorses\b', 'Paarden'),
    (r'\bPony\b', 'Pony'),
    (r'\bPonies\b', 'Pony\'s'),
    (r'\bDinosaur\b', 'Dinosaurus'),
    (r'\bDinosaurs\b', 'Dinosaurussen'),
    (r'\bFlowers\b', 'Bloemen'),
    (r'\bFlower\b', 'Bloem'),
    (r'\bRoses\b', 'Rozen'),
    (r'\bRose\b', 'Roos'),
    (r'\bButterflies\b', 'Vlinders'),
    (r'\bButterfly\b', 'Vlinder'),
    (r'\bRainbow\b', 'Regenboog'),
    (r'\bRainbows\b', 'Regenbogen'),
    (r'\bCastle\b', 'Kasteel'),
    (r'\bCastles\b', 'Kastelen'),
    (r'\bChristmas\b', 'Kerst'),
    (r'\bWinter\b', 'Winter'),
    (r'\bSummer\b', 'Zomer'),
    (r'\bAutumn\b', 'Herfst'),
    (r'\bSpring\b', 'Lente'),
    (r'\bEaster\b', 'Pasen'),
    (r'\bHalloween\b', 'Halloween'),
    (r'\bSnowman\b', 'Sneeuwpop'),
    (r'\bSanta Claus\b', 'Kerstman'),
    (r'\bSanta\b', 'Kerstman'),
    (r'\bReindeer\b', 'Rendier'),
    (r'\bFire Engine\b', 'Brandweerauto'),
    (r'\bPolice Car\b', 'Politieauto'),
    (r'\bRace Car\b', 'Raceauto'),
    (r'\bRacecar\b', 'Raceauto'),
    (r'\bMonster Truck\b', 'Monstertruck'),
    (r'\bSpace Rocket\b', 'Raket'),
    (r'\bRocket\b', 'Raket'),
    (r'\bAstronaut\b', 'Astronaut'),
    (r'\bCrewmate\b', 'Bemanningslid'),
    (r'\bCrewmates\b', 'Bemanningsleden'),
    (r'\bImpostor\b', 'Bedrieger'),
    (r'\bPeacock\b', 'Pauw'),
    (r'\bOwl\b', 'Uil'),
    (r'\bBird\b', 'Vogel'),
    (r'\bBirds\b', 'Vogels'),
    (r'\bLion\b', 'Leeuw'),
    (r'\bLions\b', 'Leeuwen'),
    (r'\bTiger\b', 'Tijger'),
    (r'\bTigers\b', 'Tijgers'),
    (r'\bElephant\b', 'Olifant'),
    (r'\bElephants\b', 'Olifanten'),
    (r'\bGiraffe\b', 'Giraf'),
    (r'\bGiraffes\b', 'Giraffen'),
    (r'\bZebra\b', 'Zebra'),
    (r'\bZebras\b', 'Zebra\'s'),
    (r'\bBear\b', 'Beer'),
    (r'\bBears\b', 'Beren'),
    (r'\bPanda\b', 'Panda'),
    (r'\bPandas\b', 'Panda\'s'),
    (r'\bPumpkins\b', 'Pompoenen'),
    (r'\bPumpkin\b', 'Pompoen'),
    (r'\bKingdom\b', 'Koninkrijk'),
    (r'\bPalace\b', 'Paleis'),
    (r'\bForest\b', 'Bos'),
    (r'\bGarden\b', 'Tuin'),
    (r'\bGardens\b', 'Tuinen'),
    (r'\bMountain\b', 'Berg'),
    (r'\bMountains\b', 'Bergen'),
    (r'\bOcean\b', 'Oceaan'),
    (r'\bSea\b', 'Zee'),
    (r'\bBeach\b', 'Strand'),
    (r'\bSunset\b', 'Zonsondergang'),
    (r'\bSunrise\b', 'Zonsopkomst'),
    (r'\bLeaves\b', 'Bladeren'),
    (r'\bFriendly\b', 'Vriendelijke'),
    (r'\bMajestic\b', 'Majestueuze'),
    (r'\bCute\b', 'Schattige'),
    (r'\bHappy\b', 'Vrolijke'),
    (r'\bGlowing\b', 'Stralende'),
    (r'\bJoyful\b', 'Vrolijke'),
    (r'\bHeroic\b', 'Heldhaftige'),
    (r'\bProud\b', 'Trotse'),
    (r'\bSweet\b', 'Lieve'),
    (r'\bBeautiful\b', 'Prachtige'),
    (r'\bEnchanting\b', 'Betoverende'),
    (r'\bMagical\b', 'Magische'),
    (r'\bTiny\b', 'Kleine'),
    (r'\bGiant\b', 'Reusachtige'),
    (r'\bLittle\b', 'Kleine'),
    (r'\bScene\b', 'Scène'),
    (r'\bPortrait\b', 'Portret'),
    (r'\bSailboat\b', 'Zeilboot'),
    (r'\bSheep\b', 'Schapen'),
    (r'\bwith\b', 'met'),
    (r'\band\b', 'en'),
    (r'\bin\b', 'in'),
    (r'\bon\b', 'op'),
    (r'\bat\b', 'bij'),
    (r'\bunder\b', 'onder'),
    (r'\bover\b', 'over'),
    (r'\bfor\b', 'voor'),
    (r'\bfrom\b', 'van'),
    (r'\bby\b', 'door'),
    (r'\bthe\b', 'de'),
    (r'\ba\b', 'een'),
    (r'\ban\b', 'een'),
]

def translate_to_dutch(en_title):
    nl = en_title
    for pattern, repl in NL_PHRASE_REPLACEMENTS:
        nl = re.sub(pattern, repl, nl, flags=re.IGNORECASE)
    if nl:
        nl = nl[0].upper() + nl[1:]
    return nl

def to_title_case(s):
    if not s:
        return ''
    words = s.split()
    lower_words = {'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'from', 'de', 'het', 'een', 'en', 'met', 'op', 'bij', 'van', 'voor'}
    res = []
    for i, w in enumerate(words):
        if i == 0 or w.lower() not in lower_words:
            res.append(w.capitalize())
        else:
            res.append(w.lower())
    return ' '.join(res)

def clean_prompt_to_title(prompt, theme_title, theme_slug):
    if not prompt:
        return THEME_FALLBACK_DESCRIPTORS.get(theme_slug, f'{theme_title} Adventure')
    text = prompt
    
    text = re.split(r',?\s*(?:clean open contour|clear line art|black and white|coloring page for|coloring book|clean black lines|page sketch|elegant hollow|spacious white|strictly no|no solid black|no black|no dark|no heavy|no gray|zero fill|8k digital art|iconic characters filling|rich saturated|dramatic cinematic|full-bleed|zero borders|no margins|no letterboxing|strictly textless|no text|no words|no letters|zero typography|masterpiece 8k|banner tag|panoramic wide-angle|close-up shot|eye-level straight-on|overhead bird-eye view|dynamic low-angle view|worm-eye view|straight-on portrait|3/4 angle portrait)', text, flags=re.IGNORECASE)[0]
    
    m = re.search(r'\bshowing\s+(.+)$', text, re.IGNORECASE)
    if m:
        text = m.group(1).strip()
    else:
        colon_idx = text.find(':')
        if 0 <= colon_idx < 80:
            text = text[colon_idx + 1:].strip()
            
    text = re.sub(r'\b(?:a\s+)?clean printable coloring (?:page|pag)\b', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bcoloring pages?\s*(?:of\s*(?:a|an|the)?)?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\bcoloring\b', '', text, flags=re.IGNORECASE)
    
    text = re.sub(r',?\s*set in\s+.*$', '', text, flags=re.IGNORECASE)
    text = re.sub(r',?\s*filling the vertical frame.*$', '', text, flags=re.IGNORECASE)
    text = re.sub(r',?\s*stunning vibrant.*$', '', text, flags=re.IGNORECASE)
    text = re.sub(r',?\s*with crisp outlines.*$', '', text, flags=re.IGNORECASE)
    text = re.sub(r',?\s*discharging crackling.*$', '', text, flags=re.IGNORECASE)
    
    parts = [p.strip() for p in re.split(r'[,;]', text) if p.strip()]
    if parts:
        candidate = parts[0]
        if len(candidate) < 25 and len(parts) > 1 and (len(candidate) + len(parts[1]) < 55):
            candidate += ' ' + parts[1]
        text = candidate

    text = re.sub(r'^(a|an|the)\s+', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\s+(of|the|with|and|at|in|on|to|for|from|into|atop|about|surrounded by|having|holding|casting|featuring)$', '', text, flags=re.IGNORECASE)
    
    if len(text) > 55:
        text = text[:55].rsplit(' ', 1)[0]
        
    text = re.sub(r'\s+(of|the|with|and|at|in|on|to|for|from|into|atop|about|surrounded by|having|holding|casting|featuring)$', '', text, flags=re.IGNORECASE)
    text = re.sub(r'\s{2,}', ' ', text).strip()
    
    title = to_title_case(text)
    if not title or title.lower() in ['coloring page', 'page', 'pag', 'image', 'coloring', 'fun', 'art'] or len(title) <= 3:
        return THEME_FALLBACK_DESCRIPTORS.get(theme_slug, f'{theme_title} Adventure')
    return title

def clean_filename_title(filename, theme_title, theme_slug):
    s = re.sub(r'\.[^.]+$', '', filename)
    s = re.sub(r'_\d{10,}.*$', '', s)
    s = re.sub(r'__A_clean_printable.*$', '', s, flags=re.IGNORECASE)
    s = re.sub(r'_A_clean_printable.*$', '', s, flags=re.IGNORECASE)
    s = re.sub(r'^auto_rejected_', '', s, flags=re.IGNORECASE)
    s = re.sub(r'^ComfyUI_\d+_', '', s, flags=re.IGNORECASE)
    s = re.sub(r'_\d+$', '', s)
    s = re.sub(r'[_-]+', ' ', s).strip()
    s = re.sub(r'\b(coloring\s*pages?|clean\s*printable|coloring)\b', '', s, flags=re.IGNORECASE)
    s = re.sub(r'^(A|An|The)\s+', '', s, flags=re.IGNORECASE)
    s = re.sub(r'\s+', ' ', s).strip()

    if not s or s.lower() in ['coloring page', 'kleurplaat', 'page', 'pag', 'image', 'comfyui', 'coloring', 'fun', 'art'] or len(s) < 3:
        return THEME_FALLBACK_DESCRIPTORS.get(theme_slug, f'{theme_title} Adventure')
    return to_title_case(s)

def is_bad_title(title, theme_title):
    t_low = title.strip().lower()
    if not t_low:
        return True
    if t_low in ['page', 'pag', 'coloring page', 'kleurplaat', 'image', 'untitled', 'default', 'preview', 'art', 'col', 'tal', 'sho', 'page s', 'page show', 'coloring', 'fun']:
        return True
    if re.match(r'^(page|pag|coloring page|coloring|kleurplaat|image|untitled|default)\s*(\(scene\s*\d+\)|\d+)?$', t_low):
        return True
    if 'comfyui' in t_low or 'coloring_pag' in t_low or 'coloring pag' in t_low:
        return True
    if len(t_low) <= 3:
        return True
    if t_low.startswith('comfy') or t_low.startswith('page ') or t_low.startswith('coloring page ') or t_low.startswith('coloring '):
        return True
    if t_low == (theme_title.lower() + ' coloring page'):
        return True
    return False

def process_all_files():
    total_processed = 0
    total_fixed_count = 0
    theme_files = [f for f in os.listdir(EN_THEMES_DATA_DIR) if f.endswith('.json')]
    
    id_to_en_page = {}
    id_to_nl_page = {}

    for fname in theme_files:
        theme_slug = fname.replace('.json', '')
        en_path = os.path.join(EN_THEMES_DATA_DIR, fname)
        nl_path = os.path.join(NL_THEMES_DATA_DIR, fname)
        
        with open(en_path, 'r', encoding='utf-8') as fp:
            pages_en = json.load(fp)
            
        pages_nl = []
        if os.path.exists(nl_path):
            with open(nl_path, 'r', encoding='utf-8') as fp:
                pages_nl = json.load(fp)

        theme_title_en = theme_title_map_en.get(theme_slug, to_title_case(theme_slug.replace('-', ' ')))
        theme_title_nl = theme_title_map_nl.get(theme_slug, theme_title_en)

        seen_titles = defaultdict(int)

        for i, page_en in enumerate(pages_en):
            total_processed += 1
            cur_title = page_en.get('title', '').strip()
            img_url = page_en.get('image', '')
            img_filename = img_url.split('/')[-1]
            try:
                import urllib.parse
                img_filename = urllib.parse.unquote(img_filename)
            except:
                pass
            
            # Check prompt map
            fname_clean = re.sub(r'\.(webp|png|jpg|jpeg)$', '', img_filename, flags=re.IGNORECASE)
            prompt_info = None
            for ext in ['.png', '.webp', '.jpg', '']:
                k = fname_clean + ext
                if k in prompt_map:
                    prompt_info = prompt_map[k]
                    break
            
            needs_fix = is_bad_title(cur_title, theme_title_en)
            
            if needs_fix:
                total_fixed_count += 1
                if prompt_info:
                    p_text = prompt_info.get('prompt', '') if isinstance(prompt_info, dict) else str(prompt_info)
                    clean_title = clean_prompt_to_title(p_text, theme_title_en, theme_slug)
                else:
                    clean_title = clean_filename_title(img_filename, theme_title_en, theme_slug)
            else:
                clean_title = cur_title

            if not clean_title or clean_title.lower() in ['coloring page', 'kleurplaat', 'page', 'pag', 'coloring', 'fun', 'art'] or len(clean_title) <= 3:
                clean_title = THEME_FALLBACK_DESCRIPTORS.get(theme_slug, f'{theme_title_en} Adventure')

            seen_titles[clean_title] += 1
            count = seen_titles[clean_title]
            if count > 1:
                final_en_title = f'{clean_title} (Scene {count})'
            else:
                final_en_title = clean_title

            page_en['title'] = final_en_title
            page_en['metaTitle'] = f'{final_en_title} - Free Printable Coloring Page | ColorVaults'
            page_en['metaDescription'] = f'Download and print this free {final_en_title} coloring page from the {theme_title_en} collection. High-resolution in A4 & Letter size!'
            page_en['shortDescription'] = f'Free printable {final_en_title} coloring page from our {theme_title_en} collection.'
            page_en['longDescription'] = f'Enjoy this high-quality {final_en_title} coloring page from the {theme_title_en} category. Designed with crisp black outlines, download or print directly in A4/Letter size for free!'
            page_en['altText'] = f'{final_en_title} coloring page - free printable'
            
            id_to_en_page[page_en['id']] = page_en

            if i < len(pages_nl):
                page_nl = pages_nl[i]
                final_nl_title = translate_to_dutch(final_en_title)
                page_nl['title'] = final_nl_title
                page_nl['metaTitle'] = f'{final_nl_title} - Gratis Printbare Kleurplaat | ColorVaults'
                page_nl['metaDescription'] = f'Download en print deze gratis {final_nl_title} kleurplaat uit de {theme_title_nl} collectie. Hoge resolutie in A4 & Letter formaat!'
                page_nl['shortDescription'] = f'Gratis printbare {final_nl_title} kleurplaat uit onze {theme_title_nl} collectie.'
                page_nl['longDescription'] = f'Geniet van deze hoogwaardige {final_nl_title} kleurplaat uit de categorie {theme_title_nl}. Ontworpen met strakke zwarte lijnen, gratis te printen of direct op A4/Letter formaat te downloaden!'
                page_nl['altText'] = f'{final_nl_title} kleurplaat - gratis printbaar'
                id_to_nl_page[page_nl['id']] = page_nl

        with open(en_path, 'w', encoding='utf-8') as fp:
            json.dump(pages_en, fp, indent=2, ensure_ascii=False)

        if pages_nl:
            with open(nl_path, 'w', encoding='utf-8') as fp:
                json.dump(pages_nl, fp, indent=2, ensure_ascii=False)

    print(f'Theme data files updated: {len(theme_files)} files. Total pages: {total_processed}, Titles fixed: {total_fixed_count}')

    master_en_path = os.path.join(DATA_DIR, 'en', 'coloring-pages.json')
    master_nl_path = os.path.join(DATA_DIR, 'nl', 'coloring-pages.json')
    
    if os.path.exists(master_en_path):
        print('Updating master EN coloring-pages.json...')
        with open(master_en_path, 'r', encoding='utf-8') as fp:
            master_en = json.load(fp)
        for p in master_en:
            pid = p.get('id')
            if pid in id_to_en_page:
                src = id_to_en_page[pid]
                for field in ['title', 'metaTitle', 'metaDescription', 'shortDescription', 'longDescription', 'altText']:
                    if field in src:
                        p[field] = src[field]
        with open(master_en_path, 'w', encoding='utf-8') as fp:
            json.dump(master_en, fp, indent=2, ensure_ascii=False)
            
    if os.path.exists(master_nl_path):
        print('Updating master NL coloring-pages.json...')
        with open(master_nl_path, 'r', encoding='utf-8') as fp:
            master_nl = json.load(fp)
        for p in master_nl:
            pid = p.get('id')
            if pid in id_to_nl_page:
                src = id_to_nl_page[pid]
                for field in ['title', 'metaTitle', 'metaDescription', 'shortDescription', 'longDescription', 'altText']:
                    if field in src:
                        p[field] = src[field]
        with open(master_nl_path, 'w', encoding='utf-8') as fp:
            json.dump(master_nl, fp, indent=2, ensure_ascii=False)

    for lang, lookup in [('en', id_to_en_page), ('nl', id_to_nl_page)]:
        feat_path = os.path.join(DATA_DIR, lang, 'featured-pages.json')
        if os.path.exists(feat_path):
            with open(feat_path, 'r', encoding='utf-8') as fp:
                feat = json.load(fp)
            for p in feat:
                pid = p.get('id')
                if pid in lookup:
                    src = lookup[pid]
                    for field in ['title', 'metaTitle', 'metaDescription', 'shortDescription', 'longDescription', 'altText']:
                        if field in src:
                            p[field] = src[field]
            with open(feat_path, 'w', encoding='utf-8') as fp:
                json.dump(feat, fp, indent=2, ensure_ascii=False)

    for lang, lookup in [('en', id_to_en_page), ('nl', id_to_nl_page)]:
        unmatched_path = os.path.join(DATA_DIR, lang, 'unmatched-pages.json')
        if os.path.exists(unmatched_path):
            with open(unmatched_path, 'r', encoding='utf-8') as fp:
                unmatched = json.load(fp)
            for p in unmatched:
                pid = p.get('id')
                if pid in lookup:
                    src = lookup[pid]
                    for field in ['title', 'metaTitle', 'metaDescription', 'shortDescription', 'longDescription', 'altText']:
                        if field in src:
                            p[field] = src[field]
            with open(unmatched_path, 'w', encoding='utf-8') as fp:
                json.dump(unmatched, fp, indent=2, ensure_ascii=False)

    print('All master files updated successfully!')

if __name__ == '__main__':
    process_all_files()
