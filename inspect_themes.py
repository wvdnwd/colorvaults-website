import os
import json
import re

themes_path = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes.json'
with open(themes_path, 'r', encoding='utf-8') as f:
    themes = json.load(f)

theme_slug_to_hub = {t['slug']: t['parentHub'] for t in themes}
print(f"Total valid themes in themes.json: {len(themes)}")

themes_dir_en = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes-data'
theme_files = [f for f in os.listdir(themes_dir_en) if f.endswith('.json')]
print(f"Total theme-data JSON files: {len(theme_files)}")
