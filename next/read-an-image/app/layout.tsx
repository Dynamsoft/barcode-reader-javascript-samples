import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read an Image - Next.js",
  description: "Dynamsoft Barcode Reader sample: Read an Image",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
