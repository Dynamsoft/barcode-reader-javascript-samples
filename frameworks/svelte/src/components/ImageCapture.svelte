<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    EnumCapturedResultItemType,
    CaptureVisionRouter,
    type BarcodeResultItem
  } from "dynamsoft-barcode-reader-bundle";
  import "../dynamsoft.config"; // import side effects (license, engineResourcePath) within a component is beneficial for lazy loading.

  let pCvRouter: Promise<CaptureVisionRouter>;
  let resultText = "";

  const captureImage = async (e: Event) => {
    let files = [...(e.target! as HTMLInputElement).files!];
    (e.target! as HTMLInputElement).value = ""; // reset input
    resultText = "decoding...";

    try {
      const cvRouter = await pCvRouter;

      let _resultText = "";
      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
        const result = await cvRouter.capture(
          file,
          "ReadBarcodes_ReadRateFirst",
        );
        console.log(result);

        // Print file name if there's multiple files
        if (files.length > 1) {
          _resultText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          _resultText += item.formatString + ": " + item.text + "\n"; // output the decoded barcode text
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) _resultText += "No barcode found\n";
        resultText = _resultText;
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(ex);
      alert(errMsg);
    }
  };

  onMount(() => {
    pCvRouter = CaptureVisionRouter.createInstance();
  });

  onDestroy(() => {
    console.log("image capture component disposed");
    // If the browser supports FinalizationRegistry, cvRouter can implement automatic resource recycling, so the manual resource cleanup code below does not need to be written.
    pCvRouter?.then((cvRouter) => {
      cvRouter.dispose();
    });
  });
</script>

<div class="image-capture-container">
  <div class="input-container">
    <input
      type="file"
      multiple
      on:change={captureImage}
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
    />
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
