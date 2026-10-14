import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan a Single Barcode - Next.js",
  description: "Dynamsoft Barcode Reader sample: Scan a Single Barcode",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
