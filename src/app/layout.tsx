import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} - Portfolio`,
    template: `%s - ${site.shortName}`,
  },
  description: site.headline,
  keywords: [
    "Applied AI Engineer",
    "Agentic Systems",
    "RAG",
    "LLM Orchestration",
    "FastAPI",
    "LangGraph",
    "Nithisha Venkatesh",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.shortName} - Portfolio`,
    description: site.headline,
    siteName: `${site.shortName} - Portfolio`,
    images: [{ url: "/og.png", width: 652, height: 522, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} - Portfolio`,
    description: site.headline,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
