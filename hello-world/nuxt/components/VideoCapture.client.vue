<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  getCurrentInstance,
  type Ref,
} from "vue";
import { EnumCapturedResultItemType } from "@dynamsoft/dynamsoft-core";
import { type DecodedBarcodesResult } from "@dynamsoft/dynamsoft-barcode-reader";
import {
  CameraEnhancer,
  CameraView,
} from "@dynamsoft/dynamsoft-camera-enhancer";
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from "@dynamsoft/dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "@dynamsoft/dynamsoft-utility";

const pInit: Ref<Promise<{
  cameraView: CameraView;
  cameraEnhancer: CameraEnhancer;
  router: CaptureVisionRouter;
}> | null> = ref(null);
const elRefs: Ref<HTMLElement | null> = ref(null);

const init = async (): Promise<{
  cameraView: CameraView;
  cameraEnhancer: CameraEnhancer;
  router: CaptureVisionRouter;
}> => {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    elRefs.value!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    const router = await CaptureVisionRouter.createInstance();
    router.setInput(cameraEnhancer);

    // Define a callback for results.
    const resultReceiver = new CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = (
      result: DecodedBarcodesResult
    ) => {
      for (let item of result.barcodesResultItems) {
        console.log(item.text);
        alert(item.text);
      }
    };
    router.addResultReceiver(resultReceiver);

    // Filter out unchecked and duplicate results.
    const filter = new MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification(
      EnumCapturedResultItemType.CRIT_BARCODE,
      true
    ); // Filter out unchecked barcodes.
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication(
      EnumCapturedResultItemType.CRIT_BARCODE,
      true
    );
    filter.setDuplicateForgetTime(
      EnumCapturedResultItemType.CRIT_BARCODE,
      3000
    );
    await router.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await router.startCapturing("ReadSingleBarcode");
    return {
      cameraView,
      cameraEnhancer,
      router,
    };
  } catch (ex: any) {
    let errMsg;
    if (ex?.message.includes("network connection error")) {
      errMsg =
        "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    } else {
      errMsg = ex.message || ex;
    }
    console.error(errMsg);
    alert(errMsg);
    throw ex;
  }
};

onMounted(async () => {
  pInit.value = init();
});

onBeforeUnmount(async () => {
  if (pInit.value) {
    const { cameraView, cameraEnhancer, router } = await pInit.value;
    router.dispose();
    cameraEnhancer.dispose();
    cameraView.dispose();
  }
  console.log("VideoCapture Component Unmount");
});
</script>

<template>
  <div>
    <div ref="elRefs" class="div-ui-container"></div>
  </div>
</template>

<style scoped>
.div-ui-container {
  width: 100%;
  height: 70vh;
  /* min-width: 640px; */
  /* min-height: 480px; */
  background: #eee;
  position: relative;
  resize: both;
}
</style>
