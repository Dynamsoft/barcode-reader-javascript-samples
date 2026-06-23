# DBR JavaScript Sample Creator — API Reference: Camera Scanning

---

## CameraView

Manages the camera preview UI (the visible video element and overlays).

```ts
// Create the camera UI element
const cameraView = await CameraView.createInstance();

// Get the DOM element to append to the page
const uiElement = cameraView.getUIElement(); // HTMLElement
document.querySelector("#camera-container").append(uiElement);

// Show/hide the scan laser line overlay
cameraView.setScanLaserVisible(true);  // true = show (default for camera samples)

// Hide the "Powered by Dynamsoft" overlay (optional)
// cameraView.setPowerByMessageVisible(false);
```

The `getUIElement()` must be appended to the DOM **before** calling `cameraEnhancer.open()`.

---

## CameraEnhancer

Controls the physical camera (open/close, switch cameras, zoom, etc.) and feeds frames to the SDK.

```ts
// Create linked to a CameraView
const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);

// Open the camera (starts video stream)
await cameraEnhancer.open();

// Close the camera
await cameraEnhancer.close();

// Dispose when no longer needed (releases resources)
cameraEnhancer.dispose();
```

### Camera Selection

```js
// List all available cameras
const cameras = await cameraEnhancer.getAllCameras();
// cameras = [{ deviceId: "...", label: "Front Camera" }, ...]

// Switch to a specific camera
await cameraEnhancer.selectCamera(cameras[1]);

// Get currently selected camera
const current = cameraEnhancer.getSelectedCamera();
```

### Resolution

```js
// Set resolution (before or after open)
await cameraEnhancer.setResolution({ width: 1920, height: 1080 });

// Get current resolution
const res = cameraEnhancer.getResolution(); // { width, height }
```

### Enhanced Features

> **License note:** Enhanced features (`EF_AUTO_ZOOM`, `EF_TAP_TO_FOCUS`) require a
> **DCE Advanced Features license**. Without it, the console shows "additional license required"
> and the features silently fail. Tip messages, `Feedback.beep()`, and all other CameraView/
> CameraEnhancer APIs work with a standard DBR license — no extra license needed.

```js
// Enable auto-zoom for distant barcodes
cameraEnhancer.enableEnhancedFeatures(Dynamsoft.DCE.EnumEnhancedFeatures.EF_AUTO_ZOOM);
// (ES module: import { EnumEnhancedFeatures } from "dynamsoft-barcode-reader-bundle")

// Disable auto-zoom
cameraEnhancer.disableEnhancedFeatures(Dynamsoft.DCE.EnumEnhancedFeatures.EF_AUTO_ZOOM);
```

Available enhanced features:

- `EF_AUTO_ZOOM` — automatically zooms in when a barcode is detected far away
- `EF_TAP_TO_FOCUS` — tap the camera view to focus

### Video Fit Mode

```js
// "contain" (default) or "cover"
cameraEnhancer.setVideoFit("cover");
```

### Single Frame Mode

Toggle between camera video and image upload input:

```js
cameraEnhancer.singleFrameMode = "image";    // show file picker instead of camera
cameraEnhancer.singleFrameMode = "disabled";  // back to camera video
```

> **Limitations:** `singleFrameMode` has minimal control over the decode UX — no spinner,
> no programmatic file picker trigger (requires user gesture chain), and
> `MultiFrameResultCrossFilter` may suppress results (cross-verification expects multiple
> frames but single-frame mode provides only one). For advanced image-decode UX (custom
> spinner, image preview with barcode highlights), prefer `cvRouter.capture()` with a
> hidden `<input type="file">` and `ImageEditorView` — see `api-image.md`.

### Coordinate Conversion

Convert barcode location points from video coordinates to page/viewport coordinates:

