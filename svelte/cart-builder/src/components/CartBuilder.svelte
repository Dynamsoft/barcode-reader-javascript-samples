<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  interface CartItem { text: string; count: number; format: string; }

  let containerRef: HTMLDivElement;
  let items: CartItem[] = [];
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
        cameraEnhancer.setVideoFit("cover");

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            for (const item of result.barcodeResultItems) {
              const existing = items.find((i) => i.text === item.text);
              if (existing) {
                existing.count += 1;
                items = [...items];
              } else {
                items = [...items, { text: item.text, count: 1, format: item.formatString }];
              }
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
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

  const toggleScan = async () => {
    await pInit;
    if (!cvRouter) return;
    if (scanning) {
      await cvRouter.stopCapturing();
      await cameraEnhancer.close();
      scanning = false;
    } else {
      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      scanning = true;
    }
  };

  const clearCart = () => { items = []; };
</script>

<div>
  <div class="controls">
    <button on:click={toggleScan} class:active={scanning}>{scanning ? "Stop Scanning" : "Scan Barcode"}</button>
    <button on:click={clearCart}>Clear Cart</button>
  </div>
  <div bind:this={containerRef} style="width: 100%; height: {scanning ? '40vh' : '0'}; overflow: hidden; transition: height 0.3s;"></div>
  <div class="cart">
    <h3>Cart ({items.reduce((s, i) => s + i.count, 0)} items)</h3>
    {#if items.length === 0}
      <p style="color: #999;">No items. Start scanning!</p>
    {:else}
      <table>
        <thead><tr><th class="left">Barcode</th><th>Format</th><th>Qty</th></tr></thead>
        <tbody>
          {#each items as item}
            <tr>
              <td class="left mono">{item.text}</td>
              <td class="center">{item.format}</td>
              <td class="center">{item.count}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .controls { margin: 10px; }
  .controls button { padding: 8px 16px; margin: 0 4px; cursor: pointer; }
  .controls button.active { background: #feae37; }
  .cart { max-width: 500px; margin: 10px auto; text-align: left; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  thead tr { border-bottom: 2px solid #333; }
  th, td { padding: 6px; }
  .left { text-align: left; }
  .center { text-align: center; }
  .mono { font-family: monospace; }
  tbody tr { border-bottom: 1px solid #eee; }
</style>
