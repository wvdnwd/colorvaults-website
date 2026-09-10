import Link from 'next/link';
import { buildThemeFilterHref, type AgeRoute, type Difficulty } from '@/lib/themeFilters';
import styles from'./DifficultyFilterBar.module.css';

interface DifficultyFilterBarProps {
  isEn: boolean;
  basePath: string;
  currentDifficulty?: Difficulty;
  activeAge?: AgeRoute;
  counts: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  ageCounts: {
    all: number;
    toddlers: number;
    kids: number;
    teens: number;
  };
}

export default function DifficultyFilterBar({
  isEn,
  basePath,
  currentDifficulty,
  activeAge,
  counts,
  ageCounts,
}: DifficultyFilterBarProps) {
  const filters = [
    {
      id:'all',
      label: isEn ?'All Pages':'Alle Kleurplaten',
      count: counts.all,
    },
    {
      id:'easy',
      label: isEn ?'Easy':'Makkelijk',
      count: counts.easy,
    },
    {
      id:'medium',
      label: isEn ?'Medium':'Gemiddeld',
      count: counts.medium,
    },
    {
      id:'hard',
      label: isEn ?'Hard':'Moeilijk',
      count: counts.hard,
    },
  ] as const;

  const ages = [
    { id: 'all', label: isEn ? 'All Ages' : 'Alle Leeftijden', count: ageCounts.all },
    { id: 'toddlers', label: isEn ? 'Toddlers' : 'Peuters', count: ageCounts.toddlers },
    { id: 'kids', label: isEn ? 'Kids' : 'Kinderen', count: ageCounts.kids },
    { id: 'teens', label: isEn ? 'Teens' : 'Tieners', count: ageCounts.teens },
  ] as const;

  return (
    <div className={styles.container}>
      <div className={styles.labelGroup}>
        <span className={styles.title}>{isEn ?'Filter by Difficulty:':'Filter op Moeilijkheidsgraad:'}</span>
      </div>

      <div className={styles.filterGrid}>
        {filters.map(item => {
          const isActive = item.id === (currentDifficulty || 'all');

          return (
            <Link
              key={item.id}
              href={buildThemeFilterHref(basePath, {
                age: activeAge,
                difficulty: item.id === 'all' ? undefined : item.id,
              })}
              className={`${styles.filterBtn} ${isActive ? styles.active :''}`}
              aria-current={isActive ? 'page' : undefined}>
              <span className={styles.btnLabel}>{item.label}</span>
              {item.count !== undefined && (
                <span className={styles.countBadge}>{item.count}</span>
              )}
            </Link>
          );
        })}
      </div>

      <div className={styles.labelGroup}>
        <span className={styles.title}>{isEn ? 'Browse by Age:' : 'Bekijk op Leeftijd:'}</span>
      </div>
      <div className={styles.filterGrid}>
        {ages.map(item => {
          const isActive = item.id === (activeAge || 'all');
          return (
            <Link
              key={item.id}
              href={buildThemeFilterHref(basePath, {
                age: item.id === 'all' ? undefined : item.id,
                difficulty: currentDifficulty,
              })}
              className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.btnLabel}>{item.label}</span>
              <span className={styles.countBadge}>{item.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
