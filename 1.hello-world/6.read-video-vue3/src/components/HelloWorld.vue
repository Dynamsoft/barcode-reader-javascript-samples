<template>
  <div className="helloWorld">
    <h1>Hello World for Vue 3 <img class="applogo" alt="Vue logo" src="../assets/logo.png" /></h1>
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
        await DBR.BarcodeScanner.loadWasm();
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
    BarcodeScanner, ImgDecode
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
#resultText::placeholder {
  color: #b0bec5;
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
#results ul li {
  margin: 1vmin 0;
}

.resultText {
  color: #ce5e04;
}

h1 {
  font-size: 1.5em;
}
</style>
