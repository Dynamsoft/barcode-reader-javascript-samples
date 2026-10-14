import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read and Parse GS1-AI - Next.js",
  description: "Dynamsoft Barcode Reader sample: Read and Parse GS1-AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
