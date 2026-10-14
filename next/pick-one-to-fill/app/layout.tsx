import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pick One to Fill - Next.js",
  description: "Dynamsoft Barcode Reader sample: Pick One to Fill",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
