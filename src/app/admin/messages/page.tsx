'use client';

import { useState, useEffect } from 'react';
import AdminShell from '../AdminShell';
import styles from '../admin.module.css';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      if (res.ok) {
        setMessages(prev =>
          prev.map(m => (m.id === id ? { ...m, read: !currentRead } : m))
        );
      }
    } catch {
      // silent
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Weet je zeker dat je dit bericht wilt verwijderen?')) return;
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      }
    } catch {
      // silent
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read') return m.read;
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <AdminShell title="Klantberichten">
      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setFilter('all')}
          style={{
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid rgba(253, 246, 233, 0.2)',
            background: filter === 'all' ? '#FF6B4A' : 'rgba(253, 246, 233, 0.05)',
            color: '#FDF6E9',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Alle Berichten ({messages.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          style={{
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid rgba(253, 246, 233, 0.2)',
            background: filter === 'unread' ? '#FF6B4A' : 'rgba(253, 246, 233, 0.05)',
            color: '#FDF6E9',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Ongelezen ({unreadCount})
        </button>
        <button
          type="button"
          onClick={() => setFilter('read')}
          style={{
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid rgba(253, 246, 233, 0.2)',
            background: filter === 'read' ? '#FF6B4A' : 'rgba(253, 246, 233, 0.05)',
            color: '#FDF6E9',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Afgehandeld ({messages.length - unreadCount})
        </button>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⏳</div>
          <p>Berichten laden...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✉️</div>
          <p style={{ marginBottom: '0.5rem' }}>Geen berichten gevonden.</p>
          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            Zodra bezoekers het contactformulier invullen, verschijnen hun berichten direct hier.
          </p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <div className={styles.tableTitle}>{filteredMessages.length} Berichten</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Naam</th>
                <th>E-mail</th>
                <th>Onderwerp</th>
                <th>Bericht</th>
                <th>Datum</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map(m => (
                <tr key={m.id} style={m.read ? { opacity: 0.75 } : undefined}>
                  <td style={{ fontWeight: 600, color: '#FDF6E9', whiteSpace: 'nowrap' }}>
                    {!m.read && (
                      <span
                        className={`${styles.badge} ${styles.badgeNew}`}
                        style={{ marginRight: 6, background: '#10B981', color: '#FFF' }}
                      >
                        Nieuw
                      </span>
                    )}
                    {m.name}
                  </td>
                  <td>
                    <a href={`mailto:${m.email}`} style={{ color: '#FF6B4A', textDecoration: 'none' }}>
                      {m.email}
                    </a>
                  </td>
                  <td style={{ fontWeight: 600 }}>{m.subject}</td>
                  <td style={{ maxWidth: 320, wordBreak: 'break-word', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {m.message}
                  </td>
                  <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', opacity: 0.7 }}>
                    {new Date(m.date).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <a
                        href={`mailto:${m.email}?subject=Re: ColorVaults — ${encodeURIComponent(m.subject)}`}
                        style={{
                          background: 'rgba(255, 107, 74, 0.2)',
                          color: '#FF6B4A',
                          border: '1px solid rgba(255, 107, 74, 0.4)',
                          borderRadius: '6px',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ✉️ Beantwoorden
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleRead(m.id, m.read)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#FDF6E9',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '6px',
                          padding: '0.35rem 0.55rem',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {m.read ? '↩ Ongelezen' : '✓ Gelezen'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMessage(m.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          color: '#F87171',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '6px',
                          padding: '0.35rem 0.55rem',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                        }}
                        title="Verwijderen"
                      >
                        🗑️
                      </button>
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
