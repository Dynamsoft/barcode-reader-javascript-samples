# Dynamsoft Barcode Reader samples for the web

This repository contains multiple samples that demonstrates how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/).

## Hello World samples

Get the basic features of the library working with plain/native JavaScript or within a framework like [Angular](https://angular.io/), [React](https://reactjs.org/) or [Vue](https://vuejs.org/), etc.

* Simplest Implementation: Minimum necessary JavaScript code to get the BarcodeScanner (video) up and running.
* Read an Existing Image: Decode barcodes using images that are stored locally, whether on mobile or desktop.
* Hello World in Angular: Decode video stream in an Angular Application from a USB-connected or built-in camera (mobile or desktop).
* Hello World in React: Decode video stream in a React Application from a USB-connected or built-in camera (mobile or desktop).
* Hello World in Vue: Decode video stream in a Vue Application from a USB-connected or built-in camera (mobile or desktop).

## Customize Camera UI

* Use the Default Camera UI: Show the default camera UI to decode video stream from a USB-connected or built-in camera (mobile or desktop).
* Hide Built-in Controllers: Hide built-in UI elements (camera selection, resolution selection, etc.) and show only the video stream.
* Use External Controllers: Use custom controllers to manipulate the Camera UI.
* Enlarge the Video Stream: Enlarge the video stream temporarily to read a barcode.

## Settings

How to configure different settings of the library.

* Formats and Count: Set the barcode formats and control the number of barcodes to read per image/frame.
* Localization and Binarization: Set how localization and binarization are done during barcode decoding.
* Blurry or Small codes: Set DeblurModes and ScaleUpModes for decoding blurry or small barcodes.
* Deformed or Incomplete codes: Set DeformationResistingModes or BarcodeComplementModes for decoding deformed or incomplete barcodes.
* Define or Detect the Region: Set the region of interest manually or regionPredetectionModes to speed up the reading process.
* Try All Settings: Try all available settings.

## Real-World

Real-world usage of the library.

* Read Video and Fill a Form: Read barcodes to fill a form.
* Read a Driver's License: Read the PDF417 barcode on a driver's license (AAMVA compliant) and parse it.

> NOTE
>  
> The library requires a license to work, the APIs organizationID and handshakeCode specify how to acquire a license.
>  
> If nothing is specified, a 7-day (public) trial license will be used by default which is the case in this sample.
> Note that network connection is required for this license acquisition to work.
>
> When using your own license, please uncomment the following lines in the code and fill in your own information.
> 
> For more information, please refer to https://www.dynamsoft.com/license-tracking/docs/about/licensefaq.html?ver=latest#how-to-use-a-trackable-license.
> 
> ``` javascript
> // Dynamsoft.DBR.BarcodeReader.organizationID = "YOUR-ORGANIZATION-ID";
> // Dynamsoft.DBR.BarcodeReader.handshakeCode = "A-SPECIFIC-HANDSHAKECODE";
> // Dynamsoft.DBR.BarcodeReader.sessionPassword = "PASSWORD-TO-PROTECT-YOUR-LICENSE"; // Important field to protect your license.
> // Dynamsoft.DBR.BarcodeReader.licenseServer = ["YOUR-OWN-MAIN-LTS", "YOUR-OWN-STANDBY-LTS"]; // Ignore this line if you are using Dynamsoft-hosting LTS
> ```
> The API "productKeys" is an alternative way to license the library, the major difference is that it does not require a network. Contact support@dynamsoft.com for more information. */
> 
> ``` javascript
> // Dynamsoft.DBR.BarcodeReader.productKeys = "YOUR-PRODUCT-KEY";
> ```

If you have any questions with these samples, feel free to submit an issue or [contact us](https://www.dynamsoft.com/company/contact/).
