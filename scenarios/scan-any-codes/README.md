# 🔀 Scan Any Codes

A demo configured to detect a wide range of barcode formats (1D and 2D). Useful when you need broad-format support in one flow.

## Included files

- `index.html` — demo page (camera & image input).  
- `ReadAllBarcodeFormats.json` — example configuration for enabling multiple formats.  

## ✨ Features

- Detect many barcode symbologies (1D + 2D) in a single run  
- Example JSON to control enabled formats

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- If performance is slow, disable seldom-used formats in the JSON config.  
- Use ROI and resolution tuning to balance speed and accuracy.

## 📌 Notes

- Use localhost/HTTPS to enable camera access.  
- Adjust the sample configuration for your target deployment.