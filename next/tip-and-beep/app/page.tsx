"use client";

import dynamic from "next/dynamic";
import "./page.css";

const TipBeep = dynamic(() => import("../components/TipBeep/TipBeep"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Tip Message &amp; Beep</h2>
      <TipBeep />
    </div>
  );
}
