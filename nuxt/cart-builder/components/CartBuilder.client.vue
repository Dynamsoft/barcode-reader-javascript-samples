<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;

const scanning = ref(false);
const cart = ref<{ name: string; price: number }[]>([]);

const products = [
  { name: "Wireless Mouse", price: 19.99 },
  { name: "Bluetooth Speaker", price: 29.99 },
  { name: "USB-C Cable", price: 9.99 },
  { name: "Notebook", price: 4.99 },
  { name: "Water Bottle", price: 14.99 },
  { name: "Laptop Stand", price: 34.99 },
  { name: "Wireless Keyboard", price: 24.99 },
  { name: "Portable Charger", price: 39.99 },
  { name: "LED Desk Lamp", price: 22.50 },
  { name: "Backpack", price: 49.99 },
];

const shortenString = (str: string, max = 15) =>
  str.length <= max ? str : str.slice(0, max) + "...";

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
          if (result.barcodeResultItems.length > 0) {
            const product = { ...products[Math.floor(Math.random() * products.length)] };
            product.name += ` (${shortenString(result.barcodeResultItems[0].text)})`;
            cart.value.push(product);
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const toggleScan = async () => {
  await pInit;
  if (scanning.value) {
    await cvRouter.stopCapturing();
    await cameraEnhancer.close();
    scanning.value = false;
  } else {
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    scanning.value = true;
  }
};

const total = () => cart.value.reduce((sum, item) => sum + item.price, 0).toFixed(2);

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
    <button @click="toggleScan" style="display: block; margin: 10px auto; padding: 8px 20px; cursor: pointer;">
      {{ scanning ? "Stop Scanning" : "Scan Barcode" }}
    </button>
    <div ref="cameraViewContainer" v-show="scanning" style="width: 100%; height: 40vh; background: #eee;"></div>
    <div class="cart">
      <h3>Shopping Cart ({{ cart.length }} items) - Total: ${{ total() }}</h3>
      <div v-if="cart.length === 0" style="text-align: center; color: #999;">No items in cart. Start scanning!</div>
      <div v-for="(item, index) in cart" :key="index" class="cart-item">
        <span>{{ item.name }}</span>
        <span>${{ item.price.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  margin: 10px auto;
  width: 90%;
  max-width: 500px;
}
.cart h3 {
  text-align: center;
  margin: 10px 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  border-bottom: 1px solid #eee;
}
</style>
