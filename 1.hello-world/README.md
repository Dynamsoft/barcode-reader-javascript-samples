# The Hello World Sample Set

As you have gone through the user guide, you might have seen some basic "Hello World" code to help you quickly create a basic web application that uses our SDK. 

This sample set will revisit the Hello World code, and its implementation in some of the popular frameworks such as Angular, React, an Vue.

Let's break down each of the samples

### Hello World - Read Barcodes via Video

In this sample, you will find the basic lines of code ncessary to initialize the library and set it up.

Please note that if no license is specified in code via the `organizationID` property or the `productKeys` property, as shown in the commented lines of code, a 7-day public trial will be used starting from v8.2.5. In earlier versions, an error will be thrown if no license, trial or full, is specified.

Let's quickly break down the methods used in order:

- `createInstance`: This method instantiates a `BarcodeReader` object or a `BarcodeScanner` object, depending on the scenario.

- `onFrameRead`: This event is triggered after each single frame is scanned. The `results` object contains all the barcode results that the library found on this frame. In the above code, the results found in every frame are printed to the console. 

- `onUnduplicatedRead`: This event is triggered when a new barcode (not a duplicate) is found. `txt` holds the barcode text value while `result` is an object that holds details of the found barcode. In this example, an alert will be displayed for each unique barcode found.

- `show`: Displays the UI of the `BarcodeScanner` object and starts the scanning process.

In fact, `onFrameRead` and `onUnduplicatedRead` do not have to both be defined in the code. `onUnduplicatedRead` is the more used one between the two as it is triggered when a new barcode is found rather than on every frame.

### Hello World - Read Barcodes from an Image
The second sample in this set focusses on the secondary class of the JavaScript edition, `BarcodeReader`. To learn of the exact differences between the `BarcodeScanner` and `BarcodeReader` classes, please refer to the *BarcodeReader vs BarcodeScanner* section of the [User Guide](https://github.com/Dynamsoft/javascript-barcode#readme).

In this sample, a listener is set up so that the SDK decodes any image that the user uploads. Please note that the [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) API is used to read the uploaded file and convert it to a format suitable for the `BarcodeReader` API.

[`decode`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader.html?ver=latest#decode) is the main method to go for when using the `BarcodeReader` class, although the class offers a number of other methods should you work with base64 strings, for instance. The rest of the image decoding methods can be found [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader.html?ver=latest#decode-barcode).

### Hello World - Angular

This sample demonstrates how to use the library in an Angular application in the most basic manner. [Angular CLI](https://github.com/angular/angular-cli) v11.2.4 is used to generate this sample project.

As mentioned in the user guide, when working with Angular aplications, it is recommended to use the `dynamsoft-javascript-barcode` npm package. The library is then set up as its own component, in this case defined in `barcode-scanner`.

The majority of the `DBR` (short for Dynamsoft Barcode Reader) operations are grouped in the `barcode-scanner` folder. Since we are using the npm package, the engine files are not in the same location as the main library file, `src/app/dbr.ts`. Therefore, the `engineResourcePath` must be defined so that the library knows where to find the engine files.

In our sample, we assign the `engineResourcePath` to our jsDelivr CDN URL as it is the easiest way to go. However, you can choose to use the engine files in installed npm package instead as such:
```js
DBR.BarcodeScanner.engineResourcePath = "/node_modules/dynamsoft-javascript-barcode/dist/"; // use the npm package in node_modules
```
Please note that the path is relative to where the `dbr.ts` file is compared to the `node_modules` folder.

The license is also defined in `dbr.ts`, so please input your `organizationID` in order to use the trial license. Of course, this assumes that you requested a new trial license for DBR JavaScript via the customer portal.

Let's do a quick breakdown of the `barcode-scanner` folder where the barcode scanner component is declared and all of its operations are defined:

- `barcode-scanner.component.ts`: The core file where the scanner is created (via `createInstance`) and assigned a UI element (via `setUIElement`). Afterwards, the `onFrameRead` event action was set, and lastly the scanner is opened via the `open` method.

- `barcode-scanner.component.html/barcode-scanner.component.css`: Define the UI of the scanner object. Many of the elements referenced in these files (e.g. `dce-video`) are inherited from the default UI elements of the library defined in the engine files.

- `barcode-scanner.component.spec.ts`: Contains the unit tests of the component.

The `hello-world` component in turn implements the `barcode-scanner` component, with the main operation being defined in `hello-world.component.ts` and the UI in `hello-world.component.html`.

### Hello World - React JS
Much like the Angular implementation, the library is set up as its own component in the React JS implementation, based on the npm package `dynamsoft-javascript-barcode`. This sample project is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The barcode scanner component is defined in the `components` folder. `BarcodeScanner.js` is the most basic implementation of the library as a React component. The `BarcodeScanner` component is then used in the parent component, `HelloWorld`.

Please note that since we are using the npm package, the `engineResourcePath` must be defined in the `src/dbr.js` file, similar to the Angular implementation. In addition, the license must be specified via `organizationID` or `productKeys`, depending on the version of the library you are using.

### Hello World - Vue JS
The Vue implementation of the Hello World sample is very similar to the React and Angular implementations. Of course, this implementation will be based on the npm package `dynamsoft-javascript-barcode`.

The `BarcodeScanner.vue` component, defined in the `components` folder, includes the basic `DBR` methods to get the video scanner up and running. The `BarcodeScanner.vue` component is then used in the parent component, `HelloWorld`.

Like the previous implementations, the `engineResourcePath` and license will need to be defined in `src/dbr.js`

