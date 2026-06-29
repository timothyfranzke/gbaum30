import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConsentProvider } from "./lib/consent";
import ConsentBanner from "./components/ConsentBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// Self-hosted from app/fonts so there is no build-time fetch from Google.
const bebasNeue = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <ConsentProvider>
          {children}
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
