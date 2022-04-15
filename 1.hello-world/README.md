# The Hello World Sample Set

As you have gone through the [user guide](https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=latest#getting-started---hello-world), you might have seen some basic "Hello World" code to help you quickly create a basic web application that uses our SDK.

This sample set will revisit the Hello World code, and its implementation in some of the popular frameworks such as Angular, React, an Vue.

Let's break down each of the samples

## Hello World - Read Barcodes via Video

In this sample, you will find the basic lines of code ncessary to initialize the SDK and set it up.

Let's quickly break down the methods used in order:

* `license`: This property specifies a license key. Read more on Specify the license.
* `createInstance()`: This method creates a `BarcodeScanner` object. This object can read barcodes directly from a video input with the help of its interactive UI (hidden by default) and the MediaDevices interface.
* `onFrameRead`: This event is triggered every time the SDK finishes scanning a video frame. The results object contains all the barcode results that the SDK have found on this frame. In this example, we print the results to the browser console.
* `onUniqueRead`: This event is triggered when the SDK finds a new barcode, which is not a duplicate among multiple frames. txt holds the barcode text value while result is an object that holds details of the barcode. In this example, an alert will be displayed for this new barcode.
* `show()`: This method brings up the built-in UI of the `BarcodeScanner` object and starts scanning

In fact, `onFrameRead` and `onUniqueRead` do not have to both be defined in the code. `onUniqueRead` is the more used one between the two as it is triggered when a new barcode is found rather than on every frame.

## Hello World - Read Barcodes from an Image

The second sample in this set focuses on the secondary class `BarcodeReader` which is a low-level barcode reader that processes still images and returns barcode results.

In this sample, a listener is set up so that the SDK decodes any image that the user uploads.

[`decode`](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader.html?ver=latest#decode) is the main method to go for when using the `BarcodeReader` class, although the class offers a number of other methods should you work with base64 strings, for instance. The rest of the image decoding methods can be found [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/BarcodeReader.html?ver=latest#decode-barcodes).

## Hello World - Angular

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-angular.html).

## Hello World in React

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-reactjs.html).

## Hello World in Vue 2

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-vuejs.html).

## Hello World in Vue 3

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-vuejsv3.html).

## Hello World in Next.js

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-nextjs.html).

## Hello World in NuxtJS

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-nuxtjs.html).

## Hello World in Electron

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-electron.html).

## Hello World in PWA

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-pwa.html).

## Hello World with RequireJS

Read more on the sample [here](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-requirejs.html).

## Hello World with ES6

This sample shows how to use the SDK in a web page based on ES6 (also known as ECMAScript 2015 or ECMAScript 6).

## Support

If you have any questions, feel free to contact Dynamsoft support via [email](mailto:support@dynamsoft.com) or [live chat](https://www.dynamsoft.com/barcode-reader/overview/) via the "Let's Chat" button.
