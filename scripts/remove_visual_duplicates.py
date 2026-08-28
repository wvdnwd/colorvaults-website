import os
import hashlib
import shutil

GEUPLOAD_DIR = r'C:\Users\Gebruiker\Desktop\colorvaults\Geupload'

print("=== REMOVING EXACT VISUAL DUPLICATES FROM GEUPLOAD ===")

md5_map = {}
deleted_count = 0
reclassified_count = 0

# 1. Deduplicate by MD5 Hash
for root, dirs, files in os.walk(GEUPLOAD_DIR):
    for f in sorted(files):
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            full_path = os.path.join(root, f)
            try:
                with open(full_path, 'rb') as fp:
                    h = hashlib.md5(fp.read()).hexdigest()
                
                if h in md5_map:
                    # Remove duplicate file
                    os.remove(full_path)
                    deleted_count += 1
                else:
                    md5_map[h] = full_path
            except Exception as e:
                print(f"Error reading {full_path}: {e}")

print(f"Successfully deleted {deleted_count} exact visual duplicate files from disk!")

# 2. Re-classify Misplaced Files based on filename keywords
print("\n=== RE-CLASSIFYING MISPLACED FILES ===")

RECLASSIFY_RULES = [
    # (keyword in filename, current wrong folder, correct target folder)
    (['robot', 'cyberpunk'], 'Birds', 'Robots'),
    (['samurai', 'ninja', 'ramen', 'noodles', 'armor'], 'Birds', 'Ninjas Samurais'),
    (['duck', 'duckling'], 'Cars Trucks', 'Birds'),
    (['fox', 'cat', 'dog', 'puppy', 'kitten'], 'Cars Trucks', 'Cute Pets Animals'),
    (['butterfly'], 'Cars Trucks', 'Butterflies Insects'),
    (['dragon'], 'Cars Trucks', 'Dragons'),
]

for root, dirs, files in os.walk(GEUPLOAD_DIR):
    current_folder = os.path.basename(root)
    for f in files:
        if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            continue
        
        fn_lower = f.lower()
        src_file = os.path.join(root, f)
        
        for keywords, wrong_folder, target_folder in RECLASSIFY_RULES:
            if current_folder == wrong_folder and any(kw in fn_lower for kw in keywords):
                target_dir = os.path.join(GEUPLOAD_DIR, target_folder)
                os.makedirs(target_dir, exist_ok=True)
                dest_file = os.path.join(target_dir, f)
                
                base, ext = os.path.splitext(f)
                counter = 1
                while os.path.exists(dest_file):
                    dest_file = os.path.join(target_dir, f"{base}_{counter}{ext}")
                    counter += 1
                
                shutil.move(src_file, dest_file)
                reclassified_count += 1
                print(f"   Moved misplaced file '{f}' from [{wrong_folder}] -> [{target_folder}]")
                break

print(f"Reclassified {reclassified_count} misplaced files into their correct folders.")
