'use client';

import { useState, useEffect } from 'react';
import { useConsent } from '@/components/ConsentProvider';
import styles from './CookieBanner.module.css';

export default function CookieBanner({ lang }: { lang: string }) {
  const { consent, acceptConsent, declineConsent } = useConsent();
  const [mounted, setMounted] = useState(false);
  const isEn = lang === 'en';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || consent !== 'unknown') return null;

  return (
    <div className={styles.banner} role="dialog" aria-label={isEn ? 'Cookie consent' : 'Cookie toestemming'}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>🍪 {isEn ? 'We respect your privacy' : 'Wij respecteren je privacy'}</p>
          <p className={styles.desc}>
            {isEn
              ? 'We use cookies to enhance your experience and display relevant advertisements. You can accept or decline non-essential cookies at any time.'
              : 'Wij gebruiken cookies om je ervaring te verbeteren en advertenties te tonen. Je kunt niet-essentiële cookies weigeren of accepteren.'}
            {' '}
            <a href={`/${lang}/privacy-policy`} className={styles.link}>
              {isEn ? 'Privacy Policy' : 'Privacybeleid'}
            </a>
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={declineConsent} className={styles.btnDecline}>
            {isEn ? 'Decline' : 'Weigeren'}
          </button>
          <button onClick={acceptConsent} className={styles.btnAccept}>
            {isEn ? 'Accept All' : 'Alles Accepteren'}
          </button>
        </div>
      </div>
    </div>
  );
}
