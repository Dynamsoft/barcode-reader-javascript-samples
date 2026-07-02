# DBR JavaScript Sample Creator — API Reference: SDK Loading & Core

**SDK version:** `dynamsoft-barcode-reader-bundle@11.4.3000`

---

## Loading the SDK

### UMD Bundle (Plain HTML, no build step)

```html
<!-- From CDN (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.3000/dist/dbr.bundle.js"></script>

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
} from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.3000/dist/dbr.bundle.mjs";

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
| `"ReadSingleBarcode"` | Quickly scans a single barcode |
| `"ReadBarcodes_Balance"` | Balanced between speed and accuracy |
| `"ReadDenseBarcodes"` | Specialized in reading barcodes with high information density |
| `"ReadDistantBarcodes"` | Capable of reading barcodes from extended distances |

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

**In framework projects (Next.js, React, etc.):** place the template JSON in `public/` so it's
served at a URL. Then reference it as `"/MyTemplate.json"` (absolute path from web root).

Custom template names also work with `cvRouter.capture()` for image decoding:
```js
const result = await cvRouter.capture(file, "MyTemplate"); // uses the custom template
```

---

## BarcodeFormatIds Reference

Use these strings in custom template JSON (`BarcodeFormatIds` array) or with `SimplifiedBarcodeReaderSettings`.

### Common 1D Formats

| Format ID | Description |
|---|---|
| `BF_CODE_128` | Code 128 |
| `BF_CODE_39` | Code 39 |
| `BF_CODE_93` | Code 93 |
| `BF_CODABAR` | Codabar |
| `BF_ITF` | Interleaved 2 of 5 |
| `BF_EAN_13` | EAN-13 |
| `BF_EAN_8` | EAN-8 |
| `BF_UPC_A` | UPC-A |
| `BF_UPC_E` | UPC-E |
| `BF_INDUSTRIAL_25` | Industrial 2 of 5 |
| `BF_CODE_39_EXTENDED` | Code 39 Extended |
| `BF_CODE_11` | Code 11 |
| `BF_MSI_CODE` | MSI Code |
| `BF_CODE_32` | Code 32 |

### Common 2D Formats

| Format ID | Description |
|---|---|
| `BF_QR_CODE` | QR Code |
| `BF_PDF417` | PDF417 |
| `BF_DATAMATRIX` | DataMatrix |
| `BF_AZTEC` | Aztec |
| `BF_MICRO_QR` | Micro QR Code |
| `BF_MICRO_PDF417` | Micro PDF417 |
| `BF_MAXICODE` | MaxiCode |
| `BF_DOTCODE` | DotCode |
| `BF_PATCHCODE` | Patch Code |
| `BF_GS1_COMPOSITE` | GS1 Composite Code |

### GS1 DataBar Formats

| Format ID | Description |
|---|---|
| `BF_GS1_DATABAR_OMNIDIRECTIONAL` | GS1 DataBar Omnidirectional |
| `BF_GS1_DATABAR_TRUNCATED` | GS1 DataBar Truncated |
| `BF_GS1_DATABAR_STACKED` | GS1 DataBar Stacked |
| `BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL` | GS1 DataBar Stacked Omnidirectional |
| `BF_GS1_DATABAR_EXPANDED` | GS1 DataBar Expanded |
| `BF_GS1_DATABAR_EXPANDED_STACKED` | GS1 DataBar Expanded Stacked |
| `BF_GS1_DATABAR_LIMITED` | GS1 DataBar Limited |

### Postal Formats

| Format ID | Description |
|---|---|
| `BF_USPSINTELLIGENTMAIL` | USPS Intelligent Mail |
| `BF_POSTNET` | Postnet |
| `BF_PLANET` | Planet |
| `BF_AUSTRALIANPOST` | Australian Post |
| `BF_RM4SCC` | Royal Mail 4-State |
| `BF_KIX` | KIX |

### Convenience Groups

| Format ID | Description |
|---|---|
| `BF_ALL` | All supported formats |
| `BF_ONED` | All 1D formats combined |
| `BF_GS1_DATABAR` | All GS1 DataBar formats combined |
| `BF_POSTALCODE` | All postal formats combined |
| `BF_DEFAULT` | Default set of formats |
| `BF_NULL` | No format (disable) |

### Common Format Presets for Templates

```json
// Retail 1D
"BarcodeFormatIds": ["BF_EAN_13", "BF_EAN_8", "BF_UPC_A", "BF_UPC_E"]

// Industrial 1D
"BarcodeFormatIds": ["BF_CODE_128", "BF_CODE_39", "BF_CODE_93", "BF_ITF", "BF_CODABAR"]

// General 2D
"BarcodeFormatIds": ["BF_QR_CODE", "BF_PDF417", "BF_DATAMATRIX"]

// Single format
"BarcodeFormatIds": ["BF_QR_CODE"]
```

---

## Dynamic Settings Modification

Read the current settings, modify them programmatically, and re-apply — useful for runtime
barcode format, text length, or regex filters:

```js
// 1. Get the current settings as a JSON object
const settings = await cvRouter.outputSettings("ReadBarcodes_SpeedFirst", true);

// 2. Modify barcode format filter
settings.BarcodeReaderTaskSettingOptions[0].BarcodeFormatIds = ["BF_QR_CODE", "BF_CODE_128"];

// 3. Modify text length filter
settings.BarcodeFormatSpecificationOptions[0].BarcodeTextLengthRangeArray = [
  { MinValue: 5, MaxValue: 50 }
];

// 4. Modify regex filter
settings.BarcodeFormatSpecificationOptions[0].BarcodeTextRegExPattern = "^[A-Z0-9]+$";

// 5. Re-apply the modified settings
await cvRouter.initSettings(settings);

// 6. Start capturing with the modified template name
await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
```

This approach works for both camera scanning (`startCapturing`) and image decoding (`capture`).
