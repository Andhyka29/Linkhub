import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Hub - Bookmark Manager",
  description: "Save, organize, and open URLs easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background">
        {children}
      </body>
    </html>
  );
}