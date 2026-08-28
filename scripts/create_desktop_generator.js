import fs from 'fs';
import path from 'path';

const desktopPath = 'C:/Users/Gebruiker/Desktop';

const scriptContent = `import random
import os

# Exact missing counts per category to reach 100 pages per folder (Total: 5,340 prompts)
categories = {
    "Fantasy Kingdom": {"count": 99, "chars": ["majestic fantasy castle on a cliff", "knight in shining armor", "friendly dragon guarding a tower", "wizard casting a spell", "king and queen on their thrones", "royal carriage pulled by horses", "stone archway and courtyard"]},
    "Celtic Patterns": {"count": 99, "chars": ["intricate celtic knot cross", "interlocking celtic animal motifs", "circular celtic shield knot", "celtic tree of life", "trinity knot (triquetra)", "celtic dragon motif", "endless braided celtic pattern"]},
    "Generatie 2 Johto (Pokémon)": {"count": 98, "chars": ["Lugia hovering over ocean waves", "Ho-Oh soaring near a bell tower", "Cyndaquil shooting flames", "Totodile splashing in water", "Chikorita in a sunny meadow", "Bellossom dancing", "Pichu playing", "Togepi hatching from egg"]},
    "Generatie 5 Unova (Pokémon)": {"count": 98, "chars": ["Reshiram bursting with fire", "Zekrom charging lightning", "Victini smiling with V-sign", "Snivy standing proudly", "Tepig snorting sparks", "Oshawott holding shell", "Zoroark in shadows", "Axew playing"]},
    "Generatie 9 Paldea (Pokémon)": {"count": 98, "chars": ["Koraidon in riding stance", "Miraidon hovering with jet engines", "Sprigatito grass kitten", "Fuecoco fire crocodile", "Quaxly water duckling", "Pawmi rubbing electric cheeks", "Lechonk in berry field"]},
    "Large Print Flowers": {"count": 98, "chars": ["giant sunflower with thick outlines", "large simple rose blossom", "huge blooming tulip", "big friendly daisy flower", "massive lotus blossom", "large hibiscus flower"]},
    "Anime Algemeen": {"count": 97, "chars": ["chibi anime girl with giant cat ears", "heroic anime boy with sword", "magical girl with sparkle wand", "mecha pilot in helmet", "anime student running with toast", "ninja jumping across rooftops"]},
    "Kawaii": {"count": 97, "chars": ["kawaii boba tea with a cute face", "kawaii sushi rolls smiling", "cute chubby strawberry with eyes", "kawaii fluffy cloud raining hearts", "kawaii kitten hiding in a teacup", "kawaii toast with butter"]},
    "Art Nouveau": {"count": 96, "chars": ["elegant woman in Mucha style", "flowing floral art nouveau borders", "art nouveau stained glass window", "whiplash curves and natural forms", "stylized lilies and vines", "art nouveau peacock feather design"]},
    "Klaslokaal Sjablonen (School)": {"count": 96, "chars": ["teacher desk with apple and books", "alphabet blocks ABC pattern", "school bus at school gates", "backpack spilling pencils", "classroom chalkboard with math games", "student reading book under tree"]},
    "Blippi": {"count": 95, "chars": ["Blippi wearing orange glasses and bowtie", "Blippi driving a big excavator", "Blippi visiting a farm tractor", "Blippi looking at a T-rex dinosaur", "Blippi playing with a toy train"]},
    "Bluey": {"count": 94, "chars": ["Bluey playing in the backyard", "Bingo playing with a balloon", "Bandit (Dad) giving a piggyback ride", "Chilli (Mom) reading a story", "Muffin riding a tricycle", "Bluey and Bingo playing keepy uppy"]},
    "Coloring Calendars": {"count": 94, "chars": ["seasonal calendar frame with flowers", "winter snow scene monthly border", "spring butterfly planner page", "summer sun calendar margin", "autumn leaf border calendar"]},
    "Craft Sketches - Food And Sweets": {"count": 94, "chars": ["delicious layered cake with strawberries", "ice cream sundae bowl with cherry", "cupcake with frosting swirl", "macaron tower stack", "chocolate bar with wrapper", "bakery window display"]},
    "Generatie 1 Kanto (Pokémon)": {"count": 94, "chars": ["Pikachu using Thunderbolt", "Charizard breathing fire", "Bulbasaur in forest", "Squirtle wearing sunglasses", "Eevee playing in grass", "Gengar hiding in shadows", "Snorlax sleeping on path"]},
    "Patterns": {"count": 94, "chars": ["seamless chevron repeating pattern", "polka dots and diagonal stripes", "intricate paisley motif pattern", "tessellating geometric tile shapes", "classic houndstooth lattice"]},
    "Sinterklaas": {"count": 94, "chars": ["Sinterklaas on white horse Ozosnel", "Piet throwing pepernoten cookies", "steamboat Pakjesboot arriving", "shoe by fireplace with carrot", "chocolate letters and marzipan"]},
    "Blanco Kalenders": {"count": 94, "chars": ["clean monthly calendar grid layout", "habit tracker planner page with floral border", "weekly schedule template with cute icons"]},
    "Maandkalenders": {"count": 94, "chars": ["january snow scene calendar", "april spring flower calendar", "july beach sun calendar", "october pumpkin calendar", "december christmas tree calendar"]},
    "Jaarkalenders": {"count": 94, "chars": ["full year wall calendar overview layout", "decorative border annual planner", "12-month overview grid template"]},
    "Lego Ninjago": {"count": 93, "chars": ["Lloyd the Green Ninja", "Kai the Red Ninja with fire sword", "Jay the Blue Ninja with nunchucks", "Zane the White Ninja", "Cole the Black Ninja", "Ninjago elemental dragon"]},
    "Disney - Cinderella": {"count": 92, "chars": ["Cinderella in her sparkling ballgown", "glass slipper on velvet pillow", "pumpkin carriage pulled by white horses", "Fairy Godmother waving wand", "Jaq and Gus mice helping"]},
    "Rainbows": {"count": 92, "chars": ["vibrant rainbow arching over clouds", "pot of gold at rainbow end", "rainbow with smiling sun", "unicorn galloping across rainbow", "rainbow balloon arch"]},
    "Creepy Kawaii": {"count": 91, "chars": ["cute pastel goth bat", "kawaii grim reaper with scythe", "adorable stitched voodoo doll", "creepy cute zombie kitty", "sweet spooky ghost with lollipop"]},
    "Fairy Tale Kingdom": {"count": 91, "chars": ["sleeping princess in tower", "brave prince fighting dragon", "magic beanstalk reaching clouds", "gingerbread house in woods", "enchanted talking mirror"]},
    "Botanical Gardens": {"count": 90, "chars": ["glass greenhouse filled with exotic plants", "pathway winding through botanical garden", "large tropical monstera leaves", "weeping willow tree over pond", "climbing rose archway"]},
    "Easter Spring": {"count": 90, "chars": ["Easter bunny with egg basket", "decorated Easter eggs pile", "cute spring chick hatching", "chocolate bunnies in grass", "spring wreath with tulips"]},
    "Halloween Spooky Creatures": {"count": 90, "chars": ["spooky vampire with cape", "howling werewolf under full moon", "mummy emerging from tomb", "Frankenstein monster", "wicked witch flying on broomstick"]},
    "Minnie Mouse": {"count": 90, "chars": ["Minnie Mouse wearing polka dot bow", "Minnie Mouse holding balloon", "Minnie Mouse dancing", "Minnie Mouse with Daisy Duck", "Minnie Mouse driving pink car"]},
    "Anime - Naruto": {"count": 88, "chars": ["Naruto Uzumaki using Rasengan", "Sasuke Uchiha with Sharingan", "Sakura Haruno", "Kakashi Hatake reading book", "Gaara with sand gourd", "Itachi Uchiha"]},
    "Craft Sketches - Animals": {"count": 88, "chars": ["cute sketched puppy in basket", "fluffy kitten with yarn ball", "playful baby elephant", "chubby bunny rabbit in clover", "baby deer fawn in forest"]},
    "Bold And Easy": {"count": 86, "chars": ["large smiling sun", "big simple sunflower", "huge slice of pizza", "giant cute caterpillar", "simple house with tree", "big friendly fish"]},
    "Cozy Life": {"count": 86, "chars": ["steaming mug of cocoa with marshmallows", "sleeping cat on armchair", "pile of soft knitted blankets", "cozy window reading nook", "warm fireplace with burning logs"]},
    "Games": {"count": 80, "chars": ["video game controller", "arcade cabinet machine", "handheld gaming console", "retro 8-bit pixel heart", "gaming headset and microphone"]},
    "Cottagecore": {"count": 79, "chars": ["thatched-roof cottage in woods", "basket of fresh mushrooms & berries", "vintage bicycle with flower basket", "girl having picnic in meadow", "frog on lily pad with mushroom hat"]},
    "Anime - Sailor Moon": {"count": 77, "chars": ["Sailor Moon (Usagi)", "Sailor Mercury", "Sailor Mars", "Sailor Jupiter", "Sailor Venus", "Tuxedo Mask", "Luna the black cat"]},
    "Architecture": {"count": 77, "chars": ["gothic cathedral facade", "modern skyscraper city skyline", "Roman temple with columns", "Victorian mansion", "Japanese pagoda with cherry blossoms"]},
    "Disney - Snow White": {"count": 77, "chars": ["Snow White holding apple", "Seven Dwarfs marching in line", "Evil Queen with magic mirror", "Snow White surrounded by forest animals"]},
    "Super Mario": {"count": 76, "chars": ["Mario jumping over Goomba", "Luigi with Poltergust", "Princess Peach in castle", "Bowser breathing fire", "Yoshi eating apple", "Toad holding mushroom"]},
    "Underwater Lost Cities": {"count": 74, "chars": ["ruins of Atlantis underwater", "sunken Greek temple with coral", "mermaid exploring flooded palace", "statue of Poseidon with sea turtles"]},
    "Gaming": {"count": 73, "chars": ["gaming setup with dual monitors", "VR headset player", "20-sided RPG dice stack", "retro pixel invaders", "arcade joystick"]},
    "Anime - One Piece": {"count": 72, "chars": ["Luffy stretching arm", "Zoro with three swords", "Nami with map", "Usopp with slingshot", "Sanji kicking", "Chopper cute reindeer"]},
    "Disney Princesses": {"count": 71, "chars": ["Ariel Little Mermaid", "Belle reading book", "Jasmine on magic carpet", "Rapunzel with long hair", "Cinderella ballgown", "Tiana frog dress"]},
    "Fantasy Creatures": {"count": 71, "chars": ["griffin soaring in sky", "fire-breathing dragon", "unicorn in mystical woods", "phoenix rising from fire", "kraken sea monster"]},
    "Peppa Pig": {"count": 71, "chars": ["Peppa Pig in muddy puddles", "George Pig with dinosaur toy", "Mummy Pig & Daddy Pig", "Suzy Sheep playing with Peppa", "Grandpa Pig driving train"]},
    "Ancient Mythology": {"count": 70, "chars": ["Zeus holding lightning bolt", "Medusa with snake hair", "Hercules fighting Hydra", "Poseidon with trident", "Anubis Egyptian jackal god"]},
    "Bumba": {"count": 68, "chars": ["Bumba the clown smiling", "Bumbalu", "Nanadu the bear", "Zazati magician", "Tumbi the elephant", "Bumba circus tent"]},
    "Enchanted Forest": {"count": 68, "chars": ["glowing magic mushrooms", "fairy house inside hollow tree", "mystical pond with fireflies", "unicorn drinking at stream"]},
    "Cozy Winter Wonderland": {"count": 66, "chars": ["snow cabin with fireplace smoke", "happy snowman with scarf & hat", "ice skating on frozen pond", "reindeer pulling sleigh in snow"]},
    "Thomas The Tank Engine": {"count": 66, "chars": ["Thomas tank engine puffing steam", "Percy small engine", "James red engine", "Gordon pulling express train", "Sir Topham Hatt"]},
    "Superheroes": {"count": 65, "chars": ["superhero flying through sky", "superhero lifting heavy car", "masked hero on rooftop gargoyle", "hero team assembling pose"]},
    "Autumn": {"count": 64, "chars": ["falling autumn leaves pile", "scarecrow in pumpkin patch", "basket of fresh apples", "cute squirrel holding acorn", "mug of apple cider"]},
    "Magical Forest": {"count": 64, "chars": ["trees with crystal leaves", "wisp spirits in woods", "magic door in oak tree roots", "glowing runes on ancient stones"]},
    "Sports": {"count": 63, "chars": ["soccer player kicking goal", "basketball player dunking", "tennis player serving", "gymnast flip", "swimmer racing in pool"]},
    "Cocomelon": {"count": 60, "chars": ["JJ smiling and waving", "TomTom playing with blocks", "YoYo singing song", "Cocomelon watermelon logo", "Miss Appleberry teacher"]},
    "Anime - Dragonball": {"count": 58, "chars": ["Goku charging Kamehameha", "Vegeta in Saiyan armor", "Piccolo meditating", "Super Saiyan Gohan", "Shenron eternal dragon"]},
    "SpongeBob": {"count": 50, "chars": ["SpongeBob SquarePants laughing", "Patrick Star smiling", "Squidward playing clarinet", "Mr. Krabs holding dollar", "Plankton with Krabby Patty recipe"]},
    "Construction Vehicles": {"count": 49, "chars": ["yellow excavator digging", "large dump truck with dirt", "bulldozer pushing rocks", "cement mixer spinning", "tall crane lifting beams"]},
    "Disney - Frozen": {"count": 44, "chars": ["Elsa casting ice magic", "Anna in snow cloak", "Olaf the snowman smiling", "Sven the reindeer", "Kristoff with lute", "Elsa's ice palace"]},
    "Steampunk": {"count": 42, "chars": ["steampunk inventor with goggles", "brass clockwork mechanical owl", "steampunk airship blimp", "gear and cog mechanical heart", "submersible submarine"]},
    "Anime": {"count": 41, "chars": ["heroic anime protagonist", "magical girl with staff", "chibi anime character", "anime warrior in armor"]},
    "Mickey Mouse": {"count": 40, "chars": ["Mickey Mouse waving", "Mickey Mouse Sorcerer hat", "Mickey and Minnie together", "Mickey driving boat"]},
    "Sonic": {"count": 40, "chars": ["Sonic the Hedgehog running fast", "Tails flying with two tails", "Knuckles punching rock", "Shadow the Hedgehog", "Dr. Eggman in pod"]},
    "Dolphins Underwater": {"count": 35, "chars": ["dolphins leaping out of ocean", "mother and baby dolphin swimming", "dolphins playing with coral reef fish", "dolphins underwater sunbeams"]},
    "Monsters": {"count": 33, "chars": ["cute friendly monster with horns", "furry funny monster smiling", "one-eyed silly monster", "playful little monster eating cookie"]},
    "Music": {"count": 24, "chars": ["acoustic guitar with floral vine decoration", "grand piano with flowing music notes", "drum set with sticks", "violin on sheet music", "headphones with sound waves"]},
    "Halloween": {"count": 15, "chars": ["carved jack-o'-lantern pumpkin", "cute ghost holding candy bag", "black cat sitting on witch hat", "haunted house with bats"]},
    "Ninjas Samurais": {"count": 15, "chars": ["samurai warrior in detailed armor", "stealthy ninja with katana sword", "samurai helmet with horns", "ninja throwing shuriken"]},
    "Mermaids": {"count": 10, "chars": ["pretty mermaid sitting on sea rock", "mermaid swimming with sea turtle", "mermaid holding pearl shell", "mermaid with long flowing hair & fish tail"]},
    "Disney - Ariel": {"count": 8, "chars": ["Ariel Little Mermaid under the sea", "Flounder and Sebastian", "Ariel sitting on rock at sunset", "King Triton with trident"]},
    "Paw Patrol": {"count": 6, "chars": ["Chase police pup", "Marshall fire pup", "Skye aviator pup", "Rubble construction pup", "Rocky & Zuma"]},
    "Cyberpunk City": {"count": 4, "chars": ["cyberpunk street with neon signs", "futuristic cyber police car", "cyberpunk character with glowing visor", "high-tech city skyline"]},
    "Fashion": {"count": 1, "chars": ["fashion model in elegant dress outfit"]}
}

actions_and_poses = [
    "in an epic, dynamic pose", "smiling brightly and waving at the camera", 
    "engaged in an exciting adventure", "looking determined and focused",
    "in a playful, joyful stance", "caught in the middle of a signature move",
    "standing heroically with a dramatic background", "in a peaceful and relaxed moment",
    "showing off a unique skill", "interacting with a cute sidekick or prop",
    "striking a fierce battle pose", "surrounded by magical glowing effects",
    "leaping energetically through the air", "in a dramatic close-up portrait",
    "exploring a mysterious new location", "having fun in a lighthearted scene"
]

settings_and_bg = [
    "in a highly detailed, bustling city street", "surrounded by a dense, magical forest",
    "in a futuristic, high-tech environment", "with a cozy, warm interior background",
    "set against a backdrop of swirling clouds and sky", "in a dark, spooky, and mysterious setting",
    "with an intricate mandala or geometric background", "in a lively, crowded festival scene",
    "isolated on a clean, empty white background for easy coloring", "with beautiful floral vines framing the scene",
    "in an ancient, crumbling ruin", "underneath a starry night sky with a full moon",
    "in a stylized comic-book panel layout", "surrounded by floating, abstract shapes",
    "in a dramatic mountain landscape", "in an underwater setting with bubbles and coral"
]

levels = {
    "L1": {"name": "Toddler", "tag": "[L1]", "desc": "Very simple and easy black-and-white coloring page designed for toddlers. Thick, bold outlines, minimal details, large open spaces, and absolutely no shading."},
    "L2": {"name": "Kids", "tag": "[L2]", "desc": "Fun and engaging black-and-white coloring page for kids. Clear and distinct outlines, cute and recognizable elements, line art style with moderate details, and no complex shading."},
    "L3": {"name": "Teens", "tag": "[L3]", "desc": "Detailed and dynamic black-and-white coloring page for teens. Thinner, precise lines, beautiful shading and crosshatching, complex compositions, and intricate background elements."},
    "L4": {"name": "Adults", "tag": "[L4]", "desc": "Highly complex and intricate black-and-white coloring page for adults. Extremely dense patterns, advanced line art, zentangle or mandala-like details, and sophisticated artistic composition."}
}

output_lines = []
total_prompts = 0

for cat, data in categories.items():
    count = data["count"]
    chars = data["chars"]
    
    output_lines.append(f"# {cat} (Totaal Nodig: {count})")
    
    num_subfolders = (count + 14) // 15
    prompts_generated = 0
    
    for sub in range(num_subfolders):
        level_key = list(levels.keys())[sub % 4]
        level_info = levels[level_key]
        
        output_lines.append(f"## {cat} Vol. {sub+1} - {level_info['name']}")
        
        for i in range(15):
            subject = random.choice(chars)
            action = random.choice(actions_and_poses)
            setting = random.choice(settings_and_bg)
            
            prompt = f"{level_info['tag']} {level_info['desc']} It features {subject} {action}, {setting}."
            output_lines.append(prompt)
            prompts_generated += 1
            total_prompts += 1
            if prompts_generated >= count:
                break
        output_lines.append("")

# Write to Desktop
desktop_output_file = 'C:/Users/Gebruiker/Desktop/Aangevulde_Prompts.txt'
with open(desktop_output_file, 'w', encoding='utf-8') as f:
    f.write('\\n'.join(output_lines))

print(f"File generated successfully at {desktop_output_file}. Total prompts: {total_prompts}")
`;

const desktopScriptPath = 'C:/Users/Gebruiker/Desktop/generate_promps_v2.py';
fs.writeFileSync(desktopScriptPath, scriptContent, 'utf8');

// Also create batch file on Desktop
const batContent = `@echo off
echo ========================================================
echo   ColorVaults AI Prompt Generator (5.340 Prompts)
echo ========================================================
echo Generating prompts for all 75 categories needing pages...
python "C:\\Users\\Gebruiker\\Desktop\\generate_promps_v2.py"
echo.
echo SUCCESS! File created at C:\\Users\\Gebruiker\\Desktop\\Aangevulde_Prompts.txt
echo ========================================================
pause
`;

const desktopBatPath = 'C:/Users/Gebruiker/Desktop/Genereer_Alle_Prompts.bat';
fs.writeFileSync(desktopBatPath, batContent, 'utf8');

console.log('Updated Desktop generator script and batch file!');
