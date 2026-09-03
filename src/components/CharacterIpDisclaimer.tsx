import React from'react';
import Link from'next/link';

interface CharacterIpDisclaimerProps {
  themeTitle: string;
  isEn: boolean;
  lang: string;
}

export default function CharacterIpDisclaimer({
  themeTitle,
  isEn,
  lang,
}: CharacterIpDisclaimerProps) {
  return (
    <div
      style={{
        marginTop:'3.5rem',
        padding:'1.25rem 1.5rem',
        background:'var(--surface-2, #F8FAFC)',
        borderRadius:'16px',
        border:'1px solid var(--gray-200, #E2E8F0)',
        fontSize:'0.82rem',
        color:'var(--gray-500, #64748B)',
        lineHeight: 1.6,
        textAlign:'left',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:'0.45rem', marginBottom:'0.4rem', fontWeight: 800, color:'var(--gray-700, #334155)', textTransform:'uppercase', letterSpacing:'0.04em', fontSize:'0.75rem'}}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'var(--primary, #6366F1)', flexShrink: 0 }}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/>
        </svg>
        <span>{isEn ?'Intellectual Property & Fair-Use Disclaimer':'Auteursrecht & Fair-Use Disclaimer'}</span>
      </div>
      <p style={{ margin: 0 }}>
        {isEn ? (
          <>
            All trademarks, logos, characters, and related indicia associated with <strong>{themeTitle}</strong> belong to their respective copyright and trademark owners. ColorVaults.com does not claim any ownership of these intellectual properties. All coloring sheets on this platform are fan-art line drawings intended exclusively for non-commercial, educational, and personal creative use. Copyright holders can request prompt removal via our{''}
            <Link href={`/${lang}/ip-policy`} style={{ color:'#6366F1', fontWeight: 700, textDecoration:'underline'}}>
              IP Violation & Takedown Policy
            </Link>.
          </>
        ) : (
          <>
            Alle handelsmerken, karakters en beeldmerken gerelateerd aan <strong>{themeTitle}</strong> behoren toe aan hun respectievelijke rechthebbenden. ColorVaults.com claimt geen enkel eigendom van deze originele intellectuele eigendommen. Alle kleurplaten op deze website zijn onofficiële fan-art lijntekeningen, uitsluitend bedoeld voor niet-commercieel, educatief en creatief gebruik. Rechthebbenden kunnen te allen tijde een verwijderingsverzoek indienen via onze{''}
            <Link href={`/${lang}/ip-policy`} style={{ color:'#6366F1', fontWeight: 700, textDecoration:'underline'}}>
              Auteursrecht & Verwijderingsprocedure
            </Link>.
          </>
        )}
      </p>
    </div>
  );
}
