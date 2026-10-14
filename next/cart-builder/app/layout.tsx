import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cart Builder - Next.js",
  description: "Dynamsoft Barcode Reader sample: Cart Builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
