# 🏭 Scan 1D Industrial

A focused demo for decoding industrial-strength 1D barcodes (high-density, damaged, or specialized barcodes) using the Dynamsoft Barcode Reader (JavaScript edition). The sample demonstrates scanner tuning and UI patterns for robust 1D scanning in demanding environments.

## Included files

- `index.html` — main demo page (camera + UI).  
- `ReadOneDIndustrial.json` — example decoder configuration used by the sample.  

## ✨ Features

- Optimized decoding for dense or damaged 1D barcodes (industrial use)  
- Live camera decoding with tuned parameters for resilience  
- Example configuration file for quick parameter adjustments

## 🔧 How it works

- The page initializes a BarcodeScanner instance with settings optimized for industrial 1D symbols (longer decode windows, direction tolerance, damage-tolerance options).  
- Decoder parameters are loaded from `ReadOneDIndustrial.json` so you can tweak thresholds, expected symbologies, and scan regions without changing application code.  
- The UI accepts live camera input and shows decoded results.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Increase camera resolution and ensure steady framing for small or dense barcodes.  
- Narrow the region-of-interest (ROI) to focus decoding on likely barcode areas and improve throughput.  
- Use the included JSON to experiment with parameters (thresholds, expected symbologies, scan direction).

## 📌 Notes

- Serve via localhost or HTTPS to enable camera access.  
- Replace the demo/trial license with a valid Dynamsoft license for extended evaluation or production use.  
- See the repository root `README.md` for running instructions and API documentation links.