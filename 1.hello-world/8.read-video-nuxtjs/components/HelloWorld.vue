<template>
  <div class="helloWorld">
    <div class="btn-group">
        <button :style="{marginRight: '10px', backgroundColor: bShowScanner ? 'rgb(255,174,55)' : 'white'}" @click="showScanner">Video Decode</button>
        <button :style="{backgroundColor: bShowImgDecode ? 'rgb(255,174,55)' : 'white'}"  @click="showImgDecode">Image Decode</button>
    </div>
    <div id="UIElement">
      <BarcodeScanner v-if="bShowScanner"></BarcodeScanner>
      <ImgDecode v-if="bShowImgDecode"></ImgDecode>
    </div>
  </div>
</template>

<script>
import DBR from "../dbr";
import BarcodeScanner from "./BarcodeScanner";
import ImgDecode from "./ImgDecode";

export default {
  name: "HelloWorld",
  components: {
    BarcodeScanner, ImgDecode
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
      await DBR.BarcodeScanner.loadWasm();
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
#UIElement {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  height: 40vh;
  width: 80vw;
}
#resultText {
    display: block;
    margin: 0 auto;
    padding: 0.4rem 0.8rem;
    color: inherit;
    width: 80vw;
    border: none;
    font-size: 1rem;
    border-radius: 0.2rem;
    text-align: center;
}
</style>
