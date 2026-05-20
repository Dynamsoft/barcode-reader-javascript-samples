# DBR JavaScript Sample Creator — API Reference: SDK Loading & Core

**SDK version:** `dynamsoft-barcode-reader-bundle@11.4.2001`

---

## Loading the SDK

### UMD Bundle (Plain HTML, no build step)

```html
<!-- From CDN (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.js"></script>

<!-- Self-hosted (after downloading the package) -->
<!-- <script src="../dist/dbr.bundle.js"></script> -->
```

All classes are available as globals under the `Dynamsoft` namespace after the script loads.

### ES Module Bundle (HTML with `<script type="module">`)

```js
import {
  CoreModule,
  LicenseManager,
  CaptureVisionRouter,
  CapturedResultReceiver,
  CameraView,
  CameraEnhancer,
  MultiFrameResultCrossFilter,
  EnumCapturedResultItemType,
} from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.mjs";

// Required when using the CDN .mjs bundle — tells the SDK where to fetch WASM and resources
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
```

### npm Package (Frameworks: React, Vue, Angular, Next.js, etc.)

```bash
npm install dynamsoft-barcode-reader-bundle
```

```ts
import {
  CoreModule,
  LicenseManager,
  CaptureVisionRouter,
  CapturedResultReceiver,
  CameraView,
  CameraEnhancer,
  MultiFrameResultCrossFilter,
  EnumCapturedResultItemType,
  BarcodeResultItem,
} from "dynamsoft-barcode-reader-bundle";

// Required when loading WASM resources from CDN (default for framework projects)
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
```

---

## Namespace Map (UMD → ES Module)

| UMD Global | ES Module / npm Named Export |
|---|---|
| `Dynamsoft.License.LicenseManager` | `LicenseManager` |
| `Dynamsoft.Core.CoreModule` | `CoreModule` |
| `Dynamsoft.Core.EnumCapturedResultItemType` | `EnumCapturedResultItemType` |
| `Dynamsoft.CVR.CaptureVisionRouter` | `CaptureVisionRouter` |
| `Dynamsoft.CVR.CapturedResultReceiver` | `CapturedResultReceiver` |
| `Dynamsoft.DCE.CameraView` | `CameraView` |
| `Dynamsoft.DCE.CameraEnhancer` | `CameraEnhancer` |
| `Dynamsoft.Utility.MultiFrameResultCrossFilter` | `MultiFrameResultCrossFilter` |

---

## LicenseManager

```ts
LicenseManager.initLicense(license: string): void
```

- **Must be called before any other SDK API.** Call it synchronously (no `await`) at the top of your script.
- The default public trial license is `"DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9"` — valid for 24 hours, requires internet.
- Users can get their own 30-day trial at: `https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js`

```js
// UMD
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

// ES module / npm
LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
```

---

## CoreModule

```ts
// Set WASM resource root — required for ES module / npm usage
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

// Optionally preload WASM to reduce latency on first decode
CoreModule.loadWasm(): Promise<void>
```

`loadWasm()` is optional. If called, it preloads the WebAssembly modules in the background. The SDK
will load them automatically on first use if not preloaded.

---

## EnumCapturedResultItemType

Used to identify the type of items in `CapturedResult.items`:

```ts
EnumCapturedResultItemType.CRIT_BARCODE   // = 2 — barcode result items
EnumCapturedResultItemType.CRIT_TEXT_LINE // text line items (not used for DBR)
```

---

## Preset Template Strings

Pass these strings to `cvRouter.startCapturing()` or `cvRouter.capture()`:

| String | Description |
|---|---|
| `"ReadBarcodes_SpeedFirst"` | Optimized for speed — best for real-time camera |
| `"ReadBarcodes_ReadRateFirst"` | Optimized for accuracy — best for image decoding |
| `"ReadSingleBarcode"` | Stops after one barcode found — best for single-scan UI |
| `"ReadBarcodes_Balance"` | Balanced between speed and accuracy |

---

## Custom JSON Template Structure

```json
{
  "CaptureVisionTemplates": [
    {
      "Name": "MyTemplate",
      "ImageROIProcessingNameArray": ["ROI_main"],
      "Timeout": 1000
    }
  ],
  "TargetROIDefOptions": [
    {
      "Name": "ROI_main",
      "TaskSettingNameArray": ["Task_main"]
    }
  ],
  "BarcodeReaderTaskSettingOptions": [
    {
      "Name": "Task_main",
      "BarcodeFormatIds": ["BF_QR_CODE"],
      "ExpectedBarcodesCount": 1
    }
  ],
  "ImageParameterOptions": [
    {
      "Name": "ip",
      "ApplicableStages": []
    }
  ]
}
```

Load and use:
```js
await cvRouter.initSettings("./template.json");   // or pass JSON string
await cvRouter.startCapturing("MyTemplate");       // use template name from JSON
```
