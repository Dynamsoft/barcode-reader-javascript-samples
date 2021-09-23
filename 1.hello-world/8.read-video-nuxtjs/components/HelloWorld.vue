<template>
  <div className="helloWorld">
    <div id="UIElement">
      <span style="font-size: x-large" v-if="!libLoaded">Loading Library...</span>
      <BarcodeScanner
        v-if="bShowScanner"
        v-on:appendMessage="appendMessage"
      ></BarcodeScanner>
    </div>
    <input type="text" id="resultText" v-model="resultValue" readonly="true" />
  </div>
</template>

<script>
import DBR from "../dbr";
import BarcodeScanner from "./BarcodeScanner";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    BarcodeScanner,
  },
  data() {
    return {
      resultValue: "",
      libLoaded: false,
      bShowScanner: false,
    };
  },
  async mounted() {
    try {
      //Load the library on page load to speed things up.
      await DBR.BarcodeScanner.loadWasm();
      this.libLoaded = true;
      this.showScanner();
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  },
  methods: {
    showScanner() {
      this.bShowScanner = true;
    },
    appendMessage(message) {
      switch (message.type) {
        case "result":
          this.resultValue = message.format + ": " + message.text;
          break;
        case "error":
          this.resultValue = message.msg;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
