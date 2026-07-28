# React with Customized Camera UI

This sample is an implementation of the guide [Customize the UI in New UI Definition Format](https://www.dynamsoft.com/barcode-reader/docs/core/programming/features/ui-customization-js.html?lang=js).

It uses React as the framework for business logic, TypeScript for the UI definition script portion, and imports the UI definition JS in UMD format.

Compared to [Hello World Sample for React](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/react), the core changes in this sample are:

1. Added `public/dce.ui.v5.xml`, the main UI definition file.
2. Added `dce.ui.ts`, the TypeScript source code for the UI definition file.
3. Added `build-dce-ui.mjs`, used to compile `dce.ui.ts` to generate `public/dce.ui.js`.
4. Registered `build-dce-ui.mjs` in `package.json`, so it is executed with `start` and `build`.
5. Removed content related to the `ImageCapture` component to focus on the main theme.
6. Modified `VideoCapture` to use a custom UI, and disabled `startCapturing` to demonstrate take photo.
