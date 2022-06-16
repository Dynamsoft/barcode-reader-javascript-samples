<template>
  <div class="ImgDecode"><input type="file" @change="decodeImg" /></div>
</template>

<script>
import { onBeforeUnmount, ref } from "vue";
import { BarcodeReader } from 'dynamsoft-javascript-barcode'

export default {
  setup() {
    const pReader = ref(null);

    const decodeImg = async (e) => {
      try {
        const reader = await (pReader.value = pReader.value || BarcodeReader.createInstance());
        let results = await reader.decode(e.target.files[0]);
        for (let result of results) {
          alert(result.barcodeText);
        }
        if (!results.length) { alert('No barcode found'); }
      } catch (ex) {
        let errMsg;
        if (ex.message.includes("network connection error")) {
          errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        } else {
          errMsg = ex.message||ex;
        }
        console.error(errMsg);
        alert(errMsg);
      }
      e.target.value = '';
    }
    onBeforeUnmount(async () => {
      if (pReader.value) {
        (await pReader.value).destroyContext();
        console.log('ImgDecode Component Unmount');
      }
    })

    return {
      decodeImg
    }
  }
}
</script>

<style scoped>
.ImgDecode {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  border: 1px solid black
}
</style>