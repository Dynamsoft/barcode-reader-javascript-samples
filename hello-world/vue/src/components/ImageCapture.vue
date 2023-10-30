<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import { type BarcodeResultItem } from "@dynamsoft/dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";

const pInit: Ref<Promise<CaptureVisionRouter> | null> = ref(null);

const decodeImg = async (e: Event) => {
  try {
    const router = await pInit.value;
    // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
    const result = await router!.capture(
      (e.target as any).files[0],
      "ReadBarcodes_SpeedFirst"
    );
    let texts = "";
    for (let item of result.items) {
      console.log((item as BarcodeResultItem).text);
      texts += (item as BarcodeResultItem).text + "\n";
    }
    if (texts != "") alert(texts);
    if (!result.items.length) alert("No barcode found");
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    if (errMsg.includes("network connection error")) {
      errMsg =
        "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    }
    console.error(errMsg);
    alert(errMsg);
  }
  (e.target as HTMLInputElement).value = "";
};

onMounted(async () => {
  pInit.value = CaptureVisionRouter.createInstance();
});

onBeforeUnmount(async () => {
  if (pInit.value) {
    const router = await pInit.value;
    router.dispose();
  }
  console.log("ImageCapture Component Unmount");
});
</script>

<template>
  <div class="div-image-capture">
    <input
      type="file"
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
      @change="decodeImg"
    />
  </div>
</template>

<style scoped>
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
</style>
