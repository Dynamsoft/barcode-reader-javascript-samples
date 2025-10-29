# Scan QR Code

This sample demonstrates scanning QR codes from camera video or static images using the Dynamsoft Barcode Reader (JavaScript edition). It focuses on QR-specific tuning and shows how to configure the scanner for best results with common QR scenarios.

## Included files

- `index.html` — Demo page (camera & image input) and UI.
- `ReadQR.json` — A `CaptureVisionTemplate` used by the sample, you can adjust the configuration manually if necessary.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server". This will serve the application at `http://127.0.0.1:5500/index.html`.

3. Allow camera access when prompted and point the camera at a QR code.

## What this sample shows

- Enabling QR code decoding and disabling unnecessary formats for faster performance.
- Adjusting region-of-interest (ROI) and camera resolution for different use cases.
- Using the provided `ReadQR.json` for configuration and how to load custom settings.

## Tips

- For best results, ensure good lighting and steady camera framing.
- If scanning from distance, increase camera resolution or adjust ROI/zoom.
- When testing locally, use localhost or HTTPS to allow camera access.

## Notes

- Run via HTTP(S) or localhost; opening files via `file://` may break module loading or camera permissions.
- A trial license is included for short evaluation; [request a longer trial](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sampleReadme) from Dynamsoft if needed.
- See the repository root `README.md` for general instructions and API documentation links.