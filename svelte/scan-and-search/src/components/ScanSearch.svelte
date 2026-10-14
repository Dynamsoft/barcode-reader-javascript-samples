<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  const DATABASE: Record<string, string> = {
    "978-0-13-468599-1": "The Pragmatic Programmer",
    "978-0-596-51774-8": "JavaScript: The Good Parts",
    "978-1-491-95028-2": "Fluent Python",
    "4006381333931": "USB Cable",
    "5901234123457": "Dark Chocolate Bar",
  };

  let containerRef: HTMLDivElement;
  let query = "";
  let match: string | null = null;
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
          onDecodedBarcodesReceived: async (result) => {
            if (result.barcodeResultItems.length > 0) {
              const text = result.barcodeResultItems[0].text;
              query = text;
              match = DATABASE[text] || null;
              scanning = false;
              await cvRouter.stopCapturing();
              await cameraEnhancer.close();
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        await cvRouter.addResultFilter(filter);
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
    match = null;
    scanning = true;
    await pInit;
    if (!cvRouter) return;
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  };

  const lookup = () => { match = DATABASE[query] || null; };
</script>

<div>
  <div class="controls">
    <input bind:value={query} placeholder="Barcode value..." style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; width: 250px;" />
    <button on:click={lookup}>Search</button>
    <button on:click={startScan} class:active={scanning}>{scanning ? "Scanning..." : "Scan"}</button>
  </div>
  <div bind:this={containerRef} style="width: 100%; height: {scanning ? '50vh' : '0'}; overflow: hidden; transition: height 0.3s;"></div>
  {#if query && !scanning}
    <div class="result-card">
      <p><strong>Barcode:</strong> {query}</p>
      {#if match}
        <p style="color: green; margin-top: 8px;">Found: <strong>{match}</strong></p>
      {:else}
        <p style="color: #c00; margin-top: 8px;">No match found in database.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .controls { margin: 10px; }
  .controls button { padding: 8px 16px; margin: 0 4px; cursor: pointer; }
  .controls button.active { background: #feae37; }
  .result-card { margin: 20px auto; padding: 16px; border: 1px solid #eee; border-radius: 8px; max-width: 400px; }
</style>
