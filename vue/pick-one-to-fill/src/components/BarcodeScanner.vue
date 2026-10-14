<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;

let serialNumber = ref("");
let macAddress = ref("");
let equipmentId = ref("");
let activeField = ref("");
let scanning = ref(false);

async function scanFor(field: string) {
  activeField.value = field;
  scanning.value = true;
  await pInit;
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadSingleBarcode");
}

async function stopScan() {
  cvRouter.stopCapturing();
  cameraEnhancer.close();
  scanning.value = false;
  activeField.value = "";
}

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (result.barcodeResultItems.length > 0) {
            const text = result.barcodeResultItems[0].text;
            if (activeField.value === "sn") serialNumber.value = text;
            else if (activeField.value === "mac") macAddress.value = text;
            else if (activeField.value === "eid") equipmentId.value = text;
            stopScan();
          }
        },
      });
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  })();
});

onBeforeUnmount(() => {
  isDisposed = true;
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => { cameraEnhancer?.dispose(); cvRouter?.dispose(); });
});
</script>
<template>
  <div>
    <div ref="containerRef" style="width: 100%; height: 45vh; background: #eee;"></div>
    <div style="margin: 15px; text-align: left; max-width: 500px; margin-left: auto; margin-right: auto;">
      <div style="margin: 8px 0; display: flex; align-items: center; gap: 8px;">
        <label style="width: 120px;">Serial Number:</label>
        <input v-model="serialNumber" style="flex: 1; padding: 6px;" />
        <button @click="scanFor('sn')" :disabled="scanning" style="padding: 6px 12px; cursor: pointer;">Scan</button>
      </div>
      <div style="margin: 8px 0; display: flex; align-items: center; gap: 8px;">
        <label style="width: 120px;">MAC Address:</label>
        <input v-model="macAddress" style="flex: 1; padding: 6px;" />
        <button @click="scanFor('mac')" :disabled="scanning" style="padding: 6px 12px; cursor: pointer;">Scan</button>
      </div>
      <div style="margin: 8px 0; display: flex; align-items: center; gap: 8px;">
        <label style="width: 120px;">Equipment ID:</label>
        <input v-model="equipmentId" style="flex: 1; padding: 6px;" />
        <button @click="scanFor('eid')" :disabled="scanning" style="padding: 6px 12px; cursor: pointer;">Scan</button>
      </div>
      <div v-if="scanning" style="margin: 10px 0; text-align: center;">
        <button @click="stopScan" style="padding: 8px 20px; cursor: pointer;">Cancel Scan</button>
      </div>
    </div>
  </div>
</template>
