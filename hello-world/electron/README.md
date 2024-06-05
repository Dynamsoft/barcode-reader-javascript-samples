# Hello World Sample for Electron

[Electron](https://www.electronjs.org/) is a framework for creating native applications with web technologies. Follow this guide to learn how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into an Electron application.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/electron">Hello World in Electron~ - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `electron 26.4.1` are used in this article.

## Initialize project

```cmd
mkdir my-app && cd my-app
npm init
```

`npm init` will prompt you to configure some fields in your `package.json`. Note that the `entry point` should be `main.js` (it will be created later).

## install necessary libraries

```cmd
npm install electron --save-dev

npm install dynamsoft-capture-vision-std@1.2.0 -E
npm install dynamsoft-image-processing@2.2.10 -E
npm install dynamsoft-barcode-reader-bundle@10.2.1000 -E
```

## Start to implement

### Create a main.js file

As defined in the `package.json` file, `main.js` is the entry point of the application, we define it like this:

```javascript
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

Create the page to be loaded in the created window.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Read barcodes from camera with Dynamsoft Barcode Reader in an Electron Application.">
    <meta name="keywords" content="barcode, camera, Electron">
    <title>Dynamsoft Barcode Reader Sample - Electron</title>
    <link href="style.css" rel="stylesheet">
    <script src="./node_modules/dynamsoft-barcode-reader-bundle/dist/dbr.bundle.js"></script>
  </head>
  <body>
    <h1>Hello World for Electron</h1>
    <div id="div-ui-container"></div>
    Results:
    <br>
    <div id="div-results-container"></div>
    <script src="action.js"></script>
  </body>
</html>
```

### Create an `action.js` file

`index.html` will loads `action.js`, which makes use of libraries to read barcodes from a video input:

```javascript
// Configures the paths where the .wasm files and other necessary resources for modules are located.
Dynamsoft.Core.CoreModule.engineResourcePaths = {
  std: "./node_modules/dynamsoft-capture-vision-std/dist/",
  dip: "./node_modules/dynamsoft-image-processing/dist/",
  core: "./node_modules/dynamsoft-core/dist/",
  license: "./node_modules/dynamsoft-license/dist/",
  cvr: "./node_modules/dynamsoft-capture-vision-router/dist/",
  dbr: "./node_modules/dynamsoft-barcode-reader/dist/",
  dce: "./node_modules/dynamsoft-camera-enhancer/dist/",
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */
// Optional. Used to load wasm resources in advance, reducing latency between video playing and barcode decoding.
Dynamsoft.Core.CoreModule.loadWasm(["DBR"]);
// Defined globally for easy debugging.
let cameraEnhancer, cvRouter;

(async () => {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
    // Get default UI and append it to DOM.
    document.querySelector("#div-ui-container").append(cameraView.getUIElement()); 

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
      if (!result.barcodeResultItems.length) return;

      const resultsContainer = document.querySelector("#div-results-container");
      resultsContainer.textContent = '';
      console.log(result);
      for (let item of result.barcodeResultItems) {
        resultsContainer.append(
          `${item.formatString}: ${item.text}`,
          document.createElement('br'),
          document.createElement('hr'),
        );
      }
    }});

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

`index.html` will loads `style.css`, which defines the styles for the UI

```css
#div-ui-container {
  width: 100%;
  height: 80vh;
}

#div-results-container {
  width: 100%;
  height: 10vh;
  overflow: auto;
}
```

## Run the application

Run the application with the following command and see how it goes.

```cmd
npm start
```

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
