import json
themes_path = r'c:\Users\Gebruiker\Desktop\Hetzner website\src\data\en\themes.json'
with open(themes_path, 'r', encoding='utf-8') as f:
    themes = json.load(f)

for t in sorted(themes, key=lambda x: x['slug']):
    print(f"{t['slug']} ({t['parentHub']})")
