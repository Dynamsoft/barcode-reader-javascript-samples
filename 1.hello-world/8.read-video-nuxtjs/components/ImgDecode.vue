<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import type { Ref } from 'vue'
import { BarcodeReader } from 'dynamsoft-javascript-barcode'

const pReader: Ref<null | Promise<BarcodeReader>> = ref(null);

const decodeImg = async (e:Event) => {
  try {
    const reader = await (pReader.value = pReader.value || BarcodeReader.createInstance());
    let results = await reader.decode((e.target as any).files[0]);
    for (let result of results) {
      alert(result.barcodeText);
    }
    if (!results.length) { alert('No barcode found'); }
  } catch (ex:any) {
    let errMsg = ex.message||ex;
    if (errMsg.includes("network connection error")) {
      errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    }
    console.error(errMsg);
    alert(errMsg);
  }
  (e.target as HTMLInputElement).value = '';
}
onBeforeUnmount(async () => {
  if (pReader.value) {
    (await pReader.value).destroyContext();
    console.log('ImgDecode Component Unmount');
  }
})

</script>

<template>
  <div class="ImgDecode"><input type="file" @change="decodeImg" /></div>
</template>

<style scoped>
.ImgDecode {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black
}
</style>