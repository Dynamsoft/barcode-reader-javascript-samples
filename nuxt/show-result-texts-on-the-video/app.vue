<template>
  <div>
    <h2>Display Barcode Results as Video Overlays</h2>
    <client-only>
      <VideoOverlay />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import VideoOverlay from "./components/VideoOverlay.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
