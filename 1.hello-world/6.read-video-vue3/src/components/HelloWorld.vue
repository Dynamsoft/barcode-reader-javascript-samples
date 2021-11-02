<template>
  <div className="helloWorld">
    <h1>{{ msg }} <img class="applogo" alt="Vue logo" src="../assets/logo.png" /></h1>
    <input
      type="text"
      placeholder="The Last Read Barcode"
      id="resultText"
      v-model="resultValue"
      readonly="true"
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
import { ref, onMounted, reactive } from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const resultValue = ref(null);
    const libLoaded = ref(false);
    const bShowScanner = ref(false);
    const resultItems = reactive([]);
    onMounted(async () => {
      try {
        //Load the library on page load to speed things up.
        await DBR.BarcodeScanner.loadWasm();
        libLoaded.value = true;
        showScanner();
      } catch (ex) {
        alert(ex.message);
        throw ex;
      }
    });
    const showScanner = () => {
      bShowScanner.value = true;
    };
    const appendMessage = (message) => {
      switch (message.type) {
        case "result":
          resultValue.value = message.format + ": " + message.text;
          resultItems.push({ type: message.format + ": ", text: message.text });
          break;
        case "error":
          resultValue.value = message.msg;
          resultItems.push({ type: "Error: ", text: message.msg });
          break;
        default:
          break;
      }
    };
    return {
      resultItems,
      resultValue,
      libLoaded,
      bShowScanner,
      showScanner,
      appendMessage,
    };
  },
  components: {
    BarcodeScanner,
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
