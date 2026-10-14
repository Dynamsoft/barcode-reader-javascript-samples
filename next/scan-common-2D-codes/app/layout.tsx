import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan Common 2D Codes - Next.js",
  description: "Dynamsoft Barcode Reader sample: Scan Common 2D Codes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
