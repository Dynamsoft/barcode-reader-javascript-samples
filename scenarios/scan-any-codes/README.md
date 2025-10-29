# Scan Any Codes

This sample demonstrates scanning a wide range of barcode formats (1D and 2D) using the Dynamsoft Barcode Reader (JavaScript edition). It shows how to enable multiple formats and tune settings for broad-format detection.

## Included files

- `index.html` — Demo page (camera & image input) and UI.
- `ReadAllBarcodeFormats.json` — Example configuration used by the sample (if present).

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/index.html`.

3. Allow camera access when prompted and point the camera at a barcode.

## What this sample shows

- Enabling many barcode formats for broad detection.
- Performance considerations when enabling many formats.
- Using a sample configuration file to manage decoder settings.

## Notes

- Run via HTTP(S) or localhost; opening files via `file://` may break module loading or camera permissions.
- See the repository root `README.md` for general instructions and API documentation links.