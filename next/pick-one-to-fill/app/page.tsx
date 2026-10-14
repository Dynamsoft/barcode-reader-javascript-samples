"use client";

import dynamic from "next/dynamic";
import "./page.css";

const PickFill = dynamic(() => import("../components/PickFill/PickFill"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Pick One to Fill</h2>
      <PickFill />
    </div>
  );
}
