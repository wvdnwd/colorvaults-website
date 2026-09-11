import json

with open('src/data/en/coloring-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

paw = [p for p in data if p.get('parentTheme') == 'paw-patrol']
for p in paw:
    img = p.get('image', '')
    print(f"{p.get('slug')}: {p.get('title')} | URL: {img}")
