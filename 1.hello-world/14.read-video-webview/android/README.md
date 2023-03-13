# Hello-world for WebView - Dynamsoft Barcode Reader Sample

This sample demonstrates how to use the [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/) JS Edition in Android.

If you want to learn how to use the Android Edition SDK in javascript, you can check [Android WebView Barcode Scanning](https://github.com/Dynamsoft/barcode-reader-mobile-samples/tree/main/android/JavaScript/WebViewBarcodeScanning).

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

Don't forget to load this page using webview in your Android project.

### 2. Add DBRWebViewHelper

Copy the file 'DBRWebViewHelper.java' in the sample to your Android project.

This file provides a class: `DBRWebViewHelper`, which will make it very convenient to let the javascript code in your WebView use DBR Android by providing some methods.

```java
DBRWebViewHelper dbrWebViewHelper = new DBRWebViewHelper();
```

### 3. Pollute your WebView

Class `DBRWebViewHelper` provides a method `pollute`, which will inject a global variable `DBR_Android` into the javascript code in your WebView. 

```java
// public void pollute(WebView webview)
dbrWebViewHelper.pollute(mWebView);
```

The variable is an object that has some methods to communicate with native code, you can call them directly like this: 

```javascript
// e.g. callback after decoding, this will execute our corresponding java code in DBRWebViewHelper
scanner.onUniqueRead = (txt, result) => {
    const format = result.barcodeFormatString;
    window.DBR_Android.onUniqueRead(format + " " + txt)
};
```

## Customize DBRWebViewHelper

**Notice: when you change variables or methods, you should modify both native code and JS code to avoid errors.**

### 1. Rename the variable to be injected

The name is set in the method `pollute`, just change the string value.

```java
mWebView.addJavascriptInterface(new WebAppInterface(), "e.g. DBR_Android");
```

### 2. Change the methods to be injected

All methods are defined in the `WebAppInterface` class in 'DBRWebViewHelper.java', you can add  methods you need, or delete and modify them.

```java
// e.g. 
public class WebAppInterface {
    WebAppInterface() {}

    @JavascriptInterface
    public void onUniqueRead(String result) {
        // your code here
    }
    @JavascriptInterface
    public void onWasmLoaded() {
        // your code here
    }
}
```

### 3. Execute JS code

`DBRWebViewHelper` has an `evaluateJavascript()` method, which executes javascript code through `WebView.evaluateJavascript()`, you can use it to complete the interaction like the following code.

```java
public void stopScanner() {
    evaluateJavascript("stopScanner()");
}
```

Then, the following code will execute the function `startScanner()` we just defined in javascript code.

```java
dbrWebViewHelper.startScanner();
```