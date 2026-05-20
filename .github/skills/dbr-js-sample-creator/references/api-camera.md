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
