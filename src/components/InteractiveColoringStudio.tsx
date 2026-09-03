'use client';

import React, { useRef, useState, useEffect, useCallback } from'react';
import styles from'./InteractiveColoringStudio.module.css';
import AdSlot from'./AdSlot';
import Link from'next/link';

interface InteractiveColoringStudioProps {
  imageUrl: string;
  title: string;
  isEn: boolean;
  backUrl: string;
  themeTitle: string;
}

const PRESET_COLORS = ['#FF3B30','#FF9500','#FFCC00','#34C759','#00C7BE','#30B0C7','#32ADE6','#007AFF','#5856D6','#AF52DE','#FF2D55','#A2845E','#8E8E93','#000000','#FFFFFF','#FFB3BA','#BAFFC9','#BAE1FF','#FFFFBA','#FFDFBA','#E8DFF5','#FCE1E4','#FCF4DD','#DDF6F5'];

export default function InteractiveColoringStudio({
  imageUrl,
  title,
  isEn,
  backUrl,
  themeTitle,
}: InteractiveColoringStudioProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<'bucket'|'brush'|'eraser'>('bucket');
  const [activeColor, setActiveColor] = useState<string>('#FF3B30');
  const [brushSize, setBrushSize] = useState<number>(14);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [coloredPreviewUrl, setColoredPreviewUrl] = useState<string | null>(null);

  const launchConfetti = () => {
    if (typeof window ==='undefined') return;
    const canvas = document.createElement('canvas');
    canvas.style.position ='fixed';
    canvas.style.top ='0';
    canvas.style.left ='0';
    canvas.style.width ='100vw';
    canvas.style.height ='100vh';
    canvas.style.pointerEvents ='none';
    canvas.style.zIndex ='99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number; rotation: number; rotSpeed: number }> = [];
    const colors = ['#FF3B30','#FF9500','#FFCC00','#34C759','#007AFF','#5856D6','#AF52DE','#FF2D55'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -12 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (frame < 180) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };
    requestAnimationFrame(animate);
  };

  const handleFinishMasterpiece = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setColoredPreviewUrl(canvas.toDataURL('image/png'));
    setShowCelebration(true);
    launchConfetti();
  };

  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Load image onto canvas
  useEffect(() => {
    setLoading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const isRemote = imageUrl.startsWith('http') && (typeof window !=='undefined'? !imageUrl.includes(window.location.hostname) : true);
    const targetSrc = isRemote ?`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`: imageUrl;

    const img = new Image();
    img.crossOrigin ='anonymous';
    img.src = targetSrc;

    img.onload = () => {
      // Calculate responsive canvas size (max 800px width/height maintaining aspect ratio)
      const maxDim = 800;
      let w = img.naturalWidth || 800;
      let h = img.naturalHeight || 800;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      canvas.width = w;
      canvas.height = h;

      // Fill white background first
      ctx.fillStyle ='#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      // Save initial state
      const initialData = ctx.getImageData(0, 0, w, h);
      setHistory([initialData]);
      setHistoryIndex(0);
      setLoading(false);
    };

    img.onerror = () => {
      // If proxy failed, try direct src as fallback
      if (img.src !== imageUrl && !imageUrl.startsWith('http')) {
        img.src = imageUrl;
        return;
      }
      canvas.width = 600;
      canvas.height = 800;
      ctx.fillStyle ='#FFFFFF';
      ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle ='#000000';
      ctx.font ='16px sans-serif';
      ctx.fillText(isEn ?'Failed to load coloring sheet':'Afbeelding kon niet worden geladen', 20, 50);
      setLoading(false);
    };
  }, [imageUrl, isEn]);

  // Push state to undo history
  const pushState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => {
      const next = prev.slice(0, historyIndex + 1);
      if (next.length > 15) next.shift(); // Limit history to 15 states
      return [...next, currentData];
    });
    setHistoryIndex(prev => Math.min(prev + 1, 15));
  }, [historyIndex]);

  // Undo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const prevIndex = historyIndex - 1;
    ctx.putImageData(history[prevIndex], 0, 0);
    setHistoryIndex(prevIndex);
  };

  // Redo
  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const nextIndex = historyIndex + 1;
    ctx.putImageData(history[nextIndex], 0, 0);
    setHistoryIndex(nextIndex);
  };

  // Reset to original line art
  const handleReset = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.putImageData(history[0], 0, 0);
    setHistory([history[0]]);
    setHistoryIndex(0);
  };

  // Helper: Hex color to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    let clean = hex.replace('#','');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  // Flood Fill (Bucket) Algorithm
  const floodFill = (startX: number, startY: number, fillColorHex: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const [fillR, fillG, fillB] = hexToRgb(fillColorHex);
    const startIndex = (startY * width + startX) * 4;

    const targetR = data[startIndex];
    const targetG = data[startIndex + 1];
    const targetB = data[startIndex + 2];

    // Don't fill if clicked directly on black line (brightness < 60)
    const targetBrightness = (targetR + targetG + targetB) / 3;
    if (targetBrightness < 60) return;

    // Don't fill if color is already the same
    if (
      Math.abs(targetR - fillR) < 10 &&
      Math.abs(targetG - fillG) < 10 &&
      Math.abs(targetB - fillB) < 10
    ) {
      return;
    }

    const tolerance = 45; // Pixel match tolerance

    const matchesTarget = (idx: number) => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;
      if (brightness < 60) return false; // Stop at black outlines
      return (
        Math.abs(r - targetR) <= tolerance &&
        Math.abs(g - targetG) <= tolerance &&
        Math.abs(b - targetB) <= tolerance
      );
    };

    // Breadth-First Flood Fill Queue
    const queue: [number, number][] = [[startX, startY]];
    const visited = new Uint8Array(width * height);
    visited[startY * width + startX] = 1;

    while (queue.length > 0) {
      const [x, y] = queue.pop()!;
      const idx = (y * width + x) * 4;

      data[idx] = fillR;
      data[idx + 1] = fillG;
      data[idx + 2] = fillB;
      data[idx + 3] = 255;

      const neighbors: [number, number][] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nVisitedIdx = ny * width + nx;
          if (!visited[nVisitedIdx]) {
            visited[nVisitedIdx] = 1;
            const nIdx = nVisitedIdx * 4;
            if (matchesTarget(nIdx)) {
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    pushState();
  };

  // Get canvas coordinates from mouse or touch event
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX ='touches'in e ? e.touches[0].clientX : e.clientX;
    const clientY ='touches'in e ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY),
    };
  };

  // Mouse / Touch Handlers
  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (activeTool ==='bucket') {
      floodFill(coords.x, coords.y, activeColor);
      return;
    }

    setIsDrawing(true);
    lastPos.current = coords;
    drawBrush(coords.x, coords.y);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool ==='bucket') return;
    const coords = getCanvasCoords(e);
    drawBrush(coords.x, coords.y);
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      lastPos.current = null;
      pushState();
    }
  };

  const drawBrush = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || !lastPos.current) return;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = activeTool ==='eraser'?'#FFFFFF': activeColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap ='round';
    ctx.lineJoin ='round';
    ctx.stroke();

    lastPos.current = { x, y };
  };

  // Download colored image
  const handleDownloadColored = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create watermarked export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0);

    // Watermark
    ctx.fillStyle ='rgba(0, 0, 0, 0.4)';
    const fontSize = Math.max(14, canvas.width * 0.025);
    ctx.font =`bold ${fontSize}px sans-serif`;
    ctx.textAlign ='right';
    ctx.fillText('Colored on ColorVaults.com', canvas.width - 16, canvas.height - 16);

    const a = document.createElement('a');
    a.href = exportCanvas.toDataURL('image/png');
    a.download =`colorvaults-colored-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.png`;
    a.click();
  };

  // Print colored image
  const handlePrintColored = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const printWindow = window.open('','_blank');
    if (!printWindow) return;

    printWindow.document.write(`<!DOCTYPE html>
      <html>
        <head>
          <title>${title} - ColorVaults</title>
          <style>
            @page { size: A4 portrait; margin: 10mm; }
            body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
            img { max-width: 100%; max-height: 95vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}"onload="window.print();window.close();"/>
        </body>
      </html>`);
    printWindow.document.close();
  };

  return (
    <div className={styles.studioContainer}>
      {/* Studio Top Header */}
      <div className={styles.studioHeader}>
        <div>
          <h1 className={styles.studioTitle}>
            {title}
          </h1>
          <p className={styles.studioSubtitle}>
            {isEn 
              ?'Interactive digital coloring studio — Click on any area to fill with color, or use brushes to paint freely!':'Interactieve digitale kleurstudio — Klik op een vlak om in te vullen met verf, of gebruik het penseel om vrij te schilderen!'}
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href={backUrl} className="btn-secondary"style={{ textDecoration:'none', padding:'0.65rem 1.15rem'}}>
            ← {isEn ?'Back to Page':'Terug naar Kleurplaat'}
          </Link>
        </div>
      </div>

      {/* Top Banner Advertisement */}
      <AdSlot type="banner"text={isEn ?"Sponsored Content":"Gesponsord"} />

      {/* Studio Workspace Grid */}
      <div className={styles.studioGrid}>
        {/* Canvas Stage */}
        <div className={styles.canvasStage}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <span>{isEn ?'Loading Interactive Canvas...':'Interactief Canvas Laden...'}</span>
            </div>
          )}
          <div className={styles.canvasWrapper}>
            <canvas
              ref={canvasRef}
              className={styles.paintCanvas}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            />
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className={styles.sidebarControls}>
          {/* Tool Selector */}
          <div className={styles.controlCard}>
            <div className={styles.cardTitle}>
              {isEn ?'Coloring Tools':'Kleurhulpmiddelen'}
            </div>
            <div className={styles.toolButtons}>
              <button
                type="button"className={`${styles.toolBtn} ${activeTool ==='bucket'? styles.active :''}`}
                onClick={() => setActiveTool('bucket')}
              >
                <span>{isEn ?'Fill Bucket':'Verfemmer'}</span>
              </button>
              <button
                type="button"className={`${styles.toolBtn} ${activeTool ==='brush'? styles.active :''}`}
                onClick={() => setActiveTool('brush')}
              >
                <span>{isEn ?'Brush':'Penseel'}</span>
              </button>
              <button
                type="button"className={`${styles.toolBtn} ${activeTool ==='eraser'? styles.active :''}`}
                onClick={() => setActiveTool('eraser')}
              >
                <span>{isEn ?'Eraser':'Gum'}</span>
              </button>
            </div>

            {activeTool !=='bucket'&& (
              <div className={styles.brushSizeSlider}>
                <div className={styles.brushSizeLabel}>
                  <span>{isEn ?'Size':'Dikte'}:</span>
                  <span>{brushSize}px</span>
                </div>
                <input
                  type="range"min="4"max="40"value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  style={{ width:'100%', accentColor:'var(--primary)'}}
                />
              </div>
            )}
          </div>

          {/* Color Palette */}
          <div className={styles.controlCard}>
            <div className={styles.cardTitle}>
              {isEn ?'Color Palette':'Kleurenpalet'}
            </div>
            <div className={styles.paletteGrid}>
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"className={`${styles.colorSwatch} ${activeColor.toUpperCase() === c.toUpperCase() ? styles.selected :''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setActiveColor(c)}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
            <div className={styles.customPickerRow}>
              <input
                type="color"value={activeColor}
                onChange={(e) => setActiveColor(e.target.value)}
                className={styles.colorPickerInput}
                title={isEn ?'Custom Color Picker':'Eigen Kleur Kiezen'}
              />
              <span style={{ fontSize:'0.85rem', fontWeight: 700, color:'var(--foreground)'}}>
                {isEn ?'Custom Color':'Eigen Kleur'} ({activeColor.toUpperCase()})
              </span>
            </div>
          </div>

          {/* History / Actions */}
          <div className={styles.controlCard}>
            <div className={styles.cardTitle}>
              {isEn ?'History & Actions':'Bewerkingen'}
            </div>
            <div className={styles.actionRow}>
              <button
                type="button"className={styles.actionBtn}
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                title="Undo">
                {isEn ?'Undo':'Herstel'}
              </button>
              <button
                type="button"className={styles.actionBtn}
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                title="Redo">
                {isEn ?'Redo':'Opnieuw'}
              </button>
              <button
                type="button"className={styles.actionBtn}
                onClick={handleReset}
                title="Reset">
                {isEn ?'Clear':'Wissen'}
              </button>
            </div>

            <div style={{ marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.65rem'}}>
              <button
                type="button"className={styles.finishBtn}
                onClick={handleFinishMasterpiece}
              >
                {isEn ?'Finish & Celebrate!':'Klaar met Inkleuren!'}
              </button>
              <button
                type="button"className={styles.downloadArtBtn}
                onClick={handleDownloadColored}
              >
                {isEn ?'Download Image (PNG)':'Afbeelding Opslaan (PNG)'}
              </button>
              <button
                type="button"className={styles.printArtBtn}
                onClick={handlePrintColored}
              >
                {isEn ?'Print Colored Page':'Ingekleurde Pagina Printen'}
              </button>
            </div>
          </div>

          {/* Sticky Sidebar Rectangle Advertisement */}
          <AdSlot type="rectangle"text={isEn ?"Sponsored Content":"Gesponsord"} />
        </div>
      </div>

      
      {/* Celebration Masterpiece Modal */}
      {showCelebration && (
        <div className={styles.celebrationOverlay} onClick={() => setShowCelebration(false)}>
          <div className={styles.celebrationModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.celebrationBadge}>🏆 {isEn ?'Masterpiece Award':'Kunstwerk Diploma'}</div>
            <h2 className={styles.celebrationTitle}>
              {isEn ?'What a Wonderful Masterpiece!':'Wat een Prachtig Kunstwerk!'}
            </h2>
            <p className={styles.celebrationSubtitle}>
              {isEn ?`You have colored"${title}"with amazing creativity!`:`Je hebt"${title}"fantastisch mooi ingekleurd!`}
            </p>

            {coloredPreviewUrl && (
              <div className={styles.previewContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coloredPreviewUrl}
                  alt="Completed Masterpiece"className={styles.completedArtImg}
                />
              </div>
            )}

            <div className={styles.modalActionButtons}>
              <button
                type="button"className={styles.modalDownloadBtn}
                onClick={handleDownloadColored}
              >
                {isEn ?'Save My Masterpiece (PNG)':'Mijn Kunstwerk Opslaan (PNG)'}
              </button>
              <button
                type="button"className={styles.modalPrintBtn}
                onClick={handlePrintColored}
              >
                {isEn ?'Print Artwork':'Kunstwerk Printen'}
              </button>
              <button
                type="button"className={styles.modalCloseBtn}
                onClick={() => setShowCelebration(false)}
              >
                {isEn ?'Keep Coloring':'Verder Kleuren'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Bottom Leaderboard Advertisement */}
      <div style={{ marginTop:'2rem'}}>
        <AdSlot type="banner"text={isEn ?"Sponsored Content":"Gesponsord"} />
      </div>
    </div>
  );
}
