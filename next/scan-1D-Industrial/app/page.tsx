"use client";

import dynamic from "next/dynamic";
import "./page.css";

const BarcodeScanner = dynamic(() => import("../components/BarcodeScanner/BarcodeScanner"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Scan 1D Industrial Barcodes</h2>
      <BarcodeScanner />
    </div>
  );
}
