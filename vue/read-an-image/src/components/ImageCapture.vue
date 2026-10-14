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
    const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
    if (result.barcodeResultItems && result.barcodeResultItems.length > 0) {
      for (const item of result.barcodeResultItems) {
        resultText.value += `${item.formatString}: ${item.text}\n`;
      }
    } else {
      resultText.value = "No barcode found.";
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
      <strong>Results:</strong><br />{{ resultText }}
    </div>
  </div>
</template>
