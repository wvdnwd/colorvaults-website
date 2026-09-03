'use client';

import React, { useState, useEffect, useRef, useCallback } from'react';
import { useRouter } from'next/navigation';
import Link from'next/link';
import Image from'next/image';
import styles from'./HeaderSearchBar.module.css';

interface SearchResult {
 lang: string;
 type:'hub'|'theme'|'page';
 title: string;
 description: string;
 url: string;
 image?: string;
 tags?: string[];
}

export default function HeaderSearchBar({ lang }: { lang: string }) {
 const router = useRouter();
 const [query, setQuery] = useState('');
 const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
 const [loading, setLoading] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const [highlightIndex, setHighlightIndex] = useState(-1);
 const [isFocused, setIsFocused] = useState(false);

 const isEn = lang ==='en';
 const containerRef = useRef<HTMLDivElement>(null);

 // Debounced search fetching
 useEffect(() => {
 if (query.trim().length < 2) {
 setSuggestions([]);
 setIsOpen(false);
 return;
 }

 const timer = setTimeout(async () => {
 setLoading(true);
 try {
 const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${lang}`);
 if (res.ok) {
 const data: SearchResult[] = await res.json();
 setSuggestions(data.slice(0, 6));
 setIsOpen(true);
 setHighlightIndex(-1);
 }
 } catch (err) {
 console.error('Search fetch error', err);
 } finally {
 setLoading(false);
 }
 }, 200);

 return () => clearTimeout(timer);
 }, [query, lang]);

 // Click outside listener
 useEffect(() => {
 const handleOutsideClick = (e: MouseEvent) => {
 if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
 setIsOpen(false);
 setIsFocused(false);
 }
 };
 document.addEventListener('mousedown', handleOutsideClick);
 return () => document.removeEventListener('mousedown', handleOutsideClick);
 }, []);

 const handleSubmit = useCallback((e?: React.FormEvent) => {
 if (e) e.preventDefault();
 if (!query.trim()) return;
 setIsOpen(false);
 router.push(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
 }, [query, lang, router]);

 const handleKeyDown = (e: React.KeyboardEvent) => {
 if (!isOpen || suggestions.length === 0) {
 if (e.key ==='Enter') {
 handleSubmit();
 }
 return;
 }

 if (e.key ==='ArrowDown') {
 e.preventDefault();
 setHighlightIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
 } else if (e.key ==='ArrowUp') {
 e.preventDefault();
 setHighlightIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
 } else if (e.key ==='Enter') {
 e.preventDefault();
 if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
 const selected = suggestions[highlightIndex];
 setIsOpen(false);
 router.push(selected.url);
 } else {
 handleSubmit();
 }
 } else if (e.key ==='Escape') {
 setIsOpen(false);
 }
 };

 const typeBadgeText = (type: string) => {
 if (type ==='hub') return isEn ?'Hub':'Collectie';
 if (type ==='theme') return isEn ?'Theme':'Thema';
 return isEn ?'Page':'Kleurplaat';
 };

 const typeBadgeBg = (type: string) => {
 if (type ==='hub') return'rgba(124, 58, 237, 0.2)';
 if (type ==='theme') return'rgba(14, 165, 233, 0.2)';
 return'rgba(16, 185, 129, 0.2)';
 };

 const typeBadgeColor = (type: string) => {
 if (type ==='hub') return'#A78BFA';
 if (type ==='theme') return'#38BDF8';
 return'#34D399';
 };

 return (
 <div className={styles.container} ref={containerRef}>
 <form onSubmit={handleSubmit} style={{ width:'100%'}}>
        <div className={`${styles.inputWrapper} ${isFocused ? styles.inputWrapperFocused :''}`}>
          <span className={styles.searchIcon}>
            <svg width="16"height="16"viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2.5"strokeLinecap="round"strokeLinejoin="round"aria-hidden="true">
              <circle cx="11"cy="11"r="8"/>
              <line x1="21"y1="21"x2="16.65"y2="16.65"/>
            </svg>
          </span>
          <input
            type="search"value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (suggestions.length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={isEn ?'Search 9,000+ free coloring pages...':'Zoek 9.000+ gratis kleurplaten...'}
            className={styles.input}
            aria-label={isEn ?'Search coloring pages':'Zoek kleurplaten'}
          />
          {loading && <span className={styles.spinner} />}
          {query && !loading && (
            <button
              type="button"className={styles.clearBtn}
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
              }}
              aria-label={isEn ?'Clear search':'Zoekopdracht wis'}
            >
              ✕
            </button>
          )}
        </div>
 </form>

 {isOpen && suggestions.length > 0 && (
 <div className={styles.dropdown} role="listbox">
 {suggestions.map((item, idx) => (
 <Link
 key={item.url + idx}
 href={item.url}
 className={`${styles.dropdownItem} ${idx === highlightIndex ? styles.dropdownItemHighlighted :''}`}
 onClick={() => setIsOpen(false)}
 role="option"aria-selected={idx === highlightIndex}
 >
 {item.image ? (
 <img src={item.image} alt={item.title} className={styles.thumb} width={38} height={38} />
 ) : (
 <div className={styles.thumb} style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
 
 </div>
 )}
 <div className={styles.info}>
 <span className={styles.title}>{item.title}</span>
 {item.description && <span className={styles.sub}>{item.description.slice(0, 55)}...</span>}
 </div>
 <span
 className={styles.typeBadge}
 style={{ background: typeBadgeBg(item.type), color: typeBadgeColor(item.type) }}
 >
 {typeBadgeText(item.type)}
 </span>
 </Link>
 ))}
 <Link
 href={`/${lang}/search?q=${encodeURIComponent(query.trim())}`}
 className={styles.viewAllRow}
 onClick={() => setIsOpen(false)}
 >
 {isEn ?`View all results for"${query}"→`:`Bekijk alle resultaten voor"${query}"→`}
 </Link>
 </div>
 )}
 </div>
 );
}
