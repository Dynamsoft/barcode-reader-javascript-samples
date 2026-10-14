import React, { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "./VideoCapture.css";
import "../../dynamsoft.config"; // import side effects (license, engineResourcePath) within a component is beneficial for lazy loading.

function VideoCapture() {
  const [resultText, setResultText] = useState("");
  const cameraViewContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    let pInit = (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();

        // Hide the "Powered by Message" overlay on the scanner view
        // cameraView.setPowerByMessageVisible(false);

        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;

        // Get default UI and append it to DOM.
        cameraViewContainer.current?.append(cameraEnhancer.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            let _resultText = "";
            setResultText(_resultText);
            console.log(result);
            for (let item of result.barcodeResultItems) {
              _resultText += `${item.formatString}: ${item.text}\n\n`;
            }
            setResultText(_resultText);
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        // Open camera and start scanning barcode.
        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return () => {
      console.log("video capture component disposed");
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
      pInit.then(() => {
        cameraEnhancer?.dispose();
        cvRouter?.dispose();
      })
    };
  }, []);

  return (
    <div>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "70vh" }}></div>
      <br />
      Results:
      <div className="results">{resultText}</div>
    </div>
  );
}

export default VideoCapture;
