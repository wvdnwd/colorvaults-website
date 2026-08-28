'use client';

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
  { href: '/admin/coloring-pages', icon: '🎨', label: 'Coloring Pages' },
  { href: '/admin/reports',        icon: '🚩', label: 'Reports',    badge: true },
  { href: '/admin/messages',       icon: '✉️',  label: 'Messages' },
  { href: '/admin/categories',     icon: '🗂️', label: 'Categories' },
];

export default function AdminShell({ children, title, reportCount = 0 }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className={styles.adminRoot}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <h2>🎨 ColorVaults</h2>
          <span>Admin Panel</span>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
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
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.topBar}>
          <h1>{title}</h1>
          <span className={styles.topBarMeta}>
            {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
