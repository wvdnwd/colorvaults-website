const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'en');
const publicPagesDir = path.join(__dirname, '..', 'public', 'images', 'pages');

if (!fs.existsSync(publicPagesDir)) {
  fs.mkdirSync(publicPagesDir, { recursive: true });
}

// Use an existing image as placeholder
const sourceImage = path.join(__dirname, '..', 'public', 'images', 'categories', 'animals.jpg');

const pages = JSON.parse(fs.readFileSync(path.join(dataDir, 'coloring-pages.json'), 'utf8'));

let count = 0;
for (const page of pages) {
  const targetPath = path.join(publicPagesDir, `${page.slug}.jpg`);
  if (!fs.existsSync(targetPath)) {
    try {
      fs.copyFileSync(sourceImage, targetPath);
      count++;
    } catch (e) {}
  }
}

// Do the same for NL
const nlDataDir = path.join(__dirname, '..', 'src', 'data', 'nl');
const nlPages = JSON.parse(fs.readFileSync(path.join(nlDataDir, 'coloring-pages.json'), 'utf8'));
for (const page of nlPages) {
  const targetPath = path.join(publicPagesDir, `${page.slug}.jpg`);
  if (!fs.existsSync(targetPath)) {
    try {
      fs.copyFileSync(sourceImage, targetPath);
      count++;
    } catch (e) {}
  }
}

console.log(`✅ Generated ${count} placeholder images to prevent 404 routing crashes.`);
