package com.dynamsoft.javascript.readvideowebview;

import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class DBRWebViewHelper {
    WebView mWebView;
    MainActivity mActivity;
    public static int Camera_Permission_Request_Code = 32765;

    DBRWebViewHelper() {}

    @SuppressLint("SetJavaScriptEnabled")
    public void pollute(WebView webview) {
        mWebView = webview;
        mActivity = (MainActivity) webview.getContext();

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setDomStorageEnabled(true);

        // Injects the supplied Java object into this WebView
        // more details: https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String)
        mWebView.addJavascriptInterface(new WebAppInterface(), "DBR_Android");
    }

    public void cameraPermissionHandler(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == Camera_Permission_Request_Code) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                evaluateJavascript("startScanner()");
            }
        }
    }

    public void startScanner() {
        if (ContextCompat.checkSelfPermission(mActivity, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(mActivity, new String[]{"android.permission.CAMERA"}, Camera_Permission_Request_Code);
        } else {
            evaluateJavascript("startScanner()");
        }
    }

    public void stopScanner() {
        evaluateJavascript("stopScanner()");
    }

    private void evaluateJavascript(String script) {
        mWebView.post(() -> mWebView.evaluateJavascript(script, new ValueCallback<String>() {
            @Override
            // if there is a callback, you can handle it there
            public void onReceiveValue(String s) {}
        }));
    }

    public class WebAppInterface {

        WebAppInterface() {
        }

        @JavascriptInterface
        public void onUniqueRead(String result) {
            mActivity.showResult(result);
        }

        @JavascriptInterface
        public void onWasmLoaded() {
            mActivity.showController();
        }

    }

    public void setCameraPermissionRequestCode(int code) {
        Camera_Permission_Request_Code = code;
    }

}
