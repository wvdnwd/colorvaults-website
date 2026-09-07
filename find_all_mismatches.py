import os
import json
import re

en_dir = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes-data'
nl_dir = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\nl\themes-data'

# Let's inspect all themes in EN
moved = []

for filename in os.listdir(en_dir):
    if not filename.endswith('.json'):
        continue
    theme_slug = filename.replace('.json', '')
    filepath = os.path.join(en_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        pages = json.load(f)
        
    for p in pages:
        title = p.get('title', '').lower()
        slug = p.get('slug', '')
        
        # Check Frozen anomalies
        if theme_slug == 'frozen':
            if re.search(r'\b(cheetah|african savanna|savanna|lion|zebra|giraffe|elephant)\b', title):
                moved.append((theme_slug, 'safari-lions-big-cats', 'animals-wildlife', p['title']))
            elif 'unicorn' in title:
                moved.append((theme_slug, 'unicorns-pegasus', 'fantasy-fairytales', p['title']))
            elif re.search(r'\b(children ice skating|children enjoying winter|ice skating and sledding)\b', title):
                moved.append((theme_slug, 'cozy-winter-wonderland', 'holidays-seasons', p['title']))
            elif 'ferris wheel' in title:
                moved.append((theme_slug, 'princesses-castles', 'fantasy-fairytales', p['title']))

print(f"Total misplaced pages found to move: {len(moved)}")
for src, dst, hub, title in moved[:25]:
    print(f"  [{src} -> {dst}] {title}")
