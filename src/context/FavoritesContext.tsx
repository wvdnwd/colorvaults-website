'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FavoriteItem {
  id: string;
  slug: string;
  title: string;
  preview: string;
  url: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  isLoaded: boolean;
  storageError: string | null;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('colorvaults_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (e) {
      console.error('Could not load favorites', e);
      setStorageError('Could not load favorites from storage.');
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === item.id);
      const newFavorites = isFavorited
        ? prev.filter(fav => fav.id !== item.id)
        : [item, ...prev];
      try {
        localStorage.setItem('colorvaults_favorites', JSON.stringify(newFavorites));
        setStorageError(null);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          setStorageError('Storage full. Remove some favorites to continue saving.');
        } else {
          setStorageError('Could not save favorites. Storage may be disabled.');
        }
      }
      return newFavorites;
    });
  };

  const isFavorite = (id: string) => favorites.some(fav => fav.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isLoaded, storageError }}>
      {storageError && (
        <div 
          aria-live="polite" 
          style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #fca5a5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.875rem',
            position: 'relative',
            zIndex: 9999
          }}
        >
          <span>{storageError}</span>
          <button 
            onClick={() => setStorageError(null)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#991b1b', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginLeft: 'auto',
              padding: '0 0.5rem'
            }}
            aria-label="Dismiss warning"
          >
            ✕
          </button>
        </div>
      )}
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used inside FavoritesProvider');
  return ctx;
}
