<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const resultContainer: Ref<HTMLDivElement | null> = ref(null);

let pCvRouter: Promise<CaptureVisionRouter>;
let isDestroyed = false;

const captureImage = async (e: Event) => {
  let files = [...(e.target! as HTMLInputElement).files!];
  (e.target! as HTMLInputElement).value = ''; // reset input
  resultContainer.value!.innerText = "";
  try {
    // ensure cvRouter is created only once
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (isDestroyed) return;

    for (let file of files) {
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (isDestroyed) return;

      // Print file name if there's multiple files
      if (files.length > 1) {
        resultContainer.value!.innerText += `\n${file.name}:\n`;
      }
      for (let _item of result.items) {
        if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
          continue;  // check if captured result item is a barcode
        }
        let item = _item as BarcodeResultItem;
        resultContainer.value!.innerText += item.text + "\n";  // output the decoded barcode text
        console.log(item.text);
      }
      // If no items are found, display that no barcode was detected
      if (!result.items.length) resultContainer.value!.innerText += 'No barcode found\n';
    }
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
}

onBeforeUnmount(async () => {
  isDestroyed = true;
  if (pCvRouter) {
    try {
      (await pCvRouter).dispose();
    } catch (_) { }
  }
});
</script>

<template>
  <div class="image-capture-container">
    <div class="input-container">
      <input type="file" multiple @change="captureImage" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
    </div>
    <div class="results" ref="resultContainer"></div>
  </div>
</template>

<style scoped>
.image-capture-container {
  width: 100%;
  height: 100%;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
}

.image-capture-container .input-container {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  margin: 0 auto;
}

.image-capture-container .results {
  margin-top: 20px;
  height: 100%;
}
</style>