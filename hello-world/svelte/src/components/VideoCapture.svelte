<script lang="ts">
  import "../lib/router"; // import side effects. The license, engineResourcePath, so on.
  import { EnumCapturedResultItemType } from "dynamsoft-core";
  import { type DecodedBarcodesResult } from "dynamsoft-barcode-reader";
  import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
  import {
    CapturedResultReceiver,
    CaptureVisionRouter,
  } from "dynamsoft-capture-vision-router";
  import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
  import { onMount } from "svelte";

  let uiContainer: HTMLDivElement;
  let resultsContainer: HTMLDivElement;

  let cameraView: CameraView | null;
  let cameraEnhancer: CameraEnhancer | null;
  let router: CaptureVisionRouter | null;

  onMount(() => {
    (async () => {
      try {
        console.log(uiContainer, resultsContainer); //debug
        // check if need exist after every async statement
        const needExist = () => {
          if (bDestoried) {
            funcDestroy();
            return true;
          } else {
            return false;
          }
        };

        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        cameraView = await CameraView.createInstance();
        if (needExist()) {
          return;
        }
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        uiContainer.append(cameraView.getUIElement()); // Get default UI and append it to DOM.
        if (needExist()) {
          return;
        }

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        router = await CaptureVisionRouter.createInstance();
        if (needExist()) {
          return;
        }
        router.setInput(cameraEnhancer);

        // Define a callback for results.
        const resultReceiver = new CapturedResultReceiver();
        resultReceiver.onDecodedBarcodesReceived = (
          result: DecodedBarcodesResult,
        ) => {
          if (!result.barcodeResultItems.length) return;

          resultsContainer.textContent = "";
          console.log(result);
          for (let item of result.barcodeResultItems) {
            resultsContainer.append(
              `${item.formatString}: ${item.text}`,
              document.createElement("br"),
              document.createElement("hr"),
            );
          }
        };
        router.addResultReceiver(resultReceiver);

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        filter.setDuplicateForgetTime("barcode", 3000);
        await router.addResultFilter(filter);
        if (needExist()) {
          return;
        }

        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        if (needExist()) {
          return;
        }
        await router.startCapturing("ReadSingleBarcode");
        if (needExist()) {
          return;
        }
      } catch (ex: any) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
        funcDestroy();
        alert(errMsg);
      }
    })();

    return funcDestroy; // onDestory
  });

  let bDestoried = false;
  let funcDestroy = () => {
    bDestoried = true;
    if (router) {
      router.dispose();
      router = null;
    }
    if (cameraEnhancer) {
      cameraEnhancer.dispose();
      cameraEnhancer = null;
    }
    if (cameraView) {
      cameraView.dispose();
      cameraView = null;
    }
  };
</script>

<div>
  <div bind:this={uiContainer} class="div-ui-container"></div>
  Results:<br />
  <div bind:this={resultsContainer} class="div-results-container"></div>
</div>

<style>
  .div-ui-container {
    width: 100%;
    height: 70vh;
    background: #eee;
  }
  .div-results-container {
    width: 100%;
    height: 10vh;
    overflow: auto;
  }
</style>
