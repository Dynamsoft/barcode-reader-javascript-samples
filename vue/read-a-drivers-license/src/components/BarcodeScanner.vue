<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter, CodeParserModule, CodeParser } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;
let parsedFields = ref<{ name: string; value: string }[]>([]);

function extractParsedFields(obj: any): { name: string; value: string }[] {
  const fields: { name: string; value: string }[] = [];
  if (!obj) return fields;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      fields.push(...extractParsedFields(item));
    }
  } else if (typeof obj === "object") {
    if (obj.FieldName && obj.Value !== undefined) {
      fields.push({ name: obj.FieldName, value: obj.Value });
    }
    if (obj.ChildFields) {
      fields.push(...extractParsedFields(obj.ChildFields));
    }
  }
  return fields;
}

onMounted(() => {
  pInit = (async () => {
    try {
      await CodeParserModule.loadSpec("AAMVA_DL_ID");

      const cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);
      await cvRouter.initSettings("./read_dl.json");

      const parser = await CodeParser.createInstance();

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: async (result) => {
          if (result.barcodeResultItems.length > 0) {
            const item = result.barcodeResultItems[0];
            try {
              const parsed = await parser.parse(item.bytes);
              const jsonStr = parsed.jsonString;
              const jsonObj = JSON.parse(jsonStr);
              parsedFields.value = extractParsedFields(jsonObj);
            } catch (e) {
              parsedFields.value = [{ name: "Raw", value: item.text }];
            }
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadDriversLicense");
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
    <div ref="containerRef" style="width: 100%; height: 60vh; background: #eee;"></div>
    <div v-if="parsedFields.length" style="margin: 10px; overflow: auto; max-height: 30vh;">
      <table style="margin: 0 auto; border-collapse: collapse; min-width: 300px;">
        <thead>
          <tr><th style="border: 1px solid #ccc; padding: 6px;">Field</th><th style="border: 1px solid #ccc; padding: 6px;">Value</th></tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in parsedFields" :key="i">
            <td style="border: 1px solid #ccc; padding: 6px;">{{ f.name }}</td>
            <td style="border: 1px solid #ccc; padding: 6px;">{{ f.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
