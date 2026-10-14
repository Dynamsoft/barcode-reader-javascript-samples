import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tip Message & Beep - Next.js",
  description: "Dynamsoft Barcode Reader sample: Tip Message & Beep",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
