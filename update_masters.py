import os
import json

DATA_ROOT = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data'

for lang in ['en', 'nl']:
    feat_file = os.path.join(DATA_ROOT, lang, 'featured-pages.json')
    if os.path.exists(feat_file):
        with open(feat_file, 'r', encoding='utf-8') as f:
            feat_pages = json.load(f)
            
        updated = []
        for p in feat_pages:
            title = p.get('title', '').lower()
            if 'savanna' in title or 'cheetah' in title or 'lion' in title:
                p['parentHub'] = 'animals-wildlife'
                p['parentTheme'] = 'safari-lions-big-cats'
            updated.append(p)
            
        with open(feat_file, 'w', encoding='utf-8') as f:
            json.dump(updated, f, indent=2, ensure_ascii=False)
            
    # Also update master coloring-pages.json if present
    master_file = os.path.join(DATA_ROOT, lang, 'coloring-pages.json')
    if os.path.exists(master_file):
        with open(master_file, 'r', encoding='utf-8') as f:
            all_pages = json.load(f)
            
        updated_all = []
        for p in all_pages:
            title = p.get('title', '').lower()
            if p.get('parentTheme') == 'frozen' and ('savanna' in title or 'cheetah' in title or 'lion' in title):
                p['parentHub'] = 'animals-wildlife'
                p['parentTheme'] = 'safari-lions-big-cats'
            elif p.get('parentTheme') == 'frozen' and 'unicorn' in title:
                p['parentHub'] = 'fantasy-fairytales'
                p['parentTheme'] = 'unicorns-pegasus'
            updated_all.append(p)
            
        with open(master_file, 'w', encoding='utf-8') as f:
            json.dump(updated_all, f, indent=2, ensure_ascii=False)

print("Updated featured and master files successfully!")
