'use client';

import { useState, useEffect } from'react';
import styles from'./StickyBottomAd.module.css';

const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === 'true';

export default function StickyBottomAd({ isEn = true }: { isEn?: boolean }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!adsEnabled) return;
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch {
      // safe fallback
    }
  }, []);

  if (!adsEnabled || dismissed) return null;

  return (
    <div className={styles.stickyWrapper} role="complementary" aria-label="Advertisement">
      <div className={styles.adContainer}>
        <button
          className={styles.closeBtn}
          onClick={() => setDismissed(true)}
          aria-label={isEn ? 'Dismiss ad' : 'Sluit advertentie'}
          type="button"
        >
          ✕
        </button>
        <span className={styles.adLabel}>{isEn ? 'Advertisement' : 'Advertentie'}</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '320px', height: '50px' }}
          data-ad-client="ca-pub-1184801748776428"
          data-ad-slot="5856381732"
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        />
      </div>
    </div>
  );
}
