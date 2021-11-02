<template>
  <div id="barcodeScannerUI"></div>
</template>

<script>
import DBR from "../dbr";

export default {
  data() {
    return {
      bDestroyed: false,
      pScanner: null,
    };
  },
  async mounted() {
    try {
      let scanner = await (this.pScanner =
        this.pScanner || DBR.BarcodeScanner.createInstance());
      if (this.bDestroyed) {
        scanner.destroy();
        return;
      }
      this.$el.appendChild(scanner.getUIElement());
      document.getElementsByClassName("dce-btn-close")[0].style.display = "none";
      scanner.onFrameRead = (results) => {
        for (let result of results) {
          this.$emit("appendMessage", {
            format: result.barcodeFormatString,
            text: result.barcodeText,
            type: "result",
          });
        }
      };
      await scanner.open();
    } catch (ex) {
      this.$emit("appendMessage", { msg: ex.message, type: "error" });
      console.error(ex);
    }
  },
  async beforeDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroy();
      this.bDestroyed = true;
    }
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
