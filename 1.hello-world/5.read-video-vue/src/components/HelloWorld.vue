<template>
  <div class="helloWorld">
    <h1>Hello World for Vue<img class="applogo" alt="Vue logo" src="../assets/logo.png" /></h1>
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
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import VideoDecode from "./VideoDecode";
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
      alert(ex.message);
      throw ex;
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

ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
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

button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: 1px solid black;
}

span {
  font-size: 0.8rem;
}

.latest-result {
  display: block;
  margin: 0;
  padding: 0.4rem 0.8rem;
  color: inherit;
  width: 80vw;
  border: none;
  font-size: 1rem;
  border-radius: 0.2rem;
  text-align: center;
}

.latest-result::placeholder {
  color: #b0bec5;
}

.latest-result:focus {
  outline: none;
  box-shadow: 0.1rem 0.4rem 0.8rem #5e35b1;
}

#results {
  border: 1px dashed grey;
  overflow: auto;
  width: 80vw;
  padding: 2vmin;
  margin-bottom: 3vh;
  height: 15vh;
}

#results ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  font-size: 0.8rem;
}

.resultText {
  color: #ce5e04;
}

.bigger {
  font-size: large;
  margin-bottom: 2%;
}

.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  /* height: 40vh; */
  width: 80vw;
}
</style>
