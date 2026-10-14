<template>
  <div>
    <h2>Barcode Scanner with Tip & Beep</h2>
    <client-only>
      <TipAndBeep />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import TipAndBeep from "./components/TipAndBeep.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
