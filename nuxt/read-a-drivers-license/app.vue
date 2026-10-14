<template>
  <div>
    <h2>Read a Driver's License</h2>
    <client-only>
      <DriversLicense />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import DriversLicense from "./components/DriversLicense.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
