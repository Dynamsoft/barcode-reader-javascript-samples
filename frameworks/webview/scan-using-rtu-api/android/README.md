# Android WebView - Scan Using RTU API (BarcodeScanner)

This sample demonstrates how to integrate **Dynamsoft Barcode Reader JavaScript SDK** into an Android WebView application using the **RTU (Ready-To-Use) API** for rapid, one-line integration.

## Overview

The RTU API (`BarcodeScanner`) provides the fastest way to add barcode scanning to your app:
- ✅ **One-line integration** - Launch a full scanner with a single API call
- ✅ **Built-in UI** - Pre-designed camera view with scan region highlighting
- ✅ **Simple configuration** - Customize behavior through intuitive config objects
- ✅ **Production-ready** - Optimized for common scanning scenarios

This sample uses:
- **Android WebView** for rendering the JavaScript-based barcode scanner
- **Dynamsoft Barcode Reader v11.2.4000** RTU API (BarcodeScanner)
- Native Android permissions handling for camera access

## Key Features

### 1. Camera Permission Handling

Camera permission is declared in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### 2. One-Line RTU API Integration

The HTML file (`decodeBarcodeInVideo.html`) demonstrates the simplest integration possible:

```javascript
// Configure the scanner
const config = {
  license: "YOUR-LICENSE-KEY",
  container: document.querySelector(".barcode-scanner-view"),
  // Optional: Add custom configuration
  // showUploadImageButton: true,
  // scannerViewConfig: { showFlashButton: true }
};

// Create and launch the scanner in one call
const barcodeScanner = new Dynamsoft.BarcodeScanner(config);
barcodeScanner.launch().then((result) => {
  // Handle the scanned barcode
  alert(result.barcodeResults[0].text);
});
```

That's it! The SDK handles:
- Camera initialization and permissions
- UI rendering with scan region overlay
- Barcode detection and decoding
- Result presentation

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
   - The scanner will automatically detect and decode it
   - Result will be displayed in an alert

## API Reference

- [BarcodeScanner API Reference](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html)
- [BarcodeScanner User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html)

## When to Use RTU vs Foundational API

**Use RTU API (BarcodeScanner) when:**
- ✅ You need a quick, working solution
- ✅ Default UI and behavior meet your needs
- ✅ You're building a standard scanning application

**Use [Foundational API](../../scan-using-foundational-api/android/) when:**
- 🔧 You're building complex, custom workflows
- 🔧 You need to integrate with custom camera systems

## License

This sample uses a Dynamsoft trial license. To use in production:
1. Visit the [Customer Portal](https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=sampleReadme) to obtain a license
2. Replace the license key in `decodeBarcodeInVideo.html`:
   ```javascript
   const config = {
     license: "YOUR-LICENSE-KEY", // Replace here
     // ...
   };
   ```

## Troubleshooting

**Camera not opening:**
- Ensure camera permission is granted in device settings
- Check Android version compatibility (API 21+)
- Verify WebView version supports getUserMedia API

**WebView blank screen:**
- Enable JavaScript in WebView settings
- Check Developer Console for JavaScript errors

**Scanner not responding:**
- Verify license key is valid and not expired
- Check network connectivity (for license validation)

## Support

Need help? Contact Dynamsoft support:
- 📧 Email: [support@dynamsoft.com](mailto:support@dynamsoft.com)
- 💬 Online: [Contact Form](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme)
- 📚 Documentation: [Dynamsoft Barcode Reader Docs](https://www.dynamsoft.com/barcode-reader/docs/web/)

## Related Samples

- [iOS WKWebView (RTU API)](../ios/) - iOS version of this sample
- [Android WebView (Foundational API)](../../scan-using-foundational-api/android/) - Full control version
- [Capacitor Sample](../../../capacitor/) - Cross-platform hybrid framework approach
