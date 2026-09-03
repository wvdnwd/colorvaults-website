'use client';

import React, { useState } from'react';
import SafeImage from'./SafeImage';
import { CalendarMonth } from'@/data/calendarData';

interface PrintableCalendarProps {
  months: CalendarMonth[];
  year: number;
  isEn: boolean;
  lang: string;
}

export default function PrintableCalendarGrid({ months, year, isEn, lang }: PrintableCalendarProps) {
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const handlePrintAll = () => {
    window.print();
  };

  const daysOfWeekEn = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const daysOfWeekNl = ['Ma','Di','Wo','Do','Vr','Za','Zo'];
  const daysOfWeek = isEn ? daysOfWeekEn : daysOfWeekNl;

  return (
    <div>
      {/* Top Action Bar */}
      <div style={{
        background:'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
        borderRadius:'24px',
        padding:'2rem',
        color:'#FFFFFF',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'1.5rem',
        flexWrap:'wrap',
        boxShadow:'0 15px 35px rgba(30, 27, 75, 0.25)',
        marginBottom:'3rem',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.25rem'}}>
          <div style={{ fontSize:'3rem'}}></div>
          <div>
            <span style={{
              background:'rgba(255, 255, 255, 0.2)',
              borderRadius:'9999px',
              padding:'0.2rem 0.75rem',
              fontSize:'0.75rem',
              fontWeight: 800,
              textTransform:'uppercase',
              letterSpacing:'0.04em',
            }}>
              {isEn ?'Full Year Printable Bundle':'Compleet Jaarkalender Pakket'}
            </span>
            <h2 style={{ fontSize:'1.65rem', fontWeight: 800, margin:'0.4rem 0 0.2rem', color:'#FFFFFF'}}>
              {isEn ?`Free Printable ${year} Coloring Calendar (12 Months)`:`Gratis Printbare ${year} Kleurkalender (12 Maanden)`}
            </h2>
            <p style={{ margin: 0, fontSize:'0.95rem', color:'#C7D2FE'}}>
              {isEn
                ?'Each month features an adorable coloring header and spacious planning boxes for school & home!':'Elke maand heeft een prachtige kleurplaat-kop en ruime vakjes voor verjaardagen en afspraken!'}
            </p>
          </div>
        </div>

        <button
          type="button"onClick={handlePrintAll}
          style={{
            padding:'0.9rem 2rem',
            borderRadius:'9999px',
            background:'var(--gradient-primary, linear-gradient(135deg, #FF6B35, #FF3B30))',
            color:'#FFFFFF',
            border:'none',
            fontWeight: 800,
            fontSize:'1rem',
            cursor:'pointer',
            boxShadow:'0 6px 20px rgba(255, 107, 53, 0.4)',
            display:'flex',
            alignItems:'center',
            gap:'0.5rem',
            whiteSpace:'nowrap',
          }}
        >
          <span>🖨️</span>
          <span>{isEn ?`Print Full ${year} Calendar (12 Pages)`:`Print Complete ${year} Kalender (12 Pagina's)`}</span>
        </button>
      </div>

      {/* 12 Months Grid */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))',
        gap:'2rem',
      }}>
        {months.map((m) => (
          <div
            key={m.monthNumber}
            style={{
              background:'#FFFFFF',
              borderRadius:'24px',
              border:'1.5px solid var(--gray-200)',
              overflow:'hidden',
              boxShadow:'0 8px 30px rgba(0, 0, 0, 0.04)',
              display:'flex',
              flexDirection:'column',
              pageBreakAfter:'always', // Clean print break
            }}
          >
            {/* Month Header Banner */}
            <div style={{
              position:'relative',
              height:'180px',
              background:'#F1F5F9',
              overflow:'hidden',
            }}>
              <SafeImage
                src={m.image}
                alt={`${m.nameEn} Coloring Calendar Header`}
                width={400}
                height={200}
                style={{ width:'100%', height:'100%', objectFit:'cover'}}
              />
              <div style={{
                position:'absolute',
                inset: 0,
                background:'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%)',
              }} />
              <div style={{
                position:'absolute',
                bottom:'12px',
                left:'16px',
                right:'16px',
                display:'flex',
                alignItems:'flex-end',
                justifyContent:'space-between',
                color:'#FFFFFF',
              }}>
                <div>
                  <span style={{ fontSize:'0.75rem', fontWeight: 800, textTransform:'uppercase', letterSpacing:'0.04em', color:'#CBD5E1'}}>
                    {isEn ? m.seasonEn : m.seasonNl}
                  </span>
                  <h3 style={{ margin: 0, fontSize:'1.5rem', fontWeight: 800, color:'#FFFFFF', lineHeight: 1.1 }}>
                    {isEn ? m.nameEn : m.nameNl} {year}
                  </h3>
                </div>
                <span style={{ fontSize:'2rem'}}>{m.icon}</span>
              </div>
            </div>

            {/* Calendar Days Box */}
            <div style={{ padding:'1.5rem', flex: 1, display:'flex', flexDirection:'column'}}>
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(7, 1fr)',
                textAlign:'center',
                fontWeight: 800,
                fontSize:'0.75rem',
                color:'#64748B',
                marginBottom:'0.6rem',
                borderBottom:'1px solid var(--gray-200)',
                paddingBottom:'0.4rem',
              }}>
                {daysOfWeek.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Sample Month Days Grid */}
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(7, 1fr)',
                gap:'4px',
                textAlign:'center',
                fontSize:'0.85rem',
                fontWeight: 700,
                color:'#1E293B',
                marginBottom:'1rem',
              }}>
                {Array.from({ length: m.days }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height:'32px',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      borderRadius:'8px',
                      background:'var(--surface-2, #F8FAFC)',
                      border:'1px solid var(--gray-200)',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <p style={{ fontSize:'0.8rem', color:'#64748B', fontStyle:'italic', margin:'auto 0 1rem', textAlign:'center'}}>
                &ldquo;{isEn ? m.quoteEn : m.quoteNl}&rdquo;
              </p>

              {/* Single Month Print Button */}
              <button
                type="button"onClick={() => window.print()}
                style={{
                  width:'100%',
                  padding:'0.65rem',
                  borderRadius:'12px',
                  background:'#F1F5F9',
                  border:'1px solid var(--gray-200)',
                  fontWeight: 800,
                  fontSize:'0.85rem',
                  color:'#0F172A',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  gap:'0.4rem',
                  transition:'background 0.2s',
                }}
              >
                <span>🖨️</span>
                <span>{isEn ?`Print ${m.nameEn} Page`:`Print ${m.nameNl} Maandblad`}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}