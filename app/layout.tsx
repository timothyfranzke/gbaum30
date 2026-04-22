import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Union 30 — Gruenebaum Keeper Collective",
  description: "Goalkeeping is a craft. Andy Gruenebaum spent 19 years in the MLS perfecting it. Now he's teaching it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="og:title" content="Union 30" />
        <meta name="og:description" content="Union 30 Goalkeeper Union" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://gbaum30--gbaum30-41996.us-central1.hosted.app/" />
        <meta name="og:image" content="https://gbaum30--gbaum30-41996.us-central1.hosted.app/og_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Union 30" />
        <meta name="twitter:description" content="Union 30 Goalkeeper Union" />
        <meta name="twitter:image" content="https://gbaum30--gbaum30-41996.us-central1.hosted.app/og_logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
