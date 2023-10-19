<script setup lang="ts">
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeScanner } from 'dynamsoft-javascript-barcode'
import VideoDecode from "./VideoDecode.vue";
import ImgDecode from './ImgDecode.vue'
import { ref, onMounted } from "vue";
import type { Ref } from 'vue'

const bShowScanner: Ref<boolean> = ref(true);
const bShowImgDecode: Ref<boolean> = ref(false)
onMounted(async () => {
  try {
    //Load the library on page load to speed things up.
    await BarcodeScanner.loadWasm();
  } catch (ex:any) {
    let errMsg = ex.message||ex;
    if (errMsg.includes("network connection error")) {
      errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    }
    console.error(errMsg);
    alert(errMsg);
  }
});
const showScanner = () => {
  bShowScanner.value = true;
  bShowImgDecode.value = false;
};
const showImgDecode = () => {
  bShowScanner.value = false;
  bShowImgDecode.value = true;
}
</script>

<template>
  <div className="helloWorld">
    <h1>Hello World for Nuxt</h1>
    <div>
      <button :style="{ marginRight: '10px', backgroundColor: bShowScanner ? 'rgb(255,174,55)' : 'white' }"
        @click="showScanner">Video Decode</button>
      <button :style="{ backgroundColor: bShowImgDecode ? 'rgb(255,174,55)' : 'white' }" @click="showImgDecode">Image
        Decode</button>
    </div>
    <div class="container">
      <VideoDecode v-if="bShowScanner"></VideoDecode>
      <ImgDecode v-if="bShowImgDecode"></ImgDecode>
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: 1px solid black;
}

.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  width: 80vw;
}

.applogo {
  height: 25px;
}

.helloWorld {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #455a64;
}

h1 {
  font-size: 1.5em;
}
</style>