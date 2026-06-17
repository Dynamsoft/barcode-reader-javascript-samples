---
name: dbr-js-sample-creator
description: >
  Use when creating JavaScript, TypeScript, or HTML sample code using the Dynamsoft Barcode Reader
  SDK (dynamsoft-barcode-reader-bundle npm package or CDN). This skill covers all web barcode
  scanning use cases including live camera scanning, image file decoding, single-barcode scanning,
  QR codes, 1D barcodes, DataMatrix, PDF417, DPM, and framework integrations (React, Vue, Angular,
  Next.js, Nuxt, Svelte, Electron, Capacitor, Blazor, PWA, ES6 modules, plain HTML).
  Use this skill whenever the user mentions Dynamsoft Barcode Reader JavaScript, DBR JS,
  dynamsoft-barcode-reader-bundle, CaptureVisionRouter in the browser, barcode scanning with
  Dynamsoft in a web app, or wants to create a JavaScript/TypeScript sample that scans or decodes
  barcodes.
---

# DBR JavaScript Sample Creator

The canonical skill definition lives in `.github/skills/dbr-js-sample-creator/`.

**Read `.github/skills/dbr-js-sample-creator/SKILL.md` and its `references/` directory now.**

The `SKILL.md` file contains:
- SDK architecture overview and loading methods (CDN UMD, CDN ES module, npm)
- License initialization patterns and the default public trial key
- Camera scanning and image capture code patterns
- Code style conventions for this repository

The `references/` directory contains:
- `api-sdk.md` — SDK loading, namespaces, CoreModule, preset templates, BarcodeFormatIds, dynamic settings
- `api-camera.md` — CameraView, CameraEnhancer, tip messages, auto-zoom, drawing layers, audio feedback
- `api-image.md` — File capture, CapturedResult, BarcodeResultItem properties
- `api-frameworks.md` — React, Vue, Angular, Next.js (App Router) complete component patterns
- `api-parsing.md` — CodeParser for GS1, driver's license (AAMVA), VIN parsing
- `sample-patterns.md` — Copy-paste ready code for all common scenarios
