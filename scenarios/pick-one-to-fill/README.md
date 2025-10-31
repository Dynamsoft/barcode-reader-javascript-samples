# ✅ Pick One to Fill

A compact demo that helps pick the correct item from several candidates by scanning barcodes. The sample uses the Dynamsoft Barcode Reader bundle to decode barcodes from camera or image input and demonstrates a simple match-and-highlight UX.

## Included files

- `index.html` — main demo page.  
- `index.css` — styles for the demo.  
- `package-label.png` — sample product label used by the demo.

## ✨ Features

- Field-specific Camera Activation Open the camera individually for different fields.
- Manual control when to start decoding Start decoding manually after aiming at the target to reduce the risk of misreads and missed barcodes.
- Auto-Fill with Scan Result Automatically populates input fields with scanned barcode values.

## 🔄 Sample Usage Flow

1. Click the "Open Camera" button to activate the camera.
2. Aim at the sample image shown below.
3. Click the "Decode" button to start barcode recognition.
4. If only one barcode is detected, its value will be automatically filled into the corresponding field. If multiple barcodes are detected, the video stream will freeze, and you’ll need to manually select one from the decoded results to fill in.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 📌 Notes

- This usage is especially suitable for scenarios with densely packed barcodes, where secondary confirmation or manual selection is highly needed.
- You can find a sample reference image in ·./pick-one-to-fill/·