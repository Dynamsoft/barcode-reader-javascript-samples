"use client";

import dynamic from "next/dynamic";
import "./page.css";

const ParseScanner = dynamic(() => import("../components/ParseScanner/ParseScanner"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Read VIN</h2>
      <ParseScanner />
    </div>
  );
}
