<script lang="ts">
  import "../lib/cvr"; // import side effects. The license, engineResourcePath, so on.
  import { type BarcodeResultItem } from "dynamsoft-barcode-reader";
  import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
  import { onMount } from "svelte";

  let pRouter: Promise<CaptureVisionRouter>;
  let iptRef: HTMLInputElement;
  let resRef: HTMLDivElement;

  onMount(() => {
    return funcDestroy; // onDestory
  });

  let bDestoried = false;
  const funcDestroy = async () => {
    bDestoried = true;
    if (pRouter) {
      const cvr = await pRouter;
      cvr.dispose();
    }
  };

  const captureImage = async (e: Event) => {
    try {
      const file = (e.target! as HTMLInputElement).files![0];
      const cvr = await (pRouter = pRouter || CaptureVisionRouter.createInstance());
      if (bDestoried) return;

      const result = await cvr.capture(file);
      for (let item of result.items) {
        let _item = item as BarcodeResultItem;
        console.log(_item.text);
        resRef!.innerText += `${_item.formatString} : ${_item.text}\n`;
      }
      iptRef.value = "";
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      funcDestroy();
      alert(errMsg);
    }
  };
</script>

<div class="capture-img">
  <div class="img-ipt">
    <input
      type="file"
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
      on:change={captureImage}
      bind:this={iptRef}
    />
  </div>
  <div class="result-area" bind:this={resRef}></div>
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
