'use client';

import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FavoriteButton from '@/components/FavoriteButton';

export default function FavoritesPage({ params }: { params: { lang: string } }) {
  const { favorites, isLoaded } = useFavorites();
  const isEn = params.lang === 'en';

  if (!isLoaded) {
    return <div className="container section" style={{ minHeight: '60vh' }}></div>;
  }

  return (
    <div className="container section" style={{ minHeight: '60vh' }}>
      <div className="section-header">
        <h1 className="title-h1">{isEn ? 'Your Favorites' : 'Jouw Favorieten'}</h1>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤍</p>
          <h2 className="title-h2" style={{ marginBottom: '1rem' }}>
            {isEn ? 'No favorites yet' : 'Nog geen favorieten'}
          </h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>
            {isEn ? 'Browse our collection and click the heart icon to save pages here.' : 'Bekijk onze collectie en klik op het hartje om pagina\'s hier op te slaan.'}
          </p>
          <Link href={`/${params.lang}`} className="btn-primary">
            {isEn ? 'Browse Pages' : 'Bekijk Kleurplaten'}
          </Link>
        </div>
      ) : (
        <div className="grid-4">
          {favorites.map((fav, i) => (
            <motion.div
              key={fav.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              style={{ position: 'relative' }}
            >
              <Link href={fav.url} className="card" style={{ height: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <Image src={fav.preview} alt={fav.title} width={400} height={400} className="card-img" />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                    <FavoriteButton item={fav} />
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{fav.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
