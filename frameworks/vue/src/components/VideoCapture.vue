<template>
  <div>
    <div ref="cameraViewContainer" style="width: 100%; height: 70vh; background: #eee;"></div>
    <br />
    <div style="text-align: center;">Results:</div>
    <div class="results">{{ resultText }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config"; // import side effects (license, engineResourcePath) within a component is beneficial for lazy loading.

const cameraViewContainer = useTemplateRef<HTMLDivElement>("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let resultText = ref("");

onMounted(() => {
  pInit = (async () => {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();

      // Hide the "Powered by Message" overlay on the scanner view
      // cameraView.setPowerByMessageVisible(false);

      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      // Get default UI and append it to DOM.
      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      // Define a callback for results.
      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;

          resultText.value = '';
          console.log(result);
          for (let item of result.barcodeResultItems) {
            resultText.value += `${item.formatString}: ${item.text}\n\n`;
          }
        }
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
});

// dispose cvRouter when it's no longer needed
onBeforeUnmount(async () => {
  console.log("video capture component disposed");
  isDisposed = true;
  cameraEnhancer?.getUIElement().remove();
  // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
  pInit.then(() => {
    cameraEnhancer?.dispose();
    cvRouter?.dispose();
  })
});
</script>

<style scoped>
.results {
  width: 100%;
  height: 10vh;
  overflow: auto;
  white-space: pre-wrap;
  text-align: center;
}
</style>