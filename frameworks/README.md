# Frameworks samples

This directory contains framework-specific examples demonstrating how to integrate the Dynamsoft Barcode Reader (JavaScript edition) into common web and hybrid frameworks. Each framework folder contains one or more runnable sub-examples (for example, scan-using-foundational-api and/or scan-using-rtu-api) showing practical integration patterns.

## Sample list

- [frameworks/angular/](./frameworks/angular/) — Angular examples.
- [frameworks/blazor/](./frameworks/blazor/) — Blazor (.NET) examples.
- [frameworks/capacitor/](./frameworks/capacitor/) — Capacitor mobile hybrid examples.
- [frameworks/electron/](./frameworks/electron/) — Electron desktop examples.
- [frameworks/es6/](./frameworks/es6/) — Plain ES6 module examples.
- [frameworks/native-ts/](./frameworks/native-ts/) — Native TypeScript examples.
- [frameworks/next/](./frameworks/next/) — Next.js examples.
- [frameworks/nuxt/](./frameworks/nuxt/) — Nuxt examples.
- [frameworks/pwa/](./frameworks/pwa/) — Progressive Web App examples.
- [frameworks/react/](./frameworks/react/) — React examples.
- [frameworks/requirejs/](./frameworks/requirejs/) — RequireJS (AMD) examples.
- [frameworks/svelte/](./frameworks/svelte/) — Svelte examples.
- [frameworks/vue/](./frameworks/vue/) — Vue examples.
- [frameworks/webview/](./frameworks/webview/) — Native WebView examples for Android/iOS.

## Quick start

1. Browse into a framework subfolder and choose a subexample, e.g.:
   - cd frameworks/react/scan-using-foundational-api
2. Follow the subexample README for exact steps. Typical commands:
   - npm install
   - npm run dev (or npm start / npm run build per the subexample)
3. Open the local dev URL shown in the terminal (ensure you use localhost or HTTPS for camera access).

## Notes

- Serve examples via the framework dev server or a local HTTP server; opening files directly (file://) may break module loading or camera permissions.
- Camera and microphone access require a secure context (https or localhost).
- A trial license is included for short-term testing; request a longer trial from Dynamsoft for extended evaluation.
- For general instructions, license info and API docs, see the repository root README.md.

If a sub-example provides a README, follow it for platform-specific details and additional troubleshooting tips.