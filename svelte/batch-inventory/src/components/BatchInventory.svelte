<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  interface InvItem { text: string; format: string; count: number; }

  let containerRef: HTMLDivElement;
  let items: InvItem[] = [];

  onMount(() => {
    let isDisposed = false;
    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

    (async () => {
      try {
        const cameraView = await CameraView.createInstance();
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDisposed) return;
        containerRef.append(cameraEnhancer.getUIElement());

        cvRouter = await CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            for (const item of result.barcodeResultItems) {
              const key = `${item.formatString}|${item.text}`;
              const idx = items.findIndex((i) => `${i.format}|${i.text}` === key);
              if (idx >= 0) {
                items[idx] = { ...items[idx], count: items[idx].count + 1 };
                items = [...items];
              } else {
                items = [...items, { text: item.text, format: item.formatString, count: 1 }];
              }
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();

    return () => {
      isDisposed = true;
      cameraEnhancer?.getUIElement().remove();
      cameraEnhancer?.dispose();
      cvRouter?.dispose();
    };
  });

  const clearItems = () => { items = []; };
</script>

<div>
  <div bind:this={containerRef} style="width: 100%; height: 40vh; background: #eee;"></div>
  <div class="inventory">
    <h3>Inventory ({items.length} unique, {items.reduce((s, i) => s + i.count, 0)} total scans)</h3>
    <button on:click={clearItems} style="margin: 8px 0; padding: 6px 12px; cursor: pointer;">Clear</button>
    {#if items.length === 0}
      <p style="color: #999;">Scan barcodes to add to inventory.</p>
    {:else}
      <table>
        <thead><tr><th class="left">#</th><th class="left">Barcode</th><th>Format</th><th>Count</th></tr></thead>
        <tbody>
          {#each items as item, i}
            <tr>
              <td>{i + 1}</td>
              <td class="mono">{item.text}</td>
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
  .inventory { max-width: 500px; margin: 10px auto; text-align: left; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { border-bottom: 2px solid #333; }
  th, td { padding: 6px; }
  .left { text-align: left; }
  .center { text-align: center; }
  .mono { font-family: monospace; }
  tbody tr { border-bottom: 1px solid #eee; }
</style>
