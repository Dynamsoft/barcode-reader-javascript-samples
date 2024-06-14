<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

const strErrorDistoryed = 'videoCapture component destoryed';

const uiContainer: Ref<HTMLElement | null> = ref(null);
const resultsContainer: Ref<HTMLElement | null> = ref(null);

let resolveInit:()=>void;
const pInit:Promise<void> = new Promise(r=>{resolveInit=r});
let bDestoryed = false;

let cvRouter:CaptureVisionRouter;
let cameraEnhancer:CameraEnhancer;

onMounted(async () => {

  try{
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    if(bDestoryed){ throw Error(strErrorDistoryed); } // Check if component is destroyed after every async
    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    if(bDestoryed){ throw Error(strErrorDistoryed); }

    // Get default UI and append it to DOM.
    uiContainer.value!.append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await CaptureVisionRouter.createInstance();
    if(bDestoryed){ throw Error(strErrorDistoryed); }
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
      if (!result.barcodeResultItems.length) return;

      resultsContainer.value!.textContent = '';
      console.log(result);
      for (let item of result.barcodeResultItems) {
        resultsContainer.value!.append(
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
});

onBeforeUnmount(async () => {
  bDestoryed = true;
  try{
    await pInit;
    cvRouter?.dispose();
    cameraEnhancer?.dispose();
  }catch(_){}
});
</script>

<template>
  <div>
    <div ref="uiContainer" class="div-ui-container"></div>
    Results:<br />
    <div ref="resultsContainer" class="div-results-container"></div>
  </div>
</template>
    
<style scoped>
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