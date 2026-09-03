'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SelectedColoringPage {
  id: string;
  slug: string;
  title: string;
  image: string;
  parentHub?: string;
  parentTheme?: string;
  ageGroup?: string;
}

interface ColoringBookContextType {
  selectedPages: SelectedColoringPage[];
  toggleSelectPage: (page: SelectedColoringPage) => void;
  isPageSelected: (slug: string) => boolean;
  clearSelection: () => void;
  removePage: (slug: string) => void;
  totalSelected: number;
}

const ColoringBookContext = createContext<ColoringBookContextType | undefined>(undefined);

const STORAGE_KEY = 'colorvaults_custom_booklet_pages';

export function ColoringBookProvider({ children }: { children: React.ReactNode }) {
  const [selectedPages, setSelectedPages] = useState<SelectedColoringPage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSelectedPages(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load custom booklet from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPages));
    } catch (e) {
      console.warn('Failed to save custom booklet to localStorage', e);
    }
  }, [selectedPages, isLoaded]);

  const toggleSelectPage = (page: SelectedColoringPage) => {
    setSelectedPages((prev) => {
      const exists = prev.some((p) => p.slug === page.slug);
      if (exists) {
        return prev.filter((p) => p.slug !== page.slug);
      } else {
        // Max 30 pages per custom booklet to maintain optimal PDF generation speed
        if (prev.length >= 30) {
          alert('Je hebt het maximum van 30 kleurplaten per boekje bereikt! Download dit boekje of verwijder een pagina.');
          return prev;
        }
        return [...prev, page];
      }
    });
  };

  const removePage = (slug: string) => {
    setSelectedPages((prev) => prev.filter((p) => p.slug !== slug));
  };

  const isPageSelected = (slug: string) => {
    return selectedPages.some((p) => p.slug === slug);
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  return (
    <ColoringBookContext.Provider
      value={{
        selectedPages,
        toggleSelectPage,
        isPageSelected,
        clearSelection,
        removePage,
        totalSelected: selectedPages.length,
      }}
    >
      {children}
    </ColoringBookContext.Provider>
  );
}

export function useColoringBook() {
  const context = useContext(ColoringBookContext);
  if (!context) {
    throw new Error('useColoringBook must be used within a ColoringBookProvider');
  }
  return context;
}
