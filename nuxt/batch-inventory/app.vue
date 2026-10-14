<template>
  <div>
    <h2>Batch Inventory</h2>
    <client-only>
      <BatchInventory />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import BatchInventory from "./components/BatchInventory.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
