# The Hello World Sample Set

As you have already gone through the [user guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=10.4.2002#hello-world---simplest-implementation), you may have come across some basic "Hello World" code that can help you create a simple web application using our SDK quickly.

In this set of samples, we will revisit the "Hello World" code and show how to implement it using some popular frameworks, such as Angular, React, and Vue.

Let's now go through each of the samples.

## Hello World

In this example, you will learn the minimum codes required to initialize and set up the SDK.

Let's quickly break down the methods used in order:

- `Dynamsoft.License.LicenseManager.initLicense()`: This method initializes the license for using the SDK in the application.
- `Dynamsoft.CVR.CaptureVisionRouter.createInstance()`: This method creates a `CaptureVisionRouter` object `cvRouter` which controls the entire process in three steps:
  - **Retrieve Images from the Image Source**
    - `cvRouter` connects to the image source through the [`Image Source Adapter`](https://www.dynamsoft.com/capture-vision/docs/core/architecture/input.html#image-source-adapter?lang=js) interface with the method `setInput()`.
      ```js
      cvRouter.setInput(cameraEnhancer);
      ```
    > The image source in our case is a CameraEnhancer object created with `Dynamsoft.DCE.CameraEnhancer.createInstance(view)`
  - **Coordinate Image-Processing Tasks**
    - The coordination happens behind the scenes. `cvRouter` starts the process by specifying a preset template "ReadSingleBarcode" with the method `startCapturing()`.
      ```js
      cvRouter.startCapturing("ReadSingleBarcode");
      ```
  - **Dispatch Results to Listening Objects**
    - The processing results are returned through the [`CapturedResultReceiver`](https://www.dynamsoft.com/capture-vision/docs/core/architecture/output.html#captured-result-receiver?lang=js) interface. The `CapturedResultReceiver` object `resultReceiver` is registered to `cvRouter` via the method `addResultReceiver()`.
      ```js
      cvRouter.addResultReceiver(resultReceiver);
      ```
    - Also note that reading from video is extremely fast and there could be many duplicate results. We can use a `MultiFrameResultCrossFilter` object with result deduplication enabled to filter out the duplicate results. The object is registered to `cvRouter` via the method `addResultFilter()`.
      ```js
      cvRouter.addResultFilter(filter);
      ```

> Read more on [Capture Vision Router](https://www.dynamsoft.com/capture-vision/docs/core/architecture/?lang=js).

## Hello World - Read Barcodes from an Image

The second sample processes static images and returns barcode results.

In this sample, an event listener is set up so that the SDK decodes any images that the user uploads.

When working with the CaptureVisionRouter class for single image processing, the main method to use is [`capture`](https://www.dynamsoft.com/capture-vision/docs/web/programming/javascript/api-reference/capture-vision-router/single-image-processing.html?lang=js), You can find more details about this method at the link above.

## Hello World in Angular

Read more in the README under "angular".

## Hello World in Blazor

Read more in the README under "blazor".

## Hello World in Electron

Read more in the README under "electron".

## Hello World in Next.js

Read more in the README under "next".

## Hello World in NuxtJS

Read more in the README under "nuxt".

## Hello World in PWA

Read more in the README under "pwa".

## Hello World in React

Read more in the README under "react".

## Hello World in React using Hooks

Read more in the README under "react-hooks".

## Hello World in Svelte

Read more in the README under "svelte".

## Hello World in Vue

Read more in the README under "vue".

## Hello World with RequireJS

This sample shows how to use the SDK in a web page based on RequireJS.

## Hello World with ES6

This sample shows how to use the SDK in a web page based on ES6 (also known as ECMAScript 2015 or ECMAScript 6).

## Hello World with WebView

Read more in the README under "webview".

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
