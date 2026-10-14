<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
const scanning = ref(false);

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: async (result) => {
          if (result.barcodeResultItems.length > 0) {
            alert(result.barcodeResultItems[0].text);
            await cvRouter.stopCapturing();
            await cameraEnhancer.close();
            scanning.value = false;
          }
        },
      });
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  })();
  startScan();
});

const startScan = async () => {
  await pInit;
  scanning.value = true;
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadSingleBarcode");
};

onBeforeUnmount(async () => {
  isDisposed = true;
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => {
    cameraEnhancer?.dispose();
    cvRouter?.dispose();
  });
});
</script>

<template>
  <div>
    <button v-if="!scanning" @click="startScan" style="display: block; margin: 20px auto;">Scan</button>
    <div ref="cameraViewContainer" v-show="scanning" style="width: 100%; height: 70vh; background: #eee;"></div>
  </div>
</template>
