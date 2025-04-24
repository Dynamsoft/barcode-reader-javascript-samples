import { useEffect } from "react";
import reactLogo from "./assets/logo.svg";
import { BarcodeScanner } from "@dynamsoft/dynamsoft-barcode-reader-bundle";
import "./App.css";

function App() {
  useEffect(() => {
    // Configuration object for initializing the BarcodeScanner instance
    const config = {
      license: "YOUR-LICENSE-KEY", // Replace with your Dynamsoft license key
      container: ".barcode-scanner-view", // Specify where to render the scanner UI

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory:
          "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },

      // Configuration for the scanner UI
      scannerViewConfig: {
        // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
        cameraEnhancerUIPath:
          "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
    };

    // Create an instance of the BarcodeScanner with the provided configuration
    const barcodeScanner = new BarcodeScanner(config);

    // Launch the scanner; once a barcode is detected, display its text in an alert
    barcodeScanner.launch().then((result) => {
      alert(result.barcodeResults[0].text);
    });
  });
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
      <div className="barcode-scanner-view "></div>
    </div>
  );
}

export default App;
