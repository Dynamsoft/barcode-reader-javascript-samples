<template>
  <div>
    <h2>DataMatrix/QR Grid Scanner</h2>
    <client-only>
      <GridScanner />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import GridScanner from "./components/GridScanner.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
