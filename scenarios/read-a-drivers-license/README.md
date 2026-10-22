# Read a Driver's License (Custom UI)

Decode the PDF417 barcode on a driver's license and display the parsed fields. The sample uses the new UI definition format: the whole UI lives in [`driver-license.ui.xml`](./driver-license.ui.xml), while [`index.html`](./index.html) only creates the SDK objects and connects them.

The point is portability. The same `.ui.xml` can be mounted from plain HTML, React, Vue, or another framework. The host code is small enough to rewrite per framework; the UI does not need to be.

- **SDK**: `dynamsoft-barcode-reader-bundle@11.6.3200`
- **Input**: camera, or a local image via the bottom-left button
- **Output**: raw barcode text plus parsed fields (`AAMVA_DL_ID`, `AAMVA_DL_ID_WITH_MAG_STRIPE`, `SOUTH_AFRICA_DL`)

> **TL;DR** — `index.html` is the host; `driver-license.ui.xml` is the UI. The host passes `{ cvRouter, onDriverLicenseResult }` through `cameraView.uiContext`; the UI gets the camera from `document.currentScript.currentDMCamera`. When porting to a framework, reuse the `.ui.xml` unchanged or rebuild the UI and drive the SDK directly.

**How to read this:** run it → [Quick Start](#quick-start); understand it → [Architecture](#architecture-at-a-glance) + [Contract](#the-host-ui-contract) + [Inside the UI Definition](#inside-driver-licenseuixml); port it → [Porting](#porting-to-react--vue); verify it → [Integration Checklist](#integration-checklist); change it → [Customization](#customization-guide) + [Troubleshooting](#troubleshooting).

## What This Sample Shows

- Decoding a driver's license barcode from a live camera feed.
- Decoding the same barcode from a local image file.
- Parsing AAMVA and South Africa driver's license data with `CodeParser`.
- Keeping the UI in a separate UI definition file so the host can be replaced without rewriting the UI.
- Showing the raw barcode text and a flattened field list, with an error fallback when parsing fails.

It is **not**:

- a general-purpose barcode scanner — `read_dl.json` is PDF417-only on purpose;
- a file-upload-only sample — the camera is the primary path, and the upload button is a convenience for desktop/testing;
- a framework sample — for framework/TypeScript integration, see [`frameworks`](../../frameworks/).

[Live demo](https://demo.dynamsoft.com/Samples/DBR/JS/scenarios/read-a-drivers-license/index.html)

## Quick Start

A local HTTP server is required. The page fetches `driver-license.ui.xml` and `read_dl.json` at runtime; opening `index.html` via `file://` fails because of browser CORS rules.

```bash
# from this directory
npx serve .
# or
python -m http.server 8000
```

Then open the printed URL (`http://localhost:...`), click the start button, and allow camera access.

You can test without a physical license in two ways:

1. Display [`SampleDriversLicense.jpg`](./SampleDriversLicense.jpg) on another screen and point the camera at it.
2. Click the image button at the bottom-left of the scanner and select `SampleDriversLicense.jpg`.

The 24-hour trial license is initialized in [`index.html`](./index.html). If the trial notice appears, close it before interacting with the page. For extended evaluation, replace the key with your own license.

Camera access requires `https://` or a localhost origin (`http://localhost`, `http://127.0.0.1`).

## Files

| File | Role |
| --- | --- |
| [`index.html`](./index.html) | Host: license init, `CameraView` / `CameraEnhancer` / `CaptureVisionRouter`, `uiContext`, appends the UI. |
| [`driver-license.ui.xml`](./driver-license.ui.xml) | Complete UI definition: styles, three screens, `<Include>` of the official camera UI, and the UI script. |
| [`read_dl.json`](./read_dl.json) | CaptureVision template `ReadDriversLicense`: PDF417-only pipeline. |
| [`SampleDriversLicense.jpg`](./SampleDriversLicense.jpg) | Sample AAMVA license used to test the camera and the image upload. |
| [`logo-dynamsoft.png`](./logo-dynamsoft.png) | Logo on the home screen. |

All styles are inside the `.ui.xml`. There is also no UI code in `index.html` — that is deliberate.

## Architecture at a Glance

```text
index.html (host)                                      driver-license.ui.xml (UI)
────────────────                                       ──────────────────────────
LicenseManager.initLicense()                           <style>...</style>
CameraView.createInstance(path) ────── fetch ────────▶ markup: home / scanner / result
CameraEnhancer.createInstance(view)                    <Include src="dce.ui.v5.xml">
CaptureVisionRouter.createInstance()                   <script>
cvRouter.setInput(cameraEnhancer)                        camera = currentScript.currentDMCamera
view.uiContext = { cvRouter, onDriverLicenseResult } ──▶   { cvRouter, onDriverLicenseResult } = camera.uiContext
document.body.append(view.getUIElement())                camera.dynamsoftExports.CodeParser...
```

| Concern | Owner |
| --- | --- |
| License, camera, and router creation | `index.html` |
| Screens, styles, DOM events | `driver-license.ui.xml` |
| Result receiver, parsing, rendering | `driver-license.ui.xml` |
| Business callback (`onDriverLicenseResult`) | `index.html` (currently `console.log`) |
| Decoding settings | `read_dl.json` |

`CameraView` and `CameraEnhancer` are effectively the same class (11.4.2000+); `CameraEnhancer.createInstance(cameraView)` reuses the same instance. That is why `uiContext` set on the view is readable as `camera.uiContext` inside the UI.

### Why the split?

| | Plain HTML approach | This sample |
| --- | --- | --- |
| UI markup | `index.html` | `driver-license.ui.xml` |
| UI styles | `index.css` | `<style>` in the `.ui.xml` |
| UI event handlers | `index.html` | `<script>` in the `.ui.xml` |
| Host code | mixed with UI | setup + callbacks only |

When you move to React or Vue, only the host changes. The UI file remains the same artifact.

## The Host-UI Contract

There are two directions and one plain object between them.

### Host → UI: `cameraView.uiContext`

```js
Dynamsoft.License.LicenseManager.initLicense("YOUR_LICENSE_KEY");

const cameraView = await Dynamsoft.DCE.CameraView.createInstance("./driver-license.ui.xml");
const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
cvRouter.setInput(cameraEnhancer);

cameraView.uiContext = {
  cvRouter,
  onDriverLicenseResult: (result) => console.log(result),
};

document.body.append(cameraView.getUIElement());
```

`uiContext` is not interpreted by the SDK. It is a property both sides agree on; add any callbacks or data you need.

### UI → SDK: `document.currentScript.currentDMCamera`

```js
const camera = document.currentScript.currentDMCamera;
const { cvRouter, onDriverLicenseResult } = camera.uiContext;

const { CodeParserModule, CodeParser } = camera.dynamsoftExports;
const ui = camera.ui; // root element of this UI definition
```

- `currentDMCamera` is assigned to every `<script>` in the UI definition when the UI is bound.
- `camera.ui` is the root element; use it for scoped queries.
- `camera.dynamsoftExports` exposes SDK objects such as `CodeParser`, `CodeParserModule`, `beep`, and `vibrate` without importing the bundle again (11.6.3200+).

### Attach order

Set `uiContext` **before** appending `getUIElement()` to the DOM. The SDK converts inline UI scripts to blob scripts and runs them when the UI is attached. `driver-license.ui.xml` reads `camera.uiContext` at the top of its script, so appending first makes the UI see `undefined`.

### Minimal UI skeleton

```html
<div class="dm-camera-core-container"></div>
<script>
  (() => {
    const camera = document.currentScript.currentDMCamera;
    const { cvRouter } = camera.uiContext;
    // Wire buttons, listen to cvRouter, ...
  })();
</script>
```

`.dm-camera-core-container` is required; the SDK injects the video and overlay there. All other elements are optional.

### Lifecycle

- One camera instance = one UI instance. Create it when the component mounts and remove it when it unmounts.
- The sample creates `CodeParser` inside the UI. If the browser supports the `FinalizationRegistry`, the `parser` will be automatically destructed when nothing references it. Therefore, in most modern browsers, `parser.dispose()` is not required. If you need to care about older browsers, expose a `dispose` callback through `uiContext` and call `parser.dispose()` from the host; the sample does not do this.
- On unmount: stop capture, close the camera, and remove the UI element. See [Porting](#porting-to-react--vue).

## Inside driver-license.ui.xml

The `.xml` extension is deliberate: it prevents dev servers and build tools from processing or overwriting the file, while the content itself is HTML. In VS Code, use **Change Language Mode → HTML** for highlighting.

### Reuse the official UI with `<Include>`

```html
<div class="barcode-scanner-view">
  <Include src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.6.3200/dist/ui/dce.ui.v5.xml"></Include>
  <!-- sample-specific UI -->
</div>
```

The SDK expands `<Include src>` while loading the UI definition: it fetches the file and merges its markup, styles, and scripts. The included `dce.ui.v5.xml` provides the camera shell, torch, zoom, camera/resolution switching, and the toast. This file only adds the sample's three screens and the upload button.

### Three screens

- `.home-page` — title, start button, logo. The start button is required for mobile: `camera.open()` must run from a user gesture.
- `.barcode-scanner-view` — the included camera UI plus the image-upload button.
- `.parsed-result-view` — raw barcode text, parsed field list, and "Back to Scan".

### Initialization

```js
let parser;
let isHandlingResult = false;

let pInit = (async () => {
  parser = await CodeParser.createInstance();
  await cvRouter.addResultReceiver({
    onDecodedBarcodesReceived: (result) => {
      const item = result.barcodeResultItems?.[0];
      if (!item) return;
      cvRouter.stopCapturing();
      showResult(item);
    }
  });
  await cvRouter.initSettings("./read_dl.json");
})();
```

- `pInit` runs once; `start()` awaits it.
- `pParser` caches the `CodeParser` promise.
- The receiver is registered once, not on every `start()`.
- `initSettings` loads the `ReadDriversLicense` template.

### Camera path

`start()` → `camera.open()` → `cvRouter.startCapturing("ReadDriversLicense")` → first decoded barcode → `stopCapturing()` → `showResult()` → hide scanner, show result.

### Image path

The bottom-left button opens a hidden file input. On change:

```js
const captureResult = await cvRouter.capture(file, "ReadDriversLicense");
const items = captureResult.decodedBarcodesResult?.barcodeResultItems ?? [];
```

- The same template is used, so the image goes through the same PDF417 settings.
- Barcode capture is stopped first if the camera loop is running. If the image has no barcode, the loop restarts and a toast is shown.
- The input value is cleared immediately, so the same file can be selected again.
- In 11.6.3200, `capture()` returns the result directly; it does not go through the camera result receiver.
- The button is disabled while the image is processed.

### `showResult()` and Back to Scan

`showResult()` guards with `isHandlingResult`, clears the camera drawings, parses the barcode, calls `onDriverLicenseResult`, renders the list, and switches screens. "Back to Scan" clears the flag and restarts capture.

### DOM access

All queries are scoped to `camera.ui`:

```js
const ui = camera.ui;
const startBtn = ui.querySelector(".start-btn");
```

The sample runs one instance, but scoping keeps it safe if you mount more than one.

## Decoding and Parsing

`read_dl.json` defines a single template:

| Setting | Value |
| --- | --- |
| Template | `ReadDriversLicense` |
| ROI | `roi_pdf417_barcode` |
| Task | `task_pdf417_barcode` |
| Format | `BF_PDF417` |
| Expected barcodes | `1` |
| Threads per task | `1` |

Localization uses `LM_CONNECTED_BLOCKS` and `LM_SCAN_DIRECTLY`; decoding uses `DM_BASED_ON_LOC_BIN`, `DM_THRESHOLD_BINARIZATION`, and `DM_DEEP_ANALYSIS` with `TwoDGeneral`. Large images are scaled down before processing.

The parser specs are loaded in the UI:

```js
CodeParserModule.loadSpec(["AAMVA_DL_ID", "SOUTH_AFRICA_DL"]);
```

`handleDLResult()` flattens the parser output:

- `AAMVA_DL_ID` — only `commonSubfile`, then recursive `ChildFields`.
- `AAMVA_DL_ID_WITH_MAG_STRIPE` — fields whose name includes `track`.
- `SOUTH_AFRICA_DL` — top-level `ChildFields`, or leaf `Value`.
- Skips `dataElementSeparator`, `segmentTerminator`, `subfile`, and `subfileType`; emits only non-empty `Value`.
- Output shape: `[{ description, value }]`.

On parse failure it emits `Error` and `Original text`. `onDriverLicenseResult(processedResult)` is the host seam; in `index.html` it currently only logs.

Only the first barcode is used (`barcodeResultItems[0]`), matching `ExpectedBarcodesCount: 1`.

## Porting to React / Vue

**Reusing the `.ui.xml` is the lowest-effort path, not the only path.** If your app already has a UI framework, you can rebuild the UI in your components and drive the SDK directly; you only lose the ability to reuse this file as-is.

### Option A: reuse the UI definition

1. Put `driver-license.ui.xml`, `read_dl.json`, and `logo-dynamsoft.png` in a public/static directory. If you need offline/self-hosted operation, also copy `dce.ui.v5.xml` and the SDK bundle locally, then update both URLs.
2. Create a container ref.
3. In `useEffect` / `onMounted`, create the view, enhancer, and router.
4. Set `uiContext` before appending.
5. Append `getUIElement()` to the ref, not `document.body`.
6. On cleanup: stop capture, close the camera, remove the element.

```jsx
useEffect(() => {
  let cancelled = false;
  const container = containerRef.current;
  let cameraView, cameraEnhancer, cvRouter;

  (async () => {
    cameraView = await CameraView.createInstance("/driver-license.ui.xml");
    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    cvRouter = await CaptureVisionRouter.createInstance();
    cvRouter.setInput(cameraEnhancer);

    cameraView.uiContext = {
      cvRouter,
      onDriverLicenseResult: (result) => console.log(result),
    };

    if (!cancelled) container.append(cameraView.getUIElement());
  })();

  return () => {
    cancelled = true;
    cvRouter?.stopCapturing();
    cameraEnhancer?.close();
    cameraView?.getUIElement()?.remove();
  };
}, []);
```

Adjust the imports and effect API to your framework and SDK version. React 18 StrictMode mounts effects twice in development; make cleanup complete or guard initialization.

### Option B: rebuild the UI in your framework

You do not need `uiContext` or `document.currentScript` for this option:

- Create the camera and router in the component.
- Render your own controls.
- The `<Include src>` is invalid or has different semantics in your framework. Append basic camera UI by `camera.getUIElement()` instead; Or `<div class=".dm-camera-core-container">` + `camera.setUIElement(thatContainer)` instead.
- Own mount/unmount cleanup.

### Gotchas

- **Relative URLs** inside the UI definition resolve against the **page** URL, not the `.ui.xml` location. With a client-side router, use absolute paths or put the assets at a stable root.
- **SSR**: `document`, `window`, and `document.currentScript` do not exist on the server. Initialize in an effect or a client-only component.
- **CSP**: the SDK runs inline UI scripts from `blob:` URLs and may do the same for inline styles. A strict policy must allow `blob:` for scripts and styles, plus the SDK's worker/WASM resources.
- **Multiple instances**: scope queries to `camera.ui`; `document.querySelector` hits the first instance.
- **Full-screen CSS**: the sample uses `100vw`/`100dvh` and absolute positioning. If you embed it in a panel, override those rules.
- **`document.currentScript`**: only classic scripts. If you convert the UI script to ESM, use the `import.meta.url` lookup from the docs.
- **Cleanup**: stop capture, close the camera, remove the UI element. If you created a parser, dispose it.

For TypeScript/UMD/ESM patterns, see [`use-typescript-in-ui-definition`](../use-typescript-in-ui-definition/).

## Customization Guide

| I want to... | Edit |
| --- | --- |
| Change the look or layout | `<style>` in `driver-license.ui.xml` |
| Change which fields are shown or their order | `handleDLResult()` |
| Add a document type | `CodeParserModule.loadSpec([...])` and a branch in `handleDLResult()` |
| Change barcode format or performance | `read_dl.json` |
| Send results to a backend / prefill a form | `onDriverLicenseResult` in `index.html` |
| Change the scan lifecycle (auto-start, timeout) | `<script>` in `driver-license.ui.xml`, or expose callbacks through `uiContext` |
| Change camera features | the included official UI or the `camera` API |

If you change the parsing output shape, update both `generateResultList()` and the host callback consumer.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `Can't find element with class dm-camera-core-container` | `<Include>` failed, or the core container was removed | Check the `<Include src>` URL and network; keep the core container |
| UI is visible but buttons do nothing | `uiContext` was assigned after the UI was attached, or `cvRouter` is missing | Assign before `append`; check the host |
| 404 for `read_dl.json` | Relative URL resolved against the page, not the UI file | Use an absolute path or put assets next to the page |
| Camera does not open | Not HTTPS/localhost, permission denied, or no user gesture | Serve locally/HTTPS; call `open()` from a click |
| Image upload does nothing | File picker blocked or unsupported image type | Use a supported image; check the console |
| No barcode found | Image too blurry/cropped, or not PDF417 | Try the bundled sample image; check the format |
| Blank page with CSP errors | `blob:` scripts/styles blocked | Allow `blob:` in `script-src` / `style-src` |
| License errors | Trial expired | Replace the key in `index.html` |

## Limitations and Notes

- Camera and local image are both supported; there is no drag-and-drop or batch upload.
- The template is PDF417-only. Other barcode formats will not decode until you add them to `read_dl.json`.
- The sample does not show camera or permission errors in the UI; check the console if `start()` fails.
- The result page is full-screen and absolutely positioned; embedding it in an existing layout requires CSS changes.
- The raw barcode text may contain AAMVA control characters (`\u001e`, `\r`); the sample only strips `\n`.
- The trial license is for evaluation; replace it for production.
- The SDK version is pinned in both `index.html` and the `<Include src>` URL; keep them in sync.

## Maintainer Notes (and AI Agents)

> These notes apply only if you are editing **this repository's sample**. They are not requirements for applications built with the SDK. Customer-facing agents should use the [Integration Checklist](#integration-checklist) above.

- **Keep the host/UI split.** `index.html` stays a thin host; `driver-license.ui.xml` stays the complete UI. Inlining the UI back into `index.html` removes the separation this sample exists to demonstrate.
- **Keep `<Include>`.** Reuse the official v5 UI; do not paste its hundreds of lines into this file.
- **Keep the contract names and shape.** `uiContext = { cvRouter, onDriverLicenseResult }`, `document.currentScript.currentDMCamera`, `camera.dynamsoftExports`.
- **Keep one result path.** Camera and image upload must both go through `showResult()`; do not fork parsing or rendering.
- **Keep the version pin in sync.** Update the bundle URL in `index.html` and the `<Include src>` URL together.
- **Keep it plain HTML.** No build step in this sample; TypeScript/UMD belongs in [`use-typescript-in-ui-definition`](../use-typescript-in-ui-definition/).
- **Keep DOM access safe and scoped.** Use `camera.ui.querySelector`, `textContent`, and `replaceChildren`; avoid `document.querySelector` and HTML string interpolation.
- **Keep the smoke test.** Upload `SampleDriversLicense.jpg` and expect a populated result list (29 fields at the time of writing).
- **Keep the README in sync.** If files, flow, or the contract change, update this document.

## References

- [Dynamsoft Barcode Reader JS — Introduction](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/)
- [Foundational API user guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html)
- [Customize the UI — new UI definition format](https://www.dynamsoft.com/barcode-reader/docs/core/programming/features/ui-customization-js.html)
- [API reference](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html)
- [TypeScript in UI definition sample](../use-typescript-in-ui-definition/)
- [Repository root README](../../README.md)
