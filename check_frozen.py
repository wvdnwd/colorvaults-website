import os
import json

themes_dir_en = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes-data'
frozen_file = os.path.join(themes_dir_en, 'frozen.json')

with open(frozen_file, 'r', encoding='utf-8') as f:
    frozen_pages = json.load(f)

print(f"Total pages in frozen.json: {len(frozen_pages)}")

mismatched = []
for p in frozen_pages:
    title = p.get('title', '').lower()
    img = p.get('image', '').lower()
    if any(animal in title for animal in ['cheetah', 'savanna', 'lion', 'zebra', 'elephant', 'giraffe', 'ice skating', 'unicorn', 'ferris wheel']):
        mismatched.append(p.get('title'))

print(f"Found {len(mismatched)} suspicious items in frozen.json, e.g.:")
for m in mismatched[:15]:
    print(f"  - {m}")
