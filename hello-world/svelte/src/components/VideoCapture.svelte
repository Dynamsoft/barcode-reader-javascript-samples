<script lang="ts">
import { onMount } from "svelte";
import "../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

const strErrorDistoryed = 'videoCapture component destoryed';

let uiContainer: HTMLDivElement;
let resultsContainer: HTMLDivElement;

let resolveInit:()=>void;
const pInit:Promise<void> = new Promise(r=>{resolveInit=r});
let bDestoryed = false;

let cvRouter:CaptureVisionRouter;
let cameraEnhancer:CameraEnhancer;

onMount(() => {
  (async () => {
    try{
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      if(bDestoryed){ throw Error(strErrorDistoryed); } // Check if component is destroyed after every async
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if(bDestoryed){ throw Error(strErrorDistoryed); }

      // Get default UI and append it to DOM.
      uiContainer.append(cameraView.getUIElement());

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      cvRouter = await CaptureVisionRouter.createInstance();
      if(bDestoryed){ throw Error(strErrorDistoryed); }
      cvRouter.setInput(cameraEnhancer);

      // Define a callback for results.
      cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;

        resultsContainer.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.append(
            `${item.formatString}: ${item.text}`,
            document.createElement('br'),
            document.createElement('hr'),
          );
        }
      }});

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification("barcode", true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);
      if(bDestoryed){ throw Error(strErrorDistoryed); }

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      if(bDestoryed){ throw Error(strErrorDistoryed); }
      await cvRouter.startCapturing("ReadSingleBarcode");
      if(bDestoryed){ throw Error(strErrorDistoryed); }

    }catch(ex:any){
      
      if((ex as Error)?.message === strErrorDistoryed){
        console.log(strErrorDistoryed);
      }else{
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
    bDestoryed = true;
    try{
      await pInit;
      cvRouter?.dispose();
      cameraEnhancer?.dispose();
    }catch(_){}
  };
});
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
