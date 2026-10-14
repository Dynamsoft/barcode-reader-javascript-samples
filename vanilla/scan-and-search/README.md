# Scan and Search

A demo that scans a barcode and performs a product information lookup using the Dynamsoft Barcode Reader (JavaScript edition). The camera is always visible on screen; once a barcode is detected its value is placed in the search input, ready for a query.

## Included files

- `index.html` — main demo (camera view, filter panel, and search flow)
- `index.css` — styles for the demo

## Features

- Always-visible camera view that starts scanning automatically on page load
- Click anywhere on the camera view to pause or resume scanning
- Collapsible **Filters** panel to narrow down which barcodes are accepted:
  - **Barcode Format** — choose a preset (All, 1D Retail, 1D Industrial, 2D Codes) or build a custom format selection
  - **String Length** — accept only barcodes whose text falls within a minimum/maximum character count
  - **Keyword Rules** — add one or more rules that the barcode text must satisfy (contains, does not contain, starts with, ends with, or matches a regex)
  - An indicator badge on the Filters button shows when any filter is active
- Result deduplication so the same barcode does not fire repeatedly
- Scanning pauses automatically after a successful read; resume by clicking the camera view
- Text input lets you type or paste a barcode value manually and search without scanning
- Search results are displayed in a text area below the input

## Usage flow

1. The camera opens and starts scanning automatically.
2. When a barcode that passes all active filters is detected, its value is placed in the text input and scanning pauses.
3. Click the **Search** button (or click the camera view to resume and scan again).
4. Placeholder product data is shown in the Search Result area.
5. Alternatively, type any value into the text input and click **Search** at any time.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.
2. Right-click on `index.html` and select "Open with Five Server".

## Notes

- No real backend is connected; product data in the results is mocked. Replace the `lookupBarcode` function body to call a real API.
- Filters are applied at the SDK level, not as post-processing, so only matching barcodes are surfaced by the result receiver.
- See the root `README.md` for running instructions and licensing.