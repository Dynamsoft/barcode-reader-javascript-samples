<script setup lang="ts">
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

let cvRouter: CaptureVisionRouter | null = null;
const status = ref("idle");
const resultText = ref("");

onBeforeMount(async () => {
  cvRouter = await CaptureVisionRouter.createInstance();
});

const processImage = async (e: Event) => {
  const file = (e.target! as HTMLInputElement).files![0];
  if (!file || !cvRouter) return;
  (e.target! as HTMLInputElement).value = "";
  status.value = "scanning";
  resultText.value = "";

  try {
    // Phase 1: Fast Scan
    await cvRouter.initSettings("./GridFastScan.json");
    const fastResult = await cvRouter.capture(file, "GridFastScan");
    const fastItems = fastResult.decodedBarcodesResult?.barcodeResultItems ?? [];
    let text = `Fast Scan: ${fastItems.length} barcodes found\n`;

    for (let item of fastItems) {
      text += `  ${item.formatString}: ${item.text}\n`;
    }

    // Phase 2: Deep Decode on missing cells
    if (fastItems.length > 0) {
      await cvRouter.initSettings("./GridDeepDecode.json");
      const deepResult = await cvRouter.capture(file, "GridDeepDecode");
      const deepItems = deepResult.decodedBarcodesResult?.barcodeResultItems ?? [];
      text += `\nDeep Decode: ${deepItems.length} additional barcodes\n`;
      for (let item of deepItems) {
        text += `  ${item.formatString}: ${item.text}\n`;
      }
    }

    resultText.value = text;
    status.value = "done";
  } catch (ex: any) {
    resultText.value = `Error: ${ex.message || ex}`;
    status.value = "error";
  }
};

onBeforeUnmount(() => {
  cvRouter?.dispose();
});
</script>

<template>
  <div>
    <p style="text-align: center; margin: 10px;">Upload an image to scan a grid of DataMatrix/QR barcodes.</p>
    <div style="text-align: center; margin: 10px;">
      <input type="file" accept="image/*" @change="processImage" />
    </div>
    <div v-if="status === 'scanning'" style="text-align: center;">Processing...</div>
    <pre class="results">{{ resultText }}</pre>
  </div>
</template>

<style scoped>
.results {
  width: 90%;
  margin: 10px auto;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 14px;
  min-height: 100px;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fafafa;
}
</style>
