<script setup lang="ts">
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

let pCvRouter: Promise<CaptureVisionRouter>;
let resultText = ref("");

onBeforeMount(() => {
  pCvRouter = CaptureVisionRouter.createInstance();
});

const captureImage = async (e: Event) => {
  let file = (e.target! as HTMLInputElement).files![0];
  if (!file) return;
  (e.target! as HTMLInputElement).value = "";
  resultText.value = "Decoding...";
  try {
    const cvRouter = await pCvRouter;
    const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
    const barcodeItems = result.decodedBarcodesResult?.barcodeResultItems;

    if (!barcodeItems || barcodeItems.length === 0) {
      resultText.value = "No barcode found";
      return;
    }

    let text = "";
    for (let item of barcodeItems) {
      text += `${item.formatString}: ${item.text}\n`;
    }
    resultText.value = text;
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(ex);
    alert(errMsg);
  }
};

onBeforeUnmount(async () => {
  pCvRouter.then((cvRouter) => {
    cvRouter.dispose();
  });
});
</script>

<template>
  <div class="image-capture-container">
    <div class="input-container">
      <input type="file" @change="captureImage" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
    </div>
    <div class="results">{{ resultText }}</div>
  </div>
</template>

<style scoped>
.image-capture-container {
  width: 100%;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
}
.input-container {
  width: 80%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  margin: 20px auto;
  padding: 10px;
}
.results {
  margin-top: 20px;
  white-space: pre-wrap;
  text-align: center;
}
</style>
