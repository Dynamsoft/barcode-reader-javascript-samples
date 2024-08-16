# Hello World Sample for Electron

[Electron](https://www.electronjs.org/) is a framework for creating native applications with web technologies. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Next.js application. Note that in this sample, `TypeScript` is used.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.2.1000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.2.1000).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/electron">Hello World in Electron~ - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `electron 26.4.1` are used in this article.

## Quick Start 

```cmd
npm install
npm start
```
A window should open to view the sample application

## Creating the sample project

In this section, we will be creating an Electron application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Initialize project

```cmd
mkdir my-app && cd my-app
npm init
```

`npm init` will prompt you to configure some fields in your `package.json`. Note that the `entry point` should be `main.js` (it will be created later).

### Install the necessary libraries

```cmd
npm install electron --save-dev
npm install dynamsoft-capture-vision-std -E
npm install dynamsoft-image-processing -E
npm install dynamsoft-barcode-reader-bundle -E
```

## Start to implement

### Create a main.js file

As defined in the `package.json` file, `main.js` is the entry point of the application.

Create a `main.js` file at the root folder, and define it like this:

```javascript
/* /main.js */
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nativeWindowOpen: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

Two modules are imported in this file:

* `app`: controls the application's event lifecycle.
* `BrowserWindow`: creates and manages application windows.

The code basically opens `index.html` in a window. For more information, check out [Electron Quick Start](https://www.electronjs.org/docs/latest/tutorial/quick-start).

### Create an `index.html` file

As defined above, `index.html` is the file that will be loaded into the crated window.

Create an `index.html` file at the root folder, and define it like this:

```html
<!-- /index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="description"
      content="Read barcodes from camera with Dynamsoft Barcode Reader in an Electron Application."
    />
    <meta name="keywords" content="barcode, camera, Electron" />
    <title>Dynamsoft Barcode Reader Sample - Electron</title>
    <link href="style.css" rel="stylesheet" />
    <script src="./node_modules/dynamsoft-barcode-reader-bundle/dist/dbr.bundle.js"></script>
  </head>
  <body>
    <h1>Hello World for Electron</h1>
    <div id="camera-view-container"></div>
    <br />
    Results:
    <div id="results"></div>
    <script src="action.js"></script>
  </body>
</html>
```

### Create an `action.js` file

`index.html` will load `action.js`, which makes use of libraries to read barcodes from a video input.

Create the `action.js` file at the root folder, and define it like this:

```javascript
/* /action.js */
// Configures the paths where the .wasm files and other necessary resources for modules are located.
Dynamsoft.Core.CoreModule.engineResourcePaths = {
  std: "./node_modules/dynamsoft-capture-vision-std/dist/",
  dip: "./node_modules/dynamsoft-image-processing/dist/",
  core: "./node_modules/dynamsoft-core/dist/",
  license: "./node_modules/dynamsoft-license/dist/",
  cvr: "./node_modules/dynamsoft-capture-vision-router/dist/",
  dbr: "./node_modules/dynamsoft-barcode-reader/dist/",
  dce: "./node_modules/dynamsoft-camera-enhancer/dist/"
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", true);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=samples#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
Dynamsoft.Core.CoreModule.loadWasm(["DBR"]);

(async () => {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
    // Get default UI and append it to DOM.
    document.querySelector("#camera-view-container").append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;

        const resultsContainer = document.querySelector("#results");
        resultsContainer.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      }
    });

    // Filter out unchecked and duplicate results.
    const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    // Filter out unchecked barcodes.
    filter.enableResultCrossVerification("barcode", true);
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication("barcode", true);
    await cvRouter.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await cvRouter.startCapturing("ReadSingleBarcode");
  } catch (ex) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
})();
```

### Create an `style.css` file

`index.html` will load `style.css`, which defines the styles for the UI.

Create the `style.css` file at the root folder. Note that this is customizable!

```css
body {
  text-align: center;
}

#camera-view-container {
  width: 100%;
  height: 80vh;
}

#results {
  width: 100%;
  height: 10vh;
  overflow: auto;
  white-space: pre-wrap;
}

```

## Run the application

Run the application with the following command and see how it goes.

```cmd
npm start
```

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
