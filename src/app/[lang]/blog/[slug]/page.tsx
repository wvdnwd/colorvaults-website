import { blogPosts } from '@/data/blogs';
import { notFound } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

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

  return {
    title: `${post.title} | ColorVaults`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isEn = lang === 'en';
  const posts = blogPosts[lang === 'nl' ? 'nl' : 'en'] || blogPosts.en;
  const post = posts.find(p => p.slug === slug);

  if (!post) return notFound();

  return (
    <>
      <div className="page-hero">
        <div className="container" style={{ maxWidth: '800px' }}>
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

      <div className="container section" style={{ maxWidth: '800px' }}>
        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--gray-200)' }}>
          <SafeImage
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div
          className="seo-block"
          style={{ fontSize: '1.05rem', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href={`/${lang}/blog`} className="btn-secondary">
            ← {isEn ? 'Back to All Guides' : 'Terug naar Alle Tips'}
          </Link>
          <Link href={`/${lang}`} className="btn-primary">
            🎨 {isEn ? 'Explore All Coloring Pages' : 'Ontdek Alle Kleurplaten'}
          </Link>
        </div>
      </div>
    </>
  );
}
