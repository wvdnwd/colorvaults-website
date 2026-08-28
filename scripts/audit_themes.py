import json
import os
from collections import Counter, defaultdict

data_dir = r'C:\Users\Gebruiker\Desktop\Hetzner website\src\data\en'
hubs_file = os.path.join(data_dir, 'main-hubs.json')
themes_file = os.path.join(data_dir, 'themes.json')
pages_file = os.path.join(data_dir, 'coloring-pages.json')

themes = json.load(open(themes_file, encoding='utf-8'))
pages = json.load(open(pages_file, encoding='utf-8'))
hubs = json.load(open(hubs_file, encoding='utf-8'))

counts = Counter(p['parentTheme'] for p in pages)

print(f"=== FULL AUDIT OF {len(themes)} THEMES ACROSS {len(hubs)} HUBS ===")

grouped = defaultdict(list)
for t in themes:
    c = counts.get(t['slug'], 0)
    grouped[t['parentHub']].append((t['title'], t['slug'], c))

for hub_slug in sorted(grouped.keys()):
    items = sorted(grouped[hub_slug], key=lambda x: x[0])
    print(f"\nHUB: [{hub_slug}] ({len(items)} themes):")
    for title, slug, count in items:
        print(f"   * {title:<35} (slug: {slug:<30}) -> {count} pages")

print("\n=== DUPLICATE / OVERLAPPING THEMES CHECK ===")
# Check for split themes or duplicate names
prefix_groups = defaultdict(list)
for t in themes:
    base = t['slug'].split('-')[0]
    prefix_groups[base].append(t)

for base, t_list in sorted(prefix_groups.items()):
    if len(t_list) > 1:
        print(f"Prefix group '{base}' ({len(t_list)} themes):")
        for t in t_list:
            c = counts.get(t['slug'], 0)
            print(f"   - {t['title']} (slug: {t['slug']}, hub: {t['parentHub']}) -> {c} pages")

print("\n=== CHECKING BAD OR DUMMY THEMES ===")
dummy_themes = [t for t in themes if t['slug'] in ['default', 'unsorted'] or counts.get(t['slug'], 0) < 5]
for dt in dummy_themes:
    c = counts.get(dt['slug'], 0)
    print(f"   - BAD/SMALL THEME: {dt['title']} (slug: {dt['slug']}) -> {c} pages")
