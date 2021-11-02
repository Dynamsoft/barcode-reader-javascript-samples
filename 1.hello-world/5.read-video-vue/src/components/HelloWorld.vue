<template>
  <div class="helloWorld">
    <h1>{{ msg }} <img class="applogo" alt="Vue logo" src="../assets/logo.png" /></h1>
    <input
      type="text"
      v-model="resultValue"
      readonly="true"
      class="latest-result"
      placeholder="The Last Read Barcode"
    />
    <div id="UIElement">
      <span style="font-size: x-large" v-if="!libLoaded">Loading Library...</span>
      <BarcodeScanner
        v-if="bShowScanner"
        v-on:appendMessage="appendMessage"
      ></BarcodeScanner>
    </div>
    <div>
      <span style="float: left">All Results:</span><br />
      <div id="results">
        <ul>
          <li v-for="(item, index) in resultItems" :key="index + 100000">
            <span>{{ item.type }}</span
            ><span class="resultText">{{ item.text }}</span>
          </li>
        </ul>
      </div>
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
      resultItems: [],
      libLoaded: false,
      bShowScanner: false,
    };
  },
  async mounted() {
    //Load the library on page load to speed things up.
    try {
      await DBR.BarcodeScanner.loadWasm();
      this.libLoaded = true;
      this.showScanner();
    } catch (ex) {
      alert(ex.message);
      throw ex;
    }
  },
  updated() {
    var container = this.$el.querySelector("#results");
    container.scrollTop = container.scrollHeight;
  },
  components: {
    BarcodeScanner,
  },
  methods: {
    appendMessage(message) {
      switch (message.type) {
        case "result":
          this.resultValue = message.format + ": " + message.text;
          this.resultItems.push({ type: message.format + ": ", text: message.text });
          break;
        case "error":
          this.resultValue = message.msg;
          this.resultItems.push({ type: "Error: ", text: message.msg });
          break;
        default:
          break;
      }
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

#UIElement {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  height: 40vh;
  width: 80vw;
}

#UIElement img {
  max-width: 100%;
  max-height: 90%;
  border: solid 1px gray;
}
</style>
