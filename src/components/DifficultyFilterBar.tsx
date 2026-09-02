'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './DifficultyFilterBar.module.css';

interface DifficultyFilterBarProps {
  isEn: boolean;
  counts: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
}

export default function DifficultyFilterBar({ isEn, counts }: DifficultyFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentDiff = searchParams.get('difficulty') || 'all';

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('difficulty');
    } else {
      params.set('difficulty', value);
    }
    params.delete('page'); // Reset to page 1 on filter change
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const filters = [
    {
      id: 'all',
      label: isEn ? 'All Pages' : 'Alle Kleurplaten',
      count: counts.all,
    },
    {
      id: 'easy',
      label: isEn ? 'Easy' : 'Makkelijk',
      count: counts.easy,
    },
    {
      id: 'medium',
      label: isEn ? 'Medium' : 'Gemiddeld',
      count: counts.medium,
    },
    {
      id: 'hard',
      label: isEn ? 'Hard' : 'Moeilijk',
      count: counts.hard,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.labelGroup}>
        <span className={styles.title}>{isEn ? 'Filter by Difficulty:' : 'Filter op Moeilijkheidsgraad:'}</span>
      </div>

      <div className={styles.filterGrid}>
        {filters.map(item => {
          const isActive = currentDiff === item.id || (item.id === 'easy' && currentDiff === 'kids') || (item.id === 'medium' && currentDiff === 'teens') || (item.id === 'hard' && currentDiff === 'adults');

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
              type="button"
            >
              <span className={styles.btnLabel}>{item.label}</span>
              {item.count !== undefined && (
                <span className={styles.countBadge}>{item.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
