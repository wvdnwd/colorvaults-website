'use client';

import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { useState, useEffect } from 'react';

export default function FavoriteButton({ 
  item, 
  className = '' 
}: { 
  item: FavoriteItem;
  className?: string;
}) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isLoaded) {
    return <button className={className} style={{ opacity: 0 }} aria-hidden="true">🤍</button>;
  }

  const active = isFavorite(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent navigating if inside a Link
        toggleFavorite(item);
      }}
      className={className}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.25rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, background 0.2s',
        color: active ? '#ef4444' : '#9ca3af',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {active ? '❤️' : '🤍'}
    </button>
  );
}
