# 🔢 Read and Parse GS1 (AI)

A focused demo that decodes GS1-formatted barcodes and parses Application Identifiers (AIs) to extract structured product and logistic data (GTIN, batch/lot, expiry, weight, serial, etc.). This folder contains two implementation styles so you can choose the integration that best fits your project.

## Included files

- scan-using-foundational-api/ — Foundational single-file implementation:
  - `index.html` — demo page.
  - `index.css` — styles used by the foundational demo.
  - `read_and_parse_gs1.json` — GS1 template file used by this implementation.

## ✨ Features

- Decode GS1 barcodes (GS1-128 / EAN / GS1 Databar variants) from live camera or static image inputs.  
- Parse AI-tagged payloads into structured fields (GTIN, batch/lot, expiry, weight, serial, etc.).  

## 🔧 How it works

- The demos initialize the barcode scanner to decode GS1 payloads from camera frames or image files.  
- Decoded GS1 strings are parsed according to the provided JSON template (mapping AIs to labels and formats).  

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use high-resolution images or increase camera resolution for small or dense GS1 fields.  
- Validate AI date/number formats (some AIs imply decimal places or YY/MM/YY formats).  

## 📌 Notes

- Serve the demos via localhost or HTTPS to allow camera access.  
- Replace the included trial/demo license with a valid Dynamsoft license for extended evaluation or production use.  
- See the repository root `README.md` for running instructions, licensing and API documentation links.