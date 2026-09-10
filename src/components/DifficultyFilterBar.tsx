import Link from 'next/link';
import { AGES, Age, Difficulty, normalizeAge, normalizeDifficulty } from '@/lib/coloringPageFilters';
import styles from'./DifficultyFilterBar.module.css';

interface DifficultyFilterBarProps {
  lang: string;
  basePath: string;
  currentPath: string;
  difficulty?: string;
  age?: string;
  ageOptions?: readonly string[];
  counts: {
    all: number;
    easy: number;
    medium: number;
    hard: number;
  };
  ageCounts: Record<'all' | Age, number>;
}

const labels: Record<string, {
  difficulty: string;
  age: string;
  allPages: string;
  allAges: string;
  difficulties: Record<Difficulty, string>;
  ages: Record<Age, string>;
}> = {
  en: { difficulty: 'Filter by difficulty:', age: 'Filter by age:', allPages: 'All difficulties', allAges: 'All ages', difficulties: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, ages: { toddlers: 'Toddlers', kids: 'Kids', teens: 'Teens', adults: 'Adults' } },
  nl: { difficulty: 'Filter op moeilijkheid:', age: 'Filter op leeftijd:', allPages: 'Alle niveaus', allAges: 'Alle leeftijden', difficulties: { easy: 'Makkelijk', medium: 'Gemiddeld', hard: 'Moeilijk' }, ages: { toddlers: 'Peuters', kids: 'Kinderen', teens: 'Tieners', adults: 'Volwassenen' } },
  de: { difficulty: 'Nach Schwierigkeit filtern:', age: 'Nach Alter filtern:', allPages: 'Alle Stufen', allAges: 'Alle Altersgruppen', difficulties: { easy: 'Einfach', medium: 'Mittel', hard: 'Schwer' }, ages: { toddlers: 'Kleinkinder', kids: 'Kinder', teens: 'Jugendliche', adults: 'Erwachsene' } },
  fr: { difficulty: 'Filtrer par difficulté :', age: 'Filtrer par âge :', allPages: 'Tous les niveaux', allAges: 'Tous les âges', difficulties: { easy: 'Facile', medium: 'Moyen', hard: 'Difficile' }, ages: { toddlers: 'Tout-petits', kids: 'Enfants', teens: 'Ados', adults: 'Adultes' } },
};

function withDifficulty(path: string, difficulty?: Difficulty) {
  return difficulty ? `${path}?difficulty=${difficulty}` : path;
}

export default function DifficultyFilterBar({ lang, basePath, currentPath, difficulty, age, ageOptions, counts, ageCounts }: DifficultyFilterBarProps) {
  const text = labels[lang] || labels.en;
  const currentDifficulty = normalizeDifficulty(difficulty);
  const currentAge = normalizeAge(age);
  const availableAges = ageOptions
    ? [...new Set(ageOptions.flatMap(value => {
        const normalized = normalizeAge(value);
        return normalized ? [normalized] : [];
      }))]
    : AGES;

  const filters = [
    { id: undefined, label: text.allPages, count: counts.all },
    { id: 'easy' as const, label: text.difficulties.easy, count: counts.easy },
    { id: 'medium' as const, label: text.difficulties.medium, count: counts.medium },
    { id: 'hard' as const, label: text.difficulties.hard, count: counts.hard },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.labelGroup}>
        <span className={styles.title}>{text.difficulty}</span>
      </div>

      <div className={styles.filterGrid}>
        {filters.map(item => {
          const isActive = currentDifficulty === item.id;

          return (
            <Link
              key={item.id || 'all'}
              href={withDifficulty(currentPath, item.id)}
              className={`${styles.filterBtn} ${isActive ? styles.active :''}`}
              aria-current={isActive ? 'page' : undefined}>
              <span className={styles.btnLabel}>{item.label}</span>
              <span className={styles.countBadge}>{item.count}</span>
            </Link>
          );
        })}
      </div>

      <div className={styles.labelGroup}>
        <span className={styles.title}>{text.age}</span>
      </div>
      <div className={styles.filterGrid}>
        <Link
          href={withDifficulty(basePath, currentDifficulty)}
          className={`${styles.filterBtn} ${!currentAge ? styles.active : ''}`}
          aria-current={!currentAge ? 'page' : undefined}>
          <span className={styles.btnLabel}>{text.allAges}</span>
          <span className={styles.countBadge}>{ageCounts.all}</span>
        </Link>
        {availableAges.map(item => (
          <Link
            key={item}
            href={withDifficulty(`${basePath}/${item}`, currentDifficulty)}
            className={`${styles.filterBtn} ${currentAge === item ? styles.active : ''}`}
            aria-current={currentAge === item ? 'page' : undefined}>
            <span className={styles.btnLabel}>{text.ages[item]}</span>
            <span className={styles.countBadge}>{ageCounts[item]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
