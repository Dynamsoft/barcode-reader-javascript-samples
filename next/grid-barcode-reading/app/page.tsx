"use client";

import dynamic from "next/dynamic";
import "./page.css";

const GridReader = dynamic(() => import("../components/GridReader/GridReader"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Grid Barcode Reading</h2>
      <p style={{ margin: "10px 0", color: "#666" }}>Select an image containing a grid of barcodes.</p>
      <GridReader />
    </div>
  );
}
