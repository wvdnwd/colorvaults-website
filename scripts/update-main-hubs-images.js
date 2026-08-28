const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const HUB_IMAGES = {
  'collections': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Ancient%20Mythology/Ancient_Warrior_Holding_Spear_1786118698826.webp',
  'collecties': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Ancient%20Mythology/Ancient_Warrior_Holding_Spear_1786118698826.webp',
  
  'tv-series-and-movies': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Anime/Anime_Bear-Eared_Girl_1787610039658.webp',
  'tv-series-en-films': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Anime/Anime_Bear-Eared_Girl_1787610039658.webp',
  
  'disney-and-fairy-tales': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Disney%20-%20Ariel/Ariels_underwater_treasure_hunt_1787614933242.webp',
  'disney-en-sprookjes': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Disney%20-%20Ariel/Ariels_underwater_treasure_hunt_1787614933242.webp',

  'games-and-pop-culture': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Super%20Mario/A_Playful_Super_Mario_Scenario_1786128038753.webp',
  'games-en-popcultuur': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Super%20Mario/A_Playful_Super_Mario_Scenario_1786128038753.webp',

  'animals-and-nature': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Animals/Animal_Friends_Celebrate_Birthday.webp',
  'dieren-en-natuur': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Animals/Animal_Friends_Celebrate_Birthday.webp',

  'toddler-specific': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/A_Large_Ball_Loader_1785055986516.webp',
  'speciaal-voor-peuters': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Construction%20Vehicles/A_Large_Ball_Loader_1785055986516.webp',

  'girls-themes': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Craft%20Sketches%20-%20Food%20And%20Sweets/Glass_of_Milkshake_1787742870601.webp',
  'meisjes-themas': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Craft%20Sketches%20-%20Food%20And%20Sweets/Glass_of_Milkshake_1787742870601.webp',

  'adults': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn/Autumn_Child_in_Winter_Clothing_1786140026243.webp',
  'volwassenen': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Autumn/Autumn_Child_in_Winter_Clothing_1786140026243.webp',

  'mandalas': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Mandalas/Astronaut_with_Mandala_Surroundings_1786128783297.webp',

  'calendars': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Coloring%20Calendars/Autumn_Still_Life_1787733908155.webp',

  'school-education-templates': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Anime%20%20Algemeen/Boy_and_Girl_in_Classrooms_1787729183901.webp',
  'school-en-educatie-sjablonen': 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Anime%20%20Algemeen/Boy_and_Girl_in_Classrooms_1787729183901.webp',
};

for (const lang of ['en', 'nl']) {
  const filePath = path.join(dataDir, lang, 'main-hubs.json');
  const hubs = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const updated = hubs.map(h => {
    const newImage = HUB_IMAGES[h.slug] || h.image;
    return { ...h, image: newImage };
  });

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`Updated ${updated.length} hubs images in ${lang}!`);
}
