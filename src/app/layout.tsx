import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Providers from "@/components/site/Providers";
import WhatsAppButton from "@/components/site/WhatsAppButton";
import JsonLd from "@/components/site/JsonLd";
import { themeScript } from "@/components/site/ThemeToggle";
import { installCaptureScript } from "@/components/pwa/install";
import ServiceWorker from "@/components/pwa/ServiceWorker";
import { InstallBanner, InstallDialog } from "@/components/pwa/InstallUI";
import LeadPopup from "@/components/leads/LeadPopup";
import QuestionToasts from "@/components/leads/QuestionToasts";
import { SITE_URL, site } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", weight: ["600", "700", "800"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Buy, Sell & Lease IPv4 Addresses | All Tech Cloud Services",
    template: "%s | All Tech Cloud Services",
  },
  description: site.description,
  applicationName: site.name,
  appleWebApp: { capable: true, title: "All Tech", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "64x64" }, { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  keywords: [
    "IPv4 broker",
    "buy IPv4 addresses",
    "sell IPv4 addresses",
    "lease IPv4 addresses",
    "IPv4 transfer",
    "IPv4 address blocks",
    "IP address broker",
    "ARIN transfer",
    "RIPE IPv4 transfer",
    "APNIC IPv4 broker",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Buy, Sell & Lease IPv4 Addresses | All Tech Cloud Services",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy, Sell & Lease IPv4 Addresses | All Tech Cloud Services",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050a16" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: installCaptureScript }} />
        <JsonLd data={[organizationLd, websiteLd]} />
      </head>
      <body className="min-h-dvh antialiased">
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
          <QuestionToasts />
          <LeadPopup />
          <InstallBanner />
          <InstallDialog />
          <ServiceWorker />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
