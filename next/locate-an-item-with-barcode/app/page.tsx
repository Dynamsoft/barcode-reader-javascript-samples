"use client";

import dynamic from "next/dynamic";
import "./page.css";

const LocateItem = dynamic(() => import("../components/LocateItem/LocateItem"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Locate an Item with Barcode</h2>
      <LocateItem />
    </div>
  );
}
