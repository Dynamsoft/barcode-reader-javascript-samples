# 📱 Scan QR Code

A focused demo for scanning QR codes from camera video or static images using the Dynamsoft Barcode Reader (JavaScript edition). Demonstrates QR-specific tuning and configuration.

## Included files

- `index.html` — demo page (camera & image input).  
- `ReadQR.json` — sample configuration/template used by the demo.  

## ✨ Features

- Targeted QR decoding for improved performance  
- Camera and static image input support  
- Loadable JSON configuration for decoder settings

## 🔧 How it works

- The demo configures the scanner to prioritize QR decoding and applies ROI/resolution adjustments for common QR scenarios.  
- Decoded payloads are displayed; configuration can be adjusted via `ReadQR.json`.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- For small QR symbols increase camera resolution or reduce ROI.  
- Good lighting and steady framing improves decode reliability.

## 📌 Notes

- Serve via localhost/HTTPS for camera permissions.  
- Replace trial/demo license with a valid Dynamsoft license for extended use.