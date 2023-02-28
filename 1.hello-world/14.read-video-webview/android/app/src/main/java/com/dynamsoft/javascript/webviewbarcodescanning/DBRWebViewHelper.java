package com.dynamsoft.javascript.webviewbarcodescanning;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.pm.PackageManager;
import android.util.DisplayMetrics;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.dynamsoft.dbr.BarcodeReader;
import com.dynamsoft.dbr.BarcodeReaderException;
import com.dynamsoft.dbr.DBRLicenseVerificationListener;
import com.dynamsoft.dbr.EnumBarcodeFormat;
import com.dynamsoft.dbr.ImageData;
import com.dynamsoft.dbr.PublicRuntimeSettings;
import com.dynamsoft.dbr.TextResult;
import com.dynamsoft.dbr.TextResultListener;
import com.dynamsoft.dce.CameraEnhancer;
import com.dynamsoft.dce.CameraEnhancerException;
import com.dynamsoft.dce.DCECameraView;
import com.dynamsoft.dce.RegionDefinition;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class DBRWebViewHelper {
    WebView mWebView;
    CameraEnhancer mCameraEnhancer;
    BarcodeReader mReader;
    DCECameraView mCameraView;
    MainActivity mainActivity;
    public static int Camera_Permission_Request_Code = 32765;
    final Gson gson = new Gson();

    // Initialize license for Dynamsoft Barcode Reader.
    // The license string here is a time-limited trial license. Note that network connection is required for this license to work.
    // You can also request an extension for your trial license in the customer portal: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&utm_source=installer&package=android
    DBRWebViewHelper() {
        BarcodeReader.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", new DBRLicenseVerificationListener() {
            @Override
            public void DBRLicenseVerificationCallback(boolean isSuccessful, Exception error) {
                mainActivity.runOnUiThread(() -> {
                    if (!isSuccessful) {
                        error.printStackTrace();
                        showErrorDialog(error.getMessage());
                    }
                });
            }
        });
    }

    @SuppressLint("SetJavaScriptEnabled")
    public void pollute(WebView webview) {
        mWebView = webview;
        mainActivity = (MainActivity) webview.getContext();

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);

        initScanner();

        // Injects the supplied Java object into this WebView
        // more details: https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String)
        mWebView.addJavascriptInterface(new WebAppInterface(), "DBR_Android");
    }

    private void initScanner() {
        // Add camera view for previewing video
        mCameraView = new DCECameraView(mainActivity);
        mCameraView.setId(R.id.myCameraView);
        mCameraView.setOverlayVisible(true);
        ConstraintSet set = new ConstraintSet();
        ConstraintLayout root = mainActivity.findViewById(R.id.clRoot);
        root.addView(mCameraView);

        // make the WebView transparent, so you can overlay controls like buttons on top of the CameraView
        mWebView.setBackgroundColor(0);
        root.bringChildToFront(mWebView);

        set.clone(root);
        set.connect(R.id.myCameraView, ConstraintSet.TOP, R.id.clRoot, ConstraintSet.TOP);
        set.connect(R.id.myCameraView, ConstraintSet.LEFT, R.id.clRoot, ConstraintSet.LEFT);
        set.applyTo(root);

        mCameraEnhancer = new CameraEnhancer(mainActivity);
        mCameraEnhancer.setCameraView(mCameraView);

        // Initialize barcode reader
        try {
            mReader = new BarcodeReader();
        } catch (BarcodeReaderException e) {
            e.printStackTrace();
        }
        mReader.setCameraEnhancer(mCameraEnhancer);

        // Create a barcode result listener and register
        mReader.setTextResultListener(new TextResultListener() {
            // Obtain the recognized barcode results and display.
            @Override
            public void textResultCallback(int id, ImageData imageData, TextResult[] textResults) {
                List<Map<String, String>> resultList = new ArrayList<>();
                if (textResults.length > 0) {
                    for (TextResult textResult : textResults) {
                        resultList.add(initResultsMap(textResult));
                    }
                    evaluateJavascript("dbrWebViewBridge.onBarcodeRead", gson.toJson(resultList));
                }
            }
        });
    }

    private void setScanRegion(int cameraViewHeight, int frameHeight) {
        @SuppressLint("InternalInsetResource")
        int resourceId = mainActivity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        RegionDefinition region = new RegionDefinition();
        int statusBarHeight = 0;
        if (resourceId > 0) {
            statusBarHeight = mainActivity.getResources().getDimensionPixelSize(resourceId);
        }
        int percent = cameraViewHeight * 100 / (frameHeight + statusBarHeight) / 2;
        region.regionTop = percent;
        region.regionBottom = 100 - percent;
        region.regionLeft = 0;
        region.regionRight = 100;
        region.regionMeasuredByPercentage = 1;
        try {
            mCameraEnhancer.setScanRegion(region);
            mCameraEnhancer.setScanRegionVisible(false);
        } catch (CameraEnhancerException e) {
            e.printStackTrace();
        }
    }

    public void cameraPermissionHandler(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == Camera_Permission_Request_Code) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                startScanner();
            }
        }
    }

    public void startScanner() {
        try {
            mCameraEnhancer.open();
            mainActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mCameraView.setVisibility(View.VISIBLE);
                }
            });
        } catch (CameraEnhancerException e) {
            e.printStackTrace();
        }
        mReader.startScanning();
    }

    private void evaluateJavascript(String funcName, String parameter) {
        mWebView.post(new Runnable() {
            @Override
            public void run() {
                mWebView.evaluateJavascript(funcName + "('" + parameter + "')", new ValueCallback<String>() {
                    @Override
                    // if there is a callback, you can handle it there
                    public void onReceiveValue(String s) {}
                });
            }
        });
    }

    private void showErrorDialog(String message) {
        AlertDialog.Builder dialog = new AlertDialog.Builder(mainActivity);
        dialog.setTitle("License Verification Failed").setPositiveButton("OK", null).setMessage(message).show();
    }

    private Map<String, Integer> initFormatsMap() {
        Map<String, Integer> mapFormats = new HashMap<>();

        mapFormats.put("BF_ALL", EnumBarcodeFormat.BF_ALL);
        mapFormats.put("BF_ONED", EnumBarcodeFormat.BF_ONED);
        mapFormats.put("BF_GS1_DATABAR", EnumBarcodeFormat.BF_GS1_DATABAR);
        mapFormats.put("BF_NULL", EnumBarcodeFormat.BF_NULL);
        mapFormats.put("BF_CODE_39", EnumBarcodeFormat.BF_CODE_39);
        mapFormats.put("BF_CODE_128", EnumBarcodeFormat.BF_CODE_128);
        mapFormats.put("BF_CODE_93", EnumBarcodeFormat.BF_CODE_93);
        mapFormats.put("BF_CODABAR", EnumBarcodeFormat.BF_CODABAR);
        mapFormats.put("BF_ITF", EnumBarcodeFormat.BF_ITF);
        mapFormats.put("BF_EAN_13", EnumBarcodeFormat.BF_EAN_13);
        mapFormats.put("BF_EAN_8", EnumBarcodeFormat.BF_EAN_8);
        mapFormats.put("BF_UPC_A", EnumBarcodeFormat.BF_UPC_A);
        mapFormats.put("BF_UPC_E", EnumBarcodeFormat.BF_UPC_E);
        mapFormats.put("BF_INDUSTRIAL_25", EnumBarcodeFormat.BF_INDUSTRIAL_25);
        mapFormats.put("BF_CODE_39_EXTENDED", EnumBarcodeFormat.BF_CODE_39_EXTENDED);
        mapFormats.put("BF_GS1_DATABAR_OMNIDIRECTIONAL", EnumBarcodeFormat.BF_GS1_DATABAR_OMNIDIRECTIONAL);
        mapFormats.put("BF_GS1_DATABAR_TRUNCATED", EnumBarcodeFormat.BF_GS1_DATABAR_TRUNCATED);
        mapFormats.put("BF_GS1_DATABAR_STACKED", EnumBarcodeFormat.BF_GS1_DATABAR_STACKED);
        mapFormats.put("BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL", EnumBarcodeFormat.BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL);
        mapFormats.put("BF_GS1_DATABAR_EXPANDED", EnumBarcodeFormat.BF_GS1_DATABAR_EXPANDED);
        mapFormats.put("BF_GS1_DATABAR_EXPANDED_STACKED", EnumBarcodeFormat.BF_GS1_DATABAR_EXPANDED_STACKED);
        mapFormats.put("BF_GS1_DATABAR_LIMITED", EnumBarcodeFormat.BF_GS1_DATABAR_LIMITED);
        mapFormats.put("BF_PATCHCODE", EnumBarcodeFormat.BF_PATCHCODE);
        mapFormats.put("BF_PDF417", EnumBarcodeFormat.BF_PDF417);
        mapFormats.put("BF_QR_CODE", EnumBarcodeFormat.BF_QR_CODE);
        mapFormats.put("BF_DATAMATRIX", EnumBarcodeFormat.BF_DATAMATRIX);
        mapFormats.put("BF_AZTEC", EnumBarcodeFormat.BF_AZTEC);
        mapFormats.put("BF_MAXICODE", EnumBarcodeFormat.BF_MAXICODE);
        mapFormats.put("BF_MICRO_QR", EnumBarcodeFormat.BF_MICRO_QR);
        mapFormats.put("BF_MICRO_PDF417", EnumBarcodeFormat.BF_MICRO_PDF417);
        mapFormats.put("BF_GS1_COMPOSITE", EnumBarcodeFormat.BF_GS1_COMPOSITE);
        mapFormats.put("BF_MSI_CODE", EnumBarcodeFormat.BF_MSI_CODE);
        mapFormats.put("BF_CODE_11", EnumBarcodeFormat.BF_CODE_11);

        return mapFormats;
    }

    private Map<String, String> initResultsMap(TextResult result) {
        Map<String, String> mapResults = new HashMap<>();
        mapResults.put("barcodeFormatString", result.barcodeFormatString);
        mapResults.put("barcodeText", result.barcodeText);
        return mapResults;
    }

    public class WebAppInterface {

        WebAppInterface() {
        }

        // encapsulate the code you want to execute into a method here, which can be called in JS code
        // set the position of the CameraView
        @JavascriptInterface
        public void setCameraUI(int[] params) {
            DisplayMetrics dm = new DisplayMetrics();
            mainActivity.getWindowManager().getDefaultDisplay().getMetrics(dm);
            float density = dm.density;
            ConstraintLayout.LayoutParams lp = (ConstraintLayout.LayoutParams) mCameraView.getLayoutParams();
            int marginLeft = Double.valueOf(params[0] * density).intValue();
            int marginTop = Double.valueOf(params[1] * density).intValue();
            int width = Double.valueOf(params[2] * density).intValue();
            int height = Double.valueOf(params[3] * density).intValue();
            Float frameHeight = (float)width / dm.widthPixels * dm.heightPixels;
            lp.width = width;
            lp.height = height;
            lp.setMargins(marginLeft, marginTop, 0, 0);
            mainActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mCameraView.setLayoutParams(lp);
                    setScanRegion(height, frameHeight.intValue());
                }
            });
        }

        // get barcodeReader's runtimeSettings
        @JavascriptInterface
        public String getRuntimeSettings() throws BarcodeReaderException {
            PublicRuntimeSettings settings = mReader.getRuntimeSettings();
            return gson.toJson(settings);
        }

        // get EnumBarcodeFormat
        @JavascriptInterface
        public String getEnumBarcodeFormat() {
            return gson.toJson(initFormatsMap());
        }

        @JavascriptInterface
        public void updateRuntimeSettings(String settings) throws BarcodeReaderException {
            PublicRuntimeSettings _settings = gson.fromJson(settings, PublicRuntimeSettings.class);
            mReader.updateRuntimeSettings(_settings);
        }

        @JavascriptInterface
        public void startScanning() {
            if (ContextCompat.checkSelfPermission(mainActivity, "android.permission.CAMERA") != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(mainActivity, new String[]{"android.permission.CAMERA"}, Camera_Permission_Request_Code);
            } else {
                startScanner();
            }
        }

        @JavascriptInterface
        public void stopScanning() {
            // Stop video barcode reading
            mainActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mCameraView.setVisibility(View.INVISIBLE);
                }
            });
            mReader.stopScanning();
            try {
                mCameraEnhancer.close();
            } catch (CameraEnhancerException e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public void switchFlashlight(String state) throws CameraEnhancerException {
            if (Objects.equals(state, "true")) {
                mCameraEnhancer.turnOnTorch();
            } else if (Objects.equals(state, "false")) {
                mCameraEnhancer.turnOffTorch();
            }
        }

    }

    public void setCameraPermissionRequestCode(int code) {
        Camera_Permission_Request_Code = code;
    }

}
