const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const publicDir = path.join(__dirname, '..', 'public');
const BASE_URL = 'https://colorvaults.com';

function readJson(lang, filename) {
  const filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function generateSitemap() {
  const languages = ['en', 'nl'];
  const staticPages = ['', '/about', '/contact', '/contest', '/request', '/licensing', '/privacy-policy', '/terms-of-service', '/ip-policy', '/search'];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const lang of languages) {
    // Static Pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    }

    const hubs = readJson(lang, 'main-hubs.json');
    const themes = readJson(lang, 'themes.json');
    const ages = readJson(lang, 'age-pages.json');
    const pages = readJson(lang, 'coloring-pages.json');

    for (const hub of hubs) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}/${hub.slug}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const theme of themes) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}/${theme.parentHub}/${theme.slug}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const age of ages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}/${age.parentHub}/${age.parentTheme}/${age.slug}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    // Individual Coloring Pages (WITH IMAGE TAGS)
    for (const page of pages) {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${BASE_URL}${page.image}</image:loc>\n`;
      xml += `      <image:title><![CDATA[${page.metaTitle}]]></image:title>\n`;
      xml += `      <image:caption><![CDATA[${page.altText}]]></image:caption>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Generated public/sitemap.xml with image sitemap support.');
}

generateSitemap();
