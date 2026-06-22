---
name: dbr-js-sample-creator
description: >
  Use when creating JavaScript, TypeScript, or HTML sample code using the Dynamsoft Barcode Reader
  SDK (dynamsoft-barcode-reader-bundle npm package or CDN). This skill covers all web barcode
  scanning use cases including live camera scanning, image file decoding, single-barcode scanning,
  QR codes, 1D barcodes, DataMatrix, PDF417, DPM, and framework integrations (React, Vue, Angular,
  Next.js, Nuxt, Svelte, Electron, Capacitor, Blazor, PWA, ES6 modules, plain HTML).
  Use this skill whenever the user mentions Dynamsoft Barcode Reader JavaScript, DBR JS,
  dynamsoft-barcode-reader-bundle, CaptureVisionRouter in the browser, barcode scanning with
  Dynamsoft in a web app, or wants to create a JavaScript/TypeScript sample that scans or decodes
  barcodes.
---

# DBR JavaScript Sample Creator

This skill helps you write JavaScript/TypeScript/HTML sample code using the
`dynamsoft-barcode-reader-bundle` SDK (version **11.4.2001**). The SDK can be loaded via CDN
(no build step) or installed as an npm package for framework projects.

## Before You Start

Read the reference files in `references/` based on the task at hand:

| Reference file | When to read |
|---|---|
| `references/api-sdk.md` | Always — SDK loading, namespaces, CoreModule, LicenseManager |
| `references/api-camera.md` | When the task involves live camera/video scanning |
| `references/api-image.md` | When the task involves decoding image files or file uploads |
| `references/api-frameworks.md` | When the task targets React, Vue, Angular, Next.js, or other frameworks |
| `references/api-parsing.md` | When the task involves parsing barcode content (GS1, driver's license, VIN) |
| `references/sample-patterns.md` | Always — canonical patterns from existing samples; copy-paste ready |

## SDK Architecture

The SDK follows a **pipeline architecture** centered on `CaptureVisionRouter`:

```
Image/Camera Input → CaptureVisionRouter (with template) → CapturedResult
                                                             └── barcodeResultItems[]
```

**Key classes:**
- **`LicenseManager.initLicense(key)`** — Must be called before any other SDK API.
- **`CaptureVisionRouter`** — Central orchestrator. Processes images and video frames.
- **`CameraView` + `CameraEnhancer`** — Camera UI and control. Feed into `cvRouter.setInput()`.
- **`CapturedResultReceiver`** — Subscribe to async results from continuous scanning.
- **`MultiFrameResultCrossFilter`** — Deduplication and cross-verification across frames.

## SDK Loading Methods

### Method 1: CDN UMD bundle (plain HTML, no build step)

```html
<!-- Barcode-only bundle (smaller) -->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.js"></script>

<!-- Full DCV bundle (includes ImageEditorView, QuadDrawingItem, DrawingLayer) -->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-bundle@3.4.2001/dist/dcv.bundle.js"></script>
```

Use `dcv.bundle.js` when the sample needs `ImageEditorView` (image display with barcode highlight
overlays). Use `dbr.bundle.js` for simpler samples that only need camera scanning or basic file decode.
Both bundles expose the same `Dynamsoft.*` namespace — switching between them only changes the script tag.

All APIs are on the global `Dynamsoft` object:
- `Dynamsoft.License.LicenseManager`
- `Dynamsoft.CVR.CaptureVisionRouter`, `Dynamsoft.CVR.CapturedResultReceiver`
- `Dynamsoft.DCE.CameraView`, `Dynamsoft.DCE.CameraEnhancer`
- `Dynamsoft.DCE.ImageEditorView`, `Dynamsoft.DCE.QuadDrawingItem` *(dcv.bundle only as of v11.4; expected in dbr.bundle v11.6+)*
- `Dynamsoft.Utility.MultiFrameResultCrossFilter`
- `Dynamsoft.Core.CoreModule`, `Dynamsoft.Core.EnumCapturedResultItemType`

### Method 2: CDN ES module (`<script type="module">`)

```js
import {
  CoreModule, LicenseManager, CaptureVisionRouter,
  CameraView, CameraEnhancer, MultiFrameResultCrossFilter,
} from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.mjs";

CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
```

### Method 3: npm package (React, Vue, Angular, Next.js, etc.)

```bash
npm install dynamsoft-barcode-reader-bundle
```

```ts
import {
  CoreModule, LicenseManager, CaptureVisionRouter, CameraView, CameraEnhancer,
  MultiFrameResultCrossFilter, EnumCapturedResultItemType, BarcodeResultItem,
} from "dynamsoft-barcode-reader-bundle";

CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
```

## License Initialization

**Always call `initLicense()` before any other SDK API.** It is synchronous (non-blocking) — do
not await it.

**License string priority:** Default hard-coded license string is `"DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9"`

**Required comment block** to accompany every license call:

```js
/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js
 * to get your own trial license good for 30 days.
 * LICENSE ALERT - THE END
 */
LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9");
```

For the CDN UMD bundle, use the global:

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9");
```

## Preset Templates

| Template string | Use for |
|---|---|
| `"ReadBarcodes_SpeedFirst"` | Continuous camera scanning (speed optimized) |
| `"ReadBarcodes_ReadRateFirst"` | Image file decoding (accuracy optimized) |
| `"ReadSingleBarcode"` | Stop after first barcode is detected |
| `"ReadBarcodes_Balance"` | Balanced speed and accuracy |

Custom templates are loaded with:
```js
await cvRouter.initSettings("./template.json"); // URL
await cvRouter.initSettings(jsonString);        // JSON string
// then use the template name from the JSON:
await cvRouter.startCapturing("MyTemplateName");
```

## Camera Scanning Pattern (UMD)

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9");
(async () => {
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

  const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
  filter.enableResultCrossVerification("barcode", true);
  filter.enableResultDeduplication("barcode", true);
  await cvRouter.addResultFilter(filter);

  document.querySelector(".camera-view").append(cameraView.getUIElement());
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
})();
```

## Image/File Capture Pattern (UMD)

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9");
const pInit = (async () => {
  const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
  return { cvRouter };
})();

document.querySelector("#input-file").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  const { cvRouter } = await pInit;
  const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
  const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];
  for (let item of items) {
    console.log(item.formatString, item.text);
  }
});
```

## Result Access Patterns

**From `CapturedResultReceiver` (camera/continuous):**
```js
resultReceiver.onDecodedBarcodesReceived = (result) => {
  result.barcodeResultItems  // BarcodeResultItem[] — direct array
};
```

**From `cvRouter.capture()` (image):**
```js
const result = await cvRouter.capture(file, template);
// Preferred:
result.decodedBarcodesResult?.barcodeResultItems
// Alternative (filter by type):
result.items.filter(i => i.type === EnumCapturedResultItemType.CRIT_BARCODE)
```

**`BarcodeResultItem` properties:**
- `item.text` — decoded text string
- `item.formatString` — barcode format name (e.g., `"QR_CODE"`, `"CODE_128"`)
- `item.format` — numeric format enum value
- `item.location` — quadrilateral (4 corner points)

## Framework Config File Pattern

For npm-based frameworks, isolate SDK setup in a dedicated `dynamsoft.config.ts`:

```ts
// dynamsoft.config.ts
import { CoreModule, LicenseManager } from "dynamsoft-barcode-reader-bundle";

CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js
 * to get your own trial license good for 30 days.
 * LICENSE ALERT - THE END
 */
LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTEwNTI2NzQwMSJ9");

// Optional: preload WASM to reduce latency on first decode
CoreModule.loadWasm();
```

Import as a side effect at the app entry or component level:
```ts
import "./dynamsoft.config";
```

## Cleanup / Disposal

Always dispose resources to prevent memory leaks (especially important in SPA frameworks):

```js
cvRouter?.dispose();
cameraEnhancer?.dispose();
```

For camera, also stop before disposing:
```js
await cvRouter.stopCapturing();
await cameraEnhancer.close();
```

## Code Style Conventions

Follow these conventions to produce code consistent with existing samples:

- `initLicense()` is called synchronously before any `await`, at the top level
- `CoreModule.engineResourcePaths.rootDirectory` set before any SDK use (ES module / npm contexts)
- Use `async/await` with `try { ... } catch (ex) { alert(ex.message || ex); }`
- In React/Vue/Angular: guard every `await` with an `isDestroyed` flag check
- Camera container sized: `style="width: 100%; height: 70vh"`
- Use `cameraView.setScanLaserVisible(true)` for all camera scanning samples
- Clear results container before each new result set
- For plain HTML camera samples, UMD global syntax (`Dynamsoft.DCE.*`, `Dynamsoft.CVR.*`, etc.)
- For ES6 module samples, use named imports from the `.mjs` bundle
- For framework samples, use named imports from the npm package with a `dynamsoft.config.ts` file
