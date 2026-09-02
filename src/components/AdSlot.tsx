'use client';

import { useEffect, useRef } from 'react';
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
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      if (typeof window !== 'undefined') {
        const insElement = adRef.current;
        // Check if the ad unit is already loaded or initialized
        if (insElement && !insElement.getAttribute('data-adsbygoogle-status')) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      }
    } catch (e) {
      console.warn('AdSense push notice:', e);
    }
  }, []);

  // Prepare valid AdSense data attributes (NEVER pass data-ad-slot="auto" as Google rejects it)
  const adDataProps: Record<string, string> = {
    'data-ad-client': 'ca-pub-1184801748776428',
    'data-ad-format': type === 'rectangle' ? 'rectangle' : type === 'in-feed' ? 'fluid' : 'auto',
    'data-full-width-responsive': 'true',
  };

  // Only attach data-ad-slot if a real numeric slotId was passed
  if (slotId && /^\d+$/.test(slotId.trim())) {
    adDataProps['data-ad-slot'] = slotId.trim();
  }

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
        {/* Google AdSense ad unit */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          {...adDataProps}
        />
      </div>
    </div>
  );
}
