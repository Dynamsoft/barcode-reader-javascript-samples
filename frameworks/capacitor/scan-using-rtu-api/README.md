# 📦 Scan Single Barcode - Capacitor

This sample demonstrates how to use the `BarcodeScanner` API from the [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/overview/javascript/) in a **Capacitor** app to scan a single barcode using the camera.

We use typescript and rollup inside capacitor for demonstration. You can use any framework you like, or even vanilla javascript.

## ✨ Features

- Easy integration with pre-built UI
- Renders barcodeScanner inside a Capacitor container
- Scans one barcode at a time from video

## 🚀 Quick Start

```bash
npm install
npm run build
npx cap sync
```

Then build your app in Android Studio and Xcode.

## 👓 Camera Permission

Notice we add camera permission in `AndroidManifest.xml` and `Info.plist`.

[android/app/src/main/AndroidManifest.xml](android/app/src/main/AndroidManifest.xml):
```xml
<uses-permission android:name="android.permission.CAMERA" />
```
[ios/App/App/Info.plist](ios/App/App/Info.plist):
```xml
<key>NSCameraUsageDescription</key>
<string>Decoding barcodes from video needs to access your camera.</string>
```

## 📌 Customization

Please check the official [documentation](https://dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
