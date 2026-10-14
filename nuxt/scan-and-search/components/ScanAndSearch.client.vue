<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;

const inputText = ref("");
const searchResult = ref("");
const isCapturing = ref(true);

const lookupBarcode = (text: string) => {
  return `Barcode Text to Query from Database:\n\n${text}\n\n-------------------\n\nProduct name: xxx\n\nBrand: xxx\n\nCategory: xxx\n\nPrice: xxx\n\nDescription: xxx`;
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

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (result.barcodeResultItems.length > 0) {
            inputText.value = result.barcodeResultItems[0].text;
            cvRouter.stopCapturing();
            cameraEnhancer.pause();
            isCapturing.value = false;
          }
        },
      });

      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadSingleBarcode");
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const toggleCapturing = async () => {
  await pInit;
  if (isCapturing.value) {
    cvRouter.stopCapturing();
    cameraEnhancer.pause();
    isCapturing.value = false;
  } else {
    await cameraEnhancer.resume();
    await cvRouter.startCapturing("ReadSingleBarcode");
    isCapturing.value = true;
  }
};

const search = () => {
  const text = inputText.value.trim();
  if (!text) return;
  searchResult.value = lookupBarcode(text);
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
    <div ref="cameraViewContainer" style="width: 100%; height: 40vh; background: #eee; cursor: pointer;" @click="toggleCapturing"></div>
    <div style="display: flex; margin: 10px auto; width: 90%; max-width: 500px;">
      <input v-model="inputText" type="text" placeholder="e.g. 049000042511" style="flex: 1; padding: 8px;" />
      <button @click="search" style="padding: 8px 16px; cursor: pointer;">Search</button>
    </div>
    <textarea v-model="searchResult" readonly placeholder="Search Result..." style="display: block; width: 90%; max-width: 500px; margin: 10px auto; height: 200px; padding: 8px;"></textarea>
  </div>
</template>
