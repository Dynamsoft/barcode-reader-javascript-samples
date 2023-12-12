# Dynamsoft Barcode Reader samples for the web

This repository contains multiple samples that demonstrates how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/?utm_source=sampleReadme) for creating web-based barcode scanning applications.

## Request a trial license

A default license is included which allows you to test the sample apps for up to 24 hours. You can [request a trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme) via Dynamsoft customer portal to evaluate further.

## Documentation

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/programming/javascript/?ver=9.6.32&utm_source=sampleReadme).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).

## Sample list

### Hello World

Get the basic features of the library working with plain/native JavaScript or within a framework like [Angular](https://angular.io/), [React](https://reactjs.org/) or [Vue](https://vuejs.org/), etc.

* [**Hello World**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/1.hello-world.html?utm_source=sampleReadme): Scan barcodes from video stream with minimum code in JavaScript.
* [**Read an Image**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/2.read-an-image.html?utm_source=sampleReadme): Decode barcodes from images in mobile album or desktop file system.
* [**Hello World in Angular**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/3.read-video-angular/dist/hello-world/?utm_source=sampleReadme): Decode video stream in an Angular application from a webcam or a built-in camera.
* [**Hello World in React**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/4.read-video-react/build/?utm_source=sampleReadme): Decode video stream in a React application from a webcam or a built-in camera.
* [**Hello World in React using Hooks**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/13.read-video-react-hooks/build/?utm_source=sampleReadme): Decode video stream in a React application from a webcam or a built-in camera and use the Hooks charactor of React.
* [**Hello World in Vue**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/5.read-video-vue/dist/?utm_source=sampleReadme): Decode video stream in a Vue 2 application from a webcam or a built-in camera.
* [**Hello World in Vue 3**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/6.read-video-vue3/dist/?utm_source=sampleReadme): Decode video stream in a Vue 3 application from a webcam or a built-in camera.
* [**Hello World in Next.js**](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-nextjs.html?utm_source=sampleReadme): Decode video stream in a Next.js application from a webcam or a built-in camera.
* [**Hello World in Nuxt**](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-nuxtjs.html?utm_source=sampleReadme): Decode video stream in a Nuxt application from a webcam or a built-in camera.
* [**Hello World in Electron**](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/helloworld-electron.html?utm_source=sampleReadme): Decode video stream in a Electron application from a webcam or a built-in camera.
* [**Hello World in PWA**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/10.read-video-pwa/helloworld-pwa.html?utm_source=sampleReadme): Decode video stream in a PWA application from a webcam or a built-in camera.
* [**Hello World with RequireJS**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/11.read-video-requirejs.html?utm_source=sampleReadme): Decode video stream in an application using RequireJS from a webcam or a built-in camera.
* [**Hello World with ES6**](https://demo.dynamsoft.com/samples/dbr/js/1.hello-world/12.read-video-es6.html?utm_source=sampleReadme): Decode video stream in an application using ES6 from a webcam or a built-in camera.
* [**Hello World in WebView**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/1.hello-world/14.read-video-webview): Decode video stream in an application in WebView from camera. 
### Customize Camera UI

* [**Use the Default Camera UI**](https://demo.dynamsoft.com/samples/dbr/js/2.ui-tweaking/1.read-video-show-result.html?utm_source=sampleReadme): Show the default camera UI to decode video stream from a webcam or a built-in camera.
* [**Hide Display Controls**](https://demo.dynamsoft.com/samples/dbr/js/2.ui-tweaking/2.read-video-no-extra-control.html?utm_source=sampleReadme): Hide built-in UI elements (camera selection, resolution selection, etc.) and show only the video stream.
* [**Set up External Controls**](https://demo.dynamsoft.com/samples/dbr/js/2.ui-tweaking/3.read-video-with-external-control.html?utm_source=sampleReadme): Use custom controllers to manipulate the Camera UI.
* [**Changing Size of Video Viewer**](https://demo.dynamsoft.com/samples/dbr/js/2.ui-tweaking/4.difference-video-size.html?utm_source=sampleReadme): Enlarge the video stream temporarily to read a barcode.
* [**Customize the Camera UI**](https://demo.dynamsoft.com/samples/dbr/js/2.ui-tweaking/5.read-video-with-custom-default-ui.html?utm_source=sampleReadme): Show the custom camera UI to decode video stream from a webcam or a built-in camera.

### Parameter Settings

How to configure different settings of the barcode scanning library.

* [**Formats and Count**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/1.barcodeFormats-expectedBarcodes.html?utm_source=sampleReadme): Set the barcode formats and the number of barcodes to read per image/frame.
* [**Localization and Binarization**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/2.localizationModes-binarizationModes.html?utm_source=sampleReadme): Set how localization and binarization are done during barcode decoding.
* [**Blurry or Small codes**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/3.blurred-small-barcodes.html?utm_source=sampleReadme): Set `DeblurModes` and `ScaleUpModes` for decoding blurry or small barcodes.
* [**Deformed or Incomplete codes**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/4.deformed-incomplete-barcodes.html?utm_source=sampleReadme): Set `DeformationResistingModes` or `BarcodeComplementModes` for decoding deformed or incomplete barcodes.
* [**Define or Detect the Region**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/5.regionOfInterest-regionPredetection.html?utm_source=sampleReadme): Set the region of interest manually or `regionPredetectionModes` to speed up the barcode reading process.
* [**Dense codes**](https://demo.dynamsoft.com/samples/dbr/js/3.settings/6.dense-barcodes.html?utm_source=sampleReadme): Set `dense` template and high resolution for decoding dense barcodes.

### Use Cases

* [**Read Video and Fill a Form**](https://demo.dynamsoft.com/samples/dbr/js/4.use-case/1.fill-a-form-with-barcode-reading.html?utm_source=sampleReadme): Read barcodes to fill a form.
* [**Read a Driver's License**](https://demo.dynamsoft.com/samples/dbr/js/4.use-case/2.read-a-drivers-license.html?utm_source=sampleReadme): Read the PDF417 barcode on a driver's license (AAMVA compliant) and parse it.
* [**Show Result Texts on the Video**](https://demo.dynamsoft.com/samples/dbr/js/4.use-case/3.show-result-texts-on-the-video.html?utm_source=sampleReadme): Read barcodes via camera and show result texts on the video.

### Others

* [**Debug**](https://www.dynamsoft.com/barcode-reader/programming/javascript/samples-demos/debug.html?utm_source=sampleReadme): Collect the actual image frames for debugging purposes.
