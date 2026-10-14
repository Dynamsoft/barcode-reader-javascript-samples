import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan 1D Retail Barcodes - Next.js",
  description: "Dynamsoft Barcode Reader sample: Scan 1D Retail Barcodes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
