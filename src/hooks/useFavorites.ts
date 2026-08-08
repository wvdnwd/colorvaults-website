'use client';

import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  slug: string;
  title: string;
  preview: string;
  url: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('colorvaults_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Could not load favorites', e);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === item.id);
      let newFavorites;
      if (isFavorited) {
        newFavorites = prev.filter(fav => fav.id !== item.id);
      } else {
        newFavorites = [item, ...prev];
      }
      localStorage.setItem('colorvaults_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
