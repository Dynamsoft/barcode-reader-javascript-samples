import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan DataMatrix Code - Next.js",
  description: "Dynamsoft Barcode Reader sample: Scan DataMatrix Code",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
