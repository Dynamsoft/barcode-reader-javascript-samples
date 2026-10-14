"use client";

import dynamic from "next/dynamic";
import "./page.css";

const GS1Scanner = dynamic(() => import("../components/GS1Scanner/GS1Scanner"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Read and Parse GS1-AI</h2>
      <GS1Scanner />
    </div>
  );
}
