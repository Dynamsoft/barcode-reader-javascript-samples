<template>
  <div id="app">
    <img class="applogo" alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Dynamsoft Barcode Reader Hello World Sample for Vue" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.applogo {
  height: 5vmin;
}
</style>
