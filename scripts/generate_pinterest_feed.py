#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate validated Pinterest bulk-upload CSV files."""

import argparse
import csv
import io
import json
import re
from pathlib import Path
from urllib.parse import urlsplit


ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / 'src' / 'data'
OUTPUT_FILES = {
    'en': ROOT_DIR / 'public' / 'pinterest_pins_en.csv',
    'nl': ROOT_DIR / 'public' / 'pinterest_pins_nl.csv',
}
REJECTED_FILES = {
    'en': ROOT_DIR / 'public' / 'pinterest_pins_en_rejected.csv',
    'nl': ROOT_DIR / 'public' / 'pinterest_pins_nl_rejected.csv',
}
FIELD_NAMES = ['Title', 'Media URL', 'Ping URL', 'Description', 'Destination Link', 'Board Name']
REJECTED_FIELD_NAMES = ['Language', 'Row', 'Slug', 'Reason']
SUPPORTED_IMAGE_EXTENSIONS = {'.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp'}
SLUG_PATTERN = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
AGE_LABELS = {
    'en': {
        'toddlers': 'toddlers',
        'kids': 'children',
        'teens': 'teens',
        'adults': 'adults',
    },
    'nl': {
        'toddlers': 'peuters',
        'kids': 'kinderen',
        'teens': 'tieners',
        'adults': 'volwassenen',
    },
}


def load_json(path):
    with path.open('r', encoding='utf-8') as file:
        value = json.load(file)
    if not isinstance(value, list):
        raise ValueError(f'{path} must contain a JSON array')
    return value


def clean_text(value):
    return ' '.join(value.split()) if isinstance(value, str) else ''


def is_valid_https_url(value, require_image=False):
    if not isinstance(value, str) or not value or any(character.isspace() for character in value):
        return False
    try:
        parsed = urlsplit(value)
        parsed.port  # Access validates malformed port declarations.
        if parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password:
            return False
        if require_image:
            if Path(parsed.path).suffix.lower() not in SUPPORTED_IMAGE_EXTENSIONS:
                return False
            if parsed.path.lower().endswith('/default.jpg'):
                return False
        return True
    except ValueError:
        return False


def sanitize_hashtag(value):
    hashtag = ''.join(character for character in clean_text(value) if character.isalnum())
    return hashtag or 'ColorVaults'


def render_csv(rows, field_names):
    output = io.StringIO(newline='')
    writer = csv.DictWriter(output, fieldnames=field_names, lineterminator='\r\n')
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()


