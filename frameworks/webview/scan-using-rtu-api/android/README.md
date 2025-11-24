# Hello-world for Android WebView - Dynamsoft Barcode Reader Sample

This sample demonstrates how to use the [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/) JS Edition in Android.

If you want to learn how to use the Android Edition SDK in javascript, you can check [Android WebView Barcode Scanning](https://github.com/Dynamsoft/barcode-reader-mobile-samples/tree/v9.x/android/JavaScript/WebViewBarcodeScanning).

The Android Webview sample uses native APIs to handle some of the details of webview. If you want a framework, you can refer to the [capacitor sample](../../capacitor/).

## 👓 Camera Permission

Notice we add camera permission in `AndroidManifest.xml`.

[app/src/main/AndroidManifest.xml](app/src/main/AndroidManifest.xml):
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## 📌 Customization

Please refer to sample [`scan-multiple-barcodes`](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes) or check the official [documentation](https://dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).