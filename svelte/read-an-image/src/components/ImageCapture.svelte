<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    EnumCapturedResultItemType,
    CaptureVisionRouter,
    type BarcodeResultItem,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let pCvRouter: Promise<CaptureVisionRouter>;
  let resultText = "";

  const captureImage = async (e: Event) => {
    let files = [...((e.target as HTMLInputElement).files!)];
    (e.target as HTMLInputElement).value = "";
    resultText = "Decoding...";

    try {
      const cvRouter = await pCvRouter;
      let text = "";
      for (const file of files) {
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        if (files.length > 1) text += `\n${file.name}:\n`;
        for (const _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
          const item = _item as BarcodeResultItem;
          text += `${item.formatString}: ${item.text}\n`;
        }
        if (!result.items.length) text += "No barcode found\n";
      }
      resultText = text;
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  onMount(() => {
    pCvRouter = CaptureVisionRouter.createInstance();
  });

  onDestroy(() => {
    pCvRouter?.then((cvRouter) => cvRouter.dispose());
  });
</script>

<div class="image-capture-container">
  <div class="input-container">
    <input
      type="file"
      multiple
      on:change={captureImage}
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
    />
  </div>
  <div class="result">{resultText}</div>
</div>

<style>
  .image-capture-container {
    max-width: 600px;
    margin: 0 auto;
  }
  .input-container {
    display: flex;
    justify-content: center;
    margin: 20px auto;
    padding: 10px;
  }
  .result {
    white-space: pre-wrap;
    text-align: left;
    padding: 10px;
  }
</style>
