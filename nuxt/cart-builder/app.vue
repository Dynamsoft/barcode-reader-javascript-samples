<template>
  <div>
    <h2>Scan Barcode to Add Items to Cart</h2>
    <client-only>
      <CartBuilder />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import CartBuilder from "./components/CartBuilder.client.vue";
</script>

<style>
@import "./assets/main.css";
* { margin: 0; padding: 0; box-sizing: border-box; }
h2 { margin: 20px 0 10px; text-align: center; }

</style>
