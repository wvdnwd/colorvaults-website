'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  reportCount?: number;
}

const NAV = [
  { href: '/admin/dashboard',      icon: '📊', label: 'Dashboard' },
  { href: '/admin/reviewer',       icon: '🔥', label: 'Tinder Keuring' },
  { href: '/admin/coloring-pages', icon: '🎨', label: 'Coloring Pages' },
  { href: '/admin/categories',     icon: '🗂️', label: 'Categories' },
  { href: '/admin/unmatched',      icon: '❓', label: 'Quarantaine' },
  { href: '/admin/reports',        icon: '🚩', label: 'Reports', badge: true },
  { href: '/admin/messages',       icon: '✉️',  label: 'Messages' },
];

export default function AdminShell({ children, title, reportCount = 0 }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className={styles.adminRoot}>
      {/* Mobile Backdrop Overlay */}
      {mobileNavOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarLogo}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>ColorVaults</h2>
            {mobileNavOpen && (
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(253, 246, 233, 0.6)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            )}
          </div>
          <span>Admin Panel</span>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {item.badge && reportCount > 0 && (
                <span className={styles.navBadge}>{reportCount}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <a
            href="https://colorvaults.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.liveSiteBtn}
            style={{ width: '100%', boxSizing: 'border-box', justifyContent: 'center', marginBottom: '0.6rem' }}
          >
            🌐 Live Website ↗
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              type="button"
              className={styles.mobileMenuBtn}
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <h1>{title}</h1>
              <span className={styles.topBarMeta}>
                {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://colorvaults.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveSiteBtn}
            >
              🌐 Open Website ↗
            </a>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
