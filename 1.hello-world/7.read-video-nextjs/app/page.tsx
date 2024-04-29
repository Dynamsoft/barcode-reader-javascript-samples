"use client";

import styles from "./page.module.css";
import VideoDecode from '@/component/VideoDecode';
import ImgDecode from '@/component/ImgDecode';
import { useState } from 'react'


export default function Home() {
  const [bShowScanner, setBShowScanner] = useState(true);
  const [bShowImgDecode, setBShowImgDecode] = useState(false);

  return (<div className={styles.helloWorld}>
      <h1 className={styles.header}>Hello World for Next.js</h1>
      <div>
        <button className={styles.button} style={{ marginRight: '10px', backgroundColor: bShowScanner ? 'rgb(255,174,55)' : 'white' }}
          onClick={()=>{
            setBShowScanner(true);
            setBShowImgDecode(false);
          }}
        >Video Decode</button>
        <button className={styles.button} style={{ backgroundColor: bShowImgDecode ? 'rgb(255,174,55)' : 'white' }}
        onClick={()=>{
          setBShowScanner(false);
          setBShowImgDecode(true);
        }}
        >Image Decode</button>
      </div>
      <div className={styles.container}>
        {bShowScanner && <VideoDecode></VideoDecode>}
        {bShowImgDecode && <ImgDecode></ImgDecode>}
      </div>
    </div>
  );
}
