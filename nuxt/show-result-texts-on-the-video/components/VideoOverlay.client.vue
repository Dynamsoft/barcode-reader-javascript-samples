<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import { CameraEnhancer, CameraView, CaptureVisionRouter, EnumCapturedResultItemType } from "dynamsoft-barcode-reader-bundle";
import "../dynamsoft.config";

const cameraViewContainer = useTemplateRef("cameraViewContainer");
const overlayContainer = useTemplateRef("overlayContainer");

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;
let isDisposed = false;
let pInit: Promise<void>;

const overlays = ref<{ text: string; top: string; left: string }[]>([]);

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
        onCapturedResultReceived: (result) => {
          if (!cameraEnhancer.isOpen()) return;

          const newOverlays: { text: string; top: string; left: string }[] = [];
          for (let item of result.items) {
            if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;

            const p = (item as any).location.points;
            const topLeft = {
              x: Math.min(p[0].x, p[1].x, p[2].x, p[3].x),
              y: Math.min(p[0].y, p[1].y, p[2].y, p[3].y),
            };
            const bottomRight = {
              x: Math.max(p[0].x, p[1].x, p[2].x, p[3].x),
              y: Math.max(p[0].y, p[1].y, p[2].y, p[3].y),
            };

            const clientTopLeft = cameraEnhancer.convertToClientCoordinates(topLeft);
            const clientBottomRight = cameraEnhancer.convertToClientCoordinates(bottomRight);
            const midX = (clientTopLeft.x + clientBottomRight.x) / 2;

            newOverlays.push({
              text: (item as any).text,
              top: `${clientTopLeft.y}px`,
              left: `${midX}px`,
            });
          }
          overlays.value = newOverlays;
        },
      });

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    } catch (ex: any) {
      console.error(ex);
      alert(ex.message || ex);
    }
  })();
});

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
  <div style="position: relative;">
    <div ref="cameraViewContainer" style="width: 100%; height: 70vh; background: #eee;"></div>
    <div ref="overlayContainer">
      <div
        v-for="(overlay, i) in overlays"
        :key="i"
        class="bubble-box"
        :style="{ position: 'fixed', top: overlay.top, left: overlay.left, transform: 'translateX(-50%)' }"
      >
        {{ overlay.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bubble-box {
  background: rgba(254, 142, 20, 0.9);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 100;
}
</style>
