<template>
  <div>
    <h2>Read and Parse GS1-AI</h2>
    <client-only>
      <ReadGS1AI />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import ReadGS1AI from "./components/ReadGS1AI.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
