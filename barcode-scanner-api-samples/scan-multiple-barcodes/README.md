
# 📦 Scan Multiple Barcodes Samples

## 🚀 1. Hello World

This sample demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/) to scan **multiple barcodes continuously** from a video stream in a web application.

### ✨ Features

- Scan multiple 1D/2D barcodes
- Live video decoding using `BarcodeScanner` component
- Easy integration into your web application
- UI rendered into a customizable container

### 🔧 How It Works

The sample uses the `BarcodeScanner` class to launch a scanner and decode barcodes from a camera stream. The key configuration includes:

- **License Key** – Required to activate the SDK.
- **`engineResourcePaths`** – Points to required resources hosted on a CDN or locally.
- **UI container** – An HTML element where the scanner is rendered.

```ts
const config = {
  license: "YOUR-LICENSE-KEY",
  engineResourcePaths: {
    // feel free to change it to your own path
    rootDirectory: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.6000/dist/",
  },
  container: ".barcode-scanner-view",
  scanMode: Dynamsoft.EnumScanMode.SM_MULTI_UNIQUE,
  showResultView: true,
  showUploadImageButton: true,
  scannerViewConfig: {
    showCloseButton: true
  },
};
```

The BarcodeScanner instance is created and launched like this:

```ts
const barcodeScanner = new Dynamsoft.BarcodeScanner(config);
barcodeScanner.launch();
```

### 📌 Notes

- This sample scans **multiple unique barcodes**, you can configure `scanMode` to change the behavior to scan one single barcode.
- To avoid network-related loading issues, consider hosting all required resources locally.

## 🛒 2. Cart Builder

This sample simulates a shopping experience where users scan barcodes to add items to a dynamic cart. 

### ✨ Features

- Scan multiple 1D/2D barcodes
- Live video decoding using `BarcodeScanner` component
- Floating and draggable scanner window.
- Dynamic cart updates on each scan.

### 🔧 How It Works

The scanning logic mirrors the Hello World sample, but scanned results populate the cart instead of just displaying in the result view.

The UI features a "Scan Barcode" button, a styled cart, and basic interactivity with vanilla JavaScript and CSS.

A list of 20 dummy products is used, with each scan randomly adding a product to the cart showing its name, shortened barcode, and price.

## 🛒 3. Batch inventory

This project is a simple web-based inventory management tool that uses `BarcodeScanner` to scan barcodes in batches and provide real-time analysis of the scanned data.

### ✨ Features

- Automatically deduplicate barcodes in each session

- Show session summary:
  - Total unique barcodes
  - Barcode type distribution
  - Session duration

- Track duration of each scan session

### 🔧 How It Works

- The scanner is embedded using `BarcodeScanner` with `SM_MULTI_UNIQUE` mode to capture unique barcodes.

- Once the scan completes, the results are analyzed.

- You can click the back arrow to restart scanning.

### 📌 Notes

- The barcode value must be unique, otherwise it won’t be counted.

- Applicable scenarios may include:

  - Warehouse inventory checks
  - Retail stock intake
  - Barcode-based asset tracking
  - Batch QR code scanning

## 📄 See other BarcodeScanner samples

Multiple samples are provided for single barcode scanning. These samples can be easily adapted to scan multiple unique barcodes by simply updating the `config` object.

* [**Hello World**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode): Scan single barcode from video stream with minimum code in JavaScript.
* [**Scan and Search**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode): Scan a barcode to retrieve the relevant product information from the database in JavaScript.
* [**Pick one to fill**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/pick-one-to-fill): Pick one and auto-fill fields by simply opening the camera and scanning a group of barcodes.
* [**Use customized template**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/use-customized-template): Use different customized templates for scanning various barcode types.
* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/angular): Read single barcode from camera in an Angular application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/react): Read single barcode from camera in a React application.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/vue): Read single barcode from camera in a Vue application.
* [**Hello World in Svelte**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/svelte): Read single barcode from camera in a Svelte application.
* [**Hello World in Capacitor**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/capacitor): Read single barcode from camera in a Capacitor application.
* [**Hello World in Webview**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/webview): Read single barcode from camera in a Webview application.
* [**Hello World in Typescript**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/native-ts): Read single barcode from camera in a Typescript application.
* [**Hello World in Electron**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/electron): Read single barcode from camera in a Electron application.
* [**Hello World in Blazor**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/blazor): Read single barcode from camera in a Blazor application.
* [**Hello World in RequireJS**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/requirejs.html): Read single barcode from camera in a RequireJS application.
* [**Hello World in ES6**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/es6.html): Read single barcode from camera in a ES6 application.
* [**Hello World in PWA**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/pwa): Read single barcode from camera in a PWA application.