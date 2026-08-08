'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

interface MotionCardProps {
  page: {
    id: string;
    slug: string;
    title: string;
    preview: string;
    shortDescription: string;
    parentHub: string;
    parentTheme: string;
    ageGroup: string;
  };
  lang: string;
  isEn: boolean;
}

export default function MotionCard({ page, lang, isEn }: MotionCardProps) {
  const url = `/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      <Link href={url} className="card" style={{ height: '100%' }}>
        <div style={{ position: 'relative' }}>
          <Image 
            src={page.preview} 
            alt={page.title} 
            width={400} 
            height={400} 
            className="card-img" 
          />
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
            <FavoriteButton 
              item={{ 
                id: page.id, 
                slug: page.slug, 
                title: page.title, 
                preview: page.preview, 
                url 
              }} 
            />
          </div>
        </div>
        <div className="card-body">
          <h3 className="card-title">{page.title}</h3>
          <p className="card-desc">{page.shortDescription}</p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.75rem',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            <span>🆓</span>
            <span>{isEn ? 'Free Download' : 'Gratis Downloaden'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
