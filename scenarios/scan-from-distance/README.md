# 🔭 Scan From Distance

A demo that demonstrates techniques for scanning barcodes from a distance (ROI, zoom and resolution tuning) using the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `index.html` — demo page (camera + UI).  
- `ReadDistantBarcodes.json` — example configuration used by the sample.  

## ✨ Features

- Camera/ROI/decoder tuning for distant targets  
- Example configuration for resolution and ROI adjustments  

## 🔧 How it works

- The demo adjusts camera resolution and ROI to favor distant targets, and exposes decoder parameters to improve detection at smaller apparent sizes.  
- The sample shows common trade-offs and provides an example JSON to reproduce settings.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use a tripod or stable mount for distant scanning.  
- Increase camera resolution and narrow ROI to target likely barcode areas.

## 📌 Notes

- Serve on localhost/HTTPS to enable camera access.  
- For production, pair software tuning with suitable optics/camera hardware.