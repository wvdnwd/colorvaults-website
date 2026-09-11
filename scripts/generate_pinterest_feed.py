#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate RFC 4180 Pinterest bulk-upload CSVs from canonical theme shards."""

import argparse
import csv
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import urlparse

FIELDNAMES = ['Title', 'Media URL', 'Ping URL', 'Description', 'Destination Link', 'Board Name']
AGE_LABELS = {
    'en': {
        'toddlers': 'toddlers', 'peuters': 'toddlers',
        'kids': 'children', 'kinderen': 'children',
        'teens': 'teens', 'tieners': 'teens',
        'adults': 'adults', 'volwassenen': 'adults',
    },
    'nl': {
        'toddlers': 'peuters', 'peuters': 'peuters',
        'kids': 'kinderen', 'kinderen': 'kinderen',
        'teens': 'tieners', 'tieners': 'tieners',
        'adults': 'volwassenen', 'volwassenen': 'volwassenen',
    },
}


def read_json(path):
    with path.open('r', encoding='utf-8') as handle:
        return json.load(handle)


def direct_image_url(value):
    if not isinstance(value, str):
        return None
    parsed = urlparse(value)
    if parsed.scheme not in ('http', 'https') or not parsed.netloc:
        return None
    if Path(parsed.path).suffix.lower() not in ('.webp', '.jpg', '.jpeg', '.png'):
        return None
    return value


def hashtag(value):
    ascii_value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    cleaned = re.sub(r'[^A-Za-z0-9]', '', ascii_value)
    return f'#{cleaned}' if cleaned else ''


def generate_feed(data_dir, output_dir, lang='en'):
    lang_dir = data_dir / lang
    themes_file = lang_dir / 'themes.json'
    shards_dir = lang_dir / 'themes-data'

    if not themes_file.is_file() or not shards_dir.is_dir():
        raise FileNotFoundError(f"Missing canonical Pinterest catalog for '{lang}': {lang_dir}")

    themes = read_json(themes_file)
    is_en = lang == 'en'
    pins = []
    skipped = 0

    for theme in themes:
        theme_slug = theme.get('slug')
        parent_hub = theme.get('parentHub')
        shard_file = shards_dir / f'{theme_slug}.json'
        if not theme_slug or not parent_hub or not shard_file.is_file():
            skipped += 1
            continue

        pages = read_json(shard_file)
        theme_title = theme.get('title', 'Coloring Pages')
        theme_tag = hashtag(theme_title)

        for page in pages:
            if page.get('parentHub') != parent_hub or page.get('parentTheme') != theme_slug:
                skipped += 1
                continue

            title = page.get('title')
            slug = page.get('slug')
            age = page.get('ageGroup')
            image_url = direct_image_url(page.get('image'))
            if not all(isinstance(value, str) and value for value in (title, slug, age)) or not image_url:
                skipped += 1
                continue

            age_label = AGE_LABELS[lang].get(age, age)
            dest_url = f"https://www.colorvaults.com/{lang}/{parent_hub}/{theme_slug}/{age}/{slug}"
            board_name = f"{theme_title} Coloring Pages" if is_en else f"{theme_title} Kleurplaten"
            tags = ' '.join(filter(None, [theme_tag, '#ColoringPages' if is_en else '#Kleurplaten',
                                          '#FreePrintable' if is_en else '#GratisPrinten',
                                          '#ColoringSheet' if is_en else '#Kleurplaat']))
            if is_en:
                description = (
                    f"Free printable {title} coloring page for {age_label}. Print the high-resolution A4 template "
                    f"or color it online. Download free at ColorVaults.com. {tags}"
                )
                pin_title = f"{title} - Free Printable Coloring Page"
            else:
                description = (
                    f"Gratis printbare {title} kleurplaat voor {age_label}. Print het hoge-resolutie A4-sjabloon "
                    f"of kleur het online in. Gratis downloaden op ColorVaults.com. {tags}"
                )
                pin_title = f"{title} - Gratis printbare kleurplaat"

            pins.append({
                'Title': pin_title[:100],
                'Media URL': image_url,
                'Ping URL': image_url,
                'Description': description[:500],
                'Destination Link': dest_url,
                'Board Name': board_name[:50],
            })

    output_dir.mkdir(parents=True, exist_ok=True)
    out_file = output_dir / f'pinterest_pins_{lang}.csv'
    temporary_file = out_file.with_suffix('.csv.tmp')
    with temporary_file.open('w', newline='', encoding='utf-8') as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDNAMES, dialect='excel', lineterminator='\r\n')
        writer.writeheader()
        writer.writerows(pins)
    temporary_file.replace(out_file)

    print(f"Generated {len(pins)} Pinterest pins for '{lang}' ({skipped} skipped) -> {out_file}")


def main():
    repository_root = Path(__file__).resolve().parent.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data-dir', type=Path, default=repository_root / 'src' / 'data')
    parser.add_argument('--output-dir', type=Path, default=repository_root / 'public')
    parser.add_argument('--language', choices=('en', 'nl', 'both'), default='both')
    args = parser.parse_args()

    languages = ('en', 'nl') if args.language == 'both' else (args.language,)
    for language in languages:
        generate_feed(args.data_dir.resolve(), args.output_dir.resolve(), language)

if __name__ == '__main__':
    main()
