<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;

const productName = ref("");
const snValue = ref("");
const macValue = ref("");
const eidValue = ref("");
const scanning = ref(false);
const activeField = ref("");

const fields = [
  { label: "SN", key: "sn", model: snValue },
  { label: "MAC", key: "mac", model: macValue },
  { label: "EID", key: "eid", model: eidValue },
];

onMounted(() => {
  pInit = (async () => {
    try {
      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const startScan = async (fieldKey: string) => {
  await pInit;
  activeField.value = fieldKey;
  scanning.value = true;

  await cameraEnhancer.open();

  const resultReceiver = {
    onDecodedBarcodesReceived: (result: any) => {
      if (result.barcodeResultItems.length > 0) {
        const fieldDef = fields.find((f) => f.key === activeField.value);
        if (fieldDef) fieldDef.model.value = result.barcodeResultItems[0].text;
        stopScan();
        cvRouter.removeResultReceiver(resultReceiver);
      }
    },
  };
  await cvRouter.addResultReceiver(resultReceiver);
  await cvRouter.startCapturing("ReadSingleBarcode");
};

const stopScan = async () => {
  await cvRouter.stopCapturing();
  await cameraEnhancer.close();
  scanning.value = false;
  activeField.value = "";
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
    <div ref="cameraViewContainer" v-show="scanning" style="width: 100%; height: 50vh; background: #eee;"></div>
    <div v-show="!scanning" style="padding: 10px; text-align: center; color: #999;">
      Click "Open Camera" to scan a barcode into a field.
    </div>
    <div class="form-view">
      <div class="field">
        <label>Product Name:</label>
        <input v-model="productName" type="text" />
      </div>
      <div v-for="field in fields" :key="field.key" class="field">
        <label>{{ field.label }}:</label>
        <div style="display: flex; gap: 8px; flex: 1;">
          <input v-model="field.model.value" type="text" style="flex: 1;" />
          <button @click="startScan(field.key)" :disabled="scanning">Open Camera</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-view {
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
}
.field {
  margin: 10px 0;
}
.field label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}
.field input {
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
}
.field button {
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
}
</style>
