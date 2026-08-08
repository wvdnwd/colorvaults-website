const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const publicDir = path.join(__dirname, '..', 'public');
const BASE_URL = 'https://colorvaults.com';
const URLS_PER_SITEMAP = 5000;

function readJson(lang, filename) {
  const filePath = path.join(dataDir, lang, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function generateSitemap() {
  const languages = ['en', 'nl'];
  const staticPages = ['', '/about', '/contact', '/contest', '/request', '/licensing', '/privacy-policy', '/terms-of-service', '/ip-policy', '/search'];
  
  let allUrls = [];

  for (const lang of languages) {
    // Static Pages
    for (const page of staticPages) {
      allUrls.push(`  <url>\n    <loc>${BASE_URL}/${lang}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`);
    }

    const hubs = readJson(lang, 'main-hubs.json');
    const themes = readJson(lang, 'themes.json');
    const ages = readJson(lang, 'age-pages.json');
    const pages = readJson(lang, 'coloring-pages.json');

    for (const hub of hubs) {
      allUrls.push(`  <url>\n    <loc>${BASE_URL}/${lang}/${hub.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`);
    }

    for (const theme of themes) {
      allUrls.push(`  <url>\n    <loc>${BASE_URL}/${lang}/${theme.parentHub}/${theme.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`);
    }

    for (const age of ages) {
      allUrls.push(`  <url>\n    <loc>${BASE_URL}/${lang}/${age.parentHub}/${age.parentTheme}/${age.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`);
    }

    // Individual Coloring Pages (WITH IMAGE TAGS)
    // Note: Image URLs from Spaces might not need BASE_URL if they are already absolute
    for (const page of pages) {
      const imgLoc = page.image.startsWith('http') ? page.image : `${BASE_URL}${page.image}`;
      let xml = `  <url>\n`;
      xml += `    <loc>${BASE_URL}/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${imgLoc}</image:loc>\n`;
      xml += `      <image:title><![CDATA[${page.metaTitle}]]></image:title>\n`;
      xml += `      <image:caption><![CDATA[${page.altText}]]></image:caption>\n`;
      xml += `    </image:image>\n`;
      xml += `  </url>\n`;
      allUrls.push(xml);
    }
  }

  // Chunking
  const numChunks = Math.ceil(allUrls.length / URLS_PER_SITEMAP);
  const sitemapFiles = [];

  for (let i = 0; i < numChunks; i++) {
    const chunkUrls = allUrls.slice(i * URLS_PER_SITEMAP, (i + 1) * URLS_PER_SITEMAP);
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
    xml += chunkUrls.join('');
    xml += `</urlset>`;
    
    const filename = `sitemap-${i + 1}.xml`;
    fs.writeFileSync(path.join(publicDir, filename), xml);
    sitemapFiles.push(filename);
  }

  // Generate Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const file of sitemapFiles) {
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${BASE_URL}/${file}</loc>\n`;
    indexXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    indexXml += `  </sitemap>\n`;
  }
  indexXml += `</sitemapindex>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml);
  console.log(`✅ Generated sitemap index and ${numChunks} sitemap chunk(s) for ${allUrls.length} total URLs.`);
}

generateSitemap();
