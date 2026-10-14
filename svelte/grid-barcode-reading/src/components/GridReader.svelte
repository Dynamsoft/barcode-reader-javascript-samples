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
  let status = "";

  const processImage = async (e: Event) => {
    const file = ((e.target as HTMLInputElement).files)?.[0];
    if (!file) return;
    (e.target as HTMLInputElement).value = "";
    status = "Phase 1: Fast scan...";
    resultText = "";

    try {
      const cvRouter = await pCvRouter;

      // Phase 1: Fast scan
      await cvRouter.initSettings("./GridFastScan.json");
      const fastResult = await cvRouter.capture(file, "GridFastScan");
      const barcodes = fastResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      status = `Phase 1 found ${barcodes.length} barcodes. Running deep decode...`;

      // Phase 2: Deep decode
      await cvRouter.initSettings("./GridDeepDecode.json");
      const deepResult = await cvRouter.capture(file, "GridDeepDecode");
      const deepBarcodes = deepResult.items.filter(
        (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
      ) as BarcodeResultItem[];

      const allBarcodes = deepBarcodes.length > barcodes.length ? deepBarcodes : barcodes;

      let text = `Total barcodes found: ${allBarcodes.length}\n\n`;
      allBarcodes.forEach((item, i) => {
        text += `[${i + 1}] ${item.formatString}: ${item.text}\n`;
      });

      resultText = text;
      status = `Done! Found ${allBarcodes.length} barcodes.`;
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
      status = "Error";
    }
  };

  onMount(() => {
    pCvRouter = CaptureVisionRouter.createInstance();
  });

  onDestroy(() => {
    pCvRouter?.then((r) => r.dispose());
  });
</script>

<div class="grid-reader">
  <input type="file" accept=".jpg,.jpeg,.png,.bmp" on:change={processImage}
    style="display: block; margin: 20px auto; padding: 10px;" />
  {#if status}
    <p style="margin: 10px; font-weight: bold;">{status}</p>
  {/if}
  <div class="results">{resultText}</div>
</div>

<style>
  .grid-reader {
    max-width: 600px;
    margin: 0 auto;
  }
  .results {
    white-space: pre-wrap;
    text-align: left;
    padding: 10px;
    font-family: monospace;
    font-size: 13px;
  }
</style>
