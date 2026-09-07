import os
import json
import re

themes_path = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes.json'
with open(themes_path, 'r', encoding='utf-8') as f:
    themes_list = json.load(f)

theme_map = {t['slug']: t['parentHub'] for t in themes_list}

# Specific rules for misplaced subjects
RULES = [
    # (regex_pattern, target_theme, target_hub)
    (r'\b(cheetah|african savanna|savanna|safari|lion|zebra|giraffe|elephant|rhino|hippopotamus)\b', 'safari-lions-big-cats', 'animals-and-nature'),
    (r'\b(unicorn|pegasus unicorn)\b', 'unicorns-and-magical-horses', 'disney-and-fairy-tales'),
    (r'\b(disney princesses|princesses on a ferris wheel|disney fairytale)\b', 'disney-princesses', 'disney-pixar'),
    (r'\b(children ice skating|children enjoying winter|ice skating and sledding)\b', 'cozy-winter-wonderland', 'holidays-seasons'),
    (r'\b(dinosaur|t-rex|tyrannosaurus|triceratops|brachiosaurus|stegosaurus|velociraptor)\b', 'dinosaur-adventures', 'animals-and-nature'),
    (r'\b(pokemon|pikachu|charizard|eevee|gengar|lucario|mewtwo|snorlax|bulbasaur|squirtle)\b', 'pokemon', 'gaming-virtual-worlds'),
    (r'\b(dragon ball|dragonball|goku|vegeta|gohan|piccolo|frieza|beerus|whis|trunks)\b', 'dragon-ball', 'anime-manga'),
    (r'\b(naruto|sasuke|kakashi|sakura|itachi|gaara)\b', 'naruto', 'anime-manga'),
    (r'\b(one piece|luffy|zoro|nami|sanji|chopper|straw hat)\b', 'one-piece', 'anime-manga'),
    (r'\b(demon slayer|tanjiro|nezuko|zenitsu|inosuke|rengoku)\b', 'demon-slayer', 'anime-manga'),
    (r'\b(paw patrol|chase|marshall|skye|rubble|rocky|zuma)\b', 'paw-patrol', 'tv-series-and-movies'),
    (r'\b(bluey|bingo|bandit|chilli)\b', 'bluey', 'tv-series-and-movies'),
    (r'\b(peppa pig|george pig)\b', 'peppa-pig', 'tv-series-and-movies'),
    (r'\b(spongebob|patrick star|squidward)\b', 'spongebob', 'tv-series-and-movies'),
]

# Validate that all target themes exist
for pat, t_theme, t_hub in RULES:
    if t_theme not in theme_map:
        # find matching theme
        matches = [s for s in theme_map.keys() if t_theme in s or s in t_theme]
        print(f"Target theme {t_theme} match: {matches}")

