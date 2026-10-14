# Android WebView - Scan Using Foundational API

This sample demonstrates how to integrate **Dynamsoft Barcode Reader JavaScript SDK** into an Android WebView application using the **Foundational API** for maximum flexibility and customization.

## Key Features

### 1. Camera Permission Handling

Camera permission is declared in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### 2. Foundational API Implementation

The HTML file (`decodeBarcodeInVideo.html`) demonstrates:

- **`CameraEnhancer`**: Controls camera operations (open, close, resolution)
- **`CameraView`**: Manages the UI layer for camera preview
- **`CaptureVisionRouter`**: Routes captured frames to the barcode reader
- **Result Callbacks**: Custom handling of decoded barcode results

Example code structure:
```javascript
// Create camera view and enhancer
const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);

// Create capture vision router
const cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
cvRouter.setInput(cameraEnhancer);

// Add result receiver
cvRouter.addResultReceiver({
  onDecodedBarcodesReceived: (result) => {
    // Handle decoded barcodes
  }
});

// Start scanning
await cameraEnhancer.open();
await cvRouter.startCapturing("ReadSingleBarcode");
```

## How to Run

1. **Open the Project**
   ```bash
   cd android
   # Open in Android Studio
   ```

2. **Build and Run**
   - Connect an Android device or start an emulator
   - Click **Run** (Shift+F10) in Android Studio
   - Grant camera permission when prompted

3. **Test the Scanner**
   - Point the camera at a barcode
   - Decoded results will appear below the camera view

## API Reference

For complete API documentation:
- [Foundational API Reference](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/)

## License

This sample uses a Dynamsoft trial license. To use in production:
1. Visit the [Customer Portal](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=sampleReadme) to obtain a license
2. Replace the license key in `decodeBarcodeInVideo.html`:
   ```javascript
   Dynamsoft.License.LicenseManager.initLicense("YOUR-LICENSE-KEY");
   ```

## Troubleshooting

**Camera not opening:**
- Ensure camera permission is granted in device settings
- Check Android version compatibility (API 21+)
- Verify WebView version supports getUserMedia API

**WebView blank screen:**
- Enable JavaScript in WebView settings
- Check Developer Console for JavaScript errors

## Support

Need help? Contact Dynamsoft support:
- 📧 Email: [support@dynamsoft.com](mailto:support@dynamsoft.com)
- 💬 Online: [Contact Form](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme)
- 📚 Documentation: [Dynamsoft Barcode Reader Docs](https://www.dynamsoft.com/barcode-reader/docs/web/)

## Related Samples

- [iOS WebView (Foundational API)](../ios/) - iOS version of this sample
- [Android WebView (RTU API)](../../scan-using-rtu-api/android/) - Simplified one-line integration
- [Capacitor Sample](../../../capacitor/) - Cross-platform hybrid framework approach