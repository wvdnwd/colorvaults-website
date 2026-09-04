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
  title: {
    template:"%s | ColorVaults",
    default:"ColorVaults | Free Premium Coloring Pages",
  },
  description:"Download thousands of high-quality free printable coloring pages for kids, toddlers, teens and adults. 100% free, no account required.",
  verification: {
    google:"r57LIyNltfhaHeN4Lean5iNHEkbWBJbD-z-s6uF9t0s",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${fredoka.variable} ${nunito.variable}`} data-theme="dark">
      <head>
        <meta name="viewport"content="width=device-width, initial-scale=1.0, maximum-scale=5.0"/>
        <meta name="google-adsense-account"content="ca-pub-1184801748776428"/>
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1184801748776428"crossOrigin="anonymous"strategy="afterInteractive"/>
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"/>
            <Script id="google-analytics"strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config','${gaId}');`}
            </Script>
          </>
        )}

        <a href="#main-content"className="skip-link">
          {lang ==='en'?'Skip to main content':'Naar hoofdinhoud springen'}
        </a>
        <script
          type="application/ld+json"dangerouslySetInnerHTML={{ __html: safeJsonLd({"@context":"https://schema.org","@graph": [
              {"@type":"WebSite","@id":"https://colorvaults.com/#website","url":"https://colorvaults.com","name":"ColorVaults","description":"Free premium printable coloring pages for all ages","inLanguage": ["en","nl"],"potentialAction": [{"@type":"SearchAction","target": {"@type":"EntryPoint","urlTemplate":`https://colorvaults.com/${lang}/search?q={search_term_string}`},"query-input":"required name=search_term_string"}]
              },
              {"@type":"Organization","@id":"https://colorvaults.com/#organization","name":"ColorVaults","url":"https://colorvaults.com","logo": {"@type":"ImageObject","url":"https://colorvaults.com/images/banner.jpg","width": 1200,"height": 630
                }
              }
            ]
          }) }}
        />
        <ThemeProvider>
          <FavoritesProvider>
            <ColoringBookProvider>
              <div className="layout-container">
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
      </body>
    </html>
  );
}
