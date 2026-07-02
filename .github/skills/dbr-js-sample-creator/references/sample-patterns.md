# DBR JavaScript Sample Creator — Sample Patterns

Complete, copy-paste-ready code patterns from the existing samples in this repository.

---

## Pattern 1: Hello World — Continuous Camera Scanning (UMD, Plain HTML)

Source: `hello-world.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dynamsoft Barcode Scanner Sample - Hello World (Decode via Camera)</title>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.3000/dist/dbr.bundle.js"></script>
</head>
<body>
  <h1 class="barcode-scanner-title">Hello World (Scan Barcode via Camera)</h1>
  <div class="barcode-scanner-view" style="width: 100%; height: 70vh;"></div>
  <div class="result-view" style="width: 100%; height: calc(30vh - 80px); padding: 10px; overflow: auto;"></div>

  <script>
    const resultView = document.querySelector(".result-view");

    Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
    (async () => {
      const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
      const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
      const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

      cvRouter.setInput(cameraEnhancer);

      const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (result) => {
        resultView.innerHTML = "";
        for (let item of result.barcodeResultItems) {
          const div = document.createElement("div");
          div.innerHTML = `format: ${item.formatString}<br> text: ${item.text} <br> ------------------`;
          resultView.append(div);
        }
      };
      await cvRouter.addResultReceiver(resultReceiver);

      const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      document.querySelector(".barcode-scanner-view").append(cameraView.getUIElement());
      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    })();
  </script>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; }
    .barcode-scanner-title { height: 80px; text-align: center; font-size: 20px; padding: 20px 0; }
    .barcode-scanner-view { width: 100%; height: calc(100% - 80px); }
  </style>
</body>
</html>
```

---

## Pattern 2: Scan a Single Barcode (stop-on-first)

Source: `scan-a-single-barcode.html`

Key differences from Pattern 1:
- Shows a scan button; camera is hidden until button clicked.
- Stops after the first barcode is found and alerts the text.
- Uses `"ReadSingleBarcode"` template.

```html
<button class="scan-btn" onclick="startScan()">scan</button>
<div class="barcode-scanner-view"></div>

<script>
  Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
  const pInit = (async () => {
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
    const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

    cvRouter.setInput(cameraEnhancer);

    const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = async (result) => {
      alert(result.barcodeResultItems[0].text);
      await cameraEnhancer.close();
      await cvRouter.stopCapturing();
      document.querySelector(".barcode-scanner-view").style.display = "none";
      document.querySelector(".scan-btn").style.display = "block";
    };
    await cvRouter.addResultReceiver(resultReceiver);

    document.querySelector(".barcode-scanner-view").append(cameraView.getUIElement());
    return { cameraEnhancer, cvRouter };
  })();

  const startScan = async () => {
    document.querySelector(".barcode-scanner-view").style.display = "block";
    document.querySelector(".scan-btn").style.display = "none";
    const { cameraEnhancer, cvRouter } = await pInit;
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  };
  startScan();
</script>
```

---

## Pattern 3: Read Barcodes from Image File

Source: `read-an-image.html`

```html
<input id="input-file" type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
<span id="decoding" style="display: none;">Decoding...</span>
<div id="results"></div>

<script>
  /** LICENSE ALERT - README
   * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
   * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js
   * to get your own trial license good for 30 days.
   * LICENSE ALERT - THE END
   */
  Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

  const resultsContainer = document.querySelector("#results");
  const pInit = (async () => {
    const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    return { cvRouter };
  })();

  document.querySelector("#input-file").addEventListener("change", async function (e) {
    let file = e.target.files[0];
    this.value = "";
    resultsContainer.innerText = "";
    try {
      document.querySelector("#decoding").style.display = "inline";
      const { cvRouter } = await pInit;
      const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
      const barcodeResultItems = result.decodedBarcodesResult?.barcodeResultItems;

      if (!barcodeResultItems) {
        resultsContainer.innerText += "No barcode found\n";
        return;
      }
      for (let item of barcodeResultItems) {
        resultsContainer.innerText += item.text + "\n";
      }
    } catch (ex) {
      alert(ex.message || ex);
    } finally {
      document.querySelector("#decoding").style.display = "none";
    }
  });
</script>
```

---

## Pattern 4: ES6 Module (import from CDN .mjs)

Source: `frameworks/es6/es6.html`

