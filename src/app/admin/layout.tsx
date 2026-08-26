export const metadata = {
  title: 'Admin — ColorVaults',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // No sidebar on the login page itself — the individual pages handle it
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#071417' }}>
        {children}
      </body>
    </html>
  );
}
