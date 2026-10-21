import { blogPosts } from '@/data/blogs';
import { notFound } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import AdSlot from '@/components/AdSlot';
import { getFeaturedPages, safeJsonLd } from '@/lib/api';
import { createMetadata } from '@/lib/seo';
import { SITE_ORIGIN } from '@/lib/site';

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const post of blogPosts.en) {
    params.push({ lang: 'en', slug: post.slug });
  }
  for (const post of blogPosts.nl) {
    params.push({ lang: 'nl', slug: post.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const posts = blogPosts[lang === 'nl' ? 'nl' : 'en'] || blogPosts.en;
  const post = posts.find(p => p.slug === slug);
  if (!post) return {};

  return createMetadata({
    lang,
    path: `/blog/${slug}`,
    title: `${post.title} | ColorVaults`,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isEn = lang !== 'nl';
  const posts = blogPosts[lang === 'nl' ? 'nl' : 'en'] || blogPosts.en;
  const post = posts.find(p => p.slug === slug);

  if (!post) return notFound();

  // Get 8 high-quality coloring pages to recommend to readers
  const relatedColoringPages = getFeaturedPages(lang, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http') ? post.image : `${SITE_ORIGIN}${post.image}`,
    datePublished: '2026-01-15T08:00:00+01:00',
    dateModified: '2026-10-21T18:00:00+02:00',
    author: {
      '@type': 'Organization',
      name: 'ColorVaults Creative Team',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ColorVaults',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/images/og-share.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/${lang}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="page-hero">
        <div className="container" style={{ maxWidth: '880px' }}>
          <Breadcrumbs
            items={[
              { label: isEn ? 'Guides' : 'Tips', href: `/${lang}/blog` },
              { label: post.title },
            ]}
            lang={lang}
          />
          <span className="badge" style={{ marginTop: '1rem' }}>
            {post.category} • {post.readTime}
          </span>
          <h1 className="title-h1" style={{ marginTop: '0.85rem', fontSize: '2.4rem' }}>
            {post.title}
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '0.6rem' }}>
            {post.date}
          </p>
        </div>
      </div>

      <div className="container section" style={{ maxWidth: '880px' }}>
        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--gray-200)' }}>
          <SafeImage
            src={post.image}
            alt={post.title}
            width={880}
            height={495}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div
          className="seo-block"
          style={{ fontSize: '1.05rem', lineHeight: 1.85 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ margin: '3rem 0' }}>
          <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
        </div>

        {/* Recommended Coloring Pages to Print & Download */}
        {relatedColoringPages.length > 0 && (
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '2px solid var(--gray-200)' }}>
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <div>
                <span className="badge">{isEn ? 'Printable Crafts' : 'Printbare Kleurplaten'}</span>
                <h2 className="title-h2" style={{ marginTop: '0.4rem', fontSize: '1.6rem' }}>
                  {isEn ? '🎨 Free Printable Coloring Pages for You' : '🎨 Gratis Printbare Kleurplaten bij dit Onderwerp'}
                </h2>
              </div>
            </div>

            <div className="grid-4">
              {relatedColoringPages.map((page) => (
                <MotionCard key={page.slug} page={page} lang={lang} isEn={isEn} />
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href={`/${lang}/blog`} className="btn-secondary">
            ← {isEn ? 'Back to All Guides' : 'Terug naar Alle Tips'}
          </Link>
          <Link href={`/${lang}`} className="btn-primary">
            {isEn ? 'Explore All Coloring Pages' : 'Ontdek Alle Kleurplaten'} →
          </Link>
        </div>
      </div>
    </>
  );
}
