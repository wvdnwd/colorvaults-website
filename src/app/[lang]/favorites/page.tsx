'use client';

import { useFavoritesContext } from'@/context/FavoritesContext';
import Link from'next/link';
import SafeImage from'@/components/SafeImage';
import { motion } from'framer-motion';
import FavoriteButton from'@/components/FavoriteButton';
import * as React from'react';

export default function FavoritesPage({ params }: { params: Promise<{ lang: string }> }) {
 const { favorites, isLoaded } = useFavoritesContext();
 const { lang } = React.use(params);
 const isEn = lang ==='en';

 if (!isLoaded) {
 return <div className="container section"style={{ minHeight:'60vh'}}></div>;
 }

 return (
 <div className="container section"style={{ minHeight:'60vh'}}>
 <div className="section-header">
 <h1 className="title-h1">{isEn ?'Your Favorites':'Jouw Favorieten'}</h1>
 </div>

 {favorites.length === 0 ? (
 <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'var(--surface)',
      borderRadius: '24px',
      border: '1.5px solid var(--gray-200)',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#EF4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        fontSize: '2.5rem'
      }}>
        ❤️
      </div>
      <h2 className="title-h2" style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>
        {isEn ? 'No favorites saved yet' : 'Nog geen favorieten bewaard'}
      </h2>
      <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1rem' }}>
        {isEn
          ? 'Explore our coloring pages and tap the heart icon on any page to easily find and print your favorites here.'
          : 'Ontdek onze kleurplaten en klik op het hartje om je favorieten op te slaan en later gemakkelijk te printen.'}
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href={`/${lang}`} className="btn-primary">
          {isEn ? 'Browse Coloring Pages' : 'Bekijk Kleurplaten'}
        </Link>
        <Link href={`/${lang}/search`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center' }}>
          {isEn ? 'Search Themes' : 'Zoek Thema’s'}
        </Link>
      </div>
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
 style={{ position:'relative'}}
 >
 <Link href={fav.url} className="card"style={{ height:'100%'}}>
 <div style={{ position:'relative'}}>
 <SafeImage src={fav.preview} alt={fav.title} className="card-img"style={{ width:'100%', height:'100%', objectFit:'cover'}} />
 <div style={{ position:'absolute', top:'10px', right:'10px', zIndex: 10 }}>
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
