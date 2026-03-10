# Dynamsoft Barcode Reader Samples for the Web

This repository contains multiple samples that demonstrate how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/?utm_source=sampleReadme) for creating web-based barcode scanning applications.

---

## System Requirements

### Secure Context (HTTPS Deployment)

When deploying your application/website for production, make sure to serve it via a secure HTTPS connection. This is required for two reasons:

- Access to the camera video stream is only granted in a security context. Most browsers impose this restriction.
- Dynamsoft License requires a secure context to work.

> Some browsers like Chrome may grant access for `http://127.0.0.1` and `http://localhost` or even for pages opened directly from the local disk (`file:///...`). This can be helpful for temporary development and testing.

### Browser Compatibility

The following table is a list of supported browsers based on the above requirements:

| Browser Name |     Version      |
| :----------: | :--------------: |
|    Chrome    | v78+<sup>1</sup> |
|   Firefox    | v68+<sup>1</sup> |
|     Edge     |       v79+       |
|    Safari    |      v14.5+      |

<sup>1</sup> Devices running iOS need to be on iOS 14.5+ for camera video streaming to work in Chrome, Firefox or other apps using webviews.

Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the SDK.

---

## License

A default trial license is included which allows you to test the sample apps for up to 24 hours. You can [request a 30-day trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme) via the Dynamsoft website to evaluate further.

>[!IMPORTANT]
> Once your trial license expires, the SDK will throw an error and cease to function. You can visit the [Dynamsoft Customer Portal](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=sampleReadme&package=js) to view your trial license details. Additionally, it's possible to extend the trial period via the customer portal, allowing for a total trial duration of 60 days.

---

## Get the Code

Cloning the full repository may be slow due to its extensive history. To get started quickly, you have a few options:

