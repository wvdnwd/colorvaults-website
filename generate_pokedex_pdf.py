import urllib.request
import json
import os
import sys

try:
    from fpdf import FPDF
except ImportError:
    print("fpdf is not installed. Please run 'pip install fpdf2' first.")
    sys.exit(1)

def generate_pdf():
    print("Fetching Pokemon data from PokeAPI...")
    url = "https://pokeapi.co/api/v2/pokemon?limit=1025"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    data = json.loads(response.read())
    
    pokemon_names = [p['name'].replace('-', ' ').title() for p in data['results']]
    
    print("Generating PDF with prompts...")
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    # Title
    pdf.set_font("Helvetica", style="B", size=16)
    pdf.cell(0, 10, text="Pokemon Coloring Page Prompts (1 - 1025)", new_x="LMARGIN", new_y="NEXT", align='C')
    pdf.ln(10)
    
    pdf.set_font("Helvetica", size=10)
    
    for i, name in enumerate(pokemon_names):
        gen = ""
        if i < 151: gen = "Generatie 1 (Kanto)"
        elif i < 251: gen = "Generatie 2 (Johto)"
        elif i < 386: gen = "Generatie 3 (Hoenn)"
        elif i < 493: gen = "Generatie 4 (Sinnoh)"
        elif i < 649: gen = "Generatie 5 (Unova)"
        elif i < 721: gen = "Generatie 6 (Kalos)"
        elif i < 809: gen = "Generatie 7 (Alola)"
        elif i < 905: gen = "Generatie 8 (Galar/Hisui)"
        else: gen = "Generatie 9 (Paldea)"
        
        prompt = f"#{i+1} {name} ({gen}): black and white coloring page, clean line art, white background, no grayscale, no shading, no color, no text, printable composition, centered, strong silhouette, simple background, clear subject focus, {name} pokemon with a little bit of background decoration"
        
        pdf.multi_cell(0, 5, text=prompt)
        pdf.ln(2)
        
    output_path = r"C:\Users\Gebruiker\Desktop\Hetzner website\Pokemon_Kleurplaten_Prompts.pdf"
    pdf.output(output_path)
    print(f"PDF successfully saved to {output_path}")

if __name__ == "__main__":
    generate_pdf()
