import os
import json
import re

DATA_ROOT = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data'

def move_pages_for_lang(lang):
    themes_dir = os.path.join(DATA_ROOT, lang, 'themes-data')
    if not os.path.exists(themes_dir):
        return
        
    frozen_file = os.path.join(themes_dir, 'frozen.json')
    if not os.path.exists(frozen_file):
        return
        
    with open(frozen_file, 'r', encoding='utf-8') as f:
        frozen_pages = json.load(f)
        
    remaining_frozen = []
    to_move = [] # (target_theme, target_hub, page)
    
    for p in frozen_pages:
        title = p.get('title', '')
        title_lower = title.lower()
        
        # Cheetah, Savanna, Lion, Zebra, Giraffe, Elephant
        if re.search(r'\b(cheetah|african savanna|savanna|lion|zebra|giraffe|elephant)\b', title_lower):
            if re.search(r'\b(giraffe|zebra)\b', title_lower):
                to_move.append(('safari-giraffes-zebras', 'animals-wildlife', p))
            else:
                to_move.append(('safari-lions-big-cats', 'animals-wildlife', p))
        elif 'unicorn' in title_lower:
            to_move.append(('unicorns-pegasus', 'fantasy-fairytales', p))
        elif re.search(r'\b(children ice skating|children enjoying winter|ice skating and sledding)\b', title_lower):
            to_move.append(('cozy-winter-wonderland', 'holidays-seasons', p))
        elif 'ferris wheel' in title_lower:
            to_move.append(('princesses-castles', 'fantasy-fairytales', p))
        else:
            remaining_frozen.append(p)
            
    print(f"[{lang.upper()}] Moving {len(to_move)} pages out of Frozen. Remaining Frozen pages: {len(remaining_frozen)}")
    
    # Write back cleaned frozen.json
    with open(frozen_file, 'w', encoding='utf-8') as f:
        json.dump(remaining_frozen, f, indent=2, ensure_ascii=False)
        
    # Group and append to target themes
    by_target = {}
    for t_theme, t_hub, p in to_move:
        if t_theme not in by_target:
            by_target[t_theme] = []
            
        # Update page metadata
        updated_p = dict(p)
        updated_p['parentHub'] = t_hub
        updated_p['parentTheme'] = t_theme
        
        theme_readable = t_theme.replace('-', ' ').title()
        is_nl = (lang == 'nl')
        
        if is_nl:
            updated_p['metaTitle'] = f"{p.get('title', '')} - Gratis Printbare Kleurplaat | ColorVaults"
            updated_p['metaDescription'] = f"Download en print deze gratis {p.get('title', '')} kleurplaat uit de {theme_readable} collectie. Hoge resolutie in A4-formaat direct printklaar!"
            updated_p['shortDescription'] = f"Gratis printbare {p.get('title', '')} kleurplaat uit onze {theme_readable} verzameling."
            updated_p['longDescription'] = f"Geniet van deze prachtige {p.get('title', '')} kleurplaat uit de categorie {theme_readable}. Met scherpe zwarte lijnen en open kleurvlakken, gratis te downloaden of direct te printen op A4-formaat!"
            updated_p['altText'] = f"{p.get('title', '')} kleurplaat - gratis printen"
        else:
            updated_p['metaTitle'] = f"{p.get('title', '')} - Free Printable Coloring Page | ColorVaults"
            updated_p['metaDescription'] = f"Download and print this free {p.get('title', '')} coloring page from the {theme_readable} collection. High-resolution in A4 & Letter size!"
            updated_p['shortDescription'] = f"Free printable {p.get('title', '')} coloring page from our {theme_readable} collection."
            updated_p['longDescription'] = f"Enjoy this high-quality {p.get('title', '')} coloring page from the {theme_readable} category. Designed with crisp black outlines, download or print directly in A4/Letter size for free!"
            updated_p['altText'] = f"{p.get('title', '')} coloring page - free printable"
            
        updated_p['tags'] = [t_theme, p.get('ageGroup', 'kids')]
        by_target[t_theme].append(updated_p)
        
    for t_theme, pages_to_add in by_target.items():
        target_file = os.path.join(themes_dir, f"{t_theme}.json")
        existing_pages = []
        if os.path.exists(target_file):
            with open(target_file, 'r', encoding='utf-8') as f:
                try:
                    existing_pages = json.load(f)
                except:
                    existing_pages = []
                    
        # Check for slug collision
        existing_slugs = {p['slug'] for p in existing_pages}
        for p in pages_to_add:
            orig_slug = p['slug']
            new_slug = orig_slug
            if new_slug in existing_slugs:
                new_slug = f"{t_theme}-{orig_slug}"
            p['slug'] = new_slug
            p['id'] = f"page-{new_slug}"
            existing_pages.append(p)
            existing_slugs.add(new_slug)
            
        with open(target_file, 'w', encoding='utf-8') as f:
            json.dump(existing_pages, f, indent=2, ensure_ascii=False)
            
        print(f"  -> Added {len(pages_to_add)} pages to {t_theme}.json (total now: {len(existing_pages)})")

move_pages_for_lang('en')
move_pages_for_lang('nl')
