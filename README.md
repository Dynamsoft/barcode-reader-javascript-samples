# Dynamsoft Barcode Reader samples for the web

This repository contains multiple samples that demonstrates how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/?utm_source=sampleReadme) for creating web-based barcode scanning applications.

## Get the Code

Cloning the full repository may be slow due to its extensive history. To get started quickly, you have a few options:

- Download as [zip](https://github.com/Dynamsoft/barcode-reader-javascript-samples/archive/refs/heads/main.zip)
- Download as [tar.gz](https://github.com/Dynamsoft/barcode-reader-javascript-samples/archive/refs/heads/main.tar.gz)
- Shallow clone with Git:

```git
git clone https://github.com/Dynamsoft/barcode-reader-javascript-samples.git --depth 1
```

> [!NOTE]
> If you expect unstable network conditions or prefer to work entirely offline, you can download the [offline package from Dynamsoft website](https://www.dynamsoft.com/barcode-reader/downloads/1000003-confirmation/). This includes the full repository and all required dependencies for offline use.
>
> **Running the Samples Locally**
>
> Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):
>
> 1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.
>
> 2. Right-click on `hello-world.html` and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/hello-world.html`.

## Request a trial license

A default license is included which allows you to test the sample apps for up to 24 hours. You can [request a 30-day trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme) via Dynamsoft website to evaluate further.

## Documentation

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/?ver=10.5.1000&utm_source=sampleReadme).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).

## Sample list

### Barcode Scanner API samples

**Scan single barcode**

Get the basic features working with plain/native JavaScript or within a framework like [Angular](https://angular.io/), [React](https://reactjs.org/) or [Vue](https://vuejs.org/), with RTU-BarcodeScanner APIs.

* [**Scan Single Barcode**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/hello-world.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/barcode-scanner-api-samples/scan-single-barcode/hello-world.html?utm_source=sampleReadme): Scan single barcode from video stream with minimum code in JavaScript.
* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/angular): Read single barcode from camera in an Angular application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/react): Read single barcode from camera in a React application.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-single-barcode/vue): Read single barcode from camera in a Vue application.

**Scan multiple barcodes**

* [**Scan Multiple Barcodes**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/scan-multiple-barcodes/hello-world.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/barcode-scanner-api-samples/scan-multiple-barcodes/hello-world.html?utm_source=sampleReadme): Scan barcodes from video stream with minimum code in JavaScript.
* [**Cart Builder**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/scan-multiple-barcodes/cart-builder.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/barcode-scanner-api-samples/scan-multiple-barcodes/cart-builder.html?utm_source=sampleReadme): Simulates a shopping experience where users scan barcodes to add items to a dynamic cart in JavaScript.

### Foundational API samples

**Hello World**

Get the basic features of the library working with plain/native JavaScript or within a framework like [Angular](https://angular.io/), [React](https://reactjs.org/) or [Vue](https://vuejs.org/), etc.

* [**Hello World**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/hello-world.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/hello-world/hello-world.html?utm_source=sampleReadme): Scan barcodes from video stream with minimum code in JavaScript.
* [**Read an Image**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/read-an-image.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/hello-world/read-an-image.html?utm_source=sampleReadme): Decode barcodes from images in mobile album or desktop file system.
* [**Hello World in Angular**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/angular#readme): Read barcodes from camera and images in an Angular application.
* [**Hello World in Blazor**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/blazor#readme): Read barcodes from camera and images in a Blazor application.
* [**Hello World in React**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/react#readme): Read barcodes from camera and images in a React application.
* [**Hello World in React using Hooks**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/react-hooks#readme): Read barcodes from camera and images in a React application and use the Hooks charactor of React.
* [**Hello World in Vue**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/vue#readme): Read barcodes from camera and images in a Vue 3 application.
* [**Hello World in Next.js**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/next#readme): Read barcodes from camera and images in a Next.js application.
* [**Hello World in Nuxt**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/nuxt#readme): Read barcodes from camera and images in a Nuxt application.
* [**Hello World in Electron**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/electron#readme): Read barcodes from camera and images in a Electron application.
* [**Hello World in PWA**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/pwa#readme): Decode video stream in a PWA application from a webcam or a built-in camera.
* [**Hello World with RequireJS**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/requirejs.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/hello-world/requirejs.html?utm_source=sampleReadme): Decode video stream in an application using RequireJS from a webcam or a built-in camera.
* [**Hello World with ES6**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/es6.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/hello-world/es6.html?utm_source=sampleReadme): Decode video stream in an application using ES6 from a webcam or a built-in camera.
* [**Hello World in WebView**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/hello-world/webview): Decode video stream in an application in WebView from camera. 

***Use Cases***

* [**Read Video and Fill a Form**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/use-case/fill-a-form-with-barcode-reading.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/use-case/fill-a-form-with-barcode-reading.html?utm_source=sampleReadme): Read barcodes to fill a form.
* [**Read a Driver's License**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/use-case/read-a-drivers-license/index.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/use-case/read-a-drivers-license/index.html?utm_source=sampleReadme): Read the PDF417 barcode on a driver's license (AAMVA compliant) and parse it.
* [**Show Result Texts on the Video**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/use-case/show-result-texts-on-the-video.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/use-case/show-result-texts-on-the-video.html?utm_source=sampleReadme): Read barcodes via camera and show result texts on the video.
* [**Locate an Item with Barcode**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/use-case/locate-an-item-with-barcode/index.html) - [run&nearrow;](https://demo.dynamsoft.com/samples/dbr/js/foundational-api-samples/use-case/locate-an-item-with-barcode/index.html?utm_source=sampleReadme): Find a specific item in a large collection by scanning its unique barcode

***Others***

* [**Debug**](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/foundational-api-samples/others/debug#readme): Collect the actual image frames for debugging purposes.

### Official Online Demo

- [**Official Online Demo**](https://demo.dynamsoft.com/barcode-reader-js): Official demo for Dynamsoft Barcode Reader JavaScript Edition (written in Vue). Take our barcode scanner demo and see how it works in different modes!
