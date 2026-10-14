import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read a Driver's License - Next.js",
  description: "Dynamsoft Barcode Reader sample: Read a Driver's License",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
