import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEEPSIGHT — DeepBook V3 Terminal",
  description: "Professional trading terminal for Sui DeepBook V3",
};

// Inline script that runs synchronously before any paint.
// Reads localStorage and sets data-theme on <html> so the correct
// CSS variables are active before React hydrates — no white flash.
const FOUC_GUARD = `(function(){try{var t=localStorage.getItem('deepsight-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOUC_GUARD }} />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