```html
<script type="module">
  import {
    CoreModule, LicenseManager, CaptureVisionRouter,
    CameraView, CameraEnhancer, MultiFrameResultCrossFilter,
  } from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.3000/dist/dbr.bundle.mjs";

  LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
  CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
  CoreModule.loadWasm();

  (async function () {
    try {
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      document.querySelector("#camera-view-container").append(cameraView.getUIElement());

      const cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      await cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;
          const resultsContainer = document.querySelector("#results");
          resultsContainer.textContent = "";
          for (let item of result.barcodeResultItems) {
            resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
          }
        },
      });

      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification("barcode", true);
      filter.enableResultDeduplication("barcode", true);
      await cvRouter.addResultFilter(filter);

      await cameraEnhancer.open();
      cameraView.setScanLaserVisible(true);
      await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    } catch (ex) {
      alert(ex.message || ex);
    }
  })();
</script>
```

---

## Pattern 5: Custom JSON Template (Scan QR Codes Only)

Source: `scenarios/scan-qr-code/`

Load a custom template JSON and use it by name:

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
(async () => {
  try {
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
    const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

    cvRouter.setInput(cameraEnhancer);

    const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = (result) => {
      for (let item of result.barcodeResultItems) {
        console.log(item.formatString, item.text);
      }
    };
    await cvRouter.addResultReceiver(resultReceiver);

    // Load custom template from JSON file, then use the template name from the JSON
    await cvRouter.initSettings("./ReadQR.json");

    document.querySelector(".barcode-scanner-view").append(cameraView.getUIElement());
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadQR"); // name matches the template in ReadQR.json
  } catch (ex) {
    alert(ex.message || ex);
  }
})();
```

Minimal custom JSON template to read only QR codes:
```json
{
  "CaptureVisionTemplates": [
    { "Name": "ReadQR", "ImageROIProcessingNameArray": ["ROI_QR"], "Timeout": 1000 }
  ],
  "TargetROIDefOptions": [
    { "Name": "ROI_QR", "TaskSettingNameArray": ["Task_QR"] }
  ],
  "BarcodeReaderTaskSettingOptions": [
    { "Name": "Task_QR", "BarcodeFormatIds": ["BF_QR_CODE"], "ExpectedBarcodesCount": 1 }
  ]
}
```

---

## Pattern 6: React VideoCapture (npm, TypeScript)

Source: `frameworks/react/src/components/VideoCapture/VideoCapture.tsx`

See full code in `references/api-frameworks.md` → "React → VideoCapture Component".

**Critical React-specific rules:**
- Use `useEffect` with a cleanup return function.
- Set `isDestroyed = true` in the cleanup, check it after every `await`.
- Create a `pInit` Promise before the async IIFE; resolve it at the end of the IIFE.
- In cleanup, `await pInit` before calling `dispose()` to avoid disposing mid-init.
- Use `useRef` for the camera container DOM element.

---

## Pattern 7: React ImageCapture (npm, TypeScript)

Source: `frameworks/react/src/components/ImageCapture/ImageCapture.tsx`

See full code in `references/api-frameworks.md` → "React → ImageCapture Component".

**Critical points:**
- Use a `useRef<Promise<CaptureVisionRouter> | null>(null)` to lazily create and cache the router.
- Reset `this.value = ""` on the file input so the same file can be re-selected.
- Use `EnumCapturedResultItemType.CRIT_BARCODE` to filter `result.items`.

---

## Pattern 8: Vue 3 VideoCapture (npm, TypeScript)

Source: `frameworks/vue/src/components/VideoCapture.vue`

See full code in `references/api-frameworks.md` → "Vue 3 → VideoCapture Component".

**Key Vue differences vs React:**
- `onMounted` replaces `useEffect`, `onBeforeUnmount` replaces the cleanup return.
- Module-level `let isDestroyed = false` (not a ref) — works because Vue components are instances.
- `resultText` is a `ref("")` — access/set via `.value`.
- Camera container is a template ref: `const cameraViewContainer = ref<HTMLElement | null>(null)`.
- Access DOM via `cameraViewContainer.value!.append(...)`.

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Calling `await LicenseManager.initLicense(...)` | Remove `await` — it's synchronous |
| Creating `CaptureVisionRouter` inside event handlers | Create once at init, reuse |
| Forgetting `isDestroyed` check after `await` in React | Add check after every `await` in component |
| Using `document.querySelector` inside Vue/React components | Use refs instead |
| Not resetting `e.target.value = ""` on file input | Reset so same file can be re-selected |
| Not calling `cameraView.getUIElement()` and appending to DOM | Required before `open()` |
| Calling `startCapturing` before `setInput` | Always `setInput` first |
| Forgetting `CoreModule.engineResourcePaths.rootDirectory` in npm/ES module projects | Add to `dynamsoft.config.ts` |
