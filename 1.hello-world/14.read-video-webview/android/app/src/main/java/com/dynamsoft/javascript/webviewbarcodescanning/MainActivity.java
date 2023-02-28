package com.dynamsoft.javascript.webviewbarcodescanning;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    WebView mWebView;
    DBRWebViewHelper dbrWebViewHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize WebView
        mWebView = findViewById(R.id.myWebview);

        // In order to avoid conflicts, you can use the following code to set the request code for requesting camera permission before you pollute
        // dbrWebViewHelper.setCameraPermissionRequestCode(Your code);

        // Pollute your WebView
        dbrWebViewHelper = new DBRWebViewHelper();
        dbrWebViewHelper.pollute(mWebView);

        // for development, enabled debugging and clear html files cache
        WebView.setWebContentsDebuggingEnabled(true);
        mWebView.clearCache(true);

        mWebView.setWebChromeClient(new WebChromeClient());
        mWebView.setWebViewClient(new WebViewClient());

        // load local or remote web page
        mWebView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        dbrWebViewHelper.cameraPermissionHandler(requestCode, permissions, grantResults);
    }
}