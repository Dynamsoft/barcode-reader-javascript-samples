"use client";

import dynamic from "next/dynamic";
import "./page.css";

const BatchInventory = dynamic(() => import("../components/BatchInventory/BatchInventory"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Batch Inventory</h2>
      <BatchInventory />
    </div>
  );
}
