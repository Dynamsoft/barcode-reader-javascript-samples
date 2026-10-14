<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let target = "";
  let found = false;
  let resultText = "";
  let targetRef = "";

  onMount(() => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    const pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            let text = "";
            let matched = false;
            for (const item of result.barcodeResultItems) {
              text += `${item.formatString}: ${item.text}\n`;
              if (targetRef && item.text === targetRef) matched = true;
            }
            resultText = text;
            found = matched;
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        await cvRouter.startCapturing("ReadBarcodes_Balance");
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      pInit.then(() => {
        cameraEnhancer?.dispose();
        cvRouter?.dispose();
      });
    };
  });

  const updateTarget = (val: string) => {
    target = val;
    targetRef = val;
    found = false;
  };
</script>

<div>
  <div class="controls">
    <input value={target} on:input={(e) => updateTarget(e.currentTarget.value)}
      placeholder="Enter target barcode value..."
      style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; width: 280px;" />
  </div>
  {#if target}
    <p class="status" class:found class:searching={!found}>
      {found ? "Item found in view!" : "Searching for item..."}
    </p>
  {/if}
  <div bind:this={containerRef} style="width: 100%; height: 50vh; background: #eee;"></div>
  <div class="results">{resultText}</div>
</div>

<style>
  .controls { margin: 10px; }
  .status { margin: 8px; font-size: 16px; font-weight: bold; }
  .status.found { color: green; }
  .status.searching { color: #c00; }
  .results { white-space: pre-wrap; font-size: 12px; max-height: 10vh; overflow: auto; font-family: monospace; }
</style>
