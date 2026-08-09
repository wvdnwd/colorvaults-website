import styles from './AdSlot.module.css';

export default function AdSlot({ type = 'banner', text = 'Advertisement' }: { type?: 'banner' | 'rectangle', text?: string }) {
  return (
    <div className={`${styles.adSlot} ${styles[type]}`}>
      <div className={styles.adContent}>
        <span className={styles.adIcon}>📢</span>
        <span className={styles.adText}>{text}</span>
      </div>
    </div>
  );
}
