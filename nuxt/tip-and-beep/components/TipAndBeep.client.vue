<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, Feedback } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;
let tipInterval: ReturnType<typeof setInterval> | null = null;
let lostTimer: ReturnType<typeof setTimeout> | null = null;
let tipIndex = 0;

const resultText = ref("");

const tipMessages = [
  "Point your camera at a barcode",
  "Move closer so the barcode fills the frame",
  "Make sure the barcode is well-lit",
];

const startTipCycle = () => {
  if (tipInterval) return;
  tipIndex = 0;
  tipInterval = setInterval(() => {
    cameraView.updateTipMessage(tipMessages[tipIndex++ % tipMessages.length]);
    cameraView.setTipVisible(true);
  }, 2000);
};

const stopTipCycle = () => {
  if (tipInterval) { clearInterval(tipInterval); tipInterval = null; }
  if (lostTimer) { clearTimeout(lostTimer); lostTimer = null; }
  cameraView?.setTipVisible(false);
};

onMounted(() => {
  pInit = (async () => {
    try {
      cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      cameraView.setTipConfig({ duration: 0, coordinateBase: "view" });

      await cvRouter.addResultReceiver({
        onCapturedResultReceived: (result) => {
          if (!result.decodedBarcodesResult) return;

          resultText.value = "";
          for (let item of result.decodedBarcodesResult.barcodeResultItems) {
            resultText.value += `${item.formatString}: ${item.text}\n`;
          }
          Feedback.beep();
          stopTipCycle();
          lostTimer = setTimeout(() => startTipCycle(), 2000);
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      startTipCycle();
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

onBeforeUnmount(async () => {
  isDisposed = true;
  stopTipCycle();
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => {
    cameraEnhancer?.dispose();
    cvRouter?.dispose();
  });
});
</script>

<template>
  <div>
    <div ref="cameraViewContainer" style="width: 100%; height: 60vh; background: #eee;"></div>
    <div style="text-align: center; margin-top: 10px;">Results:</div>
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
