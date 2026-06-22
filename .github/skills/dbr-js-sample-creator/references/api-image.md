# DBR JavaScript Sample Creator — API Reference: Image / File Capture

---

## CaptureVisionRouter.capture()

Decodes barcodes from a single image synchronously (returns a Promise).

```ts
const result = await cvRouter.capture(source, template);
```

**`source` accepts:**
- `File` — from `<input type="file">`
- `Blob` — binary data blob
- `string` — URL to an image file
- `HTMLImageElement` — an `<img>` DOM element
- `HTMLCanvasElement` — a canvas element
- `HTMLVideoElement` — a video frame

**`template`** — preset string or custom template name (see `api-sdk.md`).

For image files, use `"ReadBarcodes_ReadRateFirst"` (accuracy-first) unless speed matters more.

---

## CapturedResult (from `capture()`)

```ts
const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");

// Access barcode results — preferred approach
const barcodeItems = result.decodedBarcodesResult?.barcodeResultItems ?? [];

// Alternative: iterate result.items and filter by type
for (let item of result.items) {
  if (item.type !== EnumCapturedResultItemType.CRIT_BARCODE) continue;
  const barcodeItem = item as BarcodeResultItem; // TypeScript
  console.log(barcodeItem.formatString, barcodeItem.text);
}

// Error info
result.errorCode    // 0 = success
result.errorString  // description
```

---

## BarcodeResultItem Properties

```ts
item.text           // string — decoded barcode content
item.formatString   // string — e.g., "QR_CODE", "CODE_128", "EAN_13", "PDF_417"
item.format         // number — numeric format enum (EnumBarcodeFormat)
item.location       // Quadrilateral — four corner points of the barcode
item.location.points  // [Point, Point, Point, Point]
item.confidence     // number — confidence score (0–100)
```

---

## Handling No Results

Always check for empty results to give feedback to the user:

```js
const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];
if (!items.length) {
  outputDiv.innerText = "No barcode found";
  return;
}
```

---

## File Input Pattern (Plain HTML)

```html
<input id="input-file" type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
<span id="decoding" style="display:none;">Decoding...</span>
<div id="results"></div>

<script>
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

const pInit = (async () => {
  const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
  return { cvRouter };
})();

document.querySelector("#input-file").addEventListener("change", async function (e) {
  let file = e.target.files[0];
  this.value = ""; // reset so same file can be re-selected
  document.querySelector("#results").innerText = "";

  try {
    document.querySelector("#decoding").style.display = "inline";
    const { cvRouter } = await pInit;
    const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
    const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];

    if (!items.length) {
      document.querySelector("#results").innerText = "No barcode found";
      return;
    }
    for (let item of items) {
      document.querySelector("#results").innerText += item.text + "\n";
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

## Multiple File Decoding

```js
document.querySelector("#input-file").addEventListener("change", async function (e) {
  const files = [...e.target.files];
  this.value = "";
  resultsDiv.innerText = "";

  const { cvRouter } = await pInit;

  for (let file of files) {
    if (files.length > 1) resultsDiv.innerText += `\n${file.name}:\n`;

    const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
    const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];

    if (!items.length) {
      resultsDiv.innerText += "No barcode found\n";
      continue;
    }
    for (let item of items) {
      resultsDiv.innerText += `${item.formatString}: ${item.text}\n`;
    }
  }
});
```

---

## Creating `CaptureVisionRouter` Once vs Per-Request

**Create once, reuse for every decode** — router creation is expensive:

```js
// Good: create once, use many times
const pInit = CaptureVisionRouter.createInstance();

async function decodeFile(file) {
  const cvRouter = await pInit;
  return cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
}
```

**In React/Vue:** use a ref to hold the pending promise and check `isDestroyed` before use:

```ts
// React
let pCvRouter = useRef<Promise<CaptureVisionRouter> | null>(null);
const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());

