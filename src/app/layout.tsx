import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RecentAppsProvider } from "../contexts/AppsRecentes";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Pluga Challenge Frontend",
  description: "A frontend application for the Pluga Challenge",
};

// Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="https://assets.pluga.co/site/images/favicons/favicon-32x32.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RecentAppsProvider>
          {children}
        </RecentAppsProvider>
      </body>
    </html>
  );
}
