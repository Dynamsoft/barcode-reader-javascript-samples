# 🚗 Read a Vehicle Identification Number (VIN)

This focused demo decodes and parses VIN barcodes from vehicle images or live camera input. It shows how to extract structured VIN data and display results in a simple UI.

## Included files

- `index.html` — main demo page (camera + image/file input UI)
- `SampleVIN.jpg` — example image with a VIN barcode (or you can use your own test image)
- `read_vin.json` — JSON template used by the sample.

## Features

- Decode VIN barcodes from camera or static image (common 1D/2D formats used for VIN encoding)
- Validate VIN length/characters and show parsing/validation results
- Simple UI for testing images, camera input, and parsing rules

## How it works

- The demo initializes the barcode reader and captures either a selected image or live video frames from the camera.
- When a barcode is detected, the raw text is displayed and validated against VIN rules (length 17, allowed characters). If a parsing template is available, parsed fields are shown alongside the raw VIN.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here’s a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.

2. Right-click on `index.html` and select "Open with Five Server".

## 💡 Tips

- Use high-resolution images or a higher camera resolution for reliable decoding and parsing.
- If a barcode isn't found, try cropping the image to the VIN region or increase camera resolution.
- VIN validation: the demo checks for 17 characters and excludes I, O, Q characters which are not used in VINs.

## Notes

- Serve via localhost or HTTPS to enable camera access.  
- Replace the included trial/demo license with a valid Dynamsoft license for extended evaluation.  
- See the repository root `README.md` for running instructions and API documentation.