- Download as [zip](https://github.com/Dynamsoft/barcode-reader-javascript-samples/archive/refs/heads/main.zip)
- Download as [tar.gz](https://github.com/Dynamsoft/barcode-reader-javascript-samples/archive/refs/heads/main.tar.gz)
- Shallow clone with Git:

```git
git clone https://github.com/Dynamsoft/barcode-reader-javascript-samples.git --depth 1
```

> [!NOTE]
> If you expect unstable network conditions or prefer to work entirely offline, you can download the [offline package from Dynamsoft website](https://www.dynamsoft.com/barcode-reader/downloads/1000003-confirmation/). This includes the full repository and all required dependencies for offline use.

---

## Running the Samples Locally

The standalone samples (`hello-world.html`, `scan-a-single-barcode.html`, `read-an-image.html`) and scenario samples load the SDK from a CDN, so you can open them directly by double-clicking — no web server required (an internet connection is needed).

To browse all available samples, open `index.html` in your browser — it links to every sample in the repository.

For framework samples, follow the instructions in each subfolder's README (typically `npm install` then `npm run dev`).

If you need a web server for standalone or scenario samples (for example, to serve SDK resources from a local `dist/` folder), here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on an HTML file and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/`.

---

## Sample Folders

The repository includes two main sample directories:

- **`frameworks/`** - Framework-specific examples demonstrating how to integrate Dynamsoft Barcode Reader into common web and hybrid frameworks. Each framework folder contains one or more runnable sub-examples (such as `scan-using-foundational-api` and/or `scan-using-rtu-api`) showing practical integration patterns.

- **`scenarios/`** - Focused scenario samples that show common real-world uses of Dynamsoft Barcode Reader.

---

## Choosing an API

The SDK provides two approaches for integrating barcode scanning capabilities:

### Ready-To-Use (RTU) API — BarcodeScanner

The RTU API offers the quickest path to a working barcode scanner (**Recommended for most users**):

- **One-line integration** – Launch a full scanner with a single API call
- **Built-in UI** – Pre-designed viewfinder and scan region highlighting
- **Simple configuration** – Customize behavior through intuitive config objects

### Foundational APIs

If you are looking for a fully customizable barcode decoding library with complete control over the scanning process and UI, you are welcome to use the Foundational APIs.

---

## Documentation

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/?ver=11.2.4000&utm_source=sampleReadme).

- [Barcode Scanner API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html?utm_source=sampleReadme)
- [Foundational API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html?utm_source=sampleReadme)

---

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).

---

## Sample List

### Hello World

- [hello-world.html](./hello-world.html) — Demonstrates continuously scanning and collecting multiple unique barcodes via camera.
- [scan-a-single-barcode.html](./scan-a-single-barcode.html) — Demonstrates single-barcode scanning: stops and returns as soon as the first barcode is detected.
- [read-an-image.html](./read-an-image.html) — Demonstrates how to decode and read barcodes from uploaded image files.

### Hello-world

- [hello-world.html](./hello-world.html) — The simplest example to get started with single barcode scanning.
- [read-an-image.html](./read-an-image.html) — Demonstrates how to decode and read barcodes from uploaded image files.

### Frameworks

- [angular/](./frameworks/angular/) — Angular examples.
- [blazor/](./frameworks/blazor/) — Blazor (.NET) examples.
- [capacitor/](./frameworks/capacitor/) — Capacitor mobile hybrid examples.
- [electron/](./frameworks/electron/) — Electron desktop examples.
- [es6/](./frameworks/es6/) — Plain ES6 module examples.
- [native-ts/](./frameworks/native-ts/) — Native TypeScript examples.
- [next/](./frameworks/next/) — Next.js examples.
- [nuxt/](./frameworks/nuxt/) — Nuxt examples.
- [pwa/](./frameworks/pwa/) — Progressive Web App examples.
- [react/](./frameworks/react/) — React examples.
- [requirejs/](./frameworks/requirejs/) — RequireJS (AMD) examples.
- [svelte/](./frameworks/svelte/) — Svelte examples.
- [vue/](./frameworks/vue/) — Vue examples.
- [webview/](./frameworks/webview/) — Native WebView examples for Android/iOS.

### Scenarios

- [pick-one-to-fill/](./scenarios/pick-one-to-fill/) — Picking the correct one from multiple candidates by scanning barcodes.
- [cart-builder/](./scenarios/cart-builder/) — Single-page demo illustrating adding scanned items into a shopping cart.
- [scan-and-search/](./scenarios/scan-and-search/) — Example that scans a barcode and performs a lookup/search operation.
- [show-result-texts-on-the-video/](./scenarios/show-result-texts-on-the-video/) — Overlay decoded text on live video while scanning.
- [batch-inventory/](./scenarios/batch-inventory/) — Batch scanning workflow for inventory collection and export.
- [read-a-drivers-license/](./scenarios/read-a-drivers-license/) — Demo for reading and parsing a driver's license image/data.
- [read-vin/](./scenarios/read-vin/) — Demo for reading and parsing a VIN (vehicle identification number) code.
- [read-and-parse-GS1-AI/](./scenarios/read-and-parse-GS1-AI/) — Example showing GS1 AI parsing and data extraction.
- [scan-qr-code/](./scenarios/scan-qr-code/) — QR code targeted demo and settings.
- [scan-common-1D-and-2D/](./scenarios/scan-common-1D-and-2D/) — Demo configured to detect a wide range of barcode formats.
- [scan-common-2D-codes/](./scenarios/scan-common-2D-codes/) — Focused on common 2D barcode formats decoding.
- [scan-datamatrix-code/](./scenarios/scan-datamatrix-code/) — DataMatrix code targeted demo with optimized settings.
- [scan-dpm-codes/](./scenarios/scan-dpm-codes/) — Demo for reading Direct Part Mark (DPM) codes etched or marked on surfaces.
- [scan-1D-Retail/](./scenarios/scan-1D-Retail/) — 1D retail barcode tuning example.
- [scan-1D-Industrial/](./scenarios/scan-1D-Industrial/) — 1D industrial barcode tuning example.
- [scan-from-distance/](./scenarios/scan-from-distance/) — Demo for scanning barcodes from a distance (zoom/ROI tuning).
- [locate-an-item-with-barcode/](./scenarios/locate-an-item-with-barcode/) — UI to help locate items with barcodes in a list or layout.
- [debug/](./scenarios/debug/) — Debug utilities and a small server (frame collector) used for testing and troubleshooting.

### Official Online Demo

- [**Official Online Demo**](https://demo.dynamsoft.com/barcode-reader-js): Try the Dynamsoft Barcode Reader JavaScript Edition demo (written in Vue) and see how it works in different modes!
