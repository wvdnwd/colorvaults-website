'use client';

import React, { useState, useEffect } from 'react';
import styles from './DownloadEmailModal.module.css';

interface DownloadEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
  isEn: boolean;
  pageTitle?: string;
}

export default function DownloadEmailModal({
  isOpen,
  onClose,
  lang = 'nl',
  isEn,
  pageTitle = '',
}: DownloadEmailModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });

      if (res.ok) {
        setStatus('success');
        try {
          localStorage.setItem('cv_newsletter_joined', 'true');
        } catch {}
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleDismissForever = () => {
    try {
      localStorage.setItem('cv_download_modal_dismissed', 'true');
    } catch {}
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Weekly Coloring Sheets' : 'Wekelijkse Kleurplaten'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={isEn ? 'Close' : 'Sluiten'}
        >
          ✕
        </button>

        <div className={styles.badge}>
          <span>🎨</span>
          <span>{isEn ? 'ColorVaults Club' : 'ColorVaults Club'}</span>
        </div>

        <h3 className={styles.title}>
          {isEn
            ? 'Your coloring sheet is on its way!'
            : 'Je kleurplaat is onderweg!'}
        </h3>

        <p className={styles.subtitle}>
          {isEn
            ? `Enjoying ${pageTitle ? `"${pageTitle}"` : 'our coloring pages'}? Get 10 fresh, free coloring pages in your inbox every weekend!`
            : `Veel plezier met ${pageTitle ? `"${pageTitle}"` : 'je kleurplaat'}! Ontvang elk weekend 10 gloednieuwe, gratis kleurplaten direct in je mailbox.`}
        </p>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <span className={styles.successIcon}>🎉</span>
            <p className={styles.successTitle}>
              {isEn ? 'Welcome to the Club!' : 'Welkom bij de Club!'}
            </p>
            <p className={styles.successText}>
              {isEn
                ? 'Check your inbox soon for your welcome bundle of printable sheets!'
                : 'Houd je mailbox in de gaten voor je eerste gratis kleurplatenbundel!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEn ? 'Enter your email address...' : 'Vul je e-mailadres in...'}
                className={styles.input}
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={styles.submitBtn}
              >
                {status === 'loading'
                  ? (isEn ? 'Signing up...' : 'Aanmelden...')
                  : (isEn ? 'Get Free Pages' : 'Gratis Meedoen')}
              </button>
            </div>

            {status === 'error' && (
              <p className={styles.errorText}>
                {isEn
                  ? 'Something went wrong. Please try again or skip.'
                  : 'Er ging iets mis. Probeer het opnieuw of sla over.'}
              </p>
            )}

            <div className={styles.benefits}>
              <span>✓ {isEn ? '100% Free forever' : '100% Gratis'}</span>
              <span>✓ {isEn ? 'No spam, 1-click unsubscribe' : 'Geen spam, altijd uitschrijfbaar'}</span>
            </div>
          </form>
        )}

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.skipBtn}
            onClick={handleDismissForever}
          >
            {isEn ? 'No thanks, continue downloading' : 'Nee bedankt, ga direct door'}
          </button>
        </div>
      </div>
    </div>
  );
}
