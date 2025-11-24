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

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/?ver=11.2.4000&utm_source=sampleReadme).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).

## Sample list

### Frameworks

- [angular/](./frameworks/angular/) — Angular examples.
- [blazor/](./frameworks/blazor/) — Blazor (.NET) examples.
- [capacitor/](./frameworks/capacitor/) — Capacitor mobile hybrid examples.
- [electron/](./frameworks/electron/) — Electron desktop examples.
- [es6/](./frameworks/es6/) — Plain ES6 module examples.
- [native-ts/](./frameworks/native-ts/) — Native TypeScript examples.
- [next/](./frameworks/next/) — Next.js examples.
- [nuxt/](./frameworks/nuxt/) — Nuxt examples.
- [pwa/](./frameworks/pwa/) — Progressive Web App examples.
- [react/](./frameworks/react/) — React examples.
- [requirejs/](./frameworks/requirejs/) — RequireJS (AMD) examples.
- [svelte/](./frameworks/svelte/) — Svelte examples.
- [vue/](./frameworks/vue/) — Vue examples.
- [webview/](./frameworks/webview/) — Native WebView examples for Android/iOS.

### Scenarios

- [pick-one-to-fill/](./scenarios/pick-one-to-fill/) — Picking the correct one from multiple candidates by scanning barcodes.
- [cart-builder/](./scenarios/cart-builder/) — Single-page demo illustrating adding scanned items into a shopping cart.
- [scan-and-search/](./scenarios/scan-and-search/) — Example that scans a barcode and performs a lookup/search operation.
- [show-result-texts-on-the-video/](./scenarios/show-result-texts-on-the-video/) — Overlay decoded text on live video while scanning.
- [batch-inventory/](./scenarios/batch-inventory/) — Batch scanning workflow for inventory collection and export.
- [read-a-drivers-license/](./scenarios/read-a-drivers-license/) — Demo for reading and parsing a driver's license image/data.
- [read-vin/](./scenarios/read-vin/) — Demo for reading and parsing a VIN(vehicle identification number) code.
- [read-and-parse-GS1-AI/](./scenarios/read-and-parse-GS1-AI/) — Example showing GS1 AI parsing and data extraction.
- [scan-qr-code/](./scenarios/scan-qr-code/) — QR code targeted demo and settings.
- [scan-common-1D-and-2D/](./scenarios/scan-common-1D-and-2D/) — Demo configured to detect a wide range of barcode formats.
- [scan-common-2D-codes/](./scenarios/scan-common-2D-codes/) — Focused on common 2D barcode formats decoding.
- [scan-datamatrix-code/](./scenarios/scan-datamatrix-code/) — DataMatrix code targeted demo with optimized settings.
- [scan-1D-Retail/](./scenarios/scan-1D-Retail/) — 1D retail barcode tuning example.
- [scan-1D-Industrial/](./scenarios/scan-1D-Industrial/) — 1D industrial barcode tuning example.
- [scan-from-distance/](./scenarios/scan-from-distance/) — Demo for scanning barcodes from a distance (zoom/ROI tuning).
- [locate-an-item-with-barcode/](./scenarios/locate-an-item-with-barcode/) — UI to help locate items with barcodes in a list or layout.
- [debug/](./scenarios/debug/) — Debug utilities and a small server (frame collector) used for testing and troubleshooting.

### Official Online Demo

- [**Official Online Demo**](https://demo.dynamsoft.com/barcode-reader-js): Official demo for Dynamsoft Barcode Reader JavaScript Edition (written in Vue). Take our barcode scanner demo and see how it works in different modes!
