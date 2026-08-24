import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { safeJsonLd } from "@/lib/api";

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});
const outfit = Outfit({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://colorvaults.com"),
  title: {
    template: "%s | ColorVaults",
    default: "ColorVaults | Free Premium Coloring Pages",
  },
  description: "Download thousands of high-quality free printable coloring pages for kids, toddlers, teens and adults. 100% free, no account required.",
  openGraph: {
    siteName: "ColorVaults",
    type: "website",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "ColorVaults — Free Premium Coloring Pages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/banner.jpg"],
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "nl" }];
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
    <html lang={lang} className={`${plusJakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          {lang === 'en' ? 'Skip to main content' : 'Naar hoofdinhoud springen'}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://colorvaults.com/#website",
                "url": "https://colorvaults.com",
                "name": "ColorVaults",
                "description": "Free premium printable coloring pages for all ages",
                "inLanguage": ["en", "nl"],
                "potentialAction": [{
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `https://colorvaults.com/${lang}/search?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }]
              },
              {
                "@type": "Organization",
                "@id": "https://colorvaults.com/#organization",
                "name": "ColorVaults",
                "url": "https://colorvaults.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://colorvaults.com/images/banner.jpg",
                  "width": 1200,
                  "height": 630
                }
              }
            ]
          }) }}
        />
        <ThemeProvider>
          <FavoritesProvider>
            <div className="layout-container">
              <Navbar lang={lang} />
              <main id="main-content">{children}</main>
              <Footer lang={lang} />
              <CookieBanner lang={lang} />
              <BackToTop />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
