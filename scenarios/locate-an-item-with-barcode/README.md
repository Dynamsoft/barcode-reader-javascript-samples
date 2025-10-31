# 🔎 Locate an Item with Barcode

A focused demo that helps locate and highlight items in a UI by scanning barcodes. Useful for inventory lookup, picking workflows, or warehouse/retail assistance where scanning a code should point you to the corresponding item on screen.

## Included files

- `index.html` — main demo page (camera + UI to locate items).  
- `icons/` — UI icons used by the sample (checkmark, cross, logo).

## ✨ Features

- Scan a barcode (or fill in text) and find the matching item in the displayed list  
- Visual highlight and status feedback for match / no-match cases  
- Simple UI for quick prototyping of locate-by-barcode workflows

## 🔧 How it works

- The page runs a barcode scanner that decodes incoming frames.  
- Decoded barcode values are compared against an on-page item dataset (client-side lookup).  
- When a match is found the sample highlights the matched item and shows contextual feedback; when no match is found it displays an unmatched-result state.  

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Good lighting and steady camera framing improve decode accuracy.  
- Use the icons folder as a reference for UI feedback and quick prototyping.

## 📌 Notes

- Serve via localhost or HTTPS to enable camera access.  
- See the repository root `README.md` for running instructions, trial licenses and API documentation