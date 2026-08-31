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
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // AdSense initialization fallback — safe to ignore
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
        {/* Google AdSense ad unit — always rendered, Google fills it automatically */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-1184801748776428"
          data-ad-slot={slotId || 'auto'}
          data-ad-format={type === 'rectangle' ? 'rectangle' : type === 'in-feed' ? 'fluid' : 'auto'}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
