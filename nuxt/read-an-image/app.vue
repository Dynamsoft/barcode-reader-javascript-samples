<template>
  <div>
    <h2>Read Barcodes from an Image</h2>
    <client-only>
      <ImageCapture />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import ImageCapture from "./components/ImageCapture.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
