#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_DATA_DIR = path.join(ROOT, 'src', 'data');
const COUNT_FIELDS = ['pageCount', 'totalCount', 'itemCount', 'coloringPageCount'];
const STRUCTURAL_FIELDS = [
  'slug', 'parentHub', 'parentTheme', 'ageGroup', 'difficulty',
  'image', 'preview', 'downloadableFile',
];
const AGE_TAGS = new Set(['toddlers', 'kids', 'teens', 'adults']);
const REPAIRABLE_ERROR_CODES = new Set([
  'master_shard_content_mismatch', 'master_id_missing_from_shards', 'missing_theme_shard',
]);

function usage() {
  console.log(`Usage: node scripts/catalog-audit.js [options]

Audits every locale master and theme shard. Dry-run is the default.

Options:
  --data-dir PATH       Catalog root (default: src/data)
  --report-json PATH    Write a deterministic JSON report
  --report-csv PATH     Write a deterministic CSV issue report
  --apply               Apply only safe derived repairs transactionally
  --help                Show this help

Safe repairs: locale language fields, derived category/age tags, theme shards
rebuilt from their locale master, and existing theme/hub count fields. Titles
and IDs are report-only and are never inferred or rewritten.`);
}

function parseArgs(argv) {
  const options = { dataDir: DEFAULT_DATA_DIR, apply: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--apply') options.apply = true;
    else if (argument === '--help' || argument === '-h') options.help = true;
    else if (['--data-dir', '--report-json', '--report-csv'].includes(argument)) {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${argument} requires a path`);
      index += 1;
      const key = argument === '--data-dir' ? 'dataDir' : argument === '--report-json' ? 'reportJson' : 'reportCsv';
      options[key] = path.resolve(value);
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }
  options.dataDir = path.resolve(options.dataDir);
  return options;
}

function readJson(file) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Cannot parse ${path.relative(ROOT, file)}: ${error.message}`);
  }
  if (!Array.isArray(parsed)) throw new Error(`${path.relative(ROOT, file)} must contain a JSON array`);
  return parsed;
}

