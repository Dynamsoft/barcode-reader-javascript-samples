<script setup lang="ts">
import GridReader from "./components/GridReader.vue";
</script>
<template>
  <div>
    <h2>Grid Barcode Reading</h2>
    <GridReader />
  </div>
</template>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { text-align: center; min-width: 350px; font-family: sans-serif; }
h2 { margin: 20px 0 10px; }
</style>
