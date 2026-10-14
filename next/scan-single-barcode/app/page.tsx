"use client";

import dynamic from "next/dynamic";
import "./page.css";

const SingleBarcode = dynamic(() => import("../components/SingleBarcode/SingleBarcode"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Scan a Single Barcode</h2>
      <SingleBarcode />
    </div>
  );
}
