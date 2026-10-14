"use client";

import dynamic from "next/dynamic";
import "./page.css";

const ParseScanner = dynamic(() => import("../components/ParseScanner/ParseScanner"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Read a Driver's License</h2>
      <ParseScanner />
    </div>
  );
}
