'use client';

import { useState } from 'react';

export default function PrintDownloadButtons({
  isEn,
  fileUrl,
}: {
  isEn: boolean;
  fileUrl: string;
}) {
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);

    try {
      // Use proxy to avoid CORS issues with DigitalOcean Spaces canvas tainting
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(fileUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error('Proxy fetch failed');
      
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Draw watermark
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const fontSize = Math.max(14, img.width * 0.02); // Dynamic font size based on image width
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      
      // Text shadow for readability
      ctx.shadowColor = 'white';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.fillText('© ColorVaults.com', canvas.width - 20, canvas.height - 20);

      // Convert to blob and download
      canvas.toBlob((watermarkedBlob) => {
        if (!watermarkedBlob) {
          // Blob generation failed, fall through to direct download
          const a = document.createElement('a');
          a.href = `/api/proxy-image?url=${encodeURIComponent(fileUrl)}`;
          a.download = fileUrl.split('/').pop() || 'colorvaults-page.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setDownloading(false);
          return;
        }
        const url = URL.createObjectURL(watermarkedBlob);
        const a = document.createElement('a');
        a.href = url;
        const filename = fileUrl.split('/').pop() || 'colorvaults-page.jpg';
        a.download = `colorvaults-${filename}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setDownloading(false);
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error('Failed to add watermark, falling back to direct download', err);
      // Fallback
      const a = document.createElement('a');
      a.href = `/api/proxy-image?url=${encodeURIComponent(fileUrl)}`; // Try downloading via proxy anyway
      a.download = fileUrl.split('/').pop() || 'colorvaults-page.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
    }
  };

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <button
        onClick={handlePrint}
        className="download-btn"
        style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}
      >
        <span aria-hidden="true">🖨️</span> {isEn ? 'Print Free Coloring Page' : 'Gratis Kleurplaat Printen'}
      </button>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="btn-secondary"
        style={{ width: '100%', justifyContent: 'center', cursor: downloading ? 'not-allowed' : 'pointer' }}
      >
        <span aria-hidden="true">⬇️</span> {downloading ? (isEn ? 'Preparing Image...' : 'Afbeelding Verwerken...') : (isEn ? 'Download Image File' : 'Download Afbeelding')}
      </button>
    </div>
  );
}
