#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
pinterest_auto_poster.py - ColorVaults Automatic Pinterest Bot (API v5)

Features:
- Rotates across all 11 main hubs & 157 themes.
- Fetches board list or creates boards automatically for categories.
- Uses Pinterest API v5 `image_url` to pin directly from DigitalOcean Spaces CDN.
- Formats rich SEO titles, descriptions, and hashtags.
- Keeps track of posted pins in `posted_pins.json` to prevent duplicates.
- Supports DRY_RUN mode for testing without an API key.
"""

import os
import sys
import json
import random
import time
import urllib.error
import urllib.request
import urllib.parse
from pathlib import Path

# Fix stdout encoding for Windows
if sys.platform == 'win32' and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / 'src' / 'data'
STATE_FILE = BASE_DIR / 'scripts' / 'posted_pins.json'

# Pinterest Configuration from Environment (GitHub Secrets)
PINTEREST_TOKEN = os.getenv('PINTEREST_ACCESS_TOKEN', '').strip()
DEFAULT_BOARD_ID = os.getenv('PINTEREST_DEFAULT_BOARD_ID', '').strip()
DRY_RUN = os.getenv('DRY_RUN', 'false').lower() in ('true', '1', 'yes') or not PINTEREST_TOKEN
POST_LANG = os.getenv('POST_LANG', 'both') # 'en', 'nl', or 'both'

API_BASE = 'https://api.pinterest.com/v5'

def load_posted_history():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_posted_history(history_set):
    try:
        recent = list(history_set)[-10000:]
        with open(STATE_FILE, 'w', encoding='utf-8') as f:
            json.dump(recent, f, indent=2)
    except Exception as e:
        print(f"Warning: Could not save posted history: {e}")

def get_user_boards(token):
    if not token:
        return {}
    url = f"{API_BASE}/boards?page_size=100"
    req = urllib.request.Request(url, headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'User-Agent': 'ColorVaults-Pinterest-Bot/1.0'
    })
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            boards = {b['name'].lower(): b['id'] for b in data.get('items', [])}
            return boards
    except Exception as e:
        print(f"Error fetching boards from Pinterest: {e}")
        return {}

def create_board(token, name, description=""):
    if not token:
        return f"mock_board_{name.lower().replace(' ', '_')}"
    url = f"{API_BASE}/boards"
    payload = json.dumps({
        'name': name[:50],
        'description': description[:500],
        'privacy': 'PUBLIC'
    }).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'User-Agent': 'ColorVaults-Pinterest-Bot/1.0'
    }, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"Created new Pinterest board: '{name}' (ID: {data.get('id')})")
            return data.get('id')
    except Exception as e:
        print(f"Failed to create board '{name}': {e}")
        return None

def create_pin(token, board_id, title, description, link, image_url):
    if not token or DRY_RUN:
        print("\n[DRY RUN] Would publish Pin to Pinterest:")
        print(f"  - Board:       {board_id}")
        print(f"  - Title:       {title}")
        print(f"  - Description: {description}")
        print(f"  - Link:        {link}")
        print(f"  - Image:       {image_url}")
        return True, "dry_run_success"

    url = f"{API_BASE}/pins"
    payload = json.dumps({
        'board_id': board_id,
        'title': title[:100],
        'description': description[:500],
        'link': link,
        'media_source': {
            'source_type': 'image_url',
            'url': image_url
        }
    }).encode('utf-8')

    req = urllib.request.Request(url, data=payload, headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'User-Agent': 'ColorVaults-Pinterest-Bot/1.0'
    }, method='POST')

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pin_id = data.get('id')
            print(f"SUCCESS: Pin created! ID: {pin_id}")
            return True, pin_id
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"Pinterest API HTTP Error {e.code}: {error_body}")
        return False, error_body
    except Exception as e:
        print(f"Error publishing pin: {e}")
        return False, str(e)

def select_candidate_pages(lang='en', count=1):
    lang_dir = DATA_DIR / lang
    themes_file = lang_dir / 'themes.json'
    themes_data_dir = lang_dir / 'themes-data'
    
    if not themes_file.exists() or not themes_data_dir.exists():
        print(f"Themes directory missing for lang: {lang}")
        return []

    with open(themes_file, 'r', encoding='utf-8') as f:
        themes = json.load(f)

    shuffled_themes = list(themes)
    random.shuffle(shuffled_themes)

    posted_history = load_posted_history()
    candidates = []

    for theme in shuffled_themes:
        theme_slug = theme['slug']
        theme_json = themes_data_dir / f"{theme_slug}.json"
        if not theme_json.exists():
            continue

        with open(theme_json, 'r', encoding='utf-8') as f:
            pages = json.load(f)

        unposted = [p for p in pages if p.get('slug') not in posted_history]
        if not unposted:
            unposted = pages

        if unposted:
            chosen = random.choice(unposted)
            candidates.append((chosen, theme))
            if len(candidates) >= count:
                break

    return candidates

def format_pin_data(page, theme, lang='en'):
    is_en = lang == 'en'
    title = page.get('title', 'Coloring Page')
    theme_title = theme.get('title', 'Coloring Pages')
    age = page.get('ageGroup', 'kids')
    image_url = page.get('image', '')
    parent_hub = page.get('parentHub', 'collections')
    parent_theme = page.get('parentTheme', theme.get('slug', 'all'))
    slug = page.get('slug', '')

    dest_link = f"https://www.colorvaults.com/{lang}/{parent_hub}/{parent_theme}/{age}/{slug}"
    board_name = f"{theme_title} Coloring Pages" if is_en else f"{theme_title} Kleurplaten"
    clean_theme_tag = theme_title.replace(' ', '').replace('&', '').replace('-', '')
    
    if is_en:
        pin_title = f"{title} — Free Printable Coloring Page"
        pin_desc = (
            f"Free printable {title} coloring sheet! High-resolution A4 template perfect for {age} and creative artists. "
            f"Download or color online directly at ColorVaults. #{clean_theme_tag} #ColoringPages #FreePrintable #ColoringSheet #ArtForKids"
        )
    else:
        pin_title = f"{title} — Gratis Printbare Kleurplaat"
        pin_desc = (
            f"Gratis printbare {title} kleurplaat! Hoge kwaliteit A4 sjabloon voor {age} en creatief plezier. "
            f"Direct downloaden, printen of online inkleuren op ColorVaults. #{clean_theme_tag} #Kleurplaten #GratisPrinten #Kleurplaat #Knutselen"
        )

    return {
        'title': pin_title[:100],
        'description': pin_desc[:500],
        'link': dest_link,
        'image_url': image_url,
        'board_name': board_name[:50],
        'slug': slug
    }

def main():
    print("==================================================")
    print("      ColorVaults - Pinterest Auto Poster        ")
    print("==================================================")
    
    if not PINTEREST_TOKEN:
        print("NOTICE: PINTEREST_ACCESS_TOKEN is not set.")
        print("Running in DRY_RUN mode to simulate post generation.\n")

    history = load_posted_history()
    print(f"Loaded {len(history)} previously posted pin records.")

    langs_to_run = ['en', 'nl'] if POST_LANG == 'both' else [POST_LANG]
    boards = get_user_boards(PINTEREST_TOKEN)
    if boards:
        print(f"Fetched {len(boards)} boards from Pinterest.")

    success_count = 0

    for lang in langs_to_run:
        print(f"\n--- Selecting Pin for [{lang.upper()}] ---")
        candidates = select_candidate_pages(lang=lang, count=1)
        if not candidates:
            print(f"No pages found for language {lang}")
            continue

        page, theme = candidates[0]
        pin_data = format_pin_data(page, theme, lang=lang)

        board_name = pin_data['board_name']
        board_id = boards.get(board_name.lower()) or DEFAULT_BOARD_ID

        if not board_id and PINTEREST_TOKEN and not DRY_RUN:
            print(f"Board '{board_name}' not found on account. Creating it now...")
            board_id = create_board(PINTEREST_TOKEN, board_name, f"Free printable {theme.get('title')} coloring pages from ColorVaults.com")
            if board_id:
                boards[board_name.lower()] = board_id
        if not board_id and DRY_RUN:
            board_id = f"mock_board_{theme.get('slug')}"
        if not board_id:
            print(f"Could not resolve or create Pinterest board '{board_name}'.")
            continue

        success, res = create_pin(
            token=PINTEREST_TOKEN,
            board_id=board_id,
            title=pin_data['title'],
            description=pin_data['description'],
            link=pin_data['link'],
            image_url=pin_data['image_url']
        )

        if success:
            if PINTEREST_TOKEN and not DRY_RUN:
                history.add(pin_data['slug'])
            success_count += 1
            time.sleep(1)

    if PINTEREST_TOKEN and not DRY_RUN:
        save_posted_history(history)
    print(f"\nCompleted run: {success_count} pins processed successfully.")

if __name__ == '__main__':
    main()
