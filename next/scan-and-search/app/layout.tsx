import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan and Search - Next.js",
  description: "Dynamsoft Barcode Reader sample: Scan and Search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
