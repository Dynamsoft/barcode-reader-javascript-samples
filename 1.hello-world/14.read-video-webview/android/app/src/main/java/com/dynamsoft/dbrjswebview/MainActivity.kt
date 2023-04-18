package com.dynamsoft.dbrjswebview

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.*
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat

class MainActivity : AppCompatActivity() {
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val myWebView: WebView = findViewById(R.id.webview)
        myWebView.settings.javaScriptEnabled = true
        myWebView.settings.mediaPlaybackRequiresUserGesture = false
        myWebView.settings.domStorageEnabled = true

        myWebView.webViewClient = MyWebViewClient()
        myWebView.webChromeClient = MyWebChromeClient()

        myWebView.loadUrl("https://appassets.androidplatform.net/assets/decodeBarcodeInVideo.html")
    }

    // Warning: If you use online url, you don't need `LocalContentWebViewClient`
    // Refer: https://developer.android.com/develop/ui/views/layout/webapps/load-local-content?hl=en
    private inner class MyWebViewClient : WebViewClientCompat() {

        private val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this@MainActivity))
            .build()

        @RequiresApi(21)
        override fun shouldInterceptRequest(
            view: WebView,
            request: WebResourceRequest
        ): WebResourceResponse? {
            return assetLoader.shouldInterceptRequest(request.url)
        }

        // to support API < 21
        @Deprecated("Deprecated in Java")
        override fun shouldInterceptRequest(
            view: WebView,
            url: String
        ): WebResourceResponse? {
            return assetLoader.shouldInterceptRequest(Uri.parse(url))
        }
    }

    var cameraPermissionReq: PermissionRequest? = null
    private inner class MyWebChromeClient : WebChromeClient() {
        @RequiresApi(21)
        override fun onPermissionRequest(request: PermissionRequest) {
            if(request.resources.contains(PermissionRequest.RESOURCE_VIDEO_CAPTURE)){
                // Refer: https://developer.android.com/training/permissions/requesting
                if(ContextCompat.checkSelfPermission(
                    this@MainActivity,
                    Manifest.permission.CAMERA
                ) == PackageManager.PERMISSION_GRANTED){
                    // You can use the API that requires the permission.
                    request.grant(arrayOf(PermissionRequest.RESOURCE_VIDEO_CAPTURE))
                }else{
                    // You can directly ask for the permission.
                    // The registered ActivityResultCallback gets the result of this request.
                    this@MainActivity.cameraPermissionReq = request
                    requestCameraPermissionLauncher.launch(Manifest.permission.CAMERA)
                }
            }else{
                request.deny()
            }
        }
    }

    // Refer: https://developer.android.com/training/permissions/requesting
    @RequiresApi(21)
    val requestCameraPermissionLauncher = registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted: Boolean ->
            // Refer: https://www.dynamsoft.com/codepool/use-barcode-scanner-in-android-webview.html#set-up-webview
            this@MainActivity.runOnUiThread {
                if (isGranted) {
                    // Permission is granted. Continue the action or workflow in your
                    // app.
                    cameraPermissionReq?.grant(arrayOf(PermissionRequest.RESOURCE_VIDEO_CAPTURE))
                } else {
                    // Explain to the user that the feature is unavailable because the
                    // feature requires a permission that the user has denied. At the
                    // same time, respect the user's decision. Don't link to system
                    // settings in an effort to convince the user to change their
                    // decision.
                    cameraPermissionReq?.deny()
                }
                cameraPermissionReq = null
            }
        }
}