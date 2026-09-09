import os
import json
import random
import urllib.request
import urllib.error
import time

PINTEREST_API = "https://api.pinterest.com/v5"
ACCESS_TOKEN = os.environ.get("PINTEREST_ACCESS_TOKEN")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "src", "data", "en", "coloring-pages.json")
HISTORY_PATH = os.path.join(BASE_DIR, "scripts", "pinned_history.json")

# Map your 10 Master Hubs to exact existing Pinterest Board Names
HUB_TO_BOARD_NAME = {
    "disney-pixar": "Disney & Pixar Coloring Pages",
    "anime-manga": "Anime & Manga Coloring Pages",
    "gaming-virtual-worlds": "Gaming & Minecraft Coloring Pages",
    "superheroes-comic-universes": "Superheroes & Marvel Coloring Pages",
    "kids-tv-shows": "Kids TV Shows & Cartoons",
    "animals-wildlife": "Cute Animals & Pets Coloring Pages",
    "fantasy-fairytales": "Fantasy, Fairy Tales & Princesses",
    "vehicles-transportation": "Gaming & Minecraft Coloring Pages",
    "art-aesthetic": "Mandala & Adult Coloring Pages",
    "holidays-seasons": "Coloring Calendars & Planners 2026",
    "crafts-diy-learning": "School & Educational Worksheets",
}

DEFAULT_BOARD_NAME = "Disney & Pixar Coloring Pages"

def api_request(endpoint, method="GET", data=None):
    if not ACCESS_TOKEN:
        raise ValueError("PINTEREST_ACCESS_TOKEN environment variable is not set!")
    
    url = f"{PINTEREST_API}/{endpoint.lstrip('/')}"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        print(f"API Error ({e.code}) on {url}: {err_msg}")
        return None
    except Exception as e:
        print(f"Request Error: {e}")
        return None

def get_or_create_boards():
    """Fetch existing boards."""
    print("Fetching existing Pinterest boards...")
    resp = api_request("/boards?page_size=100")
    boards = {}
    
    if resp and "items" in resp:
        for b in resp["items"]:
            boards[b["name"].lower().strip()] = b["id"]
            print(f"  - Board: {b['name']} (ID: {b['id']})")
            
    return boards

def load_history():
    if os.path.exists(HISTORY_PATH):
        try:
            with open(HISTORY_PATH, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def save_history(history):
    os.makedirs(os.path.dirname(HISTORY_PATH), exist_ok=True)
    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(list(history)), f, indent=2)

def main(pins_to_post=6):
    print("Starting ColorVaults Pinterest Auto-Poster...")
    
    if not ACCESS_TOKEN:
        print("ERROR: PINTEREST_ACCESS_TOKEN is missing.")
        return

    if not os.path.exists(DATA_PATH):
        print(f"ERROR: Data file not found at {DATA_PATH}")
        return

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        all_pages = json.load(f)

    print(f"Loaded {len(all_pages)} coloring pages from database.")
    
    history = load_history()
    print(f"Already pinned in history: {len(history)} pages.")

    # Filter out already pinned pages and pages without valid images
    available = [p for p in all_pages if p.get("slug") not in history and p.get("image")]
    if not available:
        print("All pages have been pinned! Resetting history...")
        history = set()
        available = [p for p in all_pages if p.get("image")]

    random.shuffle(available)
    selected = available[:pins_to_post]

    boards = get_or_create_boards()
    if not boards:
        print("ERROR: Could not fetch boards. Please check your token scopes.")
        return

    posted_count = 0
    for page in selected:
        hub = page.get("parentHub", "")
        theme = page.get("parentTheme", "")
        age = page.get("ageGroup", "kids")
        slug = page.get("slug", "")
        title = page.get("title", "Free Coloring Page")
        img_url = page.get("image") or page.get("downloadableFile")
        
        target_board_name = HUB_TO_BOARD_NAME.get(hub, DEFAULT_BOARD_NAME)
        board_id = boards.get(target_board_name.lower().strip())
        
        if not board_id:
            # Fallback to any board available
            board_id = list(boards.values())[0]

        page_url = f"https://www.colorvaults.com/en/{hub}/{theme}/{age}/{slug}"
        
        pin_title = f"{title} - Free Coloring Page"
        if len(pin_title) > 100:
            pin_title = pin_title[:97] + "..."

        pin_desc = (
            f"Free printable {title} coloring page! High-resolution A4 & Letter PDF format ready to print at home or school. "
            f"100% free with no sign-up required on ColorVaults.com. #coloringpages #printables #{theme.replace('-', '')} #colorvaults"
        )
        if len(pin_desc) > 500:
            pin_desc = pin_desc[:497] + "..."

        pin_payload = {
            "board_id": board_id,
            "title": pin_title,
            "description": pin_desc,
            "link": page_url,
            "media_source": {
                "source_type": "image_url",
                "url": img_url,
            }
        }

        print(f"\nPosting pin: '{pin_title}' -> Board: '{target_board_name}'...")
        res = api_request("/pins", method="POST", data=pin_payload)
        
        if res and "id" in res:
            print(f"SUCCESS! Pin created with ID: {res['id']}")
            history.add(slug)
            posted_count += 1
        else:
            print(f"FAILED to post pin for {slug}")
        
        time.sleep(2)

    save_history(history)
    print(f"\nDone! Successfully posted {posted_count}/{len(selected)} pins to Pinterest.")

if __name__ == "__main__":
    count = int(os.environ.get("PINS_PER_RUN", "6"))
    main(pins_to_post=count)
