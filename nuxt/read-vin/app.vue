<template>
  <div>
    <h2>Read VIN</h2>
    <client-only>
      <ReadVIN />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import ReadVIN from "./components/ReadVIN.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
