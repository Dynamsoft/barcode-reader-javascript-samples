//
//  MainScanner.swift
//  ReadVideoWKWebview
//
//  Created by Dynamsoft on 2022/3/5.
//

import WebKit

class DBRWKWebViewHelper: NSObject {

    var wkWebView: WKWebView?
    
    func pollute(_ _wkWebView: WKWebView) {
        wkWebView = _wkWebView
        
        let configuration = _wkWebView.configuration
        let preferences = WKPreferences()
        preferences.javaScriptEnabled = true
        preferences.javaScriptCanOpenWindowsAutomatically = true
        configuration.preferences = preferences
        
        let userContentController = configuration.userContentController
        userContentController.add(self, name: "onWasmLoaded")
        userContentController.add(self, name: "onUniqueRead")
        wkWebView!.configuration.userContentController = userContentController
    }
    
    func startScanner() {
        wkWebView!.evaluateJavaScript("startScanner()")
    }
    
    func stopScanner() {
        wkWebView!.evaluateJavaScript("stopScanner()")
    }
}

extension DBRWKWebViewHelper: WKScriptMessageHandler {
    // handle calls from JS here
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        switch message.name {
            case "onWasmLoaded":
                ViewController.showController(wkWebView!.parentViewController.self! as! ViewController)()
            case "onUniqueRead":
                ViewController.showResult(wkWebView!.parentViewController.self! as! ViewController)(message.body as! String)
            default:
                print(message.body)
        }
    }

}
