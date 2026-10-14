<script lang="ts">
  import { onMount } from "svelte";
  import {
    CameraEnhancer,
    CameraView,
    CaptureVisionRouter,
    MultiFrameResultCrossFilter,
    Feedback,
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config";

  let containerRef: HTMLDivElement;
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

        cameraView.setTipVisible(true);
        cameraView.updateTipMessage("Point the camera at a barcode");

        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (result.barcodeResultItems.length > 0) {
              Feedback.beep();
              resultText = "";
              for (const item of result.barcodeResultItems) {
                resultText += `${item.formatString}: ${item.text}\n\n`;
              }
            }
          },
        });

        const filter = new MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification("barcode", true);
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
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

<div>
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
