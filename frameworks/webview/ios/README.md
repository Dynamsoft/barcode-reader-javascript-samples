# iOS WKWebView - Scan Using Foundational API

This sample demonstrates how to integrate **Dynamsoft Barcode Reader JavaScript SDK** into an iOS WKWebView application using the **Foundational API** for maximum flexibility and customization.

## Key Features

### 1. Camera Permission Handling

Camera permission is declared in `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Decoding barcodes from video needs to access your camera.</string>
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
   cd ios
   open dbrjswebview.xcodeproj
   ```

2. **Configure Signing**
   - Select your project in Xcode
   - Go to **Signing & Capabilities**
   - Select your development team

3. **Build and Run**
   - Connect an iOS device (camera doesn't work in simulator for WebView)
   - Select your device as the run destination
   - Click **Run** (⌘R)
   - Grant camera permission when prompted

4. **Test the Scanner**
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
- Check iOS version (14.5+ required for camera in WKWebView)
- Verify you're testing on a physical device (not simulator)

**WKWebView blank screen:**
- Enable JavaScript in WKWebView configuration
- Check Safari Developer Console for JavaScript errors
- Enable Web Inspector: Settings → Safari → Advanced → Web Inspector

**Permission denied:**
- Verify `NSCameraUsageDescription` is set in `Info.plist`
- Reset app permissions: Settings → Privacy → Camera

## Support

Need help? Contact Dynamsoft support:
- 📧 Email: [support@dynamsoft.com](mailto:support@dynamsoft.com)
- 💬 Online: [Contact Form](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme)
- 📚 Documentation: [Dynamsoft Barcode Reader Docs](https://www.dynamsoft.com/barcode-reader/docs/web/)

## Related Samples

- [Android WebView (Foundational API)](../android/) - Android version of this sample
- [iOS WKWebView (RTU API)](../../scan-using-rtu-api/ios/) - Simplified one-line integration
- [Capacitor Sample](../../../capacitor/) - Cross-platform hybrid framework approach