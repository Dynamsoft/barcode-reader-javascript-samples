# 🎥 Show Result Texts on the Video

A demo that overlays decoded barcode text directly onto the live camera video. Useful for UX patterns that require visual confirmation of decoded results in context.

## Included files

- `show-result-texts-on-the-video.html` — demo page that overlays decoded text on video.  

## ✨ Features

- Live camera decoding with on‑video text overlays  
- Map decoded bounding boxes to overlay positions  
- Visual feedback for multiple simultaneous detections

## 🔧 How it works

- The scanner decodes frames and returns results with coordinates.  
- The demo maps result coordinates to the video element and renders text labels/boxes at the corresponding positions.  
- Labels update in real time as the scanner finds or loses targets.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips
 
- Use steady lighting and keep barcodes within the camera view for stable overlays.
- Run on localhost/HTTPS to allow camera access.  