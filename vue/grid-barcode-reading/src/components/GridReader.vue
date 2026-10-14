<script setup lang="ts">
import { ref } from "vue";
import { CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

let resultText = ref("");
let processing = ref(false);

async function onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  processing.value = true;
  resultText.value = "";
  try {
    const cvRouter = await CaptureVisionRouter.createInstance();

    // Phase 1: Fast scan
    await cvRouter.initSettings("./GridFastScan.json");
    const fastResult = await cvRouter.capture(file, "GridFastScan");
    const fastCount = fastResult.barcodeResultItems?.length || 0;
    resultText.value = `Fast Scan: Found ${fastCount} barcode(s).\n`;

    let allItems = fastResult.barcodeResultItems || [];

    // Phase 2: Deep decode
    await cvRouter.initSettings("./GridDeepDecode.json");
    const deepResult = await cvRouter.capture(file, "GridDeepDecode");
    const deepCount = deepResult.barcodeResultItems?.length || 0;
    resultText.value += `Deep Decode: Found ${deepCount} barcode(s).\n\n`;

    allItems = [...allItems, ...(deepResult.barcodeResultItems || [])];

    // Deduplicate by text
    const seen = new Set<string>();
    const unique = allItems.filter((item) => {
      if (seen.has(item.text)) return false;
      seen.add(item.text);
      return true;
    });

    resultText.value += `Total unique barcodes: ${unique.length}\n\n`;
    for (const item of unique) {
      resultText.value += `${item.formatString}: ${item.text}\n`;
    }

    cvRouter.dispose();
  } catch (ex: any) {
    alert(ex.message || ex);
  }
  processing.value = false;
}
</script>
<template>
  <div style="padding: 20px;">
    <input type="file" accept="image/*" @change="onChange" />
    <div v-if="processing" style="margin: 20px;">Processing...</div>
    <div v-if="resultText" style="margin: 20px; white-space: pre-wrap; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
      {{ resultText }}
    </div>
  </div>
</template>
