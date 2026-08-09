'use client';

import { useState } from 'react';

export default function RequestForm({ lang, isEn }: { lang: string; isEn: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');

    // Simulate page request submission
    await new Promise(resolve => setTimeout(resolve, 1200));
    setStatus('success');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius)',
    border: '1.5px solid var(--gray-200)',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  if (status === 'success') {
    return (
      <div 
        style={{ 
          background: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-lg)', 
          border: '2px solid var(--primary-light)', 
          padding: '3rem 2rem', 
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ fontSize: '4.5rem', marginBottom: '1.25rem' }}>🚀</div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
          {isEn ? 'Request Submitted!' : 'Aanvraag Ingediend!'}
        </h2>
        <p style={{ color: 'var(--gray-600)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {isEn 
            ? 'We have received your coloring page request. Popular requests are added to our vaults weekly.'
            : 'We hebben je kleurplaataanvraag ontvangen. Populaire aanvragen worden wekelijks toegevoegd.'}
        </p>
        <button 
          onClick={() => {
            setFormData({ name: '', email: '', request: '', details: '' });
            setStatus('idle');
          }}
          className="btn-primary"
        >
          {isEn ? 'Request Another Page' : 'Nog Een Kleurplaat Aanvragen'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--gray-200)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        {isEn ? 'Submit Your Request' : 'Stuur Je Aanvraag'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
            {isEn ? 'Your Name' : 'Jouw Naam'} *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder={isEn ? 'Enter your name' : 'Voer je naam in'}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
            {isEn ? 'Email Address' : 'E-mailadres'} *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder={isEn ? 'Enter your email' : 'Voer je e-mail in'}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
            {isEn ? 'What would you like?' : 'Wat wil je graag?'} *
          </label>
          <input
            type="text"
            required
            value={formData.request}
            onChange={e => setFormData(prev => ({ ...prev, request: e.target.value }))}
            placeholder={isEn ? 'e.g. Sonic the Hedgehog for teens' : 'bijv. Sonic the Hedgehog voor tieners'}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
            {isEn ? 'Additional Details' : 'Extra Details'}
          </label>
          <textarea
            rows={4}
            value={formData.details}
            onChange={e => setFormData(prev => ({ ...prev, details: e.target.value }))}
            placeholder={isEn ? 'Any extra details about your request...' : 'Extra details over je aanvraag...'}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {status === 'submitting' 
            ? (isEn ? 'Submitting...' : 'Verwerken...') 
            : (isEn ? '🚀 Submit Request' : '🚀 Aanvraag Indienen')}
        </button>
      </form>
    </div>
  );
}
