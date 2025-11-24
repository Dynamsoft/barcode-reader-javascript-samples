# 🚗 Read a Driver's License

A focused demo that decodes and parses barcode data from driver's license images (camera or file input). The sample demonstrates extracting structured fields (name, DOB, license number, address, etc.) using a parsing template.

## Included files

- `index.html` — main demo page (camera + image input UI).  
- `SampleDriversLicense.jpg` — example license image.  
- `read_dl.json` — JSON template used by the sample.  

## ✨ Features

- Decode driver's license barcode (PDF417 / AAMVA formats) from camera or static image  
- Parse and display structured fields
- Simple UI for testing and validating parsing rules

## 🔧 How it works

- The page initializes the barcode scanner to decode the license barcode from an image or live video frame.
- The sample parsed fields are rendered in the UI alongside the raw decoded text; the sample also highlights parsing errors or missing fields for easier troubleshooting.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use high-resolution images or a higher camera resolution for reliable decoding and parsing.  
- Test with multiple sample licenses to ensure the parsing template covers expected variants.  

## 📌 Notes

- Serve via localhost or HTTPS to enable camera access.  
- Replace the included trial/demo license with a valid Dynamsoft license for extended evaluation.  
- See the repository root `README.md` for running instructions and API documentation.