'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from '@/components/ConsentProvider';

/**
 * AdCard — an AdSense display ad styled as a coloring page card.
 * Drop this directly into a grid alongside MotionCard items.
 */
export default function AdCard() {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);
  const { consent } = useConsent();

  useEffect(() => {
    if (consent !== 'accepted') return;
    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        const ins = adRef.current;
        if (ins && !ins.getAttribute('data-adsbygoogle-status')) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      }
    } catch (e) {
      console.warn('AdCard push notice:', e);
    }
  }, [consent]);

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--gray-200)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '260px',
        padding: '0.75rem',
        position: 'relative',
      }}
      aria-label="Advertisement"
      role="complementary"
    >
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: 'var(--gray-400)',
          textTransform: 'uppercase',
          position: 'absolute',
          top: '0.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        Advertisement
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '200px' }}
        data-ad-client="ca-pub-1184801748776428"
        data-ad-slot="6437272564"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
