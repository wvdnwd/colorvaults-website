'use client';

import { useEffect, useRef } from'react';
import styles from'./AdSlot.module.css';

interface AdSlotProps {
  type?:'banner'|'rectangle'|'in-feed';
  text?: string;
  slotId?: string;
}

export default function AdSlot({
  type ='banner',
  text ='Advertisement',
  slotId,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      if (typeof window !=='undefined') {
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

  // Default slot IDs per ad type (from Google AdSense dashboard)
  const SLOT_IDS: Record<string, string> = {
    banner: '5856381732',
    rectangle: '6437272564',
    'in-feed': '6760706190',
  };

  // Prepare valid AdSense data attributes
  const resolvedSlot = slotId && /^\d+$/.test(slotId.trim())
    ? slotId.trim()
    : SLOT_IDS[type] ?? SLOT_IDS['banner'];

  const adDataProps: Record<string, string> = {
    'data-ad-client': 'ca-pub-1184801748776428',
    'data-ad-slot': resolvedSlot,
    'data-ad-format': type === 'rectangle' ? 'rectangle' : type === 'in-feed' ? 'fluid' : 'auto',
    'data-full-width-responsive': 'true',
  };

  if (type === 'in-feed') {
    adDataProps['data-ad-layout-key'] = '-6t+ed+2i-1n-4w';
  }

  return (
    <div
      className={`${styles.adSlot} ${styles[type]}`}
      role="complementary"aria-label={text}
    >
      <div className={styles.adHeader}>
        <span className={styles.adTag}>{text}</span>
      </div>

      <div className={styles.adContainer}>
        {/* Google AdSense ad unit */}
        <ins
          ref={adRef}
          className="adsbygoogle"style={{ display:'block', width:'100%'}}
          {...adDataProps}
        />
      </div>
    </div>
  );
}
