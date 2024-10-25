<script lang="ts">
  import { onMount } from "svelte";
  import "../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
  import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
  import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
  import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

  const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

  let cameraViewContainer: HTMLDivElement;
  let resultsContainer: HTMLDivElement;

  let resolveInit: () => void;
  const pInit: Promise<void> = new Promise((r) => {
    resolveInit = r;
  });
  let isDestroyed = false;

  let cvRouter: CaptureVisionRouter;
  let cameraEnhancer: CameraEnhancer;

  onMount(() => {
    (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        } // Check if component is destroyed after every async
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Get default UI and append it to DOM.
        cameraViewContainer.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;

            resultsContainer.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
            }
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        //  Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        cameraView.setScanLaserVisible(true);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        await cvRouter.startCapturing("ReadSingleBarcode");
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          let errMsg = ex.message || ex;
          console.error(errMsg);
          alert(errMsg);
        }
      }

      // distroy function will wait pInit
      resolveInit!();
    })();

    // onBeforeUnmount
    return async () => {
      isDestroyed = true;
      try {
        await pInit;
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      } catch (_) {}
    };
  });
</script>

<div>
  <div bind:this={cameraViewContainer} style="width: 100%; height: 70vh; background: #eee;"></div>
  Results:<br />
  <div bind:this={resultsContainer} class="results"></div>
</div>

<style>
  .results {
    width: 100%;
    height: 10vh;
    overflow: auto;
    white-space: pre-wrap;
  }
</style>
