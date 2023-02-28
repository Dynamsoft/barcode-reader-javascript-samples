//
//  ViewController.swift
//
//

import UIKit
import WebKit

class ViewController: UIViewController {
    
    var dce:DynamsoftCameraEnhancer! = nil
    var dceView:DCECameraView! = nil
    var barcodeReader:DynamsoftBarcodeReader! = nil
    
    var wkWebView: WKWebView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        wkWebView = WKWebView(frame: self.view.frame)
        
        self.view.addSubview(wkWebView!)
        // pollute your WKUserContentController
        DBRWKWebViewHelper().pollute(wkWebView!)
        
        let fileURL = Bundle.main.url(forResource: "html/index", withExtension: "html" )
        wkWebView?.loadFileURL(fileURL!,allowingReadAccessTo:Bundle.main.bundleURL);
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }

}
