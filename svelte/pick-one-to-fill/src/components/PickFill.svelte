<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let fields = { sn: "", mac: "", eid: "" };
  let activeField: string | null = null;
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
            if (result.barcodeResultItems.length > 0 && activeField) {
              const text = result.barcodeResultItems[0].text;
              fields = { ...fields, [activeField]: text };
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

  const scanForField = async (field: string) => {
    activeField = field;
    scanning = true;
    await pInit;
    if (!cvRouter) return;
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  };
</script>

<div>
  <div bind:this={containerRef} style="width: 100%; height: {scanning ? '40vh' : '0'}; overflow: hidden; transition: height 0.3s;"></div>
  <div class="form">
    {#each ["sn", "mac", "eid"] as f}
      <div class="field-row">
        <label>{f.toUpperCase()}</label>
        <input value={fields[f]} on:input={(e) => fields = { ...fields, [f]: e.currentTarget.value }}
          placeholder="Scan or type {f.toUpperCase()}..." />
        <button on:click={() => scanForField(f)}>Scan</button>
      </div>
    {/each}
  </div>
</div>

<style>
  .form { max-width: 400px; margin: 20px auto; text-align: left; }
  .field-row { margin: 12px 0; display: flex; align-items: center; gap: 8px; }
  .field-row label { width: 50px; font-weight: bold; }
  .field-row input { padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; width: 220px; }
  .field-row button { padding: 6px 12px; cursor: pointer; }
</style>
