import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SITE_ORIGIN, VALID_LOCALES, isValidLocale, getCanonicalUrl, escapeXml } from '../src/lib/site';
import { buildCanonicalUrl, buildHreflangAlternates } from '../src/lib/seo';
import { safeJsonLd, buildWebsiteAndOrgSchema } from '../src/lib/structuredData';

describe('Site & Routing Helpers', () => {
  it('enforces exact site origin', () => {
    assert.equal(SITE_ORIGIN, 'https://www.colorvaults.com');
  });

  it('validates supported locales strictly', () => {
    assert.deepEqual(VALID_LOCALES, ['en', 'nl', 'de', 'fr']);
    assert.equal(isValidLocale('en'), true);
    assert.equal(isValidLocale('nl'), true);
    assert.equal(isValidLocale('de'), true);
    assert.equal(isValidLocale('fr'), true);
    assert.equal(isValidLocale('es'), false);
    assert.equal(isValidLocale('it'), false);
    assert.equal(isValidLocale(''), false);
    assert.equal(isValidLocale(undefined as unknown as string), false);
  });

  it('generates proper canonical URLs with leading slashes', () => {
    assert.equal(getCanonicalUrl('/en'), 'https://www.colorvaults.com/en');
    assert.equal(getCanonicalUrl('nl/calendars'), 'https://www.colorvaults.com/nl/calendars');
  });

  it('properly escapes XML special characters for sitemaps', () => {
    assert.equal(escapeXml('hello & world'), 'hello &amp; world');
    assert.equal(escapeXml('<tag attr="val" test=\'1\'>'), '&lt;tag attr=&quot;val&quot; test=&apos;1&apos;&gt;');
  });
});

describe('SEO & Canonical Helpers', () => {
  it('normalizes page=1 to canonical without query string', () => {
    const url = buildCanonicalUrl('/tv-shows', 'en', 1);
    assert.equal(url, 'https://www.colorvaults.com/en/tv-shows');
  });

  it('preserves page > 1 in canonical query string', () => {
    const url = buildCanonicalUrl('/animals', 'nl', 2);
    assert.equal(url, 'https://www.colorvaults.com/nl/animals?page=2');
  });

  it('builds hreflang alternates for all locales plus x-default', () => {
    const alternates = buildHreflangAlternates('/calendars');
    assert.equal(alternates['en'], 'https://www.colorvaults.com/en/calendars');
    assert.equal(alternates['nl'], 'https://www.colorvaults.com/nl/calendars');
    assert.equal(alternates['de'], 'https://www.colorvaults.com/de/calendars');
    assert.equal(alternates['fr'], 'https://www.colorvaults.com/fr/calendars');
    assert.equal(alternates['x-default'], 'https://www.colorvaults.com/en/calendars');
  });
});

describe('Structured Data Escaping', () => {
  it('prevents XSS by escaping < and > in JSON-LD stringify', () => {
    const malicious = { name: 'Test</script><script>alert(1)</script>' };
    const serialized = safeJsonLd(malicious);
    assert.ok(!serialized.includes('</script>'));
    assert.ok(serialized.includes('\\u003c/script\\u003e'));
  });

  it('outputs valid WebSite and Organization schema graph', () => {
    const schema = buildWebsiteAndOrgSchema('en');
    assert.equal(schema['@context'], 'https://schema.org');
    assert.equal(schema['@graph'].length, 2);
    const org = schema['@graph'].find((item: any) => item['@type'] === 'Organization');
    assert.ok(org);
    assert.equal(org.name, 'ColorVaults');
    assert.equal(org.url, 'https://www.colorvaults.com');
  });
});
