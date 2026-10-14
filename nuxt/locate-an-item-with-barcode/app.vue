<template>
  <div>
    <h2>Locate an Item with Barcode</h2>
    <client-only>
      <LocateItem />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import LocateItem from "./components/LocateItem.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
