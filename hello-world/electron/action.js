// Configures the paths where the .wasm files and other necessary resources for modules are located.
Dynamsoft.Core.CoreModule.engineResourcePaths = {
  std: "./node_modules/dynamsoft-capture-vision-std/dist/",
  dip: "./node_modules/dynamsoft-image-processing/dist/",
  core: "./node_modules/dynamsoft-core/dist/",
  license: "./node_modules/dynamsoft-license/dist/",
  cvr: "./node_modules/dynamsoft-capture-vision-router/dist/",
  dbr: "./node_modules/dynamsoft-barcode-reader/dist/",
  dce: "./node_modules/dynamsoft-camera-enhancer/dist/"
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", true);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=samples#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
Dynamsoft.Core.CoreModule.loadWasm(["DBR"]);

(async () => {
  // Defined globally for easy debugging.
  let cameraEnhancer, cvRouter;

  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
    // Get default UI and append it to DOM.
    document.querySelector("#camera-view-container").append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;

        const resultsContainer = document.querySelector("#results");
        resultsContainer.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      }
    });

    // Filter out unchecked and duplicate results.
    const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    // Filter out unchecked barcodes.
    filter.enableResultCrossVerification("barcode", true);
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication("barcode", true);
    await cvRouter.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  } catch (ex) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
})();
