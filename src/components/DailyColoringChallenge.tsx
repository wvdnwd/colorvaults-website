'use client';

import React, { useState, useEffect } from'react';
import Link from'next/link';
import SafeImage from'./SafeImage';

interface DailyChallengeProps {
  isEn: boolean;
  lang: string;
}

export default function DailyColoringChallenge({ isEn, lang }: DailyChallengeProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      marginTop:'3.5rem',
      background:'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      borderRadius:'var(--radius-xl, 24px)',
      padding:'2.5rem 2rem',
      color:'#FFFFFF',
      boxShadow:'0 20px 50px rgba(30, 27, 75, 0.25)',
      border:'1px solid rgba(255, 255, 255, 0.1)',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:'2.5rem',
      flexWrap:'wrap',
    }}>
      <div style={{ flex:'1 1 340px'}}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem'}}>
          <span style={{
            background:'rgba(245, 158, 11, 0.2)',
            color:'#FBBF24',
            border:'1px solid rgba(245, 158, 11, 0.4)',
            borderRadius:'9999px',
            padding:'0.2rem 0.75rem',
            fontSize:'0.78rem',
            fontWeight: 800,
            textTransform:'uppercase',
            letterSpacing:'0.05em',
          }}>
            {isEn ?'Daily Challenge':'Dagelijkse Uitdaging'}
          </span>
          <span style={{
            background:'rgba(255, 255, 255, 0.1)',
            borderRadius:'9999px',
            padding:'0.2rem 0.65rem',
            fontSize:'0.78rem',
            fontWeight: 700,
            color:'#CBD5E1',
          }}>
            ⏳ {isEn ?'Resets in':'Ververst over'}: <strong style={{ color:'#FFFFFF'}}>{timeLeft}</strong>
          </span>
        </div>

        <h2 style={{ fontSize:'1.85rem', fontWeight: 800, margin:'0 0 0.6rem', lineHeight: 1.25 }}>
          {isEn ?'Today’s Featured Masterpiece':'Kleurplaat van de Dag'}
        </h2>
        <p style={{ color:'#C7D2FE', fontSize:'0.975rem', lineHeight: 1.6, margin:'0 0 1.5rem'}}>
          {isEn
            ?'Join thousands coloring today’s community spotlight! Complete the digital artwork or print it out to unlock your daily Masterpiece Certificate.':'Kleur vandaag mee met duizenden anderen! Kleur de plaat digitaal in of print hem uit voor je dagelijkse diploma.'}
        </p>

        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap'}}>
          <Link
            href={`/${lang}/fantasy-fairytales/fairytale-kingdoms-castles/kids/fairytale-kingdoms-castles-1/color`}
            style={{
              padding:'0.75rem 1.4rem',
              borderRadius:'9999px',
              background:'var(--gradient-primary, linear-gradient(135deg, #FF6B35, #FF3B30))',
              color:'#FFFFFF',
              fontWeight: 800,
              fontSize:'0.9rem',
              textDecoration:'none',
              boxShadow:'0 4px 15px rgba(255, 107, 53, 0.4)',
            }}
          >
            {isEn ?'Color Online Now':'Nu Online Inkleuren'}
          </Link>
          <Link
            href={`/${lang}/fantasy-fairytales/fairytale-kingdoms-castles/kids/fairytale-kingdoms-castles-1`}
            style={{
              padding:'0.75rem 1.4rem',
              borderRadius:'9999px',
              background:'rgba(255, 255, 255, 0.12)',
              color:'#FFFFFF',
              fontWeight: 700,
              fontSize:'0.9rem',
              textDecoration:'none',
              border:'1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {isEn ?'Print Free PDF':'Gratis Printen'}
          </Link>
        </div>
      </div>

      <div style={{
        flex:'0 0 180px',
        background:'#FFFFFF',
        borderRadius:'16px',
        padding:'0.75rem',
        boxShadow:'0 15px 35px rgba(0,0,0,0.3)',
        border:'3px solid rgba(255, 255, 255, 0.2)',
        textAlign:'center',
      }}>
        <div style={{ aspectRatio:'3/4', position:'relative', borderRadius:'10px', overflow:'hidden', background:'#F8FAFC'}}>
          <SafeImage
            src="https://colorvaults.ams3.cdn.digitaloceanspaces.com/banner/hub_fantasy-fairytales.webp"alt="Daily Coloring Page"width={200}
            height={260}
            style={{ width:'100%', height:'100%', objectFit:'cover'}}
          />
        </div>
        <div style={{ marginTop:'0.5rem', fontSize:'0.75rem', fontWeight: 800, color:'#1E1B4B'}}>
          {isEn ?'Fairytale Castle':'Sprookjeskasteel'}
        </div>
      </div>
    </section>
  );
}