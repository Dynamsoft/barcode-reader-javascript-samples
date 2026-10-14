<script setup lang="ts">
import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, MultiFrameResultCrossFilter } from "dynamsoft-barcode-reader-bundle";
import type { CapturedResult } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const containerRef = useTemplateRef<HTMLDivElement>("containerRef");
let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let cameraView: CameraView;
let isDisposed = false;
let pInit: Promise<void>;
const overlays: HTMLDivElement[] = [];

function clearOverlays() {
  for (const el of overlays) el.remove();
  overlays.length = 0;
}

onMounted(() => {
  pInit = (async () => {
    try {
      cameraView = await CameraView.createInstance();
      cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (isDisposed) return;
      containerRef.value!.append(cameraEnhancer.getUIElement());

      cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onCapturedResultReceived: (result: CapturedResult) => {
          clearOverlays();
          if (!result.barcodeResultItems) return;
          for (const item of result.barcodeResultItems) {
            const p = item.location.points;
            const clientPoint = cameraView.convertToClientCoordinates({ x: p[0].x, y: p[0].y });
            const overlay = document.createElement("div");
            overlay.textContent = item.text;
            overlay.style.cssText = `position:fixed;left:${clientPoint.x}px;top:${clientPoint.y - 20}px;color:#00ff00;font-size:12px;background:rgba(0,0,0,0.6);padding:2px 6px;white-space:nowrap;z-index:9999;pointer-events:none;`;
            document.body.appendChild(overlay);
            overlays.push(overlay);
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    } catch (ex: any) {
      alert(ex.message || ex);
    }
  })();
});

onBeforeUnmount(() => {
  isDisposed = true;
  clearOverlays();
  cameraEnhancer?.getUIElement().remove();
  pInit.then(() => { cameraEnhancer?.dispose(); cvRouter?.dispose(); });
});
</script>
<template>
  <div>
    <div ref="containerRef" style="width: 100%; height: 80vh; background: #eee;"></div>
  </div>
</template>
