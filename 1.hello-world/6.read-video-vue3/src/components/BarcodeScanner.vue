<template>
  <div id="barcodeScannerUI" ref="root"></div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
import DBR from "../dbr";

export default {
  setup(props, context) {
    const root = ref(null);
    const pScanner = ref(null);
    const bDestroyed = ref(false);
    onMounted(async () => {
      try {
        let scanner = await (pScanner.value =
          pScanner.value || DBR.BarcodeScanner.createInstance());
        if (bDestroyed.value) {
          scanner.destroy();
          return;
        }
        root.value.appendChild(scanner.getUIElement());
        document.getElementsByClassName("dce-btn-close")[0].hidden = true;
        scanner.onFrameRead = (results) => {
          for (let result of results) {
            context.emit("appendMessage", {
              format: result.barcodeFormatString,
              text: result.barcodeText,
              type: "result",
            });
            if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
              context.emit("appendMessage", {
                msg: result.exception.message,
                type: "error",
              });
            }
          }
        };
        await scanner.open();
      } catch (ex) {
        context.emit("appendMessage", { msg: ex.message, type: "error" });
        console.error(ex);
      }
    });
    onBeforeUnmount(async () => {
      if (pScanner.value) {
        (await pScanner.value).destroy();
        bDestroyed.value = true;
      }
    });
    return {
      root,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#barcodeScannerUI {
  width: 100%;
  height: 100%;
}
</style>
