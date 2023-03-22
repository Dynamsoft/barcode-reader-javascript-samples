<template>
  <div class="helloWorld">
    <h1>Hello World for Vue<img class="applogo" alt="Vue logo" src="../assets/logo.svg" /></h1>
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

<script>
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import VideoDecode from "./VideoDecode.vue";
import ImgDecode from './ImgDecode.vue'

export default {
  name: "HelloWorld",
  data() {
    return {
      bShowScanner: true,
      bShowImgDecode: false
    };
  },
  async mounted() {
    //Load the library on page load to speed things up.
    try {
      await BarcodeReader.loadWasm();
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
  },
  components: {
    VideoDecode, ImgDecode
  },
  methods: {
    showScanner() {
      this.bShowScanner = true;
      this.bShowImgDecode = false;
    },
    showImgDecode() {
      this.bShowScanner = false;
      this.bShowImgDecode = true;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 1.5em;
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
</style>
