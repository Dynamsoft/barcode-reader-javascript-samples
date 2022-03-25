<template>
  <div class="helloWorld">
    <div class="btn-group">
        <button :style="{marginRight: '10px', backgroundColor: bShowScanner ? 'rgb(255,174,55)' : 'white'}" @click="showScanner">Video Decode</button>
        <button :style="{backgroundColor: bShowImgDecode ? 'rgb(255,174,55)' : 'white'}"  @click="showImgDecode">Image Decode</button>
    </div>
    <div class="container">
      <VideoDecode v-if="bShowScanner"></VideoDecode>
      <ImgDecode v-if="bShowImgDecode"></ImgDecode>
    </div>
  </div>
</template>

<script>
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeScanner } from 'dynamsoft-javascript-barcode'
import VideoDecode from "./VideoDecode";
import ImgDecode from "./ImgDecode";

export default {
  name: "HelloWorld",
  components: {
    VideoDecode, ImgDecode
  },
  data() {
    return {
      bShowScanner: true,
      bShowImgDecode: false
    };
  },
  async mounted() {
    try {
      //Load the library on page load to speed things up.
      await BarcodeScanner.loadWasm();
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  },
  methods: {
    showScanner() {
      this.bShowScanner = true;
      this.bShowImgDecode = false;
    },
    showImgDecode() {
      this.bShowScanner = false;
      this.bShowImgDecode = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: 1px solid black;
}
.btn-group {
  text-align: center;
}
.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  /* height: 40vh; */
  width: 80vw;
}
</style>
