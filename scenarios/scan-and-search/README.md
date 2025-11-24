# 🔍 Scan and Search

A demo that scans a barcode and performs a lookup/search operation (product or inventory lookup) using the Dynamsoft Barcode Reader (JavaScript edition).

## Included files

- `scan-and-search.html` — single‑file demo (scan UI + search/lookup flow).  

## ✨ Features

- Scan Barcodes using your device camera
- Search by Text or Barcode input
- Displays mock product data as search results
- Responsive UI with modern styling

### 🔄 Sample Usage Flow

1. Click the Scan button to launch the barcode scanner.
2. Once a barcode is detected, its value is displayed along with placeholder product information.
3. Alternatively, type a product name or barcode manually in the input field and click Search.
4. Results are displayed in the Search Result text area.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- No real backend is connected in this demo; results are mocked.
- You can integrate with a real product API by replacing the placeholder content in the searchResult.value.

## 📌 Notes

- Intended as a prototype UX; secure and validate lookups before production use.  
- See root `README.md` for running instructions and licensing.