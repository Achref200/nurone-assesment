import type { Metadata, Viewport } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content";
import { Cursor } from "@/components/motion/cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Preloader } from "@/components/motion/preloader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI-Augmented Operating Team`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI development",
    "product engineering",
    "fractional CTO",
    "MVP rebuild",
    "growth infrastructure",
    "agentic operations",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#050711",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable}`}
    >
      <body className="grain min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
