<script setup lang="ts">
import BarcodeScanner from "./components/BarcodeScanner.vue";
</script>
<template>
  <div>
    <h2>Scan DPM Codes</h2>
    <BarcodeScanner />
  </div>
</template>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { text-align: center; min-width: 350px; font-family: sans-serif; }
h2 { margin: 20px 0 10px; }
</style>
