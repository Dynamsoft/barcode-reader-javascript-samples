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
npm install dynamsoft-capture-vision-std
npm install dynamsoft-image-processing
npm install dynamsoft-core
npm install dynamsoft-license
npm install dynamsoft-utility
npm install dynamsoft-barcode-reader
npm install dynamsoft-capture-vision-router
npm install dynamsoft-camera-enhancer
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
    <script src="./node_modules/dynamsoft-core/dist/core.js"></script>
    <script src="./node_modules/dynamsoft-license/dist/license.js"></script>
    <script src="./node_modules/dynamsoft-utility/dist/utility.js"></script>
    <script src="./node_modules/dynamsoft-barcode-reader/dist/dbr.js"></script>
    <script src="./node_modules/dynamsoft-capture-vision-router/dist/cvr.js"></script>
    <script src="./node_modules/dynamsoft-camera-enhancer/dist/dce.js"></script>
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
/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

Dynamsoft.License.LicenseManager.initLicense(
  "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ=="
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.0.21&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

Dynamsoft.Core.CoreModule.engineResourcePaths = {
  std: "./node_modules/dynamsoft-capture-vision-std/dist/",
  dip: "./node_modules/dynamsoft-image-processing/dist/",
  core: "./node_modules/dynamsoft-core/dist/",
  license: "./node_modules/dynamsoft-license/dist/",
  cvr: "./node_modules/dynamsoft-capture-vision-router/dist/",
  dbr: "./node_modules/dynamsoft-barcode-reader/dist/",
  dce: "./node_modules/dynamsoft-camera-enhancer/dist/"
};
(async function () {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(
      cameraView
    );
    document
      .querySelector("#div-ui-container")
      .append(cameraView.getUIElement()); // Get default UI and append it to DOM.

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    const router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    router.setInput(cameraEnhancer);

    // Define a callback for results.
    const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = (result) => {
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
    };
    router.addResultReceiver(resultReceiver);

    // Filter out unchecked and duplicate results.
    const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      true
    ); // Filter out unchecked barcodes.
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      true
    );
    filter.setDuplicateForgetTime(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      3000
    );
    await router.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await router.startCapturing("ReadSingleBarcode");
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
