#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
filter_bad_images.py - Detecteert slechte kleurplaten:
  1. Afbeeldingen die >80% zwart zijn (bijna zwart blad)
  2. Afbeeldingen kleiner dan 40KB (waarschijnlijk blanco/kapot)
  3. Afbeeldingen die bijna volledig wit zijn (>95% wit, geen tekening)

Output: scripts/bad_images_report.csv
Verplaatst NIETS automatisch - gebruiker beslist zelf!
"""

import os
import json
import csv
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow is required. Run: pip install pillow")
    import sys
    sys.exit(1)

INPUT_DIRS = [
    r'C:\Users\Gebruiker\Desktop\colorvaults\Geupload',
    r'C:\Users\Gebruiker\Desktop\colorvaults\Gecontroleerd',
]

SKIP_FOLDERS = {'Afgekeurd', 'Twijfel_Score_6', 'Afgekeurd_of_Twijfel', 'Dubbele_Fotos', 'Te_Herstellen', 'Geupload'}

OUTPUT_CSV = os.path.join(os.path.dirname(__file__), 'bad_images_report.csv')

# Thresholds
MIN_FILE_SIZE_KB = 15         # WebP images can be 20-35KB and still be great quality
MAX_DARK_RATIO = 0.80         # >80% dark pixels = problematic
MAX_WHITE_RATIO = 0.998       # >99.8% white pixels = completely empty blank sheet


def analyze_image_quality(filepath):
    """
    Analyzes image quality and returns a dict with metrics.
    Returns None if file can't be opened.
    """
    try:
        file_size_kb = os.path.getsize(filepath) / 1024
        
        with Image.open(filepath) as img:
            # Convert to grayscale for pixel analysis
            gray = img.convert('L')
            
            # Resize for speed
            gray.thumbnail((200, 200), Image.LANCZOS)
            
            pixels = list(gray.getdata())
            total = len(pixels)
            if total == 0:
                return None
            
            dark = sum(1 for p in pixels if p < 80)     # Very dark pixels
            white = sum(1 for p in pixels if p > 240)    # Near-white pixels
            
            dark_ratio = dark / total
            white_ratio = white / total
            
            issues = []
            if file_size_kb < MIN_FILE_SIZE_KB:
                issues.append(f"TOO_SMALL ({file_size_kb:.1f}KB)")
            if dark_ratio > MAX_DARK_RATIO:
                issues.append(f"TOO_DARK ({dark_ratio*100:.1f}% dark)")
            if white_ratio > MAX_WHITE_RATIO:
                issues.append(f"NEARLY_BLANK ({white_ratio*100:.1f}% white)")
            
            return {
                'file_size_kb': round(file_size_kb, 1),
                'dark_ratio': round(dark_ratio, 3),
                'white_ratio': round(white_ratio, 3),
                'issues': ' | '.join(issues),
                'is_bad': len(issues) > 0
            }
    except Exception as e:
        return {
            'file_size_kb': 0,
            'dark_ratio': 0,
            'white_ratio': 0,
            'issues': f'ERROR: {str(e)[:50]}',
            'is_bad': True
        }


def main():
    print("ColorVaults - Bad Images Filter")
    print("=" * 50)
    print(f"Thresholds: >80% dark = bad | <{MIN_FILE_SIZE_KB}KB = suspicious | >97% white = blank")
    print()
    
    extensions = {'.png', '.jpg', '.jpeg', '.webp'}
    
    bad_files = []
    total_scanned = 0
    
    for base_dir in INPUT_DIRS:
        if not os.path.exists(base_dir):
            print(f"Skipping (not found): {base_dir}")
            continue
        
        print(f"Scanning: {base_dir}")
        
        for folder in sorted(os.listdir(base_dir)):
            folder_path = os.path.join(base_dir, folder)
            if not os.path.isdir(folder_path):
                continue
            if folder in SKIP_FOLDERS:
                continue
            
            for root, dirs, files in os.walk(folder_path):
                dirs[:] = [d for d in dirs if d not in SKIP_FOLDERS]
                
                for filename in files:
                    if Path(filename).suffix.lower() not in extensions:
                        continue
                    
                    filepath = os.path.join(root, filename)
                    total_scanned += 1
                    
                    result = analyze_image_quality(filepath)
                    if result and result['is_bad']:
                        rel_path = os.path.relpath(filepath, base_dir)
                        bad_files.append({
                            'path': filepath,
                            'relative_path': rel_path,
                            'folder': folder,
                            'filename': filename,
                            'file_size_kb': result['file_size_kb'],
                            'dark_ratio_pct': f"{result['dark_ratio']*100:.1f}%",
                            'white_ratio_pct': f"{result['white_ratio']*100:.1f}%",
                            'issues': result['issues'],
                        })
                        
                    if total_scanned % 500 == 0:
                        print(f"  Scanned {total_scanned} images, found {len(bad_files)} bad ones...")
    
    # Write CSV report
    if bad_files:
        with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['path', 'relative_path', 'folder', 'filename', 'file_size_kb', 'dark_ratio_pct', 'white_ratio_pct', 'issues'])
            writer.writeheader()
            writer.writerows(bad_files)
    
    print(f"\nDone!")
    print(f"  Total scanned: {total_scanned}")
    print(f"  Bad images found: {len(bad_files)}")
    print(f"  Bad rate: {len(bad_files)/total_scanned*100:.1f}%")
    
    # Group by issue type
    too_dark = [f for f in bad_files if 'TOO_DARK' in f['issues']]
    too_small = [f for f in bad_files if 'TOO_SMALL' in f['issues']]
    blank = [f for f in bad_files if 'NEARLY_BLANK' in f['issues']]
    
    print(f"  - Too dark (>80% black): {len(too_dark)}")
    print(f"  - Too small (<{MIN_FILE_SIZE_KB}KB): {len(too_small)}")
    print(f"  - Nearly blank (>97% white): {len(blank)}")
    
    if bad_files:
        print(f"\nReport saved to: {OUTPUT_CSV}")
        print("Open the CSV in Excel to review and decide which files to delete.")
        print()
        print("Top 10 worst files:")
        sorted_bad = sorted(bad_files, key=lambda x: x['dark_ratio_pct'], reverse=True)[:10]
        for f in sorted_bad:
            print(f"  {f['relative_path'][:60]} -- {f['issues']}")
    else:
        print("No bad images found!")


if __name__ == '__main__':
    main()
