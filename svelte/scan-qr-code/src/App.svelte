<script lang="ts">
  import BarcodeScanner from "./components/BarcodeScanner.svelte";
</script>

<main>
  <h2>Scan QR Code</h2>
  <BarcodeScanner />
</main>

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; text-align: center; }
  h2 { margin: 20px 0 10px; }
</style>
