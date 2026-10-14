<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, CodeParserModule, CodeParser } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;

const showResult = ref(false);
const barcodeText = ref("");
const parsedResults = ref<{ description: string; value: string }[]>([]);

CodeParserModule.loadSpec("VIN");

function handleVINResult(parsedResult: any) {
  const oriParseInfo: { description: string; value: string }[] = [];
  const resultInfo = JSON.parse(parsedResult.jsonString);

  function wrapResultObject(childFields: any[]) {
    for (let childField of childFields) {
      for (let field of childField) {
        if (field.Value) {
          oriParseInfo.push({ description: field.FieldName, value: field.Value });
        }
        if (field.ChildFields) {
          wrapResultObject(field.ChildFields);
        }
      }
    }
  }

  for (let info of resultInfo.ResultInfo) {
    if (info.ChildFields) wrapResultObject(info.ChildFields);
  }
  return oriParseInfo;
}

onMounted(() => {
  pInit = (async () => {
    try {
      cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: async (result) => {
          if (!result.barcodeResultItems.length) return;
          let processed: { description: string; value: string }[];
          try {
            const parser = await CodeParser.createInstance();
            const parsed = await parser.parse(result.barcodeResultItems[0].bytes);
            processed = handleVINResult(parsed);
          } catch (ex: any) {
            processed = [
              { description: "Error", value: ex.message || "parse failed." },
              { description: "Original text", value: result.barcodeResultItems[0].text },
            ];
          }
          barcodeText.value = result.barcodeResultItems[0].text.replace(/\n/g, "");
          parsedResults.value = processed;
          showResult.value = true;
          cvRouter.stopCapturing();
        },
      });

      await cvRouter.initSettings("./read_vin.json");
      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadVIN");
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const backToScan = async () => {
  showResult.value = false;
  await cameraEnhancer.open();
  cameraView.clearAllInnerDrawingItems();
  await cvRouter.startCapturing("ReadVIN");
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
    <div ref="cameraViewContainer" v-show="!showResult" style="width: 100%; height: 70vh; background: #eee;"></div>
    <div v-if="showResult" class="result-view">
      <div class="barcode-text">{{ barcodeText }}</div>
      <ul>
        <li v-for="(item, i) in parsedResults" :key="i">
          <strong>{{ item.description }}: </strong><span>{{ item.value }}</span>
        </li>
      </ul>
      <button @click="backToScan" style="display: block; margin: 10px auto; padding: 8px 20px; cursor: pointer;">Back to Scan</button>
    </div>
  </div>
</template>

<style scoped>
.result-view {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.barcode-text {
  font-size: 12px;
  color: #666;
  word-break: break-all;
  margin-bottom: 10px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
</style>
