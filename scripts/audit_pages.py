import json
import os
from collections import Counter, defaultdict

data_dir = r'C:\Users\Gebruiker\Desktop\Hetzner website\src\data\en'
pages_file = os.path.join(data_dir, 'coloring-pages.json')
pages = json.load(open(pages_file, encoding='utf-8'))

print(f"=== CHECKING PAGE TITLES & SLUGS IN {len(pages)} PAGES ===")

titles = [p['title'] for p in pages]
dup_titles = Counter(titles)
most_common_titles = [item for item in dup_titles.items() if item[1] > 1]

print(f"Total Unique Titles: {len(dup_titles)}")
print(f"Titles with duplicates: {len(most_common_titles)}")

print("\nTop 15 Most Duplicated Page Titles:")
for title, count in sorted(most_common_titles, key=lambda x: x[1], reverse=True)[:15]:
    print(f"   - '{title}': {count} times")

print("\n=== CHECKING DUMMY FILENAMES IN GEUPLOAD ===")
geupload_dir = r'C:\Users\Gebruiker\Desktop\colorvaults\Geupload'
bad_folders = []
if os.path.exists(geupload_dir):
    for item in os.listdir(geupload_dir):
        full_p = os.path.join(geupload_dir, item)
        if os.path.isdir(full_p):
            count = len(os.listdir(full_p))
            if count == 0 or item in ['Default', 'Unsorted', 'Anime Algemeen', 'Celtic Patterns', 'Fantasy Kingdom', 'Large Print Flowers', 'Kawaii', 'Generatie 2 Johto', 'Generatie 5 Unova', 'Generatie 9 Paldea', 'Cozy Life']:
                bad_folders.append((item, count))

print(f"Folders identified for merging/cleanup ({len(bad_folders)}):")
for name, c in bad_folders:
    print(f"   - '{name}': {c} files")
