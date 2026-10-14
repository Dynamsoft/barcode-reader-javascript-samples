<template>
  <div>
    <h2>Pick One To Fill</h2>
    <client-only>
      <PickOneToFill />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import PickOneToFill from "./components/PickOneToFill.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
