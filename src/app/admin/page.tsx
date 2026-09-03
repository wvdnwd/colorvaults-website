'use client';

import { useState } from'react';
import { useRouter } from'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Incorrect password. Try again.');
      }
    } catch {
      setError('Connection error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'#071417',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      fontFamily:'system-ui, sans-serif',
    }}>
      <div style={{
        background:'#0d2224',
        border:'1px solid rgba(253,246,233,0.1)',
        borderRadius:'1rem',
        padding:'2.5rem 2rem',
        width:'100%',
        maxWidth: 360,
        boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
      }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem', textAlign:'center'}}>🔐</div>
        <h1 style={{ fontSize:'1.4rem', fontWeight: 800, color:'#FDF6E9', margin:'0 0 0.35rem', textAlign:'center'}}>
          Admin Panel
        </h1>
        <p style={{ fontSize:'0.8rem', color:'rgba(253,246,233,0.4)', margin:'0 0 2rem', textAlign:'center'}}>
          ColorVaults — Restricted Access
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display:'block', fontSize:'0.78rem', fontWeight: 700, color:'rgba(253,246,233,0.55)', marginBottom:'0.4rem'}}>
            Password
          </label>
          <input
            type="password"value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"autoFocus
            required
            style={{
              width:'100%',
              boxSizing:'border-box',
              padding:'0.7rem 1rem',
              background:'#071417',
              border:'1.5px solid rgba(253,246,233,0.12)',
              borderRadius:'0.5rem',
              color:'#FDF6E9',
              fontSize:'0.9rem',
              fontFamily:'inherit',
              outline:'none',
              marginBottom:'1rem',
            }}
          />
          <button
            type="submit"disabled={loading}
            style={{
              width:'100%',
              padding:'0.75rem',
              background: loading ?'#9a3a25':'#FF6B4A',
              color:'white',
              border:'none',
              borderRadius:'0.5rem',
              fontSize:'0.9rem',
              fontWeight: 700,
              cursor: loading ?'not-allowed':'pointer',
              fontFamily:'inherit',
            }}
          >
            {loading ?'Signing in...':'→ Sign In'}
          </button>
          {error && (
            <div style={{
              marginTop:'0.75rem',
              padding:'0.6rem 0.9rem',
              background:'rgba(239,68,68,0.1)',
              border:'1px solid rgba(239,68,68,0.2)',
              borderRadius:'0.5rem',
              color:'#f87171',
              fontSize:'0.8rem',
              textAlign:'center',
            }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