```js
// Convert to page coordinates (relative to document)
const pagePoint = cameraEnhancer.convertToPageCoordinates(item.location.points[0]);

// Convert to client coordinates (relative to viewport)
const clientPoint = cameraEnhancer.convertToClientCoordinates(item.location.points[0]);
```

Useful for positioning custom overlays (tooltips, labels) on top of detected barcodes.

---

## CaptureVisionRouter (camera usage)

```ts
const cvRouter = await CaptureVisionRouter.createInstance();

// Connect camera as the image source
cvRouter.setInput(cameraEnhancer);

// Start continuous capture using a template
await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");

// Stop continuous capture
await cvRouter.stopCapturing();

// Dispose when no longer needed
cvRouter.dispose();
```

---

## CapturedResultReceiver

Subscribe to async barcode results from continuous camera scanning.

### Option A: Object literal (preferred for simple cases)

```js
await cvRouter.addResultReceiver({
  onDecodedBarcodesReceived: (result) => {
    if (!result.barcodeResultItems.length) return;
    for (let item of result.barcodeResultItems) {
      console.log(item.formatString, item.text);
    }
  },
});
```

### Option B: `new CapturedResultReceiver()` instance (UMD / classic JS)

```js
const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
resultReceiver.onDecodedBarcodesReceived = (result) => {
  for (let item of result.barcodeResultItems) {
    console.log(item.formatString, item.text);
  }
};
await cvRouter.addResultReceiver(resultReceiver);
```

### `onDecodedBarcodesReceived` parameter: `DecodedBarcodesResult`

```ts
result.barcodeResultItems   // BarcodeResultItem[] — may be empty between frames
result.errorCode            // number — 0 means success
result.errorString          // string
```

Always guard with `if (!result.barcodeResultItems.length) return;` to skip empty callbacks.

---

## MultiFrameResultCrossFilter

Reduces noise by cross-verifying results across multiple frames and deduplicating repeated barcodes.

```js
const filter = new MultiFrameResultCrossFilter();
// (or: new Dynamsoft.Utility.MultiFrameResultCrossFilter() for UMD)

// Cross-verification: require a barcode to appear in multiple frames before reporting it
filter.enableResultCrossVerification("barcode", true);

// Deduplication: suppress the same barcode from being reported repeatedly
// Default: same barcode is suppressed for 3 seconds after first detection
filter.enableResultDeduplication("barcode", true);

// Change the deduplication time window (milliseconds)
// filter.setDuplicateForgetTime("barcode", 5000); // 5 seconds

await cvRouter.addResultFilter(filter);
```

Add the filter **after** `addResultReceiver` and **before** `startCapturing`.

> **Important:** The filter only applies to continuous camera scanning via `startCapturing()`.
> It does **not** affect `cvRouter.capture()` calls (single-image decode). However, if you
> use `singleFrameMode` (which still goes through the `startCapturing` pipeline),
> cross-verification may suppress results because it expects multiple frames but
> single-frame mode provides only one. Use `cvRouter.capture()` for reliable single-image
> decoding.

---

## Full Camera Sample: UMD (Plain HTML)

```js
Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");
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
  cameraView.setScanLaserVisible(true);
  await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
})();
```

---

## Single-Barcode Scan (stop-on-first) Pattern

Use `"ReadSingleBarcode"` template and stop/close after the first result:

```js
resultReceiver.onDecodedBarcodesReceived = async (result) => {
  if (!result.barcodeResultItems.length) return;
  const text = result.barcodeResultItems[0].text;
  alert(text);
  await cameraEnhancer.close();
  await cvRouter.stopCapturing();
  // Optionally hide the camera UI
};
```

---

## Initialization Order (Camera)

Always follow this exact sequence to avoid race conditions:

