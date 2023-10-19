import "./HelloWorld.css";
import reactLogo from "../../logo.svg";
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import React, { useState, useEffect } from "react";
import VideoDecode from "../VideoDecode/VideoDecode";
import ImgDecode from "../ImgDecode/ImgDecode";

function HelloWorld() {
  let [bShowScanner, setBShowScanner] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await BarcodeReader.loadWasm();
      } catch (ex: any) {
        if (ex.message.indexOf("network connection error")) {
          let customMsg =
            "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
          console.log(customMsg);
          alert(customMsg);
        }
        throw ex;
      }
    })();
  }, []);

  return (
    <div className="helloWorld">
      <h1>
        Hello World for React
        <img src={reactLogo} className="App-logo" alt="logo" />
      </h1>
      <div>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: bShowScanner ? "rgb(255,174,55)" : "white",
          }}
          onClick={() => {
            setBShowScanner(true);
          }}
        >
          Video Decode
        </button>
        <button
          style={{
            backgroundColor: bShowScanner ? "white" : "rgb(255,174,55)",
          }}
          onClick={() => {
            setBShowScanner(false);
          }}
        >
          Image Decode
        </button>
      </div>
      <div className="container">
        {bShowScanner ? <VideoDecode></VideoDecode> : <ImgDecode></ImgDecode>}
      </div>
    </div>
  );
}

export default HelloWorld;
