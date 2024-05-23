"use client";

import { useState } from 'react';
import "./page.css";
import VideoCapture from '@/component/VideoCapture';
import ImageCapture from '@/component/ImageCapture';

export default function Home() {
  const [mode, setMode] = useState("video");
  return (
    <div className='App'>
      <div className='title'>
        <h2 className='title-text'>Hello World for React</h2>
      </div>
      <div className='top-btns'>
        <button onClick={()=>{setMode("video")}} style={{backgroundColor: mode === "video" ? "rgb(255, 174, 55)" : "#fff"}}>Video Capture</button>
        <button onClick={()=>{setMode("image")}} style={{backgroundColor: mode === "image" ? "rgb(255, 174, 55)" : "#fff"}}>Image Capture</button>
      </div>
      { mode === "video" ? <VideoCapture /> : <ImageCapture /> }
    </div>
  );
}
