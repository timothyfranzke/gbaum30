import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Union 30",
  description: "Union 30 Goalkeeper Union",
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
        <meta name="og:url" content="https://union30.com" />
        <meta name="og:image" content="https://union30.com/og_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Union 30" />
        <meta name="twitter:description" content="Union 30 Goalkeeper Union" />
        <meta name="twitter:image" content="https://union30.com/og_logo.png" />
        
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Style+Script&display=swap" rel="stylesheet" />
        <script src="http://cdn.popcornjs.org/code/dist/popcorn.min.js"></script>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
