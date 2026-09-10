'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ConsentStatus = 'accepted' | 'declined' | 'unknown';

interface ConsentContextType {
  consent: ConsentStatus;
  acceptConsent: () => void;
  declineConsent: () => void;
  resetConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType>({
  consent: 'unknown',
  acceptConsent: () => {},
  declineConsent: () => {},
  resetConsent: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({
  children,
  gaId,
}: {
  children: React.ReactNode;
  gaId?: string;
}) {
  const [consent, setConsent] = useState<ConsentStatus>('unknown');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cv_cookie_consent');
      if (stored === 'accepted' || stored === 'declined') {
        setConsent(stored);
      } else {
        setConsent('unknown');
      }
    } catch {
      setConsent('unknown');
    }
  }, []);

  // When consent is accepted, dynamically load AdSense & GA scripts
  useEffect(() => {
    if (consent !== 'accepted' || typeof window === 'undefined') return;

    // Load Google AdSense
    if (!document.getElementById('adsense-script')) {
      const script = document.createElement('script');
      script.id = 'adsense-script';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1184801748776428';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Load Google Analytics if configured
    if (gaId && !document.getElementById('ga-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-script';
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaInline = document.createElement('script');
      gaInline.id = 'ga-inline-script';
      gaInline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { anonymize_ip: true });
      `;
      document.head.appendChild(gaInline);
    }
  }, [consent, gaId]);

  const acceptConsent = () => {
    try {
      localStorage.setItem('cv_cookie_consent', 'accepted');
    } catch {}
    setConsent('accepted');
  };

  const declineConsent = () => {
    try {
      localStorage.setItem('cv_cookie_consent', 'declined');
    } catch {}
    setConsent('declined');
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem('cv_cookie_consent');
    } catch {}
    setConsent('unknown');
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        acceptConsent,
        declineConsent,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
