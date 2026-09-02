'use client';

import React, { useState } from 'react';

interface PdfBookBundleModalProps {
  themeTitle: string;
  count: number;
  isEn: boolean;
  lang: string;
}

export default function PdfBookBundleModal({ themeTitle, count, isEn, lang }: PdfBookBundleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);

    if (email && email.includes('@')) {
      try {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lang, theme: themeTitle }),
        });
      } catch (err) {
        console.error(err);
      }
    }

    setSuccess(true);
    setDownloading(false);
    // Trigger bulk print/download
    setTimeout(() => {
      window.print();
    }, 800);
  };

  return (
    <>
      <div style={{
        marginTop: '1.75rem',
        background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
        borderRadius: '20px',
        padding: '1.25rem 1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        flexWrap: 'wrap',
        boxShadow: '0 10px 30px rgba(108, 92, 231, 0.3)',
        color: '#FFFFFF',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '2.25rem',
            background: 'rgba(255, 255, 255, 0.2)',
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            📚
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
              {isEn
                ? `Download Complete ${themeTitle} Coloring Book (PDF)`
                : `Download Compleet ${themeTitle} Kleurboek (PDF)`}
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: '#E0E7FF' }}>
              {isEn
                ? `All ${count} high-resolution printable pages bundled in a single printable file.`
                : `Alle ${count} haarscherpe platen handig gebundeld in 1 bestand voor thuis of in de klas.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            background: '#FFFFFF',
            color: '#4F46E5',
            fontWeight: 800,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          📥 {isEn ? 'Download PDF Bundle' : 'Download PDF Bundel'}
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '100%',
            padding: '2.5rem 2rem',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#64748B',
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📚</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              {isEn ? `${themeTitle} Coloring Book PDF` : `${themeTitle} Kleurboek PDF`}
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {isEn
                ? `Get instant access to all ${count} printable sheets formatted for A4 & US Letter printing!`
                : `Krijg direct toegang tot alle ${count} printbare platen, perfect opgemaakt voor A4 formaat!`}
            </p>

            {success ? (
              <div style={{
                background: '#DCFCE7',
                border: '1px solid #86EFAC',
                borderRadius: '16px',
                padding: '1.25rem',
                color: '#166534',
                fontWeight: 700,
              }}>
                🎉 {isEn ? 'Opening print preview... Enjoy coloring!' : 'Afdrukvoorbeeld wordt geopend... Veel kleurplezier!'}
              </div>
            ) : (
              <form onSubmit={handleDownload} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isEn ? 'Enter email for weekly free pages (optional)...' : 'Vul je e-mail in voor wekelijkse platen (optioneel)...'}
                  style={{
                    padding: '0.9rem 1.25rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={downloading}
                  style={{
                    padding: '0.95rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(108, 92, 231, 0.35)',
                  }}
                >
                  {downloading ? (isEn ? 'Preparing PDF...' : 'PDF Genereren...') : (isEn ? '📥 Print / Save Complete Book' : '📥 Print / Bewaar Compleet Boek')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}