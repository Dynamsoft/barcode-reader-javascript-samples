<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, Feedback } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;

const showResult = ref(false);
const parsedFields = ref<{ key: string; value: string }[]>([]);

CodeParserModule.loadSpec("GS1_AI");

function extractGS1Fields(parsedResultItem: any) {
  const fields: { key: string; value: string }[] = [];
  const info = JSON.parse(parsedResultItem.jsonString);

  function wrapChildFields(childFields: any[]) {
    for (let childField of childFields) {
      for (let field of childField) {
        if (field.FieldName && field.Value) {
          fields.push({ key: field.FieldName, value: field.Value });
        }
        if (field.ChildFields) {
          wrapChildFields(field.ChildFields);
        }
      }
    }
  }

  if (info.CodeType === "GS1_AI") {
    for (let ri of info.ResultInfo) {
      if (ri.FieldName && ri.Value) {
        fields.push({ key: ri.FieldName, value: ri.Value });
      }
      if (ri.ChildFields) {
        wrapChildFields(ri.ChildFields);
      }
    }
  }
  return fields;
}

onMounted(() => {
  pInit = (async () => {
    try {
      cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;

      cameraViewContainer.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      await cvRouter.initSettings("./read_and_parse_gs1.json");
      cvRouter.setInput(cameraEnhancer);

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cvRouter.addResultReceiver({
        onParsedResultsReceived: (result) => {
          if (!result.parsedResultItems?.length) return;
          Feedback.beep();
          const fields = extractGS1Fields(result.parsedResultItems[0]);
          parsedFields.value = fields;
          showResult.value = true;
          cvRouter.stopCapturing();
        },
      });

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadGS1AI");
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

const backToScan = async () => {
  showResult.value = false;
  parsedFields.value = [];
  await cvRouter.startCapturing("ReadGS1AI");
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
      <h3 style="text-align: center; margin-bottom: 10px;">GS1-AI Parsed Result</h3>
      <div v-for="(field, i) in parsedFields" :key="i" class="field-item">
        <span class="field-key">{{ field.key }}</span>
        <strong>{{ field.value }}</strong>
      </div>
      <button @click="backToScan" style="display: block; margin: 20px auto; padding: 8px 20px; cursor: pointer;">Back to Scan</button>
    </div>
  </div>
</template>

<style scoped>
.result-view {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.field-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.field-key {
  display: block;
  font-size: 12px;
  color: #999;
}
</style>
