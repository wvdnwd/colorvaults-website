import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getMainHubs, getThemes, type ColoringPage } from '../src/lib/api';
import {
  escapeRssXml,
  filterPinterestPages,
  getImageMimeType,
  getPinterestPageUrl,
  renderPinterestRssItem,
  resolvePinterestFilters,
} from '../src/lib/pinterestFeed';

const hubs = [{ slug: 'animals-wildlife' }, { slug: 'holidays-seasons' }];
const themes = [
  { slug: 'cute-cats', parentHub: 'animals-wildlife' },
  { slug: 'halloween', parentHub: 'holidays-seasons' },
];

function page(overrides: Partial<ColoringPage> = {}): ColoringPage {
  return {
    slug: 'cats-and-dogs',
    parentHub: 'animals-wildlife',
    parentTheme: 'cute-cats',
    ageGroup: 'kids',
    title: 'Cats & Dogs <Together> "Today"',
    shortDescription: '',
    image: 'https://images.example/cat%20and%20dog.webp?version=1&size=large',
    ...overrides,
  };
}

describe('Pinterest RSS helpers', () => {
  it('escapes XML metacharacters and removes XML 1.0-invalid characters', () => {
    assert.equal(
      escapeRssXml('A & B <C> "D" \'E\'\u0000\u0008'),
      'A &amp; B &lt;C&gt; &quot;D&quot; &apos;E&apos;',
    );
  });

  it('detects supported image MIME types from URL paths', () => {
    assert.equal(getImageMimeType('https://cdn.example/image.WEBP?x=1'), 'image/webp');
    assert.equal(getImageMimeType('https://cdn.example/image.jpg'), 'image/jpeg');
    assert.equal(getImageMimeType('https://cdn.example/image.JPEG#preview'), 'image/jpeg');
    assert.equal(getImageMimeType('https://cdn.example/image.png'), 'image/png');
    assert.equal(getImageMimeType('javascript:alert(1).png'), null);
    assert.equal(getImageMimeType('/relative/image.webp'), null);
    assert.equal(getImageMimeType('https://cdn.example/image.gif'), null);
  });

  it('renders fully escaped RSS with matching enclosure and media MIME types', () => {
    const xml = renderPinterestRssItem(page(), 'Thu, 10 Sep 2026 00:00:00 GMT');

    assert.match(xml, /Cats &amp; Dogs &lt;Together&gt; &quot;Today&quot;/);
    assert.match(xml, /url="https:\/\/images\.example\/cat%20and%20dog\.webp\?version=1&amp;size=large" type="image\/webp"/);
    assert.equal((xml.match(/type="image\/webp"/g) ?? []).length, 2);
    assert.ok(!xml.includes('<Together>'));
  });

  it('preserves authoritative source titles without regex cleanup', () => {
    const xml = renderPinterestRssItem(page({ title: 'A clean printa broken source title' }), 'Thu, 10 Sep 2026 00:00:00 GMT');
    assert.match(xml, /A clean printa broken source title - Free Printable Coloring Page/);
  });

  it('builds stable canonical www destination links', () => {
    assert.equal(
      getPinterestPageUrl(page()),
      'https://www.colorvaults.com/en/animals-wildlife/cute-cats/kids/cats-and-dogs',
    );
  });
});

describe('Pinterest catalog filters', () => {
  it('accepts exact hub, theme, and combined filters', () => {
    assert.deepEqual(resolvePinterestFilters('ANIMALS-WILDLIFE', null, hubs, themes), {
      filters: { hub: 'animals-wildlife' },
    });
    assert.deepEqual(resolvePinterestFilters(null, 'cute-cats', hubs, themes), {
      filters: { theme: 'cute-cats' },
    });
    assert.deepEqual(resolvePinterestFilters('animals-wildlife', 'cute-cats', hubs, themes), {
      filters: { hub: 'animals-wildlife', theme: 'cute-cats' },
    });
  });

  it('accepts every hub slug discovered from the authoritative catalog', () => {
    const catalogHubs = getMainHubs('en');
    const catalogThemes = getThemes('en');
    assert.equal(catalogHubs.length, 11);
    for (const hub of catalogHubs) {
      assert.deepEqual(resolvePinterestFilters(hub.slug, null, catalogHubs, catalogThemes), {
        filters: { hub: hub.slug },
      });
    }
  });

  it('rejects malformed, unknown, partial, and mismatched filters', () => {
    assert.match(resolvePinterestFilters('../animals', null, hubs, themes).error ?? '', /alphanumeric/);
    assert.match(resolvePinterestFilters('', null, hubs, themes).error ?? '', /non-empty/);
    assert.match(resolvePinterestFilters('animals', null, hubs, themes).error ?? '', /Unknown hub/);
    assert.match(resolvePinterestFilters(null, 'cats', hubs, themes).error ?? '', /Unknown theme/);
    assert.match(
      resolvePinterestFilters('holidays-seasons', 'cute-cats', hubs, themes).error ?? '',
      /does not belong/,
    );
  });

  it('applies hub and theme together and excludes unsupported images', () => {
    const pages = [
      page(),
      page({ slug: 'other-theme', parentTheme: 'halloween' }),
      page({ slug: 'bad-image', image: 'https://images.example/image.gif' }),
    ];
    assert.deepEqual(
      filterPinterestPages(pages, { hub: 'animals-wildlife', theme: 'cute-cats' }).map(item => item.slug),
      ['cats-and-dogs'],
    );
  });
});
