# Scan Materials

The index page (`index.html`) shows the images mapped to each sample on desktop as scan
targets: a visitor opens a sample on their phone (via the QR code) and points the phone at
this screen. For the two "no camera" samples (`read-an-image`, `grid-barcode-reading`) the
images double as downloadable test input.

## Images and the samples that use them

The mapping lives in the `MATERIALS` and `SAMPLES` arrays in `index.html`.

| File | Depicts | Used by |
| --- | --- | --- |
| `mixed-codes.png` | Sheet of assorted 1D & 2D symbologies (default) | Hello World, Read an Image, Tip & Beep, Show Result Texts, Scan Common 2D Codes, Scan Any Codes, Scan from Distance |
| `qr.png` | A single QR code | Scan a Single Barcode, Scan QR Code |
| `retail-1d.png` | EAN-13 on a cereal box | Scan a Single Barcode, Cart Builder, Scan and Search, Scan 1D Retail |
| `retail-1d2.png` | UPC-A on a curved pouch | Scan a Single Barcode, Cart Builder, Scan and Search, Scan 1D Retail |
| `retail-1d3.png` | EAN-13 on a crinkled snack bag | Cart Builder, Scan and Search, Scan 1D Retail |
| `retail-1d4.png` | EAN-13 on a product on a shelf | Cart Builder, Scan and Search, Scan 1D Retail |
| `locate_item.png` | Grid of UPC / EAN / QR / DataMatrix items | Locate an Item with Barcode |
| `datamatrix.png` | DataMatrix on a hard drive label | Scan DataMatrix Code |
| `form-codes.png` | Component box label with several barcodes | Pick One to Fill |
| `industrial-1d.png` | Shipping label with Code 128 / Code 39 barcodes | Batch Inventory, Scan 1D Industrial |
| `datamatrix-grid.png` | Rack of tubes with DataMatrix codes | Grid Barcode Reading |
| `dpm-parts.png` | Dot-peened DPM DataMatrix on metal | Scan DPM Codes |
| `drivers-license-pdf417.png` | Sample driver's license PDF417 (AAMVA) | Read a Driver's License |
| `vin-code.png` | VIN barcode on a vehicle door label | Read VIN |
| `gs1-codes.png` | GS1-128 barcode on a food label | Read and Parse GS1-AI |

To give a sample its own image, add the PNG here, register it in `MATERIALS`, and set the
sample's `materials: ["<id>", ...]` (one or more images).

## Image guidelines

- **Format:** PNG, white background, sharp (no blur, no perspective distortion).
- **Size:** at least 1200 px wide so codes stay scannable when enlarged in the lightbox.
- **Content:** use synthetically generated or sample codes only — no real personal data
  (especially for the driver's license and VIN images).
- **Density:** leave generous quiet zones around each code; 4–12 codes per sheet works well.
