"use client";

import dynamic from "next/dynamic";
import "./page.css";

const CartBuilder = dynamic(() => import("../components/CartBuilder/CartBuilder"), { ssr: false });

export default function Home() {
  return (
    <div className="page">
      <h2>Cart Builder</h2>
      <CartBuilder />
    </div>
  );
}
