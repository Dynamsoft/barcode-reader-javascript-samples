# 🗂 Scan Common 2D Codes

A demo focused on decoding common 2D barcode formats (QR, DataMatrix, PDF417, etc.) using the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `index.html` — demo page (camera & image input).  
- `ReadCommon2D.json` — example decoder configuration for common 2D formats.  

## ✨ Features

- Prioritized decoding for frequent 2D symbologies  
- Demo configuration for 2D-specific tuning (ROI, resolution)  
- Example JSON to tweak decoder behavior

## 🔧 How it works

- The scanner loads a 2D-focused configuration and decodes frames accordingly.  
- The demo displays decoded results, format metadata and provides simple controls to adjust ROI or decoder options.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Increase camera resolution for dense 2D codes.  
- Limit enabled formats if you only need a subset to improve throughput.

## 📌 Notes

- Serve on localhost/HTTPS for camera access.  
- Replace the trial/demo license with a valid license for extended testing.