import json
import urllib.request
import io
from PIL import Image

with open('src/data/en/coloring-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

paw = [p for p in data if p.get('parentTheme') == 'paw-patrol']
print(f"Auditing {len(paw)} Paw Patrol items...")

colored_items = []
headers = {'User-Agent': 'ColorVaults-Audit/1.0'}

for i, p in enumerate(paw):
    slug = p.get('slug')
    title = p.get('title')
    url = p.get('image')
    if not url:
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as response:
            img_data = response.read()
        img = Image.open(io.BytesIO(img_data)).convert('RGB')
        img.thumbnail((100, 100))
        
        # Check saturation
        hsv = img.convert('HSV')
        s_channel = [pixel[1] for pixel in hsv.getdata()]
        avg_sat = sum(s_channel) / len(s_channel)
        high_sat_pixels = sum(1 for s in s_channel if s > 40)
        high_sat_ratio = high_sat_pixels / len(s_channel)
        
        # True B&W line art has avg_sat < 5 and high_sat_ratio < 0.02
        if high_sat_ratio > 0.06 or avg_sat > 12:
            colored_items.append({
                'slug': slug,
                'title': title,
                'avg_sat': round(avg_sat, 1),
                'ratio': round(high_sat_ratio, 2),
                'url': url
            })
            print(f"COLORED: {slug} | {title} | sat={avg_sat:.1f} | ratio={high_sat_ratio:.2f}")
    except Exception as e:
        print(f"Error checking {slug}: {e}")

print(f"\n--- Result: {len(colored_items)} colored items found out of {len(paw)} ---")
with open('scripts/colored_paw_patrol.json', 'w', encoding='utf-8') as out:
    json.dump(colored_items, out, indent=2)
