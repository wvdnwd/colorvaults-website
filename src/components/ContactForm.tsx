'use client';

import { useState } from 'react';

export default function ContactForm({ lang, isEn }: { lang: string; isEn: boolean }) {
 const [formData, setFormData] = useState({
 firstName: '',
 lastName: '',
 email: '',
 subject: '',
 message: ''
 });
 const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (status === 'submitting') return;
 setStatus('submitting');

 try {
 const res = await fetch('/api/contact', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(formData),
 });

 if (res.ok) {
 setStatus('success');
 } else {
 setStatus('error');
 }
 } catch {
 setStatus('error');
 }
 };


 const inputStyle: React.CSSProperties = {
 width: '100%',
 padding: '0.75rem 1rem',
 borderRadius: 'var(--radius)',
 border: '1.5px solid var(--gray-200)',
 fontSize: '0.9rem',
 fontFamily: 'inherit',
 color: 'var(--foreground)',
 background: 'var(--gray-50)',
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
 <div style={{ fontSize: '4rem', marginBottom: '1.25rem' }}>️</div>
 <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
 {isEn ? 'Thank You!' : 'Bedankt!'}
 </h2>
 <p style={{ color: 'var(--gray-600)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
 {isEn 
 ? 'Your message has been sent successfully. We will get back to you within 2 business days.'
 : 'Je bericht is succesvol verzonden. We nemen binnen 2 werkdagen contact met je op.'}
 </p>
 <button 
 onClick={() => {
 setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
 setStatus('idle');
 }}
 className="btn-primary"
 >
 {isEn ? 'Send Another Message' : 'Nieuw Bericht Sturen'}
 </button>
 </div>
 );
 }

 return (
 <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--gray-200)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
 <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.75rem' }}>
 {isEn ? 'Send Us a Message' : 'Stuur Ons een Bericht'}
 </h2>
 <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
 <div>
 <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
 {isEn ? 'First Name' : 'Voornaam'} *
 </label>
 <input 
 type="text" 
 required 
 value={formData.firstName}
 onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
 style={inputStyle} 
 placeholder={isEn ? 'John' : 'Jan'} 
 />
 </div>
 <div>
 <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
 {isEn ? 'Last Name' : 'Achternaam'}
 </label>
 <input 
 type="text" 
 value={formData.lastName}
 onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
 style={inputStyle} 
 placeholder={isEn ? 'Doe' : 'Jansen'} 
 />
 </div>
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
 {isEn ? 'Email Address' : 'E-mailadres'} *
 </label>
 <input 
 type="email" 
 required 
 value={formData.email}
 onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
 style={inputStyle} 
 placeholder="you@example.com" 
 />
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
 {isEn ? 'Subject' : 'Onderwerp'} *
 </label>
 <select 
 required 
 value={formData.subject}
 onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
 style={inputStyle}
 >
 <option value="">{isEn ? 'Select a topic...' : 'Kies een onderwerp...'}</option>
 <option value="request">{isEn ? 'Page Request' : 'Pagina Aanvragen'}</option>
 <option value="bug">{isEn ? 'Report a Bug' : 'Bug Melden'}</option>
 <option value="business">{isEn ? 'Business / Licensing' : 'Zakelijk / Licentie'}</option>
 <option value="copyright">{isEn ? 'Copyright Issue' : 'Auteursrechtprobleem'}</option>
 <option value="other">{isEn ? 'Other' : 'Anders'}</option>
 </select>
 </div>

 <div>
 <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--gray-700)' }}>
 {isEn ? 'Message' : 'Bericht'} *
 </label>
 <textarea 
 required 
 rows={5} 
 value={formData.message}
 onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
 style={{ ...inputStyle, resize: 'vertical' }}
 placeholder={isEn ? 'Tell us how we can help...' : 'Vertel ons hoe we kunnen helpen...'} 
 />
 </div>

 <button 
 type="submit" 
 disabled={status === 'submitting'}
 className="btn-primary" 
 style={{ width: '100%', justifyContent: 'center' }}
 >
 {status === 'submitting' 
 ? (isEn ? 'Sending...' : 'Verzenden...') 
 : (isEn ? '️ Send Message' : '️ Bericht Versturen')}
 </button>
 
 <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center' }}>
 {isEn ? 'By submitting you agree to our Privacy Policy.' : 'Door te versturen ga je akkoord met ons Privacybeleid.'}
 </p>
 </form>
 </div>
 );
}
