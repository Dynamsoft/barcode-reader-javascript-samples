<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, EnumCapturedResultItemType } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let resultReceiver: any = null;

const itemId = ref("");
const searching = ref(false);
const resultText = ref("");
const showCamera = ref(false);

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      await cvRouter.addResultFilter(filter);
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const scanItemId = async () => {
  await pInit;
  showCamera.value = true;

  if (resultReceiver) cvRouter.removeResultReceiver(resultReceiver);
  resultReceiver = {
    onDecodedBarcodesReceived: (result: any) => {
      if (result.barcodeResultItems.length > 0) {
        itemId.value = result.barcodeResultItems[0].text;
        stopScanning();
      }
    },
  };
  await cvRouter.addResultReceiver(resultReceiver);
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadSingleBarcode");
};

const startSearch = async () => {
  if (!itemId.value.trim()) {
    alert("Please enter the item ID");
    return;
  }
  await pInit;
  showCamera.value = true;
  searching.value = true;
  resultText.value = "";

  if (resultReceiver) cvRouter.removeResultReceiver(resultReceiver);
  resultReceiver = {
    onCapturedResultReceived: (result: any) => {
      let found = false;
      let text = "";
      for (let item of result.items) {
        if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
        const isMatch = item.text === itemId.value;
        text += `${isMatch ? "FOUND" : "x"} ${item.text}\n`;
        if (isMatch) found = true;
      }
      resultText.value = found ? "Item Found!\n" + text : text || "Scanning...";
    },
  };
  await cvRouter.addResultReceiver(resultReceiver);
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadBarcodes_Balance");
};

const stopScanning = async () => {
  cvRouter.stopCapturing();
  await cameraEnhancer.close();
  showCamera.value = false;
  searching.value = false;
  if (resultReceiver) {
    cvRouter.removeResultReceiver(resultReceiver);
    resultReceiver = null;
  }
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
    <div v-show="!showCamera" style="padding: 20px; max-width: 500px; margin: 0 auto;">
      <p>1. Enter or Scan the Item ID:</p>
      <div style="display: flex; gap: 8px; margin: 10px 0;">
        <input v-model="itemId" type="text" placeholder="Enter Item ID" style="flex: 1; padding: 8px;" />
        <button @click="scanItemId" style="padding: 8px 12px; cursor: pointer;">Scan</button>
      </div>
      <p>2. Start searching for the item</p>
      <button @click="startSearch" style="display: block; width: 100%; padding: 10px; cursor: pointer; margin-top: 10px;">Start Searching</button>
    </div>
    <div v-show="showCamera">
      <div ref="cameraViewContainer" style="width: 100%; height: 60vh; background: #eee;"></div>
      <button @click="stopScanning" style="display: block; margin: 10px auto; padding: 8px 20px; cursor: pointer;">Close Camera</button>
      <pre v-if="searching" style="text-align: center; white-space: pre-wrap;">{{ resultText }}</pre>
    </div>
  </div>
</template>
