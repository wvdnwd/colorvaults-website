import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={plusJakarta.className}>
        <ThemeProvider>
          <div className="layout-container">
            <Navbar lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
            <CookieBanner lang={lang} />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