// Vue
let pCvRouter: Promise<CaptureVisionRouter>;
const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
```

---

## Disposal (Image Capture)

For image-only workflows (no camera), dispose the router in component teardown:

```ts
// React
useEffect(() => {
  return () => {
    isDestroyed.current = true;
    pCvRouter.current?.then(r => r.dispose()).catch(() => {});
  };
}, []);

// Vue
onBeforeUnmount(async () => {
  isDestroyed = true;
  if (pCvRouter) {
    try { (await pCvRouter).dispose(); } catch (_) {}
  }
});
```

---

## ImageEditorView — Display Image with Barcode Highlights

`ImageEditorView` displays a static image with drawing layers for barcode location overlays.
It handles all coordinate mapping internally — no manual canvas math needed.

### Availability

`ImageEditorView` is **not included** in `dynamsoft-barcode-reader-bundle` (dbr.bundle.js) as of v11.4.
Use `dynamsoft-capture-vision-bundle` (dcv.bundle.js) instead — it includes the full DCE module.
Expected to be added back to `dbr.bundle` in v11.6+.

```html
<!-- Required for ImageEditorView -->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-bundle@3.4.2001/dist/dcv.bundle.js"></script>
```

### Setup

```js
// UMD (requires dcv.bundle.js)
const imageEditorView = await Dynamsoft.DCE.ImageEditorView.createInstance();
document.querySelector("#editor-container").append(imageEditorView.getUIElement());

// ES module / npm (requires dynamsoft-capture-vision-bundle)
import { ImageEditorView } from "dynamsoft-capture-vision-bundle";
const imageEditorView = await ImageEditorView.createInstance();
```

### Display an Image

`setOriginalImage()` accepts `DSImageData`, `HTMLCanvasElement`, or `HTMLImageElement`:

```js
// From an HTMLImageElement (e.g., loaded from a File via object URL)
const img = new Image();
img.src = URL.createObjectURL(file);
img.onload = () => imageEditorView.setOriginalImage(img);

// From a camera frame
const frame = cameraEnhancer.fetchImage(); // returns DSImageData
imageEditorView.setOriginalImage(frame);
```

### Draw Barcode Highlights

Use `QuadDrawingItem` with `item.location` directly from barcode results — the view
handles coordinate mapping automatically:

```js
const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];

const layer = imageEditorView.createDrawingLayer();
const quads = items.map(item => new Dynamsoft.DCE.QuadDrawingItem(item.location));
layer.addDrawingItems(quads);
```

To make highlights read-only (prevent dragging/resizing):

```js
await layer.setMode("viewer"); // "editor" (default) allows interaction, "viewer" is read-only
```

To clear highlights: `layer.clearDrawingItems();`

### Custom Drawing Styles

```js
const styleId = Dynamsoft.DCE.DrawingStyleManager.createDrawingStyle({
  strokeStyle: "rgba(0, 229, 0, 1)",  // green outline
  fillStyle: "rgba(0, 229, 0, 0.1)",  // translucent fill
  lineWidth: 3,
});
// Apply to all items on the layer
layer.setDefaultStyle(styleId);
```

### Typical Pattern — Decode File and Show Results

```js
// Decode
const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
const items = result.decodedBarcodesResult?.barcodeResultItems ?? [];

// Display image
const img = new Image();
img.src = URL.createObjectURL(file);
img.onload = () => {
  imageEditorView.setOriginalImage(img);
  // Draw barcode outlines
  const layer = imageEditorView.createDrawingLayer();
  layer.addDrawingItems(items.map(item => new Dynamsoft.DCE.QuadDrawingItem(item.location)));
};
```

### Cleanup

```js
imageEditorView.dispose();
```

---

## Accepted Image Formats

The SDK accepts the same formats as the browser's `<input type="file" accept="...">`:

```
.jpg, .jpeg, .png, .bmp, .gif, .svg, .webp, .ico
```

Use `accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"` on file inputs (matches existing samples).
