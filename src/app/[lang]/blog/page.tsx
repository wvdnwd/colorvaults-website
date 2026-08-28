import { blogPosts } from '@/data/blogs';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'nl' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn ? 'Parenting & Teaching Guides, Tips & Coloring Blog | ColorVaults' : 'Kleurplaten Tips, Opvoeding & Onderwijs Blog | ColorVaults',
    description: isEn
      ? 'Explore expert guides on child motor skills development, mindfulness coloring for adults, and creative classroom ideas.'
      : 'Ontdek handige tips voor fijne motoriek bij peuters, mindfulness kleurplaten voor volwassenen en creatieve lesideën voor de basisschool.',
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  const posts = blogPosts[lang === 'nl' ? 'nl' : 'en'] || blogPosts.en;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ label: isEn ? 'Guides & Articles' : 'Tips & Artikelen' }]}
            lang={lang}
          />
          <h1 className="title-h1" style={{ marginTop: '1rem' }}>
            {isEn ? 'Parenting & Teaching Guides' : 'Tips voor Ouders, Juffen & Meesters'}
          </h1>
          <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', marginTop: '0.6rem', maxWidth: '640px' }}>
            {isEn
              ? 'Discover creative ideas, educational benefits of coloring, and stress-relief tips for all ages.'
              : 'Ontdek creatieve lesideën, de voordelen van inkleuren voor de motoriek van kinderen en ontspanningstips voor volwassenen.'}
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-3">
          {posts.map(post => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="card">
              <div className="card-img-wrapper" style={{ aspectRatio: '16/9', position: 'relative' }}>
                <SafeImage
                  src={post.image}
                  alt={post.title}
                  className="card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                    {post.readTime}
                  </span>
                </div>
                <h2 className="card-title" style={{ fontSize: '1.15rem', lineHeight: 1.4, marginBottom: '0.6rem' }}>
                  {post.title}
                </h2>
                <p className="card-desc" style={{ marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.excerpt}
                </p>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.85rem' }}>
                  {isEn ? 'Read Article →' : 'Lees Artikel →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
