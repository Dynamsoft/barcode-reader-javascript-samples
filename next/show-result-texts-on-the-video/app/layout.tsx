import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Show Result Texts on Video - Next.js",
  description: "Dynamsoft Barcode Reader sample: Show Result Texts on Video",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
