'use client';
import { useEffect } from 'react';
import styles from './PrintPreviewModal.module.css';

interface PrintPreviewModalProps {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPrint: () => void;
  isEn: boolean;
}

export default function PrintPreviewModal({
  imageUrl,
  title,
  isOpen,
  onClose,
  onConfirmPrint,
  isEn,
}: PrintPreviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Print preview' : 'Afdrukvoorbeeld'}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEn ? '🖨️ Print Preview' : '🖨️ Afdrukvoorbeeld'}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={isEn ? 'Close preview' : 'Voorbeeld sluiten'}
          >
            ✕
          </button>
        </div>

        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className={styles.previewImg}
          />
        </div>

        <div className={styles.info}>
          <p className={styles.infoText}>
            {isEn
              ? '📄 This page will be printed full-page in A4 / Letter format. Set your browser to 100% scale with no margins for the best result.'
              : '📄 Deze pagina wordt afgedrukt in volledig A4/Letter formaat. Zet de browser op 100% schaal zonder marges voor het beste resultaat.'}
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            {isEn ? 'Cancel' : 'Annuleren'}
          </button>
          <button
            className={styles.printBtn}
            onClick={() => {
              onConfirmPrint();
              onClose();
            }}
          >
            <span aria-hidden="true">🖨️</span>{' '}
            {isEn ? 'Print Now' : 'Nu Afdrukken'}
          </button>
        </div>
      </div>
    </div>
  );
}
