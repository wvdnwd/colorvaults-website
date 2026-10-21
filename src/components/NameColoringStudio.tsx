'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './NameColoringStudio.module.css';
import SafeImage from './SafeImage';
import { fireConfetti } from '@/lib/confetti';

interface NameColoringStudioProps {
  lang: string;
  isEn: boolean;
}

interface ThemeOption {
  id: string;
  labelEn: string;
  labelNl: string;
  icon: string;
  subtitleEn: string;
  subtitleNl: string;
  sampleItem: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'unicorns',
    labelEn: 'Unicorns & Rainbows',
    labelNl: 'Eenhoorns & Regenboog',
    icon: '🦄',
    subtitleEn: 'Magical stars, clouds, rainbows & cute unicorns',
    subtitleNl: 'Magische sterren, wolken, regenbogen & eenhoorns',
    sampleItem: 'Unicorn',
  },
  {
    id: 'dinosaurs',
    labelEn: 'Dinosaurs & Prehistoric',
    labelNl: 'Dinosauriërs & Oertijd',
    icon: '🦖',
    subtitleEn: 'T-Rex, footprints, palm trees & prehistoric jungle',
    subtitleNl: 'T-Rex, pootafdrukken, palmbomen & oerwoud',
    sampleItem: 'Dino',
  },
  {
    id: 'birthday',
    labelEn: 'Birthday Celebration',
    labelNl: 'Verjaardag & Feest',
    icon: '🎂',
    subtitleEn: 'Party balloons, birthday cake, gifts & celebration flags',
    subtitleNl: 'Feestballonnen, verjaardagstaart, cadeautjes & slingers',
    sampleItem: 'Cake',
  },
  {
    id: 'puppies',
    labelEn: 'Cute Puppies & Dogs',
    labelNl: 'Vrolijke Puppy’s & Honden',
    icon: '🐶',
    subtitleEn: 'Puppy paws, dog bones, hearts & happy dogs',
    subtitleNl: 'Hondenpootjes, botjes, hartjes & lieve hondjes',
    sampleItem: 'Puppy',
  },
  {
    id: 'kittens',
    labelEn: 'Cute Kittens & Cats',
    labelNl: 'Schattige Kittens & Katten',
    icon: '🐱',
    subtitleEn: 'Kitten whiskers, balls of yarn, stars & bows',
    subtitleNl: 'Kattensnorharen, bolletjes wol, sterren & strikjes',
    sampleItem: 'Kitten',
  },
  {
    id: 'space',
    labelEn: 'Space & Rockets',
    labelNl: 'Ruimte & Raketten',
    icon: '🚀',
    subtitleEn: 'Rockets, planets, smiling moon & twinkling stars',
    subtitleNl: 'Raketten, planeten, lachende maan & sterren',
    sampleItem: 'Rocket',
  },
  {
    id: 'flowers',
    labelEn: 'Flowers & Butterflies',
    labelNl: 'Bloemen & Vlinders',
    icon: '🌸',
    subtitleEn: 'Big blooming sunflowers, fluttering butterflies & garden bees',
    subtitleNl: 'Grote zonnebloemen, fladderende vlinders & tuinbijen',
    sampleItem: 'Flower',
  },
];

