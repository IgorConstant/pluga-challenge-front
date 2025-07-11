import type { Metadata } from "next";
import { RecentAppsProvider } from "../contexts/AppsRecentes";
import "./globals.css";


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
        <body className="antialiased">
        <RecentAppsProvider>
          {children}
        </RecentAppsProvider>
      </body>
    </html>
  );
}
