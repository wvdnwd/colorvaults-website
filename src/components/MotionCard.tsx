'use client';

import { motion } from 'framer-motion';
import SafeImage from './SafeImage';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

const TRENDING_SLUGS = new Set([
  'paw-patrol-1', 'paw-patrol-2', 'unicorn-1', 'unicorn-2',
  'mandala-1', 'mandala-2', 'pokemon-1', 'pikachu-1',
  'disney-princess-1', 'frozen-elsa-1', 'spongebob-1',
  'dinosaur-1', 'dinosaur-2', 'bluey-1', 'bluey-2',
]);

interface MotionCardProps {
  page: {
    id?: string;
    slug: string;
    title: string;
    preview?: string;
    image?: string;
    shortDescription?: string;
    parentHub: string;
    parentTheme: string;
    ageGroup: string;
  };
  lang: string;
  isEn: boolean;
}

export default function MotionCard({ page, lang, isEn }: MotionCardProps) {
  const url = `/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`;
  const isTrending = TRENDING_SLUGS.has(page.slug);
  const imageSrc = page.preview || page.image || '';
  const favItem = { id: page.id || page.slug, slug: page.slug, title: page.title, preview: imageSrc, url };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ position: 'relative' }}
    >
      <Link href={url} className="card" style={{ height: '100%' }}>
        <div className="card-img-wrapper" style={{ aspectRatio: '3/4', position: 'relative', background: '#FFFFFF', padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
          <SafeImage 
            src={imageSrc} 
            alt={page.title} 
            width={400} 
            height={400} 
            className="card-img" 
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
            <FavoriteButton item={favItem} />
          </div>
          {isTrending && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 10,
              background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
              color: 'white',
              borderRadius: '9999px',
              padding: '0.18rem 0.6rem',
              fontSize: '0.68rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              boxShadow: '0 2px 8px rgba(255,107,53,0.4)',
              letterSpacing: '0.02em',
            }}>
              <span aria-hidden="true">🔥</span>
              <span>Trending</span>
            </div>
          )}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-full)',
            padding: '0.2rem 0.65rem',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--primary)',
            textTransform: 'capitalize',
            border: '1px solid rgba(108, 92, 231, 0.15)'
          }}>
            {page.ageGroup}
          </div>
        </div>
        
        <div className="card-body">
          <h3 className="card-title">{page.title}</h3>
          <p className="card-desc" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {page.shortDescription}
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: 'auto',
            paddingTop: '0.75rem',
            color: 'var(--primary)',
            fontSize: '0.825rem',
            fontWeight: 800
          }}>
            <span>✨</span>
            <span>{isEn ? 'Print & Download' : 'Printen & Downloaden'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
