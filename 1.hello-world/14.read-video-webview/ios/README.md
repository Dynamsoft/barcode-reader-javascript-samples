# Hello-world for iOS WKWebView - Dynamsoft Barcode Reader Sample

This sample demonstrates how to use the [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/) JS Edition in iOS(Swift).

If you want to learn how to use the Android Edition SDK in javascript, you can check [iOS WebView Barcode Scanning](https://github.com/Dynamsoft/barcode-reader-mobile-samples/tree/main/ios/JavaScript/WebViewBarcodeScanning).

## Get Started

### 1. Get your web page ready

Follow this [Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/?ver=latest#building-your-own-page) and build your page, including importing the SDK and initializing the certificate, etc.

Then you can define some functions according to your needs, like the code below, we will use it later:

```javascript
async function startScanner() {
    let scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
    await scanner.setUIElement(document.getElementById('div-ui-container'));
    await scanner.show();
}
```

Don't forget to load this page using wkWebView in your iOS project.

### 2. Add DBRWKWebViewHelper

Creat the file 'DBRWKWebViewHelper.swift' in the sample to your iOS project, and copy the DBRWKWebViewHelper's code in the sample to this file.

This file provides a class: `DBRWKWebViewHelper`, which will make it very convenient to let the swift code use DBR JS by providing some methods.

### 3. Pollute your WKWebView

Class `DBRWKWebViewHelper` provides a method `pollute`, which will inject a global variable `webkit` into the js code in your WKWebView.

```swift
DBRWKWebViewHelper().pollute(wkWebView);
```

The variable is an object that has some methods to communicate with native code, you can call them directly like this: 

```javascript
// e.g. callback after decoding, this will execute our corresponding java code in DBRWKWebViewHelper
scanner.onUniqueRead = (txt, result) => {
    const format = result.barcodeFormatString;
    window.webkit.messageHandlers.onUniqueRead.postMessage(format + " " + txt);
};
```

For more detailes about webkit: [Apple Developer Documentation](https://developer.apple.com/documentation/webkit/wkscriptmessagehandler).

## Customize DBRWKWebViewHelper

**Notice: when you change variables or methods, you should modify both native code and JS code to avoid errors.**

### 1. Change the methods to be injected

All methods are injected in the method `pollute`, and defined in the method `userContentController` . You have to modify both of them.

```swift
// e.g. 
// func pollute(wkWebView: WKWebView)
let userContentController = configuration.userContentController
// The parameter name is the name of the injected message handler.
// https://developer.apple.com/documentation/webkit/wkusercontentcontroller/1537172-add
userContentController.add(self, name: "onUniqueRead")
userContentController.add(self, name: "onWasmLoaded")
wkWebView.configuration.userContentController = userContentController

// extension DBRWKWebViewHelper: WKScriptMessageHandler
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    // message.name is the name of the function called in JS.
    // message.body is the parameter passed when calling.
    // Both of them are of type string.
    switch message.name {
        case "onUniqueRead":
            // your code here
        case "onWasmLoaded":
            // your code here
        default:
            // your code here
    }
}
```

### 2. Execute JS code

WKWebView natively has a method `WKWebView.evaluateJavascript()`, you can use it to complete the interaction like the following code.

```swift
func startScanner() {
    wkWebView.evaluateJavaScript("startScanner()")
}
```

Then, the following code will execute the function `startScanner()` we just defined in javascript code.

```java
dbrWKWebViewHelper.startScanner();
```