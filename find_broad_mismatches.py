import os
import json
import re

en_dir = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes-data'

# Let's check for weird mismatches in other categories
for filename in sorted(os.listdir(en_dir)):
    if not filename.endswith('.json'):
        continue
    theme_slug = filename.replace('.json', '')
    filepath = os.path.join(en_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        pages = json.load(f)
        
    mismatches = []
    for p in pages:
        title = p.get('title', '').lower()
        
        # In cars-lightning-mcqueen: check for scars or unrelated
        if theme_slug == 'cars-lightning-mcqueen' and not any(k in title for k in ['lightning', 'mcqueen', 'mater', 'sally', 'doc hudson', 'radiator springs', 'car', 'race']):
            mismatches.append(p['title'])
        # In cute-kittens-cats: check for caterpillar or scatter
        if theme_slug == 'cute-kittens-cats' and ('caterpillar' in title or 'scatter' in title):
            mismatches.append(p['title'])
            
    if mismatches:
        print(f"Theme {theme_slug}: {len(mismatches)} potential mismatches: {mismatches[:5]}")
