<template>
  <div>
    <h2>Instant Product Information Lookup</h2>
    <client-only>
      <ScanAndSearch />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import ScanAndSearch from "./components/ScanAndSearch.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
