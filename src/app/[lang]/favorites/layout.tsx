import type { Metadata } from 'next';
import { VALID_LOCALES } from '@/lib/site';

export async function generateStaticParams() {
  return VALID_LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  return {
    title: isEn ? 'My Favorite Coloring Pages | ColorVaults' : 'Mijn Favoriete Kleurplaten | ColorVaults',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
