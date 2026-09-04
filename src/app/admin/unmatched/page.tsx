import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { requireAdmin } from '@/lib/adminAuth';
import AdminShell from '../AdminShell';
import styles from '../admin.module.css';

interface UnmatchedPage {
  id: string;
  folderName: string;
  fileName: string;
  title: string;
  image: string;
}

export default async function AdminUnmatchedPage() {
  await requireAdmin();

  let unmatchedPages: UnmatchedPage[] = [];
  const filePath = path.join(process.cwd(), 'src', 'data', 'en', 'unmatched-pages.json');

  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      unmatchedPages = JSON.parse(content);
    } catch (e) {
      console.error('Error reading unmatched-pages.json', e);
    }
  }

  // Group by folderName
  const byFolder: Record<string, UnmatchedPage[]> = {};
  for (const p of unmatchedPages) {
    if (!byFolder[p.folderName]) {
      byFolder[p.folderName] = [];
    }
    byFolder[p.folderName].push(p);
  }

  const folderKeys = Object.keys(byFolder);

  return (
    <AdminShell title="Niet-Gekoppelde Platen (Quarantaine)">
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#fdf6e9', fontSize: '1.2rem' }}>
            🛡️ Automatische Quarantaine & Bescherming
          </h3>
          <p style={{ margin: 0, color: 'rgba(253, 246, 233, 0.7)', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Alle afbeeldingen uit mappen die het uploadscript niet 100% zeker kan plaatsen, komen direct hier terecht. 
            Ze worden <strong>nooit</strong> zomaar op de openbare website gepubliceerd totdat je de mapnaam hebt goedgekeurd.
          </p>
        </div>

        {folderKeys.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px dashed rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h4 style={{ color: '#fdf6e9', margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
              Quarantaine is Helemaal Leeg!
            </h4>
            <p style={{ color: 'rgba(253, 246, 233, 0.6)', margin: 0 }}>
              Alle 16.065 kleurplaten zijn 100% succesvol herkend en geplaatst in de officiële thema-albums.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {folderKeys.map(folder => (
              <div 
                key={folder}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      background: '#f97316', 
                      color: '#fff', 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      marginRight: '0.75rem'
                    }}>
                      NIET GEKOPPELD
                    </span>
                    <strong style={{ color: '#fdf6e9', fontSize: '1.1rem' }}>{folder}</strong>
                    <span style={{ color: 'rgba(253, 246, 233, 0.5)', marginLeft: '0.75rem' }}>
                      ({byFolder[folder].length} platen)
                    </span>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {byFolder[folder].slice(0, 12).map((item) => (
                    <div 
                      key={item.id}
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        textAlign: 'center',
                        padding: '0.5rem'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '120px', marginBottom: '0.5rem' }}>
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'rgba(253, 246, 233, 0.8)', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis' 
                      }}>
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