function jsonText(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function discoverLocales(dataDir) {
  return fs.readdirSync(dataDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((locale) => fs.existsSync(path.join(dataDir, locale, 'coloring-pages.json')))
    .sort();
}

function compareValues(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function csvCell(value) {
  const text = value == null ? '' : typeof value === 'string' ? value : JSON.stringify(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function issueSort(left, right) {
  return [left.locale, left.code, left.id, left.file, left.detail]
    .map((value) => value || '')
    .join('\u0000')
    .localeCompare([right.locale, right.code, right.id, right.file, right.detail]
      .map((value) => value || '')
      .join('\u0000'));
}

function addIssue(issues, severity, code, context = {}) {
  issues.push({ severity, code, ...context });
}

function indexUnique(items, key, issues, context) {
  const result = new Map();
  items.forEach((item, position) => {
    const value = item && item[key];
    if (typeof value !== 'string' || !value.trim()) {
      addIssue(issues, 'error', `missing_${key}`, { ...context, detail: `array index ${position}` });
      return;
    }
    if (result.has(value)) {
      addIssue(issues, 'error', `duplicate_${key}`, { ...context, id: key === 'id' ? value : undefined, detail: value });
      return;
    }
    result.set(value, item);
  });
  return result;
}

function titleFindings(title, image) {
  const findings = [];
  if (typeof title !== 'string' || !title.trim()) return ['missing_title'];
  if (title !== title.trim() || /\s{2,}/.test(title)) findings.push('whitespace');
  if (/[\u0000-\u001f\u007f]/.test(title)) findings.push('control_character');
  if (/^(untitled|image|coloring page|colouring page|scene)(?:\s*\d+)?$/i.test(title.trim())) findings.push('generic');
  if (title.trim().length < 4) findings.push('too_short');
  if (/\.{2,}$|…$/.test(title.trim()) || /\b(and|with|the|a|an|of|in|on|at|to|for|his|her)$/i.test(title.trim())) {
    findings.push('possible_truncation');
  }
  if (!findings.includes('possible_truncation') && title.trim().length >= 28 && title.trim().length <= 32) {
    const lastWord = title.trim().split(/\s+/).pop();
    if (lastWord && lastWord.length <= 5) findings.push('possible_fixed_width_truncation');
  }
  if (typeof image === 'string') {
    let stem = '';
    try {
      stem = decodeURIComponent(new URL(image).pathname.split('/').pop() || '')
        .replace(/\.[^.]+$/, '').replace(/_\d{10,}$/, '').replace(/[_-]+/g, ' ').trim();
    } catch (_) {
      // Malformed URLs are reported separately; title analysis remains usable.
    }
    if (stem && stem.length > title.trim().length + 4 && stem.toLowerCase().startsWith(title.trim().toLowerCase())) {
      findings.push('title_shorter_than_image_name');
    }
  }
  return [...new Set(findings)];
}

function sceneTitle(title) {
  if (typeof title !== 'string') return null;
  const match = title.match(/^(.*?)(?:\s*\((?:Scene|Scène)\s+(\d+)\))$/iu);
  return match ? { base: match[1].trim(), number: Number(match[2]) } : null;
}

function storageFolder(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean)[0] || '');
  } catch (_) {
    return '';
  }
}

function storageSemanticFinding(page) {
  const title = typeof page.title === 'string' ? page.title : '';
  const folder = storageFolder(page.image);
  const normalized = `${title} ${folder}`.toLocaleLowerCase('en');
  const expected = [];
  if (/paw[\s_-]*patrol/.test(normalized)) expected.push('paw-patrol');
  if (/dragon[\s_-]*ball/.test(normalized)) expected.push('dragon-ball-z');
  if (/\btrain\b/.test(title.toLocaleLowerCase('en')) && /unsorted coloring pages/i.test(folder)) {
    expected.push('thomas-the-tank-engine');
  }
  const mismatch = expected.find((theme) => page.parentTheme !== theme);
  return mismatch ? { folder, expectedTheme: mismatch, actualTheme: page.parentTheme } : null;
}

function normalizedTags(page, themeSlugs) {
  const extras = Array.isArray(page.tags) ? page.tags.filter((tag) => (
    typeof tag === 'string'
    && tag !== page.parentTheme
    && tag !== page.ageGroup
    && !themeSlugs.has(tag)
    && !AGE_TAGS.has(tag)
  )) : [];
  return [...new Set([page.parentTheme, page.ageGroup, ...extras].filter(Boolean))];
}

function auditLocale(dataDir, locale, issues, repairs, prepareWrites) {
  const localeDir = path.join(dataDir, locale);
  const files = {
    master: path.join(localeDir, 'coloring-pages.json'),
    themes: path.join(localeDir, 'themes.json'),
    hubs: path.join(localeDir, 'main-hubs.json'),
    shards: path.join(localeDir, 'themes-data'),
    featured: path.join(localeDir, 'featured-pages.json'),
    ages: path.join(localeDir, 'age-pages.json'),
  };
  for (const required of [files.master, files.themes, files.hubs]) {
    if (!fs.existsSync(required)) throw new Error(`Missing required catalog file: ${path.relative(ROOT, required)}`);
  }

  const pages = readJson(files.master);
  const themes = readJson(files.themes);
  const hubs = readJson(files.hubs);
  const pageById = indexUnique(pages, 'id', issues, { locale, file: path.relative(ROOT, files.master) });
  const originalPageById = new Map(
    [...pageById].map(([id, page]) => [id, JSON.stringify(page)]),
  );
  const themeBySlug = indexUnique(themes, 'slug', issues, { locale, file: path.relative(ROOT, files.themes) });
  const hubBySlug = indexUnique(hubs, 'slug', issues, { locale, file: path.relative(ROOT, files.hubs) });
  const themeSlugs = new Set(themeBySlug.keys());
  const grouped = new Map([...themeSlugs].map((slug) => [slug, []]));
  const titleGroups = new Map();
  const repeatedTitleFamilies = new Map();

  for (const page of pages) {
    if (!page || typeof page !== 'object' || !page.id) continue;
    if (!themeBySlug.has(page.parentTheme)) {
      addIssue(issues, 'error', 'unknown_parent_theme', { locale, id: page.id, detail: String(page.parentTheme) });
    } else {
      grouped.get(page.parentTheme).push(page);
      const expectedHub = themeBySlug.get(page.parentTheme).parentHub;
      if (page.parentHub !== expectedHub) {
        addIssue(issues, 'error', 'theme_hub_mismatch', { locale, id: page.id, detail: `${page.parentHub} != ${expectedHub}` });
      }
    }
    const expectedTags = normalizedTags(page, themeSlugs);
    if (!compareValues(page.tags, expectedTags)) {
      addIssue(issues, 'warning', 'category_tag_mismatch', { locale, id: page.id, detail: { actual: page.tags, expected: expectedTags } });
      page.tags = expectedTags;
      repairs.push({ locale, id: page.id, code: 'normalize_derived_tags' });
    }
    if (page.language !== locale) {
      addIssue(issues, 'warning', 'page_language_mismatch', { locale, id: page.id, detail: `${page.language} != ${locale}` });
      page.language = locale;
      repairs.push({ locale, id: page.id, code: 'set_page_language' });
    }
    for (const finding of titleFindings(page.title, page.image)) {
      addIssue(issues, 'warning', `title_${finding}`, { locale, id: page.id, detail: page.title });
    }
    const semanticFinding = storageSemanticFinding(page);
    if (semanticFinding) addIssue(issues, 'warning', 'storage_folder_semantic_mismatch', { locale, id: page.id, detail: semanticFinding });
    if (typeof page.title === 'string') {
      const scene = sceneTitle(page.title);
      if (scene) {
        const base = scene.base.toLocaleLowerCase(locale);
        if (!titleGroups.has(base)) titleGroups.set(base, []);
        titleGroups.get(base).push({ id: page.id, scene: scene.number, title: page.title });
      }
      const family = (scene ? scene.base : page.title).trim().toLocaleLowerCase(locale);
      if (!repeatedTitleFamilies.has(family)) repeatedTitleFamilies.set(family, []);
      repeatedTitleFamilies.get(family).push({ id: page.id, title: page.title, image: page.image });
    }
    for (const urlField of ['image', 'preview', 'downloadableFile']) {
      if (typeof page[urlField] !== 'string' || !/^https?:\/\//i.test(page[urlField])) {
        addIssue(issues, 'error', 'invalid_remote_url', { locale, id: page.id, detail: urlField });
      }
    }
  }

  for (const entries of titleGroups.values()) {
    entries.sort((left, right) => left.scene - right.scene || left.id.localeCompare(right.id));
    addIssue(issues, 'info', 'scene_title_group', { locale, id: entries[0].id, detail: entries });
  }
  for (const [base, entries] of repeatedTitleFamilies) {
    if (entries.length < 2) continue;
    const findings = titleFindings(base, entries[0].image);
    const repeatedSourceStem = new Set(entries.map((entry) => {
      try {
        return decodeURIComponent(new URL(entry.image).pathname.split('/').pop() || '').replace(/_\d{10,}(?:\.[^.]+)?$/, '');
      } catch (_) { return ''; }
    }).filter(Boolean)).size < entries.length;
    if (findings.some((finding) => finding.includes('truncation') || finding === 'title_shorter_than_image_name') || repeatedSourceStem) {
      addIssue(issues, 'warning', 'repeated_truncation_family', { locale, id: entries[0].id, detail: { base, ids: entries.map((entry) => entry.id) } });
    }
  }

  if (fs.existsSync(files.featured)) {
    const featured = readJson(files.featured);
    const featuredById = indexUnique(featured, 'id', issues, { locale, file: path.relative(ROOT, files.featured) });
    const projected = [];
    for (const featuredPage of featured) {
      if (!featuredPage || typeof featuredPage.id !== 'string') continue;
      const masterPage = pageById.get(featuredPage.id);
      if (!masterPage) addIssue(issues, 'error', 'featured_id_missing_from_master', { locale, id: featuredPage.id, file: path.relative(ROOT, files.featured) });
      else {
        projected.push(masterPage);
        if (!compareValues(featuredPage, masterPage)) addIssue(issues, 'warning', 'featured_projection_mismatch', { locale, id: featuredPage.id, file: path.relative(ROOT, files.featured) });
      }
    }
    if (featuredById.size === featured.length && projected.length === featured.length && !compareValues(featured, projected)) {
      repairs.push({ locale, code: 'rebuild_featured_projection' });
    }
    if (prepareWrites && projected.length === featured.length) files.featuredContent = jsonText(projected);
  }

  if (fs.existsSync(files.ages)) {
    const ages = readJson(files.ages);
    const seenAgePages = new Set();
    for (const [position, agePage] of ages.entries()) {
      const key = agePage && `${agePage.parentTheme}\u0000${agePage.ageGroup}`;
      if (!agePage || !themeBySlug.has(agePage.parentTheme)) addIssue(issues, 'error', 'age_page_unknown_theme', { locale, detail: `array index ${position}` });
      if (!agePage || !AGE_TAGS.has(agePage.ageGroup) || agePage.slug !== agePage.ageGroup) addIssue(issues, 'error', 'invalid_age_page_projection', { locale, detail: `array index ${position}` });
      if (seenAgePages.has(key)) addIssue(issues, 'error', 'duplicate_age_page_projection', { locale, detail: key });
      seenAgePages.add(key);
      if (agePage && agePage.language !== locale) addIssue(issues, 'error', 'age_page_language_mismatch', { locale, detail: key });
      if (agePage && themeBySlug.has(agePage.parentTheme) && agePage.parentHub !== themeBySlug.get(agePage.parentTheme).parentHub) {
        addIssue(issues, 'error', 'age_page_hub_mismatch', { locale, detail: key });
      }
    }
    for (const page of pages) {
      if (page && AGE_TAGS.has(page.ageGroup) && !seenAgePages.has(`${page.parentTheme}\u0000${page.ageGroup}`)) {
        addIssue(issues, 'error', 'missing_age_page_projection', { locale, id: page.id, detail: `${page.parentTheme}/${page.ageGroup}` });
      }
    }
  }

  const actualShardFiles = fs.existsSync(files.shards)
    ? fs.readdirSync(files.shards).filter((name) => name.endsWith('.json')).sort()
    : [];
  const actualShardNames = new Set(actualShardFiles);
  const shardSeen = new Map();
  for (const filename of actualShardFiles) {
    const shardFile = path.join(files.shards, filename);
    const shardSlug = path.basename(filename, '.json');
    const shardPages = readJson(shardFile);
    if (!themeBySlug.has(shardSlug)) {
      addIssue(issues, 'error', 'orphan_theme_shard', { locale, file: path.relative(ROOT, shardFile), detail: shardSlug });
    }
    for (const shardPage of shardPages) {
      const id = shardPage && shardPage.id;
      if (!id) {
        addIssue(issues, 'error', 'shard_missing_id', { locale, file: path.relative(ROOT, shardFile) });
        continue;
      }
      if (shardSeen.has(id)) {
        addIssue(issues, 'error', 'id_in_multiple_shards', { locale, id, detail: [shardSeen.get(id), filename] });
      } else shardSeen.set(id, filename);
      const serializedMasterPage = originalPageById.get(id);
      if (!serializedMasterPage) addIssue(issues, 'error', 'shard_id_missing_from_master', { locale, id, file: path.relative(ROOT, shardFile) });
      else if (JSON.stringify(shardPage) !== serializedMasterPage) addIssue(issues, 'error', 'master_shard_content_mismatch', { locale, id, file: path.relative(ROOT, shardFile) });
      if (shardPage.parentTheme !== shardSlug) {
        addIssue(issues, 'error', 'shard_category_mismatch', { locale, id, detail: `${shardSlug} != ${shardPage.parentTheme}` });
      }
    }
  }
  for (const page of pages) {
    if (page.id && !shardSeen.has(page.id)) addIssue(issues, 'error', 'master_id_missing_from_shards', { locale, id: page.id });
  }
  for (const slug of themeSlugs) {
    if (!actualShardNames.has(`${slug}.json`)) addIssue(issues, 'error', 'missing_theme_shard', { locale, detail: slug });
  }

  const themeCounts = new Map([...themeSlugs].map((slug) => [slug, (grouped.get(slug) || []).length]));
  const hubPageCounts = new Map([...hubBySlug.keys()].map((slug) => [slug, 0]));
  const hubThemeCounts = new Map([...hubBySlug.keys()].map((slug) => [slug, 0]));
  for (const theme of themes) {
    const expected = themeCounts.get(theme.slug) || 0;
    if (!hubBySlug.has(theme.parentHub)) addIssue(issues, 'error', 'unknown_theme_parent_hub', { locale, detail: `${theme.slug}: ${theme.parentHub}` });
    else {
      hubPageCounts.set(theme.parentHub, hubPageCounts.get(theme.parentHub) + expected);
      hubThemeCounts.set(theme.parentHub, hubThemeCounts.get(theme.parentHub) + 1);
    }
    for (const field of COUNT_FIELDS) {
      if ((field === 'pageCount' || Object.hasOwn(theme, field)) && theme[field] !== expected) {
        addIssue(issues, 'warning', 'theme_count_mismatch', { locale, detail: `${theme.slug}.${field}: ${theme[field]} != ${expected}` });
        theme[field] = expected;
        repairs.push({ locale, code: 'update_theme_count', detail: `${theme.slug}.${field}` });
      }
    }
    if (theme.language !== locale) {
      addIssue(issues, 'warning', 'theme_language_mismatch', { locale, detail: theme.slug });
      theme.language = locale;
      repairs.push({ locale, code: 'set_theme_language', detail: theme.slug });
    }
  }
  for (const hub of hubs) {
    const expectedPages = hubPageCounts.get(hub.slug) || 0;
    const expectedThemes = hubThemeCounts.get(hub.slug) || 0;
    if (hub.pageCount !== expectedPages) {
      addIssue(issues, 'warning', 'hub_page_count_mismatch', { locale, detail: `${hub.slug}: ${hub.pageCount} != ${expectedPages}` });
      hub.pageCount = expectedPages;
      repairs.push({ locale, code: 'update_hub_page_count', detail: hub.slug });
    }
    if (hub.themeCount !== expectedThemes) {
      addIssue(issues, 'warning', 'hub_theme_count_mismatch', { locale, detail: `${hub.slug}: ${hub.themeCount} != ${expectedThemes}` });
      hub.themeCount = expectedThemes;
      repairs.push({ locale, code: 'update_hub_theme_count', detail: hub.slug });
    }
    if (hub.language !== locale) {
      addIssue(issues, 'warning', 'hub_language_mismatch', { locale, detail: hub.slug });
      hub.language = locale;
      repairs.push({ locale, code: 'set_hub_language', detail: hub.slug });
    }
  }

  const writes = new Map();
  if (prepareWrites) {
    writes.set(files.master, jsonText(pages));
    writes.set(files.themes, jsonText(themes));
    writes.set(files.hubs, jsonText(hubs));
    if (files.featuredContent) writes.set(files.featured, files.featuredContent);
    for (const [slug, shardPages] of grouped) writes.set(path.join(files.shards, `${slug}.json`), jsonText(shardPages));
  }
  return { locale, pages, pageById, themeCount: themes.length, writes };
}

function auditCrossLocale(catalogs, issues) {
  const reference = catalogs.find((catalog) => catalog.locale === 'en') || catalogs[0];
  for (const catalog of catalogs) {
    if (catalog === reference) continue;
    for (const [id, referencePage] of reference.pageById) {
      const page = catalog.pageById.get(id);
      if (!page) {
        addIssue(issues, 'error', 'locale_missing_id', { locale: catalog.locale, id, detail: `present in ${reference.locale}` });
        continue;
      }
      for (const field of STRUCTURAL_FIELDS) {
        if (!compareValues(page[field], referencePage[field])) {
          addIssue(issues, 'error', 'cross_locale_field_mismatch', {
            locale: catalog.locale, id, detail: { field, referenceLocale: reference.locale, reference: referencePage[field], actual: page[field] },
          });
        }
      }
    }
    for (const id of catalog.pageById.keys()) {
      if (!reference.pageById.has(id)) addIssue(issues, 'error', 'locale_extra_id', { locale: catalog.locale, id, detail: `absent from ${reference.locale}` });
    }
  }
}

function writeReport(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function durableWrite(file, content) {
  const temporary = `${file}.new`;
  fs.writeFileSync(temporary, content, 'utf8');
  const descriptor = fs.openSync(temporary, 'r');
  try { fs.fsyncSync(descriptor); } finally { fs.closeSync(descriptor); }
  fs.renameSync(temporary, file);
  const directory = fs.openSync(path.dirname(file), 'r');
  try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
}

function validatePreparedWrites(catalogs, writes) {
  for (const catalog of catalogs) {
    const localeDir = path.join(path.dirname([...catalog.writes.keys()][0]), '');
    const masterFile = path.join(localeDir, 'coloring-pages.json');
    const pages = JSON.parse(writes.get(masterFile));
    const ids = new Set();
    const pageById = new Map();
    for (const page of pages) {
      if (!page || typeof page.id !== 'string' || !page.id || ids.has(page.id)) throw new Error(`${catalog.locale} staged master has missing or duplicate IDs`);
      ids.add(page.id);
      pageById.set(page.id, page);
      const shardFile = path.join(localeDir, 'themes-data', `${page.parentTheme}.json`);
      if (!writes.has(shardFile)) throw new Error(`${catalog.locale} staged master has no exact shard for ${page.id}`);
    }
    const shardIds = new Set();
    for (const [file, content] of writes) {
      if (path.dirname(file) !== path.join(localeDir, 'themes-data')) continue;
      for (const page of JSON.parse(content)) {
        const masterPage = pageById.get(page.id);
        if (!masterPage || shardIds.has(page.id) || !compareValues(page, masterPage) || `${page.parentTheme}.json` !== path.basename(file)) {
          throw new Error(`${catalog.locale} staged shard projection is not exact for ${page.id || '<missing>'}`);
        }
        shardIds.add(page.id);
      }
    }
    if (shardIds.size !== ids.size) throw new Error(`${catalog.locale} staged shards do not cover the master exactly`);
    const themes = JSON.parse(writes.get(path.join(localeDir, 'themes.json')));
    const hubs = JSON.parse(writes.get(path.join(localeDir, 'main-hubs.json')));
    const themeCounts = new Map(themes.map((theme) => [theme.slug, 0]));
    for (const page of pages) themeCounts.set(page.parentTheme, (themeCounts.get(page.parentTheme) || 0) + 1);
    const hubCounts = new Map(hubs.map((hub) => [hub.slug, { pages: 0, themes: 0 }]));
    for (const theme of themes) {
      const count = themeCounts.get(theme.slug) || 0;
      if (theme.pageCount !== count) throw new Error(`${catalog.locale} staged theme count is invalid for ${theme.slug}`);
      const hub = hubCounts.get(theme.parentHub);
      if (!hub) throw new Error(`${catalog.locale} staged theme has unknown hub ${theme.parentHub}`);
      hub.pages += count;
      hub.themes += 1;
    }
    for (const hub of hubs) {
      const count = hubCounts.get(hub.slug);
      if (!count || hub.pageCount !== count.pages || hub.themeCount !== count.themes) throw new Error(`${catalog.locale} staged hub counts are invalid for ${hub.slug}`);
    }
    const featuredFile = path.join(localeDir, 'featured-pages.json');
    if (writes.has(featuredFile)) {
      for (const page of JSON.parse(writes.get(featuredFile))) {
        const masterPage = pageById.get(page.id);
        if (!masterPage || !compareValues(page, masterPage)) throw new Error(`${catalog.locale} staged featured projection is not exact for ${page.id || '<missing>'}`);
      }
    }
  }
}

function commitTransaction(writes, validateStaged) {
  const token = `${process.pid}-${Date.now()}`;
  const changed = [...writes.entries()].filter(([file, content]) => !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content);
  if (!changed.length) return 0;
  const transactionDir = path.join(path.dirname(changed[0][0]), `.catalog-transaction-${token}`);
  fs.mkdirSync(transactionDir, { recursive: false });
  const staged = changed.map(([file, content], index) => ({
    file, content, temp: path.join(transactionDir, `staged-${index}.json`),
    backup: path.join(transactionDir, `backup-${index}.json`), existed: fs.existsSync(file),
    beforeSha256: fs.existsSync(file) ? sha256(fs.readFileSync(file)) : null, afterSha256: sha256(content),
  }));
  const committed = [];
  const manifestFile = path.join(transactionDir, 'manifest.json');
  const writeManifest = (state, error) => durableWrite(manifestFile, jsonText({
    schemaVersion: 1, token, state, error, entries: staged.map((entry) => ({
      target: entry.file, staged: entry.temp, backup: entry.backup, existed: entry.existed,
      beforeSha256: entry.beforeSha256, afterSha256: entry.afterSha256,
      committed: committed.includes(entry),
    })),
  }));
  try {
    for (const entry of staged) {
      durableWrite(entry.temp, entry.content);
      JSON.parse(fs.readFileSync(entry.temp, 'utf8'));
    }
    validateStaged(new Map([...writes].map(([file, content]) => {
      const entry = staged.find((candidate) => candidate.file === file);
      return [file, entry ? fs.readFileSync(entry.temp, 'utf8') : content];
    })));
    writeManifest('staged');
    for (const entry of staged) {
      if (entry.existed && sha256(fs.readFileSync(entry.file)) !== entry.beforeSha256) {
        throw new Error(`Target changed during transaction staging: ${entry.file}`);
      }
      if (entry.existed) fs.renameSync(entry.file, entry.backup);
      committed.push(entry);
      try {
        fs.renameSync(entry.temp, entry.file);
      } catch (error) {
        if (entry.existed && fs.existsSync(entry.backup)) fs.renameSync(entry.backup, entry.file);
        committed.pop();
        throw error;
      }
      if (sha256(fs.readFileSync(entry.file)) !== entry.afterSha256) throw new Error(`Committed checksum mismatch: ${entry.file}`);
      writeManifest('committing');
    }
    writeManifest('committed');
    fs.rmSync(transactionDir, { recursive: true, force: true });
    return committed.length;
  } catch (error) {
    writeManifest('rollback_pending', error.message);
    for (const entry of committed) {
      if (entry.existed && (!fs.existsSync(entry.backup) || sha256(fs.readFileSync(entry.backup)) !== entry.beforeSha256)) {
        writeManifest('rollback_blocked', `Backup checksum mismatch: ${entry.backup}`);
        throw new Error(`Catalog transaction requires manual recovery at ${transactionDir}: backup checksum mismatch`);
      }
    }
    for (const entry of committed.reverse()) {
      if (fs.existsSync(entry.file)) fs.unlinkSync(entry.file);
      if (entry.existed && fs.existsSync(entry.backup)) fs.renameSync(entry.backup, entry.file);
    }
    for (const entry of staged) {
      if (fs.existsSync(entry.temp)) fs.unlinkSync(entry.temp);
      if (entry.existed && fs.existsSync(entry.backup) && !fs.existsSync(entry.file)) {
        if (sha256(fs.readFileSync(entry.backup)) !== entry.beforeSha256) {
          writeManifest('rollback_blocked', `Backup checksum mismatch: ${entry.backup}`);
          throw new Error(`Catalog transaction requires manual recovery at ${transactionDir}: backup checksum mismatch`);
        }
        fs.renameSync(entry.backup, entry.file);
      }
    }
    writeManifest('rolled_back', error.message);
    throw new Error(`Catalog transaction rolled back; recovery manifest retained at ${transactionDir}: ${error.message}`);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return usage();
  const locales = discoverLocales(options.dataDir);
  if (!locales.length) throw new Error(`No locale masters found under ${options.dataDir}`);
  const issues = [];
  const repairs = [];
  const catalogs = locales.map((locale) => auditLocale(options.dataDir, locale, issues, repairs, options.apply));
  auditCrossLocale(catalogs, issues);
  issues.sort(issueSort);
  repairs.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  const severityCounts = { error: 0, warning: 0, info: 0 };
  issues.forEach((issue) => { severityCounts[issue.severity] += 1; });
  const report = {
    schemaVersion: 1,
    mode: options.apply ? 'apply' : 'dry-run',
    dataDir: path.relative(ROOT, options.dataDir) || '.',
    locales: catalogs.map((catalog) => ({ locale: catalog.locale, pages: catalog.pages.length, themes: catalog.themeCount })),
    severityCounts,
    proposedSafeRepairs: repairs,
    issues,
  };
  if (options.reportJson) writeReport(options.reportJson, jsonText(report));
  if (options.reportCsv) {
    const columns = ['severity', 'code', 'locale', 'id', 'file', 'detail'];
    const rows = [columns.join(','), ...issues.map((issue) => columns.map((column) => csvCell(issue[column])).join(','))];
    writeReport(options.reportCsv, `${rows.join('\n')}\n`);
  }

  let changedFiles = 0;
  if (options.apply) {
    const blockers = issues.filter((issue) => issue.severity === 'error' && !REPAIRABLE_ERROR_CODES.has(issue.code));
    if (blockers.length) throw new Error(`Refusing --apply: ${blockers.length} unrepairable error(s); inspect the report first`);
    const writes = new Map();
    catalogs.forEach((catalog) => catalog.writes.forEach((content, file) => writes.set(file, content)));
    validatePreparedWrites(catalogs, writes);
    changedFiles = commitTransaction(writes, (stagedWrites) => validatePreparedWrites(catalogs, stagedWrites));
  }

  console.log(JSON.stringify({ mode: report.mode, locales, severityCounts, proposedSafeRepairs: repairs.length, changedFiles }, null, 2));
  if (!options.apply && severityCounts.error) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`catalog-audit: ${error.message}`);
  process.exitCode = 2;
}
