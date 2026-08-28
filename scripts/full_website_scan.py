import os
import json
import glob
from collections import Counter

SITE_DIR = r'C:\Users\Gebruiker\Desktop\Hetzner website'
DATA_DIR = os.path.join(SITE_DIR, 'src', 'data', 'en')

print("=== FULL WEBSITE AUDIT & HEALTH SCAN ===")

issues = []
passes = []

# 1. Check data files
try:
    hubs = json.load(open(os.path.join(DATA_DIR, 'main-hubs.json'), encoding='utf-8'))
    themes = json.load(open(os.path.join(DATA_DIR, 'themes.json'), encoding='utf-8'))
    pages = json.load(open(os.path.join(DATA_DIR, 'coloring-pages.json'), encoding='utf-8'))
    passes.append(f"Data Loaded: {len(hubs)} Hubs, {len(themes)} Themes, {len(pages)} Coloring Pages")
except Exception as e:
    issues.append(f"Data Load Error: {e}")

# 2. Check ads.txt
ads_txt_path = os.path.join(SITE_DIR, 'public', 'ads.txt')
if os.path.exists(ads_txt_path):
    txt = open(ads_txt_path).read()
    if 'ca-pub-1184801748776428' in txt or 'pub-1184801748776428' in txt:
        passes.append("public/ads.txt: Verified with pub-1184801748776428")
    else:
        issues.append("public/ads.txt: Missing publisher ID")
else:
    issues.append("public/ads.txt: Missing file")

# 3. Check verification tokens in layout
layout_path = os.path.join(SITE_DIR, 'src', 'app', '[lang]', 'layout.tsx')
if os.path.exists(layout_path):
    l_txt = open(layout_path, encoding='utf-8').read()
    if 'r57LIyNltfhaHeN4Lean5iNHEkbWBJbD-z-s6uF9t0s' in l_txt:
        passes.append("Google Search Console Verification: Verified in layout.tsx")
    else:
        issues.append("Google Search Console Verification: Missing token")
        
    if 'ca-pub-1184801748776428' in l_txt:
        passes.append("Google AdSense Script & Meta Tag: Verified in layout.tsx")
    else:
        issues.append("Google AdSense Script & Meta Tag: Missing in layout.tsx")

# 4. Check contact email
contact_files = [
    os.path.join(SITE_DIR, 'src', 'app', '[lang]', 'contact', 'page.tsx'),
    os.path.join(SITE_DIR, 'src', 'components', 'Footer.tsx'),
    os.path.join(SITE_DIR, 'src', 'app', '[lang]', 'terms-of-service', 'page.tsx'),
    os.path.join(SITE_DIR, 'src', 'app', '[lang]', 'privacy-policy', 'page.tsx')
]

for cf in contact_files:
    if os.path.exists(cf):
        c_content = open(cf, encoding='utf-8').read()
        if 'colorvaults@hotmail.com' in c_content:
            passes.append(f"Email Check [{os.path.basename(cf)}]: Updated to colorvaults@hotmail.com")
        elif 'email' in c_content.lower() or 'contact' in c_content.lower():
            if 'colorvaults@gmail.com' in c_content or 'info@' in c_content:
                issues.append(f"Email Check [{os.path.basename(cf)}]: Found legacy email instead of colorvaults@hotmail.com")

# 5. Check next.config.ts for unoptimized images
next_config_path = os.path.join(SITE_DIR, 'next.config.ts')
if os.path.exists(next_config_path):
    nc_txt = open(next_config_path, encoding='utf-8').read()
    if 'unoptimized: true' in nc_txt:
        passes.append("Next.js Config: unoptimized: true set (prevents 503 RAM crashes)")
    else:
        issues.append("Next.js Config: unoptimized: true is MISSING (risk of 503 crashes)")

# 6. Check search index
search_index_path = os.path.join(SITE_DIR, 'public', 'search-index.json')
if os.path.exists(search_index_path):
    si = json.load(open(search_index_path, encoding='utf-8'))
    passes.append(f"Search Index: {len(si)} entries generated in public/search-index.json")
else:
    issues.append("Search Index: Missing public/search-index.json")

print("\n--- PASSED CHECKS ---")
for p in passes:
    print(f" [PASS] {p}")

print("\n--- ISSUES FOUND ---")
if issues:
    for i in issues:
        print(f" [FAIL] {i}")
else:
    print(" [PERFECT] ZERO CRITICAL ISSUES FOUND!")