1. `LicenseManager.initLicense(key)` — synchronous, before any `await`
2. `CameraView.createInstance()` → `CameraEnhancer.createInstance(cameraView)`
3. `CaptureVisionRouter.createInstance()`
4. `cvRouter.setInput(cameraEnhancer)`
5. `cvRouter.addResultReceiver(...)` — subscribe before starting
6. `cvRouter.addResultFilter(...)` — optional
7. `cameraViewContainer.append(cameraView.getUIElement())` — mount UI to DOM
8. `cameraEnhancer.open()` — start video stream
9. `cameraView.setScanLaserVisible(true)` — optional visual indicator
10. `cvRouter.startCapturing(template)` — begin decoding

---

## Tip Messages

Show guidance text overlaid on the camera view (e.g., "Move closer to the barcode").
Methods are on `CameraView` (inherited from the abstract `View` class).

### TipConfig

```ts
interface TipConfig {
  topLeftPoint: { x: number; y: number }; // position of tip box
  width: number;                          // tip box width
  duration: number;                       // auto-hide after N milliseconds
  coordinateBase?: "view" | "image";      // coordinate system (default: "view")
}
```

### Methods

```js
// Configure tip position, size, and auto-hide duration
cameraView.setTipConfig({
  topLeftPoint: { x: 50, y: 50 },
  width: 200,
  duration: 3000,
});

// Get current config
const config = cameraView.getTipConfig();

// Show or hide the tip
cameraView.setTipVisible(true);
cameraView.setTipVisible(false);

// Check if visible
const visible = cameraView.isTipVisible();

// Update the displayed message
cameraView.updateTipMessage("Hold the phone closer to the barcode.");
```

### Typical Usage — Show Tips Based on Scan Results

Tips are **not auto-triggered** by the SDK in JavaScript. Control them manually in your
result callback:

```js
resultReceiver.onDecodedBarcodesReceived = (result) => {
  if (!result.barcodeResultItems.length) {
    // No barcode detected — show guidance
    cameraView.updateTipMessage("Move closer to the barcode.");
    cameraView.setTipVisible(true);
  } else {
    cameraView.setTipVisible(false);
    // process results...
  }
};
```

---

## Audio Feedback

Play a beep sound on successful scan:

```js
// UMD
Dynamsoft.DCE.Feedback.beep();

// ES module / npm
import { Feedback } from "dynamsoft-barcode-reader-bundle";
Feedback.beep();
```

Typical usage inside a result callback:

```js
resultReceiver.onDecodedBarcodesReceived = (result) => {
  if (!result.barcodeResultItems.length) return;
  Dynamsoft.DCE.Feedback.beep();
  // process results...
};
```

---

## Drawing Layers and Overlays

Draw custom visual elements (icons, text, shapes) on the camera view overlay.

### Default Drawing Layers

The SDK auto-creates drawing layers for barcode bounding boxes. Access by index:

```js
// Layer 2 is the default barcode result overlay
cameraView.getDrawingLayer(2).setVisible(false); // hide default overlays
```

### Custom Drawing Layer

```js
// Create a new layer for custom overlays
const customLayer = cameraView.createDrawingLayer();

// Create a custom drawing style
const styleId = Dynamsoft.DCE.DrawingStyleManager.createDrawingStyle({
  strokeStyle: "rgba(255, 0, 0, 1)",
  fillStyle: "rgba(255, 0, 0, 0.3)",
  lineWidth: 2,
});

// Add drawing items (e.g., highlight a barcode location)
const rectItem = new Dynamsoft.DCE.DrawingItem.RectDrawingItem(
  { x: 100, y: 100, width: 200, height: 50 },
  styleId
);
customLayer.addDrawingItems([rectItem]);

// Clear all items
customLayer.clearDrawingItems();
```

---

## UI Element Customization

The default camera UI includes dropdowns for camera and resolution selection. Hide or style
them as needed:

```js
const uiElement = cameraView.getUIElement();

// Hide the camera selector dropdown
uiElement.querySelector(".dce-sel-camera").style.display = "none";

// Hide the resolution selector dropdown
uiElement.querySelector(".dce-sel-resolution").style.display = "none";
```
