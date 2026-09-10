'use client';

import { useState, useEffect, useRef } from 'react';
import SafeImage from './SafeImage';
import styles from './DownloadProgressModal.module.css';

interface DownloadProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDownload: () => void;
  title: string;
  imageUrl: string;
  fileType: 'pdf' | 'png';
  isEn: boolean;
}

export default function DownloadProgressModal({
  isOpen,
  onClose,
  onCompleteDownload,
  title,
  imageUrl,
  fileType,
  isEn,
}: DownloadProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsDone(false);
      hasTriggeredRef.current = false;
      return;
    }

    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setProgress(100);
      setIsDone(true);
      onCompleteDownload();
    }
  }, [isOpen, onCompleteDownload]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.sparkle}>✨</span>
            <h3>
              {isEn
                ? (isDone ? 'Download Ready!' : `Preparing Your ${fileType.toUpperCase()}...`)
                : (isDone ? 'Download Gereed!' : `Je ${fileType.toUpperCase()} wordt klaargemaakt...`)}
            </h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.body}>
          <div className={styles.previewContainer}>
            <div className={styles.thumbWrapper}>
              <SafeImage
                src={imageUrl}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div className={styles.infoCol}>
              <h4 className={styles.pageTitle}>{title}</h4>
              <span className={styles.badge}>
                {fileType === 'pdf' ? '📄 Print-Ready A4 PDF' : '🖼️ Ultra HD PNG Image'}
              </span>
              <p className={styles.tipText}>
                {isEn
                  ? '💡 Pro Tip: For best coloring results, print at 100% scale on standard A4 paper.'
                  : '💡 Tip: Print op 100% schaal op A4 papier voor de scherpste lijnen.'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressSection}>
            <div className={styles.progressBarWrapper}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${Math.min(100, Math.round(progress))}%` }}
              />
            </div>
            <div className={styles.progressStatus}>
              <span>
                {isDone
                  ? (isEn ? '✅ Download started!' : '✅ Download gestart!')
                  : (isEn ? 'Preparing file...' : 'Bestand voorbereiden...')}
              </span>
              <span className={styles.percentText}>{Math.min(100, Math.round(progress))}%</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {!isDone ? (
              <button
                className={styles.skipBtn}
                onClick={() => {
                  if (!hasTriggeredRef.current) {
                    hasTriggeredRef.current = true;
                    setIsDone(true);
                    setProgress(100);
                    onCompleteDownload();
                  }
                }}
              >
                ⚡ {isEn ? 'Download Immediately' : 'Direct Downloaden'}
              </button>
            ) : (
              <button className={styles.doneBtn} onClick={onClose}>
                🎉 {isEn ? 'Done / Close Window' : 'Klaar / Sluit Venster'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
