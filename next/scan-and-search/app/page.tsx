"use client";

import dynamic from "next/dynamic";
import "./page.css";

const ScanSearch = dynamic(() => import("../components/ScanSearch/ScanSearch"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Scan and Search</h2>
      <ScanSearch />
    </div>
  );
}
