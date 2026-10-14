<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let cameraOpen = ref(false);
let cart = reactive<Map<string, { format: string; text: string; qty: number }>>(new Map());
let cartItems = ref<{ format: string; text: string; qty: number }[]>([]);

function updateCartItems() {
  cartItems.value = Array.from(cart.values());
}

async function toggleCamera() {
  await pInit;
  if (cameraOpen.value) {
    cvRouter.stopCapturing();
    cameraEnhancer.close();
    cameraOpen.value = false;
  } else {
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    cameraOpen.value = true;
  }
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
            const existing = cart.get(item.text);
            if (existing) {
              existing.qty++;
            } else {
              cart.set(item.text, { format: item.formatString, text: item.text, qty: 1 });
            }
          }
          updateCartItems();
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);
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
      <button @click="toggleCamera" style="padding: 10px 30px; font-size: 16px; cursor: pointer;">
        {{ cameraOpen ? "Stop Scanning" : "Start Scanning" }}
      </button>
    </div>
    <table v-if="cartItems.length" style="margin: 10px auto; border-collapse: collapse; min-width: 300px;">
      <thead>
        <tr><th style="border: 1px solid #ccc; padding: 8px;">Format</th><th style="border: 1px solid #ccc; padding: 8px;">Barcode</th><th style="border: 1px solid #ccc; padding: 8px;">Qty</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in cartItems" :key="idx">
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.format }}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.text }}</td>
          <td style="border: 1px solid #ccc; padding: 8px;">{{ item.qty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
