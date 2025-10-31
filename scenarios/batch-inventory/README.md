# 🧾 Batch Inventory

A lightweight demo for batch scanning and simple inventory collection. The sample uses the Dynamsoft Barcode Reader bundle to capture barcodes in sessions, automatically deduplicate entries, and present a session summary for quick analysis or export.

## Included files

- `index.html` — main demo page (camera scanner UI + session controls).  
- `index.css` — styles for the demo.

## ✨ Features

- Batch scanning mode with automatic per-session deduplication  
- Real-time session summary:
  - Total unique barcodes
  - Barcode format/type distribution
  - Session duration

## 🔧 How it works

- The page creates a BarcodeScanner instance configured for multi-unique capture (SM_MULTI_UNIQUE or equivalent) so duplicate barcodes within the same session are ignored.
- Scanned values are accumulated in-memory and analyzed to produce session metrics (counts, distribution, duration).
- Users can stop a session to view the summary, or restart scanning to begin a new session.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips
  
- Use a fixed camera mount or consistent hand positioning for higher throughput.  
- For large exports, consider paginating or streaming results to a backend.

## 📌 Notes

- Run on localhost or HTTPS to allow camera access.  
- This demo is intended for prototyping and UX testing; integrate with backend storage for production use.  
- Replace the included demo/trial license with a valid Dynamsoft license for extended evaluation.