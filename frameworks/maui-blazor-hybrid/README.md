# Hello World Sample for MAUI Blazor Hybrid

Unlike [Blazor](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/blazor), which primarily runs within a browser; MAUI Blazor Hybrid is designed specifically for building cross-platform applications, utilizing a WebView to execute native JavaScript.

## Preparation

We use Visual Studio 2026 and .NET 10.0 (Long Term Support) to build this sample.

## Key Files Added or Modified

* `Components/Pages/Home.razor`
* `Components/Pages/DecodeImage.razor`
* `Components/Pages/DecodeVideo.razor`
* `wwwroot/index.html`: Add dbrjs library from CDN and initialize license
* `wwwroot/decodeImage.js`
* `wwwroot/decodeVideo.js`
* `MauiProgram.cs`: Prevent iOS webview from repeatedly displaying authorization prompts
* `MainPage.xaml.cs`: Configurate iOS and Android webview
* `Platform/Android/AndroidManifest.xml`: Add `CAMERA`
* `Platform/Android/PermissionManagingBlazorWebChromeClient.cs`: Handle permissions from Android webview
* `Platform/iOS/Info.plist`: Add `NSCameraUsageDescription`
* `Platform/MacCatalyst/Info.plist`: Add `NSCameraUsageDescription`
