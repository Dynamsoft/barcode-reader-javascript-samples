# Hello World Sample for RequireJS (Decode via Camera)

[RequireJS](https://requirejs.org/) is a JavaScript file and module loader that implements the AMD (Asynchronous Module Definition) API. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a RequireJS application using the foundational API to decode barcodes from a live camera stream.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 11.2.4000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/11.2.4000).

> Note:
>
> If you're looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/requirejs/scan-using-foundational-api">Hello World in RequireJS (Decode via Camera) - Source Code</a>

## Usage

Open `requirejs.html` in a web browser (via `http://` or `https://` protocol, not `file://`).

## Features

This sample demonstrates:
- Using RequireJS to load the Dynamsoft Barcode Reader bundle
- Creating a `CameraEnhancer` instance for camera control
- Creating a `CaptureVisionRouter` instance for barcode scanning
- Implementing result filtering to remove duplicates and unchecked results
- Displaying decoded barcode results in real-time

## Implementation Highlights

### RequireJS Module Loading

```javascript
requirejs(
  ["https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.2.4000/dist/dbr.bundle.js"],
  ({
    Core: { CoreModule },
    License: { LicenseManager },
    Utility: { MultiFrameResultCrossFilter },
    CVR: { CaptureVisionRouter },
    DCE: { CameraView, CameraEnhancer },
  }) => {
    // Your code here
  }
);
```

### Camera Setup

```javascript
const cameraView = await CameraView.createInstance();
const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
document.querySelector("#camera-view-container").append(cameraView.getUIElement());
```

### Barcode Scanning

```javascript
const cvRouter = await CaptureVisionRouter.createInstance();
cvRouter.setInput(cameraEnhancer);
await cvRouter.startCapturing("ReadSingleBarcode");
```

## 📌 Customization

For more advanced customization options, please check the official [documentation](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
