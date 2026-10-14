<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let result = "";
  let scanning = false;
  let cvRouter: CaptureVisionRouter;
  let cameraEnhancer: CameraEnhancer;
  let pInit: Promise<void>;

  onMount(() => {
    let isDisposed = false;

    pInit = (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;

        containerRef.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: async (res) => {
            if (res.barcodeResultItems.length > 0) {
              result = res.barcodeResultItems[0].text;
              scanning = false;
              await cvRouter.stopCapturing();
              await cameraEnhancer.close();
            }
          },
        });
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

  const startScan = async () => {
    result = "";
    scanning = true;
    await pInit;
    if (!cvRouter) return;
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  };
</script>

<div>
  {#if !scanning}
    <button on:click={startScan} style="padding: 10px 24px; font-size: 16px; margin: 10px; cursor: pointer;">
      {result ? "Scan Again" : "Start Scan"}
    </button>
  {/if}
  <div bind:this={containerRef} style="width: 100%; height: {scanning ? '70vh' : '0'}; overflow: hidden;"></div>
  {#if result}
    <p style="margin: 20px; font-size: 18px;">Result: <strong>{result}</strong></p>
  {/if}
</div>
