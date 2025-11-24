# Frameworks samples

This directory contains framework-specific examples demonstrating how to integrate the Dynamsoft Barcode Reader (JavaScript edition) into common web and hybrid frameworks. Each framework folder contains one or more runnable sub-examples (for example, scan-using-foundational-api and/or scan-using-rtu-api) showing practical integration patterns.

## Sample list

- [angular/](./angular/) — Angular examples.
- [blazor/](./blazor/) — Blazor (.NET) examples.
- [capacitor/](./capacitor/) — Capacitor mobile hybrid examples.
- [electron/](./electron/) — Electron desktop examples.
- [es6/](./es6/) — Plain ES6 module examples.
- [native-ts/](./native-ts/) — Native TypeScript examples.
- [next/](./next/) — Next.js examples.
- [nuxt/](./nuxt/) — Nuxt examples.
- [pwa/](./pwa/) — Progressive Web App examples.
- [react/](./react/) — React examples.
- [requirejs/](./requirejs/) — RequireJS (AMD) examples.
- [svelte/](./svelte/) — Svelte examples.
- [vue/](./vue/) — Vue examples.
- [webview/](./webview/) — Native WebView examples for Android/iOS.

## Quick start

1. Browse into a framework subfolder and choose a subexample, e.g.:
   ```cmd
   cd react/scan-using-rtu-api
   ```
1. Follow the subexample README for exact steps. Typical commands:
   ```cmd
   - npm install
   - npm run dev (or npm start / npm run build per the subexample)
   ```
2. Open the local dev URL shown in the terminal (ensure you use localhost or HTTPS for camera access).

## Notes

- Serve examples via the framework dev server or a local HTTP server; opening files directly (file://) may break module loading or camera permissions.
- Camera and microphone access require a secure context (https or localhost).
- A trial license is included for short-term testing; request a longer trial from Dynamsoft for extended evaluation.
- For general instructions, license info and API docs, see the repository root README.md.

If a sub-example provides a README, follow it for platform-specific details and additional troubleshooting tips.