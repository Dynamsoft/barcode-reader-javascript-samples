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



