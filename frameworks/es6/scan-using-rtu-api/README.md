# 📦 Scan Single Barcode - ES6

This sample demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) with **ES6 modules** to scan a single barcode using the camera.

## ✨ Features

- Easy integration with pre-built UI using ES6 module imports
- BarcodeScanner instance with minimal configuration
- Scans one barcode at a time from video
- Uses native ES6 module syntax for clean, modern code

## 🚀 Quick Start

Open `es6.html` in a web browser (via `http://` or `https://` protocol, not `file://`).

## Implementation Highlights

### ES6 Module Import

```javascript
import { BarcodeScanner } from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/dbr.bundle.mjs";
```

### Simple Configuration

```javascript
let config = {
  license: "YOUR-LICENSE-KEY",
  container: document.querySelector(".barcode-scanner-view"),
  uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/ui/barcode-scanner.ui.xml",
  engineResourcePaths: {
    rootDirectory: "https://cdn.jsdelivr.net/npm/",
  },
};

const barcodeScanner = new BarcodeScanner(config);
let result = await barcodeScanner.launch();
```

## 📌 Customization

Please check the official [documentation](https://dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
