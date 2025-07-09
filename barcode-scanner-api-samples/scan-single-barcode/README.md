# 📦 Scan Single Barcode 

## 🚀 1.Hello World

This sample demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/) to scan a **single barcode** from a video stream using plain JavaScript.

### ✨ Features

- Uses `BarcodeScanner` APIs from `dynamsoft-barcode-reader-bundle`
- Scans a single barcode at a time
- UI rendered to a container element

### 🔧 How It Works

The sample uses the `BarcodeScanner` class to launch a scanner and decode a single barcode from a camera stream. The key configuration includes:

- **License Key** – Required to activate the SDK.
- **`engineResourcePaths`** – Points to required resources hosted on a CDN or locally.
- **UI container** – An HTML element where the scanner is rendered.

```ts
const config = {
  license: "YOUR-LICENSE-KEY",
  engineResourcePaths: {
    // feel free to change it to your own path
    rootDirectory: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.3000/dist/",
  },
  container: ".barcode-scanner-view",
};
```

The BarcodeScanner instance is created and launched like this:

```ts
const barcodeScanner = new Dynamsoft.BarcodeScanner(config);
barcodeScanner.launch();
```

### 📌 Notes

- This sample scans one **single barcode**, you can configure `scanMode` to change the behavior to scan multiple barcodes.
- To avoid network-related loading issues, consider hosting all required resources locally.

## 🛒 2. Scan and Search

This simple demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/) to scan a product barcode and simulate a search from a product database.

### ✨ Features

- Scan Barcodes using your device camera
- Search by Text or Barcode input
- Displays mock product data as search results
- Responsive UI with modern styling

### 🔧 How It Works

1. Click the Scan button to launch the barcode scanner.
2. Once a barcode is detected, its value is displayed along with placeholder product information.
3. Alternatively, type a product name or barcode manually in the input field and click Search.
4. Results are displayed in the Search Result text area.

### 📌 Notes

- No real backend is connected in this demo; results are mocked.
- You can integrate with a real product API by replacing the placeholder content in the searchResult.value.

## 📄 See other BarcodeScanner samples

* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/angular): Read single barcode from camera in an Angular application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/react): Read single barcode from camera in a React application.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/vue): Read single barcode from camera in a Vue application.

Scan multiple barcodes:

* [**Hello World**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes): Scan multiple barcodes from video stream with minimum code in JavaScript.
* [**Cart Builder**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes): Simulates a shopping experience where users scan barcodes to add items to a dynamic cart.