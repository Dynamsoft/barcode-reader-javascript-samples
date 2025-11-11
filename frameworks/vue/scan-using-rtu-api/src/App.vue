<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { BarcodeScanner, type BarcodeScannerConfig } from "dynamsoft-barcode-reader-bundle";

const barcodeScannerViewRef = ref<HTMLElement>();
let barcodeScanner: BarcodeScanner;

onMounted(async () => { 
  // Configuration object for initializing the BarcodeScanner instance
  const config: BarcodeScannerConfig = {
    license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key

    // Specify where to render the scanner UI
    // If container is not specified, the UI will take up the full screen
    container: barcodeScannerViewRef.value!, 

    // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
    uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/ui/barcode-scanner.ui.xml",

    // showUploadImageButton: true,
    // scannerViewConfig: {
    //   showFlashButton: true,
    //   cameraSwitchControl: "toggleFrontBack",
    // },

    // Specify custom paths for the engine resources
    engineResourcePaths: {
      rootDirectory: "https://cdn.jsdelivr.net/npm/",
    },
  }

  // Create an instance of the BarcodeScanner with the provided configuration
  barcodeScanner = new BarcodeScanner(config);

  // Launch the scanner; once a barcode is detected, display its text in an alert
  let result = await barcodeScanner.launch();
  if (result.barcodeResults.length) {
    alert(result.barcodeResults[0].text);
  }
});

onBeforeUnmount(()=>{
  // Dispose of the barcode scanner when the component unmounts
  barcodeScanner?.dispose();
});
</script>

<template>
  <h1>Barcode Scanner for Vue3</h1>
  <div ref="barcodeScannerViewRef" style="width:100%;height:80vh">
  </div>
</template>
