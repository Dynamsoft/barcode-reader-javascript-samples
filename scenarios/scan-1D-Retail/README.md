# 🛒 Scan 1D Retail

A demo tuned for retail 1D barcodes (UPC/EAN etc.) demonstrating speed and accuracy trade-offs for checkout-like scenarios.

## Included files

- `index.html` — demo page (camera + UI).  
- `ReadOneDRetail.json` — example decoder configuration for retail 1D formats.  

## ✨ Features

- Optimized decoding for common retail 1D symbologies  
- Fast decode settings for high-throughput scenarios  
- Example configuration for quick adjustments

## 🔧 How it works

- The scanner uses a retail-focused config to prioritize 1D formats and reduce unnecessary decoding overhead.  
- Results appear in a compact UI suitable for POS prototyping; parameters are stored in the JSON file for easy tuning.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use fixed camera mount or consistent hand positioning for fast scans.  
- Narrow ROI to the expected barcode area to improve throughput.

## 📌 Notes

- Serve on localhost/HTTPS to allow camera access.  
- Replace the trial/demo license for extended evaluation.