<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let targetValue = ref("");
let status = ref("");

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!targetValue.value) {
            status.value = "Please enter a target barcode value.";
            return;
          }
          let found = false;
          for (const item of result.barcodeResultItems) {
            if (item.text === targetValue.value) {
              found = true;
              break;
            }
          }
          status.value = found ? "FOUND!" : "Not found yet... scanning";
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_Balance");
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
    <div style="margin: 10px;">
      <input v-model="targetValue" placeholder="Enter target barcode value" style="padding: 8px; width: 250px;" />
    </div>
    <div ref="containerRef" style="width: 100%; height: 60vh; background: #eee;"></div>
    <div style="margin: 10px; font-size: 20px; font-weight: bold;" :style="{ color: status === 'FOUND!' ? 'green' : '#333' }">
      {{ status }}
    </div>
  </div>
</template>
