/** Build the same compact search records at runtime and during index generation. */
function buildSearchIndex(lang, hubs, themes, pages) {
  return [
    ...hubs.map(h => ({ lang, type: 'hub', title: h.title, description: h.description || '', image: h.image || '', url: `/${lang}/${h.slug}` })),
    ...themes.map(t => ({ lang, type: 'theme', title: t.title, description: t.description || '', image: t.image || '', parentHub: t.parentHub, parentTheme: t.slug, url: `/${lang}/${t.parentHub}/${t.slug}` })),
    ...pages.map(p => ({ lang, type: 'page', title: p.title, description: p.shortDescription || '', image: p.image || '', parentHub: p.parentHub, parentTheme: p.parentTheme, ageGroup: p.ageGroup, difficulty: p.difficulty, tags: p.tags || [], url: `/${lang}/${p.parentHub}/${p.parentTheme}/${p.ageGroup}/${p.slug}` })),
  ];
}

module.exports = { buildSearchIndex };
