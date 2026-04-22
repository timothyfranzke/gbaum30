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
  title: "Union 30 — Complete Goalkeeper Development",
  description: "Goalkeeping is a craft. Andy Gruenebaum spent 19 years in the MLS perfecting it. Now he's teaching it.",
  openGraph: {
    title: "Union 30 — Complete Goalkeeper Development",
    description: "Built on community. Sharpened by competition. Grown through reps, mistakes, and shared passion.",
    type: "website",
    siteName: "Union 30",
  },
  twitter: {
    card: "summary_large_image",
    title: "Union 30 — Complete Goalkeeper Development",
    description: "Built on community. Sharpened by competition. Grown through reps, mistakes, and shared passion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
