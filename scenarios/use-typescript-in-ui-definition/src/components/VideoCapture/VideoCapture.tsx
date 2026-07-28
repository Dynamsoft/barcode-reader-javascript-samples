import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, beep, vibrate } from "dynamsoft-barcode-reader-bundle";
import "./VideoCapture.css";
import "../../dynamsoft.config" // import side effects (license, engineResourcePath) within a component is beneficial for lazy loading.

function VideoCapture() {
  const [resultText, setResultText] = useState("");
  const cameraViewContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let camera: CameraEnhancer;

    let pInit = (async () => {
      try {

        // Hide the "Powered by Message" overlay on the scanner view
        // cameraView.setPowerByMessageVisible(false);

        cvRouter = await CaptureVisionRouter.createInstance();
        camera = await CameraEnhancer.createInstance('dce.ui.v5.xml');
        (camera as any).exportToUI = {
          cvRouter, beep, vibrate,
          handleBarcodeText: setResultText
        };
        if (isDisposed) return;

        // Get default UI and append it to DOM.
        cameraViewContainer.current?.append(camera.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        // cvRouter.setInput(camera);

        // // Define a callback for results.
        // await cvRouter.addResultReceiver({
        //   onDecodedBarcodesReceived: (result) => {
        //     if (!result.barcodeResultItems.length) return;

        //     let _resultText = "";
        //     setResultText(_resultText);
        //     console.log(result);
        //     for (let item of result.barcodeResultItems) {
        //       _resultText += `${item.formatString}: ${item.text}\n\n`;
        //     }
        //     setResultText(_resultText);
        //   },
        // });

        // // Filter out unchecked and duplicate results.
        // const filter = new MultiFrameResultCrossFilter();
        // // Filter out unchecked barcodes.
        // filter.enableResultCrossVerification("barcode", true);
        // // Filter out duplicate barcodes within 3 seconds.
        // filter.enableResultDeduplication("barcode", true);
        // await cvRouter.addResultFilter(filter);

        // Open camera and start scanning barcode.
        await camera.open();
        // cameraView.setScanLaserVisible(true);
        // await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
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
      camera?.getUIElement().remove();
      // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
      pInit.then(() => {
        camera?.dispose();
        cvRouter?.dispose();
      })
    };
  }, []);

  return (
    <div>
      <p>Please click the white circular "take photo" button below to capture a frame for barcode parsing.</p>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "70vh" }}></div>
      <br />
      Results:
      <div className="results">{resultText}</div>
    </div>
  );
}

export default VideoCapture;
