# Hello-world for iOS WKWebView - Dynamsoft Barcode Reader Sample

This sample demonstrates how to use the [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/) JS Edition in iOS(Swift).

If you want to learn how to use the iOS Edition SDK in javascript, you can check [iOS WebView Barcode Scanning](https://github.com/Dynamsoft/barcode-reader-mobile-samples/tree/v9.x/ios/JavaScript/WebViewBarcodeScanning)

The iOS Webview sample uses native APIs to handle some of the details of webview. If you want a framework, you can refer to the [capacitor sample](../../capacitor/).

## 👓 Camera Permission

Notice we add camera permission in `Info.plist`.

[dbrjswebview/Info.plist](dbrjswebview/Info.plist):
```xml
<key>NSCameraUsageDescription</key>
<string>Decoding barcodes from video needs to access your camera.</string>
```

## 📌 Customization

Please refer to sample [`scan-multiple-barcodes`](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/barcode-scanner-api-samples/scan-multiple-barcodes) or check the official [documentation](https://dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/barcode-scanner-customization.html).

## 📄 Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).