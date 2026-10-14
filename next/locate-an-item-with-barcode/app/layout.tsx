import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Locate an Item with Barcode - Next.js",
  description: "Dynamsoft Barcode Reader sample: Locate an Item with Barcode",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
