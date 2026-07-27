# 📊 Grid Barcode Reading

A demo that scans a grid of DataMatrix / QR codes from an uploaded image. The scanner performs a fast scan, layout analysis, and deep decode to read every cell in the grid using the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `index.html` — demo page (image upload + grid scanning UI).  
- `GridFastScan.json` — configuration for the initial fast scan pass.  
- `GridDeepDecode.json` — configuration for the deep decode pass on missed cells.  
- `sample_grid.png` — example grid image for testing.  

## ✨ Features

- Image-based grid scanning (upload an image containing a grid of DataMatrix / QR codes)  
- Three-phase pipeline: fast scan → layout analysis → deep decode  
- Visual grid result table showing decoded text, status, and location for each cell  
- Statistics display (total cells, decoded count, success rate)  

## 🔧 How it works

- **Phase 1 – Fast Scan**: The uploaded image is processed with `GridFastScan` settings to quickly decode as many barcodes as possible.  
- **Phase 2 – Layout Analysis**: A layout engine identifies the grid structure and maps decoded texts to their row/column positions.  
- **Phase 3 – Deep Decode**: Cells that failed in the fast scan are individually re-processed using `GridDeepDecode` settings with more aggressive decoding modes (deblur, morphing, neural network, etc.).  
- Results are rendered as an interactive grid table with color-coded status indicators.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use high-resolution images for better grid detection accuracy.  
- The sample image `sample_grid.png` can be used for quick testing.  
- Adjust the JSON configurations to tune the balance between speed and accuracy.

## 📌 Notes

- Serve on localhost/HTTPS to avoid browser restrictions.  
- This demo processes static images (no camera required).  
- Replace the included demo/trial license with a valid Dynamsoft license for extended evaluation.
