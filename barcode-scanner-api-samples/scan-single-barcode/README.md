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

This simple demonstrates how to use the `BarcodeScanner` API to scan a product barcode and simulate a search from a product database.

### ✨ Features

- Scan Barcodes using your device camera
- Search by Text or Barcode input
- Displays mock product data as search results
- Responsive UI with modern styling

### 🔄 Sample Usage Flow

1. Click the Scan button to launch the barcode scanner.
2. Once a barcode is detected, its value is displayed along with placeholder product information.
3. Alternatively, type a product name or barcode manually in the input field and click Search.
4. Results are displayed in the Search Result text area.

### 📌 Notes

- No real backend is connected in this demo; results are mocked.
- You can integrate with a real product API by replacing the placeholder content in the searchResult.value.

## 📷 3. Pick One To Fill

A web-based form-filling utility that uses the `BarcodeScanner` to scan and auto-fill fields by simply opening the camera and scanning a barcode.

### ✨ Features

- Field-specific Camera Activation
Open the camera individually for different fields.

- Manual control when to start decoding
Start decoding manually after aiming at the target to reduce the risk of misreads and missed barcodes.

- Auto-Fill with Scan Result
Automatically populates input fields with scanned barcode values.

### 🔄 Sample Usage Flow

1. Click the "Open Camera" button to activate the camera.

2. Aim at the sample image shown below.

3. Click the "Decode" button to start barcode recognition.

4. If only one barcode is detected, its value will be automatically filled into the corresponding field.
   If multiple barcodes are detected, the video stream will freeze, and you’ll need to manually select one from the decoded results to fill in.

### 📌 Notes

- This usage is especially suitable for scenarios with densely packed barcodes, where secondary confirmation or manual selection is highly needed.
- You can find a sample reference image in `./pick-one-to-fill/`.

## 🎥 4. Use Customized Template

This is a sample web application demonstrating how to use the `BarcodeScanner` with different customized templates for scanning various barcode types.

It allows users to dynamically select a scanning template (e.g., DPM, Dot Code, OneD Retail, OneD Industrial), and launch a camera-based barcode scanner accordingly.

### ✨ Features

- Support for custom barcode scanning templates using local JSON files.

- Easily switch between different template configurations.

### 🔄 Sample Usage Flow

1. Open the HTML file in a browser. The app will automatically initialize the scanner using the ReadDPM template.

2. Choose from the available templates:
    - Direct Part Marking (DPM)
    - Dot Code
    - OneD Retail
    - OneD Industrial

    Scanner Loads with Selected Template. When a new template is selected, the scanner is re-initialized using the corresponding .json file.

3. Point your camera at a barcode matching the selected template type. A popup alert will display the result upon successful detection.

### 📌 Notes

- The scanner is disposed and recreated every time a different template is selected, ensuring the correct settings are applied.
- You can find sample images in `./use-customized-template/`.

## 📄 See other BarcodeScanner samples

* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/angular): Read single barcode from camera in an Angular application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/react): Read single barcode from camera in a React application.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/vue): Read single barcode from camera in a Vue application.

Scan multiple barcodes:

* [**Hello World**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes): Scan multiple barcodes from video stream with minimum code in JavaScript.
* [**Cart Builder**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes): Simulates a shopping experience where users scan barcodes to add items to a dynamic cart.