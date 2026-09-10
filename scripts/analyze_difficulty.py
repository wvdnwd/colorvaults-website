#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
analyze_difficulty.py - Analyzes coloring page images and assigns difficulty levels
based on pixel density (percentage of dark/black pixels).

Easy:   < 12% dark pixels → simple shapes, thick lines (kids)
Medium: 12–28% dark pixels → moderate detail (teens)
Hard:   > 28% dark pixels → highly detailed, intricate (adults)

Output: scripts/difficulty_cache.json
"""

import os
import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow is required. Run: pip install pillow")
    sys.exit(1)

# Directories to scan
INPUT_DIRS = [
    r'C:\Users\Gebruiker\Desktop\colorvaults\Geupload',
    r'C:\Users\Gebruiker\Desktop\colorvaults\Gecontroleerd',
]

SKIP_FOLDERS = {'Afgekeurd', 'Twijfel_Score_6', 'Afgekeurd_of_Twijfel', 'Dubbele_Fotos', 'Te_Herstellen', 'Geupload'}

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'difficulty_cache.json')

EASY_THRESHOLD = 0.12   # <12% dark pixels → easy
HARD_THRESHOLD = 0.28   # >28% dark pixels → hard


def analyze_image(filepath):
    """
    Returns difficulty: 'easy', 'medium', or 'hard'
    Based on percentage of dark pixels (brightness < 128)
    """
    try:
        with Image.open(filepath) as img:
            # Convert to grayscale for analysis
            gray = img.convert('L')
            
            # Resize to max 200x200 for speed (accuracy is preserved)
            gray.thumbnail((200, 200), Image.LANCZOS)
            
            pixels = list(gray.getdata())
            total = len(pixels)
            if total == 0:
                return 'medium'
            
            # Count dark pixels (brightness < 128 = likely ink/outline)
            dark = sum(1 for p in pixels if p < 128)
            ratio = dark / total
            
            if ratio < EASY_THRESHOLD:
                return 'easy'
            elif ratio > HARD_THRESHOLD:
                return 'hard'
            else:
                return 'medium'
    except Exception as e:
        # If we can't read the image, default to medium
        return 'medium'


def get_relative_key(filepath, base_dir):
    """Returns path relative to base_dir with forward slashes"""
    rel = os.path.relpath(filepath, base_dir)
    return rel.replace('\\', '/')


def main():
    # Load existing cache if available (to avoid re-analyzing)
    cache = {}
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Loaded {len(cache)} cached results.")

    extensions = {'.png', '.jpg', '.jpeg', '.webp'}
    analyzed = 0
    skipped = 0
    
    for base_dir in INPUT_DIRS:
        if not os.path.exists(base_dir):
            print(f"Skipping (not found): {base_dir}")
            continue
        
        for folder in os.listdir(base_dir):
            folder_path = os.path.join(base_dir, folder)
            if not os.path.isdir(folder_path):
                continue
            if folder in SKIP_FOLDERS:
                continue
            
            for root, dirs, files in os.walk(folder_path):
                # Skip excluded folders at any depth
                dirs[:] = [d for d in dirs if d not in SKIP_FOLDERS]
                
                for filename in files:
                    if Path(filename).suffix.lower() not in extensions:
                        continue
                    
                    filepath = os.path.join(root, filename)
                    key = get_relative_key(filepath, base_dir)
                    
                    if key in cache:
                        skipped += 1
                        continue
                    
                    difficulty = analyze_image(filepath)
                    cache[key] = difficulty
                    analyzed += 1
                    
                    if analyzed % 100 == 0:
                        print(f"  Analyzed {analyzed} images... (last: {key} → {difficulty})")
                        # Save intermediate results
                        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                            json.dump(cache, f, indent=2)
    
    # Final save
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, indent=2)
    
    # Stats
    easy = sum(1 for v in cache.values() if v == 'easy')
    medium = sum(1 for v in cache.values() if v == 'medium')
    hard = sum(1 for v in cache.values() if v == 'hard')
    
    print(f"\n✅ Done!")
    print(f"  Newly analyzed: {analyzed}")
    print(f"  Skipped (cached): {skipped}")
    print(f"  Total in cache: {len(cache)}")
    total = len(cache)
    def percentage(count):
        return count / total * 100 if total else 0.0
    print(f"  Easy:   {easy} ({percentage(easy):.1f}%)")
    print(f"  Medium: {medium} ({percentage(medium):.1f}%)")
    print(f"  Hard:   {hard} ({percentage(hard):.1f}%)")
    print(f"  Output: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
