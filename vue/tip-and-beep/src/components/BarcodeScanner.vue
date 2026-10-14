<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, Feedback } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;
let resultText = ref("");

onMounted(() => {
  pInit = (async () => {
    try {
      cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          resultText.value = "";
          if (result.barcodeResultItems.length > 0) {
            Feedback.beep();
            cameraView.updateTipMessage("Barcode found!");
            for (const item of result.barcodeResultItems) {
              resultText.value += `${item.formatString}: ${item.text}\n\n`;
            }
          } else {
            cameraView.updateTipMessage("Scanning...");
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      cameraView.setTipVisible(true);
      cameraView.updateTipMessage("Scanning...");
      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
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
