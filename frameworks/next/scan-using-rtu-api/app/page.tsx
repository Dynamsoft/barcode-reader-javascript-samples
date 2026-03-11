"use client";

import { useEffect, useRef } from "react";
import "./page.css";
import { BarcodeScanner, BarcodeScannerConfig, EnumScanMode } from "dynamsoft-barcode-reader-bundle";

export default function Home() {
  const barcodeScannerViewRef = useRef(null);

  useEffect(() => {
    // Configuration object for initializing the BarcodeScanner instance
    const config: BarcodeScannerConfig = {
      license: "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ==", // Replace with your Dynamsoft license key

      // Specify where to render the scanner UI
      // If container is not specified, the UI will take up the full screen
      container: barcodeScannerViewRef.current!,

      // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
      uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/ui/barcode-scanner.ui.xml",

      /*
        scanMode controls the scanning behavior:
         - SM_MULTI_UNIQUE: Continuously scans and collects each unique barcode.
         - SM_SINGLE: Stops scanning after the first barcode is detected.
      */
      scanMode: EnumScanMode.SM_MULTI_UNIQUE,

      // showUploadImageButton: true,
      // scannerViewConfig: {
      //   showFlashButton: true,
      //   cameraSwitchControl: "toggleFrontBack",
      // },

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory: "https://cdn.jsdelivr.net/npm/",
      },
      // The watermark can be removed via showPoweredByDynamsoft configuration option.
      // showPoweredByDynamsoft: false,
    }

    // Create an instance of the BarcodeScanner with the provided configuration
    const barcodeScanner = new BarcodeScanner(config);

    (async () => {
      // Launch the scanner; once a barcode is detected, display its text in an alert
      let result = await barcodeScanner.launch();
      if (result.barcodeResults.length) {
        alert(result.barcodeResults[0].text);
      }
    })();

    return () => {
      // Dispose of the barcode scanner when the component unmounts
      barcodeScanner?.dispose();
    };
  }, []);

  return (
    <>
      <h1 style={{ margin: "20px 0", textAlign: "center" }}>Barcode Scanner for Next.js</h1>
      <div ref={barcodeScannerViewRef} style={{ width: '100%', height: '80vh' }}>
      </div>
    </>
  );
}
