# Dynamsoft Barcode Reader samples for the web

This repository contains multiple samples that demonstrates how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) for creating web-based barcode scanning applications.

## Request a trial license

A default license is included which allows you to test the sample apps for up to 24 hours. You can [request a trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js) via Dynamsoft customer portal to evaluate further.

## Documentation

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/programming/javascript/?ver=latest).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact).

## Sample list

### Hello World

Get the basic features of the library working with plain/native JavaScript or within a framework like [Angular](https://angular.io/), [React](https://reactjs.org/) or [Vue](https://vuejs.org/), etc.

* **Hello World**: Scan barcodes from video stream with minimum code in JavaScript.
* **Read an Existing Image**: Decode barcodes from existing images that are stored locally, whether on mobile or desktop.
* **Hello World in Angular**: Decode video stream in an Angular application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in React**: Decode video stream in a React application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in Vue 2**: Decode video stream in a Vue 2 application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in Vue 3**: Decode video stream in a Vue 3 application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in Next.js**: Decode video stream in a Next.js application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in Nuxt**: Decode video stream in a Nuxt application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World in Electron**: Decode video stream in a Electron application from a USB-connected or built-in camera (desktop only).
* **Hello World in PWA**: Decode video stream in a PWA application from a USB-connected or built-in camera (mobile or desktop).
* **Hello World with RequireJS**: Decode video stream in an application using RequireJS from a USB-connected or built-in camera (mobile or desktop).
* **Hello World with ES6**: Decode video stream in an application using ES6 from a USB-connected or built-in camera (mobile or desktop).

### Customize Camera UI

* **Use the Default Camera UI**: Show the default camera UI to decode video stream from a USB-connected or built-in camera (mobile or desktop).
* **Hide Display Controls**: Hide built-in UI elements (camera selection, resolution selection, etc.) and show only the video stream.
* **Set up External Controls**: Use custom controllers to manipulate the Camera UI.
* **Changing Size of Video Viewer**: Enlarge the video stream temporarily to read a barcode.
* **Customize the Camera UI**: Show the custom camera UI to decode video stream from a USB-connected or built-in camera (mobile or desktop).

### Parameter Settings

How to configure different settings of the barcode scanning library.

* **Formats and Count**: Set the barcode formats and control the number of barcodes to read per image/frame.
* **Localization and Binarization**: Set how localization and binarization are done during barcode decoding.
* **Blurry or Small codes**: Set `DeblurModes` and `ScaleUpModes` for decoding blurry or small barcodes.
* **Deformed or Incomplete codes**: Set `DeformationResistingModes` or `BarcodeComplementModes` for decoding deformed or incomplete barcodes.
* **Define or Detect the Region**: Set the region of interest manually or `regionPredetectionModes` to speed up the barcode reading process.

### Use Case

* **Read Video and Fill a Form**: Read barcodes to fill a form.
* **Read a Driver's License**: Read the PDF417 barcode on a driver's license (AAMVA compliant) and parse it.

### Others

* **Debug**: Collect the actual image frames for debugging purposes.
