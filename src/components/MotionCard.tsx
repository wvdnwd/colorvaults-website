'use client';

import { motion } from'framer-motion';
import SafeImage from'./SafeImage';
import Link from'next/link';
import FavoriteButton from'./FavoriteButton';
import ReportButton from'./ReportButton';
import { useColoringBook } from'@/context/ColoringBookContext';

const TRENDING_SLUGS = new Set(['paw-patrol-1','paw-patrol-2','unicorn-1','unicorn-2','mandala-1','mandala-2','pokemon-1','pikachu-1','disney-princess-1','frozen-elsa-1','spongebob-1','dinosaur-1','dinosaur-2','bluey-1','bluey-2',
]);

interface MotionCardProps {
  page: {
    id?: string;
    slug: string;
    title: string;
    preview?: string;
    image?: string;
    shortDescription?: string;
    parentHub: string;
    parentTheme: string;
    ageGroup: string;
  };
  lang: string;
  isEn: boolean;
}

export default function MotionCard({ page, lang, isEn }: MotionCardProps) {
  const url =`/${lang}/${page.parentHub}/${page.parentTheme}/${page.ageGroup}/${page.slug}`;
  const isTrending = TRENDING_SLUGS.has(page.slug);
  const imageSrc = page.preview || page.image ||'';
  const favItem = { id: page.id || page.slug, slug: page.slug, title: page.title, preview: imageSrc, url };

  const { isPageSelected, toggleSelectPage } = useColoringBook();
  const isSelected = isPageSelected(page.slug);

  // Pinterest Share URL
  const pinterestShareUrl =`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://colorvaults.com${url}`)}&media=${encodeURIComponent(imageSrc)}&description=${encodeURIComponent(`${page.title} - Free Printable Coloring Page on ColorVaults.com`)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin:'-50px'}}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ position:'relative'}}
    >
      <div className="card"style={{ height:'100%', display:'flex', flexDirection:'column'}}>
        <div className="card-img-wrapper"style={{ aspectRatio:'3/4', position:'relative', background:'#FFFFFF', padding:'0.85rem', borderBottom:'1px solid var(--gray-200)'}}>
          <Link href={url} style={{ display:'block', width:'100%', height:'100%'}}>
            <SafeImage 
              src={imageSrc} 
              alt={page.title} 
              width={400} 
              height={400} 
              className="card-img"sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"style={{ objectFit:'contain', width:'100%', height:'100%'}}
            />
          </Link>

          {/* Pinterest Save Button (Top Left) */}
          <a
            href={pinterestShareUrl}
            target="_blank"rel="noopener noreferrer"title="Save to Pinterest"style={{
              position:'absolute',
              top:'10px',
              left:'10px',
              zIndex: 10,
              background:'#E60023',
              color:'#FFFFFF',
              borderRadius:'9999px',
              padding:'0.22rem 0.55rem',
              fontSize:'0.68rem',
              fontWeight: 800,
              display:'flex',
              alignItems:'center',
              gap:'0.2rem',
              textDecoration:'none',
              boxShadow:'0 2px 8px rgba(230, 0, 35, 0.3)',
              transition:'transform 0.2s',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span>📌</span>
            <span>Pin</span>
          </a>

          {/* Add to Custom Coloring Booklet Button (Top Center-Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSelectPage({
                id: page.id || page.slug,
                slug: page.slug,
                title: page.title,
                image: imageSrc,
                parentHub: page.parentHub,
                parentTheme: page.parentTheme,
                ageGroup: page.ageGroup,
              });
            }}
            title={isSelected ? (isEn ? 'Remove from bundle' : 'Verwijder uit bundel') : (isEn ? 'Add to custom bundle' : 'Toevoegen aan printbundel')}
            style={{
              position: 'absolute',
              top: '10px',
              right: '48px',
              zIndex: 10,
              background: isSelected ? '#10B981' : '#FFFFFF',
              color: isSelected ? '#FFFFFF' : '#4F46E5',
              borderRadius: '9999px',
              padding: '0.22rem 0.6rem',
              fontSize: '0.7rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              border: isSelected ? '1.5px solid #059669' : '1.5px solid #CBD5E1',
              boxShadow: isSelected ? '0 3px 10px rgba(16, 185, 129, 0.4)' : '0 2px 6px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{isSelected ? '✓' : '➕'}</span>
            <span>{isSelected ? (isEn ? 'Added' : 'In Boekje') : (isEn ? 'Bundle' : 'Kleurboek')}</span>
          </button>

          {/* Favorite Button (Top Right) */}
          <div style={{ position:'absolute', top:'10px', right:'10px', zIndex: 10 }}>
            <FavoriteButton item={favItem} />
          </div>

          {/* Age / Level Tag */}
          {(() => {
            const age = (page.ageGroup ||'').toLowerCase();
            let label = isEn ?'Kids 5-8y':'Kids 5-8j';
            let bg ='#EFF6FF';
            let border ='#BFDBFE';
            let text ='#1E40AF';

            if (age.includes('toddler') || age.includes('peuter')) {
              label = isEn ?'Toddlers (2-4y)':'Peuters (2-4j)';
              bg ='#ECFDF5';
              border ='#A7F3D0';
              text ='#065F46';
            } else if (age.includes('teen') || age.includes('tiener')) {
              label = isEn ?'Teens (9-12y)':'Tieners (9-12j)';
              bg ='#FAF5FF';
              border ='#E9D5FF';
              text ='#6B21A8';
            } else if (age.includes('adult') || age.includes('volwassen')) {
              label = isEn ?'Adults (13+)':'Volwassenen';
              bg ='#FFF1F2';
              border ='#FECDD3';
              text ='#9F1239';
            } else {
              label = isEn ?'Kids (5-8y)':'Kids (5-8j)';
            }

            return (
              <div style={{
                position:'absolute',
                bottom:'10px',
                left:'10px',
                background: bg,
                borderRadius:'9999px',
                padding:'0.2rem 0.65rem',
                fontSize:'0.68rem',
                fontWeight: 800,
                color: text,
                border:`1px solid ${border}`,
                boxShadow:'0 2px 6px rgba(0,0,0,0.06)',
                zIndex: 4,
              }}>
                {label}
              </div>
            );
          })()}

          {/* Friendly Pencil Error Finder (Bottom Right) */}
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', zIndex: 10 }}>
            <ReportButton
              imageUrl={imageSrc}
              category={page.parentTheme}
              isEn={isEn}
              variant="compact"
            />
          </div>
        </div>
        
        <div className="card-body"style={{ padding:'1rem', display:'flex', flexDirection:'column', flex: 1 }}>
          <Link href={url} style={{ textDecoration:'none', color:'inherit'}}>
            <h3 className="card-title"style={{ fontSize:'1rem', marginBottom:'0.4rem', fontWeight: 800 }}>
              {page.title}
            </h3>
          </Link>
          
          <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            gap:'0.5rem',
            marginTop:'auto',
            paddingTop:'0.75rem',
            borderTop:'1px solid var(--gray-100)',
          }}>
            <Link
              href={url}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.45rem 0.5rem',
                borderRadius: '10px',
                background: '#F8FAFC',
                color: '#0F172A',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1.5px solid #E2E8F0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <span aria-hidden="true">🖨️</span>
              <span>{isEn ? 'Print / PDF' : 'Print / PDF'}</span>
            </Link>
            <Link
              href={`${url}/color`}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.45rem 0.5rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A00 100%)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(255, 107, 53, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <span aria-hidden="true">🎨</span>
              <span>{isEn ? 'Color Online' : 'Inkleuren'}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}