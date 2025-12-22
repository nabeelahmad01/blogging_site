import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightHub - Your Daily Source for Insightful Articles",
  description: "Discover insightful articles, tutorials, and tips on technology, lifestyle, business, and personal growth. Join our community of readers today!",
  keywords: "blog, articles, technology, lifestyle, tutorials, tips, personal growth",
  authors: [{ name: "InsightHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourblog.com",
    siteName: "InsightHub",
    title: "InsightHub - Your Daily Source for Insightful Articles",
    description: "Discover insightful articles, tutorials, and tips on technology, lifestyle, business, and personal growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "InsightHub - Your Daily Source for Insightful Articles",
    description: "Discover insightful articles, tutorials, and tips on technology, lifestyle, business, and personal growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

