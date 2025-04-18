<script setup lang="ts">
import { onMounted } from 'vue';
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';
import vueLogo from "./assets/vue.svg";

onMounted(() => {
  const config = {
    license: "YOUR-LICENSE-KEY", 
    container: ".barcode-scanner-view",
    engineResourcePaths: {
      rootDirectory: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
    },
    scannerViewConfig: {
      cameraEnhancerUIPath: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
    },
  }
  const barcodeScanner = new BarcodeScanner(config);
  barcodeScanner.launch().then((result)=>{
    console.log(result);
  });
})
</script>

<template>
  <div class="barcode-scanner-hello-world-page">
    <div class="barcode-scanner-title">
      <h2 class="barcode-scanner-title-text">Hello World for Vue</h2>
      <img class="barcode-scanner-title-logo" :src="vueLogo" alt="logo"></img>
    </div>
    <div class="barcode-scanner-view"></div>
  </div>
</template>

<style scoped>
.barcode-scanner-hello-world-page {
  width: 100%;
  height: 100%;
  text-align: center;
}

.barcode-scanner-title {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.barcode-scanner-title .barcode-scanner-title-logo {
  width: 30px;
  height: 30px;
  animation: retate 5s infinite linear;
  margin-left: 10px;
}

.barcode-scanner-view {
  width: 100%;
  height: calc(100% - 90px);
}
</style>
