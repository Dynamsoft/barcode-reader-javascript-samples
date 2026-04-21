<script lang="ts">
  import { onMount } from "svelte";
  import "../dynamsoft.config";
  import { EnumCapturedResultItemType, CaptureVisionRouter } from "dynamsoft-barcode-reader-bundle";
  import { type BarcodeResultItem } from "dynamsoft-barcode-reader-bundle";

  let pCvRouter: Promise<CaptureVisionRouter>;
  let isDestroyed = false;
  let resultText = "";

  const captureImage = async (e: Event) => {
    let files = [...(e.target! as HTMLInputElement).files!];
    (e.target! as HTMLInputElement).value = ""; // reset input
    resultText = "";

    try {
      const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
      if (isDestroyed) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
        console.log(result);
        if (isDestroyed) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          resultText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          resultText += item.formatString + ": " + item.text + "\n"; // output the decoded barcode text
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) resultText += "No barcode found\n";
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  onMount(() => {
    // onBeforeUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed = true;
      if (pCvRouter) {
        try {
          (await pCvRouter).dispose();
        } catch (_) {}
      }
    };
  });
</script>

<div class="image-capture-container">
  <div class="input-container">
    <input type="file" multiple on:change={captureImage} accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
  </div>
  <div class="result">{resultText}</div>
</div>

<style>
  .image-capture-container {
    width: 100%;
    height: 100%;
    font-family:
      Consolas,
      Monaco,
      Lucida Console,
      Liberation Mono,
      DejaVu Sans Mono,
      Bitstream Vera Sans Mono,
      Courier New,
      monospace;
  }

  .image-capture-container .input-container {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    margin: 0 auto;
  }

  .image-capture-container .result {
    margin-top: 20px;
    white-space: pre-wrap;
  }
</style>
