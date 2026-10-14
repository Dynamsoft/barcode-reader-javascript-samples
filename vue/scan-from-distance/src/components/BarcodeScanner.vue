<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, EnumEnhancedFeatures } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
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
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);
      await cvRouter.initSettings("./ReadDistantBarcodes.json");

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          resultText.value = "";
          for (const item of result.barcodeResultItems) {
            resultText.value += `${item.formatString}: ${item.text}\n\n`;
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      cameraEnhancer.enableEnhancedFeatures(EnumEnhancedFeatures.EF_AUTO_ZOOM);
      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadDistantBarcodes");
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  })();
});

onBeforeUnmount(() => {
  isDisposed = true;
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => { cameraEnhancer?.dispose(); cvRouter?.dispose(); });
});
</script>
<template>
  <div>
    <div ref="containerRef" style="width: 100%; height: 70vh; background: #eee;"></div>
    <br />Results:
    <div style="white-space: pre-wrap; height: 10vh; overflow: auto; text-align: center;">{{ resultText }}</div>
  </div>
</template>
