<script lang="ts">
import { onMount } from "svelte";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { type BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

let resDiv: HTMLDivElement;

let pCvRouter: Promise<CaptureVisionRouter>;
let bDestoried = false;


const captureImage = async (e: Event) => {
  let files = [...(e.target! as HTMLInputElement).files!];
  (e.target! as HTMLInputElement).value = '';
  resDiv.innerText = "";
  try {
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (bDestoried) return;
    
    for(let file of files){
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (bDestoried) return;

      if(files.length > 1){
        resDiv.innerText += `\n${file.name}:\n`;
      }
      for (let _item of result.items) {
        if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
        let item = _item as BarcodeResultItem;
        resDiv.innerText += item.text + "\n";
        console.log(item.text);
      }
      if (!result.items.length) resDiv.innerText += 'No barcode found\n';
    }
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
};

onMount(() => {
  // onBeforeUnmount
  return async()=>{
    bDestoried = true;
    if(pCvRouter){
      try{
        (await pCvRouter).dispose();
      }catch(_){}
    }
  };
});
</script>

<div class="capture-img">
  <div class="img-ipt">
    <input type="file" multiple on:change={captureImage} accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"/>
  </div>
  <div class="result-area" bind:this={resDiv}></div>
</div>

<style>
  .capture-img {
    width: 100%;
    height: 100%;
    font-family:
      Consolas,
      Monaco,
      Lucida Console,
      Liberation Mono,
      DejaVu Sans Mono,
      Bitstream Vera Sans Mono,
      Courier New,
      monospace;
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
