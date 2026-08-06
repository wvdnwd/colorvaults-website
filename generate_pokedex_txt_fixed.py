import urllib.request
import json

def generate_txt():
    print("Fetching Pokemon data from PokeAPI...")
    url = "https://pokeapi.co/api/v2/pokemon?limit=1025"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read())
    
    pokemon_names = [p['name'].replace('-', ' ').title() for p in data['results']]
    
    output_path = r"C:\Users\Gebruiker\Desktop\Hetzner website\Pokemon_Kleurplaten_Prompts.txt"
    
    generations = {
        "Generatie 1 (Kanto)": (1, 151),
        "Generatie 2 (Johto)": (152, 251),
        "Generatie 3 (Hoenn)": (252, 386),
        "Generatie 4 (Sinnoh)": (387, 493),
        "Generatie 5 (Unova)": (494, 649),
        "Generatie 6 (Kalos)": (650, 721),
        "Generatie 7 (Alola)": (722, 809),
        "Generatie 8 (Galar, Hisui)": (810, 905),
        "Generatie 9 (Paldea)": (906, 1025)
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("# Pokemon\n")
        
        for gen_name, (start, end) in generations.items():
            f.write(f"## {gen_name} - Teens\n")
            for i in range(start - 1, end):
                name = pokemon_names[i]
                
                # Removed the #0001 because it might confuse AI generators and made the name more prominent
                prompt = f"[L3] black and white coloring page, clean line art, white background, no grayscale, no shading, no color, no text, printable composition, centered, strong silhouette, decorative elements, layered composition, cleaner complexity, expressive scene, highly detailed environment, the Pokemon {name}, recognizable official character design, {name} in a detailed natural habitat with rich intricate decorative scenery\n"
                f.write(prompt)
                
    print(f"TXT successfully saved to {output_path}")

if __name__ == "__main__":
    generate_txt()