def build_feed(lang):
    lang_dir = DATA_DIR / lang
    pages = load_json(lang_dir / 'coloring-pages.json')
    themes = {
        theme.get('slug'): theme
        for theme in load_json(lang_dir / 'themes.json')
        if isinstance(theme, dict) and clean_text(theme.get('slug'))
    }
    hubs = {
        hub.get('slug'): hub
        for hub in load_json(lang_dir / 'main-hubs.json')
        if isinstance(hub, dict) and clean_text(hub.get('slug'))
    }
    pins = []
    rejected = []
    is_en = lang == 'en'

    for row_number, page in enumerate(pages, start=2):
        reasons = []
        if not isinstance(page, dict):
            rejected.append({'Language': lang, 'Row': row_number, 'Slug': '', 'Reason': 'row is not an object'})
            continue

        slug = clean_text(page.get('slug'))
        title = clean_text(page.get('title'))
        hub_slug = clean_text(page.get('parentHub'))
        theme_slug = clean_text(page.get('parentTheme'))
        age = clean_text(page.get('ageGroup'))
        image_url = clean_text(page.get('image'))
        theme = themes.get(theme_slug)
        hub = hubs.get(hub_slug)

        if not title:
            reasons.append('missing title')
        if not SLUG_PATTERN.fullmatch(slug):
            reasons.append('invalid slug')
        if not hub or not SLUG_PATTERN.fullmatch(hub_slug):
            reasons.append('unknown or invalid hub')
        if not theme or not SLUG_PATTERN.fullmatch(theme_slug):
            reasons.append('unknown or invalid theme')
        elif theme.get('parentHub') != hub_slug:
            reasons.append('theme does not belong to hub')
        if age not in AGE_LABELS[lang]:
            reasons.append('unknown age group')
        if not is_valid_https_url(image_url, require_image=True):
            reasons.append('invalid HTTPS media URL or image extension')

        destination_url = f'https://www.colorvaults.com/{lang}/{hub_slug}/{theme_slug}/{age}/{slug}'
        if not is_valid_https_url(destination_url):
            reasons.append('invalid destination URL')

        if reasons:
            rejected.append({
                'Language': lang,
                'Row': row_number,
                'Slug': slug,
                'Reason': '; '.join(reasons),
            })
            continue

        theme_title = clean_text(theme.get('title')) or ('Coloring Pages' if is_en else 'Kleurplaten')
        age_label = AGE_LABELS[lang][age]
        theme_hashtag = sanitize_hashtag(theme_title)
        board_name = f'{theme_title} Coloring Pages' if is_en else f'{theme_title} Kleurplaten'

        if is_en:
            description = (
                f'Free printable {title} coloring page! High-resolution template perfect for {age_label}. '
                'Print instantly on A4 or color online in your browser. Download 100% free at ColorVaults.com! '
                f'#{theme_hashtag} #ColoringPages #FreePrintable #ColoringSheet #ArtActivities'
            )
            pin_title = f'{title} — Free Printable Coloring Page'
        else:
            description = (
                f'Gratis printbare {title} kleurplaat! Hoge resolutie kleurplaat voor {age_label}. '
                'Direct afdrukken op A4 of online inkleuren in de browser. 100% gratis te downloaden op ColorVaults.com! '
                f'#{theme_hashtag} #Kleurplaten #GratisPrinten #KleurplaatVoorKinderen #Kleurboek'
            )
            pin_title = f'{title} — Gratis Printbare Kleurplaat'

        pins.append({
            'Title': pin_title[:100],
            'Media URL': image_url,
            'Ping URL': image_url,
            'Description': description[:500],
            'Destination Link': destination_url,
            'Board Name': board_name[:50],
        })

    return pins, rejected


def generate_feed(lang='en', check=False):
    pins, rejected = build_feed(lang)
    output_file = OUTPUT_FILES[lang]
    rejected_file = REJECTED_FILES[lang]
    rendered = render_csv(pins, FIELD_NAMES)

    if check:
        current = output_file.read_bytes().decode('utf-8') if output_file.exists() else None
        if current != rendered:
            print(f'STALE: {output_file}')
        if rejected:
            print(f'INVALID: {len(rejected)} rejected rows for {lang}')
        if current == rendered and not rejected:
            print(f'OK: {len(pins)} Pinterest pins for {lang}')
        return current == rendered and not rejected

    output_file.write_text(rendered, encoding='utf-8', newline='')
    if rejected:
        rejected_file.write_text(render_csv(rejected, REJECTED_FIELD_NAMES), encoding='utf-8', newline='')
        print(f'Rejected {len(rejected)} rows -> {rejected_file}')
    elif rejected_file.exists():
        rejected_file.unlink()

    print(f'Generated {len(pins)} Pinterest pins for {lang} -> {output_file}')
    return not rejected


def main():
    parser = argparse.ArgumentParser(description='Generate validated Pinterest bulk-upload CSV files.')
    parser.add_argument('--check', action='store_true', help='Validate inputs and fail if generated CSVs are stale; write nothing.')
    parser.add_argument('--language', choices=sorted(OUTPUT_FILES), action='append', help='Locale to process; repeat for multiple locales.')
    args = parser.parse_args()
    languages = args.language or list(OUTPUT_FILES)

    print('ColorVaults - Pinterest Feed Generator')
    results = [generate_feed(lang, check=args.check) for lang in languages]
    success = all(results)
    raise SystemExit(0 if success else 1)


if __name__ == '__main__':
    main()
