'use client';

import { useEffect, useState } from 'react';
import styles from './AdSlot.module.css';

interface AdSlotProps {
  type?: 'banner' | 'rectangle' | 'in-feed';
  text?: string;
  slotId?: string;
}

export default function AdSlot({
  type = 'banner',
  text = 'Advertisement',
  slotId,
}: AdSlotProps) {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // NOTE: adLoaded will only be true if adsbygoogle is already initialized
    // (e.g. returning visitors with a warm AdSense script).
    // On first load, AdSense initializes asynchronously AFTER this effect runs,
    // so adLoaded stays false and the placeholder remains visible.
    // This is intentional — the placeholder is better than a blank/broken ad unit.
    // The <ins> element is queued via .push({}) regardless of adLoaded state.
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (err) {
      // AdSense initialization fallback
    }
  }, []);

  return (
    <div 
      className={`${styles.adSlot} ${styles[type]}`} 
      role="complementary" 
      aria-label={text}
    >
      <div className={styles.adHeader}>
        <span className={styles.adTag}>{text}</span>
      </div>
      
      <div className={styles.adContainer}>
        {/* Placeholder rendering when no real Google AdSense slotId is provided */}
        <ins
          className="adsbygoogle"
          style={{ display: adLoaded ? 'block' : 'none', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-1184801748776428"
          data-ad-slot={slotId || "1234567890"}
          data-ad-format={type === 'rectangle' ? 'rectangle' : type === 'in-feed' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />

        {/* Visual fallback for preview / development */}
        {!adLoaded && (
          <div className={styles.adPlaceholder} aria-hidden="true">
            <span className={styles.adIcon}>📢</span>
            <span className={styles.adLabel}>{text}</span>
            <span className={styles.adSublabel}>Google AdSense</span>
          </div>
        )}
      </div>
    </div>
  );
}
