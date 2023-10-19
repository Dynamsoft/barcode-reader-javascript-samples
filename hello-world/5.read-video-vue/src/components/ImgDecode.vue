<template>
  <div class="ImgDecode"><input type="file" @change="decodeImg" /></div>
</template>

<script>
import { BarcodeReader } from 'dynamsoft-javascript-barcode'
export default {
  name: 'ImgDecode',
  data() {
    return {
      pReader: null,
    }
  },
  methods: {
    async decodeImg(e) {
      try {
        const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
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
  },
  async beforeDestroy() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  },
}
</script>

<style scoped>
.ImgDecode {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black
}
</style>