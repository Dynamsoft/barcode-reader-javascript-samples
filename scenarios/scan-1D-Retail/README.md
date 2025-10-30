# Scan 1D Retail

This sample demonstrates tuning for retail 1D barcodes (high-density, damaged, or specialized 1D formats) using the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `index.html` — Demo page and UI.
- `ReadOneDRetail.json` — Example configuration used by the sample.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/index.html`.

3. Allow camera access when prompted and point the camera at a barcode.

## What this sample shows

- Decoder parameters targeted for retail 1D symbols (damage-tolerance, scan direction).
- Handling low-contrast or distorted barcodes.
- Example configuration and practical tuning tips.

## Notes

- Serve via localhost/HTTPS to enable camera access.
- See the repository root `README.md` for general instructions and API docs.