import styles from './AdSlot.module.css';

export default function AdSlot({ type = 'banner' }: { type?: 'banner' | 'rectangle' }) {
  return (
    <div className={`${styles.adSlot} ${styles[type]}`}>
      <span>Advertisement Placeholder</span>
    </div>
  );
}
