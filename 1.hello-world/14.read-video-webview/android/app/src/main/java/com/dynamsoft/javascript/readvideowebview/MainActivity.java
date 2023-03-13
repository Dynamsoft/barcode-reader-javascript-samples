package com.dynamsoft.javascript.readvideowebview;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.os.Bundle;
import android.view.View;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    WebView mWebView;
    DBRWebViewHelper dbrWebViewHelper;
    Button mButton;

    @SuppressLint("ShowToast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mButton = findViewById(R.id.myButton);

        // In order to avoid conflicts, you can use the following code to set the request code for requesting camera permission before you pollute
        // dbrWebViewHelper.setCameraPermissionRequestCode(Your code);

        // Initialize WebView
        mWebView = findViewById(R.id.myWebview);
        // Pollute your WebView
        dbrWebViewHelper = new DBRWebViewHelper();
        dbrWebViewHelper.pollute(mWebView);
        Toast toast = Toast.makeText(this, "Loading Library...", Toast.LENGTH_LONG);
        toast.show();
        // for development, enabled debugging and clear html files cache
        WebView.setWebContentsDebuggingEnabled(true);
        mWebView.clearCache(true);
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                request.grant(request.getResources());
            }
        });
        mWebView.setWebViewClient(new WebViewClient());
        // load local or remote web page
        mWebView.loadUrl("file:///android_asset/index.html");
    }

    public void switchScanner(View view) {
        CharSequence text = mButton.getText();
        if (text.toString().equals("Start")) {
            mButton.setText(R.string.btn_stop);
            dbrWebViewHelper.startScanner();
        } else {
            mButton.setText(R.string.btn_start);
            dbrWebViewHelper.stopScanner();
        }
    }

    public void showResult(String result) {
        AlertDialog.Builder dialog = new AlertDialog.Builder(this);
        dialog.setTitle("Result:").setPositiveButton("OK", null).setMessage(result).show();
    }

    public void showController() {
        runOnUiThread(() -> mButton.setVisibility(View.VISIBLE));
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        dbrWebViewHelper.cameraPermissionHandler(requestCode, permissions, grantResults);
    }
}