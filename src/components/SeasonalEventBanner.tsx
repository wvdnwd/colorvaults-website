import React from 'react';
import Link from 'next/link';

export default function SeasonalEventBanner({ isEn, lang }: { isEn: boolean; lang: string }) {
  const month = new Date().getMonth(); // 0 = Jan, 8 = Sep, 9 = Oct, 10 = Nov, 11 = Dec

  let seasonalData = {
    emoji: '🍂',
    tag: isEn ? 'Autumn & Back to School' : 'Herfst & Terug naar School',
    title: isEn ? 'Cozy Autumn & Classroom Coloring Pages' : 'Gezellige Herfst- & Schoolkleurplaten',
    desc: isEn ? 'Explore leaves, pumpkins, and creative school themes!' : 'Ontdek vallende blaadjes, pompoenen en vrolijke schoolplaten!',
    href: `/${lang}/holidays-seasons`,
    bg: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
  };

  if (month === 9) {
    // October - Halloween
    seasonalData = {
      emoji: '🎃',
      tag: isEn ? 'Halloween Special' : 'Halloween & Spanning',
      title: isEn ? 'Spooky Halloween & Pumpkin Printables' : 'Griezelige Halloween & Pompoen Kleurplaten',
      desc: isEn ? 'Friendly ghosts, witches, and haunted castles ready to print!' : 'Vriendelijke spookjes, heksen en kastelen om gratis uit te printen!',
      href: `/${lang}/holidays-seasons/halloween-spooky-nights`,
      bg: 'linear-gradient(135deg, #451A03 0%, #D97706 100%)',
    };
  } else if (month === 10) {
    // November - Sinterklaas (NL) or Thanksgiving / Autumn Harvest (EN/DE/FR)
    if (lang === 'nl') {
      seasonalData = {
        emoji: '🎁',
        tag: 'Sinterklaas Feest 2026',
        title: 'Sinterklaas, Zwarte Piet & Schoentje Zetten Kleurplaten',
        desc: 'Pakjesboot, het paard van Sinterklaas, pepernoten en gezellige schoenzet-tekeningen!',
        href: `/${lang}/holidays-seasons/sinterklaas-pieten`,
        bg: 'linear-gradient(135deg, #991B1B 0%, #EA580C 100%)',
      };
    } else {
      seasonalData = {
        emoji: '🦃',
        tag: isEn ? 'Harvest & Thanksgiving' : 'Herbst & Erntedank',
        title: isEn ? 'Autumn Harvest & Thanksgiving Printables' : 'Kuschelige Herbst- & Erntedank Ausmalbilder',
        desc: isEn ? 'Cozy pumpkins, autumn turkeys, and warm family gatherings!' : 'Kürbisse, bunte Blätter und gemütliche Familienzeit!',
        href: `/${lang}/holidays-seasons/autumn-harvest-pumpkins`,
        bg: 'linear-gradient(135deg, #78350F 0%, #D97706 100%)',
      };
    }
  } else if (month === 11 || month === 0) {
    // December/January - Christmas & Winter
    seasonalData = {
      emoji: '🎄',
      tag: isEn ? 'Winter & Christmas Magic' : 'Kerstmis & Winterwonderland',
      title: isEn ? 'Festive Holiday & Snowman Coloring Sheets' : 'Magische Kerst- & Sneeuwpop Kleurplaten',
      desc: isEn ? 'Santa, reindeer, and cozy winter landscapes!' : 'De Kerstman, rendieren, sneeuwpoppen en warme wintertaferelen!',
      href: `/${lang}/holidays-seasons/christmas-winter-holidays`,
      bg: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    };
  } else if (month >= 2 && month <= 4) {
    // Spring & Easter
    seasonalData = {
      emoji: '🐰',
      tag: isEn ? 'Easter & Spring Bloom' : 'Pasen & Vrolijke Lente',
      title: isEn ? 'Easter Bunnies & Colorful Spring Blooms' : 'Vrolijke Paashaas & Lente Kleurplaten',
      desc: isEn ? 'Cute bunnies, eggs, and blooming gardens!' : 'Lieve paashazen, eieren versieren en bloeiende bloemen!',
      href: `/${lang}/holidays-seasons/easter-spring-bloom`,
      bg: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
    };
  }

  const nameColoringHref = isEn ? `/${lang}/name-coloring-page` : `/${lang}/naam-kleurplaat`;

  const holidayPills = isEn
    ? [
        { name: '🎃 Halloween', href: `/${lang}/holidays-seasons/halloween-spooky-nights` },
        { name: '🎄 Christmas', href: `/${lang}/holidays-seasons/christmas-winter-holidays` },
        { name: '🍂 Autumn', href: `/${lang}/holidays-seasons/autumn-harvest-pumpkins` },
        { name: '🐰 Easter', href: `/${lang}/holidays-seasons/easter-spring-bloom` },
        { name: '✨ Name Maker', href: nameColoringHref },
        { name: '📅 2026/2027 Calendar', href: `/${lang}/calendars` },
      ]
    : [
        { name: '🎃 Halloween', href: `/${lang}/holidays-seasons/halloween-spooky-nights` },
        { name: '🎁 Sinterklaas', href: `/${lang}/holidays-seasons/sinterklaas-pieten` },
        { name: '🎄 Kerstmis', href: `/${lang}/holidays-seasons/christmas-winter-holidays` },
        { name: '🍂 Herfst', href: `/${lang}/holidays-seasons/autumn-harvest-pumpkins` },
        { name: '✨ Naam-Kleurplaat', href: nameColoringHref },
        { name: '📅 2026/2027 Kalender', href: `/${lang}/calendars` },
      ];

  return (
    <div
      style={{
        background: seasonalData.bg,
        borderRadius: 'var(--radius-xl, 24px)',
        padding: '2rem 2.25rem',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
        marginTop: '2.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ fontSize: '2.8rem' }}>{seasonalData.emoji}</div>
          <div>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '0.25rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {seasonalData.tag}
            </span>
            <h3 style={{ margin: '0.45rem 0 0.25rem', fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF' }}>
              {seasonalData.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.92)' }}>
              {seasonalData.desc}
            </p>
          </div>
        </div>

        <Link
          href={seasonalData.href}
          style={{
            padding: '0.8rem 1.6rem',
            borderRadius: '9999px',
            background: '#FFFFFF',
            color: '#0F172A',
            fontWeight: 800,
            fontSize: '0.92rem',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s ease',
          }}
        >
          {isEn ? 'Explore Collection →' : 'Bekijk Collectie →'}
        </Link>
      </div>

      {/* Quick Holiday Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          paddingTop: '0.6rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)', alignSelf: 'center' }}>
          {isEn ? 'Quick Jump:' : 'Direct naar:'}
        </span>
        {holidayPills.map((p) => (
          <Link
            key={p.name}
            href={p.href}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
