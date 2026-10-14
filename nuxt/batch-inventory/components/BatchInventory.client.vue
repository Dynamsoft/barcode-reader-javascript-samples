<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let startTime = 0;

const scannedItems = ref<{ formatString: string; text: string }[]>([]);
const showSummary = ref(false);
const totalUniqueCount = ref(0);

const hasItem = (item: any) => {
  return scannedItems.value.some(
    (r) => r.text === item.text && r.formatString === item.formatString
  );
};

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          for (let item of result.barcodeResultItems) {
            if (!hasItem(item)) {
              scannedItems.value.push({ formatString: item.formatString, text: item.text });
            }
          }
        },
      });
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
  launchScanner();
});

const launchScanner = async () => {
  await pInit;
  scannedItems.value = [];
  showSummary.value = false;
  startTime = Date.now();
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
};

const clearItems = () => {
  scannedItems.value = [];
};

const done = async () => {
  await cvRouter.stopCapturing();
  await cameraEnhancer.close();
  totalUniqueCount.value += scannedItems.value.length;
  showSummary.value = true;
};

const backToScan = () => {
  launchScanner();
};

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
    <div v-show="!showSummary">
      <div ref="cameraViewContainer" style="width: 100%; height: 50vh; background: #eee;"></div>
      <div class="result-list">
        <div v-for="(item, i) in scannedItems" :key="i" class="result-item">
          {{ item.formatString }}: {{ item.text }}
        </div>
        <div v-if="scannedItems.length === 0" style="text-align: center; color: #999;">
          Scanning for barcodes...
        </div>
      </div>
      <div class="toolbar">
        <button @click="clearItems">Clear</button>
        <button @click="done">Done</button>
      </div>
    </div>
    <div v-if="showSummary" class="summary">
      <h3>Summary</h3>
      <p>Total Unique Barcodes: {{ totalUniqueCount }}</p>
      <p>This Session: {{ scannedItems.length }}</p>
      <button @click="backToScan">Scan Again</button>
    </div>
  </div>
</template>

<style scoped>
.result-list {
  max-height: 20vh;
  overflow: auto;
  padding: 10px;
}
.result-item {
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.toolbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
}
.toolbar button {
  padding: 8px 20px;
  cursor: pointer;
}
.summary {
  text-align: center;
  padding: 20px;
}
.summary button {
  margin-top: 10px;
  padding: 8px 20px;
  cursor: pointer;
}
</style>
