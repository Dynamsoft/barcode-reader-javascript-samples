<template>
  <div class="helloWorld">
    <h1>{{ msg }}</h1>
    <button v-on:click="showScanner">Start Barcode Scanner</button>
    <input
      type="text"
      v-model="resultValue"
      readonly="true"
      class="latest-result"
      placeholder="The Barcode Result"
    />
    <div id="UIElement">
      <span style="font-size: x-large" v-if="!libLoaded">Loading Library...</span>
      <BarcodeScanner
        v-if="bShowScanner"
        v-on:appendMessage="appendMessage"
      ></BarcodeScanner>
    </div>
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
  data() {
    return {
      resultValue: "",
      libLoaded: false,
      bShowScanner: false,
    };
  },
  async mounted() {
    //Load the library on page load to speed things up.
    try {
      //DBR.BarcodeReader._bUseFullFeature = true;
      await DBR.BarcodeScanner.loadWasm();
      this.libLoaded = true;
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  },
  components: {
    BarcodeScanner,
  },
  methods: {
    appendMessage(str) {
      this.resultValue = str;
    },
    showScanner() {
      this.bShowScanner = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.helloWorld {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  height: 90vh;
  color: #455a64;
}

#UIElement {
  margin: 5vmin auto;
  text-align: center;
  font-size: medium;
  height: 50vh;
  width: 90vw;
}

.latest-result {
  display: block;
  margin: 0;
  padding: 0.4rem 0.8rem;
  color: inherit;
  width: 90%;
  border: none;
  font-size: 1.5rem;
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

button {
  font-size: 1.5rem;
  margin-bottom: 5vmin;
}
</style>
