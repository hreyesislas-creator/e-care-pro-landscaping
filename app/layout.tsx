import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, site } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1b5e20",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "E-Care Pro Landscaping | Landscaping Contractor in Bay Point, CA",
    template: "%s | E-Care Pro Landscaping",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "landscaping Bay Point CA",
    "landscaping contractor Bay Point",
    "landscaper near me",
    "paver installation Bay Point",
    "fence contractor Bay Point",
    "irrigation installation Bay Point",
    "tree services Bay Point",
    "landscaping Contra Costa County",
    "landscaping Pittsburg CA",
    "landscaping Antioch CA",
    "landscaping Concord CA",
    "yard cleanup East Bay",
  ],
  alternates: {
    canonical: "/",
  },
  category: "Landscaping Contractor",
  formatDetection: { telephone: true, address: false, email: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title: "E-Care Pro Landscaping | Premium Landscaping in Contra Costa County",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Care Pro Landscaping | Premium Landscaping in Contra Costa County",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <StickyMobileCTA />
        {/* Spacer so sticky mobile bar never covers footer content */}
        <div className="h-16 md:hidden" aria-hidden="true" />
      </body>
    </html>
  );
}
