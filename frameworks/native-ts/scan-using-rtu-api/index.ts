import { BarcodeScanner, BarcodeScannerConfig, EnumScanMode } from "dynamsoft-barcode-reader-bundle";

// Configuration object for initializing the BarcodeScanner instance
const config: BarcodeScannerConfig = {
  license: "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ==", // Replace with your Dynamsoft license key

  // Specify where to render the scanner UI
  // If container is not specified, the UI will take up the full screen
  container: document.querySelector(".barcode-scanner-view") as HTMLElement, // Specify where to render the scanner UI

  // // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
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
};

// Create a new instance of the Dynamsoft Barcode Scanner
const barcodeScanner = new BarcodeScanner(config);

(async () => {
  // Launch the scanner; once a barcode is detected, display its text in an alert
  let result = await barcodeScanner.launch();
  if (result.barcodeResults.length) {
    alert(result.barcodeResults[0].text);
  }
})();
