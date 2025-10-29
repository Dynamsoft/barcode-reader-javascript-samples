# Scan From Distance

This sample demonstrates techniques for scanning barcodes from a distance, including ROI, zoom and resolution tuning with the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `index.html` — Demo page (camera & image input) and UI.
- `ReadDistantBarcodes.json` — Example configuration used by the sample (if present).

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/index.html`.

3. Allow camera access when prompted and point the camera at a barcode.

## What this sample shows

- Adjusting camera resolution and ROI for distant targets.
- Using zoom/scale strategies and decoder parameters to improve distant scanning.
- Practical trade-offs between resolution and performance.

## Notes

- Use a stable mount or tripod for consistent distant scanning results.
- Serve via localhost/HTTPS for camera permissions; see root `README.md` for API docs.