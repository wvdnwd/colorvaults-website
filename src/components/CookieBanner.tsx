'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner({ lang }: { lang: string }) {
 const [visible, setVisible] = useState(false);
 const isEn = lang === 'en';

 useEffect(() => {
 const consent = localStorage.getItem('cv_cookie_consent');
 if (!consent) {
 // Short delay so it doesn't flash on initial load
 const t = setTimeout(() => setVisible(true), 1500);
 return () => clearTimeout(t);
 }
 }, []);

 const accept = () => {
 localStorage.setItem('cv_cookie_consent', 'accepted');
 setVisible(false);
 };

 const decline = () => {
 localStorage.setItem('cv_cookie_consent', 'declined');
 setVisible(false);
 };

 if (!visible) return null;

 return (
 <div className={styles.banner} role="dialog" aria-label={isEn ? 'Cookie consent' : 'Cookie toestemming'}>
 <div className={styles.inner}>
 <div className={styles.text}>
 <p className={styles.title}> {isEn ? 'We use cookies' : 'Wij gebruiken cookies'}</p>
 <p className={styles.desc}>
 {isEn
 ? 'We use cookies to improve your experience and for advertising. You can accept or decline non-essential cookies.'
 : 'We gebruiken cookies om je ervaring te verbeteren en voor advertenties. Je kunt niet-essentiële cookies accepteren of weigeren.'}
 {' '}
 <a href={`/${lang}/privacy-policy`} className={styles.link}>
 {isEn ? 'Privacy Policy' : 'Privacybeleid'}
 </a>
 </p>
 </div>
 <div className={styles.actions}>
 <button onClick={decline} className={styles.btnDecline}>
 {isEn ? 'Decline' : 'Weigeren'}
 </button>
 <button onClick={accept} className={styles.btnAccept}>
 {isEn ? 'Accept All' : 'Alles Accepteren'}
 </button>
 </div>
 </div>
 </div>
 );
}
