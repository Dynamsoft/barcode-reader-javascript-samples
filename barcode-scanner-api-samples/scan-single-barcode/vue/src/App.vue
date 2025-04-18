<script setup lang="ts">
import { onMounted } from 'vue';
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';
import vueLogo from "./assets/vue.svg";

onMounted(() => {
  const config = {
    license: "YOUR-LICENSE-KEY", 
    container: ".dbs-container",
    engineResourcePaths: {
      rootDirectory: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
    },
    scannerViewConfig: {
      cameraEnhancerUIPath: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
    },
  }
  const dbs = new BarcodeScanner(config);
  dbs.launch().then((result)=>{
    console.log(result);
  });
})
</script>

<template>
  <div class="dbs-hello-world-page">
    <div class="dbs-title">
      <h2 class="dbs-title-text">Hello World for Veu</h2>
      <img class="dbs-title-logo" :src="vueLogo" alt="logo"></img>
    </div>
    <div class="dbs-container"></div>
  </div>
</template>

<style scoped>
.dbs-hello-world-page {
  width: 100%;
  height: 100%;
  text-align: center;
}

.dbs-title {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.dbs-title .dbs-title-logo {
  width: 30px;
  height: 30px;
  animation: retate 5s infinite linear;
  margin-left: 10px;
}

.dbs-container {
  width: 100%;
  height: calc(100% - 90px);
}
</style>
