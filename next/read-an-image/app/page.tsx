"use client";

import dynamic from "next/dynamic";
import "./page.css";

const ImageCapture = dynamic(() => import("../components/ImageCapture/ImageCapture"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Read an Image</h2>
      <p style={{ margin: "10px 0", color: "#666" }}>Select an image file containing barcodes to decode.</p>
      <ImageCapture />
    </div>
  );
}
