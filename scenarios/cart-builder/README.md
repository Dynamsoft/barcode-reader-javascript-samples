# 🛒 Cart Builder

A lightweight demo that simulates a shopping experience: scan a barcode and add a product to a dynamic on‑page cart. The sample uses the Dynamsoft Barcode Reader bundle to perform live video decoding and demonstrates a simple UX for point‑of‑sale or prototype flows.

## Included files

- `cart-builder.html` — single‑file sample.

## ✨ Features

- Live camera decoding (1D / 2D) using Dynamsoft BarcodeScanner API
- Floating, draggable scanner window attached to the page
- Sessioned scans: each unique scan appends a product to the simulated cart
- Demo product list (20 dummy products) and simple cart UI with name and price

## 🔧 How it works

- The page loads the Dynamsoft Barcode Reader bundle and creates a BarcodeScanner instance configured with:
  - SM_MULTI_UNIQUE scan mode (to prefer unique entries)
  - a duplicateForgetTime to avoid rapid duplicate captures
  - a scanner UI mounted into a floating container
- When a unique barcode is detected, the sample maps the scan to a random demo product, appends it to the in‑memory cart, and refreshes the cart display.
- The floating scanner can be dragged around the viewport and is hidden when not in use.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `cart-builder.html` and select "Open with Five Server".

## 💡 Tips

- Use localhost or HTTPS to allow camera access.
- Ensure good lighting and hold barcodes steady for best results.
- For real projects, replace the demo product mapping with a backend lookup using the scanned barcode value.

## 📌 Notes

- This is a front‑end prototype intended for demo and UX testing only.
- Replace the license key with a valid Dynamsoft license for production/testing beyond the included trial behavior.
- See the repository root `README.md` for running instructions, trial licenses and API documentation links.