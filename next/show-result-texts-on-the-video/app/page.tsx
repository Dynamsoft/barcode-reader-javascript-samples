"use client";

import dynamic from "next/dynamic";
import "./page.css";

const VideoOverlay = dynamic(() => import("../components/VideoOverlay/VideoOverlay"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Show Result Texts on Video</h2>
      <VideoOverlay />
    </div>
  );
}
