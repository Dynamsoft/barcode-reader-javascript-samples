<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, EnumEnhancedFeatures } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let resultText = ref("");

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cameraEnhancer.enableEnhancedFeatures(EnumEnhancedFeatures.EF_AUTO_ZOOM);

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          resultText.value = "";
          for (let item of result.barcodeResultItems) {
            resultText.value += `${item.formatString}: ${item.text}\n\n`;
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cvRouter.initSettings("./ReadDistantBarcodes.json");

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadDistantBarcodes");
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  })();
});

onBeforeUnmount(async () => {
  isDisposed = true;
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => {
    cameraEnhancer?.dispose();
    cvRouter?.dispose();
  });
});
</script>

<template>
  <div>
    <div ref="cameraViewContainer" style="width: 100%; height: 70vh; background: #eee;"></div>
    <br />
    <div style="text-align: center;">Results:</div>
    <div class="results">{{ resultText }}</div>
  </div>
</template>

<style scoped>
.results {
  width: 100%;
  height: 10vh;
  overflow: auto;
  white-space: pre-wrap;
  text-align: center;
}
</style>
