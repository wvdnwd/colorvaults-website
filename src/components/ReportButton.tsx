'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ReportButton.module.css';

interface ReportButtonProps {
  imageUrl: string;
  category?: string;
  isEn: boolean;
  variant?: 'badge' | 'button' | 'compact';
}

export default function ReportButton({
  imageUrl,
  category = 'Coloring Pages',
  isEn,
  variant = 'badge',
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('#EF4444'); // Red pencil default
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  // Load image onto canvas when modal opens
  const redrawBase = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (imageObjRef.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageObjRef.current, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    // Use proxy to avoid CORS tainted canvas
    img.src = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    img.onload = () => {
      imageObjRef.current = img;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Fit to reasonable interactive dimension (max 520x520)
      const maxDim = 520;
      let w = img.width || maxDim;
      let h = img.height || maxDim;
      const scale = Math.min(maxDim / w, maxDim / h, 1);
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);

      redrawBase();
    };
  }, [open, imageUrl, redrawBase]);

  // Coordinate helper for mouse and touch
  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const { x, y } = getCoords(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 3;
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const handleClear = () => {
    redrawBase();
    setHasDrawn(false);
  };

  const handleSubmit = async () => {
    if (sending) return;
    setSending(true);

    try {
      const canvas = canvasRef.current;
      const annotatedImage = canvas ? canvas.toDataURL('image/jpeg', 0.85) : '';

      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          annotatedImage,
          category,
          reason: 'circle_feedback',
          details: details.trim(),
        }),
      });

      setDone(true);
    } catch {
      // silent fail
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setDetails('');
      setHasDrawn(false);
    }, 300);
  };

  return (
    <>
      {/* ── Trigger Button Variants ────────────────────────────────────── */}
      {variant === 'badge' && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={styles.friendlyBadge}
          title={isEn ? 'Spot an error? Circle it with a pencil!' : 'Zie je een foutje? Omcirkel het met een potlood!'}
        >
          <span className={styles.pencilIcon}>✏️</span>
          <span>{isEn ? 'Spot an error? Circle it!' : 'Zie je een foutje? Omcirkel het!'}</span>
        </button>
      )}

      {variant === 'button' && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={styles.friendlyButton}
        >
          <span className={styles.pencilIcon}>✏️</span>
          <span>{isEn ? 'Help improve: Circle an issue' : 'Help verbeteren: Omcirkel een foutje'}</span>
        </button>
      )}

      {variant === 'compact' && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
          className={styles.friendlyCompact}
          title={isEn ? 'Circle an error' : 'Omcirkel foutje'}
        >
          ✏️
        </button>
      )}

      {/* ── Friendly Circle Modal ──────────────────────────────────────── */}
      {open && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={handleClose}
              aria-label="Sluiten"
            >
              ✕
            </button>

            {done ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>🎉</div>
                <h3 className={styles.successTitle}>
                  {isEn ? 'Awesome! Thank you for your sharp eye!' : 'Super bedankt voor je scherpe oog!'}
                </h3>
                <p className={styles.successSub}>
                  {isEn
                    ? 'We received your circled drawing. Our editors will review and fix the lines right away!'
                    : 'We hebben je omcirkelde tekening ontvangen. Onze redactie gaat de lijntjes direct herstellen!'}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.primaryBtn}
                  style={{ marginTop: '1.25rem', width: 'auto', padding: '0.65rem 2rem' }}
                >
                  {isEn ? 'Done' : 'Klaar'}
                </button>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalBadge}>
                    <span>✏️ {isEn ? 'Interactive Feedback' : 'Help mee verbeteren'}</span>
                  </div>
                  <h2 className={styles.modalTitle}>
                    {isEn ? 'Circle the issue with the pencil' : 'Omcirkel het foutje met het potlood'}
                  </h2>
                  <p className={styles.modalSub}>
                    {isEn
                      ? 'Notice a stray line, watermark, or missing detail? Just draw a circle around it with your finger or mouse!'
                      : 'Zie je een raar lijntje, een vlek of iets wat niet klopt? Geen probleem! Teken er gewoon een cirkel omheen met je vinger of muis.'}
                  </p>
                </div>

                {/* Drawing Controls Bar */}
                <div className={styles.toolsBar}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray-600)' }}>
                      {isEn ? 'Color:' : 'Kleur:'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveColor('#EF4444')}
                      className={`${styles.colorPill} ${activeColor === '#EF4444' ? styles.colorPillActive : ''}`}
                      style={{ background: '#EF4444' }}
                      title="Rood Potlood"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveColor('#F59E0B')}
                      className={`${styles.colorPill} ${activeColor === '#F59E0B' ? styles.colorPillActive : ''}`}
                      style={{ background: '#F59E0B' }}
                      title="Oranje Stift"
                    />
                    <button
                      type="button"
                      onClick={() => setActiveColor('#10B981')}
                      className={`${styles.colorPill} ${activeColor === '#10B981' ? styles.colorPillActive : ''}`}
                      style={{ background: '#10B981' }}
                      title="Groene Marker"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleClear}
                    className={styles.clearBtn}
                    title={isEn ? 'Clear drawing' : 'Opnieuw / Wissen'}
                  >
                    🔄 {isEn ? 'Clear' : 'Wissen'}
                  </button>
                </div>

                {/* Interactive Canvas Stage */}
                <div className={styles.canvasWrapper}>
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className={styles.drawingCanvas}
                  />
                  {!hasDrawn && (
                    <div className={styles.canvasHint}>
                      <span>👆 {isEn ? 'Draw a circle on the image here!' : 'Omcirkel het probleem hier op de tekening!'}</span>
                    </div>
                  )}
                </div>

                {/* Optional Note */}
                <div style={{ marginTop: '0.85rem' }}>
                  <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Short note: what did you notice? (optional)'
                        : 'Korte toelichting: wat viel je op? (optioneel)'
                    }
                    className={styles.noteInput}
                  />
                </div>

                {/* Submit CTA */}
                <div className={styles.actionsBar}>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={sending}
                    className={styles.primaryBtn}
                  >
                    {sending
                      ? (isEn ? 'Sending...' : 'Versturen...')
                      : (isEn ? '🚀 Send Circle Feedback!' : '🚀 Foutje Versturen!')}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={styles.cancelBtn}
                  >
                    {isEn ? 'Cancel' : 'Annuleren'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
