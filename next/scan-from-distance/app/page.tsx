"use client";

import dynamic from "next/dynamic";
import "./page.css";

const BarcodeScanner = dynamic(() => import("../components/BarcodeScanner/BarcodeScanner"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Scan from Distance</h2>
      <BarcodeScanner />
    </div>
  );
}
