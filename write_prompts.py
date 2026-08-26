# -*- coding: utf-8 -*-
import os
import sys
import random
import re

# Add the directory containing generate_ultra_detailed_prompts_v3.py to sys.path
sys.path.append(r"c:\Users\Gebruiker\Desktop\colorvaults")

from generate_ultra_detailed_prompts_v3 import DATABASE, SUFFIXES, REQUESTED_COUNTS, generate_prompts_for_category

# Target files
OUTPUT_DESKTOP = r"C:\Users\Gebruiker\Desktop\Aangevulde_Prompts.txt"
OUTPUT_HETZNER = r"C:\Users\Gebruiker\Desktop\Hetzner website\flux-prompts.txt"
OUTPUT_CV_OUT = r"C:\Users\Gebruiker\Desktop\colorvaults\output\flux-prompts.txt"

# Add new databases for the new categories
NEW_DATABASE = {
    "Mandala - Animals": {
        "levels": ["L4"],
        "templates": [
            "A highly detailed Zentangle mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a majestic roaring lion with a dense flowing mane",
            "a soaring bald eagle with wide outstretched wings",
            "a peaceful sea turtle swimming gracefully",
            "a howling timber wolf looking toward the sky",
            "a proud peacock with a massive open tail fan",
            "a wise horned owl perched on a branch",
            "a wild stallion horse running in profile",
            "a beautiful monarch butterfly with open wings",
            "a sleeping tabby cat curled up in a circle",
            "a giant panda bear eating bamboo stalks"
        ],
        "actions": [
            "composed entirely of symmetrical interlocking geometric shapes",
            "filled with dense repeating zentangle patterns",
            "woven into a perfect circular mandala layout",
            "displaying elaborate floral and spiral textures",
            "divided into segments each filled with concentric rings of micro-patterns"
        ],
        "props": [
            "with fine line chevron and paisley textures on the body",
            "with micro-crosshatch lines on the feathers and scales",
            "with flowing parallel grain lines defining the features",
            "with detailed concentric ovals around the eyes"
        ],
        "scenery": [
            "against a background of a repeating circular geometric mandala",
            "surrounded by a complex circular border of floral swirls",
            "with the negative space filled with subtle star and leaf patterns",
            "enclosed in a thick double-lined circular lace frame"
        ]
    },
    "Mandala - Flowers": {
        "levels": ["L4"],
        "templates": [
            "A highly detailed floral mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a blooming sacred lotus flower with multiple layered petals",
            "a large fully open rose with elegant thorn details",
            "a symmetrical giant sunflower with a detailed seed disk",
            "a cluster of delicate orchids and cherry blossoms",
            "a complex dahlia flower with repeating overlapping petals",
            "a stylized water lily floating on a circular leaf"
        ],
        "actions": [
            "radiating outward from a central focal point",
            "forming a perfect circular kaleidoscope arrangement",
            "intertwined with flowing leaf vines in a symmetrical ring",
            "filled with intricate zentangle dots and lines"
        ],
        "props": [
            "each petal decorated with fine micro-hatching and swirls",
            "with the center disk filled with thousands of tiny circles",
            "with detailed parallel veins on every single leaf",
            "accented with delicate lace-like patterns on the edges"
        ],
        "scenery": [
            "enclosed in a circular border of scrolling ivy leaves",
            "against a negative space background of a repeating star pattern",
            "with a stylized repeating wave pattern in the background",
            "surrounded by a thick circular geometric frame"
        ]
    },
    "Mandala - Geometric": {
        "levels": ["L4"],
        "templates": [
            "A highly complex geometric mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a 3D sacred geometry star tetrahedron structure",
            "a series of interlocking concentric circles and squares",
            "a complex kaleidoscope design with repeating hexagonal symmetries",
            "a giant spiral composed of hundreds of tiny triangles",
            "a complex vector pattern of overlapping curved lines"
        ],
        "actions": [
            "creating a mesmerizing optical illusion depth effect",
            "weaving seamlessly under and over each other",
            "repeating in exact radial symmetry across the page",
            "composed of mathematically precise interlocking shapes"
        ],
        "props": [
            "with varying line weights to emphasize structure",
            "filled with dense parallel hatching and cross-hatching",
            "featuring micro-dots and stippling shading in the corners",
            "with clean sharp black lines and zero gray shading"
        ],
        "scenery": [
            "filling the entire canvas with no negative space",
            "framed within a thick outer circular border of key patterns",
            "with a subtle repeating grid texture in the background",
            "enclosed in a beautiful border of repeating small triangles"
        ]
    },
    "Mandala - Ocean": {
        "levels": ["L4"],
        "templates": [
            "An intricate oceanic mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a curled chambered nautilus shell in perfect golden ratio",
            "a symmetrical five-pointed starfish resting centered",
            "a pair of graceful koi fish swimming in a circular dance",
            "a majestic seahorse surrounded by flowing seaweed",
            "a large manta ray with detailed wing-like fins",
            "a giant octopus with coiled tentacles arranged in a circle"
        ],
        "actions": [
            "composed of intricate scales and wave-like textures",
            "woven into a circular marine themed composition",
            "swirling symmetrically around a central water splash",
            "filled with complex under-the-sea zentangle doodles"
        ],
        "props": [
            "with fish scale patterns covering the fins",
            "with tiny suction cup details on the curled tentacles",
            "with shell segments displaying interlocking chevron lines",
            "decorated with micro-swirls resembling sea foam"
        ],
        "scenery": [
            "surrounded by a circular border of bubbles and kelp",
            "against a background of repeating stylized wave crests",
            "enclosed in a circular rope-like border",
            "with a background filled with tiny repeating starfish and shells"
        ]
    },
    "Mandala - Celestial": {
        "levels": ["L4"],
        "templates": [
            "A cosmic celestial mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a crescent moon with a sleeping face nested in a blazing sun",
            "a giant symmetrical starburst galaxy with spiraling arms",
            "a central planet Saturn with its detailed rings",
            "a majestic sun god face radiating intense flames",
            "a map of constellations and shooting stars in a circle"
        ],
        "actions": [
            "radiating energy beams and cosmic dust trails",
            "arranged in a beautiful mystical astrological circle",
            "interwoven with stylized cloud bands and wind swirls",
            "composed of intricate celestial symbols and repeating stars"
        ],
        "props": [
            "with sun rays decorated with micro-chevron fills",
            "with the moon surface showing fine craters and lace designs",
            "with stars showing micro-lines and crosshatched centers",
            "accented with zodiac signs in a circular track"
        ],
        "scenery": [
            "against a dense background of repeating star grids",
            "surrounded by a circular border of stylized fluffy clouds",
            "enclosed in a border of repeating crescent moons and stars",
            "with a background of fine radiating lines from the center"
        ]
    },
    "Mandala - Celtic": {
        "levels": ["L4"],
        "templates": [
            "A highly detailed Celtic mandala coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a traditional Celtic cross with central ring",
            "a Celtic tree of life with deeply interwoven roots and branches",
            "two zoomorphic Celtic wolves intertwined in a circular knot",
            "a triple spiral triskelion emblem",
            "a Celtic shield medallion with central brass boss"
        ],
        "actions": [
            "displaying complex traditional over-and-under weaving",
            "composed of seamless interlocking ribbons and knots",
            "forming a highly detailed circular tribal design",
            "inspired by the ornate carvings of the Book of Kells"
        ],
        "props": [
            "with animal heads detailed with traditional carvings",
            "with ribbons filled with fine micro-hatching",
            "with traditional key patterns along the weave",
            "featuring step patterns and spirals in the corners"
        ],
        "scenery": [
            "surrounded by a thick border of repeating Celtic key knotwork",
            "filling the entire page with high-contrast black linework",
            "against a background of faint geometric knot designs",
            "enclosed in a circular frame of braided rope"
        ]
    },
    "Craft Sketches - Animals": {
        "levels": ["L2"],
        "templates": [
            "A child-friendly craft cutout coloring page featuring {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a cute cartoon puppy sitting down",
            "a chubby little kitten playing with a ball of yarn",
            "a happy hopping bunny rabbit with long ears",
            "a baby elephant holding a flower with its trunk",
            "a friendly teddy bear waving happily",
            "a smiling little monkey swinging from a branch"
        ],
        "actions": [
            "drawn with bold clean lines",
            "smiling warmly with a cheerful expression",
            "designed as a simple cutout template for kids"
        ],
        "props": [
            "surrounded by a clear dashed contour guide line for cutting",
            "with a dotted border line featuring a small scissors icon",
            "labeled with a scissor symbol on the cutting path"
        ],
        "scenery": [
            "spread across the page next to a second small animal design, clean white background",
            "laid out as multiple separate animal designs on a single sheet, white background",
            "presented with zero background details to make cutting easy, white background"
        ]
    },
    "Craft Sketches - Vehicles": {
        "levels": ["L2"],
        "templates": [
            "A simple vehicle cutout craft coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a cute cartoon race car with big wheels",
            "a friendly fire truck with a small ladder",
            "a simple space rocket with flame trails",
            "a steam locomotive train blowing puffy smoke",
            "a small helicopter with rotating blades",
            "a cute tugboat floating on a simple wave"
        ],
        "actions": [
            "drawn with thick clean outlines",
            "smiling with cartoon eyes on the windshield",
            "designed as a paper craft toy layout"
        ],
        "props": [
            "surrounded by a thick dashed cutting line",
            "with a dotted border marked with a scissors icon",
            "featuring clear outlines for easy scissor control"
        ],
        "scenery": [
            "arranged as three separate vehicle templates on one page, white background",
            "with blank negative space around the shapes for safe cutting, white background",
            "on a pure white background with zero background details"
        ]
    },
    "Craft Sketches - Princesses and Fairies": {
        "levels": ["L2"],
        "templates": [
            "A fairytale cutout craft coloring page showing {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a cute princess wearing a long ballgown and a crown",
            "a tiny flying fairy holding a magical star wand",
            "a friendly unicorn with a star-patterned mane",
            "a happy mermaid swimming with a shell necklace",
            "a simple castle tower with a waving flag"
        ],
        "actions": [
            "smiling happily with a magical expression",
            "waving to the viewer",
            "designed as a paper doll cutout template"
        ],
        "props": [
            "enclosed in a clean dotted scissor guide contour line",
            "with a bold dashed outline for cutting out",
            "featuring a small scissors symbol along the edge"
        ],
        "scenery": [
            "grouped as a collection of four mini fairytale designs on a single page, white background",
            "with clean white space surrounding each design, white background",
            "on a plain white background with zero background clutter"
        ]
    },
    "Craft Sketches - Space": {
        "levels": ["L2"],
        "templates": [
            "A simple space sticker cutout craft coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a friendly astronaut waving from a spacesuit",
            "a classic round UFO flying saucer with a small alien inside",
            "a cartoon crescent moon wearing a sleeping cap",
            "a smiling planet Saturn with clean rings",
            "a small rocket ship with three fins"
        ],
        "actions": [
            "floating happily in a simple pose",
            "smiling with large friendly eyes",
            "designed as a printable space sticker sheet"
        ],
        "props": [
            "surrounded by a clear dotted cutout guide line",
            "with a dashed contour line showing where to cut",
            "marked with small scissors icons along the border"
        ],
        "scenery": [
            "laid out as a sheet of five separate space shapes, white background",
            "on a pure white background with zero star or cloud details to make cutting easy",
            "with wide white spaces between the stickers, white background"
        ]
    },
    "Craft Sketches - Food and Sweets": {
        "levels": ["L2"],
        "templates": [
            "A cute food craft cutout coloring page displaying {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a smiling cupcake with thick frosting and a cherry",
            "a two-scoop ice cream cone with cherry on top",
            "a cute glazed donut with round sprinkles",
            "a slice of pizza with smiling eyes",
            "a cute glass of milkshake with a striped straw"
        ],
        "actions": [
            "smiling cheerfully",
            "designed as a play-food kitchen cutout",
            "drawn with bold cartoon outlines"
        ],
        "props": [
            "surrounded by a dashed contour border line",
            "featuring a dotted cut-out guide path",
            "with a small scissor illustration pointing to the line"
        ],
        "scenery": [
            "arranged as a set of sweet treats on a single coloring sheet, white background",
            "on a plain white background with zero background clutter",
            "with clean empty space around the shapes, white background"
        ]
    },
    "Craft Sketches - Monsters and Dinosaurs": {
        "levels": ["L2"],
        "templates": [
            "A child-friendly monster cutout craft coloring page of {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a friendly green monster with three eyes waving its arm",
            "a cute baby Tyrannosaurus Rex hatching from an egg",
            "a happy cartoon stegosaurus with diamond plate back scales",
            "a tiny flying dragon blowing a tiny flame cloud",
            "a fuzzy round monster with two small horns"
        ],
        "actions": [
            "smiling with a friendly non-scary expression",
            "waving happily",
            "designed as a paste-on scrapbook design"
        ],
        "props": [
            "enclosed in a bold dashed line for cutting out",
            "with a dotted outline showing scissor paths",
            "accompanied by a tiny scissors icon on the line"
        ],
        "scenery": [
            "arranged as a set of separate designs on one printable page, white background",
            "on a pure white background with no background illustrations",
            "with wide margins around the borders, white background"
        ]
    },
    "Coloring Calendars": {
        "levels": ["L2", "L3", "L4"],
        "templates": [
            "A printable coloring calendar page showing {subject} {action} {prop} {scenery}"
        ],
        "subjects": [
            "a blank monthly calendar grid template with a clean layout of five rows and seven columns",
            "a clean calendar day grid with empty squares for writing dates",
            "a monthly planner grid template with wide margins"
        ],
        "actions": [
            "surrounded by a beautiful border of spring tulips and butterflies",
            "surrounded by a border of summer seashells, palm trees, and suns",
            "surrounded by a border of autumn leaves, acorns, and pumpkins",
            "surrounded by a border of winter snowflakes, mittens, and pine trees",
            "framed within an intricate zentangle pattern border"
        ],
        "props": [
            "with a wide blank banner at the top for writing the name of the month",
            "with blank round circles in the corner of each day square for dates",
            "with clean white squares in the grid to keep writing legible"
        ],
        "scenery": [
            "organized neatly in the center of the page, white background",
            "on a clean white background, perfect for a personalized coloring calendar",
            "with the decorative elements strictly in the borders to leave the grid blank, white background"
        ]
    }
}

