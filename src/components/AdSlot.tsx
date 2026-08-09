'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // AdSense initialization fallback
    }
  }, []);

  return (
    <div className={`${styles.adSlot} ${styles[type]}`}>
      <div className={styles.adHeader}>
        <span className={styles.adTag}>{text}</span>
      </div>
      
      <div className={styles.adContainer}>
        {/* Placeholder rendering when no real Google AdSense slotId is provided */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with real AdSense Publisher ID
          data-ad-slot={slotId || "1234567890"}
          data-ad-format={type === 'rectangle' ? 'rectangle' : type === 'in-feed' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />

        {/* Visual fallback for preview / development */}
        <div className={styles.adPlaceholder}>
          <span className={styles.adIcon}>📢</span>
          <span className={styles.adLabel}>{text}</span>
          <span className={styles.adSublabel}>Google AdSense</span>
        </div>
      </div>
    </div>
  );
}
