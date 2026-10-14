import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grid Barcode Reading - Next.js",
  description: "Dynamsoft Barcode Reader sample: Grid Barcode Reading",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
