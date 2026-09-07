import { useEffect, useRef, useState } from "react";
import { CameraEnhancer, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
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

        cvRouter = await CaptureVisionRouter.createInstance();
        camera = await CameraEnhancer.createInstance('dce.ui.v5.xml');
        // You can use this interface to share variables between business logic and UI definition files.
        camera.uiContext = {
          //// Start from dbrjs 11.6.3200:
          //// you only need to pass custom variables;
          //// you no longer need to manually pass SDK variables.
          // beep, vibrate, CaptureVisionRouter, CameraEnhancer,
          cvRouter, handleBarcodeText: setResultText
        };
        if (isDisposed) return;

        // Get default UI and append it to DOM.
        cameraViewContainer.current?.append(camera.getUIElement());

        // Open camera and start scanning barcode.
        await camera.open();

        // This sample will decode after clicking the "takePhoto" button.
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
      <p>Please click the white circular <b>Take Photo</b> button below to capture a frame for barcode parsing.</p>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "60vh" }}></div>
      <p>Please click the white circular <b>Take Photo</b> button below to capture a frame for barcode parsing.</p>
      <br />
      Results:
      <div className="results">{resultText}</div>
    </div>
  );
}

export default VideoCapture;
