import { requireAdmin } from '@/lib/adminAuth';
import AdminShell from '../AdminShell';
import styles from '../admin.module.css';
import fs from 'fs';
import path from 'path';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

function getMessages(): Message[] {
  const file = path.join(process.cwd(), 'src', 'data', 'messages.json');
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

export default async function MessagesPage() {
  await requireAdmin();
  const messages = getMessages();

  return (
    <AdminShell title="Messages">
      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✉️</div>
          <p style={{ marginBottom: '0.5rem' }}>No messages yet.</p>
          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            When visitors submit the contact form on your website, messages will appear here.
          </p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <div className={styles.tableTitle}>{messages.length} Customer Messages</div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 600, color: '#FDF6E9', whiteSpace: 'nowrap' }}>
                    {m.read ? null : <span className={`${styles.badge} ${styles.badgeNew}`} style={{ marginRight: 6 }}>New</span>}
                    {m.name}
                  </td>
                  <td>{m.email}</td>
                  <td>{m.subject}</td>
                  <td style={{ maxWidth: 280, wordBreak: 'break-word' }}>{m.message}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {new Date(m.date).toLocaleDateString('nl-NL')}
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <a
                        href={`mailto:${m.email}?subject=Re: ColorVaults — ${encodeURIComponent(m.subject)}`}
                        className={styles.btnDismiss}
                        style={{ textDecoration: 'none' }}
                      >
                        ✉️ Reply
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
