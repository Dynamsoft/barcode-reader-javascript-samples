# Hello World Sample for ES6 (Decode via Camera)

[ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) allow you to use modern JavaScript features with native import/export syntax. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into an ES6 application using the foundational API to decode barcodes from a live camera stream.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 11.4.2000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/11.4.2000).

> Note:
>
> If you're looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/es6/scan-using-foundational-api">Hello World in ES6 (Decode via Camera) - Source Code</a>

## Usage

Open `es6.html` in a web browser (via `http://` or `https://` protocol, not `file://`).

## Features

This sample demonstrates:
- Using ES6 module imports to load the Dynamsoft Barcode Reader bundle
- Creating a `CameraEnhancer` instance for camera control
- Creating a `CaptureVisionRouter` instance for barcode scanning
- Implementing result filtering to remove duplicates and unchecked results
- Displaying decoded barcode results in real-time

## Implementation Highlights

### ES6 Module Import

```javascript
import {
  CoreModule,
  LicenseManager,
  CaptureVisionRouter,
  CameraView,
  CameraEnhancer,
  MultiFrameResultCrossFilter,
} from "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2000/dist/dbr.bundle.mjs";
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
