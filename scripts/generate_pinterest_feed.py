#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_pinterest_feed.py - Pinterest Bulk Upload Feed Generator
Genereert een kant-en-klare Pinterest CSV voor bulk upload naar Pinterest Business.

Formaat Pinterest CSV:
  Title, Media URL, Ping URL, Description, Destination Link, Board Name
"""

import json
import os
import csv
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / 'src' / 'data'
OUTPUT_CSV_EN = Path(__file__).resolve().parent.parent / 'public' / 'pinterest_pins_en.csv'
OUTPUT_CSV_NL = Path(__file__).resolve().parent.parent / 'public' / 'pinterest_pins_nl.csv'

def generate_feed(lang='en'):
    lang_dir = DATA_DIR / lang
    pages_file = lang_dir / 'coloring-pages.json'
    themes_file = lang_dir / 'themes.json'
    hubs_file = lang_dir / 'main-hubs.json'

    if not pages_file.exists():
        print(f"File not found: {pages_file}")
        return

    with open(pages_file, 'r', encoding='utf-8') as f:
        pages = json.load(f)

    with open(themes_file, 'r', encoding='utf-8') as f:
        themes = {t['slug']: t for t in json.load(f)}

    with open(hubs_file, 'r', encoding='utf-8') as f:
        hubs = {h['slug']: h for h in json.load(f)}

    pins = []
    is_en = lang == 'en'

    for page in pages:
        theme = themes.get(page.get('parentTheme'), {})
        hub = hubs.get(page.get('parentHub'), {})
        theme_title = theme.get('title', 'Coloring Pages')
        hub_title = hub.get('title', 'ColorVaults')
        age = page.get('ageGroup', 'kids')

        slug = page.get('slug', '')
        title = page.get('title', '')
        image_url = page.get('image', '')
        dest_url = f"https://colorvaults.com/{lang}/{page.get('parentHub', 'collections')}/{page.get('parentTheme', 'all')}/{age}/{slug}"

        # Board name on Pinterest
        board_name = f"{theme_title} Coloring Pages" if is_en else f"{theme_title} Kleurplaten"

        # SEO Description with hashtags
        if is_en:
            desc = (
                f"Free printable {title} coloring page! High-resolution template perfect for {age} and adults. "
                f"Print instantly on A4 or color online in your browser. Download 100% free at ColorVaults.com! "
                f"#{theme_title.replace(' ', '')} #{is_en and 'ColoringPages' or 'Kleurplaten'} #FreePrintable #ColoringSheet #ArtActivities"
            )
            pin_title = f"{title} — Free Printable Coloring Page"
        else:
            desc = (
                f"Gratis printbare {title} kleurplaat! Hoge resolutie kleurplaat voor {age} en volwassenen. "
                f"Direct afdrukken op A4 of online inkleuren in de browser. 100% gratis te downloaden op ColorVaults.com! "
                f"#{theme_title.replace(' ', '')} #Kleurplaten #GratisPrinten #KleurplaatVoorKinderen #Kleurboek"
            )
            pin_title = f"{title} — Gratis Printbare Kleurplaat"

        pins.append({
            'Title': pin_title[:100],
            'Media URL': image_url,
            'Ping URL': image_url,
            'Description': desc[:500],
            'Destination Link': dest_url,
            'Board Name': board_name[:50]
        })

    out_file = OUTPUT_CSV_EN if is_en else OUTPUT_CSV_NL
    with open(out_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Title', 'Media URL', 'Ping URL', 'Description', 'Destination Link', 'Board Name'])
        writer.writeheader()
        writer.writerows(pins)

    print(f"Generated {len(pins)} Pinterest pins for '{lang}' -> {out_file}")

def main():
    print("ColorVaults - Pinterest Feed Generator")
    print("=" * 50)
    generate_feed('en')
    generate_feed('nl')
    print("\nDone! CSV files are located in public/ directory.")

if __name__ == '__main__':
    main()
