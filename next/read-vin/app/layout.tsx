import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read VIN - Next.js",
  description: "Dynamsoft Barcode Reader sample: Read VIN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
