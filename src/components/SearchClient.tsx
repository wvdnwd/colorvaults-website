'use client';

import React, { useState, useEffect, useTransition } from'react';
import { useRouter, usePathname, useSearchParams } from'next/navigation';
import Link from'next/link';
import MotionCard from'@/components/MotionCard';
import SearchFilterBar from'@/components/SearchFilterBar';
import AdSlot from'@/components/AdSlot';
import { ColoringPage } from'@/lib/api';
import styles from'./SearchPage.module.css';

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
 allPages: ColoringPage[];
}

const PER_PAGE = 40;

export default function SearchClient({
 lang,
 initialQuery,
 initialDifficulty,
 initialAge,
 initialTheme,
 allThemes,
 allPages,
}: SearchClientProps) {
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const [isPending, startTransition] = useTransition();

 const [query, setQuery] = useState(initialQuery);
 const [difficulty, setDifficulty] = useState(initialDifficulty);
 const [age, setAge] = useState(initialAge);
 const [theme, setTheme] = useState(initialTheme);
 const [currentPage, setCurrentPage] = useState(1);

 const isEn = lang ==='en';

 // Sync state from searchParams if user navigates history
 useEffect(() => {
 setQuery(searchParams.get('q') ||'');
 setDifficulty(searchParams.get('difficulty') ||'');
 setAge(searchParams.get('age') ||'');
 setTheme(searchParams.get('theme') ||'');
 const p = parseInt(searchParams.get('page') ||'1', 10);
 setCurrentPage(isNaN(p) || p < 1 ? 1 : p);
 }, [searchParams]);

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

 setQuery(nextQuery);
 setDifficulty(nextDiff);
 setAge(nextAge);
 setTheme(nextTheme);
 setCurrentPage(1);

 updateUrl(nextQuery, nextDiff, nextAge, nextTheme, 1);
 };

 // Perform filtering locally for instant responsive grid rendering
 const filteredPages = allPages.filter(page => {
 // Search query filter (matches title or tags)
 if (query.trim()) {
 const qLower = query.toLowerCase();
 const titleMatch = page.title.toLowerCase().includes(qLower);
 const tagMatch = page.tags && page.tags.some(t => t.toLowerCase().includes(qLower));
 if (!titleMatch && !tagMatch) return false;
 }

 // Difficulty filter
 if (difficulty) {
 const diffMap: Record<string, string[]> = {
 easy: ['kids','kinderen','toddlers','peuters'],
 medium: ['teens','tieners'],
 hard: ['adults','volwassenen'],
 };
 const validAges = diffMap[difficulty] || [difficulty];
 if (!validAges.includes(page.ageGroup.toLowerCase())) return false;
 }

 // Age filter
 if (age) {
 if (page.ageGroup.toLowerCase() !== age.toLowerCase()) return false;
 }

 // Theme filter
 if (theme) {
 if (page.parentTheme !== theme) return false;
 }

 return true;
 });

 const totalPages = Math.ceil(filteredPages.length / PER_PAGE);
 const displayedPages = filteredPages.slice(
 (currentPage - 1) * PER_PAGE,
 currentPage * PER_PAGE
 );

 return (
 <div className={styles.wrapper}>
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
 {filteredPages.length > 0 ? (
 <p>
 {isEn ?'Found':'Gevonden'}{''}
 <strong>{filteredPages.length}</strong>{''}
 {isEn ?'coloring pages':'kleurplaten'}
 </p>
 ) : null}
 </div>

 {/* Grid Results */}
 {filteredPages.length === 0 ? (
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
 <div className="grid-4">
 {displayedPages.map((page, index) => {
 const shouldShowAd = (index + 1) % 6 === 0;

 return (
 <React.Fragment key={page.slug + page.parentTheme}>
 <MotionCard page={page} lang={lang} isEn={isEn} />
 {shouldShowAd && (
 <AdSlot type="in-feed"text={isEn ?'Sponsored':'Gesponsord'} />
 )}
 </React.Fragment>
 );
 })}
 </div>

 {/* Pagination Controls */}
 {totalPages > 1 && (
 <div style={{ marginTop:'3.5rem'}}>
 <div style={{ marginBottom:'1.5rem', textAlign:'center'}}>
 <p style={{ fontSize:'0.85rem', color:'var(--gray-500)', fontWeight: 600, marginBottom:'0.6rem'}}>
 {isEn
 ?`Page ${currentPage} of ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} of ${filteredPages.length} coloring pages`:`Pagina ${currentPage} van ${totalPages} — ${Math.min(currentPage * PER_PAGE, filteredPages.length)} van ${filteredPages.length} kleurplaten`}
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
 type="button"onClick={() => {
 const nextP = currentPage - 1;
 setCurrentPage(nextP);
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
 type="button"onClick={() => {
 const nextP = currentPage + 1;
 setCurrentPage(nextP);
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
