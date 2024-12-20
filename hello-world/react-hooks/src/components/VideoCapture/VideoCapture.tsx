import { useEffect, useRef } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

function VideoCapture() {
  const cameraViewContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let resolveInit: () => void;
    const pInit: Promise<void> = new Promise((r) => {
      resolveInit = r;
    });
    let isDestroyed = false;

    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        } // Check if component is destroyed after every async
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Get default UI and append it to DOM.
        cameraViewContainer.current!.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;

            resultsContainer.current!.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.current!.textContent += `${item.formatString}: ${item.text}\n\n`;
            }
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        await cvRouter.startCapturing("ReadSingleBarcode");
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          let errMsg = ex.message || ex;
          console.error(errMsg);
          alert(errMsg);
        }
      }
      // Resolve pInit promise once initialization is complete.
      resolveInit!();
    })();

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return () => {
      isDestroyed = true;
      // Wait for the pInit to complete before disposing resources.
      pInit.then(() => {
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      }).catch((_) => { })
    };
  }, []);

  return (
    <div>
      <div ref={cameraViewContainer} style={{ width: "100%", height: "70vh" }}></div>
      <br />
      Results:
      <div ref={resultsContainer} className="results"></div>
    </div>
  );
}

export default VideoCapture;
