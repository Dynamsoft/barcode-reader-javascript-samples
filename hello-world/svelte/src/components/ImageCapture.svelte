<script lang="ts">
  import "../lib/cvr"; // import side effects. The license, engineResourcePath, so on.
  import { type BarcodeResultItem } from "dynamsoft-barcode-reader";
  import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
  import { onMount } from "svelte";

  let pCvr: Promise<CaptureVisionRouter>;

  onMount(()=>{
    return funcDestroy; // onDestory
  });

  let bDestoried = false;
  const funcDestroy = async()=>{
    bDestoried = true;
    if(pCvr){ 
      const cvr = await pCvr;
      cvr.dispose();
    }
  };

  const decodeImg = async(e: Event)=>{
    try{
      const file = (e.target! as HTMLInputElement).files![0];
      const cvr = await (pCvr = pCvr || CaptureVisionRouter.createInstance());
      if(bDestoried){ return; }

      const result = await cvr.capture(file, "ReadBarcodes_SpeedFirst");
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }

      if(texts){
        alert(texts);
      }else{
        alert("No barcode found");
      }
    }catch(ex:any){
      let errMsg = ex.message || ex;
      console.error(errMsg);
      funcDestroy();
      alert(errMsg);
    }
  };
</script>

<div class="div-image-capture">
  <input
    type="file"
    accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
    on:change={decodeImg}
  />
</div>

<style>
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
</style>
  