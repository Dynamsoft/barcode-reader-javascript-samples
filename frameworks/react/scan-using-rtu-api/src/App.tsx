import { useEffect, useRef  } from 'react';
import { BarcodeScanner, type BarcodeScannerConfig } from "dynamsoft-barcode-reader-bundle";


function App() {
  const barcodeScannerViewRef = useRef(null);
  const hasRun = useRef(false); // walkaround react strict mode
  
  useEffect(() => { 
    if(hasRun.current){ return; } // walkaround react strict mode

    // Configuration object for initializing the BarcodeScanner instance
    const config: BarcodeScannerConfig = {
      license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key

      // Specify where to render the scanner UI
      // If container is not specified, the UI will take up the full screen
      container: barcodeScannerViewRef.current!, 

      // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
      uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.2000/dist/ui/barcode-scanner.ui.xml",

      // showUploadImageButton: true,
      // scannerViewConfig: {
      //   showFlashButton: true,
      //   cameraSwitchControl: "toggleFrontBack",
      // },

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory: "https://cdn.jsdelivr.net/npm/",
      },
    }

    // Create an instance of the BarcodeScanner with the provided configuration
    const barcodeScanner = new BarcodeScanner(config);

    (async ()=>{
      // Launch the scanner; once a barcode is detected, display its text in an alert
      let result = await barcodeScanner.launch();
      if (result.barcodeResults.length) {
        alert(result.barcodeResults[0].text);
      }
    })();

    hasRun.current = true;

    //// We have bug in react strict mode.
    //// It will be fixed in next version.
    // return ()=>{
    //   // Dispose of the barcode scanner when the component unmounts
    //   barcodeScanner?.dispose();
    // };
  }, []);

  return (
    <>
      <h1>Barcode Scanner for React</h1>
      <div ref={barcodeScannerViewRef} style={{ width: '100%', height: '80vh' }}>
      </div>
    </>
  )
}

export default App
