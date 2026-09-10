'use client';

import { useConsent } from '@/components/ConsentProvider';

export default function CookieSettingsButton({ isEn }: { isEn: boolean }) {
  const { resetConsent } = useConsent();

  return (
    <button
      type="button"
      onClick={resetConsent}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        textAlign: 'left',
        opacity: 0.8,
        fontSize: '0.85rem',
      }}
    >
      {isEn ? 'Cookie Settings' : 'Cookie-instellingen'}
    </button>
  );
}
