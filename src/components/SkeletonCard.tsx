'use client';
import styles from'./SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonLine} />
        <div className={styles.skeletonLineShort} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
