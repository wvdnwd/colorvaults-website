'use client';

export default function PrintDownloadButtons({
  isEn,
  fileUrl,
}: {
  isEn: boolean;
  fileUrl: string;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <button
        onClick={handlePrint}
        className="download-btn"
        style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}
      >
        🖨️ {isEn ? 'Print Coloring Page' : 'Kleurplaat Printen'}
      </button>

      <a
        href={fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
      >
        ⬇️ {isEn ? 'Download Image File' : 'Download Afbeelding'}
      </a>
    </div>
  );
}