export default function NameColoringStudio({ lang, isEn }: NameColoringStudioProps) {
  const [name, setName] = useState<string>('MILA');
  const [selectedTheme, setSelectedTheme] = useState<string>('unicorns');
  const [extraText, setExtraText] = useState<string>('');
  const [generatingPdf, setGeneratingPdf] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cleanName = name.trim().toUpperCase() || (isEn ? 'NAME' : 'NAAM');

  // Draw coloring page onto canvas
  const drawColoringPage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standard A4 aspect ratio at 1240 x 1754 (150 DPI crisp quality)
    const w = 1240;
    const h = 1754;
    canvas.width = w;
    canvas.height = h;

    // Pure white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // ── Outer Decorative Border ──────────────────────────────────────────
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#0F172A';
    ctx.strokeRect(36, 36, w - 72, h - 72);

    ctx.lineWidth = 2.5;
    ctx.strokeRect(48, 48, w - 96, h - 96);

    // Corner decorative rosettes / circles
    const corners = [
      [36, 36],
      [w - 36, 36],
      [36, h - 36],
      [w - 36, h - 36],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0F172A';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
    });

    // ── Top Title Banner ────────────────────────────────────────────────
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = 'bold 32px "Fredoka", "Arial Black", sans-serif';
    ctx.fillStyle = '#1E293B';
    const topGreeting = isEn
      ? (extraText.trim() ? extraText.trim() : '★ COLOR YOUR OWN NAME ★')
      : (extraText.trim() ? extraText.trim() : '★ KLEUR JE EIGEN NAAM ★');
    ctx.fillText(topGreeting, w / 2, 110);

    // Dotted line under top greeting
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 280, 145);
    ctx.lineTo(w / 2 + 280, 145);
    ctx.stroke();
    ctx.setLineDash([]);

    // ── Main Bubble Letters (Center-Top) ─────────────────────────────────
    // Calculate dynamic font size based on name length
    const letterCount = cleanName.length;
    let fontSize = 170;
    if (letterCount > 6) fontSize = Math.floor(1000 / letterCount);
    if (letterCount > 10) fontSize = Math.floor(950 / letterCount);
    fontSize = Math.max(70, Math.min(190, fontSize));

    ctx.font = `900 ${fontSize}px "Fredoka", "Arial Black", sans-serif`;
    ctx.lineWidth = Math.max(6, Math.floor(fontSize * 0.075));
    ctx.strokeStyle = '#0F172A';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const textMetrics = ctx.measureText(cleanName);
    const startY = 340;

    // Draw hollow bubble letters with 3D drop-contour for coloring!
    // 1. Soft outline shadow for 3D coloring effect
    ctx.lineWidth = Math.max(7, Math.floor(fontSize * 0.085));
    ctx.strokeText(cleanName, w / 2 + 6, startY + 6);

    // 2. Main hollow letter
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(cleanName, w / 2, startY);
    ctx.lineWidth = Math.max(6, Math.floor(fontSize * 0.075));
    ctx.strokeText(cleanName, w / 2, startY);

    // ── Theme Centerpiece & Decorative Scene ─────────────────────────────
    drawThemeDecorations(ctx, selectedTheme, w, h);

    // ── Bottom Name Dedication & Subtitle ────────────────────────────────
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillStyle = '#334155';
    const dedication = isEn
      ? `Coloring Sheet for ${cleanName} • www.ColorVaults.com`
      : `Kleurplaat voor ${cleanName} • www.ColorVaults.com`;
    ctx.fillText(dedication, w / 2, h - 85);

    ctx.font = 'normal 18px sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(
      isEn
        ? '© ColorVaults.com — Free printable personalized coloring page for home & school'
        : '© ColorVaults.com — Gratis printbare naamkleurplaat voor thuis en op school',
      w / 2,
      h - 58
    );
  }, [cleanName, selectedTheme, extraText, isEn]);

  // Redraw when parameters change
  useEffect(() => {
    drawColoringPage();
  }, [drawColoringPage]);

  // Download high-res A4 PDF
  const handleDownloadPdf = async () => {
    if (generatingPdf) return;
    setGeneratingPdf(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: QRCode } = await import('qrcode');
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not found');

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 8;
      const renderWidth = pageWidth - margin * 2;
      const renderHeight = pageHeight - margin * 2;

      pdf.addImage(imgData, 'JPEG', margin, margin, renderWidth, renderHeight, undefined, 'FAST');

      // Add neat QR code in bottom-right corner inside margin
      try {
        const qrUrl = `https://www.colorvaults.com/${lang}/name-coloring-page`;
        const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 80 });
        pdf.addImage(qrDataUrl, 'PNG', pageWidth - margin - 15, pageHeight - margin - 15, 12, 12);
      } catch (e) {
        console.warn('QR code skipped', e);
      }

      pdf.save(`colorvaults-naamkleurplaat-${cleanName.toLowerCase()}.pdf`);
      fireConfetti();
    } catch (err) {
      console.error('Failed to create PDF:', err);
      alert(isEn ? 'Could not generate PDF.' : 'PDF kon niet worden gegenereerd.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const win = window.open('', '_blank');
    if (!win) {
      window.print();
      return;
    }
    const imgData = canvas.toDataURL('image/png');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${cleanName} - ColorVaults</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            img { max-width: 96vw; max-height: 96vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${imgData}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    win.document.close();
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `colorvaults-${cleanName.toLowerCase()}-coloring-page.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    fireConfetti();
  };

  return (
    <div className={styles.studioWrapper}>
      {/* Left Control Bar */}
      <div className={styles.controlsPanel}>
        <div className={styles.sectionHeader}>
          <span className={styles.stepBadge}>1</span>
          <h2 className={styles.panelTitle}>
            {isEn ? 'Enter Name or Short Text' : 'Vul Naam of Tekst in'}
          </h2>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            {isEn ? 'Child’s Name or Celebration Word:' : 'Voornaam of Tekst:'}
          </label>
          <input
            type="text"
            className={styles.nameInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isEn ? 'e.g. EMMA, NOAH, LUCAS' : 'bijv. MILA, NOAH, SEM'}
            maxLength={14}
          />
          <span className={styles.inputHint}>
            {isEn ? 'Up to 14 characters for best bubble outline spacing.' : 'Maximaal 14 letters voor de mooiste inkleur-letters.'}
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>
            {isEn ? 'Top Heading (Optional):' : 'Bovenkop (Optioneel):'}
          </label>
          <input
            type="text"
            className={styles.subInput}
            value={extraText}
            onChange={(e) => setExtraText(e.target.value)}
            placeholder={isEn ? 'e.g. HAPPY BIRTHDAY, HOORAY 6 YEARS' : 'bijv. HOERA 5 JAAR!, FIJNE VERJAARDAG'}
            maxLength={32}
          />
        </div>

        <div className={styles.sectionHeader} style={{ marginTop: '1.5rem' }}>
          <span className={styles.stepBadge}>2</span>
          <h2 className={styles.panelTitle}>
            {isEn ? 'Choose Coloring Theme' : 'Kies Inkleur-Thema'}
          </h2>
        </div>

        <div className={styles.themeGrid}>
          {THEMES.map((th) => (
            <button
              key={th.id}
              type="button"
              onClick={() => setSelectedTheme(th.id)}
              className={`${styles.themeCard} ${selectedTheme === th.id ? styles.themeCardActive : ''}`}
            >
              <span className={styles.themeIcon}>{th.icon}</span>
              <div className={styles.themeText}>
                <span className={styles.themeName}>{isEn ? th.labelEn : th.labelNl}</span>
                <span className={styles.themeSub}>{isEn ? th.subtitleEn : th.subtitleNl}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionSection}>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={generatingPdf}
            className={styles.btnPrimary}
          >
            <span>📄</span>
            <span>
              {generatingPdf
                ? (isEn ? 'Generating A4 PDF...' : 'PDF Maken...')
                : (isEn ? `Download A4 PDF (${cleanName})` : `Download A4 PDF (${cleanName})`)}
            </span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <button
              type="button"
              onClick={handlePrint}
              className={styles.btnSecondary}
              style={{ flex: 1 }}
            >
              <span>🖨️</span>
              <span>{isEn ? 'Print Direct' : 'Direct Printen'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPng}
              className={styles.btnSecondary}
              style={{ flex: 1 }}
            >
              <span>💾</span>
              <span>PNG Opslaan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Canvas Preview Stage */}
      <div className={styles.previewStage}>
        <div className={styles.stageHeader}>
          <div>
            <span className={styles.stageBadge}>✨ 100% Free • A4 Printable</span>
            <h3 className={styles.stageTitle}>
              {isEn ? `Live Preview: "${cleanName}" Coloring Page` : `Afdrukvoorbeeld: "${cleanName}" Kleurplaat`}
            </h3>
          </div>
          <span className={styles.aspectTag}>A4 Portrait</span>
        </div>

        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.previewCanvas} />
        </div>
      </div>
    </div>
  );
}

// ── Line-Art Procedural Vector Generator for Selected Theme ──────────────────
function drawThemeDecorations(
  ctx: CanvasRenderingContext2D,
  themeId: string,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = '#0F172A';
  ctx.fillStyle = '#FFFFFF';
  ctx.lineWidth = 4.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const centerY = 920;

  if (themeId === 'unicorns') {
    // 🦄 Big Rainbow + Clouds + Stars + Cute Unicorn Head
    // Draw 4-band arched rainbow
    const rx = w / 2;
    const ry = 880;
    for (let r = 260; r >= 170; r -= 28) {
      ctx.beginPath();
      ctx.arc(rx, ry, r, Math.PI, 0, false);
      ctx.stroke();
    }

    // Clouds at base of rainbow
    drawCloud(ctx, rx - 240, ry + 20, 1.3);
    drawCloud(ctx, rx + 240, ry + 20, 1.3);

    // Cute Unicorn Silhouette / Head in center
    drawUnicornSilhouette(ctx, rx, centerY + 220);

    // Floating stars, hearts & magic crystals
    drawStar(ctx, 220, 480, 24);
    drawStar(ctx, w - 220, 480, 28);
    drawStar(ctx, 160, 800, 32);
    drawStar(ctx, w - 160, 800, 32);
    drawHeart(ctx, 280, 680, 32);
    drawHeart(ctx, w - 280, 680, 32);
    drawSparkle(ctx, 420, 520, 24);
    drawSparkle(ctx, w - 420, 520, 24);
    drawStar(ctx, 200, 1300, 26);
    drawStar(ctx, w - 200, 1300, 26);
  } else if (themeId === 'dinosaurs') {
    // 🦖 Dinosaur Tracks, Big Baby T-Rex Outline, Palm Trees, Volcano
    drawDinoSilhouette(ctx, w / 2, centerY + 180);

    // Palm trees left & right
    drawPalmTree(ctx, 180, 800);
    drawPalmTree(ctx, w - 180, 800);

    // Dinosaur tracks (paw prints)
    drawDinoTrack(ctx, 320, 520, -0.3);
    drawDinoTrack(ctx, w - 320, 520, 0.3);
    drawDinoTrack(ctx, 260, 1250, -0.2);
    drawDinoTrack(ctx, w - 260, 1250, 0.2);

    // Prehistoric eggs in nest at bottom
    drawDinoEgg(ctx, w / 2 - 240, 1350);
    drawDinoEgg(ctx, w / 2 + 240, 1350);
  } else if (themeId === 'birthday') {
    // 🎂 Multi-Tiered Cake + Floating Balloons + Party Hats + Presents
    drawBirthdayCake(ctx, w / 2, centerY + 240);

    // Balloons bunches left & right
    drawBalloon(ctx, 220, 650, 48);
    drawBalloon(ctx, 160, 780, 54);
    drawBalloon(ctx, w - 220, 650, 48);
    drawBalloon(ctx, w - 160, 780, 54);

    // Gift boxes
    drawGiftBox(ctx, 240, 1260, 90);
    drawGiftBox(ctx, w - 330, 1260, 90);

    // Confetti stars & serpentine ribbons
    drawStar(ctx, 280, 500, 28);
    drawStar(ctx, w - 280, 500, 28);
    drawSparkle(ctx, 420, 680, 32);
    drawSparkle(ctx, w - 420, 680, 32);
  } else if (themeId === 'space') {
    // 🚀 Giant Rocket Ship + Ringed Saturn + Smiling Moon + Orbiting Planets
    drawRocket(ctx, w / 2, centerY + 160);

    // Saturn Planet left
    drawSaturn(ctx, 240, 740, 55);

    // Smiling Crescent Moon right
    drawMoon(ctx, w - 240, 720, 65);

    // Floating stars and constellations
    drawStar(ctx, 180, 500, 32);
    drawStar(ctx, w - 180, 500, 32);
    drawSparkle(ctx, 340, 620, 30);
    drawSparkle(ctx, w - 340, 620, 30);
    drawPlanet(ctx, 220, 1280, 40);
    drawStar(ctx, w - 220, 1280, 28);
  } else if (themeId === 'puppies') {
    // 🐶 Cute Puppies + Bones + Paw Prints + Dog House
    drawPuppyFace(ctx, w / 2, centerY + 160);

    // Dog bones
    drawBone(ctx, 240, 700, 0.4);
    drawBone(ctx, w - 240, 700, -0.4);
    drawBone(ctx, 260, 1280, -0.3);
    drawBone(ctx, w - 260, 1280, 0.3);

    // Paw prints
    drawPaw(ctx, 180, 520);
    drawPaw(ctx, w - 180, 520);
    drawPaw(ctx, 340, 1150);
    drawPaw(ctx, w - 340, 1150);

    // Hearts
    drawHeart(ctx, 320, 600, 30);
    drawHeart(ctx, w - 320, 600, 30);
  } else if (themeId === 'kittens') {
    // 🐱 Cute Kitten + Yarn Ball + Hearts + Whiskers
    drawKittenFace(ctx, w / 2, centerY + 160);

    // Yarn balls
    drawYarnBall(ctx, 220, 740, 45);
    drawYarnBall(ctx, w - 220, 740, 45);

    // Little mice & hearts
    drawHeart(ctx, 180, 520, 32);
    drawHeart(ctx, w - 180, 520, 32);
    drawPaw(ctx, 320, 620);
    drawPaw(ctx, w - 320, 620);
    drawHeart(ctx, 240, 1280, 35);
    drawHeart(ctx, w - 240, 1280, 35);
  } else {
    // 🌸 Flowers & Butterflies
    drawGiantFlower(ctx, w / 2, centerY + 200, 140);
    drawButterfly(ctx, 240, 660, 1);
    drawButterfly(ctx, w - 240, 660, -1);
    drawGiantFlower(ctx, 220, 1260, 75);
    drawGiantFlower(ctx, w - 220, 1260, 75);
    drawStar(ctx, 180, 490, 24);
    drawStar(ctx, w - 180, 490, 24);
  }

  ctx.restore();
}

// ── Vector Helpers ───────────────────────────────────────────────────────────
function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  // bottom left curve
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
  // bottom right curve
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  // top right curve
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.arc(-40, 0, 32, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(-15, -30, 38, Math.PI * 1.0, Math.PI * 1.95);
  ctx.arc(30, -25, 42, Math.PI * 1.2, Math.PI * 2.05);
  ctx.arc(55, 0, 30, Math.PI * 1.6, Math.PI * 0.5);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawUnicornSilhouette(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Body / Torso
  ctx.beginPath();
  ctx.ellipse(0, 80, 110, 85, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.ellipse(0, -50, 75, 65, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Snout
  ctx.beginPath();
  ctx.ellipse(0, -25, 40, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Nostrils
  ctx.beginPath();
  ctx.arc(-12, -22, 4, 0, Math.PI * 2);
  ctx.arc(12, -22, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();

  // Cute closed smiling eyes
  ctx.beginPath();
  ctx.arc(-26, -65, 12, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26, -65, 12, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  // Ears
  ctx.beginPath();
  ctx.moveTo(-45, -95);
  ctx.lineTo(-65, -155);
  ctx.lineTo(-20, -115);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(45, -95);
  ctx.lineTo(65, -155);
  ctx.lineTo(20, -115);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Unicorn Horn with diagonal segments
  ctx.beginPath();
  ctx.moveTo(-16, -115);
  ctx.lineTo(0, -225);
  ctx.lineTo(16, -115);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  for (let dy = -195; dy <= -135; dy += 20) {
    ctx.beginPath();
    ctx.moveTo(-8, dy);
    ctx.lineTo(8, dy + 8);
    ctx.stroke();
  }

  // Wavy mane curves
  ctx.beginPath();
  ctx.arc(-70, -30, 35, 0.5 * Math.PI, 1.8 * Math.PI);
  ctx.arc(-75, 40, 40, 0.5 * Math.PI, 1.8 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawDinoSilhouette(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Big friendly cartoon Brachiosaurus / T-rex body
  ctx.beginPath();
  ctx.ellipse(0, 60, 130, 100, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Long neck & head
  ctx.beginPath();
  ctx.moveTo(-35, 10);
  ctx.quadraticCurveTo(-45, -130, 0, -180);
  ctx.quadraticCurveTo(70, -180, 80, -140);
  ctx.quadraticCurveTo(50, -100, 25, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Big cute smiling eye
  ctx.beginPath();
  ctx.arc(35, -155, 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(37, -155, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.arc(55, -135, 14, 0.1 * Math.PI, 0.7 * Math.PI);
  ctx.stroke();

  // Back plates / spikes
  for (let i = 0; i < 5; i++) {
    const px = -60 + i * 32;
    const py = -10 + i * 15;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + 14, py - 35);
    ctx.lineTo(px + 28, py);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
  }

  // Tail
  ctx.beginPath();
  ctx.moveTo(-110, 45);
  ctx.quadraticCurveTo(-180, 30, -220, -10);
  ctx.quadraticCurveTo(-180, 80, -95, 105);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  // Curved trunk with segments
  ctx.beginPath();
  ctx.moveTo(-10, 180);
  ctx.quadraticCurveTo(-20, 60, 0, 0);
  ctx.lineTo(16, 0);
  ctx.quadraticCurveTo(-4, 60, 10, 180);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // 4 big palm fronds
  const angles = [-0.9, -0.3, 0.3, 0.9];
  angles.forEach((ang) => {
    ctx.save();
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.ellipse(0, -60, 18, 55, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();
}

function drawDinoTrack(ctx: CanvasRenderingContext2D, x: number, y: number, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  // Heel
  ctx.beginPath();
  ctx.arc(0, 15, 16, 0, Math.PI * 2);
  ctx.stroke();
  // 3 Claws
  [-18, 0, 18].forEach((cx, idx) => {
    ctx.beginPath();
    ctx.ellipse(cx, -10 + Math.abs(idx - 1) * 6, 8, 16, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawDinoEgg(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.ellipse(0, 0, 35, 48, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Zig-zag crack
  ctx.beginPath();
  ctx.moveTo(-28, -5);
  ctx.lineTo(-12, -15);
  ctx.lineTo(2, -2);
  ctx.lineTo(18, -18);
  ctx.lineTo(28, -6);
  ctx.stroke();
  ctx.restore();
}

function drawBirthdayCake(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Bottom tier
  ctx.beginPath();
  ctx.roundRect(-160, 40, 320, 110, 12);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Bottom tier frosting drips
  for (let dx = -140; dx <= 140; dx += 40) {
    ctx.beginPath();
    ctx.arc(dx, 40, 16, 0, Math.PI);
    ctx.stroke();
  }

  // Top tier
  ctx.beginPath();
  ctx.roundRect(-100, -55, 200, 95, 12);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Top tier frosting drips
  for (let dx = -80; dx <= 80; dx += 40) {
    ctx.beginPath();
    ctx.arc(dx, -55, 14, 0, Math.PI);
    ctx.stroke();
  }

  // 3 Candles on top
  [-50, 0, 50].forEach((cx) => {
    ctx.beginPath();
    ctx.rect(cx - 6, -95, 12, 40);
    ctx.fill();
    ctx.stroke();

    // Flame
    ctx.beginPath();
    ctx.moveTo(cx, -118);
    ctx.quadraticCurveTo(cx + 8, -102, cx, -95);
    ctx.quadraticCurveTo(cx - 8, -102, cx, -118);
    ctx.fill();
    ctx.stroke();
  });

  ctx.restore();
}

function drawBalloon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.85, r, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Knot
  ctx.beginPath();
  ctx.moveTo(-6, r);
  ctx.lineTo(6, r);
  ctx.lineTo(0, r + 8);
  ctx.closePath();
  ctx.stroke();

  // Wavy string
  ctx.beginPath();
  ctx.moveTo(0, r + 8);
  ctx.bezierCurveTo(-15, r + 40, 15, r + 80, 0, r + 120);
  ctx.stroke();
  ctx.restore();
}

function drawGiftBox(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, 8);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Cross ribbon
  ctx.beginPath();
  ctx.rect(size / 2 - 8, 0, 16, size);
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(0, size / 2 - 8, size, 16);
  ctx.stroke();

  // Bow on top
  ctx.beginPath();
  ctx.ellipse(size / 2 - 16, -12, 14, 8, -0.4, 0, Math.PI * 2);
  ctx.ellipse(size / 2 + 16, -12, 14, 8, 0.4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawRocket(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Main rocket body
  ctx.beginPath();
  ctx.moveTo(0, -180);
  ctx.quadraticCurveTo(65, -80, 60, 80);
  ctx.lineTo(-60, 80);
  ctx.quadraticCurveTo(-65, -80, 0, -180);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Porthole Window
  ctx.beginPath();
  ctx.arc(0, -40, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -40, 22, 0, Math.PI * 2);
  ctx.stroke();

  // Side fins
  ctx.beginPath();
  ctx.moveTo(-60, 40);
  ctx.lineTo(-110, 95);
  ctx.lineTo(-60, 80);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(60, 40);
  ctx.lineTo(110, 95);
  ctx.lineTo(60, 80);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Booster flames
  ctx.beginPath();
  ctx.moveTo(-35, 80);
  ctx.lineTo(-20, 140);
  ctx.lineTo(0, 95);
  ctx.lineTo(20, 140);
  ctx.lineTo(35, 80);
  ctx.stroke();

  ctx.restore();
}

function drawSaturn(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.35);

  // Outer ring back
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.8, r * 0.45, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Planet body
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Front ring segment
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 1.8, r * 0.45, 0, 0, Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0.4 * Math.PI, 1.6 * Math.PI);
  ctx.quadraticCurveTo(r * 0.4, 0, Math.cos(0.4 * Math.PI) * r, Math.sin(0.4 * Math.PI) * r);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Sleeping face
  ctx.beginPath();
  ctx.arc(-r * 0.35, -12, 10, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-r * 0.2, 12, 8, 0.1 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawPlanet(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Crater circles
  ctx.beginPath();
  ctx.arc(-r * 0.3, -r * 0.2, r * 0.25, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.25, r * 0.3, r * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPuppyFace(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Big round head
  ctx.beginPath();
  ctx.ellipse(0, 0, 95, 80, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Floppy ears
  ctx.beginPath();
  ctx.ellipse(-95, 10, 32, 65, 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(95, 10, 32, 65, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Big round eyes
  [-36, 36].forEach((ex) => {
    ctx.beginPath();
    ctx.arc(ex, -15, 16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ex + 2, -15, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
  });

  // Snout & Nose
  ctx.beginPath();
  ctx.ellipse(0, 25, 38, 25, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Triangular nose
  ctx.beginPath();
  ctx.moveTo(-14, 15);
  ctx.lineTo(14, 15);
  ctx.lineTo(0, 28);
  ctx.closePath();
  ctx.fillStyle = '#0F172A';
  ctx.fill();

  // Mouth & Tongue
  ctx.beginPath();
  ctx.arc(-12, 32, 12, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(12, 32, 12, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  // Cute tongue
  ctx.beginPath();
  ctx.arc(0, 42, 10, 0, Math.PI);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawBone(ctx: CanvasRenderingContext2D, x: number, y: number, rot = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  // Bar
  ctx.beginPath();
  ctx.rect(-35, -8, 70, 16);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // 4 end circles
  [
    [-35, -12],
    [-35, 12],
    [35, -12],
    [35, 12],
  ].forEach(([bx, by]) => {
    ctx.beginPath();
    ctx.arc(bx, by, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function drawPaw(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  // Big pad
  ctx.beginPath();
  ctx.ellipse(0, 8, 24, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // 4 toes
  [
    [-24, -12],
    [-8, -22],
    [8, -22],
    [24, -12],
  ].forEach(([tx, ty]) => {
    ctx.beginPath();
    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
}

function drawKittenFace(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  // Head
  ctx.beginPath();
  ctx.ellipse(0, 10, 90, 75, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Pointy triangle ears
  ctx.beginPath();
  ctx.moveTo(-75, -20);
  ctx.lineTo(-75, -85);
  ctx.lineTo(-20, -55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(75, -20);
  ctx.lineTo(75, -85);
  ctx.lineTo(20, -55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Eyes
  [-32, 32].forEach((ex) => {
    ctx.beginPath();
    ctx.arc(ex, -5, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ex + 2, -5, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
  });

  // Nose
  ctx.beginPath();
  ctx.moveTo(-8, 15);
  ctx.lineTo(8, 15);
  ctx.lineTo(0, 24);
  ctx.closePath();
  ctx.fill();

  // Mouth
  ctx.beginPath();
  ctx.arc(-10, 26, 10, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(10, 26, 10, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  // Whiskers
  [
    [-45, 15, -95, 10],
    [-45, 25, -95, 28],
    [45, 15, 95, 10],
    [45, 25, 95, 28],
  ].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.restore();
}

function drawYarnBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Curved strands
  ctx.beginPath();
  ctx.arc(-r * 0.2, 0, r * 0.8, -0.6, 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.2, 0, r * 0.8, 2.5, 3.7);
  ctx.stroke();

  // Loose strand
  ctx.beginPath();
  ctx.moveTo(r * 0.7, r * 0.7);
  ctx.bezierCurveTo(r + 30, r + 40, r + 60, r + 10, r + 90, r + 30);
  ctx.stroke();
  ctx.restore();
}

function drawGiantFlower(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);

  // 8 Petals around center
  const petalCount = 8;
  for (let i = 0; i < petalCount; i++) {
    const ang = (i * Math.PI * 2) / petalCount;
    ctx.save();
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.65, r * 0.26, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  // Center smiley face
  ctx.beginPath();
  ctx.arc(-14, -8, 5, 0, Math.PI * 2);
  ctx.arc(14, -8, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 8, 16, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawButterfly(ctx: CanvasRenderingContext2D, x: number, y: number, dir = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 8, 38, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();

  // Antennae
  ctx.beginPath();
  ctx.moveTo(-3, -35);
  ctx.quadraticCurveTo(-15, -60, -25, -55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(3, -35);
  ctx.quadraticCurveTo(15, -60, 25, -55);
  ctx.stroke();

  // Top wings
  ctx.beginPath();
  ctx.ellipse(-45, -20, 38, 28, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(45, -20, 38, 28, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Bottom wings
  ctx.beginPath();
  ctx.ellipse(-35, 20, 28, 22, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(35, 20, 28, 22, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}
