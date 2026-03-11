# 🏷️ Scan DPM Codes

A focused demo for decoding **Direct Part Mark (DPM)** barcodes from camera video or static images using the Dynamsoft Barcode Reader (JavaScript edition). DPM codes are DataMatrix symbols marked directly onto parts — by laser etching, dot-peening, or chemical etching — rather than printed on a label. They are common in industrial, aerospace, and automotive traceability applications.

## Included files

- `index.html` — demo page (camera & image input).  
- `ReadDPM.json` — Example template used by the demo.  

## ✨ Features

- Targeted DPM decoding with `DPMCRM_GENERAL` mode for marks etched or dot-peen on surfaces  
- DPM-specific localization (`LM_STATISTICS_MARKS`, `LM_CONNECTED_BLOCKS`) for low-contrast or irregular marks  
- Centered scan region (25 %–75 % of frame) to focus decoding on the mark area  
- Camera and static image input support  

## 🔧 How it works

- The demo initializes a `BarcodeScanner` instance and loads `ReadDPM.json` via `templateFilePath`, activating DPM-optimized localization and decoding parameters.  
- A centered scan region is set via `cameraEnhancer.setScanRegion()` to reduce noise from surrounding surfaces.  
- Decoded results are surfaced through the standard `launch()` callback; configuration can be tuned via `ReadDPM.json` without changing application code.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Ensure even, diffuse lighting — direct reflections from etched or dot-peen surfaces significantly reduce decode reliability.  
- Hold the camera steady and close; DPM marks are typically small and low-contrast.  
- Narrow the scan region further if the part occupies only a small portion of the frame.

## 📌 Notes

- Serve via localhost or HTTPS to enable camera access.  
- Replace the demo/trial license with a valid Dynamsoft license for extended evaluation or production use.  
- See the repository root `README.md` for running instructions and API documentation links.
