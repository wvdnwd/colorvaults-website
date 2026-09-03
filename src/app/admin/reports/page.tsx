'use client';

import { useEffect, useState } from'react';
import AdminShell from'../AdminShell';
import styles from'../admin.module.css';

interface Report {
  id: string;
  imageUrl: string;
  category: string;
  reason: string;
  details: string;
  date: string;
  status:'open'|'done';
}

const REASON_LABELS: Record<string, string> = {
  quality:'Slechte kwaliteit',
  category:'Verkeerde categorie',
  wrong:'Verkeerde afbeelding',
  offensive:'Aanstootgevend',
  other:'Iets anders',
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then(r => r.json())
      .then(data => { setReports(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const dismiss = async (id: string) => {
    await fetch('/api/admin/reports', {
      method:'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id }),
    });
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const openCount = reports.filter(r => r.status ==='open').length;

  return (
    <AdminShell title="Reports"reportCount={openCount}>
      {loading ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⏳</div>
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✅</div>
          No reports. Everything looks clean!
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <div className={styles.tableTitle}>{openCount} Open Reports</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Reason</th>
                <th>Details</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/proxy-image?url=${encodeURIComponent(r.imageUrl)}`}
                      alt=""className={styles.thumb}
                    />
                  </td>
                  <td>{r.category}</td>
                  <td>
                    <span className={`${styles.badge} ${styles.badgeOpen}`}>
                      {REASON_LABELS[r.reason] || r.reason}
                    </span>
                  </td>
                  <td style={{ maxWidth: 220, wordBreak:'break-word'}}>
                    {r.details || <span style={{ opacity: 0.3 }}>—</span>}
                  </td>
                  <td style={{ whiteSpace:'nowrap'}}>
                    {new Date(r.date).toLocaleDateString('nl-NL')}
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        className={styles.btnDismiss}
                        onClick={() => dismiss(r.id)}
                      >
                        ✓ Dismiss
                      </button>
                      <a
                        href={r.imageUrl}
                        target="_blank"rel="noopener noreferrer"className={styles.btnDismiss}
                        style={{ textDecoration:'none', display:'inline-flex', alignItems:'center'}}
                      >
                        👁 View
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
