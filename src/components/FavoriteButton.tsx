'use client';

import { useFavoritesContext, FavoriteItem } from '@/context/FavoritesContext';
import { useState, useEffect } from 'react';

export default function FavoriteButton({ 
 item, 
 className = '' 
}: { 
 item: FavoriteItem;
 className?: string;
}) {
 const { isFavorite, toggleFavorite, isLoaded } = useFavoritesContext();
 const [mounted, setMounted] = useState(false);
 
 useEffect(() => {
 setMounted(true);
 }, []);

 if (!mounted || !isLoaded) {
 return <button className={className} style={{ opacity: 0, pointerEvents: 'none' }} aria-hidden="true" tabIndex={-1}></button>;
 }

 const active = isFavorite(item.id);

 return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(item);
      }}
      className={className}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        transition: 'transform 0.2s, background 0.2s',
        color: active ? '#ef4444' : '#9ca3af',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#ef4444' : 'none'} stroke={active ? '#ef4444' : '#6b7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
 );
}
