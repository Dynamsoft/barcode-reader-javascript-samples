<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;
let resultText = ref("");
let scanning = ref(false);

async function startScan() {
  resultText.value = "";
  scanning.value = true;
  await pInit;
  await cameraEnhancer.open();
  cameraView.setScanLaserVisible(true);
  await cvRouter.startCapturing("ReadSingleBarcode");
}

async function stopScan() {
  cvRouter.stopCapturing();
  cameraEnhancer.close();
  scanning.value = false;
}

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
          if (result.barcodeResultItems.length > 0) {
            const item = result.barcodeResultItems[0];
            resultText.value = `${item.formatString}: ${item.text}`;
            stopScan();
          }
        },
      });
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
    <div ref="containerRef" style="width: 100%; height: 60vh; background: #eee;"></div>
    <div style="margin: 15px;">
      <button v-if="!scanning" @click="startScan" style="padding: 10px 30px; font-size: 16px; cursor: pointer;">Scan Barcode</button>
      <button v-else @click="stopScan" style="padding: 10px 30px; font-size: 16px; cursor: pointer;">Stop</button>
    </div>
    <div v-if="resultText" style="margin: 10px;">
      <strong>Result:</strong> {{ resultText }}
      <br /><br />
      <button @click="startScan" style="padding: 8px 20px; cursor: pointer;">Scan Again</button>
    </div>
  </div>
</template>
