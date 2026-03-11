# 📦 Scan Single Barcode - RequireJS

This sample demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) with **RequireJS** to scan a single barcode using the camera.

## ✨ Features

- Easy integration with pre-built UI using RequireJS
- BarcodeScanner instance with minimal configuration
- Scans one barcode at a time from video
- Uses AMD module loading pattern

## 🚀 Quick Start

Open `requirejs.html` in a web browser (via `http://` or `https://` protocol, not `file://`).

## Implementation Highlights

### RequireJS Module Loading

```javascript
requirejs(
  ["https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/dbr.bundle.js"],
  ({ BarcodeScanner }) => {
    // Your code here
  }
);
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
barcodeScanner.launch().then((result) => {
  if (result.barcodeResults.length) {
    alert(result.barcodeResults[0].text);
  }
});
```

## 📌 Customization

Please check the official [documentation](https://dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
