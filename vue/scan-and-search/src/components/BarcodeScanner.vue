<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const DATABASE = [
  { barcode: "1234567890", name: "Widget A", price: "$9.99" },
  { barcode: "0987654321", name: "Widget B", price: "$14.99" },
  { barcode: "1122334455", name: "Gadget C", price: "$24.99" },
];

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let searchQuery = ref("");
let searchResult = ref("");
let scanning = ref(false);

function search(query: string) {
  const item = DATABASE.find((i) => i.barcode === query.trim());
  if (item) {
    searchResult.value = `Found: ${item.name} - ${item.price}`;
  } else {
    searchResult.value = `No product found for: ${query}`;
  }
}

function onSearch() {
  search(searchQuery.value);
}

async function startScan() {
  searchResult.value = "";
  scanning.value = true;
  await pInit;
  await cameraEnhancer.open();
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
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (result.barcodeResultItems.length > 0) {
            const text = result.barcodeResultItems[0].text;
            searchQuery.value = text;
            search(text);
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
    <div ref="containerRef" style="width: 100%; height: 50vh; background: #eee;"></div>
    <div style="margin: 15px;">
      <input v-model="searchQuery" placeholder="Enter barcode or scan" style="padding: 8px; width: 200px;" />
      <button @click="onSearch" style="padding: 8px 16px; cursor: pointer;">Search</button>
      <button v-if="!scanning" @click="startScan" style="padding: 8px 16px; cursor: pointer; margin-left: 5px;">Scan</button>
      <button v-else @click="stopScan" style="padding: 8px 16px; cursor: pointer; margin-left: 5px;">Stop</button>
    </div>
    <div v-if="searchResult" style="margin: 10px; font-size: 18px;">{{ searchResult }}</div>
  </div>
</template>
