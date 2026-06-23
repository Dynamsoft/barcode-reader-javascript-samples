# DBR JavaScript Sample Creator — API Reference: Code Parsing (GS1, Driver's License, VIN)

The `dynamsoft-code-parser-bundle` or `dynamsoft-barcode-reader-bundle` includes a **CodeParser**
module that extracts structured fields from barcode content — e.g., GS1 Application Identifiers,
AAMVA driver's license fields, or VIN components.

---

## When to Use CodeParser

Use CodeParser when you need to **parse the decoded barcode text** into structured fields:

| Use case | Spec to load | Template |
|---|---|---|
| GS1 barcodes (retail, logistics) | `"GS1_AI"` | `"ReadAndParseGS1"` or custom |
| US/Canada driver's license (PDF417) | `"AAMVA_DL_ID"` | `"ReadAndParseDriversLicense"` or custom |
| South Africa driver's license | `"SOUTH_AFRICA_DL"` | custom |
| Vehicle Identification Number | `"VIN"` | `"ReadAndParseVIN"` or custom |

---

## Loading Parser Specifications

Load specs **before** creating the CodeParser instance. This is typically done alongside
`CoreModule.loadWasm()` in your initialization:

```js
// UMD
Dynamsoft.DCP.CodeParserModule.loadSpec("GS1_AI");

// ES module / npm
import { CodeParserModule } from "dynamsoft-barcode-reader-bundle";
CodeParserModule.loadSpec("GS1_AI");

// Load multiple specs at once
CodeParserModule.loadSpec(["AAMVA_DL_ID", "VIN"]);
```

In `dynamsoft.config.ts` for framework projects:

```ts
import { CoreModule, LicenseManager, CodeParserModule } from "dynamsoft-barcode-reader-bundle";

CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";
LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

CoreModule.loadWasm();
CodeParserModule.loadSpec("GS1_AI");
```

---

## CodeParser API

```ts
// Create a parser instance
const parser = await CodeParser.createInstance();
// (UMD: await Dynamsoft.DCP.CodeParser.createInstance())

// Parse barcode content — accepts string, Uint8Array, or number[]
const parsedItem = await parser.parse(barcodeItem.bytes);
// or: await parser.parse(barcodeItem.text);

// Access parsed result
parsedItem.codeType       // string — e.g., "GS1_AI", "AAMVA_DL_ID", "VIN"
parsedItem.jsonString     // string — full parsed result as JSON
parsedItem.getFieldValue("fieldName")  // string — get a specific field value

// Dispose when done
parser.dispose();
```

### Parsing from Bytes vs Text

- **`barcodeItem.bytes`** (Uint8Array) — preferred; preserves raw data including non-printable
  characters and GS separators.
- **`barcodeItem.text`** (string) — works for most cases but may lose binary data.

---

## GS1 Parsing Pattern (UMD)

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
Dynamsoft.DCP.CodeParserModule.loadSpec("GS1_AI");

(async () => {
  const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
  const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
  const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
  const parser = await Dynamsoft.DCP.CodeParser.createInstance();

  cvRouter.setInput(cameraEnhancer);

  const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
  resultReceiver.onDecodedBarcodesReceived = async (result) => {
    if (!result.barcodeResultItems.length) return;

    for (let item of result.barcodeResultItems) {
      try {
        const parsed = await parser.parse(item.bytes);
        console.log("Code type:", parsed.codeType);
        console.log("Parsed JSON:", parsed.jsonString);

        // Access individual fields
        const parsedObj = JSON.parse(parsed.jsonString);
        for (let field of Object.keys(parsedObj)) {
          console.log(`${field}: ${parsedObj[field]}`);
        }
      } catch (ex) {
        // Not a parseable format — display raw text
        console.log("Raw:", item.formatString, item.text);
      }
    }
  };
  await cvRouter.addResultReceiver(resultReceiver);

  document.querySelector("#camera-container").append(cameraView.getUIElement());
  await cameraEnhancer.open();
  await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
})();
```

---

## Driver's License Parsing Pattern

```js
Dynamsoft.DCP.CodeParserModule.loadSpec("AAMVA_DL_ID");

// ... (camera setup same as above)

resultReceiver.onDecodedBarcodesReceived = async (result) => {
  if (!result.barcodeResultItems.length) return;

  for (let item of result.barcodeResultItems) {
    // Driver's licenses are typically PDF417 barcodes
    if (item.formatString !== "PDF_417") continue;

    try {
      const parsed = await parser.parse(item.bytes);
      const data = JSON.parse(parsed.jsonString);

      // Common AAMVA fields
      console.log("Name:", data.lastName, data.firstName);
      console.log("DOB:", data.dateOfBirth);
      console.log("License #:", data.licenseNumber);
      console.log("Expiry:", data.expirationDate);
      console.log("State:", data.jurisdictionCode);
    } catch (ex) {
      console.log("Parse failed — raw text:", item.text);
    }
  }
};
```

---

## Using onParsedResultsReceived (Alternative)

Instead of manually calling `parser.parse()`, you can use a template that includes parsing
and receive parsed results through `onParsedResultsReceived`:

```js
const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();

// Barcode results
resultReceiver.onDecodedBarcodesReceived = (result) => {
  for (let item of result.barcodeResultItems) {
    console.log("Barcode:", item.formatString, item.text);
  }
};

// Parsed results (from templates that include parsing)
resultReceiver.onParsedResultsReceived = (result) => {
  if (!result.parsedResultItems?.length) return;
  for (let item of result.parsedResultItems) {
    console.log("Parsed:", item.codeType, item.jsonString);
  }
};

await cvRouter.addResultReceiver(resultReceiver);
```

---

## Disposal

```js
parser?.dispose();
// Plus the usual cvRouter and cameraEnhancer disposal
```
