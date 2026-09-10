import type { Metadata, Viewport } from"next";
import { Fredoka, Nunito } from"next/font/google";
import Script from"next/script";
import"../globals.css";
import Navbar from"@/components/Navbar";
import Footer from"@/components/Footer";
import CookieBanner from"@/components/CookieBanner";
import BackToTop from"@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ColoringBookProvider } from "@/context/ColoringBookContext";
import { safeJsonLd } from "@/lib/api";
import PageTransition from "@/components/PageTransition";
import StickyBottomAd from "@/components/StickyBottomAd";
import GoogleTranslator from "@/components/GoogleTranslator";
import HolidayDecorationOverlay from "@/components/HolidayDecorationOverlay";

export const viewport: Viewport = {
  width:"device-width",
  initialScale: 1,
  maximumScale: 5,
};

const fredoka = Fredoka({ 
  subsets: ['latin'], 
  weight: ['300','400','500','600','700'],
  variable:'--font-display',
  display:'swap',
});
const nunito = Nunito({ 
  subsets: ['latin'], 
  weight: ['400','500','600','700','800','900'],
  variable:'--font-body',
  display:'swap',
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.colorvaults.com"),
  // Routes supply complete titles, often including the brand already.
  title: "ColorVaults | Free Premium Coloring Pages",
  description:"Download free printable coloring pages for kids, toddlers, teens and adults. No account required.",
  verification: {
    google:"r57LIyNltfhaHeN4Lean5iNHEkbWBJbD-z-s6uF9t0s",
    other: {
      "p:domain_verify": "314125f62194f4aab9b5275a55bc34a2",
    },
  },
  openGraph: {
    siteName: "ColorVaults",
    type: "website",
    images: [
      {
        url: "https://www.colorvaults.com/images/og-share.jpg",
        secureUrl: "https://www.colorvaults.com/images/og-share.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "ColorVaults — Free Premium Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.colorvaults.com/images/og-share.jpg"],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "nl" }, { lang: "de" }, { lang: "fr" }];
}

function getSkipLinkText(lang: string): string {
  switch (lang) {
    case 'nl':
      return 'Naar hoofdinhoud springen';
    case 'de':
      return 'Zum Hauptinhalt springen';
    case 'fr':
      return 'Aller au contenu principal';
    case 'en':
    default:
      return 'Skip to main content';
  }
}

import { isValidLocale } from "@/lib/site";
import { notFound } from "next/navigation";

import { ConsentProvider } from "@/components/ConsentProvider";
import JsonLd from "@/components/JsonLd";
import { buildWebsiteAndOrgSchema } from "@/lib/structuredData";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }
  return (
    <html lang={lang} className={`${fredoka.variable} ${nunito.variable}`} data-theme="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1184801748776428" />
        <meta name="p:domain_verify" content="314125f62194f4aab9b5275a55bc34a2" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {getSkipLinkText(lang)}
        </a>
        <JsonLd data={buildWebsiteAndOrgSchema(lang)} />
        <ConsentProvider gaId={gaId}>
          <ThemeProvider>
            <FavoritesProvider>
              <ColoringBookProvider>
                <div className="layout-container">
                  <HolidayDecorationOverlay lang={lang} />
                  <Navbar lang={lang} />
                  <main id="main-content"><PageTransition>{children}</PageTransition></main>
                  <Footer lang={lang} />
                  <CookieBanner lang={lang} />
                  <BackToTop />
                  <GoogleTranslator />
                  <StickyBottomAd isEn={lang !== 'nl'} />
                </div>
              </ColoringBookProvider>
            </FavoritesProvider>
          </ThemeProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
