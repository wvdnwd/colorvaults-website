import React from'react';
import Link from'next/link';

export default function SeasonalEventBanner({ isEn, lang }: { isEn: boolean; lang: string }) {
  // Determine current season / holiday
  const month = new Date().getMonth(); // 0 = Jan, 8 = Sep, 9 = Oct, 11 = Dec

  let seasonalData = {
    emoji:'🍂',
    tag: isEn ?'Autumn & Back to School':'Herfst & Terug naar School',
    title: isEn ?'Cozy Autumn & Classroom Coloring Pages':'Gezellige Herfst- & Schoolkleurplaten',
    desc: isEn ?'Explore leaves, pumpkins, and creative school themes!':'Ontdek vallende blaadjes, pompoenen en vrolijke schoolplaten!',
    href:`/${lang}/holidays-seasons`,
    bg:'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
  };

  if (month === 9 || month === 10) {
    // October/November - Halloween
    seasonalData = {
      emoji:'🎃',
      tag: isEn ?'Halloween Special':'Halloween & Spanning',
      title: isEn ?'Spooky Halloween & Pumpkin Printables':'Griezelige Halloween & Pompoen Kleurplaten',
      desc: isEn ?'Friendly ghosts, witches, and haunted castles ready to print!':'Vriendelijke spookjes, heksen en kastelen om uit te printen!',
      href:`/${lang}/holidays-seasons`,
      bg:'linear-gradient(135deg, #451A03 0%, #D97706 100%)',
    };
  } else if (month === 11 || month === 0) {
    // December/January - Christmas & Winter
    seasonalData = {
      emoji:'🎄',
      tag: isEn ?'Winter & Christmas Magic':'Sinterklaas, Kerst & Winter',
      title: isEn ?'Festive Holiday & Snowman Coloring Sheets':'Magische Kerst- & Sneeuwpop Kleurplaten',
      desc: isEn ?'Santa, reindeer, and cozy winter landscapes!':'De Kerstman, rendieren, sneeuwpoppen en warme wintertaferelen!',
      href:`/${lang}/holidays-seasons`,
      bg:'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    };
  }

  return (
    <div style={{
      background: seasonalData.bg,
      borderRadius:'var(--radius-xl, 24px)',
      padding:'1.75rem 2rem',
      color:'#FFFFFF',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:'1.5rem',
      flexWrap:'wrap',
      boxShadow:'0 10px 30px rgba(0, 0, 0, 0.12)',
      marginTop:'2rem',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'1.25rem'}}>
        <div style={{ fontSize:'2.5rem'}}>{seasonalData.emoji}</div>
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
            {seasonalData.tag}
          </span>
          <h3 style={{ margin:'0.4rem 0 0.2rem', fontSize:'1.35rem', fontWeight: 800, color:'#FFFFFF'}}>
            {seasonalData.title}
          </h3>
          <p style={{ margin: 0, fontSize:'0.925rem', color:'rgba(255, 255, 255, 0.9)'}}>
            {seasonalData.desc}
          </p>
        </div>
      </div>

      <Link
        href={seasonalData.href}
        style={{
          padding:'0.75rem 1.5rem',
          borderRadius:'9999px',
          background:'#FFFFFF',
          color:'#0F172A',
          fontWeight: 800,
          fontSize:'0.9rem',
          textDecoration:'none',
          boxShadow:'0 4px 15px rgba(0, 0, 0, 0.2)',
          whiteSpace:'nowrap',
        }}
      >
        {isEn ?'Explore Seasonal →':'Bekijk Feestdagen →'}
      </Link>
    </div>
  );
}