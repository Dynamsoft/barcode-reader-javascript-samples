
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
    rootDirectory: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.1000/dist/",
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

The scanning logic mirrors the Hello World sample.

The UI features a "Scan Barcode" button, a styled cart, and basic interactivity with vanilla JavaScript and CSS.

A list of 20 dummy products is used, with each scan randomly adding a product to the cart showing its name, shortened barcode, and price.

## 📄 See other BarcodeScanner samples

Multiple samples are provided for single barcode scanning. These samples can be easily adapted to scan multiple unique barcodes by simply updating the `config` object.

* [**Hello World**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode): Scan single barcode from video stream with minimum code in JavaScript.
* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/angular): Read single barcode from camera in an Angular application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/react): Read single barcode from camera in a React application.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/vue): Read single barcode from camera in a Vue application.