'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay?: boolean;
          },
          containerId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export function setGoogleTranslateLang(langCode: string) {
  if (typeof window === 'undefined') return;

  const currentHost = window.location.hostname;
  const parts = currentHost.split('.');
  const rootDomain = parts.length > 2 ? parts.slice(-2).join('.') : currentHost;

  const clearCookie = () => {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${currentHost};`;
  };

  if (langCode === 'en' || langCode === 'nl') {
    clearCookie();
    // Also reset select if exists
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    return;
  }

  // Set Google Translate cookie to target language
  const cookieValue = `/auto/${langCode}`;
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=.${rootDomain};`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${currentHost};`;

  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
}

export function getActiveTranslateLang(): string | null {
  if (typeof window === 'undefined') return null;
  const match =
    document.cookie.match(/(?:^|;)\s*googtrans=\/auto\/([a-z]{2})/i) ||
    document.cookie.match(/(?:^|;)\s*googtrans=\/[a-z]{2}\/([a-z]{2})/i);
  return match ? match[1].toLowerCase() : null;
}

export default function GoogleTranslator() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,nl,de,fr,es,it',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        display: 'none',
        visibility: 'hidden',
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
      }}
      aria-hidden="true"
    />
  );
}
