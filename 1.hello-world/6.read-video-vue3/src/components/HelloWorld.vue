<template>
  <div className="helloWorld">
    <h1>Hello World for Vue 3 <img class="applogo" alt="Vue logo" src="../assets/logo.png" /></h1>
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
import ImgDecode from './ImgDecode'
import { ref, onMounted } from "vue";

export default {
  name: "HelloWorld",
  setup() {
    const bShowScanner = ref(true);
    const bShowImgDecode = ref(false)
    onMounted(async () => {
      try {
        //Load the library on page load to speed things up.
        await BarcodeScanner.loadWasm();
      } catch (ex) {
        console.error(ex);
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
    return {
      bShowScanner,
      showScanner,
      showImgDecode,
      bShowImgDecode
    };
  },
  components: {
    VideoDecode, ImgDecode
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
.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  /* height: 40vh; */
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
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: #455a64;
}
h1 {
  font-size: 1.5em;
}
</style>
