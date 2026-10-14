<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
    EnumCapturedResultItemType,
    type BarcodeResultItem,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
  let overlaysRef: HTMLDivElement;
  let resultText = "";

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
          onCapturedResultReceived: (result) => {
            if (overlaysRef) overlaysRef.innerHTML = "";

            const items = result.items.filter(
              (i) => i.type === EnumCapturedResultItemType.CRIT_BARCODE
            ) as BarcodeResultItem[];

            let text = "";
            for (const item of items) {
              text += `${item.formatString}: ${item.text}\n`;

              try {
                const pts = item.location.points;
                const clientPts = pts.map((p: any) => cameraEnhancer.convertToClientCoordinates(p));
                const minX = Math.min(...clientPts.map((p: any) => p.x));
                const minY = Math.min(...clientPts.map((p: any) => p.y));
                const maxX = Math.max(...clientPts.map((p: any) => p.x));

                const overlay = document.createElement("div");
                overlay.style.cssText = `position:fixed;left:${minX}px;top:${minY - 24}px;max-width:${maxX - minX}px;background:rgba(254,174,55,0.9);color:#000;font:bold 11px/1.3 monospace;padding:2px 5px;border-radius:3px;pointer-events:none;z-index:9999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
                overlay.textContent = item.text;
                overlaysRef?.appendChild(overlay);
              } catch (_) {}
            }
            resultText = text;
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
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
      pInit.then(() => {
        cameraEnhancer?.dispose();
        cvRouter?.dispose();
      });
    };
  });
</script>

<div style="position: relative;">
  <div bind:this={overlaysRef}></div>
  <div bind:this={containerRef} style="width: 100%; height: 70vh; background: #eee;"></div>
  Results:<br />
  <div class="results">{resultText}</div>
</div>

<style>
  .results {
    width: 100%;
    height: 10vh;
    overflow: auto;
    white-space: pre-wrap;
  }
</style>
