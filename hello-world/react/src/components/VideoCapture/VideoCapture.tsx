import React from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { DecodedBarcodesResult } from "dynamsoft-barcode-reader";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CapturedResultReceiver, CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

class VideoCapture extends React.Component {
  cameraViewContainer: React.RefObject<HTMLDivElement> = React.createRef();
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

  // pInit tracks the promise of the cameraView, cameraEnhancer, and cvRouter
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> | null = null;
  // pDestroy tracks the promise for destruction of the initialized components
  pDestroy: Promise<void> | null = null;

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      this.cameraViewContainer.current!.innerText = "";
      this.cameraViewContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (result: DecodedBarcodesResult) => {
        if (!result.barcodeResultItems.length) return;

        this.resultsContainer.current!.textContent = "";
        console.log(result);
        for (let item of result.barcodeResultItems) {
          this.resultsContainer.current!.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      };
      cvRouter.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification("barcode", true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadSingleBarcode");
      return {
        cameraView,
        cameraEnhancer,
        cvRouter,
      };
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      // Ensure components are initialized before we destroy
      const { cameraView, cameraEnhancer, cvRouter } = await this.pInit;
      cvRouter.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  }

  async componentDidMount() {
    try {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (this.pDestroy) {
        await this.pDestroy;
        this.pInit = this.init();
      } else {
        this.pInit = this.init();
      }
    } catch (_) {}
  }

  async componentWillUnmount() {
    try {
      await (this.pDestroy = this.destroy());
      console.log("VideoCapture Component Unmount");
    } catch (_) {}
  }

  shouldComponentUpdate() {
    // Never update UI after mount, sdk use native way to bind event, update will remove it.
    return false;
  }

  render() {
    return (
      <div>
        <div ref={this.cameraViewContainer} className="camera-view-container"></div>
        Results:
        <br></br>
        <div ref={this.resultsContainer} className="results"></div>
      </div>
    );
  }
}

export default VideoCapture;
