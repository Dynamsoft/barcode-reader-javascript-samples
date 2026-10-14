# Tip Message & Beep

A demo that shows how to guide users with rotating tip messages on the camera view and play a beep sound on successful barcode detection. The sample uses the Dynamsoft Barcode Reader bundle with the `CameraView` tip API and `Feedback.beep()` to create an interactive scanning experience with visual cues and audio confirmation.

## Included files

- `index.html` - main demo (camera view, tip messages, beep feedback, and fallback single-frame mode)
- `index.css` - styles for the demo

## Features

- Live camera scanning with automatic startup
- Rotating tip messages displayed on the camera view to guide users (e.g. "Point your camera at a barcode", "Move closer...")
- Tip messages cycle every 2 seconds while waiting for a barcode; tips are hidden as soon as a barcode is detected
- Audible **beep** feedback via `Dynamsoft.DCE.Feedback.beep()` on every successful scan
- After each successful scan, tips resume after a short delay to prompt the user for the next barcode
- **Fallback single-frame mode**: if no barcode is detected within 10 seconds, a tap-to-photo overlay appears so the user can try a still capture instead
- Result deduplication filter to avoid repeated identical reads
- Cross-frame verification for more reliable results

## Usage flow

1. The camera opens and tip messages start cycling automatically.
2. When a barcode is detected, tips stop, a beep plays, and the decoded result is shown below the camera view.
3. After 2 seconds the tip cycle resumes, prompting the user to scan again.
4. If no barcode is found within 10 seconds, a fallback overlay appears. Tap it to take a photo and attempt decoding from the still image.

## Quick start

Opening HTML files directly may not work as expected. Instead, run a local development server. Here's a quick method using [Visual Studio Code](https://code.visualstudio.com/):

1. Install the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) from the VS Code Marketplace.
2. Right-click on `index.html` and select "Open with Five Server".

## Notes

- Camera access requires a secure context (HTTPS or `localhost`).
- The beep sound is provided by the SDK and plays through the device's default audio output. Ensure device volume is not muted.
- The single-frame fallback activates automatically; no user configuration is needed.
- See the root `README.md` for running instructions and licensing.
