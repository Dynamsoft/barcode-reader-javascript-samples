import { LicenseManager, CameraView, CameraEnhancer, CaptureVisionRouter, CapturedResultReceiver, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", { executeNow: true });
(async () => {
  const cameraView = await CameraView.createInstance();
  const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
  const cvRouter = await CaptureVisionRouter.createInstance();

  cvRouter.setInput(cameraEnhancer);

  const resultReceiver = new CapturedResultReceiver();
  resultReceiver.onDecodedBarcodesReceived = (result) => {
    alert(result.barcodeResultItems[0].text);
  };
  await cvRouter.addResultReceiver(resultReceiver);

  // Filter out unchecked and duplicate results.
  const filter = new MultiFrameResultCrossFilter();
  // Filter out unchecked barcodes.
  filter.enableResultCrossVerification("barcode", true);
  // Filter out duplicate barcodes within 3 seconds.
  filter.enableResultDeduplication("barcode", true);
  await cvRouter.addResultFilter(filter);

  const uiElement = cameraView.getUIElement();
  document.querySelector(".barcode-scanner-view")!.append(uiElement);

  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
})();