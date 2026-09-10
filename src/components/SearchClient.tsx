'use client';

import React, { useOptimistic, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import MotionCard from '@/components/MotionCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import AdSlot from '@/components/AdSlot';
import AdCard from '@/components/AdCard';
import type { ColoringPage } from '@/lib/api';
import styles from './SearchPage.module.css';

interface ThemeOption {
 slug: string;
 title: string;
}

interface SearchClientProps {
 lang: string;
 initialQuery: string;
 initialDifficulty: string;
 initialAge: string;
 initialTheme: string;
 allThemes: ThemeOption[];
 initialPages: ColoringPage[];
 total: number;
 currentPage: number;
}

const PER_PAGE = 40;

export default function SearchClient({
 lang,
 initialQuery,
 initialDifficulty,
 initialAge,
 initialTheme,
 allThemes,
 initialPages,
 total,
 currentPage,
}: SearchClientProps) {
 const router = useRouter();
 const pathname = usePathname();
 const [isPending, startTransition] = useTransition();

 const [{ query, difficulty, age, theme }, setFilters] = useOptimistic({
   query: initialQuery, difficulty: initialDifficulty, age: initialAge, theme: initialTheme,
 });

 const isEn = lang === 'en';

 // Update URL helper
 const updateUrl = (newQuery: string, newDiff: string, newAge: string, newTheme: string, pageNum = 1) => {
 const params = new URLSearchParams();
 if (newQuery) params.set('q', newQuery);
 if (newDiff) params.set('difficulty', newDiff);
 if (newAge) params.set('age', newAge);
 if (newTheme) params.set('theme', newTheme);
 if (pageNum > 1) params.set('page', String(pageNum));

 const queryString = params.toString();
 const newUrl = queryString ?`${pathname}?${queryString}`: pathname;

 startTransition(() => {
 setFilters({ query: newQuery, difficulty: newDiff, age: newAge, theme: newTheme });
 router.push(newUrl, { scroll: false });
 });
 };

 const handleFilterChange = (updates: {
 query?: string;
 difficulty?: string;
 age?: string;
 theme?: string;
 }) => {
 const nextQuery = updates.query !== undefined ? updates.query : query;
 const nextDiff = updates.difficulty !== undefined ? updates.difficulty : difficulty;
 const nextAge = updates.age !== undefined ? updates.age : age;
 const nextTheme = updates.theme !== undefined ? updates.theme : theme;

 updateUrl(nextQuery, nextDiff, nextAge, nextTheme, 1);
 };

 const totalPages = Math.ceil(total / PER_PAGE);
 const displayedPages = initialPages;

 return (
 <div className={styles.wrapper} aria-busy={isPending}>
 {/* Combinable Filter Bar & Active Chips */}
 <SearchFilterBar
 lang={lang}
 query={query}
 difficulty={difficulty}
 age={age}
 theme={theme}
 themes={allThemes}
 onFilterChange={handleFilterChange}
 />

 {/* Results Header */}
 <div className={styles.resultCount}>
  {total > 0 ? (
 <p>
 {isEn ?'Found':'Gevonden'}{''}
  <strong>{total}</strong>{''}
 {isEn ?'coloring pages':'kleurplaten'}
 </p>
 ) : null}
 </div>

 {/* Grid Results */}
  {total === 0 ? (
 <div className={styles.empty}>
 <p style={{ fontWeight: 700, fontSize:'1.2rem', marginBottom:'0.5rem', color:'var(--foreground)'}}>
 {isEn ?'No coloring pages found matching your filters':'Geen kleurplaten gevonden met deze filters'}
 </p>
 <p style={{ color:'var(--gray-500)', fontSize:'0.95rem'}}>
 {isEn ?'Try adjusting your search keywords or clearing filters, or':'Probeer andere zoekwoorden of wis de filters, of'}
 <Link href={`/${lang}/request`} style={{ color:'var(--primary)', fontWeight: 700 }}>
 {isEn ?'request a new page →':'vraag een nieuwe pagina aan →'}
 </Link>
 </p>
 </div>
 ) : (
 <>
        {Array.from({ length: Math.ceil(displayedPages.length / 12) }).map((_, chunkIndex) => {
          const chunk = displayedPages.slice(chunkIndex * 12, chunkIndex * 12 + 12);
          const showAdBar = chunkIndex < Math.ceil(displayedPages.length / 12) - 1;

          const gridItems: React.ReactNode[] = [];
          chunk.forEach((page, idx) => {
            if (idx === 5) {
              gridItems.push(<AdCard key={`search-ad-${chunkIndex}`} />);
            }
            gridItems.push(<MotionCard key={page.slug + page.parentTheme} page={page} lang={lang} isEn={isEn} />);
          });

          return (
            <React.Fragment key={chunkIndex}>
              <div className="grid-4" style={{ marginBottom: showAdBar ? '2.5rem' : 0 }}>
                {gridItems}
              </div>
              {showAdBar && (
                <div style={{ margin: '2.5rem 0' }}>
                  <AdSlot type="banner" text={isEn ? 'Sponsored Content' : 'Gesponsord'} />
                </div>
              )}
            </React.Fragment>
          );
        })}

 {/* Pagination Controls */}
 {totalPages > 1 && (
 <div style={{ marginTop:'3.5rem'}}>
 <div style={{ marginBottom:'1.5rem', textAlign:'center'}}>
 <p style={{ fontSize:'0.85rem', color:'var(--gray-500)', fontWeight: 600, marginBottom:'0.6rem'}}>
 {isEn
  ?`Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, total)} of ${total} coloring pages`:`Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, total)} van ${total} kleurplaten`}
 </p>
 <div
 style={{
 height:'6px',
 background:'var(--gray-200, rgba(255,255,255,0.1))',
 borderRadius:'9999px',
 overflow:'hidden',
 maxWidth:'320px',
 margin:'0 auto',
 }}
 >
 <div
 style={{
 height:'100%',
 width:`${(currentPage / totalPages) * 100}%`,
 background:'linear-gradient(90deg, var(--primary), #A29BFE)',
 borderRadius:'9999px',
 transition:'width 0.4s ease',
 }}
 />
 </div>
 </div>

 <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'1rem'}}>
 {currentPage > 1 ? (
  <button
  disabled={isPending}
  type="button"onClick={() => {
 const nextP = currentPage - 1;
 updateUrl(query, difficulty, age, theme, nextP);
 }}
 className="btn-secondary">
 ← {isEn ?'Previous':'Vorige'}
 </button>
 ) : (
 <span className="btn-secondary"style={{ opacity: 0.4, pointerEvents:'none'}}>
 ← {isEn ?'Previous':'Vorige'}
 </span>
 )}

 <span
 style={{
 fontWeight: 800,
 color:'var(--foreground)',
 padding:'0.5rem 1rem',
 background:'var(--surface-2, rgba(255,255,255,0.08))',
 borderRadius:'var(--radius-full)',
 }}
 >
 {currentPage} / {totalPages}
 </span>

 {currentPage < totalPages ? (
  <button
  disabled={isPending}
  type="button"onClick={() => {
 const nextP = currentPage + 1;
 updateUrl(query, difficulty, age, theme, nextP);
 }}
 className="btn-primary">
 {isEn ?'Next':'Volgende'} →
 </button>
 ) : (
 <span className="btn-primary"style={{ opacity: 0.4, pointerEvents:'none'}}>
 {isEn ?'Next':'Volgende'} →
 </span>
 )}
 </div>
 </div>
 )}
 </>
 )}
 </div>
 );
}
