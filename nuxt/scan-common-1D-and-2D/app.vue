<template>
  <div>
    <h2>Scan Common 1D and 2D Codes</h2>
    <client-only>
      <BarcodeScanner />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import BarcodeScanner from "./components/BarcodeScanner.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
