<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let inventory = reactive<Map<string, { format: string; text: string; count: number }>>(new Map());
let inventoryItems = ref<{ format: string; text: string; count: number }[]>([]);

function updateItems() {
  inventoryItems.value = Array.from(inventory.values());
}

function clearInventory() {
  inventory.clear();
  updateItems();
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
          for (const item of result.barcodeResultItems) {
            const existing = inventory.get(item.text);
            if (existing) {
              existing.count++;
            } else {
              inventory.set(item.text, { format: item.formatString, text: item.text, count: 1 });
            }
          }
          updateItems();
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

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
    <div ref="containerRef" style="width: 100%; height: 50vh; background: #eee;"></div>
    <div style="margin: 10px;">
      <span>Total unique items: {{ inventoryItems.length }}</span>
      <button @click="clearInventory" style="padding: 8px 16px; cursor: pointer; margin-left: 10px;">Clear</button>
    </div>
    <table v-if="inventoryItems.length" style="margin: 10px auto; border-collapse: collapse; min-width: 300px;">
      <thead>
        <tr><th style="border: 1px solid #ccc; padding: 8px;">Format</th><th style="border: 1px solid #ccc; padding: 8px;">Barcode</th><th style="border: 1px solid #ccc; padding: 8px;">Count</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in inventoryItems" :key="idx">
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.format }}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.text }}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
