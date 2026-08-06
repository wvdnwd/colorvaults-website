'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './SearchPage.module.css';

interface SearchEntry {
  lang: string;
  type: 'hub' | 'theme' | 'page';
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

export default function SearchClient({ lang }: { lang: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const isEn = lang === 'en';

  // Load the search index once
  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then((data: SearchEntry[]) => {
        setIndex(data.filter(e => e.lang === lang));
        setLoaded(true);
      });
  }, [lang]);

  const search = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const matched = index.filter(e =>
      e.title.toLowerCase().includes(lower) ||
      e.description?.toLowerCase().includes(lower) ||
      e.tags?.some(t => t.toLowerCase().includes(lower))
    ).slice(0, 30);
    setResults(matched);
  }, [index]);

  useEffect(() => { search(query); }, [query, search]);

  const typeLabel = (type: string) => {
    if (type === 'hub') return isEn ? 'Collection' : 'Collectie';
    if (type === 'theme') return isEn ? 'Theme' : 'Thema';
    return isEn ? 'Page' : 'Pagina';
  };

  const typeColor = (type: string) => {
    if (type === 'hub') return '#7c3aed';
    if (type === 'theme') return '#0ea5e9';
    return '#10b981';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={isEn ? 'Search coloring pages, themes, collections...' : 'Zoek kleurplaten, thema\'s, collecties...'}
          className={styles.input}
        />
        {query && (
          <button onClick={() => setQuery('')} className={styles.clearBtn} aria-label="Clear">✕</button>
        )}
      </div>

      {!loaded && (
        <p className={styles.hint}>{isEn ? 'Loading search index...' : 'Zoekindex laden...'}</p>
      )}

      {loaded && !query && (
        <p className={styles.hint}>
          {isEn ? `Search across ${index.length} coloring pages, themes, and collections.` : `Zoek door ${index.length} kleurplaten, thema's en collecties.`}
        </p>
      )}

      {loaded && query && results.length === 0 && (
        <div className={styles.empty}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>😔</p>
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{isEn ? 'No results found' : 'Geen resultaten gevonden'}</p>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>
            {isEn ? 'Try different keywords, or ' : 'Probeer andere zoekwoorden, of '}
            <Link href={`/${lang}/request`} style={{ color: 'var(--primary)', fontWeight: 700 }}>
              {isEn ? 'request a new page →' : 'vraag een nieuwe pagina aan →'}
            </Link>
          </p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className={styles.resultCount}>
            {results.length} {isEn ? 'results for' : 'resultaten voor'} &ldquo;<strong>{query}</strong>&rdquo;
          </p>
          <div className={styles.results}>
            {results.map((r, i) => (
              <Link key={i} href={r.url} className={styles.result}>
                <div className={styles.resultTop}>
                  <span className={styles.badge} style={{ background: typeColor(r.type) + '20', color: typeColor(r.type) }}>
                    {typeLabel(r.type)}
                  </span>
                  <h3 className={styles.resultTitle}>{r.title}</h3>
                </div>
                {r.description && <p className={styles.resultDesc}>{r.description}</p>}
                <span className={styles.resultUrl}>{r.url}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