# Merge NEW_DATABASE into DATABASE
for key, val in NEW_DATABASE.items():
    DATABASE[key] = val

# Add the new requested categories to requested counts
NEW_REQUESTED_COUNTS = {
    "Mandala - Animals": 50,
    "Mandala - Flowers": 50,
    "Mandala - Geometric": 50,
    "Mandala - Ocean": 50,
    "Mandala - Celestial": 50,
    "Mandala - Celtic": 50,
    "Craft Sketches - Animals": 50,
    "Craft Sketches - Vehicles": 50,
    "Craft Sketches - Princesses and Fairies": 50,
    "Craft Sketches - Space": 50,
    "Craft Sketches - Food and Sweets": 50,
    "Craft Sketches - Monsters and Dinosaurs": 50,
    "Coloring Calendars": 50
}

for key, val in NEW_REQUESTED_COUNTS.items():
    REQUESTED_COUNTS[key] = val

def main():
    print("Generating all prompts...")
    output_lines = []
    output_lines.append("==================================================")
    output_lines.append("      COLORVAULTS - COMPREHENSIVE GENERATED PROMPTS")
    output_lines.append("==================================================")
    output_lines.append("Gegenereerd op: 2026-08-26\n")
    
    for cat_name, num_needed in sorted(REQUESTED_COUNTS.items()):
        print(f"Generating {num_needed} prompts for {cat_name}...")
        output_lines.append(f"# {cat_name}")
        
        prompts = generate_prompts_for_category(cat_name, num_needed)
        
        grouped = {}
        for p in prompts:
            lvl = p[1:3]
            if lvl not in grouped:
                grouped[lvl] = []
            grouped[lvl].append(p)
            
        level_to_age = {
            'L1': 'Toddlers',
            'L2': 'Kids',
            'L3': 'Teens',
            'L4': 'Adults'
        }
        
        for lvl in sorted(grouped.keys()):
            age_group = level_to_age[lvl]
            output_lines.append(f"## {cat_name} - {age_group}")
            for p in grouped[lvl]:
                output_lines.append(p)
                
        output_lines.append("")
        
    final_output = '\n'.join(output_lines)
    
    # Write to Desktop
    try:
        with open(OUTPUT_DESKTOP, 'w', encoding='utf-8') as f:
            f.write(final_output)
        print(f"Successfully wrote prompts to {OUTPUT_DESKTOP}")
    except Exception as e:
        print(f"Error writing to {OUTPUT_DESKTOP}: {e}")
    
    # Write to Hetzner website workspace
    try:
        with open(OUTPUT_HETZNER, 'w', encoding='utf-8') as f:
            f.write(final_output)
        print(f"Successfully wrote prompts to {OUTPUT_HETZNER}")
    except Exception as e:
        print(f"Error writing to {OUTPUT_HETZNER}: {e}")
    
    # Write to colorvaults output workspace
    try:
        os.makedirs(os.path.dirname(OUTPUT_CV_OUT), exist_ok=True)
        with open(OUTPUT_CV_OUT, 'w', encoding='utf-8') as f:
            f.write(final_output)
        print(f"Successfully wrote prompts to {OUTPUT_CV_OUT}")
    except Exception as e:
        print(f"Error writing to {OUTPUT_CV_OUT}: {e}")

if __name__ == '__main__':
    main()
