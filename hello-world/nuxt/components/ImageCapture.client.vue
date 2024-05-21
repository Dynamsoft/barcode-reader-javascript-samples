<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const resDiv: Ref<HTMLDivElement | null> = ref(null);

let pCvRouter: Promise<CaptureVisionRouter> | null = null;
let bDestoried = false;

const captureImage = async (e: Event) => {
  let files = [...(e.target! as HTMLInputElement).files!];
  (e.target! as HTMLInputElement).value = '';
  resDiv.value!.innerText = "";
  try {
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (bDestoried) return;
    
    for(let file of files){
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (bDestoried) return;

      if(files.length > 1){
        resDiv.value!.innerText += `\n${file.name}:\n`;
      }
      for (let _item of result.items) {
        if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
        let item = _item as BarcodeResultItem;
        resDiv.value!.innerText += item.text + "\n";
        console.log(item.text);
      }
      if (!result.items.length) resDiv.value!.innerText += 'No barcode found\n';
    }
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
}

onBeforeUnmount(async () => {
  bDestoried = true;
  if(pCvRouter){
    try{
      (await pCvRouter).dispose();
    }catch(_){}
  }
});
</script>

<template>
  <div class="capture-img">
    <div class="img-ipt">
      <input type="file" multiple @change="captureImage" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"/>
    </div>
    <div class="result-area" ref="resDiv"></div>
  </div>
</template>

<style scoped>
.capture-img {
  width: 100%;
  height: 100%;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
}

.capture-img .img-ipt {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  margin: 0 auto;
}

.capture-img .result-area {
  margin-top: 20px;
}
</style>
