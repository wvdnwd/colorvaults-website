import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildCanonicalFeedUrl,
  escapeXml,
  getImageMimeType,
  parseHeadMetadata,
  renderItem,
  selectDailyPages,
  selectVerifiedPages,
  wrapCdata,
} from '../src/app/api/pinterest-feed/route';

describe('Pinterest feed helpers', () => {
  it('escapes XML markup and removes invalid XML 1.0 characters', () => {
    const invalidSurrogate = String.fromCharCode(0xd800);
    assert.equal(
      escapeXml(`A & <tag a="b"> '${invalidSurrogate}`),
      'A &amp; &lt;tag a=&quot;b&quot;&gt; &apos;',
    );
  });

  it('safely splits CDATA terminators', () => {
    assert.equal(wrapCdata('before]]>after'), '<![CDATA[before]]]]><![CDATA[>after]]>');
  });

  it('derives media MIME types from URL paths', () => {
    assert.equal(getImageMimeType('https://cdn.example.com/image.JPG?version=1'), 'image/jpeg');
    assert.equal(getImageMimeType('https://cdn.example.com/image.webp'), 'image/webp');
    assert.equal(getImageMimeType('http://cdn.example.com/image.png'), undefined);
    assert.equal(getImageMimeType('https://cdn.example.com/image.svg'), undefined);
  });

  it('builds the public canonical self URL with normalized filters', () => {
    assert.equal(
      buildCanonicalFeedUrl({ hub: ' Animals-Wildlife ', theme: 'DINOSAURS' }),
      'https://www.colorvaults.com/pinterest-feed.xml?hub=animals-wildlife&theme=dinosaurs',
    );
    assert.equal(buildCanonicalFeedUrl({}), 'https://www.colorvaults.com/pinterest-feed.xml');
  });

  it('keeps daily rotation stable and wraps at the end of the list', () => {
    const pages = ['a', 'b', 'c'];
    const morning = selectDailyPages(pages, new Date('2026-09-10T01:00:00Z'), 3);
    const evening = selectDailyPages(pages, new Date('2026-09-10T23:59:59Z'), 3);

    assert.deepEqual(morning, evening);
    assert.equal(new Set(morning).size, 3);
  });

  it('accepts only truthful image HEAD metadata from the allowlisted CDN', () => {
    const imageUrl = 'https://colorvaults.ams3.cdn.digitaloceanspaces.com/pages/owl.webp';
    assert.deepEqual(parseHeadMetadata(imageUrl, 200, 'image/webp; charset=binary', '12345'), {
      byteLength: 12345,
      mimeType: 'image/webp',
    });

    assert.equal(parseHeadMetadata(imageUrl, 200, 'image/webp', '0'), undefined);
    assert.equal(parseHeadMetadata(imageUrl, 200, 'image/png', '12345'), undefined);
    assert.equal(
      parseHeadMetadata('https://127.0.0.1/owl.webp', 200, 'image/webp', '12345'),
      undefined,
    );
    assert.equal(
      parseHeadMetadata(
        'https://colorvaults.ams3.cdn.digitaloceanspaces.com:8443/owl.webp',
        200,
        'image/webp',
        '12345',
      ),
      undefined,
    );
  });

  it('continues through candidates and preserves their order when metadata is unavailable', async () => {
    const candidates = ['a', 'b', 'c', 'd', 'e'].map(id => ({
      id,
      image: `https://colorvaults.ams3.cdn.digitaloceanspaces.com/${id}.webp`,
    }));
    const unavailable = new Set(['a', 'c']);
    const selected = await selectVerifiedPages(
      candidates,
      async url =>
        unavailable.has(url.split('/').at(-1)![0])
          ? undefined
          : { byteLength: 100, mimeType: 'image/webp' },
      3,
      2,
    );

    assert.deepEqual(
      selected.map(({ page }) => page.id),
      ['b', 'd', 'e'],
    );
  });

  it('renders every verified item with matching media content and a valid enclosure', () => {
    const image =
      'https://colorvaults.ams3.cdn.digitaloceanspaces.com/Forest%20Animals/owl.webp';
    const xml = renderItem(
      {
        title: 'Woodland Owl',
        slug: 'woodland-owl',
        parentHub: 'animals-wildlife',
        parentTheme: 'forest-animals',
        ageGroup: 'kids',
        image,
      },
      { byteLength: 98765, mimeType: 'image/webp' },
      'Thu, 10 Sep 2026 00:00:00 GMT',
    );

    assert.match(
      xml,
      /<enclosure url="https:\/\/colorvaults\.ams3\.cdn\.digitaloceanspaces\.com\/Forest%20Animals\/owl\.webp" type="image\/webp" length="98765" \/>/,
    );
    assert.match(
      xml,
      /<media:content url="https:\/\/colorvaults\.ams3\.cdn\.digitaloceanspaces\.com\/Forest%20Animals\/owl\.webp" medium="image" type="image\/webp">/,
    );
    assert.equal((xml.match(/<enclosure /g) ?? []).length, 1);
    assert.equal((xml.match(/<media:content /g) ?? []).length, 1);
  });
});
