# Dynamsoft Barcode Reader Samples for the Web

This repository contains multiple samples that demonstrate how to use the [Dynamsoft Barcode Reader JavaScript Edition](https://www.dynamsoft.com/barcode-reader/sdk-javascript/?utm_source=sampleReadme) for creating web-based barcode scanning applications.

---

## System Requirements

### Secure Context (HTTPS Deployment)

When deploying your application/website for production, make sure to serve it via a secure HTTPS connection. This is required for two reasons:

- Access to the camera video stream is only granted in a security context. Most browsers impose this restriction.
- Dynamsoft License requires a secure context to work.

> Some browsers like Chrome may grant access for `http://127.0.0.1` and `http://localhost` or even for pages opened directly from the local disk (`file:///...`). This can be helpful for temporary development and testing.

### Browser Compatibility

The following table is a list of supported browsers based on the above requirements:

| Browser Name |     Version      |
| :----------: | :--------------: |
|    Chrome    | v78+             |
|   Firefox    | v68+             |
|     Edge     | v79+             |
|    Safari    | v14.5+           |

Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the SDK.

---

## License

A default trial license is included which allows you to test the sample apps for up to 24 hours. You can [request a 30-day trial license](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme) via the Dynamsoft website to evaluate further.

>[!IMPORTANT]
> Once your trial license expires, the SDK will throw an error and cease to function. You can visit the [Dynamsoft Customer Portal](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=sampleReadme&package=js) to view your trial license details. Additionally, it's possible to extend the trial period via the customer portal, allowing for a total trial duration of 60 days.

---

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

---

## Running the Samples Locally

The standalone samples in `vanilla/` (`hello-world.html`, `scan-a-single-barcode.html`, `read-an-image.html`, and all scenario samples) load the SDK from a CDN, so you can open them directly by double-clicking — no web server required (an internet connection is needed).

To browse all available samples, open `index.html` in your browser — it links to every sample in the repository.

For framework samples, follow the instructions in each framework's `hello-world/` subfolder README (typically `npm install` then `npm run dev`).

If you need a web server for standalone or scenario samples, here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on an HTML file and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/`.

---

## Sample Folders

- **`vanilla/`** — Standalone vanilla JS samples: the three foundational hello-world samples plus all scenario samples (workflow, barcode-type, and data-parsing demos). No build step required.

- **`angular/`**, **`blazor/`**, **`capacitor/`**, **`electron/`**, **`es6/`**, **`maui-blazor-hybrid/`**, **`native-ts/`**, **`next/`**, **`nuxt/`**, **`pwa/`**, **`react/`**, **`requirejs/`**, **`svelte/`**, **`vue/`**, **`webview/`** — Framework-specific samples, each containing a `hello-world/` project.

---

## Vibe Coding with AI Agents

This repository ships an **AI coding skill** that gives GitHub Copilot, Claude, and Codex deep knowledge of the Dynamsoft Barcode Reader JavaScript SDK — so you can describe what you want and get working code instantly.

### How It Works

The skill lives in:

```
.github/skills/dbr-js-sample-creator/   ← GitHub Copilot (auto-discovered)
.claude/skills/dbr-js-sample-creator/   ← Claude Code (auto-discovered)
.codex/skills/dbr-js-sample-creator/    ← OpenAI Codex (auto-discovered)
```

No installation or configuration needed — just clone the repo and open it in your AI-enabled editor.

### Example Prompts

Open your AI agent (e.g. GitHub Copilot Chat in agent mode) and try:

- *"Create a plain HTML barcode scanner that reads from camera and shows results"*
- *"Build a React component that scans barcodes with proper cleanup"*
- *"Make a Vue 3 page that decodes barcodes from an uploaded image"*
- *"Write an ES6 module barcode scanner using the CDN .mjs bundle"*
- *"Scan QR codes only using a custom JSON template"*

The agent will automatically load the skill and generate correct, production-ready code using the right SDK version, license key, API patterns, and framework conventions — without you needing to read any documentation.

---

## Documentation

For the developer guide and full API reference of Dynamsoft Barcode Reader JavaScript library, please check out the [documentation](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?utm_source=sampleReadme).

- [API Docs](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/index.html?utm_source=sampleReadme)

---

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).

---

## Sample List

### Hello World

- [hello-world.html](./vanilla/hello-world.html) — Demonstrates continuously scanning and collecting multiple unique barcodes via camera.
- [scan-a-single-barcode.html](./vanilla/scan-a-single-barcode.html) — Demonstrates single-barcode scanning: stops and returns as soon as the first barcode is detected.
- [read-an-image.html](./vanilla/read-an-image.html) — Demonstrates how to decode and read barcodes from uploaded image files.

### Frameworks

- [angular/hello-world/](./angular/hello-world/) — Angular example.
- [blazor/hello-world/](./blazor/hello-world/) — Blazor (.NET) example.
- [capacitor/hello-world/](./capacitor/hello-world/) — Capacitor mobile hybrid example.
- [electron/hello-world/](./electron/hello-world/) — Electron desktop example.
- [es6/hello-world/](./es6/hello-world/) — Plain ES6 module example.
- [maui-blazor-hybrid/hello-world/](./maui-blazor-hybrid/hello-world/) — MAUI Blazor Hybrid (.NET) example.
- [native-ts/hello-world/](./native-ts/hello-world/) — Native TypeScript example.
- [next/hello-world/](./next/hello-world/) — Next.js example.
- [nuxt/hello-world/](./nuxt/hello-world/) — Nuxt example.
- [pwa/hello-world/](./pwa/hello-world/) — Progressive Web App example.
- [react/hello-world/](./react/hello-world/) — React example.
- [requirejs/hello-world/](./requirejs/hello-world/) — RequireJS (AMD) example.
- [svelte/hello-world/](./svelte/hello-world/) — Svelte example.
- [vue/hello-world/](./vue/hello-world/) — Vue example.
- [webview/hello-world/](./webview/hello-world/) — Native WebView example for Android/iOS.

### Scenarios

- [pick-one-to-fill/](./vanilla/pick-one-to-fill/) — Picking the correct one from multiple candidates by scanning barcodes.
- [cart-builder/](./vanilla/cart-builder/) — Single-page demo illustrating adding scanned items into a shopping cart.
- [scan-and-search/](./vanilla/scan-and-search/) — Example that scans a barcode and performs a lookup/search operation.
- [tip-and-beep/](./vanilla/tip-and-beep/) — Camera scanning with rotating tip messages and beep feedback on successful detection.
- [show-result-texts-on-the-video/](./vanilla/show-result-texts-on-the-video/) — Overlay decoded text on live video while scanning.
- [batch-inventory/](./vanilla/batch-inventory/) — Batch scanning workflow for inventory collection and export.
- [read-a-drivers-license/](./vanilla/read-a-drivers-license/) — Demo for reading and parsing a driver's license image/data.
- [read-vin/](./vanilla/read-vin/) — Demo for reading and parsing a VIN (vehicle identification number) code.
- [read-and-parse-GS1-AI/](./vanilla/read-and-parse-GS1-AI/) — Example showing GS1 AI parsing and data extraction.
- [scan-qr-code/](./vanilla/scan-qr-code/) — QR code targeted demo and settings.
- [scan-common-1D-and-2D/](./vanilla/scan-common-1D-and-2D/) — Demo configured to detect a wide range of barcode formats.
- [scan-common-2D-codes/](./vanilla/scan-common-2D-codes/) — Focused on common 2D barcode formats decoding.
- [scan-datamatrix-code/](./vanilla/scan-datamatrix-code/) — DataMatrix code targeted demo with optimized settings.
- [scan-dpm-codes/](./vanilla/scan-dpm-codes/) — Demo for reading Direct Part Mark (DPM) codes etched or marked on surfaces.
- [scan-1D-Retail/](./vanilla/scan-1D-Retail/) — 1D retail barcode tuning example.
- [scan-1D-Industrial/](./vanilla/scan-1D-Industrial/) — 1D industrial barcode tuning example.
- [scan-from-distance/](./vanilla/scan-from-distance/) — Demo for scanning barcodes from a distance (zoom/ROI tuning).
- [locate-an-item-with-barcode/](./vanilla/locate-an-item-with-barcode/) — UI to help locate items with barcodes in a list or layout.
- [grid-barcode-reading/](./vanilla/grid-barcode-reading/) — Scan a grid of DataMatrix / QR codes from an uploaded image with fast scan, layout analysis, and deep decode.
- [use-typescript-in-ui-definition/](./vanilla/use-typescript-in-ui-definition/) — Uses React as the framework for business logic, TypeScript for the UI definition script portion, and imports the UI definition JS in UMD format.
- [debug/](./vanilla/debug/) — Debug utilities and a small server (frame collector) used for testing and troubleshooting.

### Official Online Demo

- [**Official Online Demo**](https://demo.dynamsoft.com/barcode-reader-js): Try the Dynamsoft Barcode Reader JavaScript Edition demo (written in Vue) and see how it works in different modes!