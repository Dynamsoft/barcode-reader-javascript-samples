import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Batch Inventory - Next.js",
  description: "Dynamsoft Barcode Reader sample: Batch Inventory",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
