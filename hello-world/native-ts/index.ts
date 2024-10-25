import "dynamsoft-barcode-reader"
import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import { CameraView, CameraEnhancer } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import { DecodedBarcodesResult } from "dynamsoft-barcode-reader";

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=10.4.2001&cVer=true#specify-the-license&utm_source=samples or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Used to load wasm resources in advance, reducing latency between video playing and barcode decoding.
CoreModule.loadWasm(["DBR"]);
// Defined globally for easy debugging.
let cameraEnhancer: CameraEnhancer;
let cvRouter: CaptureVisionRouter;

(async () => {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    // Get default UI and append it to DOM.
    document.querySelector("#camera-view-container")!.append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await CaptureVisionRouter.createInstance();
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result: DecodedBarcodesResult) => {
        if (!result.barcodeResultItems.length) return;

        const resultsContainer = document.querySelector("#results")!;
        resultsContainer.textContent = "";
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
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

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
})();