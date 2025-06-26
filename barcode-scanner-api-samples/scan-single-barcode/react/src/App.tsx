import { useEffect, useRef } from "react";
import reactLogo from "./assets/logo.svg";
import { BarcodeScanner } from "dynamsoft-barcode-reader-bundle";
import "./App.css";

function App() {
  const scannerViewRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if(!hasRun.current) {
      // Configuration object for initializing the BarcodeScanner instance
      const config = {
        license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key
        container: scannerViewRef.current!, // Specify where to render the scanner UI
  
        // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
        uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.3000/dist/",
  
        // Specify custom paths for the engine resources
        engineResourcePaths: {
          rootDirectory: "https://cdn.jsdelivr.net/npm/",
        },
      }
      
      // Create an instance of the BarcodeScanner with the provided configuration
      const barcodeScanner = new BarcodeScanner(config);
  
      // Launch the scanner; once a barcode is detected, display its text in an alert
      barcodeScanner.launch().then((result) => {
        if (result.barcodeResults.length) {
          alert(result.barcodeResults[0].text);
        }
      });
      hasRun.current = true;
    }
  }, []);
  return (
    <div className="barcode-scanner-hello-world-page">
      <div className="barcode-scanner-title">
        <h2 className="barcode-scanner-title-text">Hello World for React</h2>
        <img
          className="barcode-scanner-title-logo"
          src={reactLogo}
          alt="logo"
        ></img>
      </div>
      {/* This div will host the barcode scanner's camera view */}
      <div className="barcode-scanner-view" ref={scannerViewRef}></div>
    </div>
  );
}

export default App;
