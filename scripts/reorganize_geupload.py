import os
import shutil

GEUPLOAD_DIR = r'C:\Users\Gebruiker\Desktop\colorvaults\Geupload'

# Mapping of old/fragmented folders to target main folders
MERGE_MAP = {
    'Anime Algemeen': 'Anime',
    'Celtic Patterns': 'Mandalas',
    'Cozy Life': 'Cozy Life Hygge',
    'Fantasy Kingdom': 'Fantasy Creatures',
    'Generatie 2 Johto': 'Generatie 1 Kanto',
    'Generatie 5 Unova': 'Generatie 1 Kanto',
    'Generatie 9 Paldea': 'Generatie 1 Kanto',
    'Kawaii': 'Creepy Kawaii',
    'Large Print Flowers': 'Flowers Botanical',
}

print("=== REORGANIZING GEUPLOAD DIRECTORY ===")

if not os.path.exists(GEUPLOAD_DIR):
    print(f"Directory {GEUPLOAD_DIR} not found!")
    exit(1)

moved_files = 0
for src_folder, target_folder in MERGE_MAP.items():
    src_path = os.path.join(GEUPLOAD_DIR, src_folder)
    target_path = os.path.join(GEUPLOAD_DIR, target_folder)

    if os.path.exists(src_path):
        os.makedirs(target_path, exist_ok=True)
        print(f"Merging '{src_folder}' -> '{target_folder}'...")
        
        for file in os.listdir(src_path):
            src_file = os.path.join(src_path, file)
            if os.path.isfile(src_file):
                dest_file = os.path.join(target_path, file)
                
                # Collision handling
                base, ext = os.path.splitext(file)
                counter = 1
                while os.path.exists(dest_file):
                    dest_file = os.path.join(target_path, f"{base}_{counter}{ext}")
                    counter += 1
                
                shutil.move(src_file, dest_file)
                moved_files += 1
        
        # Remove empty source folder
        try:
            os.rmdir(src_path)
            print(f"   Removed source folder '{src_folder}'")
        except Exception as e:
            print(f"   Could not remove folder '{src_folder}': {e}")

# Handle Default and Unsorted folders
for sys_folder in ['Default', 'Unsorted']:
    sys_path = os.path.join(GEUPLOAD_DIR, sys_folder)
    if os.path.exists(sys_path):
        print(f"Cleaning up system folder '{sys_folder}'...")
        for file in os.listdir(sys_path):
            src_file = os.path.join(sys_path, file)
            if os.path.isfile(src_file):
                # Classify based on filename or move to Animals/Anime fallback
                fn_lower = file.lower()
                if 'anime' in fn_lower or 'naruto' in fn_lower or 'goku' in fn_lower:
                    target_folder = 'Anime'
                elif 'space' in fn_lower or 'astronaut' in fn_lower:
                    target_folder = 'Space'
                else:
                    target_folder = 'Cute Pets Animals'
                
                target_path = os.path.join(GEUPLOAD_DIR, target_folder)
                os.makedirs(target_path, exist_ok=True)
                dest_file = os.path.join(target_path, file)
                
                base, ext = os.path.splitext(file)
                counter = 1
                while os.path.exists(dest_file):
                    dest_file = os.path.join(target_path, f"{base}_{counter}{ext}")
                    counter += 1
                
                shutil.move(src_file, dest_file)
                moved_files += 1
        try:
            os.rmdir(sys_path)
            print(f"   Removed folder '{sys_folder}'")
        except Exception as e:
            print(f"   Could not remove folder '{sys_folder}': {e}")

print(f"\nCompleted reorganization! Total files consolidated: {moved_files}")
