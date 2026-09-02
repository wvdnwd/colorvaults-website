'use client';

import React, { useState } from 'react';

export default function NewsletterBox({ isEn, lang }: { isEn: boolean; lang: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section style={{
      marginTop: '4rem',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      borderRadius: 'var(--radius-xl, 24px)',
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#FFFFFF',
      boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255, 107, 53, 0.2)',
          color: '#FF6B35',
          border: '1px solid rgba(255, 107, 53, 0.4)',
          borderRadius: '9999px',
          padding: '0.25rem 0.85rem',
          fontSize: '0.8rem',
          fontWeight: 800,
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          💌 {isEn ? 'ColorVaults Club' : 'Kleurplaten Club'}
        </span>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.25 }}>
          {isEn ? 'Get 10 New Free Coloring Pages Every Week!' : 'Ontvang Elke Week 10 Nieuwe Gratis Kleurplaten!'}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {isEn
            ? 'Join over 15,000+ parents and teachers. Free high-resolution printables sent directly to your inbox — 100% spam-free.'
            : 'Sluit je aan bij meer dan 15.000+ ouders en leerkrachten. Wekelijks nieuwe A4 printables in je mailbox — 100% gratis en vrijblijvend.'}
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid #22C55E',
            borderRadius: '16px',
            padding: '1.25rem',
            color: '#86EFAC',
            fontWeight: 700,
            fontSize: '1.05rem',
          }}>
            🎉 {isEn ? 'Thank you! You are now subscribed to the weekly coloring club.' : 'Bedankt! Je staat ingeschreven en ontvangt direct de nieuwste kleurplaten.'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '0.6rem',
            maxWidth: '480px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEn ? 'Enter your email address...' : 'Vul je e-mailadres in...'}
              required
              style={{
                flex: '1 1 280px',
                padding: '0.95rem 1.25rem',
                borderRadius: '9999px',
                border: '1.5px solid #334155',
                background: '#0F172A',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '0.95rem 1.75rem',
                borderRadius: '9999px',
                background: 'var(--gradient-primary, linear-gradient(135deg, #FF6B35, #FF3B30))',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
                transition: 'all 0.2s',
              }}
            >
              {status === 'loading' ? (isEn ? 'Joining...' : 'Bezig...') : (isEn ? 'Subscribe Free' : 'Gratis Aanmelden')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}